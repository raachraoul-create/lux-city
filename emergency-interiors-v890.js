import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{let I=window.LuxInteriors530,W=window.LuxWorld;if(!I?.groups?.police||!I?.groups?.rescue||!I?.groups?.hospital||!W)return;clearInterval(q);init(I,W)},420);
function init(I,W){
 const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900,groups=[];
 const M=(c,r=.66,m=.05,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const A=(g,m,x,y,z,p)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=true;p.add(o);return o};
 const metal=M(0x6f777b,.34,.52),dark=M(0x242a2e,.40,.30),white=M(0xe8e9e6,.76),blue=M(0x365e7f,.54,.16),red=M(0xa83237,.56,.12),green=M(0x527658,.68),screenM=[],warm=[];
 function screen(p,x,y,z,w=.85,h=.48,c=0x58b9e7){
   let m=M(0x111a20,.18,.34,c,.22);screenM.push(m);A(new T.BoxGeometry(w,h,.035),m,x,y,z,p);A(new T.BoxGeometry(w+.08,h+.08,.025),dark,x,y,z+.025,p)
 }
 function chair(p,x,z,c=0x4f5b61){A(new T.BoxGeometry(.66,.12,.66),M(c,.72),x,.50,z,p);A(new T.BoxGeometry(.66,.78,.10),M(c,.72),x,.90,z+.28,p);for(const sx of[-1,1])A(new T.BoxGeometry(.055,.52,.055),metal,x+sx*.25,.24,z,p)}
 function locker(p,x,z,c=0x798188){A(new T.BoxGeometry(.95,2.25,.62),M(c,.42,.34),x,1.12,z,p);for(const y of[.68,1.32,1.98])A(new T.BoxGeometry(.14,.035,.035),dark,x+.28,y,z-.33,p)}
 function cabinet(p,x,z,w=1.6,c=0xe3e5e2){A(new T.BoxGeometry(w,1.05,.52),M(c,.70),x,.53,z,p);A(new T.BoxGeometry(w+.05,.055,.58),metal,x,1.08,z,p)}
 function noticeTex(title,accent='#315e85'){
   let c=document.createElement('canvas');c.width=480;c.height=300;let x=c.getContext('2d');x.fillStyle='#f2f1ec';x.fillRect(0,0,480,300);x.fillStyle=accent;x.fillRect(0,0,480,56);x.fillStyle='#fff';x.font='900 28px Arial';x.fillText(title,24,38);x.fillStyle='#6e7478';for(let y=88;y<270;y+=32){x.fillRect(28,y,340+(y%64),7);x.fillStyle='#aab0b4';x.fillRect(28,y+13,250+(y%48),5);x.fillStyle='#6e7478'}let t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t
 }
 function board(p,title,x,y,z,accent){A(new T.PlaneGeometry(2.5,1.55),new T.MeshBasicMaterial({map:noticeTex(title,accent),toneMapped:false,side:T.DoubleSide}),x,y,z,p)}

 // Police: reception, workstations, evidence/storage details.
 {
   const g=I.groups.police;groups.push(g);
   board(g,'EINSATZ & MELDUNGEN',0,3.2,-13.25,'#315e85');
   for(const x of[-6,0,6]){A(new T.BoxGeometry(2.7,.12,1.15),M(0x586773,.64),x,.80,-4.9,g);chair(g,x,-3.85,0x45535d);screen(g,x,1.42,-5.45,.82,.47,0x5db7e8)}
   for(let x=-10;x<=10;x+=2.1)locker(g,x,-11.4,0x646e74);
   cabinet(g,8.5,5.6,2.2,0x92989c);cabinet(g,-8.5,5.6,2.2,0x92989c);
   if(!mobile){for(const x of[-8.7,8.7]){let pole=A(new T.CylinderGeometry(.045,.055,2.6,8),metal,x,1.30,8.8,g);let cam=A(new T.BoxGeometry(.22,.14,.28),dark,x,2.55,8.55,g);cam.rotation.x=-.20}}
 }
 // Rescue: readiness room, medical equipment, oxygen/trolley details.
 {
   const g=I.groups.rescue;groups.push(g);
   board(g,'BEREITSCHAFT · 112',0,3.25,-13.7,'#a83237');
   for(const x of[-7.5,-4.5,-1.5,1.5,4.5,7.5])locker(g,x,-10.6,0xe0e2df);
   for(const x of[-6,0,6]){cabinet(g,x,-4.8,2.2,0xe4e5e2);screen(g,x,1.45,-5.12,.72,.42,0x6cc8e5)}
   for(const x of[-7.5,7.5]){for(let k=0;k<2;k++){A(new T.CylinderGeometry(.16,.18,1.2,14),M(k?0x5ca0c0:0x64a56d,.42,.20),x+k*.42,.60,5.8,g);A(new T.CylinderGeometry(.05,.05,.20,10),metal,x+k*.42,1.27,5.8,g)}}
   // stretcher/trolley
   A(new T.BoxGeometry(2.7,.14,.78),white,0,.88,6.4,g);for(const x of[-1.05,1.05]){A(new T.BoxGeometry(.06,.62,.06),metal,x,.52,6.4,g);for(const z of[6.12,6.68]){let wh=A(new T.TorusGeometry(.10,.025,6,14),dark,x,.16,z,g);wh.rotation.y=Math.PI/2}}
   A(new T.BoxGeometry(2.35,.12,.56),M(0x6b8fa3,.74),0,1.01,6.4,g);
 }
 // Hospital: reception, triage, treatment monitors and waiting area.
 {
   const g=I.groups.hospital;groups.push(g);
   board(g,'NOTAUFNAHME · TRIAGE',0,3.35,-14.7,'#9b3036');
   // waiting line seats
   for(const z of[7.6,10.0])for(const x of[-8,-5.4,-2.8,2.8,5.4,8])chair(g,x,z,0x6a7477);
   // reception PCs
   for(const x of[-3.0,0,3.0])screen(g,x,1.52,4.02,.78,.46,0x61b8dc);
   // treatment monitors, carts and oxygen
   for(const x of[-9,-3,3,9]){
     screen(g,x+.85,1.55,-6.2,.62,.40,0x68d1a1);
     A(new T.BoxGeometry(.52,.68,.42),metal,x+.85,.58,-5.75,g);
     A(new T.CylinderGeometry(.14,.16,.95,14),M(0x66a66f,.44,.18),x-1.20,.48,-6.6,g);
     A(new T.CylinderGeometry(.045,.045,.22,10),metal,x-1.20,1.05,-6.6,g);
   }
   cabinet(g,-12.5,-2.5,2.3,0xe7e8e5);cabinet(g,12.5,-2.5,2.3,0xe7e8e5);
   let cross=M(0xb52e35,.50,.10,0xff3540,0);warm.push(cross);A(new T.BoxGeometry(.42,1.35,.05),cross,12.0,3.3,-14.65,g);A(new T.BoxGeometry(1.35,.42,.05),cross,12.0,3.3,-14.64,g);
 }
 W.registerTick?.((dt)=>{let h=(window.LuxLife?.state?.hour??12)+(window.LuxLife?.state?.minute??0)/60,night=h>=19||h<6.5;for(const m of screenM)m.emissiveIntensity+=( (.30-m.emissiveIntensity)*Math.min(1,dt*3));for(const m of warm)m.emissiveIntensity+=( (night?.8:.18)-m.emissiveIntensity)*Math.min(1,dt*2.4)});
 window.LuxEmergencyInteriors890={version:'8.9.0',groups}
}
