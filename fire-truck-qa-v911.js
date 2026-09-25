(()=>{const mode=new URLSearchParams(location.search).get('firetruckqa');if(!mode)return;let q=setInterval(()=>{let W=window.LuxWorld,T=window.LuxFireTruck910,H=window.LuxHomes520;if(!W?.camera||!W?.player||!T?.vehicle||!H)return;clearInterval(q);let V=T.vehicle,F=(window.LuxEmergency501||window.LuxEmergency500)?.fleet?.Feuerwehr;
let badge=document.getElementById('fireTruckQaLate911')||document.createElement('div');badge.id='fireTruckQaLate911';badge.style='position:fixed;left:50%;top:88px;transform:translateX(-50%);z-index:9999;background:#071018ee;color:#fff;border:1px solid #4bb3ff;border-radius:10px;padding:7px 10px;font:bold 11px Arial;pointer-events:none';document.body.appendChild(badge);
function outside(){try{if(H.inside)H.leave?.()}catch{}W.player.visible=true}
function park(){outside();if(F){F.state='base';F.mission=null;F.route=[];F.idx=0;V.position.set(F.base.x,0,F.base.z);V.rotation.y=Math.PI}W.player.position.set(V.position.x-7,0,V.position.z+10);W.yaw=2.45;W.pitch=-.08}
park();
let until=Date.now()+30000;
W.registerTick(()=>{if(Date.now()>until)return;outside();let childCount=V.children.length;badge.textContent='FEUERWEHR QA · '+mode.toUpperCase()+' · MODELLE '+childCount+' · X '+V.position.x.toFixed(1)+' Z '+V.position.z.toFixed(1);
 if(mode==='park'){W.camera.position.set(V.position.x+8,4.4,V.position.z+10);W.camera.lookAt(V.position.x,1.45,V.position.z);return}
 if(mode==='drive'){let y=V.rotation.y,fx=Math.sin(y),fz=Math.cos(y),rx=Math.cos(y),rz=-Math.sin(y);W.camera.position.set(V.position.x-fx*9+rx*4,4.2,V.position.z-fz*9+rz*4);W.camera.lookAt(V.position.x,1.2,V.position.z)}
});
if(mode==='drive'&&F){setTimeout(()=>{let E=window.LuxEmergency501||window.LuxEmergency500;for(const m of E?.missions||[])if(m.active)m.active=false;F.state='base';F.mission=null;F.route=[];F.idx=0;V.position.set(F.base.x,0,F.base.z);V.rotation.y=Math.PI;E?.dispatch?.('Feuerwehr')},2500)}
},180)})();