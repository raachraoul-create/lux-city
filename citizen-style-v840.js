import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{if(!window.LuxWorld?.npcs?.length||!(window.LuxAIPeople730||window.LuxAIPeople720))return;clearInterval(q);init()},420);
function init(){
 const W=LuxWorld,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900,styled=[];
 const M=(c,r=.72,m=.02)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m});
 const A=(g,m,x,y,z,p)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=!mobile;o.receiveShadow=true;p.add(o);return o};
 const cloth=[0x334b5d,0x5b4b40,0x445843,0x594b64,0x76593c,0x3d444b,0x6a3d42],accent=[0xc58b3b,0x55789a,0x6a8751,0x8b5d50],dark=M(0x24292c,.68),metal=M(0x6e7478,.36,.44);

 W.npcs.forEach((p,i)=>{
   if(p.userData.citizenStyle840)return;
   const skinHead=p.userData.headRoot720,job=String(p.userData.citizenJob||''),base=M(cloth[i%cloth.length],.80),acc=M(accent[i%accent.length],.72);
   // outerwear variety
   if(i%3===0){
     const jacket=new T.Group();jacket.position.set(0,1.29,-.015);p.add(jacket);
     A(new T.BoxGeometry(.43,.48,.28),base,0,0,0,jacket);
     A(new T.BoxGeometry(.025,.42,.018),dark,0,0,.15,jacket);
     for(const sx of[-1,1])A(new T.BoxGeometry(.12,.38,.23),base,sx*.26,-.02,0,jacket);
   }else if(i%3===1){
     const hoodie=new T.Group();hoodie.position.set(0,1.38,-.035);p.add(hoodie);
     let hood=A(new T.TorusGeometry(.12,.038,7,16,Math.PI*1.45),base,0,.20,-.12,hoodie);hood.rotation.x=Math.PI/2;
     A(new T.BoxGeometry(.36,.035,.035),acc,0,-.10,.16,hoodie);
   }
   // different bags / backpacks
   if(i%4===0){
     let bag=new T.Group();bag.position.set(0,1.20,-.19);p.add(bag);
     A(new T.BoxGeometry(.32,.42,.16),M([0x413b34,0x334455,0x4c5537][i%3],.84),0,0,0,bag);
     for(const sx of[-1,1]){let strap=A(new T.TorusGeometry(.13,.018,6,12,Math.PI),dark,sx*.12,.10,.09,bag);strap.rotation.z=Math.PI}
   }else if(i%5===2){
     let sat=new T.Group();sat.position.set(.27,.98,-.04);p.add(sat);
     A(new T.BoxGeometry(.28,.30,.11),M(0x73543c,.82),0,0,0,sat);
     let strap=A(new T.TorusGeometry(.36,.018,6,18,Math.PI),M(0x4b382a,.84),-.18,.42,0,sat);strap.rotation.z=-.65;
   }
   // headwear / hairstyle silhouette helpers
   if(skinHead){
     if(i%7===0){let beanie=A(new T.SphereGeometry(.158,16,9,0,Math.PI*2,0,Math.PI*.52),base,0,.145,-.005,skinHead);beanie.scale.y=.56;A(new T.TorusGeometry(.145,.018,7,18),base,0,.106,0,skinHead).rotation.x=Math.PI/2}
     else if(i%7===3){A(new T.BoxGeometry(.23,.025,.16),dark,0,.155,.055,skinHead);A(new T.BoxGeometry(.17,.025,.18),dark,0,.153,.17,skinHead)}
   }
   // job-specific visual accents when a job is known.
   if(/Mechaniker|Werkstatt/i.test(job)){A(new T.BoxGeometry(.42,.06,.22),M(0x31445a,.65),0,1.42,.12,p);for(const sx of[-1,1])A(new T.BoxGeometry(.06,.16,.02),metal,sx*.14,1.33,.16,p)}
   if(/Post|Fahrer|Lager/i.test(job)){let vest=M(0xd3a92c,.70);A(new T.BoxGeometry(.47,.06,.26),vest,0,1.40,.13,p);for(const sx of[-1,1])A(new T.BoxGeometry(.055,.36,.03),vest,sx*.18,1.25,.15,p)}
   if(/Bäcker|Bäckerei/i.test(job)&&skinHead){let cap=A(new T.CylinderGeometry(.145,.145,.055,18),M(0xe7e3da,.70),0,.15,0,skinHead);cap.rotation.x=Math.PI/2}
   p.userData.citizenStyle840=true;styled.push(p)
 });
 window.LuxCitizenStyle840={version:'8.4.0',styledCount:styled.length}
}
