import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let wait=setInterval(()=>{let E=window.LuxEmergency501||window.LuxEmergency500;if(!window.LuxWorld?.scene||!E?.fleet?.Feuerwehr)return;clearInterval(wait);init(E.fleet.Feuerwehr)},180);
function init(F){
 const W=window.LuxWorld,V=F.v;if(V.userData.fireTruck910)return;V.userData.fireTruck910=true;
 const mat=(c,r=.5,m=.12,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const red=mat(0xc51828,.40,.16),redDark=mat(0x821321,.45,.18),yellow=mat(0xf4df42,.55,.08,0x3a3300,.10),silver=mat(0xb9c0c3,.28,.72),dark=mat(0x1a2024,.32,.55),rubber=mat(0x111315,.84,.02),glass=mat(0x34586a,.10,.30),white=mat(0xf3f4ef,.65,.05),blue=mat(0x146eff,.16,.18,0x146eff,3.0),orange=mat(0xff9d19,.32,.12,0xff8a00,.05);
 const add=(g,m,x,y,z,p=V)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=true;p.add(o);return o};
 // Keep legacy emergency logic, but visually retire its primitive meshes.
 const legacy=[...V.children];for(const c of legacy)c.visible=false;
 // Chassis and modern heavy cab.
 add(new T.BoxGeometry(2.62,.34,6.70),dark,0,.48,.10);
 add(new T.BoxGeometry(2.48,2.05,2.25),red,0,1.68,-2.15);
 add(new T.BoxGeometry(2.38,.72,1.72),glass,0,2.12,-2.47);
 // Split windshield and pillars.
 add(new T.BoxGeometry(.10,.78,.06),dark,0,2.12,-3.34);
 for(const sx of[-1,1])add(new T.BoxGeometry(.10,.82,.08),dark,sx*1.08,2.09,-3.30);
 // Front bumper, grille, lamps.
 add(new T.BoxGeometry(2.48,.28,.28),silver,0,.74,-3.39);
 add(new T.BoxGeometry(1.42,.42,.09),dark,0,1.17,-3.49);
 for(let x=-.54;x<=.54;x+=.18)add(new T.BoxGeometry(.07,.31,.04),silver,x,1.17,-3.55);
 for(const sx of[-1,1]){
   add(new T.BoxGeometry(.48,.24,.07),white,sx*.84,1.05,-3.56);
   add(new T.BoxGeometry(.16,.15,.07),orange,sx*1.11,1.05,-3.57);
 }
 // Equipment body with slightly raised roof.
 add(new T.BoxGeometry(2.58,2.22,4.15),redDark,0,1.76,.95);
 add(new T.BoxGeometry(2.66,.18,4.26),silver,0,2.91,.95);
 // Side lockers and aluminium shutter ribs.
 const shutters=[];
 for(const sx of[-1,1])for(const z of[-.15,.92,1.98]){
   let panel=add(new T.BoxGeometry(.07,1.48,.92),silver,sx*1.325,1.72,z);shutters.push(panel);
   for(let y=1.08;y<=2.38;y+=.18)add(new T.BoxGeometry(.025,.035,.80),dark,sx*1.366,y,z);
 }
 // Side step boards.
 for(const sx of[-1,1])add(new T.BoxGeometry(.20,.12,4.56),silver,sx*1.42,.63,.70);
 // Rear body and high-visibility chevrons.
 add(new T.BoxGeometry(2.53,2.05,.20),red,0,1.72,3.08);
 for(let i=-4;i<=4;i++){let stripe=add(new T.BoxGeometry(.28,.13,.035),i%2?yellow:white,i*.27,1.35+Math.abs(i%2)*.02,3.205);stripe.rotation.z=(i%2?1:-1)*.68}
 add(new T.BoxGeometry(2.18,.24,.08),yellow,0,.72,3.22);
 for(const sx of[-1,1]){add(new T.BoxGeometry(.22,.18,.05),red,sx*.82,.92,3.25);add(new T.BoxGeometry(.20,.14,.05),orange,sx*1.05,.92,3.25)}
 // Roof ladder, hose tube and compact monitor.
 for(const sx of[-1,1])add(new T.BoxGeometry(.10,.08,4.10),silver,sx*.47,3.13,.64);
 for(let z=-1.1;z<=2.5;z+=.45)add(new T.BoxGeometry(1.05,.055,.08),silver,0,3.17,z);
 add(new T.CylinderGeometry(.16,.16,3.1,12),silver,-.82,3.13,.98).rotation.x=Math.PI/2;
 let monitor=new T.Group();monitor.position.set(.72,3.17,1.45);V.add(monitor);add(new T.CylinderGeometry(.17,.20,.35,12),dark,0,.18,0,monitor);let nozzle=add(new T.CylinderGeometry(.08,.11,.74,12),silver,0,.43,-.24,monitor);nozzle.rotation.x=Math.PI/2.5;
 // Wheels: two axles, visually large heavy-truck tyres.
 const wheels=[];for(const sx of[-1,1])for(const z of[-2.12,1.78]){
   let g=new T.Group();g.position.set(sx*1.34,.56,z);V.add(g);
   let tyre=add(new T.CylinderGeometry(.48,.48,.30,20),rubber,0,0,0,g);tyre.rotation.z=Math.PI/2;
   let hub=add(new T.CylinderGeometry(.22,.22,.315,16),silver,0,0,0,g);hub.rotation.z=Math.PI/2;
   wheels.push({g,tyre,hub,front:z<0});
 }
 // Mirrors.
 for(const sx of[-1,1]){add(new T.BoxGeometry(.06,.42,.06),dark,sx*1.36,2.04,-2.62);add(new T.BoxGeometry(.18,.30,.08),dark,sx*1.47,2.17,-2.72)}
 // Blue-light rig: roof bar + grille + rear corners.
 const blueLights=[];
 function bl(x,y,z,w=.22,h=.12,d=.08){let m=add(new T.BoxGeometry(w,h,d),blue,x,y,z);blueLights.push(m);return m}
 let rig=new T.Group();rig.position.set(0,0,0);V.add(rig);
 for(const x of[-.78,-.26,.26,.78]){let m=new T.Mesh(new T.BoxGeometry(.34,.13,.20),blue);m.position.set(x,2.92,-2.08);rig.add(m);blueLights.push(m)}
 for(const x of[-.70,.70]){let m=new T.Mesh(new T.BoxGeometry(.20,.15,.07),blue);m.position.set(x,1.48,-3.55);rig.add(m);blueLights.push(m)}
 for(const x of[-.92,.92]){let m=new T.Mesh(new T.BoxGeometry(.19,.14,.07),blue);m.position.set(x,2.63,3.21);rig.add(m);blueLights.push(m)}
 // White scene lights and amber side markers.
 const sceneLights=[];for(const sx of[-1,1])for(const z of[-.20,1.30,2.35]){let m=add(new T.BoxGeometry(.05,.18,.34),white,sx*1.37,2.48,z);sceneLights.push(m)}
 for(const sx of[-1,1])for(const z of[-1.2,.5,2.3])add(new T.BoxGeometry(.05,.10,.18),orange,sx*1.39,.86,z);
 // Livery textures on both sides and front; identity without manufacturer branding.
 function tex(title,sub){
   let c=document.createElement('canvas');c.width=1024;c.height=256;let x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);
   x.fillStyle='#f4df42';x.fillRect(0,0,1024,256);x.fillStyle='#bf1526';x.fillRect(0,0,1024,22);x.fillRect(0,234,1024,22);
   x.fillStyle='#101418';x.font='900 90px Arial';x.textAlign='center';x.textBaseline='middle';x.fillText(title,512,92);
   x.font='800 52px Arial';x.fillText(sub,512,174);let t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t
 }
 let sideMat=new T.MeshBasicMaterial({map:tex('CGDIS','112 · CIS LUX CITY'),side:T.DoubleSide});
 for(const sx of[-1,1]){let p=add(new T.PlaneGeometry(3.35,.82),sideMat,sx*1.382,2.18,.86);p.rotation.y=sx>0?Math.PI/2:-Math.PI/2}
 let frontMat=new T.MeshBasicMaterial({map:tex('CGDIS','112'),side:T.DoubleSide});let fp=add(new T.PlaneGeometry(1.58,.44),frontMat,0,1.66,-3.57);
 // High-visibility side stripe.
 for(const sx of[-1,1])add(new T.BoxGeometry(.055,.18,5.18),yellow,sx*1.39,1.05,.42);
 // Collision profile for player-vs-vehicle protection.
 V.userData.halfW=1.34;V.userData.halfL=3.45;V.userData.r=3.6;V.userData.fireTruck910=true;
 // Reuse emergency visibility switch with our rig.
 F.bar=rig;rig.visible=false;
 let last={x:V.position.x,z:V.position.z},sirenAt=0;
 W.registerTick(dt=>{
   let dx=V.position.x-last.x,dz=V.position.z-last.z,dist=Math.hypot(dx,dz),speed=dist/Math.max(.001,dt);last={x:V.position.x,z:V.position.z};
   for(const w of wheels)w.g.rotation.x-=Math.min(.65,speed*dt*1.65);
   let active=F.state!=='base',phase=Math.floor(Date.now()/115)%4;
   rig.visible=active;
   blueLights.forEach((m,i)=>m.material.emissiveIntensity=active&&((i+phase)%4<2)?4.8:.06);
   sceneLights.forEach(m=>m.material.emissiveIntensity=active?1.25:.08);
   if(active&&Date.now()-sirenAt>1150&&Math.hypot(V.position.x-W.player.position.x,V.position.z-W.player.position.z)<85){sirenAt=Date.now();window.LuxAudio841?.fireSiren?.()}
   // Ensure primitive legacy bar never reappears if an older reference remains.
   for(const c of legacy)if(c!==rig)c.visible=false;
 });
 // QA-only deterministic visual modes.
 const qaMode=new URLSearchParams(location.search).get('firetruckqa');
 if(qaMode){
   let ready=false,tries=0,followUntil=0;
   const reset=()=>{let E=window.LuxEmergency501||window.LuxEmergency500;if(!E)return null;for(const m of E.missions||[])if(m.active)m.active=false;F.state='base';F.mission=null;F.route=[];F.idx=0;F.v.position.set(F.base.x,0,F.base.z);F.v.rotation.y=Math.PI;return E};
   let t=setInterval(()=>{tries++;if(ready||!document.body.classList.contains('game-ready')||!W.player){if(tries>40)clearInterval(t);return}ready=true;clearInterval(t);let E=reset();if(window.LuxHomes520?.inside)window.LuxHomes520.leave?.();W.player.visible=true;W.player.position.set(202,0,123);W.yaw=Math.atan2(V.position.x-W.player.position.x,V.position.z-W.player.position.z);
     let badge=document.createElement('div');badge.id='fireTruckQa910';badge.style='position:fixed;left:50%;top:54px;transform:translateX(-50%);z-index:95;background:#101820e8;color:#fff;border:1px solid #ffffff33;border-radius:9px;padding:6px 10px;font:11px Arial;pointer-events:none';document.body.appendChild(badge);
     if(qaMode==='park'){badge.textContent='FEUERWEHR QA · PARKPOSITION';return}
     badge.textContent='FEUERWEHR QA · AUSFAHRT IN 4 SEKUNDEN';setTimeout(()=>{if(!E)return;E.dispatch?.('Feuerwehr');followUntil=Date.now()+22000;badge.textContent='FEUERWEHR QA · EINSATZFAHRT'},4000);
     W.registerTick(()=>{if(Date.now()>followUntil||F.state==='base')return;let y=V.rotation.y,fx=Math.sin(y),fz=Math.cos(y),rx=Math.cos(y),rz=-Math.sin(y);W.player.position.set(V.position.x-fx*7+rx*3.5,0,V.position.z-fz*7+rz*3.5);W.yaw=Math.atan2(V.position.x-W.player.position.x,V.position.z-W.player.position.z)})
   },200)
 }
 window.LuxFireTruck910={vehicle:V,fleet:F,wheels,blueLights,get state(){return F.state}}
}