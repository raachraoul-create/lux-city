import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{let W=window.LuxWorld,H=window.LuxHomes520,I=window.LuxHomeInterior800||window.LuxHomeInterior782||window.LuxHomeInterior760;if(!W?.scene||!H||!I)return;clearInterval(q);init(W,H,I)},380);
function init(W,H,I){
 const S=W.scene,C={x:-430,z:430},sizes={studio:[12,9],flat:[12,9],family:[18,12]},mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 const root=new T.Group();root.name='LuxHomeDecor850';root.position.set(C.x,0,C.z);root.visible=false;S.add(root);
 const M=(c,r=.72,m=.03,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const A=(g,m,x,y,z,p=root)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=!mobile;o.receiveShadow=true;p.add(o);return o};
 const wood=M(0x795943,.82),ceramic=M(0xe8e4dc,.60),metal=M(0x777f83,.28,.55),green=M(0x4d7345,.92),soft=[M(0xa87a61,.88),M(0x667c83,.88),M(0x8c745d,.88)],warm=[],pictures=[];
 let builtFor=null;
 function clear(){while(root.children.length){let o=root.children.pop();o.traverse?.(x=>{x.geometry?.dispose?.();if(Array.isArray(x.material))x.material.forEach(m=>m.dispose?.());else x.material?.dispose?.()})}warm.length=0;pictures.length=0}
 function pictureTex(seed=0){
   let c=document.createElement('canvas');c.width=360;c.height=240;let x=c.getContext('2d');let g=x.createLinearGradient(0,0,360,240);g.addColorStop(0,['#6d8291','#9a7861','#617a62'][seed%3]);g.addColorStop(1,['#c1a875','#7a8f96','#a68a66'][seed%3]);x.fillStyle=g;x.fillRect(0,0,360,240);x.fillStyle='rgba(255,255,255,.20)';x.beginPath();x.moveTo(0,190);x.lineTo(85,105);x.lineTo(145,170);x.lineTo(235,75);x.lineTo(360,190);x.lineTo(360,240);x.lineTo(0,240);x.fill();let t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t
 }
 function lamp(x,z){
   A(new T.CylinderGeometry(.10,.13,.55,14),metal,x,.42,z);let shade=A(new T.ConeGeometry(.28,.40,20,1,true),M(0xd8c8aa,.80),x,.88,z);shade.rotation.y=.15;
   let lm=M(0xffdfaa,.30,.02,0xffb84d,0);warm.push(lm);A(new T.SphereGeometry(.055,10,8),lm,x,.75,z);if(!mobile){let l=new T.PointLight(0xffd7a1,.18,4.2,2);l.position.set(x,.84,z);root.add(l);warm.push(l)}
 }
 function plant(x,z,s=.75){A(new T.CylinderGeometry(.15,.20,.28,10),M(0x9a6b4f,.82),x,.14,z);for(let a=0;a<Math.PI*2;a+=Math.PI/3){let leaf=A(new T.SphereGeometry(.16,8,6),green,x+Math.cos(a)*.12,.46+s*.12,z+Math.sin(a)*.12);leaf.scale.set(.48,1.4,.38);leaf.rotation.z=Math.cos(a)*.5}}
 function build(id){
   clear();builtFor=id;let [w,d]=sizes[id]||sizes.flat,sofaX=id==='family'?-w*.20:w*.23,sofaZ=-d*.03,kitchenZ=-d/2+.72,kx=-w*.25,bedX=id==='family'?-w*.29:-w*.28,bedZ=d*.31,bathX=w/2-1.25,bathZ=d*.31;
   // Sofa cushions and coffee-table details.
   for(const [i,dx] of[[-1,-.72],[0,0],[1,.72]]){let c=A(new T.BoxGeometry(.54,.24,.18),soft[(i+3)%soft.length],sofaX+dx,.78,sofaZ+.50);c.rotation.z=i*.05}
   A(new T.CylinderGeometry(.16,.16,.06,18),ceramic,sofaX-.35,.58,sofaZ-1.18);A(new T.TorusGeometry(.065,.012,7,14),ceramic,sofaX-.18,.60,sofaZ-1.18).rotation.y=Math.PI/2;
   A(new T.BoxGeometry(.42,.055,.62),M(0x354257,.78),sofaX+.42,.58,sofaZ-1.16);
   // Kitchen: cutting board, fruit, jars and open shelf.
   A(new T.BoxGeometry(.62,.035,.38),wood,kx-.10,1.045,kitchenZ+.02);
   for(const [i,x] of[-.25,0,.25].entries()){let f=A(new T.SphereGeometry(.075,10,8),M([0xbc4d43,0xd29b38,0x7b9a4b][i],.68),kx-.1+x,1.13,kitchenZ+.02);f.scale.y=.86}
   A(new T.BoxGeometry(2.20,.07,.28),wood,kx,1.62,kitchenZ+.28);for(const x of[-.72,0,.72]){A(new T.CylinderGeometry(.09,.09,.22,12),ceramic,kx+x,1.77,kitchenZ+.27);A(new T.CylinderGeometry(.10,.10,.035,12),metal,kx+x,1.90,kitchenZ+.27)}
   // Bedroom: bedside lights and framed art.
   lamp(bedX-1.55,bedZ+.58);lamp(bedX+1.55,bedZ+.58);
   for(let i=0;i<2;i++){let frame=A(new T.BoxGeometry(1.18,.82,.05),wood,bedX+(i? .72:-.72),1.82,d/2-.24);let pic=A(new T.PlaneGeometry(1.02,.66),new T.MeshBasicMaterial({map:pictureTex(i),toneMapped:false}),bedX+(i?.72:-.72),1.82,d/2-.205);pictures.push(pic)}
   // Living wall art.
   let pf=A(new T.BoxGeometry(1.95,1.18,.055),wood,sofaX,1.72,d/2-.24);let pp=A(new T.PlaneGeometry(1.76,.99),new T.MeshBasicMaterial({map:pictureTex(2),toneMapped:false}),sofaX,1.72,d/2-.205);pictures.push(pp);
   // Bathroom mirror and towel rail.
   A(new T.BoxGeometry(1.14,1.40,.055),metal,bathX,1.58,d/2-.25);A(new T.BoxGeometry(1.00,1.25,.025),M(0xa7c4ce,.10,.22),bathX,1.58,d/2-.215);
   A(new T.BoxGeometry(.85,.045,.045),metal,bathX-.65,1.08,bathZ+.72);A(new T.BoxGeometry(.66,.48,.035),M(0x8ca1a5,.90),bathX-.65,.82,bathZ+.72);
   // Hall / dining decor.
   plant(w*.38,-d*.22,.7);if(id==='family'){A(new T.BoxGeometry(2.4,.12,1.1),wood,w*.12,.72,-d*.17);for(const sx of[-1,1])for(const sz of[-1,1])A(new T.BoxGeometry(.42,.08,.42),soft[(sx+sz+4)%soft.length],w*.12+sx*1.45,.48,-d*.17+sz*.68)}
   if(!mobile){for(const [x,z] of[[-w*.42,-d*.36],[w*.42,-d*.36]])plant(x,z,.6)}
 }
 function sync(){
   let id=I.activeId||null,inside=!!H.inside&&!!id;root.visible=inside;
   if(inside&&id!==builtFor)build(id);
   if(!inside)builtFor=null;
 }
 setInterval(sync,100);W.registerTick?.((dt)=>{if(!root.visible)return;let h=(window.LuxLife?.state?.hour??12)+(window.LuxLife?.state?.minute??0)/60,night=h>=19||h<7;for(const m of warm){if(m?.isLight)m.intensity+=( (night?.24:.10)-m.intensity)*Math.min(1,dt*2);else if('emissiveIntensity'in m)m.emissiveIntensity+=( (night?.72:.22)-m.emissiveIntensity)*Math.min(1,dt*2.2)}});
 window.LuxHomeDecor850={version:'8.5.0',root,rebuild:()=>{if(I.activeId)build(I.activeId)}}
}
