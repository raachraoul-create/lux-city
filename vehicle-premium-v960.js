import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

let boot=setInterval(()=>{
  const W=window.LuxWorld,PC=window.LuxPlayerCar840||window.LuxPlayerCar750||window.LuxPlayerCar720;
  if(!W?.scene||!W?.cars?.length||!PC?.car)return;
  clearInterval(boot);init(W,PC);
},260);

function init(W,PC){
  const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
  const S=W.scene;
  const M=(c,r=.35,m=.25,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
  const P=(c,r=.22,m=.42,extra={})=>new T.MeshPhysicalMaterial({color:c,roughness:r,metalness:m,clearcoat:.72,clearcoatRoughness:.14,...extra});
  const glass=P(0x213741,.08,.18,{transparent:true,opacity:mobile?.76:.66,transmission:mobile?0:.10,ior:1.45,clearcoat:.92});
  const dark=P(0x11161a,.28,.52),rubber=M(0x0d0f11,.84,.01),metal=P(0xb9bec2,.18,.76),blackMetal=P(0x252b2f,.22,.70);
  const lens=P(0xddeeff,.06,.08,{transparent:true,opacity:.84,transmission:mobile?0:.12,emissive:0xffffff,emissiveIntensity:.26});
  const tail=P(0x99131c,.10,.08,{transparent:true,opacity:.92,emissive:0xff121e,emissiveIntensity:.22});
  const amber=P(0xe8781f,.12,.08,{emissive:0xff8b22,emissiveIntensity:.10});
  const white=M(0xf1efe8,.55,.04),plateM=M(0xf4f0df,.56,.04),seat=M(0x202326,.62,.10);

  function A(g,m,x,y,z,p){
    const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=!mobile;o.receiveShadow=true;p.add(o);return o
  }
  function labelTexture(text,bg='#f3efe3',fg='#15191c'){
    const c=document.createElement('canvas');c.width=512;c.height=128;const x=c.getContext('2d');
    x.fillStyle=bg;x.fillRect(0,0,512,128);x.fillStyle=fg;x.font='900 58px Arial';x.textAlign='center';x.textBaseline='middle';x.fillText(text,256,66);
    const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;return tx
  }
  function plate(parent,z,front=true,text='LC 960'){
    const m=new T.MeshBasicMaterial({map:labelTexture(text),side:T.DoubleSide});
    const p=A(new T.PlaneGeometry(.72,.17),m,0,.50,z,parent);p.rotation.y=front?0:Math.PI;return p
  }
  function badge(parent,text,y,z,front=true,w=.20){
    const m=new T.MeshBasicMaterial({map:labelTexture(text,'#11161a','#e8ecee'),side:T.DoubleSide});
    const p=A(new T.PlaneGeometry(w,.085),m,0,y,z,parent);p.rotation.y=front?0:Math.PI;return p
  }
  const designFamilies=[
    {name:'Avelon',mark:'A',accent:0xc9ced1,style:'blade'},
    {name:'Rivon',mark:'R',accent:0xb7bcc0,style:'mesh'},
    {name:'Montaire',mark:'M',accent:0xd2b26d,style:'lux'},
    {name:'Voltaris',mark:'V',accent:0x7fb6cc,style:'ev'}
  ];
  function doorLine(parent,x,y,z,h=.72){
    A(new T.BoxGeometry(.018,h,.026),M(0x080a0c,.55,.24),x,y,z,parent)
  }
  function handle(parent,x,y,z){
    A(new T.BoxGeometry(.19,.035,.035),metal,x,y,z,parent)
  }
  function mirror(parent,sx,y,z){
    const g=new T.Group();g.position.set(sx, y, z);parent.add(g);
    A(new T.BoxGeometry(.22,.12,.32),dark,0,0,0,g);
    A(new T.BoxGeometry(.025,.09,.24),glass,Math.sign(sx)*.125,0,0,g);
    A(new T.CylinderGeometry(.025,.035,.18,9),blackMetal,-Math.sign(sx)*.03,-.09,.08,g).rotation.z=Math.PI/2;
    return g
  }
  function detailedWheel(group,r=.36){
    if(!group||group.getObjectByName('PremiumRim960'))return;
    const g=new T.Group();g.name='PremiumRim960';group.add(g);
    const outer=A(new T.TorusGeometry(r*.54,r*.055,12,34),blackMetal,0,0,0,g);outer.rotation.y=Math.PI/2;
    const rim=A(new T.CylinderGeometry(r*.43,r*.43,.052,30),metal,0,0,0,g);rim.rotation.z=Math.PI/2;
    const inner=A(new T.CylinderGeometry(r*.31,r*.31,.057,28),dark,0,0,0,g);inner.rotation.z=Math.PI/2;
    for(let k=0;k<10;k++){
      const sp=A(new T.BoxGeometry(.024,r*.56,.035),metal,0,0,0,g);sp.rotation.x=k*Math.PI/10;
    }
    const disc=A(new T.CylinderGeometry(r*.285,r*.285,.045,28),M(0x7d858a,.32,.72),0,0,0,g);disc.rotation.z=Math.PI/2;
    const hub=A(new T.CylinderGeometry(r*.105,r*.105,.072,20),blackMetal,0,0,0,g);hub.rotation.z=Math.PI/2;
    A(new T.BoxGeometry(.045,r*.19,r*.10),M(0xa92a2f,.28,.30),.045,r*.15,0,g);
    for(let k=0;k<5;k++){
      const a=k*Math.PI*2/5;
      const bolt=A(new T.CylinderGeometry(.017,.017,.08,10),M(0xd0d3d5,.18,.72),0,Math.sin(a)*r*.15,Math.cos(a)*r*.15,g);bolt.rotation.z=Math.PI/2;
    }
  }
  function contactShadow(parent,w,l){
    if(parent.getObjectByName('VehicleContact960'))return;
    const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');
    const gr=x.createRadialGradient(64,64,8,64,64,62);gr.addColorStop(0,'rgba(0,0,0,.44)');gr.addColorStop(.55,'rgba(0,0,0,.18)');gr.addColorStop(1,'rgba(0,0,0,0)');
    x.fillStyle=gr;x.fillRect(0,0,128,128);const tx=new T.CanvasTexture(c);
    const q=A(new T.PlaneGeometry(w,l),new T.MeshBasicMaterial({map:tx,transparent:true,depthWrite:false,opacity:.62}),0,.016,0,parent);
    q.name='VehicleContact960';q.rotation.x=-Math.PI/2;q.renderOrder=1
  }

  const premiumLights=[];

  function upgradeTraffic(v,i){
    if(!v||v.userData.vehiclePremium960||v.userData.emergency500)return;
    v.userData.vehiclePremium960=true;
    const cls=v.userData.vehicleClass||'sedan',w=(v.userData.halfW||.94)*2,l=(v.userData.halfL||2.3)*2;
    const g=new T.Group();g.name='VehiclePremium960';v.add(g);
    const front=-l/2+.02,rear=l/2-.02,roofY=cls==='van'?2.02:cls==='suv'?1.64:1.48;
    const bodyColor=[0x324f68,0x842f35,0xe4e2dc,0x252a2e,0x5e7457,0xa27c3d,0x505768,0x6a625b][i%8];
    const paint=P(bodyColor,.19,.40);
    const family=designFamilies[i%designFamilies.length],familyMetal=P(family.accent,.17,.72);
    v.userData.fictionalBrand=family.name;

    // Sculpted lower body, hood and bumpers.
    A(new T.BoxGeometry(w*.94,.22,l*.78),paint,0,.61,.02,g);
    const hood=A(new T.BoxGeometry(w*.84,.10,l*.20),paint,0,cls==='suv'?.99:.89,front+l*.12,g);hood.rotation.x=-.045;
    A(new T.BoxGeometry(w*.91,.18,.20),dark,0,.48,front-.05,g);
    A(new T.BoxGeometry(w*.91,.18,.20),dark,0,.47,rear+.05,g);
    A(new T.BoxGeometry(w*.72,.055,l*.96),blackMetal,0,.28,0,g);

    // Side skirts, wheel-arch lips, door seams and handles.
    for(const sx of[-1,1]){
      A(new T.BoxGeometry(.06,.14,l*.72),dark,sx*(w/2+.018),.55,.04,g);
      for(const z of[-l*.18,l*.18]){doorLine(g,sx*(w/2+.035),1.01,z,cls==='van'?.78:.62);handle(g,sx*(w/2+.052),1.03,z-.18)}
      mirror(g,sx*(w/2+.12),roofY-.48,front+l*.25);
      for(const z of[-(v.userData.vehicleClass==='van'?1.62:1.48),(v.userData.vehicleClass==='van'?1.62:1.48)]){
        const arch=A(new T.TorusGeometry((cls==='suv'? .43:.38),.028,8,28,Math.PI),paint,sx*(w/2+.02),.47,z,g);
        arch.rotation.y=Math.PI/2;arch.rotation.z=Math.PI;
      }
    }

    // Front fascia, lower intakes and subtle metal trim add much more depth.
    A(new T.BoxGeometry(w*.46,.095,.055),blackMetal,0,.59,front-.145,g);
    for(const x of[-w*.36,w*.36]) A(new T.BoxGeometry(w*.13,.075,.06),dark,x,.55,front-.15,g);
    A(new T.BoxGeometry(w*.72,.025,.055),metal,0,.43,front-.16,g);
    A(new T.BoxGeometry(w*.68,.028,.05),metal,0,.45,rear+.16,g);
    // Four original Lux City marque faces give traffic real variety without copying licensed cars.
    if(family.style==='blade'){
      A(new T.BoxGeometry(w*.54,.030,.070),familyMetal,0,.64,front-.175,g);
      for(const x of[-w*.19,0,w*.19])A(new T.BoxGeometry(.030,.18,.070),familyMetal,x,.59,front-.177,g);
    }else if(family.style==='mesh'){
      A(new T.BoxGeometry(w*.50,.20,.065),dark,0,.58,front-.17,g);
      for(let x=-w*.20;x<=w*.20;x+=w*.10)A(new T.BoxGeometry(.020,.15,.072),familyMetal,x,.58,front-.178,g);
      for(let y=.53;y<=.63;y+=.05)A(new T.BoxGeometry(w*.44,.014,.072),familyMetal,0,y,front-.179,g);
    }else if(family.style==='lux'){
      A(new T.BoxGeometry(w*.45,.18,.064),dark,0,.60,front-.17,g);
      A(new T.BoxGeometry(w*.48,.026,.072),familyMetal,0,.67,front-.178,g);
      A(new T.BoxGeometry(w*.48,.026,.072),familyMetal,0,.53,front-.178,g);
    }else{
      A(new T.BoxGeometry(w*.48,.035,.066),familyMetal,0,.61,front-.17,g);
      A(new T.BoxGeometry(w*.30,.018,.070),familyMetal,0,.55,front-.178,g);
    }
    badge(g,family.mark,.68,front-.184,true,.19);
    badge(g,family.mark,.69,rear+.184,false,.18);

    // Modern lights with separate lenses and DRL strips.
    for(const x of[-w*.29,w*.29]){
      const hl=A(new T.BoxGeometry(w*.19,.16,.075),lens,x,.76,front-.12,g);premiumLights.push({m:hl.material,type:'head'});
      const drl=A(new T.BoxGeometry(w*.15,.025,.085),M(0xffffff,.10,.05,0xffffff,.40),x,.82,front-.16,g);premiumLights.push({m:drl.material,type:'drl'});
      const tl=A(new T.BoxGeometry(w*.21,.15,.075),tail,x,.75,rear+.12,g);premiumLights.push({m:tl.material,type:'tail'});
      A(new T.BoxGeometry(.065,.055,.080),amber,x,.66,front-.15,g);
    }
    // Light bar signature and rear reflector.
    const rearBar=A(new T.BoxGeometry(w*.56,.035,.080),tail,0,.78,rear+.13,g);premiumLights.push({m:rearBar.material,type:'tail'});
    A(new T.BoxGeometry(w*.62,.028,.078),M(0xffffff,.10,.05,0xffffff,.26),0,.82,front-.15,g);
    if(family.style==='blade'){
      for(const x of[-w*.38,w*.38]){const s=A(new T.BoxGeometry(w*.10,.025,.085),M(0xffffff,.08,.03,0xffffff,.36),x,.73,front-.165,g);s.rotation.z=x<0?-.28:.28}
    }else if(family.style==='mesh'){
      for(const x of[-w*.31,w*.31]){const s=A(new T.BoxGeometry(w*.13,.022,.086),M(0xffffff,.08,.03,0xffffff,.38),x,.86,front-.165,g);s.rotation.z=x<0?.12:-.12}
    }else if(family.style==='lux'){
      A(new T.BoxGeometry(w*.68,.018,.086),M(0xffffff,.08,.03,0xffffff,.33),0,.855,front-.165,g);
    }else{
      A(new T.BoxGeometry(w*.72,.020,.086),M(0xe9fbff,.08,.03,0xbfefff,.38),0,.84,front-.165,g);
    }

    // Window surrounds and B-pillars make the side profile read as a real road car.
    for(const sx of[-1,1]){
      A(new T.BoxGeometry(.028,.52,l*.38),glass,sx*(w/2+.045),roofY-.33,.05,g);
      A(new T.BoxGeometry(.034,.56,.07),blackMetal,sx*(w/2+.058),roofY-.32,.02,g);
      A(new T.BoxGeometry(.025,.035,l*.42),metal,sx*(w/2+.064),roofY-.05,.04,g);
    }

    // Panoramic glass / roof rails depending on class.
    if(cls==='sedan'||cls==='hatch'){
      const pano=A(new T.BoxGeometry(w*.58,.025,l*.27),glass,0,roofY+.012,.02,g);pano.rotation.x=-.02;
    }else{
      for(const sx of[-1,1])A(new T.BoxGeometry(.045,.055,l*.44),blackMetal,sx*w*.32,roofY+.07,0,g);
    }

    // Interior silhouettes visible through windows.
    for(const z of[-.28,.55])for(const x of[-w*.20,w*.20]){
      A(new T.BoxGeometry(.36,.42,.36),seat,x,1.05,z,g);
      A(new T.BoxGeometry(.30,.30,.13),seat,x,1.33,z+.08,g);
    }
    A(new T.BoxGeometry(w*.62,.10,.38),dark,0,1.02,front+l*.30,g);
    A(new T.TorusGeometry(.15,.018,8,24),dark,-w*.18,1.12,front+l*.33,g).rotation.y=Math.PI/2;

    plate(g,front-.16,true,'LC '+String(960+i).slice(-3));
    plate(g,rear+.16,false,'LC '+String(960+i).slice(-3));
    contactShadow(g,w*1.20,l*.92);

    for(const wh of v.userData.wheels720||[])detailedWheel(wh,cls==='suv'||cls==='van'?.40:.35);
  }

  function upgradePlayer(car){
    if(car.userData.vehiclePremium960)return;
    car.userData.vehiclePremium960=true;
    const g=new T.Group();g.name='PlayerCarPremium960';car.add(g);
    const paint=P(0xf3f3ef,.15,.46),carbon=P(0x171b1e,.18,.68),accent=P(0x9aa0a4,.16,.72);
    const front=-2.42,rear=2.42;

    // Cleaner modern EV-like body detailing, using only original Lux City design language.
    const hood=A(new T.BoxGeometry(1.56,.075,.98),paint,0,.90,-1.63,g);hood.rotation.x=-.055;
    A(new T.BoxGeometry(1.74,.15,.18),carbon,0,.47,front-.07,g);
    A(new T.BoxGeometry(1.72,.13,.18),carbon,0,.47,rear+.07,g);
    A(new T.BoxGeometry(1.67,.045,4.20),carbon,0,.25,0,g);
    for(const sx of[-1,1]){
      A(new T.BoxGeometry(.055,.13,3.64),carbon,sx*.97,.53,.05,g);
      doorLine(g,sx*.982,1.02,-.26,.64);doorLine(g,sx*.982,1.02,.72,.64);
      handle(g,sx*1.00,1.00,-.48);handle(g,sx*1.00,1.00,.47);
      mirror(g,sx*1.10,1.12,-.68);
    }

    // Continuous glass roof with metal surround.
    A(new T.BoxGeometry(1.26,.022,1.78),glass,0,1.49,.12,g);
    for(const sx of[-1,1])A(new T.BoxGeometry(.035,.040,1.88),accent,sx*.65,1.50,.12,g);

    // Lower intake, splitter and side intakes give the player car a deeper premium stance.
    A(new T.BoxGeometry(.88,.085,.06),carbon,0,.56,front-.15,g);
    A(new T.BoxGeometry(1.42,.022,.055),accent,0,.43,front-.17,g);
    for(const x of[-.72,.72]) A(new T.BoxGeometry(.22,.07,.06),carbon,x,.53,front-.16,g);

    // Premium headlight assemblies and full-width rear signature.
    for(const x of[-.57,.57]){
      const hl=A(new T.BoxGeometry(.48,.16,.085),lens,x,.72,front-.10,g);hl.rotation.z=x<0?.045:-.045;premiumLights.push({m:hl.material,type:'head'});
      const drl=A(new T.BoxGeometry(.38,.025,.095),M(0xffffff,.08,.03,0xffffff,.50),x,.78,front-.15,g);premiumLights.push({m:drl.material,type:'drl'});
      const tl=A(new T.BoxGeometry(.46,.12,.085),tail,x,.72,rear+.10,g);premiumLights.push({m:tl.material,type:'tail'});
    }
    const rearSig=A(new T.BoxGeometry(1.34,.035,.092),tail,0,.76,rear+.13,g);premiumLights.push({m:rearSig.material,type:'tail'});
    A(new T.BoxGeometry(.92,.07,.07),dark,0,.57,front-.14,g);

    // Improved interior: four seats, console, dash, instrument cluster.
    for(const z of[-.14,.72])for(const x of[-.40,.40]){
      A(new T.BoxGeometry(.45,.50,.46),seat,x,.80,z,g);
      const b=A(new T.BoxGeometry(.44,.61,.18),seat,x,1.13,z+.18,g);b.rotation.x=-.10;
      A(new T.BoxGeometry(.31,.12,.18),seat,x,1.44,z+.20,g);
    }
    A(new T.BoxGeometry(.24,.48,.95),dark,0,.84,.23,g);
    A(new T.BoxGeometry(1.43,.12,.40),dark,0,1.03,-.62,g);
    const centerScreen=A(new T.BoxGeometry(.48,.30,.035),M(0x111820,.12,.38,0x55a9df,.16),0,1.23,-.72,g);centerScreen.rotation.x=-.16;
    const cluster=A(new T.BoxGeometry(.34,.14,.025),M(0x0f1519,.12,.40,0x65b8e8,.12),-.37,1.20,-.71,g);cluster.rotation.x=-.14;

    // Stronger wheels / rims and caliper detail.
    for(const wh of car.userData.wheels710||[]){
      detailedWheel(wh,.39);
      const cal=A(new T.BoxGeometry(.055,.18,.08),M(0xb21f2e,.26,.34),0,.02,.17,wh);cal.rotation.z=.18;
    }

    plate(g,front-.17,true,'LC 840');
    plate(g,rear+.17,false,'LC 840');
    // Own-brand badge, deliberately not copying a real manufacturer's logo.
    const badgeTex=labelTexture('LUX E','#15191c','#e7e9e9');
    const badge=A(new T.PlaneGeometry(.28,.09),new T.MeshBasicMaterial({map:badgeTex,side:T.DoubleSide}),0,.79,front-.18,g);
    const rearBadge=A(new T.PlaneGeometry(.28,.085),new T.MeshBasicMaterial({map:badgeTex,side:T.DoubleSide}),0,.79,rear+.18,g);rearBadge.rotation.y=Math.PI;
    // Flush charge-door outline and small fender camera pods keep the car unmistakably electric and original.
    doorLine(g,-.992,.82,.98,.30);
    for(const sx of[-1,1])A(new T.BoxGeometry(.055,.075,.10),dark,sx*.995,.88,-.72,g);
    contactShadow(g,2.18,4.52);

    car.traverse(o=>{
      if(!o.isMesh||!o.material)return;
      const mats=Array.isArray(o.material)?o.material:[o.material];
      for(const m of mats){
        if('envMapIntensity' in m)m.envMapIntensity=Math.max(.55,m.envMapIntensity||0);
      }
    });

    g.userData.screen=centerScreen;g.userData.cluster=cluster;
  }

  W.cars.forEach((v,i)=>upgradeTraffic(v,i));
  upgradePlayer(PC.car);

  let known=W.cars.length;
  const rescan=setInterval(()=>{
    if(W.cars.length!==known){
      W.cars.forEach((v,i)=>upgradeTraffic(v,i));known=W.cars.length
    }
  },1800);

  W.registerTick?.((dt)=>{
    const h=(window.LuxLife?.state?.hour??12)+(window.LuxLife?.state?.minute??0)/60;
    const rain=(window.LuxWeather560||window.LuxWeather470)?.state==='rain';
    const night=h>=19||h<7;
    for(const l of premiumLights){
      const target=l.type==='tail'?(night?.62:.22):(l.type==='head'?(night||rain?1.35:.30):(night||rain?.95:.42));
      l.m.emissiveIntensity+=(target-l.m.emissiveIntensity)*Math.min(1,dt*6);
    }
    const pg=PC.car.getObjectByName('PlayerCarPremium960');
    if(pg){
      const s=pg.userData.screen,c=pg.userData.cluster,on=PC.driving;
      if(s)s.material.emissiveIntensity+=( (on?.72:.08)-s.material.emissiveIntensity)*Math.min(1,dt*5);
      if(c)c.material.emissiveIntensity+=( (on?.58:.06)-c.material.emissiveIntensity)*Math.min(1,dt*5);
    }
  });

  window.LuxVehiclePremium960=window.LuxVehiclePremium980={version:'9.8.0',player:PC.car,traffic:W.cars,designFamilies};
}
