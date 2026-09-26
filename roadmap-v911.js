(()=>{const QA=/githack/i.test(location.hostname)||/qa/i.test(document.title);const current=()=>document.querySelector('meta[name="lux-city-build"]')?.content||'0.0.0';
const parts=v=>String(v).match(/\d+/g)?.slice(0,3).map(Number)||[0,0,0],gte=(a,b)=>{let A=parts(a),B=parts(b);for(let i=0;i<3;i++){if((A[i]||0)!==(B[i]||0))return(A[i]||0)>(B[i]||0)}return true};
const ITEMS=[
 {t:'Wohnung Sofort-Fix: Innenraum direkt sichtbar, Essen/Trinken/Schlafen/Duschen und Ausgang zuverlässig',s:'work',release:'8.1.1'},
 {t:'Feuerwehr Block 1: realistischere Wache mit drei Hallentoren, Vorplatz und Straßenanschluss',s:'work',release:'8.1.0'},
 {t:'Wohlbefinden-HUD kompakter und aus der Steuerungsecke verschieben',s:'work',release:'8.0.2'},
 {t:'Login-/Cloud-Reload-Schleife stoppen und aktive Spielsitzung stabil halten',s:'work',release:'8.0.2'},
 {t:'Karte final lesbar: Nordausrichtung, Richtungspfeil zum Zuhause/Ziel und echte Hausmarkierungen',s:'work',release:'8.0.0'},
 {t:'Mehr KI-Fußgänger ausschließlich auf Gehwegen und über markierte Zebrastreifen',s:'work',release:'8.0.0'},
 {t:'Spieler-Auto-Kollision: Figur kann nicht mehr durch oder über Fahrzeuge glitchen',s:'work',release:'8.0.0'},
 {t:'Grafik-Politur: Straßenmarkierungen, Bordsteine, Pflanzen, Vorgärten und Stadtdetails',s:'work',release:'8.0.0'},
 {t:'Smartphone-Steuerung neu: Minimap oben, freier E-Knopf, direkte Handy/Karte-Tasten und vier Fahrknöpfe',s:'work',release:'8.0.0'},
 {t:'Wohnungszugang und Türsystem: eigenes Zuhause zuverlässig betreten/verlassen',s:'work',release:'8.0.0'},
 {t:'Auto überarbeitet: Rückwärtsfahren, Kollisionslösung und Festfahren verbessern',s:'work',release:'8.0.0'},
 {t:'Karte neu: echte Straßen/Häuser, eigenes Zuhause und Firmen klar anzeigen',s:'work',release:'8.0.0'},
 {t:'Realistischere Motor-, Fahr-, Schritt-, Tür- und Kollisionsgeräusche + mehr Stadtleben',s:'work',release:'8.0.0'},
 {t:'Dauerhafte Minimap: Spieler, Zuhause, eigene Immobilien und Firmen immer sichtbar · Navigationssystem neu aufgebaut',s:'work',release:'7.9.0'},
 {t:'Steuerungsschutz: A/Links bleibt links, D/Rechts bleibt rechts',s:'work',release:'7.9.0'},
 {t:'Stadtkarte: Wohngebäude, Gemeinde-Startwohnung, eigenes Zuhause und Wegpunkt',s:'work',release:'7.9.0'},
 {t:'Wohnungen stabilisieren: kein schwarzer Bildschirm, sicherer Start und zuverlässiger Ausgang',s:'work',release:'7.9.0'},
 {t:'Handy-Auswahl: Glass OS oder Droid UI – einmal wählen, dauerhaft gespeichert',s:'work',release:'7.9.0'},
 {t:'Handy mit Bank, vier Kfz-Versicherungen, Steuern und Gemeinde-Rechnungen',s:'work',release:'7.9.0'},
 {t:'Einsatzfahrzeuge an Feuerwehr, Polizei und Krankenhaus + Fehlgebäude entfernen',s:'work',release:'7.9.0'},
 {t:'Cloud-Sync/Login-Fortsetzung und Wohnungsstart stabilisieren',s:'work',release:'7.9.0'},
 {t:'Fiktive Premium-Automarken & Tesla-artiges Spielerauto',s:'planned'},
 {t:'Pannen, Abschleppdienst & Werkstatt-Aufträge',s:'planned'},
 {t:'Supermarkt & täglicher Einkauf',s:'planned'},
 {t:'Bus & ÖPNV wirklich nutzbar machen',s:'planned'}
];
const visible=ITEMS.filter(x=>QA||!x.release||!gte(current(),x.release));
const GOALS=['Grafik und Stadtbild jede Stunde realistischer machen','Spieler und KI menschlicher modellieren und animieren','Häuser, Bäume, Straßen und Fahrzeuge detaillierter gestalten','KI mit stärkerem Eigenleben: wohnen, arbeiten, einkaufen, fahren, parken und Freizeit','Wirtschaft, Steuern, Versicherungen, Rechnungen und Banken miteinander verbinden'];
const host=document.getElementById('login');if(!host)return;
let style=document.createElement('style');style.textContent='#roadmap790{position:fixed;z-index:125;right:8px;top:46px;width:188px;background:#0b1118ec;border:1px solid #ffffff24;border-radius:12px;color:#fff;box-shadow:0 12px 34px #0008;backdrop-filter:blur(12px);font-family:Inter,Arial,sans-serif;overflow:hidden}#roadmap790 .rmHead{padding:8px 8px 5px;font-weight:900;font-size:9px;display:flex;justify-content:space-between;gap:5px}#roadmap790 .rmVer{font-size:8px;color:#f1b84b}#roadmap790 .rmMini{padding:0 8px 6px}#roadmap790 .rmMini div{font-size:8.5px;line-height:1.22;padding:2px 0;color:#e9eef2}#roadmap790 .rmMini div:before{content:"• ";color:#f1b84b;font-weight:900}#roadmap790 .rmMoreBtn{width:100%;border:0!important;border-top:1px solid #ffffff14!important;border-radius:0!important;background:#111b25!important;color:#f1b84b!important;padding:6px!important;font-size:9px!important;font-weight:900!important}#roadmap790 .rmFull{display:none;max-height:58vh;overflow:auto;padding:0 8px 9px;border-top:1px solid #ffffff12}#roadmap790.open .rmFull{display:block}#roadmap790 h3{font-size:9px;margin:8px 0 4px;color:#f1b84b}#roadmap790 .rmRow{font-size:9px;line-height:1.25;padding:5px 0;border-top:1px solid #ffffff0d;display:flex;gap:6px}.rmTag{font-size:8px;font-weight:900;border-radius:99px;padding:2px 5px;height:max-content;white-space:nowrap}.rmWork{background:#604a16;color:#ffd978}.rmPlan{background:#273747;color:#b9d7ef}#roadmap790 .rmNote{font-size:8.5px;color:#93a2ad;line-height:1.35;margin-top:8px}@media(max-width:860px){#roadmap790{right:6px;top:42px;width:176px}}';document.head.appendChild(style);
let box=document.createElement('aside');box.id='roadmap790';box.innerHTML='<div class="rmHead"><span>🛠️ NÄCHSTE UPDATES</span><span class="rmVer">V'+current()+'</span></div><div class="rmMini" id="rmMini790"></div><button class="rmMoreBtn" id="rmMore790">MEHR ANZEIGEN</button><div class="rmFull"><h3>ALS NÄCHSTES</h3><div id="rmNext790"></div><h3>GROSSE ZIELE</h3><div id="rmGoals790"></div><div class="rmNote">Veröffentlichte Punkte verschwinden auf der öffentlichen Startseite automatisch. Neue Arbeiten rücken nach.</div></div>';host.appendChild(box);
document.getElementById('rmMini790').innerHTML=(visible.length?visible.slice(0,2):[{t:'Nächste Arbeiten werden vorbereitet.'}]).map(x=>'<div>'+x.t+'</div>').join('');
document.getElementById('rmNext790').innerHTML=visible.map((x,i)=>'<div class="rmRow"><span class="rmTag '+(x.s==='work'?'rmWork':'rmPlan')+'">'+(x.s==='work'?'IN ARBEIT':'GEPLANT')+'</span><span>'+(i+1)+'. '+x.t+'</span></div>').join('')||'<div class="rmRow"><span>Keine offenen Punkte aus diesem Paket.</span></div>';
document.getElementById('rmGoals790').innerHTML=GOALS.map(t=>'<div class="rmRow"><span class="rmTag rmPlan">ZIEL</span><span>'+t+'</span></div>').join('');
let b=document.getElementById('rmMore790');b.onclick=()=>{box.classList.toggle('open');b.textContent=box.classList.contains('open')?'WENIGER ANZEIGEN':'MEHR ANZEIGEN'};
window.LuxRoadmap790={items:ITEMS,visible,goals:GOALS,qa:QA}})();