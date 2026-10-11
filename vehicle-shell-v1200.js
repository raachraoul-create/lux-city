import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
// Closed, outward-facing body. Upper side faces form the glazing instead of floating boxes.
export function createCarBody(width,profile,color,wheelbase=1.48,radius=.36){
 const paint=new T.MeshPhysicalMaterial({color,roughness:.27,metalness:.32,clearcoat:.8,clearcoatRoughness:.19});
 const glass=new T.MeshPhysicalMaterial({color:0x233943,roughness:.12,metalness:.28,clearcoat:1});
 const pts=[];for(let i=0;i<profile.length-1;i++){const a=profile[i],b=profile[i+1];for(let j=0;j<5;j++){const t=j/5;pts.push([T.MathUtils.lerp(a[0],b[0],t),T.MathUtils.lerp(a[1],b[1],t)])}}pts.push(profile.at(-1));
 const end=Math.max(...profile.map(p=>Math.abs(p[0]))),rings=[],positions=[],indices=[],parts=[[],[]];
 for(const [z,y] of pts){
   const hw=width*.5*(.85+.15*(1-Math.pow(Math.abs(z)/end,2))),belt=Math.min(y-.055,.90),roofW=hw*(y>1.05?.80:.97);
   const dz=Math.min(Math.abs(z-wheelbase),Math.abs(z+wheelbase));
   const low=dz<radius+.045?Math.min(belt-.025,radius+.04+Math.sqrt(Math.max(0,(radius+.045)**2-dz*dz))):.32;
   const ring=[[-hw*.94,low],[hw*.94,low],[hw,belt-.06],[hw*.98,belt],[roofW,y-.025],[0,y+.018],[-roofW,y-.025],[-hw*.98,belt],[-hw,belt-.06]];
   rings.push(ring);for(const [x,yy] of ring)positions.push(x,yy,z);
 }
 const N=9;
 function tri(a,b,c,material,axis){
   const p=new T.Vector3().fromArray(positions,a*3),q=new T.Vector3().fromArray(positions,b*3),r=new T.Vector3().fromArray(positions,c*3);
   const n=q.clone().sub(p).cross(r.clone().sub(p));
   const outward=axis||new T.Vector3((p.x+q.x+r.x)/3,(p.y+q.y+r.y)/3-.65,0);
   if(n.dot(outward)<0)[b,c]=[c,b];parts[material].push(a,b,c);
 }
 for(let i=0;i<pts.length-1;i++)for(let j=0;j<N;j++){
   const k=(j+1)%N,a=i*N+j,b=i*N+k,c=(i+1)*N+k,d=(i+1)*N+j;
   const slope=Math.abs((pts[i+1][1]-pts[i][1])/(pts[i+1][0]-pts[i][0]));
   const glazed=((j===3||j===6)&&Math.min(pts[i][1],pts[i+1][1])>1.13)||((j===4||j===5)&&slope>.28&&Math.min(pts[i][1],pts[i+1][1])>1.02);
   tri(a,b,c,glazed?1:0);tri(a,c,d,glazed?1:0);
 }
 // End caps use their own centres so no face is omitted or degenerate.
 for(const i of [0,pts.length-1]){const ring=rings[i],center=positions.length/3;positions.push(0,ring.reduce((s,p)=>s+p[1],0)/N,pts[i][0]);for(let j=0;j<N;j++)tri(center,i*N+j,i*N+(j+1)%N,0,new T.Vector3(0,0,i===0?-1:1));}
 const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));indices.push(...parts[0],...parts[1]);geo.setIndex(indices);
 geo.addGroup(0,parts[0].length,0);geo.addGroup(parts[0].length,parts[1].length,1);geo.computeVertexNormals();geo.computeBoundingSphere();
 const mesh=new T.Mesh(geo,[paint,glass]);mesh.name='VehicleBody1200';mesh.userData.structuralBody=true;mesh.userData.bodyPaint=paint;mesh.castShadow=true;mesh.receiveShadow=true;
 return mesh;
}
