(()=>{let q=setInterval(()=>{let W=window.LuxWorld,H=window.LuxHomes520,I=window.LuxHomeInterior800||window.LuxHomeInterior782||window.LuxHomeInterior771||window.LuxHomeInterior760;if(!W?.player||!W?.camera||!W.registerTick||!H?.enter||!H?.leave||!I?.root||!I?.isBlocked)return;clearInterval(q);init(W,H,I)},25);
function init(W,H,I){
 const C={x:-430,z:430},sizes={studio:[12,9],flat:[12,9],family:[18,12]};
 const outsideHit=W.hit;let insideHit=null,lastSafe=null,lastId=null,transitioning=false;
 function id(){let v=I.activeId||H.currentHomeId||window.LuxCivic404?.state?.home?.id||'flat';return sizes[v]?v:'flat'}
 function spawn(homeId=id()){let d=(sizes[homeId]||sizes.flat)[1];return{x:C.x,z:C.z-(d/2-2.20)}}
 function outerBlocked(x,z,homeId=id()){let [w,d]=sizes[homeId]||sizes.flat,lx=x-C.x,lz=z-C.z;return Math.abs(lx)>w/2-.48||Math.abs(lz)>d/2-.48}
 function pointBlocked(x,z){return outerBlocked(x,z)||!!I.isBlocked(x,z)}
 function bodyBlocked(x,z){
   if(pointBlocked(x,z))return true;
   let r=.31,k=.22;
   for(const [ox,oz] of [[r,0],[-r,0],[0,r],[0,-r],[k,k],[k,-k],[-k,k],[-k,-k]])if(pointBlocked(x+ox,z+oz))return true;
   return false
 }
 function cameraBlocked(x,z){
   if(outerBlocked(x,z))return true;
   let r=.14;
   for(const [ox,oz] of [[0,0],[r,0],[-r,0],[0,r],[0,-r]])if(pointBlocked(x+ox,z+oz))return true;
   return false
 }
 function makeHit(){
   insideHit=(x,z)=>H.inside?bodyBlocked(x,z):outsideHit(x,z);
   W.hit=insideHit;
 }
 function forcePlayer(homeId=id()){
   let p=W.player.position,s=spawn(homeId);
   if(!Number.isFinite(p.x)||!Number.isFinite(p.z)||outerBlocked(p.x,p.z,homeId)||bodyBlocked(p.x,p.z))p.set(s.x,0,s.z);
   p.y=0;
   if(bodyBlocked(p.x,p.z)){p.set(s.x,0,s.z)}
   lastSafe={x:p.x,z:p.z}
 }
 function cameraPose(){
   let p=W.player.position,y=W.yaw||0,fx=Math.sin(y),fz=Math.cos(y),rx=Math.cos(y),rz=-Math.sin(y);
   let preferred=.88,side=.06,cx=p.x-fx*.36+rx*side,cz=p.z-fz*.36+rz*side;
   for(let d=preferred;d>=.34;d-=.06){
     let tx=p.x-fx*d+rx*side,tz=p.z-fz*d+rz*side;
     if(!cameraBlocked(tx,tz)){cx=tx;cz=tz;break}
   }
   W.camera.position.set(cx,1.61,cz);
   W.camera.lookAt(p.x+fx*1.35,1.38,p.z+fz*1.35);
 }
 function forceInside(homeId=id()){
   if(!H.inside)return false;
   if(!I.activeId)I.sync?.();
   homeId=id();
   if(I.root)I.root.visible=true;
   W.player.visible=true;
   W.yaw=0;
   forcePlayer(homeId);
   makeHit();
   cameraPose();
   document.body.classList.add('game-ready','lux-home-master-inside');
   let canvas=document.getElementById('game');if(canvas)canvas.style.visibility='visible';
   return true
 }
 const oldEnter=H.enter.bind(H),oldLeave=H.leave.bind(H);
 H.enter=function(homeId,view=false){
   if(transitioning)return;
   transitioning=true;
   let r=oldEnter(homeId,view);
   forceInside(homeId);
   window.LuxHomeCamera800?.reset?.();
   requestAnimationFrame(()=>{forceInside(homeId);requestAnimationFrame(()=>{forceInside(homeId);transitioning=false})});
   return r
 };
 H.leave=function(){
   transitioning=true;
   let r=oldLeave();
   document.body.classList.remove('lux-home-master-inside');
   lastSafe=null;lastId=null;W.hit=outsideHit;
   requestAnimationFrame(()=>{transitioning=false});
   return r
 };
 makeHit();
 W.registerTick(()=>{
   if(!H.inside){
     if(W.hit===insideHit)W.hit=outsideHit;
     lastSafe=null;lastId=null;return
   }
   let homeId=id();
   if(!I.activeId)I.sync?.();
   if(!H.inside)return;
   if(lastId!==homeId){lastId=homeId;forcePlayer(homeId)}
   if(W.hit!==insideHit)W.hit=insideHit;
   let p=W.player.position;
   if(!Number.isFinite(p.x)||!Number.isFinite(p.z)||outerBlocked(p.x,p.z,homeId)||bodyBlocked(p.x,p.z)){
     let s=lastSafe||spawn(homeId);p.set(s.x,0,s.z)
   }else{
     lastSafe={x:p.x,z:p.z};p.y=0
   }
   if(I.root&&!I.root.visible)I.root.visible=true;
   W.player.visible=true;
   cameraPose();
   let canvas=document.getElementById('game');if(canvas&&canvas.style.visibility==='hidden')canvas.style.visibility='visible';
   document.body.classList.add('lux-home-master-inside')
 });
 if(H.inside)setTimeout(()=>forceInside(id()),60);
 window.LuxHomeMaster900=window.LuxHomeMaster910={version:'9.1.0',forceInside,bodyBlocked,cameraBlocked,get active(){return!!H.inside},get safe(){return lastSafe}}
}})();