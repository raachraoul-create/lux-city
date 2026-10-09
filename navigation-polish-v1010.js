(()=>{
let q=setInterval(()=>{if(!window.LuxNavigation870||!document.getElementById('navMini840')||!document.getElementById('navBig840'))return;clearInterval(q);init()},300);
function init(){
 if(document.getElementById('navPolish1010'))return;
 const css=document.createElement('style');css.id='navPolish1010';css.textContent=`
 #navMini840{filter:drop-shadow(0 12px 28px #0009)}
 #navMini840 .radar840{background:
   radial-gradient(circle at 50% 48%,#24323d 0 34%,#18232c 35% 66%,#101820 67% 100%)!important;
   border:2px solid #ffffff42!important;box-shadow:inset 0 0 0 1px #0008,0 10px 34px #0009!important}
 #navMini840 .radar840:before{content:"";position:absolute;inset:8px 8px 18px;border-radius:50%;pointer-events:none;
   background:repeating-radial-gradient(circle at center,transparent 0 25px,#ffffff0a 26px 27px,transparent 28px 50px);
   mix-blend-mode:screen}
 #navMini840 .radar840:after{content:"";position:absolute;left:50%;top:5px;width:2px;height:12px;background:#f0b14b;transform:translateX(-50%);border-radius:2px}
 #navMini840 .navFoot840{background:linear-gradient(180deg,#111b24f2,#091017f2)!important;border-color:#ffffff2b!important;
   box-shadow:0 8px 18px #0007!important;letter-spacing:.02em}
 #navBig840{background:radial-gradient(circle at 50% 20%,#1c2a36e8,#03070bf4 68%)!important}
 #navBig840 .navCard840{background:linear-gradient(180deg,#101923f5,#0b1219f7)!important;border:1px solid #ffffff26!important;
   box-shadow:0 28px 90px #000d!important}
 #navBig840 .navHead840{background:linear-gradient(90deg,#182632,#111b24)!important;padding:14px 16px!important}
 #navBig840 .navHead840 b{letter-spacing:.08em;font-size:12px}
 #navBig840 .navMap840{position:relative;background:#0b131a;border:1px solid #ffffff14;box-shadow:inset 0 0 34px #0009}
 #navBig840 .navMap840:after{content:"N";position:absolute;right:12px;top:10px;color:#fff;font:900 12px Arial;
   width:30px;height:30px;border:1px solid #ffffff35;border-radius:50%;display:grid;place-items:center;background:#0b121bd9}
 #navBig840 .navBox840{background:linear-gradient(180deg,#17232d,#111a22)!important;border-color:#ffffff16!important;box-shadow:0 6px 18px #0005}
 #navBig840 .navBox840>b{display:block;color:#f2bd56;letter-spacing:.04em;margin-bottom:5px}
 #navBig840 .navBox840 button{background:#243543!important;color:#f3f6f8!important;border:1px solid #ffffff18!important;transition:.15s}
 #navBig840 .navBox840 button:active{transform:scale(.985)}
 #navWay840{background:linear-gradient(180deg,#13202aeF,#0a1219ef)!important;border-color:#f0a51a66!important;box-shadow:0 8px 26px #0009!important}
 #navWay840 .arr{color:#f0b14b;text-shadow:0 0 12px #f0a51a66}
 @media(max-width:900px) and (pointer:coarse){
   #navMini840{right:7px!important;top:50px!important}
   #navMini840 .radar840{box-shadow:inset 0 0 0 1px #0007,0 6px 20px #0008!important}
   #navBig840{padding:6px!important}
   #navBig840 .navCard840{border-radius:14px!important}
   #navBig840 .navGrid840{padding:8px!important;gap:8px!important}
   #navBig840 .navSide840{grid-template-columns:1fr!important}
   #navBig840 .navBox840{font-size:12px!important}
 }`;document.head.appendChild(css);

 const mini=document.getElementById('navMini840'),rad=mini.querySelector('.radar840'),svg=rad?.querySelector('svg');
 if(rad)rad.style.position='relative';
 if(svg){
   // Compass ticks around existing radar. They are visual only.
   const NS='http://www.w3.org/2000/svg',ring=document.createElementNS(NS,'g');ring.setAttribute('opacity','.62');ring.setAttribute('pointer-events','none');
   for(let i=0;i<24;i++){let a=i/24*Math.PI*2,r1=i%6===0?95:99,r2=103,x1=108+Math.sin(a)*r1,y1=108-Math.cos(a)*r1,x2=108+Math.sin(a)*r2,y2=108-Math.cos(a)*r2,l=document.createElementNS(NS,'line');for(const [k,v] of Object.entries({x1,y1,x2,y2,stroke:i%6===0?'#f0b14b':'#dbe5ea','stroke-width':i%6===0?2:1}))l.setAttribute(k,v);ring.appendChild(l)}
   svg.insertBefore(ring,svg.firstChild);
 }

 const big=document.getElementById('navBig840'),map=big.querySelector('.navMap840'),side=big.querySelector('.navSide840');
 if(map&&!map.querySelector('.mapLegend1010')){
   const leg=document.createElement('div');leg.className='mapLegend1010';leg.innerHTML='<span>● DU</span><span>◆ FIRMA</span><span>■ ZUHAUSE</span><span>● ÖFFENTLICH</span>';
   Object.assign(leg.style,{position:'absolute',left:'10px',bottom:'10px',zIndex:'2',display:'flex',gap:'7px',flexWrap:'wrap',font:'800 9px Arial',color:'#dbe6ec',background:'#071018d9',border:'1px solid #ffffff20',padding:'6px 8px',borderRadius:'8px',pointerEvents:'none'});
   map.appendChild(leg);
 }
 if(side&&!document.getElementById('navHint1010')){
   const n=document.createElement('div');n.id='navHint1010';n.className='navBox840';n.innerHTML='<b>NAVIGATION</b><small>Tippe einen Ort an und setze einen Wegpunkt. Die Minimap bleibt dabei immer sichtbar und zeigt deine Blickrichtung.</small>';
   side.prepend(n);
 }
 window.LuxNavigationPolish1010={version:'10.1.0'}
}
})();