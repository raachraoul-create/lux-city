import * as T from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
const wait=setInterval(()=>{if(window.LuxWorld){clearInterval(wait);init()}},150);
function init(){
 const W=LuxWorld,S=W.scene,M=(c,r=.72,m=.03)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m}),doorMeshes={};
 const add=(g,mat,x,y,z,p=S)=>{let o=new T.Mesh(g,mat);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;p.add(o);return o};
 const state=(()=>{try{return JSON.parse(localStorage.getItem("luxcity_city_v200")||"{}")}catch{return{}}})(); state.levels??={};
 const save=()=>localStorage.setItem("luxcity_city_v200",JSON.stringify(state));
 function sign(text,w=9){let cv=document.createElement("canvas");cv.width=512;cv.height=96;let c=cv.getContext("2d");c.fillStyle="#f3f0e8";c.fillRect(0,0,512,96);c.fillStyle="#111";c.font="bold 35px Arial";c.textAlign="center";c.textBaseline="middle";c.fillText(text,256,48);let tx=new T.CanvasTexture(cv);return new T.Mesh(new T.PlaneGeometry(w,1.7),new T.MeshBasicMaterial({map:tx,side:T.DoubleSide}))}
 function building(d){
  let g=new T.Group(),lv=state.levels[d.id]||1,scale=1+(lv-1)*.16,w=d.w*scale,l=d.l*scale,h=d.h+(lv-1)*1.2;
  add(new T.BoxGeometry(w,h,l),M(d.color),0,h/2,0,g);
  add(new T.BoxGeometry(w+.5,.45,l+.5),M(0x34383b),0,h+.22,0,g);
  if(d.factory){for(let i=-1;i<=1;i++)add(new T.CylinderGeometry(.55,.7,h*.7,14),M(0x9ba0a2,.55,.35),i*2.1,h+.9,-l*.18,g)}
  if(d.garage){for(let i=0;i<d.garage;i++){let x=(i-(d.garage-1)/2)*(w/(d.garage+1));add(new T.BoxGeometry(w/(d.garage+1)-.45,h*.55,.16),M(0x353b40),x,h*.3,l/2+.09,g)}for(let x of[-w*.38,w*.38])add(new T.BoxGeometry(1.6,1.35,.16),M(0x75a9c0,.2),x,h*.68,l/2+.1,g)}
  else {for(let x of[-w*.28,w*.28])add(new T.BoxGeometry(2.2,1.6,.16),M(0x75a9c0,.2),x,h*.55,l/2+.1,g)}
  let hinge=new T.Group();hinge.position.set(-1,0,l/2+.13);let door=add(new T.BoxGeometry(2,3,.18),M(0x4c3428),1,1.5,0,hinge);g.add(hinge);doorMeshes[d.id]={hinge,door,open:false};
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
 {id:"rescue",name:"RETTUNGSWACHE",x:210,z:-92,w:22,l:27,h:9,color:0xe2ded6,garage:2},
 {id:"hospital",name:"KRANKENHAUS",x:-210,z:-92,w:34,l:30,h:13,color:0xe7e7e2,garage:2}
 ];defs.forEach(building);
 const emergency=[];
 function ui(){let m=document.querySelector("#modal"),b=document.querySelector("#modalBody");if(!m||!b)return;m.hidden=false;m.style.display="block";b.innerHTML="<h2>🏭 Firmen & Ausbau</h2><p>Firmen können mit ihrem Erfolg vergrößert werden. Ausbau wird vom Firmenkonto bezahlt und erhöht sichtbar die Gebäudestufe.</p>"+defs.filter(d=>["bakery","cafe","pub","mill","sugar","bottler","post"].includes(d.id)).map(d=>{let lv=state.levels[d.id]||1,cost=lv*75000;return '<div class="row"><b>'+d.name+'</b> · Stufe '+lv+'<br>Nächster Ausbau: '+cost.toLocaleString("de-DE")+' € <button data-up="'+d.id+'">AUSBAUEN</button></div>'}).join("");b.querySelectorAll("[data-up]").forEach(x=>x.onclick=()=>{let id=x.dataset.up,lv=state.levels[id]||1,cost=lv*75000,R=window.LuxBusinessRisk;if(!R||R.state.status!=='active')return alert('Du brauchst eine aktive Firma.');if(R.state.businessCash<cost)return alert('Firmenkonto reicht nicht.');R.expense(cost);state.levels[id]=lv+1;save();alert('Ausbau bezahlt: '+cost.toLocaleString('de-DE')+' € vom Firmenkonto. Die neue Gebäudestufe erscheint beim nächsten Start.');location.reload()})}
 window.LuxCityServices=window.LuxCityServices442={state,buildings:defs,doorMeshes,emergency,dispatch:(x,z,type='ambulance')=>{let job=type==='fire'?'Feuerwehr':type==='police'?'Polizist':'Rettungsdienst';return window.LuxEmergency416?.dispatch?.(job)||false},returnToBase:(type)=>{let job=type==='fire'?'Feuerwehr':type==='police'?'Polizist':'Rettungsdienst',f=window.LuxEmergency416?.fleet?.[job];if(!f)return false;f.state='return';return true},open:ui};
}
