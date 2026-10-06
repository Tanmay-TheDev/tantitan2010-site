(function(){
  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function ttMd5(str){
    function cmn(q,a,b,x,s,t){ a=a+(q+x+t)|0; return (((a<<s)|(a>>>(32-s)))+b)|0; }
    function ff(a,b,c,d,x,s,t){ return cmn((b&c)|((~b)&d),a,b,x,s,t); }
    function gg(a,b,c,d,x,s,t){ return cmn((b&d)|(c&(~d)),a,b,x,s,t); }
    function hh(a,b,c,d,x,s,t){ return cmn(b^c^d,a,b,x,s,t); }
    function ii(a,b,c,d,x,s,t){ return cmn(c^(b|(~d)),a,b,x,s,t); }
    function md51(s){
      var n=s.length, state=[1732584193,-271733879,-1732584194,271733878], i;
      for(i=64;i<=n;i+=64) md5cycle(state, md5blk(s.substring(i-64,i)));
      s=s.substring(i-64);
      var tail=Array(16).fill(0);
      for(i=0;i<s.length;i++) tail[i>>2]|=s.charCodeAt(i)<<((i%4)<<3);
      tail[i>>2]|=0x80<<((i%4)<<3);
      if(i>55){ md5cycle(state, tail); tail=Array(16).fill(0); }
      tail[14]=n*8; md5cycle(state, tail); return state;
    }
    function md5cycle(x,k){
      var a=x[0],b=x[1],c=x[2],d=x[3];
      a=ff(a,b,c,d,k[0],7,-680876936); d=ff(d,a,b,c,k[1],12,-389564586); c=ff(c,d,a,b,k[2],17,606105819); b=ff(b,c,d,a,k[3],22,-1044525330);
      a=ff(a,b,c,d,k[4],7,-176418897); d=ff(d,a,b,c,k[5],12,1200080426); c=ff(c,d,a,b,k[6],17,-1473231341); b=ff(b,c,d,a,k[7],22,-45705983);
      a=ff(a,b,c,d,k[8],7,1770035416); d=ff(d,a,b,c,k[9],12,-1958414417); c=ff(c,d,a,b,k[10],17,-42063); b=ff(b,c,d,a,k[11],22,-1990404162);
      a=ff(a,b,c,d,k[12],7,1804603682); d=ff(d,a,b,c,k[13],12,-40341101); c=ff(c,d,a,b,k[14],17,-1502002290); b=ff(b,c,d,a,k[15],22,1236535329);
      a=gg(a,b,c,d,k[1],5,-165796510); d=gg(d,a,b,c,k[6],9,-1069501632); c=gg(c,d,a,b,k[11],14,643717713); b=gg(b,c,d,a,k[0],20,-373897302);
      a=gg(a,b,c,d,k[5],5,-701558691); d=gg(d,a,b,c,k[10],9,38016083); c=gg(c,d,a,b,k[15],14,-660478335); b=gg(b,c,d,a,k[4],20,-405537848);
      a=gg(a,b,c,d,k[9],5,568446438); d=gg(d,a,b,c,k[14],9,-1019803690); c=gg(c,d,a,b,k[3],14,-187363961); b=gg(b,c,d,a,k[8],20,1163531501);
      a=gg(a,b,c,d,k[13],5,-1444681467); d=gg(d,a,b,c,k[2],9,-51403784); c=gg(c,d,a,b,k[7],14,1735328473); b=gg(b,c,d,a,k[12],20,-1926607734);
      a=hh(a,b,c,d,k[5],4,-378558); d=hh(d,a,b,c,k[8],11,-2022574463); c=hh(c,d,a,b,k[11],16,1839030562); b=hh(b,c,d,a,k[14],23,-35309556);
      a=hh(a,b,c,d,k[1],4,-1530992060); d=hh(d,a,b,c,k[4],11,1272893353); c=hh(c,d,a,b,k[7],16,-155497632); b=hh(b,c,d,a,k[10],23,-1094730640);
      a=hh(a,b,c,d,k[13],4,681279174); d=hh(d,a,b,c,k[0],11,-358537222); c=hh(c,d,a,b,k[3],16,-722521979); b=hh(b,c,d,a,k[6],23,76029189);
      a=hh(a,b,c,d,k[9],4,-640364487); d=hh(d,a,b,c,k[12],11,-421815835); c=hh(c,d,a,b,k[15],16,530742520); b=hh(b,c,d,a,k[2],23,-995338651);
      a=ii(a,b,c,d,k[0],6,-198630844); d=ii(d,a,b,c,k[7],10,1126891415); c=ii(c,d,a,b,k[14],15,-1416354905); b=ii(b,c,d,a,k[5],21,-57434055);
      a=ii(a,b,c,d,k[12],6,1700485571); d=ii(d,a,b,c,k[3],10,-1894986606); c=ii(c,d,a,b,k[10],15,-1051523); b=ii(b,c,d,a,k[1],21,-2054922799);
      a=ii(a,b,c,d,k[8],6,1873313359); d=ii(d,a,b,c,k[15],10,-30611744); c=ii(c,d,a,b,k[6],15,-1560198380); b=ii(b,c,d,a,k[13],21,1309151649);
      a=ii(a,b,c,d,k[4],6,-145523070); d=ii(d,a,b,c,k[11],10,-1120210379); c=ii(c,d,a,b,k[2],15,718787259); b=ii(b,c,d,a,k[9],21,-343485551);
      x[0]=(a+x[0])|0; x[1]=(b+x[1])|0; x[2]=(c+x[2])|0; x[3]=(d+x[3])|0;
    }
    function md5blk(s){ var md5blks=[], i; for(i=0;i<64;i+=4) md5blks[i>>2]=s.charCodeAt(i)+(s.charCodeAt(i+1)<<8)+(s.charCodeAt(i+2)<<16)+(s.charCodeAt(i+3)<<24); return md5blks; }
    function rhex(n){ var s='', j, hex_='0123456789abcdef'; for(j=0;j<4;j++) s+=hex_[(n>>(j*8+4))&0x0F]+hex_[(n>>(j*8))&0x0F]; return s; }
    str = unescape(encodeURIComponent(String(str||'')));
    return md51(str).map(rhex).join('');
  }

  var ANYCAST = { '8.8.8.8':1,'8.8.4.4':1,'1.1.1.1':1,'1.0.0.1':1,'9.9.9.9':1,'9.9.9.10':1,'208.67.222.222':1,'208.67.220.220':1 };
  var SOCIAL = [
    ['GitLab','https://gitlab.com/{u}'],['Bitbucket','https://bitbucket.org/{u}/'],
    ['Reddit','https://www.reddit.com/user/{u}'],['X','https://x.com/{u}'],
    ['YouTube','https://www.youtube.com/@{u}'],['Twitch','https://www.twitch.tv/{u}'],
    ['TikTok','https://www.tiktok.com/@{u}'],['Instagram','https://www.instagram.com/{u}/'],['Telegram','https://t.me/{u}'],
    ['Steam','https://steamcommunity.com/id/{u}'],['Medium','https://medium.com/@{u}'],
    ['Dev.to','https://dev.to/{u}'],['Hashnode','https://hashnode.com/@{u}'],
    ['Replit','https://replit.com/@{u}'],['CodePen','https://codepen.io/{u}'],
    ['Kaggle','https://www.kaggle.com/{u}'],['HackerOne','https://hackerone.com/{u}'],
    ['HackerRank','https://www.hackerrank.com/{u}'],['LeetCode','https://leetcode.com/{u}/'],
    ['Codeforces','https://codeforces.com/profile/{u}'],['npm','https://www.npmjs.com/~{u}'],
    ['PyPI','https://pypi.org/user/{u}/'],['Docker Hub','https://hub.docker.com/u/{u}'],
    ['Linktree','https://linktr.ee/{u}'],['About.me','https://about.me/{u}'],
    ['SoundCloud','https://soundcloud.com/{u}'],['Pinterest','https://www.pinterest.com/{u}/'],
    ['Tumblr','https://{u}.tumblr.com'],['Pastebin','https://pastebin.com/u/{u}'],
    ['Keybase','https://keybase.io/{u}'],['Product Hunt','https://www.producthunt.com/@{u}'],
    ['VK','https://vk.com/{u}'],['Flickr','https://www.flickr.com/people/{u}'],
    ['Vimeo','https://vimeo.com/{u}'],['Dribbble','https://dribbble.com/{u}'],
    ['Behance','https://www.behance.net/{u}'],['DeviantArt','https://www.deviantart.com/{u}'],
    ['Patreon','https://www.patreon.com/{u}'],['Ko-fi','https://ko-fi.com/{u}'],
    ['BuyMeACoffee','https://www.buymeacoffee.com/{u}'],['Substack','https://{u}.substack.com'],
    ['Hugging Face','https://huggingface.co/{u}'],['SourceForge','https://sourceforge.net/u/{u}'],
    ['Gitee','https://gitee.com/{u}'],['TryHackMe','https://tryhackme.com/p/{u}'],
    ['HackTheBox','https://app.hackthebox.com/users/{u}'],['Bugcrowd','https://bugcrowd.com/{u}'],
    ['Bluesky','https://bsky.app/profile/{u}'],['Mastodon','https://mastodon.social/@{u}'],
    ['Threads','https://www.threads.net/@{u}'],['Quora','https://www.quora.com/profile/{u}'],
    ['Goodreads','https://www.goodreads.com/{u}'],['Letterboxd','https://letterboxd.com/{u}'],
    ['MyAnimeList','https://myanimelist.net/profile/{u}'],['AniList','https://anilist.co/user/{u}'],
    ['Lichess','https://lichess.org/@/{u}'],['Roblox','https://www.roblox.com/users/profile?username={u}'],
    ['OpenSea','https://opensea.io/{u}'],['Unsplash','https://unsplash.com/@{u}'],
    ['500px','https://500px.com/p/{u}'],['Wattpad','https://www.wattpad.com/user/{u}'],
    ['Last.fm','https://www.last.fm/user/{u}'],['Bandcamp','https://bandcamp.com/{u}'],
    ['Codewars','https://www.codewars.com/users/{u}'],['Exercism','https://exercism.org/profiles/{u}'],
    ['FreeCodeCamp','https://www.freecodecamp.org/{u}'],['Duolingo','https://www.duolingo.com/profile/{u}'],
    ['SlideShare','https://www.slideshare.net/{u}'],['Instructables','https://www.instructables.com/member/{u}'],
    ['ResearchGate','https://www.researchgate.net/profile/{u}'],['ORCID','https://orcid.org/{u}']
  ];
  var MISS = /404|not found|doesn.?t exist|couldn.?t find|no such user|user not found|page not found|sorry, this page|account suspended|there isn.?t a|no user named|we could not find|isn.?t available|profile unavailable|nobody with this|profile isn.?t available|couldn.?t find this account|this account doesn.?t exist|sorry, nobody on reddit|user does not exist|no one by that name|that user does not exist|page does not exist|isn.?t here/i;
  var CHALLENGE = /just a moment|attention required|client challenge|rate limit exceeded|enable javascript and cookies|cf-browser-verification|checking your browser|verify you are human/i;

  function classify(q){
    var s=String(q||'').trim();
    if(/^(?:\d{1,3}\.){3}\d{1,3}$/.test(s)) return 'ip';
    if(/^[0-9a-f:]+$/i.test(s) && s.indexOf(':')>=0 && s.length>=3) return 'ip';
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return 'email';
    if(/^https?:\/\//i.test(s)) return 'url';
    if(/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,62}$/.test(s) || /^0x[a-fA-F0-9]{40}$/.test(s)) return 'wallet';
    var digits=s.replace(/\D/g,'');
    if(digits.length>=8 && digits.length<=15 && /^[+]?[0-9][0-9\s().-]{7,20}$/.test(s)) return 'phone';
    if(/^(?:[a-z0-9-]+\.)+[a-z]{2,24}$/i.test(s) && s.indexOf(' ')<0) return 'domain';
    if(/^@?[a-zA-Z0-9._-]{2,39}$/.test(s) && s.indexOf(' ')<0) return 'username';
    return 'name';
  }
  function isPrivateIp(ip){
    var m=String(ip).match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
    if(!m) return false;
    var a=+m[1], b=+m[2];
    return a===0||a===10||a===127||(a===192&&b===168)||(a===172&&b>=16&&b<=31)||(a===169&&b===254);
  }
  async function getJson(url, ms, headers){
    var ctl=new AbortController();
    var t=setTimeout(function(){ ctl.abort(); }, ms||8000);
    try{
      var r=await fetch(url, { signal:ctl.signal, headers: Object.assign({ 'Accept':'application/json' }, headers||{}) });
      if(!r.ok) return { ok:false, status:r.status };
      var ct=r.headers.get('content-type')||'';
      if(/json/i.test(ct) || true){
        try{ return { ok:true, data: await r.json() }; }catch(_){ return { ok:false, status:r.status }; }
      }
    }catch(err){ return { ok:false, error: err && err.message ? err.message : 'fail' }; }
    finally{ clearTimeout(t); }
  }
  async function getText(url, ms){
    var ctl=new AbortController();
    var t=setTimeout(function(){ ctl.abort(); }, ms||8000);
    try{
      var r=await fetch(url, { signal:ctl.signal });
      var text=await r.text();
      return { ok:r.ok, status:r.status, text:text };
    }catch(err){ return { ok:false, status:0, text:'', error: err && err.message ? err.message : 'fail' }; }
    finally{ clearTimeout(t); }
  }
  async function poolMap(items, limit, fn){
    var out=new Array(items.length);
    var i=0;
    async function worker(){
      while(i<items.length){
        var idx=i++;
        try{ out[idx]=await fn(items[idx], idx); }catch(e){ out[idx]=null; }
      }
    }
    var n=Math.min(limit, items.length);
    var ws=[];
    for(var k=0;k<n;k++) ws.push(worker());
    await Promise.all(ws);
    return out;
  }
  function dnsAnswers(js, type){
    var ans=(js && js.Answer)||[];
    return ans.filter(function(a){ return !type || a.type===type; }).map(function(a){ return a.data; }).filter(Boolean);
  }
  async function dnsRec(name, type){
    var map={A:1,NS:2,CNAME:5,SOA:6,PTR:12,MX:15,TXT:16,AAAA:28,CAA:257};
    var t=map[type]||1;
    var r=await getJson('https://dns.google/resolve?name='+encodeURIComponent(name)+'&type='+t, 8000);
    if(!r.ok || !r.data) return { ok:false, status:null, answers:[] };
    return { ok:true, status:r.data.Status, answers:dnsAnswers(r.data, t) };
  }
  async function dns(name, type){
    return (await dnsRec(name, type)).answers;
  }
  function line(label, value){ if(!value) return ''; return '**'+label+'** '+value; }

  async function githubDeep(u){
    var lines=[];
    var pack=await Promise.all([
      getJson('https://api.github.com/users/'+encodeURIComponent(u)+'/repos?per_page=8&sort=updated', 8000),
      getJson('https://api.github.com/users/'+encodeURIComponent(u)+'/gists?per_page=5', 8000),
      getJson('https://api.github.com/users/'+encodeURIComponent(u)+'/orgs', 8000)
    ]);
    var repos=pack[0].ok && Array.isArray(pack[0].data) ? pack[0].data : [];
    var gists=pack[1].ok && Array.isArray(pack[1].data) ? pack[1].data : [];
    var orgs=pack[2].ok && Array.isArray(pack[2].data) ? pack[2].data : [];
    if(repos.length){
      lines.push('**Repos (updated)**\n'+repos.slice(0,8).map(function(r){
        return '- ['+r.full_name+']('+r.html_url+') ★'+r.stargazers_count+(r.language?(' · '+r.language):'')+(r.description?(' — '+String(r.description).slice(0,80)):'');
      }).join('\n'));
    }
    if(gists.length){
      lines.push('**Gists**\n'+gists.slice(0,5).map(function(g){ return '- '+g.html_url+(g.description?(' — '+String(g.description).slice(0,80)):''); }).join('\n'));
    }
    if(orgs.length){
      lines.push('**Orgs** '+orgs.map(function(o){ return '['+o.login+'](https://github.com/'+o.login+')'; }).join(', '));
    }
    return lines;
  }

  async function apiUserHits(u){
    var out=[];
    await Promise.allSettled([
      (async function(){
        var r=await getJson('https://api.github.com/users/'+encodeURIComponent(u));
        if(r.ok && r.data && r.data.login){
          var d=r.data;
          out.push({ site:'GitHub', url:d.html_url, extra:[d.name,d.bio,d.location,d.company,d.blog,d.twitter_username&&('X @'+d.twitter_username), d.email, d.hireable&&'hireable', (d.public_repos+' repos'), (d.public_gists+' gists'), (d.followers+' followers'), d.created_at && ('since '+String(d.created_at).slice(0,10))].filter(Boolean).join(' · '), github:d.login });
        }
      })(),
      (async function(){
        var r=await getJson('https://keybase.io/_/api/1.0/user/lookup.json?usernames='+encodeURIComponent(u));
        if(r.ok && r.data && r.data.them && r.data.them[0] && !r.data.them[0].error){
          var th=r.data.them[0], basics=th.basics||{}, profile=th.profile||{};
          var proofs=[];
          try{
            var them=th.proofs_summary && th.proofs_summary.all;
            if(Array.isArray(them)) proofs=them.slice(0,8).map(function(p){ return (p.proof_type||'')+'='+(p.nametag||p.service_url||''); });
          }catch(_){}
          out.push({ site:'Keybase', url:'https://keybase.io/'+encodeURIComponent(basics.username||u), extra:[profile.full_name, profile.location, profile.bio].filter(Boolean).concat(proofs).join(' · ') });
        }
      })(),
      (async function(){
        var r=await getJson('https://hacker-news.firebaseio.com/v0/user/'+encodeURIComponent(u)+'.json');
        if(r.ok && r.data && r.data.id){
          out.push({ site:'Hacker News', url:'https://news.ycombinator.com/user?id='+encodeURIComponent(u), extra:['karma '+String(r.data.karma||0), r.data.created && ('since '+new Date(r.data.created*1000).toISOString().slice(0,10)), r.data.submitted && (r.data.submitted.length+' posts')].filter(Boolean).join(' · ') });
        }
      })(),
      (async function(){
        var r=await getJson('https://api.ashcon.app/mojang/v2/user/'+encodeURIComponent(u));
        if(r.ok && r.data && (r.data.username||r.data.uuid)){
          var hist=((r.data.username_history)||[]).map(function(x){ return x.username; }).filter(Boolean).slice(0,6);
          out.push({ site:'Minecraft', url:'https://namemc.com/profile/'+encodeURIComponent(r.data.uuid||u), extra:[r.data.username, r.data.uuid].concat(hist.length?['aka '+hist.join(', ')]:[]).join(' · ') });
        }
      })(),
      (async function(){
        var r=await getJson('https://api.chess.com/pub/player/'+encodeURIComponent(u.toLowerCase()));
        if(r.ok && r.data && r.data.username){
          var d=r.data;
          out.push({ site:'Chess.com', url:d.url||('https://www.chess.com/member/'+d.username), extra:[d.name, d.title, d.country, d.followers&&(d.followers+' followers'), d.joined && ('since '+new Date(d.joined*1000).toISOString().slice(0,10))].filter(Boolean).join(' · ') });
        }
      })(),
      (async function(){
        var r=await getJson('https://api.stackexchange.com/2.3/users?inname='+encodeURIComponent(u)+'&site=stackoverflow&pagesize=3&order=desc&sort=reputation');
        if(r.ok && r.data && r.data.items && r.data.items.length){
          r.data.items.slice(0,3).forEach(function(it){
            if(String(it.display_name||'').toLowerCase()===u.toLowerCase()){
              out.push({ site:'Stack Overflow', url:it.link, extra:[it.display_name, 'rep '+it.reputation, it.location].filter(Boolean).join(' · ') });
            }
          });
        }
      })()
    ]);
    return out;
  }

  function titleHasUser(title, user){
    var t=String(title||'').replace(/https?:\/\/\S+/gi,' ').replace(/www\.\S+/gi,' ');
    var u=String(user||'').replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    if(!u) return false;
    return new RegExp('(?:^|[^a-z0-9_])'+u+'(?:[^a-z0-9_]|$)','i').test(t);
  }
  function probeState(site, url, user, text){
    text=String(text||'').slice(0,2500);
    var title=((text.match(/Title:\s*(.*)/i)||[])[1]||'').trim();
    if(!text) return { site:site, url:url, state:'unknown', extra:'no page' };
    if(CHALLENGE.test(text) || CHALLENGE.test(title)) return { site:site, url:url, state:'unknown', extra:'challenge/captcha page' };
    if(MISS.test(text) || /404|not found|^error$/i.test(title)) return { site:site, url:url, state:'absent', extra:(title||'not found').slice(0,90) };
    if(/telegram:\s*contact/i.test(title)) return { site:site, url:url, state:'unknown', extra:'Telegram contact cards appear even when the username may not exist' };
    if(/^(instagram|twitch|bluesky|soundcloud|medium|threads|threads • log in)$/i.test(title)) return { site:site, url:url, state:'unknown', extra:'generic '+site+' page, not a profile' };
    if(/log in|sign in|login •/i.test(title) && !titleHasUser(title, user)) return { site:site, url:url, state:'unknown', extra:title.slice(0,90) };
    if(titleHasUser(title, user) && !/page not found|doesn.?t exist|not found/i.test(title)){
      return { site:site, url:url, state:'hit', extra:title.slice(0,90) };
    }
    return { site:site, url:url, state:'unknown', extra:(title||'unconfirmed').slice(0,90) };
  }
  async function socialSweep(u){
    var hits=[], absent=[], unknown=0, checked=0;
    await poolMap(SOCIAL, 8, async function(pair){
      var site=pair[0], url=pair[1].replace(/\{u\}/g, encodeURIComponent(u)).replace('%40','@');
      checked++;
      var r=await getText('https://r.jina.ai/'+url, 4500);
      var res=probeState(site, url, u, r.ok ? r.text : '');
      if(res.state==='hit') hits.push(res);
      else if(res.state==='absent') absent.push(res);
      else unknown++;
    });
    return { hits:hits, absent:absent, unknown:unknown, checked:checked };
  }

  async function usernameHits(user){
    var u=String(user||'').replace(/^@/,'').trim();
    var api=await apiUserHits(u);
    var social=await socialSweep(u);
    var seen={};
    var all=[];
    api.concat(social.hits).forEach(function(h){
      var k=(h.site+'|'+h.url).toLowerCase();
      if(seen[k]) return; seen[k]=1; all.push(h);
    });
    return { hits:all, absent:social.absent, unknown:social.unknown, checked:social.checked, github: (api.filter(function(h){ return h.github; })[0]||{}).github };
  }

  async function shodan(ip){
    var r=await getJson('https://internetdb.shodan.io/'+encodeURIComponent(ip), 8000);
    if(!r.ok || !r.data) return '';
    var d=r.data;
    var parts=[];
    if(d.ports && d.ports.length) parts.push('ports '+d.ports.join(', '));
    if(d.vulns && d.vulns.length) parts.push('CVEs '+d.vulns.slice(0,12).join(', ')+(d.vulns.length>12?'…':''));
    if(d.cpes && d.cpes.length) parts.push('CPE '+d.cpes.slice(0,6).join(', '));
    if(d.hostnames && d.hostnames.length) parts.push('host '+d.hostnames.slice(0,8).join(', '));
    if(d.tags && d.tags.length) parts.push('tags '+d.tags.join(', '));
    return parts.length ? ('**Shodan InternetDB ('+ip+')** '+parts.join(' · ')) : '';
  }
  async function otx(kind, indicator){
    var path = kind==='ip' ? ('IPv4/'+indicator) : ('domain/'+indicator);
    var r=await getJson('https://otx.alienvault.com/api/v1/indicators/'+path+'/general', 8000);
    if(!r.ok || !r.data) return '';
    var d=r.data;
    var pulses=(d.pulse_info && d.pulse_info.count) || 0;
    var mal=d.malware && d.malware.count;
    var extra=[pulses && (pulses+' OTX pulses'), mal && (mal+' malware'), d.reputation!=null && ('rep '+d.reputation), d.asn, d.country_name].filter(Boolean);
    return extra.length ? ('**OTX** '+extra.join(' · ')) : '';
  }

  async function subdomains(host){
    var set={};
    var ht=await getText('https://api.hackertarget.com/hostsearch/?q='+encodeURIComponent(host), 9000);
    if(ht.ok && ht.text && !/error valid key|api count exceeded|error/i.test(ht.text.slice(0,80))){
      ht.text.split(/\n+/).forEach(function(row){
        var name=row.split(',')[0].trim().toLowerCase();
        if(name && name.indexOf(host)>=0) set[name]=row.split(',')[1]||'';
      });
    }
    var crt=await getJson('https://crt.sh/?q='+encodeURIComponent('%.'.concat(host))+'&output=json', 7000);
    if(crt.ok && Array.isArray(crt.data)){
      crt.data.slice(0,80).forEach(function(row){
        String(row.name_value||row.common_name||'').split(/\n/).forEach(function(n){
          n=n.trim().toLowerCase().replace(/^\*\./,'');
          if(n && n.indexOf(host)>=0 && n.indexOf(' ') < 0) set[n]=set[n]||'';
        });
      });
    }
    return Object.keys(set).sort().slice(0,40).map(function(n){ return n+(set[n]?(' → '+set[n]):''); });
  }

  async function domainHits(host){
    var h=String(host||'').replace(/^https?:\/\//,'').split('/')[0].toLowerCase().replace(/\.$/,'');
    var lines=[];
    var pack = await Promise.all([
      dns(h,'A'), dns(h,'AAAA'), dns(h,'MX'), dns(h,'NS'), dns(h,'TXT'), dns(h,'SOA'), dns(h,'CAA'),
      dns('_dmarc.'+h,'TXT'),
      getJson('https://rdap.org/domain/'+encodeURIComponent(h), 9000),
      getJson('https://archive.org/wayback/available?url='+encodeURIComponent(h), 8000),
      getText('https://api.hackertarget.com/httpheaders/?q='+encodeURIComponent('https://'+h), 9000),
      otx('domain', h),
      subdomains(h)
    ]);
    var a=pack[0], aaaa=pack[1], mx=pack[2], ns=pack[3], txt=pack[4], soa=pack[5], caa=pack[6], dmarc=pack[7], rdap=pack[8], way=pack[9], hdr=pack[10], otxLine=pack[11], subs=pack[12];
    if(a.length) lines.push(line('A', a.join(', ')));
    if(aaaa.length) lines.push(line('AAAA', aaaa.join(', ')));
    if(mx.length) lines.push(line('MX', mx.join(', ')));
    if(ns.length) lines.push(line('NS', ns.join(', ')));
    if(soa.length) lines.push(line('SOA', soa[0]));
    if(caa.length) lines.push(line('CAA', caa.slice(0,6).join(' | ')));
    var spf=txt.filter(function(x){ return /v=spf1/i.test(x); });
    if(spf.length) lines.push(line('SPF', spf.join(' | ')));
    else if(txt.length) lines.push(line('TXT', txt.slice(0,5).map(function(x){ return String(x).slice(0,160); }).join(' | ')));
    var dmarcRec=await dnsRec('_dmarc.'+h,'TXT');
    dmarc=dmarcRec.answers;
    if(dmarc.length) lines.push(line('DMARC', dmarc.join(' | ')));
    else if(dmarcRec.ok && (dmarcRec.status===0 || dmarcRec.status===3)) lines.push('**DMARC** no TXT on `_dmarc.'+h+'`.');
    if(rdap.ok && rdap.data){
      var d=rdap.data;
      var status=(d.status||[]).join(', ');
      var events=(d.events||[]).map(function(e){ return (e.eventAction||'')+': '+(e.eventDate||'').slice(0,10); }).filter(Boolean);
      var registrar='';
      try{
        (d.entities||[]).forEach(function(en){
          var roles=(en.roles||[]).join(' ');
          var fn=((en.vcardArray||[])[1]||[]).find(function(x){ return x&&x[0]==='fn'; });
          if(/registrar/i.test(roles) && fn) registrar=fn[3];
        });
      }catch(_){}
      lines.push('**RDAP/WHOIS** ' + [d.ldhName, status && ('status '+status), registrar && ('registrar '+registrar), events.slice(0,5).join('; ')].filter(Boolean).join(' · '));
    }
    if(way.ok && way.data && way.data.archived_snapshots && way.data.archived_snapshots.closest){
      var c=way.data.archived_snapshots.closest;
      lines.push('**Wayback** '+c.url+' ('+(c.timestamp||'')+')');
    }
    if(hdr.ok && hdr.text && !/error valid key|api count exceeded/i.test(hdr.text.slice(0,80))){
      var keep=hdr.text.split(/\n/).filter(function(row){
        return /^(HTTP\/|Server:|X-Powered-By:|Strict-Transport|Content-Security-Policy|X-Frame-Options|X-Content-Type|Set-Cookie:|Via:|cf-ray|x-aspnet)/i.test(row);
      }).slice(0,12);
      if(keep.length) lines.push('**HTTP headers**\n```\n'+keep.join('\n')+'\n```');
    }
    if(otxLine) lines.push(otxLine);
    if(subs && subs.length) lines.push('**Subdomains ('+subs.length+')**\n'+subs.map(function(s){ return '- '+s; }).join('\n'));
    var ips=a.filter(function(ip){ return !isPrivateIp(ip) && !ANYCAST[ip]; }).slice(0,3);
    if(!ips.length && a[0] && !isPrivateIp(a[0])) ips=[a[0]];
    for(var i=0;i<ips.length;i++){
      var geo=await getJson('https://ipwho.is/'+encodeURIComponent(ips[i]), 8000);
      if(geo.ok && geo.data && geo.data.success!==false){
        lines.push('**IP geo ('+ips[i]+')** '+[geo.data.city, geo.data.region, geo.data.country, geo.data.org, geo.data.isp, geo.data.connection && geo.data.connection.isp].filter(Boolean).join(' · '));
      }
      var sh=await shodan(ips[i]);
      if(sh) lines.push(sh);
    }
    return lines;
  }

  async function ipHits(ip){
    if(isPrivateIp(ip)) return ['Private/reserved IP — skipped.'];
    var lines=[];
    var g=await getJson('https://ipwho.is/'+encodeURIComponent(ip), 8000);
    if(g.ok && g.data && g.data.success!==false){
      var d=g.data;
      lines.push(['**'+d.ip+'**', d.type, d.city, d.region, d.country, d.postal, d.latitude&&(d.latitude+', '+d.longitude), d.org, d.isp, d.connection&&d.connection.asn&&('ASN '+d.connection.asn), d.connection&&d.connection.isp, d.timezone && d.timezone.id].filter(Boolean).join(' · '));
    }
    var rev=ip.split('.').reverse().join('.')+'.in-addr.arpa';
    var ptr=await dns(rev,'PTR');
    if(ptr.length) lines.push(line('PTR', ptr.join(', ')));
    var sh=await shodan(ip);
    if(sh) lines.push(sh);
    var ox=await otx('ip', ip);
    if(ox) lines.push(ox);
    if(!ANYCAST[ip]){
      var rvs=await getText('https://api.hackertarget.com/reverseiplookup/?q='+encodeURIComponent(ip), 9000);
      if(rvs.ok && rvs.text && !/error valid key|api count exceeded|no records/i.test(rvs.text.slice(0,80))){
        var hosts=rvs.text.split(/\n+/).map(function(s){ return s.trim(); }).filter(function(s){ return s && s.indexOf(' ') < 0 && s.length<80; }).slice(0,15);
        if(hosts.length) lines.push('**Reverse IP ('+hosts.length+')**\n'+hosts.map(function(h){ return '- '+h; }).join('\n'));
      }
    }
    var way=await getJson('https://archive.org/wayback/available?url='+encodeURIComponent(ip), 8000);
    if(way.ok && way.data && way.data.archived_snapshots && way.data.archived_snapshots.closest){
      lines.push('**Wayback** '+way.data.archived_snapshots.closest.url);
    }
    return lines;
  }

  var hibpCatalog=null;
  async function getHibpCatalog(){
    if(hibpCatalog) return hibpCatalog;
    hibpCatalog={};
    var r=await getJson('https://haveibeenpwned.com/api/v3/breaches', 12000);
    if(r.ok && Array.isArray(r.data)){
      r.data.forEach(function(b){
        hibpCatalog[String(b.Name||'').toLowerCase()]=b;
        hibpCatalog[String(b.Title||'').toLowerCase()]=b;
      });
    }
    return hibpCatalog;
  }
  function matchHibp(name, cat){
    var k=String(name||'').toLowerCase();
    if(cat[k]) return cat[k];
    var compact=k.replace(/[^a-z0-9]/g,'');
    var keys=Object.keys(cat);
    for(var i=0;i<keys.length;i++){
      if(keys[i].replace(/[^a-z0-9]/g,'')===compact) return cat[keys[i]];
    }
    return null;
  }
  async function namedBreaches(email){
    var r=await getJson('https://api.xposedornot.com/v1/check-email/'+encodeURIComponent(email), 10000);
    if(r.ok && r.data && r.data.Error){
      return ['**Named public breaches** none found for this address (XposedOrNot).'];
    }
    var names=[];
    if(r.ok && r.data && r.data.breaches){
      var b=r.data.breaches;
      if(Array.isArray(b) && b.length && Array.isArray(b[0])) names=b[0].filter(function(x){ return typeof x==='string'; });
      else if(Array.isArray(b)) names=b.filter(function(x){ return typeof x==='string'; });
    }
    if(!names.length){
      if(!r.ok) return ['**Named public breaches** lookup failed ('+(r.status||r.error||'error')+').'];
      return ['**Named public breaches** none found (XposedOrNot).'];
    }
    var cat=await getHibpCatalog();
    names=names.slice().sort(function(a,c){
      var da=(matchHibp(a,cat)||{}).BreachDate||'';
      var db=(matchHibp(c,cat)||{}).BreachDate||'';
      return String(db).localeCompare(String(da));
    });
    var shown=names.slice(0,28);
    var lines=shown.map(function(n){
      var meta=matchHibp(n,cat)||{};
      var title=meta.Title||n;
      var extra=[
        meta.BreachDate,
        meta.PwnCount && (Number(meta.PwnCount).toLocaleString()+' records'),
        meta.Domain,
        (meta.DataClasses||[]).slice(0,6).join(', ')
      ].filter(Boolean).join(' · ');
      return '- **'+title+'**'+(extra?(' — '+extra):'');
    });
    var more=names.length>shown.length ? '\n- … +'+(names.length-shown.length)+' more' : '';
    return ['**Named public breaches** '+names.length+' hits (XposedOrNot names + HIBP catalog). Breach *names* and data-classes only — no dump contents, no passwords.\n'+lines.join('\n')+more];
  }
  async function emailHits(email){
    var lines=[];
    var low=String(email).trim().toLowerCase();
    var nb=await namedBreaches(low);
    if(nb && nb.length) lines=lines.concat(nb);
    var hash=ttMd5(low);
    var g=await getJson('https://www.gravatar.com/'+hash+'.json', 8000);
    if(g.ok && g.data && g.data.entry && g.data.entry[0]){
      var e=g.data.entry[0];
      var name=(e.name&&e.name.formatted)||e.displayName||'';
      var loc=e.currentLocation||'';
      var about=e.aboutMe||'';
      var urls=((e.urls)||[]).map(function(u){ return u.value||u; }).slice(0,8);
      var ims=((e.accounts)||[]).map(function(a){ return (a.shortname||a.domain||'')+' '+(a.display||a.url||''); }).slice(0,8);
      lines.push('**Gravatar** '+[name, loc, about && String(about).slice(0,160)].filter(Boolean).join(' · '));
      if(urls.length) lines.push(urls.map(function(u){ return '- '+u; }).join('\n'));
      if(ims.length) lines.push('**Gravatar accounts** '+ims.join(' · '));
    } else {
      lines.push('**Gravatar** no public profile (`'+hash.slice(0,10)+'…`).');
    }
    var domain=low.split('@')[1];
    if(domain){
      var mx=await dns(domain,'MX');
      var txt=await dns(domain,'TXT');
      var dmarc=await dns('_dmarc.'+domain,'TXT');
      if(mx.length) lines.push(line('Mail MX', mx.join(', ')));
      var spf=txt.filter(function(x){ return /v=spf1/i.test(x); });
      if(spf.length) lines.push(line('SPF', spf.join(' | ')));
      if(dmarc.length) lines.push(line('DMARC', dmarc.join(' | ')));
      else {
        var dr=await dnsRec('_dmarc.'+domain,'TXT');
        if(dr.ok && (dr.status===0 || dr.status===3) && !dr.answers.length) lines.push('**DMARC** no TXT on '+domain);
      }
    }
    var gh=await getJson('https://api.github.com/search/users?q='+encodeURIComponent(low+' in:email'), 8000);
    if(gh.ok && gh.data && gh.data.total_count){
      lines.push('**GitHub email search** '+gh.data.total_count+' hit(s): '+((gh.data.items||[]).slice(0,5).map(function(x){ return x.html_url; }).join(', ')));
    }
    return lines;
  }

  async function nameHits(q){
    var lines=[];
    var w=await getJson('https://en.wikipedia.org/w/api.php?action=opensearch&limit=5&namespace=0&format=json&origin=*&search='+encodeURIComponent(q), 8000);
    if(w.ok && w.data && w.data[1] && w.data[1].length){
      var titles=w.data[1], links=w.data[3]||[];
      lines.push('**Wikipedia**\n'+titles.map(function(title,i){ return '- ['+title+']('+(links[i]||'')+')'; }).join('\n'));
    }
    var gh=await getJson('https://api.github.com/search/users?q='+encodeURIComponent(q)+'&per_page=5', 8000);
    if(gh.ok && gh.data && (gh.data.items||[]).length){
      lines.push('**GitHub users**\n'+(gh.data.items||[]).slice(0,5).map(function(x){ return '- ['+x.login+']('+x.html_url+')'; }).join('\n'));
    }
    var ddg=await getJson('https://api.duckduckgo.com/?q='+encodeURIComponent(q)+'&format=json', 8000);
    if(ddg.ok && ddg.data){
      var abs=ddg.data.AbstractText||ddg.data.Abstract;
      if(abs) lines.push('**DuckDuckGo** '+abs+(ddg.data.AbstractURL?('\n'+ddg.data.AbstractURL):''));
    }
    return lines;
  }


  var CC = [
    ['1','US/CA'],['7','RU/KZ'],['20','EG'],['27','ZA'],['30','GR'],['31','NL'],['32','BE'],['33','FR'],['34','ES'],
    ['36','HU'],['39','IT'],['40','RO'],['41','CH'],['43','AT'],['44','UK'],['45','DK'],['46','SE'],['47','NO'],
    ['48','PL'],['49','DE'],['51','PE'],['52','MX'],['54','AR'],['55','BR'],['56','CL'],['57','CO'],['60','MY'],
    ['61','AU'],['62','ID'],['63','PH'],['65','SG'],['66','TH'],['81','JP'],['82','KR'],['84','VN'],['86','CN'],
    ['90','TR'],['91','IN'],['92','PK'],['98','IR'],['234','NG'],['351','PT'],['358','FI'],['380','UA'],['420','CZ'],
    ['852','HK'],['880','BD'],['886','TW'],['966','SA'],['971','AE']
  ];
  function phoneHits(raw){
    var digits=String(raw||'').replace(/\D/g,'');
    var cc='?', country='unknown';
    CC.sort(function(a,b){ return b[0].length-a[0].length; });
    for(var i=0;i<CC.length;i++){
      if(digits.indexOf(CC[i][0])===0){ cc=CC[i][0]; country=CC[i][1]; break; }
    }
    var nat=cc!=='?' ? digits.slice(cc.length) : digits;
    var e164=cc!=='?' ? ('+'+cc+nat) : ('+'+digits);
    var q='"'+e164+'" OR "'+digits+'"';
    return [
      '**E.164** `'+e164+'` · country **'+country+'** · CC +'+cc+' · national `'+nat+'` · '+digits.length+' digits',
      '_PhoneInfoga-style parse only — no owner, no live GPS, no Truecaller._',
      '**Dorks** [Google](https://www.google.com/search?q='+encodeURIComponent(q)+') · [DuckDuckGo](https://duckduckgo.com/?q='+encodeURIComponent(q)+') · [Bing](https://www.bing.com/search?q='+encodeURIComponent(q)+')'
    ];
  }
  async function walletHits(addr){
    var lines=['**Address** `'+addr+'`'];
    if(/^0x[a-fA-F0-9]{40}$/.test(addr)){
      lines.push('**Chain** Ethereum (public explorer — no node RPC)');
      lines.push('[Etherscan](https://etherscan.io/address/'+addr+') · [OTX](https://otx.alienvault.com/indicator/ethereum/'+addr+')');
      return lines;
    }
    var r=await getJson('https://api.blockcypher.com/v1/btc/main/addrs/'+encodeURIComponent(addr)+'/balance', 9000);
    if(r.ok && r.data){
      var d=r.data;
      lines.push('**BTC** received '+(d.total_received/1e8)+' · sent '+(d.total_sent/1e8)+' · balance '+(d.balance/1e8)+' · n_tx '+(d.n_tx||0));
    } else {
      var b=await getJson('https://blockchain.info/rawaddr/'+encodeURIComponent(addr)+'?limit=1', 9000);
      if(b.ok && b.data) lines.push('**BTC** n_tx '+(b.data.n_tx||0)+' · received '+(b.data.total_received/1e8));
    }
    lines.push('[blockchain.com](https://www.blockchain.com/explorer/addresses/btc/'+addr+') · [BlockCypher](https://live.blockcypher.com/btc/address/'+addr+')');
    return lines;
  }
  function dorkPack(kind, q){
    var e=encodeURIComponent(q);
    var rows=[
      ['Google','https://www.google.com/search?q='+e],
      ['DuckDuckGo','https://duckduckgo.com/?q='+e],
      ['GitHub','https://github.com/search?q='+e],
      ['Shodan','https://www.shodan.io/search?query='+e],
      ['Censys','https://search.censys.io/search?resource=hosts&q='+e],
      ['URLScan','https://urlscan.io/search/#'+e],
      ['Wayback','https://web.archive.org/web/*/'+e],
      ['OTX','https://otx.alienvault.com/browse/global/pulses?q='+e],
      ['VirusTotal','https://www.virustotal.com/gui/search/'+e],
      ['IntelX','https://intelx.io/?s='+e],
      ['Hunter','https://hunter.io/search/'+e],
      ['crt.sh','https://crt.sh/?q='+e],
      ['SecurityTrails','https://securitytrails.com/list/apex_domain/'+e],
      ['ViewDNS','https://viewdns.info/whois/?domain='+e],
      ['DNSdumpster','https://dnsdumpster.com/'],
      ['urlhaus','https://urlhaus.abuse.ch/browse.php?search='+e]
    ];
    if(kind==='username') rows.push(['Sherlock-style sites','https://github.com/sherlock-project/sherlock']);
    return '**Search engines** (awesome-hacker-search-engines)\n'+rows.map(function(r){ return '- ['+r[0]+']('+r[1]+')'; }).join('\n');
  }
  async function harvester(q){
    var lines=[];
    var gh=await getJson('https://api.github.com/search/repositories?q='+encodeURIComponent(q)+'&per_page=5', 8000);
    if(gh.ok && gh.data && (gh.data.items||[]).length){
      lines.push('**theHarvester / GitHub repos**\n'+(gh.data.items||[]).slice(0,5).map(function(x){ return '- ['+x.full_name+']('+x.html_url+') ★'+x.stargazers_count; }).join('\n'));
    }
    return lines;
  }
  async function webCheckExtras(host){
    var lines=[];
    var sec=await getText('https://r.jina.ai/https://'+host+'/.well-known/security.txt', 4000);
    if(sec.ok && sec.text && !MISS.test(sec.text.slice(0,400)) && /contact:/i.test(sec.text)){
      lines.push('**security.txt**\n```\n'+sec.text.replace(/^Title:.*\n/i,'').slice(0,500)+'\n```');
    }
    var rob=await getText('https://r.jina.ai/https://'+host+'/robots.txt', 4000);
    if(rob.ok && rob.text && /user-agent:/i.test(rob.text)){
      lines.push('**robots.txt**\n```\n'+rob.text.replace(/^Title:.*\n/i,'').slice(0,400)+'\n```');
    }
    return lines;
  }
  function moduleTable(rows){
    return '### Modules (SpiderFoot-style)\n'+rows.map(function(r){ return '- `'+r[0]+'` ← '+r[1]+' — '+r[2]; }).join('\n');
  }

  function formatHits(hits){
    if(!hits.length) return 'No **confirmed** public accounts. Login pages and empty shells are ignored.';
    return hits.map(function(h){ return '- **'+h.site+'** — '+h.url+(h.extra?(' — '+h.extra):''); }).join('\n');
  }

  window.ttRunOsint = async function(query, type){
    var q=String(query||'').trim().replace(/^@/,'');
    if(!q) return 'Need a target. Try `osint octocat`, `whois nasa.gov`, `lookup ip 1.1.1.1`, or a phone/`bc1` wallet.';
    if(/localhost|127\.0\.0\.1|0\.0\.0\.0|::1/.test(q.toLowerCase())) return 'Local/private hosts are blocked.';
    var kind=String(type||'auto').toLowerCase();
    if(!kind || kind==='auto') kind=classify(q);
    if(kind==='user') kind='username';
    var mods=[];
    var bits=['## CC-OSINT framework — '+q, '_Mapped from github.com/topics/osint-tool (Sherlock, Maigret, theHarvester, PhoneInfoga, web-check, Amass, SpiderFoot, Shodan). Public sources only._'];
    try{
      bits.push(dorkPack(kind, q));
      mods.push(['dorks','awesome-hacker-search-engines','ok']);
      if(kind==='username'){
        var pack=await usernameHits(q);
        mods.push(['confirmed-apis','GitHub/Keybase/HN/Chess/Minecraft/SO', pack.hits.length+' confirmed']);
        mods.push(['page-probe','username × '+SOCIAL.length+' sites', (pack.absent?pack.absent.length:0)+' not found, '+(pack.unknown||0)+' unverified']);
        bits.push('### Confirmed accounts ('+pack.hits.length+')\n'+formatHits(pack.hits));
        if(pack.absent && pack.absent.length){
          bits.push('### Not found ('+pack.absent.length+')\n'+pack.absent.map(function(s){ return s.site; }).join(', ')+'\n_These pages returned a real not-found / missing-profile message._');
        }
        bits.push('_Unverified sites (login walls, Cloudflare, generic homepages) are **not** listed as accounts. A page loading is not proof the user exists._');
        if(pack.github){
          var deep=await githubDeep(pack.github);
          mods.push(['github','repos/gists/orgs', deep.length?'ok':'empty']);
          if(deep.length) bits.push('### GitHub deep\n'+deep.join('\n\n'));
        }
      } else if(kind==='domain'){
        var dh=await domainHits(q);
        mods.push(['amass/subfinder','subdomains+DNS','ok']);
        mods.push(['web-check','headers/WHOIS/mail-auth','ok']);
        mods.push(['shodan','InternetDB ports/CVEs','ok']);
        bits.push('### Domain / infra\n'+(dh.join('\n\n')||'No DNS/RDAP data.'));
        var wx=await webCheckExtras(q);
        if(wx.length) bits.push('### web-check extras\n'+wx.join('\n\n'));
        var hv2=await harvester(q);
        if(hv2.length) bits.push('### Harvest\n'+hv2.join('\n\n'));
      } else if(kind==='ip'){
        mods.push(['shodan','InternetDB','ok']);
        mods.push(['otx','AlienVault','ok']);
        bits.push('### IP / ports\n'+((await ipHits(q)).join('\n\n')||'No geo data.'));
      } else if(kind==='email'){
        mods.push(['holehe-lite','Gravatar+GitHub+XposedOrNot (no password-reset spam)','ok']);
        mods.push(['h8mail-lite','named breaches only','ok']);
        bits.push('### Email footprint\n'+((await emailHits(q)).join('\n\n')||'No public hits.'));
        var local=q.split('@')[0].replace(/[+.].*/,'');
        if(local && local.length>=3){
          var uh=await usernameHits(local);
          mods.push(['local-part','username APIs+probe', uh.hits.length+' confirmed']);
          if(uh.hits.length) bits.push('### Confirmed accounts for local-part `'+local+'` ('+uh.hits.length+')\n'+formatHits(uh.hits));
          if(uh.absent && uh.absent.length) bits.push('### Not found for `'+local+'`\n'+uh.absent.map(function(s){ return s.site; }).join(', '));
          if(uh.github){
            var gd=await githubDeep(uh.github);
            if(gd.length) bits.push('### GitHub deep\n'+gd.join('\n\n'));
          }
        }
        var dom=q.split('@')[1];
        if(dom) bits.push('### Mail domain\n'+((await domainHits(dom)).join('\n\n')||''));
      } else if(kind==='url'){
        var host='';
        try{ host=new URL(q).hostname; }catch(_){}
        mods.push(['photon','pagelinks+headers','ok']);
        var way=await getJson('https://archive.org/wayback/available?url='+encodeURIComponent(q), 8000);
        bits.push('### URL');
        if(way.ok && way.data && way.data.archived_snapshots && way.data.archived_snapshots.closest){
          var c=way.data.archived_snapshots.closest;
          bits.push('**Wayback** '+c.url+' ('+c.timestamp+')');
        } else bits.push('No Wayback snapshot.');
        var hdr=await getText('https://api.hackertarget.com/httpheaders/?q='+encodeURIComponent(q), 9000);
        if(hdr.ok && hdr.text && !/error valid key/i.test(hdr.text.slice(0,40))){
          bits.push('**HTTP headers**\n```\n'+hdr.text.split(/\n/).slice(0,18).join('\n')+'\n```');
        }
        var links=await getText('https://api.hackertarget.com/pagelinks/?q='+encodeURIComponent(q), 9000);
        if(links.ok && links.text && !/error valid key/i.test(links.text.slice(0,40))){
          var ls=links.text.split(/\n+/).map(function(s){ return s.trim(); }).filter(Boolean).slice(0,20);
          if(ls.length) bits.push('**Outbound links**\n'+ls.map(function(x){ return '- '+x; }).join('\n'));
        }
        if(host) bits.push('### Host '+host+'\n'+((await domainHits(host)).join('\n\n')||''));
      } else if(kind==='phone'){
        mods.push(['phoneinfoga','E.164 parse + dorks (no owner)','ok']);
        bits.push('### Phone\n'+phoneHits(q).join('\n\n'));
      } else if(kind==='wallet'){
        mods.push(['blockchain','public explorer','ok']);
        bits.push('### Wallet\n'+((await walletHits(q)).join('\n\n')));
      } else {
        var web=await nameHits(q);
        bits.push('### Open web\n'+(web.join('\n\n')||'No hits.'));
        var token=q.replace(/[^a-zA-Z0-9._-]/g,'').slice(0,39);
        if(token.length>=3){
          var acc=await usernameHits(token);
          mods.push(['token-sweep','username APIs+probe', acc.hits.length+' confirmed']);
          if(acc.hits.length) bits.push('### Confirmed accounts for `'+token+'` ('+acc.hits.length+')\n'+formatHits(acc.hits));
        }
      }
    }catch(err){
      bits.push('OSINT error: '+(err && err.message ? err.message : String(err)));
    }
    bits.splice(2, 0, moduleTable(mods.length?mods:[['framework','cc-osint','ran']]));
    bits.push('\n_Not a port of all 1,384 GitHub OSINT repos. No GhostTrack GPS, no Sn1per exploits, no GHunt cookies, no dump contents. Do not use this to harass anyone._');
    return bits.filter(Boolean).join('\n\n');
  };

  function inlineMd(s){
    s = String(s==null?'':s);
    var bags=[];
    s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, function(_,lab,url){
      bags.push('<a href="'+esc(url)+'" target="_blank" rel="noopener">'+esc(lab)+'</a>');
      return '\0B'+(bags.length-1)+'\0';
    });
    s = s.replace(/(https?:\/\/[^\s<]+)/g, function(url){
      bags.push('<a href="'+esc(url)+'" target="_blank" rel="noopener">'+esc(url.replace(/^https?:\/\//,''))+'</a>');
      return '\0B'+(bags.length-1)+'\0';
    });
    s = esc(s).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/`([^`]+)`/g,'<code>$1</code>');
    return s.replace(/\0B(\d+)\0/g, function(_,n){ return bags[+n]||''; });
  }
  function osintReportHtml(md){
    md = String(md||'').replace(/\r\n/g,'\n').trim();
    var title=(md.match(/^##\s+(.+)$/m)||[])[1]||'OSINT report';
    var sub='';
    md.replace(/^_(.+)_\s*$/m, function(_,x){ sub=x; return _; });
    var parts=md.split(/^### /m);
    parts.shift();
    var html='<div class="osint-hero"><div class="osint-kicker">Public recon</div><h3>'+esc(title.replace(/^CC-OSINT framework — /,''))+'</h3>';
    if(sub) html+='<p class="osint-muted">'+esc(sub)+'</p>';
    html+='</div>';
    parts.forEach(function(block){
      var nl=block.indexOf('\n');
      var h=(nl<0?block:block.slice(0,nl)).trim();
      var body=nl<0?'':block.slice(nl+1);
      html+='<section class="osint-sec"><header class="osint-sec-h">'+esc(h)+'</header><div class="osint-sec-b">';
      if(/module/i.test(h)){
        html+='<div class="osint-mods">';
        body.split('\n').forEach(function(line){
          var m=line.match(/`([^`]+)`\s*←\s*(.+?)\s*—\s*(.+)/);
          if(!m) return;
          html+='<div class="osint-mod"><b>'+esc(m[1])+'</b><span>'+esc(m[2])+'</span><em>'+esc(m[3])+'</em></div>';
        });
        html+='</div>';
      } else if(/search engine|dork/i.test(h)){
        html+='<div class="osint-pills">';
        var re=/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, m;
        while((m=re.exec(body))){
          html+='<a class="osint-pill" href="'+esc(m[2])+'" target="_blank" rel="noopener">'+esc(m[1])+'</a>';
        }
        html+='</div>';
      } else {
        html+=formatSecBody(body);
      }
      html+='</div></section>';
    });
    return html;
  }
  function formatSecBody(body){
    var chunks=[];
    body=String(body||'').replace(/```([\s\S]*?)```/g, function(_,c){
      chunks.push('<pre class="osint-pre">'+esc(c.replace(/^\n|\n$/g,''))+'</pre>');
      return '\n%%C'+(chunks.length-1)+'%%\n';
    });
    var out=[], hits=[];
    function flush(){ if(!hits.length) return; out.push('<div class="osint-hits">'+hits.join('')+'</div>'); hits=[]; }
    body.split('\n').forEach(function(line){
      var t=line.trim();
      if(!t){ flush(); return; }
      var cm=t.match(/^%%C(\d+)%%$/);
      if(cm){ flush(); out.push(chunks[+cm[1]]); return; }
      if(/^_.*_$/.test(t)){ flush(); out.push('<p class="osint-muted">'+esc(t.replace(/^_|_$/g,''))+'</p>'); return; }
      var hit=t.match(/^[-•]\s+\*\*(.+?)\*\*\s+—\s+(\S+)(?:\s+—\s+(.*))?$/);
      if(hit){
        var url=hit[2], extra=hit[3]||'';
        var isUrl=/^https?:\/\//i.test(url);
        hits.push((isUrl?'<a class="osint-hit" href="'+esc(url)+'" target="_blank" rel="noopener">':'<div class="osint-hit">')+'<span class="osint-hit-site">'+esc(hit[1])+'</span>'+(isUrl?'<span class="osint-hit-url">'+esc(url.replace(/^https?:\/\//,''))+'</span>':'')+(extra?'<span class="osint-hit-extra">'+esc(extra)+'</span>':'')+(isUrl?'</a>':'</div>'));
        return;
      }
      var mdhit=t.match(/^[-•]\s+\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)(.*)$/);
      if(mdhit){
        hits.push('<a class="osint-hit" href="'+esc(mdhit[2])+'" target="_blank" rel="noopener"><span class="osint-hit-site">'+esc(mdhit[1])+'</span><span class="osint-hit-url">'+esc(mdhit[2].replace(/^https?:\/\//,''))+'</span>'+(mdhit[3]?'<span class="osint-hit-extra">'+esc(mdhit[3].replace(/^\s+[—-]\s*/,''))+'</span>':'')+'</a>');
        return;
      }
      var kv=t.match(/^\*\*([^*]+)\*\*\s+(.+)$/);
      if(kv){ flush(); out.push('<div class="osint-kv"><span>'+esc(kv[1])+'</span><span>'+inlineMd(kv[2])+'</span></div>'); return; }
      var li=t.match(/^[-•]\s+(.+)$/);
      if(li){ flush(); out.push('<div class="osint-li">'+inlineMd(li[1])+'</div>'); return; }
      flush();
      out.push('<p>'+inlineMd(t)+'</p>');
    });
    flush();
    return out.join('')||'<p class="osint-muted">Nothing in this section.</p>';
  }

  if(typeof TOOL_REGISTRY==='object'){
    TOOL_REGISTRY.osint = function(){
      var icons = (typeof ICONS!=='undefined' && ICONS.osint) ? ICONS.osint.replace('currentColor','#5ce1e6') : '';
      openModal({
        title: icons+' OSINT Recon',
        wide:true,
        extraWide:true,
        html: '<div class="osint-shell">'+
          '<p class="osint-note">Look up a <b>username</b>, <b>email</b>, <b>domain</b>, or <b>IP</b>. Only <b>confirmed</b> public records are listed as hits — we do not invent Instagram/TikTok accounts from login pages. No passwords, no private owner data.</p>'+
          '<div class="osint-types" id="osint-types"></div>'+
          '<form class="osint-bar" id="osint-form">'+
            '<input id="osint-q" type="text" autocomplete="off" spellcheck="false" placeholder="e.g. torvalds &nbsp;·&nbsp; nasa.gov &nbsp;·&nbsp; 1.1.1.1">'+
            '<button type="submit" id="osint-go">Look up</button>'+
          '</form>'+
          '<div class="osint-out" id="osint-out">'+
            '<div class="osint-empty"><strong>Ready</strong><span>Try <code>torvalds</code>, <code>nasa.gov</code>, or <code>1.1.1.1</code>. Each hit is a tappable card with the site name, link, and a short fact line.</span></div>'+
          '</div></div>',
        onMount: function(root){
          var kind='auto';
          var types=root.querySelector('#osint-types');
          var labels={auto:'Auto',username:'Username',email:'Email',domain:'Domain',ip:'IP',url:'URL',phone:'Phone',wallet:'Wallet',name:'Name'};
          ['auto','username','email','domain','ip','url','phone','wallet','name'].forEach(function(tp,i){
            var btn=document.createElement('button');
            btn.type='button'; btn.className='osint-type'+(i===0?' active':''); btn.dataset.type=tp; btn.textContent=labels[tp];
            btn.addEventListener('click', function(){
              types.querySelectorAll('.osint-type').forEach(function(b){ b.classList.remove('active'); });
              btn.classList.add('active'); kind=tp;
            });
            types.appendChild(btn);
          });
          var form=root.querySelector('#osint-form');
          var out=root.querySelector('#osint-out');
          var input=root.querySelector('#osint-q');
          form.addEventListener('submit', async function(e){
            e.preventDefault();
            var q=input.value.trim();
            if(!q){ input.focus(); return; }
            out.innerHTML='<div class="osint-empty"><span class="osint-pulse"></span> Looking up <b>'+esc(q)+'</b>…</div>';
            try{
              var md=await window.ttRunOsint(q, kind);
              out.innerHTML=osintReportHtml(md);
              out.scrollTop=0;
            }catch(err){
              out.innerHTML='<div class="osint-empty">Couldn’t finish this lookup.<br>'+esc(err && err.message ? err.message : String(err))+'</div>';
            }
          });
          setTimeout(function(){ if(input) input.focus(); }, 80);
        }
      });
    };
  }
})();
