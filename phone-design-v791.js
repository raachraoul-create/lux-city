(()=>{const VERSION='7.9.1',VALID=['glass','droid'],$=s=>document.querySelector(s),localKey=()=>{let id=window.LuxAccount?.session?.user?.id||'local';return'luxcity_phone_style_'+id};
function profileStyle(){let s=window.LuxAccount?.profile?.phone_style;return VALID.includes(s)?s:null}
function localStyle(){let s=localStorage.getItem(localKey());return VALID.includes(s)?s:null}
function style(){return profileStyle()||localStyle()}
function apply(s=style()){if(!VALID.includes(s))return false;document.documentElement.dataset.luxPhoneStyle=s;localStorage.setItem(localKey(),s);let p=$('#luxPhone790');if(p){p.classList.toggle('lcGlass',s==='glass');p.classList.toggle('lcDroid',s==='droid')}return true}
async function choose(s){if(!VALID.includes(s))return;localStorage.setItem(localKey(),s);if(window.LuxAccount?.profile)window.LuxAccount.profile.phone_style=s;let A=window.LuxAccount;if(A?.sb&&A?.session?.user?.id){try{await A.sb.from('profiles').update({phone_style:s}).eq('id',A.session.user.id)}catch{}}apply(s);let c=$('#luxPhoneChooser791');if(c)c.remove();setTimeout(()=>window.LuxPhone790?.toggle?.(true),30)}
function chooser(){if(!document.body.classList.contains('game-ready'))return;if(style()){apply();return window.LuxPhone790?.toggle?.()}
 let old=$('#luxPhoneChooser791');if(old)return;let c=document.createElement('section');c.id='luxPhoneChooser791';c.innerHTML=`
 <div class="lcChooserCard">
  <div class="lcChooserEyebrow">DEIN ERSTES HANDY</div>
  <h2>Wähle dein System</h2>
  <p>Diese Auswahl wird für deinen Spieler gespeichert und später nicht erneut abgefragt.</p>
  <div class="lcChooserGrid">
   <button data-phone-style="glass"><span class="preview glassPreview"><i></i><b>09:41</b><em>▢ ▢ ▢ ▢</em></span><strong>Glass OS</strong><small>Klarer, minimalistischer iOS-inspirierter Stil · ohne Markenlogo</small></button>
   <button data-phone-style="droid"><span class="preview droidPreview"><i></i><b>12:00</b><em>● ● ● ●</em></span><strong>Droid UI</strong><small>Flexibler Android-inspirierter Stil · ohne Herstellerlogo</small></button>
  </div>
 </div>`;document.body.appendChild(c);c.querySelectorAll('[data-phone-style]').forEach(b=>b.onclick=()=>choose(b.dataset.phoneStyle))}
function buildCss(){if($('#phoneDesign791'))return;let s=document.createElement('style');s.id='phoneDesign791';s.textContent=`
 #luxPhoneChooser791{position:fixed;inset:0;z-index:180;background:#05080ddc;display:grid;place-items:center;padding:18px;font-family:Inter,Arial,sans-serif;color:#fff;backdrop-filter:blur(12px)}
 .lcChooserCard{width:min(720px,94vw);background:#101720;border:1px solid #ffffff20;border-radius:24px;padding:24px;box-shadow:0 30px 90px #000c}
 .lcChooserEyebrow{color:#f0a51a;font-size:11px;font-weight:900;letter-spacing:.16em}.lcChooserCard h2{font-size:30px;margin:7px 0}.lcChooserCard>p{color:#aebbc6;margin:0 0 20px}
 .lcChooserGrid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.lcChooserGrid>button{background:#171f29;color:#fff;border:1px solid #ffffff16;padding:16px;text-align:left;min-height:250px}.lcChooserGrid>button:hover{border-color:#f0a51a}
 .lcChooserGrid strong{display:block;font-size:21px;margin:13px 0 5px}.lcChooserGrid small{display:block;color:#9facb6;line-height:1.4}
 .preview{height:145px;border-radius:22px;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;border:5px solid #242a31}.preview i{position:absolute;top:7px;width:55px;height:15px;background:#0b0d10;border-radius:20px}.preview b{font-size:32px}.preview em{font-style:normal;margin-top:22px;letter-spacing:9px}
 .glassPreview{background:linear-gradient(160deg,#9bc7e8,#e8b4d2 52%,#e6e5ff);color:#10151b}.droidPreview{background:linear-gradient(160deg,#1f3b33,#15251f 45%,#0e1715);color:#e9fff6}.droidPreview i{width:18px;height:18px;border-radius:50%;background:#111}
 html[data-lux-phone-style="glass"] #luxPhone790{background:linear-gradient(160deg,#e9eef6,#f8f9fb 54%,#e6ebf4);color:#15171b;border-color:#22262c;border-width:6px;border-radius:38px}
 html[data-lux-phone-style="glass"] #luxPhone790 .lcPhoneTop{background:#f7f8facf;color:#111;border-bottom:1px solid #00000012;backdrop-filter:blur(20px)}
 html[data-lux-phone-style="glass"] #luxPhone790 .lcPhoneTop button,html[data-lux-phone-style="glass"] #luxPhone790 .lcBack{background:#e7ebf0!important;color:#1a1d22!important}
 html[data-lux-phone-style="glass"] #luxPhone790 .lcPhoneGrid button{background:#ffffffd9;color:#16191e;border:1px solid #0000000d;box-shadow:0 8px 22px #71849b20;border-radius:22px}
 html[data-lux-phone-style="glass"] #luxPhone790 .lcCard,html[data-lux-phone-style="glass"] #luxPhone790 .lcBill,html[data-lux-phone-style="glass"] #luxPhone790 .lcTxn,html[data-lux-phone-style="glass"] #luxPhone790 .lcList,html[data-lux-phone-style="glass"] #luxPhone790 .lcBalance{background:#ffffffd9;color:#17191c;border-color:#0000000d;border-radius:18px}
 html[data-lux-phone-style="glass"] #luxPhone790 small,html[data-lux-phone-style="glass"] #luxPhone790 .lcPhoneFoot{color:#65717c}
 html[data-lux-phone-style="droid"] #luxPhone790{background:#0d1614;color:#edf9f3;border:5px solid #27322f;border-radius:25px;box-shadow:0 24px 70px #000c}
 html[data-lux-phone-style="droid"] #luxPhone790 .lcPhoneTop{height:60px;background:#15231f;border-bottom:1px solid #ffffff12}
 html[data-lux-phone-style="droid"] #luxPhone790 .lcPhoneGrid{gap:14px}html[data-lux-phone-style="droid"] #luxPhone790 .lcPhoneGrid button{background:#1b2b26;color:#eefcf6;border:1px solid #ffffff10;border-radius:15px}
 html[data-lux-phone-style="droid"] #luxPhone790 .lcCard,html[data-lux-phone-style="droid"] #luxPhone790 .lcBill,html[data-lux-phone-style="droid"] #luxPhone790 .lcTxn,html[data-lux-phone-style="droid"] #luxPhone790 .lcList,html[data-lux-phone-style="droid"] #luxPhone790 .lcBalance{background:#17251f;border-color:#ffffff10;border-radius:14px}
 html[data-lux-phone-style="droid"] #luxPhone790 .lcBack,html[data-lux-phone-style="droid"] #luxPhone790 .lcPhoneTop button{background:#20342d!important;color:#eafff5!important}
 @media(max-width:620px){.lcChooserGrid{grid-template-columns:1fr}.lcChooserCard{max-height:88vh;overflow:auto}.preview{height:105px}}
 `;document.head.appendChild(s)}
buildCss();setInterval(()=>{if(document.body.classList.contains('game-ready')){buildCss();apply();}},500);
addEventListener('keydown',e=>{if((e.code==='KeyH'||String(e.key).toLowerCase()==='h')&&!e.repeat&&!style()){let a=document.activeElement,t=a?.tagName;if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT')return;e.preventDefault();e.stopImmediatePropagation();chooser()}},true);
document.addEventListener('click',e=>{let b=e.target?.closest?.('#phoneBtn790');if(b&&!style()){e.preventDefault();e.stopImmediatePropagation();chooser()}},true);
window.LuxPhoneDesign791={version:VERSION,chooser,choose,apply,get style(){return style()}}})();