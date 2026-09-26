(()=>{let q=setInterval(()=>{let H=window.LuxHomes520,I=window.LuxHomeInterior800||window.LuxHomeInterior782,G=window.LuxGameplay632||window.LuxGameplay631||window.LuxGameplay630;if(!H||!I?.act||!G?.state?.needs)return;clearInterval(q);init(H,I,G)},120);
function init(H,I,G){
 let style=document.createElement('style');style.textContent=`
 #homeActions806{position:fixed;left:10px;top:116px;z-index:66;display:none;font:11px Arial;color:#fff}
 #homeActions806>button{background:#18232ee8!important;color:#fff!important;border:1px solid #ffffff44!important;border-radius:11px!important;padding:8px 10px!important;font-weight:900!important}
 #homeActions806 .panel806{display:none;margin-top:6px;width:176px;background:#0b121beb;border:1px solid #ffffff2d;border-radius:12px;padding:7px;grid-template-columns:1fr 1fr;gap:6px;box-shadow:0 10px 28px #0009}
 #homeActions806.open .panel806{display:grid}
 #homeActions806 .panel806 button{font-size:10px!important;padding:8px 4px!important;background:#17212be8!important;color:#fff!important}
 #homeActions806 .panel806 .leave806{grid-column:1/-1;background:#9b362fe8!important}
 body:not(.game-ready) #homeActions806{display:none!important}
 @media(max-width:900px) and (pointer:coarse){#homeActions806{left:8px;top:100px}#homeActions806>button{padding:7px 8px!important;font-size:10px!important}.panel806{width:160px!important}}
 `;document.head.appendChild(style);
 let root=document.createElement('div');root.id='homeActions806';root.innerHTML='<button>🏠 WOHNUNG</button><div class="panel806"><button data-a="fridge">🍽️ ESSEN</button><button data-a="sink">🥤 TRINKEN</button><button data-a="bed">🛏️ SCHLAFEN</button><button data-a="shower">🚿 DUSCHEN</button><button class="leave806" data-a="exit">🚪 VERLASSEN</button></div>';document.body.appendChild(root);
 root.firstElementChild.onclick=()=>root.classList.toggle('open');
 root.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{let a=b.dataset.a;if(a==='exit'){H.leave();root.classList.remove('open');return}I.act(a);G.refreshHud?.()});
 let oldExit=document.getElementById('apartmentExit800');if(oldExit)oldExit.style.setProperty('display','none','important');
 setInterval(()=>{let on=!!H.inside&&!H.viewing;root.style.display=on?'block':'none';if(!on)root.classList.remove('open');let x=document.getElementById('apartmentExit800');if(x)x.style.setProperty('display','none','important')},160);
 window.LuxHomeActions806={root}
}})();