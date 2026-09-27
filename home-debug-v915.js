(()=>{if(new URLSearchParams(location.search).get('homedebug')!=='1')return;
let b=document.createElement('div');b.id='homeDebug915';b.style='position:fixed;left:10px;top:10px;z-index:20000;background:#d40000;color:#fff;border:3px solid #fff;padding:12px;font:bold 16px monospace;max-width:90vw';b.textContent='HOME DEBUG LOADED';document.body.appendChild(b);
document.body.classList.add('game-ready');let login=document.getElementById('login');if(login)login.style.display='none';
let entered=false;
setInterval(()=>{let W=window.LuxWorld,H=window.LuxHomes520,I=window.LuxHomeInterior800||window.LuxHomeInterior782,M=window.LuxHomeMaster910;
 b.textContent='DEBUG W:'+!!W+' H:'+!!H+' I:'+!!I+' M:'+!!M+' inside:'+(!!H?.inside)+' active:'+(I?.activeId||'-')+' root:'+(I?.root?.visible);
 if(W?.player&&W?.camera&&H?.enter&&I?.root&&!entered){entered=true;H.enter('flat',false)}
 if(W?.player&&W?.camera&&H?.inside&&I?.root){I.root.visible=true;W.player.position.set(-430,0,426.85);W.yaw=0;W.camera.position.set(-430,1.65,426.45);W.camera.lookAt(-430,1.42,428.0)}
},120)
})();