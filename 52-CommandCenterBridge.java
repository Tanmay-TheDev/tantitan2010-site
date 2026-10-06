import com.sun.net.httpserver.*;
import java.io.*;import java.net.*;import java.nio.charset.StandardCharsets;import java.nio.file.*;import java.util.*;import java.util.concurrent.*;

public final class CommandCenterBridge {
  static Path root; static final int MAX_BODY=2_000_000; static final int TIMEOUT=15000;
  public static void main(String[] args) throws Exception {
    root=Paths.get(args.length>0?args[0]:".").toAbsolutePath().normalize(); int port=args.length>1?Integer.parseInt(args[1]):4173;
    HttpServer s=HttpServer.create(new InetSocketAddress("127.0.0.1",port),0); s.setExecutor(Executors.newCachedThreadPool());
    s.createContext("/api/java/execute",CommandCenterBridge::execute); s.createContext("/api/java/status",CommandCenterBridge::status); s.createContext("/",CommandCenterBridge::staticFile);
    s.start(); System.out.println("TanTitan2010 Command Center: http://127.0.0.1:"+port+"/");
  }
  static void headers(HttpExchange x,String type){x.getResponseHeaders().set("Content-Type",type+"; charset=utf-8");x.getResponseHeaders().set("Cache-Control","no-store");}
  static void send(HttpExchange x,int code,String type,String body)throws IOException{headers(x,type);byte[] b=body.getBytes(StandardCharsets.UTF_8);x.sendResponseHeaders(code,b.length);try(OutputStream o=x.getResponseBody()){o.write(b);}}
  static Map<String,List<String>> form(String body){Map<String,List<String>> m=new LinkedHashMap<>();for(String p:body.split("&")){int k=p.indexOf('=');String a=k<0?p:p.substring(0,k),v=k<0?"":p.substring(k+1);a=URLDecoder.decode(a,StandardCharsets.UTF_8);v=URLDecoder.decode(v,StandardCharsets.UTF_8);m.computeIfAbsent(a,z->new ArrayList<>()).add(v);}return m;}
  static String one(Map<String,List<String>> m,String k){List<String> v=m.get(k);return v==null||v.isEmpty()?"":v.get(0);}
  static String esc(String s){return s.replace("\\","\\\\").replace("\"","\\\"").replace("\r","\\r").replace("\n","\\n").replace("\t","\\t");}
  static void status(HttpExchange x)throws IOException{String javac=tool("javac"),java=tool("java");send(x,200,"application/json","{\"ok\":"+(javac!=null&&java!=null)+",\"javac\":\""+esc(javac==null?"unavailable":javac)+"\",\"java\":\""+esc(java==null?"unavailable":java)+"\"}");}
  static String tool(String name){try{Process p=new ProcessBuilder(name,"-version").redirectErrorStream(true).start();String s=new String(p.getInputStream().readAllBytes(),StandardCharsets.UTF_8);p.waitFor(3,TimeUnit.SECONDS);return s.split("\\R",2)[0].trim();}catch(Exception e){return null;}}
  static void execute(HttpExchange x)throws IOException{
    if(!"POST".equalsIgnoreCase(x.getRequestMethod())){send(x,405,"text/plain","POST required");return;}
    byte[] raw=x.getRequestBody().readNBytes(MAX_BODY+1);if(raw.length>MAX_BODY){send(x,413,"text/plain","Request too large");return;}
    Map<String,List<String>> m=form(new String(raw,StandardCharsets.UTF_8));String mode=one(m,"mode"),stdin=one(m,"stdin"),main=one(m,"mainClass");List<String> names=m.getOrDefault("fileName",List.of()),srcs=m.getOrDefault("fileContent",List.of());
    if(names.size()!=srcs.size()||names.isEmpty()){send(x,400,"application/json","{\"ok\":false,\"message\":\"No Java source files supplied.\"}");return;}
    Path tmp=Files.createTempDirectory("tt-java-");long start=System.nanoTime();try{
      List<Path> files=new ArrayList<>();for(int i=0;i<names.size();i++){String n=safeName(names.get(i));Path p=tmp.resolve(n);Files.createDirectories(p.getParent());Files.writeString(p,srcs.get(i),StandardCharsets.UTF_8);files.add(p);}
      List<String> javac=new ArrayList<>(List.of("javac","-encoding","UTF-8","-g","-d",tmp.toString()));for(Path p:files)javac.add(p.toString());
      Result c=run(javac,tmp,null);if(!c.ok){sendResult(x,c,"javac");return;}if("compile".equals(mode)){sendResult(x,new Result(true,c.out,c.err,0,c.ms),"javac");return;}
      if(main.isBlank())main=guessMain(srcs,names);if(main.isBlank())throw new IllegalArgumentException("No main class found.");
      List<String> cmd=new ArrayList<>(List.of("java","-cp",tmp.toString(),main));Result r=run(cmd,tmp,stdin);sendResult(x,r,"OpenJDK");
    }catch(Exception e){send(x,500,"application/json","{\"ok\":false,\"message\":\""+esc(e.toString())+"\",\"exitCode\":1}");}finally{delete(tmp);}
  }
  static String safeName(String n){n=n.replace('\\','/');if(n.startsWith("/")||n.contains("../")||n.contains("..\\"))throw new IllegalArgumentException("Unsafe Java filename");return n;}
  static String guessMain(List<String>s,List<String>n){for(int i=0;i<s.size();i++){if(s.get(i).matches("(?s).*\\bstatic\\s+void\\s+main\\s*\\(")){String f=n.get(i).replace('\\','/');String c=f.substring(f.lastIndexOf('/')+1).replaceFirst("\\.java$","");String pkg="";java.util.regex.Matcher p=java.util.regex.Pattern.compile("\\bpackage\\s+([A-Za-z_$][\\w$]*(?:\\.[A-Za-z_$][\\w$]*)*)\\s*;").matcher(s.get(i));if(p.find())pkg=p.group(1)+".";return pkg+c;}}return "";}
  static final class Result{boolean ok;String out,err;int code;long ms;Result(boolean a,String b,String c,int d,long e){ok=a;out=b;err=c;code=d;ms=e;}}
  static Result run(List<String>cmd,Path dir,String stdin)throws Exception{long st=System.nanoTime();Process p=new ProcessBuilder(cmd).directory(dir.toFile()).start();if(stdin!=null&&!stdin.isEmpty()){try(OutputStream o=p.getOutputStream()){o.write(stdin.getBytes(StandardCharsets.UTF_8));o.flush();}}else p.getOutputStream().close();ExecutorService ex=Executors.newFixedThreadPool(2);Future<String> fo=ex.submit(()->new String(p.getInputStream().readAllBytes(),StandardCharsets.UTF_8));Future<String> fe=ex.submit(()->new String(p.getErrorStream().readAllBytes(),StandardCharsets.UTF_8));boolean done=p.waitFor(TIMEOUT,TimeUnit.MILLISECONDS);if(!done){p.destroyForcibly();ex.shutdownNow();return new Result(false,fo.get(1,TimeUnit.SECONDS),fe.get(1,TimeUnit.SECONDS)+"\nProcess timed out after "+TIMEOUT+" ms",124,(System.nanoTime()-st)/1_000_000);}int code=p.exitValue();String out=fo.get(2,TimeUnit.SECONDS),err=fe.get(2,TimeUnit.SECONDS);ex.shutdown();return new Result(code==0,out,err,code,(System.nanoTime()-st)/1_000_000);}
  static void sendResult(HttpExchange x,Result r,String tool)throws IOException{String msg="{\"ok\":"+r.ok+",\"toolchain\":\""+esc(tool)+"\",\"stdout\":\""+esc(r.out)+"\",\"stderr\":\""+esc(r.err)+"\",\"exitCode\":"+r.code+",\"durationMs\":"+r.ms+"}";send(x,200,"application/json",msg);}
  static void staticFile(HttpExchange x)throws IOException{String p=URLDecoder.decode(x.getRequestURI().getPath(),StandardCharsets.UTF_8);if(p.equals("/"))p="/index.html";Path f=root.resolve(p.substring(1)).normalize();if(!f.startsWith(root)||!Files.isRegularFile(f)){send(x,404,"text/plain","Not found");return;}String type=Files.probeContentType(f);if(type==null)type="application/octet-stream";byte[] b=Files.readAllBytes(f);x.getResponseHeaders().set("Content-Type",type);x.getResponseHeaders().set("Cache-Control","no-store");x.sendResponseHeaders(200,b.length);try(OutputStream o=x.getResponseBody()){o.write(b);}}
  static void delete(Path p){try{Files.walk(p).sorted(Comparator.reverseOrder()).forEach(q->{try{Files.deleteIfExists(q);}catch(Exception ignored){}});}catch(Exception ignored){}}
}
