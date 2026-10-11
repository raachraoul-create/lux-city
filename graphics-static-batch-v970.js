import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
// Batch only static decoration owned by the graphics modules, in small spatial cells.
export function batchStatic(root){
  root.updateWorldMatrix(true,true);
  const inverse=root.matrixWorld.clone().invert(),groups=new Map(),position=new T.Vector3();
  root.traverse(o=>{
    if(!o.isMesh||o.isInstancedMesh||o.userData.keepIndividual||!o.visible||!o.geometry?.parameters)return;
    const m=o.material;if(Array.isArray(m)||m.transparent||m.isShaderMaterial)return;
    o.getWorldPosition(position);
    const key=[Math.floor(position.x/70),Math.floor(position.z/70),m.uuid,o.geometry.type,JSON.stringify(o.geometry.parameters),o.castShadow,o.receiveShadow].join('|');
    if(!groups.has(key))groups.set(key,[]);groups.get(key).push(o);
  });
  let removed=0,batches=0;const matrix=new T.Matrix4();
  for(const meshes of groups.values()){
    if(meshes.length<4)continue;
    const first=meshes[0],inst=new T.InstancedMesh(first.geometry,first.material,meshes.length);
    inst.name='StaticDetailBatch970';inst.castShadow=first.castShadow;inst.receiveShadow=first.receiveShadow;
    meshes.forEach((o,i)=>{matrix.multiplyMatrices(inverse,o.matrixWorld);inst.setMatrixAt(i,matrix);});
    inst.instanceMatrix.needsUpdate=true;inst.computeBoundingBox();inst.computeBoundingSphere();root.add(inst);
    for(const o of meshes)o.removeFromParent();removed+=meshes.length;batches++;
  }
  return {batchedMeshes:removed,batches,drawCallsSaved:removed-batches};
}
