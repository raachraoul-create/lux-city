import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{let I=window.LuxInteriors530;if(!I?.groups?.bakery||!I?.groups?.cafe||!I?.groups?.pub||!I?.groups?.post)return;clearInterval(q);init(I)},420);
function init(I){
 const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900,groups=[];
 const M=(c,r=.66,m=.04,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const A=(g,m,x,y,z,p)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=true;p.add(o);return o};
 const wood=M(0x72523b,.80),metal=M(0x7a8185,.30,.58),dark=M(0x282d31,.42,.36),glass=new T.MeshPhysicalMaterial({color:0xb8d3dc,roughness:.10,metalness:.04,transparent:true,opacity:.48,transmission:mobile?0:.06}),warm=[],bread=[M(0xc99758,.78),M(0xb97c3f,.82),M(0xd0a568,.78)];
 function lamp(g,x,z){let lm=M(0xffe1ad,.30,.03,0xffbd64,0);warm.push(lm);A(new T.CylinderGeometry(.05,.05,1.3,8),dark,x,4.8,z,g);let s=A(new T.ConeGeometry(.42,.40,18,1,true),M(0x33383b,.44,.30),x,4.08,z,g);s.rotation.y=.12;A(new T.SphereGeometry(.07,10,8),lm,x,3.94,z,g)}
 function shelf(g,x,z,w=3.8){A(new T.BoxGeometry(w,2.1,.34),wood,x,1.15,z,g);for(const y of[.48,1.15,1.82])A(new T.BoxGeometry(w+.10,.08,.48),M(0x9b7654,.76),x,y,z-.12,g)}
 function breadRow(g,x,y,z,n=6){for(let i=0;i<n;i++){let b=A(new T.CapsuleGeometry(.11,.32,4,8),bread[i%bread.length],x+(i-(n-1)/2)*.36,y,z,g);b.rotation.z=Math.PI/2;b.scale.set(1.15,.80,1)}}
 function screen(g,x,y,z,w=.75,h=.42,c=0x5bb8e7){let m=M(0x10191f,.16,.35,c,.20);warm.push(m);A(new T.BoxGeometry(w,h,.035),m,x,y,z,g);A(new T.BoxGeometry(w+.07,h+.07,.025),dark,x,y,z+.025,g)}
 function crate(g,x,z,c=0x9b784f){A(new T.BoxGeometry(1.45,.72,1.05),M(c,.88),x,.36,z,g);for(const xx of[-.45,0,.45])A(new T.BoxGeometry(.055,.66,.04),dark,x+xx,.36,z-.55,g)}
 // Bakery
 {
  const g=I.groups.bakery;groups.push(g);
  // glass display counter + product shelves
  A(new T.BoxGeometry(8.4,.95,1.45),M(0x7a5538,.74),-3.6,.50,3.2,g);
  A(new T.BoxGeometry(8.0,.72,1.18),glass,-3.6,1.08,3.2,g);
  for(let x=-6.5;x<=-.7;x+=1.15){breadRow(g,x,1.18,2.65,3)}
  shelf(g,-8.5,-8.4,3.6);shelf(g,-4.2,-8.4,3.6);
  for(const x of[-9.7,-8.9,-8.1,-5.4,-4.6,-3.8])breadRow(g,x,1.25,-8.62,3);
  // deck ovens / mixer details
  for(const x of[3.4,7.0]){A(new T.BoxGeometry(2.7,2.45,1.85),M(0x8d9497,.28,.54),x,1.23,-8.1,g);for(const y of[.70,1.38,2.02])A(new T.BoxGeometry(2.20,.48,.05),dark,x,y,-9.05,g);screen(g,x+.75,2.04,-9.09,.38,.24,0xe38a35)}
  let bowl=A(new T.SphereGeometry(.62,18,12,0,Math.PI*2,Math.PI*.15,Math.PI*.70),metal,1.2,1.05,-4.2,g);bowl.scale.y=.65;
  A(new T.CylinderGeometry(.12,.16,1.45,10),metal,1.2,1.88,-4.2,g);
  if(!mobile)for(const p of[[-6,5.3],[-2.5,5.3]])lamp(g,...p);
 }
 // Cafe
 {
  const g=I.groups.cafe;groups.push(g);
  // professional coffee counter
  A(new T.BoxGeometry(7.2,1.08,1.25),M(0x684c38,.76),0,.54,-5.7,g);
  A(new T.BoxGeometry(2.2,1.25,.92),metal,-2.2,1.55,-6.0,g);
  for(const x of[-2.65,-2.15,-1.65])A(new T.CylinderGeometry(.08,.08,.36,10),dark,x,.92,-6.52,g);
  for(const x of[-.3,.3])A(new T.CylinderGeometry(.11,.15,.25,12),M(0xf0eee8,.64),x,1.28,-6.25,g);
  // pastry case
  A(new T.BoxGeometry(3.0,.82,1.0),glass,4.3,.88,-5.8,g);for(const y of[.62,.98,1.28])A(new T.BoxGeometry(2.65,.035,.78),metal,4.3,y,-5.8,g);
  for(let i=0;i<7;i++){let c=A(new T.CylinderGeometry(.12,.16,.12,14),bread[i%bread.length],3.3+(i%4)*.62,.72+Math.floor(i/4)*.34,-6.31,g);c.rotation.x=Math.PI/2}
  for(const p of[[-6,1],[0,1],[6,1]])lamp(g,...p);
  if(!mobile){A(new T.BoxGeometry(5.4,.08,.28),wood,0,2.3,-8.6,g);for(let x=-2.2;x<=2.2;x+=1.1)A(new T.CylinderGeometry(.08,.10,.34,10),M([0x596d38,0x7a4d35,0xa97b3e][Math.abs(Math.round(x))%3],.70),x,2.55,-8.6,g)}
 }
 // Pub
 {
  const g=I.groups.pub;groups.push(g);
  // back bar + taps
  A(new T.BoxGeometry(10.8,2.4,.55),wood,0,1.55,-8.4,g);
  for(const y of[.70,1.45,2.20])A(new T.BoxGeometry(10.3,.08,.48),M(0x9b7655,.72),0,y,-8.1,g);
  for(let x=-4.4;x<=4.4;x+=.8){let bottle=A(new T.CylinderGeometry(.07,.09,.42,10),M([0x476d43,0x875b35,0xb08a4d][Math.abs(Math.round(x*10))%3],.48,.06),x,1.30,-7.78,g);A(new T.CylinderGeometry(.025,.025,.10,8),dark,x,1.56,-7.78,g)}
  for(let x=-2;x<=2;x+=1){A(new T.CylinderGeometry(.08,.11,.58,10),metal,x,1.47,-5.48,g);A(new T.TorusGeometry(.10,.022,6,14,Math.PI),dark,x,1.78,-5.48,g).rotation.z=Math.PI}
  // dart board / wall decor
  let board=A(new T.CylinderGeometry(.72,.72,.06,32),dark,7.8,2.4,-9.55,g);board.rotation.x=Math.PI/2;
  for(let r=.12;r<.65;r+=.13){let rr=A(new T.TorusGeometry(r,.018,6,28),M(r%.26<.14?0xc9a947:0x8e353c,.58),7.8,2.4,-9.60,g);rr.rotation.x=Math.PI/2}
  for(const p of[[-5,-.5],[0,-.5],[5,-.5]])lamp(g,...p);
 }
 // Post & logistics
 {
  const g=I.groups.post;groups.push(g);
  // service counter and parcel sorting lanes
  A(new T.BoxGeometry(10.5,1.02,1.15),M(0xa67e42,.78),0,.52,4.1,g);
  for(const x of[-3.2,0,3.2])screen(g,x,1.46,3.56,.82,.46,0xe0b33f);
  for(const z of[-5.2,-8.3])for(let x=-10;x<=10;x+=2.7)crate(g,x,z,(Math.round(x+z)%2)?0x9f7e55:0xb18d5c);
  // rolling cages
  if(!mobile)for(const x of[-7,0,7]){for(const sx of[-1,1])A(new T.BoxGeometry(.055,2.0,.055),metal,x+sx*.78,1.0,-11.7,g);for(const y of[.35,1.0,1.65])A(new T.BoxGeometry(1.65,.045,.75),metal,x,y,-11.7,g);for(const sx of[-1,1])for(const z of[-12.02,-11.38]){let w=A(new T.TorusGeometry(.09,.024,6,12),dark,x+sx*.72,.10,z,g);w.rotation.y=Math.PI/2}}
 }
 const W=window.LuxWorld;W?.registerTick?.((dt)=>{let h=(window.LuxLife?.state?.hour??12)+(window.LuxLife?.state?.minute??0)/60,night=h>=19||h<7;for(const m of warm)if('emissiveIntensity'in m)m.emissiveIntensity+=( (night?.48:.22)-m.emissiveIntensity)*Math.min(1,dt*2.4)});
 window.LuxShopInteriors910={version:'9.1.0',groups}
}
