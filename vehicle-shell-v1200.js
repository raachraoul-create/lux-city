import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

function roundedBox(w,h,d,r=.10){
 r=Math.min(r,w*.22,h*.34);
 const s=new T.Shape(),x=-w/2,y=-h/2;
 s.moveTo(x+r,y);s.lineTo(w/2-r,y);s.quadraticCurveTo(w/2,y,w/2,y+r);s.lineTo(w/2,h/2-r);s.quadraticCurveTo(w/2,h/2,w/2-r,h/2);s.lineTo(x+r,h/2);s.quadraticCurveTo(x,h/2,x,h/2-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);
 const g=new T.ExtrudeGeometry(s,{depth:d,steps:1,bevelEnabled:true,bevelSegments:2,bevelSize:Math.min(.045,r*.35),bevelThickness:Math.min(.045,r*.35),curveSegments:5});
 g.translate(0,0,-d/2);g.computeVertexNormals();return g
}
function wedge(wBottom,wTop,h,d,frontLean=0,rearLean=0){
 const zf=-d/2,zr=d/2,y0=0,y1=h,verts=[
  -wBottom/2,y0,zf, wBottom/2,y0,zf, -wTop/2,y1,zf+frontLean, wTop/2,y1,zf+frontLean,
  -wBottom/2,y0,zr, wBottom/2,y0,zr, -wTop/2,y1,zr-rearLean, wTop/2,y1,zr-rearLean
 ],idx=[
  0,1,3,0,3,2, 4,6,7,4,7,5,
  0,2,6,0,6,4, 1,5,7,1,7,3,
  2,3,7,2,7,6, 0,4,5,0,5,1
 ];
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(verts,3));g.setIndex(idx);g.computeVertexNormals();return g
}
function glassPanel(w,h,mat,parent,x,y,z,rx=0,ry=0){
 const m=new T.Mesh(new T.PlaneGeometry(w,h),mat);m.position.set(x,y,z);m.rotation.x=rx;m.rotation.y=ry;m.renderOrder=2;parent.add(m);return m
}

export function createCarBody(width,profile,color,wheelbase=1.48,radius=.36,style='sedan'){
 const group=new T.Group();group.name='VehicleBody1200';group.userData.structuralBody=true;
 const paint=new T.MeshPhysicalMaterial({color,roughness:.25,metalness:.34,clearcoat:.92,clearcoatRoughness:.16});
 const darkPaint=new T.MeshStandardMaterial({color:0x20262a,roughness:.34,metalness:.40});
 const glass=new T.MeshPhysicalMaterial({color:0x263c48,roughness:.09,metalness:.18,transparent:true,opacity:.78,clearcoat:1,clearcoatRoughness:.08});
 group.userData.bodyPaint=paint;
 const length=Math.max(...profile.map(p=>Math.abs(p[0])))*2,roof=Math.max(...profile.map(p=>p[1]));
 const spec={
  sedan:{bodyH:.58,cabH:.62,cabLen:.46,cabZ:.03,hood:.26,tail:.20,roofW:.72,leanF:.18,leanR:.12},
  hatch:{bodyH:.58,cabH:.68,cabLen:.52,cabZ:.09,hood:.23,tail:.11,roofW:.74,leanF:.16,leanR:.04},
  suv:{bodyH:.70,cabH:.78,cabLen:.54,cabZ:.04,hood:.23,tail:.16,roofW:.78,leanF:.12,leanR:.06},
  crossover:{bodyH:.65,cabH:.72,cabLen:.52,cabZ:.03,hood:.24,tail:.14,roofW:.76,leanF:.15,leanR:.08},
  coupe:{bodyH:.54,cabH:.55,cabLen:.40,cabZ:.02,hood:.31,tail:.18,roofW:.68,leanF:.22,leanR:.19},
  sport:{bodyH:.50,cabH:.50,cabLen:.37,cabZ:-.03,hood:.34,tail:.18,roofW:.66,leanF:.25,leanR:.22},
  wagon:{bodyH:.59,cabH:.69,cabLen:.57,cabZ:.08,hood:.24,tail:.13,roofW:.75,leanF:.15,leanR:.04},
  pickup:{bodyH:.66,cabH:.70,cabLen:.34,cabZ:-.23,hood:.25,tail:.33,roofW:.76,leanF:.12,leanR:.05},
  van:{bodyH:.72,cabH:1.03,cabLen:.72,cabZ:.06,hood:.12,tail:.08,roofW:.86,leanF:.04,leanR:.02}
 }[style]||null;
 const s=spec||{bodyH:.58,cabH:.64,cabLen:.48,cabZ:.03,hood:.25,tail:.17,roofW:.72,leanF:.16,leanR:.10};
 const bodyY=.39+s.bodyH/2;
 const base=new T.Mesh(roundedBox(width,s.bodyH,length*.91,.13),paint);base.position.y=bodyY;base.castShadow=true;base.receiveShadow=true;group.add(base);
 // Lower sill makes the body visually sit around the wheels rather than above them.
 const sill=new T.Mesh(roundedBox(width*.94,.16,length*.74,.045),darkPaint);sill.position.y=.35;group.add(sill);
 const hoodLen=length*s.hood,tailLen=length*s.tail;
 if(style!=='van'){
  const hood=new T.Mesh(roundedBox(width*.90,.25,hoodLen,.07),paint);hood.position.set(0,.78,-length*.5+hoodLen*.55);hood.rotation.x=-.025;group.add(hood);
  const tail=new T.Mesh(roundedBox(width*.88,.22,tailLen,.06),paint);tail.position.set(0,.76,length*.5-tailLen*.55);group.add(tail)
 }
 const cabLen=length*s.cabLen,cabH=Math.min(s.cabH,Math.max(.45,roof-.83)),cabZ=length*s.cabZ;
 const cabin=new T.Mesh(wedge(width*.82,width*s.roofW,cabH,cabLen,s.leanF,s.leanR),paint);cabin.position.set(0,.83,cabZ);cabin.castShadow=true;group.add(cabin);
 const winH=Math.max(.30,cabH*.62),sideLen=cabLen*.68;
 for(const sx of[-1,1]){
   const side= new T.Mesh(new T.PlaneGeometry(sideLen,winH),glass);side.rotation.y=sx*Math.PI/2;side.position.set(sx*(width*.414),.83+cabH*.58,cabZ-.01);group.add(side);
   const pillar=new T.Mesh(new T.BoxGeometry(.025,winH*.96,.055),darkPaint);pillar.position.set(sx*(width*.419),.83+cabH*.58,cabZ+.03);group.add(pillar)
 }
 const frontZ=cabZ-cabLen/2+s.leanF*.5,rearZ=cabZ+cabLen/2-s.leanR*.5;
 glassPanel(width*.62,winH,glass,group,0,.83+cabH*.57,frontZ,-Math.atan2(s.leanF,cabH),Math.PI);
 glassPanel(width*.60,winH*.92,glass,group,0,.83+cabH*.56,rearZ,Math.atan2(s.leanR,cabH),0);
 // Painted roof cap prevents the whole upper section from reading as one dark block.
 const roofCap=new T.Mesh(roundedBox(width*s.roofW*.96,.055,cabLen*.52,.025),style==='sport'?darkPaint:paint);roofCap.position.set(0,.83+cabH+.015,cabZ);group.add(roofCap);
 if(style==='pickup'){
   const bed=new T.Mesh(roundedBox(width*.90,.24,length*.30,.06),paint);bed.position.set(0,.72,length*.30);group.add(bed);
   const bedFloor=new T.Mesh(roundedBox(width*.78,.08,length*.26,.025),darkPaint);bedFloor.position.set(0,.86,length*.31);group.add(bedFloor)
 }
 if(style==='van'){
   // Tall van gets broad side glazing and a flatter roof.
   for(const sx of[-1,1]){const w=new T.Mesh(new T.PlaneGeometry(cabLen*.70,cabH*.52),glass);w.rotation.y=sx*Math.PI/2;w.position.set(sx*(width*.416),1.36,cabZ+.03);group.add(w)}
 }
 return group
}
