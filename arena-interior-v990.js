import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{let I=window.LuxInteriors530;if(!I?.groups?.colosseum)return;clearInterval(q);init(I.groups.colosseum)},420);
function init(g){
 const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 if(g.getObjectByName('LuxArenaInterior990'))return;
 const root=new T.Group();root.name='LuxArenaInterior990';g.add(root);
 const M=(c,r=.68,m=.04,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const A=(geo,mat,x,y,z,p=root)=>{let o=new T.Mesh(geo,mat);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=true;p.add(o);return o};
 const stone=M(0x8b7258,.84),dark=M(0x2b3034,.42,.36),metal=M(0x737b7f,.30,.58),seatA=M(0x7b3b3c,.74),seatB=M(0x3f566c,.74),gold=M(0xb89345,.44,.34),warm=[];
 // arena floor and barrier
 A(new T.CylinderGeometry(6.7,6.7,.16,48),M(0xb6946b,.86),0,.10,-2);
 let rail=A(new T.TorusGeometry(7.0,.08,8,48),metal,0,.62,-2);rail.rotation.x=Math.PI/2;
 for(let a=0;a<Math.PI*2;a+=Math.PI/12)A(new T.CylinderGeometry(.035,.045,.68,8),metal,Math.cos(a)*7.0,.34,-2+Math.sin(a)*7.0);
 // stepped seating rings
 for(let r=8.1,level=0;r<=11.4;r+=1.1,level++){
   let ring=A(new T.TorusGeometry(r,.48,8,64),stone,0,.30+level*.36,-2);ring.rotation.x=Math.PI/2;ring.scale.y=.62;
   const n=mobile?18:28;
   for(let i=0;i<n;i++){
     const a=i/n*Math.PI*2,x=Math.cos(a)*r,z=-2+Math.sin(a)*r;
     let s=A(new T.BoxGeometry(.78,.32,.62),(i+level)%2?seatA:seatB,x,.64+level*.36,z);s.rotation.y=-a+Math.PI/2;
   }
 }
 // corner stair aisles
 for(const a of[0,Math.PI/2,Math.PI,Math.PI*1.5]){
   for(let k=0;k<5;k++){
     const r=7.7+k*.82,x=Math.cos(a)*r,z=-2+Math.sin(a)*r;
     let st=A(new T.BoxGeometry(1.1,.16+k*.13,.72),M(0xb9a084,.84),x,.08+k*.13,z);st.rotation.y=-a+Math.PI/2;
   }
 }
 // overhead light trusses
 for(const z of[-8.2,4.2]){
   A(new T.BoxGeometry(24,.14,.14),metal,0,6.15,z);
   for(let x=-10;x<=10;x+=2.5){
     let lm=M(0xffe8c7,.20,.04,0xffcf85,.75);warm.push(lm);let l=A(new T.BoxGeometry(.46,.18,.32),lm,x,5.95,z);l.rotation.x=.18*(z<0?1:-1);
   }
 }
 for(const x of[-10.8,10.8])A(new T.BoxGeometry(.16,6.1,.16),metal,x,3.05,-2);
 // scoreboard
 function scoreTex(){let c=document.createElement('canvas');c.width=900;c.height=420;let x=c.getContext('2d');x.fillStyle='#0c1216';x.fillRect(0,0,900,420);x.fillStyle='#d8b75d';x.font='900 58px Arial';x.textAlign='center';x.fillText('LUX COLOSSEUM',450,82);x.fillStyle='#fff';x.font='900 92px Arial';x.fillText('EVENT',450,205);x.font='700 38px Arial';x.fillStyle='#a9bac5';x.fillText('ARENA · LUX CITY',450,280);x.fillStyle='#3e9b6b';x.fillRect(310,325,280,10);let t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t}
 A(new T.BoxGeometry(6.5,3.2,.32),dark,0,5.0,-11.7);
 A(new T.PlaneGeometry(6.05,2.80),new T.MeshBasicMaterial({map:scoreTex(),toneMapped:false}),0,5.05,-11.88);
 // entrance tunnel framing
 for(const x of[-2.7,2.7])A(new T.BoxGeometry(.42,3.0,3.6),stone,x,1.50,11.0);
 A(new T.BoxGeometry(5.8,.42,3.6),stone,0,3.0,11.0);
 A(new T.BoxGeometry(4.7,2.5,.10),dark,0,1.25,9.18);
 // floor markings / center emblem
 let emblem=A(new T.RingGeometry(1.25,1.48,40),gold,0,.205,-2);emblem.rotation.x=-Math.PI/2;
 let center=A(new T.CircleGeometry(.38,32),gold,0,.207,-2);center.rotation.x=-Math.PI/2;
 // event equipment / speakers
 for(const x of[-5.3,5.3]){
   A(new T.BoxGeometry(1.05,2.2,.90),dark,x,1.10,-10.4);
   for(const y of[.58,1.25,1.92]){let sp=A(new T.CylinderGeometry(.28,.28,.035,20),M(0x111416,.28,.26),x,y,-10.87);sp.rotation.x=Math.PI/2}
 }
 if(!mobile){
   // cameras and VIP railing
   for(const x of[-8.5,8.5]){A(new T.CylinderGeometry(.035,.045,2.2,8),metal,x,1.1,6.6);let cam=A(new T.BoxGeometry(.30,.18,.36),dark,x,2.16,6.35);cam.rotation.x=-.18}
   A(new T.BoxGeometry(6.5,.08,.08),gold,0,1.25,7.3);for(let x=-3;x<=3;x+=.75)A(new T.BoxGeometry(.04,1.0,.04),gold,x,.75,7.3);
 }
 const W=window.LuxWorld;W?.registerTick?.((dt)=>{let night=(window.LuxLife?.state?.hour??12)>=18;for(const m of warm)m.emissiveIntensity+=( ((night?1.25:.82))-m.emissiveIntensity)*Math.min(1,dt*2.5)});
 window.LuxArenaInterior990={version:'9.9.0',root}
}
