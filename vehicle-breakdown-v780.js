(()=>{let q=setInterval(()=>{let W=window.LuxWorld,V=window.LuxVehicles,pc=window.LuxPlayerCar840,B=window.LuxVehicleBusiness760||window.LuxVehicleBusiness750,L=window.LuxLife;if(!W||!V||!pc?.car||!B?.workshop||!L)return;clearInterval(q);init(W,V,pc,B,L)},350);
function init(W,V,pc,B,L){
 const reasons=['Antriebssystem gestört','Kühlung gestört','12-V-System ausgefallen','Reifen-/Fahrwerksfehler','Motorelektronik gestört'];
 let lastNotice=0;
 const box=document.createElement('div');box.id='breakdown780';box.style='position:fixed;left:50%;bottom:92px;transform:translateX(-50%);z-index:72;background:#491919ed;color:#fff;border:1px solid #ff8a6f66;border-radius:12px;padding:9px 11px;font:800 11px Arial;display:none;box-shadow:0 8px 25px #0008';box.innerHTML='<span id="breakdownText780">⚠ Fahrzeugpanne</span> <button id="tow780" style="margin-left:8px;padding:6px 8px;background:#f0a51a;color:#111">ABSCHLEPPDIENST</button>';document.body.appendChild(box);
 function active(){return V.activeVehicle}
 function towCost(){
   let d=Math.hypot(pc.car.position.x-B.workshop.bay.x,pc.car.position.z-B.workshop.bay.z);
   return Math.max(90,Math.min(480,Math.round(70+d*.42)))
 }
 async function save(v){V.save?.();await (window.LuxVehicleLife750||window.LuxVehicleLife740)?.push?.(v)}
 function trigger(v,reason){
   if(!v||v.breakdown)return false;
   v.breakdown={reason:reason||reasons[Math.floor(Math.random()*reasons.length)],at:Date.now(),x:pc.car.position.x,z:pc.car.position.z};
   V.save?.();save(v);lastNotice=Date.now();render();return true
 }
 async function tow(){
   let v=active();if(!v?.breakdown)return;
   let cost=towCost();if((L.state.cash||0)<cost)return alert('Nicht genug Privatgeld für den Abschleppdienst · '+cost.toLocaleString('de-DE')+' €');
   if(pc.driving)pc.enter();
   L.addExpense(cost);
   pc.setPose(B.workshop.bay.x,B.workshop.bay.z,B.workshop.bay.rot||0);
   v.parkedX=B.workshop.bay.x;v.parkedZ=B.workshop.bay.z;v.parkedRot=B.workshop.bay.rot||0;v.parkingType='workshop';v.parkingLabel='Werkstatt · Servicebucht';
   await save(v);render();setTimeout(()=>B.openWorkshop?.(),120);
 }
 function render(){
   let v=active(),on=!!v?.breakdown;box.style.display=on?'block':'none';
   if(on){document.getElementById('breakdownText780').textContent='⚠ '+v.breakdown.reason+' · Abschleppen '+towCost().toLocaleString('de-DE')+' €'}
 }
 document.getElementById('tow780').onclick=tow;
 addEventListener('luxcity:vehicle-wear-check',e=>{
   let v=e.detail?.vehicle||active();if(!v||v.breakdown)return;
   let c=Number(v.condition??100);if(c>=35)return;
   let chance=c<12?.32:c<20?.20:c<28?.11:.055;
   if(Math.random()<chance)trigger(v)
 });
 addEventListener('luxcity:car-impact',e=>{
   let v=active();if(!v||v.breakdown)return;let c=Number(v.condition??100),sp=Number(e.detail?.speed||0);
   if(c<24&&sp>8&&Math.random()<(c<12?.38:.16))trigger(v,'Unfallschaden · Fahrzeug nicht fahrbereit')
 });
 setInterval(render,400);
 window.LuxVehicleBreakdown780={version:'7.8.0',trigger,tow,towCost,get active(){return active()?.breakdown||null}}
}})();
