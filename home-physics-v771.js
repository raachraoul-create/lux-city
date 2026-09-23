(()=>{let q=setInterval(()=>{let W=window.LuxWorld,H=window.LuxHomes520,I=window.LuxHomeInterior771||window.LuxHomeInterior760;if(!W?.player||!H||!I?.isBlocked)return;clearInterval(q);let safe=null,lastHome=null,repairs=0,baseHit=W.hit;
function inside(){return !!H.inside&&!!I.activeId}
function blocked(x,z){return inside()?I.isBlocked(x,z):baseHit(x,z)}
W.hit=(x,z)=>blocked(x,z);
function reset(){safe=null;lastHome=I.activeId||null}
function segmentBlocked(ax,az,bx,bz){let d=Math.hypot(bx-ax,bz-az),n=Math.max(1,Math.ceil(d/.10));for(let i=1;i<=n;i++){let t=i/n,x=ax+(bx-ax)*t,z=az+(bz-az)*t;if(I.isBlocked(x,z))return true}return false}
W.registerTick(()=>{if(!inside()){safe=null;lastHome=null;return}let id=I.activeId,p=W.player.position;if(id!==lastHome){lastHome=id;safe={x:p.x,z:p.z};if(I.isBlocked(p.x,p.z)){p.set(-430,0,430);safe={x:p.x,z:p.z}}return}
if(!Number.isFinite(p.x)||!Number.isFinite(p.z)){if(safe)p.set(safe.x,0,safe.z);repairs++;return}
if(!safe){safe={x:p.x,z:p.z};return}
let bad=I.isBlocked(p.x,p.z)||segmentBlocked(safe.x,safe.z,p.x,p.z);
if(bad){p.set(safe.x,0,safe.z);repairs++;return}
safe={x:p.x,z:p.z};p.y=0});
window.LuxHomePhysics771={reset,get repairs(){return repairs},isBlocked:blocked}},260)})();