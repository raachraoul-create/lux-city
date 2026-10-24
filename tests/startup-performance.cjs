const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const read = name => fs.readFileSync(name, 'utf8');
(async () => {
  const core = read('game-core-v711.js');
  const gate = core.slice(core.indexOf('await new Promise'), core.indexOf('const perfMobile='));
  let ready = false, observer, disconnected = 0, builds = 0;
  const document = {body:{classList:{contains:()=>ready}}, hidden:false};
  const ctx = {document, MutationObserver:class {
    constructor(cb){ observer = cb; }
    observe(){}
    disconnect(){ disconnected++; }
  }, build:()=>builds++};
  const pending = vm.runInNewContext('(async()=>{' + gate + 'build()})()',ctx);
  await Promise.resolve();
  assert.equal(builds,0,'No world construction before entry');
  observer(); await Promise.resolve();
  assert.equal(builds,0,'Unrelated class changes must not start the game');
  ready=true; observer(); await pending;
  assert.equal(builds,1); assert.equal(disconnected,1);
  await vm.runInNewContext('(async()=>{' + gate + 'build()})()',ctx);
  assert.equal(builds,2,'An already entered session must not wait forever');

  const prefix=core.slice(core.indexOf('function loop(t){'),core.indexOf('let dt=',core.indexOf('function loop(t){')));
  let rendered=0;
  const frame=vm.createContext({document,requestAnimationFrame:()=>{},render:()=>rendered++});
  vm.runInContext('let last=0;'+prefix+'last=t;render()}',frame);
  document.hidden=true; vm.runInContext('loop(100)',frame); assert.equal(rendered,0);
  document.hidden=false; ready=false; vm.runInContext('loop(200)',frame); assert.equal(rendered,0);
  ready=true; vm.runInContext('loop(220)',frame); assert.equal(rendered,1);
  vm.runInContext('loop(224)',frame); assert.equal(rendered,1,'High refresh displays must not render every callback');
  vm.runInContext('loop(240)',frame); assert.equal(rendered,2);

  let init, tick, now=0, ratioCalls=0;
  const world={renderer:{shadowMap:{enabled:true},setPixelRatio(){ratioCalls++},setSize(){}},sun:{},player:{position:{x:0,z:0}},registerTick(fn){tick=fn}};
  const context={window:{LuxWorld:world},LuxWorld:world,matchMedia:()=>({matches:false}),innerWidth:1920,innerHeight:1080,devicePixelRatio:2,performance:{now:()=>now},setInterval(fn){init=fn;return 1},clearInterval(){}};
  vm.runInNewContext(read('performance-v740.js'),context); init();
  assert.equal(world.renderer.shadowMap.enabled,false,'Desktop fallback must not enable shadows');
  const calls=[]; context.window.LuxSmooth1080={quality:'balanced',lastFps:60,apply(level){calls.push(level)}};
  const baseline=ratioCalls;
  for(let i=0;i<100;i++){now+=3000;tick()}
  assert.equal(ratioCalls,baseline,'Legacy FPS loop must stop changing renderer settings');
  assert.equal(context.window.LuxPerformance740.quality,'medium');
  context.window.LuxPerformance740.apply('medium');
  context.window.LuxPerformance740.apply('low');
  assert.deepEqual(calls,['balanced','low']);
  assert.equal(ratioCalls,baseline);
  console.log('PASS: deferred world startup, session resume, hidden/login pause, frame limit, single quality controller');
})().catch(error=>{console.error(error);process.exitCode=1});
