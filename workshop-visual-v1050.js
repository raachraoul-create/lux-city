import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{let B=window.LuxVehicleBusiness760||window.LuxVehicleBusiness750,W=window.LuxWorld;if(!B?.groups?.[1]||!W?.scene||!window.LuxLife)return;clearInterval(q);init(B,W)},360);
function init(B,W){
 const g=B.groups[1],mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 if(g.getObjectByName('LuxWorkshopVisual1050'))return;
 const root=new T.Group();root.name='LuxWorkshopVisual1050';g.add(root);
 const M=(c,r=.62,m=.06,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const A=(geo,mat,x,y,z,p=root)=>{let o=new T.Mesh(geo,mat);o.position.set(x,y,z);o.castShadow=!mobile;o.receiveShadow=true;p.add(o);return o};
 const metal=M(0x70787c,.30,.58),dark=M(0x252b2f,.42,.38),yellow=M(0xd5ad42,.56,.12),red=M(0xa23b36,.54,.16),blue=M(0x365c78,.54,.18),rubber=M(0x111416,.82),wood=M(0x755640,.80),warm=[],screens=[];
 function screen(x,y,z,w=.72,h=.40,c=0x66c5ed){let m=M(0x10181e,.16,.34,c,.24);screens.push(m);A(new T.BoxGeometry(w,h,.035),m,x,y,z);A(new T.BoxGeometry(w+.07,h+.07,.025),dark,x,y,z+.025)}
 function lift(x,z){
   for(const sx of[-1,1]){
     A(new T.BoxGeometry(.22,2.55,.28),yellow,x+sx*.95,1.28,z);
     A(new T.BoxGeometry(1.55,.14,.18),metal,x+sx*.50,.70,z);
   }
   A(new T.BoxGeometry(2.1,.12,.40),dark,x,.13,z);
   A(new T.BoxGeometry(2.15,.08,.12),yellow,x,.26,z-1.18);
   A(new T.BoxGeometry(2.15,.08,.12),yellow,x,.26,z+1.18);
 }
 function tireRack(x,z){
   A(new T.BoxGeometry(3.5,2.2,.42),metal,x,1.12,z);
   for(const y of[.62,1.50])A(new T.BoxGeometry(3.35,.08,.55),dark,x,y,z-.05);
   for(let k=0;k<6;k++){let t=A(new T.TorusGeometry(.28,.11,10,20),rubber,x-1.35+(k%3)*1.35,.62+Math.floor(k/3)*.88,z-.34);t.rotation.y=Math.PI/2}
 }
 function barrel(x,z,c=0x436a87){
   A(new T.CylinderGeometry(.28,.28,.88,16),M(c,.48,.30),x,.44,z);
   for(const y of[.12,.44,.76]){let r=A(new T.TorusGeometry(.28,.022,6,18),metal,x,y,z);r.rotation.x=Math.PI/2}
 }
 function toolWall(x,z){
   A(new T.BoxGeometry(5.2,2.5,.16),M(0x495157,.50,.34),x,2.1,z);
   if(!mobile)for(let ix=-4;ix<=4;ix++)for(let iy=0;iy<4;iy++)A(new T.BoxGeometry(.028,.028,.03),metal,x+ix*.52,1.35+iy*.48,z-.10);
   for(let k=0;k<7;k++){let t=A(new T.BoxGeometry(.08,.65,.08),M(k%2?0xc64a3d:0x6e8796,.46,.28),x-2.0+k*.68,2.3,z-.18);t.rotation.z=(k-3)*.08}
 }
 // three distinct work bays
 lift(-5.3,-.4);lift(0,-.4);lift(5.3,-.4);
 // diagnostic station
 A(new T.BoxGeometry(2.0,1.12,.74),dark,7.2,.56,-4.7);
 screen(7.2,1.23,-5.09,.88,.62,0x63c6ee);
 A(new T.BoxGeometry(1.45,.08,.70),metal,7.2,.18,-4.7);
 // reception / service desk
 A(new T.BoxGeometry(5.6,1.02,1.10),wood,-5.6,.52,-5.3);
 for(const x of[-7.0,-5.6,-4.2])screen(x,1.35,-5.88,.65,.38,0x70bfe2);
 A(new T.BoxGeometry(4.4,.12,.70),M(0x5b6469,.74),-5.6,.50,-3.75);
 // tire and parts area
 tireRack(-7.3,4.8);
 tireRack(-3.2,4.8);
 toolWall(3.2,5.75);
 for(const x of[7.0,7.7,8.4])barrel(x,4.8,x===7.7?0x8f4d38:0x456d87);
 // compressor and hose reels
 A(new T.CylinderGeometry(.55,.55,1.45,18),M(0x8a4b3d,.44,.34),8.4,.73,1.9);
 A(new T.BoxGeometry(.55,.60,.48),dark,8.4,1.65,1.9);
 if(!mobile)for(const x of[5.6,7.2]){let r=A(new T.TorusGeometry(.40,.075,9,22),x<6?red:blue,x,2.75,5.75);r.rotation.y=Math.PI/2}
 // floor service markings
 for(const x of[-5.3,0,5.3]){for(const sx of[-1,1])A(new T.BoxGeometry(.10,.018,4.6),yellow,x+sx*1.55,.105,-.2);A(new T.BoxGeometry(3.2,.018,.10),yellow,x,.106,2.05)}
 // bay numbers
 function label(text,x,z){let c=document.createElement('canvas');c.width=256;c.height=128;let cx=c.getContext('2d');cx.fillStyle='#273038';cx.fillRect(0,0,256,128);cx.fillStyle='#f0ba4a';cx.font='900 70px Arial';cx.textAlign='center';cx.fillText(text,128,84);let tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;A(new T.PlaneGeometry(1.2,.60),new T.MeshBasicMaterial({map:tx,toneMapped:false}),x,3.7,z)}
 label('1',-5.3,6.88);label('2',0,6.88);label('3',5.3,6.88);
 // exterior service apron details in world coordinates via a separate child of scene
 const yard=new T.Group();yard.name='LuxWorkshopYard1050';yard.position.set(B.workshop.x,0,B.workshop.z);yard.rotation.y=B.workshop.rot||0;W.scene.add(yard);
 const Y=(geo,mat,x,y,z)=>A(geo,mat,x,y,z,yard);
 Y(new T.BoxGeometry(12,.05,7.5),M(0x55595b,.92),0,.03,10.8);
 for(const x of[-4,0,4]){Y(new T.BoxGeometry(.10,.02,6.4),yellow,x,.065,10.8);Y(new T.BoxGeometry(2.7,.02,.10),yellow,x,.066,13.5)}
 // parts pallets, oil and service sign
 if(!mobile)for(const x of[-5.0,5.0]){Y(new T.BoxGeometry(1.8,.14,1.2),wood,x,.08,13.9);for(let k=0;k<3;k++)Y(new T.BoxGeometry(1.5,.34,1.0),M(0x9a7650,.88),x,.34+k*.34,13.9)}
 for(const x of[-5.5,5.5]){Y(new T.CylinderGeometry(.055,.075,4.3,8),dark,x,2.15,13.0);let lm=M(0xffdfa9,.26,.02,0xffbb58,0);warm.push(lm);Y(new T.BoxGeometry(.40,.18,.25),lm,x,4.18,13.0)}
 W.registerTick?.((dt)=>{let h=(window.LuxLife?.state?.hour??12)+(window.LuxLife?.state?.minute??0)/60,night=h>=19||h<6.5;for(const m of screens)m.emissiveIntensity+=( (.30-m.emissiveIntensity)*Math.min(1,dt*3));for(const m of warm)m.emissiveIntensity+=( (night?.9:.12)-m.emissiveIntensity)*Math.min(1,dt*2.4)});
 window.LuxWorkshopVisual1050={version:'10.5.0',root,yard}
}
