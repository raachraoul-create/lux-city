import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{if(!window.LuxWorld?.scene||!window.LuxWorld?.roads||!window.LuxWorld?.cars)return;clearInterval(q);init(LuxWorld)},160);
function init(W){
 const S=W.scene,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 if(S.getObjectByName('LuxRoadNetwork1090'))return;
 const root=new T.Group();root.name='LuxRoadNetwork1090';S.add(root);
 const M=(c,r=.86,m=.02)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m});
 const asphalt=M(0x30363a,.91,.025),asphalt2=M(0x272d31,.90,.03),white=M(0xece9df,.68,.02),yellow=M(0xe1b94f,.66,.02),barrier=M(0x9ca2a4,.36,.52),green=M(0x315e45,.58,.12),dark=M(0x252b30,.48,.34);
 const A=(g,m,x,y,z,p=root)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=true;p.add(o);return o};
 function road(x,z,width,length,rot=0,kind='arterial'){
   const mesh=A(new T.BoxGeometry(width,.10,length),kind==='highway'?asphalt2:asphalt,x,.05,z);mesh.rotation.y=rot;mesh.userData.roadNetwork1090=true;mesh.userData.highway=kind==='highway';
   const rec={x,z,w:rot?width:length,l:rot?length:width,rot,mesh,highway:kind==='highway'};W.roads.push(rec);return rec
 }
 function laneRoad(x,z,width,length,rot=0,kind='arterial'){
   const r=road(x,z,width,length,rot,kind),g=new T.Group();g.position.set(x,.115,z);g.rotation.y=rot;root.add(g);
   const lanes=kind==='highway'?4:2;
   if(kind==='highway'){
     A(new T.BoxGeometry(.16,.018,length-4),yellow,-width*.055,.01,0,g);
     A(new T.BoxGeometry(.16,.018,length-4),yellow,width*.055,.01,0,g);
     for(const sx of[-1,1])for(let zz=-length/2+8;zz<length/2-5;zz+=16)A(new T.BoxGeometry(.10,.018,7.4),white,sx*width*.25,.012,zz,g);
     for(const sx of[-1,1])A(new T.BoxGeometry(.14,.018,length-3),white,sx*(width/2-.9),.012,0,g);
     if(!mobile)for(const sx of[-1,1])for(let zz=-length/2+4;zz<length/2-3;zz+=5.2){
       A(new T.BoxGeometry(.08,.58,1.55),barrier,sx*(width/2+.55),.34,zz,g);
     }
   }else{
     for(let zz=-length/2+8;zz<length/2-5;zz+=15)A(new T.BoxGeometry(.10,.018,7),white,0,.012,zz,g);
     for(const sx of[-1,1])A(new T.BoxGeometry(.10,.018,length-3),white,sx*(width/2-.45),.012,0,g);
   }
   return r
 }
 // Outer ring around the existing town.
 laneRoad(-360,0,18,660,0,'ring');laneRoad(360,0,18,660,0,'ring');
 laneRoad(0,-330,18,720,Math.PI/2,'ring');laneRoad(0,330,18,720,Math.PI/2,'ring');
 // Extend existing north/south side streets to the ring.
 for(const x of[-125,125]){laneRoad(x,-282.5,11,95,0);laneRoad(x,282.5,11,95,0)}
 // Extend east/west streets to the ring.
 for(const z of[-135,135]){laneRoad(-267.5,z,11,185,Math.PI/2);laneRoad(267.5,z,11,185,Math.PI/2)}
 // Clear motorway south of town, plus two feeder roads.
 laneRoad(0,-430,24,920,Math.PI/2,'highway');
 laneRoad(-240,-380,12,100,0,'feeder');laneRoad(240,-380,12,100,0,'feeder');
 // On/off ramps: visual geometry, kept out of W.roads so map stays clean.
 function ramp(x1,z1,x2,z2){
   const dx=x2-x1,dz=z2-z1,len=Math.hypot(dx,dz),g=A(new T.BoxGeometry(8,.075,len),asphalt2,(x1+x2)/2,.07,(z1+z2)/2);g.rotation.y=Math.atan2(dx,dz);
   for(const off of[-2.8,2.8]){let e=A(new T.BoxGeometry(.10,.02,len-2),white,(x1+x2)/2,.12,(z1+z2)/2);e.rotation.y=Math.atan2(dx,dz);e.position.x+=Math.cos(e.rotation.y)*off;e.position.z-=Math.sin(e.rotation.y)*off}
 }
 ramp(-240,-330,-285,-430);ramp(240,-330,285,-430);
 // Highway signs.
 function sign(text,x,z,rot=0){
   const c=document.createElement('canvas');c.width=700;c.height=260;const cx=c.getContext('2d');cx.fillStyle='#24543d';cx.fillRect(0,0,700,260);cx.strokeStyle='#fff';cx.lineWidth=12;cx.strokeRect(12,12,676,236);cx.fillStyle='#fff';cx.font='900 54px Arial';cx.textAlign='center';cx.fillText(text,350,105);cx.font='800 35px Arial';cx.fillText('LUX CITY · ZENTRUM',350,175);let tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;
   const g=new T.Group();g.position.set(x,0,z);g.rotation.y=rot;root.add(g);A(new T.CylinderGeometry(.07,.09,5.4,8),barrier,-2.7,2.7,0,g);A(new T.CylinderGeometry(.07,.09,5.4,8),barrier,2.7,2.7,0,g);A(new T.PlaneGeometry(6.0,2.25),new T.MeshBasicMaterial({map:tx,toneMapped:false}),0,5.2,0,g)
 }
 sign('A-LUX 1',-300,-418,Math.PI);sign('A-LUX 1',300,-442,0);
 // Lightweight extra traffic shells; vehicle-rebuild upgrades them later.
 const extraColors=[0x244f78,0xa23d3b,0xe8e6df,0x262b30,0x50724d,0xc28b37,0x6c4f83,0xb9b5ab,0x1f6b68,0xcf6a34,0x6f1f36,0x8da2b0];
 function trafficSeed(i){
   const g=new T.Group(),van=i%9===0;A(new T.BoxGeometry(van?2.35:2.02,van?1.45:.72,van?5.0:4.25),M(extraColors[i%extraColors.length],.34,.20),0,van?1.08:.68,0,g);g.userData={speed:5.2+(i%5)*.55,r:van?2.75:2.3,halfW:van?1.18:1.02,halfL:van?2.5:2.15,roadNetwork1090:true};g.visible=true;S.add(g);W.cars.push(g);return g
 }
 const addCount=mobile?12:20;for(let i=0;i<addCount;i++)trafficSeed(i);
 // Make road detection include the new network.
 W.onRoad=(x,z,pad=5)=>{for(const r of W.roads){const dx=x-r.x,dz=z-r.z,cs=Math.cos(-(r.rot||0)),sn=Math.sin(-(r.rot||0)),lx=dx*cs-dz*sn,lz=dx*sn+dz*cs;const width=r.highway?24:(r.l<r.w?r.l:r.w),length=r.highway?920:(r.l>r.w?r.l:r.w);if(Math.abs(lx)<=width/2+pad&&Math.abs(lz)<=length/2+pad)return true}return false};
 window.LuxRoadNetwork1090={version:'10.9.0',root,addedCars:addCount}
}
