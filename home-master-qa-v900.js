(()=>{if(new URLSearchParams(location.search).get('homeqa')!=='1')return;let q=setInterval(()=>{let W=window.LuxWorld,H=window.LuxHomes520,I=window.LuxHomeInterior800||window.LuxHomeInterior782,M=window.LuxHomeMaster900;if(!document.body.classList.contains('game-ready')||!W?.player||!H?.enter||!H?.leave||!I?.root||!M)return;clearInterval(q);
 const sleep=ms=>new Promise(r=>setTimeout(r,ms));
 let b=document.createElement('div');b.style='position:fixed;left:50%;top:54px;transform:translateX(-50%);z-index:9999;background:#091119ee;color:#fff;border:1px solid #f0a51a;border-radius:9px;padding:6px 9px;font:bold 10px Arial';document.body.appendChild(b);
 (async()=>{let c={enter:false,camera:false,outer:false,walls:false,leave:false,reenter:false};
 try{
  if(H.inside)H.leave();await sleep(120);
  H.enter('flat',false);await sleep(220);
  c.enter=H.inside&&I.activeId==='flat'&&I.root.visible;
  c.outer=Math.abs(W.player.position.x+430)<6&&Math.abs(W.player.position.z-430)<6;
  let d=Math.hypot(W.camera.position.x-W.player.position.x,W.camera.position.z-W.player.position.z);c.camera=d<1.5&&W.camera.position.y<2.2;
  let p=W.player.position.clone(),tests=[[C?.x||-430,425.7],[-435.4,430],[-424.6,430],[-430,434.1]];c.walls=tests.every(t=>M.bodyBlocked(t[0],t[1]));
  H.leave();await sleep(140);c.leave=!H.inside;
  H.enter('flat',false);await sleep(180);c.reenter=H.inside&&I.activeId==='flat'&&I.root.visible;
  let ok=Object.values(c).every(Boolean);b.style.borderColor=ok?'#61e493':'#ff5a5a';b.textContent=(ok?'HOME MASTER PASS':'HOME MASTER FAIL')+' · '+Object.entries(c).map(([k,v])=>k+':'+(v?'PASS':'FAIL')).join(' · ');
 }catch(e){b.style.borderColor='#ff5a5a';b.textContent='HOME MASTER ERROR '+(e?.message||e)}
 })()
},80)})();