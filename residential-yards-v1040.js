import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{if(!window.LuxWorld?.houseSites?.length||!window.LuxLife)return;clearInterval(q);init()},380);
function init(){
 const W=LuxWorld,S=W.scene,L=LuxLife,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 const old=S.getObjectByName('LuxResidentialYards1040');if(old)S.remove(old);
 const root=new T.Group();root.name='LuxResidentialYards1040';S.add(root);
 const M=(c,r=.72,m=.04,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const A=(geo,mat,x,y,z,p)=>{let o=new T.Mesh(geo,mat);o.position.set(x,y,z);o.castShadow=!mobile;o.receiveShadow=true;p.add(o);return o};
 const stone=M(0xa7a198,.92),pave=M(0x777875,.90),wood=M(0x72533c,.84),metal=M(0x5f676b,.36,.48),dark=M(0x30363a,.50,.32),hedge=M(0x466c3f,.96),soil=M(0x675440,.98),bin=[M(0x363c3f,.84),M(0x416a45,.84),M(0x4f6576,.84)],warm=[];
 let seed=9752;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
 function localGroup(h){let g=new T.Group();g.position.set(h.x,0,h.z);g.rotation.y=h.rot||0;root.add(g);return g}
 function fence(g,w,d,front){
   const z=-d/2-1.7;
   for(const x of[-w*.46,w*.46])A(new T.BoxGeometry(.09,1.05,.09),wood,x,.53,z,g);
   A(new T.BoxGeometry(w*.92,.08,.08),wood,0,.82,z,g);
   A(new T.BoxGeometry(w*.92,.08,.08),wood,0,.35,z,g);
   if(!mobile)for(let x=-w*.43;x<=w*.43;x+=.62)A(new T.BoxGeometry(.045,.92,.045),wood,x,.48,z,g);
 }
 function mailbox(g,x,z,i){
   A(new T.CylinderGeometry(.035,.045,1.12,8),metal,x,.56,z,g);
   A(new T.BoxGeometry(.55,.42,.38),M([0x414a50,0x5b473c,0x415d56][i%3],.56,.28),x,1.10,z,g);
   A(new T.BoxGeometry(.42,.035,.05),dark,x,1.18,z+.21,g);
 }
 function bins(g,x,z,i){
   for(let k=0;k<(mobile?2:3);k++){
     A(new T.BoxGeometry(.47,.78,.51),bin[(i+k)%bin.length],x+k*.55,.39,z,g);
     let lid=A(new T.BoxGeometry(.50,.08,.56),dark,x+k*.55,.82,z,g);lid.rotation.x=-.05;
     for(const sx of[-1,1]){let wh=A(new T.CylinderGeometry(.06,.06,.04,8),dark,x+k*.55+sx*.16,.08,z+.27,g);wh.rotation.z=Math.PI/2}
   }
 }
 function tableSet(g,x,z,i){
   A(new T.CylinderGeometry(.65,.65,.08,18),M(0x8b6a4b,.80),x,.72,z,g);
   A(new T.CylinderGeometry(.08,.10,.72,10),metal,x,.36,z,g);
   for(const a of[0,Math.PI/2,Math.PI,Math.PI*1.5]){
     const cx=x+Math.cos(a)*1.15,cz=z+Math.sin(a)*1.15;
     A(new T.BoxGeometry(.55,.10,.55),M([0x59696f,0x7b5f4d,0x51695a][i%3],.76),cx,.48,cz,g);
     A(new T.BoxGeometry(.08,.48,.08),metal,cx,.24,cz,g);
   }
 }
 function shed(g,x,z,i){
   A(new T.BoxGeometry(2.4,2.15,2.2),M([0x6b5644,0x586454,0x685b52][i%3],.84),x,1.08,z,g);
   let r=A(new T.ConeGeometry(1.85,.9,4),M(0x4e453f,.82),x,2.58,z,g);r.rotation.y=Math.PI/4;
   A(new T.BoxGeometry(.82,1.55,.08),dark,x,1.0,z+1.13,g);
 }
 function planter(g,x,z,c){
   A(new T.BoxGeometry(1.35,.42,.72),stone,x,.21,z,g);
   A(new T.BoxGeometry(1.12,.17,.54),soil,x,.45,z,g);
   for(let k=-2;k<=2;k++){let f=A(new T.SphereGeometry(.09,8,6),M(k%2?c:0xd9a044,.72),x+k*.20,.63,z,g);f.scale.y=.70}
 }
 W.houseSites.forEach((h,i)=>{
   const g=localGroup(h),w=h.w||11,d=h.d||9,front=d/2+.30,variant=i%6;
   // driveway offset leaves the original central walking path untouched.
   const side=i%2?1:-1,driveX=side*w*.29;
   A(new T.BoxGeometry(Math.max(2.3,w*.24),.045,5.4),variant%2?pave:stone,driveX,.025,front+2.95,g);
   // paving joints, desktop only
   if(!mobile)for(let z=front+.55;z<front+5.25;z+=.65)A(new T.BoxGeometry(Math.max(2.0,w*.21),.010,.025),dark,driveX,.052,z,g);
   mailbox(g,-side*w*.40,front+3.15,i);
   bins(g,side*w*.40,front+.75,i);
   // address stone / low marker
   A(new T.BoxGeometry(.72,.72,.28),stone,-side*w*.40,.36,front+2.30,g);
   // backyard / side-yard variety, deliberately outside front entrance corridor.
   if(variant===0||variant===3){
     A(new T.BoxGeometry(w*.62,.055,3.6),M(0x8e755c,.88),0,.03,-d/2-2.0,g);
     tableSet(g,0,-d/2-2.0,i);
   }else if(variant===1){
     fence(g,w,d,front);
     if(!mobile)shed(g,side*w*.28,-d/2-2.6,i);
   }else if(variant===2){
     // small lawn play / relaxation corner
     A(new T.BoxGeometry(w*.60,.04,3.8),M(0x587b49,.98),0,.02,-d/2-2.0,g);
     A(new T.BoxGeometry(2.5,.12,.65),wood,-side*1.7,.46,-d/2-2.0,g);
     for(const sx of[-1,1])A(new T.BoxGeometry(.08,.50,.08),metal,-side*1.7+sx*.95,.25,-d/2-2.0,g);
   }else if(variant===4){
     // terrace pergola
     for(const x of[-2.3,2.3])for(const z of[-d/2-3.4,-d/2-.9])A(new T.BoxGeometry(.10,2.5,.10),wood,x,1.25,z,g);
     for(let x=-2.3;x<=2.3;x+=.58)A(new T.BoxGeometry(.07,.07,2.7),wood,x,2.48,-d/2-2.15,g);
     tableSet(g,0,-d/2-2.05,i);
   }else{
     if(!mobile){shed(g,-side*w*.28,-d/2-2.6,i);tableSet(g,side*1.6,-d/2-1.65,i)}
   }
   // garden borders and planters, kept clear of door path
   planter(g,-side*w*.31,front+1.45,[0xc45c68,0x8d67a8,0xc97c45][i%3]);
   if(!mobile&&i%2===0)planter(g,side*w*.08,-d/2-1.1,[0xb85b66,0x7966a8,0xd08e46][(i+1)%3]);
   // low side hedges rather than a front barrier
   for(const sx of[-1,1])if(sx!==side)for(let z=-d*.30;z<=d*.28;z+=1.15)A(new T.BoxGeometry(.55,.60,.90),hedge,sx*(w/2+1.0),.31,z,g);
   // hose + outdoor tap
   if(!mobile){
     A(new T.BoxGeometry(.10,.15,.10),metal,side*(w/2+.10),.72,-d*.10,g);
     let hose=A(new T.TorusGeometry(.33,.045,8,20),M(0x365943,.78),side*(w/2+.18),.62,-d*.10,g);hose.rotation.y=Math.PI/2;
   }
   // subtle porch light, visual-only.
   const lm=M(0xffdfad,.28,.02,0xffbd64,0);warm.push(lm);A(new T.BoxGeometry(.18,.28,.16),lm,-.82,2.18,front+.20,g);
 });
 W.registerTick?.((dt)=>{let h=(+L.state.hour||0)+(+L.state.minute||0)/60,night=h>=19.4||h<6.4,dusk=(h>=18&&h<19.4)||(h>=6.4&&h<7.3);for(const m of warm)m.emissiveIntensity+=( (night?.78:dusk?.28:.02)-m.emissiveIntensity)*Math.min(1,dt*2.3)});
 window.LuxResidentialYards1040={version:'10.4.0',root,count:W.houseSites.length}
}
