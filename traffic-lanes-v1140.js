(()=>{
let q=setInterval(()=>{let W=window.LuxWorld,T=window.LuxTraffic861||window.LuxTraffic860;if(!W?.cars?.length||!T?.carRoutes)return;clearInterval(q);init(W)},260);
function init(W){
 function norm(dx,dz){let d=Math.hypot(dx,dz)||1;return[dx/d,dz/d,d]}
 function line(out,a,b,step=5,includeEnd=false){let d=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.max(1,Math.ceil(d/step));for(let k=0;k<(includeEnd?n+1:n);k++){let t=k/n;out.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t])}}
 function rounded(points,step=5,radius=6){
   const n=points.length,entry=[],exit=[];
   for(let i=0;i<n;i++){
     let p=points[(i-1+n)%n],c=points[i],nx=points[(i+1)%n],
         a=norm(c[0]-p[0],c[1]-p[1]),b=norm(nx[0]-c[0],nx[1]-c[1]),
         r1=Math.min(radius,a[2]*.28),r2=Math.min(radius,b[2]*.28);
     entry[i]=[c[0]-a[0]*r1,c[1]-a[1]*r1];exit[i]=[c[0]+b[0]*r2,c[1]+b[1]*r2]
   }
   let out=[];
   for(let i=0;i<n;i++){
     let j=(i+1)%n;line(out,exit[i],entry[j],step,false);
     let e=entry[j],c=points[j],x=exit[j],arc=Math.max(3,Math.ceil((Math.hypot(c[0]-e[0],c[1]-e[1])+Math.hypot(x[0]-c[0],x[1]-c[1]))/Math.max(1.8,step*.65)));
     for(let k=0;k<arc;k++){let t=k/arc,u=1-t;out.push([u*u*e[0]+2*u*t*c[0]+t*t*x[0],u*u*e[1]+2*u*t*c[1]+t*t*x[1]])}
   }
   return out
 }
 const R=(pts,step,radius,speed,kind)=>({pts:rounded(pts,step,radius),speed,kind});
 const routes=[
   R([[-3.6,-325.5],[-3.6,325.5],[3.6,325.5],[3.6,-325.5]],4.8,7,5.4,'city'),
   R([[-3.6,-132.7],[-122.5,-132.7],[-122.5,325.8],[-355.8,325.8],[-355.8,-325.8],[-122.5,-325.8],[-122.5,132.7],[-3.6,132.7]],5.2,6,5.6,'city'),
   R([[3.6,-137.3],[122.5,-137.3],[122.5,-325.8],[355.8,-325.8],[355.8,325.8],[122.5,325.8],[122.5,137.3],[3.6,137.3]],5.2,6,5.7,'city'),
   R([[-355.8,-325.8],[355.8,-325.8],[355.8,325.8],[-355.8,325.8]],6.2,9,7.0,'ring'),
   R([[364.2,334.2],[364.2,-334.2],[-364.2,-334.2],[-364.2,334.2]],6.2,9,7.0,'ring'),
   R([[-122.5,-325.8],[-122.5,325.8],[122.5,325.8],[122.5,-325.8]],5.4,7,6.0,'city'),
   R([[-355.8,-132.7],[355.8,-132.7],[355.8,-137.3],[-355.8,-137.3]],5.5,6,6.1,'city'),
   R([[-355.8,132.7],[355.8,132.7],[355.8,137.3],[-355.8,137.3]],5.5,6,6.1,'city'),
   R([[-454,-424],[454,-424],[454,424],[-454,424]],7.5,13,9.3,'motorway'),
   R([[466,436],[-466,436],[-466,-436],[466,-436]],7.5,13,9.3,'motorway'),
   R([[-238,-325.8],[-238,-424],[-454,-424],[-454,424],[-238,424],[-238,325.8]],6.3,8,8.0,'feeder'),
   R([[238,-325.8],[238,-436],[466,-436],[466,436],[238,436],[238,325.8]],6.3,8,8.0,'feeder'),
   R([[-355.8,-208],[-454,-248],[-454,248],[-355.8,208]],6.0,9,7.8,'feeder'),
   R([[355.8,-208],[454,-248],[454,248],[355.8,208]],6.0,9,7.8,'feeder')
 ];
 const pattern=[0,1,2,0,1,2,5,6,7,0,1,2,3,4,5,6,7,8,9,3,4,10,11,1,2,12,13,0,5,8,9,3];
 function assign(v,i){
   if(!v||v.userData?.dailyActivity880||v.userData?.parkingManaged760)return;
   let ri=pattern[i%pattern.length]%routes.length,r=routes[ri],rt=r.pts,idx=(i*23)%rt.length;
   v.userData.route=rt;v.userData.routeIndex=idx;v.userData.routeKind1140=r.kind;v.userData.baseSpeed=r.speed+(i%4)*.22;v.userData.speedNow=Math.min(v.userData.speedNow??v.userData.baseSpeed,v.userData.baseSpeed);
   v.userData.densityIndex=i;v.position.set(rt[idx][0],0,rt[idx][1]);let n=rt[(idx+1)%rt.length];v.rotation.y=Math.atan2(n[0]-v.position.x,n[1]-v.position.z)+Math.PI
 }
 W.cars.forEach(assign);
 let known=W.cars.length;setInterval(()=>{if(W.cars.length!==known){W.cars.forEach((v,i)=>{if(!v.userData.route||v.userData.roadNetwork1090)assign(v,i)});known=W.cars.length}},1500);
 let acc=0;W.registerTick?.((dt)=>{acc+=dt;if(acc<.24)return;acc=0;
   for(const v of W.cars){
     let rt=v.userData?.route;if(!rt||v.visible===false||v.userData?.parkingManaged760||v.userData?.dailyActivity880)continue;
     let i=v.userData.routeIndex||0,a=rt[i],b=rt[(i+1)%rt.length],dx=b[0]-a[0],dz=b[1]-a[1],l2=dx*dx+dz*dz||1,t=((v.position.x-a[0])*dx+(v.position.z-a[1])*dz)/l2;t=Math.max(0,Math.min(1,t));
     let px=a[0]+dx*t,pz=a[1]+dz*t,off=Math.hypot(v.position.x-px,v.position.z-pz);
     if(off>2.4){let pull=Math.min(.48,(off-2.4)*.10);v.position.x+=(px-v.position.x)*pull;v.position.z+=(pz-v.position.z)*pull}
   }
 });
 const api=window.LuxTraffic861||window.LuxTraffic860;api.laneRoutes1140=routes.map(r=>r.pts);api.version='8.9.0';window.LuxTrafficLanes1140={version:'11.4.0',routes,pattern}
}
})();