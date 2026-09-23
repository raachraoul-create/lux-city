import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{let W=window.LuxWorld,Traf=window.LuxTraffic720||window.LuxTraffic710;if(!W?.scene||!Traf?.signals?.length||!Traf?.crosswalks?.length)return;clearInterval(q);const S=W.scene,M=(c,r=.8,m=.02)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m}),root=new T.Group();root.userData.roadDetail783=true;S.add(root);
for(let s of Traf.signals){let g=s.group;if(!g)continue;g.scale.set(1.55,1.55,1.55);g.userData.luxSignalScale783=true}
const asphalt=M(0x34393c,.96,.01),white=M(0xe9e7df,.74,.015);
function A(g,m,x,y,z){let o=new T.Mesh(g,m);o.position.set(x,y,z);o.receiveShadow=true;o.castShadow=false;root.add(o);return o}
function zebra(c){let x=c.x,z=c.z,axis=c.axis,count=7,gap=.62,span=5.9,width=.34;if(axis==='x'){A(new T.BoxGeometry(7.35,.018,5.35),asphalt,x,.113,z);for(let i=0;i<count;i++){let off=(i-(count-1)/2)*gap;A(new T.BoxGeometry(span,.020,width),white,x,.128,z+off)}}else{A(new T.BoxGeometry(5.35,.018,7.35),asphalt,x,.113,z);for(let i=0;i<count;i++){let off=(i-(count-1)/2)*gap;A(new T.BoxGeometry(width,.020,span),white,x+off,.128,z)}}}
for(let c of Traf.crosswalks)zebra(c);
window.LuxRoadDetail783={signalScale:1.55,crosswalkCount:Traf.crosswalks.length,root}},280);