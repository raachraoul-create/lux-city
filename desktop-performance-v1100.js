(()=>{
let q=setInterval(()=>{let W=window.LuxWorld;if(!W?.renderer||!W?.scene||!W?.cars)return;clearInterval(q);init(W)},1000);
function init(W){
 const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;if(mobile){window.LuxDesktopPerformance1100={version:'11.0.0',mobile:true};return}
 const R=W.renderer,S=W.scene;
 // Desktop was doing much more shadow work than mobile. Keep contact/lighting but remove the expensive realtime shadow map by default.
 if(R.shadowMap){R.shadowMap.enabled=false;R.shadowMap.autoUpdate=false}
 R.setPixelRatio(Math.min(devicePixelRatio||1,.92));R.setSize(innerWidth,innerHeight,false);
 const dynamic=new Set(),mark=o=>{if(!o)return;o.traverse?.(x=>dynamic.add(x));dynamic.add(o)};
 mark(W.player);for(const c of W.cars)mark(c);for(const p of W.npcs||[])mark(p);mark((window.LuxPlayerCar840||window.LuxPlayerCar750)?.car);mark(window.LuxCityActivity570?.bus);
 const avoid=/Weather|Atmosphere|Rain|Snow|Vehicle|Traffic|Player|Citizen|People|Bus|Transit/i;
 function freezeStatic(){
   S.updateMatrixWorld(true);let frozen=0;
   S.traverse(o=>{if(!o.isMesh||dynamic.has(o))return;let n=o.parent?.name||o.name||'';if(avoid.test(n))return;o.updateMatrix?.();o.matrixAutoUpdate=false;o.castShadow=false;frozen++});
   window.LuxDesktopPerformance1100.frozen=frozen
 }
 setTimeout(freezeStatic,800);setTimeout(freezeStatic,3500);
 // Do not let an older performance layer turn expensive shadows back on.
 const oldApply=window.LuxPerformance740?.apply;if(oldApply)window.LuxPerformance740.apply=(level)=>{oldApply(level);if(R.shadowMap)R.shadowMap.enabled=false;R.setPixelRatio(Math.min(devicePixelRatio||1,level==='low'?.72:level==='medium'?.84:.94))};
 window.LuxDesktopPerformance1100={version:'11.0.0',mobile:false,frozen:0,freezeStatic}
}
})();