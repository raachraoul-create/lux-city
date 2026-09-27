(()=>{if(new URLSearchParams(location.search).get('homeqa')!=='1')return;
let q=setInterval(()=>{let W=window.LuxWorld,H=window.LuxHomes520,I=window.LuxHomeInterior800||window.LuxHomeInterior782,M=window.LuxHomeMaster910;if(!W?.player||!W?.camera||!H?.enter||!H?.leave||!I?.root||!M)return;clearInterval(q);run(W,H,I,M)},60);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function run(W,H,I,M){
 document.body.classList.add('game-ready');let login=document.getElementById('login');if(login)login.style.display='none';let hud=document.getElementById('hud');if(hud)hud.hidden=false;
 let b=document.createElement('div');b.id='homeQa914';b.style='position:fixed;left:50%;top:50px;transform:translateX(-50%);z-index:10000;background:#071018ee;color:#fff;border:2px solid #f0a51a;border-radius:9px;padding:7px 10px;font:bold 11px Arial;pointer-events:none';document.body.appendChild(b);
 if(H.inside)H.leave();await sleep(80);H.enter('flat',false);await sleep(220);M.forceInside();
 let result={inside:false,camera:false,wall:false,recover:false};
 result.inside=H.inside&&I.activeId==='flat'&&I.root.visible;
 let p=W.player.position,c=W.camera.position,cd=Math.hypot(c.x-p.x,c.z-p.z);result.camera=cd<.65&&Math.abs(c.x+430)<6&&Math.abs(c.z-430)<6;
 // Start safely, then attempt to tunnel through the left wall in one large jump.
 p.set(-434.7,0,430);await sleep(80);let before={x:p.x,z:p.z};p.set(-438.5,0,430);await sleep(80);
 result.wall=p.x>-435.9;
 // Attempt a second jump through the front wall.
 p.set(-430,0,426.2);await sleep(80);p.set(-430,0,423.5);await sleep(80);result.recover=p.z>425.4;
 let ok=Object.values(result).every(Boolean);b.style.borderColor=ok?'#61e493':'#ff5a5a';b.textContent=(ok?'HOME QA PASS':'HOME QA FAIL')+' · '+Object.entries(result).map(([k,v])=>k+':'+(v?'PASS':'FAIL')).join(' · ')+' · cam '+cd.toFixed(2)+'m · pos '+p.x.toFixed(2)+','+p.z.toFixed(2)
 }
})();