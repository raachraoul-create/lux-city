(()=>{let q=setInterval(()=>{if(!window.LuxWorld)return;clearInterval(q);init()},180);
function init(){
 const W=window.LuxWorld,AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
 let ctx,master,noise,unlocked=false,muted=false,stepT=0,last={x:W.player.position.x,z:W.player.position.z},eng1,eng2,engG,roadSrc,roadFilter,roadG,ambSrc,ambFilter,ambG,revT=0;
 let btn=document.createElement('button');btn.id='sound840';btn.textContent='🔊 TON STARTEN';btn.style='padding:8px;border-radius:9px';(document.getElementById('hud')||document.body).appendChild(btn);
 function noiseBuffer(){let b=ctx.createBuffer(1,ctx.sampleRate*3,ctx.sampleRate),a=b.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1;return b}
 function tone(f,d=.12,v=.025,type='sine',f2=null){if(!unlocked||muted)return;let o=ctx.createOscillator(),g=ctx.createGain(),t=ctx.currentTime;o.type=type;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(master);o.start(t);o.stop(t+d+.03)}
 function burst(v=.022,d=.08,lo=700,hi=2200){if(!unlocked||muted)return;let n=ctx.createBufferSource(),bp=ctx.createBiquadFilter(),g=ctx.createGain(),t=ctx.currentTime;n.buffer=noise;bp.type='bandpass';bp.frequency.value=(lo+hi)/2;bp.Q.value=1.2;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.005);g.gain.exponentialRampToValueAtTime(.0001,t+d);n.connect(bp);bp.connect(g);g.connect(master);n.start(t);n.stop(t+d+.02)}
 async function unlock(){if(!ctx){ctx=new AC();master=ctx.createGain();master.gain.value=.34;master.connect(ctx.destination);noise=noiseBuffer();
   eng1=ctx.createOscillator();eng2=ctx.createOscillator();engG=ctx.createGain();eng1.type='sine';eng2.type='triangle';engG.gain.value=.0001;eng1.connect(engG);eng2.connect(engG);engG.connect(master);eng1.start();eng2.start();
   roadSrc=ctx.createBufferSource();roadSrc.buffer=noise;roadSrc.loop=true;roadFilter=ctx.createBiquadFilter();roadFilter.type='bandpass';roadFilter.frequency.value=850;roadG=ctx.createGain();roadG.gain.value=.0001;roadSrc.connect(roadFilter);roadFilter.connect(roadG);roadG.connect(master);roadSrc.start();
   ambSrc=ctx.createBufferSource();ambSrc.buffer=noise;ambSrc.loop=true;ambFilter=ctx.createBiquadFilter();ambFilter.type='lowpass';ambFilter.frequency.value=420;ambG=ctx.createGain();ambG.gain.value=.006;ambSrc.connect(ambFilter);ambFilter.connect(ambG);ambG.connect(master);ambSrc.start()
 }try{await ctx.resume()}catch{}unlocked=ctx.state==='running';if(unlocked){muted=false;btn.textContent='🔊 TON AN';tone(540,.09,.018,'sine',680)}}
 btn.onclick=e=>{e.stopPropagation();if(!unlocked||ctx?.state!=='running')unlock();else{muted=!muted;btn.textContent=muted?'🔇 TON AUS':'🔊 TON AN'}};
 for(const ev of['pointerdown','touchstart','keydown'])addEventListener(ev,e=>{if(e.target===btn)return;if(!unlocked||ctx?.state!=='running')unlock()},{capture:true,passive:true});
 function horn(){tone(370,.22,.048,'triangle');setTimeout(()=>tone(465,.20,.032,'triangle'),22)}
 function aiHorn(){tone(330,.16,.022,'triangle')}
 function door(){tone(115,.08,.026,'sine',82);burst(.018,.10,250,900)}
 function warningBeep(){tone(720,.10,.025,'sine')}
 function bell(){tone(920,.13,.022,'sine',1100)}
 function foot(indoor){burst(indoor?.018:.014,.055,indoor?350:500,indoor?1150:1650);tone(indoor?105:125,.045,.009,'sine',indoor?82:96)}
 function impact(strength=.5){let v=Math.min(.06,.018+strength*.025);tone(72,.15,v,'sine',48);burst(v*.7,.12,120,620)}
 addEventListener('luxcity:car-impact',e=>impact(Math.min(1,(e.detail?.speed||1)/8)));
 W.registerTick(dt=>{if(!unlocked)return;let pc=window.LuxPlayerCar840||window.LuxPlayerCar750||window.LuxPlayerCar710,p=W.player.position,d=Math.hypot(p.x-last.x,p.z-last.z),sp=d/Math.max(dt,.001);last={x:p.x,z:p.z};
   if(!pc?.driving&&sp>.45&&d<2){stepT+=dt;if(stepT>.34){stepT=0;foot(!!window.LuxHomes520?.inside)}}else stepT=0;
   let g=.0001,f1=70,f2=140,type='sine',road=.0001;if(pc?.driving&&!muted){let s=Math.abs(pc.speed||0),ft=pc.fuelType;if(ft==='electric'){f1=115+s*18;f2=230+s*32;g=.004+Math.min(.018,s*.00075)}else if(ft==='diesel'){f1=42+s*6.8;f2=84+s*13;g=.010+Math.min(.030,s*.00115)}else{f1=58+s*9.5;f2=116+s*19;g=.008+Math.min(.028,s*.00105)}road=.002+Math.min(.026,s*.0011);if(pc.speed<-.35){revT+=dt;if(pc.vehicleType==='van'&&revT>.82){revT=0;tone(760,.12,.018)}}else revT=0}
   eng1.type=type;eng1.frequency.setTargetAtTime(f1,ctx.currentTime,.06);eng2.frequency.setTargetAtTime(f2,ctx.currentTime,.06);engG.gain.setTargetAtTime(muted?.0001:g,ctx.currentTime,.08);roadG.gain.setTargetAtTime(muted?.0001:road,ctx.currentTime,.10);roadFilter.frequency.setTargetAtTime(650+Math.abs(pc?.speed||0)*42,ctx.currentTime,.15);ambG.gain.setTargetAtTime(muted?.0001:(window.LuxHomes520?.inside?.0025:.006),ctx.currentTime,.25)
 });
 window.LuxAudio520=window.LuxAudio530=window.LuxAudio540=window.LuxAudio550=window.LuxAudio560=window.LuxAudio570=window.LuxAudio680=window.LuxAudio710=window.LuxAudio840={unlock,horn,aiHorn,door,warningBeep,bell,impact,get active(){return unlocked&&!muted&&ctx?.state==='running'}}
}})();