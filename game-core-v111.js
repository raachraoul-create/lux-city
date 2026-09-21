import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
const c=document.getElementById('game');const r=new T.WebGLRenderer({canvas:c,antialias:true});r.setPixelRatio(Math.min(devicePixelRatio||1,2));r.setSize(innerWidth,innerHeight);r.setClearColor(0x91c7e8);
const s=new T.Scene();s.background=new T.Color(0x91c7e8);s.fog=new T.Fog(0x91c7e8,180,650);
const cam=new T.PerspectiveCamera(60,innerWidth/innerHeight,.1,1000);
s.add(new T.HemisphereLight(0xffffff,0x526b39,2.5));const sun=new T.DirectionalLight(0xffffff,2);sun.position.set(100,160,80);s.add(sun);
const mat=x=>new T.MeshStandardMaterial({color:x,roughness:.75});function mesh(g,m,x,y,z){const o=new T.Mesh(g,m);o.position.set(x,y,z);s.add(o);return o}
const ground=mesh(new T.PlaneGeometry(900,900),mat(0x6f9850),0,0,0);ground.rotation.x=-Math.PI/2;
function road(x,z,w,l,rot=0){const o=mesh(new T.BoxGeometry(w,.12,l),mat(0x41464b),x,.06,z);o.rotation.y=rot}
road(0,0,14,650);road(-115,0,10,430);road(115,0,10,430);road(0,125,10,330,Math.PI/2);road(0,-125,10,330,Math.PI/2);
const colors=[0xd9c7b1,0xc7d0c1,0xe2d4c1,0xbfcbd5,0xd5b8a7];
function house(x,z,i){let h=7+i%3;mesh(new T.BoxGeometry(11+i%3*2,h,9+i%2),mat(colors[i%colors.length]),x,h/2,z);const roof=mesh(new T.ConeGeometry(9,4,4),mat(i%2?0x643b2e:0x75483b),x,h+2,z);roof.rotation.y=Math.PI/4;mesh(new T.BoxGeometry(1.5,2.4,.2),mat(0x49352b),x,1.2,z+5)}
let n=0;for(let z=-280;z<=280;z+=25){house(-30-(n%3)*12,z,n++);house(30+(n%3)*12,z,n++)}for(let x=-260;x<=260;x+=28){house(x,155+(n%3)*12,n++);house(x,-155-(n%3)*12,n++)}
function firm(name,x,z,col){mesh(new T.BoxGeometry(28,10,20),mat(col),x,5,z);mesh(new T.BoxGeometry(5,4,.3),mat(0x38424a),x,2,z+10.2)}
[['Bäckerei',58,62,0xb99c73],['Café',-62,74,0x9c7863],['Kneipe',66,-80,0x78564a],['Mühle',-160,-88,0xa69b83],['Zucker',162,92,0xbab39f],['Getränke',-170,98,0x8e9da6],['Post',170,-100,0xb49a55]].forEach(a=>firm(...a));
function car(x,z,col){const g=new T.Group();const b=new T.Mesh(new T.BoxGeometry(2.1,.75,4.4),mat(col));b.position.y=.65;g.add(b);const top=new T.Mesh(new T.BoxGeometry(1.7,.65,2),mat(0x8fa9ba));top.position.set(0,1.3,-.2);g.add(top);g.position.set(x,0,z);s.add(g)}
for(let i=0;i<24;i++)car(i%2?6:-6,-260+i*23,[0x263f62,0x8a3030,0xd8d8d8,0x303030][i%4]);
function human(){const g=new T.Group();const torso=new T.Mesh(new T.CylinderGeometry(.35,.4,1.25,12),mat(0x355f86));torso.position.y=1.55;g.add(torso);const head=new T.Mesh(new T.SphereGeometry(.3,16,12),mat(0xc58c66));head.position.y=2.55;g.add(head);for(const x of[-.2,.2]){const leg=new T.Mesh(new T.CylinderGeometry(.1,.1,.9,8),mat(0x293847));leg.position.set(x,.65,0);g.add(leg)}return g}
const player=human();player.position.set(0,0,22);s.add(player);for(let i=0;i<16;i++){const p=human();p.position.set(-90+(i%8)*26,0,45+Math.floor(i/8)*42);s.add(p)}
let key={},yaw=0,pitch=-.15;addEventListener('keydown',e=>key[e.key.toLowerCase()]=1);addEventListener('keyup',e=>key[e.key.toLowerCase()]=0);c.onclick=()=>c.requestPointerLock?.();addEventListener('mousemove',e=>{if(document.pointerLockElement===c||document.pointerLockElement===document.body){yaw-=e.movementX*.001;pitch=Math.max(-.7,Math.min(.35,pitch-e.movementY*.001))}});
addEventListener('resize',()=>{r.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()});
let last=performance.now();function loop(t){requestAnimationFrame(loop);const dt=Math.min(.04,(t-last)/1000);last=t;let f=(key.w||0)-(key.s||0),st=(key.d||0)-(key.a||0);player.position.x+=(Math.sin(yaw)*f+Math.cos(yaw)*st)*9*dt;player.position.z+=(Math.cos(yaw)*f-Math.sin(yaw)*st)*9*dt;player.rotation.y=yaw;cam.position.set(player.position.x-Math.sin(yaw)*9,3.8-Math.sin(pitch)*3,player.position.z-Math.cos(yaw)*9);cam.lookAt(player.position.x,1.6+pitch*5,player.position.z);r.render(s,cam)}requestAnimationFrame(loop);
