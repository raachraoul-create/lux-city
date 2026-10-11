import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{let W=window.LuxWorld;if(!W?.scene||!window.LuxRoadNetwork1100)return;clearInterval(q);init(W)},500);
function init(W){
 const S=W.scene,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900,root=new T.Group();root.name='LuxRoadLanePolish1150';S.add(root);
 const M=(c,r=.72,m=.03)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m}),asphalt=M(0x2a3034,.92),white=M(0xf2efe6,.64),yellow=M(0xe2b64e,.62),reflect=M(0xe9f4ff,.28,.18,);
 const A=(g,m,x,y,z)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=true;root.add(o);return o};
 function pad(x,z,w=21,d=21){A(new T.BoxGeometry(w,.045,d),asphalt,x,.108,z)}
 for(const p of [[0,-330],[0,330],[-125,-330],[125,-330],[-125,330],[125,330],[-360,-135],[-360,135],[360,-135],[360,135]])pad(p[0],p[1],19,19);
 function arrow(x,z,rot=0,scale=1){
   const g=new T.Group();g.position.set(x,.145,z);g.rotation.y=rot;root.add(g);
   A(new T.BoxGeometry(.24,.012,2.0*scale),white,0,.01,0).parent!==g&&0;
 }
 // Lane arrows built directly into root groups.
 function markArrow(x,z,rot=0){
   const g=new T.Group();g.position.set(x,.15,z);g.rotation.y=rot;root.add(g);
   const stem=new T.Mesh(new T.BoxGeometry(.18,.012,1.7),white);stem.position.z=.15;g.add(stem);
   const l=new T.Mesh(new T.BoxGeometry(.18,.012,.9),white),r=new T.Mesh(new T.BoxGeometry(.18,.012,.9),white);l.position.set(-.25,.001,-.70);r.position.set(.25,.001,-.70);l.rotation.y=-.62;r.rotation.y=.62;g.add(l,r)
 }
 for(const [x,z,r] of [[-3.6,-300,0],[3.6,300,Math.PI],[-330,-132.7,Math.PI/2],[330,137.3,-Math.PI/2],[-330,325.8,Math.PI/2],[330,-325.8,-Math.PI/2],[-300,-424,Math.PI/2],[300,-436,-Math.PI/2],[-300,424,Math.PI/2],[300,436,-Math.PI/2]])markArrow(x,z,r);
 if(!mobile){
   for(const z of[-430,430])for(let x=-430;x<=430;x+=18){let s=A(new T.BoxGeometry(.20,.025,.08),x%36?white:yellow,x,.16,z);s.material.emissive=new T.Color(0xddeeff);s.material.emissiveIntensity=.12}
   for(const x of[-460,460])for(let z=-395;z<=395;z+=18){let s=A(new T.BoxGeometry(.08,.025,.20),z%36?white:yellow,x,.16,z);s.material.emissive=new T.Color(0xddeeff);s.material.emissiveIntensity=.12}
 }
 window.LuxRoadLanePolish1150={version:'11.5.0',root}
}
