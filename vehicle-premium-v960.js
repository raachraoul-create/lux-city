import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let boot=setInterval(()=>{const W=window.LuxWorld,PC=window.LuxPlayerCar840||window.LuxPlayerCar750;
 if(!W?.scene||!PC?.car||!window.LuxVehicleRebuild720?.active)return;
 clearInterval(boot);init(W,PC);
},260);
function init(W,PC){
 const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 const mat=(color,roughness=.35,metalness=.2)=>new T.MeshStandardMaterial({color,roughness,metalness});
 const rubber=mat(0x16191c,.78,.02),dark=mat(0x20272b,.38,.24),chrome=mat(0xc0c6ca,.23,.75),disc=mat(0x71777a,.44,.7);
 const lamp=mat(0xe0f1fc,.18,.08);lamp.emissive.setHex(0xe0f1ff);
 const geom=new Map(),lights=[],records=[];
 function box(w,h,d){const key=[w,h,d].join(':');if(geom.has(key))return geom.get(key);const b=Math.min(w,h,d)*.20,s=new T.Shape();
 s.moveTo(-w/2+b,-h/2+b);s.lineTo(w/2-b,-h/2+b);s.lineTo(w/2-b,h/2-b);s.lineTo(-w/2+b,h/2-b);s.closePath();
 const g=new T.ExtrudeGeometry(s,{depth:d-2*b,bevelEnabled:true,bevelThickness:b,bevelSize:b,bevelSegments:mobile?1:3,steps:1});g.translate(0,0,-d/2+b);geom.set(key,g);return g;}
 function add(g,m,x,y,z,parent){const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=!mobile;o.receiveShadow=true;parent.add(o);return o;}
 function plate(parent,z,label){const c=document.createElement('canvas');c.width=256;c.height=64;const ctx=c.getContext('2d');ctx.fillStyle='#f1d45a';ctx.fillRect(0,0,256,64);ctx.fillStyle='#18212a';ctx.font='bold 37px Arial';ctx.textAlign='center';ctx.fillText(label,128,46);const texture=new T.CanvasTexture(c);texture.colorSpace=T.SRGBColorSpace;
 const o=add(new T.PlaneGeometry(.62,.15),new T.MeshBasicMaterial({map:texture}),0,.49,z,parent);o.rotation.y=z<0?Math.PI:0;}
 function rim(wheel,r){if(wheel.getObjectByName('PremiumRim960'))return;
 for(const o of [...wheel.children].slice(1))wheel.remove(o);
 const g=new T.Group();g.name='PremiumRim960';g.position.x=Math.sign(wheel.position.x)*.075;wheel.add(g);
 add(new T.CylinderGeometry(r*.68,r*.68,.028,24),disc,0,0,0,g).rotation.z=Math.PI/2;
 add(new T.TorusGeometry(r*.70,r*.045,8,28),chrome,0,0,0,g).rotation.y=Math.PI/2;
 for(let k=0;k<5;k++){const a=k*Math.PI*2/5;const o=add(box(.038,r*.58,.055),chrome,Math.sign(wheel.position.x)*.022,Math.cos(a)*r*.33,Math.sin(a)*r*.33,g);o.rotation.x=a;}
 add(new T.CylinderGeometry(r*.14,r*.14,.055,16),dark,0,0,0,g).rotation.z=Math.PI/2;
 }
 function upgrade(v,index,isPlayer=false){
  if(v.userData.emergency500)return;const name=isPlayer?'PlayerCarPremium960':'VehiclePremium960';if(v.getObjectByName(name))return;
  const body=v.getObjectByName('VehicleBody1200');if(!body)return;
  const paint=body.userData.bodyPaint,w=isPlayer?1.88:v.userData.halfW*2,l=isPlayer?4.76:v.userData.halfL*2;
  const g=new T.Group();g.name=name;v.add(g);v.userData.vehiclePremium960=true;
  const front=-l/2-.025,rear=l/2+.025;
  // Bumper shoulders follow the width of the tapered body ends.
  add(box(w*.82,.16,.15),paint,0,.58,front+.035,g);add(box(w*.82,.16,.15),paint,0,.57,rear-.035,g);
  add(box(w*.66,.075,.12),dark,0,.39,front,g);add(box(w*.64,.075,.12),dark,0,.39,rear,g);
  add(box(w*.38,.095,.045),dark,0,.57,front-.055,g);
  for(const sx of[-1,1]){
   add(box(.04,.095,l*.43),rubber,sx*w*.485,.37,0,g);
   const head=add(box(w*.19,.085,.055),lamp,sx*w*.285,.73,front-.045,g);head.rotation.z=sx*.09;
   const rearMat=mat(0xa31320,.23,.08);rearMat.emissive.setHex(0xff1524);
   add(box(w*.19,.072,.055),rearMat,sx*w*.285,.71,rear+.04,g);
   lights.push({material:rearMat,car:v,player:isPlayer});
   add(box(.027,.032,.17),chrome,sx*w*.497,.87,-l*.095,g);add(box(.027,.032,.17),chrome,sx*w*.497,.87,l*.105,g);
  }
  plate(g,front-.085,'LC '+String(1200+index));plate(g,rear+.085,'LC '+String(1200+index));
  const wheels=isPlayer?v.userData.wheels710:v.userData.wheels720;
  for(const wheel of wheels||[])rim(wheel,Math.max(.30,wheel.position.y-.04));
  records.push({car:v,paint,player:isPlayer});
 }
 function refresh(){W.cars.forEach((v,i)=>upgrade(v,i));upgrade(PC.car,99,true);}
 refresh();setInterval(refresh,1400);
 W.registerTick?.(dt=>{const h=window.LuxLife?.state?.hour??12,night=h>=19||h<7;
  lamp.emissiveIntensity=night?1.05:.28;
  for(const l of lights){const braking=l.player?(PC.driving&&Math.abs(PC.speed)<.2):(l.car.userData.speedNow??1)<.3;l.material.emissiveIntensity=braking?1.5:night?.55:.16;}
  const active=window.LuxVehicles?.activeVehicle;for(const r of records)if(r.player)r.paint.color.setHex(Number(active?.colorHex??0xf4f4f1));
 });
 window.LuxVehiclePremium960=window.LuxVehiclePremium980=window.LuxVehiclePremium1000={version:'12.0.0',player:PC.car,traffic:W.cars};
}
