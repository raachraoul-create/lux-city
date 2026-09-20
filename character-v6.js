// Procedural grounded humanoid for Lux City v0.6
export function createWalker(THREE,opt={}){
 const root=new THREE.Group(), skin=opt.skin||0xc98f65, shirt=opt.shirt||0x284b70,pants=opt.pants||0x252525,shoe=opt.shoe||0xeeeeee;
 const mat=c=>new THREE.MeshStandardMaterial({color:c,roughness:.82});
 const part=(g,c,parent,x,y,z)=>{let m=new THREE.Mesh(g,mat(c));m.position.set(x,y,z);m.castShadow=true;parent.add(m);return m};
 const pelvis=part(new THREE.BoxGeometry(.72,.45,.42),pants,root,0,1.72,0),torso=part(new THREE.CapsuleGeometry(.46,1.05,5,12),shirt,root,0,2.42,0),head=part(new THREE.SphereGeometry(.43,20,16),skin,root,0,3.62,0);
 part(new THREE.SphereGeometry(.065,8,8),0x222222,head,-.14,.06,.39);part(new THREE.SphereGeometry(.065,8,8),0x222222,head,.14,.06,.39);part(new THREE.BoxGeometry(.20,.035,.035),0x7a4035,head,0,-.14,.41);
 const limb=(x,arm=false)=>{let hip=new THREE.Group();hip.position.set(x,arm?2.85:1.65,0);root.add(hip);let upper=part(new THREE.CapsuleGeometry(arm?.115:.16,arm?.62:.72,4,8),arm?skin:pants,hip,0,-(arm?.38:.46),0);let joint=new THREE.Group();joint.position.set(0,-(arm?.77:.9),0);hip.add(joint);part(new THREE.CapsuleGeometry(arm?.105:.15,arm?.58:.7,4,8),arm?skin:pants,joint,0,-(arm?.35:.44),0);if(!arm){let foot=part(new THREE.BoxGeometry(.38,.22,.72),shoe,joint,0,-.88,.18);foot.rotation.x=-.05}return{hip,joint}};
 const L=limb(-.25),RR=limb(.25),LA=limb(-.58,true),RA=limb(.58,true);let phase=0;
 root.userData.animate=(dt,speed)=>{if(speed>.05){phase+=dt*(6.5+speed*.15);let s=Math.sin(phase),c=Math.cos(phase);L.hip.rotation.x=s*.55;RR.hip.rotation.x=-s*.55;LA.hip.rotation.x=-s*.48;RA.hip.rotation.x=s*.48;L.joint.rotation.x=Math.max(0,-s)*.62;RR.joint.rotation.x=Math.max(0,s)*.62;root.position.y=Math.abs(c)*.025;}else{phase=0;[L,RR,LA,RA].forEach(v=>{v.hip.rotation.x*=.78;v.joint.rotation.x*=.78});root.position.y*=.7}};
 return root;
}