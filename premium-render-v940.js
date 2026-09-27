import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

let q=setInterval(()=>{if(!window.LuxWorld?.scene||!window.LuxWorld?.player)return;clearInterval(q);init(window.LuxWorld)},220);

function init(W){
  const S=W.scene,R=W.renderer,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
  const old=S.getObjectByName('LuxPremium940');if(old)S.remove(old);
  const root=new T.Group();root.name='LuxPremium940';S.add(root);

  R.toneMapping=T.ACESFilmicToneMapping;
  R.toneMappingExposure=mobile?1.02:1.07;
  R.setPixelRatio(Math.min(devicePixelRatio||1,mobile?1.42:2.0));
  if(R.shadowMap){R.shadowMap.enabled=true;R.shadowMap.type=T.PCFSoftShadowMap}
  if(W.sun){
    W.sun.shadow.mapSize.set(mobile?1024:3072,mobile?1024:3072);
    W.sun.shadow.bias=-.00016;W.sun.shadow.normalBias=.014;
    W.sun.shadow.camera.left=-250;W.sun.shadow.camera.right=250;W.sun.shadow.camera.top=250;W.sun.shadow.camera.bottom=-250;
    W.sun.shadow.camera.updateProjectionMatrix();
  }

  let seed=940271;
  const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
  const M=(c,r=.72,m=.02,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
  const A=(g,m,x,y,z,p=root)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;p.add(o);return o};

  // Lightweight environment reflection for glass and vehicle paint.
  function face(top,bottom){
    const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),g=x.createLinearGradient(0,0,0,128);
    g.addColorStop(0,top);g.addColorStop(1,bottom);x.fillStyle=g;x.fillRect(0,0,128,128);return c;
  }
  const env=new T.CubeTexture([
    face('#9dc3da','#738a77'),face('#a7c9dc','#758a75'),face('#76a9cf','#d6e2e6'),
    face('#6c7866','#586550'),face('#9fc4db','#758a78'),face('#a8cadc','#748b78')
  ]);env.colorSpace=T.SRGBColorSpace;env.needsUpdate=true;S.environment=env;

  const glassTargets=[];
  S.traverse(o=>{
    if(!o.isMesh||!o.material)return;
    const mats=Array.isArray(o.material)?o.material:[o.material];
    for(const m of mats){
      if(!m||!m.isMaterial)continue;
      if('envMapIntensity' in m)m.envMapIntensity=Math.max(m.envMapIntensity||0,.48);
      if(m.transparent&&m.opacity<.9)glassTargets.push(m);
    }
  });

  // Contact shadows: cheap but strong grounding improvement.
  const shCanvas=document.createElement('canvas');shCanvas.width=shCanvas.height=128;
  const sx=shCanvas.getContext('2d'),grad=sx.createRadialGradient(64,64,6,64,64,60);
  grad.addColorStop(0,'rgba(0,0,0,.42)');grad.addColorStop(.45,'rgba(0,0,0,.18)');grad.addColorStop(1,'rgba(0,0,0,0)');
  sx.fillStyle=grad;sx.fillRect(0,0,128,128);
  const shTex=new T.CanvasTexture(shCanvas),shMat=new T.MeshBasicMaterial({map:shTex,transparent:true,depthWrite:false,opacity:.62});
  function contactShadow(target,w,l,y=.018){
    const p=new T.Mesh(new T.PlaneGeometry(w,l),shMat.clone());p.rotation.x=-Math.PI/2;p.position.y=y;p.renderOrder=1;root.add(p);
    return()=>{if(!target?.position)return;p.position.x=target.position.x;p.position.z=target.position.z;p.rotation.z=-(target.rotation?.y||0)}
  }
  const shadowTicks=[contactShadow(W.player,1.25,.82,.022)];
  for(const c of (W.cars||[]).slice(0,mobile?14:28))shadowTicks.push(contactShadow(c,(c.userData?.halfW||1.05)*2.05,(c.userData?.halfL||2.2)*1.88,.021));

  // Richer façades on existing houses without touching collision or doors.
  const stone=M(0xb8b1a5,.9),metal=M(0x3d464b,.36,.38),wood=M(0x70503b,.78),green=M(0x426c3d,.97),terracotta=M(0x8a5b47,.88);
  const warm=M(0xffe2b0,.34,.02,0xffb95c,.16),details=[];
  function facade(site,i){
    const {x,z,w,d,h,rot=0}=site,g=new T.Group();g.position.set(x,0,z);g.rotation.y=rot;root.add(g);details.push(g);
    const front=d/2+.29;
    // foundation blocks
    for(let xx=-w/2+.55;xx<w/2;xx+=1.1)A(new T.BoxGeometry(.9,.28,.18),stone,xx,.18,front,g).castShadow=false;
    // lintels and window planters
    const rows=h>8?[2.15,4.45,6.7]:[2.15,4.45];
    for(const yy of rows)for(const xx of[-w*.29,w*.29]){
      A(new T.BoxGeometry(2.0,.13,.30),stone,xx,yy+.78,front+.03,g);
      if((i+Math.round(yy))%2===0){
        A(new T.BoxGeometry(1.65,.18,.36),terracotta,xx,yy-.82,front+.22,g);
        for(let k=-2;k<=2;k++)A(new T.SphereGeometry(.11,7,5),green,xx+k*.28,yy-.62,front+.25,g);
      }
    }
    // shutters on selected houses
    if(i%3===1)for(const yy of rows)for(const xx of[-w*.29,w*.29]){
      for(const s of[-1,1]){const sh=A(new T.BoxGeometry(.38,1.28,.10),wood,xx+s*1.06,yy,front+.18,g);sh.rotation.y=s*.08}
    }
    // porch canopy, mailbox, wall lamp and downpipe
    const canopy=A(new T.BoxGeometry(2.5,.13,1.12),metal,0,2.82,front+.62,g);canopy.rotation.x=-.05;
    A(new T.BoxGeometry(.42,.55,.24),M(0x2e485d,.5,.24),w*.31,1.12,front+.34,g);
    A(new T.CylinderGeometry(.045,.055,h-.4,8),metal,-w*.46,(h-.4)/2,front+.16,g);
    A(new T.BoxGeometry(.16,.32,.16),warm,.76,2.22,front+.26,g);
    // garden fence/posts
    if(i%2===0){
      for(let xx=-w*.46;xx<=w*.46;xx+=1.35)A(new T.BoxGeometry(.10,.78,.10),wood,xx,.39,front+2.45,g);
      A(new T.BoxGeometry(w*.92,.08,.08),wood,0,.68,front+2.45,g);
    }
  }
  (W.houseSites||[]).forEach(facade);

  // New denser district blocks: varied footprints, balconies, shops and roof details.
  const walls=[0xd9c7b6,0xc8d3cb,0xd8d4c9,0xc3ced8,0xddc4b2,0xcfcbc0];
  const roofs=[0x4b4d4f,0x68473a,0x74503f],windowM=new T.MeshPhysicalMaterial({color:0x7fa8b8,roughness:.10,metalness:.06,transmission:mobile?0:.08,transparent:true,opacity:.78});
  function block(x,z,rot,i){
    const g=new T.Group();g.position.set(x,0,z);g.rotation.y=rot;root.add(g);
    const w=15+(i%3)*2.6,d=10+(i%2)*2.4,h=9+(i%4)*1.9;
    A(new T.BoxGeometry(w,h,d),M(walls[i%walls.length],.84),0,h/2,0,g);
    A(new T.BoxGeometry(w+.38,.42,d+.38),M(0x87847e,.9),0,.21,0,g);
    const front=d/2+.10;
    for(let y=2.0;y<h-.8;y+=2.25)for(let xx=-w*.36;xx<=w*.36;xx+=2.5){
      A(new T.BoxGeometry(1.55,1.25,.10),M(0xe9e5dc,.76),xx,y,front,g);
      A(new T.BoxGeometry(1.34,1.05,.12),windowM,xx,y,front+.08,g);
      A(new T.BoxGeometry(.045,1.05,.15),metal,xx,y,front+.16,g);
      A(new T.BoxGeometry(1.34,.045,.15),metal,xx,y,front+.16,g);
      if(i%2===0&&y>2.5){
        A(new T.BoxGeometry(1.95,.14,.78),stone,xx,y-.85,front+.42,g);
        for(const q of[-.75,-.25,.25,.75])A(new T.BoxGeometry(.035,.56,.035),metal,xx+q,y-.54,front+.77,g);
      }
    }
    // storefront on some blocks
    if(i%3===0){
      A(new T.BoxGeometry(w*.62,2.25,.16),M(0x252d31,.32,.22),0,1.28,front+.06,g);
      for(let xx=-w*.24;xx<=w*.24;xx+=2.4)A(new T.BoxGeometry(1.85,1.65,.11),windowM,xx,1.35,front+.18,g);
      A(new T.BoxGeometry(w*.68,.18,1.05),M([0x694c3d,0x3d5f58,0x4e5c6f][i%3],.58,.10),0,2.72,front+.55,g);
    } else {
      A(new T.BoxGeometry(1.8,2.7,.16),wood,0,1.35,front+.17,g);
    }
    // roof parapet, solar panels, vents
    A(new T.BoxGeometry(w+.35,.45,.32),M(roofs[i%roofs.length],.82),0,h+.22,-d/2+.12,g);
    A(new T.BoxGeometry(w+.35,.45,.32),M(roofs[i%roofs.length],.82),0,h+.22,d/2-.12,g);
    if(i%2===1)for(const xx of[-w*.22,w*.22]){const p=A(new T.BoxGeometry(2.4,.09,1.3),M(0x23394c,.18,.58),xx,h+.46,0,g);p.rotation.x=-.18}
    for(const xx of[-w*.30,0,w*.30])A(new T.CylinderGeometry(.16,.19,.82,10),metal,xx,h+.42,-d*.18,g);
    if(W.obstacles)W.obstacles.push({x,z,r:Math.max(w,d)*.52});
  }
  const blocks=[
    [-392,-220,Math.PI/2],[-392,-120,Math.PI/2],[-392,-20,Math.PI/2],[-392,80,Math.PI/2],[-392,180,Math.PI/2],
    [392,-220,-Math.PI/2],[392,-120,-Math.PI/2],[392,-20,-Math.PI/2],[392,80,-Math.PI/2],[392,180,-Math.PI/2],
    [-190,-392,0],[-80,-392,0],[30,-392,0],[140,-392,0],[250,-392,0],
    [-190,392,Math.PI],[-80,392,Math.PI],[30,392,Math.PI],[140,392,Math.PI],[250,392,Math.PI]
  ];
  blocks.slice(0,mobile?12:20).forEach((b,i)=>block(b[0],b[1],b[2],i));

  // Grass clusters and rocks at the town edge using instancing.
  const grassGeo=new T.ConeGeometry(.05,.55,5),grassMat=M(0x4e783f,.98),grassCount=mobile?240:560,grassInst=new T.InstancedMesh(grassGeo,grassMat,grassCount),dummy=new T.Object3D();
  for(let i=0;i<grassCount;i++){
    let x=(rnd()-.5)*900,z=(rnd()-.5)*900;
    if(Math.abs(x)<330&&Math.abs(z)<330){i--;continue}
    dummy.position.set(x,.27,z);dummy.rotation.y=rnd()*Math.PI;const s=.55+rnd()*1.15;dummy.scale.set(s,s,s);dummy.updateMatrix();grassInst.setMatrixAt(i,dummy.matrix)
  }grassInst.castShadow=false;grassInst.receiveShadow=false;root.add(grassInst);

  const rockGeo=new T.DodecahedronGeometry(.65,0),rockMat=M(0x777a70,.96),rockCount=mobile?45:90,rocks=new T.InstancedMesh(rockGeo,rockMat,rockCount);
  for(let i=0;i<rockCount;i++){const a=rnd()*Math.PI*2,r=360+rnd()*120;dummy.position.set(Math.sin(a)*r,.28,Math.cos(a)*r);dummy.rotation.set(rnd(),rnd()*Math.PI,rnd()*.5);const s=.35+rnd()*.85;dummy.scale.set(s,.55*s,s);dummy.updateMatrix();rocks.setMatrixAt(i,dummy.matrix)}
  rocks.castShadow=true;rocks.receiveShadow=true;root.add(rocks);

  // Dynamic look: slight wet-road/reflection response and stronger dusk.
  W.registerTick?.((dt)=>{
    for(const fn of shadowTicks)fn();
    const weather=(window.LuxWeather560||window.LuxWeather470)?.state,h=(window.LuxLife?.state?.hour??12)+(window.LuxLife?.state?.minute??0)/60;
    const rain=weather==='rain',night=h>=20||h<6,dusk=(h>=18&&h<20)||(h>=5.5&&h<7.5);
    for(const m of glassTargets)if('envMapIntensity' in m)m.envMapIntensity+=( (night?.75:.52)-m.envMapIntensity)*Math.min(1,dt);
    if(W.sun){const target=night?.10:dusk?1.35:2.20;W.sun.intensity+=(target-W.sun.intensity)*Math.min(1,dt*.55)}
    const roadMeshes=[...(W.roads||[]).map(x=>x.mesh).filter(Boolean)];
    for(const m of roadMeshes.map(o=>o.material).filter(Boolean)){m.roughness+=( (rain?.48:.88)-m.roughness)*Math.min(1,dt*.7);if('envMapIntensity' in m)m.envMapIntensity=rain?.58:.22}
  });

  window.LuxPremium940={root,version:'9.4.0',blocks:blocks.length,facades:details.length};
}
