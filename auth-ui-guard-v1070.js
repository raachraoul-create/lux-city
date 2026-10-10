(()=>{
function el(id){return document.getElementById(id)}
function tabs(tab){
  document.querySelectorAll('.authTab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));
  const l=el('loginPane'),r=el('registerPane'),s=el('loginStatus');
  if(l)l.hidden=tab!=='login';if(r)r.hidden=tab!=='register';if(s)s.textContent='';
}
function boot(){
  const login=el('login');if(!login)return;
  login.style.pointerEvents='auto';
  const card=login.querySelector('.authCard');if(card){card.style.pointerEvents='auto';card.style.position='relative';card.style.zIndex='140'}
  document.querySelectorAll('.authTab').forEach(b=>{
    b.style.pointerEvents='auto';
    b.addEventListener('click',()=>tabs(b.dataset.tab),{passive:true});
  });
  for(const id of['loginBtn','registerBtn','forgot','loginEmail','loginPass','regFullName','regEmail','regPass','regDob','regRules']){
    const n=el(id);if(n)n.style.pointerEvents='auto';
  }
  const status=el('loginStatus');
  const pending=()=>{if(!window.LuxAccounts794&&!window.LuxAccounts){if(status)status.textContent='Anmeldung wird geladen …';}};
  el('loginBtn')?.addEventListener('click',pending,{passive:true});
  el('registerBtn')?.addEventListener('click',pending,{passive:true});
  window.LuxAuthUIGuard1070={version:'10.7.0',tabs};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();