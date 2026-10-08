import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{if(!window.LuxWorld?.scene||!window.LuxTownHall423?.group||!window.LuxLife)return;clearInterval(q);init()},360);
function init(){
 const W=LuxWorld,S=W.scene,L=LuxLife,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 const old=S.getObjectByName('LuxCitySquare900');if(old)S.remove(old);
 const root=new T.Group();root.name='LuxCitySquare900';root.position.set(-150,0,20);S.add(root);
 const M=(c,r=.72,m=.04,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const A=(g,m,x,y,z,p=root)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=!mobile;o.receiveShadow=true;p.add(o);return o};
 const stone=M(0xb6b0a5,.90),stone2=M(0x979187,.92),dark=M(0x3d4448,.42,.42),wood=M(0x74543e,.82),green=M(0x4b7443,.96),water=new T.MeshPhysicalMaterial({color:0x6ea9c3,roughness:.10,metalness:.06,transparent:true,opacity:.72,transmission:mobile?0:.08,clearcoat:.72}),warm=[];
 // plaza paving
 A(new T.BoxGeometry(28,.06,18),stone,0,.03,18.2);
 if(!mobile){
   for(let x=-12;x<=12;x+=2.0)A(new T.BoxGeometry(.035,.012,17.4),stone2,x,.068,18.2);
   for(let z=10.2;z<=26.2;z+=2.0)A(new T.BoxGeometry(27.4,.012,.035),stone2,0,.069,z);
 }
 // central fountain / sculpture
 A(new T.CylinderGeometry(3.15,3.25,.46,36),stone2,0,.23,18.6);
 A(new T.CylinderGeometry(2.55,2.60,.20,36),water,0,.49,18.6);
 A(new T.CylinderGeometry(.55,.78,2.25,20),stone2,0,1.42,18.6);
 A(new T.SphereGeometry(.58,20,14),M(0xb6a979,.44,.28),0,2.75,18.6);
 if(!mobile){
   for(const a of[0,Math.PI/2,Math.PI,Math.PI*1.5]){
     let arc=A(new T.TorusGeometry(.82,.035,7,18,Math.PI*.75),water,Math.sin(a)*1.35,1.16,18.6+Math.cos(a)*1.35);
     arc.rotation.y=a;arc.rotation.z=Math.PI/2;
   }
 }
 // benches around fountain
 function bench(x,z,rot=0){let g=new T.Group();g.position.set(x,0,z);g.rotation.y=rot;root.add(g);for(const zz of[-.22,.22])A(new T.BoxGeometry(2.5,.10,.22),wood,0,.58,zz,g);A(new T.BoxGeometry(2.5,.10,.20),wood,0,1.02,.42,g);for(const sx of[-1,.0?0:1]){}for(const sx of[-1,1]){A(new T.BoxGeometry(.09,.62,.09),dark,sx*.95,.31,-.18,g);A(new T.BoxGeometry(.09,.72,.09),dark,sx*.95,.66,.38,g)}}
 bench(-5.8,18.5,Math.PI/2);bench(5.8,18.5,-Math.PI/2);bench(0,12.5,0);bench(0,24.7,Math.PI);
 // planters / small trees
 function planter(x,z,s=1){A(new T.CylinderGeometry(.72,.86,.52,14),stone2,x,.26,z);A(new T.CylinderGeometry(.68,.68,.08,14),M(0x65533f,.98),x,.54,z);A(new T.CylinderGeometry(.11,.18,2.2*s,8),M(0x5a422d,.96),x,1.65*s,z);let crown=A(new T.IcosahedronGeometry(.92*s,1),green,x,3.0*s,z);crown.scale.set(1,.82,1)}
 for(const p of[[-10.4,12.2],[10.4,12.2],[-10.4,24.6],[10.4,24.6]])planter(p[0],p[1],.76);
 // low flower islands
 for(const [x,z] of[[-8.2,18.6],[8.2,18.6]]){A(new T.BoxGeometry(3.2,.34,1.15),stone2,x,.17,z);A(new T.BoxGeometry(2.85,.12,.88),green,x,.43,z);if(!mobile)for(let k=-4;k<=4;k++){let f=A(new T.SphereGeometry(.10,8,6),M(k%2?0xc45e69:0xd8a844,.74),x+k*.29,.63,z);f.scale.y=.72}}
 // lamp posts
 function lamp(x,z){A(new T.CylinderGeometry(.055,.085,4.3,9),dark,x,2.15,z);A(new T.BoxGeometry(.58,.07,.07),dark,x+.22,4.22,z);let lm=M(0xffe2ae,.28,.03,0xffbd62,0);warm.push(lm);A(new T.BoxGeometry(.32,.18,.24),lm,x+.50,4.10,z)}
 for(const p of[[-12.0,10.7],[12.0,10.7],[-12.0,25.7],[12.0,25.7]])lamp(...p);
 // direction / info board
 const c=document.createElement('canvas');c.width=512;c.height=300;let cx=c.getContext('2d');cx.fillStyle='#243746';cx.fillRect(0,0,512,300);cx.fillStyle='#f2b840';cx.fillRect(0,0,512,48);cx.fillStyle='#fff';cx.font='900 34px Arial';cx.fillText('LUX CITY ZENTRUM',42,94);cx.font='700 25px Arial';cx.fillStyle='#dce5eb';cx.fillText('Rathaus  ←',42,148);cx.fillText('Bank      →',42,188);cx.fillText('Bus Linie 1  ↑',42,228);let tt=new T.CanvasTexture(c);tt.colorSpace=T.SRGBColorSpace;
 A(new T.BoxGeometry(2.4,1.75,.10),dark,-11.3,1.45,18.4);A(new T.PlaneGeometry(2.15,1.45),new T.MeshBasicMaterial({map:tt,toneMapped:false}),-11.3,1.50,18.46);
 W.registerTick?.((dt)=>{let h=(+L.state.hour||0)+(+L.state.minute||0)/60,night=h>=19.2||h<6.3,dusk=(h>=18&&h<19.2)||(h>=6.3&&h<7.3);for(const m of warm)m.emissiveIntensity+=( (night?1.05:dusk?.42:.03)-m.emissiveIntensity)*Math.min(1,dt*2.4)});
 window.LuxCitySquare900={version:'9.0.0',root}
}
