// Lux City v0.9.1 restoration patch
export const loans=[
 {amount:10000,rate:4.65,months:24},{amount:25000,rate:4.82,months:36},
 {amount:50000,rate:5.05,months:48},{amount:100000,rate:5.35,months:60},
 {amount:200000,rate:5.75,months:84}
];
export function payment(l){let r=l.rate/100/12;return l.amount*r/(1-Math.pow(1+r,-l.months))}
export function bankHTML(state){return '<h2>🏦 Lux City Bank</h2><p>Offene Kredite: '+(state.debt||0).toLocaleString('de-DE')+' €</p>'+loans.map((l,i)=>'<div class="row"><b>'+l.amount.toLocaleString('de-DE')+' € Kredit</b><br>Zins: '+l.rate.toFixed(2)+' % p.a. · Laufzeit: '+l.months+' Monate<br><b>Monatsrate ca. '+payment(l).toLocaleString('de-DE',{minimumFractionDigits:2,maximumFractionDigits:2})+' €</b><br><button data-loan="'+i+'">Kredit aufnehmen</button></div>').join('')}
export function bindLoans(root,state,save,hud){root.querySelectorAll('[data-loan]').forEach(b=>b.onclick=()=>{let l=loans[+b.dataset.loan],m=payment(l);state.cash+=l.amount;state.debt=(state.debt||0)+l.amount;(state.loans??=[]).push({...l,payment:m,remaining:l.months});save();hud();alert(l.amount.toLocaleString('de-DE')+' € wurden ausgezahlt. Monatsrate ca. '+m.toFixed(2)+' €.')})}
export function cameraPitch(){let pitch=.28,target=.28;return{mouse(dy){target=Math.max(-.12,Math.min(.72,target-dy*.00065))},step(dt){pitch+=(target-pitch)*Math.min(1,dt*7);return pitch}}}