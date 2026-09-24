(()=>{let q=setInterval(()=>{let W=window.LuxWorld,H=window.LuxHomes520,C=window.LuxCivic404;if(!W?.player||!H?.enter||!H?.leave||!C)return;clearInterval(q);init()},180);
function init(){
 const W=window.LuxWorld,H=window.LuxHomes520,C=window.LuxCivic404;
 let current=null,lastEntry=null,oldLeave=H.leave.bind(H),prompt=document.createElement('div'),touch=document.createElement('button'),lastSync='';
 prompt.id='homeAccess840';prompt.style='position:fixed;left:50%;bottom:58px;transform:translateX(-50%);z-index:64;display:none;background:#0a121be8;color:#fff;border:1px solid #ffffff35;border-radius:12px;padding:9px 13px;font:bold 13px Arial;pointer-events:none;box-shadow:0 8px 28px #0008';document.body.appendChild(prompt);
 touch.id='homeAccessBtn840';touch.textContent='🏠 ZUHAUSE / E';touch.style='position:fixed;right:12px;bottom:230px;z-index:64;display:none;padding:10px 12px;border-radius:12px;background:#f0a51a;color:#111;font-weight:900';document.body.appendChild(touch);
 function serverHome(){
   let A=window.LuxAccount,SA=window.LuxServerAssets740||window.LuxServerAssets710,uid=A?.session?.user?.id;if(!uid)return null;
   let all=SA?.serverHomes||[],active=SA?.activeServerHome;
   return all.find(h=>String(h.id)===String(active))||all.find(h=>h.owner===uid||h.tenant===uid)||null
 }
 function physicalHouse(h){
   let sites=W.houseSites||[],n=Number(h?.id);
   if(h?.kind==='haus'&&sites.length){
     let idx=Number.isFinite(n)?Math.max(0,n-41):0,site=sites[idx%sites.length],rot=site.rot||0,off=site.d/2+2.0;
     return{x:site.x+Math.sin(rot)*off,z:site.z+Math.cos(rot)*off,rot,id:'family',label:h.label||'Mein Haus',serverId:h.id,kind:'Haus'}
   }
   let d=H.doors?.flat||{x:-176,z:49.2};return{x:d.x,z:d.z-1.5,rot:0,id:'flat',label:h?.label||'Meine Wohnung',serverId:h?.id,kind:'Wohnung'}
 }
 function resolve(){
   let h=serverHome(),L=window.LuxLife?.state;
   if(h){
     let p=physicalHouse(h),sig=String(h.id);
     if(sig!==lastSync){lastSync=sig;let SA=window.LuxServerAssets740||window.LuxServerAssets710;if(C.state?.home?.serverId!==h.id)SA?.activateHome?.(h.id,false)}
     return p
   }
   let id=C.state?.home?.id;if(['studio','flat','family'].includes(id)){
     let d=H.doors?.[id]||H.spots?.[id];if(d)return{x:d.x,z:d.z-1.5,rot:0,id,label:C.state.home?.name||'Mein Zuhause',kind:id==='family'?'Haus':'Wohnung'}
   }
   if((L?.starterMonths||0)>0){let d=H.doors?.flat||{x:-176,z:49.2};return{x:d.x,z:d.z-1.5,rot:0,id:'flat',label:'Gemeinde-Startwohnung',kind:'Wohnung'}}
   return null
 }
 function dist(){if(!current)return 999;return Math.hypot(W.player.position.x-current.x,W.player.position.z-current.z)}
 function enter(){
   current=resolve();if(!current||H.inside||(window.LuxPlayerCar840||window.LuxPlayerCar750)?.driving)return;
   if(dist()>7.5)return;
   lastEntry={x:current.x,z:current.z,rot:current.rot||0,label:current.label};
   H.enter(current.id,false);window.LuxAudio840?.door?.();window.dispatchEvent(new CustomEvent('luxcity:home-enter',{detail:{label:current.label,id:current.id}}))
 }
 H.leave=function(){let ret=lastEntry;oldLeave();if(ret){let y=ret.rot||0;W.player.position.set(ret.x-Math.sin(y)*1.15,0,ret.z-Math.cos(y)*1.15);W.yaw=y;window.LuxAudio840?.door?.();window.dispatchEvent(new CustomEvent('luxcity:home-leave',{detail:{label:ret.label}}))}}
 function tick(){
   current=resolve();let driving=(window.LuxPlayerCar840||window.LuxPlayerCar750)?.driving,d=current?dist():999,show=!!current&&!H.inside&&!driving&&d<8;
   prompt.style.display=show?'block':'none';touch.style.display=show&&matchMedia('(pointer:coarse)').matches?'block':'none';
   if(show)prompt.textContent='E · '+current.label.toUpperCase()+' BETRETEN · '+Math.round(d)+' m'
 }
 touch.onclick=enter;
 addEventListener('keydown',e=>{if(e.repeat||['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;if((e.code==='KeyE'||String(e.key).toLowerCase()==='e')&&!H.inside){current=resolve();if(current&&dist()<7.5&&!((window.LuxPlayerCar840||window.LuxPlayerCar750)?.driving)){e.preventDefault();e.stopImmediatePropagation();enter()}}},true);
 let legacy=document.createElement('style');legacy.textContent='#homeEnter431{display:none!important}';document.head.appendChild(legacy);
 setInterval(tick,140);window.LuxHomeAccess840={resolve,enter,get current(){return current}}
}})();