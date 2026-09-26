(()=>{const mode=new URLSearchParams(location.search).get('firetruckqa');if(!mode)return;let q=setInterval(()=>{let W=window.LuxWorld,E=window.LuxEmergency502,F=E?.fleet?.Feuerwehr,H=window.LuxHomes520;if(!W?.camera||!W?.player||!F?.v)return;clearInterval(q);let V=F.v;
function outside(){try{if(H?.inside)H.leave?.()}catch{}W.player.visible=true}outside();F.state='base';F.mission=null;F.route=[];F.idx=0;V.position.set(F.base.x,.055,F.base.z);V.rotation.y=Math.PI;
let badge=document.createElement('div');badge.id='fireTruckQa920';badge.style='position:fixed;left:50%;top:58px;transform:translateX(-50%);z-index:9999;background:#071018ee;color:#fff;border:1px solid #4bb3ff;border-radius:10px;padding:7px 10px;font:bold 11px Arial;pointer-events:none';document.body.appendChild(badge);
let until=Date.now()+30000,started=false;W.registerTick(()=>{if(Date.now()>until)return;outside();badge.textContent='FEUERWEHR QA · '+mode.toUpperCase()+' · CHILDREN '+V.children.length+' · '+F.state;
 if(mode==='park'){W.camera.position.set(V.position.x+8,4.4,V.position.z+10);W.camera.lookAt(V.position.x,1.45,V.position.z)}
 else {let y=V.rotation.y,fx=Math.sin(y),fz=Math.cos(y),rx=Math.cos(y),rz=-Math.sin(y);W.camera.position.set(V.position.x-fx*9+rx*4,4.2,V.position.z-fz*9+rz*4);W.camera.lookAt(V.position.x,1.4,V.position.z)}
});
if(mode==='drive'&&!started){started=true;setTimeout(()=>{for(const m of E.missions||[])if(m.active)m.active=false;F.state='base';F.mission=null;F.route=[];F.idx=0;V.position.set(F.base.x,.055,F.base.z);E.dispatch('Feuerwehr')},2500)}
},180)})();