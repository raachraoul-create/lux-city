// Lux City v1.1.2 login compatibility fix
(function(){
 function init(){
  const btn=document.getElementById('go');
  const user=document.getElementById('user');
  const pass=document.getElementById('pass');
  if(!btn||!user)return;
  const old=localStorage.getItem('lux9user'); if(old&&!user.value) user.value=old;
  btn.addEventListener('click',function(){
    const u=(user.value||'').trim();
    if(!u){alert('Bitte Spielername eingeben.');return;}
    localStorage.setItem('lux9user',u);
    try{const k='lux9_'+u,s=JSON.parse(localStorage.getItem(k)||'{}');if(s.cash==null)s.cash=25000;if(s.debt==null)s.debt=0;localStorage.setItem(k,JSON.stringify(s));}catch(e){}
  },true);
  if(pass)pass.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();btn.click();}});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();