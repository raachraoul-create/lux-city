const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),cp=require('node:child_process');
function collision(source,W,buildings){let start;const window={LuxWorld:W,LuxCityServices:{buildings}};vm.runInNewContext(source,{window,LuxWorld:W,setInterval(fn){start=fn;return 1},clearInterval(){},performance:{now:()=>0}});start();return window.LuxCollision500}
let seed=1232;const rnd=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
const W={obstacles:[],houseSites:[],cars:[],npcs:[]},buildings=[];
for(let i=0;i<4000;i++)W.obstacles.push({x:rnd()*1200-700,z:rnd()*1200-500,r:.3+rnd()*2});
for(let i=0;i<100;i++)W.houseSites.push({x:rnd()*800-400,z:rnd()*800-400,w:5+rnd()*18,d:5+rnd()*18,rot:rnd()*Math.PI});
for(let i=0;i<20;i++)buildings.push({x:rnd()*800-400,z:rnd()*800-400,w:10,l:12});
const old=collision(cp.execFileSync('git',['show','61901e2:collision-v500.js'],{encoding:'utf8'}),W,buildings);
const current=collision(fs.readFileSync('collision-v500.js','utf8'),W,buildings);
const queries=Array.from({length:6000},()=>[rnd()*1500-800,rnd()*1500-600,rnd()*3]);
for(const args of queries)assert.equal(current.blockedStatic(...args),old.blockedStatic(...args),'Collision differs at '+args);
W.obstacles.push({x:1300,z:1300,r:10});assert.equal(current.blockedStatic(1300,1300),true,'New obstacle must be indexed immediately');
W.obstacles=W.obstacles.filter(o=>o.x!==1300);assert.equal(current.blockedStatic(1300,1300),false,'Removed obstacle must not remain');
W.obstacles[0]={x:1300,z:1300,r:10};current.invalidate();assert.equal(current.blockedStatic(1300,1300),true);
for(let i=0;i<100;i++){const args=[rnd()*100-50,rnd()*100-50,rnd()*100-50,rnd()*100-50,.7,{dynamic:false}];assert.deepEqual(JSON.parse(JSON.stringify(current.swept(...args))),JSON.parse(JSON.stringify(old.swept(...args))))}
const measure=api=>{const t=performance.now();for(const args of queries)api.blockedStatic(...args);return performance.now()-t};
const oldMs=measure(old),newMs=measure(current);
console.log(`PASS: 6000 static and 100 swept collision comparisons; obstacle insertion/removal. Benchmark: ${oldMs.toFixed(1)} ms -> ${newMs.toFixed(1)} ms (${(oldMs/newMs).toFixed(1)}x).`);

const src=fs.readFileSync('render-budget-v1232.js','utf8').replace('export function','function');
let install;const context={window:{LuxSmooth1080:{quality:'balanced'}},capture:f=>install=f};vm.runInNewContext(src+';capture(installRenderBudget)',context);
const lights=Array.from({length:60},(_,i)=>({isPointLight:true,visible:true,intensity:i===0?0:1,distance:10,getWorldPosition(p){p.x=i<15?i:500+i;p.y=2;p.z=0}}));
const hidden={isPointLight:true,visible:false,intensity:1};lights.push(hidden);
const scene={traverseVisible(fn){lights.filter(l=>l.visible).forEach(fn)}},camera={position:{x:0,y:2,z:0}};
let throwRender=false,renders=0;
const renderer={render(){renders++;const active=lights.filter(l=>l.visible);assert.equal(active.length,context.window.LuxSmooth1080.quality==='low'?6:8);assert.equal(lights[0].visible,false);assert.equal(lights[40].visible,false);if(throwRender)throw Error('test render failure')}};
install({renderer,THREE:{Vector3:class{}}});renderer.render(scene,camera);
assert.equal(lights.filter(l=>l.visible).length,60);assert.equal(hidden.visible,false);
context.window.LuxSmooth1080.quality='low';renderer.render(scene,camera);
throwRender=true;assert.throws(()=>renderer.render(scene,camera));assert.equal(lights.filter(l=>l.visible).length,60);
assert.equal(renders,3);console.log('PASS: local-light budget, distance and inactive-light filtering, original visibility restored even after render errors.');
