import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{let A=window.LuxAvatar950||window.LuxAvatar940;if(!A?.player?.userData?.parts950||!A.player.userData.headRoot950)return;clearInterval(q);init(A.player,A.config||{})},320);
function init(p,cfg){
 if(p.userData.playerDetail1000)return;p.userData.playerDetail1000=true;
 const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900,parts=p.userData.parts950,head=p.userData.headRoot950,arms=p.userData.lowerArms950||[],feet=p.userData.feet950||[];
 const C=(v,d)=>{try{return new T.Color(v||d)}catch{return new T.Color(d)}};
 const shirtC=C(cfg.shirt,'#365f86'),pantsC=C(cfg.pants,'#263746'),hairC=C(cfg.hairColor,'#3a2418'),skinC=C(cfg.skin,'#c58c66');
 const P=(c,r=.58,m=.03)=>new T.MeshPhysicalMaterial({color:c,roughness:r,metalness:m,clearcoat:.028,clearcoatRoughness:.78});
 const M=(c,r=.58,m=.03,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const shirt=P(shirtC,.76),shirtDark=P(new T.Color(shirtC).multiplyScalar(.72),.80),pants=P(pantsC,.82),dark=M(0x171a1c,.48,.12),metal=M(0x9da2a4,.25,.62),skin=P(skinC,.48),hair=P(hairC,.66),white=M(0xf4f3ed,.52),glass=M(0xddeeff,.18,.10,0xffffff,.05);
 const A=(g,m,x,y,z,parent=p)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=!mobile;o.receiveShadow=true;parent.add(o);return o};
 // Clothing construction lines / jacket depth
 A(new T.BoxGeometry(.34,.018,.025),shirtDark,0,1.02,.151);
 A(new T.BoxGeometry(.014,.38,.018),shirtDark,0,1.37,.158);
 for(const sx of[-1,1]){
   let pocket=A(new T.BoxGeometry(.105,.080,.016),shirtDark,sx*.11,1.24,.154);pocket.rotation.z=-sx*.12;
   A(new T.BoxGeometry(.112,.010,.022),metal,sx*.11,1.29,.164);
   A(new T.TorusGeometry(.047,.008,5,12,Math.PI),shirtDark,sx*.23,1.49,.014).rotation.z=sx*Math.PI/2;
 }
 // cuffs at wrists
 for(let i=0;i<arms.length;i++){
   const la=arms[i],sx=i===0?-1:1;
   A(new T.CylinderGeometry(.046,.050,.055,12),shirtDark,0,-.222,.010,la);
   // fingernail hints
   if(!mobile)for(let fi=0;fi<4;fi++)A(new T.BoxGeometry(.009,.012,.004),white,(fi-1.5)*.015,-.314,.051,la);
   // wristwatch on left
   if(i===0){
     A(new T.BoxGeometry(.058,.035,.024),dark,-.036,-.235,.045,la);
     let face=A(new T.CircleGeometry(.022,14),glass,-.036,-.235,.059,la);face.rotation.x=0;
     A(new T.BoxGeometry(.014,.075,.018),metal,-.036,-.235,.030,la);
   }
 }
 // belt loops and trouser seams
 for(const x of[-.115,-.04,.04,.115])A(new T.BoxGeometry(.018,.085,.018),pants,x,.93,.111);
 A(new T.BoxGeometry(.010,.43,.012),shirtDark,-.09,.66,.145);
 A(new T.BoxGeometry(.010,.43,.012),shirtDark,.09,.66,.145);
 // shoe soles / toe cap / laces
 for(const ft of feet){
   A(new T.BoxGeometry(.168,.026,.318),dark,0,-.055,.025,ft);
   A(new T.BoxGeometry(.154,.018,.070),white,0,.048,.145,ft);
   for(let z=-.02;z<=.12;z+=.035){let lace=A(new T.BoxGeometry(.11,.008,.010),white,0,.056,z,ft);lace.rotation.y=(z*8)%2?.08:-.08}
 }
 // Eye highlights and subtle lower lid.
 for(const sx of[-1,1]){
   A(new T.SphereGeometry(.0038,8,6),white,sx*.045,.050,.168,head);
   let lid=A(new T.BoxGeometry(.050,.005,.006),P(new T.Color(skinC).multiplyScalar(.84),.55),sx*.050,.026,.159,head);lid.rotation.z=-sx*.025;
 }
 // ear inner detail
 for(const sx of[-1,1]){
   let ear=A(new T.TorusGeometry(.012,.0035,5,12,Math.PI*1.5),P(new T.Color(skinC).multiplyScalar(.82),.55),sx*.143,.006,.006,head);ear.rotation.y=Math.PI/2;ear.rotation.z=sx*.4;
 }
 // Hair breakup: small locks along the crown, tied to chosen hair color.
 if(!mobile){
   for(let i=0;i<9;i++){
     const a=(i/9)*Math.PI*2,x=Math.cos(a)*.105,z=Math.sin(a)*.095;
     let lock=A(new T.ConeGeometry(.020,.10,7),hair,x,.151+(i%3)*.008,z-.005,head);lock.rotation.z=Math.cos(a)*.22;lock.rotation.x=Math.sin(a)*.18;
   }
 }
 // subtle fabric wrinkles on torso
 if(!mobile){
   for(const [y,w] of[[1.22,.20],[1.34,.24],[1.46,.18]]){
     let wr=A(new T.TorusGeometry(w,.0055,5,18,Math.PI*.58),shirtDark,0,y,.152);wr.rotation.z=Math.PI*.21;wr.scale.y=.20;
   }
 }
 // small clothing badge, original LC mark
 const cv=document.createElement('canvas');cv.width=128;cv.height=128;const x=cv.getContext('2d');x.fillStyle='#18222b';x.fillRect(0,0,128,128);x.fillStyle='#e6b64e';x.font='900 64px Arial';x.textAlign='center';x.textBaseline='middle';x.fillText('LC',64,68);let tx=new T.CanvasTexture(cv);tx.colorSpace=T.SRGBColorSpace;
 A(new T.PlaneGeometry(.075,.075),new T.MeshBasicMaterial({map:tx,toneMapped:false}),.14,1.49,.160);
 window.LuxPlayerDetail1000={version:'10.0.0',player:p}
}
