(()=>{let q=setInterval(()=>{let W=window.LuxWorld,A=window.LuxCityActivity570||window.LuxCityActivity560,L=window.LuxLife,pc=window.LuxPlayerCar840;if(!W?.player||!A?.bus||!L||!pc)return;clearInterval(q);init(W,A.bus,L,pc)},350);
function init(W,bus,L,pc){
 const fare=2.50,stops=[{z:-106,name:'Zentrum Süd'},{z:106,name:'Zentrum Nord'}];
 let riding=false,requested=false,lastDoor=false,currentStop=null;
 const ui=document.createElement('div');ui.id='transit800';ui.style='position:fixed;left:50%;bottom:154px;transform:translateX(-50%);z-index:75;background:#0b111de8;color:#fff;border:1px solid #ffffff30;border-radius:11px;padding:8px 10px;font:800 11px Arial;display:none;box-shadow:0 8px 24px #0008';ui.innerHTML='<span id="transitText800"></span><button id="transitBtn800" style="margin-left:8px;padding:6px 9px;background:#f0a51a;color:#111"></button>';document.body.appendChild(ui);
 const txt=document.getElementById('transitText800'),btn=document.getElementById('transitBtn800');
 function nearestStop(){let best=null,bd=999;for(const s of stops){let d=Math.hypot(W.player.position.x,bus.position.x)+Math.abs(bus.position.z-s.z);if(d<bd){bd=d;best=s}}return best}
 function busNear(){return !pc.driving&&!riding&&bus.visible!==false&&bus.userData.busStopOpen&&Math.hypot(W.player.position.x-bus.position.x,W.player.position.z-bus.position.z)<4.8}
 function stopAtBus(){return stops.reduce((a,s)=>Math.abs(bus.position.z-s.z)<Math.abs(bus.position.z-a.z)?s:a,stops[0])}
 function board(){
   if(!busNear())return false;
   if((L.state.cash||0)<fare)return alert('Nicht genug Privatgeld für das Busticket · 2,50 €');
   L.addExpense(fare);riding=true;requested=false;W.player.visible=false;for(const k of Object.keys(W.keys||{}))W.keys[k]=0;render();return true
 }
 function exitBus(){
   let s=stopAtBus(),side=bus.position.x>=0?-1:1,y=bus.rotation.y;
   riding=false;requested=false;W.player.visible=true;
   W.player.position.set(bus.position.x+side*3.2,0,bus.position.z);
   W.yaw=y;currentStop=s;render();
 }
 function requestExit(){if(!riding)return board();requested=true;render()}
 btn.onclick=requestExit;
 addEventListener('keydown',e=>{if(e.repeat)return;if((e.code==='KeyE'||String(e.key).toLowerCase()==='e')&&(riding||busNear())){e.preventDefault();e.stopImmediatePropagation();requestExit()}},{capture:true});
 function render(){
   if(riding){ui.style.display='block';let s=stopAtBus();txt.textContent='🚌 LINIE 1 · '+(requested?'HALT ANGEFORDERT':'Nächster Halt: '+s.name);btn.textContent=requested?'HALT ANGEFORDERT':'AUSSTEIGEN ANFORDERN';btn.disabled=requested;return}
   if(busNear()){let s=stopAtBus();ui.style.display='block';txt.textContent='🚌 '+s.name+' · Ticket 2,50 €';btn.textContent='EINSTEIGEN';btn.disabled=false;return}
   ui.style.display='none';btn.disabled=false
 }
 W.registerTick?.(()=>{
   let open=!!bus.userData.busStopOpen;
   if(riding){
     for(const k of Object.keys(W.keys||{}))W.keys[k]=0;
     W.player.position.set(bus.position.x,0,bus.position.z);
     let y=bus.rotation.y,fx=Math.sin(y),fz=Math.cos(y);
     W.camera.position.set(bus.position.x-fx*7.8,3.9,bus.position.z-fz*7.8);
     W.camera.lookAt(bus.position.x,1.55,bus.position.z);
     if(requested&&open&&!lastDoor)exitBus()
   }
   lastDoor=open;render()
 });
 window.LuxTransit800={version:'8.0.0',fare,stops,board,requestExit,get riding(){return riding},get requested(){return requested}}
}})();
