(()=>{
let q=setInterval(()=>{let W=window.LuxWorld,R=window.LuxRoadNetwork1200,T=window.LuxTraffic861||window.LuxTraffic860;if(!W?.cars?.length||!R?.trafficRoutes?.length||!T)return;clearInterval(q);init(W,R)},220);
function init(W,R){
 const routes=R.trafficRoutes,pattern=[0,1,2,3,4,5,0,2,4,1,3,5,6,7,8,9,2,3,0,1,6,8,4,5,7,9];
 function assign(v,i){
   if(!v||v.userData?.dailyActivity880||v.userData?.parkingManaged760)return;
   let rd=routes[pattern[i%pattern.length]%routes.length],rt=rd.points,idx=(i*19)%rt.length;
   v.userData.route=rt;v.userData.routeIndex=idx;v.userData.routeKind1140=rd.kind;v.userData.routeKind1200=rd.kind;v.userData.baseSpeed=rd.speed+(i%4)*.12;v.userData.speedNow=Math.min(v.userData.speedNow??v.userData.baseSpeed,v.userData.baseSpeed);v.userData.densityIndex=i;
   v.position.set(rt[idx][0],0,rt[idx][1]);let n=rt[(idx+1)%rt.length];v.rotation.y=Math.atan2(n[0]-v.position.x,n[1]-v.position.z)+Math.PI
 }
 W.cars.forEach(assign);
 let known=W.cars.length;setInterval(()=>{if(W.cars.length!==known){W.cars.forEach((v,i)=>{if(!v.userData.route||v.userData.roadNetwork1090)assign(v,i)});known=W.cars.length}},1200);
 let acc=0;W.registerTick?.((dt)=>{acc+=dt;if(acc<.18)return;acc=0;
   for(const v of W.cars){let rt=v.userData?.route;if(!rt||v.visible===false||v.userData?.parkingManaged760||v.userData?.dailyActivity880)continue;
     if((v.userData.speedNow??1)<.18||(v.userData.staticBlockUntil||0)>performance.now())continue;
     let i=v.userData.routeIndex||0,a=rt[i],b=rt[(i+1)%rt.length],dx=b[0]-a[0],dz=b[1]-a[1],l2=dx*dx+dz*dz||1,t=((v.position.x-a[0])*dx+(v.position.z-a[1])*dz)/l2;t=Math.max(0,Math.min(1,t));
     let px=a[0]+dx*t,pz=a[1]+dz*t,ox=v.position.x-px,oz=v.position.z-pz,off=Math.hypot(ox,oz);
     if(off>1.35){let pull=Math.min(.24,.06+(off-1.35)*.06);v.position.x-=ox*pull;v.position.z-=oz*pull}
   }
 });
 const api=window.LuxTraffic861||window.LuxTraffic860;api.laneRoutes1140=routes.map(r=>r.points);api.version='9.0.2';window.LuxTrafficLanes1140=window.LuxTrafficLanes1200={version:'12.0.0',routes}
}
})();