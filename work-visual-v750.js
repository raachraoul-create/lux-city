import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';let q=setInterval(()=>{if(!window.LuxWorld||!window.LuxSystems330?.doors||!window.LuxLife)return;clearInterval(q);const W=LuxWorld,S=W.scene,D=LuxSystems330.doors,M=(c,r=.75)=>new T.MeshStandardMaterial({color:c,roughness:r}),workers=[];
function A(g,m,x,y,z,p){let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=true;p.add(o);return o}
function human(role,color,route,prop){let g=new T.Group(),skin=M(0xc7926e,.62),shirt=M(color,.78),pants=M(0x2d343b,.82),L={arms:[],legs:[]};let body=A(new T.CapsuleGeometry(.18,.28,5,10),shirt,0,1.28,0,g);body.scale.z=.72;A(new T.SphereGeometry(.145,16,12),skin,0,1.73,0,g);A(new T.SphereGeometry(.15,14,9,0,Math.PI*2,0,Math.PI*.56),M(0x34261d,.72),0,1.84,0,g).scale.set(.96,.58,.96);for(let sx of[-1,1]){let a=new T.Group();a.position.set(sx*.28,1.40,0);g.add(a);A(new T.CapsuleGeometry(.045,.17,4,8),skin,0,-.14,0,a);L.arms.push(a);let l=new T.Group();l.position.set(sx*.09,.82,0);g.add(l);A(new T.CapsuleGeometry(.062,.30,4,8),pants,0,-.20,0,l);A(new T.BoxGeometry(.15,.08,.27),M(0x191b1e,.55),0,-.42,.06,l);L.legs.push(l)}
if(prop==='box')A(new T.BoxGeometry(.48,.38,.42),M(0xb88e5c,.86),0,1.05,.34,g);if(prop==='tool')A(new T.BoxGeometry(.08,.08,.48),M(0x586166,.38),.30,1.12,.18,g);if(prop==='med')A(new T.BoxGeometry(.16,.32,.05),M(0xeae9e4,.62),.30,1.24,.18,g);
g.position.set(route[0][0],0,route[0][1]);g.userData={city450:true,routineExcluded:true,worker750:true,role,route,idx:1,pause:0,phase:Math.random()*6,L};S.add(g);W.npcs.push(g);workers.push(g);return g}
const cfg=[
['Mechaniker',0x4e5961,[[-27,286],[-31,286],[-31,291],[-27,291]],'tool'],
['Autoverkäufer',0x405b73,[[-31,298],[-33,303],[-31,305],[-28,301]],null],
['Post',0xb28a3f,[[-92,-203],[-99,-203],[-99,-210],[-92,-210]],'box'],
['Pflege',0x6e8993,[[-210,-75],[-204,-75],[-204,-82],[-210,-82]],'med'],
['Polizei',0x395574,[[92,-207],[98,-207],[98,-214],[92,-214]],null],
['Feuerwehr',0x8a443b,[[210,108],[216,108],[216,116],[210,116]],'tool'],
['Abfüllung',0x567882,[[92,229],[100,229],[100,223],[92,223]],'box'],
['Mühle',0x766b5a,[[91,100],[98,100],[98,94],[91,94]],'box'],
['Gemeinde',0x66594a,[[-150,27],[-145,27],[-145,22],[-150,22]],null],
['Bäckerei',0x7b4e3d,[[-92,-84],[-87,-84],[-87,-90],[-92,-90]],'box']
];for(let c of cfg)human(...c);
function staffed(role){let h=(+LuxLife.state.hour||0)+(+LuxLife.state.minute||0)/60;if(['Polizei','Feuerwehr','Pflege'].includes(role))return true;if(role==='Bäckerei')return h>=4&&h<18;if(role==='Post')return h>=7&&h<18;if(role==='Mechaniker')return h>=7&&h<19;if(role==='Autoverkäufer')return h>=8&&h<19;if(role==='Gemeinde')return h>=8&&h<16;return h>=6&&h<18}
W.registerTick((dt,t)=>{for(let p of workers){let u=p.userData;p.visible=staffed(u.role);if(!p.visible)continue;if(u.pause>0){u.pause-=dt;let a=Math.sin(t*.012+u.phase)*.30;u.L.arms[0].rotation.x=a;u.L.arms[1].rotation.x=-a;continue}let q=u.route[u.idx],dx=q[0]-p.position.x,dz=q[1]-p.position.z,d=Math.hypot(dx,dz);if(d<.22){u.idx=(u.idx+1)%u.route.length;u.pause=.8+Math.random()*1.5;continue}let sp=.68+(u.idx%2)*.12;p.position.x+=dx/d*sp*dt;p.position.z+=dz/d*sp*dt;p.rotation.y=Math.atan2(dx,dz);let sw=Math.sin(t*.006+u.phase)*.40;u.L.arms[0].rotation.x=sw;u.L.arms[1].rotation.x=-sw;u.L.legs[0].rotation.x=-sw;u.L.legs[1].rotation.x=sw}});window.LuxWorkVisual750={workers}},520);