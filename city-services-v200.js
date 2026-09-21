import * as T from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
const wait=setInterval(()=>{if(window.LuxWorld){clearInterval(wait);init()}},150);
function init(){
 const W=LuxWorld,S=W.scene,M=(c,r=.72,m=.03)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m});
 const add=(g,mat,x,y,z,p=S)=>{let o=new T.Mesh(g,mat);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;p.add(o);return o};
 const state=(()=>{try{return JSON.parse(localStorage.getItem("luxcity_city_v200")||"{}")}catch{return{}}})(); state.levels??={};
 const save=()=>localStorage.setItem("luxcity_city_v200",JSON.stringify(state));
 function sign(text,w=9){let cv=document.createElement("canvas");cv.width=512;cv.height=96;let c=cv.getContext("2d");c.fillStyle="#f3f0e8";c.fillRect(0,0,512,96);c.fillStyle="#111";c.font="bold 35px Arial";c.textAlign="center";c.textBaseline="middle";c.fillText(text,256,48);let tx=new T.CanvasTexture(cv);return new T.Mesh(new T.PlaneGeometry(w,1.7),new T.MeshBasicMaterial({map:tx,side:T.DoubleSide}))}
 function building(d){
  let g=new T.Group(),lv=state.levels[d.id]||1,scale=1+(lv-1)*.16,w=d.w*scale,l=d.l*scale,h=d.h+(lv-1)*1.2;
  add(new T.BoxGeometry(w,h,l),M(d.color),0,h/2,0,g);
  add(new T.BoxGeometry(w+.5,.45,l+.5),M(0x34383b),0,h+.22,0,g);
  if(d.factory){for(let i=-1;i<=1;i++)add(new T.CylinderGeometry(.55,.7,h*.7,14),M(0x9ba0a2,.55,.35),i*2.1,h+.9,-l*.18,g)}
  if(d.garage){for(let i=0;i<d.garage;i++){let x=(i-(d.garage-1)/2)*(w/(d.garage+1));add(new T.BoxGeometry(w/(d.garage+1)-.45,h*.55,.16),M(0x353b40),x,h*.3,l/2+.09,g)}}
  else {add(new T.BoxGeometry(2,3,.18),M(0x4c3428),0,1.5,l/2+.1,g);for(let x of[-w*.28,w*.28])add(new T.BoxGeometry(2.2,1.6,.16),M(0x75a9c0,.2),x,h*.55,l/2+.1,g)}
  let sg=sign(d.name,Math.min(13,Math.max(7,w*.72)));sg.position.set(0,h-.9,l/2+.12);g.add(sg);
  g.position.set(d.x,0,d.z);S.add(g);return g
 }
 const defs=[
 {id:"bakery",name:"BÄCKEREI",x:-92,z:-92,w:13,l:11,h:7,color:0xd5b48c},
 {id:"cafe",name:"CAFÉ",x:91,z:-91,w:14,l:11,h:7,color:0xd7c4a2},
 {id:"pub",name:"KNEIPE",x:-91,z:91,w:14,l:12,h:7,color:0xa77962},
 {id:"mill",name:"MÜHLE",x:91,z:91,w:24,l:19,h:11,color:0xb7b0a4,factory:true},
 {id:"sugar",name:"ZUCKERBETRIEB",x:-92,z:218,w:28,l:22,h:11,color:0xd5d2c9,factory:true},
 {id:"bottler",name:"WASSER & GETRÄNKE",x:92,z:218,w:34,l:25,h:12,color:0xaabfc8,factory:true},
 {id:"post",name:"POST & LOGISTIK",x:-92,z:-218,w:31,l:23,h:10,color:0xd8b24d,garage:3},
 {id:"police",name:"POLIZEI",x:92,z:-218,w:22,l:18,h:9,color:0x9eb3c8,garage:2},
 {id:"fire",name:"FEUERWEHR",x:210,z:92,w:25,l:34,h:10,color:0xb65b4e,garage:3},
 {id:"rescue",name:"RETTUNGSWACHE",x:210,z:-92,w:22,l:27,h:9,color:0xe2ded6,garage:2}
 ];defs.forEach(building);
 function emergency(type,x,z){
  let g=new T.Group(),isFire=type==="fire",isAmb=type==="ambulance",w=isFire?2.55:2.25,l=isFire?6.4:5.1,h=isFire?1.75:1.45,col=isFire?0xc82424:isAmb?0xf2f2ee:0x244e8a;
  add(new T.BoxGeometry(w,h,l),M(col,.3,.18),0,h/2+.35,0,g);add(new T.BoxGeometry(w*.86,.7,l*.36),M(0x6f91a2,.18),0,h+0.28,-l*.18,g);
  for(let sx of[-1,1])for(let zz of[-1,1]){let q=add(new T.CylinderGeometry(.4,.4,.25,16),M(0x111111),sx*w*.5,.42,zz*l*.32,g);q.rotation.z=Math.PI/2}
  let bar=add(new T.BoxGeometry(1.35,.16,.35),M(isFire?0x2875d4:0x2a76d2,.2,.2),0,h+.75,0,g);g.position.set(x,0,z);g.userData={speed:isFire?5.2:6.2,baseZ:z,range:42};S.add(g);return g
 }
 const emergency=[emergency("police",120,-218),emergency("ambulance",215,-60),emergency("fire",215,55)];
 W.registerTick(dt=>{for(let v of emergency){v.position.z+=v.userData.speed*dt;if(v.position.z>v.userData.baseZ+v.userData.range)v.position.z=v.userData.baseZ-v.userData.range}});
 function ui(){let m=document.querySelector("#modal"),b=document.querySelector("#modalBody");if(!m||!b)return;m.hidden=false;m.style.display="block";b.innerHTML="<h2>🏭 Firmen & Ausbau</h2><p>Firmen können mit ihrem Erfolg vergrößert werden. Ausbau erhöht sichtbar die Gebäudestufe.</p>"+defs.filter(d=>["bakery","cafe","pub","mill","sugar","bottler","post"].includes(d.id)).map(d=>{let lv=state.levels[d.id]||1,cost=lv*75000;return '<div class="row"><b>'+d.name+'</b> · Stufe '+lv+'<br>Nächster Ausbau: '+cost.toLocaleString("de-DE")+' € <button data-up="'+d.id+'">AUSBAUEN</button></div>'}).join("");b.querySelectorAll("[data-up]").forEach(x=>x.onclick=()=>{let id=x.dataset.up,lv=state.levels[id]||1,cost=lv*75000,cash=window.LuxAccounts?.profile?.cash??window.LuxLife?.state?.cash??0;if(cash<cost)return alert("Nicht genug Geld.");state.levels[id]=lv+1;save();alert("Ausbau gespeichert. Die neue Gebäudestufe erscheint beim nächsten Start.");location.reload()})}
 let hud=document.querySelector("#hud");if(hud){let b=document.createElement("button");b.textContent="STADT & FIRMEN";b.onclick=ui;hud.appendChild(b)}
 window.LuxCityServices={state,buildings:defs,open:ui};
}