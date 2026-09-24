(()=>{let q=setInterval(()=>{let W=window.LuxWorld,H=window.LuxHomes520,S=window.LuxSystems330,C=window.LuxCivic404;if(!W?.player||!H?.spots||!S?.doors||!C)return;clearInterval(q);init()},180);
function init(){
 const W=window.LuxWorld,H=window.LuxHomes520,S=window.LuxSystems330,C=window.LuxCivic404,R=145,SPAN=150,NS='http://www.w3.org/2000/svg';
 let root,svg,layer,label,centerX=R,centerY=R,lastSig='';
 const businessIcons={bakery:'🥐',cafe:'☕',pub:'🍽',mill:'⚙',sugar:'◇',bottler:'◉',post:'✉'};
 const editable=()=>['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName);
 function homeRows(){
   let A=window.LuxAccount,SA=window.LuxServerAssets740||window.LuxServerAssets710,uid=A?.session?.user?.id,L=window.LuxLife?.state,out=[];
   for(const h of SA?.serverHomes||[]){
     if(h.owner!==uid&&h.tenant!==uid)continue;
     let id=h.kind==='haus'?'family':'flat',p=H.spots[id];if(!p)continue;
     out.push({x:p.x,z:p.z,label:h.label|| (h.kind==='haus'?'Mein Haus':'Meine Wohnung'),type:h.owner===uid?'Eigentum':'Miete',icon:'⌂'});
   }
   if(!out.length){
     let id=C.state?.home?.id;
     if(['studio','flat','family'].includes(id)&&H.spots[id]){
       out.push({x:H.spots[id].x,z:H.spots[id].z,label:C.state.home?.name||'Mein Zuhause',type:C.state.owned?'Eigentum':'Miete',icon:'⌂'})
     }else if((L?.starterMonths||0)>0&&H.spots.flat){
       out.push({x:H.spots.flat.x,z:H.spots.flat.z,label:'Gemeinde-Startwohnung',type:'Gemeinde',icon:'⌂'})
     }
   }
   return out
 }
 function businessRows(){
   let E=window.LuxEconomy;if(!E?.myBusinesses)return[];
   return(E.myBusinesses()||[]).map(id=>{let p=S.doors[id];if(!p)return null;return{x:p.x,z:p.z,label:E.ECON?.nodes?.[id]?.name||id,type:'Firma',icon:businessIcons[id]||'◆'}}).filter(Boolean)
 }
 function mapPos(x,z,cx,cz){let scale=(R-12)/SPAN;return{x:centerX+(x-cx)*scale,y:centerY-(z-cz)*scale}}
 function playerWorldPos(){
   if(H.inside){
     let id=H.currentHomeId||C.state?.home?.id||'flat',p=H.spots[id]||H.spots.flat;
     if(p)return{x:p.x,z:p.z,inside:true}
   }
   let p=W.player.position;return{x:p.x,z:p.z,inside:false}
 }
 function dot(x,z,cx,cz,text,kind,title){
   let p=mapPos(x,z,cx,cz),dx=p.x-centerX,dy=p.y-centerY,d=Math.hypot(dx,dy),max=R-14;if(d>max){p.x=centerX+dx/d*max;p.y=centerY+dy/d*max}
   let g=document.createElementNS(NS,'g');g.setAttribute('aria-label',title||text);
   let c=document.createElementNS(NS,'circle');c.setAttribute('cx',p.x);c.setAttribute('cy',p.y);c.setAttribute('r',kind==='player'?7:kind==='home'?6:5);c.setAttribute('fill',kind==='player'?'#55e68a':kind==='home'?'#f2a91b':'#70b7ff');c.setAttribute('stroke','#071015');c.setAttribute('stroke-width','2.4');g.appendChild(c);
   if(text){let t=document.createElementNS(NS,'text');t.setAttribute('x',p.x);t.setAttribute('y',p.y+3);t.setAttribute('text-anchor','middle');t.setAttribute('font-size',kind==='player'?'8':'7');t.setAttribute('font-weight','900');t.setAttribute('fill',kind==='player'?'#071015':'#fff');t.textContent=text;g.appendChild(t)}
   layer.appendChild(g)
 }
 function roads(cx,cz){
   const lines=[[-260,-210,260,-210],[-260,-90,260,-90],[-260,35,260,35],[-260,115,260,115],[-95,-260,-95,260],[92,-260,92,260],[210,-120,210,170]];
   for(const a of lines){let p1=mapPos(a[0],a[1],cx,cz),p2=mapPos(a[2],a[3],cx,cz);let l=document.createElementNS(NS,'line');l.setAttribute('x1',p1.x);l.setAttribute('y1',p1.y);l.setAttribute('x2',p2.x);l.setAttribute('y2',p2.y);l.setAttribute('stroke','#59636b');l.setAttribute('stroke-width','5');l.setAttribute('stroke-linecap','round');l.setAttribute('opacity','.75');layer.appendChild(l)}
 }
 function refresh(){
   if(!document.body.classList.contains('game-ready')){root.hidden=true;return}root.hidden=false;
   let pp=playerWorldPos(),cx=pp.x,cz=pp.z;layer.innerHTML='';roads(cx,cz);
   let homes=homeRows(),businesses=businessRows();
   for(const h of homes)dot(h.x,h.z,cx,cz,'⌂','home',h.label+' · '+h.type);
   for(const b of businesses)dot(b.x,b.z,cx,cz,b.icon,'business',b.label);
   dot(cx,cz,cx,cz,'▲','player','Du');
   let rot=-(W.yaw||0)*180/Math.PI;let tri=layer.lastChild;tri?.setAttribute?.('transform','rotate('+rot+' '+centerX+' '+centerY+')');
   let near=[...homes,...businesses].map(x=>({...x,d:Math.round(Math.hypot(x.x-cx,x.z-cz))})).sort((a,b)=>a.d-b.d)[0];
   label.textContent=pp.inside?'IN WOHNUNG':near?(near.label+' · '+near.d+' m'):'LUX CITY';
 }
 function build(){
   let style=document.createElement('style');style.textContent=`
   #luxMiniMap820{position:fixed;right:14px;bottom:14px;z-index:52;width:178px;height:205px;background:#0a1118d9;color:#fff;border:1px solid #ffffff2b;border-radius:18px;box-shadow:0 10px 35px #0008;backdrop-filter:blur(8px);overflow:hidden;pointer-events:auto;font:11px Arial}
   #luxMiniMap820[hidden]{display:none!important}#luxMiniMap820 .mmHead{height:27px;display:flex;align-items:center;justify-content:space-between;padding:0 9px;background:#0d1720;border-bottom:1px solid #ffffff18;font-weight:900}#luxMiniMap820 .mmHead span:last-child{color:#95a6b2;font-size:9px}
   #luxMiniMap820 svg{display:block;width:178px;height:152px;background:#142027}#luxMiniMap820 .mmFoot{height:26px;display:flex;align-items:center;padding:0 9px;color:#c8d2d9;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-top:1px solid #ffffff14}
   body:not(.game-ready) #luxMiniMap820{display:none!important}
   @media(max-width:900px) and (orientation:landscape){#luxMiniMap820{width:142px;height:164px;right:8px;bottom:8px;border-radius:14px}#luxMiniMap820 svg{width:142px;height:112px}#luxMiniMap820 .mmHead{height:25px;padding:0 7px;font-size:9px}#luxMiniMap820 .mmFoot{height:25px;padding:0 7px;font-size:9px}}
   @media(max-width:520px) and (orientation:portrait){#luxMiniMap820{width:132px;height:154px;right:7px;bottom:74px}#luxMiniMap820 svg{width:132px;height:103px}.mmHead820{font-size:9px}}
   `;document.head.appendChild(style);
   root=document.createElement('aside');root.id='luxMiniMap820';root.innerHTML='<div class="mmHead"><span>🗺️ KARTE</span><span>MEINE ORTE</span></div><svg id="miniSvg820" viewBox="0 0 290 290" role="img" aria-label="Dauerhafte Lux-City-Minimap"><defs><clipPath id="miniClip820"><circle cx="145" cy="145" r="141"/></clipPath></defs><circle cx="145" cy="145" r="141" fill="#142027"/><g id="miniLayer820" clip-path="url(#miniClip820)"></g><circle cx="145" cy="145" r="141" fill="none" stroke="#ffffff22" stroke-width="2"/><text x="145" y="16" fill="#a9bac4" text-anchor="middle" font-size="9" font-weight="900">N</text></svg><div class="mmFoot" id="miniLabel820">LUX CITY</div>';document.body.appendChild(root);svg=document.getElementById('miniSvg820');layer=document.getElementById('miniLayer820');label=document.getElementById('miniLabel820');
   root.addEventListener('click',()=>window.LuxCityMap810?.open?.())
 }
 build();refresh();setInterval(refresh,180);
 window.LuxMiniMap820={refresh,homeRows,businessRows,get visible(){return !root.hidden}}
}})();