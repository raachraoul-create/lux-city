import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{let I=window.LuxInteriors530;if(!I?.groups?.bank||!I?.groups?.jobs||!I?.groups?.housing||!I?.groups?.townhall)return;clearInterval(q);init(I)},420);
function init(I){
 const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900,groups=[];
 const M=(c,r=.66,m=.05,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const A=(g,m,x,y,z,p)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=true;p.add(o);return o};
 const wood=M(0x775d45,.78),metal=M(0x767d81,.30,.58),dark=M(0x292f33,.42,.36),stone=M(0xb8b2a7,.82),blue=M(0x3a617c,.58),green=M(0x536f58,.66),glass=new T.MeshPhysicalMaterial({color:0xa7c1cb,roughness:.12,metalness:.04,transparent:true,opacity:.48,transmission:mobile?0:.05}),warm=[];
 function screen(g,x,y,z,w=.74,h=.42,c=0x61bee7){let m=M(0x10181e,.16,.34,c,.24);warm.push(m);A(new T.BoxGeometry(w,h,.03),m,x,y,z,g);A(new T.BoxGeometry(w+.07,h+.07,.025),dark,x,y,z+.025,g)}
 function desk(g,x,z,w=2.8,c=0x775d45){A(new T.BoxGeometry(w,.13,1.15),M(c,.76),x,.80,z,g);for(const sx of[-1,1])A(new T.BoxGeometry(.12,.78,.12),dark,x+sx*(w/2-.18),.39,z,g)}
 function chair(g,x,z,rot=0,c=0x545d62){let s=A(new T.BoxGeometry(.66,.12,.66),M(c,.72),x,.50,z,g);s.rotation.y=rot;let b=A(new T.BoxGeometry(.66,.82,.10),M(c,.72),x,.92,z-.28,g);b.rotation.y=rot}
 function boardTex(title,accent='#355d7a'){
   let c=document.createElement('canvas');c.width=600;c.height=360;let x=c.getContext('2d');x.fillStyle='#ecebe7';x.fillRect(0,0,600,360);x.fillStyle=accent;x.fillRect(0,0,600,60);x.fillStyle='#fff';x.font='900 32px Arial';x.fillText(title,28,40);x.fillStyle='#6e7478';for(let y=96;y<330;y+=34){x.fillRect(34,y,400+(y%80),7);x.fillStyle='#abb0b4';x.fillRect(34,y+14,320+(y%66),5);x.fillStyle='#6e7478'}let t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t
 }
 function board(g,title,x,y,z,accent){A(new T.PlaneGeometry(3.2,1.8),new T.MeshBasicMaterial({map:boardTex(title,accent),toneMapped:false,side:T.DoubleSide}),x,y,z,g)}
 // Bank
 {
   const g=I.groups.bank;groups.push(g);
   board(g,'LUX CITY BANK',0,3.55,-12.55,'#315e80');
   // teller desks
   for(const x of[-6,-2,2,6]){desk(g,x,-.2,2.4,0x6d675e);screen(g,x,1.36,-.78,.72,.40,0x73c8ed);chair(g,x,-1.65,Math.PI)}
   // consultation islands
   for(const [x,z] of[[-7,-6],[-2.3,-6],[2.3,-6],[7,-6]]){desk(g,x,z,2.2,0x756554);chair(g,x,z+1.3,Math.PI);chair(g,x,z-1.25,0)}
   // vault wall and ATM
   A(new T.BoxGeometry(5.2,3.8,.65),M(0x73797d,.28,.68),9.6,1.90,-8.2,g);
   let vault=A(new T.CylinderGeometry(1.25,1.25,.30,32),M(0x60666a,.26,.72),9.6,1.90,-8.58,g);vault.rotation.x=Math.PI/2;
   let ring=A(new T.TorusGeometry(.72,.08,8,28),dark,9.6,1.90,-8.76,g);ring.rotation.x=Math.PI/2;
   for(const a of[0,Math.PI/2,Math.PI,Math.PI*1.5]){let bar=A(new T.BoxGeometry(.06,.78,.07),dark,9.6,1.90,-8.82,g);bar.rotation.z=a}
   A(new T.BoxGeometry(1.0,1.75,.58),dark,-11.3,1.05,-6.8,g);screen(g,-11.3,1.40,-7.10,.62,.48,0x5cb8e4);
   for(const z of[4.5,7.0])for(const x of[-6,-2,2,6])chair(g,x,z,0,0x56636b);
 }
 // Jobs office
 {
   const g=I.groups.jobs;groups.push(g);
   board(g,'ARBEITSAMT · TERMINE',0,3.45,-12.05,'#556473');
   for(const x of[-6,-2,2,6]){desk(g,x,-2.0,2.35,0x6e675c);screen(g,x,1.35,-2.58,.70,.40,0x77c2e4);chair(g,x,-3.35,Math.PI)}
   for(const z of[4.0,6.6])for(const x of[-6.2,-3.1,0,3.1,6.2])chair(g,x,z,0,0x6a7377);
   // queue posts
   for(const x of[-4,0,4]){A(new T.CylinderGeometry(.045,.055,1.0,8),metal,x,.50,1.7,g);let rope=A(new T.TorusGeometry(1.85,.025,6,20,Math.PI),M(0x7c2f36,.58),x+2,.78,1.7,g);rope.rotation.z=Math.PI}
 }
 // Housing office
 {
   const g=I.groups.housing;groups.push(g);
   board(g,'WOHNUNGSAMT · ANTRÄGE',0,3.45,-12.05,'#57745c');
   for(const x of[-6,-2,2,6]){desk(g,x,-2.0,2.35,0x6f675c);screen(g,x,1.35,-2.58,.70,.40,0x7cc8a1);chair(g,x,-3.35,Math.PI)}
   for(const z of[4.0,6.6])for(const x of[-6.2,-3.1,0,3.1,6.2])chair(g,x,z,0,0x66726a);
   // property plan boards
   for(const x of[-7,0,7]){A(new T.BoxGeometry(3.2,2.0,.08),stone,x,2.7,-10.6,g);if(!mobile){for(let k=-2;k<=2;k++)A(new T.BoxGeometry(.42,.32,.02),M([0x7aa6b6,0xc4b18a,0x93a979][Math.abs(k)%3],.72),x+k*.52,2.7,-10.54,g)}}
 }
 // Town hall
 {
   const g=I.groups.townhall;groups.push(g);
   board(g,'GEMEINDE · BÜRGERBÜRO',0,3.70,-13.05,'#7a5d3e');
   // reception
   for(const x of[-5,0,5]){desk(g,x,-2.2,3.2,0x7b6045);screen(g,x,1.38,-2.82,.78,.43,0xe0b06a)}
   // small council table / meeting zone
   A(new T.BoxGeometry(8.5,.16,3.0),wood,0,.82,-7.8,g);
   for(const x of[-3.4,-1.7,0,1.7,3.4]){chair(g,x,-5.9,Math.PI,0x69594c);chair(g,x,-9.7,0,0x69594c)}
   // flags / coat-of-arms style abstract panel
   for(const [x,c] of[[-9,0xef3340],[-8.3,0xffffff],[-7.6,0x00a3e0]]){A(new T.CylinderGeometry(.035,.045,3.1,8),metal,x,1.55,-10.2,g);A(new T.BoxGeometry(.65,.80,.025),M(c,.60),x+.34,2.55,-10.2,g)}
   let crest=M(0xc2a04f,.32,.44,0xd9bc69,.10);warm.push(crest);A(new T.CircleGeometry(.70,28),crest,8.4,3.0,-12.85,g);
   // information kiosk
   A(new T.BoxGeometry(1.0,1.7,.60),dark,-11.2,1.0,5.8,g);screen(g,-11.2,1.35,5.47,.62,.55,0xe3b56a);
 }
 const W=window.LuxWorld;W?.registerTick?.((dt)=>{let h=(window.LuxLife?.state?.hour??12)+(window.LuxLife?.state?.minute??0)/60,night=h>=19||h<7;for(const m of warm)if('emissiveIntensity'in m)m.emissiveIntensity+=( (night?.46:.22)-m.emissiveIntensity)*Math.min(1,dt*2.5)});
 window.LuxCivicInteriors960={version:'9.6.0',groups}
}
