(()=>{const coarse=matchMedia('(pointer:coarse)').matches;if(!coarse)return;
window.LuxMobileControlContract850=window.LuxMobileControlContract851=Object.freeze({left:'a',right:'d',forward:'w',back:'s',interaction:'e',phone:'touch',map:'touch',locked:true});
let active=new Set(),jid=null,cx=0,cy=0,lid=null,lx=0,ly=0;
const code=k=>({w:'KeyW',a:'KeyA',s:'KeyS',d:'KeyD',e:'KeyE'}[k]||''),down=k=>dispatchEvent(new KeyboardEvent('keydown',{key:k,code:code(k),bubbles:true})),up=k=>dispatchEvent(new KeyboardEvent('keyup',{key:k,code:code(k),bubbles:true}));
function pulse(){try{navigator.vibrate?.(12)}catch{}}
function setKey(k,on){let W=window.LuxWorld;if(W?.keys)W.keys[k]=on?1:0;if(on&&!active.has(k)){active.add(k);down(k)}if(!on&&active.has(k)){active.delete(k);up(k)}}
function tapKey(k){down(k);setTimeout(()=>up(k),90);pulse()}
function build(){
 let css=document.createElement('style');css.textContent=`
 #mobileCtl850{position:fixed;inset:0;pointer-events:none;user-select:none;-webkit-user-select:none}html,body,#game{touch-action:none!important}
 #joy850{z-index:64;position:absolute;left:max(14px,env(safe-area-inset-left));bottom:max(14px,env(safe-area-inset-bottom));width:116px;height:116px;border-radius:50%;border:2px solid #ffffff99;background:#0b1219a8;box-shadow:0 7px 24px #0008;pointer-events:auto;touch-action:none}
 #knob850{position:absolute;left:33px;top:33px;width:50px;height:50px;border-radius:50%;background:#f0a51ae8;box-shadow:0 4px 16px #0007}
 #look850{z-index:56;position:absolute;left:30%;right:0;top:0;bottom:0;pointer-events:auto;touch-action:none}
 .mobileAction850{z-index:64;position:absolute;right:max(14px,env(safe-area-inset-right));width:62px;height:62px;border-radius:50%;pointer-events:auto!important;padding:0!important;display:grid;place-items:center;background:#151f29e8!important;color:#fff!important;border:1px solid #ffffff55!important;box-shadow:0 6px 22px #0008;font-weight:900!important}
 #interact850{bottom:max(14px,env(safe-area-inset-bottom));background:#f0a51ae8!important;color:#111!important;font-size:23px!important}
 #phoneTouch850{bottom:86px;font-size:24px!important}
 #mapTouch850{bottom:156px;font-size:23px!important}
 #mobileHint850{position:absolute;right:84px;bottom:29px;background:#0a121bd9;color:#fff;border:1px solid #ffffff25;border-radius:9px;padding:6px 8px;font:10px Arial;pointer-events:none;opacity:.82}
 body:not(.game-ready) #mobileCtl850{display:none!important}
 @media(orientation:portrait){#joy850{width:122px;height:122px;bottom:20px}#knob850{left:35px;top:35px;width:52px;height:52px}#look850{left:28%;right:0;top:0;bottom:0}.mobileAction850{width:58px;height:58px}#phoneTouch850{bottom:83px}#mapTouch850{bottom:148px}}
 @media(max-height:430px) and (orientation:landscape){#joy850{width:104px;height:104px;bottom:8px}#knob850{left:29px;top:29px;width:46px;height:46px}.mobileAction850{width:54px;height:54px;right:9px}#interact850{bottom:8px}#phoneTouch850{bottom:68px}#mapTouch850{bottom:128px}#look850{left:28%;right:0;top:0;bottom:0}}
 `;document.head.appendChild(css);
 let r=document.createElement('div');r.id='mobileCtl850';r.innerHTML='<div id="joy850"><div id="knob850"></div></div><div id="look850"></div><button id="mapTouch850" class="mobileAction850" aria-label="Karte öffnen">🗺️</button><button id="phoneTouch850" class="mobileAction850" aria-label="Handy öffnen">📱</button><button id="interact850" class="mobileAction850" aria-label="Interagieren">E</button><div id="mobileHint850">INTERAGIEREN</div>';document.body.appendChild(r);
 let joy=r.querySelector('#joy850'),knob=r.querySelector('#knob850');
 function reset(){['w','a','s','d'].forEach(k=>setKey(k,false));knob.style.transform='translate(0,0)'}
 joy.addEventListener('pointerdown',e=>{e.preventDefault();jid=e.pointerId;joy.setPointerCapture(jid);let b=joy.getBoundingClientRect();cx=b.left+b.width/2;cy=b.top+b.height/2;pulse()});
 joy.addEventListener('pointermove',e=>{if(e.pointerId!==jid)return;e.preventDefault();let x=e.clientX-cx,y=e.clientY-cy,m=Math.hypot(x,y),lim=38;if(m>lim){x*=lim/m;y*=lim/m}knob.style.transform='translate('+x+'px,'+y+'px)';setKey('w',y<-8);setKey('s',y>8);setKey('a',x<-8);setKey('d',x>8)});
 joy.addEventListener('pointerup',e=>{e.preventDefault();jid=null;reset()});joy.addEventListener('pointercancel',reset);
 let look=r.querySelector('#look850');look.addEventListener('pointerdown',e=>{e.preventDefault();lid=e.pointerId;lx=e.clientX;ly=e.clientY;look.setPointerCapture(lid)});
 look.addEventListener('pointermove',e=>{if(e.pointerId!==lid)return;e.preventDefault();let dx=e.clientX-lx,dy=e.clientY-ly;lx=e.clientX;ly=e.clientY;let W=window.LuxWorld;if(W){W.yaw=W.yaw-dx*.00215;if(Number.isFinite(W.pitch))W.pitch=W.pitch-dy*.00155}});
 look.addEventListener('pointerup',()=>lid=null);look.addEventListener('pointercancel',()=>lid=null);
 r.querySelector('#interact850').addEventListener('pointerdown',e=>{e.preventDefault();tapKey('e')});
 r.querySelector('#mapTouch850').addEventListener('pointerdown',e=>{e.preventDefault();pulse();window.LuxNavigation850?.open?.()||window.LuxNavigation840?.open?.()});
 r.querySelector('#phoneTouch850').addEventListener('pointerdown',e=>{e.preventDefault();pulse();let D=window.LuxPhoneDesign791,P=window.LuxPhone790;if(D&&!D.style)D.chooser?.();else P?.toggle?.()});
 addEventListener('blur',reset);document.addEventListener('visibilitychange',()=>{if(document.hidden)reset()});
 // Hide obsolete mobile layer to avoid duplicate E/joystick if an old cached script remains.
 let old=document.getElementById('mobileCtl');if(old)old.style.display='none';
 window.LuxMobileUI850=window.LuxMobileUI851={root:r,reset,tapKey,get lookActive(){return lid!==null}}
}
build()})();