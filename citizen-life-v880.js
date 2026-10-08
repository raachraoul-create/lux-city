import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{let W=window.LuxWorld,P=window.LuxPedestrians861||window.LuxPedestrians860,L=window.LuxLife,D=window.LuxSystems330?.doors;if(!W?.npcs?.length||!P?.routes?.length||!L||!D)return;clearInterval(q);init(W,P,L,D)},350);
function init(W,P,L,D){
 const routes=P.routes,managed=W.npcs.filter(p=>!p.userData?.customer500&&!p.userData?.customer510&&!p.userData?.customer740);
 const workMap={Bäcker:'bakery',Bäckerei:'bakery',Verkäuferin:'bakery',Verkäufer:'bakery',Fahrer:'post',Post:'post',Postmitarbeiter:'post',Barista:'cafe',Café:'cafe',Kellnerin:'pub',Pflegekraft:'hospital',Krankenhaus:'hospital',Mechaniker:'workshop',Werkstatt:'workshop',Büro:'townhall',Büroangestellte:'townhall',Lagerist:'bottler',Elektriker:'housing',Erzieherin:'townhall'};
 const homeTargets=[[-132,-220],[132,-220],[-132,220],[132,220],[-10,-285],[10,285],[-165,125],[165,-125]];
 const leisureTargets=()=>[
   D.cafe&&[D.cafe.x,D.cafe.z],D.pub&&[D.pub.x,D.pub.z],D.colosseum&&[D.colosseum.x,D.colosseum.z],
   [-145,55],[145,-55]
 ].filter(Boolean);
 function hour(){return (+L.state.hour||0)+(+L.state.minute||0)/60}
 function phase(h,i){
   if(h<5.5||h>=22.5)return'home';
   if(h<8)return'commute';
   if(h<12)return'work';
   if(h<13.5)return'lunch';
   if(h<17.25)return'work';
   if(h<19.25)return i%3===0?'shopping':'commuteHome';
   if(h<21.5)return i%4===0?'shopping':'leisure';
   return'commuteHome'
 }
 function closestRoute(target){
   let best=routes[0],bestI=0,bd=Infinity;
   for(const rt of routes)for(let i=0;i<rt.length;i++){let d=Math.hypot(rt[i][0]-target[0],rt[i][1]-target[1]);if(d<bd){bd=d;best=rt;bestI=i}}
   return{route:best,index:bestI}
 }
 function localLoop(rt,idx,span=8){
   let pts=[];for(let k=-span;k<=span;k++){let j=(idx+k+rt.length)%rt.length;pts.push(rt[j])}
   let rev=pts.slice(1,-1).reverse();return pts.concat(rev)
 }
 function targetFor(p,i,ph){
   let job=p.userData?.citizenJob||'',workId=workMap[job],wd=workId==='workshop'?(window.LuxVehicleBusiness760||window.LuxVehicleBusiness750)?.workshop?.door:D[workId];
   if(ph==='work'&&wd)return[wd.x,wd.z];
   if(ph==='shopping'&&D.supermarket)return[D.supermarket.x,D.supermarket.z];
   if(ph==='lunch'){let x=i%2?D.cafe?.x:D.bakery?.x,z=i%2?D.cafe?.z:D.bakery?.z;if(Number.isFinite(x)&&Number.isFinite(z))return[x,z]}
   if(ph==='leisure'){let a=leisureTargets();return a.length?a[i%a.length]:[0,0]}
   return homeTargets[i%homeTargets.length]
 }
 function accessory(p,i){
   if(p.userData.lifeBag880)return;
   const bag=new T.Group(),bagM=new T.MeshStandardMaterial({color:[0x6f4d36,0x3e5d73,0x7a6744,0x5b465f][i%4],roughness:.78});
   let b=new T.Mesh(new T.BoxGeometry(.26,.32,.15),bagM);b.position.set(.30,.78,.03);bag.add(b);
   let h=new T.Mesh(new T.TorusGeometry(.10,.018,6,12,Math.PI),bagM);h.position.set(.30,.98,.03);h.rotation.z=Math.PI;bag.add(h);p.add(bag);bag.visible=false;
   const cup=new T.Group(),cupM=new T.MeshStandardMaterial({color:0xd9d1c4,roughness:.7});
   let c=new T.Mesh(new T.CylinderGeometry(.055,.045,.18,10),cupM);c.position.set(-.28,1.02,.10);cup.add(c);p.add(cup);cup.visible=false;
   p.userData.lifeBag880=bag;p.userData.lifeCup880=cup
 }
 function assign(p,i,ph){
   accessory(p,i);p.userData.dailyActivity880=ph;p.userData.safePed860=true;
   let bag=p.userData.lifeBag880,cup=p.userData.lifeCup880;if(bag)bag.visible=ph==='shopping';if(cup)cup.visible=ph==='lunch'||ph==='leisure';
   if(ph==='home'){p.visible=false;p.userData.insideHome880=true;return}
   p.userData.insideHome880=false;p.visible=true;
   let t=targetFor(p,i,ph),pick=closestRoute(t),route;
   if(ph==='commute'||ph==='commuteHome')route=pick.route;
   else route=localLoop(pick.route,pick.index,ph==='work'?6:ph==='shopping'?5:7);
   p.userData.route=route;p.userData.routeIndex=ph==='commute'||ph==='commuteHome'?pick.index%route.length:Math.floor(route.length/4);
   p.userData.safeDerived880=!(ph==='commute'||ph==='commuteHome');
   p.userData.pause=ph==='work'?1.4:ph==='shopping'?2.2:ph==='leisure'?2.8:.4;
   p.userData.pauseEvery=ph==='work'?5:ph==='shopping'?3:ph==='leisure'?4:8;
   p.userData.walkSpeed=ph==='commute'||ph==='commuteHome'?1.22:ph==='work'?.72:ph==='shopping'?.82:.90;
 }
 let signature='';
 function update(force=false){
   let h=hour(),sig=Math.floor(h*4);
   if(!force&&String(sig)===signature)return;signature=String(sig);
   managed.forEach((p,i)=>{let ph=phase(h,i);if(force||p.userData.dailyActivity880!==ph)assign(p,i,ph)});
 }
 update(true);setInterval(()=>update(false),500);
 W.registerTick(()=>{let h=hour();for(let i=0;i<managed.length;i++){let p=managed[i],ph=phase(h,i);if(p.userData.dailyActivity880!==ph)assign(p,i,ph);if(ph==='home')p.visible=false}});
 window.LuxCitizenLife880={version:'8.8.0',managed,phase,targetFor,update,get currentHour(){return hour()}}
}
