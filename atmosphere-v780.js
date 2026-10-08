import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{if(!window.LuxWorld?.scene||!window.LuxLife||!(window.LuxWeather770||window.LuxWeather560))return;clearInterval(q);init()},260);
function init(){
 const W=LuxWorld,S=W.scene,L=LuxLife,weather=window.LuxWeather770||window.LuxWeather560,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 const old=S.getObjectByName('LuxAtmosphere780');if(old)S.remove(old);
 const root=new T.Group();root.name='LuxAtmosphere780';S.add(root);

 const starCount=mobile?90:220,starPos=new Float32Array(starCount*3);
 for(let i=0;i<starCount;i++){let a=Math.random()*Math.PI*2,r=220+Math.random()*230,h=75+Math.random()*160;starPos[i*3]=Math.sin(a)*r;starPos[i*3+1]=h;starPos[i*3+2]=Math.cos(a)*r}
 const starGeo=new T.BufferGeometry();starGeo.setAttribute('position',new T.BufferAttribute(starPos,3));
 const starMat=new T.PointsMaterial({color:0xeef4ff,size:mobile?.75:1.05,transparent:true,opacity:0,depthWrite:false,sizeAttenuation:true});
 const stars=new T.Points(starGeo,starMat);root.add(stars);

 const haloCanvas=document.createElement('canvas');haloCanvas.width=haloCanvas.height=128;const hx=haloCanvas.getContext('2d'),hg=hx.createRadialGradient(64,64,3,64,64,62);
 hg.addColorStop(0,'rgba(255,229,174,.88)');hg.addColorStop(.18,'rgba(255,207,124,.34)');hg.addColorStop(1,'rgba(255,188,90,0)');hx.fillStyle=hg;hx.fillRect(0,0,128,128);
 const haloTex=new T.CanvasTexture(haloCanvas),haloMat=new T.SpriteMaterial({map:haloTex,transparent:true,opacity:0,depthWrite:false,blending:T.AdditiveBlending}),halos=[];
 const lampSpots=[];
 for(let z=-210;z<=210;z+=70){lampSpots.push([-15,4.6,z],[15,4.6,z])}
 for(const [x,y,z] of lampSpots.slice(0,mobile?8:lampSpots.length)){let sp=new T.Sprite(haloMat.clone());sp.position.set(x,y,z);sp.scale.set(4.2,4.2,1);root.add(sp);halos.push(sp)}

 const wetMat=new T.MeshPhysicalMaterial({color:0x8fa6b3,roughness:.08,metalness:.10,transparent:true,opacity:0,clearcoat:1,clearcoatRoughness:.05,depthWrite:false});
 const wetStrips=[];
 for(const rd of W.roads||[]){
   const p=rd?.mesh?.geometry?.parameters||{},w=p.width||10,l=p.depth||40;if(l<20)continue;
   let m=new T.Mesh(new T.PlaneGeometry(Math.max(1,w*.42),Math.max(5,l-.8)),wetMat.clone());m.rotation.x=-Math.PI/2;m.position.copy(rd.mesh.position);m.position.y=.137;m.rotation.z=-(rd.mesh.rotation?.y||0);m.visible=false;root.add(m);wetStrips.push(m)
 }

 const rippleMat=new T.MeshBasicMaterial({color:0xaed0df,transparent:true,opacity:0,depthWrite:false,side:T.DoubleSide}),ripples=[];
 const rippleCount=mobile?6:14;
 for(let i=0;i<rippleCount;i++){let r=new T.Mesh(new T.RingGeometry(.12,.15,20),rippleMat.clone());r.rotation.x=-Math.PI/2;r.visible=false;root.add(r);r.userData.phase=Math.random()*1.5;r.userData.life=Math.random()*1.2;ripples.push(r)}
 function respawnRipple(r){let a=Math.random()*Math.PI*2,d=3+Math.random()*15;r.position.set(W.player.position.x+Math.sin(a)*d,.154,W.player.position.z+Math.cos(a)*d);r.scale.setScalar(.7);r.userData.life=0;r.visible=true}

 const hazeMat=new T.MeshBasicMaterial({color:0x8396a1,transparent:true,opacity:0,depthWrite:false,side:T.DoubleSide});
 const haze=new T.Mesh(new T.CylinderGeometry(330,420,42,48,1,true),hazeMat);haze.position.y=18;root.add(haze);

 W.registerTick?.((dt)=>{
   const h=(+L.state.hour||0)+(+L.state.minute||0)/60,night=(h>=20||h<5.5),twilight=(h>=18.4&&h<20)||(h>=5.5&&h<7.0),rain=weather.state==='rain',fog=weather.state==='fog',snow=weather.state==='snow',cloudy=weather.state==='cloudy';
   const starTarget=night&&!rain&&!fog&&!cloudy?.80:twilight?.18:0;starMat.opacity+=(starTarget-starMat.opacity)*Math.min(1,dt*1.8);
   const haloTarget=night?1:twilight?.45:.02;for(const s of halos)s.material.opacity+=(haloTarget-s.material.opacity)*Math.min(1,dt*2.2);
   for(const m of wetStrips){m.visible=rain;m.material.opacity+=( (rain?(night?.21:.12):0)-m.material.opacity)*Math.min(1,dt*2.6)}
   if(rain){for(const r of ripples){if(!r.visible)respawnRipple(r);r.userData.life+=dt;let t=r.userData.life%1.35,s=.7+t*1.7;r.scale.setScalar(s);r.material.opacity=Math.max(0,.38*(1-t/1.35));if(r.userData.life>1.35)respawnRipple(r)}}else for(const r of ripples){r.material.opacity+=(0-r.material.opacity)*Math.min(1,dt*5);if(r.material.opacity<.01)r.visible=false}
   let hazeTarget=fog?.34:rain?.16:snow?.12:cloudy?.07:.025;hazeMat.opacity+=(hazeTarget-hazeMat.opacity)*Math.min(1,dt*1.4);haze.position.x=W.player.position.x;haze.position.z=W.player.position.z;
 });
 window.LuxAtmosphere780={version:'7.8.0',root,stars,halos,wetStrips,ripples}
}
