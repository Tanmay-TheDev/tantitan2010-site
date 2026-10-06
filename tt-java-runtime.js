/* TanTitan2010 Java Runtime Bridge
 * Genuine browser JVM when CheerpJ + ECJ are reachable; MiniJava otherwise.
 */
(function(root){
  'use strict';
  const CJ_VERSION=8;
  const ECJ_LOCAL='ecj.jar';
  const ECJ_CDN='https://repo1.maven.org/maven2/org/eclipse/jdt/ecj/3.33.0/ecj-3.33.0.jar';
  const state={mode:'uninitialized',ready:null,ecj:null};

  function capture(){
    const lines=[], orig={log:console.log,info:console.info,warn:console.warn,error:console.error};
    const push=kind=>function(){
      const text=[...arguments].map(v=>typeof v==='string'?v:JSON.stringify(v)).join(' ');
      if(text) lines.push({kind,text});
    };
    console.log=push('out'); console.info=push('out'); console.warn=push('warn'); console.error=push('err');
    return {lines,restore(){Object.assign(console,orig)}};
  }
  function clean(lines,kind){
    return lines.filter(x=>(!kind||x.kind===kind)&&!/(CheerpJ|\[CJ|Loading|Optimizing|compiler|ecj\.jar)/i.test(x.text)).map(x=>x.text);
  }
  function loadCJ(){
    if(typeof window.cheerpjInit==='function') return Promise.resolve();
    return new Promise((resolve,reject)=>{
      const existing=document.querySelector('script[data-tt-cheerpj],script[src*="cjrtnc.leaningtech.com"]');
      if(existing){
        const check=()=>typeof window.cheerpjInit==='function'?resolve():reject(new Error('CheerpJ loader unavailable'));
        existing.addEventListener('load',check,{once:true});
        existing.addEventListener('error',()=>reject(new Error('CheerpJ loader failed')),{once:true});
        setTimeout(check,100);
        return;
      }
      const s=document.createElement('script');
      s.src='https://cjrtnc.leaningtech.com/4.3/loader.js';
      s.async=true; s.dataset.ttCheerpj='1';
      s.onload=()=>resolve(); s.onerror=()=>reject(new Error('Could not load CheerpJ'));
      document.head.appendChild(s);
    });
  }
  async function ensure(){
    if(state.mode==='genuine') return;
    if(state.ready) return state.ready;
    state.ready=loadCJ().then(async()=>{
      if(!window.cheerpjInit) throw new Error('CheerpJ init not found');
      if(!window.__ttCheerpjInit){
        window.__ttCheerpjInit=window.cheerpjInit({version:CJ_VERSION,status:'none'})
          .then(()=>{window.__ttCheerpjReady=true;});
      }
      await window.__ttCheerpjInit;
      state.mode='genuine';
    }).catch(err=>{
      state.ready=null;
      state.mode=window.MiniJava?'embedded':'none';
      throw err;
    });
    return state.ready;
  }
  async function ecj(){
    if(state.ecj) return state.ecj;
    state.ecj=fetch(new URL(ECJ_LOCAL,location.href)).then(r=>r.ok?r.arrayBuffer():fetch(ECJ_CDN).then(x=>x.arrayBuffer()))
      .then(buf=>{ const bytes=new Uint8Array(buf); if(bytes.length<1000) throw Error('ECJ JAR is missing/truncated'); window.__ttEcjBytes=bytes; window.cheerpOSAddStringFile('/str/ecj.jar',bytes); })
      .catch(e=>{state.ecj=null;throw e;});
    return state.ecj;
  }

  async function localProject(mode,files,mainClass,stdin,dependencies){
    if(!/^https?:$/.test(location.protocol) || !files || !files.length) return null;
    try{
      const form=new URLSearchParams();
      form.set('mode',mode||'run');
      if(mainClass) form.set('mainClass',mainClass);
      form.set('stdin',stdin||'');
      form.set('dependencies',dependencies||'');
      files.forEach(f=>{form.append('fileName',f.name);form.append('fileContent',f.source);});
      const r=await fetch('/api/netbeans/execute',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8','Accept':'application/json'},body:form.toString(),cache:'no-store'});
      if(!r.ok)return null;
      const x=await r.json();
      return {...x,mode:'local-openjdk'};
    }catch(_){return null;}
  }
  async function localBridge(mode,source,filename,className){
    if(!/^https?:$/.test(location.protocol)) return null;
    try{
      const form=new URLSearchParams();form.set('mode',mode);form.set('fileName',filename||'Main.java');form.set('fileContent',source);if(className)form.set('mainClass',className);
      const r=await fetch('/api/java/execute',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8','Accept':'application/json'},body:form.toString(),cache:'no-store'});
      if(!r.ok)return null;const x=await r.json();return {...x,mode:'local-openjdk'};
    }catch(_){return null;}
  }
  async function genuineCompile(source,filename){
    await ensure(); await ecj();
    filename=filename||'Main.java';
    window.cheerpOSAddStringFile('/str/'+filename.replace(/^.*[\\/]/,''),source);
    const cap=capture();
    try{
      const run=typeof window.cheerpjRunJar==='function'
        ?window.cheerpjRunJar('/str/ecj.jar','-d','/files','-1.8','/str/'+filename.replace(/^.*[\\/]/,''))
        :window.cheerpjRunMain('org.eclipse.jdt.internal.compiler.batch.Main','/str/ecj.jar','-d','/files','-1.8','/str/'+filename.replace(/^.*[\\/]/,''));
      const exit=await Promise.resolve(run); cap.restore();
      const output=clean(cap.lines,'out'), errors=clean(cap.lines,'err');
      return {ok:exit===0,output:output.length?output:['BUILD SUCCESSFUL'],error:errors.join('\n'),exitCode:exit,mode:'genuine'};
    }catch(e){cap.restore();return {ok:false,output:[],error:'javac runtime error: '+e,exitCode:1,mode:'genuine'};}
  }
  async function run(source,filename='Main.java',className='Main',args=[]){
    const local=await localBridge('run',source,filename,className);
    if(local) return local;
    try{
      const compiled=await genuineCompile(source,filename);
      if(!compiled.ok) return compiled;
      const cap=capture();
      const exit=await Promise.resolve(window.cheerpjRunMain(className.replace(/\.java$/,''),'/files',...args));
      cap.restore();
      return {ok:exit===0,output:clean(cap.lines,'out'),error:clean(cap.lines,'err').join('\n'),exitCode:exit,mode:'genuine'};
    }catch(e){
      state.mode=window.MiniJava?'embedded':'none';
      if(window.MiniJava) return Promise.resolve(window.MiniJava.run(source,filename)).then(r=>({...r,mode:'embedded'}));
      return {ok:false,output:[],error:String(e),exitCode:1,mode:'none'};
    }
  }
  async function compileProject(files,dependencies){
    const list=(files||[]).map(f=>({name:f.name||'Main.java',source:String(f.source==null?'':f.source)}));
    const local=await localProject('compile',list,'','',dependencies||'');
    if(local) return local;
    if(list.length===1) return root.TTJavaRuntime.compile(list[0].source,list[0].name);
    return {ok:false,output:[],error:'A local OpenJDK bridge is required to compile multi-file Java projects in the browser.',exitCode:1,mode:'none'};
  }
  async function runProject(files,mainClass,args,stdin,dependencies){
    const list=(files||[]).map(f=>({name:f.name||'Main.java',source:String(f.source==null?'':f.source)}));
    const local=await localProject('run',list,mainClass||'',stdin||'',dependencies||'');
    if(local) return local;
    if(list.length===1) return run(list[0].source,list[0].name,mainClass||'',args||[]);
    return {ok:false,output:[],error:'A local OpenJDK bridge is required to run multi-file Java projects in the browser.',exitCode:1,mode:'none'};
  }
  root.TTJavaRuntime={
    compileProject,
    runProject,
    status:()=>({mode:state.mode}),
    async run(source,filename='Main.java',className){
      const cls=className||((source.match(/public\s+class\s+([A-Za-z_$][\w$]*)/)||[])[1])||'Main';
      return run(source,filename,cls,[]);
    },
    async compile(source,filename='Main.java'){
      const local=await localBridge('compile',source,filename);
      if(local) return local;
      try{return await genuineCompile(source,filename);}
      catch(e){
        if(root.MiniJava&&typeof root.MiniJava.compile==='function') return {...root.MiniJava.compile(source,filename),mode:'embedded'};
        return {ok:false,output:[],error:String(e),exitCode:1,mode:'none'};
      }
    }
  };
})(window);
