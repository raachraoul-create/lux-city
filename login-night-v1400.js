(()=>{
function init(){
 const login=document.getElementById('login'),brand=login?.querySelector('.authBrand'),card=login?.querySelector('.authCard');
 if(!login||!brand||!card||login.classList.contains('luxNightLogin1400'))return;
 login.classList.add('luxNightLogin1400');
 const style=document.createElement('style');style.id='luxNightLogin1400Styles';
 style.textContent=[
 '#login.luxNightLogin1400{background:#060a12!important;isolation:isolate;overflow-x:hidden;overflow-y:auto}',
 '#login.luxNightLogin1400 .authScene{display:none!important}',
 '#login.luxNightLogin1400:before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 29% 40%,#28374755,transparent 48%),linear-gradient(125deg,#060b14,#132433 57%,#060b13);z-index:0;pointer-events:none}',
 '#login.luxNightLogin1400:after{content:"";position:absolute;inset:0;background:#020509c9;z-index:2;pointer-events:none;opacity:.9;transition:opacity 1.05s}',
 '#login.luxNightLogin1400.luxLightsOn:after{opacity:.10}',
 '#login.luxNightLogin1400 .authShell{position:relative;z-index:5;display:grid;grid-template-columns:minmax(280px,1fr) minmax(325px,440px);gap:clamp(24px,5.6vw,94px);padding:clamp(24px,5vh,60px) clamp(25px,7vw,110px);align-items:center;min-height:100%;box-sizing:border-box}',
 '#login.luxNightLogin1400 .authBrand{position:relative;z-index:4;pointer-events:auto;text-align:left;max-width:620px}',
 '#login.luxNightLogin1400 .luxLabel1400{color:#eab36b;letter-spacing:.3em;font-size:10px;font-weight:900}',
 '#login.luxNightLogin1400 .luxRule1400{display:block;width:50px;height:2px;background:#e6a45e;margin:16px 0 20px}',
 '#login.luxNightLogin1400 .luxTitle1400{font-size:clamp(63px,8.5vw,139px);line-height:.82;font-weight:950;letter-spacing:-.089em;margin:0 0 25px!important;color:#e1e8ec;text-shadow:0 9px 38px #000c;transition:color .65s,text-shadow .65s}',
 '#login.luxNightLogin1400 .luxTitle1400 span{color:#cc884e;transition:color .65s,text-shadow .65s}',
 '#login.luxNightLogin1400.luxLightsOn .luxTitle1400{color:#fff;text-shadow:0 8px 30px #000c,0 0 45px #ffd39635}',
 '#login.luxNightLogin1400.luxLightsOn .luxTitle1400 span{color:#ffc174;text-shadow:0 0 25px #ffb96775}',
 '#login.luxNightLogin1400 .luxStory1400{max-width:430px;color:#bdcad4;font-size:clamp(12px,1.3vw,16px);line-height:1.65;margin:0 0 23px}',
 '#login.luxNightLogin1400 .luxPowerPanel1400{max-width:430px;display:flex;align-items:center;gap:17px;border:1px solid #96a8b444;background:linear-gradient(130deg,#1a2734e0,#0a121dc9);border-radius:17px;box-shadow:inset 0 1px #ffffff24,0 20px 45px #0008;padding:15px 16px;backdrop-filter:blur(12px)}',
 '#login.luxNightLogin1400 .luxPowerPanel1400 strong{display:block;color:#f2f4f5;font-size:12px;letter-spacing:.1em}',
 '#login.luxNightLogin1400 .luxPowerPanel1400 small{display:block;color:#92a4b2;font-size:10px;line-height:1.5;margin-top:7px}',
 '#login.luxNightLogin1400 .luxPowerPanel1400>div{flex:1}',
 '#login.luxNightLogin1400 #luxSwitch1400{position:relative;flex:0 0 80px;width:80px;height:55px;padding:5px!important;border-radius:11px;background:linear-gradient(#111b25,#060b10)!important;border:1px solid #ffffff33;box-shadow:inset 0 4px 8px #000b;cursor:pointer;touch-action:manipulation}',
 '#login.luxNightLogin1400 #luxSwitch1400:focus-visible{outline:3px solid #ffd898;outline-offset:3px}',
 '#login.luxNightLogin1400 .luxKnob1400{display:block;width:34px;height:43px;border-radius:7px;background:linear-gradient(150deg,#8798a6,#344656);box-shadow:0 2px 7px #000d,inset 0 1px #fff9;transition:transform .38s cubic-bezier(.22,1.55,.38,1),background .3s}',
 '#login.luxNightLogin1400 .luxKnob1400:after{content:"";position:absolute;left:12px;top:14px;width:19px;height:3px;background:#e3edf2a8;box-shadow:0 7px #e3edf263,0 14px #e3edf238}',
 '#login.luxNightLogin1400.luxLightsOn .luxKnob1400{transform:translateX(33px);background:linear-gradient(155deg,#ffe6af,#bd843f);box-shadow:0 0 21px #ffcc7b80,inset 0 1px #fffa}',
 '#login.luxNightLogin1400 .luxPowerReadout1400{display:flex;align-items:center;gap:8px;margin:12px 0 0 2px;color:#a3b1bd;font-size:10px;font-weight:900;letter-spacing:.16em}',
 '#login.luxNightLogin1400 .luxPowerDot1400{width:7px;height:7px;border-radius:50%;background:#657383;transition:background .3s,box-shadow .3s}',
 '#login.luxNightLogin1400.luxLightsOn .luxPowerDot1400{background:#ffc579;box-shadow:0 0 15px #ffc579}',
 '#login.luxNightLogin1400 .authCard{position:relative!important;z-index:10!important;width:100%;max-width:440px;min-height:340px;box-sizing:border-box;text-align:left;background:linear-gradient(155deg,#152434ee,#07111bf5)!important;border:1px solid #aab9c020;box-shadow:0 30px 85px #000c,inset 0 1px #ffffff14;transition:border-color .9s,box-shadow .9s,transform .7s;padding:23px}',
 '#login.luxNightLogin1400.luxLightsOn .authCard{border-color:#f5b96b72;box-shadow:0 0 60px #f5af4937,0 24px 75px #000b,inset 0 1px #ffe4af39;transform:translateY(-4px)}',
 '#login.luxNightLogin1400 .authCard:before{content:"LUX CITY    /    SECURE ACCESS";display:block;font-size:10px;font-weight:900;letter-spacing:.14em;color:#c9a675;margin:0 0 17px}',
 '#login.luxNightLogin1400:not(.luxLightsOn) .authTabs,#login.luxNightLogin1400:not(.luxLightsOn) .authPane,#login.luxNightLogin1400:not(.luxLightsOn) #loginStatus{opacity:0!important;visibility:hidden!important;pointer-events:none!important}',
 '#login.luxNightLogin1400 .authTabs,#login.luxNightLogin1400 .authPane,#login.luxNightLogin1400 #loginStatus{transition:opacity .45s}',
 '#login.luxNightLogin1400 .luxLocked1400{position:absolute;inset:58px 20px 20px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:13px;pointer-events:none;text-align:center;transition:opacity .3s}',
 '#login.luxNightLogin1400.luxLightsOn .luxLocked1400{opacity:0;visibility:hidden}',
 '#login.luxNightLogin1400 .luxLockIcon1400{width:71px;height:71px;border-radius:23px;display:grid;place-items:center;border:1px solid #ffffff26;background:radial-gradient(circle,#2a4052,#111b26);font-size:36px;color:#f1b96c}',
 '#login.luxNightLogin1400 .luxLocked1400 strong{font-size:20px;color:#e9f0f5}',
 '#login.luxNightLogin1400 .luxLocked1400 p{font-size:12px;line-height:1.6;color:#94a7b7;max-width:270px;margin:0}',
 '#login.luxNightLogin1400 .authTabs{background:#0e1b29}#login.luxNightLogin1400 .authTab.active{background:#f2ba6a!important;color:#13171c!important}',
 '#login.luxNightLogin1400 .authPane input{background:#0c1722;border-color:#b6c6d329}#login.luxNightLogin1400 .authPane input:focus{border-color:#f2ba6a;box-shadow:0 0 0 3px #f2ba6a21}',
 '#login.luxNightLogin1400 .primaryBtn{background:linear-gradient(110deg,#f9d08c,#e7a051)!important;color:#19120a!important}',
 '#login.luxNightLogin1400 .luxScene1400{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:1}',
 '#login.luxNightLogin1400 .luxScene1400:before{content:"";position:absolute;inset:0;background-image:radial-gradient(#ffffff6e 1px,transparent 1px),radial-gradient(#ffe1ad66 1px,transparent 1px);background-size:108px 84px,157px 113px;background-position:19px 27px,87px 47px;opacity:.40}',
 '#login.luxNightLogin1400 .luxSkyline1400{position:absolute;bottom:12%;left:-5%;right:-5%;height:47%;display:flex;align-items:flex-end;opacity:.72}',
 '#login.luxNightLogin1400 .luxBuilding1400{flex:1;min-width:28px;height:var(--h);position:relative;background:linear-gradient(95deg,#080f19,#172637 60%,#09131f);border:1px solid #ffffff08;box-shadow:inset 6px 0 12px #0008}',
 '#login.luxNightLogin1400 .luxBuilding1400:after{content:"";position:absolute;inset:10px 7px;background:repeating-linear-gradient(90deg,transparent 0 9px,#f8c77b77 10px 12px,transparent 13px 19px),repeating-linear-gradient(0deg,transparent 0 13px,#f8c77b77 14px 16px,transparent 17px 26px);background-blend-mode:multiply;opacity:.04;transition:opacity 1.1s}',
 '#login.luxNightLogin1400.luxLightsOn .luxBuilding1400:after{opacity:var(--b)}',
 '#login.luxNightLogin1400 .luxRoad1400{position:absolute;bottom:0;left:-10%;right:-10%;height:15%;background:linear-gradient(#131c26,#070e17);transform:perspective(340px) rotateX(43deg);border-top:2px solid #586f7a33}',
 '#login.luxNightLogin1400 .luxRoad1400:after{content:"";position:absolute;top:50%;left:10%;right:10%;height:2px;background:repeating-linear-gradient(90deg,#e1bb77 0 45px,transparent 45px 80px);opacity:.2;transition:opacity 1s}',
 '#login.luxNightLogin1400.luxLightsOn .luxRoad1400:after{opacity:.75}',
 '#login.luxNightLogin1400 .luxPole1400{position:absolute;left:43%;bottom:9%;height:50%;width:6px;background:linear-gradient(90deg,#131d27,#4d5a66,#1b2530);box-shadow:4px 0 12px #000a}',
 '#login.luxNightLogin1400 .luxPole1400:before{content:"";position:absolute;top:0;left:-4px;width:90px;height:6px;background:linear-gradient(#57636a,#18222e);border-radius:8px}',
 '#login.luxNightLogin1400 .luxPole1400:after{content:"";position:absolute;top:1px;left:64px;width:24px;height:14px;background:linear-gradient(#686660,#212629);border-radius:0 0 12px 12px;border-bottom:3px solid #ffe6b1;box-shadow:0 0 0 #ffc878;transition:box-shadow .85s}',
 '#login.luxNightLogin1400.luxLightsOn .luxPole1400:after{box-shadow:0 0 33px 13px #ffd17b90}',
 '#login.luxNightLogin1400 .luxBeam1400{position:absolute;left:calc(43% + 39px);bottom:5%;height:49%;width:35%;background:conic-gradient(from 155deg at 17% 0%,transparent 0deg,#ffcf8900 15deg,#ffcc7a70 34deg,#ffdb9330 58deg,transparent 83deg);filter:blur(15px);opacity:0;transition:opacity 1.15s}',
 '#login.luxNightLogin1400.luxLightsOn .luxBeam1400{opacity:1}',
 '#login.luxNightLogin1400 .luxGlow1400{position:absolute;inset:0;background:radial-gradient(ellipse at 52% 49%,#f8af5227,transparent 48%);opacity:0;transition:opacity 1.15s}',
 '#login.luxNightLogin1400.luxLightsOn .luxGlow1400{opacity:1}',
 '#login.luxNightLogin1400 .luxFlash1400{position:absolute;inset:0;background:#ffe3a4;opacity:0}',
 '#login.luxNightLogin1400.luxLightsOn .luxFlash1400{animation:luxFlash1400 .75s 1}',
 '@keyframes luxFlash1400{0%{opacity:0}10%{opacity:.27}23%{opacity:0}37%{opacity:.15}60%,100%{opacity:0}}',
 '#luxExit1400{position:fixed;inset:0;z-index:1100;background:radial-gradient(circle at 50% 45%,#1e3243,#040810 70%);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:9px;color:#ffe4b5;pointer-events:none;font-family:Inter,Arial,sans-serif;animation:luxExit1400 1.15s ease-in-out forwards}',
 '#luxExit1400 strong{font-size:clamp(24px,6vw,63px);letter-spacing:.18em}#luxExit1400 small{color:#c5a87f;font-size:11px;letter-spacing:.23em}',
 '@keyframes luxExit1400{0%{opacity:0}17%{opacity:1}72%{opacity:1}100%{opacity:0}}',
 '@media(max-width:850px){#login.luxNightLogin1400 .authShell{grid-template-columns:minmax(0,1fr) minmax(300px,1fr);gap:14px;padding:22px 16px}#login.luxNightLogin1400 .luxTitle1400{font-size:clamp(46px,7.4vw,80px);margin-bottom:14px!important}#login.luxNightLogin1400 .luxStory1400{font-size:11px;margin-bottom:12px}#login.luxNightLogin1400 .luxRule1400{margin:9px 0 13px}#login.luxNightLogin1400 .luxPowerPanel1400{padding:10px;gap:9px}#login.luxNightLogin1400 .authCard{padding:15px;min-height:300px}#login.luxNightLogin1400 .luxPowerPanel1400 small{font-size:9px}}',
 '@media(max-height:430px) and (orientation:landscape){#login.luxNightLogin1400 .authShell{padding:18px 15px;gap:12px}#login.luxNightLogin1400 .luxTitle1400{font-size:clamp(44px,7vw,75px);margin-bottom:8px!important}#login.luxNightLogin1400 .luxRule1400{margin:7px 0 10px}#login.luxNightLogin1400 .luxStory1400{font-size:10px;margin-bottom:8px}#login.luxNightLogin1400 .luxLabel1400{font-size:8px}#login.luxNightLogin1400 .luxPowerPanel1400{padding:8px}#login.luxNightLogin1400 #luxSwitch1400{transform:scale(.85);margin:-5px}#login.luxNightLogin1400 .authCard{padding:13px;min-height:287px}#login.luxNightLogin1400 .authCard:before{margin-bottom:7px}#login.luxNightLogin1400 .authPane label{margin:7px 0;font-size:11px}#login.luxNightLogin1400 .authPane input{padding:8px 10px}#login.luxNightLogin1400 .authPane h2{font-size:18px}#login.luxNightLogin1400 .authTabs{margin-bottom:9px}#login.luxNightLogin1400 .authTab{padding:7px 9px}#login.luxNightLogin1400 .authPane .muted{margin-bottom:5px;font-size:10px}#login.luxNightLogin1400 .authCard .primaryBtn{padding:9px!important}}',
 '@media(max-width:700px) and (orientation:portrait){#login.luxNightLogin1400 .authShell{grid-template-columns:1fr;gap:20px;padding:28px 16px 40px}#login.luxNightLogin1400 .authCard{max-width:100%}}',
 '@media(prefers-reduced-motion:reduce){#login.luxNightLogin1400 *,#login.luxNightLogin1400:after{animation:none!important;transition:none!important}#luxExit1400{animation-duration:.1s}}'
 ].join('\n');
 document.head.appendChild(style);
 const scene=document.createElement('div');scene.className='luxScene1400';scene.setAttribute('aria-hidden','true');
 scene.innerHTML='<div class="luxSkyline1400"></div><div class="luxRoad1400"></div><div class="luxPole1400"></div><div class="luxBeam1400"></div><div class="luxGlow1400"></div><div class="luxFlash1400"></div>';
 login.insertBefore(scene,login.firstChild);
 const sky=scene.querySelector('.luxSkyline1400');
 [62,85,59,78,97,70,91,63,81,95,68,82,71,99,77,88,64,93].forEach((h,i)=>{let b=document.createElement('span');b.className='luxBuilding1400';b.style.setProperty('--h',h+'%');b.style.setProperty('--b',String(.22+(i*7%6)*.13));sky.appendChild(b)});
 brand.innerHTML=[
 '<div class="luxLabel1400">EINE STADT · DEINE GESCHICHTE</div><i class="luxRule1400"></i>',
 '<h1 class="luxTitle1400">LUX<br>CITY<span>.</span></h1>',
 '<p class="luxStory1400">Die Stadt liegt im Dunkeln. Ein Schalter trennt dich von deinem nächsten Kapitel.</p>',
 '<div class="luxPowerPanel1400"><div><strong>STROMVERSORGUNG</strong><small id="luxSwitchHelp1400">Schalte die Stadtbeleuchtung ein, um dich anzumelden.</small></div>',
 '<button id="luxSwitch1400" type="button" aria-label="Strom einschalten" aria-pressed="false"><span class="luxKnob1400" aria-hidden="true"></span></button></div>',
 '<div class="luxPowerReadout1400"><span class="luxPowerDot1400"></span><span id="luxPowerStatus1400">STROM AUS · ANMELDUNG GESPERRT</span></div>'
 ].join('');
 const locked=document.createElement('div');locked.className='luxLocked1400';locked.setAttribute('aria-hidden','true');locked.innerHTML='<div class="luxLockIcon1400">⌁</div><strong>Deine Stadt wartet.</strong><p>Schalte links das Licht ein. Erst dann kannst du dich anmelden oder registrieren.</p>';card.appendChild(locked);
 const btn=document.getElementById('luxSwitch1400');let powered=false,finished=false;
 function power(on){
  powered=!!on;login.classList.toggle('luxLightsOn',powered);btn.setAttribute('aria-pressed',String(powered));btn.setAttribute('aria-label',powered?'Strom ausschalten':'Strom einschalten');
  document.getElementById('luxPowerStatus1400').textContent=powered?'STROM AN · STADT BEREIT':'STROM AUS · ANMELDUNG GESPERRT';
  document.getElementById('luxSwitchHelp1400').textContent=powered?'Die Stadt ist wach. Deine Anmeldung ist jetzt bereit.':'Schalte die Stadtbeleuchtung ein, um dich anzumelden.';
  card.querySelectorAll('input,button,select').forEach(el=>{
   if(!powered){if(!el.hasAttribute('data-lux-tab'))el.setAttribute('data-lux-tab',el.hasAttribute('tabindex')?el.getAttribute('tabindex'):'');el.tabIndex=-1}
   else if(el.hasAttribute('data-lux-tab')){let old=el.getAttribute('data-lux-tab');if(old==='')el.removeAttribute('tabindex');else el.setAttribute('tabindex',old);el.removeAttribute('data-lux-tab')}
  })
 }
 btn.onclick=()=>{power(!powered)};
 power(false);
 function success(){
  if(finished||!document.body.classList.contains('game-ready'))return;
  finished=true;power(false);
  const exit=document.createElement('div');exit.id='luxExit1400';exit.setAttribute('aria-hidden','true');
  exit.innerHTML='<strong>LUX CITY</strong><small>LICHT AUS · DEINE WELT BEGINNT</small>';document.body.appendChild(exit);
  setTimeout(()=>exit.remove(),matchMedia('(prefers-reduced-motion:reduce)').matches?180:1200)
 }
 new MutationObserver(()=>{if(document.body.classList.contains('game-ready'))success()}).observe(document.body,{attributes:true,attributeFilter:['class']});
 addEventListener('luxcity:manual-login',success);
 if(document.body.classList.contains('game-ready'))success();
 window.LuxNightLogin1400={version:'14.0.0',power,get powered(){return powered}}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init()
})();