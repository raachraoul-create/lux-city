import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{let PC=window.LuxPlayerCar840||window.LuxPlayerCar850;if(!PC?.car||!window.LuxVehicles)return;clearInterval(q);init(PC.car)},500);
function init(car){
 const M=(c,r=.28,m=.42)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m}),dark=M(0x171b1f,.26,.55),metal=M(0xaeb5b9,.22,.68);
 let sig='';
 function rebuild(){
   let v=window.LuxVehicles?.activeVehicle;if(!v)return;let ns=[v.id,v.bodyStyle,v.colorHex].join('|');if(ns===sig)return;sig=ns;
   let old=car.getObjectByName('PlayerModelStyle1130');if(old){car.remove(old);old.traverse?.(o=>{o.geometry?.dispose?.();if(Array.isArray(o.material))o.material.forEach(m=>m.dispose?.());else o.material?.dispose?.()})}
   let g=new T.Group();g.name='PlayerModelStyle1130';car.add(g),hex=Number(v.colorHex??0xf4f4f1),paint=M(hex,.20,.38);
   const A=(geo,mat,x,y,z)=>{let o=new T.Mesh(geo,mat);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=true;g.add(o);return o},style=v.bodyStyle||v.type;
   if(style==='sport'){
     A(new T.BoxGeometry(1.12,.055,.28),dark,0,.93,2.28);A(new T.BoxGeometry(.055,.22,.06),dark,-.43,.82,2.18);A(new T.BoxGeometry(.055,.22,.06),dark,.43,.82,2.18);
     for(const sx of[-1,1])A(new T.BoxGeometry(.05,.12,3.75),dark,sx*.98,.50,.02);
   }else if(style==='wagon'){
     for(const sx of[-1,1])A(new T.BoxGeometry(.045,.055,2.08),dark,sx*.61,1.52,.18);
     A(new T.BoxGeometry(1.52,.035,.08),metal,0,1.50,.82);
   }else if(style==='crossover'||style==='suv'){
     for(const sx of[-1,1]){A(new T.BoxGeometry(.06,.15,3.56),dark,sx*.99,.52,.02);A(new T.BoxGeometry(.05,.06,2.08),dark,sx*.64,1.55,.14)}
     A(new T.BoxGeometry(1.40,.05,.18),paint,0,.95,2.15);
   }else if(style==='hatch'){
     let sp=A(new T.BoxGeometry(1.25,.045,.22),paint,0,1.30,1.92);sp.rotation.x=-.08;
   }
   car.userData.bodyStyle=style
 }
 addEventListener('luxcity:vehicle-style',rebuild);setInterval(rebuild,700);rebuild();
 window.LuxPlayerCarStyle1130={version:'11.3.0',rebuild}
}
