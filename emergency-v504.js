import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let boot=setInterval(()=>{if(!window.LuxWorld||!window.LuxSystems330||!window.LuxLife)return;clearInterval(boot);init()},220);
function init(){
 const W=window.LuxWorld,S=W.scene,D=window.LuxSystems330.doors,K='luxcity_emergency_v438';
 const stats=(()=>{try{return Object.assign({completed:{Polizist:0,Feuerwehr:0,Rettungsdienst:0},total:0},JSON.parse(localStorage.getItem(K)||'{}'))}catch{return{completed:{Polizist:0,Feuerwehr:0,Rettungsdienst:0},total:0}}})(),
 save=()=>localStorage.setItem(K,JSON.stringify(stats)),
 defs={
  Polizist:{base:'police',color:0x315c91,type:'Verkehrsunfall',gate:[125,-218],park:[92,-203],rot:Math.PI},
  Feuerwehr:{base:'fire',color:0xc51828,type:'Brand',gate:[180,135],park:[210,114],rot:Math.PI},
  Rettungsdienst:{base:'hospital',color:0xf1f1ed,type:'Medizinischer Notfall',gate:[-125,-135],park:[-210,-72.5],rot:Math.PI}
 },fleet={},missions=[],
 spots=[[0,-260],[0,-180],[0,-72],[0,72],[0,180],[0,260],[-125,-205],[-125,-70],[-125,70],[-125,205],[125,-205],[125,-70],[125,205],[-145,-135],[-70,-135],[70,-135],[145,-135],[-145,135],[-70,135],[70,135],[145,135]];
 function M(c,r=.35,m=.24,e=0,ei=0){return new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei})}
 function A(g,m,x,y,z,p){let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=true;p.add(o);return o}
 function wheel(parent,x,z,r=.46){let g=new T.Group();g.position.set(x,r+.05,z);parent.add(g);let tyre=A(new T.CylinderGeometry(r,r,.30,20),M(0x111315,.84,.02),0,0,0,g);tyre.rotation.z=Math.PI/2;let hub=A(new T.CylinderGeometry(r*.48,r*.48,.315,16),M(0xb9c0c3,.28,.72),0,0,0,g);hub.rotation.z=Math.PI/2;return g}
 function texture(title,sub){
   let c=document.createElement('canvas');c.width=1024;c.height=256;let x=c.getContext('2d');x.fillStyle='#f4df42';x.fillRect(0,0,1024,256);
   x.fillStyle='#bd1726';x.fillRect(0,0,1024,22);x.fillRect(0,234,1024,22);x.fillStyle='#111820';x.textAlign='center';x.textBaseline='middle';
   x.font='900 88px Arial';x.fillText(title,512,88);x.font='800 50px Arial';x.fillText(sub,512,175);let t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t
 }
 function genericVehicle(job,d){
   let van=job!=='Polizist',g=new T.Group();
   A(new T.BoxGeometry(van?2.35:2.05,van?1.45:.72,van?5.3:4.55),M(d.color),0,van?1.05:.68,0,g);
   A(new T.BoxGeometry(van?2.1:1.72,van?.78:.72,van?1.8:2.0),M(0x45626f,.08,.22),0,van?1.82:1.25,-.45,g);
   for(let sx of[-1,1])for(let z of[van?-1.65:-1.45,van?1.65:1.45]){let w=A(new T.CylinderGeometry(van?.39:.35,van?.39:.35,.24,18),M(0x111111,.72,.03),sx*(van?1.18:1.04),.4,z,g);w.rotation.z=Math.PI/2}
   let bar=A(new T.BoxGeometry(1.25,.13,.23),M(0x1688ff,.15,.15,0x1688ff,3),0,van?2.3:1.72,0,g);
   A(new T.BoxGeometry(.55,.1,.04),M(0xf8f4dc,.15,.1,0xffe8ad,.5),-.55,.62,van?-2.67:-2.3,g);A(new T.BoxGeometry(.55,.1,.04),M(0xf8f4dc,.15,.1,0xffe8ad,.5),.55,.62,van?-2.67:-2.3,g);
   return{g,bar,wheels:[]}
 }
 function fireVehicle(){
   let g=new T.Group(),red=M(0xc51828,.40,.16),deep=M(0x861420,.46,.18),yellow=M(0xf4df42,.55,.08),silver=M(0xb9c0c3,.28,.72),dark=M(0x1a2024,.32,.55),rubber=M(0x111315,.84,.02),glass=M(0x34586a,.10,.30),white=M(0xf3f4ef,.65,.05),orange=M(0xff9d19,.32,.12,0xff8a00,.05),blueM=()=>M(0x146eff,.16,.18,0x146eff,3.2);
   A(new T.BoxGeometry(2.64,.34,6.85),dark,0,.48,.12,g);
   A(new T.BoxGeometry(2.50,2.08,2.35),red,0,1.70,-2.20,g);
   A(new T.BoxGeometry(2.36,.76,1.74),glass,0,2.15,-2.55,g);
   A(new T.BoxGeometry(.10,.80,.06),dark,0,2.15,-3.43,g);for(const sx of[-1,1])A(new T.BoxGeometry(.10,.82,.07),dark,sx*1.08,2.12,-3.38,g);
   A(new T.BoxGeometry(2.52,.30,.30),silver,0,.74,-3.48,g);A(new T.BoxGeometry(1.45,.44,.09),dark,0,1.18,-3.58,g);
   for(let x=-.55;x<=.55;x+=.18)A(new T.BoxGeometry(.07,.32,.04),silver,x,1.18,-3.63,g);
   for(const sx of[-1,1]){A(new T.BoxGeometry(.50,.25,.07),white,sx*.84,1.06,-3.63,g);A(new T.BoxGeometry(.17,.15,.07),orange,sx*1.12,1.06,-3.64,g)}
   A(new T.BoxGeometry(2.60,2.24,4.20),deep,0,1.78,.93,g);A(new T.BoxGeometry(2.68,.18,4.30),silver,0,2.93,.93,g);
   for(const sx of[-1,1])for(const z of[-.18,.93,2.02]){A(new T.BoxGeometry(.07,1.50,.94),silver,sx*1.33,1.74,z,g);for(let y=1.08;y<=2.39;y+=.18)A(new T.BoxGeometry(.025,.035,.82),dark,sx*1.37,y,z,g)}
   for(const sx of[-1,1])A(new T.BoxGeometry(.20,.12,4.65),silver,sx*1.43,.64,.70,g);
   A(new T.BoxGeometry(2.55,2.08,.20),red,0,1.74,3.13,g);
   for(let i=-4;i<=4;i++){let st=A(new T.BoxGeometry(.30,.14,.035),i%2?yellow:white,i*.27,1.39,3.245,g);st.rotation.z=(i%2?1:-1)*.68}
   A(new T.BoxGeometry(2.18,.24,.08),yellow,0,.72,3.25,g);
   for(const sx of[-1,1]){A(new T.BoxGeometry(.22,.18,.05),red,sx*.82,.94,3.28,g);A(new T.BoxGeometry(.20,.14,.05),orange,sx*1.05,.94,3.28,g)}
   for(const sx of[-1,1])A(new T.BoxGeometry(.10,.08,4.10),silver,sx*.47,3.14,.64,g);
   for(let z=-1.10;z<=2.48;z+=.45)A(new T.BoxGeometry(1.05,.055,.08),silver,0,3.18,z,g);
   let tube=A(new T.CylinderGeometry(.16,.16,3.10,12),silver,-.82,3.14,.98,g);tube.rotation.x=Math.PI/2;
   let monitor=new T.Group();monitor.position.set(.72,3.17,1.45);g.add(monitor);A(new T.CylinderGeometry(.17,.20,.35,12),dark,0,.18,0,monitor);let noz=A(new T.CylinderGeometry(.08,.11,.74,12),silver,0,.43,-.24,monitor);noz.rotation.x=Math.PI/2.5;
   const wheels=[];for(const sx of[-1,1])for(const z of[-2.15,1.82])wheels.push(wheel(g,sx*1.36,z,.48));
   for(const sx of[-1,1]){A(new T.BoxGeometry(.06,.42,.06),dark,sx*1.37,2.06,-2.70,g);A(new T.BoxGeometry(.18,.30,.08),dark,sx*1.48,2.19,-2.79,g)}
   const blueLights=[],bar=new T.Group();g.add(bar);
   function bl(x,y,z,w=.30,h=.14,d=.11){let m=A(new T.BoxGeometry(w,h,d),blueM(),x,y,z,bar);blueLights.push(m)}
   for(const x of[-.78,-.26,.26,.78])bl(x,3.02,-2.10,.34,.14,.20);
   for(const x of[-.72,.72])bl(x,1.50,-3.66,.22,.16,.08);
   for(const x of[-.94,.94])bl(x,2.66,3.28,.20,.15,.08);
   let sideMat=new T.MeshBasicMaterial({map:texture('CGDIS','112 · CIS LUX CITY'),side:T.DoubleSide});
   for(const sx of[-1,1]){let p=A(new T.PlaneGeometry(3.38,.84),sideMat,sx*1.385,2.20,.88,g);p.rotation.y=sx>0?Math.PI/2:-Math.PI/2;A(new T.BoxGeometry(.055,.19,5.25),yellow,sx*1.395,1.05,.44,g)}
   let frontMat=new T.MeshBasicMaterial({map:texture('CGDIS','112'),side:T.DoubleSide});A(new T.PlaneGeometry(1.58,.44),frontMat,0,1.68,-3.67,g);
   g.userData.blueLights=blueLights;g.userData.fireWheels=wheels;g.userData.fireEngine=true;bar.visible=false;
   return{g,bar,wheels,blueLights}
 }
 function vehicle(job,d){
   let built=job==='Feuerwehr'?fireVehicle():genericVehicle(job,d),g=built.g,door=D[d.base],p=d.park?{x:d.park[0],z:d.park[1]}:{x:door.x+4,z:door.z+3};
   g.position.set(p.x,.055,p.z);g.rotation.y=d.rot||0;g.visible=true;
   g.userData=Object.assign(g.userData||{},{emergency500:true,emergency502:true,emergency504:true,city370:true,city440:true,city450:true,city500:true,city560:true,job,halfW:job==='Feuerwehr'?1.36:(job==='Polizist'?1.04:1.18),halfL:job==='Feuerwehr'?3.45:(job==='Polizist'?2.35:2.8),r:job==='Feuerwehr'?3.65:(job==='Polizist'?2.35:2.8)});
   S.add(g);W.cars.push(g);
   return{v:g,bar:built.bar,blueLights:built.blueLights||[],wheels:built.wheels||[],base:p,gate:{x:d.gate[0],z:d.gate[1]},state:'base',mission:null,route:[],idx:0,wait:0,job,last:{x:p.x,z:p.z},sirenAt:0}
 }
 for(const [job,d] of Object.entries(defs))if(D[d.base])fleet[job]=vehicle(job,d);
 function dense(points,step=4){let out=[];for(let i=0;i<points.length-1;i++){let a=points[i],b=points[i+1],d=Math.hypot(b.x-a.x,b.z-a.z),n=Math.max(1,Math.ceil(d/step));for(let k=0;k<n;k++){let t=k/n;out.push({x:a.x+(b.x-a.x)*t,z:a.z+(b.z-a.z)*t})}}out.push(points[points.length-1]);return out}
 function roadType(p){let vs=[-125,0,125],hs=[-135,135],vx=vs.reduce((a,b)=>Math.abs(p.x-b)<Math.abs(p.x-a)?b:a),hz=hs.reduce((a,b)=>Math.abs(p.z-b)<Math.abs(p.z-a)?b:a),dv=Math.abs(p.x-vx),dh=Math.abs(p.z-hz);return dv<=dh?{axis:'v',line:vx}:{axis:'h',line:hz}}
 function roadPath(a,b){let A0=roadType(a),B0=roadType(b),pts=[{x:a.x,z:a.z}];if(A0.axis==='v'&&B0.axis==='v'){if(A0.line===B0.line)pts.push({x:b.x,z:b.z});else{let hs=[-135,135],h=hs.reduce((u,v)=>Math.abs(a.z-v)+Math.abs(b.z-v)<Math.abs(a.z-u)+Math.abs(b.z-u)?v:u);pts.push({x:A0.line,z:h},{x:B0.line,z:h},{x:b.x,z:b.z})}}else if(A0.axis==='h'&&B0.axis==='h'){if(A0.line===B0.line)pts.push({x:b.x,z:b.z});else{let vs=[-125,0,125],v=vs.reduce((u,x)=>Math.abs(a.x-x)+Math.abs(b.x-x)<Math.abs(a.x-u)+Math.abs(b.x-u)?x:u);pts.push({x:v,z:A0.line},{x:v,z:B0.line},{x:b.x,z:b.z})}}else if(A0.axis==='v'&&B0.axis==='h')pts.push({x:A0.line,z:B0.line},{x:b.x,z:b.z});else pts.push({x:B0.line,z:A0.line},{x:b.x,z:b.z});return dense(pts)}
 function setRoute(f,target,returning=false){let start={x:f.v.position.x,z:f.v.position.z},gate=f.gate,road=returning?roadPath(target,gate):roadPath(gate,target),pts=returning?[start,...road.slice(1),f.base]:[start,gate,...road.slice(1)];f.route=dense(pts,3.8);f.idx=0}
 function incidentNearPlayer(){let p=W.player.position,s=spots.slice().sort((a,b)=>Math.hypot(a[0]-p.x,a[1]-p.z)-Math.hypot(b[0]-p.x,b[1]-p.z)),top=s.slice(0,7),q=top[Math.floor(Math.random()*top.length)];return{x:q[0],z:q[1]}}
 function create(forceJob){
   if(missions.some(x=>x.active))return false;if(!forceJob&&Math.random()>.025)return false;
   let jobs=Object.keys(defs),job=forceJob||jobs[Math.floor(Math.random()*jobs.length)],pt=incidentNearPlayer(),m={id:Date.now(),job,type:defs[job].type,x:pt.x,z:pt.z,active:true,status:'Anfahrt'};
   let mk=new T.Mesh(new T.RingGeometry(2.8,3.5,28),M(0xff5533,.4,.05,0xff2200,1.2));mk.rotation.x=-Math.PI/2;mk.position.set(m.x,.08,m.z);S.add(mk);m.marker=mk;missions.push(m);
   let f=fleet[job];if(f&&f.state==='base'){f.state='out';f.mission=m;setRoute(f,{x:m.x,z:m.z},false)}render();return m
 }
 function step(f,dt){
   f.v.visible=true;
   let active=f.state!=='base',blink=Math.floor(Date.now()/150)%2===0;
   if(f.bar)f.bar.visible=active;
   if(f.blueLights?.length)f.blueLights.forEach((m,i)=>m.material.emissiveIntensity=active&&((i+(blink?1:0))%2===0)?4.6:.08);
   let moved=Math.hypot(f.v.position.x-f.last.x,f.v.position.z-f.last.z),spNow=moved/Math.max(dt,.001);f.last={x:f.v.position.x,z:f.v.position.z};
   for(const w of f.wheels||[])w.rotation.x-=Math.min(.75,spNow*dt*1.8);
   if(f.job==='Feuerwehr'&&active&&Date.now()-f.sirenAt>1150&&Math.hypot(f.v.position.x-W.player.position.x,f.v.position.z-W.player.position.z)<85){f.sirenAt=Date.now();window.LuxAudio841?.fireSiren?.()}
   if(f.state==='base')return;
   if(f.state==='scene'){if(Date.now()>f.wait){let m=f.mission;if(m){m.active=false;m.status='Durch KI abgeschlossen';if(m.marker){S.remove(m.marker);m.marker=null}}f.state='return';setRoute(f,{x:f.v.position.x,z:f.v.position.z},true);render()}return}
   let q=f.route[Math.min(f.idx+1,f.route.length-1)];
   if(!q){if(f.state==='out'){f.state='scene';f.wait=Date.now()+12000;if(f.mission)f.mission.status='Einsatz läuft'}else{f.state='base';f.mission=null;f.v.position.set(f.base.x,.055,f.base.z);f.v.rotation.y=defs[f.job]?.rot||0;if(f.bar)f.bar.visible=false}return}
   let dx=q.x-f.v.position.x,dz=q.z-f.v.position.z,d=Math.hypot(dx,dz);
   if(d<.7){f.idx++;if(f.idx>=f.route.length-1){if(f.state==='out'){f.state='scene';f.wait=Date.now()+12000;if(f.mission)f.mission.status='Einsatz läuft'}else{f.state='base';f.mission=null;f.v.position.set(f.base.x,.055,f.base.z);f.v.rotation.y=defs[f.job]?.rot||0;if(f.bar)f.bar.visible=false}}return}
   let ux=dx/d,uz=dz/d,sp=9.2,staticHit=(window.LuxCollision500||window.LuxCollision471)?.blockedStatic?.(f.v.position.x+ux*sp*dt,f.v.position.z+uz*sp*dt,f.job==='Feuerwehr'?1.25:1.05);
   if(staticHit)sp=0;f.v.position.x+=ux*sp*dt;f.v.position.z+=uz*sp*dt;f.v.position.y=.055;f.v.rotation.y=Math.atan2(dx,dz)+Math.PI
 }
 function nearActive(x,z,r=11){return Object.values(fleet).some(f=>f.state!=='base'&&f.v.visible!==false&&Math.hypot(f.v.position.x-x,f.v.position.z-z)<r)}
 function render(){
   let m=missions.find(x=>x.active),box=document.getElementById('emergency416');if(!m){box?.remove();return}
   if(!box){box=document.createElement('div');box.id='emergency416';box.style='position:fixed;right:10px;bottom:10px;z-index:24;background:#7b1010;color:white;padding:10px;border-radius:9px;max-width:270px';document.body.appendChild(box)}
   let mine=window.LuxLife.state.job===m.job;box.innerHTML='<b>🚨 '+m.type+'</b><br>'+m.job+' · '+m.status+'<br>Einsätze im Beruf: '+(stats.completed[m.job]||0)+'<br>'+(mine?'<button id="take416">EINSATZ ÜBERNEHMEN</button>':'');
   let b=document.getElementById('take416');if(b)b.onclick=()=>{let shift=window.LuxWork412?.state?.active;if(!shift||shift.job!==m.job)return alert('Starte zuerst deine Schicht bei '+m.job+'.');if(Math.hypot(W.player.position.x-m.x,W.player.position.z-m.z)>18)return alert('Fahre zuerst zum Einsatzort.');m.active=false;m.status='Vom Spieler abgeschlossen';if(m.marker){S.remove(m.marker);m.marker=null}let f=fleet[m.job];if(f){f.state='return';setRoute(f,{x:f.v.position.x,z:f.v.position.z},true)}stats.completed[m.job]=(stats.completed[m.job]||0)+1;stats.total++;save();render();window.LuxCloud438?.save?.();alert('Einsatz abgeschlossen.')}
 }
 setInterval(()=>create(),9000);setInterval(render,1000);W.registerTick(dt=>Object.values(fleet).forEach(f=>step(f,dt)));
 window.LuxEmergency416=window.LuxEmergency429=window.LuxEmergency438=window.LuxEmergency500=window.LuxEmergency501=window.LuxEmergency502={fleet,missions,stats,dispatch:create,save,nearActive,roadPath};
}