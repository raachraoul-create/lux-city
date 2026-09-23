(()=>{let q=setInterval(()=>{if(!window.LuxWorld?.npcs?.length||!window.LuxLife||!window.LuxSystems330?.doors)return;clearInterval(q);const W=LuxWorld,D=LuxSystems330.doors;
const jobMap={Bäcker:'bakery',Verkäuferin:'bakery',Fahrer:'post',Barista:'cafe',Pflegekraft:'hospital',Mechaniker:'fire',Büroangestellte:'townhall',Lagerist:'bottler',Kellnerin:'pub',Elektriker:'housing',Erzieherin:'townhall',Postmitarbeiter:'post'};
const leisureIds=['cafe','pub','colosseum'],homeAnchors=[[-132,-205],[132,-205],[-132,205],[132,205],[-11,-270],[11,270],[-165,142],[165,-142]];
function around(x,z,r=3.4){return[[x-r,z],[x,z-r],[x+r,z],[x,z+r]]}
function phase(h){if(h<5.5)return'home';if(h<8)return'commute';if(h<12)return'work';if(h<14)return'lunch';if(h<17.5)return'work';if(h<20.5)return'leisure';if(h<22.5)return'commuteHome';return'home'}
function routeFor(p,i,ph){let home=homeAnchors[i%homeAnchors.length],job=p.userData.citizenJob||'',workId=jobMap[job]||['bakery','post','townhall','hospital'][i%4],wd=D[workId]||{x:0,z:0},lid=leisureIds[i%leisureIds.length],ld=D[lid]||{x:0,z:0};
if(ph==='home')return around(home[0],home[1],2.3);
if(ph==='work')return around(wd.x,wd.z-4.2,2.6);
if(ph==='lunch')return around(0,(i%2?92:-92),5.0);
if(ph==='leisure')return around(ld.x,ld.z-4.2,3.2);
let from=ph==='commute'?home:[wd.x,wd.z-5],to=ph==='commute'?[wd.x,wd.z-5]:home,mid1=[from[0],0],mid2=[0,to[1]];return[from,mid1,mid2,to]}
function apply(p,i,ph){p.userData.dailyPhase730=ph;p.userData.route=routeFor(p,i,ph);p.userData.routeIndex=0;p.userData.pause=0;p.userData.pauseEvery=ph==='work'?4:ph==='leisure'?3:6;p.userData.walkSpeed=(ph==='commute'||ph==='commuteHome')?1.30:ph==='work'?0.80:1.02}
let current='';function update(){let h=(+LuxLife.state.hour||0)+(+LuxLife.state.minute||0)/60,ph=phase(h);if(ph!==current){current=ph;W.npcs.forEach((p,i)=>apply(p,i,ph))}for(let [i,p] of W.npcs.entries()){let own=p.userData.dailyPhase730||ph;if(own==='home'){p.visible=false;p.userData.insideHome730=true}else{p.userData.insideHome730=false;if(own==='work'){let job=p.userData.citizenJob||'',id=jobMap[job];if(id&&window.LuxOpeningHours500&&!LuxOpeningHours500.isStaffed(id))p.visible=false}}}}
setInterval(update,600);update();W.registerTick(()=>{let h=(+LuxLife.state.hour||0)+(+LuxLife.state.minute||0)/60,ph=phase(h);if(ph!==current)update();for(let p of W.npcs){if(p.userData.insideHome730)p.visible=false}});
window.LuxCitizenRoutines730={phase,routeFor,get current(){return current}}},520)})();