import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{if(!window.LuxWorld?.scene||!window.LuxTraffic861?.intersections)return;clearInterval(q);init()},340);
function init(){
 const W=LuxWorld,S=W.scene,I=window.LuxTraffic861||window.LuxTraffic860,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 const old=S.getObjectByName('LuxIntersection820');if(old)S.remove(old);
 const root=new T.Group();root.name='LuxIntersection820';S.add(root);
 const M=(c,r=.72,m=.02,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const A=(g,m,x,y,z,p=root)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=true;p.add(o);return o};
 const white=M(0xf0ede3,.72),yellow=M(0xd7b23c,.70),dark=M(0x363b3e,.86),reflect=M(0xc8e5ef,.28,.24,0xbfe8ff,.12),tactile=M(0xd9b53c,.78);
 function arrow(x,z,rot=0){
   const g=new T.Group();g.position.set(x,.145,z);g.rotation.y=rot;root.add(g);
   A(new T.BoxGeometry(.18,.018,2.20),white,0,0,-.35,g);
   const h=new T.Shape();h.moveTo(0,.85);h.lineTo(-.55,.18);h.lineTo(-.20,.18);h.lineTo(-.20,-.68);h.lineTo(.20,-.68);h.lineTo(.20,.18);h.lineTo(.55,.18);h.closePath();
   const geo=new T.ShapeGeometry(h),m=new T.Mesh(geo,white);m.rotation.x=-Math.PI/2;m.rotation.z=Math.PI;m.scale.set(.72,.72,.72);m.position.set(0,.02,-1.15);g.add(m)
 }
 function stopLine(x,z,rot=0){
   const g=new T.Group();g.position.set(x,.146,z);g.rotation.y=rot;root.add(g);A(new T.BoxGeometry(6.0,.018,.36),white,0,0,0,g)
 }
 function tactilePatch(x,z,rot=0){
   const g=new T.Group();g.position.set(x,.151,z);g.rotation.y=rot;root.add(g);A(new T.BoxGeometry(2.1,.022,.72),tactile,0,0,0,g);
   if(!mobile)for(let ix=-4;ix<=4;ix++)for(let iz=-1;iz<=1;iz++)A(new T.CylinderGeometry(.032,.032,.016,7),yellow,ix*.21,.024,iz*.22,g)
 }
 function studs(x,z,rot=0){
   const g=new T.Group();g.position.set(x,.148,z);g.rotation.y=rot;root.add(g);for(let i=-4;i<=4;i++)A(new T.BoxGeometry(.10,.025,.18),reflect,i*.70,0,0,g)
 }
 for(const [x,z] of I.intersections){
   stopLine(x,z-8.2,0);stopLine(x,z+8.2,Math.PI);
   stopLine(x-8.2,z,Math.PI/2);stopLine(x+8.2,z,-Math.PI/2);
   arrow(x-3.4,z-20,0);arrow(x+3.4,z+20,Math.PI);arrow(x-20,z+3.4,Math.PI/2);arrow(x+20,z-3.4,-Math.PI/2);
   tactilePatch(x-9.8,z-7.0,0);tactilePatch(x+9.8,z+7.0,Math.PI);tactilePatch(x-7.0,z+9.8,Math.PI/2);tactilePatch(x+7.0,z-9.8,-Math.PI/2);
   studs(x,z-5.6,0);studs(x,z+5.6,0);
 }
 // subtle reflective center studs on the main vertical corridor
 for(let z=-292;z<=292;z+=12)A(new T.BoxGeometry(.11,.025,.22),reflect,0,.148,z);
 window.LuxIntersection820={version:'8.2.0',root}
}
