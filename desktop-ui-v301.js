(()=>{
const hud=document.getElementById('hud');
if(!hud)return;

const style=document.createElement('style');
style.textContent=`
#hud{top:10px!important;left:10px!important;right:10px!important;display:flex!important;align-items:flex-start!important;gap:8px!important;pointer-events:none!important}
#hud[hidden]{display:none!important}
#who,#money{pointer-events:none;white-space:nowrap;background:#10151bd9;padding:9px 11px;border-radius:10px;font-weight:700}
#money{margin-left:0!important}
#luxMenuToggle{pointer-events:auto!important;width:auto!important;margin:0!important;padding:9px 14px!important;white-space:nowrap}
#luxMenu{position:fixed;z-index:25;top:54px;left:10px;width:210px;max-height:calc(100vh - 70px);overflow-y:auto;padding:8px;background:#10151bf2;border:1px solid #ffffff33;border-radius:12px;box-shadow:0 8px 28px #0008;display:none;pointer-events:auto}
#luxMenu.open{display:block}
#luxMenu button{display:block!important;width:100%!important;margin:5px 0!important;padding:10px 8px!important;font-size:13px!important;text-align:left}
#luxMenu button#logout{margin-top:14px!important}
@media(max-width:900px){#who{display:none}#money{font-size:12px;padding:8px}#luxMenuToggle{font-size:12px!important;padding:8px 10px!important}#luxMenu{top:48px;width:190px}}
`;
document.head.appendChild(style);

const toggle=document.createElement('button');
toggle.id='luxMenuToggle';toggle.textContent='☰ MENÜ';
const menu=document.createElement('div');menu.id='luxMenu';
document.body.appendChild(menu);
hud.insertBefore(toggle,hud.firstChild);

toggle.onclick=e=>{e.stopPropagation();menu.classList.toggle('open')};
document.addEventListener('click',e=>{if(!menu.contains(e.target)&&e.target!==toggle)menu.classList.remove('open')});

function organize(){
 [...hud.querySelectorAll('button')].forEach(b=>{
   if(b===toggle)return;
   menu.appendChild(b);
 });
 const personal=[...menu.querySelectorAll('button')].find(b=>b.textContent.trim().toUpperCase()==='PERSONAL');
 if(personal)menu.appendChild(personal);
}
organize();
new MutationObserver(organize).observe(hud,{childList:true});

const map={arrowup:'w',arrowdown:'s',arrowleft:'d',arrowright:'a'};
function keyboard(e,down){
 const k=e.key.toLowerCase(),mapped=map[k];
 if(!mapped)return;
 const tag=document.activeElement?.tagName;
 if(tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT')return;
 if(window.LuxWorld?.keys){window.LuxWorld.keys[mapped]=down?1:0;e.preventDefault()}
}
addEventListener('keydown',e=>keyboard(e,true),{capture:true});
addEventListener('keyup',e=>keyboard(e,false),{capture:true});
addEventListener('blur',()=>{if(window.LuxWorld?.keys)for(const k of ['w','a','s','d'])window.LuxWorld.keys[k]=0});

window.LuxDesktopUI={version:'3.0.2',organize};
})();