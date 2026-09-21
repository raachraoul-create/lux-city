// Lux City v1.1.3 definitive login bridge
(function(){
function boot(){
 const login=document.getElementById('login'),hud=document.getElementById('hud'),go=document.getElementById('go'),user=document.getElementById('user'),pass=document.getElementById('pass'),who=document.getElementById('who'),money=document.getElementById('money'),logout=document.getElementById('logout');
 if(!go||!login||!hud||!user)return;
 const saved=localStorage.getItem('lux9user');if(saved)user.value=saved;
 function enter(){
  const u=user.value.trim();if(!u){document.getElementById('loginStatus').textContent='Bitte Spielername eingeben.';return;}
  localStorage.setItem('lux9user',u);
  let s={};try{s=JSON.parse(localStorage.getItem('lux9_'+u)||'{}')}catch(e){}
  if(s.cash==null)s.cash=25000;if(s.debt==null)s.debt=0;localStorage.setItem('lux9_'+u,JSON.stringify(s));
  who.textContent='👤 '+u;money.textContent='💶 '+Number(s.cash).toLocaleString('de-DE')+' € · 🏦 '+Number(s.debt).toLocaleString('de-DE')+' €';
  login.style.display='none';login.hidden=true;hud.hidden=false;hud.style.display='flex';
  window.dispatchEvent(new CustomEvent('luxcity-login',{detail:{username:u,state:s}}));
 }
 go.onclick=enter;
 if(pass)pass.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();enter()}};
 if(logout)logout.onclick=()=>{login.hidden=false;login.style.display='grid';hud.hidden=true;hud.style.display='none'};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();