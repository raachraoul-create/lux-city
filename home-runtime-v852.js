(()=>{let q=setInterval(()=>{let W=window.LuxWorld,H=window.LuxHomes520,I=window.LuxHomeInterior850||window.LuxHomeInterior840,G=window.LuxGameplay632||window.LuxGameplay631;if(!W?.player||!W?.camera||!H?.enter||!H?.leave||!I?.root||!G||!window.LuxHomeAccess840||!window.LuxApartmentExit800)return;clearInterval(q);init(W,H,I,G)},40);
function init(W,H,I,G){
 const C={x:-430,z:430},sizes={studio:[12,9],flat:[12,9],family:[18,12]};
 let entering=false,panelOpen=false,lastInside=false;
 let style=document.createElement('style');style.id='homeRuntime850Style';style.textContent=`
 #homeTransition850{position:fixed;inset:0;z-index:9998;background:#070a0d;opacity:0;pointer-events:none;transition:opacity .14s ease}
 #homeTransition850.on{opacity:1}
 #homeHub850{position:fixed;left:10px;top:112px;z-index:72;display:none;font:12px Arial;color:#fff}
 #homeHub850 .homeMain850{background:#0b141dde;color:#fff;border:1px solid #ffffff38;padding:9px 11px;border-radius:12px;box-shadow:0 8px 28px #0008;font-weight:900}
 #homePanel850{display:none;margin-top:6px;width:182px;background:#0a121beb;border:1px solid #ffffff2c;border-radius:13px;padding:7px;box-shadow:0 12px 32px #000a;backdrop-filter:blur(9px)}
 #homeHub850.open #homePanel850{display:grid;grid-template-columns:1fr 1fr;gap:6px}
 #homePanel850 button{font-size:11px!important;padding:9px 6px!important;border-radius:9px!important;background:#18232ddd!important;color:#fff!important}
 #homePanel850 button.exit850{grid-column:1/-1;background:#a43b32!important}
 #homeToast850{position:fixed;left:50%;top:74px;transform:translateX(-50%);z-index:75;display:none;background:#0b141ded;color:#fff;border:1px solid #ffffff2c;border-radius:10px;padding:7px 11px;font:bold 11px Arial;box-shadow:0 6px 20px #0008}
 #apartmentExit800{display:none!important}
 body.lux-home-inside #homeHub850{display:block}
 @media(max-width:900px) and (pointer:coarse){#homeHub850{left:8px;top:95px}#homeHub850 .homeMain850{padding:8px 9px;font-size:11px}#homePanel850{width:165px}#homePanel850 button{padding:8px 5px!important;font-size:10px!important}#homePrompt730{top:53px!important;bottom:auto!important;font-size:10px!important;padding:6px 9px!important}}
 `;document.head.appendChild(style);
 let fade=document.createElement('div');fade.id='homeTransition850';document.body.appendChild(fade);
 let hub=document.createElement('div');hub.id='homeHub850';hub.innerHTML='<button class="homeMain850">🏠 ZUHAUSE</button><div id="homePanel850"><button data-homeact="fridge">🍽️ ESSEN</button><button data-homeact="sink">🥤 TRINKEN</button><button data-homeact="bed">🛏️ SCHLAFEN</button><button data-homeact="shower">🚿 DUSCHEN</button><button class="exit850" data-homeact="exit">🚪 WOHNUNG VERLASSEN</button></div>';document.body.appendChild(hub);
 let toast=document.createElement('div');toast.id='homeToast850';document.body.appendChild(toast);
 function showToast(t){toast.textContent=t;toast.style.display='block';clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.style.display='none',1700)}
 function idNow(){let id=I.activeId||H.currentHomeId||window.LuxCivic404?.state?.home?.id||'flat';return sizes[id]?id:'flat'}
 function spawn(id){let d=(sizes[id]||sizes.flat)[1];return{x:C.x,z:C.z-(d/2-1.35)}}
 function forceInside(id=idNow()){
   if(!H.inside)return false;
   if(!I.activeId)I.sync?.();
   id=idNow();let p=spawn(id),wp=W.player.position,tooFar=!Number.isFinite(wp.x)||!Number.isFinite(wp.z)||Math.abs(wp.x-C.x)>20||Math.abs(wp.z-C.z)>20;
   if(tooFar)wp.set(p.x,0,p.z);
   wp.y=0;I.root.visible=true;W.player.visible=true;W.yaw=Number.isFinite(W.yaw)?W.yaw:0;
   let y=W.yaw||0;W.camera.position.set(wp.x-Math.sin(y)*1.55,1.82,wp.z-Math.cos(y)*1.55);W.camera.lookAt(wp.x,1.38,wp.z);
   document.body.classList.add('game-ready','lux-home-inside');let game=document.getElementById('game');if(game)game.style.visibility='visible';window.LuxHomeCamera800?.reset?.();return true
 }
 function begin(){fade.classList.add('on')}
 function end(){requestAnimationFrame(()=>requestAnimationFrame(()=>fade.classList.remove('on')))}
 let oldEnter=H.enter.bind(H),oldLeave=H.leave.bind(H);
 H.enter=function(id,view=false){if(entering)return;entering=true;begin();let r;try{r=oldEnter(id,view);forceInside(id);setTimeout(()=>forceInside(id),40);setTimeout(()=>{forceInside(id);end();entering=false},140)}catch(e){end();entering=false;throw e}return r};
 H.leave=function(){begin();let r=oldLeave();document.body.classList.remove('lux-home-inside');hub.classList.remove('open');panelOpen=false;setTimeout(end,120);return r};
 hub.querySelector('.homeMain850').onclick=e=>{e.preventDefault();panelOpen=!panelOpen;hub.classList.toggle('open',panelOpen)};
 hub.querySelectorAll('[data-homeact]').forEach(b=>b.onclick=e=>{e.preventDefault();let id=b.dataset.homeact;if(id==='exit'){H.leave();return}let ok=I.act?.(id);if(ok!==false){G.refreshHud?.();showToast(id==='fridge'?'🍽️ Gegessen':id==='sink'?'🥤 Getrunken':id==='bed'?'🛏️ Energie aufgefüllt':'🚿 Geduscht')}});
 setInterval(()=>{let inside=!!H.inside;if(inside){forceInside();if(!lastInside){lastInside=true;showToast('🏠 Zuhause · Essen, Trinken, Schlafen und Duschen funktionieren hier direkt')}}else if(lastInside){lastInside=false;document.body.classList.remove('lux-home-inside');hub.classList.remove('open');panelOpen=false}},180);
 if(H.inside){begin();forceInside();setTimeout(()=>{forceInside();end()},140)}
 window.LuxHomeRuntime850=window.LuxHomeRuntime851=window.LuxHomeRuntime852={forceInside,hub,get inside(){return!!H.inside}}
}})();