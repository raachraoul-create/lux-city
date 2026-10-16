(()=>{
function init(){
const login=document.getElementById('login'),brand=login?.querySelector('.authBrand'),card=login?.querySelector('.authCard');
if(!login||!brand||!card||login.classList.contains('luxPortal1500'))return;
login.classList.add('luxPortal1500');
const style=document.createElement('style');style.id='luxPortal1500Styles';
style.textContent=[
'#login.luxPortal1500{display:block;isolation:isolate;overflow-x:hidden;overflow-y:auto;background:radial-gradient(ellipse at 33% 40%,#224056,#08121d 61%,#050a12)!important;color:#f2f9fc}',
'#login.luxPortal1500 .authScene{display:none!important}',
'#login.luxPortal1500:after{content:"";position:absolute;inset:0;z-index:1;background:#03070cad;pointer-events:none;opacity:.9;transition:opacity 1s}',
'#login.luxPortal1500.on:after{opacity:.08}',
'#login.luxPortal1500 .authShell{position:relative;z-index:5;min-height:100%;box-sizing:border-box;display:grid;grid-template-columns:minmax(290px,1.2fr) minmax(320px,435px);gap:clamp(20px,5.5vw,91px);padding:clamp(18px,5vh,55px) clamp(20px,7vw,113px);align-items:center}',
'#login.luxPortal1500 .authBrand{position:relative;z-index:6;max-width:680px;pointer-events:auto;text-align:left}',
'#login.luxPortal1500 .portalEyebrow1500{display:flex;align-items:center;gap:10px;font-size:10px;font-weight:900;letter-spacing:.26em;color:#a2e0ed}',
'#login.luxPortal1500 .portalEyebrow1500:before{content:"";width:19px;height:2px;background:#6fd7f7}',
'#login.luxPortal1500 .portalTitle1500{font-size:clamp(36px,4.6vw,73px);letter-spacing:-.064em;line-height:.95;margin:12px 0 8px!important;color:#edfaff;font-weight:950}',
'#login.luxPortal1500 .portalTitle1500 span{color:#87e8ed}',
'#login.luxPortal1500 .portalSubtitle1500{font-size:13px;line-height:1.5;color:#aac0cf;max-width:440px;margin:0 0 14px}',
'#login.luxPortal1500 .portalArt1500{position:relative;width:100%;max-width:530px;height:clamp(195px,31vh,334px);overflow:hidden;border-radius:17px;border:1px solid #93b4c34a;box-shadow:0 27px 70px #000a;background:linear-gradient(#162b3b,#050d15);isolation:isolate;perspective:650px;transition:box-shadow .9s,border-color .9s}',
'#login.luxPortal1500.on .portalArt1500{border-color:#88f0f5af;box-shadow:0 0 55px #5cdfea35,0 27px 70px #000a}',
'#login.luxPortal1500 .portalVista1500{position:absolute;inset:24px 0 0;background:linear-gradient(180deg,#37627c,#739aa3 59%,#192d3b);opacity:.16;transition:opacity 1s}',
'#login.luxPortal1500.on .portalVista1500{opacity:1}',
'#login.luxPortal1500 .portalSkyline1500{position:absolute;inset:18% -2% 26%;display:flex;align-items:end;gap:4px}',
'#login.luxPortal1500 .portalTower1500{flex:1;min-width:12px;height:var(--h);background:linear-gradient(90deg,#213c51,#4a7483 48%,#24394e);box-shadow:inset 2px 0 #c6edf73c}',
'#login.luxPortal1500 .portalTower1500:after{content:"";display:block;margin:7px auto;width:70%;height:75%;background:repeating-linear-gradient(0deg,transparent 0 9px,#c3faffbd 10px 12px,transparent 13px 20px);opacity:.60}',
'#login.luxPortal1500 .portalRoad1500{position:absolute;bottom:-3%;left:18%;width:64%;height:49%;background:linear-gradient(180deg,#b4d7dcbb,#204459 21%,#081722);clip-path:polygon(45% 0,55% 0,100% 100%,0 100%)}',
'#login.luxPortal1500 .portalRoad1500:after{content:"";position:absolute;left:49%;top:0;width:2%;height:100%;background:repeating-linear-gradient(180deg,#e3ffff 0 12px,transparent 12px 29px)}',
'#login.luxPortal1500 .portalDoor1500{position:absolute;z-index:3;top:24px;bottom:0;width:50%;box-sizing:border-box;display:grid;place-items:center;background:linear-gradient(120deg,#243a4b,#13202e 63%,#263b4a);border:1px solid #94adba3c;box-shadow:inset 0 0 29px #0009;transition:transform 1.08s cubic-bezier(.19,.87,.22,1)}',
'#login.luxPortal1500 .portalDoor1500:before{content:"";position:absolute;inset:12px;border:1px solid #9ebac45b;background:repeating-linear-gradient(0deg,transparent 0 33px,#deeff20a 34px 35px,transparent 36px 62px)}',
'#login.luxPortal1500 .portalDoorLeft1500{left:0;border-right:2px solid #668699}#login.luxPortal1500 .portalDoorRight1500{right:0;border-left:2px solid #668699}',
'#login.luxPortal1500.on .portalDoorLeft1500{transform:translateX(-93%)}#login.luxPortal1500.on .portalDoorRight1500{transform:translateX(93%)}',
'#login.luxPortal1500 .portalDoor1500 b{position:relative;z-index:1;font-size:clamp(68px,9vw,125px);font-weight:950;color:#bdd5ddad;text-shadow:0 7px 25px #000b;transition:opacity .5s}',
'#login.luxPortal1500.on .portalDoor1500 b{opacity:.12}',
'#login.luxPortal1500 .portalTop1500{position:absolute;z-index:4;top:0;left:0;right:0;height:24px;display:flex;align-items:center;justify-content:space-between;box-sizing:border-box;padding:0 13px;background:linear-gradient(#243f50,#111f2e);color:#d5eef4;font-size:9px;font-weight:900;letter-spacing:.18em;border-bottom:1px solid #86a2b666}',
'#login.luxPortal1500 .portalTop1500 i{width:8px;height:8px;border-radius:50%;background:#596874;transition:background .4s,box-shadow .4s}',
'#login.luxPortal1500.on .portalTop1500 i{background:#90fadc;box-shadow:0 0 15px #8afce0}',
'#login.luxPortal1500 .portalSill1500{position:absolute;z-index:5;bottom:0;left:0;right:0;height:7px;background:linear-gradient(90deg,#466579,#b4d5df,#466579);box-shadow:0 -1px 14px #bee9ff30}',
'#login.luxPortal1500.on .portalSill1500{box-shadow:0 -5px 22px #69e9fbba}',
'#login.luxPortal1500 .portalLeverPanel1500{display:flex;align-items:center;justify-content:space-between;gap:13px;margin-top:12px;padding:11px 14px;box-sizing:border-box;max-width:530px;background:linear-gradient(120deg,#1c2d3f,#0c1825);border:1px solid #83acbc53;border-radius:13px;box-shadow:inset 0 1px #ffffff1c,0 12px 30px #0007}',
'#login.luxPortal1500 .portalLeverInfo1500{display:flex;flex-direction:column;gap:5px;min-width:0}',
'#login.luxPortal1500 .portalLeverInfo1500 strong{font-size:12px;letter-spacing:.09em;color:#e7f7fb}',
'#login.luxPortal1500 .portalLeverInfo1500 span{font-size:10px;color:#a1b4c0;line-height:1.35}',
'#login.luxPortal1500 .portalLeverInfo1500 small{font-size:9px;letter-spacing:.08em;color:#c9a37f;font-weight:900}',
'#login.luxPortal1500.on .portalLeverInfo1500 small{color:#8ef7db}',
'#login.luxPortal1500 #portalLever1500{flex:0 0 85px;width:85px;height:57px;display:grid;place-items:center;cursor:pointer;border-radius:12px!important;border:1px solid #819aa9!important;background:linear-gradient(140deg,#435a68,#111c29)!important;box-shadow:inset 0 4px 9px #000b,0 6px 12px #0008;touch-action:manipulation;padding:6px!important}',
'#login.luxPortal1500 #portalLever1500:focus-visible{outline:3px solid #9af3f8;outline-offset:3px}',
'#login.luxPortal1500 .portalLeverTrack1500{display:block;position:relative;width:65px;height:34px;border:2px solid #526c7c;border-radius:8px;background:#0a151f;box-shadow:inset 0 3px 8px #000b}',
'#login.luxPortal1500 .portalLeverGrip1500{position:absolute;left:2px;top:2px;width:28px;height:25px;border-radius:6px;background:linear-gradient(145deg,#b9cbd3,#496173);box-shadow:0 2px 7px #000b,inset 0 1px #fff7;transition:transform .45s cubic-bezier(.2,1.6,.34,1),background .4s}',
'#login.luxPortal1500 .portalLeverGrip1500:after{content:"";position:absolute;left:6px;top:5px;width:16px;height:2px;background:#e4f8ffb0;box-shadow:0 6px #e4f8ff80,0 12px #e4f8ff50}',
'#login.luxPortal1500.on .portalLeverGrip1500{transform:translateX(31px);background:linear-gradient(145deg,#baffef,#62b9c6);box-shadow:0 0 18px #69f9ebb3,0 2px 7px #000b}',
'#login.luxPortal1500 .authCard{position:relative!important;z-index:8!important;box-sizing:border-box;width:100%;max-width:435px;min-height:345px;text-align:left;padding:23px;background:linear-gradient(145deg,#14293bf7,#081522f7)!important;border:1px solid #749ca65e!important;border-radius:20px;box-shadow:0 26px 80px #000a,inset 0 1px #ffffff22;transition:box-shadow .8s,border-color .8s,transform .8s}',
'#login.luxPortal1500.on .authCard{transform:translateY(-3px);border-color:#8bf0efaf!important;box-shadow:0 0 60px #62cce53c,0 24px 75px #000a,inset 0 1px #ffffff42}',
'#login.luxPortal1500 .authCard:before{content:"CITY PASS  /  LUX CITY";display:block;color:#9cbdca;font-weight:900;letter-spacing:.19em;font-size:10px;margin:0 0 17px}',
'#login.luxPortal1500:not(.on) .authTabs,#login.luxPortal1500:not(.on) .authPane,#login.luxPortal1500:not(.on) #loginStatus{opacity:0!important;visibility:hidden!important;pointer-events:none!important}',
'#login.luxPortal1500 .authTabs,#login.luxPortal1500 .authPane,#login.luxPortal1500 #loginStatus{transition:opacity .45s}',
'#login.luxPortal1500 .portalLocked1500{position:absolute;inset:57px 18px 18px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:13px;text-align:center;pointer-events:none;transition:opacity .38s,visibility .38s}',
'#login.luxPortal1500.on .portalLocked1500{opacity:0;visibility:hidden}',
'#login.luxPortal1500 .portalLocked1500 .symbol{display:grid;place-items:center;width:78px;height:78px;border:1px solid #9ecad65a;border-radius:22px;background:linear-gradient(145deg,#2a4960,#112536);color:#c7edfa;font-size:39px}',
'#login.luxPortal1500 .portalLocked1500 strong{font-size:19px;color:#ecf9fc}#login.luxPortal1500 .portalLocked1500 small{font-size:12px;color:#9aafbe;line-height:1.5;max-width:260px}',
'#login.luxPortal1500 .authTabs{background:#102536}#login.luxPortal1500 .authTab.active{background:linear-gradient(100deg,#a3fbf1,#69cde9)!important;color:#08212b!important}',
'#login.luxPortal1500 .authPane input{background:#0a1b2a;border-color:#789faa67;color:#f3f9fc}#login.luxPortal1500 .authPane input:focus{border-color:#89eafa;box-shadow:0 0 0 3px #8df3fa2e}',
'#login.luxPortal1500 .primaryBtn{background:linear-gradient(105deg,#8cefeb,#69c4e9)!important;color:#08232e!important}',
'#luxLaunch1500{position:fixed;inset:0;z-index:1000;pointer-events:none;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:13px;background:radial-gradient(ellipse at 50% 35%,#1f4554,#030811 71%);font-weight:900;color:#d6faff;letter-spacing:.23em;animation:portalExit1500 1.22s forwards}',
'#luxLaunch1500 strong{font-size:clamp(30px,6vw,68px);letter-spacing:-.045em}#luxLaunch1500 .bar{display:block;width:170px;height:3px;background:#7bf7e7;box-shadow:0 0 19px #64e5ed;animation:portalLoad1500 1s}',
'@keyframes portalLoad1500{from{transform:scaleX(0)}to{transform:scaleX(1)}}@keyframes portalExit1500{0%{opacity:0}15%{opacity:1}70%{opacity:1}100%{opacity:0}}',
'@media(max-width:960px){#login.luxPortal1500 .authShell{grid-template-columns:minmax(0,1fr) minmax(305px,405px);padding:20px 16px;gap:17px}#login.luxPortal1500 .portalTitle1500{font-size:clamp(35px,5vw,60px)}#login.luxPortal1500 .portalArt1500{height:clamp(155px,29vh,260px)}#login.luxPortal1500 .authCard{padding:16px;min-height:285px}}',
'@media(max-height:450px) and (orientation:landscape){#login.luxPortal1500 .authShell{padding:13px 17px;gap:13px}#login.luxPortal1500 .portalTitle1500{font-size:clamp(33px,5vw,53px);margin:6px 0 4px}#login.luxPortal1500 .portalSubtitle1500{font-size:10px;margin-bottom:7px}#login.luxPortal1500 .portalArt1500{height:clamp(145px,27vh,184px)}#login.luxPortal1500 .portalLeverPanel1500{padding:6px 11px;margin-top:7px}#login.luxPortal1500 .portalLeverInfo1500 strong{font-size:10px}#login.luxPortal1500 .portalLeverInfo1500 span{font-size:9px}#login.luxPortal1500 .authCard{min-height:280px;padding:12px}#login.luxPortal1500 .authCard:before{margin-bottom:6px}#login.luxPortal1500 .authTabs{margin-bottom:8px}#login.luxPortal1500 .authTab{padding:7px}#login.luxPortal1500 .authPane h2{font-size:19px}#login.luxPortal1500 .authPane .muted{font-size:10px;margin-bottom:6px}#login.luxPortal1500 .authPane label{margin:7px 0;font-size:11px}#login.luxPortal1500 .authPane input{padding:8px 10px}#login.luxPortal1500 .primaryBtn{padding:8px!important}}',
'@media(max-width:700px) and (orientation:portrait){#login.luxPortal1500 .authShell{grid-template-columns:1fr;gap:18px;padding:22px 16px 35px}#login.luxPortal1500 .portalArt1500{height:210px}#login.luxPortal1500 .authCard{max-width:none}}',
'@media(prefers-reduced-motion:reduce){#login.luxPortal1500 *,#login.luxPortal1500:after{transition:none!important;animation:none!important}#luxLaunch1500{animation-duration:.18s}}'
].join('\n');document.head.appendChild(style);
brand.innerHTML=[
'<div class="portalEyebrow1500">LUXEMBURG · DEINE WELT</div>',
'<h1 class="portalTitle1500">Willkommen in <span>Lux City.</span></h1>',
'<p class="portalSubtitle1500">Hinter diesem Tor beginnt deine Geschichte. Aktiviere den Zugang und betrete die Stadt.</p>',
'<div class="portalArt1500" aria-hidden="true">',
'<div class="portalVista1500"><div class="portalSkyline1500"></div><div class="portalRoad1500"></div></div>',
'<div class="portalDoor1500 portalDoorLeft1500"><b>L</b></div><div class="portalDoor1500 portalDoorRight1500"><b>C</b></div>',
'<div class="portalTop1500"><span>GATE 01 · STADTZUGANG</span><i></i></div><div class="portalSill1500"></div></div>',
'<div class="portalLeverPanel1500"><div class="portalLeverInfo1500"><strong>HAUPTSCHALTER · STADTSTART</strong><span id="portalHelp1500">Lege den Hebel um, um das Tor zu öffnen.</span><small id="portalState1500">SYSTEM AUS · GESPERRT</small></div>',
'<button type="button" id="portalLever1500" aria-label="Licht einschalten und Tor öffnen" aria-pressed="false"><span class="portalLeverTrack1500"><span class="portalLeverGrip1500"></span></span></button></div>'
].join('');
const skyline=brand.querySelector('.portalSkyline1500');
[48,74,55,91,66,86,59,100,68,93,56,83,71,95,62,78].forEach(h=>{let b=document.createElement('span');b.className='portalTower1500';b.style.setProperty('--h',h+'%');skyline.appendChild(b)});
const lock=document.createElement('div');lock.className='portalLocked1500';lock.setAttribute('aria-hidden','true');
lock.innerHTML='<div class="symbol">⌁</div><strong>Zugang geschlossen</strong><small>Betätige links den Lichthebel. Erst dann wird deine Anmeldung oder Registrierung freigeschaltet.</small>';
card.appendChild(lock);
const lever=brand.querySelector('#portalLever1500');let on=false,done=false;
function power(value){
 on=!!value;login.classList.toggle('on',on);
 lever.setAttribute('aria-pressed',String(on));
 lever.setAttribute('aria-label',on?'Tor schließen und Licht ausschalten':'Licht einschalten und Tor öffnen');
 brand.querySelector('#portalState1500').textContent=on?'SYSTEM AN · TOR OFFEN':'SYSTEM AUS · GESPERRT';
 brand.querySelector('#portalHelp1500').textContent=on?'Das Tor ist offen. Du kannst dich anmelden.':'Lege den Hebel um, um das Tor zu öffnen.';
 card.inert=!on;
}
lever.onclick=()=>power(!on);power(false);
function entered(){
 if(done||!document.body.classList.contains('game-ready'))return;
 done=true;power(false);
 const overlay=document.createElement('div');overlay.id='luxLaunch1500';overlay.setAttribute('aria-hidden','true');
 overlay.innerHTML='<strong>LUX CITY</strong><i class="bar"></i><span>LICHT AUS · SPIELSTART</span>';
 document.body.appendChild(overlay);
 setTimeout(()=>overlay.remove(),matchMedia('(prefers-reduced-motion:reduce)').matches?220:1280)
}
new MutationObserver(()=>{if(document.body.classList.contains('game-ready'))entered()}).observe(document.body,{attributes:true,attributeFilter:['class']});
addEventListener('luxcity:manual-login',entered);
if(document.body.classList.contains('game-ready'))entered();
window.LuxPortal1500={version:'15.0.0',power,get powered(){return on}};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init()
})();