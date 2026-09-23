(()=>{let done=false,tries=0,q=setInterval(()=>{if(done){clearInterval(q);return}tries++;let A=window.LuxAccount,H=window.LuxHomes520,I=window.LuxHomeInterior782||window.LuxHomeInterior771,C=window.LuxCivic404,SA=window.LuxServerAssets740||window.LuxServerAssets710,W=window.LuxWorld;if(!A?.session?.user?.id||!H||!I?.sync||!W?.player||!document.body.classList.contains('game-ready')){if(tries>240)clearInterval(q);return}
let id=null,uid=A.session.user.id,server=(SA?.serverHomes||[]).find(h=>h.owner===uid||h.tenant===uid);
if(server)id=server.kind==='haus'?'family':'flat';
if(!id&&['studio','flat','family'].includes(C?.state?.home?.id))id=C.state.home.id;
if(!id)id='flat';
if(H.inside)H.leave();
H.enter(id,false);
setTimeout(()=>{I.sync?.();let d=id==='studio'?8:id==='family'?12:10;W.player.position.set(-430,0,430-(d/2-1.35));W.yaw=0;I.root.visible=true},80);
setTimeout(()=>{if(!H.inside||I.activeId!==id){H.enter(id,false);I.sync?.()}done=true;clearInterval(q)},650);
window.LuxHomeStart784={home:id,get done(){return done}}},100)})();