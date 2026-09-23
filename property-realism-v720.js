import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{if(!window.LuxWorld?.houseSites?.length||!window.LuxCityServices?.buildings)return;clearInterval(q);const W=LuxWorld,S=W.scene,M=(c,r=.72,m=.04,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei}),glass=M(0x6e9eae,.16,.20),darkGlass=M(0x243943,.14,.28),metal=M(0x575e62,.38,.48),wood=M(0x75543a,.80,.05),stone=M(0xb7b1a5,.88),hedge=M(0x486c3d,.96),detailGroups=[];
function A(g,m,x,y,z,p){let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=true;p.add(o);return o}
function mark(g){g.userData.luxDetail720=true;detailGroups.push(g);return g}
function windowSet(g,x,y,z,w=1.55,h=1.18){A(new T.BoxGeometry(w+.18,h+.18,.08),M(0x454c50,.55,.30),x,y,z,g);A(new T.BoxGeometry(w,h,.035),glass,x,y,z+.065,g);A(new T.BoxGeometry(.055,h,.04),M(0xd6d2c8,.65),x,y,z+.09,g);A(new T.BoxGeometry(w,.055,.04),M(0xd6d2c8,.65),x,y,z+.09,g);A(new T.BoxGeometry(w+.18,.10,.28),stone,x,y-h/2-.10,z+.08,g)}
function doorSet(g,x,z,color=0x5d4433){A(new T.BoxGeometry(1.08,2.22,.16),M(color,.65,.12),x,1.11,z,g);A(new T.BoxGeometry(1.24,2.38,.10),M(0xd0cbc0,.78),x,1.19,z-.04,g);A(new T.BoxGeometry(.035,.20,.035),M(0xc9a85f,.26,.50),x+.36,1.08,z+.10,g);A(new T.BoxGeometry(2.15,.14,1.08),M(0x484d50,.45,.30),x,2.47,z+.42,g);A(new T.BoxGeometry(1.70,.12,.78),stone,x,.07,z+.62,g)}
W.houseSites.forEach((h,i)=>{let g=mark(new T.Group()),front=h.d/2+.30,variant=i%6,frame=M([0x565d61,0x6a5946,0x454d53,0x5f514a][i%4],.62,.22),accent=M([0x775844,0x526d5a,0x596a7a,0x725a48][i%4],.74,.10);
A(new T.BoxGeometry(h.w*.94,.34,.18),i%4===0?M(0x896a59,.88):stone,0,.22,front,g);
let cols=variant===0?3:2;for(let row=0;row<2;row++)for(let c=0;c<cols;c++){let span=h.w*.62,x=cols===1?0:-span/2+c*(span/(cols-1)),y=1.92+row*2.05;if(Math.abs(x)<.85&&row===0)continue;windowSet(g,x,y,front+.02,variant===3?1.30:1.55,1.12)}
doorSet(g,0,front+.02,[0x5b4130,0x445c55,0x4b5062,0x6b513c][i%4]);
for(let sx of[-1,1])A(new T.CylinderGeometry(.035,.045,Math.max(3.2,h.h-.25),8),metal,sx*(h.w/2-.22),Math.max(3.2,h.h-.25)/2,front+.05,g);
A(new T.BoxGeometry(h.w-.45,.08,.10),frame,0,h.h-.18,front+.05,g);
if(variant===0||variant===4){let b=A(new T.BoxGeometry(3.5,.16,1.25),frame,h.w*.18,3.32,front+.76,g);for(let x of[h.w*.18-1.5,h.w*.18+1.5])A(new T.CylinderGeometry(.035,.045,3.0,8),frame,x,1.50,front+1.30,g)}
if(variant===1){let gx=-h.w*.28;A(new T.BoxGeometry(3.0,2.25,.18),M(0x555d61,.42,.34),gx,1.18,front+.02,g);for(let y of[.70,1.16,1.62])A(new T.BoxGeometry(2.76,.04,.04),metal,gx,y,front+.14,g)}
if(variant===2){for(let x of[-1.2,0,1.2]){let panel=A(new T.BoxGeometry(.95,.05,.72),M(0x263e51,.16,.58),x,h.h+.55,-.25,g);panel.rotation.x=-.22}}
if(variant===3){A(new T.BoxGeometry(.58,1.15,.58),stone,h.w*.24,h.h+.55,-.30,g);A(new T.BoxGeometry(.72,.12,.72),M(0x4a4d50,.60,.22),h.w*.24,h.h+1.14,-.30,g)}
if(variant===5){A(new T.BoxGeometry(3.2,.13,1.05),wood,-h.w*.18,.73,front+.95,g);for(let x of[-h.w*.18-1.35,-h.w*.18+1.35])A(new T.CylinderGeometry(.04,.05,1.35,8),wood,x,.68,front+1.38,g)}
for(let x of[-h.w*.34,h.w*.34]){A(new T.BoxGeometry(.20,.70,.18),M(0x424a4e,.45,.28),x,.40,front+.52,g);A(new T.BoxGeometry(.24,.08,.22),M(0x23282c,.35,.35),x,.79,front+.52,g)}
if(i%2===0){for(let x=-h.w*.38;x<h.w*.38;x+=1.2)A(new T.BoxGeometry(.95,.62,.42),hedge,x,.31,front+2.05,g)}
let path=A(new T.BoxGeometry(2.2,.055,4.0),M(0x6b6c68,.90),0,.04,front+2.25,g);path.userData.propertyPath=true;
g.position.set(h.x,0,h.z);g.rotation.y=h.rot||0;S.add(g)});
for(let d of LuxCityServices.buildings){let g=mark(new T.Group()),front=d.l/2+.28,frame=M(0x40474b,.44,.34),accent=M(({bakery:0x8d4338,cafe:0x41664f,pub:0x51453e,bank:0x526679,police:0x354f70,fire:0x8c3831,rescue:0x426b63,hospital:0x607a87,post:0x4d6270,townhall:0x6a5b48}[d.id]||0x555e64),.58,.20);
A(new T.BoxGeometry(d.w*.80,.22,.20),stone,0,.18,front,g);
let rows=d.h>7?2:1;for(let r=0;r<rows;r++)for(let x of[-d.w*.28,0,d.w*.28]){if(r===0&&Math.abs(x)<.8)continue;windowSet(g,x,3.05+r*2.15,front+.02,1.70,1.25)}
doorSet(g,0,front+.03,d.id==='fire'?0x753730:d.id==='police'?0x405a73:0x51443a);
A(new T.BoxGeometry(Math.min(7,d.w*.55),.18,1.28),accent,0,3.15,front+.70,g);for(let x of[-Math.min(3,d.w*.23),Math.min(3,d.w*.23)])A(new T.CylinderGeometry(.045,.055,2.95,8),metal,x,1.48,front+1.24,g);
if(d.id==='fire'||d.id==='rescue'){for(let x of[-d.w*.22,d.w*.22]){A(new T.BoxGeometry(3.1,2.65,.20),M(0x3d4347,.38,.32),x,1.35,front+.02,g);for(let y of[.65,1.30,1.95])A(new T.BoxGeometry(2.85,.05,.04),metal,x,y,front+.14,g)}}
if(d.id==='hospital'){let cross=M(0xd83e42,.45,.12);A(new T.BoxGeometry(.28,1.45,.08),cross,-d.w*.35,4.2,front+.10,g);A(new T.BoxGeometry(1.45,.28,.08),cross,-d.w*.35,4.2,front+.10,g)}
if(d.id==='bakery'||d.id==='cafe'||d.id==='pub'){let aw=A(new T.BoxGeometry(5.8,.16,1.4),accent,0,3.28,front+.74,g);aw.rotation.x=-.04}
if(d.factory){for(let x of[-d.w*.30,0,d.w*.30])A(new T.BoxGeometry(2.5,.10,.52),metal,x,.08,front+.80,g)}
for(let sx of[-1,1])A(new T.CylinderGeometry(.04,.05,Math.max(3.4,d.h-.3),8),metal,sx*(d.w/2-.24),Math.max(3.4,d.h-.3)/2,front+.04,g);
g.position.set(d.x,0,d.z);S.add(g)}
window.LuxPropertyRealism720={groups:detailGroups}},420);