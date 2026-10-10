(()=>{const K='luxcity_vehicles_v160';let S=Object.assign({owned:[],active:null,usedStock:[],usedStockDate:null},JSON.parse(localStorage.getItem(K)||'{}'));const save=()=>{localStorage.setItem(K,JSON.stringify(S));window.LuxCloud646?.save?.()||window.LuxCloud645?.save?.()};const DELIVERY={x:-24,z:303,rot:Math.PI/2};const cars={
ev_compact:{name:'LUX E1',type:'compact',fuelType:'electric',price:31000,bodyStyle:'hatch'},
petrol_compact:{name:'Avelon C20',type:'compact',fuelType:'petrol',price:21000,bodyStyle:'sedan'},
diesel_compact:{name:'Rivon D24',type:'compact',fuelType:'diesel',price:24000,bodyStyle:'sedan'},
ev_suv:{name:'Voltaris VX',type:'suv',fuelType:'electric',price:47000,bodyStyle:'suv'},
petrol_suv:{name:'Montaire X4',type:'suv',fuelType:'petrol',price:39000,bodyStyle:'suv'},
diesel_van:{name:'Rivon Cargo D',type:'van',fuelType:'diesel',price:33000,bodyStyle:'van'},
petrol_sport:{name:'Avelon S35',type:'compact',fuelType:'petrol',price:36500,bodyStyle:'sport'},
ev_sport:{name:'Voltaris GT-E',type:'compact',fuelType:'electric',price:54000,bodyStyle:'sport'},
petrol_wagon:{name:'Montaire Touring',type:'compact',fuelType:'petrol',price:34800,bodyStyle:'wagon'},
diesel_wagon:{name:'Rivon Estate D',type:'compact',fuelType:'diesel',price:35900,bodyStyle:'wagon'},
ev_cross:{name:'Voltaris Cross',type:'suv',fuelType:'electric',price:51500,bodyStyle:'crossover'},
petrol_cross:{name:'Korven Active',type:'suv',fuelType:'petrol',price:41800,bodyStyle:'crossover'}};
const PAINTS=[['Perlweiß',0xf2f1ec],['Tiefschwarz',0x202428],['Silbergrau',0x8f989d],['Graphit',0x4c545a],['Nachtblau',0x254b75],['Arktisblau',0x4c7895],['Bordeaux',0x7d2636],['Rubinrot',0x9b3737],['Waldgrün',0x4e6d54],['Petrol',0x1f6c70],['Kupfer',0xa85a2b],['Sand',0xb8aa8d],['Violett',0x67467f],['Champagner',0xc1ad82]];const clamp=(a,b,n)=>Math.max(a,Math.min(b,n)),money=n=>Math.round(Number(n)||0).toLocaleString('de-DE')+' €',km=n=>Math.round(Number(n)||0).toLocaleString('de-DE')+' km';
function keyFor(v){return v.catalogKey||Object.keys(cars).find(k=>cars[k].name===v.name)||Object.keys(cars).find(k=>cars[k].type===v.type&&cars[k].fuelType===v.fuelType)||null}
for(let v of S.owned){
 v.type=v.type||'compact';v.fuelType=v.fuelType||v.fuel_type||(v.type==='van'?'diesel':'petrol');v.energy=Number(v.energy??100);v.condition=Number(v.condition??100);
 if(v.parked_x!=null&&v.parkedX==null)v.parkedX=Number(v.parked_x);if(v.parked_z!=null&&v.parkedZ==null)v.parkedZ=Number(v.parked_z);if(v.parked_rot!=null&&v.parkedRot==null)v.parkedRot=Number(v.parked_rot);v.parkingType=v.parkingType||v.parking_type||null;
 v.catalogKey=keyFor(v);let model=v.catalogKey?cars[v.catalogKey]:null,base=model?.price||0;v.newPrice=Number(v.newPrice??base??0);v.purchasePrice=Number(v.purchasePrice??v.newPrice??0);v.purchaseKind=v.purchaseKind||'bestand';v.mileageKm=Math.max(0,Number(v.mileageKm??v.mileage??0)||0);v.bodyStyle=v.bodyStyle||model?.bodyStyle||v.type||'sedan';if(v.colorHex==null){v.colorHex=PAINTS[0][1];v.colorName=PAINTS[0][0]}
}
function label(f){return f==='electric'?'Elektro':f==='diesel'?'Diesel':'Benzin'}
function modal(html){let m=document.getElementById('modal'),b=document.getElementById('modalBody');if(!m||!b)return null;m.hidden=false;m.style.display='block';b.innerHTML=html;return b}
function daySig(){let l=window.LuxLife?.state||{};return [l.year||2026,l.month||1,l.day||1].join('-')}
function hash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function rng(seed){return()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}}
function ensureUsedStock(){
 const sig=daySig();if(S.usedStockDate===sig&&Array.isArray(S.usedStock)&&S.usedStock.every(x=>x.colorHex!=null&&x.bodyStyle))return S.usedStock;
 let r=rng(hash('lux-used-'+sig)),entries=Object.entries(cars);S.usedStock=entries.map(([k,m],i)=>{
   let max=m.type==='van'?220000:m.fuelType==='diesel'?190000:m.fuelType==='electric'?110000:160000,min=m.type==='van'?28000:m.fuelType==='diesel'?22000:8000;
   let mileage=Math.round((min+r()*(max-min))/100)*100,condition=Math.round(clamp(67,96,97-mileage/8200+(r()-.5)*7)),energy=Math.round(58+r()*39);
   let ageFactor=clamp(.28,.82,.86-mileage/280000*.64),price=Math.max(4500,Math.round(m.price*ageFactor*(.68+.32*condition/100)/100)*100);
   let paint=PAINTS[Math.floor(r()*PAINTS.length)%PAINTS.length];return{id:sig+'-'+i+'-'+Math.floor(r()*9999),catalogKey:k,name:m.name,type:m.type,bodyStyle:m.bodyStyle||m.type,colorName:paint[0],colorHex:paint[1],fuelType:m.fuelType,newPrice:m.price,price,mileageKm:mileage,condition,energy}
 });S.usedStockDate=sig;save();return S.usedStock
}
function resaleValue(v){
 const key=keyFor(v),base=Number(v.newPrice||cars[key]?.price||v.purchasePrice||10000),mileage=Math.max(0,Number(v.mileageKm)||0),condition=clamp(0,100,Number(v.condition??100));
 const mileageFactor=clamp(.22,.82,.84-mileage/300000*.62),conditionFactor=.52+.48*(condition/100),dealerMargin=.91;
 return Math.max(1200,Math.round(base*mileageFactor*conditionFactor*dealerMargin/100)*100)
}
async function insertServer(m,meta){
 let sb=window.LuxAccount?.sb,uid=window.LuxAccount?.session?.user?.id;if(!sb||!uid)return null;
 let {data,error}=await sb.from('player_vehicles').insert({owner:uid,kind:m.type,name:m.name,condition:meta.condition,energy:meta.energy,fuel_type:m.fuelType,parked_x:DELIVERY.x,parked_z:DELIVERY.z,parked_rot:DELIVERY.rot,parking_type:'dealer'}).select('id,kind,name,condition,energy,fuel_type,parked_x,parked_z,parked_rot,parking_type').single();
 if(error||!data)return null;
 return{id:'server-'+data.id,serverId:data.id,type:data.kind||m.type,name:data.name||m.name,fuelType:data.fuel_type||m.fuelType,energy:Number(data.energy??meta.energy),condition:Number(data.condition??meta.condition),parkedX:Number(data.parked_x),parkedZ:Number(data.parked_z),parkedRot:Number(data.parked_rot),parkingType:'dealer',parkingLabel:'Auslieferungsplatz Händler'}
}
async function buy(k,kind='new',offerId=null,colorHex=null){
 let m=cars[k];if(!m)return;if(window.LuxVehicleBusiness750&&!window.LuxVehicleBusiness750.nearDealer())return alert('Fahrzeuge kaufst du direkt beim Fahrzeughändler.');
 let offer=null,price=m.price,mileage=6+Object.keys(cars).indexOf(k)*3,condition=100,energy=100,paint=PAINTS.find(x=>Number(x[1])===Number(colorHex))||PAINTS[0];
 if(kind==='used'){offer=ensureUsedStock().find(x=>x.id===offerId);if(!offer)return alert('Dieser Gebrauchtwagen ist nicht mehr verfügbar.');price=offer.price;mileage=offer.mileageKm;condition=offer.condition;energy=offer.energy;paint=[offer.colorName||PAINTS[0][0],Number(offer.colorHex??PAINTS[0][1])]}
 if(window.LuxLife&&LuxLife.state.cash<price)return alert('Nicht genug Privatgeld.');
 let rec=await insertServer(m,{condition,energy});
 if(!rec)rec={id:String(Date.now())+'-'+Math.floor(Math.random()*999),type:m.type,name:m.name,fuelType:m.fuelType,energy,condition,parkedX:DELIVERY.x,parkedZ:DELIVERY.z,parkedRot:DELIVERY.rot,parkingType:'dealer',parkingLabel:'Auslieferungsplatz Händler'};
 Object.assign(rec,{catalogKey:k,newPrice:m.price,purchasePrice:price,purchaseKind:kind,mileageKm:mileage,bodyStyle:m.bodyStyle||m.type,colorName:paint[0],colorHex:paint[1],acquiredAt:Date.now()});
 if(window.LuxLife)LuxLife.addExpense(price);S.owned.push(rec);S.active=rec.id;if(offer)S.usedStock=S.usedStock.filter(x=>x.id!==offer.id);save();
 let pc=window.LuxPlayerCar750||window.LuxPlayerCar740;if(pc?.car)pc.car.visible=true;pc?.applyVehicle?.(rec.type);pc?.restoreParked?.(rec);await window.LuxServerAssets740?.refresh?.();openDealer()
}
async function sell(i){
 if(window.LuxVehicleBusiness750&&!window.LuxVehicleBusiness750.nearDealer())return alert('Verkaufen kannst du dein Auto direkt beim Fahrzeughändler.');
 let v=S.owned[Number(i)];if(!v)return;let price=resaleValue(v);
 if(!confirm(v.name+' für '+money(price)+' an den Händler verkaufen?'))return;
 let sb=window.LuxAccount?.sb,uid=window.LuxAccount?.session?.user?.id;if(v.serverId&&sb&&uid){let {error}=await sb.from('player_vehicles').delete().eq('id',v.serverId).eq('owner',uid);if(error)return alert('Verkauf konnte nicht abgeschlossen werden.')}
 if(window.LuxLife){if(typeof LuxLife.addRevenue==='function')LuxLife.addRevenue(price);else if(typeof LuxLife.addIncome==='function')LuxLife.addIncome(price)}
 let was=S.active===v.id;S.owned.splice(Number(i),1);if(was)S.active=S.owned[0]?.id||null;save();
 let pc=window.LuxPlayerCar750||window.LuxPlayerCar740;if(was&&S.active){let n=S.owned[0];pc?.applyVehicle?.(n.type);pc?.restoreParked?.(n)}else if(was&&pc?.car){pc.car.visible=false}
 await window.LuxServerAssets740?.refresh?.();openDealer()
}
function ownedHtml(showSell=false){return S.owned.length?S.owned.map((v,i)=>{
 const value=resaleValue(v),kind=v.purchaseKind==='used'?'Gebrauchtwagen':v.purchaseKind==='new'?'Neuwagen':'Bestand';
 return '<div style="padding:10px 0;border-bottom:1px solid #ffffff18"><b>'+v.name+'</b> · '+label(v.fuelType)+' · '+kind+'<br><b>'+km(v.mileageKm)+'</b> · Zustand '+Math.round(v.condition??100)+'% · '+Math.round(v.energy??100)+'% · Farbe '+(v.colorName||'Perlweiß')+'<br><small>'+(v.parkingLabel||'Kein Stellplatz gespeichert')+' · Händlerwert ca. '+money(value)+'</small><br><button data-use="'+i+'">AUSWÄHLEN</button>'+(showSell?' <button data-sell="'+i+'" style="background:#8f3838;color:#fff">VERKAUFEN · '+money(value)+'</button>':'')+'</div>'
 }).join(''):'<p>Du besitzt noch kein Fahrzeug.</p>'}
function bindOwned(b,showSell=false){b.querySelectorAll('[data-use]').forEach(x=>x.onclick=()=>{let v=S.owned[Number(x.dataset.use)];S.active=v.id;save();let pc=window.LuxPlayerCar750||window.LuxPlayerCar740;if(pc?.car)pc.car.visible=true;pc?.applyVehicle?.(v.type);pc?.restoreParked?.(v);open()});if(showSell)b.querySelectorAll('[data-sell]').forEach(x=>x.onclick=()=>sell(x.dataset.sell))}
function open(){let b=modal('<h2>🚗 Meine Fahrzeuge</h2><p>Kilometerstand, Zustand und Händlerwert werden dauerhaft mitgeführt.</p>'+ownedHtml(false));if(b)bindOwned(b,false)}
function newHtml(){let opts=PAINTS.map(p=>'<option value="'+p[1]+'">'+p[0]+'</option>').join('');return Object.entries(cars).map(([k,v],i)=>'<div style="padding:10px 0;border-bottom:1px solid #ffffff16"><b>'+v.name+'</b> · '+String(v.bodyStyle||v.type).toUpperCase()+' · NEUWAGEN<br>'+label(v.fuelType)+' · '+km(6+i*3)+' Auslieferung · <b>'+money(v.price)+'</b><br><select data-color-for="'+k+'" style="margin:7px 6px 7px 0;padding:7px;border-radius:7px">'+opts+'</select><button data-buy-new="'+k+'">NEU KAUFEN</button></div>').join('')}
function usedHtml(){let stock=ensureUsedStock();return stock.length?stock.map(v=>'<div style="padding:10px 0;border-bottom:1px solid #ffffff16"><b>'+v.name+'</b> · '+String(v.bodyStyle||v.type).toUpperCase()+' · GEBRAUCHTWAGEN<br>'+label(v.fuelType)+' · '+(v.colorName||'Perlweiß')+' · <b>'+km(v.mileageKm)+'</b> · Zustand '+v.condition+'% · '+v.energy+'% · <b>'+money(v.price)+'</b> <button data-buy-used="'+v.id+'" data-key="'+v.catalogKey+'">GEBRAUCHT KAUFEN</button></div>').join(''):'<p>Heute sind keine Gebrauchtwagen mehr verfügbar.</p>'}
function openDealer(){
 if(window.LuxVehicleBusiness750&&!window.LuxVehicleBusiness750.nearDealer())return alert('Geh zum Fahrzeughändler.');
 let b=modal('<h2>🚘 Lux City Fahrzeughandel</h2><p>Neuwagen oder täglich wechselnde Gebrauchtwagen. Kilometer und Zustand beeinflussen den Preis.</p><h3>✨ Neuwagen</h3>'+newHtml()+'<h3>🔁 Gebrauchtwagen</h3>'+usedHtml()+'<h3>🚗 Deine Fahrzeuge · Verkauf</h3>'+ownedHtml(true));if(!b)return;
 b.querySelectorAll('[data-buy-new]').forEach(x=>x.onclick=()=>{let sel=b.querySelector('[data-color-for="'+x.dataset.buyNew+'"]');buy(x.dataset.buyNew,'new',null,Number(sel?.value||PAINTS[0][1]))});
 b.querySelectorAll('[data-buy-used]').forEach(x=>x.onclick=()=>buy(x.dataset.key,'used',x.dataset.buyUsed));
 bindOwned(b,true)
}
function add(){let h=document.getElementById('hud');if(!h||document.getElementById('vehicleBtn'))return;let b=document.createElement('button');b.id='vehicleBtn';b.textContent='AUTO';b.onclick=open;h.appendChild(b)}
setInterval(add,1000);ensureUsedStock();window.LuxVehicles={version:'10.1.0',state:S,cars,paints:PAINTS,buy,sell,resaleValue,ensureUsedStock,open,openDealer,save,delivery:DELIVERY,get activeVehicle(){return S.owned.find(v=>v.id===S.active)||null}};
setTimeout(()=>{let v=S.owned.find(x=>x.id===S.active);if(v){let pc=window.LuxPlayerCar750||window.LuxPlayerCar740;if(pc?.car)pc.car.visible=true;pc?.applyVehicle?.(v.type)}},1200)})();