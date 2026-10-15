(()=>{
 const timer=setInterval(()=>{
  const W=window.LuxWorld,PC=window.LuxPlayerCar840||window.LuxPlayerCar750;
  if(!W?.camera||!PC?.car||!window.LuxVehicleCabin860)return;clearInterval(timer);init(W,PC)
 },300);
 function init(W,PC){
  const cam=W.camera,origFov=cam.fov,V=W.THREE.Vector3;
  const pos=new V(),forward=new V(),side=new V(),look=new V();
  let active=false,seenDriving=false,acc=0;
  const css=document.createElement('style');css.id='luxDriver1230Css';
  css.textContent=[
   '#luxDriver1230{position:fixed;right:max(10px,env(safe-area-inset-right));top:max(92px,env(safe-area-inset-top));z-index:26;padding:9px 12px!important;border:1px solid #ffffff55;border-radius:10px;background:#102433ee!important;color:#fff;font:bold 12px Arial!important;display:none;cursor:pointer}',
   '#luxDash1230{position:fixed;left:50%;bottom:max(0px,env(safe-area-inset-bottom));transform:translateX(-50%);width:min(530px,75vw);height:60px;z-index:19;display:none;align-items:center;justify-content:space-around;gap:15px;background:linear-gradient(#1b2b35,#091319);color:#e6f4fa;border-radius:16px 16px 0 0;border:1px solid #ffffff33;border-bottom:0;font:bold 12px Arial;pointer-events:none}',
   '#luxDash1230 strong{font-size:22px}#luxDash1230 small{display:block;color:#a3beca;font-size:10px}',
   '@media(max-height:460px) and (orientation:landscape){#luxDriver1230{top:49px;padding:7px!important;font-size:10px!important}#luxDash1230{width:48vw;height:44px}#luxDash1230 strong{font-size:16px}}'
  ].join('');
  document.head.appendChild(css);
  const button=document.createElement('button');button.id='luxDriver1230';button.type='button';button.textContent='FAHRERANSICHT / C';document.body.appendChild(button);
  const dash=document.createElement('div');dash.id='luxDash1230';dash.innerHTML='<div><strong id="luxSpd1230">0</strong><small>km/h</small></div><div><strong id="luxEng1230">100%</strong><small id="luxPower1230">AKKU</small></div><div><strong id="luxOdo1230">0 km</strong><small>KILOMETER</small></div>';document.body.appendChild(dash);
  const speed=dash.querySelector('#luxSpd1230'),energy=dash.querySelector('#luxEng1230'),power=dash.querySelector('#luxPower1230'),odo=dash.querySelector('#luxOdo1230');
  function set(v){active=!!v&&!!PC.driving;button.textContent=active?'AUSSENANSICHT / C':'FAHRERANSICHT / C';dash.style.display=active?'flex':'none';cam.fov=active?68:origFov;cam.updateProjectionMatrix()}
  button.onclick=()=>set(!active);
  addEventListener('keydown',e=>{if((e.code==='KeyC'||String(e.key).toLowerCase()==='c')&&!e.repeat&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName||'')&&PC.driving){e.preventDefault();set(!active)}});
  W.registerTick(dt=>{
   if(!PC.driving){if(active)set(false);button.style.display='none';seenDriving=false;return}
   button.style.display='block';if(!seenDriving){seenDriving=true;set(false)}
   if(!active)return;
   const car=PC.car;
   // Car physics defines forward as positive local Z. Follow it without changing controls.
   forward.set(0,0,1).applyQuaternion(car.quaternion);
   side.set(-1,0,0).applyQuaternion(car.quaternion);
   pos.copy(car.position).addScaledVector(forward,-.55).addScaledVector(side,.25);
   const raised=['suv','van','crossover','pickup'].includes(window.LuxVehicles?.activeVehicle?.bodyStyle);
   pos.y=car.position.y+(raised?2.30:1.92)*car.scale.y;
   look.copy(pos).addScaledVector(forward,19);look.y=pos.y-.20+(W.pitch||0)*2;
   cam.position.copy(pos);cam.lookAt(look);
   acc+=dt;if(acc<.13)return;acc=0;
   const v=window.LuxVehicles?.activeVehicle;
   speed.textContent=String(Math.round(Math.abs(PC.speed||0)*3.6));
   energy.textContent=Math.max(0,Math.round(Number(v?.energy??100)))+'%';
   power.textContent=v?.fuelType==='electric'?'AKKU':'TANK';
   odo.textContent=Math.round(Number(v?.mileageKm||0)).toLocaleString('de-DE')+' km'
  });
  window.LuxDriverView1230={version:'12.3.0',button,set,get active(){return active}}
 }
})();
