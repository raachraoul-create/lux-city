(()=>{let q=setInterval(()=>{if(!window.LuxWorld?.player||!window.LuxWorld?.camera)return;clearInterval(q);const W=LuxWorld;let safePlayer={x:W.player.position.x,z:W.player.position.z},repairs=0,lastCheck=performance.now();
function finite(v){return Number.isFinite(v?.x)&&Number.isFinite(v?.y)&&Number.isFinite(v?.z)}
function clearKeys(){for(let k of Object.keys(W.keys||{}))W.keys[k]=0}
addEventListener('blur',clearKeys);document.addEventListener('visibilitychange',()=>{if(document.hidden)clearKeys()});
W.registerTick(()=>{let pc=window.LuxPlayerCar740||window.LuxPlayerCar720;if(finite(W.player.position)&&Math.abs(W.player.position.x)<950&&Math.abs(W.player.position.z)<950){if(!pc?.driving)safePlayer={x:W.player.position.x,z:W.player.position.z}}else{W.player.position.set(safePlayer.x,0,safePlayer.z);repairs++}
if(!finite(W.camera.position)){W.camera.position.set(safePlayer.x,3,safePlayer.z+5);W.camera.lookAt(safePlayer.x,1.4,safePlayer.z);repairs++}
if(pc?.car&&!finite(pc.car.position)){if(!pc.restoreParked?.())pc.setPose?.(safePlayer.x+3,safePlayer.z,0);repairs++}
if(pc&&!pc.driving&&W.player.visible===false&&!window.LuxInteriors530?.inside)W.player.visible=true;
let now=performance.now();if(now-lastCheck>5000){lastCheck=now;let p=window.LuxPerformance740;if(p&&p.lastFps>0&&p.lastFps<24&&p.quality!=='low')p.apply('low')}});window.LuxRuntimeGuard740={get repairs(){return repairs},clearKeys}},280)})();