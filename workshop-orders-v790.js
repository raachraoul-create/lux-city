import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{let W=window.LuxWorld,B=window.LuxVehicleBusiness760||window.LuxVehicleBusiness750,TK=window.LuxWorkTasks780||window.LuxWorkTasks770;if(!W?.scene||!B?.groups?.length||!TK)return;clearInterval(q);init(W,B,TK)},350);
function init(W,B,TK){
 const parent=B.groups[1]||W.scene,M=(c,r=.35,m=.28,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei}),A=(g,m,x,y,z,p)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;p.add(o);return o};
 const car=new T.Group();car.name='WorkshopCustomerCar790';car.position.set(0,0,.5);parent.add(car);
 const body=M(0x4d6174,.24,.38),dark=M(0x15191c,.34,.42),glass=M(0x527485,.10,.22),metal=M(0xaab0b4,.22,.62);
 A(new T.BoxGeometry(1.90,.62,4.35),body,0,.68,0,car);A(new T.BoxGeometry(1.62,.67,1.92),glass,0,1.24,-.12,car);A(new T.BoxGeometry(1.48,.08,.08),glass,0,1.42,-1.10,car);
 for(const sx of[-1,1])for(const z of[-1.42,1.42]){let wh=A(new T.CylinderGeometry(.35,.35,.22,20),dark,sx*.98,.39,z,car);wh.rotation.z=Math.PI/2;let rim=A(new T.CylinderGeometry(.20,.20,.235,16),metal,sx*.98,.39,z,car);rim.rotation.z=Math.PI/2}
 A(new T.BoxGeometry(1.15,.12,.08),M(0xf3f0e7,.18,.05,0xffffff,.24),0,.70,-2.20,car);A(new T.BoxGeometry(1.12,.12,.08),M(0x8e1820,.18,.05,0xff1924,.16),0,.70,2.20,car);
 const board=document.createElement('div');board.id='workshopOrder790';board.style='position:fixed;right:10px;bottom:88px;z-index:61;background:#0b111de8;color:#fff;border:1px solid #ffffff2a;border-radius:10px;padding:8px 10px;font:11px Arial;display:none;max-width:260px';document.body.appendChild(board);
 let lastId=null;
 function render(){
   let st=TK.state,o=st?.active&&st.job==='Mechaniker'?st.order:null;
   car.visible=!!o;board.style.display=o?'block':'none';
   if(o){board.innerHTML='<b>🔧 '+o.id+' · '+o.model+'</b><br>'+o.issue+'<br><span style="color:#f1b84b">Auftragspauschale '+Number(o.reward||0).toLocaleString('de-DE')+' €</span>';lastId=o.id}
 }
 setInterval(render,250);render();
 window.LuxWorkshopOrders790={version:'7.9.0',car,board}
}
