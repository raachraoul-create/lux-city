(()=> {
  const VERSION='7.9.0';
  const INSURERS=[
    {id:'luxprotect',name:'LuxProtect',base:69,deductible:750,cover:'Haftpflicht + Teilkasko'},
    {id:'mosel',name:'Mosel Assur',base:84,deductible:500,cover:'Haftpflicht + Teilkasko Plus'},
    {id:'nord',name:'NordSecure',base:104,deductible:300,cover:'Vollkasko'},
    {id:'cite',name:'Cité Insurance',base:124,deductible:150,cover:'Vollkasko + Pannenhilfe'}
  ];
  const $=s=>document.querySelector(s), eur=n=>Math.round(Number(n)||0).toLocaleString('de-DE')+' €';
  const uid=()=>window.LuxAccount?.session?.user?.id||'local';
  const key=()=> 'luxcity_phone_v790_'+uid();
  const ym=()=>{let L=window.LuxLife?.state;return L?L.year+'-'+String(L.month).padStart(2,'0'):'0-0'};
  let state={contracts:{},bills:[],lastGenerated:''};
  function load(){try{state=Object.assign(state,JSON.parse(localStorage.getItem(key())||'{}'))}catch{};state.contracts??={};state.bills??=[]}
  function save(){localStorage.setItem(key(),JSON.stringify(state));window.LuxCloud438?.save?.()}
  function activeVehicle(){return window.LuxVehicles?.activeVehicle||null}
  function vehicles(){return window.LuxVehicles?.state?.owned||[]}
  function factor(v){
    let type=v?.type==='suv'?1.28:v?.type==='van'?1.42:1;
    let fuel=v?.fuelType==='diesel'?1.16:v?.fuelType==='petrol'?1.08:.92;
    return type*fuel
  }
  function premium(ins,v){return Math.round(ins.base*factor(v))}
  function tax(v){
    let base=v?.fuelType==='electric'?8:v?.fuelType==='diesel'?39:29;
    if(v?.type==='suv')base*=1.28;if(v?.type==='van')base*=1.42;
    return Math.round(base)
  }
  function billExists(id){return state.bills.some(b=>b.id===id)}
  function ensureBills(){
    let m=ym(); if(!m||m==='0-0')return;
    const fixed=[
      {id:'water-'+m,type:'Gemeinde',label:'Wasser · '+m,amount:24},
      {id:'waste-'+m,type:'Gemeinde',label:'Mülltonnen · '+m,amount:18}
    ];
    for(const b of fixed)if(!billExists(b.id))state.bills.push({...b,paid:false,created:Date.now()});
    for(const v of vehicles()){
      let vid=String(v.id||v.serverId||v.name),tid='tax-'+vid+'-'+m;
      if(!billExists(tid))state.bills.push({id:tid,type:'Kfz-Steuer',label:'Kfz-Steuer · '+v.name+' · '+m,amount:tax(v),vehicleId:vid,paid:false,created:Date.now()});
      let c=state.contracts[vid];
      if(c){
        let ins=INSURERS.find(x=>x.id===c.insurer),iid='insurance-'+vid+'-'+m;
        if(ins&&!billExists(iid))state.bills.push({id:iid,type:'Versicherung',label:ins.name+' · '+v.name+' · '+m,amount:premium(ins,v),vehicleId:vid,paid:false,created:Date.now()})
      }
    }
    state.lastGenerated=m;save()
  }
  function syncCash(){
    let L=window.LuxLife?.state,A=window.LuxAccount;
    if(!L)return;
    $('#money')&&($('#money').textContent=eur(L.cash));
    if(A?.sb&&A?.session?.user?.id)A.sb.from('profiles').update({cash:Math.round(L.cash)}).eq('id',A.session.user.id).then(()=>{})
  }
  function payBill(id){
    let b=state.bills.find(x=>x.id===id),L=window.LuxLife?.state;if(!b||b.paid||!L)return;
    if(L.cash<b.amount)return alert('Nicht genug Geld. Offen: '+eur(b.amount));
    L.cash-=b.amount;L.expenses=(L.expenses||0)+b.amount;b.paid=true;b.paidAt=Date.now();window.LuxLife.save?.();save();syncCash();openBills()
  }
  async function claimIncoming(){
    let A=window.LuxAccount,L=window.LuxLife?.state;if(!A?.sb||!A.session?.user?.id||!L)return 0;
    let {data}=await A.sb.from('player_transfers').select('id,amount,sender,created_at').eq('recipient',A.session.user.id).is('claimed_at',null).order('created_at',{ascending:true});
    let total=0;
    for(const t of data||[]){
      let {data:claimed,error}=await A.sb.from('player_transfers').update({claimed_at:new Date().toISOString()}).eq('id',t.id).is('claimed_at',null).select('amount').maybeSingle();
      if(!error&&claimed)total+=Number(claimed.amount||0)
    }
    if(total>0){L.cash+=total;L.revenue=(L.revenue||0)+total;window.LuxLife.save?.();syncCash()}
    return total
  }
  function appShell(title,html){
    $('#phoneTitle').textContent=title;$('#phoneBody').innerHTML=html;
  }
  function home(){
    ensureBills();let open=state.bills.filter(b=>!b.paid).length;
    appShell('Lux City Handy',`
      <div class="lcPhoneGrid">
        <button data-app="bank"><span>🏦</span>Bank</button>
        <button data-app="insurance"><span>🛡️</span>Versicherung</button>
        <button data-app="tax"><span>🚗</span>Steuern</button>
        <button data-app="bills"><span>🧾</span>Rechnungen<small>${open?open+' offen':'alles bezahlt'}</small></button>
      </div>
      <div class="lcPhoneFoot">H · Handy schließen</div>`);
    document.querySelectorAll('[data-app]').forEach(b=>b.onclick=()=>({bank:openBank,insurance:openInsurance,tax:openTax,bills:openBills}[b.dataset.app])())
  }
  async function openBank(){
    ensureBills();let A=window.LuxAccount,L=window.LuxLife?.state;if(!A?.session?.user?.id)return;
    let incoming=await claimIncoming();
    let {data:people}=await A.sb.from('profiles').select('id,player_name,full_name').neq('id',A.session.user.id).order('player_name').limit(30);
    let {data:hist}=await A.sb.from('player_transfers').select('id,sender,recipient,amount,created_at,claimed_at').or('sender.eq.'+A.session.user.id+',recipient.eq.'+A.session.user.id).order('created_at',{ascending:false}).limit(8);
    appShell('Bank',`
      <button class="lcBack">‹ Apps</button>
      <div class="lcBalance">${eur(L?.cash||0)}<small>Privatkonto</small></div>
      ${incoming?'<div class="lcSuccess">+'+eur(incoming)+' eingegangen</div>':''}
      <h3>Überweisen</h3>
      <div id="lcRecipients">${(people||[]).map(p=>`<button class="lcList" data-pay="${p.id}" data-name="${String(p.player_name||p.full_name||'Spieler').replace(/"/g,'&quot;')}"><b>${p.player_name||p.full_name||'Spieler'}</b><small>Geld senden</small></button>`).join('')||'<p>Keine anderen Spieler gefunden.</p>'}</div>
      <h3>Letzte Überweisungen</h3>
      <div>${(hist||[]).map(x=>`<div class="lcTxn">${x.sender===A.session.user.id?'Gesendet':'Empfangen'} · ${eur(x.amount)}<small>${new Date(x.created_at).toLocaleString('de-DE')}</small></div>`).join('')||'<p>Noch keine Überweisungen.</p>'}</div>`);
    $('.lcBack').onclick=home;
    document.querySelectorAll('[data-pay]').forEach(b=>b.onclick=async()=>{
      let amount=Number(prompt('Betrag an '+b.dataset.name+' in €:','50'));
      if(!Number.isFinite(amount)||amount<=0)return;if(!L||L.cash<amount)return alert('Nicht genug Geld.');
      amount=Math.round(amount*100)/100;L.cash-=amount;window.LuxLife.save?.();syncCash();
      let {error}=await A.sb.from('player_transfers').insert({sender:A.session.user.id,recipient:b.dataset.pay,amount});
      if(error){L.cash+=amount;window.LuxLife.save?.();syncCash();return alert('Überweisung fehlgeschlagen: '+error.message)}
      openBank()
    })
  }
  function openInsurance(){
    ensureBills();let vs=vehicles(),v=activeVehicle()||vs[0];
    if(!v)return appShell('Versicherung','<button class="lcBack">‹ Apps</button><p>Du besitzt noch kein Fahrzeug.</p>'),$('.lcBack').onclick=home;
    let vid=String(v.id||v.serverId||v.name),current=state.contracts[vid];
    appShell('Versicherung',`
      <button class="lcBack">‹ Apps</button>
      <h3>${v.name}</h3><p>${v.fuelType==='electric'?'Elektro':v.fuelType==='diesel'?'Diesel':'Benzin'} · ${v.type||'compact'}</p>
      ${INSURERS.map(i=>`<div class="lcCard ${current?.insurer===i.id?'selected':''}"><b>${i.name}</b><strong>${eur(premium(i,v))}/Monat</strong><small>${i.cover} · Selbstbeteiligung ${eur(i.deductible)}</small><button data-ins="${i.id}">${current?.insurer===i.id?'AKTIV':'AUSWÄHLEN'}</button></div>`).join('')}`);
    $('.lcBack').onclick=home;
    document.querySelectorAll('[data-ins]').forEach(b=>b.onclick=()=>{state.contracts[vid]={insurer:b.dataset.ins,since:Date.now()};save();ensureBills();openInsurance()})
  }
  function openTax(){
    ensureBills();let taxes=state.bills.filter(b=>b.type==='Kfz-Steuer');
    appShell('Kfz-Steuer',`<button class="lcBack">‹ Apps</button><p>Elektro, Benzin und Diesel haben unterschiedliche Steuersätze.</p>${taxes.map(b=>`<div class="lcBill"><b>${b.label}</b><span>${eur(b.amount)}</span><button data-bill="${b.id}" ${b.paid?'disabled':''}>${b.paid?'BEZAHLT':'ZAHLEN'}</button></div>`).join('')||'<p>Kein Fahrzeug angemeldet.</p>'}`);
    $('.lcBack').onclick=home;document.querySelectorAll('[data-bill]').forEach(b=>b.onclick=()=>payBill(b.dataset.bill))
  }
  function openBills(){
    ensureBills();let bills=[...state.bills].sort((a,b)=>(a.paid-b.paid)||b.created-a.created);
    appShell('Rechnungen',`<button class="lcBack">‹ Apps</button><p>Gemeinde, Versicherung und Fahrzeugabgaben.</p>${bills.map(b=>`<div class="lcBill"><b>${b.label}</b><small>${b.type}</small><span>${eur(b.amount)}</span><button data-bill="${b.id}" ${b.paid?'disabled':''}>${b.paid?'BEZAHLT':'ZAHLEN'}</button></div>`).join('')}</div>`);
    $('.lcBack').onclick=home;document.querySelectorAll('[data-bill]').forEach(b=>b.onclick=()=>payBill(b.dataset.bill))
  }
  function toggle(force){
    if(!document.body.classList.contains('game-ready'))return;
    let p=$('#luxPhone790');let show=force??p.hidden;p.hidden=!show;if(show){load();claimIncoming().then(home);home()}
  }
  function editable(){let a=document.activeElement,t=a?.tagName;return t==='INPUT'||t==='TEXTAREA'||t==='SELECT'}
  function build(){
    if($('#luxPhone790'))return;
    let style=document.createElement('style');style.textContent=`
      #luxPhone790{position:fixed;right:18px;bottom:18px;width:min(340px,88vw);height:min(610px,82vh);z-index:95;background:#080b10;color:#fff;border:7px solid #171b21;border-radius:34px;box-shadow:0 24px 70px #000b;overflow:hidden;font:14px Arial}
      #luxPhone790[hidden]{display:none!important}.lcPhoneTop{height:52px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;background:#111720;border-bottom:1px solid #ffffff16}.lcPhoneTop b{font-size:15px}.lcPhoneTop button{background:#ffffff12;color:#fff;padding:6px 10px}
      #phoneBody{padding:16px;height:calc(100% - 84px);overflow:auto}.lcPhoneGrid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:14px}.lcPhoneGrid button{height:110px;background:#151d28;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px}.lcPhoneGrid span{font-size:34px}.lcPhoneGrid small,.lcCard small,.lcTxn small,.lcBill small,.lcBalance small{display:block;color:#9cacb8;margin-top:5px}.lcPhoneFoot{text-align:center;color:#778895;margin-top:20px}.lcBack{background:#ffffff12!important;color:#fff!important;padding:7px 10px!important}.lcBalance{font-size:32px;font-weight:900;background:#101822;border-radius:16px;padding:18px;margin:12px 0}.lcSuccess{background:#153923;color:#aaf3c2;padding:9px;border-radius:9px}.lcList,.lcCard,.lcBill,.lcTxn{display:block;width:100%;box-sizing:border-box;text-align:left;background:#131a23;color:#fff;border:1px solid #ffffff12;border-radius:12px;padding:12px;margin:8px 0}.lcList small{float:right}.lcCard strong{display:block;font-size:20px;margin-top:6px}.lcCard button,.lcBill button{margin-top:8px;padding:7px 9px}.lcCard.selected{border-color:#f0a51a}.lcBill span{display:block;font-size:18px;font-weight:900;margin-top:6px}.lcBill button:disabled{opacity:.45}.lcTxn{background:#0f151d}
      @media(max-width:700px){#luxPhone790{right:8px;bottom:8px;width:min(360px,94vw);height:86vh}}
    `;document.head.appendChild(style);
    let p=document.createElement('section');p.id='luxPhone790';p.hidden=true;p.innerHTML='<div class="lcPhoneTop"><b id="phoneTitle">Lux City Handy</b><button id="phoneClose790">✕</button></div><div id="phoneBody"></div>';document.body.appendChild(p);
    $('#phoneClose790').onclick=()=>toggle(false);
    let h=$('#hud');if(h&&!$('#phoneBtn790')){let b=document.createElement('button');b.id='phoneBtn790';b.textContent='HANDY / H';b.onclick=()=>toggle();h.appendChild(b)}
  }
  addEventListener('keydown',e=>{if((e.code==='KeyH'||String(e.key).toLowerCase()==='h')&&!e.repeat&&!editable()){e.preventDefault();toggle()}if(e.code==='Escape'&&!$('#luxPhone790')?.hidden)toggle(false)});
  setInterval(()=>{if(document.body.classList.contains('game-ready')){build();load();ensureBills()}},900);
  window.LuxPhone790={version:VERSION,INSURERS,toggle,home,openBank,openInsurance,openTax,openBills,premium,tax,get state(){load();return state}}
})();