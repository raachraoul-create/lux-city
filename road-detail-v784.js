import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{let W=window.LuxWorld,Traf=window.LuxTraffic720||window.LuxTraffic710;if(!W?.scene||!Traf?.crosswalks?.length)return;clearInterval(q);
const S=W.scene,M=(c,r=.86,m=.01)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m});
for(let o of [...S.children])if(o.userData?.roadDetail783||o.userData?.roadDetail784)S.remove(o);
const root=new T.Group();root.userData.roadDetail784=true;S.add(root);
function A(g,m,x,y,z){let o=new T.Mesh(g,m);o.position.set(x,y,z);o.receiveShadow=true;o.castShadow=false;root.add(o);return o}
const asphalt=M(0x34393c,.97,.01),white=M(0xe8e6df,.76,.01);
function zebra(c){
  const x=c.x,z=c.z,axis=c.axis,count=10,gap=.72,bar=.42,span=3.55,cover=7.8;
  if(axis==='x'){
    A(new T.BoxGeometry(cover,.026,5.0),asphalt,x,.126,z);
    for(let i=0;i<count;i++){let off=(i-(count-1)/2)*gap;A(new T.BoxGeometry(bar,.022,span),white,x+off,.146,z)}
  }else{
    A(new T.BoxGeometry(5.0,.026,cover),asphalt,x,.126,z);
    for(let i=0;i<count;i++){let off=(i-(count-1)/2)*gap;A(new T.BoxGeometry(span,.022,bar),white,x,.146,z+off)}
  }
}
for(let c of Traf.crosswalks)zebra(c);
window.LuxRoadDetail784={crosswalkCount:Traf.crosswalks.length,orientationFixed:true,root}},260);