import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
const canvas=document.querySelector('#game'),renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;
const scene=new THREE.Scene();scene.background=new THREE.Color(0x9ac8df);scene.fog=new THREE.Fog(0x9ac8df,90,280);
const camera=new THREE.PerspectiveCamera(65,innerWidth/innerHeight,.1,600);camera.position.set(0,8,14);
scene.add(new THREE.HemisphereLight(0xffffff,0x557744,2.2));const sun=new THREE.DirectionalLight(0xffffff,2);sun.position.set(30,60,20);sun.castShadow=true;scene.add(sun);
const ground=new THREE.Mesh(new THREE.PlaneGeometry(500,500),new THREE.MeshStandardMaterial({color:0x6d984e}));ground.rotation.x=-Math.PI/2;scene.add(ground);
const river=new THREE.Mesh(new THREE.PlaneGeometry(18,500),new THREE.MeshStandardMaterial({color:0x277da1,roughness:.25}));river.rotation.x=-Math.PI/2;river.position.y=.03;river.position.x=-28;scene.add(river);
function box(x,z,w,d,h,c){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshStandardMaterial({color:c}));m.position.set(x,h/2,z);m.castShadow=m.receiveShadow=true;scene.add(m);return m}
for(let z=-180;z<180;z+=22){box(-5,z,14,14,8+Math.random()*12,0xc7a36c);box(18,z+8,15,16,7+Math.random()*14,0xd0c1a2)}
const road=new THREE.Mesh(new THREE.PlaneGeometry(15,500),new THREE.MeshStandardMaterial({color:0x34383c}));road.rotation.x=-Math.PI/2;road.position.y=.04;road.position.x=7;scene.add(road);
const bakery=box(18,2,17,15,8,0xd07b4c);const sign=document.createElement('div');
const player=box(5,8,1.3,1.3,2.4,0x111111);player.position.y=1.2;
const keys={};addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=true;if(e.key.toLowerCase()==='t')tablet.hidden=!tablet.hidden});addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);
let started=false,money=2500,flour=120;
go.onclick=()=>{start.style.display='none';hud.hidden=false;help.hidden=false;started=true};close.onclick=()=>tablet.hidden=true;
order.onclick=()=>{if(money>=85){money-=85;flour+=100;document.querySelector('#money').textContent=money.toLocaleString('de-DE')+' €';document.querySelector('#flour').textContent=flour+' kg';msg.textContent='Mehl geliefert: Müller-KI → Bäckerei.'}};
function resize(){renderer.setSize(innerWidth,innerHeight,false);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix()}addEventListener('resize',resize);resize();
let last=performance.now();function loop(t){requestAnimationFrame(loop);const dt=Math.min((t-last)/1000,.05);last=t;if(started){let dx=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0),dz=(keys.s||keys.arrowdown?1:0)-(keys.w||keys.arrowup?1:0);let l=Math.hypot(dx,dz)||1;player.position.x+=dx/l*10*dt;player.position.z+=dz/l*10*dt;camera.position.lerp(new THREE.Vector3(player.position.x,8,player.position.z+14),.08);camera.lookAt(player.position.x,1,player.position.z)}renderer.render(scene,camera)}loop(performance.now());