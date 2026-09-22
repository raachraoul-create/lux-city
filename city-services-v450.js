import * as T from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
const wait=setInterval(()=>{if(window.LuxWorld){clearInterval(wait);init()}},150);
function init(){
 const W=LuxWorld,S=W.scene,M=(c,r=.72,m=.03)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m}),doorMeshes={};
 const add=(g,mat,x,y,z,p=S)=>{let o=new T.Mesh(g,mat);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;p.add(o);return o};
 const state=(()=>{try{return JSON.parse(localStorage.getItem("luxcity_city_v200")||"{}")}catch{return{}}})(); state.levels??={};
 const save=()=>localStorage.setItem("luxcity_city_v200",JSON.stringify(state));
 function sign(text,w=9){let cv=document.createElement("canvas");cv.width=512;cv.height=96;let c=cv.getContext("2d");c.fillStyle="#f3f0e8";c.fillRect(0,0,512,96);c.fillStyle="#111";c.font="bold 35px Arial";c.textAlign="center";c.textBaseline="middle";c.fillText(text,256,48);let tx=new T.CanvasTexture(cv);return new T.Mesh(new T.PlaneGeometry(w,1.7),new T.MeshBasicMaterial({map:tx,side:T.DoubleSide}))}
 function building(d){
  let g=new T.Group(),lv=state.levels[d.id]||1,scale=1+(lv-1)*.16,w=d.w*scale,l=d.l*scale,h=d.h+(lv-1)*1.2,wall=M(d.color,.72,.02),dark=M(0x3d4245,.48,.22),glass=M(0x7098aa,.12,.16);
  add(new T.BoxGeometry(w,h,l),wall,0,h/2,0,g);add(new T.BoxGeometry(w+.5,.42,l+.5),dark,0,.21,0,g);add(new T.BoxGeometry(w+.6,.48,l+.6),M(0x44494c,.45,.2),0,h+.24,0,g);
  if(d.factory){for(let i=-1;i<=1;i++)add(new T.CylinderGeometry(.55,.7,h*.7,14),M(0x8e9498,.5,.38),i*2.1,h+.9,-l*.18,g);for(let x=-w*.36;x<=w*.36;x+=3.2)add(new T.BoxGeometry(2,1.25,.14),glass,x,h*.62,l/2+.1,g)}
  else if(d.garage){for(let i=0;i<d.garage;i++){let x=(i-(d.garage-1)/2)*(w/(d.garage+1));add(new T.BoxGeometry(w/(d.garage+1)-.45,h*.55,.16),M(0x353b40,.35,.28),x,h*.3,l/2+.09,g)}for(let x of[-w*.39,w*.39])add(new T.BoxGeometry(1.6,1.35,.16),glass,x,h*.7,l/2+.1,g)}
  else {for(let x of[-w*.3,w*.3])for(let y of[h*.38,h*.67])add(new T.BoxGeometry(2.1,1.35,.14),glass,x,y,l/2+.1,g)}
  for(let z of[-l*.27,l*.27])for(let y of[h*.38,h*.67]){add(new T.BoxGeometry(.14,1.25,1.8),glass,w/2+.1,y,z,g);add(new T.BoxGeometry(.14,1.25,1.8),glass,-w/2-.1,y,z,g)}
  for(let x of[-w*.28,w*.28])add(new T.BoxGeometry(1.9,1.25,.14),glass,x,h*.56,-l/2-.1,g);
  let hinge=new T.Group();hinge.position.set(-1,0,l/2+.13);let door=add(new T.BoxGeometry(2,3,.18),M(0x4c3428,.6,.05),1,1.5,0,hinge);g.add(hinge);doorMeshes[d.id]={hinge,door,open:false};
  add(new T.BoxGeometry(4.4,.2,2.2),M(0x4c5154,.5,.3),0,3.35,l/2+1.0,g);for(let x of[-1.9,1.9])add(new T.CylinderGeometry(.055,.07,3.1,8),dark,x,1.55,l/2+1.95,g);
  if(['bakery','cafe','pub'].includes(d.id)){let aw=add(new T.BoxGeometry(7,.18,1.55),M(d.id==='bakery'?0x9b392f:d.id==='cafe'?0x355a48:0x493b36),0,3.65,l/2+.78,g);aw.rotation.x=-.08}
  if(!d.factory){for(let x of[-w*.22,w*.22])add(new T.BoxGeometry(1.7,.7,1.5),M(0x70767a,.35,.45),x,h+.82,-l*.12,g)}
  let sg=sign(d.name,Math.min(13,Math.max(7,w*.72)));sg.position.set(0,h-.8,l/2+.14);g.add(sg);g.position.set(d.x,0,d.z);S.add(g);
  // perimeter collision with a real gap at the front door
  for(let zz=-l/2;zz<=l/2;zz+=2)W.obstacles.push({x:d.x-w/2,z:d.z+zz,r:1.05},{x:d.x+w/2,z:d.z+zz,r:1.05});for(let xx=-w/2;xx<=w/2;xx+=2)W.obstacles.push({x:d.x+xx,z:d.z-l/2,r:1.05});for(let xx=-w/2;xx<=w/2;xx+=2)if(Math.abs(xx)>2.1)W.obstacles.push({x:d.x+xx,z:d.z+l/2,r:1.05});
  let apron=add(new T.BoxGeometry(Math.min(w*.72,14),.08,4.8),M(d.garage?0x777b7d:0xa9a39a,.9),d.x,.07,d.z+l/2+2.4,S);apron.receiveShadow=true;return g
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
 {id:"rescue",name:"RETTUNGSWACHE",x:210,z:-92,w:22,l:27,h:9,color:0xe2ded6,garage:2},
 {id:"hospital",name:"KRANKENHAUS",x:-210,z:-92,w:34,l:30,h:13,color:0xe7e7e2,garage:2}
 ];defs.forEach(building);
 const emergency=[];
 function ui(){let m=document.querySelector("#modal"),b=document.querySelector("#modalBody");if(!m||!b)return;m.hidden=false;m.style.display="block";b.innerHTML="<h2>🏭 Firmen & Ausbau</h2><p>Firmen können mit ihrem Erfolg vergrößert werden. Ausbau wird vom Firmenkonto bezahlt und erhöht sichtbar die Gebäudestufe.</p>"+defs.filter(d=>["bakery","cafe","pub","mill","sugar","bottler","post"].includes(d.id)&&window.LuxEconomy?.isMine?.(d.id)).map(d=>{let lv=state.levels[d.id]||1,cost=lv*75000;return '<div class="row"><b>'+d.name+'</b> · Stufe '+lv+'<br>Nächster Ausbau: '+cost.toLocaleString("de-DE")+' € <button data-up="'+d.id+'">AUSBAUEN</button></div>'}).join("");b.querySelectorAll("[data-up]").forEach(x=>x.onclick=()=>{let id=x.dataset.up,lv=state.levels[id]||1,cost=lv*75000,R=window.LuxBusinessRisk;if(!R||R.state.status!=='active')return alert('Du brauchst eine aktive Firma.');if(R.state.businessCash<cost)return alert('Firmenkonto reicht nicht.');R.expense(cost);state.levels[id]=lv+1;save();alert('Ausbau bezahlt: '+cost.toLocaleString('de-DE')+' € vom Firmenkonto. Die neue Gebäudestufe erscheint beim nächsten Start.');location.reload()})}
 window.LuxCityServices=window.LuxCityServices442=window.LuxCityServices443=window.LuxCityServices450={state,buildings:defs,doorMeshes,emergency,dispatch:(x,z,type='ambulance')=>{let job=type==='fire'?'Feuerwehr':type==='police'?'Polizist':'Rettungsdienst';return window.LuxEmergency416?.dispatch?.(job)||false},returnToBase:(type)=>{let job=type==='fire'?'Feuerwehr':type==='police'?'Polizist':'Rettungsdienst',f=window.LuxEmergency416?.fleet?.[job];if(!f)return false;f.state='return';return true},open:ui};
}
