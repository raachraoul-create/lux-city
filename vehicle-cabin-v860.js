import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{let W=window.LuxWorld,PC=window.LuxPlayerCar840||window.LuxPlayerCar750||window.LuxPlayerCar720;if(!W?.cars?.length||!PC?.car||( !window.LuxVehiclePremium980 && !window.LuxVehiclePremium960))return;clearInterval(q);init(W,PC)},420);
function init(W,PC){
 const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 const M=(c,r=.55,m=.08,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const P=(c,r=.42,m=.08)=>new T.MeshPhysicalMaterial({color:c,roughness:r,metalness:m,clearcoat:.16,clearcoatRoughness:.65});
 const A=(g,m,x,y,z,p)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=true;p.add(o);return o};
 const leather=[P(0x17191b,.50,.06),P(0x342d28,.58,.05),P(0xd7d2c8,.62,.03),P(0x262d31,.52,.08)],trim=[M(0x343a3e,.34,.38),M(0x8e7550,.62,.12),M(0xa9afb2,.28,.62)];
 const screens=[];
 function uiTexture(type='dash',accent='#5fb7e8'){
   let c=document.createElement('canvas');c.width=512;c.height=240;let x=c.getContext('2d');x.fillStyle='#071018';x.fillRect(0,0,c.width,c.height);
   x.strokeStyle=accent;x.lineWidth=5;x.globalAlpha=.88;
   if(type==='cluster'){for(const cx of[150,362]){x.beginPath();x.arc(cx,128,70,-Math.PI*.8,Math.PI*.8);x.stroke()}x.font='700 44px Arial';x.fillStyle='#e8f4fb';x.textAlign='center';x.fillText('0',150,142);x.fillText('READY',362,142)}
   else{x.fillStyle='#102634';x.fillRect(24,26,464,188);x.fillStyle=accent;x.fillRect(42,48,182,72);x.fillRect(246,48,222,18);x.fillStyle='#dce9ef';x.font='700 28px Arial';x.fillText('LUX CITY',356,102);x.fillStyle='#6f8997';for(let y=142;y<202;y+=22)x.fillRect(48,y,410,5)}
   let t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t
 }
 function seat(g,x,z,mat,scale=1){
   A(new T.BoxGeometry(.44*scale,.18*scale,.50*scale),mat,x,.73,z,g);
   let back=A(new T.BoxGeometry(.43*scale,.66*scale,.16*scale),mat,x,1.06,z+.17*scale,g);back.rotation.x=-.12;
   A(new T.BoxGeometry(.30*scale,.13*scale,.16*scale),mat,x,1.43,z+.22*scale,g);
   let seam=M(0x72777a,.62);A(new T.BoxGeometry(.018,.52*scale,.015),seam,x,1.07,z+.265*scale,g);
   for(const sx of[-1,1])A(new T.BoxGeometry(.024,.44*scale,.018),seam,x+sx*.15*scale,1.02,z+.26*scale,g)
 }
 function wheel(g,x,y,z){
   let rim=A(new T.TorusGeometry(.16,.021,8,24),M(0x171a1d,.35,.32),x,y,z,g);rim.rotation.y=Math.PI/2;
   A(new T.CylinderGeometry(.045,.045,.07,14),M(0x343a3f,.35,.38),x,y,z,g).rotation.z=Math.PI/2;
   for(const a of[-.85,0,.85]){let s=A(new T.BoxGeometry(.018,.11,.025),M(0x343a3f,.35,.38),x,y-.03,z,g);s.rotation.x=a}
 }
 function addTraffic(car,i){
   if(!car||car.userData.vehicleCabin860||car.userData.emergency500)return;car.userData.vehicleCabin860=true;
   const cls=car.userData.vehicleClass||'sedan',w=(car.userData.halfW||.94)*2,l=(car.userData.halfL||2.3)*2,g=new T.Group();g.name='VehicleCabin860';car.add(g);
   const mat=leather[i%leather.length],t=trim[i%trim.length],front=-l/2+.02;
   seat(g,-w*.20,-.22,mat,cls==='van'?1.04:.95);seat(g,w*.20,-.22,mat,cls==='van'?1.04:.95);
   if(cls!=='van'){seat(g,-w*.20,.62,mat,.92);seat(g,w*.20,.62,mat,.92)}
   A(new T.BoxGeometry(w*.65,.15,.44),M(0x191d20,.42,.16),0,1.03,front+l*.31,g);
   A(new T.BoxGeometry(.20,.22,.76),t,0,.77,.18,g);
   wheel(g,-w*.19,1.17,front+l*.36);
   let cluster=A(new T.PlaneGeometry(.31,.12),new T.MeshBasicMaterial({map:uiTexture('cluster',i%2?'#d8b46a':'#78c6e9'),toneMapped:false}),-.17,1.20,front+l*.335,g);cluster.rotation.x=-.10;screens.push(cluster.material);
   if(!mobile&&i%2===0){let center=A(new T.PlaneGeometry(.25,.16),new T.MeshBasicMaterial({map:uiTexture('dash','#8bd0ea'),toneMapped:false}),.10,1.16,front+l*.34,g);center.rotation.x=-.12;screens.push(center.material)}
   for(const sx of[-1,1]){A(new T.BoxGeometry(.035,.35,l*.30),M(0x202427,.56,.12),sx*(w/2-.08),1.02,.18,g);A(new T.BoxGeometry(.022,.06,l*.24),t,sx*(w/2-.055),1.18,.18,g)}
 }
 function addPlayer(car){
   if(!car||car.userData.vehicleCabin860)return;car.userData.vehicleCabin860=true;
   const g=new T.Group();g.name='PlayerCabin860';car.add(g),mat=P(0xe7e5df,.58,.03),black=M(0x121619,.32,.28),metal=M(0x9ea5aa,.24,.66);
   for(const z of[-.20,.72])for(const x of[-.40,.40])seat(g,x,z,mat,.98);
   A(new T.BoxGeometry(1.48,.16,.44),black,0,1.03,-.62,g);
   A(new T.BoxGeometry(1.15,.025,.055),metal,0,1.14,-.80,g);
   A(new T.BoxGeometry(.24,.22,1.05),black,0,.78,.24,g);
   A(new T.BoxGeometry(.20,.035,.64),metal,0,.94,.16,g);
   wheel(g,-.39,1.17,-.60);
   const scrMat=new T.MeshBasicMaterial({map:uiTexture('dash','#63c9f1'),toneMapped:false});
   let screen=A(new T.PlaneGeometry(.52,.31),scrMat,.02,1.24,-.76,g);screen.rotation.x=-.15;screens.push(scrMat);
   const clMat=new T.MeshBasicMaterial({map:uiTexture('cluster','#7ad8ff'),toneMapped:false});
   let cluster=A(new T.PlaneGeometry(.34,.14),clMat,-.39,1.22,-.735,g);cluster.rotation.x=-.12;screens.push(clMat);
   for(const sx of[-1,1]){A(new T.BoxGeometry(.035,.40,1.65),black,sx*.89,1.02,.10,g);A(new T.BoxGeometry(.020,.05,1.40),metal,sx*.875,1.18,.10,g)}
   if(!mobile){for(const x of[-.52,.52]){A(new T.BoxGeometry(.22,.025,.20),metal,x,.98,.16,g);for(let k=-2;k<=2;k++)A(new T.BoxGeometry(.016,.015,.14),black,x+k*.035,.996,.16,g)}}
   g.userData.screen=screen;g.userData.cluster=cluster;
 }
 W.cars.forEach((c,i)=>addTraffic(c,i));addPlayer(PC.car);
 let known=W.cars.length;setInterval(()=>{if(W.cars.length!==known){W.cars.forEach((c,i)=>addTraffic(c,i));known=W.cars.length}},1800);
 W.registerTick?.((dt)=>{let h=(window.LuxLife?.state?.hour??12)+(window.LuxLife?.state?.minute??0)/60,night=h>=19||h<7,on=!!PC.driving;for(const m of screens)m.opacity=1;let pg=PC.car.getObjectByName('PlayerCabin860');if(pg){let s=pg.userData.screen,c=pg.userData.cluster;if(s)s.material.opacity=on?1:.72;if(c)c.material.opacity=on?1:.75}});
 window.LuxVehicleCabin860={version:'8.6.0',player:PC.car,traffic:W.cars}
}
