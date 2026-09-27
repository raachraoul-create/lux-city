import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

let wait=setInterval(()=>{if(!window.LuxWorld?.scene||!window.LuxCityServices?.buildings)return;clearInterval(wait);init(window.LuxWorld)},180);

function init(W){
  const S=W.scene,F=window.LuxCityServices.buildings.find(x=>x.id==='fire')||{x:210,z:92,w:25,l:34,h:10},mobile=matchMedia('(pointer:coarse)').matches;
  const old=S.getObjectByName('LuxFirePremium950');if(old)S.remove(old);
  const root=new T.Group();root.name='LuxFirePremium950';S.add(root);

  let seed=950112;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
  const M=(c,r=.7,m=.03,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
  const A=(g,m,x,y,z,p=root)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;p.add(o);return o};

  function asphaltTexture(){
    const c=document.createElement('canvas');c.width=c.height=384;const x=c.getContext('2d');x.fillStyle='#34383b';x.fillRect(0,0,384,384);
    for(let i=0;i<12500;i++){const v=35+Math.floor(rnd()*48),a=.03+rnd()*.08,s=.45+rnd()*1.8;x.fillStyle=`rgba(${v},${v},${v},${a})`;x.fillRect(rnd()*384,rnd()*384,s,s)}
    x.strokeStyle='rgba(20,22,23,.24)';x.lineWidth=.8;for(let k=0;k<24;k++){x.beginPath();let px=rnd()*384,py=rnd()*384;x.moveTo(px,py);for(let j=0;j<5;j++){px+=(rnd()-.5)*28;py+=8+rnd()*20;x.lineTo(px,py)}x.stroke()}
    const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(2,8);t.colorSpace=T.SRGBColorSpace;t.anisotropy=Math.min(8,W.renderer?.capabilities?.getMaxAnisotropy?.()||1);return t
  }

  const asphalt=new T.MeshStandardMaterial({map:asphaltTexture(),color:0xffffff,roughness:.88,metalness:.015});
  const concrete=M(0xa4a39e,.92),curb=M(0xd0ccc2,.9),white=M(0xf0ede4,.72),yellow=M(0xe8c94f,.68),red=M(0xb51f2e,.45,.18),deep=M(0x741923,.48,.20),dark=M(0x1f2529,.34,.44),metal=M(0x60686c,.30,.58),glass=new T.MeshPhysicalMaterial({color:0x6f9bae,roughness:.08,metalness:.08,transparent:true,opacity:.74}),blue=M(0x197ae8,.18,.12,0x1786ff,2.2),warm=M(0xffe5b5,.28,.06,0xffc76a,1.2);

  // Rebuild the fire-station forecourt as a clean, connected emergency-vehicle route.
  const apron=A(new T.BoxGeometry(27,.11,14.5),concrete,F.x,.06,F.z+23.2);apron.userData.firePremiumApron=true;
  for(const xx of[F.x-12.7,F.x+12.7])A(new T.BoxGeometry(.18,.045,14),white,xx,.135,F.z+23.2);
  for(const xx of[F.x-8.3,F.x-2.8,F.x+2.8,F.x+8.3])A(new T.BoxGeometry(.10,.03,11.6),yellow,xx,.143,F.z+23.0);

  function strip(ax,az,bx,bz,width,mat,y=.065){
    const dx=bx-ax,dz=bz-az,len=Math.hypot(dx,dz),o=A(new T.BoxGeometry(width,.11,len),mat,(ax+bx)/2,y,(az+bz)/2);
    o.rotation.y=Math.atan2(dx,dz);o.receiveShadow=true;return {o,dx,dz,len,ang:o.rotation.y}
  }
  const path=[[210,121],[202,124.5],[194,128],[186.5,132],[180,135]];
  const roadSegs=[];
  for(let i=0;i<path.length-1;i++){
    const [ax,az]=path[i],[bx,bz]=path[i+1],s=strip(ax,az,bx,bz,10.8,asphalt,.065);roadSegs.push(s.o);
    const px=-s.dz/s.len,pz=s.dx/s.len;
    for(const side of[-1,1]){
      strip(ax+px*5.52*side,az+pz*5.52*side,bx+px*5.52*side,bz+pz*5.52*side,.22,curb,.14);
      strip(ax+px*6.45*side,az+pz*6.45*side,bx+px*6.45*side,bz+pz*6.45*side,1.55,concrete,.08);
    }
    for(let t=.15;t<.95;t+=.28){
      const cx=ax+(bx-ax)*t,cz=az+(bz-az)*t;
      const dash=A(new T.BoxGeometry(.11,.025,2.4),white,cx,.132,cz);dash.rotation.y=s.ang;
    }
  }

  // Proper junction flare to the public east-west road at z=135.
  const junction=A(new T.BoxGeometry(15.8,.105,12.2),asphalt,179.4,.062,134.9);junction.rotation.y=-.18;
  for(const z of[132.0,138.0]){const l=A(new T.BoxGeometry(12.5,.025,.15),white,179.4,.134,z);l.rotation.y=-.18}
  for(let i=-4;i<=4;i++){const zebra=A(new T.BoxGeometry(.55,.027,5.4),white,174.8+i*.78,.138,137.1);zebra.rotation.y=Math.PI/2}

  // Keep-clear hatching and bay numbering.
  for(let i=0;i<7;i++){const h=A(new T.BoxGeometry(.12,.025,8.4),yellow,F.x-9+i*3,.14,F.z+25.0);h.rotation.y=i%2?.15:-.15}
  function roadText(text){
    const c=document.createElement('canvas');c.width=1024;c.height=240;const x=c.getContext('2d');x.clearRect(0,0,1024,240);x.fillStyle='#f3efe5';x.font='900 82px Arial';x.textAlign='center';x.textBaseline='middle';x.fillText(text,512,120);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t
  }
  const txt=A(new T.PlaneGeometry(15.5,3.1),new T.MeshBasicMaterial({map:roadText('112 · AUSFAHRT'),transparent:true,side:T.DoubleSide}),F.x,.145,F.z+26.2);txt.rotation.x=-Math.PI/2;

  // Better street furniture around the station.
  for(const [x,z] of[[197.6,119.8],[222.4,119.8],[192.0,129.0],[184.0,133.5]]){
    A(new T.CylinderGeometry(.075,.11,4.7,9),dark,x,2.35,z);
    A(new T.BoxGeometry(.58,.17,.29),warm,x,4.66,z);
  }
  for(const [x,z] of[[198.2,111.8],[221.8,111.8]]){A(new T.CylinderGeometry(.11,.14,.88,10),yellow,x,.44,z);A(new T.BoxGeometry(.19,.08,.19),white,x,.75,z)}
  A(new T.BoxGeometry(3.0,.20,1.05),deep,F.x+9.2,3.15,F.z+18.1);

  function addLabel(parent,text,x,y,z,w=2.8,h=.55){
    const c=document.createElement('canvas');c.width=512;c.height=128;const q=c.getContext('2d');q.fillStyle='#f7f4ec';q.fillRect(0,0,512,128);q.fillStyle='#b51f2e';q.font='900 66px Arial';q.textAlign='center';q.textBaseline='middle';q.fillText(text,256,64);
    const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;const m=A(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:t,side:T.DoubleSide}),x,y,z,parent);return m
  }

  function fireEngineVisual(parent){
    if(parent.userData.firePremium950)return;parent.userData.firePremium950=true;
    const g=new T.Group();g.name='FireEnginePremium950';parent.add(g);
    // cab
    A(new T.BoxGeometry(2.28,1.42,2.35),red,0,1.15,-1.52,g);
    A(new T.BoxGeometry(2.08,.70,.08),glass,0,1.72,-2.72,g);
    A(new T.BoxGeometry(.08,.68,1.26),glass,-1.15,1.70,-1.62,g);A(new T.BoxGeometry(.08,.68,1.26),glass,1.15,1.70,-1.62,g);
    A(new T.BoxGeometry(2.34,.30,2.40),white,0,2.02,-1.52,g);
    // rear equipment body
    A(new T.BoxGeometry(2.42,1.68,3.15),red,0,1.32,1.25,g);
    for(const sx of[-1,1])for(const zz of[-.10,.98,2.0]){
      A(new T.BoxGeometry(.06,1.10,.82),metal,sx*1.23,1.42,zz,g);
      for(let y=1.02;y<1.92;y+=.18)A(new T.BoxGeometry(.08,.035,.72),white,sx*1.255,y,zz,g);
    }
    // reflective stripe
    for(const sx of[-1,1])A(new T.BoxGeometry(.055,.18,4.65),yellow,sx*1.25,.88,.32,g);
    A(new T.BoxGeometry(2.20,.18,.08),yellow,0,.86,2.86,g);
    // bumpers / grille / plates
    A(new T.BoxGeometry(2.25,.25,.18),dark,0,.48,-2.86,g);A(new T.BoxGeometry(2.30,.24,.18),dark,0,.46,2.93,g);
    A(new T.BoxGeometry(1.25,.30,.10),metal,0,.76,-2.91,g);
    for(let xx=-.48;xx<=.48;xx+=.24)A(new T.BoxGeometry(.035,.25,.08),dark,xx,.76,-2.97,g);
    // ladder and hose equipment
    const ladder=new T.Group();ladder.position.set(0,2.35,.45);g.add(ladder);
    for(const sx of[-.68,.68])A(new T.BoxGeometry(.09,.09,3.80),metal,sx,0,0,ladder);
    for(let z=-1.65;z<=1.65;z+=.42)A(new T.BoxGeometry(1.42,.055,.055),metal,0,.02,z,ladder);
    for(const sx of[-1,1]){const reel=A(new T.TorusGeometry(.34,.08,10,24),dark,sx*1.26,1.42,1.88,g);reel.rotation.y=Math.PI/2}
    // mirrors
    for(const sx of[-1,1]){A(new T.BoxGeometry(.16,.16,.34),dark,sx*1.35,1.66,-2.15,g);A(new T.BoxGeometry(.11,.10,.28),glass,sx*1.43,1.66,-2.15,g)}
    // blue light bar and scene lights
    A(new T.BoxGeometry(1.55,.16,.30),blue,0,2.33,-1.46,g);
    for(const x of[-.78,.78])A(new T.BoxGeometry(.30,.18,.12),blue,x,2.23,1.62,g);
    for(const x of[-.72,.72])A(new T.BoxGeometry(.42,.17,.09),warm,x,1.38,-2.88,g);
    addLabel(g,'112',0,1.25,2.96,1.15,.44);
    addLabel(g,'FEUERWEHR',0,1.55,-2.91,1.75,.36);
    parent.userData.halfW=Math.max(parent.userData.halfW||0,1.35);parent.userData.halfL=Math.max(parent.userData.halfL||0,2.95);parent.userData.r=Math.max(parent.userData.r||0,3.2);
    return g
  }

  function fallbackEngine(){
    const p=new T.Group();p.name='LuxFireFallback950';p.position.set(F.x,0,114.4);p.rotation.y=Math.PI;S.add(p);fireEngineVisual(p);return p
  }

  let fallback=null,applied=null,tries=0;
  const fleetWait=setInterval(()=>{
    tries++;
    const v=window.LuxEmergency501?.fleet?.Feuerwehr?.v||window.LuxEmergency500?.fleet?.Feuerwehr?.v;
    if(v){
      if(fallback){S.remove(fallback);fallback=null}
      if(applied!==v){fireEngineVisual(v);applied=v}
      if(tries>80)clearInterval(fleetWait);
    }else if(tries===24&&!fallback){
      fallback=fallbackEngine();
    }
    if(tries>100)clearInterval(fleetWait);
  },250);

  // Second immediate quality pass: station façade, training yard and road details.
  const stationFront=F.z+F.l/2+.58;
  const facadeRed=M(0xa91827,.42,.16),facadeDark=M(0x262d32,.38,.30),facadeLight=M(0xe8e4dc,.82),doorGlass=new T.MeshPhysicalMaterial({color:0x7199a9,roughness:.10,metalness:.10,transparent:true,opacity:.62});
  // Stronger three-bay façade with visible depth instead of a flat box.
  const bayXs=[F.x-7.35,F.x,F.x+7.35];
  for(let i=0;i<bayXs.length;i++){
    const bx=bayXs[i];
    A(new T.BoxGeometry(6.35,6.15,.42),facadeRed,bx,3.08,stationFront);
    A(new T.BoxGeometry(5.72,5.42,.24),facadeDark,bx,2.73,stationFront+.23);
    for(let y=.48;y<5.20;y+=.58)A(new T.BoxGeometry(5.45,.055,.07),metal,bx,y,stationFront+.38);
    for(let k=-2;k<=2;k++)A(new T.BoxGeometry(.87,.60,.055),doorGlass,bx+k*1.04,4.25,stationFront+.42);
    A(new T.BoxGeometry(5.86,.16,.52),facadeLight,bx,5.72,stationFront+.12);
    addLabel(root,String(i+1),bx,5.72,stationFront+.43,.48,.48);
  }
  // Upper station band and clear identity sign.
  A(new T.BoxGeometry(24.7,1.52,.34),facadeDark,F.x,7.65,stationFront+.02);
  A(new T.BoxGeometry(24.9,.22,.48),facadeRed,F.x,8.43,stationFront+.04);
  addLabel(root,'FEUERWEHR LUX CITY',F.x,7.72,stationFront+.22,10.2,.92);
  addLabel(root,'112',F.x+9.7,7.72,stationFront+.24,1.45,.82);

  // Side personnel entrance with canopy and glass.
  A(new T.BoxGeometry(2.35,3.15,.20),facadeRed,F.x+10.1,1.58,stationFront+.26);
  A(new T.BoxGeometry(1.80,2.55,.08),doorGlass,F.x+10.1,1.60,stationFront+.39);
  A(new T.BoxGeometry(4.5,.18,1.45),facadeDark,F.x+9.0,3.40,stationFront+.82);
  A(new T.BoxGeometry(.12,2.9,.12),metal,F.x+7.15,1.45,stationFront+1.44);
  A(new T.BoxGeometry(.12,2.9,.12),metal,F.x+10.85,1.45,stationFront+1.44);

  // Training / hose-drying tower gives the fire station a recognizable silhouette.
  const tower=new T.Group();tower.position.set(F.x+15.6,0,F.z-4.0);root.add(tower);
  A(new T.BoxGeometry(4.0,11.8,4.0),M(0x878982,.86),0,5.9,0,tower);
  A(new T.BoxGeometry(4.35,.40,4.35),facadeDark,0,11.85,0,tower);
  for(const y of[2.3,5.3,8.3])for(const x of[-1.0,1.0])A(new T.BoxGeometry(.82,1.45,.10),doorGlass,x,y,2.06,tower);
  A(new T.CylinderGeometry(.07,.09,3.0,8),metal,0,13.45,0,tower);
  A(new T.SphereGeometry(.15,9,7),blue,0,15.02,0,tower);
  addLabel(tower,'112',0,9.95,2.08,1.55,.65);

  // Drainage, directional arrows and edge markers make the forecourt read as a real road.
  const drainMat=M(0x3d4448,.46,.48);
  for(let z=119.0;z<=132.0;z+=3.2){
    const dr=A(new T.BoxGeometry(.48,.025,.18),drainMat,204.7,.142,z);dr.rotation.y=-.42;
    const dr2=A(new T.BoxGeometry(.48,.025,.18),drainMat,215.3,.142,z);dr2.rotation.y=-.42;
  }
  function arrow(x,z,rot=0){
    const g=new T.Group();g.position.set(x,.151,z);g.rotation.y=rot;root.add(g);
    A(new T.BoxGeometry(.28,.025,2.6),white,0,0,0,g);
    const l=A(new T.BoxGeometry(.24,.025,1.20),white,-.38,0,-1.05,g);l.rotation.y=-.62;
    const r=A(new T.BoxGeometry(.24,.025,1.20),white,.38,0,-1.05,g);r.rotation.y=.62;
  }
  arrow(202.5,124.6,-.43);arrow(190.0,130.2,-.43);

  // Small service yard: hose rack, equipment cages and safety cones.
  const yard=new T.Group();yard.position.set(F.x-15.8,0,F.z+3.0);root.add(yard);
  const fence=M(0x555e62,.42,.42);
  for(const x of[-3.5,3.5])A(new T.BoxGeometry(.10,1.8,.10),fence,x,.9,0,yard);
  A(new T.BoxGeometry(7.0,.08,.08),fence,0,1.62,0,yard);
  for(let x=-3.2;x<=3.2;x+=.55)A(new T.BoxGeometry(.035,1.55,.035),fence,x,.80,0,yard);
  for(const x of[-2.2,0,2.2]){
    A(new T.CylinderGeometry(.12,.16,.75,10),metal,x,.38,1.0,yard);
    const hose=A(new T.TorusGeometry(.42,.09,10,24),deep,x,1.05,1.0,yard);hose.rotation.y=Math.PI/2;
  }
  for(const x of[-2.8,-1.9,1.9,2.8]){
    const cone=A(new T.ConeGeometry(.20,.72,12),M(0xe56a2a,.56),x,.36,2.3,yard);
    A(new T.CylinderGeometry(.28,.28,.06,12),dark,x,.03,2.3,yard);
  }

  // One subtle static reserve support vehicle, while the main fire engine remains the active emergency fleet vehicle.
  const reserve=new T.Group();reserve.name='FireReserve950';reserve.position.set(F.x-7.1,0,114.2);reserve.rotation.y=Math.PI;root.add(reserve);
  A(new T.BoxGeometry(2.0,1.35,4.65),red,0,1.02,0,reserve);
  A(new T.BoxGeometry(1.78,.72,1.55),glass,0,1.72,-1.25,reserve);
  A(new T.BoxGeometry(2.04,.18,4.7),yellow,0,.76,0,reserve);
  for(const sx of[-1,1])for(const zz of[-1.45,1.45]){const w=A(new T.CylinderGeometry(.35,.35,.24,18),dark,sx*1.03,.39,zz,reserve);w.rotation.z=Math.PI/2}
  A(new T.BoxGeometry(1.25,.14,.24),blue,0,2.13,-.45,reserve);
  addLabel(reserve,'112',0,1.16,2.36,1.0,.40);

  // Night response: make station and engine readable without over-lighting mobile.
  const stationLights=[];
  if(!mobile)for(const [x,z] of[[F.x-9.5,F.z+17.8],[F.x,F.z+17.8],[F.x+9.5,F.z+17.8],[190,130]]){
    const l=new T.PointLight(0xffd28a,0,18,2);l.position.set(x,4.6,z);S.add(l);stationLights.push(l)
  }
  W.registerTick?.((dt)=>{
    const h=(window.LuxLife?.state?.hour??12)+(window.LuxLife?.state?.minute??0)/60,night=h>=20||h<6,dusk=(h>=18&&h<20)||(h>=5.5&&h<7.5),target=night?1.35:dusk?.55:0;
    for(const l of stationLights)l.intensity+=(target-l.intensity)*Math.min(1,dt*3);
    const wet=(window.LuxWeather560||window.LuxWeather470)?.state==='rain';asphalt.roughness+=( (wet?.48:.88)-asphalt.roughness)*Math.min(1,dt);
  });

  window.LuxFirePremium950={root,roadSegs,version:'9.5.1',get fireEngine(){return applied||fallback}};
}
