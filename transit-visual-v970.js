import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{let A=window.LuxCityActivity570||window.LuxCityActivity560;if(!window.LuxWorld?.scene||!A?.bus||!window.LuxLife)return;clearInterval(q);init(A.bus)},320);
function init(bus){
 const W=LuxWorld,L=LuxLife,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 const old=bus.getObjectByName('LuxTransitVisual970');if(old)bus.remove(old);
 const root=new T.Group();root.name='LuxTransitVisual970';bus.add(root);
 const M=(c,r=.60,m=.08,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const A=(g,m,x,y,z,p=root)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=true;p.add(o);return o};
 const body=M(0xe4d34a,.46,.14),dark=M(0x20272b,.34,.36),metal=M(0x7f878b,.28,.62),rubber=M(0x171a1c,.78,.02),seat=M(0x38566d,.76),floor=M(0x4b5356,.82),glass=new T.MeshPhysicalMaterial({color:0x5d8396,roughness:.10,metalness:.08,transparent:true,opacity:.48,transmission:mobile?0:.05,clearcoat:.28}),warm=[],screens=[];
 function signTex(main,sub=''){let c=document.createElement('canvas');c.width=640;c.height=180;let x=c.getContext('2d');x.fillStyle='#111718';x.fillRect(0,0,640,180);x.fillStyle='#f6dd42';x.font='900 68px Arial';x.textAlign='center';x.fillText(main,320,82);if(sub){x.font='700 28px Arial';x.fillText(sub,320,132)}let t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t}
 function screen(x,y,z,w,h,main,sub=''){let m=new T.MeshBasicMaterial({map:signTex(main,sub),toneMapped:false});screens.push(m);A(new T.PlaneGeometry(w,h),m,x,y,z)}
 // front/rear fascia and glazing
 A(new T.BoxGeometry(2.42,.18,1.18),body,0,.48,-3.74);
 A(new T.BoxGeometry(2.22,1.16,.06),glass,0,2.03,-3.77);
 A(new T.BoxGeometry(2.08,.82,.05),glass,0,1.82,3.76);
 A(new T.BoxGeometry(2.28,.18,.52),dark,0,.44,3.72);
 screen(0,2.47,-3.805,1.90,.48,'1','ZENTRUM');
 screen(0,2.36,3.805,1.55,.34,'LINIE 1');
 // side windows and pillars
 for(const sx of[-1,1]){
   for(const z of[-2.65,-1.35,.0,1.35,2.65])A(new T.BoxGeometry(.035,.86,1.12),glass,sx*1.295,2.02,z);
   for(const z of[-3.2,-2.05,-.68,.68,2.05,3.2])A(new T.BoxGeometry(.045,1.02,.10),dark,sx*1.305,2.02,z);
   A(new T.BoxGeometry(.055,.10,6.75),metal,sx*1.31,1.47,0);
   A(new T.BoxGeometry(.055,.08,6.75),metal,sx*1.31,2.52,0);
 }
 // interior floor, seats and handrails
 A(new T.BoxGeometry(2.10,.09,6.55),floor,0,.63,.05);
 const seatZ=[-2.15,-1.10,.05,1.20,2.35];
 for(const z of seatZ){
   for(const x of[-.72,.72]){
     A(new T.BoxGeometry(.52,.15,.48),seat,x,.88,z);
     let b=A(new T.BoxGeometry(.52,.62,.12),seat,x,1.19,z+.18);b.rotation.x=-.08;
     A(new T.BoxGeometry(.34,.10,.12),dark,x,1.53,z+.22);
   }
 }
 // aisle poles and overhead rails
 for(const z of[-2.1,-.7,.7,2.1])A(new T.CylinderGeometry(.025,.025,1.75,8),metal,0,1.63,z);
 A(new T.BoxGeometry(.045,.045,5.75),metal,0,2.48,0);
 if(!mobile){
   for(const z of[-2.2,-1.1,0,1.1,2.2]){
     let h=A(new T.TorusGeometry(.11,.018,6,14),M(0xd6a836,.44,.20),0,2.20,z);h.rotation.x=Math.PI/2;
     A(new T.BoxGeometry(.018,.30,.018),metal,0,2.36,z);
   }
 }
 // mirrors
 for(const sx of[-1,1]){
   let arm=A(new T.BoxGeometry(.42,.045,.045),metal,sx*1.48,2.12,-3.20);arm.rotation.z=sx*.18;
   A(new T.BoxGeometry(.22,.38,.08),dark,sx*1.68,2.10,-3.18);
 }
 // roof HVAC and route antenna
 A(new T.BoxGeometry(2.0,.38,1.55),M(0x8b9295,.36,.46),0,2.95,.55);
 if(!mobile){let fan=A(new T.CylinderGeometry(.48,.48,.05,24),dark,0,3.17,.55);fan.rotation.x=Math.PI/2}
 A(new T.CylinderGeometry(.018,.025,.62,8),metal,.62,3.24,-1.65);
 // wheel arch lips
 for(const sx of[-1,1])for(const z of[-2.38,2.38]){
   let arch=A(new T.TorusGeometry(.46,.045,7,22,Math.PI),dark,sx*1.29,.50,z);arch.rotation.y=Math.PI/2;arch.rotation.z=Math.PI/2;
 }
 // headlights / tail lights / indicators
 const head=M(0xeef7ff,.20,.08,0xeef7ff,0),tail=M(0x8d1d22,.28,.08,0xff2730,0),indicator=M(0x8c5a17,.30,.06,0xffa31c,0);warm.push(head,tail,indicator);
 for(const x of[-.82,.82]){A(new T.BoxGeometry(.34,.18,.045),head,x,.83,-3.79);A(new T.BoxGeometry(.28,.20,.045),tail,x,.86,3.79);A(new T.BoxGeometry(.12,.16,.047),indicator,x*1.18,.84,-3.795)}
 // door step and green open indicator follows existing stop-door state.
 A(new T.BoxGeometry(.18,.12,2.55),dark,1.31,.58,.0);
 const doorLight=M(0x173a24,.22,.04,0x47e27f,0);warm.push(doorLight);A(new T.BoxGeometry(.05,.18,.42),doorLight,1.325,2.48,.0);
 // bus number / fleet plate
 screen(0,.80,3.81,.70,.20,'LC 001');
 W.registerTick?.((dt)=>{
   const h=(+L.state.hour||0)+(+L.state.minute||0)/60,night=h>=19||h<6.4,dusk=(h>=18&&h<19)||(h>=6.4&&h<7.2),open=!!bus.userData.busStopOpen;
   head.emissiveIntensity+=( (night?1.8:dusk?.55:.10)-head.emissiveIntensity)*Math.min(1,dt*3);
   tail.emissiveIntensity+=( (night?1.15:dusk?.40:.06)-tail.emissiveIntensity)*Math.min(1,dt*3);
   indicator.emissiveIntensity+=( ((open?1.25:.08))-indicator.emissiveIntensity)*Math.min(1,dt*5);
   doorLight.emissiveIntensity+=( ((open?1.7:.08))-doorLight.emissiveIntensity)*Math.min(1,dt*5);
 });
 window.LuxTransitVisual970={version:'9.7.0',root,bus}
}
