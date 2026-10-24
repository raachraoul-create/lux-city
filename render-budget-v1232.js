// Keep local lights out of every material shader when they cannot affect the view.
export function installRenderBudget(W){
 const R=W.renderer,original=R.render,position=new W.THREE.Vector3();
 const stats={localLights:0,activeLights:0};
 R.render=function(scene,camera){
  const local=[],candidates=[],eye=camera.position;
  scene.traverseVisible(o=>{
   if(!o.isPointLight&&!o.isSpotLight)return;
   local.push(o);
   if(o.intensity<=0)return;
   o.getWorldPosition(position);
   const dx=position.x-eye.x,dy=position.y-eye.y,dz=position.z-eye.z,d2=dx*dx+dy*dy+dz*dz;
   // Retain light sources that can illuminate nearby geometry, even behind the camera.
   const reach=o.distance>0?o.distance+32:100;
   if(d2<=reach*reach)candidates.push({light:o,score:d2/(o.isSpotLight?2:1)});
  });
  candidates.sort((a,b)=>a.score-b.score);
  const limit=window.LuxSmooth1080?.quality==='low'?6:8;
  for(const light of local)light.visible=false;
  for(const item of candidates.slice(0,limit))item.light.visible=true;
  stats.localLights=local.length;stats.activeLights=Math.min(limit,candidates.length);
  try{return original.call(this,scene,camera)}finally{for(const light of local)light.visible=true}
 };
 window.LuxRenderBudget1232=stats;
}
