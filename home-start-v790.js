(()=>{let started=false,attempts=0,target=null;
const sizes={studio:[10,8],flat:[14,10],family:[18,12]},C={x:-430,z:430};
function pickHome(){
  let A=window.LuxAccount,Civic=window.LuxCivic404,SA=window.LuxServerAssets740||window.LuxServerAssets710,L=window.LuxLife?.state;
  let uid=A?.session?.user?.id;if(!uid||!Civic)return'flat';
  let server=(SA?.serverHomes||[]).find(h=>h.owner===uid||h.tenant===uid);
  if(server)return server.kind==='haus'?'family':'flat';
  let id=Civic.state?.home?.id;if(['studio','flat','family'].includes(id))return id;
  if((L?.starterMonths||0)>0){
    let starter=Civic.homes?.find?.(h=>h.id==='flat');
    if(starter){Civic.state.home={...starter,name:'Gemeinde-Startwohnung'};Civic.state.owned=false;Civic.save?.()}
    return'flat'
  }
  return'flat'
}
function inside(id){
  let W=window.LuxWorld,H=window.LuxHomes520,I=window.LuxHomeInterior782||window.LuxHomeInterior771,[w,d]=sizes[id]||sizes.flat,p=W?.player?.position;
  return !!(W&&H?.inside&&I?.activeId===id&&p&&Math.abs(p.x-C.x)<w/2-.4&&Math.abs(p.z-C.z)<d/2-.4)
}
function enterHome(){
  if(started)return;
  if(!document.body.classList.contains('game-ready'))return;
  let A=window.LuxAccount,W=window.LuxWorld,H=window.LuxHomes520,I=window.LuxHomeInterior782||window.LuxHomeInterior771;
  if(!A?.session?.user?.id||!W?.player||!H||!I?.sync)return;
  target=pickHome();let [w,d]=sizes[target]||sizes.flat;attempts++;
  if(H.inside&&H.currentHomeId!==target)H.leave();
  if(!H.inside||I.activeId!==target)H.enter(target,false);
  I.sync?.();
  W.player.position.set(C.x,0,C.z-(d/2-1.35));
  W.yaw=0;if(I.root)I.root.visible=true;
  setTimeout(()=>{
    if(inside(target)){started=true;sessionStorage.removeItem('luxcity_manual_entry');window.dispatchEvent(new CustomEvent('luxcity:home-ready',{detail:{home:target}}))}
    else if(attempts<25)setTimeout(enterHome,180)
  },180)
}
let q=setInterval(()=>{if(started){clearInterval(q);return}enterHome()},120);
addEventListener('luxcity:manual-login',()=>{started=false;attempts=0;setTimeout(enterHome,50)});
window.LuxHomeStart790={enter:enterHome,get home(){return target},get started(){return started},get attempts(){return attempts},inside:()=>target?inside(target):false}
})();