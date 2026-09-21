// v0.9.4 bakery activity extension
export function installBakeryActivity(T,S,mesh,bp,getState,openBakery){
 const customers=[],vans=[];
 const human=(x,z)=>{let g=new T.Group();mesh(new T.CapsuleGeometry(.28,.85,4,8),0x456b88,0,1.4,0,0,g);mesh(new T.SphereGeometry(.27,12,10),0xc98f65,0,2.35,0,0,g);g.position.set(x,0,z);S.add(g);return g};
 for(let i=0;i<7;i++)customers.push({g:human(bp.x+(i%3)*1.1-1.1,bp.z+25+i*1.5),phase:i*.8});
 const van=(x)=>{let g=new T.Group();mesh(new T.BoxGeometry(3.1,2.3,5.5),0xf2f2f2,0,1.3,0,0,g);mesh(new T.BoxGeometry(2.6,.9,1.7),0xaed4e4,0,2.25,-1.35,0,0,g);g.position.set(x,.1,bp.z+31);S.add(g);return g};
 vans.push({g:van(bp.x-6),phase:0},{g:van(bp.x+6),phase:7});
 let arrow=mesh(new T.ConeGeometry(.7,1.8,8),0xffd400,bp.x,19,bp.z);arrow.rotation.z=Math.PI;let ring=mesh(new T.TorusGeometry(3.8,.18,8,30),0xffd400,bp.x,.25,bp.z);ring.rotation.x=Math.PI/2;
 function tick(t){let owned=!!getState()?.bakery;arrow.visible=ring.visible=owned;customers.forEach((c,i)=>{c.phase+=.006;c.g.visible=owned;let q=(Math.sin(c.phase)+1)/2;c.g.position.x=bp.x+(i%3-1)*1.6;c.g.position.z=bp.z+25-q*18;c.g.rotation.y=q>.5?Math.PI:0});vans.forEach((v,i)=>{v.phase+=.0025;v.g.visible=owned;let q=(Math.sin(v.phase)+1)/2;v.g.position.z=bp.z+40-q*24;v.g.position.x=bp.x+(i?6:-6)});if(owned)arrow.position.y=17+Math.sin(t*.004)*1.2}
 return tick}