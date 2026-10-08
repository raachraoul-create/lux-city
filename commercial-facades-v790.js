import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{if(!window.LuxWorld?.scene||!window.LuxCityServices?.buildings||!window.LuxLife)return;clearInterval(q);init()},350);
function init(){
 const W=LuxWorld,S=W.scene,L=LuxLife,O=window.LuxOpeningHours500,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 const old=S.getObjectByName('LuxCommercial790');if(old)S.remove(old);
 const root=new T.Group();root.name='LuxCommercial790';S.add(root);
 const M=(c,r=.72,m=.04,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const A=(g,m,x,y,z,p)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=!mobile;o.receiveShadow=true;p.add(o);return o};
 const glass=new T.MeshPhysicalMaterial({color:0x789baa,roughness:.10,metalness:.08,transparent:true,opacity:.72,transmission:mobile?0:.06,clearcoat:.32});
 const metal=M(0x444b4f,.38,.46),stone=M(0xbab4a8,.88),wood=M(0x6f4e38,.80),warmMats=[],signs=[];
 function textTex(text,bg,fg='#fff'){let c=document.createElement('canvas');c.width=768;c.height=180;let x=c.getContext('2d');x.fillStyle=bg;x.fillRect(0,0,c.width,c.height);x.fillStyle=fg;x.font='900 64px Arial';x.textAlign='center';x.textBaseline='middle';x.fillText(text,c.width/2,c.height/2);let t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t}
 function sign(g,text,bg,y,z,w=6.4){let mat=new T.MeshBasicMaterial({map:textTex(text,bg),transparent:false,toneMapped:false});let p=A(new T.PlaneGeometry(w,1.35),mat,0,y,z,g);signs.push({id:g.userData.placeId,mesh:p,mat});return p}
 function windowGlow(g,x,y,z,w,h){let wm=M(0xf6d48d,.32,.02,0xffbd62,0);warmMats.push(wm);A(new T.BoxGeometry(w,h,.025),wm,x,y,z,g);A(new T.BoxGeometry(w+.10,h+.10,.04),glass,x,y,z+.035,g)}
 function table(g,x,z){A(new T.CylinderGeometry(.42,.42,.05,18),wood,x,.72,z,g);A(new T.CylinderGeometry(.045,.065,.70,10),metal,x,.35,z,g);for(const sx of[-.70,.70]){A(new T.BoxGeometry(.45,.08,.45),wood,x+sx,.47,z,g);A(new T.BoxGeometry(.06,.45,.06),metal,x+sx,.23,z,g)}}
 for(const d of LuxCityServices.buildings){
   if(['police','fire','rescue','hospital'].includes(d.id))continue;
   const g=new T.Group();g.userData.placeId=d.id;g.position.set(d.x,0,d.z);root.add(g);const front=d.l/2+.40;
   if(d.id==='bakery'){
     sign(g,'BÄCKEREI','#7b2f29',d.h-1.10,front+.14,6.8);
     for(const x of[-3.1,3.1])windowGlow(g,x,1.65,front+.08,3.0,2.35);
     const aw=A(new T.BoxGeometry(7.6,.14,1.55),M(0x8d3b33,.60,.08),0,3.35,front+.72,g);aw.rotation.x=-.08;
     for(let x=-3.2;x<=3.2;x+=1.05)A(new T.BoxGeometry(.52,.04,1.48),M((Math.round(x*10)%2)?0xe7ddd0:0x8d3b33,.75),x,3.30,front+.75,g).rotation.x=-.08;
     if(!mobile){for(const x of[-2.3,0,2.3])A(new T.BoxGeometry(1.55,.18,.48),M(0xb58a5f,.76),x,.75,front+.55,g)}
   }else if(d.id==='cafe'){
     sign(g,'CAFÉ LUX','#315843',d.h-1.08,front+.14,6.2);
     for(const x of[-3.3,0,3.3])windowGlow(g,x,1.75,front+.08,2.35,2.45);
     for(const x of[-3.0,0,3.0])table(g,x,front+3.25);
     if(!mobile){for(const x of[-3.0,0,3.0]){let pole=A(new T.CylinderGeometry(.035,.045,2.0,8),metal,x,1.45,front+3.25,g);let umb=A(new T.ConeGeometry(1.15,.48,18),M(0x315843,.72),x,2.48,front+3.25,g);umb.rotation.y=.12}}
   }else if(d.id==='pub'){
     sign(g,'LUX TAVERN','#44322d',d.h-1.05,front+.14,6.6);
     for(const x of[-3.25,3.25])windowGlow(g,x,1.72,front+.08,2.8,2.4);
     for(const x of[-2.0,2.0]){let lm=M(0xffc46f,.30,.03,0xffa33b,0);warmMats.push(lm);A(new T.BoxGeometry(.22,.48,.20),lm,x,2.82,front+.33,g)}
     A(new T.BoxGeometry(6.7,.22,.36),wood,0,.42,front+1.22,g);for(let x=-2.8;x<=2.8;x+=1.4)A(new T.BoxGeometry(.10,.74,.10),wood,x,.37,front+1.22,g)
   }else if(d.id==='post'){
     sign(g,'POST & LOGISTIK','#b58b16',d.h-1.12,front+.14,8.8,'#151515');
     for(const x of[-d.w*.28,d.w*.28])windowGlow(g,x,4.8,front+.08,2.6,1.45);
     const stripe=M(0xe3b72e,.66,.05);for(let x=-d.w*.32;x<=d.w*.32;x+=1.15)A(new T.BoxGeometry(.55,.10,.14),stripe,x,.36,front+.66,g);
     for(const x of[-4.8,0,4.8]){A(new T.BoxGeometry(2.0,.24,1.25),M(0x8d7240,.86),x,.16,front+2.1,g);A(new T.BoxGeometry(1.8,.74,1.05),M(0x9b7844,.90),x,.65,front+2.1,g)}
   }else if(d.factory){
     sign(g,d.id==='mill'?'MÜHLE':d.id==='sugar'?'ZUCKERWERK':'GETRÄNKEWERK','#46515a',d.h-1.0,front+.14,Math.min(11,d.w*.58));
     for(const x of[-d.w*.30,0,d.w*.30]){A(new T.CylinderGeometry(.11,.14,3.6,10),metal,x,1.8,front+.36,g);A(new T.BoxGeometry(1.8,.16,.72),stone,x,.10,front+1.28,g)}
     if(!mobile){for(let x=-d.w*.32;x<=d.w*.32;x+=3.2){let crate=A(new T.BoxGeometry(1.8,.85,1.0),M(0x8b6946,.88),x,.44,front+2.15,g);crate.rotation.y=(x%2)*.02}}
   }else continue;
   A(new T.BoxGeometry(Math.min(d.w*.72,11),.07,2.1),stone,0,.05,front+1.0,g);
 }
 W.registerTick?.((dt)=>{
   const h=(+L.state.hour||0)+(+L.state.minute||0)/60,night=h>=19.3||h<6.3,dusk=(h>=18&&h<19.3)||(h>=6.3&&h<7.3);
   for(const m of warmMats)m.emissiveIntensity+=( (night?.95:dusk?.38:0)-m.emissiveIntensity)*Math.min(1,dt*2.2);
   for(const s of signs){let open=O?.openAt?.(s.id,h)??true;s.mat.opacity+=( ((night||dusk)?(open?1:.55):1)-s.mat.opacity)*Math.min(1,dt*3)}
 });
 window.LuxCommercial790={version:'7.9.0',root,signs,warmMats}
}
