(()=>{let q=setInterval(()=>{let W=window.LuxWorld,C=window.LuxCollision500||window.LuxCollision471;if(!W?.player||!W.registerTick||!C)return;clearInterval(q);init(W,C)},180);
function init(W,C){let base=W.hit,safe={x:W.player.position.x,z:W.player.position.z};
 function carBoxHit(x,z,car,pad=.38){if(!car||car.visible===false)return false;let hw=(car.userData?.halfW||1.05)*(car.scale?.x||1)+pad,hl=(car.userData?.halfL||2.25)*(car.scale?.z||1)+pad,dx=x-car.position.x,dz=z-car.position.z,a=-(car.rotation?.y||0),cs=Math.cos(a),sn=Math.sin(a),lx=dx*cs-dz*sn,lz=dx*sn+dz*cs;return Math.abs(lx)<hw&&Math.abs(lz)<hl}
 function vehicleHit(x,z){for(const c of W.cars||[])if(carBoxHit(x,z,c,.36))return true;let pc=window.LuxPlayerCar840||window.LuxPlayerCar750||window.LuxPlayerCar710;if(pc?.car&&!pc.driving&&carBoxHit(x,z,pc.car,.40))return true;return false}
 W.hit=(x,z)=>{if(window.LuxHomes520?.inside)return base(x,z);return vehicleHit(x,z)||base(x,z)};
 W.registerTick(()=>{let pc=window.LuxPlayerCar840||window.LuxPlayerCar750||window.LuxPlayerCar710;if(pc?.driving||window.LuxHomes520?.inside)return;let p=W.player.position;if(!vehicleHit(p.x,p.z)){safe={x:p.x,z:p.z};p.y=0;return}p.set(safe.x,0,safe.z)});
 window.LuxPlayerCollision860={vehicleHit}
}})();