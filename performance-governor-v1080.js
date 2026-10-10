(()=>{
let q=setInterval(()=>{let W=window.LuxWorld;if(!W?.renderer||!W?.scene||!W?.player)return;clearInterval(q);init(W)},420);
function init(W){
 const R=W.renderer,S=W.scene,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 let quality=mobile?'balanced':'balanced',frames=0,last=performance.now(),bad=0,good=0,lodAt=0,shadowFrame=0;
 const decorativeRoots=['LuxResidentialYards1040','LuxIndustrial950','LuxCommercial790','LuxUrban810','LuxCitySquare900','LuxParkingVisual920','LuxRoadWear870','LuxEmergencyBuildings880','LuxMarketVisual940','LuxFuelVisual930','LuxDealerYard1060','LuxWorkshopYard1050'];
 const shadowless=['LuxNature830','LuxAtmosphere780','LuxIntersection820','LuxTransitVisual970','LuxArena980','LuxPremium940','LuxVisual970'];
 function ratio(level){return level==='low'?(mobile?.62:.72):level==='balanced'?(mobile?.74:.84):(mobile?.88:.94)}
 function shadowSize(level){return level==='low'?(mobile?384:640):level==='balanced'?(mobile?512:1024):(mobile?768:1280)}
 function apply(level){
   quality=level;
   R.setPixelRatio(Math.min(devicePixelRatio||1,ratio(level)));
   R.setSize(innerWidth,innerHeight,false);
   if(R.shadowMap){
     R.shadowMap.enabled=mobile&&level!=='low';
     R.shadowMap.autoUpdate=false;
     R.shadowMap.needsUpdate=true;
   }
   if(W.sun?.shadow?.mapSize){
     const n=shadowSize(level);W.sun.shadow.mapSize.set(n,n);
     if(W.sun.shadow.map){W.sun.shadow.map.dispose?.();W.sun.shadow.map=null}
   }
   for(const name of shadowless){
     const root=S.getObjectByName(name);if(!root)continue;
     root.traverse?.(o=>{if(o.isMesh)o.castShadow=false});
   }
 }
 function lod(now){
   if(now-lodAt<800)return;lodAt=now;
   const p=W.player.position,max=quality==='low'?92:quality==='balanced'?145:205;
   const wp={x:0,y:0,z:0};
   for(const name of decorativeRoots){
     const root=S.getObjectByName(name);if(!root)continue;
     for(const c of root.children||[]){
       if(c.isLight)continue;
       c.updateWorldMatrix?.(true,false);if(c.matrixWorld?.elements){wp.x=c.matrixWorld.elements[12]||0;wp.z=c.matrixWorld.elements[14]||0}else{wp.x=c.position?.x||0;wp.z=c.position?.z||0}
       const d=Math.hypot(wp.x-p.x,wp.z-p.z);c.visible=d<max;
     }
   }
 }
 W.registerTick?.(()=>{
   frames++;shadowFrame++;
   if(R.shadowMap?.enabled&&shadowFrame>=(quality==='high'?4:7)){R.shadowMap.needsUpdate=true;shadowFrame=0}
   const now=performance.now();lod(now);if(now-last<1800)return;
   const fps=frames*1000/(now-last);frames=0;last=now;
   if(fps<(mobile?40:48)){bad++;good=0}else if(fps>(mobile?52:57)){good++;bad=0}else{bad=Math.max(0,bad-1);good=Math.max(0,good-1)}
   if(bad>=2){if(quality==='high')apply('balanced');else if(quality==='balanced')apply('low');bad=0}
   else if(good>=4){if(quality==='low')apply('balanced');else if(quality==='balanced')apply('high');good=0}
   window.LuxSmooth1080.lastFps=Math.round(fps);
 });
 addEventListener('resize',()=>apply(quality));
 apply(quality);
 window.LuxSmooth1080={version:'10.8.1',get quality(){return quality},lastFps:0,apply}
}
})();