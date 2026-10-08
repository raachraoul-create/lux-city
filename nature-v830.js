import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{if(!window.LuxWorld?.scene||!window.LuxWorld?.ground)return;clearInterval(q);init()},360);
function init(){
 const W=LuxWorld,S=W.scene,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 const old=S.getObjectByName('LuxNature830');if(old)S.remove(old);
 const root=new T.Group();root.name='LuxNature830';S.add(root);
 let seed=9731;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
 const M=(c,r=.9,m=.01)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m});
 const trunkM=M(0x5e432c,.96),leafM=[M(0x315d34,.98),M(0x416f3b,.98),M(0x557b43,.98),M(0x294f31,.98)],needleM=[M(0x244b34,.99),M(0x315943,.99)],shrubM=[M(0x3f6838,.99),M(0x537a43,.99)],flowerM=[M(0xd0a43d,.86),M(0xb95b68,.86),M(0x8067a7,.86)];
 const trunkGeo=new T.CylinderGeometry(.16,.28,2.8,7),crownGeo=new T.IcosahedronGeometry(1,1),coniferGeo=new T.ConeGeometry(1.35,3.2,9),shrubGeo=new T.IcosahedronGeometry(.55,1),flowerGeo=new T.SphereGeometry(.055,6,5);
 const maxTrees=mobile?70:150,maxShrubs=mobile?90:210;
 const treeTrunks=new T.InstancedMesh(trunkGeo,trunkM,maxTrees),crowns=leafM.map(m=>new T.InstancedMesh(crownGeo,m,maxTrees)),conifers=needleM.map(m=>new T.InstancedMesh(coniferGeo,m,maxTrees)),shrubs=shrubM.map(m=>new T.InstancedMesh(shrubGeo,m,maxShrubs));
 const dummy=new T.Object3D();for(const o of [treeTrunks,...crowns,...conifers,...shrubs]){o.castShadow=!mobile;o.receiveShadow=true;o.count=0;root.add(o)}
 function nearBuilding(x,z,margin=12){
   for(const h of W.houseSites||[]){let rr=Math.max(h.w||10,h.d||10)*.62+margin;if(Math.hypot(x-h.x,z-h.z)<rr)return true}
   for(const d of window.LuxCityServices?.buildings||[]){let rr=Math.max(d.w||12,d.l||12)*.60+margin;if(Math.hypot(x-d.x,z-d.z)<rr)return true}
   let sm=window.LuxSupermarket801||window.LuxSupermarket800;if(sm?.position&&Math.hypot(x-sm.position.x,z-sm.position.z)<28)return true;
   return false
 }
 function nearRoad(x,z){
   if(W.onRoad?.(x,z,4))return true;
   for(const r of W.roads||[]){let gp=r.mesh?.geometry?.parameters||{},cx=r.mesh?.position?.x??r.x??0,cz=r.mesh?.position?.z??r.z??0,w=(gp.width||12)/2+6,l=(gp.depth||40)/2+6,rot=r.mesh?.rotation?.y||0,dx=x-cx,dz=z-cz,c=Math.cos(-rot),s=Math.sin(-rot),lx=dx*c-dz*s,lz=dx*s+dz*c;if(Math.abs(lx)<w&&Math.abs(lz)<l)return true}
   return false
 }
 function valid(x,z){return Math.abs(x)<515&&Math.abs(z)<515&&!nearRoad(x,z)&&!nearBuilding(x,z)}
 let ti=0,si=0;
 function addDeciduous(x,z,s=1,variant=0){
   if(ti>=maxTrees)return;dummy.position.set(x,1.4*s,z);dummy.rotation.set(0,rnd()*Math.PI,0);dummy.scale.set(s,s,s);dummy.updateMatrix();treeTrunks.setMatrixAt(ti,dummy.matrix);
   let crown=crowns[variant%crowns.length];dummy.position.set(x,(3.7+rnd()*.25)*s,z);dummy.rotation.set(rnd()*.12,rnd()*Math.PI,rnd()*.12);dummy.scale.set((1.15+rnd()*.30)*s,(.90+rnd()*.22)*s,(1.10+rnd()*.30)*s);dummy.updateMatrix();crown.setMatrixAt(crown.count++,dummy.matrix);ti++;treeTrunks.count=ti
 }
 function addConifer(x,z,s=1,variant=0){
   if(ti>=maxTrees)return;dummy.position.set(x,1.25*s,z);dummy.rotation.set(0,rnd()*Math.PI,0);dummy.scale.set(.82*s,.90*s,.82*s);dummy.updateMatrix();treeTrunks.setMatrixAt(ti,dummy.matrix);
   let c=conifers[variant%conifers.length];dummy.position.set(x,3.65*s,z);dummy.rotation.set(0,rnd()*Math.PI,0);dummy.scale.set(s,1.15*s,s);dummy.updateMatrix();c.setMatrixAt(c.count++,dummy.matrix);ti++;treeTrunks.count=ti
 }
 function addShrub(x,z,s=.8,v=0){
   if(si>=maxShrubs)return;let sh=shrubs[v%shrubs.length];dummy.position.set(x,.38*s,z);dummy.rotation.set(rnd()*.12,rnd()*Math.PI,rnd()*.12);dummy.scale.set(1.25*s,.72*s,1.05*s);dummy.updateMatrix();sh.setMatrixAt(sh.count++,dummy.matrix);si++
 }
 // Irregular outer forest belt: clustered instead of evenly spaced.
 const clusters=mobile?10:18;
 for(let c=0;c<clusters;c++){
   let a=(c/clusters)*Math.PI*2+(rnd()-.5)*.20,r=385+rnd()*90,cx=Math.sin(a)*r,cz=Math.cos(a)*r,n=mobile?4+Math.floor(rnd()*4):7+Math.floor(rnd()*7);
   for(let j=0;j<n;j++){let x=cx+(rnd()-.5)*42,z=cz+(rnd()-.5)*42;if(!valid(x,z))continue;let s=.78+rnd()*.72;if((c+j)%4===0)addConifer(x,z,s,c+j);else addDeciduous(x,z,s,c+j);if(rnd()>.35)addShrub(x+(rnd()-.5)*3,z+(rnd()-.5)*3,.55+rnd()*.55,c+j)}
 }
 // Small town-edge copses / meadow islands, away from roads and doors.
 const islands=[[-185,-165],[-175,165],[175,-165],[175,165],[-285,90],[285,-90],[-80,285],[80,-285]];
 for(let n=0;n<islands.length;n++){let [cx,cz]=islands[n];for(let j=0;j<(mobile?3:6);j++){let x=cx+(rnd()-.5)*24,z=cz+(rnd()-.5)*24;if(valid(x,z)){addDeciduous(x,z,.72+rnd()*.42,n+j);addShrub(x+1.8,z-1.1,.5+rnd()*.35,n)}}}
 for(const o of [treeTrunks,...crowns,...conifers,...shrubs]){o.instanceMatrix.needsUpdate=true}

 // Ground-cover patches and meadow flowers: visual only.
 const meadow=M(0x557b42,.98),soil=M(0x675542,.98);
 for(const [cx,cz] of islands.slice(0,mobile?4:8)){let p=new T.Mesh(new T.CircleGeometry(7+rnd()*5,24),rnd()>.65?soil:meadow);p.rotation.x=-Math.PI/2;p.position.set(cx,.018,cz);p.scale.set(1.35,.78,1);p.receiveShadow=true;p.castShadow=false;root.add(p)}
 if(!mobile){
   for(const [cx,cz] of islands){for(let k=0;k<12;k++){let a=rnd()*Math.PI*2,d=2+rnd()*8,x=cx+Math.sin(a)*d,z=cz+Math.cos(a)*d;if(!valid(x,z))continue;let f=new T.Mesh(flowerGeo,flowerM[(k+nSafe(cx,cz))%flowerM.length]);f.position.set(x,.16,z);f.scale.set(1,1.7,1);root.add(f)}}
 }
 function nSafe(x,z){return Math.abs(Math.round(x+z))%3}

 // Gentle wind sway only on desktop: move root subgroups by tiny rotations, instanced geometry remains stable on mobile.
 if(!mobile){let t=0;W.registerTick?.((dt)=>{t+=dt;root.rotation.z=Math.sin(t*.18)*.0008;root.rotation.x=Math.cos(t*.15)*.0005})}
 window.LuxNature830={version:'8.3.0',root,treeCount:ti,shrubCount:si}
}
