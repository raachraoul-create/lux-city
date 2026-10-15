import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let boot=setInterval(()=>{
 const W=window.LuxWorld,PC=window.LuxPlayerCar840||window.LuxPlayerCar750;
 if(!W?.scene||!PC?.car||!window.LuxVehicleRebuild720?.active)return;
 clearInterval(boot);init(W,PC)
},260);
function init(W,PC){
 const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 const near=mobile?57:105,materials={},geometry=new Map(),records=[],rimMat=new Map();
 function mat(name,color,rough=.34,metal=.30){return materials[name]||(materials[name]=new T.MeshStandardMaterial({color,roughness:rough,metalness:metal}))}
 const rubber=mat('rubber',0x171b1e,.82,.03),chrome=mat('chrome',0xb8c0c6,.21,.76),black=mat('black',0x1c2429,.38,.18),disc=mat('disc',0x586067,.53,.53),darkChrome=mat('darkChrome',0x525f69,.26,.58),lamp=mat('headlamp',0xe2f2fb,.18,.14),red=mat('red',0x9c1724,.17,.09);
 lamp.emissive.setHex(0xc6e7ff);lamp.emissiveIntensity=.26;
 function box(w,h,d){
  const key=[w,h,d].map(v=>v.toFixed(3)).join(':');
  if(!geometry.has(key)){
    const g=new T.BoxGeometry(w,h,d);geometry.set(key,g)
  }
  return geometry.get(key)
 }
 function put(parent,geo,material,x,y,z){
  const m=new T.Mesh(geo,material);m.position.set(x,y,z);m.receiveShadow=false;m.castShadow=false;parent.add(m);return m
 }
 function B(parent,w,h,d,material,x,y,z){return put(parent,box(w,h,d),material,x,y,z)}
 function wheelAppearance(cls,idx){
  if(cls==='van'||cls==='pickup')return idx%3===0?'steel':'offroad';
  if(cls==='sport'||cls==='coupe')return idx%2===0?'turbine':'sport';
  if(cls==='suv'||cls==='crossover')return idx%2===0?'offroad':'split';
  if(cls==='wagon')return idx%2===0?'split':'touring';
  return ['touring','split','sport'][idx%3]
 }
 function rim(wheel,r,appearance){
  const old=wheel.getObjectByName('PremiumRim960');
  if(old&&wheel.userData.rimAppearance===appearance)return;
  if(old)wheel.remove(old);
  const sign=Math.sign(wheel.position.x)||1,face=sign*.075;
  for(const c of [...wheel.children].slice(1)){wheel.remove(c)}
  const root=new T.Group();root.name='PremiumRim960';root.position.x=face;wheel.add(root);
  wheel.userData.rimAppearance=appearance;
  const steel=appearance==='steel',sport=appearance==='sport'||appearance==='turbine';
  const count=appearance==='turbine'?9:appearance==='split'?7:appearance==='offroad'?6:steel?8:appearance==='touring'?5:5;
  const alloy=steel?darkChrome:sport?chrome:appearance==='offroad'?darkChrome:chrome;
  const rr=Math.max(.24,r),back=put(root,new T.CylinderGeometry(rr*.69,rr*.69,.034,20),black,0,0,0);back.rotation.z=Math.PI/2;
  const rotor=put(root,new T.CylinderGeometry(rr*.60,rr*.60,.037,20),disc,sign*.021,0,0);rotor.rotation.z=Math.PI/2;
  const hoop=put(root,new T.TorusGeometry(rr*.73,rr*.047,6,24),alloy,sign*.045,0,0);hoop.rotation.y=Math.PI/2;
  for(let k=0;k<count;k++){
    const a=k*Math.PI*2/count,ang=appearance==='turbine'?.23:0,mid=rr*.29;
    const spoke=B(root,appearance==='split'?.019:.036,rr*(steel?.39:.52),appearance==='offroad'?.068:.042,alloy,sign*.061,Math.cos(a)*mid,Math.sin(a)*mid);
    spoke.rotation.x=a+ang;
    if(appearance==='split'){
      const twin=B(root,.015,rr*.42,.025,alloy,sign*.065,Math.cos(a+.12)*mid,Math.sin(a+.12)*mid);
      twin.rotation.x=a+.12
    }
  }
  const cap=put(root,new T.CylinderGeometry(rr*.16,rr*.16,.052,14),steel?black:chrome,sign*.080,0,0);cap.rotation.z=Math.PI/2;
  if(appearance==='offroad')for(let i=0;i<6;i++){
    const a=i*Math.PI/3;const rivet=put(root,new T.SphereGeometry(.017,6,5),chrome,sign*.075,Math.cos(a)*rr*.57,Math.sin(a)*rr*.57);rivet.scale.x=.5
  }
 }
 function plate(root,z,text){
  const c=document.createElement('canvas');c.width=256;c.height=64;const ctx=c.getContext('2d');
  ctx.fillStyle='#f4e1a1';ctx.fillRect(0,0,256,64);ctx.fillStyle='#192129';ctx.textAlign='center';ctx.font='bold 36px Arial';ctx.fillText(text,128,46);
  const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;
  const m=put(root,new T.PlaneGeometry(.66,.16),new T.MeshBasicMaterial({map:tx,side:T.DoubleSide}),0,.51,z);
  return m
 }
 function bodyStyle(car,player){
  return player?(window.LuxVehicles?.activeVehicle?.bodyStyle||'sedan'):(car.userData.vehicleClass||'sedan')
 }
 function upgrade(car,idx,player=false){
  if(!car||car.userData?.emergency500)return;
  const name=player?'PlayerCarPremium960':'VehiclePremium960',body=car.getObjectByName('VehicleBody1200');if(!body)return;
  const cls=bodyStyle(car,player),existing=car.getObjectByName(name);
  if(existing&&existing.userData.style===cls)return;
  if(existing){car.remove(existing);for(let i=records.length-1;i>=0;i--)if(records[i].car===car)records.splice(i,1)}
  const w=player?1.88:(car.userData.halfW||.94)*2,l=player?4.76:(car.userData.halfL||2.3)*2,paint=body.userData.bodyPaint;
  if(!paint)return;
  const g=new T.Group();g.name=name;g.userData.style=cls;g.visible=player||Math.hypot(car.position.x-W.player.position.x,car.position.z-W.player.position.z)<near;car.add(g);
  const front=-l/2-.035,rear=l/2+.035,fuel=player?window.LuxVehicles?.activeVehicle?.fuelType:car.userData.fuelType;
  const raised=['suv','crossover','pickup','van'].includes(cls);
  const sporty=['sport','coupe'].includes(cls);
  const family=['wagon','sedan','hatch'].includes(cls);
  const variant=player?(['sport','coupe'].includes(cls)?3:cls==='suv'?2:cls==='van'?1:0):idx%4;
  const bumperY=raised?.59:sporty?.43:.51;
  // Integrated, class-dependent fascia shapes.
  B(g,w*(raised?.86:sporty?.91:.83),.14,.16,paint,0,bumperY,front+.035);
  B(g,w*.75,.12,.13,paint,0,bumperY,rear-.03);
  if(fuel==='electric'){
    B(g,w*.59,.042,.04,chrome,0,bumperY+.12,front-.055)
  }else{
    B(g,w*(sporty?.62:raised?.51:.46),raised?.23:.14,.065,black,0,bumperY+.035,front-.07);
    const count=variant===2?6:variant===1?4:3;
    for(let k=0;k<count;k++)B(g,.020,.12,.035,darkChrome,(k-(count-1)/2)*w*.07,bumperY+.035,front-.112)
  }
  if(raised)B(g,w*.60,.055,.13,chrome,0,bumperY-.08,front-.065);
  if(sporty)B(g,w*.73,.05,.20,black,0,.38,front-.08);
  if(cls==='van')B(g,w*.78,.17,.055,black,0,.61,front-.065);
  const tailMaterials=[],ty=raised?.88:sporty?.65:.74,hy=raised?.96:sporty?.68:.78;
  for(const sx of[-1,1]){
   const lx=sx*w*.29,headWidth=w*(variant===0?.22:variant===2?.15:.18),shape=variant===1?.13:.075;
   const head=B(g,headWidth,shape,.047,lamp,lx,hy,front-.075);head.rotation.z=sx*(variant===0?.13:variant===3?.075:0);
   if(variant===2){
     B(g,headWidth*.67,.047,.048,chrome,lx,hy-.11,front-.080)
   }else if(variant===3){
     B(g,headWidth*.65,.028,.048,lamp,lx,hy+.075,front-.087)
   }
   const stop=mat('stop'+idx+'_'+sx+(player?'P':''),0xb41422,.19,.10);
   stop.emissive.setHex(0xff2338);
   const tail=B(g,w*(variant===3?.19:.18),variant===1?.18:.09,.048,stop,sx*w*.32,ty,rear+.06);
   tail.rotation.z=-sx*(variant===0?.10:0);tailMaterials.push(stop);
   // Side sill and wheel-arch moulding are sport-specific or SUV-specific.
   B(g,.036,raised?.12:.075,l*.51,raised?black:rubber,sx*w*.487,raised?.51:.40,0);
   if(raised){B(g,.055,.045,l*.30,chrome,sx*w*.38,cls==='van'?2.00:1.73,0)}
   if(sporty){B(g,.03,.09,l*.42,black,sx*w*.47,.41,0)}
   if(family){
     B(g,.023,.021,.15,chrome,sx*w*.487,.84,-l*.11);
     B(g,.023,.021,.15,chrome,sx*w*.487,.84,l*.09)
   }
  }
  if(variant===3||fuel==='electric')B(g,w*.48,.027,.049,red,0,ty,rear+.077);
  if(sporty){
   B(g,w*.61,.045,.24,black,0,.93,rear+.08);
   for(const sx of[-1,1])B(g,.045,.17,.05,black,sx*w*.24,.82,rear)
  }else if(cls==='wagon'||cls==='hatch'){
   B(g,w*.65,.035,.15,black,0,cls==='wagon'?1.58:1.52,rear-l*.11)
  }else if(cls==='suv'||cls==='crossover'){
   B(g,w*.62,.045,.10,black,0,cls==='suv'?1.80:1.67,rear-l*.14)
  }
  // Number plate and trim remain legible at close distance only.
  plate(g,front-.12,'LC '+String(1200+idx));
  plate(g,rear+.12,'LC '+String(1200+idx));
  const wheels=player?car.userData.wheels710:car.userData.wheels720;
  const appearance=wheelAppearance(cls,idx);
  for(const wheel of wheels||[])rim(wheel,Math.max(.28,wheel.position.y-.04),appearance);
  records.push({car,style:cls,group:g,paint,tailMaterials,player})
 }
 function refresh(){
  for(let i=0;i<W.cars.length;i++){
   const c=W.cars[i];if(!c?.visible)continue;
   if(Math.hypot(c.position.x-W.player.position.x,c.position.z-W.player.position.z)<near+8)upgrade(c,i,false)
  }
  upgrade(PC.car,99,true)
 }
 refresh();const checker=setInterval(refresh,1800);let acc=0;
 W.registerTick?.(dt=>{
  acc+=dt;if(acc<.22)return;acc=0;
  const h=window.LuxLife?.state?.hour??12,night=h>=19||h<7;
  lamp.emissiveIntensity=night?.85:.22;
  const active=window.LuxVehicles?.activeVehicle;
  for(const row of records){
   if(!row.player){
    row.group.visible=row.car.visible!==false&&Math.hypot(row.car.position.x-W.player.position.x,row.car.position.z-W.player.position.z)<near;
   }else{
    row.group.visible=true;
    row.paint?.color.setHex(Number(active?.colorHex??0xf4f4f1))
   }
   if(!row.group.visible)continue;
   const braking=row.player?(PC.driving&&Math.abs(PC.speed)<.25):(row.car.userData.speedNow??1)<.35;
   for(const m of row.tailMaterials)m.emissiveIntensity=braking?1.45:night?.46:.17
  }
 });
 window.LuxVehiclePremium960=window.LuxVehiclePremium980=window.LuxVehiclePremium1000=window.LuxVehiclePremium1120={version:'11.2.0',player:PC.car,traffic:W.cars,refresh,rimStyles:['touring','split','sport','turbine','offroad','steel']}
}
