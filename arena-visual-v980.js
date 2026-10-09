import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{if(!window.LuxWorld?.scene||!window.LuxSystems330?.doors?.colosseum||!window.LuxLife)return;clearInterval(q);init()},360);
function init(){
 const W=LuxWorld,S=W.scene,D=LuxSystems330.doors.colosseum,L=LuxLife,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 const old=S.getObjectByName('LuxArena980');if(old)S.remove(old);
 const root=new T.Group();root.name='LuxArena980';root.position.set(D.x,0,D.z-14.2);S.add(root);
 const M=(c,r=.72,m=.04,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const A=(g,m,x,y,z,p=root)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=!mobile;o.receiveShadow=true;p.add(o);return o};
 const stone=M(0xb89d78,.86),stone2=M(0x9d8365,.90),dark=M(0x4b4137,.58,.18),metal=M(0x6c7275,.34,.52),red=M(0x853b37,.66),warm=[];
 // broad forecourt leading to the existing door
 A(new T.BoxGeometry(28,.07,11.0),M(0xb5aea2,.92),0,.035,16.0);
 if(!mobile){
   for(let x=-12;x<=12;x+=2)A(new T.BoxGeometry(.035,.012,10.4),M(0x918b82,.94),x,.078,16.0);
   for(let z=11.4;z<=20.6;z+=1.8)A(new T.BoxGeometry(27.4,.012,.035),M(0x918b82,.94),0,.079,z);
 }
 // elliptical outer shell built from repeating stone piers and arch tops.
 const rx=13.4,rz=11.2,segments=mobile?24:36;
 for(let i=0;i<segments;i++){
   const a=i/segments*Math.PI*2,x=Math.sin(a)*rx,z=Math.cos(a)*rz;
   // keep a generous opening at the front around the real door.
   if(Math.abs(a)<.24||Math.abs(a-Math.PI*2)<.24)continue;
   const g=new T.Group();g.position.set(x,0,z);g.rotation.y=a;root.add(g);
   A(new T.BoxGeometry(.70,5.7,1.10),stone,0,2.85,0,g);
   A(new T.BoxGeometry(1.15,.34,1.28),stone2,0,5.54,0,g);
   A(new T.BoxGeometry(1.05,.26,1.18),stone2,0,.13,0,g);
   // recessed dark arch/opening.
   A(new T.BoxGeometry(.56,2.7,.08),dark,0,2.45,-.59,g);
   let top=A(new T.TorusGeometry(.36,.09,8,16,Math.PI),dark,0,3.82,-.60,g);top.rotation.z=Math.PI;
 }
 // upper cornice rings
 let ring1=A(new T.TorusGeometry(12.45,.20,10,segments*2),stone2,0,5.75,0);ring1.scale.z=rz/rx;ring1.rotation.x=Math.PI/2;
 let ring2=A(new T.TorusGeometry(12.80,.13,8,segments*2),dark,0,6.05,0);ring2.scale.z=rz/rx;ring2.rotation.x=Math.PI/2;
 // main entrance portal at front edge, aligned to existing door.
 A(new T.BoxGeometry(8.8,.40,2.20),stone2,0,5.55,11.4);
 for(const x of[-3.65,-1.25,1.25,3.65]){
   A(new T.CylinderGeometry(.24,.31,5.3,14),stone,x,2.65,11.55);
   A(new T.BoxGeometry(.70,.20,.70),stone2,x,5.34,11.55);
 }
 A(new T.BoxGeometry(5.2,4.2,.24),dark,0,2.10,11.82);
 A(new T.BoxGeometry(3.8,3.6,.08),M(0x402e24,.72),0,1.80,11.96);
 // large sign above entrance
 function signTex(){let c=document.createElement('canvas');c.width=900;c.height=190;let x=c.getContext('2d');x.fillStyle='#4b3a2c';x.fillRect(0,0,900,190);x.fillStyle='#e7d6ad';x.font='900 78px Georgia,serif';x.textAlign='center';x.fillText('LUX COLOSSEUM',450,118);let t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t}
 A(new T.PlaneGeometry(7.4,1.55),new T.MeshBasicMaterial({map:signTex(),toneMapped:false}),0,5.00,12.62);
 // steps / crowd rails
 for(let i=0;i<4;i++)A(new T.BoxGeometry(10+i*1.2,.16,1.20),stone2,0,.08+i*.08,12.7+i*.72);
 for(const x of[-5.8,5.8])for(let z=14.8;z<=18.6;z+=1.2){A(new T.CylinderGeometry(.035,.045,1.05,8),metal,x,.52,z);A(new T.BoxGeometry(.045,.045,1.2),metal,x,1.02,z+.55)}
 // poster boards / event frames
 for(const sx of[-1,1]){
   A(new T.BoxGeometry(2.6,3.1,.16),dark,sx*7.7,1.65,15.8);
   let c=document.createElement('canvas');c.width=420;c.height=620;let x=c.getContext('2d');x.fillStyle=sx<0?'#633330':'#2e465b';x.fillRect(0,0,420,620);x.fillStyle='#e6c783';x.font='900 42px Arial';x.textAlign='center';x.fillText('LUX CITY',210,95);x.font='900 58px Arial';x.fillStyle='#fff';x.fillText('EVENT',210,185);x.fillStyle='#d9d3c4';x.font='700 30px Arial';x.fillText('ARENA · LIVE',210,260);x.fillRect(85,315,250,8);x.font='800 27px Arial';x.fillText('EINLASS',210,390);x.fillText('19:00',210,435);let t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;
   A(new T.PlaneGeometry(2.25,2.75),new T.MeshBasicMaterial({map:t,toneMapped:false}),sx*7.7,1.70,15.90);
 }
 // flags and night lights
 for(const x of[-10,-6,6,10]){
   A(new T.CylinderGeometry(.04,.05,5.4,8),metal,x,2.7,17.8);
   let fl=A(new T.BoxGeometry(1.35,.72,.035),x<0?red:M(0xd0ad51,.66),x+(x<0?.68:-.68),4.75,17.8);fl.rotation.y=.04;
 }
 for(const x of[-7.0,0,7.0]){
   A(new T.CylinderGeometry(.05,.07,4.4,8),dark,x,2.2,19.8);
   let lm=M(0xffdda4,.26,.02,0xffb653,0);warm.push(lm);A(new T.BoxGeometry(.38,.20,.26),lm,x,4.25,19.8);
 }
 // low planters on plaza edges
 for(const x of[-11.0,11.0]){A(new T.BoxGeometry(3.2,.38,1.0),stone2,x,.19,20.0);A(new T.BoxGeometry(2.85,.18,.74),M(0x4f7244,.94),x,.46,20.0)}
 W.registerTick?.((dt)=>{let h=(+L.state.hour||0)+(+L.state.minute||0)/60,night=h>=19||h<6.4,dusk=(h>=18&&h<19)||(h>=6.4&&h<7.2);for(const m of warm)m.emissiveIntensity+=( (night?1.15:dusk?.45:.04)-m.emissiveIntensity)*Math.min(1,dt*2.4)});
 window.LuxArena980={version:'9.8.0',root}
}
