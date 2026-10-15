import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{let W=window.LuxWorld,PC=window.LuxPlayerCar840||window.LuxPlayerCar750;if(!W?.cars||!PC?.car||!window.LuxVehiclePremium960)return;clearInterval(q);init(W,PC)},360);
function init(W,PC){
 const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 const M=(c,r=.5,m=.08)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m});
 const leather=[M(0x191c21,.66),M(0x342d27,.68),M(0xd6d1c9,.68),M(0x333b3d,.66)],black=M(0x151c22),metal=M(0xb1bac0,.28,.56),seam=M(0x7b8084,.72),wood=M(0x64513c,.65,.2);
 const geom=new Map();
 function box(w,h,d){let key=[w,h,d].join(':');if(!geom.has(key))geom.set(key,new T.BoxGeometry(w,h,d));return geom.get(key)}
 function A(parent,g,m,x,y,z){let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=false;parent.add(o);return o}
 const B=(parent,w,h,d,m,x,y,z)=>A(parent,box(w,h,d),m,x,y,z);
 function seat(g,x,z,m,k=1){
  B(g,.48*k,.16,.52*k,m,x,.73,z);
  let back=B(g,.45*k,.60,.14,m,x,1.06,z+.19*k);back.rotation.x=-.10;
  B(g,.27*k,.14,.13,m,x,1.40,z+.20*k);
  B(g,.016,.46,.014,seam,x,1.04,z+.265*k)
 }
 function wheel(g,x,y,z){
  let grp=new T.Group();grp.position.set(x,y,z);g.add(grp);grp.name='SteeringWheel860';
  let rim=A(grp,new T.TorusGeometry(.17,.023,8,24),black,0,0,0);rim.rotation.y=Math.PI/2;
  let hub=A(grp,new T.CylinderGeometry(.048,.048,.065,12),metal,0,0,0);hub.rotation.z=Math.PI/2;
  for(let a=0;a<3;a++){const sp=B(grp,.022,.135,.029,metal,0,-.015,0);sp.rotation.x=a*2*Math.PI/3}
  return grp
 }
 function fleetTexture(){
  let cv=document.createElement('canvas');cv.width=256;cv.height=128;let x=cv.getContext('2d');x.fillStyle='#09141b';x.fillRect(0,0,256,128);x.fillStyle='#8adcf1';x.fillRect(12,10,232,6);x.font='bold 25px Arial';x.fillStyle='#f0f7f9';x.fillText('LUX CITY',20,56);x.fillStyle='#46697a';x.fillRect(20,80,175,7);x.fillRect(20,98,211,6);let tx=new T.CanvasTexture(cv);tx.colorSpace=T.SRGBColorSpace;return tx
 }
 const sharedScreen=new T.MeshBasicMaterial({map:fleetTexture(),toneMapped:false});
 function trafficCar(car,i){
  if(!car||car.userData?.emergency500||car.getObjectByName('VehicleCabin860'))return;
  const style=car.userData.vehicleClass||'sedan',w=(car.userData.halfW||.94)*2,l=(car.userData.halfL||2.3)*2,mat=leather[i%leather.length];
  const g=new T.Group();g.name='VehicleCabin860';car.add(g);
  const k=style==='sport'||style==='coupe'?.87:style==='van'?1.04:.95;
  for(const x of[-w*.20,w*.20])seat(g,x,-.22,mat,k);
  if(!['van','pickup'].includes(style))for(const x of[-w*.20,w*.20])seat(g,x,.57,mat,.89);
  B(g,w*.72,.15,.40,black,0,1.04,-l*.24);
  B(g,.19,.17,.56,['suv','wagon'].includes(style)?wood:metal,0,.83,.08);
  wheel(g,-w*.19,1.16,-l*.20);
  let screen=A(g,new T.PlaneGeometry(.37,.18),sharedScreen,.03,1.21,-l*.25);screen.rotation.x=-.12;
  g.visible=Math.hypot(car.position.x-W.player.position.x,car.position.z-W.player.position.z)<(mobile?28:50)
 }
 function createPlayer(){
  const car=PC.car,old=car.getObjectByName('PlayerCabin860');if(old)return old;
  const g=new T.Group();g.name='PlayerCabin860';car.add(g);
  const mat=leather[2];
  for(const z of[-.21,.67])for(const x of[-.40,.40])seat(g,x,z,mat,.98);
  B(g,1.49,.17,.43,black,0,1.05,-.67);B(g,1.20,.027,.05,wood,0,1.14,-.79);
  B(g,.24,.18,.94,black,0,.80,.19);B(g,.18,.027,.59,metal,0,.95,.15);
  const steering=wheel(g,-.40,1.19,-.66);
  const cv=document.createElement('canvas');cv.width=512;cv.height=256;
  const texture=new T.CanvasTexture(cv);texture.colorSpace=T.SRGBColorSpace;
  const screenMat=new T.MeshBasicMaterial({map:texture,toneMapped:false,side:T.DoubleSide});
  const scr=A(g,new T.PlaneGeometry(.57,.32),screenMat,.025,1.25,-.76);scr.rotation.x=-.12;
  const cluster=A(g,new T.PlaneGeometry(.29,.145),screenMat,-.4,1.24,-.75);cluster.rotation.x=-.08;
  for(const sx of[-1,1]){B(g,.039,.36,1.50,black,sx*.87,1.03,.12);B(g,.02,.04,1.40,metal,sx*.86,1.18,.12)}
  g.userData.live860={ctx:cv.getContext('2d'),texture,steering};return g
 }
 const cabin=createPlayer();let timer=0,nearTick=0,lastStyle='';
 function display(){
  const d=cabin.userData.live860;if(!d)return;
  const x=d.ctx,v=window.LuxVehicles?.activeVehicle,n=Math.round(Math.abs(PC.speed||0)*3.6),energy=Math.max(0,Math.min(100,Number(v?.energy??100)));
  x.fillStyle='#071419';x.fillRect(0,0,512,256);x.fillStyle='#60c7e4';x.fillRect(0,0,512,9);
  x.fillStyle='#e7f5fb';x.font='bold 27px Arial';x.fillText(v?.name||'LUX CITY',22,46);
  x.font='bold 87px Arial';x.fillText(String(n),22,150);x.font='bold 23px Arial';x.fillText('km/h',215,142);
  x.fillStyle='#b4d4dc';x.font='bold 19px Arial';x.fillText((v?.fuelType==='electric'?'AKKU':'TANK')+' '+Math.round(energy)+'%',24,200);
  x.fillText(Math.round(Number(v?.mileageKm||0)).toLocaleString('de-DE')+' km',320,144);
  x.fillStyle='#274651';x.fillRect(24,220,460,12);x.fillStyle=energy<15?'#f0806b':'#72d7b9';x.fillRect(24,220,460*energy/100,12);
  d.texture.needsUpdate=true
 }
 W.registerTick(dt=>{
  timer+=dt;nearTick+=dt;
  if(nearTick>.85){nearTick=0;for(let i=0;i<W.cars.length;i++){
   const c=W.cars[i];if(c?.visible!==false&&Math.hypot(c.position.x-W.player.position.x,c.position.z-W.player.position.z)<(mobile?29:51))trafficCar(c,i)
  }
  const style=window.LuxVehicles?.activeVehicle?.bodyStyle||'sedan';
  if(style!==lastStyle){lastStyle=style;const m=['suv','van','crossover'].includes(style)?leather[1]:['sport','coupe'].includes(style)?leather[0]:leather[2];
   cabin.traverse(o=>{if(o.isMesh&&leather.includes(o.material))o.material=m})}
  }
  if(cabin.userData.live860?.steering){const k=W.keys||{},turn=((k.d||k.arrowright)||0)-((k.a||k.arrowleft)||0),sw=cabin.userData.live860.steering;sw.rotation.z+=(turn*.32-sw.rotation.z)*Math.min(1,dt*6)}
  if(timer>.25){timer=0;display()}
 });
 window.LuxVehicleCabin860=window.LuxVehicleCabin1230={version:'12.3.0',player:PC.car,traffic:W.cars}
}
