import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

let boot=setInterval(()=>{
  const W=window.LuxWorld;
  if(!W?.scene||!W?.renderer||!W?.player||!W?.roads?.length)return;
  clearInterval(boot);
  init(W);
},180);

function init(W){
  const S=W.scene,R=W.renderer;
  const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
  const old=S.getObjectByName('LuxVisual970');if(old)S.remove(old);
  const root=new T.Group();root.name='LuxVisual970';S.add(root);

  R.outputColorSpace=T.SRGBColorSpace;
  R.toneMapping=T.ACESFilmicToneMapping;
  R.toneMappingExposure=mobile?1.045:1.085;
  if(R.shadowMap){R.shadowMap.enabled=true;R.shadowMap.type=T.PCFSoftShadowMap}

  const M=(c,r=.78,m=.02,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
  const A=(g,m,x,y,z,p=root)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;p.add(o);return o};

  let seed=970331;
  const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};

  const asphalt=M(0x2f3437,.88,.025);
  const concrete=M(0xb8b4ac,.91,.015);
  const concreteDark=M(0x8f8c85,.94,.01);
  const paint=M(0xece7db,.70,.02);
  const yellow=M(0xd8b64f,.69,.025);
  const iron=M(0x383d40,.42,.54);
  const black=M(0x202427,.54,.18);
  const stone=M(0xa8a299,.92,.02);
  const wood=M(0x6c4b37,.76,.02);
  const green=M(0x3f6f3e,.96,0);
  const green2=M(0x527e46,.97,0);
  const warm=M(0xffdda0,.28,.03,0xffb44d,.16);
  const glass=new T.MeshPhysicalMaterial({color:0x7fa7b9,roughness:.08,metalness:.07,transparent:true,opacity:mobile?.82:.72,transmission:mobile?0:.10,clearcoat:.35,clearcoatRoughness:.12});

  const wetMats=[];
  const lamps=[];

  function roadSize(rd){
    const p=rd?.mesh?.geometry?.parameters||{};
    return {w:p.width||10,l:p.depth||40};
  }

  // Sharper original streets: edge strips, curb stones, drain channels and lane detail.
  for(const rd of W.roads||[]){
    if(!rd?.mesh)continue;
    const {w,l}=roadSize(rd);
    const g=new T.Group();
    g.position.copy(rd.mesh.position);
    g.rotation.copy(rd.mesh.rotation);
    root.add(g);

    const edge=mobile?.15:.18;
    for(const sx of[-1,1]){
      A(new T.BoxGeometry(edge,.035,l-.25),concreteDark,sx*(w/2-edge*.35),.102,0,g).castShadow=false;
      A(new T.BoxGeometry(.34,.12,l-.4),concrete,sx*(w/2+.18),.12,0,g).castShadow=false;
      A(new T.BoxGeometry(1.72,.085,l-.5),concrete,sx*(w/2+1.18),.105,0,g).castShadow=false;
      // narrow darker seam makes curb/sidewalk read less like one flat slab
      A(new T.BoxGeometry(.055,.018,l-.6),concreteDark,sx*(w/2+.43),.17,0,g).castShadow=false;
    }

    if(w>=11){
      for(let z=-l/2+8;z<l/2-5;z+=14){
        A(new T.BoxGeometry(.12,.022,5.8),paint,-w*.23,.119,z,g).castShadow=false;
        A(new T.BoxGeometry(.12,.022,5.8),paint,w*.23,.119,z,g).castShadow=false;
      }
      A(new T.BoxGeometry(.09,.022,l-3),yellow,0,.121,0,g).castShadow=false;
    }

    // Repeated storm drains along long roads.
    const drainStep=mobile?48:34;
    for(let z=-l/2+14;z<l/2-12;z+=drainStep){
      for(const sx of[-1,1]){
        const d=A(new T.BoxGeometry(.38,.025,.76),iron,sx*(w/2-.30),.126,z,g);
        d.castShadow=false;
        for(let k=-2;k<=2;k++)A(new T.BoxGeometry(.27,.012,.035),black,sx*(w/2-.30),.142,z+k*.115,g).castShadow=false;
      }
    }
    wetMats.push(rd.mesh.material);
  }

  // Core-city crosswalks and tactile curb ramps.
  function crossing(x,z,rot=0){
    const g=new T.Group();g.position.set(x,.132,z);g.rotation.y=rot;root.add(g);
    for(let i=-4;i<=4;i++)A(new T.BoxGeometry(.46,.024,5.8),paint,i*.72,0,0,g).castShadow=false;
    for(const sx of[-1,1]){
      const ramp=A(new T.BoxGeometry(2.6,.055,1.35),concrete,sx*7.35,.01,0,g);ramp.castShadow=false;
      for(let ix=-4;ix<=4;ix++)for(let iz=-1;iz<=1;iz++){
        const dot=A(new T.CylinderGeometry(.035,.035,.018,7),yellow,sx*7.35+ix*.20,.055,iz*.22,g);
        dot.rotation.x=Math.PI/2;dot.castShadow=false;
      }
    }
  }
  for(const p of [[0,135,0],[0,-135,0],[-125,0,Math.PI/2],[125,0,Math.PI/2]])crossing(...p);

  // Manholes and subtle road patching break up large flat asphalt areas.
  const patchM=M(0x282d30,.92,.02);
  const manholeM=M(0x4a4d4c,.56,.46);
  const roadMarks=[
    [0,72,0],[0,-74,0],[-125,62,0],[-125,-64,0],[125,60,0],[125,-68,0],[-72,135,Math.PI/2],[74,-135,Math.PI/2]
  ];
  for(const [x,z,rot] of roadMarks){
    const p=A(new T.BoxGeometry(2.8,.025,7.2),patchM,x,.104,z);p.rotation.y=rot;p.castShadow=false;
  }
  for(const [x,z] of [[-2,42],[2,-47],[-123,92],[127,-98],[-64,136],[70,-134]]){
    const mh=A(new T.CylinderGeometry(.48,.48,.035,28),manholeM,x,.126,z);mh.rotation.x=Math.PI/2;mh.castShadow=false;
    A(new T.TorusGeometry(.31,.025,7,28),black,x,.151,z).rotation.x=Math.PI/2;
  }

  // More architectural depth on the existing houses, without touching collisions or door logic.
  function facadeDepth(site,i){
    if(!site)return;
    const {x,z,w,d,h,rot=0}=site;
    const g=new T.Group();g.position.set(x,0,z);g.rotation.y=rot;root.add(g);
    const front=d/2+.34;

    // Horizontal floor bands, corner base stones and deeper window reveals.
    const rows=h>8?[2.15,4.45,6.75]:[2.15,4.45];
    for(const y of rows){
      A(new T.BoxGeometry(w-.65,.075,.17),stone,0,y+.86,front,g).castShadow=false;
      for(const xx of[-w*.29,w*.29]){
        A(new T.BoxGeometry(2.05,1.55,.09),stone,xx,y,front-.01,g);
        A(new T.BoxGeometry(1.74,1.28,.13),glass,xx,y,front+.07,g);
        A(new T.BoxGeometry(.045,1.28,.16),iron,xx,y,front+.16,g);
        A(new T.BoxGeometry(1.74,.045,.16),iron,xx,y,front+.16,g);
      }
    }

    for(const sx of[-1,1]){
      A(new T.BoxGeometry(.26,.38,.26),stone,sx*(w/2-.18),.22,front-.02,g);
      A(new T.BoxGeometry(.12,h-.55,.12),concreteDark,sx*(w/2-.12),(h-.55)/2,front+.03,g);
    }

    // Entry canopy, lamp, house-number plate and mailbox.
    const canopy=A(new T.BoxGeometry(2.5,.12,1.05),iron,0,2.95,front+.47,g);canopy.rotation.x=-.045;
    const lamp=A(new T.BoxGeometry(.18,.31,.17),warm,.88,2.30,front+.20,g);lamps.push(lamp);
    A(new T.BoxGeometry(.38,.22,.05),black,-.58,2.25,front+.24,g);
    A(new T.BoxGeometry(.42,.56,.25),M(0x314b61,.52,.25),w*.33,1.05,front+.23,g);

    // Side entrance paving and small planted borders.
    A(new T.BoxGeometry(3.25,.055,2.15),concrete,0,.04,front+1.10,g).castShadow=false;
    for(const sx of[-1,1]){
      A(new T.BoxGeometry(2.25,.42,.55),green,sx*(w*.31),.24,front+1.65,g);
      for(let k=-2;k<=2;k++){
        const leaf=A(new T.SphereGeometry(.12,mobile?6:9,mobile?5:7),k%2?green:green2,sx*(w*.31)+k*.30,.55,front+1.65,g);
        leaf.scale.set(1.1,.75,1);
      }
    }

    // Roofline/eaves make silhouettes cleaner.
    A(new T.BoxGeometry(w+.48,.15,.26),black,0,h+.06,front-.05,g);
    if(i%4===0){
      const aw=A(new T.BoxGeometry(2.8,.08,.82),M(0x4e5f6e,.38,.22),-w*.22,3.15,front+.49,g);aw.rotation.x=-.10;
    }
  }
  (W.houseSites||[]).forEach(facadeDepth);

  // Better street lamps and street furniture in the original town.
  const pole=M(0x343b3e,.38,.34);
  const benchWood=M(0x73513f,.72,.03);
  function lampPost(x,z,rot=0){
    const g=new T.Group();g.position.set(x,0,z);g.rotation.y=rot;root.add(g);
    A(new T.CylinderGeometry(.055,.085,4.9,9),pole,0,2.45,0,g);
    A(new T.BoxGeometry(.86,.06,.06),pole,.39,4.72,0,g);
    const bulb=A(new T.BoxGeometry(.36,.13,.23),warm,.80,4.62,0,g);lamps.push(bulb);
    if(!mobile){
      const l=new T.PointLight(0xffd39a,0,16,2.0);l.position.set(.80,4.52,0);g.add(l);lamps.push(l);
    }
  }
  function bench(x,z,rot=0){
    const g=new T.Group();g.position.set(x,0,z);g.rotation.y=rot;root.add(g);
    A(new T.BoxGeometry(1.8,.11,.42),benchWood,0,.57,0,g);
    A(new T.BoxGeometry(1.8,.10,.18),benchWood,0,.98,.28,g);
    for(const sx of[-.72,.72]){A(new T.BoxGeometry(.08,.58,.08),iron,sx,.29,0,g);A(new T.BoxGeometry(.08,.62,.08),iron,sx,.69,.28,g)}
  }
  let li=0;
  for(let z=-210;z<=210;z+=70){
    lampPost(-15,z,0);lampPost(15,z,Math.PI);li+=2;
  }
  for(const [x,z,r] of [[-20,110,0],[20,-110,Math.PI],[-107,18,Math.PI/2],[107,-18,-Math.PI/2]])bench(x,z,r);

  // Small original-looking direction signs, no licensed branding.
  function sign(x,z,rot,label){
    const g=new T.Group();g.position.set(x,0,z);g.rotation.y=rot;root.add(g);
    A(new T.CylinderGeometry(.035,.055,2.4,7),iron,0,1.2,0,g);
    const board=A(new T.BoxGeometry(1.65,.52,.08),M(0x244f6a,.42,.12),0,2.15,0,g);
    const c=document.createElement('canvas');c.width=384;c.height=128;const cx=c.getContext('2d');
    cx.fillStyle='#244f6a';cx.fillRect(0,0,384,128);cx.fillStyle='#fff';cx.font='700 34px Arial';cx.textAlign='center';cx.textBaseline='middle';cx.fillText(label,192,64);
    const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;
    const plate=A(new T.PlaneGeometry(1.55,.45),new T.MeshBasicMaterial({map:tx,transparent:true}),0,2.15,.045,g);plate.castShadow=false;
  }
  sign(-10,150,0,'ZENTRUM');sign(138,10,Math.PI/2,'WOHNEN');sign(-138,-10,-Math.PI/2,'STADT');

  // Lightweight verge vegetation near core roads.
  const grassGeo=new T.ConeGeometry(.035,.34,4),grassMat=M(0x4c763f,.98),count=mobile?90:220;
  const inst=new T.InstancedMesh(grassGeo,grassMat,count),dummy=new T.Object3D();
  for(let i=0;i<count;i++){
    const vertical=rnd()>.5;
    let x,z;
    if(vertical){x=(rnd()>.5?1:-1)*(10+rnd()*4);z=-300+rnd()*600}
    else{x=-170+rnd()*340;z=(rnd()>.5?1:-1)*(143+rnd()*5)}
    dummy.position.set(x,.18,z);dummy.rotation.y=rnd()*Math.PI;const s=.6+rnd()*.9;dummy.scale.set(s,s,s);dummy.updateMatrix();inst.setMatrixAt(i,dummy.matrix);
  }
  inst.castShadow=false;inst.receiveShadow=false;root.add(inst);

  W.registerTick?.((dt)=>{
    const h=(window.LuxLife?.state?.hour??12)+(window.LuxLife?.state?.minute??0)/60;
    const weather=(window.LuxWeather560||window.LuxWeather470)?.state;
    const rain=weather==='rain',night=h>=20||h<6,dusk=(h>=18&&h<20)||(h>=5.5&&h<7.5);
    for(const m of wetMats){
      if(!m)continue;
      m.roughness+=( (rain?.48:.88)-m.roughness)*Math.min(1,dt*.85);
      if('envMapIntensity' in m)m.envMapIntensity=rain?.62:.20;
    }
    for(const l of lamps){
      if(l?.isLight)l.intensity=night?1.25:dusk?.48:0;
      else if(l?.material?.emissiveIntensity!==undefined)l.material.emissiveIntensity=night?1.25:dusk?.55:.15;
    }
  });

  window.LuxVisual970={root,version:'9.7.0'};
}
