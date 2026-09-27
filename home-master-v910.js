(()=>{let q=setInterval(()=>{let W=window.LuxWorld,H=window.LuxHomes520,I=window.LuxHomeInterior800||window.LuxHomeInterior782||window.LuxHomeInterior771||window.LuxHomeInterior760;if(!W?.player||!W?.camera||!W.registerTick||!H?.enter||!H?.leave||!I?.root||!I?.isBlocked)return;clearInterval(q);init(W,H,I)},25);
function init(W,H,I){
 const C={x:-430,z:430},sizes={studio:[12,9],flat:[12,9],family:[18,12]};
 const outsideHit=W.hit;let insideHit=null,lastSafe=null,lastHome=null,transitioning=false;
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 function homeId(){let v=I.activeId||H.currentHomeId||window.LuxCivic404?.state?.home?.id||'flat';return sizes[v]?v:'flat'}
 function spawn(id=homeId()){let d=(sizes[id]||sizes.flat)[1];return{x:C.x,z:C.z-(d/2-1.42)}}
 function centerBlocked(x,z,id=homeId()){let [w,d]=sizes[id]||sizes.flat,lx=x-C.x,lz=z-C.z;if(Math.abs(lx)>w/2-.42||Math.abs(lz)>d/2-.42)return true;return !!I.isBlocked(x,z)}
 function bodyBlocked(x,z,id=homeId()){
   if(centerBlocked(x,z,id))return true;
   let r=.27,k=.19;
   for(const [ox,oz] of [[r,0],[-r,0],[0,r],[0,-r],[k,k],[k,-k],[-k,k],[-k,-k]])if(centerBlocked(x+ox,z+oz,id))return true;
   return false
 }
 function segmentBlocked(ax,az,bx,bz,id=homeId()){
   let d=Math.hypot(bx-ax,bz-az),n=Math.max(1,Math.ceil(d/.025));
   for(let i=1;i<=n;i++){let t=i/n;if(bodyBlocked(ax+(bx-ax)*t,az+(bz-az)*t,id))return true}
   return false
 }
 function installHit(){insideHit=(x,z)=>H.inside?bodyBlocked(x,z):outsideHit(x,z);W.hit=insideHit}
 function putSafe(id=homeId()){
   let p=W.player.position,s=spawn(id);
   if(!Number.isFinite(p.x)||!Number.isFinite(p.z)||bodyBlocked(p.x,p.z,id))p.set(s.x,0,s.z);
   if(bodyBlocked(p.x,p.z,id))p.set(C.x,0,C.z);
   p.y=0;lastSafe={x:p.x,z:p.z};lastHome=id
 }
 function cameraInside(){
   let p=W.player.position,y=W.yaw||0,pitch=clamp(W.pitch||0,-.42,.24),fx=Math.sin(y),fz=Math.cos(y),rx=Math.cos(y),rz=-Math.sin(y);
   let chosen={x:p.x,z:p.z},max=.44;
   for(let d=max;d>=.06;d-=.04){
     let x=p.x-fx*d+rx*.05,z=p.z-fz*d+rz*.05;
     if(!segmentBlocked(p.x,p.z,x,z)){chosen={x,z};break}
   }
   W.camera.position.set(chosen.x,1.64,chosen.z);
   W.camera.lookAt(p.x+fx*1.30,1.43+pitch*1.6,p.z+fz*1.30)
 }
 function forceInside(id=homeId()){
   if(!H.inside)return false;
   if(!I.activeId)I.sync?.();
   id=homeId();
   I.root.visible=true;W.player.visible=true;
   if(lastHome!==id||!lastSafe)putSafe(id);
   installHit();cameraInside();
   document.body.classList.add('game-ready','lux-home-v814-inside');
   let g=document.getElementById('game');if(g)g.style.visibility='visible';
   return true
 }
 const oldEnter=H.enter.bind(H),oldLeave=H.leave.bind(H);
 H.enter=function(id,view=false){
   if(transitioning)return;
   transitioning=true;
   let r=oldEnter(id,view);
   lastSafe=null;lastHome=null;
   W.yaw=0;W.pitch=-.04;
   forceInside(id);
   requestAnimationFrame(()=>{forceInside(id);requestAnimationFrame(()=>{forceInside(id);transitioning=false})});
   return r
 };
 H.leave=function(){
   transitioning=true;
   let r=oldLeave();
   lastSafe=null;lastHome=null;W.hit=outsideHit;
   document.body.classList.remove('lux-home-v814-inside');
   requestAnimationFrame(()=>{transitioning=false});
   return r
 };
 installHit();
 W.registerTick(()=>{
   if(!H.inside){
     if(W.hit===insideHit)W.hit=outsideHit;
     lastSafe=null;lastHome=null;
     document.body.classList.remove('lux-home-v814-inside');
     return
   }
   if(!I.activeId)I.sync?.();
   if(!H.inside||!I.activeId)return;
   let id=homeId(),p=W.player.position;
   I.root.visible=true;W.player.visible=true;
   if(W.hit!==insideHit)W.hit=insideHit;
   if(lastHome!==id||!lastSafe){putSafe(id)}
   else if(!Number.isFinite(p.x)||!Number.isFinite(p.z)||bodyBlocked(p.x,p.z,id)||segmentBlocked(lastSafe.x,lastSafe.z,p.x,p.z,id)){
     p.set(lastSafe.x,0,lastSafe.z)
   }else{
     lastSafe={x:p.x,z:p.z};p.y=0
   }
   cameraInside();
   let g=document.getElementById('game');if(g&&g.style.visibility==='hidden')g.style.visibility='visible';
   document.body.classList.add('lux-home-v814-inside')
 });
 if(H.inside)setTimeout(()=>forceInside(homeId()),40);
 window.LuxHomeMaster900=window.LuxHomeMaster910={forceInside,bodyBlocked,segmentBlocked,get active(){return!!H.inside},get safe(){return lastSafe}}
}})();