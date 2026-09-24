import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let wait=setInterval(()=>{if(!window.LuxWorld?.scene||!window.LuxCityServices?.buildings)return;clearInterval(wait);init()},180);
function init(){
 const W=window.LuxWorld,S=W.scene;
 const FIRE=window.LuxCityServices.buildings.find(x=>x.id==='fire')||{x:210,z:92,w:25,l:34,h:10};
 const G=new T.Group();G.name='LuxFireStation900';G.userData.fireStation900=true;
 const mat=(c,r=.72,m=.04,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const red=mat(0xb51f2e,.48,.12),deepRed=mat(0x751721,.52,.16),white=mat(0xeee9df,.80,.02),charcoal=mat(0x30373c,.38,.42),dark=mat(0x1d2429,.34,.50),glass=mat(0x507b8e,.10,.26),concrete=mat(0x8b8f90,.96,.02),asphalt=mat(0x343a3f,.98,.01),yellow=mat(0xf1d55a,.60,.08),lamp=mat(0xf7f2d8,.25,.08,0xffefb0,2.2);
 function add(geo,ma,x,y,z,parent=G){let o=new T.Mesh(geo,ma);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=true;parent.add(o);return o}
 function labelTexture(lines,bg='#f3f1ea',fg='#171b1f',accent='#b51f2e'){
   let c=document.createElement('canvas');c.width=1024;c.height=260;let x=c.getContext('2d');
   x.fillStyle=bg;x.fillRect(0,0,c.width,c.height);x.fillStyle=accent;x.fillRect(0,0,26,c.height);
   x.fillStyle=fg;x.textAlign='left';x.textBaseline='middle';x.font='900 92px Arial';x.fillText(lines[0],70,82);
   x.font='700 48px Arial';x.fillText(lines[1],72,164);x.fillStyle=accent;x.font='900 52px Arial';x.fillText(lines[2]||'',760,164);
   let tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;tx.anisotropy=4;return tx
 }
 function groundText(text){
   let c=document.createElement('canvas');c.width=1024;c.height=220;let x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);
   x.fillStyle='#f5f2e8';x.textAlign='center';x.textBaseline='middle';x.font='900 72px Arial';x.fillText(text,512,110);
   let tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;return tx
 }
 const front=FIRE.z+FIRE.l/2+.18;
 // Stronger front architecture layered onto the existing station shell.
 add(new T.BoxGeometry(24.2,8.3,.34),charcoal,FIRE.x,4.15,front,S);
 add(new T.BoxGeometry(24.6,.55,.62),deepRed,FIRE.x,8.08,front+.02,S);
 add(new T.BoxGeometry(24.6,.32,.72),white,FIRE.x,.16,front+.02,S);
 // Three full-size appliance bay portals.
 const bays=[-7.35,0,7.35];
 for(let i=0;i<bays.length;i++){
   let x=FIRE.x+bays[i];
   add(new T.BoxGeometry(6.25,5.75,.22),deepRed,x,2.9,front+.24,S);
   add(new T.BoxGeometry(5.65,5.18,.16),dark,x,2.66,front+.39,S);
   for(let y=.58;y<5.05;y+=.58)add(new T.BoxGeometry(5.42,.055,.05),charcoal,x,y,front+.50,S);
   for(let sx of[-2.55,2.55])add(new T.BoxGeometry(.08,5.05,.08),white,x+sx,2.65,front+.51,S);
   // Upper vision strip in each door.
   for(let k=-2;k<=2;k++)add(new T.BoxGeometry(.83,.58,.045),glass,x+k*1.02,4.18,front+.53,S);
   let num=add(new T.PlaneGeometry(.52,.52),new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.96,side:T.DoubleSide}),x,5.62,front+.56,S);
   let nc=document.createElement('canvas');nc.width=128;nc.height=128;let nx=nc.getContext('2d');nx.fillStyle='#ffffff';nx.fillRect(0,0,128,128);nx.fillStyle='#741620';nx.font='900 76px Arial';nx.textAlign='center';nx.textBaseline='middle';nx.fillText(String(i+1),64,68);num.material.map=new T.CanvasTexture(nc);num.material.needsUpdate=true
 }
 // Station identity panel inspired by current Luxembourg emergency-service visual language.
 let signMat=new T.MeshBasicMaterial({map:labelTexture(['CGDIS','CIS LUX CITY','112']),side:T.DoubleSide});
 let sign=add(new T.PlaneGeometry(12.2,3.1),signMat,FIRE.x,7.08,front+.57,S);
 // Personnel entry + side windows.
 add(new T.BoxGeometry(2.05,3.05,.20),red,FIRE.x+10.2,1.55,front+.36,S);
 add(new T.BoxGeometry(1.55,2.45,.06),glass,FIRE.x+10.2,1.58,front+.50,S);
 add(new T.BoxGeometry(.10,.56,.08),white,FIRE.x+10.78,1.45,front+.56,S);
 add(new T.BoxGeometry(4.2,.18,1.15),deepRed,FIRE.x+9.1,3.38,front+.78,S);
 // Roofline details, antenna and warning beacon.
 for(let x of[FIRE.x-10.4,FIRE.x+10.4])add(new T.CylinderGeometry(.06,.08,3.1,8),charcoal,x,9.75,FIRE.z,S);
 add(new T.CylinderGeometry(.11,.13,4.6,10),charcoal,FIRE.x+8.8,10.8,FIRE.z-5.2,S);
 add(new T.SphereGeometry(.18,10,8),mat(0x2d8cff,.18,.10,0x2d8cff,2.8),FIRE.x+8.8,13.16,FIRE.z-5.2,S);

 // Full forecourt, exactly around the existing fire vehicle's base position at ~210 / 114.
 let apron=add(new T.BoxGeometry(25.5,.10,12.2),concrete,FIRE.x,.055,114.8,S);apron.userData.fireApron900=true;
 for(let x of[FIRE.x-11.7,FIRE.x+11.7])add(new T.BoxGeometry(.16,.07,11.6),white,x,.115,114.8,S);
 for(let x of[FIRE.x-8.2,FIRE.x-2.7,FIRE.x+2.7,FIRE.x+8.2])add(new T.BoxGeometry(.11,.025,9.5),yellow,x,.125,114.8,S);

 // Real visible road connection follows the already existing emergency route: station -> gate (180,135).
 function strip(ax,az,bx,bz,width,ma,y=.06){
   let dx=bx-ax,dz=bz-az,len=Math.hypot(dx,dz),o=add(new T.BoxGeometry(width,.10,len),ma,(ax+bx)/2,y,(az+bz)/2,S);o.rotation.y=Math.atan2(dx,dz);o.receiveShadow=true;return o
 }
 const A={x:210,z:120},B={x:180,z:135},drive=strip(A.x,A.z,B.x,B.z,10.4,asphalt,.055);drive.userData.fireAccessRoad900=true;
 const dx=B.x-A.x,dz=B.z-A.z,len=Math.hypot(dx,dz),px=-dz/len,pz=dx/len;
 for(let side of[-1,1])strip(A.x+px*5.05*side,A.z+pz*5.05*side,B.x+px*5.05*side,B.z+pz*5.05*side,.18,white,.115);
 // Connection flare at the actual public road end.
 add(new T.BoxGeometry(13,.09,9.2),asphalt,181.8,.055,134.2,S).rotation.y=-.44;
 add(new T.BoxGeometry(8.5,.035,.18),white,182.5,.12,132.6,S).rotation.y=-.44;

 // Keep-clear marking on the appliance apron.
 let gt=new T.MeshBasicMaterial({map:groundText('112 · AUSFAHRT FREIHALTEN'),transparent:true,side:T.DoubleSide});
 let gm=add(new T.PlaneGeometry(15.6,3.0),gt,FIRE.x,.135,118.4,S);gm.rotation.x=-Math.PI/2;

 // Lighting at the forecourt/access road.
 for(let [x,z] of[[198.4,119.4],[221.6,119.4],[188.2,132.0]]){
   add(new T.CylinderGeometry(.075,.10,4.2,8),charcoal,x,2.1,z,S);
   add(new T.BoxGeometry(.52,.18,.28),lamp,x,4.18,z,S);
 }
 // Low protective bollards by the personnel entrance.
 for(let x of[FIRE.x+7.8,FIRE.x+12.0])add(new T.CylinderGeometry(.10,.13,.82,10),yellow,x,.41,front+2.0,S);

 // Luxembourg flag accent without copying an official logo.
 for(let [i,c] of[[0,0xed2939],[1,0xffffff],[2,0x00a1de]])add(new T.BoxGeometry(1.9,.20,.14),mat(c,.52,.05),FIRE.x-10.4,7.55-i*.22,front+.60,S);

 // QA-only camera placement via query string; inert during normal play.
 if(new URLSearchParams(location.search).get('fireqa')==='1'){
   let done=false;let t=setInterval(()=>{if(done||!document.body.classList.contains('game-ready')||!W.player)return;done=true;clearInterval(t);W.player.position.set(210,0,128);W.yaw=Math.PI},250)
 }
 window.LuxFireStation900={group:G,station:{x:FIRE.x,z:FIRE.z,front},apron,accessRoad:drive,route:{station:{x:210,z:120},gate:{x:180,z:135}}}
}