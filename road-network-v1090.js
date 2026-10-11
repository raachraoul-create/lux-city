import * as T from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
let q=setInterval(()=>{if(!window.LuxWorld?.scene||!window.LuxWorld?.roads||!window.LuxWorld?.cars)return;clearInterval(q);init(window.LuxWorld)},140);
function init(W){
 const S=W.scene,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<900;
 const old=S.getObjectByName('LuxRoadNetwork1090');if(old)S.remove(old);
 // Hide the five rectangular legacy roads from game-core. They stay only as historical geometry references.
 for(const r of W.roads||[])if(r.mesh)r.mesh.visible=false;
 W.roads.length=0;
 const root=new T.Group();root.name='LuxRoadNetwork1090';S.add(root);
 const M=(c,r=.88,m=.02,e=0,ei=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e,emissiveIntensity:ei});
 const asphalt=M(0x303438,.94,.018),motorAsphalt=M(0x282d31,.91,.025),walk=M(0xb9b7b0,.94,.01),curb=M(0xbfc0bb,.88,.04),white=M(0xefede6,.68,.02),amber=M(0xdab54c,.68,.02),barrier=M(0x8f969a,.35,.54),grass=M(0x557348,.98,.01);
 const A=(g,m,x,y,z,p=root)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=true;p.add(o);return o};
 const roadPaths=[],trafficRoutes=[],junctions=[[-125,-132],[0,-132],[123,-126],[-125,132],[0,132],[124,137],[0,-315],[0,315]];
 function sample(ctrl,closed=false,step=5){
   const c=new T.CatmullRomCurve3(ctrl.map(p=>new T.Vector3(p[0],0,p[1])),closed,'centripetal',.5),len=Math.max(1,c.getLength()),n=Math.max(8,Math.ceil(len/step)),out=[];
   for(let i=0;i<(closed?n:n+1);i++){let p=c.getPointAt(i/n);out.push([p.x,p.z])}
   return out
 }
 function normalAt(pts,i){
   const a=pts[(i-1+pts.length)%pts.length],b=pts[(i+1)%pts.length],dx=b[0]-a[0],dz=b[1]-a[1],d=Math.hypot(dx,dz)||1;
   return [dz/d,-dx/d]
 }
 function offsetPath(pts,off,closed=true){
   return pts.map((p,i)=>{let a=i===0&&!closed?pts[0]:pts[(i-1+pts.length)%pts.length],b=i===pts.length-1&&!closed?pts[pts.length-1]:pts[(i+1)%pts.length],dx=b[0]-a[0],dz=b[1]-a[1],d=Math.hypot(dx,dz)||1;return[p[0]+dz/d*off,p[1]-dx/d*off]})
 }
 function ribbon(pts,width,mat,y=.085,closed=false,parent=root){
   const vs=[],idx=[],n=pts.length;
   for(let i=0;i<n;i++){
     let a=i===0&&!closed?pts[0]:pts[(i-1+n)%n],b=i===n-1&&!closed?pts[n-1]:pts[(i+1)%n],dx=b[0]-a[0],dz=b[1]-a[1],d=Math.hypot(dx,dz)||1,nx=dz/d,nz=-dx/d;
     vs.push(pts[i][0]+nx*width/2,y,pts[i][1]+nz*width/2,pts[i][0]-nx*width/2,y,pts[i][1]-nz*width/2)
   }
   const segs=closed?n:n-1;for(let i=0;i<segs;i++){let j=(i+1)%n,a=i*2,b=j*2;idx.push(a,a+1,b+1,a,b+1,b)}
   const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(vs,3));g.setIndex(idx);g.computeVertexNormals();const o=new T.Mesh(g,mat);o.receiveShadow=true;o.castShadow=false;parent.add(o);return o
 }
 function markSegments(pts,off=0,dashed=true,closed=false,mat=white,width=.11){
   const p=offsetPath(pts,off,closed),n=p.length,segs=closed?n:n-1;
   for(let i=0;i<segs;i++){
     if(dashed&&(i%3!==0))continue;let a=p[i],b=p[(i+1)%n],dx=b[0]-a[0],dz=b[1]-a[1],len=Math.hypot(dx,dz);if(len<.2)continue;
     let o=A(new T.BoxGeometry(width,.018,dashed?Math.min(len*.84,4.2):len+.15),mat,(a[0]+b[0])/2,.137,(a[1]+b[1])/2);o.rotation.y=Math.atan2(dx,dz)
   }
 }
 function pushRoadRecords(pts,width,kind,closed=false){
   const n=pts.length,segs=closed?n:n-1;
   for(let i=0;i<segs;i++){let a=pts[i],b=pts[(i+1)%n],dx=b[0]-a[0],dz=b[1]-a[1],len=Math.hypot(dx,dz);W.roads.push({x:(a[0]+b[0])/2,z:(a[1]+b[1])/2,w:width,l:len,rot:Math.atan2(dx,dz),curve:true,kind,highway:kind==='motorway',a,b})}
 }
 function cityRoad(name,ctrl,width=9.2,sidewalk=true,closed=false){
   const pts=sample(ctrl,closed,4.5);ribbon(pts,width,asphalt,.09,closed);markSegments(pts,0,true,closed,white,.10);
   if(sidewalk){
     for(const side of[-1,1]){
       const edge=offsetPath(pts,side*(width/2+1.15),closed);ribbon(edge,1.75,walk,.105,closed);
       markSegments(pts,side*(width/2+.18),false,closed,curb,.08)
     }
   }
   pushRoadRecords(pts,width,name,closed);roadPaths.push({name,pts,width,closed,kind:'city'});return pts
 }
 // Innenstadt: immer genau eine Spur pro Richtung, mit leichten natürlichen Kurven.
 const mainNS=cityRoad('hauptstrasse',[[-3,-315],[-7,-230],[-2,-145],[5,-55],[1,30],[-5,118],[3,205],[0,315]],9.4,true,false);
 const westNS=cityRoad('weststrasse',[[-124,-238],[-130,-170],[-122,-98],[-128,-20],[-119,58],[-127,140],[-123,238]],8.8,true,false);
 const eastNS=cityRoad('oststrasse',[[123,-238],[117,-168],[127,-92],[120,-8],[130,70],[121,148],[125,238]],8.8,true,false);
 const southEW=cityRoad('suedallee',[[-305,-130],[-220,-137],[-135,-131],[-45,-126],[48,-134],[142,-123],[225,-130],[305,-127]],9.0,true,false);
 const northEW=cityRoad('nordallee',[[-305,136],[-220,128],[-132,134],[-42,139],[52,129],[145,139],[225,132],[305,136]],9.0,true,false);
 // Ungleichmäßiger, gerundeter Stadtring statt rechteckigem Raster.
 const ringCtrl=[[-205,-320],[-50,-314],[112,-326],[252,-302],[326,-225],[344,-85],[337,75],[304,220],[212,302],[62,321],[-92,314],[-232,292],[-318,206],[-341,64],[-333,-92],[-298,-238]];
 const ring=cityRoad('stadtring',ringCtrl,10.0,true,true);
 // Zwei verständliche, geschwungene Autobahnzubringer.
 const westFeed=cityRoad('zubringer-west',[[-205,-318],[-232,-341],[-260,-365],[-292,-386],[-325,-398]],7.2,false,false);
 const eastFeed=cityRoad('zubringer-ost',[[210,-316],[235,-337],[266,-357],[300,-375],[330,-389]],7.2,false,false);
 // Tankstellen-Servicezufahrt: eigenes Grundstück, nicht Teil einer Durchgangsfahrbahn.
 const stationDrive=cityRoad('tankstelle-zufahrt',[[267,-356],[290,-348],[315,-343],[332,-349]],6.5,false,false);

 // Autobahn: klarer geteilter Außenring, 2 Spuren pro Richtung, Mittelstreifen.
 const mwCtrl=[[-330,-397],[-425,-310],[-475,-120],[-466,90],[-390,290],[-210,410],[20,438],[235,404],[405,275],[472,70],[456,-155],[365,-340],[170,-430],[-75,-438]];
 const mw=sample(mwCtrl,true,6.0),carriage=7.4,sep=4.8;
 for(const side of[-1,1]){
   const cp=offsetPath(mw,side*sep,true);ribbon(cp,carriage,motorAsphalt,.105,true);markSegments(cp,0,true,true,white,.11);
   markSegments(cp,side*(carriage/2-.35),false,true,white,.10);
   // innere Begrenzung am Mittelstreifen
   markSegments(cp,-side*(carriage/2-.35),false,true,amber,.11);
   pushRoadRecords(cp,carriage,'motorway',true)
 }
 roadPaths.push({name:'autobahn',pts:mw,width:carriage*2+sep*2,closed:true,kind:'motorway'});
 // Mittelgrün + Leitplanke, sparsam auf Mobilgeräten.
 const median=offsetPath(mw,0,true);ribbon(median,2.6,grass,.075,true);
 const barrierPts=offsetPath(mw,0,true);for(let i=0;i<barrierPts.length;i+=(mobile?5:3)){let p=barrierPts[i],n=normalAt(barrierPts,i),g=A(new T.BoxGeometry(.15,.45,2.1),barrier,p[0],.32,p[1]);let j=barrierPts[(i+1)%barrierPts.length];g.rotation.y=Math.atan2(j[0]-p[0],j[1]-p[1])}

 // Nur echte Kreuzungsflächen; keine zufälligen Zebrastreifen.
 for(const [x,z] of junctions){let p=A(new T.CircleGeometry(8.3,24),asphalt,x,.125,z);p.rotation.x=-Math.PI/2}

 // Verkehrsrouten: rechter Fahrstreifen je Fahrtrichtung.
 function addLoop(ctrl,speed,kind,lane=2.15){
   let c=sample(ctrl,true,4.5),f=offsetPath(c,lane,true),rev=[...c].reverse(),b=offsetPath(rev,lane,true);
   trafficRoutes.push({points:f,speed,kind},{points:b,speed,kind})
 }
 addLoop([[0,-130],[0,132],[124,137],[125,-126]],5.3,'city');
 addLoop([[0,-130],[0,132],[-125,132],[-125,-132]],5.2,'city');
 addLoop(ringCtrl,6.3,'ring',2.25);
 // Autobahn: zwei Spuren pro Richtung.
 const mwRev=[...mw].reverse();
 for(const off of[3.0,6.35])trafficRoutes.push({points:offsetPath(mw,off,true),speed:9.2+(off>5?0.7:0),kind:'motorway'});
 for(const off of[3.0,6.35])trafficRoutes.push({points:offsetPath(mwRev,off,true),speed:9.2+(off>5?0.7:0),kind:'motorway'});

 // Deutlich mehr Verkehr, aber ohne Kasten-Klon direkt im Straßenmodul.
 const extraColors=[0x244f78,0xa23d3b,0xe8e6df,0x262b30,0x50724d,0xc28b37,0x6c4f83,0xb9b5ab,0x1f6b68,0xcf6a34,0x6f1f36,0x8da2b0];
 function trafficSeed(i){const g=new T.Group();g.userData={speed:5.0+(i%5)*.5,r:2.35,halfW:1.0,halfL:2.2,roadNetwork1090:true,seedColor:extraColors[i%extraColors.length]};g.visible=true;S.add(g);W.cars.push(g);return g}
 const addCount=mobile?12:24;for(let i=0;i<addCount;i++)trafficSeed(i);

 // Kurvenbasierte Fahrbahnprüfung, damit Bäume/Gebäude/Deko nicht auf die neue Straße gesetzt werden.
 const allSurfaces=[...roadPaths.map(r=>({pts:r.pts,width:r.width,closed:r.closed})),{pts:offsetPath(mw,sep,true),width:carriage,closed:true},{pts:offsetPath(mw,-sep,true),width:carriage,closed:true}];
 function segDist(px,pz,a,b){let dx=b[0]-a[0],dz=b[1]-a[1],l2=dx*dx+dz*dz||1,t=((px-a[0])*dx+(pz-a[1])*dz)/l2;t=Math.max(0,Math.min(1,t));return Math.hypot(px-(a[0]+dx*t),pz-(a[1]+dz*t))}
 W.onRoad=(x,z,pad=5)=>{for(const r of allSurfaces){let n=r.pts.length,segs=r.closed?n:n-1;for(let i=0;i<segs;i++)if(segDist(x,z,r.pts[i],r.pts[(i+1)%n])<=r.width/2+pad)return true}return false};

 // Klare Autobahnbeschilderung statt Schild-Chaos.
 function sign(text,sub,x,z,rot=0){
   const c=document.createElement('canvas');c.width=760;c.height=250;let cx=c.getContext('2d');cx.fillStyle='#23543c';cx.fillRect(0,0,760,250);cx.strokeStyle='#fff';cx.lineWidth=10;cx.strokeRect(10,10,740,230);cx.fillStyle='#fff';cx.textAlign='center';cx.font='900 54px Arial';cx.fillText(text,380,96);cx.font='700 31px Arial';cx.fillText(sub,380,164);let tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;
   let g=new T.Group();g.position.set(x,0,z);g.rotation.y=rot;root.add(g);for(const sx of[-1,1])A(new T.CylinderGeometry(.07,.09,5.5,8),barrier,sx*3.4,2.75,0,g);A(new T.PlaneGeometry(7.1,2.3),new T.MeshBasicMaterial({map:tx,toneMapped:false}),0,5.15,0,g)
 }
 sign('A-LUX 1','WEST · ZENTRUM',-300,-392,Math.PI*.08);sign('A-LUX 1','OST · TANKEN/LADEN',315,-382,-Math.PI*.10);

 window.LuxRoadNetwork1090=window.LuxRoadNetwork1100=window.LuxRoadNetwork1200={version:'12.0.0',root,roadPaths,trafficRoutes,junctions,station:{x:350,z:-350,drive:stationDrive},motorway:mw,addedCars:addCount}
}
