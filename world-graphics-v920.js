import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

let boot=setInterval(()=>{
  const W=window.LuxWorld;
  if(!W?.scene||!W?.renderer||!W?.THREE||!W?.ground)return;
  clearInterval(boot);
  init(W);
},120);

function init(W){
  const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
  const S=W.scene,R=W.renderer;
  const old=S.getObjectByName('LuxCityGraphics930');if(old)S.remove(old);
  const root=new T.Group();root.name='LuxCityGraphics930';S.add(root);

  R.outputColorSpace=T.SRGBColorSpace;
  R.toneMapping=T.ACESFilmicToneMapping;
  R.toneMappingExposure=mobile?1.04:1.10;
  R.setPixelRatio(Math.min(devicePixelRatio||1,mobile?1.35:1.85));
  if(R.shadowMap){R.shadowMap.enabled=true;R.shadowMap.type=T.PCFSoftShadowMap}
  S.background=new T.Color(0xa6c8df);
  S.fog=new T.FogExp2(0xa9c7d8,mobile?.00118:.00092);
  if(W.sun){
    W.sun.intensity=2.45;W.sun.shadow.bias=-.00022;W.sun.shadow.normalBias=.018;
    W.sun.shadow.mapSize.set(mobile?1024:2048,mobile?1024:2048);
    W.sun.shadow.camera.left=-470;W.sun.shadow.camera.right=470;W.sun.shadow.camera.top=470;W.sun.shadow.camera.bottom=-470;W.sun.shadow.camera.far=650;W.sun.shadow.camera.updateProjectionMatrix();
  }

  const maxAniso=Math.min(8,R.capabilities.getMaxAnisotropy?.()||1);
  let seed=932041;
  const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
  const hex=n=>'#'+Number(n).toString(16).padStart(6,'0');
  function tex(base,kind='noise',size=256){
    const c=document.createElement('canvas');c.width=c.height=size;const x=c.getContext('2d');
    x.fillStyle=hex(base);x.fillRect(0,0,size,size);
    if(kind==='asphalt'){
      for(let i=0;i<8500;i++){const v=42+Math.floor(rnd()*50),a=.025+rnd()*.07;x.fillStyle=`rgba(${v},${v},${v},${a})`;const s=.5+rnd()*1.8;x.fillRect(rnd()*size,rnd()*size,s,s)}
      x.strokeStyle='rgba(24,26,27,.22)';x.lineWidth=.7;
      for(let k=0;k<18;k++){x.beginPath();let px=rnd()*size,py=rnd()*size;x.moveTo(px,py);for(let j=0;j<4;j++){px+=(rnd()-.5)*25;py+=8+rnd()*22;x.lineTo(px,py)}x.stroke()}
      x.fillStyle='rgba(17,18,19,.05)';for(let k=0;k<10;k++)x.fillRect(rnd()*size,rnd()*size,15+rnd()*50,3+rnd()*8);
    }else if(kind==='plaster'){
      for(let i=0;i<6000;i++){const a=.02+rnd()*.055;x.fillStyle=rnd()>.5?`rgba(255,255,255,${a})`:`rgba(65,55,45,${a})`;const s=.4+rnd()*1.6;x.fillRect(rnd()*size,rnd()*size,s,s)}
      x.strokeStyle='rgba(80,70,62,.06)';x.lineWidth=.6;for(let y=18;y<size;y+=34){x.beginPath();x.moveTo(0,y+rnd()*3);x.lineTo(size,y+rnd()*3);x.stroke()}
    }else if(kind==='roof'){
      x.fillStyle=hex(base);x.fillRect(0,0,size,size);x.strokeStyle='rgba(25,20,18,.22)';x.lineWidth=1;
      for(let y=0;y<size;y+=18){for(let xx=(Math.floor(y/18)%2)*12-12;xx<size;xx+=24){x.strokeRect(xx,y,24,18);x.fillStyle='rgba(255,255,255,.025)';x.fillRect(xx+1,y+1,22,3)}}
    }else if(kind==='paver'){
      x.fillStyle=hex(base);x.fillRect(0,0,size,size);x.strokeStyle='rgba(75,72,68,.18)';x.lineWidth=1;
      for(let y=0;y<size;y+=22){x.beginPath();x.moveTo(0,y);x.lineTo(size,y);x.stroke();for(let xx=((y/22)%2)*17;xx<size;xx+=34){x.beginPath();x.moveTo(xx,y);x.lineTo(xx,y+22);x.stroke()}}
      for(let i=0;i<1800;i++){x.fillStyle=`rgba(255,255,255,${rnd()*.035})`;x.fillRect(rnd()*size,rnd()*size,1,1)}
    }else if(kind==='grass'){
      for(let i=0;i<11000;i++){const g=70+Math.floor(rnd()*85);x.fillStyle=`rgba(${35+Math.floor(rnd()*35)},${g},${30+Math.floor(rnd()*35)},${.05+rnd()*.15})`;x.fillRect(rnd()*size,rnd()*size,1,1+rnd()*2)}
    }
    const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.colorSpace=T.SRGBColorSpace;t.anisotropy=maxAniso;return t;
  }
  function cloneTex(base,rx=1,ry=1){const t=base.clone();t.needsUpdate=true;t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(rx,ry);t.anisotropy=maxAniso;return t}
  const asphaltTex=tex(0x34383b,'asphalt',384),paverTex=tex(0xa9a49b,'paver',256),grassTex=tex(0x6b8e55,'grass',320);
  const plaster=[0xe2d3c0,0xcbd8cd,0xd7c5b8,0xe4ddd0,0xc8d2dc,0xdec8b6].map(c=>tex(c,'plaster',256));
  const roofTex=[0x633f34,0x4a4d50,0x765044].map(c=>tex(c,'roof',256));
  W.ground.material.map=cloneTex(grassTex,85,85);W.ground.material.color.setHex(0xffffff);W.ground.material.roughness=.97;W.ground.material.needsUpdate=true;
  for(const rd of W.roads||[]){if(!rd?.mesh)continue;const gp=rd.mesh.geometry?.parameters||{},rx=Math.max(1,(gp.width||10)/8),ry=Math.max(1,(gp.depth||40)/8);rd.mesh.material.map=cloneTex(asphaltTex,rx,ry);rd.mesh.material.color.setHex(0xffffff);rd.mesh.material.roughness=.89;rd.mesh.material.metalness=.015;rd.mesh.material.needsUpdate=true}

  const mat=(color,rough=.72,metal=.02,extra={})=>new T.MeshStandardMaterial({color,roughness:rough,metalness:metal,...extra});
  const add=(geo,material,x,y,z,parent=root)=>{const m=new T.Mesh(geo,material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m};
  const glass=new T.MeshPhysicalMaterial({color:0x96bed0,roughness:.08,metalness:.04,transmission:mobile?0:.13,transparent:true,opacity:mobile?.82:.70,clearcoat:.35,clearcoatRoughness:.12});
  const trimM=mat(0xeee9df,.74),darkTrim=mat(0x4d4b48,.63,.08),metalM=mat(0x41494d,.38,.35),woodM=mat(0x73513c,.72),hedgeM=mat(0x416c3e,.96),soilM=mat(0x60513e,.98);
  const windowGlow=new T.MeshStandardMaterial({color:0xead7b0,roughness:.42,emissive:0xffbf62,emissiveIntensity:.035});
  const lampBulb=new T.MeshStandardMaterial({color:0xffe1a7,roughness:.28,emissive:0xffc35f,emissiveIntensity:.25});
  const nightLights=[];

  // High-detail re-skin for the original playable houses. Collision remains untouched.
  function reskinHouse(site,i){
    if(!site)return;const {x,z,w,d,h,rot=0,style=0}=site,g=new T.Group();g.position.set(x,0,z);g.rotation.y=rot;root.add(g);
    const wallMap=cloneTex(plaster[i%plaster.length],Math.max(1,w/4),Math.max(1,h/3));
    const wm=new T.MeshStandardMaterial({map:wallMap,color:0xffffff,roughness:.86,metalness:0});
    const front=d/2+.075,back=-d/2-.075;
    add(new T.BoxGeometry(w-.12,h-.35,.07),wm,0,h/2,front,g);add(new T.BoxGeometry(w-.12,h-.35,.07),wm,0,h/2,back,g);
    add(new T.BoxGeometry(.07,h-.35,d-.10),wm,w/2+.075,h/2,0,g);add(new T.BoxGeometry(.07,h-.35,d-.10),wm,-w/2-.075,h/2,0,g);
    add(new T.BoxGeometry(w+.28,.26,d+.28),mat(0x8d8983,.92),0,.18,0,g);
    // Corners, gutters and drain pipes.
    for(const sx of[-1,1]){add(new T.BoxGeometry(.20,h,.20),trimM,sx*(w/2+.08),h/2,front-.05,g);add(new T.CylinderGeometry(.035,.045,h-.5,7),metalM,sx*(w/2-.28),(h-.5)/2,front+.17,g)}
    add(new T.CylinderGeometry(.045,.045,w,8),metalM,0,h+.05,front+.12,g).rotation.z=Math.PI/2;
    // Better windows with frames, sill, inset glass and warm interior panel.
    const ys=h>8?[2.15,4.55,6.85]:[2.1,4.45];
    for(const yy of ys){for(const xx of[-w*.29,w*.29]){
      const ww=1.72,wh=1.33;add(new T.BoxGeometry(ww+.24,wh+.22,.08),trimM,xx,yy,front+.075,g);add(new T.BoxGeometry(ww,wh,.10),glass,xx,yy,front+.135,g);const glow=add(new T.BoxGeometry(ww-.20,wh-.20,.025),windowGlow,xx,yy,front+.195,g);glow.castShadow=false;nightLights.push(glow);add(new T.BoxGeometry(.055,wh,.14),darkTrim,xx,yy,front+.205,g);add(new T.BoxGeometry(ww,.055,.14),darkTrim,xx,yy,front+.205,g);add(new T.BoxGeometry(ww+.38,.10,.32),trimM,xx,yy-wh*.56,front+.19,g)
    }}
    // Realer front door assembly.
    add(new T.BoxGeometry(2.05,3.0,.12),trimM,0,1.5,front+.08,g);add(new T.BoxGeometry(1.72,2.72,.16),woodM,0,1.40,front+.17,g);add(new T.BoxGeometry(.48,.68,.025),glass,0,2.20,front+.27,g);add(new T.SphereGeometry(.055,10,8),metalM,.56,1.32,front+.30,g);
    add(new T.BoxGeometry(2.65,.14,1.05),mat(0xb1aba1,.92),0,.08,front+.58,g);
    // Balcony or garage detail depending on house.
    if(i%3===0&&h>6.8){add(new T.BoxGeometry(3.8,.18,1.18),mat(0xa6a39c,.83),0,3.65,front+.60,g);for(const xx of[-1.65,-1.1,-.55,0,.55,1.1,1.65])add(new T.BoxGeometry(.045,.82,.045),metalM,xx,4.05,front+1.13,g);add(new T.BoxGeometry(3.35,.055,.055),metalM,0,4.45,front+1.13,g)}
    if(i%5===1){add(new T.BoxGeometry(3.3,2.2,.12),mat(0x62686a,.66,.18),w*.26,1.15,front+.16,g);for(let yy=.45;yy<2.0;yy+=.42)add(new T.BoxGeometry(3.0,.045,.04),darkTrim,w*.26,yy,front+.24,g)}
    // Roof overlay with textured tiles, fascia and chimney cap.
    const rm=new T.MeshStandardMaterial({map:cloneTex(roofTex[i%roofTex.length],4,3),color:0xffffff,roughness:.89});
    if(style===2){add(new T.BoxGeometry(w+.62,.52,d+.62),rm,0,h+.25,0,g)}else{const rr=add(new T.ConeGeometry(Math.max(w,d)*.73,style===1?3.7:4.7,4),rm,0,h+(style===1?1.86:2.36),0,g);rr.rotation.y=Math.PI/4}
    add(new T.BoxGeometry(w+.65,.14,.22),darkTrim,0,h+.06,front+.02,g);
    if(i%3!==1){add(new T.BoxGeometry(.78,1.65,.82),mat(0x836858,.91),w*.27,h+.86,-d*.18,g);add(new T.BoxGeometry(.96,.14,1.02),darkTrim,w*.27,h+1.72,-d*.18,g)}
    // Garden / façade grounding.
    add(new T.BoxGeometry(w+2.8,.06,1.55),soilM,0,.035,-d/2-1.25,g).castShadow=false;
    for(const sx of[-1,1]){add(new T.SphereGeometry(.50,10,8),hedgeM,sx*(w*.36),.44,front+1.45,g).scale.set(1.4,.7,.7)}
    if(!mobile&&i%4===0){const l=new T.PointLight(0xffd28a,0,7,2);l.position.set(0,2.2,front+.65);g.add(l);nightLights.push(l);add(new T.BoxGeometry(.18,.30,.16),lampBulb,0,2.23,front+.32,g)}
  }
  (W.houseSites||[]).forEach((s,i)=>reskinHouse(s,i));

  // Premium road network outside the original centre.
  const roadMat=new T.MeshStandardMaterial({map:cloneTex(asphaltTex,2,12),color:0xffffff,roughness:.87,metalness:.018});
  const paveMat=new T.MeshStandardMaterial({map:cloneTex(paverTex,4,16),color:0xffffff,roughness:.93});
  const curbM=mat(0xc8c4bc,.90),markM=mat(0xeee9dc,.74),amberM=mat(0xe0ba55,.72);
  const premiumRoads=[];
  function street(x,z,w,l,rot=0,name=''){
    const g=new T.Group();g.position.set(x,0,z);g.rotation.y=rot;g.name=name;root.add(g);
    const asphalt=add(new T.BoxGeometry(w,.095,l),roadMat.clone(),0,.048,0,g);asphalt.castShadow=false;asphalt.material.map=cloneTex(asphaltTex,Math.max(1,w/7),Math.max(1,l/7));asphalt.material.needsUpdate=true;
    for(const sx of[-1,1]){const side=add(new T.BoxGeometry(2.15,.11,l),paveMat.clone(),sx*(w/2+1.12),.085,0,g);side.castShadow=false;side.material.map=cloneTex(paverTex,2.5,Math.max(1,l/6));side.material.needsUpdate=true;add(new T.BoxGeometry(.20,.24,l),curbM,sx*(w/2+.12),.13,0,g).castShadow=false}
    for(let zz=-l/2+8;zz<l/2-5;zz+=15){add(new T.BoxGeometry(.14,.026,6.2),markM,-w*.24,.112,zz,g).castShadow=false;add(new T.BoxGeometry(.14,.026,6.2),markM,w*.24,.112,zz,g).castShadow=false}
    if(w>=12)add(new T.BoxGeometry(.10,.026,l-4),amberM,0,.114,0,g).castShadow=false;
    premiumRoads.push({g,x,z,w,l,rot});
  }
  street(-330,0,13,720,0,'Westallee');street(330,0,13,720,0,'Ostallee');street(0,-330,13,720,Math.PI/2,'Suedring');street(0,330,13,720,Math.PI/2,'Nordring');
  street(-245,0,10,620,0,'Westviertel');street(245,0,10,620,0,'Ostviertel');street(0,-245,10,620,Math.PI/2,'Suedviertel');street(0,245,10,620,Math.PI/2,'Nordviertel');
  street(-330,245,10,170,Math.PI/2);street(330,-245,10,170,Math.PI/2);street(-330,-245,10,170,Math.PI/2);street(330,245,10,170,Math.PI/2);

  // More detailed new houses around the expanded roads.
  const newObstacles=[];
  function premiumHouse(x,z,face,i){
    const g=new T.Group();g.position.set(x,0,z);g.rotation.y=face;root.add(g);
    const w=11.4+(i%4)*1.35,d=9.2+(i%3)*1.25,h=6.8+(i%4)*.72,front=d/2+.08;
    const wm=new T.MeshStandardMaterial({map:cloneTex(plaster[i%plaster.length],3.2,2.6),color:0xffffff,roughness:.86});
    add(new T.BoxGeometry(w,h,d),wm,0,h/2,0,g);add(new T.BoxGeometry(w+.30,.36,d+.30),mat(0x8e8b84,.9),0,.18,0,g);
    const rm=new T.MeshStandardMaterial({map:cloneTex(roofTex[i%roofTex.length],4,3),color:0xffffff,roughness:.88});
    if(i%4===2){add(new T.BoxGeometry(w+.55,.48,d+.55),rm,0,h+.24,0,g)}else{const r=add(new T.ConeGeometry(Math.max(w,d)*.74,3.8+(i%2)*.65,4),rm,0,h+1.95,0,g);r.rotation.y=Math.PI/4}
    for(const sx of[-1,1])add(new T.BoxGeometry(.19,h,.19),trimM,sx*(w/2+.05),h/2,front-.05,g);
    const ys=h>8.2?[2.1,4.45,6.75]:[2.1,4.45];for(const yy of ys){for(const xx of[-w*.30,0,w*.30]){if(yy<2.5&&Math.abs(xx)<.3)continue;add(new T.BoxGeometry(1.55,1.24,.08),trimM,xx,yy,front+.07,g);add(new T.BoxGeometry(1.38,1.08,.10),glass,xx,yy,front+.135,g);const gl=add(new T.BoxGeometry(1.18,.88,.02),windowGlow,xx,yy,front+.205,g);gl.castShadow=false;nightLights.push(gl);add(new T.BoxGeometry(.045,1.10,.12),darkTrim,xx,yy,front+.205,g);add(new T.BoxGeometry(1.40,.045,.12),darkTrim,xx,yy,front+.205,g)}}
    add(new T.BoxGeometry(1.85,2.75,.15),woodM,0,1.38,front+.17,g);add(new T.BoxGeometry(2.6,.13,1.0),mat(0xb5afa5,.91),0,.07,front+.55,g);
    if(i%2===0){add(new T.BoxGeometry(3.7,.17,1.12),mat(0xa9a69e,.84),0,3.72,front+.56,g);for(let q=-1.55;q<=1.55;q+=.52)add(new T.BoxGeometry(.04,.78,.04),metalM,q,4.10,front+1.08,g);add(new T.BoxGeometry(3.25,.05,.05),metalM,0,4.48,front+1.08,g)}
    add(new T.BoxGeometry(w+3,.72,.66),hedgeM,0,.38,-d/2-1.85,g);for(const sx of[-1,1])add(new T.BoxGeometry(2.2,.62,.62),hedgeM,sx*(w*.34),.34,front+1.7,g);
    if(i%3===0){add(new T.BoxGeometry(3.5,2.15,.11),mat(0x5e6466,.63,.2),w*.26,1.10,front+.15,g);for(let y=.38;y<1.95;y+=.38)add(new T.BoxGeometry(3.16,.04,.035),darkTrim,w*.26,y,front+.23,g)}
    if(W.obstacles){const o={x,z,r:Math.max(w,d)*.58};W.obstacles.push(o);newObstacles.push(o)}
  }
  const spots=[];
  for(let z=-205,i=0;z<=205;z+=52,i++){spots.push([-222,z,-Math.PI/2,i],[-268,z,Math.PI/2,i+1],[222,z,Math.PI/2,i+2],[268,z,-Math.PI/2,i+3])}
  for(let x=-205,i=0;x<=205;x+=58,i++){spots.push([x,-222,0,i+30],[x,-268,Math.PI,i+31],[x,222,Math.PI,i+32],[x,268,0,i+33])}
  const limit=mobile?22:38;spots.slice(0,limit).forEach(a=>premiumHouse(...a));

  // Mountain ridges and layered hills instead of flat horizon.
  const hillM=[mat(0x637757,.98),mat(0x708161,.98),mat(0x5d7051,.98),mat(0x7b8869,.98)];
  const ridges=[[-485,-410,160,80],[-300,-500,145,72],[-70,-515,175,94],[180,-500,160,82],[410,-430,175,90],[505,-170,155,78],[510,150,175,95],[440,430,190,100],[170,520,175,84],[-90,525,185,94],[-360,470,195,102],[-515,165,165,88],[-510,-150,170,86]];
  ridges.forEach((a,i)=>{
    const [x,z,sx,sy]=a,g=new T.Group();g.position.set(x,0,z);root.add(g);
    const foothill=add(new T.SphereGeometry(1,mobile?10:18,mobile?7:12),hillM[(i+1)%hillM.length],0,sy*.13,0,g);
    foothill.scale.set(sx*.72,sy*.34,sx*.60);foothill.castShadow=false;
    for(let k=0;k<(mobile?2:3);k++){
      const rock=add(new T.DodecahedronGeometry(1,mobile?1:2),hillM[(i+k)%hillM.length],(k-1)*sx*.28,sy*.30+k*5,(k%2?1:-1)*sx*.14,g);
      rock.scale.set(sx*(.58-k*.06),sy*(.72+k*.06),sx*(.50-k*.04));rock.castShadow=false;
      if(!mobile&&k<2){
        const cap=add(new T.DodecahedronGeometry(1,1),mat(0x8b8d84,.94),rock.position.x,rock.position.y+sy*.24,rock.position.z,g);
        cap.scale.set(sx*.20,sy*.13,sx*.15);cap.castShadow=false;
      }
    }
  });

  // Vegetation, street furniture and grounded small details.
  const trunkM=mat(0x65482f,.95),leaf=[mat(0x3c693a,.98),mat(0x4a7740,.98),mat(0x335d35,.98)],binM=mat(0x3f4948,.70,.18),benchM=mat(0x76543b,.78),poleM=mat(0x343b3e,.42,.28);
  function tree(x,z,i,s=1){
    const g=new T.Group();g.position.set(x,0,z);root.add(g);
    add(new T.CylinderGeometry(.15*s,.27*s,2.65*s,9),trunkM,0,1.30*s,0,g);
    for(const a of[0,Math.PI*.66,Math.PI*1.33]){
      const r=add(new T.CylinderGeometry(.045*s,.095*s,.72*s,7),trunkM,Math.cos(a)*.16*s,.20*s,Math.sin(a)*.16*s,g);
      r.rotation.z=Math.cos(a)*1.16;r.rotation.x=Math.sin(a)*1.16;
    }
    if(!mobile){
      for(const [a,y,l] of[[.4,1.85,.82],[2.4,2.02,.72],[4.6,2.16,.68]]){
        const br=add(new T.CylinderGeometry(.045*s,.085*s,l*s,7),trunkM,Math.cos(a)*.20*s,y*s,Math.sin(a)*.20*s,g);
        br.rotation.z=Math.cos(a)*.88;br.rotation.x=Math.sin(a)*.88;
      }
    }
    const crowns=[[0,3.05,0,1.18,.86,1.04,i],[.58,3.16,.12,.86,.72,.86,i+1],[-.52,3.28,-.18,.82,.69,.80,i+2],[.08,3.62,-.08,.76,.73,.74,i+1]];
    for(const [cx,cy,cz,sx,sy,sz,mi] of crowns){
      const c=add(new T.IcosahedronGeometry(1*s,mobile?1:2),leaf[mi%3],cx*s,cy*s,cz*s,g);
      c.scale.set(sx,sy,sz);c.castShadow=!mobile;
    }
    const soil=add(new T.CylinderGeometry(.66*s,.72*s,.035,18),soilM,0,.025,0,g);soil.castShadow=false;
  }
  function streetLamp(x,z,rot,i){const g=new T.Group();g.position.set(x,0,z);g.rotation.y=rot;root.add(g);add(new T.CylinderGeometry(.065,.10,5.15,9),poleM,0,2.58,0,g);add(new T.BoxGeometry(1.15,.065,.065),poleM,.52,5.02,0,g);add(new T.BoxGeometry(.46,.15,.24),lampBulb,1.08,4.91,0,g);if(!mobile&&i%3===0){const l=new T.PointLight(0xffd28a,0,20,2.0);l.position.set(1.08,4.82,0);g.add(l);nightLights.push(l)}}
  function bench(x,z,rot=0){const g=new T.Group();g.position.set(x,0,z);g.rotation.y=rot;root.add(g);for(const zz of[-.38,.38])add(new T.BoxGeometry(2.0,.12,.22),benchM,0,.58,zz,g);add(new T.BoxGeometry(2.0,.12,.24),benchM,0,1.0,.45,g);for(const sx of[-.8,.8]){add(new T.BoxGeometry(.10,.62,.10),metalM,sx,.30,-.3,g);add(new T.BoxGeometry(.10,.72,.10),metalM,sx,.66,.42,g)}}
  function bin(x,z){add(new T.CylinderGeometry(.30,.34,.76,12),binM,x,.38,z);add(new T.CylinderGeometry(.36,.36,.08,12),darkTrim,x,.80,z)}
  let n=0;for(let z=-285;z<=285;z+=52){tree(-300,z,n++,.95);tree(300,z,n++,.95);if(n%2===0){streetLamp(-320,z,0,n);streetLamp(320,z,Math.PI,n)}}for(let x=-285;x<=285;x+=58){tree(x,-300,n++,.95);tree(x,300,n++,.95);if(n%2===0){streetLamp(x,-320,Math.PI/2,n);streetLamp(x,320,-Math.PI/2,n)}}
  for(const [x,z,r] of [[-205,-205,0],[205,-205,Math.PI],[205,205,Math.PI],[-205,205,0],[-95,225,Math.PI/2],[105,-225,-Math.PI/2]]){bench(x,z,r);bin(x+2.1,z+.4)}
  for(let z=-240;z<=240;z+=80){for(const x of[-236,236]){add(new T.CylinderGeometry(.10,.12,.72,10),mat(0xb7b3aa,.72),x,.36,z);const cap=add(new T.SphereGeometry(.14,9,7),mat(0xa83f33,.62,.08),x+.8,.36,z+1.3);cap.scale.y=.85}}

  const vergeM=mat(0x5b7f49,.98);
  for(const r of premiumRoads){
    const g=new T.Group();g.position.set(r.x,0,r.z);g.rotation.y=r.rot;root.add(g);
    for(const sx of[-1,1]){const strip=add(new T.BoxGeometry(.58,.025,r.l-.8),vergeM,sx*(r.w/2+2.45),.035,0,g);strip.castShadow=false}
  }

  // Crosswalks on the expanded grid.
  function crosswalk(x,z,rot=0){const g=new T.Group();g.position.set(x,.13,z);g.rotation.y=rot;root.add(g);for(let i=-4;i<=4;i++)add(new T.BoxGeometry(.42,.025,5.7),markM,i*.75,0,0,g).castShadow=false}
  for(const x of[-245,245])for(const z of[-245,245])crosswalk(x,z,0);

  // Procedural sky dome for more depth.
  const skyGeo=new T.SphereGeometry(900,mobile?18:28,mobile?12:18);
  const skyMat=new T.ShaderMaterial({side:T.BackSide,depthWrite:false,uniforms:{top:{value:new T.Color(0x5f9fd0)},horizon:{value:new T.Color(0xd9e6ec)},ground:{value:new T.Color(0xc3c9c7)}},vertexShader:`varying vec3 vP;void main(){vP=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,fragmentShader:`varying vec3 vP;uniform vec3 top;uniform vec3 horizon;uniform vec3 ground;void main(){float h=smoothstep(-0.05,.70,vP.y);vec3 c=mix(horizon,top,h);float g=smoothstep(-.32,-.05,vP.y);c=mix(ground,c,g);gl_FragColor=vec4(c,1.0);}`});
  const sky=new T.Mesh(skyGeo,skyMat);sky.frustumCulled=false;root.add(sky);
  const fill=new T.HemisphereLight(0xdcefff,0x445640,mobile?.15:.24);S.add(fill);

  W.registerTick?.((dt)=>{
    const h=(window.LuxLife?.state?.hour??12)+(window.LuxLife?.state?.minute??0)/60;
    const night=h>=20||h<6,dusk=(h>=18&&h<20)||(h>=5.5&&h<7.5),rain=(window.LuxWeather560||window.LuxWeather470)?.state==='rain';
    const lamp=night?1.55:dusk?.62:0;
    for(const l of nightLights){if(l?.isLight)l.intensity=lamp}
    windowGlow.emissiveIntensity=night?.70:dusk?.27:.025;lampBulb.emissiveIntensity=night?1.35:dusk?.65:.16;
    roadMat.roughness+=( (rain?.48:.87)-roadMat.roughness)*Math.min(1,dt*1.3);
    if(h>=20||h<5.5){skyMat.uniforms.top.value.setHex(0x101a2a);skyMat.uniforms.horizon.value.setHex(0x31465d);skyMat.uniforms.ground.value.setHex(0x18211f)}
    else if(h>=18||h<7.5){skyMat.uniforms.top.value.setHex(0x577fa2);skyMat.uniforms.horizon.value.setHex(0xe0a17e);skyMat.uniforms.ground.value.setHex(0x8a8476)}
    else{skyMat.uniforms.top.value.setHex(0x5f9fd0);skyMat.uniforms.horizon.value.setHex(0xd9e6ec);skyMat.uniforms.ground.value.setHex(0xc3c9c7)}
  });

  window.LuxGraphics920=window.LuxGraphics930=window.LuxGraphics940={root,roads:premiumRoads,newObstacles,version:'9.4.0'};
}
