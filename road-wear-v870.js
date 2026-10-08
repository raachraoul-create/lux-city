import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{if(!window.LuxWorld?.roads?.length||!(window.LuxGraphics940||window.LuxGraphics930))return;clearInterval(q);init()},420);
function init(){
 const W=LuxWorld,G=window.LuxGraphics940||window.LuxGraphics930,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 const S=W.scene,old=S.getObjectByName('LuxRoadWear870');if(old)S.remove(old);
 const root=new T.Group();root.name='LuxRoadWear870';S.add(root);
 let seed=9735;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
 const M=(c,r=.82,m=.02,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const asphalt=M(0x282d30,.94,.01),patch=M(0x454a4d,.92,.01),crack=M(0x191d1f,.98,.01),metal=M(0x555c60,.46,.62),dark=M(0x24292c,.62,.28),reflect=M(0x8fa5ae,.34,.25);
 const A=(g,m,x,y,z,p=root)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=true;p.add(o);return o};

 function roadData(){
   let out=[];
   for(const r of W.roads||[]){if(!r?.mesh)continue;let gp=r.mesh.geometry?.parameters||{},w=gp.width||10,l=gp.depth||40;out.push({x:r.mesh.position.x,z:r.mesh.position.z,w,l,rot:r.mesh.rotation?.y||0})}
   for(const r of G.roads||[]){out.push({x:r.x,z:r.z,w:r.w||10,l:r.l||40,rot:r.rot||0})}
   return out
 }
 const roads=roadData(),limit=mobile?Math.min(roads.length,10):roads.length;
 function local(g,x,z){let o=new T.Group();o.position.set(x,.147,z);g.add(o);return o}
 function addPatch(rd,i){
   const g=new T.Group();g.position.set(rd.x,0,rd.z);g.rotation.y=rd.rot;root.add(g);
   let count=mobile?1:2+(i%2);
   for(let k=0;k<count;k++){
     let z=(rnd()-.5)*(rd.l-12),x=(rnd()-.5)*rd.w*.40,w=.9+rnd()*1.7,l=2.2+rnd()*4.0;
     let p=A(new T.BoxGeometry(w,.012,l),k%2?patch:asphalt,x,.145,z,g);p.rotation.y=(rnd()-.5)*.12;
     if(!mobile){for(let c=0;c<2;c++){let cr=A(new T.BoxGeometry(.025,.014,l*.52),crack,x+(rnd()-.5)*w*.42,.154,z+(rnd()-.5)*l*.18,g);cr.rotation.y=(rnd()-.5)*.50}}
   }
   // occasional manhole on lane, never changes collision.
   if(i%3===0){
     let z=(rnd()-.5)*(rd.l*.55),x=(rnd()>.5?1:-1)*Math.min(rd.w*.20,2.2);
     let lid=A(new T.CylinderGeometry(.43,.43,.025,28),metal,x,.158,z,g);lid.rotation.x=Math.PI/2;
     let ring=A(new T.TorusGeometry(.34,.035,7,24),dark,x,.173,z,g);ring.rotation.x=Math.PI/2;
     if(!mobile)for(let a=0;a<Math.PI*2;a+=Math.PI/4){let b=A(new T.BoxGeometry(.035,.012,.32),dark,x,.178,z,g);b.rotation.y=a}
   }
   // drain grates at curb-side positions.
   if(i%2===0){
     for(const sx of[-1,1]){let grate=A(new T.BoxGeometry(.52,.016,.78),metal,sx*(rd.w/2-.55),.165,(rnd()-.5)*rd.l*.48,g);for(let n=-2;n<=2;n++)A(new T.BoxGeometry(.055,.009,.68),dark,sx*(rd.w/2-.55)+n*.085,.176,grate.position.z,g)}
   }
 }
 for(let i=0;i<limit;i++)addPatch(roads[i],i);

 // central intersections get subtle tire-darkening and service markings.
 const intersections=(window.LuxTraffic861||window.LuxTraffic860)?.intersections||[];
 for(const [x,z] of intersections.slice(0,mobile?4:intersections.length)){
   let skid=A(new T.RingGeometry(5.5,6.0,44,1,0,Math.PI*.70),new T.MeshBasicMaterial({color:0x171b1d,transparent:true,opacity:.14,depthWrite:false,side:T.DoubleSide}),x,.166,z);skid.rotation.x=-Math.PI/2;skid.rotation.z=.25;
   let service=A(new T.CircleGeometry(.42,24),metal,x+4.3,.168,z-4.1);service.rotation.x=-Math.PI/2;
 }
 window.LuxRoadWear870={version:'8.7.0',root,roadCount:roads.length}
}
