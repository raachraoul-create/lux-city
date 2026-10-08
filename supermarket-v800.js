import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{if(!window.LuxWorld?.scene||!window.LuxSystems330||!window.LuxLife)return;clearInterval(q);init()},220);
function init(){
 const W=LuxWorld,S=W.scene,L=LuxLife,K='luxcity_supermarket_v800',P={x:160,z:205,rot:-Math.PI/2,w:28,d:18,h:7.8},door={x:150.65,z:205},mobile=matchMedia('(pointer:coarse)').matches;
 let state={meals:4,drinks:4,purchases:0};try{state=Object.assign(state,JSON.parse(localStorage.getItem(K)||'{}'))}catch{}
 const save=()=>{localStorage.setItem(K,JSON.stringify(state));window.LuxCloud645?.save?.()};
 const M=(c,r=.72,m=.03,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const A=(g,m,x,y,z,p)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=!mobile;o.receiveShadow=true;p.add(o);return o};
 const root=new T.Group();root.name='LuxSupermarket800';root.position.set(P.x,0,P.z);root.rotation.y=P.rot;S.add(root);
 const wall=M(0xd9d8d2,.82),dark=M(0x2d3438,.40,.38),green=M(0x356b4c,.58,.12),glass=new T.MeshPhysicalMaterial({color:0x84afbd,roughness:.09,metalness:.08,transparent:true,opacity:mobile?.78:.62}),warm=M(0xffdfaa,.28,.05,0xffc66a,.38),asphalt=M(0x383d40,.94),white=M(0xece9df,.72);
 A(new T.BoxGeometry(P.w,P.h,P.d),wall,0,P.h/2,0,root);
 A(new T.BoxGeometry(P.w+.5,.34,P.d+.5),dark,0,P.h+.17,0,root);
 A(new T.BoxGeometry(P.w+.3,.34,P.d+.3),M(0x74716b,.90),0,.17,0,root);
 const front=P.d/2+.16;
 for(const x of[-10.2,-6.8,-3.4,3.4,6.8,10.2])A(new T.BoxGeometry(2.8,4.0,.09),glass,x,2.35,front,root);
 A(new T.BoxGeometry(2.9,3.4,.12),dark,0,1.70,front+.03,root);A(new T.BoxGeometry(2.48,2.95,.05),glass,0,1.68,front+.10,root);
 A(new T.BoxGeometry(11.5,.24,1.25),green,0,5.75,front+.50,root);
 function signTex(){let c=document.createElement('canvas');c.width=900;c.height=180,x=c.getContext('2d');x.fillStyle='#356b4c';x.fillRect(0,0,900,180);x.fillStyle='#fff';x.font='900 78px Arial';x.textAlign='center';x.textBaseline='middle';x.fillText('LUX MARKT',450,92);let t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t}
 A(new T.PlaneGeometry(10.4,2.0),new T.MeshBasicMaterial({map:signTex(),side:T.DoubleSide}),0,6.25,front+.67,root);
 for(const x of[-9.5,-4.8,0,4.8,9.5]){A(new T.BoxGeometry(.75,.15,.34),warm,x,4.55,front+.32,root);if(!mobile){let l=new T.PointLight(0xffd69a,.22,8,2);l.position.set(x,4.45,front+.55);root.add(l)}}
 // loading/service side
 A(new T.BoxGeometry(6.3,3.4,.14),dark,-8.2,1.75,-P.d/2-.08,root);for(let y=.7;y<3.1;y+=.52)A(new T.BoxGeometry(5.9,.05,.04),M(0x666d70,.38,.42),-8.2,y,-P.d/2-.18,root);
 // parking lot toward the road, plus connection to x=125 road
 const lot=new T.Group();lot.position.set(-P.d/2-9.0,0,0);root.add(lot);A(new T.BoxGeometry(18,.08,24),asphalt,0,.05,0,lot);
 for(let z=-9;z<=9;z+=4.5){for(const x of[-5.2,5.2])A(new T.BoxGeometry(.10,.025,3.8),white,x,.105,z,lot)}
 A(new T.BoxGeometry(19,.07,7.0),asphalt,-13.5,.045,0,root);
 // shopping carts
 for(let i=0;i<5;i++){let g=new T.Group();g.position.set(-9.0+i*.72,.25,front+2.4);root.add(g);A(new T.BoxGeometry(.62,.42,.82),M(0xaeb5b8,.30,.60),0,.32,0,g);for(const x of[-.24,.24])for(const z of[-.28,.28])A(new T.CylinderGeometry(.06,.06,.045,10),dark,x,.06,z,g).rotation.z=Math.PI/2}
 // collision shell with door opening
 const cs=Math.cos(P.rot),sn=Math.sin(P.rot);
 for(let lx=-P.w/2;lx<=P.w/2;lx+=2){for(const lz of[-P.d/2,P.d/2]){if(lz===P.d/2&&Math.abs(lx)<2.4)continue;W.obstacles.push({x:P.x+lx*cs+lz*sn,z:P.z-lx*sn+lz*cs,r:1.0})}}
 for(let lz=-P.d/2+2;lz<P.d/2-1;lz+=2)for(const lx of[-P.w/2,P.w/2])W.obstacles.push({x:P.x+lx*cs+lz*sn,z:P.z-lx*sn+lz*cs,r:1.0});
 LuxSystems330.doors.supermarket=door;
 function openNow(){let h=(+L.state.hour||0)+(+L.state.minute||0)/60;return h>=7&&h<21}
 function near(){return !window.LuxPlayerCar840?.driving&&Math.hypot(W.player.position.x-door.x,W.player.position.z-door.z)<4.8}
 function buy(meals,drinks,cost,label){
   if(!near())return alert('Geh zuerst zum Eingang des Supermarkts.');if(!openNow())return alert('Supermarkt geschlossen · 07:00–21:00');
   if((L.state.cash||0)<cost)return alert('Nicht genug Privatgeld.');
   L.addExpense(cost);state.meals+=meals;state.drinks+=drinks;state.purchases++;save();open()
 }
 function open(){
   if(!near())return alert('Geh zuerst zum Eingang des Supermarkts.');if(!openNow())return alert('Supermarkt geschlossen · 07:00–21:00');
   let m=document.getElementById('modal'),b=document.getElementById('modalBody');if(!m||!b)return;m.hidden=false;m.style.display='block';
   b.innerHTML='<h2>🛒 Lux Markt</h2><p>Vorrat zuhause: <b>'+state.meals+' Mahlzeiten</b> · <b>'+state.drinks+' Getränke</b></p>'+
   '<div class="row"><b>Wocheneinkauf klein</b><br>6 Mahlzeiten · 2 Getränke · 34 € <button data-shop="small">KAUFEN</button></div>'+
   '<div class="row"><b>Getränkepack</b><br>6 Getränke · 12 € <button data-shop="drink">KAUFEN</button></div>'+
   '<div class="row"><b>Familienkorb</b><br>10 Mahlzeiten · 6 Getränke · 54 € <button data-shop="family">KAUFEN</button></div>';
   b.querySelector('[data-shop="small"]').onclick=()=>buy(6,2,34,'klein');b.querySelector('[data-shop="drink"]').onclick=()=>buy(0,6,12,'Getränke');b.querySelector('[data-shop="family"]').onclick=()=>buy(10,6,54,'Familie')
 }
 function consumeMeal(){if(state.meals<=0){alert('Der Kühlschrank ist leer. Kauf zuerst Lebensmittel im Lux Markt.');return false}state.meals--;save();return true}
 function consumeDrink(){if(state.drinks<=0){alert('Keine Getränke mehr zuhause. Du kannst weiterhin kostenlos Leitungswasser trinken oder im Lux Markt einkaufen.');return false}state.drinks--;save();return true}
 let hint=document.createElement('div');hint.id='supermarketHint800';hint.style='position:fixed;left:50%;bottom:124px;transform:translateX(-50%);z-index:60;background:#0b111de8;color:#fff;border:1px solid #ffffff2c;border-radius:9px;padding:8px 11px;font:bold 11px Arial;display:none;pointer-events:none';document.body.appendChild(hint);
 addEventListener('keydown',e=>{if((e.code==='KeyE'||String(e.key).toLowerCase()==='e')&&!e.repeat&&near()){e.preventDefault();e.stopImmediatePropagation();open()}},{capture:true});
 setInterval(()=>{let n=near();hint.style.display=n?'block':'none';if(n)hint.textContent=openNow()?'E · LUX MARKT · EINKAUFEN':'LUX MARKT GESCHLOSSEN · 07:00–21:00'},160);
 window.LuxSupermarket800={version:'8.0.0',state,position:P,door,near,open,buy,consumeMeal,consumeDrink,save}
}
