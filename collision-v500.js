(()=>{let q=setInterval(()=>{if(!window.LuxWorld)return;clearInterval(q);const W=LuxWorld;function radiusOf(o){if(!o)return .6;if(o.userData?.bus470)return 1.4;if(o.userData?.halfW)return Math.max(.75,Math.min(1.35,o.userData.halfW));return .75}function boxHit(x,z,r,b){let c=Math.cos(-(b.rot||0)),s=Math.sin(-(b.rot||0)),dx=x-b.x,dz=z-b.z,lx=dx*c-dz*s,lz=dx*s+dz*c,qx=Math.max(Math.abs(lx)-b.hx,0),qz=Math.max(Math.abs(lz)-b.hz,0);return Math.hypot(qx,qz)<r}const empty=[],cellSize=24,cells=new Map();let indexedObstacles,indexedHouses,indexedBuildings,counts='',builtAt=-Infinity,cachedBoxes=[],queryId=0;
function insert(entry,minX,maxX,minZ,maxZ){
 for(let ix=Math.floor(minX/cellSize);ix<=Math.floor(maxX/cellSize);ix++)for(let iz=Math.floor(minZ/cellSize);iz<=Math.floor(maxZ/cellSize);iz++){
  const key=ix+','+iz;let bucket=cells.get(key);if(!bucket){bucket=[];cells.set(key,bucket)}bucket.push(entry)
 }
}
function ensureIndex(){
 const obs=W.obstacles||empty,houses=W.houseSites||empty,buildings=window.LuxCityServices?.buildings||empty,size=obs.length+','+houses.length+','+buildings.length,now=performance.now();
 if(indexedObstacles===obs&&indexedHouses===houses&&indexedBuildings===buildings&&counts===size&&now-builtAt<1000)return;
 cells.clear();cachedBoxes=[];indexedObstacles=obs;indexedHouses=houses;indexedBuildings=buildings;counts=size;builtAt=now;
 for(const o of obs){const radius=o.r||.5;insert({circle:o,seen:0},o.x-radius,o.x+radius,o.z-radius,o.z+radius)}
 for(const h of houses)cachedBoxes.push({x:h.x,z:h.z,hx:h.w/2+.15,hz:h.d/2+.15,rot:h.rot||0});
 for(const d of buildings)cachedBoxes.push({x:d.x,z:d.z,hx:(d.w||12)/2+.12,hz:(d.l||10)/2+.12,rot:0});
 for(const b of cachedBoxes){const c=Math.abs(Math.cos(b.rot)),s=Math.abs(Math.sin(b.rot)),hx=c*b.hx+s*b.hz,hz=s*b.hx+c*b.hz;insert({box:b,seen:0},b.x-hx,b.x+hx,b.z-hz,b.z+hz)}
}
function boxes(){ensureIndex();return cachedBoxes}
function blockedStatic(x,z,r=.45){
 if(!Number.isFinite(x)||!Number.isFinite(z)||!Number.isFinite(r)||r<0)return false;
 ensureIndex();const id=++queryId;
 for(let ix=Math.floor((x-r)/cellSize);ix<=Math.floor((x+r)/cellSize);ix++)for(let iz=Math.floor((z-r)/cellSize);iz<=Math.floor((z+r)/cellSize);iz++){
  const bucket=cells.get(ix+','+iz);if(!bucket)continue;
  for(const entry of bucket){if(entry.seen===id)continue;entry.seen=id;
   if(entry.circle){const o=entry.circle,dx=x-o.x,dz=z-o.z,limit=(o.r||.5)+r;if(dx*dx+dz*dz<limit*limit)return true}
   else if(boxHit(x,z,r,entry.box))return true;
  }
 }
 return false
}
function invalidate(){builtAt=-Infinity}
function blocked(x,z,r=.45,opt={}){if(blockedStatic(x,z,r))return true;if(opt.dynamic===false)return false;if(opt.cars!==false)for(let c of W.cars||[]){if(c===opt.ignore||c.visible===false)continue;if(Math.hypot(x-c.position.x,z-c.position.z)<r+radiusOf(c))return true}if(opt.npcs!==false)for(let p of W.npcs||[]){if(p===opt.ignore||p.visible===false)continue;if(Math.hypot(x-p.position.x,z-p.position.z)<r+.42)return true}return false}function swept(x0,z0,x1,z1,r,opt={}){let d=Math.hypot(x1-x0,z1-z0),n=Math.max(1,Math.ceil(d/.28)),last={x:x0,z:z0,hit:false};for(let i=1;i<=n;i++){let t=i/n,x=x0+(x1-x0)*t,z=z0+(z1-z0)*t;if(blocked(x,z,r,opt))return{x:last.x,z:last.z,hit:true};last={x,z,hit:false}}return last}let api={invalidate,blocked,blockedStatic,swept,boxes,radiusOf};window.LuxCollision471=window.LuxCollision500=api;window.LuxCollision=api},120)})();