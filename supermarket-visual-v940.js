import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{let S=window.LuxSupermarket801||window.LuxSupermarket800,W=window.LuxWorld;if(!S?.position||!W?.scene||!window.LuxLife)return;clearInterval(q);init(S,W)},360);
function init(SM,W){
 const S=W.scene,L=LuxLife,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 const store=S.getObjectByName('LuxSupermarket800');if(!store)return;
 const old=store.getObjectByName('LuxMarketVisual940');if(old)store.remove(old);
 const root=new T.Group();root.name='LuxMarketVisual940';store.add(root);
 const M=(c,r=.68,m=.04,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const A=(g,m,x,y,z,p=root)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=!mobile;o.receiveShadow=true;p.add(o);return o};
 const dark=M(0x2b3337,.40,.42),metal=M(0x767d80,.30,.60),green=M(0x356b4c,.58,.12),green2=M(0x54895f,.62),white=M(0xe8e6df,.72),yellow=M(0xe0ba45,.64),glass=new T.MeshPhysicalMaterial({color:0x92b6c1,roughness:.10,metalness:.06,transparent:true,opacity:.55,transmission:mobile?0:.08,clearcoat:.32}),warm=[];
 const front=9.16;
 function signTex(text,sub=''){let c=document.createElement('canvas');c.width=700;c.height=220;let x=c.getContext('2d');x.fillStyle='#315f47';x.fillRect(0,0,700,220);x.fillStyle='#fff';x.font='900 66px Arial';x.textAlign='center';x.fillText(text,350,92);if(sub){x.font='700 28px Arial';x.fillStyle='#dbe9df';x.fillText(sub,350,145)}let t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t}
 // entrance portal
 A(new T.BoxGeometry(5.2,.38,1.35),green,0,4.00,front+.58);
 for(const sx of[-1,1])A(new T.BoxGeometry(.30,4.0,1.18),green,sx*2.40,2.00,front+.52);
 A(new T.PlaneGeometry(4.45,1.05),new T.MeshBasicMaterial({map:signTex('LUX MARKT','FRISCH · NAH · TÄGLICH'),toneMapped:false}),0,4.02,front+1.28);
 for(const sx of[-1,1]){let lm=M(0xffe2ae,.28,.02,0xffb75a,0);warm.push(lm);A(new T.BoxGeometry(.34,.22,.24),lm,sx*1.75,3.42,front+1.18)}
 // cart shelter
 const cg=new T.Group();cg.position.set(-8.6,0,front+3.25);root.add(cg);
 A(new T.BoxGeometry(5.2,.16,2.6),dark,0,2.65,0,cg);
 for(const sx of[-2.35,2.35]){A(new T.BoxGeometry(.08,2.55,.08),metal,sx,1.27,0,cg);A(new T.BoxGeometry(.06,2.20,2.2),glass,sx,1.30,0,cg)}
 for(let i=0;i<(mobile?4:7);i++){let cart=new T.Group();cart.position.set(-1.65+i*.52,.15,0);cg.add(cart);A(new T.BoxGeometry(.54,.36,.72),M(0xaeb4b7,.32,.58),0,.34,0,cart);A(new T.BoxGeometry(.62,.055,.055),metal,0,.62,-.28,cart);for(const x of[-.21,.21])for(const z of[-.25,.25]){let wh=A(new T.CylinderGeometry(.055,.055,.04,9),dark,x,.07,z,cart);wh.rotation.z=Math.PI/2}}
 // bike rack
 for(let i=0;i<5;i++){let x=5.2+i*.70,r=A(new T.TorusGeometry(.34,.035,7,18,Math.PI),metal,x,.34,front+3.0);r.rotation.x=Math.PI/2}
 // forecourt bollards
 for(let x=-3.6;x<=3.6;x+=1.2){A(new T.CylinderGeometry(.075,.095,.78,10),dark,x,.39,front+2.15);A(new T.CylinderGeometry(.09,.09,.07,10),yellow,x,.72,front+2.15)}
 // delivery / loading dock
 A(new T.BoxGeometry(8.2,.16,4.4),M(0x5f6465,.88),-8.2,.08,-11.2);
 A(new T.BoxGeometry(6.8,.48,.72),dark,-8.2,.30,-9.2);
 for(const x of[-10.6,-8.2,-5.8]){A(new T.BoxGeometry(1.75,.84,1.12),M(0x9d7952,.90),x,.50,-11.2);for(const xx of[-.48,0,.48])A(new T.BoxGeometry(.055,.78,.04),dark,x+xx,.50,-11.78)}
 if(!mobile){
   // pallet jack
   A(new T.BoxGeometry(1.35,.10,.15),yellow,-4.6,.12,-10.5);A(new T.BoxGeometry(1.35,.10,.15),yellow,-4.6,.12,-11.0);A(new T.BoxGeometry(.08,1.35,.08),dark,-3.95,.72,-10.75);
   // roof HVAC
   for(const x of[-6.0,0,6.0]){A(new T.BoxGeometry(2.7,.85,1.8),M(0x8a9092,.42,.42),x,8.35,-1.0);let fan=A(new T.CylinderGeometry(.52,.52,.06,24),dark,x,8.82,-1.0);fan.rotation.x=Math.PI/2}
 }
 // side logo panels and loading-light strips
 for(const x of[-10.4,10.4])A(new T.BoxGeometry(2.6,.18,.80),green2,x,5.10,front+.45);
 for(const x of[-10.0,-7.0,-4.0]){let lm=M(0xffe7bf,.26,.02,0xffc36b,0);warm.push(lm);A(new T.BoxGeometry(1.25,.10,.28),lm,x,3.55,-9.25)}
 // produce crates near entrance
 if(!mobile)for(const [x,c] of[[5.8,0xb84e42],[6.8,0xd5a33e],[7.8,0x66964f]]){A(new T.BoxGeometry(.88,.48,.72),M(0x8e6a46,.82),x,.28,front+1.65);for(let k=0;k<7;k++){let f=A(new T.SphereGeometry(.075,8,6),M(c,.68),x+(k%3-.9)*.18,.57+Math.floor(k/3)*.12,front+1.65+(k%2-.5)*.16);f.scale.y=.86}}
 W.registerTick?.((dt)=>{let h=(+L.state.hour||0)+(+L.state.minute||0)/60,night=h>=19.2||h<6.3,dusk=(h>=18&&h<19.2)||(h>=6.3&&h<7.2);for(const m of warm)m.emissiveIntensity+=( (night?1.0:dusk?.38:.05)-m.emissiveIntensity)*Math.min(1,dt*2.4)});
 window.LuxMarketVisual940={version:'9.4.0',root}
}
