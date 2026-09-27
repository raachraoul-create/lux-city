import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

let q=setInterval(()=>{
  if(!window.LuxWorld?.player)return;
  clearInterval(q);
  build(window.LuxWorld);
},180);

function build(W){
  const p=W.player;let cfg={};try{cfg=window.LuxAvatar||JSON.parse(localStorage.getItem('luxcity_avatar_current')||'{}')}catch{}
  const C=(v,d)=>{try{return new T.Color(v||d)}catch{return new T.Color(d)}};
  const female=(cfg.gender||'').toLowerCase().startsWith('w');
  const skinC=C(cfg.skin,'#c58c66'),shirtC=C(cfg.shirt,'#365f86'),pantsC=C(cfg.pants,'#263746'),hairC=C(cfg.hairColor,'#3a2418');
  const shoeC=C((cfg.shoes||'').includes('Schwarz')?'#17191c':(cfg.shoes||'').includes('Stiefel')?'#3b2a21':'#ecebe7','#ecebe7');
  const phys=(c,r=.62,m=.01,extra={})=>new T.MeshPhysicalMaterial({color:c,roughness:r,metalness:m,clearcoat:.018,clearcoatRoughness:.82,...extra});
  const skin=phys(skinC,.50,0,{sheen:.04,sheenRoughness:.9,sheenColor:new T.Color(skinC)}),shirt=phys(shirtC,.77),pants=phys(pantsC,.82),hair=phys(hairC,.68),shoe=phys(shoeC,.45,.035),white=phys(0xf3f2ed,.60),dark=phys(0x181b1e,.48,.08),lip=phys(0x9c5c5b,.46),eyeWhite=phys(0xf1f0eb,.32),iris=phys(0x526c79,.28),metal=phys(0xa6a9aa,.28,.55);
  for(const ch of [...p.children])p.remove(ch);
  const L={arms:[],legs:[]},lowerArms=[],lowerLegs=[],feet=[],eyes=[],parts={};
  function A(g,m,x,y,z,parent=p){const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
  function cap(r,l,m,x,y,z,parent=p,seg=8){return A(new T.CapsuleGeometry(r,l,seg,16),m,x,y,z,parent)}
  function sph(r,m,x,y,z,parent=p,sx=1,sy=1,sz=1){const o=A(new T.SphereGeometry(r,28,20),m,x,y,z,parent);o.scale.set(sx,sy,sz);return o}

  // Grounded contact shadow helps the character sit in the scene instead of floating.
  const sh=A(new T.CircleGeometry(.36,24),new T.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.20,depthWrite:false}),0,.008,0,p);sh.rotation.x=-Math.PI/2;sh.castShadow=false;sh.receiveShadow=false;

  // Torso with layered anatomy and clothing.
  const pelvis=cap(female?.155:.175,.18,pants,0,.83,0);pelvis.scale.set(female?1.00:1.06,.85,.78);parts.pelvis=pelvis;
  const abdomen=cap(female?.145:.16,.24,shirt,0,1.08,0);abdomen.scale.set(.98,1,.72);parts.abdomen=abdomen;
  const chest=cap(female?.188:.208,.30,shirt,0,1.38,0);chest.scale.set(female?.98:1.07,1,.70);parts.chest=chest;
  const upperChest=A(new T.BoxGeometry(female?.43:.49,.11,.22),shirt,0,1.53,0);upperChest.scale.z=.78;
  // Shirt/jacket collar and seam details.
  const collarL=A(new T.BoxGeometry(.18,.055,.055),white,-.085,1.59,.11);collarL.rotation.z=-.42;collarL.rotation.x=.25;
  const collarR=A(new T.BoxGeometry(.18,.055,.055),white,.085,1.59,.11);collarR.rotation.z=.42;collarR.rotation.x=.25;
  A(new T.BoxGeometry(.012,.39,.012),dark,0,1.36,.145);for(let y=1.22;y<=1.50;y+=.09)sph(.010,metal,.018,y,.154,p,.8,.8,.45);
  for(const sx of[-1,1])sph(.078,shirt,sx*(female?.225:.255),1.49,0);
  cap(.052,.07,skin,0,1.65,0);

  // Head / face.
  const head=new T.Group();head.position.set(0,1.80,0);p.add(head);parts.head=head;
  const skull=sph(.148,skin,0,.028,0,head,.90,1.04,.91);parts.skull=skull;
  sph(.118,skin,0,-.075,.020,head,.91,.73,.86); // jaw
  sph(.053,skin,-.105,-.010,.070,head,.70,.86,.72);sph(.053,skin,.105,-.010,.070,head,.70,.86,.72); // cheeks
  for(const sx of[-1,1]){
    sph(.024,skin,sx*.142,.005,0,head,.82,1.0,.70); // ears
    const ew=sph(.0255,eyeWhite,sx*.050,.044,.137,head,1,.62,.38);eyes.push(ew);
    sph(.011,iris,sx*.050,.044,.154,head,1,.75,.42);sph(.0051,dark,sx*.050,.044,.163,head,1,.80,.50);
    const lid=A(new T.BoxGeometry(.054,.006,.007),skin,sx*.050,.063,.157,head);lid.rotation.z=sx*.035;
    const brow=A(new T.BoxGeometry(.061,.009,.010),hair,sx*.050,.091,.149,head);brow.rotation.z=sx*.07;
  }
  const bridge=cap(.012,.036,skin,0,.012,.139,head,5);bridge.rotation.x=Math.PI/2;
  const nose=A(new T.ConeGeometry(.0135,.045,10),skin,0,-.010,.160,head);nose.rotation.x=Math.PI/2;
  sph(.0105,skin,-.017,-.033,.162,head);sph(.0105,skin,.017,-.033,.162,head);
  const upperLip=A(new T.BoxGeometry(.060,.008,.008),lip,0,-.071,.149,head);upperLip.rotation.x=.08;
  const lowerLip=A(new T.BoxGeometry(.047,.007,.007),phys(0xb06d6a,.42),0,-.082,.150,head);lowerLip.rotation.x=-.06;
  sph(.016,skin,0,-.116,.108,head,1.0,.74,.82);
  // Subtle jaw shadow / stubble without forcing a beard.
  const jawShade=phys(new T.Color(skinC).multiplyScalar(.83),.64);const js=sph(.108,jawShade,0,-.086,.004,head,.91,.56,.86);js.material.transparent=true;js.material.opacity=.13;js.material.depthWrite=false;

  // Hair volume with style-specific silhouette.
  const style=cfg.hair||'Kurz';
  const hc=sph(.160,hair,0,.128,-.004,head,.97,.69,.97);hc.geometry=new T.SphereGeometry(.160,30,20,0,Math.PI*2,0,Math.PI*.58);
  if(style==='Lang'){
    const back=cap(.092,.33,hair,0,-.16,-.100,head);back.scale.x=1.35;
    for(const sx of[-1,1]){const lock=cap(.040,.27,hair,sx*.120,-.10,-.055,head,5);lock.rotation.z=sx*.08}
  }else if(style==='Lockig'){
    for(let a=0;a<Math.PI*2;a+=Math.PI/10){sph(.039,hair,Math.cos(a)*.125,.118+Math.sin(a*.5)*.020,Math.sin(a)*.115,head)}
  }else if(style==='Undercut'){
    hc.scale.y=.43;A(new T.BoxGeometry(.205,.085,.165),hair,0,.148,-.012,head);
    for(const sx of[-1,1]){const side=A(new T.BoxGeometry(.025,.090,.13),hair,sx*.145,.085,-.015,head);side.material.transparent=true;side.material.opacity=.56}
  }

  // Arms, hands and legs with better joints and shoe details.
  for(const sx of[-1,1]){
    const upper=new T.Group();upper.position.set(sx*(female?.268:.296),1.49,0);p.add(upper);
    cap(.052,.195,shirt,0,-.085,0,upper);sph(.051,skin,0,-.248,0,upper);
    const la=new T.Group();la.position.set(0,-.248,0);upper.add(la);cap(.042,.19,skin,0,-.108,.006,la);
    const hand=sph(.047,skin,0,-.262,.027,la,.73,1.04,.64);
    for(let fi=0;fi<4;fi++){const f=A(new T.CapsuleGeometry(.0065,.036,3,6),skin,(fi-1.5)*.015,-.294,.045,la);f.rotation.x=.10}
    const thumb=A(new T.CapsuleGeometry(.007,.030,3,6),skin,sx*.029,-.272,.045,la);thumb.rotation.z=-sx*.75;
    L.arms.push(upper);lowerArms.push(la);

    const leg=new T.Group();leg.position.set(sx*.098,.81,0);p.add(leg);cap(.073,.30,pants,0,-.145,0,leg);sph(.067,pants,0,-.382,0,leg);
    const ll=new T.Group();ll.position.set(0,-.382,0);leg.add(ll);cap(.057,.28,pants,0,-.135,.018,ll);
    const ft=new T.Group();ft.position.set(0,-.335,.067);ll.add(ft);A(new T.BoxGeometry(.162,.084,.305),shoe,0,0,.02,ft);A(new T.BoxGeometry(.150,.018,.31),white,0,-.049,.025,ft);A(new T.BoxGeometry(.120,.010,.13),dark,0,.050,.055,ft);for(let z=-.01;z<=.09;z+=.05)A(new T.BoxGeometry(.11,.010,.008),white,0,.052,z,ft);
    L.legs.push(leg);lowerLegs.push(ll);feet.push(ft);
  }

  p.userData.limbs=L;p.userData.avatar720=true;p.userData.avatar930=true;p.userData.humanHeight=1.82;
  let prev={x:p.position.x,z:p.position.z},phase=0,idle=0,blink=0,nextBlink=2.1;
  W.registerTick(dt=>{
    const dx=p.position.x-prev.x,dz=p.position.z-prev.z,sp=Math.hypot(dx,dz)/Math.max(dt,.001);prev={x:p.position.x,z:p.position.z};idle+=dt;phase+=dt*Math.min(10.5,sp*2.42);
    const moving=sp>.16,run=Math.min(1,sp/8.5),breath=Math.sin(idle*1.25)*.0042;
    parts.chest.scale.y=1+breath;parts.abdomen.scale.y=1+breath*.45;
    const torso=moving?Math.sin(phase)*.012:Math.sin(idle*.64)*.0035;parts.abdomen.rotation.z+=(torso-parts.abdomen.rotation.z)*Math.min(1,dt*5);parts.pelvis.position.y=.83+(moving?Math.abs(Math.sin(phase*2))*.009:Math.sin(idle*.8)*.002);
    parts.pelvis.rotation.y+=((moving?Math.sin(phase)*.024:0)-parts.pelvis.rotation.y)*Math.min(1,dt*6);
    parts.head.position.y=1.80+(moving?Math.abs(Math.sin(phase*2))*.004:breath*.5);const look=moving?0:Math.sin(idle*.26)*.042;parts.head.rotation.y+=(look-parts.head.rotation.y)*Math.min(1,dt*3);parts.head.rotation.z+=((moving?Math.sin(phase)*.005:Math.sin(idle*.41)*.003)-parts.head.rotation.z)*Math.min(1,dt*5);
    nextBlink-=dt;if(nextBlink<0){blink=.105;nextBlink=2.4+Math.random()*4.4}if(blink>0)blink-=dt;for(const e of eyes){const t=blink>0?.055:.62;e.scale.y+=(t-e.scale.y)*Math.min(1,dt*30)}
    for(let i=0;i<2;i++){
      const ls=L.legs[i].rotation.x,as=L.arms[i].rotation.x,k=moving?Math.max(0,-ls)*(.62+.14*run):0,el=moving?Math.max(0,-as)*(.28+.07*run):.035,fo=moving?Math.max(-.14,Math.min(.19,ls*.15)):0;
      lowerLegs[i].rotation.x+=(k-lowerLegs[i].rotation.x)*Math.min(1,dt*9);lowerArms[i].rotation.x+=(el-lowerArms[i].rotation.x)*Math.min(1,dt*8);feet[i].rotation.x+=(fo-feet[i].rotation.x)*Math.min(1,dt*9);
    }
    sh.material.opacity=.16+Math.min(.08,sp*.006);
  });
  window.LuxAvatar720=window.LuxAvatar930={config:cfg,player:p,version:'9.3.0'};
}
