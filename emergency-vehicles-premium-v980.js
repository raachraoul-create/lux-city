import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

let wait=setInterval(()=>{
  const W=window.LuxWorld,E=window.LuxEmergency501;
  if(!W?.scene||!E?.fleet?.Polizist?.v||!E?.fleet?.Rettungsdienst?.v)return;
  clearInterval(wait);init(W,E);
},220);

function init(W,E){
  const S=W.scene,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
  const old=S.getObjectByName('LuxEmergencyVehicles980');if(old)S.remove(old);
  const root=new T.Group();root.name='LuxEmergencyVehicles980';S.add(root);

  const M=(c,r=.38,m=.28,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
  const P=(c,r=.20,m=.42,extra={})=>new T.MeshPhysicalMaterial({color:c,roughness:r,metalness:m,clearcoat:.68,clearcoatRoughness:.14,...extra});
  const A=(g,m,x,y,z,p)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=!mobile;o.receiveShadow=true;p.add(o);return o};
  const dark=P(0x171c20,.24,.56),metal=P(0xaeb5b9,.17,.70),rubber=M(0x101214,.84,.01),white=P(0xf0f1ef,.18,.28);
  const blue=P(0x197dea,.10,.08,{emissive:0x1688ff,emissiveIntensity:.15});
  const red=P(0xc32832,.15,.12,{emissive:0xff2430,emissiveIntensity:.08});
  const amber=P(0xe38a24,.16,.10,{emissive:0xff9b31,emissiveIntensity:.08});
  const glass=P(0x52798a,.07,.16,{transparent:true,opacity:mobile?.80:.69,transmission:mobile?0:.10});
  const head=P(0xeaf4ff,.08,.05,{emissive:0xffffff,emissiveIntensity:.28});
  const tail=P(0x8b121c,.12,.05,{emissive:0xff1824,emissiveIntensity:.22});

  function labelTexture(text,bg='#f4f4f0',fg='#18202a',accent=null){
    const c=document.createElement('canvas');c.width=512;c.height=128;const x=c.getContext('2d');
    x.fillStyle=bg;x.fillRect(0,0,512,128);
    if(accent){x.fillStyle=accent;x.fillRect(0,0,24,128)}
    x.fillStyle=fg;x.font='900 54px Arial';x.textAlign='center';x.textBaseline='middle';x.fillText(text,256,66);
    const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t
  }
  function plate(p,z,text='LC 112'){
    const o=A(new T.PlaneGeometry(.72,.17),new T.MeshBasicMaterial({map:labelTexture(text),side:T.DoubleSide}),0,.48,z,p);
    if(z>0)o.rotation.y=Math.PI;return o
  }
  function wheel(parent,x,z,r=.36){
    const w=A(new T.CylinderGeometry(r,r,.24,22),rubber,x,.40,z,parent);w.rotation.z=Math.PI/2;
    const rim=A(new T.CylinderGeometry(r*.60,r*.60,.255,18),metal,x,.40,z,parent);rim.rotation.z=Math.PI/2;
    const disc=A(new T.CylinderGeometry(r*.40,r*.40,.262,18),M(0x747c81,.30,.66),x,.40,z,parent);disc.rotation.z=Math.PI/2;
    return w
  }
  function hideLegacy(v){
    for(const c of [...v.children])c.visible=false;
  }

  const active=[];

  function policeVisual(f){
    const v=f.v;hideLegacy(v);
    const g=new T.Group();g.name='PolicePremium980';v.add(g);
    const navy=P(0x234d79,.17,.36),silver=P(0xc7cbcc,.20,.35);
    A(new T.BoxGeometry(2.06,.72,4.58),navy,0,.68,0,g);
    A(new T.BoxGeometry(1.78,.66,2.05),silver,0,1.25,-.22,g);
    A(new T.BoxGeometry(1.56,.46,.08),glass,0,1.40,-1.29,g);
    A(new T.BoxGeometry(1.56,.43,.08),glass,0,1.36,.82,g);
    for(const sx of[-1,1]){
      A(new T.BoxGeometry(.07,.50,1.42),glass,sx*.89,1.34,-.20,g);
      A(new T.BoxGeometry(.055,.18,3.62),silver,sx*1.04,.82,.03,g);
      A(new T.BoxGeometry(.21,.12,.32),dark,sx*1.12,1.25,-.92,g);
    }
    for(const sx of[-1,1])for(const z of[-1.45,1.45])wheel(g,sx*1.05,z,.35);
    A(new T.BoxGeometry(1.40,.15,.28),blue,0,1.75,-.05,g);
    for(const x of[-.58,.58]){
      A(new T.BoxGeometry(.42,.13,.08),head,x,.69,-2.32,g);
      A(new T.BoxGeometry(.38,.13,.08),tail,x,.68,2.32,g);
    }
    A(new T.BoxGeometry(1.02,.22,.09),dark,0,.53,-2.34,g);
    A(new T.BoxGeometry(1.05,.18,.09),dark,0,.52,2.34,g);
    const sideTex=labelTexture('POLICE','#f3f4f1','#1d4e7a','#1d4e7a');
    for(const sx of[-1,1]){
      const p=A(new T.PlaneGeometry(1.42,.40),new T.MeshBasicMaterial({map:sideTex,side:T.DoubleSide}),sx*1.075,1.02,.15,g);
      p.rotation.y=sx>0?-Math.PI/2:Math.PI/2;
    }
    plate(g,-2.36,'LC P112');plate(g,2.36,'LC P112');
    g.userData.blue=[...g.children].filter(o=>o.material===blue);
    active.push({f,g,type:'police',blue:g.userData.blue});
  }

  function ambulanceVisual(f){
    const v=f.v;hideLegacy(v);
    const g=new T.Group();g.name='AmbulancePremium980';v.add(g);
    A(new T.BoxGeometry(2.28,1.38,2.28),white,0,1.10,-1.45,g);
    A(new T.BoxGeometry(2.36,1.88,3.12),white,0,1.36,1.25,g);
    A(new T.BoxGeometry(2.00,.64,.08),glass,0,1.68,-2.61,g);
    for(const sx of[-1,1])A(new T.BoxGeometry(.08,.64,1.12),glass,sx*1.16,1.65,-1.45,g);
    for(const sx of[-1,1])for(const z of[-1.60,1.60])wheel(g,sx*1.18,z,.39);
    for(const sx of[-1,1])A(new T.BoxGeometry(.055,.20,4.80),red,sx*1.19,.95,.25,g);
    A(new T.BoxGeometry(2.22,.20,.08),red,0,.95,2.86,g);
    A(new T.BoxGeometry(1.54,.16,.30),blue,0,2.31,-1.42,g);
    for(const x of[-.78,.78])A(new T.BoxGeometry(.28,.16,.10),blue,x,2.22,1.58,g);
    for(const x of[-.66,.66]){
      A(new T.BoxGeometry(.42,.14,.08),head,x,.72,-2.64,g);
      A(new T.BoxGeometry(.38,.14,.08),tail,x,.78,2.86,g);
    }
    A(new T.BoxGeometry(1.15,.26,.09),dark,0,.53,-2.68,g);
    A(new T.BoxGeometry(1.28,.22,.09),dark,0,.54,2.89,g);
    const sideTex=labelTexture('RETTUNG','#f5f5f1','#bd2430','#bd2430');
    for(const sx of[-1,1]){
      const p=A(new T.PlaneGeometry(1.72,.48),new T.MeshBasicMaterial({map:sideTex,side:T.DoubleSide}),sx*1.215,1.42,.55,g);
      p.rotation.y=sx>0?-Math.PI/2:Math.PI/2;
    }
    const rear=A(new T.PlaneGeometry(1.22,.50),new T.MeshBasicMaterial({map:labelTexture('112','#ffffff','#bd2430'),side:T.DoubleSide}),0,1.50,2.91,g);rear.rotation.y=Math.PI;
    plate(g,-2.70,'LC R112');plate(g,2.92,'LC R112');
    g.userData.blue=[...g.children].filter(o=>o.material===blue);
    active.push({f,g,type:'rescue',blue:g.userData.blue});
  }

  function staticPolice(x,z){
    const p=new T.Group();p.name='PoliceReserve980';p.position.set(x,0,z);p.rotation.y=Math.PI;root.add(p);
    const navy=P(0x234d79,.18,.35),silver=P(0xc7cbcc,.20,.34);
    A(new T.BoxGeometry(2.02,.70,4.46),navy,0,.66,0,p);A(new T.BoxGeometry(1.72,.62,1.98),silver,0,1.23,-.18,p);
    A(new T.BoxGeometry(1.48,.43,.08),glass,0,1.37,-1.22,p);
    for(const sx of[-1,1])for(const zz of[-1.42,1.42])wheel(p,sx*1.02,zz,.34);
    A(new T.BoxGeometry(1.32,.14,.27),blue,0,1.70,-.02,p);
    const s=labelTexture('POLICE','#f3f4f1','#1d4e7a','#1d4e7a');
    for(const sx of[-1,1]){const q=A(new T.PlaneGeometry(1.34,.38),new T.MeshBasicMaterial({map:s,side:T.DoubleSide}),sx*1.045,1.0,.12,p);q.rotation.y=sx>0?-Math.PI/2:Math.PI/2}
    W.obstacles.push({x,z,r:2.45});return p
  }
  function staticAmbulance(x,z){
    const p=new T.Group();p.name='AmbulanceReserve980';p.position.set(x,0,z);p.rotation.y=Math.PI;root.add(p);
    A(new T.BoxGeometry(2.22,1.34,2.22),white,0,1.06,-1.38,p);A(new T.BoxGeometry(2.30,1.82,3.02),white,0,1.33,1.20,p);
    A(new T.BoxGeometry(1.94,.62,.08),glass,0,1.65,-2.55,p);
    for(const sx of[-1,1])for(const zz of[-1.58,1.58])wheel(p,sx*1.15,zz,.38);
    for(const sx of[-1,1])A(new T.BoxGeometry(.055,.20,4.66),red,sx*1.16,.94,.24,p);
    A(new T.BoxGeometry(1.48,.15,.28),blue,0,2.26,-1.38,p);
    const s=labelTexture('112','#ffffff','#bd2430');
    const q=A(new T.PlaneGeometry(1.02,.42),new T.MeshBasicMaterial({map:s,side:T.DoubleSide}),0,1.48,2.80,p);q.rotation.y=Math.PI;
    W.obstacles.push({x,z,r:2.95});return p
  }

  policeVisual(E.fleet.Polizist);
  ambulanceVisual(E.fleet.Rettungsdienst);
  staticPolice(86.4,-203.0);
  staticAmbulance(-218.0,-72.5);

  W.registerTick?.(()=>{
    const blink=Math.floor(Date.now()/170)%2===0;
    for(const a of active){
      const out=a.f.state!=='base';
      for(const b of a.blue){b.visible=true;b.material.emissiveIntensity=out?(blink?2.8:.18):.12}
    }
  });

  window.LuxEmergencyVehicles980={version:'9.8.0',root,active};
}
