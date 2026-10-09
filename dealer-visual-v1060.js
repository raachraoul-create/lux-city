import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{let B=window.LuxVehicleBusiness760||window.LuxVehicleBusiness750,W=window.LuxWorld;if(!B?.groups?.[0]||!W?.scene||!window.LuxLife)return;clearInterval(q);init(B,W)},360);
function init(B,W){
 const g=B.groups[0],mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 if(g.getObjectByName('LuxDealerVisual1060'))return;
 const root=new T.Group();root.name='LuxDealerVisual1060';g.add(root);
 const M=(c,r=.58,m=.06,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const A=(geo,mat,x,y,z,p=root)=>{let o=new T.Mesh(geo,mat);o.position.set(x,y,z);o.castShadow=!mobile;o.receiveShadow=true;p.add(o);return o};
 const dark=M(0x20272b,.34,.38),metal=M(0x8a9296,.26,.62),wood=M(0x755b44,.76),white=M(0xe8e7e2,.60,.08),gold=M(0xc8a24d,.42,.24),warm=[];
 function carPod(x,z,c){
   A(new T.CylinderGeometry(2.15,2.15,.16,40),M(0x5e6365,.44,.34),x,.08,z);
   A(new T.CylinderGeometry(1.92,1.92,.04,40),M(0xb8b8b4,.30,.24),x,.19,z);
   // highlight ring
   let m=M(0xffe1a6,.22,.03,0xffc45e,0);warm.push(m);let r=A(new T.TorusGeometry(1.82,.045,8,32),m,x,.24,z);r.rotation.x=Math.PI/2;
 }
 function desk(x,z){
   A(new T.BoxGeometry(2.5,.14,1.2),wood,x,.78,z);
   for(const sx of[-1,1])A(new T.BoxGeometry(.10,.76,.10),dark,x+sx*1.0,.38,z);
   A(new T.BoxGeometry(.62,.40,.035),M(0x10191e,.16,.34,0x63c5ec,.20),x,1.24,z-.60);
   A(new T.BoxGeometry(.70,.10,.10),dark,x,.93,z-.30);
 }
 function infoBoard(x,z,title,sub){
   const c=document.createElement('canvas');c.width=500;c.height=320;const q=c.getContext('2d');q.fillStyle='#111820';q.fillRect(0,0,500,320);q.fillStyle='#d9b45a';q.fillRect(0,0,500,48);q.fillStyle='#fff';q.font='900 34px Arial';q.fillText(title,24,100);q.fillStyle='#9fb1bc';q.font='700 24px Arial';q.fillText(sub,24,145);q.fillStyle='#d9e2e7';for(let y=190;y<285;y+=28)q.fillRect(24,y,390-(y%50),6);let tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;
   A(new T.BoxGeometry(1.95,2.8,.14),dark,x,1.45,z);
   A(new T.PlaneGeometry(1.75,2.48),new T.MeshBasicMaterial({map:tx,toneMapped:false}),x,1.48,z-.08);
 }
 // presentation pods beneath existing static cars
 carPod(-5,0,0xffffff);carPod(0,-.4,0x4b6b8c);carPod(5,.3,0x8a4e49);
 // ceiling lighting grid
 for(const z of[-4.2,-1.4,1.4,4.2])for(const x of[-7,-3.5,0,3.5,7]){
   let m=M(0xffe9c4,.22,.02,0xffd083,0);warm.push(m);A(new T.BoxGeometry(1.7,.08,.26),m,x,5.70,z);
 }
 // sales consultation corner
 desk(-5.7,-4.8);desk(0,-4.8);desk(5.7,-4.8);
 // lounge
 A(new T.BoxGeometry(4.0,.58,1.20),M(0x52616a,.72),0,.48,4.6);
 A(new T.BoxGeometry(4.0,.78,.22),M(0x52616a,.72),0,.92,5.08);
 A(new T.BoxGeometry(2.6,.12,1.15),M(0x8c704e,.74),0,.52,3.0);
 // vehicle info boards
 infoBoard(-8.2,2.0,'LUX E','ELEKTRO · PREMIUM');
 infoBoard(8.2,2.0,'LUX GT','SPORT · TOURING');
 // accessory wall
 A(new T.BoxGeometry(5.2,2.2,.16),M(0x4a5257,.50,.34),7.0,2.1,-6.75);
 if(!mobile){
   for(let x=5.3;x<=8.7;x+=1.1){
     let rim=A(new T.TorusGeometry(.34,.08,9,20),metal,x,2.55,-6.86);rim.rotation.y=Math.PI/2;
     A(new T.BoxGeometry(.34,.28,.12),M(0x6b7780,.54),x,1.35,-6.86);
   }
 }
 // front reception
 A(new T.BoxGeometry(5.0,1.05,1.0),white,-6.5,.54,5.8);
 A(new T.BoxGeometry(4.4,.10,1.1),gold,-6.5,1.10,5.8);
 // exterior forecourt, aligned with dealership transform
 const yard=new T.Group();yard.name='LuxDealerYard1060';yard.position.set(B.dealer.x,0,B.dealer.z);yard.rotation.y=B.dealer.rot||0;W.scene.add(yard);
 const Y=(geo,mat,x,y,z)=>A(geo,mat,x,y,z,yard);
 Y(new T.BoxGeometry(18,.05,8),M(0x696b69,.90),0,.03,11.0);
 for(const x of[-6,-2,2,6]){Y(new T.BoxGeometry(.10,.02,6.7),white,x,.065,11.0);Y(new T.BoxGeometry(2.9,.02,.10),white,x,.066,13.9)}
 // flag poles and showroom sign
 for(const x of[-7.5,7.5]){Y(new T.CylinderGeometry(.045,.055,5.5,8),metal,x,2.75,14.2);Y(new T.BoxGeometry(1.2,.72,.04),x<0?gold:M(0x3e6682,.58),x+(x<0?.62:-.62),4.75,14.2)}
 function signTex(){let c=document.createElement('canvas');c.width=700;c.height=190;let x=c.getContext('2d');x.fillStyle='#17212a';x.fillRect(0,0,700,190);x.fillStyle='#e6bb55';x.font='900 60px Arial';x.textAlign='center';x.fillText('LUX CITY AUTO',350,88);x.fillStyle='#d9e2e7';x.font='700 28px Arial';x.fillText('NEUWAGEN · GEBRAUCHT · SERVICE',350,135);let t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t}
 Y(new T.BoxGeometry(7.8,2.0,.20),dark,0,1.95,15.2);
 Y(new T.PlaneGeometry(7.3,1.55),new T.MeshBasicMaterial({map:signTex(),toneMapped:false}),0,2.0,15.32);
 W.registerTick?.((dt)=>{let h=(window.LuxLife?.state?.hour??12)+(window.LuxLife?.state?.minute??0)/60,night=h>=19||h<6.5;for(const m of warm)m.emissiveIntensity+=( (night?1.0:.42)-m.emissiveIntensity)*Math.min(1,dt*2.4)});
 window.LuxDealerVisual1060={version:'10.6.0',root,yard}
}
