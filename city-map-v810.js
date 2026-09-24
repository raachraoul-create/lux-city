(()=>{let q=setInterval(()=>{let W=window.LuxWorld,H=window.LuxHomes520,C=window.LuxCivic404,S=window.LuxSystems330;if(!W?.player||!H?.spots||!H?.doors||!C||!S?.doors)return;clearInterval(q);init()},180);
function init(){
 const W=window.LuxWorld,H=window.LuxHomes520,C=window.LuxCivic404,S=window.LuxSystems330;
 const RANGE={minX:-260,maxX:260,minZ:-260,maxZ:260},NS='http://www.w3.org/2000/svg';
 let overlay=null,svg=null,playerDot=null,homeDot=null,waypoint=null,wayHud=null,lastHomeSig='';
 const editable=()=>['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName);
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 function xy(x,z){return{x:(x-RANGE.minX)/(RANGE.maxX-RANGE.minX)*600,y:(RANGE.maxZ-z)/(RANGE.maxZ-RANGE.minZ)*600}}
 function currentHome(){
   let A=window.LuxAccount,L=window.LuxLife?.state,SA=window.LuxServerAssets740||window.LuxServerAssets710,uid=A?.session?.user?.id;
   if(!uid)return null;
   let civic=C.state?.home,id=null,label=null,kind=null,status=null;
   let server=null;
   if(civic?.serverId)server=(SA?.serverHomes||[]).find(h=>String(h.id)===String(civic.serverId));
   if(!server&&SA?.activeServerHome)server=(SA.serverHomes||[]).find(h=>String(h.id)===String(SA.activeServerHome));
   if(!server)server=(SA?.serverHomes||[]).find(h=>h.owner===uid||h.tenant===uid);
   if(server){
     id=server.kind==='haus'?'family':'flat';label=server.label|| (server.kind==='haus'?'Mein Haus':'Meine Wohnung');
     kind=server.kind==='haus'?'Haus':'Wohnung';status=server.owner===uid?'Eigentum':'Miete'
   }else if(civic?.id&&['studio','flat','family'].includes(civic.id)){
     id=civic.id;label=civic.name||'Mein Zuhause';kind=id==='family'?'Haus':'Wohnung';status=C.state?.owned?'Eigentum':'Miete'
   }else if((L?.starterMonths||0)>0){
     id='flat';label='Gemeinde-Startwohnung';kind='Wohnung';status='Gemeinde · kostenlos'
   }else return null;
   if((L?.starterMonths||0)>0&&(!civic?.id||civic.id==='flat')&&!server){id='flat';label='Gemeinde-Startwohnung';kind='Wohnung';status='Gemeinde · kostenlos'}
   let p=H.spots[id]||H.spots.flat,d=H.doors[id]||p;
   return{id,label,kind,status,x:p.x,z:p.z,doorX:d.x,doorZ:d.z}
 }
 function residences(){
   let home=currentHome();
   return[
     {id:'studio',label:'Studio Zentrum',sub:'Wohngebäude',x:H.spots.studio.x,z:H.spots.studio.z},
     {id:'flat',label:home?.id==='flat'&&home.label==='Gemeinde-Startwohnung'?'Gemeinde-Startwohnung':'Wohnungsgebäude',sub:home?.id==='flat'?'Wohnungen · '+(home.status||''):'Wohnungen',x:H.spots.flat.x,z:H.spots.flat.z},
     {id:'family',label:'Häuser / Familienwohnen',sub:'Wohnhäuser',x:H.spots.family.x,z:H.spots.family.z}
   ]
 }
 function el(name,attrs={},text=''){let n=document.createElementNS(NS,name);for(let[k,v]of Object.entries(attrs))n.setAttribute(k,v);if(text)n.textContent=text;return n}
 function road(x1,z1,x2,z2,w=18){let a=xy(x1,z1),b=xy(x2,z2);svg.appendChild(el('line',{x1:a.x,y1:a.y,x2:b.x,y2:b.y,stroke:'#3e4852','stroke-width':w,'stroke-linecap':'round'}));svg.appendChild(el('line',{x1:a.x,y1:a.y,x2:b.x,y2:b.y,stroke:'#89939b','stroke-width':1.2,'stroke-dasharray':'8 8',opacity:.42}))}
 function marker(x,z,label,sub,type='home',click){
   let p=xy(x,z),g=el('g',{'data-type':type,tabindex:'0','aria-label':label});
   let fill=type==='mine'?'#f0a51a':type==='civic'?'#73b7ff':type==='public'?'#aab3bb':'#d7dce0';
   g.appendChild(el('circle',{cx:p.x,cy:p.y,r:type==='mine'?11:8,fill,stroke:'#0b1118','stroke-width':3}));
   if(type==='mine')g.appendChild(el('circle',{cx:p.x,cy:p.y,r:16,fill:'none',stroke:'#f0a51a','stroke-width':2,opacity:.55}));
   let t=el('text',{x:p.x+14,y:p.y-3,fill:'#fff','font-size':'11','font-weight':'800'},label);g.appendChild(t);
   if(sub)g.appendChild(el('text',{x:p.x+14,y:p.y+10,fill:'#aab6c0','font-size':'8'},sub));
   if(click){g.style.cursor='pointer';g.addEventListener('click',click);g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();click()}})}
   svg.appendChild(g);return g
 }
 function render(){
   if(!svg)return;svg.innerHTML='';
   svg.appendChild(el('rect',{x:0,y:0,width:600,height:600,rx:18,fill:'#162128'}));
   road(-235,-210,235,-210,22);road(-235,-90,235,-90,20);road(-235,35,235,35,18);road(-235,115,235,115,18);road(-95,-245,-95,245,20);road(92,-245,92,245,20);road(210,-110,210,155,16);
   svg.appendChild(el('text',{x:20,y:28,fill:'#90a0aa','font-size':'11','font-weight':'800'},'N ↑'));
   for(const r of residences()){
      let home=currentHome(),mine=home?.id===r.id;
      marker(r.x,r.z,mine?('🏠 '+home.label):('□ '+r.label),mine?(home.kind+' · '+home.status):r.sub,mine?'mine':'home',()=>showResidence(r.id))
   }
   let pub=[['🏛 Gemeinde',S.doors.townhall,'public'],['🚓 Polizei',S.doors.police,'public'],['🚒 Feuerwehr',S.doors.fire,'public'],['🏥 Krankenhaus',S.doors.hospital,'public']];
   for(let [label,p,type] of pub)if(p)marker(p.x,p.z,label,'',type);
   let p=xy(W.player.position.x,W.player.position.z);playerDot=el('g');playerDot.appendChild(el('circle',{cx:p.x,cy:p.y,r:7,fill:'#56e08a',stroke:'#08110c','stroke-width':3}));playerDot.appendChild(el('text',{x:p.x+12,y:p.y+4,fill:'#8ff4af','font-size':'9','font-weight':'900'},'DU'));svg.appendChild(playerDot);
   let home=currentHome();if(home){let hp=xy(home.x,home.z);homeDot={x:hp.x,y:hp.y}}
   updateInfo()
 }
 function showResidence(id){
   let home=currentHome(),r=residences().find(x=>x.id===id),info=document.getElementById('mapInfo810');if(!info||!r)return;
   let mine=home?.id===id;
   info.innerHTML='<b>'+(mine?home.label:r.label)+'</b><small>'+(mine?(home.kind+' · '+home.status):r.sub)+'</small>'+(mine?'<button id="mapWaypoint810">ZUHAUSE ALS WEGPUNKT</button>':'');
   let b=document.getElementById('mapWaypoint810');if(b)b.onclick=()=>{waypoint={x:home.x,z:home.z,label:home.label};updateWaypoint();close()}
 }
 function updateInfo(){let h=currentHome(),info=document.getElementById('mapHome810');if(!info)return;if(!h){info.innerHTML='<b>Noch kein Zuhause</b><small>Deine Wohnung oder dein Haus wird hier automatisch angezeigt.</small>';return}let d=Math.round(Math.hypot(W.player.position.x-h.x,W.player.position.z-h.z));info.innerHTML='<b>🏠 '+h.label+'</b><small>'+h.kind+' · '+h.status+' · ca. '+d+' m entfernt</small><button id="mapGoHome810">WEGPUNKT SETZEN</button>';let b=document.getElementById('mapGoHome810');if(b)b.onclick=()=>{waypoint={x:h.x,z:h.z,label:h.label};updateWaypoint();close()}}
 function updatePlayer(){
   if(!playerDot||!svg)return;let p=xy(W.player.position.x,W.player.position.z),c=playerDot.querySelector('circle'),t=playerDot.querySelector('text');if(c){c.setAttribute('cx',p.x);c.setAttribute('cy',p.y)}if(t){t.setAttribute('x',p.x+12);t.setAttribute('y',p.y+4)}
   updateInfo();updateWaypoint()
 }
 function updateWaypoint(){
   if(!wayHud)return;if(!waypoint){wayHud.hidden=true;return}
   let dx=waypoint.x-W.player.position.x,dz=waypoint.z-W.player.position.z,dist=Math.hypot(dx,dz);
   if(dist<3){wayHud.hidden=false;wayHud.querySelector('.wpArrow').style.transform='rotate(0deg)';wayHud.querySelector('.wpText').textContent='Zuhause erreicht';return}
   let target=Math.atan2(dx,dz),rel=target-(W.yaw||0),deg=rel*180/Math.PI;
   wayHud.hidden=false;wayHud.querySelector('.wpArrow').style.transform='rotate('+deg+'deg)';wayHud.querySelector('.wpText').textContent=waypoint.label+' · '+Math.round(dist)+' m'
 }
 function build(){
   let style=document.createElement('style');style.textContent=`
    #luxMap810{position:fixed;inset:0;z-index:175;background:#05090ddf;color:#fff;display:grid;place-items:center;padding:14px;font:14px Inter,Arial,sans-serif;backdrop-filter:blur(10px)}
    #luxMap810[hidden]{display:none!important}.mapCard810{width:min(900px,96vw);max-height:92vh;overflow:auto;background:#0e151c;border:1px solid #ffffff22;border-radius:20px;box-shadow:0 28px 85px #000c}.mapHead810{position:sticky;top:0;z-index:3;display:flex;justify-content:space-between;align-items:center;padding:13px 15px;background:#101820f2;border-bottom:1px solid #ffffff16}.mapHead810 b{font-size:18px}.mapHead810 button{background:#ffffff12;color:#fff;padding:7px 10px}
    .mapGrid810{display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:14px;padding:14px}.mapCanvas810{background:#162128;border-radius:16px;overflow:hidden;min-width:0}.mapCanvas810 svg{display:block;width:100%;height:auto;aspect-ratio:1/1}.mapSide810{display:flex;flex-direction:column;gap:10px}.mapPanel810{background:#151e27;border:1px solid #ffffff12;border-radius:14px;padding:12px}.mapPanel810 b{display:block;font-size:15px}.mapPanel810 small{display:block;color:#9bacb8;line-height:1.4;margin-top:4px}.mapPanel810 button{width:100%;margin-top:10px;padding:9px}
    .mapLegend810{display:grid;grid-template-columns:1fr 1fr;gap:7px;font-size:11px;color:#c7d0d7}.mapLegend810 span{display:flex;align-items:center;gap:6px}.mapLegend810 i{width:10px;height:10px;border-radius:50%;display:inline-block}.mapNote810{font-size:10px;color:#8797a4;line-height:1.4;margin-top:8px}
    #mapBtn810{pointer-events:auto}.wayHud810{position:fixed;z-index:58;left:50%;bottom:62px;transform:translateX(-50%);background:#0b1118e8;color:#fff;border:1px solid #ffffff22;border-radius:12px;padding:8px 12px;display:flex;align-items:center;gap:9px;font:bold 12px Arial;box-shadow:0 8px 30px #0008}.wayHud810[hidden]{display:none!important}.wpArrow{display:inline-block;font-size:24px;transform-origin:center}.wayHud810 button{background:#ffffff12;color:#fff;padding:4px 7px;font-size:10px}
    @media(max-width:720px){.mapGrid810{grid-template-columns:1fr}.mapCard810{max-height:94vh}.mapSide810{display:grid;grid-template-columns:1fr 1fr}.mapPanel810:last-child{grid-column:1/-1}}
    @media(max-width:430px){.mapGrid810{padding:8px;gap:8px}.mapSide810{grid-template-columns:1fr}.mapHead810 b{font-size:15px}}
   `;document.head.appendChild(style);
   overlay=document.createElement('section');overlay.id='luxMap810';overlay.hidden=true;overlay.innerHTML=`
    <div class="mapCard810">
      <div class="mapHead810"><b>🗺️ Lux City Karte</b><button id="mapClose810">✕</button></div>
      <div class="mapGrid810">
       <div class="mapCanvas810"><svg id="mapSvg810" viewBox="0 0 600 600" role="img" aria-label="Stadtkarte von Lux City mit Wohngebäuden"></svg></div>
       <aside class="mapSide810">
        <div class="mapPanel810" id="mapHome810"></div>
        <div class="mapPanel810" id="mapInfo810"><b>Wohngebäude antippen</b><small>Die Karte zeigt die tatsächlich vorhandenen Wohngebäude. Dein aktuelles Zuhause wird hervorgehoben.</small></div>
        <div class="mapPanel810"><b>Legende</b><div class="mapLegend810"><span><i style="background:#56e08a"></i>Du</span><span><i style="background:#f0a51a"></i>Dein Zuhause</span><span><i style="background:#d7dce0"></i>Wohngebäude</span><span><i style="background:#aab3bb"></i>Öffentlich</span></div><div class="mapNote810">M = Karte öffnen/schließen. Auf Smartphone über KARTE oder die Karten-App im Handy.</div></div>
       </aside>
      </div>
    </div>`;document.body.appendChild(overlay);svg=document.getElementById('mapSvg810');document.getElementById('mapClose810').onclick=close;
   let hud=document.getElementById('hud');if(hud&&!document.getElementById('mapBtn810')){let b=document.createElement('button');b.id='mapBtn810';b.textContent='🗺️ KARTE / M';b.onclick=toggle;hud.appendChild(b)}
   wayHud=document.createElement('div');wayHud.className='wayHud810';wayHud.hidden=true;wayHud.innerHTML='<span class="wpArrow">↑</span><span class="wpText"></span><button id="wpClear810">✕</button>';document.body.appendChild(wayHud);document.getElementById('wpClear810').onclick=()=>{waypoint=null;updateWaypoint()}
 }
 function open(){if(!document.body.classList.contains('game-ready'))return;overlay.hidden=false;render()}
 function close(){if(overlay)overlay.hidden=true}
 function toggle(){overlay?.hidden?open():close()}
 build();setInterval(updatePlayer,450);
 addEventListener('keydown',e=>{if(e.repeat||editable())return;if(e.code==='KeyM'||String(e.key).toLowerCase()==='m'){e.preventDefault();toggle()}if(e.code==='Escape'&&overlay&&!overlay.hidden){e.preventDefault();close()}});
 window.LuxCityMap810={open,close,toggle,render,currentHome,setWaypointHome(){let h=currentHome();if(h){waypoint={x:h.x,z:h.z,label:h.label};updateWaypoint();return true}return false}}
}})();