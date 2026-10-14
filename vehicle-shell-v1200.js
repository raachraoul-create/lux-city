import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

// One lightweight mesh per main panel. Every class has its own roof, cabin and wheel clearance.
function bodyLoft(width,length,height,waist=.94){
 const profile=[[-.5,.72],[-.455,.88],[-.35,.985],[-.19,1],[.18,1],[.37,.985],[.465,.87],[.5,.73]];
 const vertices=[],indices=[];
 for(const [z,fw] of profile){
  const w=width*fw/2;
  vertices.push(-w,.32,z*length,w,.32,z*length,
   -w,height-.08,z*length,w,height-.08,z*length,
   -w*waist,height,z*length,w*waist,height,z*length);
 }
 const faces=[[0,1],[1,3],[3,5],[5,4],[4,2],[2,0]];
 for(let i=0;i<profile.length-1;i++)for(let k=0;k<faces.length;k++){
  const [u,v]=faces[k],a=i*6+u,b=i*6+v,c=(i+1)*6+v,d=(i+1)*6+u;
  indices.push(a,b,c,a,c,d);
 }
 for(let k=0;k<5;k++){indices.push(0,k+1,k);let off=(profile.length-1)*6;indices.push(off,off+k,off+k+1)}
 const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(vertices,3));geo.setIndex(indices);geo.computeVertexNormals();return geo
}
function quad(points,material,owner){
 const g=new T.BufferGeometry(),p=[];
 for(const a of points)p.push(...a);
 g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setIndex([0,1,2,0,2,3]);g.computeVertexNormals();
 const o=new T.Mesh(g,material);o.renderOrder=1;owner.add(o);return o
}
const SHAPES={
 sedan:{hood:.29,rear:.24,cabin:.46,pos:-.025,h:.65,top:.70,roof:.93,front:.20,back:.17},
 hatch:{hood:.27,rear:.13,cabin:.55,pos:.05,h:.69,top:.76,roof:.90,front:.19,back:.055},
 suv:{hood:.25,rear:.18,cabin:.56,pos:.025,h:.91,top:.80,roof:1.03,front:.15,back:.09},
 crossover:{hood:.265,rear:.15,cabin:.54,pos:.015,h:.79,top:.77,roof:.96,front:.18,back:.12},
 coupe:{hood:.34,rear:.23,cabin:.40,pos:.005,h:.53,top:.67,roof:.86,front:.23,back:.21},
 sport:{hood:.37,rear:.22,cabin:.36,pos:-.035,h:.46,top:.63,roof:.83,front:.24,back:.23},
 wagon:{hood:.26,rear:.15,cabin:.61,pos:.04,h:.76,top:.77,roof:.94,front:.17,back:.055},
 pickup:{hood:.29,rear:.32,cabin:.35,pos:-.15,h:.75,top:.78,roof:.94,front:.13,back:.07},
 van:{hood:.13,rear:.10,cabin:.77,pos:.035,h:1.12,top:.86,roof:.98,front:.065,back:.04}
};
export function createCarBody(width,profile,color,wheelbase=1.48,radius=.36,style='sedan',sharedPaint=null){
 const s=SHAPES[style]||SHAPES.sedan;
 const length=2*Math.max(...profile.map(p=>Math.abs(p[0])));
 const group=new T.Group();group.name='VehicleBody1200';group.userData.structuralBody=true;group.userData.bodyStyle=style;
 const paint=sharedPaint||new T.MeshPhysicalMaterial({color,roughness:.24,metalness:.24,clearcoat:.7,clearcoatRoughness:.18});
 paint.color.setHex(color);paint.side=T.DoubleSide;group.userData.bodyPaint=paint;
 const glass=new T.MeshStandardMaterial({color:0x253b49,roughness:.16,metalness:.26,side:T.DoubleSide});
 const seal=new T.MeshStandardMaterial({color:0x161b20,roughness:.40,metalness:.13});
 const low=style==='suv'||style==='van'||style==='pickup'?1.00:.88;
 const main=new T.Mesh(bodyLoft(width,length,low),paint);main.name='BodyMetal';main.castShadow=true;main.receiveShadow=true;group.add(main);
 const cabinL=length*s.cabin,cabZ=length*s.pos,front=cabZ-cabinL/2,rear=cabZ+cabinL/2;
 const y0=.85,yTop=y0+s.h,roofFront=front+s.front,roofRear=rear-s.back;
 const bottomW=width*.43,topW=width*s.top/2;
 const V=[
  [-bottomW,y0,front],[bottomW,y0,front],[-bottomW,y0,rear],[bottomW,y0,rear],
  [-topW,yTop,roofFront],[topW,yTop,roofFront],[-topW,yTop,roofRear],[topW,yTop,roofRear]
 ];
 const fac=[[0,1,5,4],[2,6,7,3],[0,4,6,2],[1,3,7,5],[4,5,7,6]];
 for(const f of fac)quad(f.map(i=>V[i]),paint,group);
 const b=.06,upper=.075;
 // Side windows follow the sloped metal panels; no floating rectangular glass slabs.
 for(const side of[-1,1]){
  const x0=side*(bottomW+.007),x1=side*(topW+.008);
  quad([[x0,y0+.10,front+.16],[x0,y0+.10,rear-.15],[x1,yTop-upper,roofRear-.07],[x1,yTop-upper,roofFront+.08]],glass,group);
  const bar=new T.Mesh(new T.BoxGeometry(.028,s.h*.83,.04),seal);bar.position.set(side*(bottomW*.60+topW*.40),y0+s.h*.50,cabZ+.03);group.add(bar);
  // Silhouette crease and door separation on both sides.
  const crease=new T.Mesh(new T.BoxGeometry(.016,.018,length*.42),seal);crease.position.set(side*(width*.492),.72,cabZ);group.add(crease);
 }
 quad([[-bottomW+.06,y0+.08,front-.014],[bottomW-.06,y0+.08,front-.014],[topW-.035,yTop-upper,roofFront-.018],[-topW+.035,yTop-upper,roofFront-.018]],glass,group);
 quad([[bottomW-.06,y0+.09,rear+.014],[-bottomW+.06,y0+.09,rear+.014],[-topW+.035,yTop-upper,roofRear+.018],[topW-.035,yTop-upper,roofRear+.018]],glass,group);
 // Curved-looking bonnet panel and luggage lid without a second full-width box.
 const bonnet=new T.Mesh(new T.BoxGeometry(width*.80,.028,length*Math.min(.22,s.hood*.8)),paint);
 bonnet.position.set(0,low+.012,-length*(.5-s.hood*.42));group.add(bonnet);
 if(style==='pickup'){
  const bed=new T.Mesh(new T.BoxGeometry(width*.83,.045,length*.28),seal);
  bed.position.set(0,.94,length*.32);group.add(bed);
  for(const side of[-1,1]){
   const rail=new T.Mesh(new T.BoxGeometry(.09,.26,length*.31),paint);
   rail.position.set(side*width*.46,1.02,length*.32);group.add(rail)
  }
 }
 if(['suv','crossover','wagon','van'].includes(style)){
  for(const side of[-1,1]){
   const rail=new T.Mesh(new T.BoxGeometry(.035,.055,cabinL*.70),seal);
   rail.position.set(side*topW*.83,yTop+.05,cabZ);group.add(rail)
  }
 }
 if(['sport','coupe'].includes(style)){
  const diffuser=new T.Mesh(new T.BoxGeometry(width*.63,.07,.20),seal);
  diffuser.position.set(0,.39,length*.49);group.add(diffuser)
 }
 return group
}
