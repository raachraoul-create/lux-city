import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{if(!window.LuxWorld?.scene||!window.LuxLife)return;clearInterval(q);init()},320);
function init(){
 const W=LuxWorld,S=W.scene,L=LuxLife,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 const old=S.getObjectByName('LuxUrban810');if(old)S.remove(old);
 const root=new T.Group();root.name='LuxUrban810';S.add(root);
 const M=(c,r=.72,m=.04,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const A=(g,m,x,y,z,p=root)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=!mobile;o.receiveShadow=true;p.add(o);return o};
 const metal=M(0x4c5559,.40,.48),dark=M(0x252b2f,.42,.36),glass=new T.MeshPhysicalMaterial({color:0x8aa9b5,roughness:.12,metalness:.08,transparent:true,opacity:.58,transmission:mobile?0:.06}),wood=M(0x73523d,.78),yellow=M(0xe6c43a,.58,.08),red=M(0xb33931,.56,.18),warm=[];

 function signTex(title,sub){
   let c=document.createElement('canvas');c.width=512;c.height=300;let x=c.getContext('2d');x.fillStyle='#1f4f76';x.fillRect(0,0,512,300);x.fillStyle='#f4d93f';x.fillRect(0,0,512,54);x.fillStyle='#fff';x.font='900 56px Arial';x.textAlign='center';x.fillText(title,256,135);x.font='700 30px Arial';x.fillStyle='#dce8f1';x.fillText(sub,256,195);x.font='700 24px Arial';x.fillText('05:00–24:00',256,242);let t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t
 }
 function shelter(x,z,rot,name){
   const g=new T.Group();g.position.set(x,0,z);g.rotation.y=rot;root.add(g);
   A(new T.BoxGeometry(5.6,.10,2.0),dark,0,2.65,0,g);
   for(const sx of[-2.55,2.55]){A(new T.BoxGeometry(.09,2.55,.09),metal,sx,1.28,0,g);A(new T.BoxGeometry(.08,2.30,1.70),glass,sx,1.32,0,g)}
   A(new T.BoxGeometry(5.1,.08,.08),metal,0,2.18,-.78,g);
   for(let x=-1.7;x<=1.7;x+=1.1)A(new T.BoxGeometry(.92,.12,.55),wood,x,.61,-.34,g);
   for(const x of[-1.75,1.75])A(new T.BoxGeometry(.07,.72,.07),metal,x,.36,-.34,g);
   A(new T.PlaneGeometry(1.75,1.02),new T.MeshBasicMaterial({map:signTex('LINIE 1',name),toneMapped:false,side:T.DoubleSide}),1.72,1.63,-.83,g);
   let lm=M(0xffdfa2,.28,.02,0xffb347,0);warm.push(lm);A(new T.BoxGeometry(.34,.16,.16),lm,-2.0,2.35,-.75,g);
 }
 shelter(-13.5,-106,0,'ZENTRUM SÜD');
 shelter(13.5,106,Math.PI,'ZENTRUM NORD');

 function rack(x,z,rot=0,count=4){
   let g=new T.Group();g.position.set(x,0,z);g.rotation.y=rot;root.add(g);
   for(let i=0;i<count;i++){let xx=(i-(count-1)/2)*.72;let r=A(new T.TorusGeometry(.34,.035,7,18,Math.PI),metal,xx,.34,0,g);r.rotation.x=Math.PI/2}
 }
 rack(-148,66,Math.PI/2,5);rack(-84,41,Math.PI/2,4);rack(-151,32,0,5);

 function bollard(x,z){A(new T.CylinderGeometry(.09,.11,.78,10),dark,x,.39,z);A(new T.CylinderGeometry(.10,.10,.05,10),yellow,x,.73,z)}
 for(const [x,z] of [[-145,34],[-141,34],[-137,34],[-112,-10],[-108,-10],[-104,-10],[-92,47],[-88,47],[-84,47]])bollard(x,z);

 function hydrant(x,z){
   A(new T.CylinderGeometry(.16,.19,.72,12),red,x,.36,z);A(new T.CylinderGeometry(.23,.23,.10,12),red,x,.76,z);
   A(new T.CylinderGeometry(.08,.08,.42,10),metal,x,.98,z);A(new T.SphereGeometry(.11,10,8),red,x,1.19,z);
   for(const sx of[-1,1]){let c=A(new T.CylinderGeometry(.08,.08,.25,10),metal,x+sx*.23,.48,z);c.rotation.z=Math.PI/2}
 }
 for(const p of[[194,112],[194,-76],[-196,-78],[-82,-88],[83,-88]])hydrant(...p);

 function bin(x,z){
   A(new T.CylinderGeometry(.25,.30,.72,12),dark,x,.36,z);A(new T.CylinderGeometry(.32,.32,.08,12),metal,x,.77,z);
 }
 for(const p of[[-16,-108],[16,108],[-96,-82],[96,-82],[-96,100],[-148,38]])bin(...p);

 if(!mobile){
   function planter(x,z){A(new T.BoxGeometry(1.65,.42,.62),M(0x77736b,.90),x,.21,z);for(let k=-3;k<=3;k++){let f=A(new T.SphereGeometry(.13,8,6),M(k%2?0xc75763:0xd9a649,.74),x+k*.20,.54,z);f.scale.y=.72}}
   for(const p of[[-10,-112],[10,112],[-146,42],[-110,-4]])planter(...p);
 }
 W.registerTick?.((dt)=>{let h=(+L.state.hour||0)+(+L.state.minute||0)/60,night=h>=19.3||h<6.3,dusk=(h>=18&&h<19.3)||(h>=6.3&&h<7.3);for(const m of warm)m.emissiveIntensity+=( (night?.85:dusk?.32:0)-m.emissiveIntensity)*Math.min(1,dt*2.4)});
 window.LuxUrban810={version:'8.1.0',root}
}
