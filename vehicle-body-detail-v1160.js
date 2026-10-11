import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{let W=window.LuxWorld;if(!W?.cars?.length||!window.LuxVehicleRebuild740)return;clearInterval(q);init(W)},650);
function init(W){
 const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900,near=mobile?54:82;
 const M=(c,r=.42,m=.16,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const glass=M(0x263b47,.12,.32),dark=M(0x161b20,.34,.38),metal=M(0xb2b7ba,.22,.68),red=M(0x8e1118,.18,.08,0xff1420,.22),white=M(0xeef8ff,.12,.08,0xffffff,.28);
 const A=(g,m,x,y,z,p)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=true;p.add(o);return o};
 function addCar(v,i){
   if(v.userData.detail1160)return;v.userData.detail1160=true;
   const cls=v.userData.vehicleClass||'sedan',w=(v.userData.halfW||.94)*2,l=(v.userData.halfL||2.3)*2,c=Number(v.userData.bodyColor||0x66737a);
   const paint=M(c,.25,.32),g=new T.Group();g.name='VehicleBodyDetail1160';v.add(g);
   const front=-l/2-.02,rear=l/2+.02,roof=cls==='van'?1.98:(cls==='suv'||cls==='crossover')?1.62:(cls==='sport'||cls==='coupe')?1.34:1.48;
   // shaped bumper lips and side rocker panels
   A(new T.BoxGeometry(w*.82,.10,.16),paint,0,.48,front,g);A(new T.BoxGeometry(w*.82,.10,.16),paint,0,.48,rear,g);
   A(new T.BoxGeometry(w*.70,.045,.08),dark,0,.39,front-.08,g);A(new T.BoxGeometry(w*.70,.045,.08),dark,0,.39,rear+.08,g);
   for(const sx of[-1,1]){
     A(new T.BoxGeometry(.035,.10,l*.62),dark,sx*(w/2+.025),.48,0,g);
     // lower door crease
     A(new T.BoxGeometry(.020,.025,l*.42),metal,sx*(w/2+.04),.74,.05,g);
     // window frame rails
     A(new T.BoxGeometry(.025,.025,l*.34),metal,sx*(w/2+.04),roof-.08,.00,g);
   }
   // hood/trunk crease lines
   for(const sx of[-1,1]){
     let h=A(new T.BoxGeometry(.018,.018,l*.17),metal,sx*w*.22,.92,front+l*.12,g);h.rotation.x=-.04;
     let t=A(new T.BoxGeometry(.018,.018,l*.14),metal,sx*w*.22,.86,rear-l*.10,g);t.rotation.x=.03;
   }
   // front headlight shapes and rear signature
   for(const sx of[-1,1]){
     let hl=A(new T.BoxGeometry(w*.18,.11,.055),white,sx*w*.30,.74,front-.10,g);hl.rotation.z=sx*.07;
     let tl=A(new T.BoxGeometry(w*.19,.12,.055),red,sx*w*.30,.72,rear+.10,g);tl.rotation.z=-sx*.04;
   }
   // cabin pillars
   for(const sx of[-1,1])for(const z of[-l*.12,l*.12])A(new T.BoxGeometry(.025,.52,.032),dark,sx*(w/2+.045),roof-.28,z,g);
   // model-specific readable silhouettes
   if(cls==='sport'||cls==='coupe'){
     A(new T.BoxGeometry(w*.58,.045,.26),dark,0,.92,rear+.16,g);
     for(const sx of[-1,1])A(new T.BoxGeometry(.045,.18,.045),dark,sx*w*.22,.82,rear+.08,g);
     A(new T.BoxGeometry(w*.38,.035,.16),dark,0,.50,front-.13,g);
   }else if(cls==='wagon'){
     for(const sx of[-1,1])A(new T.BoxGeometry(.045,.045,l*.38),dark,sx*w*.31,roof+.05,.12,g);
     A(new T.BoxGeometry(w*.58,.035,.12),dark,0,roof+.03,rear-.10,g);
   }else if(cls==='pickup'){
     A(new T.BoxGeometry(w*.78,.08,l*.28),paint,0,1.10,l*.28,g);
     A(new T.BoxGeometry(w*.72,.055,l*.24),dark,0,1.13,l*.29,g);
     for(const sx of[-1,1])A(new T.BoxGeometry(.035,.34,l*.24),dark,sx*w*.37,1.20,l*.29,g);
   }else if(cls==='van'){
     for(const sx of[-1,1])A(new T.BoxGeometry(.025,.90,l*.28),glass,sx*(w/2+.04),1.45,.30,g);
     A(new T.BoxGeometry(w*.66,.025,.90),dark,0,2.03,.0,g);
   }else if(cls==='suv'||cls==='crossover'){
     for(const sx of[-1,1])A(new T.BoxGeometry(.045,.055,l*.36),dark,sx*w*.31,roof+.06,.10,g);
     A(new T.BoxGeometry(w*.72,.055,.10),dark,0,.44,front-.11,g);
   }
   // subtle contact shadow
   const cv=document.createElement('canvas');cv.width=cv.height=64;let x=cv.getContext('2d'),gr=x.createRadialGradient(32,32,4,32,32,31);gr.addColorStop(0,'rgba(0,0,0,.35)');gr.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=gr;x.fillRect(0,0,64,64);let tx=new T.CanvasTexture(cv);
   let sh=A(new T.PlaneGeometry(w*1.22,l*.92),new T.MeshBasicMaterial({map:tx,transparent:true,depthWrite:false,opacity:.56}),0,.025,0,g);sh.rotation.x=-Math.PI/2;
   g.visible=false;
 }
 W.cars.forEach(addCar);
 let known=W.cars.length,acc=0;
 W.registerTick?.((dt)=>{acc+=dt;if(acc<.28)return;acc=0;if(W.cars.length!==known){W.cars.forEach(addCar);known=W.cars.length}
   const p=W.player.position;for(const v of W.cars){let g=v.getObjectByName?.('VehicleBodyDetail1160');if(g)g.visible=v.visible!==false&&Math.hypot(v.position.x-p.x,v.position.z-p.z)<near}
 });
 window.LuxVehicleBody1160={version:'11.6.0',near}
}
