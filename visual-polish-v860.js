import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{if(!window.LuxWorld?.roads?.length||!window.LuxWorld?.houseSites?.length)return;clearInterval(q);init()},350);
function init(){const W=LuxWorld,S=W.scene,M=(c,r=.8,m=.03,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei}),A=(g,m,x,y,z,p=S)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=true;p.add(o);return o},groups=[];
 let line=M(0xe9e4cf,.72),edge=M(0xc9c5ba,.9),green=M(0x4b7741,.95),flower=[M(0xa94747,.82),M(0xd3a841,.82),M(0x8662a6,.82)];
 for(const r of W.roads){let vertical=r.l>r.w;if(vertical){for(let z=r.z-r.l/2+7;z<r.z+r.l/2-7;z+=12)A(new T.BoxGeometry(.12,.018,5.8),line,r.x,.112,z);for(let sx of[-1,1])A(new T.BoxGeometry(.18,.10,r.l),edge,r.x+sx*(r.w/2+.38),.10,r.z)}else{for(let x=r.x-r.l/2+7;x<r.x+r.l/2-7;x+=12)A(new T.BoxGeometry(5.8,.018,.12),line,x,.112,r.z);for(let sz of[-1,1])A(new T.BoxGeometry(r.l,.10,.18),edge,r.x,.10,r.z+sz*(r.w/2+.38))}}
 function planter(x,z,i){let g=new T.Group();A(new T.CylinderGeometry(.42,.48,.42,10),M(0x6e6254,.92),0,.21,0,g);A(new T.SphereGeometry(.50,9,7),green,0,.70,0,g);for(let k=0;k<4;k++){let a=k*Math.PI/2;A(new T.SphereGeometry(.07,7,5),flower[(i+k)%flower.length],Math.sin(a)*.33,.76,Math.cos(a)*.33,g)}g.position.set(x,0,z);S.add(g);groups.push(g)}
 for(let i=0,z=-250;z<=250;z+=55,i++){planter(-16.5,z,i);planter(16.5,z,i+1)}
 function bollard(x,z){let g=new T.Group();A(new T.CylinderGeometry(.07,.09,.72,8),M(0x343a3e,.45,.58),0,.36,0,g);A(new T.BoxGeometry(.16,.06,.16),M(0xe7d9a7,.5),0,.66,0,g);g.position.set(x,0,z);S.add(g);groups.push(g)}
 for(let z of[-154,-116,116,154])for(let x of[-18,18])bollard(x,z);
 for(let [i,h] of W.houseSites.entries()){if(i%3)continue;let g=new T.Group(),front=h.d/2+3.1;for(let sx of[-1,1])A(new T.SphereGeometry(.42,8,6),green,sx*2.0,.45,front,g);if(i%2===0)A(new T.BoxGeometry(1.8,.08,.55),M(0x72543b,.88),0,.55,front+.35,g);g.position.set(h.x,0,h.z);g.rotation.y=h.rot||0;S.add(g);groups.push(g)}
 if(W.renderer){W.renderer.toneMappingExposure=1.08}
 window.LuxVisualPolish860={groups}
}