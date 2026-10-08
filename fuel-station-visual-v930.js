import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{let F=window.LuxFuelStation710;if(!window.LuxWorld?.scene||!F?.group||!window.LuxLife)return;clearInterval(q);init(F)},360);
function init(F){
 const W=LuxWorld,L=LuxLife,g=F.group,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 const old=g.getObjectByName('LuxFuelVisual930');if(old)g.remove(old);
 const root=new T.Group();root.name='LuxFuelVisual930';g.add(root);
 const M=(c,r=.68,m=.05,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const A=(geo,mat,x,y,z,p=root)=>{let o=new T.Mesh(geo,mat);o.position.set(x,y,z);o.castShadow=!mobile;o.receiveShadow=true;p.add(o);return o};
 const dark=M(0x293035,.38,.42),metal=M(0x767d81,.30,.62),white=M(0xe9e8e2,.62,.08),green=M(0x43815a,.58,.12),blue=M(0x356f9e,.48,.18),yellow=M(0xe1b944,.62),glass=new T.MeshPhysicalMaterial({color:0x8fb7c4,roughness:.10,metalness:.06,transparent:true,opacity:.62,transmission:mobile?0:.07,clearcoat:.32}),warm=[],screens=[];
 function tex(text,bg='#1c303b',fg='#fff',sub=''){let c=document.createElement('canvas');c.width=700;c.height=300;let x=c.getContext('2d');x.fillStyle=bg;x.fillRect(0,0,c.width,c.height);x.fillStyle=fg;x.font='900 66px Arial';x.textAlign='center';x.fillText(text,350,112);if(sub){x.font='700 34px Arial';x.fillStyle='#d6e2e7';x.fillText(sub,350,180)}let t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t}
 function glow(x,y,z,w=.46,h=.22,c=0x74c8ef){let m=M(0x10191e,.18,.34,c,.25);screens.push(m);A(new T.BoxGeometry(w,h,.025),m,x,y,z)}
 // canopy fascia and ceiling strips
 A(new T.BoxGeometry(15.3,.62,7.8),white,-2,3.68,-2);
 A(new T.BoxGeometry(15.3,.18,7.8),dark,-2,3.96,-2);
 for(const z of[-4.5,-2,0.5])for(const x of[-6.3,-2,2.3]){let lm=M(0xffe6bc,.26,.03,0xffca75,0);warm.push(lm);A(new T.BoxGeometry(1.7,.08,.34),lm,x,3.49,z)}
 // pump islands + hoses
 const pumps=[[-6,-2,0x3f704b,'BENZIN'],[-1,-2,0x4b5661,'DIESEL'],[4,-2,0x3b78a5,'11 kW'],[8,-2,0x245f9b,'150 kW']];
 for(let i=0;i<pumps.length;i++){
   const [x,z,c,label]=pumps[i];
   A(new T.BoxGeometry(2.05,.15,1.35),M(0x8a8d89,.82),x,.08,z);
   A(new T.BoxGeometry(.78,1.85,.66),M(c,.38,.30),x,.95,z);
   glow(x,1.30,z+.35,.48,.27,i<2?0x6fb7dc:0x66d6a1);
   A(new T.BoxGeometry(.62,.12,.05),white,x,1.62,z+.36);
   // hose and nozzle
   let hose=A(new T.TorusGeometry(.33,.025,7,18,Math.PI*1.65),dark,x+.42,.92,z-.02);hose.rotation.z=.36;
   let noz=A(new T.BoxGeometry(.12,.34,.09),metal,x+.58,.68,z-.22);noz.rotation.z=-.28;
   // bollards
   for(const sx of[-1,1]){A(new T.CylinderGeometry(.065,.08,.82,9),yellow,x+sx*.82,.41,z+.48);A(new T.CylinderGeometry(.08,.08,.05,9),dark,x+sx*.82,.77,z+.48)}
 }
 // high price pylon
 A(new T.BoxGeometry(2.75,6.2,.48),dark,-11.5,3.1,-3.8);
 A(new T.PlaneGeometry(2.45,1.05),new T.MeshBasicMaterial({map:tex('LUX ENERGY','#173542','#fff','TANKEN · LADEN'),toneMapped:false}),-11.5,5.10,-4.06);
 const prices=[['BENZIN','1,65 €'],['DIESEL','1,55 €'],['AC','0,35 €'],['FAST','0,49 €']];
 for(let i=0;i<prices.length;i++){
   let c=document.createElement('canvas');c.width=420;c.height=110;let x=c.getContext('2d');x.fillStyle='#0d151a';x.fillRect(0,0,420,110);x.fillStyle=i<2?'#f4f6f7':'#7ee29c';x.font='800 31px Arial';x.fillText(prices[i][0],18,44);x.textAlign='right';x.font='900 35px monospace';x.fillText(prices[i][1],400,72);let t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;
   A(new T.PlaneGeometry(2.35,.63),new T.MeshBasicMaterial({map:t,toneMapped:false}),-11.5,4.15-i*.72,-4.07);
 }
 // shop glass facade and entrance canopy
 A(new T.BoxGeometry(8.5,.25,1.25),dark,7,3.35,8.0);
 for(const x of[4.2,5.9,8.1,9.8])A(new T.BoxGeometry(1.35,2.45,.06),glass,x,1.45,8.04);
 A(new T.BoxGeometry(1.6,2.55,.10),dark,7.0,1.50,8.07);A(new T.BoxGeometry(1.34,2.30,.04),glass,7.0,1.50,8.13);
 A(new T.PlaneGeometry(5.8,1.0),new T.MeshBasicMaterial({map:tex('LUX SHOP','#2f5a42','#fff','SNACKS · KAFFEE · AUTO'),toneMapped:false}),7.0,3.05,8.15);
 // product silhouettes in shop windows
 if(!mobile)for(let x=4.6;x<=9.4;x+=.8){A(new T.BoxGeometry(.38,.52,.28),M([0xb55a46,0xd5a63f,0x4d7a55,0x61798f][Math.abs(Math.round(x*10))%4],.72),x,.62,7.82);A(new T.BoxGeometry(.42,.05,.30),metal,x,.90,7.82)}
 // charger bays and cable gantries
 for(const x of[4,8]){
   A(new T.BoxGeometry(2.8,.025,4.8),green,x,.10,1.7);
   A(new T.BoxGeometry(.42,1.55,.40),white,x,.78,2.85);glow(x,1.05,2.62,.27,.30,0x68db99);
   A(new T.BoxGeometry(.11,.68,.05),green,x,1.55,2.62);
   let cable=A(new T.TorusGeometry(.28,.023,7,18,Math.PI*1.55),dark,x-.16,.60,2.62);cable.rotation.z=.4;
 }
 // air/water service + bins
 A(new T.BoxGeometry(1.25,1.75,.80),M(0x677177,.42,.40),-10.2,.88,5.4);glow(-10.2,1.15,4.98,.52,.30,0x7fc7e8);
 for(const x of[-8.9,-7.9]){A(new T.CylinderGeometry(.25,.29,.72,12),dark,x,.36,5.5);A(new T.CylinderGeometry(.31,.31,.08,12),metal,x,.77,5.5)}
 // car wash portal, visual-only
 if(!mobile){
   A(new T.BoxGeometry(5.6,.20,5.2),dark,13.6,3.25,-5.0);
   for(const sx of[-1,1])A(new T.BoxGeometry(.22,3.25,5.0),white,13.6+sx*2.55,1.62,-5.0);
   A(new T.PlaneGeometry(4.4,.86),new T.MeshBasicMaterial({map:tex('WASCHBOX','#325c74','#fff'),toneMapped:false}),13.6,2.65,-7.62);
   for(const x of[11.8,15.4])for(let z=-6.3;z<=-3.7;z+=.52){let br=A(new T.CylinderGeometry(.10,.10,.42,8),M(z%1?0x3e75a2:0x2f5c80,.64),x,1.85,z);br.rotation.z=Math.PI/2}
 }
 W.registerTick?.((dt)=>{let h=(+L.state.hour||0)+(+L.state.minute||0)/60,night=h>=19.2||h<6.2,dusk=(h>=18&&h<19.2)||(h>=6.2&&h<7.2);for(const m of warm)m.emissiveIntensity+=( (night?1.0:dusk?.42:.08)-m.emissiveIntensity)*Math.min(1,dt*2.4);for(const m of screens)m.emissiveIntensity+=( (night?.48:.24)-m.emissiveIntensity)*Math.min(1,dt*3)});
 window.LuxFuelVisual930={version:'9.3.0',root}
}
