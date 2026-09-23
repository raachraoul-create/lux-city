(()=>{let q=setInterval(()=>{let E=window.LuxEmergency500||window.LuxEmergency438,S=window.LuxSystems330;if(!E?.fleet||!S?.doors)return;clearInterval(q);
const set=(job,doorId,gate)=>{let f=E.fleet[job],d=S.doors[doorId];if(!f||!d)return;f.base={x:d.x+4,z:d.z+3};if(gate)f.gate={x:gate[0],z:gate[1]};if(f.state==='base'){f.v.position.set(f.base.x,0,f.base.z);f.v.rotation.y=Math.PI}};
set('Polizist','police',[125,-218]);
set('Feuerwehr','fire',[180,135]);
set('Rettungsdienst','hospital',[-145,-135]);
window.LuxServiceParking790={police:E.fleet.Polizist?.base,fire:E.fleet.Feuerwehr?.base,ambulance:E.fleet.Rettungsdienst?.base};
},250)})();