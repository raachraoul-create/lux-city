import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{if(!window.LuxWorld?.scene||!window.LuxCityServices?.buildings)return;clearInterval(q);init()},260);
function init(){
 const W=LuxWorld,S=W.scene,fire=LuxCityServices.buildings.find(b=>b.id==='fire');if(!fire)return;
 const M=(c,r=.68,m=.06,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const A=(g,m,x,y,z,p)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=true;p.add(o);return o};
 const g=new T.Group(),front=fire.l/2+.34,w=fire.w,h=fire.h;
 const red=M(0xb31e2d,.56,.12),deepRed=M(0x7f1721,.62,.12),charcoal=M(0x2d3338,.48,.36),metal=M(0x747d82,.40,.52),glass=M(0x486775,.14,.36),white=M(0xe7e8e5,.72,.04),concrete=M(0x8b8f90,.92,.03),yellow=M(0xe2b842,.70,.06),blue=M(0x1c6dba,.26,.22,0x0f64bc,.55);

 function canvasSign(text,bg='#f4f4f1',fg='#171717',accent='#c6202e',wpx=900,hpx=160){
   let c=document.createElement('canvas');c.width=wpx;c.height=hpx;let x=c.getContext('2d');
   x.fillStyle=bg;x.fillRect(0,0,wpx,hpx);x.fillStyle=accent;x.fillRect(0,0,18,hpx);
   x.fillStyle=fg;x.font='900 54px Arial';x.textAlign='center';x.textBaseline='middle';x.fillText(text,wpx/2,hpx/2);
   let t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t
 }
 function panel(x,y,ww,hh,mat=charcoal){A(new T.BoxGeometry(ww,hh,.14),mat,x,y,front+.16,g)}
 function garageDoor(x,num){
   let ww=6.25,hh=4.55,z=front+.25;
   A(new T.BoxGeometry(ww+.34,hh+.32,.20),deepRed,x,2.48,z-.05,g);
   A(new T.BoxGeometry(ww,hh,.13),M(0x3b4348,.34,.44),x,2.48,z+.08,g);
   for(let yy=-1.72;yy<=1.72;yy+=.86)A(new T.BoxGeometry(ww-.18,.055,.055),metal,x,2.48+yy,z+.16,g);
   for(let xx of[-ww*.25,ww*.25])A(new T.BoxGeometry(.045,hh-.18,.045),metal,x+xx,2.48,z+.16,g);
   for(let xx of[-1.65,0,1.65])A(new T.BoxGeometry(1.25,.72,.035),glass,x+xx,3.35,z+.19,g);
   let ntex=canvasSign(String(num),'#c6202e','#ffffff','#c6202e',150,150);
   let n=new T.Mesh(new T.PlaneGeometry(.58,.58),new T.MeshBasicMaterial({map:ntex,transparent:false,side:T.DoubleSide}));
   n.position.set(x,5.0,z+.18);g.add(n)
 }
 [-6.75,0,6.75].forEach((x,i)=>garageDoor(x,i+1));

 // Strong horizontal facade beam and modern upper band.
 A(new T.BoxGeometry(w-.8,.34,.58),red,0,5.24,front+.02,g);
 A(new T.BoxGeometry(w-.8,2.85,.18),M(0x3b4247,.50,.30),0,7.00,front+.15,g);
 for(let x of[-8.2,-5.5,-2.8,2.8,5.5,8.2])A(new T.BoxGeometry(2.05,1.35,.04),glass,x,7.02,front+.27,g);
 for(let x of[-9.4,-4.7,0,4.7,9.4])A(new T.BoxGeometry(.065,2.55,.10),metal,x,7.02,front+.27,g);

 // Main bilingual Luxembourg-style identity board (not an official logo).
 let signTex=canvasSign('FEIERWEHR  ·  POMPIERS  ·  112','#f4f4f1','#181b1d','#c6202e');
 let sign=new T.Mesh(new T.PlaneGeometry(15.8,2.1),new T.MeshBasicMaterial({map:signTex,side:T.DoubleSide}));
 sign.position.set(0,9.0,front+.31);g.add(sign);

 // Luxembourg tricolour detail.
 for(let [yy,col] of[[9.82,0xe21f2f],[9.62,0xf5f5f2],[9.42,0x3b78ba]])A(new T.BoxGeometry(3.6,.16,.055),M(col,.62,.08),-9.55,yy,front+.34,g);

 // Personnel entrance on right.
 A(new T.BoxGeometry(2.15,3.15,.22),white,9.9,1.72,front+.23,g);
 A(new T.BoxGeometry(1.72,2.72,.13),M(0x353c41,.42,.36),9.9,1.64,front+.36,g);
 A(new T.BoxGeometry(1.28,1.62,.035),glass,9.9,2.12,front+.45,g);
 A(new T.BoxGeometry(.08,.52,.08),metal,10.48,1.46,front+.48,g);

 // Training / drying tower silhouette behind station.
 let towerX=8.6,towerZ=-9.6;
 A(new T.BoxGeometry(5.2,13.8,6.2),M(0xa9aca8,.82,.08),towerX,6.9,towerZ,g);
 A(new T.BoxGeometry(4.55,12.8,.20),charcoal,towerX,6.7,towerZ+3.16,g);
 for(let y of[3.0,5.6,8.2,10.8])for(let x of[-1.3,1.3])A(new T.BoxGeometry(1.25,1.05,.04),glass,towerX+x,y,towerZ+3.28,g);
 A(new T.BoxGeometry(5.7,.34,6.7),deepRed,towerX,13.9,towerZ,g);

 // Roof equipment / antenna.
 A(new T.CylinderGeometry(.07,.09,4.1,10),metal,-8.5,12.1,-7.2,g);
 A(new T.BoxGeometry(1.0,.10,.12),metal,-8.1,13.55,-7.2,g);
 A(new T.BoxGeometry(.12,.10,1.0),metal,-8.5,13.55,-7.2,g);
 for(let x of[-5.6,-1.8,2.0,5.8]){let p=A(new T.BoxGeometry(2.7,.06,1.15),M(0x29495d,.18,.62),x,10.38,-4.8,g);p.rotation.x=-.18}

 // Forecourt / apron refinements immediately in front of station.
 A(new T.BoxGeometry(23.2,.055,10.0),concrete,0,.075,front+5.1,g);
 for(let x of[-6.75,0,6.75]){
   A(new T.BoxGeometry(5.8,.018,.12),white,x,.115,front+2.2,g);
   for(let z=front+2.0;z<=front+8.0;z+=1.5)A(new T.BoxGeometry(.12,.02,.72),yellow,x-3.05,.12,z,g)
 }
 for(let x of[-11.0,11.0])for(let z of[front+1.3,front+4.2])A(new T.CylinderGeometry(.10,.12,.9,10),charcoal,x,.45,z,g);

 // Exterior blue alert lamps above the bays.
 for(let x of[-6.75,0,6.75]){let lamp=A(new T.BoxGeometry(.48,.18,.22),blue,x,5.55,front+.42,g);lamp.userData.fireStationBeacon900=true}

 // Side utility details.
 for(let z of[-6,-1,4])A(new T.BoxGeometry(.7,1.0,.38),M(0x485055,.48,.40),-12.65,.52,z,g);

 g.position.set(fire.x,0,fire.z);g.userData.fireStation900=true;S.add(g);

 // Soft pulsing facade alert lamps, purely visual.
 let beacons=[];g.traverse(o=>{if(o.userData?.fireStationBeacon900)beacons.push(o)});
 W.registerTick(()=>{let on=.55+.35*Math.sin(performance.now()*.006);for(let b of beacons)b.material.emissiveIntensity=on});

 window.LuxFireStation900={group:g,beacons,station:{x:fire.x,z:fire.z,w:fire.w,l:fire.l,h:fire.h},style:'Luxembourg rescue-service inspired'}
}