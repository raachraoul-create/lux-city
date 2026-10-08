import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{let C=window.LuxCityServices;if(!window.LuxWorld?.scene||!C?.buildings||!window.LuxLife)return;clearInterval(q);init(C)},360);
function init(C){
 const W=LuxWorld,S=W.scene,L=LuxLife,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 const old=S.getObjectByName('LuxIndustrial950');if(old)S.remove(old);
 const root=new T.Group();root.name='LuxIndustrial950';S.add(root);
 const M=(c,r=.70,m=.08,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const A=(g,m,x,y,z,p)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=!mobile;o.receiveShadow=true;p.add(o);return o};
 const metal=M(0x777f83,.34,.58),dark=M(0x343a3e,.46,.38),concrete=M(0x85847f,.90),rust=M(0x85563f,.76,.14),warm=[];
 function lamp(p,x,y,z){let lm=M(0xffe2af,.28,.02,0xffbb55,0);warm.push(lm);A(new T.BoxGeometry(.42,.18,.26),lm,x,y,z,p)}
 function pipe(p,x,y,z,len=5,rot=0,c=0x8d9497){let m=A(new T.CylinderGeometry(.13,.13,len,12),M(c,.32,.54),x,y,z,p);m.rotation.z=Math.PI/2;m.rotation.y=rot;return m}
 function silo(p,x,z,r=1.5,h=6,c=0xaeb3b5){
   A(new T.CylinderGeometry(r,r,h,20),M(c,.42,.45),x,h/2,z,p);
   A(new T.ConeGeometry(r*.96,1.1,20),M(c,.40,.42),x,h+.55,z,p);
   for(const sx of[-1,1])A(new T.BoxGeometry(.09,h,.09),dark,x+sx*(r-.15),h/2,z-r*.75,p);
   if(!mobile)for(let y=1.1;y<h;y+=1.0){let ring=A(new T.TorusGeometry(r+.02,.035,6,24),dark,x,y,z,p);ring.rotation.x=Math.PI/2}
 }
 function tank(p,x,z,r=1.35,h=3.5,c=0xb2b5b6){
   A(new T.CylinderGeometry(r,r,h,20),M(c,.38,.52),x,h/2,z,p);
   A(new T.SphereGeometry(r,20,10,0,Math.PI*2,0,Math.PI/2),M(c,.38,.52),x,h,z,p);
   A(new T.CylinderGeometry(.08,.08,1.4,8),dark,x+r*.65,h+.55,z,p);
 }
 function dock(p,x,z,w=4){
   A(new T.BoxGeometry(w,.22,3.4),concrete,x,.11,z,p);
   A(new T.BoxGeometry(w-.4,.38,.50),dark,x,.32,z-1.42,p);
   for(const sx of[-1,1])A(new T.BoxGeometry(.18,.22,3.0),M(0xe0b94b,.60),x+sx*(w/2-.24),.26,z,p);
 }
 function pallet(p,x,z,c=0x9a744d){A(new T.BoxGeometry(1.55,.16,1.05),M(c,.88),x,.08,z,p);for(let y=.26;y<=.95;y+=.34)A(new T.BoxGeometry(1.38,.28,.92),M(c+.0,.86),x,y,z,p)}
 for(const d of C.buildings.filter(x=>x.factory)){
   const g=new T.Group();g.position.set(d.x,0,d.z);g.userData.id=d.id;root.add(g);
   const front=d.l/2+4.0;
   // service yard surface
   A(new T.BoxGeometry(d.w+12,.06,d.l*.72),concrete,0,.03,front+3.0,g);
   if(d.id==='mill'){
     silo(g,-d.w*.35,front+4.0,1.7,7.5,0xb1ada4);silo(g,-d.w*.12,front+4.0,1.5,6.7,0xa7a398);
     silo(g,d.w*.13,front+4.0,1.55,7.0,0xb9b6ad);
     for(const x of[-d.w*.35,-d.w*.12,d.w*.13])pipe(g,x,5.4,front+1.9,4.1,0,0x8e9493);
     dock(g,d.w*.34,front+2.6,4.5);
     for(let i=0;i<5;i++)pallet(g,d.w*.30+(i%2)*1.7,front+5.4+Math.floor(i/2)*1.25,0xa37b51);
   }else if(d.id==='sugar'){
     silo(g,-d.w*.30,front+4.2,1.8,8.0,0xc3c0b8);tank(g,d.w*.18,front+3.5,1.6,4.2,0xaeb4b6);tank(g,d.w*.34,front+3.5,1.35,3.8,0xb7bbbc);
     pipe(g,-d.w*.30,6.2,front+1.8,5.0,0,0xa6aaab);pipe(g,d.w*.25,4.4,front+1.8,5.8,0,0x969da0);
     dock(g,-d.w*.02,front+2.4,5.2);
     for(let i=0;i<6;i++)pallet(g,-d.w*.25+(i%3)*1.6,front+5.7+Math.floor(i/3)*1.35,0xb18c5c);
   }else{
     for(const x of[-d.w*.33,-d.w*.14,d.w*.10])tank(g,x,front+4.0,1.45,4.5,0x9fb1b8);
     silo(g,d.w*.32,front+4.0,1.6,7.0,0xaab9bf);
     // pipe bridge
     for(const x of[-d.w*.33,-d.w*.14,d.w*.10,d.w*.32]){A(new T.CylinderGeometry(.09,.11,4.8,9),dark,x,2.4,front+1.7,g);pipe(g,x,4.9,front+1.7,4.4,0,0x8299a1)}
     dock(g,0,front+2.4,5.5);
     for(let i=0;i<8;i++)pallet(g,-d.w*.26+(i%4)*1.55,front+6.0+Math.floor(i/4)*1.3,0x8e765b);
   }
   // yard markings and lamps
   for(let x=-d.w*.36;x<=d.w*.36;x+=3.3)A(new T.BoxGeometry(.10,.025,5.0),M(0xe1c14a,.66),x,.075,front+1.9,g);
   for(const x of[-d.w*.42,d.w*.42]){A(new T.CylinderGeometry(.06,.08,5.4,9),dark,x,2.7,front+1.0,g);lamp(g,x,5.25,front+1.0)}
   if(!mobile){
     // safety rails and stair silhouette
     for(const x of[-d.w*.44,d.w*.44])for(let z=front+.7;z<=front+6;z+=1.5){A(new T.BoxGeometry(.06,1.0,.06),M(0xd8b442,.50,.34),x,.5,z,g);A(new T.BoxGeometry(.06,.06,1.5),M(0xd8b442,.50,.34),x,1.0,z+.7,g)}
   }
 }
 W.registerTick?.((dt)=>{let h=(+L.state.hour||0)+(+L.state.minute||0)/60,night=h>=18.7||h<6.5,dusk=(h>=17.8&&h<18.7)||(h>=6.5&&h<7.3);for(const m of warm)m.emissiveIntensity+=( (night?1.0:dusk?.42:.04)-m.emissiveIntensity)*Math.min(1,dt*2.4)});
 window.LuxIndustrial950={version:'9.5.0',root}
}
