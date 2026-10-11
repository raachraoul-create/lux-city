import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{let W=window.LuxWorld;if(!W?.scene||!window.LuxRoadNetwork1100)return;clearInterval(q);init(W)},650);
function init(W){
 const S=W.scene,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900,root=new T.Group();root.name='LuxMotorwayDetail1170';S.add(root);
 const M=(c,r=.72,m=.03,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const asphalt=M(0x252b2f,.92),white=M(0xeeeade,.66),yellow=M(0xe1b94c,.66),barrier=M(0x9aa0a2,.34,.58),dark=M(0x30363a,.48,.34),green=M(0x28533d,.60,.10),reflect=M(0xddeeff,.24,.18,0xddeeff,.12);
 const A=(g,m,x,y,z,p=root)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=true;p.add(o);return o};
 // central median strips
 A(new T.BoxGeometry(900,.06,2.2),asphalt,0,.10,-430);A(new T.BoxGeometry(900,.06,2.2),asphalt,0,.10,430);
 A(new T.BoxGeometry(2.2,.06,840),asphalt,-460,.10,0);A(new T.BoxGeometry(2.2,.06,840),asphalt,460,.10,0);
 // shoulder edge lines
 for(const z of[-430,430])for(const off of[-10.8,10.8])A(new T.BoxGeometry(900,.018,.14),white,0,.15,z+off);
 for(const x of[-460,460])for(const off of[-10.8,10.8])A(new T.BoxGeometry(.14,.018,840),white,x+off,.15,0);
 // median barriers, reduced on mobile
 const step=mobile?18:9;
 for(const z of[-430,430])for(let x=-438;x<=438;x+=step){A(new T.BoxGeometry(step-.4,.56,.18),barrier,x,.38,z)}
 for(const x of[-460,460])for(let z=-410;z<=410;z+=step){A(new T.BoxGeometry(.18,.56,step-.4),barrier,x,.38,z)}
 // emergency bays
 for(const [x,z,rot] of [[-170,-443,0],[170,443,Math.PI],[-473,-160,Math.PI/2],[473,160,-Math.PI/2]]){
   const g=new T.Group();g.position.set(x,.09,z);g.rotation.y=rot;root.add(g);
   A(new T.BoxGeometry(18,.05,5.4),asphalt,0,.02,0,g);A(new T.BoxGeometry(18,.018,.12),white,0,.07,2.45,g);
   A(new T.BoxGeometry(.65,1.55,.45),green,7.2,.78,1.65,g);A(new T.BoxGeometry(.40,.10,.06),reflect,7.2,1.14,1.41,g);
 }
 // overhead sign gantries
 function gantry(x,z,rot,text){
   const g=new T.Group();g.position.set(x,0,z);g.rotation.y=rot;root.add(g);
   for(const sx of[-1,1])A(new T.CylinderGeometry(.07,.09,6.3,8),barrier,sx*7.1,3.15,0,g);
   A(new T.BoxGeometry(14.2,.12,.12),barrier,0,6.0,0,g);
   let c=document.createElement('canvas');c.width=900;c.height=260;let cx=c.getContext('2d');cx.fillStyle='#24533d';cx.fillRect(0,0,900,260);cx.strokeStyle='#fff';cx.lineWidth=10;cx.strokeRect(10,10,880,240);cx.fillStyle='#fff';cx.font='900 52px Arial';cx.textAlign='center';cx.fillText(text,450,100);cx.font='700 31px Arial';cx.fillText('ZENTRUM · RING · INDUSTRIE',450,170);let tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;
   A(new T.PlaneGeometry(7.4,2.2),new T.MeshBasicMaterial({map:tx,toneMapped:false}),0,5.0,.08,g)
 }
 gantry(-300,-430,0,'A-LUX 1 · WEST');gantry(300,430,Math.PI,'A-LUX 2 · OST');if(!mobile){gantry(-460,250,Math.PI/2,'A-LUX 3 · NORD');gantry(460,-250,-Math.PI/2,'A-LUX 4 · SÜD')}
 // chevrons at major ramp zones
 function chev(x,z,rot){
   const g=new T.Group();g.position.set(x,.16,z);g.rotation.y=rot;root.add(g);
   for(let i=0;i<5;i++){let l=A(new T.BoxGeometry(.18,.012,1.6),white,-1.2+i*.6,.01,0,g);l.rotation.y=.65}
 }
 for(const a of[[-260,-420,0],[260,-440,Math.PI],[-440,-230,Math.PI/2],[440,230,-Math.PI/2]])chev(...a);
 // reflector posts
 const post=(x,z,rot=0)=>{let g=new T.Group();g.position.set(x,0,z);g.rotation.y=rot;root.add(g);A(new T.BoxGeometry(.09,.82,.09),M(0xe5e2d8,.72),0,.41,0,g);A(new T.BoxGeometry(.10,.14,.03),reflect,0,.62,-.055,g)};
 for(let x=-420;x<=420;x+=32){post(x,-444,0);post(x,444,Math.PI)}
 for(let z=-388;z<=388;z+=32){post(-474,z,Math.PI/2);post(474,z,-Math.PI/2)}
 window.LuxMotorwayDetail1170={version:'11.7.0',root}
}
