import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{if(!window.LuxWorld?.cars?.length||!window.LuxTraffic720||!(window.LuxParking750||window.LuxParking740)?.slots||!window.LuxLife)return;clearInterval(q);init()},650);
function init(){
 const W=LuxWorld,C=window.LuxCollision500||window.LuxCollision471,P=window.LuxParking750||window.LuxParking740,managed=[],plans=[];
 function nearestRoad(x,z){let best=null;for(let r of W.roads){let hx=r.l/2,hz=r.w/2,px=Math.max(r.x-hx,Math.min(r.x+hx,x)),pz=Math.max(r.z-hz,Math.min(r.z+hz,z)),d=Math.hypot(px-x,pz-z);if(!best||d<best.d)best={r,px,pz,d,hx,hz}}return best}
 function dest(x,z,rot,label,type){let n=nearestRoad(x,z);if(!n)return null;return{label,x,z,rot:rot||0,type,road:[n.px,n.pz],base:{x:n.r.x,z:n.r.z}}}
 function houseDest(h,i){let n=nearestRoad(h.x,h.z);if(!n||n.d<8)return null;let ux=(n.px-h.x)/n.d,uz=(n.pz-h.z)/n.d,rad=Math.max(h.w,h.d)*.57+2.4,reach=Math.min(n.d-2.2,rad+2.6),x=h.x+ux*reach,z=h.z+uz*reach;return dest(x,z,Math.atan2(n.px-x,n.pz-z),'Wohnhaus '+(i+1),'home')}
 function slotDest(s){return dest(s.x,s.z,s.rot||0,s.label||'Parkplatz',s.type||'public')}
 const homes=[];(W.houseSites||[]).filter((_,i)=>i%5===2).slice(0,8).forEach((h,i)=>{let d=houseDest(h,i);if(d)homes.push(d)});
 const away=[];for(const s of P.slots.filter(x=>x.type==='public')){let d=slotDest(s);if(d)away.push(d)}
 function toCenter(d){
   let x=d.base.x,z=d.base.z,p=[d.road];
   if(Math.abs(x)<1&&Math.abs(z)<1)return p;
   if(Math.abs(Math.abs(x)-125)<2){let cross=d.road[1]>=0?135:-135;p.push([x,cross],[0,cross]);return p}
   if(Math.abs(Math.abs(z)-135)<2){p.push([0,z]);return p}
   p.push([0,d.road[1]]);return p
 }
 function pushUnique(out,p,park=false){let last=out[out.length-1]?.p;if(last&&Math.hypot(last[0]-p[0],last[1]-p[1])<.2)return;out.push({p:[p[0],p[1]],road:!park,park})}
 function routeBetween(a,b){
   let A=toCenter(a),B=toCenter(b),out=[];for(const p of A)pushUnique(out,p);
   let ac=A[A.length-1],bc=B[B.length-1];if(Math.hypot(ac[0]-bc[0],ac[1]-bc[1])>.2)pushUnique(out,bc);
   for(let i=B.length-2;i>=0;i--)pushUnique(out,B[i]);pushUnique(out,[b.x,b.z],true);return out
 }
 function schedule(i,h){
   let type=i%4;if(type===0)return h>=7.0&&h<17.4;
   if(type===1)return h>=8.4&&h<18.8;
   if(type===2)return h>=6.1&&h<14.6;
   return h>=10.0&&h<21.0
 }
 function occupied(v,x,z){return W.cars.some(o=>o!==v&&o.visible!==false&&Math.hypot(o.position.x-x,o.position.z-z)<3.0)}
 function setTrip(v,target){
   let u=v.userData,from=u.aiCurrentPlan760||u.aiHome760;u.aiRoute760=routeBetween(from,target);u.aiIndex760=0;u.aiTargetPlan760=target;u.aiTravel760=true;u.parked760=false;u.speedNow=0
 }
 function move(v,target,dt){
   let dx=target.p[0]-v.position.x,dz=target.p[1]-v.position.z,d=Math.hypot(dx,dz);if(d<.65)return true;
   let ux=dx/d,uz=dz/d,desired=target.park?1.0:4.0;
   if(target.park&&occupied(v,target.p[0],target.p[1]))desired=0;
   if(occupied(v,v.position.x+ux*3.2,v.position.z+uz*3.2))desired=0;
   let nx=v.position.x+ux*desired*dt,nz=v.position.z+uz*desired*dt;
   if(desired>0&&C?.blockedStatic?.(nx,nz,.68)&&!target.park)desired=0;
   v.userData.speedNow+=(desired-v.userData.speedNow)*Math.min(1,dt*(desired===0?5:2.4));
   let sp=Math.max(0,v.userData.speedNow);v.position.x+=ux*sp*dt;v.position.z+=uz*sp*dt;v.position.y=0;v.rotation.y=Math.atan2(dx,dz)+Math.PI;return false
 }
 const count=Math.min(7,W.cars.length,homes.length,Math.max(1,away.length));
 for(let i=0;i<count;i++){
   let v=W.cars[(i*3+2)%W.cars.length],home=homes[i%homes.length],work=away[(i*2+1)%away.length]||home,u=v.userData;
   u.route=null;u.aiParking760=true;u.aiHome760=home;u.aiAway760=work;u.aiCurrentPlan760=home;u.aiTargetPlan760=home;u.aiTravel760=false;u.aiRoute760=[];u.aiIndex760=0;u.speedNow=0;u.parked760=true;u.aiSchedule760=i%4;
   v.position.set(home.x,0,home.z);v.rotation.y=home.rot||0;v.visible=true;managed.push(v);plans.push({home,away:work})
 }
 W.registerTick((dt)=>{
   let h=(+LuxLife.state.hour||0)+(+LuxLife.state.minute||0)/60;
   for(let i=0;i<managed.length;i++){
     let v=managed[i],u=v.userData,desired=schedule(i,h)?u.aiAway760:u.aiHome760;
     if(!u.aiTravel760&&u.aiCurrentPlan760!==desired)setTrip(v,desired);
     if(!u.aiTravel760){u.parked760=true;u.speedNow+=(0-u.speedNow)*Math.min(1,dt*5);v.visible=true;continue}
     let target=u.aiRoute760[u.aiIndex760];if(!target){u.aiTravel760=false;u.aiCurrentPlan760=desired;continue}
     let beforeX=v.position.x,beforeZ=v.position.z;
     if(move(v,target,dt)){
       if(target.park){
         if(occupied(v,target.p[0],target.p[1])){u.speedNow=0;continue}
         v.position.set(target.p[0],0,target.p[1]);v.rotation.y=desired.rot||v.rotation.y;u.aiCurrentPlan760=desired;u.aiTravel760=false;u.parked760=true;u.speedNow=0
       }else u.aiIndex760++
     }
     let moved=Math.hypot(v.position.x-beforeX,v.position.z-beforeZ);if(moved<.006&&Math.abs(u.speedNow||0)<.16)u.aiStuck760=(u.aiStuck760||0)+dt;else u.aiStuck760=0;
     if((u.aiStuck760||0)>4&&!target.park){u.aiStuck760=0;u.aiIndex760=Math.min(u.aiIndex760+1,u.aiRoute760.length-1)}
   }
 });
 window.LuxAIParking760=window.LuxAIParking761=window.LuxAIParking770={version:'7.7.0',managed,plans,schedule,routeBetween}
}
