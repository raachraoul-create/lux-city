(()=>{
let q=setInterval(()=>{let W=window.LuxWorld;if(!W?.scene||!W?.onRoad)return;clearInterval(q);init(W)},900);
function init(W){
 let hidden=0;
 function clearLegacyTrees(){
   const roots=[W.scene.getObjectByName('LuxGraphics950')||W.scene.getObjectByName('LuxGraphics940'),W.scene.getObjectByName('LuxNature830')];
   for(const root of roots){if(!root)continue;for(const c of root.children||[]){if(!c?.position)continue;let name=String(c.name||'');if(name&&/road|street|ring|sky|hill/i.test(name))continue}}
   for(const d of window.LuxWorldRealism730?.details||window.LuxWorldRealism720?.details||[]){if(!d?.position)continue;if(W.onRoad(d.position.x,d.position.z,3)&&d.children?.some(o=>o.geometry?.type==='SphereGeometry')){d.visible=false;hidden++}}
 }
 setTimeout(clearLegacyTrees,600);setTimeout(clearLegacyTrees,2600);
 window.LuxPlacementGuard1190={version:'11.9.0',get hidden(){return hidden},run:clearLegacyTrees}
}
})();