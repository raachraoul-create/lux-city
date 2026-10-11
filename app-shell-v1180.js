(()=>{
const coarse=matchMedia('(pointer:coarse)').matches;
function install(){
 if(document.getElementById('luxAppShell1180'))return;
 const style=document.createElement('style');style.id='luxAppShell1180';style.textContent=`
 :root{--lux-safe-top:env(safe-area-inset-top,0px);--lux-safe-right:env(safe-area-inset-right,0px);--lux-safe-bottom:env(safe-area-inset-bottom,0px);--lux-safe-left:env(safe-area-inset-left,0px);--lux-vh:100vh}
 html,body{width:100%;height:100%;min-height:100%;overscroll-behavior:none;background:#071019}
 body{padding:0!important}
 #game{width:100vw!important;height:var(--lux-vh)!important}
 #luxRotate1180{position:fixed;inset:0;z-index:99999;display:none;place-items:center;padding:24px;background:radial-gradient(circle at 50% 35%,#17304a,#071019 66%);color:#fff;text-align:center}
 #luxRotate1180 .box{max-width:420px;padding:28px 24px;border:1px solid #ffffff24;border-radius:22px;background:#0b1520e8;box-shadow:0 28px 80px #000b}
 #luxRotate1180 .phone{font-size:62px;display:block;animation:luxRotate 1.8s ease-in-out infinite}
 #luxRotate1180 b{display:block;font-size:23px;margin:12px 0 7px}.luxRotateText{color:#bac8d2;line-height:1.45;font-size:14px}
 @keyframes luxRotate{0%,25%{transform:rotate(0)}65%,100%{transform:rotate(90deg)}}
 @media(pointer:coarse) and (orientation:portrait){#luxRotate1180{display:grid!important}body>*:not(#luxRotate1180){visibility:hidden!important}#luxRotate1180{visibility:visible!important}}
 @media(pointer:coarse) and (orientation:landscape){
   #hud{top:max(5px,var(--lux-safe-top))!important;left:max(7px,var(--lux-safe-left))!important;right:max(7px,var(--lux-safe-right))!important}
   #joy850{left:max(10px,var(--lux-safe-left))!important;bottom:max(8px,var(--lux-safe-bottom))!important}
   #interact850{right:max(10px,var(--lux-safe-right))!important;bottom:max(8px,var(--lux-safe-bottom))!important}
   #phoneTouch850{right:max(10px,var(--lux-safe-right))!important}
   #mapTouch850{right:max(10px,var(--lux-safe-right))!important}
   #navMini840{right:max(8px,var(--lux-safe-right))!important;top:max(48px,var(--lux-safe-top))!important}
   #modal{inset:max(12px,var(--lux-safe-top)) max(12px,var(--lux-safe-right)) max(12px,var(--lux-safe-bottom)) max(12px,var(--lux-safe-left))!important}
   #luxPhone790{right:max(7px,var(--lux-safe-right))!important;bottom:max(7px,var(--lux-safe-bottom))!important;max-height:calc(100vh - var(--lux-safe-top) - var(--lux-safe-bottom) - 14px)!important}
 }
 body.lux-native-app{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}
 body.lux-native-app #luxRotate1180{background:#071019}
 `;document.head.appendChild(style);
 const rotate=document.createElement('div');rotate.id='luxRotate1180';rotate.innerHTML='<div class="box"><span class="phone">📱</span><b>Handy ins Querformat drehen</b><div class="luxRotateText">Lux City wird im Querformat gespielt. Drehe dein Gerät nach links oder rechts.</div></div>';document.body.appendChild(rotate);
 const native=!!window.Capacitor?.isNativePlatform?.();if(native)document.body.classList.add('lux-native-app');
 const vh=()=>{document.documentElement.style.setProperty('--lux-vh',(window.visualViewport?.height||innerHeight)+'px')};vh();addEventListener('resize',vh);window.visualViewport?.addEventListener('resize',vh);
 async function landscape(){
   if(!coarse)return;
   try{await screen.orientation?.lock?.('landscape')}catch{}
   if(native){
     try{document.documentElement.requestFullscreen?.()}catch{}
   }
 }
 ['pointerdown','touchstart','click'].forEach(ev=>addEventListener(ev,landscape,{once:true,passive:true}));
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)landscape()});
 window.LuxAppShell1180={version:'11.8.0',native,landscape}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install()
})();