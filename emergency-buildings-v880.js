import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{if(!window.LuxWorld?.scene||!window.LuxCityServices?.buildings||!window.LuxLife)return;clearInterval(q);init()},360);
function init(){
 const W=LuxWorld,S=W.scene,L=LuxLife,defs=LuxCityServices.buildings,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 const old=S.getObjectByName('LuxEmergencyBuildings880');if(old)S.remove(old);
 const root=new T.Group();root.name='LuxEmergencyBuildings880';S.add(root);
 const M=(c,r=.72,m=.04,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const A=(g,m,x,y,z,p)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=!mobile;o.receiveShadow=true;p.add(o);return o};
 const glass=new T.MeshPhysicalMaterial({color:0x86a7b3,roughness:.10,metalness:.08,transparent:true,opacity:.65,transmission:mobile?0:.06}),metal=M(0x4a5358,.36,.52),stone=M(0xbab8b2,.90),blue=M(0x2b5f92,.42,.18),red=M(0xb63136,.50,.14),white=M(0xe9e8e3,.78),yellow=M(0xe3c34b,.62),warm=[];
 function tx(text,bg='#183956',fg='#fff'){let c=document.createElement('canvas');c.width=800;c.height=180;let x=c.getContext('2d');x.fillStyle=bg;x.fillRect(0,0,800,180);x.fillStyle=fg;x.font='900 62px Arial';x.textAlign='center';x.textBaseline='middle';x.fillText(text,400,92);let t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t}
 function sign(g,text,bg,x,y,z,w=7){A(new T.PlaneGeometry(w,1.45),new T.MeshBasicMaterial({map:tx(text,bg),toneMapped:false,side:T.DoubleSide}),x,y,z,g)}
 function lamp(g,x,y,z,c=0xffd89c){let lm=M(c,.25,.02,c,0);warm.push(lm);A(new T.BoxGeometry(.30,.20,.22),lm,x,y,z,g)}

 const police=defs.find(d=>d.id==='police');
 if(police){
   const g=new T.Group();g.position.set(police.x,0,police.z);root.add(g);const f=police.l/2+.16;
   sign(g,'POLICE · LUX CITY','#214b73',0,police.h-1.20,f+.26,7.8);
   A(new T.BoxGeometry(12.4,.18,2.8),blue,0,3.55,f+1.22,g);
   for(const x of[-5.2,-1.75,1.75,5.2])A(new T.CylinderGeometry(.075,.095,3.5,10),metal,x,1.75,f+2.35,g);
   for(const x of[-4.4,4.4]){A(new T.BoxGeometry(2.5,2.5,.08),glass,x,1.65,f+.26,g);lamp(g,x,2.95,f+.35,0xbcdfff)}
   // secure forecourt visuals
   A(new T.BoxGeometry(15.5,.07,8.6),stone,0,.04,f+4.7,g);
   for(let x=-6.4;x<=6.4;x+=2.15){A(new T.CylinderGeometry(.08,.10,.75,10),metal,x,.38,f+8.4,g);A(new T.BoxGeometry(.16,.10,.16),blue,x,.72,f+8.4,g)}
   for(const z of[f+4.3,f+6.9])for(const x of[-5.0,5.0])A(new T.BoxGeometry(2.6,.025,.12),yellow,x,.10,z,g);
   // camera poles
   if(!mobile)for(const x of[-6.4,6.4]){A(new T.CylinderGeometry(.045,.055,3.1,8),metal,x,1.55,f+7.7,g);let cam=A(new T.BoxGeometry(.26,.15,.32),metal,x,3.05,f+7.5,g);cam.rotation.x=-.16}
 }

 const rescue=defs.find(d=>d.id==='rescue');
 if(rescue){
   const g=new T.Group();g.position.set(rescue.x,0,rescue.z);root.add(g);const f=rescue.l/2+.16;
   sign(g,'RETTUNG · 112','#b12830',0,rescue.h-1.12,f+.28,7.4);
   // ambulance bay canopy and lane guides
   A(new T.BoxGeometry(15.0,.20,3.0),white,0,4.2,f+1.35,g);
   for(const x of[-6.5,-2.2,2.2,6.5])A(new T.CylinderGeometry(.075,.095,4.1,10),metal,x,2.05,f+2.65,g);
   A(new T.BoxGeometry(17,.07,10.0),stone,0,.04,f+5.7,g);
   for(const x of[-4.4,0,4.4]){A(new T.BoxGeometry(.12,.025,7.8),red,x,.10,f+5.6,g);A(new T.BoxGeometry(3.3,.025,.10),red,x,.10,f+9.1,g)}
   for(const x of[-4.4,4.4])lamp(g,x,3.62,f+.40,0xffffff);
   // wall medical cross, fully original generic symbol
   const crossMat=M(0xc72e35,.58,.08,0xff2c35,0);warm.push(crossMat);
   A(new T.BoxGeometry(.56,1.65,.10),crossMat,7.1,4.8,f+.25,g);A(new T.BoxGeometry(1.65,.56,.10),crossMat,7.1,4.8,f+.26,g);
 }

 const hospital=defs.find(d=>d.id==='hospital');
 if(hospital){
   const g=new T.Group();g.position.set(hospital.x,0,hospital.z);root.add(g);const f=hospital.l/2+.16;
   sign(g,'KLINIK · NOTAUFNAHME','#8a2a30',0,hospital.h-1.18,f+.30,10.6);
   // emergency entrance canopy
   A(new T.BoxGeometry(17.0,.24,4.5),white,0,4.6,f+1.9,g);
   for(const x of[-7.7,-2.6,2.6,7.7])A(new T.CylinderGeometry(.09,.11,4.4,10),metal,x,2.2,f+3.9,g);
   A(new T.BoxGeometry(19.5,.08,12.5),stone,0,.045,f+7.2,g);
   // emergency lanes + pedestrian strip
   for(const x of[-5.2,0,5.2])A(new T.BoxGeometry(.12,.025,10.2),red,x,.11,f+7.0,g);
   for(let x=-7.5;x<=7.5;x+=1.1)A(new T.BoxGeometry(.58,.025,3.8),white,x,.115,f+11.4,g);
   for(const x of[-6.8,6.8]){lamp(g,x,3.8,f+.48,0xffffff);A(new T.BoxGeometry(2.5,2.2,.09),glass,x,1.75,f+.28,g)}
   // rooftop medical sign beacon
   const crossMat=M(0xb72e35,.52,.08,0xff3038,0);warm.push(crossMat);
   A(new T.BoxGeometry(.62,2.0,.12),crossMat,0,hospital.h+1.55,.0,g);A(new T.BoxGeometry(2.0,.62,.12),crossMat,0,hospital.h+1.55,.01,g);
   if(!mobile){A(new T.CylinderGeometry(.07,.10,4.3,10),metal,-9.2,2.15,f+8.9,g);A(new T.BoxGeometry(.52,.20,.32),M(0x23292c,.36,.44),-9.2,4.22,f+8.9,g)}
 }

 W.registerTick?.((dt)=>{let h=(+L.state.hour||0)+(+L.state.minute||0)/60,night=h>=19||h<6.5,dusk=(h>=18&&h<19)||(h>=6.5&&h<7.4);for(const x of warm){if('emissiveIntensity'in x)x.emissiveIntensity+=( (night?1.15:dusk?.42:.04)-x.emissiveIntensity)*Math.min(1,dt*2.4)}});
 window.LuxEmergencyBuildings880={version:'8.8.0',root}
}
