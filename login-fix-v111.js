// Lux City v1.1 login recovery
(function(){
function state(u){try{return JSON.parse(localStorage.getItem('lux9_'+u)||'{}')}catch(e){return{}}}
function login(){
 const user=document.getElementById('user'),login=document.getElementById('login'),hud=document.getElementById('hud'),who=document.getElementById('who'),money=document.getElementById('money');
 if(!user||!login||!hud)return;
 const u=(user.value||localStorage.getItem('lux9user')||'Spieler').trim();
 localStorage.setItem('lux9user',u);
 const st=state(u); if(st.cash==null)st.cash=25000;if(st.debt==null)st.debt=0;localStorage.setItem('lux9_'+u,JSON.stringify(st));
 login.hidden=true;hud.hidden=false;if(who)who.textContent='👤 '+u;if(money)money.textContent='💶 '+Number(st.cash).toLocaleString('de-DE')+' € · 🏦 '+Number(st.debt).toLocaleString('de-DE')+' €';
}
function init(){
 const b=document.getElementById('loginBtn');if(b){b.onclick=function(e){e.preventDefault();login()};}
 const p=document.getElementById('pass');if(p)p.addEventListener('keydown',e=>{if(e.key==='Enter')login()});
 const u=localStorage.getItem('lux9user');if(u){const el=document.getElementById('user');if(el)el.value=u;}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();