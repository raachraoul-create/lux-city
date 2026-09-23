(()=>{const NEXT=[
'Fiktive Premium-Automarken & Tesla-artiges Spielerauto',
'Kfz-Steuer & mehrere Versicherungen',
'Pannen, Abschleppdienst & Werkstatt-Aufträge',
'Supermarkt & täglicher Einkauf',
'Bus & ÖPNV wirklich nutzbar machen'
];
const STATUS={'Fiktive Premium-Automarken & Tesla-artiges Spielerauto':'planned','Kfz-Steuer & mehrere Versicherungen':'planned','Pannen, Abschleppdienst & Werkstatt-Aufträge':'planned','Supermarkt & täglicher Einkauf':'planned','Bus & ÖPNV wirklich nutzbar machen':'planned'};const GOALS=['Grafik und Stadtbild Schritt für Schritt auf deutlich realistischeres Open-World-Niveau bringen','Spieler, KI, Häuser und Gebäude wesentlich detaillierter modellieren','Fiktive Premium-Automarken mit klar unterschiedlichen Designs und Antrieben','Eigenes Elektroauto als sportliche, Tesla-artige Limousine mit eigenem Lux-City-Logo','Kfz-Steuer für Elektro, Benzin und Diesel','Mehrere Kfz-Versicherungen mit unterschiedlichen Preisen und Leistungen','Mehr Bäume, Grünflächen, Straßen, Kreuzungen und Grundstücksdetails','KI mit stärkerem Eigenleben: wohnen, arbeiten, einkaufen, fahren, parken und Freizeit'];
const host=document.getElementById('login');if(!host)return;
const ver=()=>document.querySelector('meta[name="lux-city-build"]')?.content||'–';
let style=document.createElement('style');style.textContent=
'#roadmap722{position:fixed;z-index:125;right:8px;left:auto;top:46px;width:174px;background:#0b1118ec;border:1px solid #ffffff24;border-radius:12px;color:#fff;box-shadow:0 12px 34px #0008;backdrop-filter:blur(12px);font-family:Inter,Arial,sans-serif;overflow:hidden}'+
'#roadmap722 .rmHead{padding:7px 7px 4px;font-weight:900;font-size:9px;letter-spacing:.02em;display:flex;justify-content:space-between;align-items:center}'+
'#roadmap722 .rmVer{font-size:8px;color:#f1b84b;font-weight:900}'+
'#roadmap722 .rmMini{padding:0 7px 5px}#roadmap722 .rmMini div{font-size:8.5px;line-height:1.18;padding:2px 0;color:#e9eef2}'+
'#roadmap722 .rmMini div:before{content:"• ";color:#f1b84b;font-weight:900}'+
'#roadmap722 .rmMoreBtn{width:100%;border:0!important;border-top:1px solid #ffffff14!important;border-radius:0!important;background:#111b25!important;color:#f1b84b!important;padding:5px 6px!important;font-size:9px!important;font-weight:900!important}'+
'#roadmap722 .rmFull{display:none;max-height:56vh;overflow:auto;padding:0 7px 8px;border-top:1px solid #ffffff12}#roadmap722.open .rmFull{display:block}'+
'#roadmap722 h3{font-size:9px;margin:7px 0 4px;color:#f1b84b}#roadmap722 .rmRow{font-size:9px;line-height:1.24;padding:4px 0;border-top:1px solid #ffffff0d;display:flex;gap:6px}'+
'#roadmap722 .tag{font-size:8px;font-weight:900;border-radius:99px;padding:2px 5px;height:max-content;white-space:nowrap}.tagPlan{background:#273747;color:#b9d7ef}.tagWork{background:#604a16;color:#ffd978}.tagDone{background:#244d33;color:#b9f2ca}'+
'#roadmap722 .rmNote{font-size:9px;color:#93a2ad;line-height:1.35;margin-top:8px}'+
'@media(max-width:860px){#roadmap722{right:6px;left:auto;top:42px;width:168px}#roadmap722 .rmHead{font-size:9px}#roadmap722 .rmMini div{font-size:8.5px}#roadmap722 .rmFull{max-height:46vh}}';
document.head.appendChild(style);
let box=document.createElement('aside');box.id='roadmap722';
box.innerHTML='<div class="rmHead"><span>🛠️ NÄCHSTE UPDATES</span><span class="rmVer">V'+ver()+'</span></div><div class="rmMini" id="rmMini722"></div><button class="rmMoreBtn" id="rmMore722">MEHR ANZEIGEN</button><div class="rmFull"><h3>ALS NÄCHSTES</h3><div id="rmNext722"></div><h3>GROSSE ZIELE</h3><div id="rmGoals722"></div><div class="rmNote">Fertige Punkte verschwinden automatisch. Neue sinnvolle Updates rücken nach.</div></div>';
host.appendChild(box);
document.getElementById('rmMini722').innerHTML=NEXT.slice(0,2).map(t=>'<div>'+t+'</div>').join('');
document.getElementById('rmNext722').innerHTML=NEXT.map((t,i)=>{let st=STATUS[t]||'planned',cl=st==='work'?'tagWork':'tagPlan',tx=st==='work'?'IN ARBEIT':'GEPLANT';return '<div class="rmRow"><span class="tag '+cl+'">'+tx+'</span><span>'+(i+1)+'. '+t+'</span></div>'}).join('');document.getElementById('rmGoals722').innerHTML=GOALS.map(t=>'<div class="rmRow"><span class="tag tagPlan">ZIEL</span><span>'+t+'</span></div>').join('');

let b=document.getElementById('rmMore722');b.onclick=()=>{box.classList.toggle('open');b.textContent=box.classList.contains('open')?'WENIGER ANZEIGEN':'MEHR ANZEIGEN'};
window.LuxRoadmap722={next:NEXT,status:STATUS,goals:GOALS}})();