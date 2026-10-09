import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{let I=window.LuxInteriors530,W=window.LuxWorld;if(!I?.groups?.fire||!W)return;clearInterval(q);init(I.groups.fire,W)},420);
function init(g,W){
 if(g.getObjectByName('LuxFireInterior1030'))return;
 const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900,root=new T.Group();root.name='LuxFireInterior1030';g.add(root);
 const M=(c,r=.64,m=.06,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const A=(geo,mat,x,y,z,p=root)=>{let o=new T.Mesh(geo,mat);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=true;p.add(o);return o};
 const red=M(0xa62d33,.54,.15),yellow=M(0xd8b947,.58,.10),metal=M(0x727a7e,.30,.58),dark=M(0x252b2f,.40,.34),white=M(0xe7e7e2,.74),black=M(0x14181b,.40,.34),blue=[],warm=[];
 function screen(x,y,z,w=.82,h=.46,c=0x65c5ee){let m=M(0x10191e,.16,.34,c,.24);blue.push(m);A(new T.BoxGeometry(w,h,.035),m,x,y,z);A(new T.BoxGeometry(w+.07,h+.07,.025),dark,x,y,z+.026)}
 function locker(x,z){
   A(new T.BoxGeometry(1.04,2.35,.68),M(0x7d8588,.40,.34),x,1.18,z);
   A(new T.BoxGeometry(.76,.12,.46),dark,x,.38,z-.36);
   A(new T.BoxGeometry(.16,.04,.04),black,x+.31,1.25,z-.36);
   // hanging turnout jacket
   A(new T.BoxGeometry(.58,.70,.16),M(0x263138,.74),x,1.60,z-.42);
   A(new T.BoxGeometry(.60,.08,.17),yellow,x,1.45,z-.44);
   A(new T.BoxGeometry(.60,.08,.17),yellow,x,1.78,z-.44);
   // helmet
   let h=A(new T.SphereGeometry(.24,16,10,0,Math.PI*2,0,Math.PI*.55),M(0xe7d13d,.48,.10),x,2.12,z-.43);h.scale.y=.70;
 }
 function bottle(x,z,c=0x4f7f58){A(new T.CylinderGeometry(.14,.17,.88,14),M(c,.36,.34),x,.44,z);A(new T.CylinderGeometry(.045,.045,.17,10),metal,x,.96,z)}
 function bench(x,z,w=4.2){A(new T.BoxGeometry(w,.14,.62),M(0x755540,.80),x,.56,z);for(const sx of[-1,1])A(new T.BoxGeometry(.09,.56,.09),metal,x+sx*(w/2-.25),.28,z)}
 function boardTex(){let c=document.createElement('canvas');c.width=700;c.height=360;let x=c.getContext('2d');x.fillStyle='#eef0ec';x.fillRect(0,0,700,360);x.fillStyle='#9f2830';x.fillRect(0,0,700,66);x.fillStyle='#fff';x.font='900 36px Arial';x.fillText('FEUERWEHR · EINSATZBEREITSCHAFT',24,44);x.fillStyle='#5d6468';x.font='700 24px Arial';for(let i=0;i<6;i++){x.fillText(['FAHRZEUG 1  ·  BEREIT','FAHRZEUG 2  ·  BEREIT','ATEMSCHUTZ  ·  GEPRÜFT','MELDUNGEN   ·  0 OFFEN','PERSONAL    ·  BEREIT','112 · LUX CITY'][i],34,112+i*38)}let t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t}
 // locker / gear wall
 for(let x=-10.5;x<=10.5;x+=2.1)locker(x,-10.7);
 bench(-7.0,-7.8,5.2);bench(0,-7.8,5.2);bench(7.0,-7.8,5.2);
 // breathing apparatus rack
 A(new T.BoxGeometry(5.8,2.25,.52),M(0x5f666a,.42,.38),-10.5,1.12,-4.0);
 for(let x=-12.4;x<=-8.6;x+=.95){bottle(x,-4.36,0x4e7359);let hose=A(new T.TorusGeometry(.18,.022,6,14,Math.PI*1.55),black,x,.90,-4.42);hose.rotation.z=.6}
 // dispatch/control desk
 A(new T.BoxGeometry(8.3,.16,1.65),M(0x5f554a,.68),3.0,.80,-3.6);
 for(const x of[0.2,3.0,5.8]){screen(x,1.42,-4.43,.90,.50,x===3?0xe5a74a:0x63bce6);A(new T.BoxGeometry(.65,.06,.28),dark,x,.94,-4.05)}
 // radio stack + map wall
 for(let y=.55;y<=2.0;y+=.48){A(new T.BoxGeometry(1.35,.34,.56),dark,10.8,y,-4.0);screen(10.8,y,-4.30,.70,.18,0x6dc8e8)}
 A(new T.PlaneGeometry(5.6,2.7),new T.MeshBasicMaterial({map:boardTex(),toneMapped:false}),7.0,3.35,-13.95);
 // workshop zone
 A(new T.BoxGeometry(7.6,.16,1.55),M(0x715640,.76),-5.2,.83,5.3);
 for(const x of[-8.0,-5.2,-2.4]){A(new T.BoxGeometry(.60,.48,.38),metal,x,1.10,5.2);A(new T.CylinderGeometry(.11,.11,.50,10),dark,x+.32,1.36,5.2)}
 A(new T.BoxGeometry(6.8,2.2,.20),M(0x4e5559,.44,.42),-5.2,2.40,6.0);
 if(!mobile){
   for(let x=-8.0;x<=-2.4;x+=.70){A(new T.BoxGeometry(.30,.08,.06),M((Math.round(x*10)%2)?0xc94f36:0x5f7fa4,.52),x,2.55,5.86)}
   // hose reels
   for(const x of[3.8,6.2,8.6]){let r=A(new T.TorusGeometry(.48,.10,10,24),red,x,1.65,5.8);r.rotation.y=Math.PI/2;A(new T.CylinderGeometry(.06,.06,.90,10),metal,x,1.10,5.8)}
 }
 // readiness lounge
 A(new T.BoxGeometry(4.8,.62,1.25),M(0x4a565d,.76),7.0,.48,2.0);A(new T.BoxGeometry(4.8,.82,.24),M(0x4a565d,.76),7.0,.92,2.48);
 A(new T.BoxGeometry(3.6,.14,1.5),M(0x745640,.76),7.0,.56,.15);
 for(const x of[5.7,8.3])A(new T.BoxGeometry(.60,.12,.60),M(0x555d62,.72),x,.48,-1.1);
 // floor hazard markings
 for(let x=-12;x<=12;x+=2.4){let m=A(new T.BoxGeometry(.12,.022,4.0),yellow,x,.075,8.7);m.rotation.y=.22}
 // wall identity / 112
 A(new T.BoxGeometry(4.2,1.0,.08),red,-10.4,3.8,13.55);A(new T.BoxGeometry(1.0,4.2,.08),red,-10.4,3.8,13.56);
 function txt(text){let c=document.createElement('canvas');c.width=512;c.height=160;let x=c.getContext('2d');x.fillStyle='#1c2328';x.fillRect(0,0,512,160);x.fillStyle='#f3f1e9';x.font='900 62px Arial';x.textAlign='center';x.fillText(text,256,100);let t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t}
 A(new T.PlaneGeometry(5.2,1.5),new T.MeshBasicMaterial({map:txt('FEUERWEHR · 112'),toneMapped:false}),0,4.05,13.62);
 W.registerTick?.((dt)=>{let h=(window.LuxLife?.state?.hour??12)+(window.LuxLife?.state?.minute??0)/60,night=h>=19||h<6.5;for(const m of blue)m.emissiveIntensity+=( (.30-m.emissiveIntensity)*Math.min(1,dt*3));for(const m of warm)m.emissiveIntensity+=( (night?.65:.20)-m.emissiveIntensity)*Math.min(1,dt*2.5)});
 window.LuxFireInterior1030={version:'10.3.0',root}
}
