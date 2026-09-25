(()=>{if(new URLSearchParams(location.search).get('firetruckdebug')!=='1')return;
let b=document.createElement('div');b.id='fireTruckDebug912';b.style='position:fixed;left:10px;bottom:10px;z-index:10000;max-width:92vw;background:#03070aee;color:#8ff4af;border:1px solid #8ff4af;border-radius:8px;padding:8px;font:11px monospace;white-space:pre-wrap;pointer-events:none';document.body.appendChild(b);
let tried=false;
setInterval(async()=>{let E=window.LuxEmergency501||window.LuxEmergency500,T=window.LuxFireTruck910,F=E?.fleet?.Feuerwehr;
b.textContent='E:'+!!E+' fleet:'+Object.keys(E?.fleet||{}).join(',')+' fire:'+!!F+' T:'+!!T+' visible:'+(F?.v?.visible)+' children:'+(F?.v?.children?.length??'-')+' state:'+(F?.state||'-');
if(E&&F&&!T&&!tried){tried=true;try{await import('./fire-truck-v910.js?qa912='+Date.now());b.textContent+='\nREIMPORT:OK'}catch(e){b.textContent+='\nREIMPORT:ERROR '+(e?.stack||e?.message||String(e))}}},700);
})();