import * as T from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
const wait=setInterval(()=>{if(window.LuxWorld&&window.LuxCityServices){clearInterval(wait);init()}},200);
function init(){
 const W=LuxWorld,S=W.scene,defs=LuxCityServices.buildings||[],M=(c)=>new T.MeshStandardMaterial({color:c,roughness:.75});
 const add=(g,m,x,y,z,p=S)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;p.add(o);return o};
 const places={}; defs.forEach(d=>places[d.id]=d);
 // Streetscape: sidewalks, crossings and parking bays around the existing city grid.
 for(let x of[-8,8]) add(new T.BoxGeometry(3,.08,650),M(0xb8b8b2),x,.04,0);
 for(let z of[-220,-92,92,218]){add(new T.BoxGeometry(650,.08,3),M(0xb8b8b2),0,.04,z);for(let x=-10;x<=10;x+=2)add(new T.BoxGeometry(1.1,.09,5.5),M(0xf0eee5),x,.055,z)}
 for(let z=-285;z<=285;z+=38){for(let x of[-13,13]){let q=add(new T.BoxGeometry(5.5,.06,.16),M(0xe7e3d8),x,.07,z);q.rotation.y=0}}
 // Building interiors and E-door handling are owned by LuxCity419.
 // NPC daily routines use service/business destinations instead of short back-and-forth strips.
 const homeSpots=[[-150,145],[-125,165],[-65,150],[55,150],[135,150],[155,120],[-150,-145],[150,-145]];
 const targets=["bakery","cafe","pub","post","hospital","police"];
 W.npcs.forEach((p,i)=>{p.userData.city370=true;p.userData.home={x:homeSpots[i%homeSpots.length][0]+(i%3)*3,z:homeSpots[i%homeSpots.length][1]+Math.floor(i/8)*3};p.userData.routine=i%3;p.userData.dest=null});
 function npcTarget(p){let h=window.LuxLife?.state?.hour??12;if(h<7||h>=21)return p.userData.home;let id=targets[(p.userData.routine+Math.floor(h/3))%targets.length],d=places[id];return d?{x:d.x+(p.userData.routine-1)*3,z:d.z+d.l/2+5}:p.userData.home}
 // Cars get looped road routes with turns, rather than one endless straight lane.
 const routes=[
 [[-5,-320],[-5,218],[92,218],[92,92],[5,92],[5,-320]],
 [[5,-320],[5,-92],[-92,-92],[-92,92],[-5,92],[-5,320],[5,320],[5,-320]]
 ];
 W.cars.forEach((v,i)=>{v.userData.route=routes[i%routes.length];v.userData.routeIndex=i%routes[i%routes.length].length;v.userData.city370=true});
 function blockedAt(v,nx,nz){return W.cars.some(o=>o!==v&&Math.hypot(o.position.x-nx,o.position.z-nz)<5)||W.npcs.some(p=>Math.hypot(p.position.x-nx,p.position.z-nz)<2.8)}
 W.registerTick((dt,t)=>{
  for(let p of W.npcs){let q=npcTarget(p),dx=q.x-p.position.x,dz=q.z-p.position.z,dd=Math.hypot(dx,dz);if(dd>1.5){let nx=p.position.x+dx/dd*1.45*dt,nz=p.position.z+dz/dd*1.45*dt;if(!W.obstacles.some(o=>Math.hypot(nx-o.x,nz-o.z)<o.r+.6)){p.position.x=nx;p.position.z=nz;p.rotation.y=Math.atan2(dx,dz)}}}
  for(let v of W.cars){if(!v.userData.city370)continue;let rt=v.userData.route,q=rt[v.userData.routeIndex%rt.length],dx=q[0]-v.position.x,dz=q[1]-v.position.z,dd=Math.hypot(dx,dz);if(dd<4){v.userData.routeIndex=(v.userData.routeIndex+1)%rt.length;continue}let sp=Math.min(v.userData.speed||6,dd),nx=v.position.x+dx/dd*sp*dt,nz=v.position.z+dz/dd*sp*dt;if(!blockedAt(v,nx,nz)){v.position.x=nx;v.position.z=nz;v.rotation.y=Math.atan2(dx,dz)}}
 });
 window.LuxCity370={get interiors(){return window.LuxCity419?.rooms||{}},useDoor:(...a)=>window.LuxCity419?.use?.(...a),nearestDoor:(id,max=4.2)=>window.LuxCity419?.nearDoor?.(id,max)||false};
}
