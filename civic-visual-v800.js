import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{if(!window.LuxWorld?.scene||!window.LuxTownHall423?.group||!window.LuxSystems330?.doors||!window.LuxLife)return;clearInterval(q);init()},350);
function init(){
 const W=LuxWorld,S=W.scene,H=LuxTownHall423.group,D=LuxSystems330.doors,L=LuxLife,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 const old=S.getObjectByName('LuxCivicVisual800');if(old)S.remove(old);
 const root=new T.Group();root.name='LuxCivicVisual800';S.add(root);
 const M=(c,r=.72,m=.04,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const A=(g,m,x,y,z,p=root)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=!mobile;o.receiveShadow=true;p.add(o);return o};
 const stone=M(0xb9b3a7,.88),dark=M(0x3f474c,.42,.38),brass=M(0xb69449,.30,.54),warm=[],green=M(0x4e7043,.95);

 function textMat(text,bg='#263746',fg='#fff'){
   let c=document.createElement('canvas');c.width=640;c.height=150;let x=c.getContext('2d');x.fillStyle=bg;x.fillRect(0,0,c.width,c.height);x.fillStyle=fg;x.font='900 52px Arial';x.textAlign='center';x.textBaseline='middle';x.fillText(text,c.width/2,c.height/2);let t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return new T.MeshBasicMaterial({map:t,toneMapped:false})
 }
 function signAt(id,label,bg){
   let d=D[id];if(!d)return;
   let g=new T.Group();g.position.set(d.x,0,d.z);root.add(g);
   A(new T.BoxGeometry(4.7,.16,1.0),dark,0,2.75,.40,g);
   A(new T.PlaneGeometry(4.2,.90),textMat(label,bg),0,2.82,.92,g);
   for(const sx of[-1,1])A(new T.CylinderGeometry(.045,.055,2.65,8),dark,sx*2.0,1.32,.55,g);
   let wm=M(0xffdda0,.30,.02,0xffb44d,0);warm.push(wm);A(new T.BoxGeometry(.28,.40,.22),wm,-1.65,2.18,.94,g);
   A(new T.BoxGeometry(4.3,.07,1.35),stone,0,.04,1.20,g);
 }

 // Rathaus: front portico, clock, pillars, lamps, plaza planters.
 const g=new T.Group();g.position.set(-150,0,20);root.add(g);
 for(const x of[-5.5,-1.85,1.85,5.5]){
   A(new T.CylinderGeometry(.18,.24,4.8,14),stone,x,2.40,7.90,g);
   A(new T.BoxGeometry(.62,.20,.62),stone,x,4.84,7.90,g);
   A(new T.BoxGeometry(.70,.18,.70),stone,x,.10,7.90,g);
 }
 A(new T.BoxGeometry(13.5,.30,2.00),stone,0,5.05,7.90,g);
 A(new T.BoxGeometry(13.9,.18,1.80),dark,0,5.34,7.90,g);
 let clockMat=textMat('12:00','#f1eee5','#252a2d'),clock=A(new T.CircleGeometry(.92,32),clockMat,0,7.20,7.16,g);clock.rotation.y=0;
 A(new T.TorusGeometry(1.02,.065,10,32),brass,0,7.20,7.18,g);
 for(const x of[-3.8,3.8]){let wm=M(0xffd18a,.28,.02,0xffa83a,0);warm.push(wm);A(new T.BoxGeometry(.30,.58,.24),wm,x,3.02,7.22,g)}
 A(new T.BoxGeometry(14.5,.10,4.4),stone,0,.05,9.65,g);
 for(const x of[-5.4,5.4]){A(new T.BoxGeometry(2.8,.42,.72),green,x,.23,10.95,g);if(!mobile)for(let k=-3;k<=3;k++){let f=A(new T.SphereGeometry(.13,8,6),M(k%2?0xb44b5c:0xd5a43e,.70),x+k*.32,.58,10.95,g);f.scale.y=.72}}
 A(new T.BoxGeometry(4.2,.12,1.15),brass,0,1.15,7.36,g);

 signAt('bank','LUX CITY BANK','#314d67');
 signAt('jobs','ARBEITSAMT','#525f6d');
 signAt('housing','WOHNUNGSAMT','#536d57');

 W.registerTick?.((dt)=>{
   let h=(+L.state.hour||0)+(+L.state.minute||0)/60,night=h>=19.2||h<6.4,dusk=(h>=18&&h<19.2)||(h>=6.4&&h<7.4);
   for(const m of warm)m.emissiveIntensity+=( (night?.95:dusk?.35:0)-m.emissiveIntensity)*Math.min(1,dt*2.4);
 });
 window.LuxCivicVisual800={version:'8.0.0',root}
}
