import{bakeryState}from'./gameplay-v5.js';
export function installBakeryWorld(scene,THREE,player,getCash,setCash){
 const g=new THREE.Group();g.position.set(22,0,0);
 const door=new THREE.Mesh(new THREE.BoxGeometry(2.2,3.4,.25),new THREE.MeshStandardMaterial({color:0x51311f}));door.position.set(0,1.7,7.65);g.add(door);
 const sign=document.createElement('div');sign.id='bakeryMarker';sign.style.cssText='position:fixed;z-index:9;left:20px;bottom:20px;background:#111e;padding:10px 14px;border-radius:10px;color:white;font:14px Arial';document.body.appendChild(sign);
 scene.add(g);
 function update(){let d=Math.hypot(player?.position.x-22||999,player?.position.z||999);if(bakeryState.owned){sign.textContent=d<9?'🥖 Boulangerie du Grund · E = entrer':'🥖 Ta boulangerie est marquée sur la carte';}else sign.textContent=d<12?'🏪 Boulangerie du Grund · disponible à l’achat':'🏪 Boulangerie disponible';}
 addEventListener('keydown',e=>{if(e.key.toLowerCase()!=='e'||!player)return;let d=Math.hypot(player.position.x-22,player.position.z);if(d>10)return;if(bakeryState.owned)location.href='bakery.html?v=5';else{let r=bakeryState.buy(85000,getCash());if(!r.ok)return alert('Il te faut 85 000 € pour acheter la boulangerie. Utilise la banque.');setCash(r.cash);alert('Boulangerie achetée. La porte est maintenant accessible.');update()}});
 return update;
}