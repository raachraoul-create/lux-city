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
 // Visible entrances and simple enterable interiors. Interiors are separate rooms away from the street and reached through doors.
 const interiors={bakery:{x:-520,z:-120,name:"BÄCKEREI",color:0xd8bd98},cafe:{x:-520,z:-60,name:"CAFÉ",color:0xcab995},pub:{x:-520,z:0,name:"KNEIPE",color:0x9b735f},police:{x:-520,z:60,name:"POLIZEI",color:0x9eb3c8},fire:{x:-520,z:120,name:"FEUERWEHR",color:0xb65b4e},rescue:{x:-520,z:180,name:"RETTUNGSWACHE",color:0xe2ded6},hospital:{x:-520,z:240,name:"KRANKENHAUS",color:0xe7e7e2}};
 Object.entries(interiors).forEach(([id,r])=>{let d=places[id];if(!d)return;add(new T.BoxGeometry(18,.2,18),M(0x8b8378),r.x,0,r.z);for(let dx of[-9,9])add(new T.BoxGeometry(.25,4,18),M(r.color),r.x+dx,2,r.z);for(let dz of[-9,9])add(new T.BoxGeometry(18,4,.25),M(r.color),r.x,2,r.z+dz);for(let i=-1;i<=1;i++)add(new T.BoxGeometry(3,1.1,1.4),M(0x7c654e),r.x+i*4,0.65,r.z);d.door={x:d.x,z:d.z+d.l/2+1.1};r.exit={x:r.x,z:r.z+7.5};r.return={x:d.door.x,z:d.door.z+2.2}});
 let inside=null,lastUse=0;
 function nearestDoor(){let p=W.player,best=null;for(let d of defs){if(!d.door||!interiors[d.id])continue;let dist=Math.hypot(p.position.x-d.door.x,p.position.z-d.door.z);if(!best||dist<best.dist)best={d,dist}}return best}
 function useDoor(){if(Date.now()-lastUse<700)return;lastUse=Date.now();let p=W.player;if(inside){let r=interiors[inside];if(Math.hypot(p.position.x-r.exit.x,p.position.z-r.exit.z)>5)return alert("Geh zur Ausgangstür.");p.position.set(r.return.x,0,r.return.z);inside=null;return}let n=nearestDoor();if(!n||n.dist>5)return;inside=n.d.id;let r=interiors[inside];p.position.set(r.x,0,r.z+5.8)}
 addEventListener("keydown",e=>{if(e.key.toLowerCase()==="e")useDoor()});
 let hud=document.getElementById("hud");if(hud&&!document.getElementById("door370")){let b=document.createElement("button");b.id="door370";b.textContent="TÜR / E";b.onclick=useDoor;hud.appendChild(b)}
 // NPC daily routines use service/business destinations instead of short back-and-forth strips.
 const homeSpots=[[-150,145],[-125,165],[-65,150],[55,150],[135,150],[155,120],[-150,-145],[150,-145]];
 const targets=["bakery","cafe","pub","post","hospital","police"];
 W.npcs.forEach((p,i)=>{p.userData.home={x:homeSpots[i%homeSpots.length][0]+(i%3)*3,z:homeSpots[i%homeSpots.length][1]+Math.floor(i/8)*3};p.userData.routine=i%3;p.userData.dest=null});
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
 window.LuxCity370={interiors,useDoor,nearestDoor};
}
