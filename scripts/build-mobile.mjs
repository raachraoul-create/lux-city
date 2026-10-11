import fs from 'node:fs';import path from 'node:path';
const root=process.cwd(),dist=path.join(root,'dist'),allowed=new Set(['.html','.js','.css','.json','.webmanifest','.svg','.png','.jpg','.jpeg','.webp','.woff','.woff2']);
fs.rmSync(dist,{recursive:true,force:true});fs.mkdirSync(dist,{recursive:true});
const skip=new Set(['node_modules','dist','android','ios','.git','.github','scripts']);
function copyDir(src,dst){
 for(const e of fs.readdirSync(src,{withFileTypes:true})){
  if(skip.has(e.name))continue;
  const s=path.join(src,e.name),d=path.join(dst,e.name);
  if(e.isDirectory()){fs.mkdirSync(d,{recursive:true});copyDir(s,d);continue}
  if(!allowed.has(path.extname(e.name).toLowerCase()))continue;
  fs.mkdirSync(path.dirname(d),{recursive:true});fs.copyFileSync(s,d)
 }
}
copyDir(root,dist);
console.log('Lux City mobile web bundle ready:',dist);
