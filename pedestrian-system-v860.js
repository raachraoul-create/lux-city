import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{if(!window.LuxWorld?.npcs||!window.LuxTraffic786?.crosswalks||!window.LuxLife)return;clearInterval(q);init()},300);
function init(){
 const W=LuxWorld,S=W.scene,M=(c,r=.78)=>new T.MeshStandardMaterial({color:c,roughness:r}),A=(g,m,x,y,z,p)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=true;p.add(o);return o};
 function dense(points,step=4.5){let out=[];for(let i=0;i<points.length-1;i++){let a=points[i],b=points[i+1],d=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.max(1,Math.ceil(d/step));for(let k=0;k<n;k++){let t=k/n;out.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t])}}out.push(points[points.length-1]);return out}
 const routes=[
  dense([[-170,-145],[-125,-145],[0,-145],[125,-145],[170,-145],[125,-145],[0,-145],[-125,-145],[-170,-145]]),
  dense([[-170,125],[-125,125],[0,125],[125,125],[170,125],[125,125],[0,125],[-125,125],[-170,125]]),
  dense([[-10,-300],[-10,-220],[10,-220],[10,-150],[-10,-145],[-10,-125],[-10,-92],[10,-92],[10,92],[-10,92],[-10,125],[-10,145],[-10,218],[10,218],[10,300],[10,218],[-10,218],[-10,145],[-10,125],[-10,92],[10,92],[10,-92],[-10,-92],[-10,-125],[-10,-145],[10,-150],[10,-220],[-10,-220],[-10,-300]]),
  dense([[-132,-230],[-132,-150],[-135,-145],[-135,-125],[-132,-120],[-132,120],[-135,125],[-135,145],[-132,150],[-132,230],[-132,150],[-135,145],[-135,125],[-132,120],[-132,-120],[-135,-125],[-135,-145],[-132,-150],[-132,-230]]),
  dense([[132,-230],[132,-150],[125,-145],[125,-125],[132,-120],[132,120],[125,125],[125,145],[132,150],[132,230],[132,150],[125,145],[125,125],[132,120],[132,-120],[125,-125],[125,-145],[132,-150],[132,-230]]),
  dense([[-170,-128],[-135,-128],[-135,-135],[-115,-135],[-115,-128],[-10,-128],[-10,-135],[10,-135],[10,-128],[115,-128],[115,-135],[135,-135],[135,-128],[170,-128],[135,-128],[135,-135],[115,-135],[115,-128],[10,-128],[10,-135],[-10,-135],[-10,-128],[-115,-128],[-115,-135],[-135,-135],[-135,-128],[-170,-128]])
 ];
 const names=['Lina','Noah','Mara','Leo','Chloé','Mika','Ella','Louis','Sofia','Tom','Nina','Ben','Julie','Marc','Emma','Luca','Mia','Finn','Lea','Paul'],jobs=['Büro','Bäckerei','Café','Post','Krankenhaus','Werkstatt'];
 function human(i){
   let p=new T.Group(),skin=M([0xe0ad88,0xc9936f,0xb98563,0x9b6e50][i%4],.66),top=M([0x526d82,0x795247,0x537157,0x6d5b7f,0x866b45][i%5]),pants=M([0x29343f,0x383e45,0x443a33][i%3]),shoe=M(i%3?0x17191b:0xe8e7e2,.58),L={arms:[],legs:[]};
   A(new T.CapsuleGeometry(.17,.34,4,8),top,0,1.28,0,p);A(new T.SphereGeometry(.145,12,9),skin,0,1.83,0,p);
   for(let sx of[-1,1]){let arm=new T.Group();arm.position.set(sx*.27,1.42,0);p.add(arm);A(new T.CapsuleGeometry(.045,.30,4,7),skin,0,-.13,0,arm);L.arms.push(arm);let leg=new T.Group();leg.position.set(sx*.09,.92,0);p.add(leg);A(new T.CapsuleGeometry(.055,.42,4,7),pants,0,-.20,0,leg);A(new T.BoxGeometry(.14,.08,.26),shoe,0,-.46,.06,leg);L.legs.push(leg)}
   p.userData.limbs=L;p.userData.citizenName=names[i%names.length]+' '+String.fromCharCode(65+(i*3)%26)+'.';p.userData.citizenJob=jobs[i%jobs.length];p.userData.safePed860=true;p.userData.routineExcluded=true;p.userData.phase=i*.8;return p
 }
 const addCount=Math.max(0,42-W.npcs.length);
 for(let i=0;i<addCount;i++){let p=human(i),rt=routes[(i+W.npcs.length)%routes.length],idx=(i*13)%rt.length;p.userData.route=rt;p.userData.routeIndex=idx;p.userData.walkSpeed=.92+(i%5)*.08;p.userData.pause=0;p.userData.pauseEvery=7+(i%4);p.userData.steps=0;p.userData.activity=i%4;p.userData.densityIndex=W.npcs.length+i;p.position.set(rt[idx][0],0,rt[idx][1]);let n=rt[(idx+1)%rt.length];p.rotation.y=Math.atan2(n[0]-p.position.x,n[1]-p.position.z);S.add(p);W.npcs.push(p)}
 function assignSafe(p,i){let rt=routes[i%routes.length],idx=((i*17)+(p.userData.routeIndex||0))%rt.length;p.userData.route=rt;p.userData.routeIndex=idx;p.userData.walkSpeed=p.userData.walkSpeed||(.98+(i%5)*.07);p.userData.routineExcluded=true;p.userData.safePed860=true}
 W.npcs.forEach(assignSafe);
 // Reassert only if another legacy routine tries to replace the safe route.
 setInterval(()=>W.npcs.forEach((p,i)=>{if(!p.userData.safePed860||!routes.includes(p.userData.route))assignSafe(p,i)}),1200);
 window.LuxPedestrians860={routes,get count(){return W.npcs.length}}
}