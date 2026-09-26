(()=>{if(new URLSearchParams(location.search).get('homeqa')!=='1')return;
let q=setInterval(()=>{let W=window.LuxWorld,H=window.LuxHomes520,I=window.LuxHomeInterior850||window.LuxHomeInterior840,G=window.LuxGameplay632||window.LuxGameplay631,R=window.LuxHomeRuntime851||window.LuxHomeRuntime850;
if(!document.body.classList.contains('game-ready')||!W?.player||!H?.enter||!H?.leave||!I?.act||!G?.state?.needs||!R)return;
clearInterval(q);
let badge=document.createElement('div');badge.id='homeQa850';badge.style='position:fixed;left:50%;top:54px;transform:translateX(-50%);z-index:9999;max-width:88vw;background:#071018ee;color:#fff;border:1px solid #f0a51a;border-radius:9px;padding:7px 10px;font:bold 10px Arial;pointer-events:none;text-align:center';document.body.appendChild(badge);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 let checks={enter:false,visible:false,actions:false,leave:false,reenter:false};
 try{
   if(H.inside)H.leave();
   await sleep(150);
   G.state.needs.hunger=42;G.state.needs.durst=37;G.state.needs.energie=31;G.state.needs.hygiene=28;G.state.wellness=35;G.save?.();G.refreshHud?.();
   H.enter('flat',false);R.forceInside();await sleep(220);
   checks.enter=!!H.inside&&I.activeId==='flat';
   checks.visible=!!I.root?.visible&&document.getElementById('game')?.style.visibility!=='hidden'&&Math.abs(W.player.position.x+430)<8&&Math.abs(W.player.position.z-430)<8;
   I.act('bed');I.act('fridge');I.act('sink');I.act('shower');G.refreshHud?.();await sleep(120);
   let n=G.state.needs;checks.actions=n.hunger>=99&&n.durst>=99&&n.energie>=99&&n.hygiene>=99;
   H.leave();await sleep(180);checks.leave=!H.inside&&!I.activeId;
   H.enter('flat',false);R.forceInside();await sleep(220);checks.reenter=!!H.inside&&I.activeId==='flat'&&!!I.root?.visible;
   let ok=Object.values(checks).every(Boolean);
   badge.style.borderColor=ok?'#61e493':'#ff5a5a';badge.textContent=(ok?'HOME QA PASS':'HOME QA FAIL')+' · '+Object.entries(checks).map(([k,v])=>k+':'+(v?'PASS':'FAIL')).join(' · ')+' · needs '+Math.round(n.hunger)+'/'+Math.round(n.durst)+'/'+Math.round(n.energie)+'/'+Math.round(n.hygiene);
 }catch(e){badge.style.borderColor='#ff5a5a';badge.textContent='HOME QA ERROR · '+(e?.message||String(e))}
})()
},80)})();