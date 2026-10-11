(()=>{
let q=setInterval(()=>{let W=window.LuxWorld;if(!W?.cars?.length||!W?.player)return;clearInterval(q);init(W)},900);
function init(W){
 const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 let acc=0,near=mobile?58:95,cabin=mobile?34:58;
 W.registerTick?.((dt)=>{acc+=dt;if(acc<.38)return;acc=0;let p=W.player.position;
   for(const c of W.cars){
     if(!c||c.userData?.emergency500)continue;
     let d=Math.hypot(c.position.x-p.x,c.position.z-p.z);
     let premium=c.getObjectByName?.('VehiclePremium960'),cab=c.getObjectByName?.('VehicleCabin860');
     if(premium)premium.visible=d<near;
     const body=c.getObjectByName?.('VehicleBody1200');if(body)body.visible=true;
     if(cab)cab.visible=d<cabin;
     for(const w of c.userData?.wheels720||[]){let rim=w.getObjectByName?.('PremiumRim960');if(rim)rim.visible=d<near*.72}
   }
 });
 window.LuxVehicleLOD1120={version:'11.2.0',near,cabin}
}
})();