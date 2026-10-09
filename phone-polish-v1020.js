(()=>{
let q=setInterval(()=>{if(!window.LuxPhone791||!window.LuxPhoneDesign791||!document.getElementById('luxPhone790'))return;clearInterval(q);init()},320);
function init(){
 if(document.getElementById('phonePolish1020'))return;
 const s=document.createElement('style');s.id='phonePolish1020';s.textContent=`
 #luxPhone790{isolation:isolate;box-shadow:0 28px 90px #000d,0 0 0 1px #ffffff0e inset!important}
 #luxPhone790:before{content:"";position:absolute;left:50%;top:8px;transform:translateX(-50%);z-index:12;width:78px;height:19px;border-radius:20px;background:#07090c;box-shadow:0 1px 0 #ffffff14 inset;pointer-events:none}
 #luxPhone790:after{content:"";position:absolute;left:50%;bottom:5px;transform:translateX(-50%);z-index:12;width:105px;height:4px;border-radius:8px;background:#ffffff75;pointer-events:none}
 #luxPhone790 .lcPhoneTop{padding-top:7px!important;height:57px!important;box-sizing:border-box}
 #luxPhone790 #phoneTitle{letter-spacing:.02em}
 #luxPhone790 #phoneBody{background:radial-gradient(circle at 20% 0,#ffffff08,transparent 32%);scrollbar-width:none}
 #luxPhone790 #phoneBody::-webkit-scrollbar{display:none}
 #luxPhone790 .lcPhoneGrid{gap:13px!important}
 #luxPhone790 .lcPhoneGrid button{position:relative;overflow:hidden;min-height:112px;border:1px solid #ffffff13!important;
   box-shadow:0 9px 24px #0003,inset 0 1px #ffffff10;transition:transform .12s ease,box-shadow .12s ease}
 #luxPhone790 .lcPhoneGrid button:active{transform:scale(.975);box-shadow:0 4px 12px #0004}
 #luxPhone790 .lcPhoneGrid button:before{content:"";position:absolute;inset:0;background:linear-gradient(145deg,#ffffff10,transparent 46%);pointer-events:none}
 #luxPhone790 .lcPhoneGrid span{display:grid;place-items:center;width:48px;height:48px;border-radius:15px;background:#ffffff12;
   box-shadow:inset 0 1px #ffffff20,0 7px 16px #0002;font-size:27px!important}
 #luxPhone790 .lcPhoneGrid small{font-size:10px;line-height:1.2;text-align:center}
 #luxPhone790 .lcBalance{position:relative;overflow:hidden;padding:20px!important;letter-spacing:-.03em;
   box-shadow:inset 0 1px #ffffff10,0 8px 24px #0003}
 #luxPhone790 .lcBalance:after{content:"LC";position:absolute;right:16px;top:12px;font:900 42px Arial;opacity:.055;letter-spacing:-.12em}
 #luxPhone790 .lcCard,#luxPhone790 .lcBill,#luxPhone790 .lcTxn,#luxPhone790 .lcList{box-shadow:inset 0 1px #ffffff0b,0 5px 16px #0002}
 #luxPhone790 .lcCard strong{letter-spacing:-.02em}
 #luxPhone790 .lcCard.selected{box-shadow:0 0 0 1px #f0a51a55,0 8px 22px #0003!important}
 #luxPhone790 .lcBill button,#luxPhone790 .lcCard button{border-radius:9px!important;min-height:34px}
 #luxPhone790 h3{margin:18px 0 7px;font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#9eacb7}
 html[data-lux-phone-style="glass"] #luxPhone790{background:linear-gradient(155deg,#eef3fa 0,#f9fbfd 42%,#e8edf6 100%)!important;
   box-shadow:0 30px 90px #0008,0 0 0 1px #fff inset!important}
 html[data-lux-phone-style="glass"] #luxPhone790:after{background:#11182790}
 html[data-lux-phone-style="glass"] #luxPhone790 #phoneBody{background:
   radial-gradient(circle at 15% 0,#a9d4ff55,transparent 35%),radial-gradient(circle at 100% 28%,#e7b4dc45,transparent 32%)}
 html[data-lux-phone-style="glass"] #luxPhone790 .lcPhoneGrid button{backdrop-filter:blur(16px);background:#ffffffba!important}
 html[data-lux-phone-style="glass"] #luxPhone790 .lcPhoneGrid span{background:linear-gradient(145deg,#ffffff,#e9eef6);box-shadow:0 5px 14px #64788e22}
 html[data-lux-phone-style="glass"] #luxPhone790 h3{color:#6d7883}
 html[data-lux-phone-style="droid"] #luxPhone790{background:linear-gradient(160deg,#101b18,#0b1311 70%)!important}
 html[data-lux-phone-style="droid"] #luxPhone790:before{width:18px;height:18px;border-radius:50%;top:10px}
 html[data-lux-phone-style="droid"] #luxPhone790 .lcPhoneGrid button{background:linear-gradient(145deg,#1d3029,#172720)!important}
 html[data-lux-phone-style="droid"] #luxPhone790 .lcPhoneGrid span{border-radius:13px;background:#274237}
 @media(max-width:700px){
   #luxPhone790{right:6px!important;bottom:6px!important;width:min(356px,96vw)!important;height:min(720px,88vh)!important}
   #luxPhone790 #phoneBody{padding:13px!important}
   #luxPhone790 .lcPhoneGrid button{min-height:100px!important}
   #luxPhone790 .lcPhoneGrid span{width:44px;height:44px}
 }`;
 document.head.appendChild(s);

 const p=document.getElementById('luxPhone790'),top=p.querySelector('.lcPhoneTop');
 if(top&&!document.getElementById('phoneStatus1020')){
   const st=document.createElement('div');st.id='phoneStatus1020';Object.assign(st.style,{position:'absolute',left:'14px',top:'8px',zIndex:'13',font:'800 9px Arial',opacity:'.75',pointerEvents:'none'});st.textContent='LUX';
   const net=document.createElement('div');net.id='phoneNet1020';Object.assign(net.style,{position:'absolute',right:'48px',top:'8px',zIndex:'13',font:'800 9px Arial',opacity:'.75',pointerEvents:'none'});net.textContent='▮▮▮ 5G  ▰';
   p.append(st,net);
 }
 function badges(){
   const open=window.LuxPhone791?.state?.bills?.filter?.(b=>!b.paid)?.length||0;
   const bills=[...p.querySelectorAll('[data-app="bills"]')][0];
   if(bills){
     let b=bills.querySelector('.phoneBadge1020');
     if(open&&!b){b=document.createElement('i');b.className='phoneBadge1020';Object.assign(b.style,{position:'absolute',right:'9px',top:'9px',minWidth:'18px',height:'18px',padding:'0 4px',borderRadius:'20px',background:'#e4424a',color:'#fff',font:'900 10px/18px Arial',fontStyle:'normal',boxShadow:'0 2px 8px #0004'});b.textContent=open;bills.appendChild(b)}
     else if(b)b.textContent=open||'';
     if(b)b.style.display=open?'block':'none';
   }
 }
 const obs=new MutationObserver(()=>badges());obs.observe(p,{childList:true,subtree:true});badges();
 window.LuxPhonePolish1020={version:'10.2.0'}
}
})();