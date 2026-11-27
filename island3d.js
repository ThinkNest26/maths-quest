/* Treasure Island 3D for Maths Quest. Loaded by adventures.js when a child opens Treasure Island.
   A real 3D island (three.js) built with Kenney's Pirate Kit (CC0, www.kenney.nl).
   Same adventure as before: find the 3 golden chests, answer the question inside to get a key,
   open the 3 gates and dig up the Captain's treasure at Skull Rock.
   If the device can't show 3D, the 2D island (island-game.js) opens instead. */
import * as THREE from './lib3d/three.module.min.js';
import {GLTFLoader} from './lib3d/GLTFLoader.js';

const MP='models/pirate/';
const CSS="#fgw #fg-wrap{position:fixed;inset:0;display:flex;align-items:center;justify-content:center}\n#fgw #fg-stage{position:relative;width:min(100vw,calc(100vh*16/9));aspect-ratio:16/9;font-size:min(1.6vw,2.85vh)}\n#fgw canvas{width:100%;height:100%;display:block;border-radius:14px}\n#fgw .fg-hud{position:absolute;top:2%;left:2%;display:flex;gap:.6em;align-items:center;pointer-events:none}\n#fgw .fg-pill{background:rgba(255,255,255,.93);border-radius:999px;padding:.35em .9em;font-weight:700;font-size:1.25em;color:#3B2A00;box-shadow:0 3px 0 rgba(0,0,0,.2)}\n#fgw .fg-goal{position:absolute;top:10.5%;left:50%;transform:translateX(-50%);background:rgba(20,60,35,.88);color:#FFE08A;border-radius:999px;padding:.35em 1.1em;font-weight:600;font-size:1.15em;white-space:nowrap;box-shadow:0 3px 0 rgba(0,0,0,.25)}\n#fgw #fg-mapbtn{position:absolute;top:2%;right:2%;border:0;border-radius:18px;background:#F4E3B5;border:3px solid #B98B4A;color:#5A3D00;font-family:inherit;font-weight:700;font-size:1.2em;padding:.3em .8em;box-shadow:0 4px 0 #8A6230;cursor:pointer}\n#fgw #fg-mini{position:absolute;top:11%;right:2%;width:20%;height:auto!important;border-radius:10px;border:3px solid #B98B4A;background:#F4E3B5;box-shadow:0 4px 10px rgba(0,0,0,.35)}\n#fgw .fg-pad{position:absolute;left:2%;bottom:3%;width:19%;aspect-ratio:1;display:grid;grid-template:repeat(3,1fr)/repeat(3,1fr);gap:4%}\n#fgw .fg-pad button{border:0;border-radius:22%;background:rgba(255,255,255,.55);font-size:2.2em;color:#1E5B3A;font-weight:700;box-shadow:0 4px 0 rgba(0,0,0,.25);touch-action:none}\n#fgw .fg-pad button.fg-on{background:rgba(255,224,138,.9);transform:translateY(2px)}\n#fgw #fg-act{position:absolute;right:3%;bottom:5%;width:13%;aspect-ratio:1;border-radius:50%;border:0;background:rgba(255,201,60,.9);color:#5A3D00;font-family:inherit;font-weight:700;font-size:1.4em;box-shadow:0 5px 0 #B7791F;display:none;touch-action:none}\n#fgw .fg-ov{position:absolute;inset:0;border-radius:14px;display:flex;align-items:center;justify-content:center;background:rgba(5,25,14,.72)}\n#fgw .fg-ov[hidden]{display:none}\n#fgw .fg-card{background:#FFFBEA;border:5px solid #FFC93C;border-radius:26px;box-shadow:0 10px 0 #D9A21A,0 20px 40px rgba(0,0,0,.4);padding:1.4em 1.8em;text-align:center;max-width:72%;color:#16323A;animation:fgpop .45s cubic-bezier(.2,1.6,.4,1)}\n@keyframes fgpop{from{transform:scale(.3);opacity:0}}\n#fgw .fg-card .fg-big{font-size:4em;line-height:1;animation:fgwob 1s infinite alternate}\n#fgw .fg-card .fg-big img{display:block;margin:0 auto;height:1.4em!important}\n#fgw .fg-card .fg-owlrow{display:flex;align-items:center;gap:.8em;text-align:left}\n#fgw .fg-card .fg-owlrow img{flex:none}\n@keyframes fgwob{to{transform:rotate(6deg) scale(1.06)}}\n#fgw .fg-card h2{margin:.2em 0;font-size:1.9em;color:#1E5B3A}\n#fgw .fg-card .fg-q{font-size:2.1em;font-weight:600;margin:.4em 0 .6em;line-height:1.2}\n#fgw .fg-ans{display:grid;grid-template-columns:repeat(2,1fr);gap:.6em}\n#fgw .fg-ans button,#fgw .fg-card .fg-go{font-family:inherit;font-weight:700;font-size:1.7em;border:0;border-radius:18px;padding:.4em .8em;background:#FFC93C;color:#5A3D00;box-shadow:0 5px 0 #D9A21A;cursor:pointer}\n#fgw .fg-ans button.fg-bad{background:#D6D0C4;color:#8B867A;box-shadow:0 5px 0 #A9A396;animation:fgshake .4s}\n#fgw .fg-ans button.fg-good{background:#2DBE6C;color:#fff;box-shadow:0 5px 0 #1E8A4C}\n@keyframes fgshake{25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}\n#fgw .fg-card .fg-say{border:0;background:#E0F4FF;border-radius:99px;font-size:1.2em;padding:.2em .7em;cursor:pointer;font-family:inherit;font-weight:700;color:#0B5C7A}\n#fgw .fg-card .fg-fb{min-height:1.4em;font-weight:600;font-size:1.2em;margin-top:.5em;color:#B54708}\n#fgw .fg-card p{font-size:1.35em;margin:.4em 0}\n#fgw .fg-parch{max-height:96%;display:flex;flex-direction:column;align-items:center;background:var(--paper) center/100% 100% no-repeat;filter:drop-shadow(0 14px 30px rgba(0,0,0,.5));padding:3.5% 9% 6% 6%;text-align:center;color:#5A3D00;max-width:86%;animation:fgunroll .7s ease-out}\n@keyframes fgunroll{from{transform:scaleY(.05);opacity:.3}}\n#fgw .fg-parch h1{margin:0 0 .2em;font-size:2.4em;color:#7A3E1A}\n#fgw .fg-parch p{margin:.2em 0;font-size:1.3em}\n#fgw .fg-parch canvas{width:100%;height:auto;min-height:0;flex:1 1 auto;object-fit:contain;border-radius:10px;border:2px dashed #B98B4A;margin:.4em 0}\n#fgw .fg-parch .fg-row{display:flex;gap:.7em;justify-content:center;align-items:center;flex-wrap:wrap}\n#fgw .fg-parch select,#fgw .fg-parch .fg-go{font-family:inherit;font-size:1.5em;border-radius:999px;border:0;padding:.3em 1.1em;font-weight:700}\n#fgw .fg-parch .fg-go{background:#2DBE6C;color:#fff;box-shadow:0 5px 0 #1E8A4C;cursor:pointer}\n#fgw .fg-toast{position:absolute;left:50%;top:22%;transform:translateX(-50%);background:rgba(0,0,0,.65);color:#fff;font-weight:600;font-size:1.4em;padding:.4em 1.2em;border-radius:999px;pointer-events:none;white-space:nowrap;transition:opacity .4s}\n#fgw{position:fixed;inset:0;z-index:60;background:#0B2216;font-family:Fredoka,'Trebuchet MS',sans-serif;overflow:hidden;touch-action:none;user-select:none;-webkit-user-select:none}\n#fgw *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}\n#fgw button{transition:none;line-height:1.2}\n#fgw .fg-pad button{padding:0}\n#fgw #fg-exit{position:absolute;top:2%;right:13%;border:0;border-radius:18px;background:rgba(255,255,255,.9);color:#1E5B3A;font-family:inherit;font-weight:700;font-size:1.2em;padding:.3em .8em;box-shadow:0 4px 0 rgba(0,0,0,.25);cursor:pointer}\n#fgw .fg-parch .fg-row .fg-sub{background:#fff;color:#1E5B3A;box-shadow:0 5px 0 #B98B4A}\nbody.fgon{overflow:hidden}\nbody.fgon .party,body.fgon .burst{z-index:80}body.fgon .cheer{z-index:85}\nbody.fgon .advov{z-index:75}\nbody.fgon .advcard .se img{height:96px;display:block;margin:0 auto}\n"+`
#fgw #fg-3d{position:absolute;inset:0;border-radius:14px;overflow:hidden;background:#8FD3F2}
#fgw #fg-3d canvas{width:100%!important;height:100%!important;border-radius:14px}
#fgw .fg-load{color:#fff;font-size:1.6em;font-weight:700;text-align:center}
#fgw .fg-load .bar{width:16em;height:.7em;background:rgba(255,255,255,.25);border-radius:99px;margin:.6em auto 0;overflow:hidden}
#fgw .fg-load .bar i{display:block;height:100%;width:0;background:#FFC93C;border-radius:99px;transition:width .2s}
`;
const HTML=`<div id="fg-wrap"><div id="fg-stage">
 <div id="fg-3d"></div>
 <div class="fg-hud"><span class="fg-pill" id="fg-hearts">❤️❤️❤️</span><span class="fg-pill" id="fg-coins">🪙 0</span><span class="fg-pill" id="fg-gems">💎 0</span><span class="fg-pill" id="fg-keys">🗝️ 0/4</span></div>
 <div class="fg-goal" id="fg-goal"></div>
 <button id="fg-exit">✕ Exit</button>
 <button id="fg-mapbtn">🗺️ Map</button>
 <canvas id="fg-mini" width="240" height="150"></canvas>
 <div class="fg-pad"><span></span><button data-d="u">▲</button><span></span><button data-d="l">◀</button><span></span><button data-d="r">▶</button><span></span><button data-d="d">▼</button><span></span></div>
 <button id="fg-act">Open</button>
 <div class="fg-toast" id="fg-toast" style="opacity:0"></div>
 <div class="fg-ov" id="fg-ov"></div>
</div></div>`;
const IMGSRC={};['gold','goldOpen','heroKey','surpOpen','owl','scroll','mapPaper','key'].forEach(k=>IMGSRC[k]='img/forest/'+k+'.webp?v=1');
const pic=(k,h,st='')=>`<img src="${IMGSRC[k]}" style="height:${h}em;${st}" alt="">`;
const $=id=>document.getElementById(id);
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)];
const fmt=n=>n.toLocaleString('en-GB');
let grade=3;

/* ---------- sound ---------- */
let AC=null;function snd(k){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const t=AC.currentTime;
 const tone=(f,d,w,v,at=0,f2)=>{const o=AC.createOscillator(),g=AC.createGain();o.type=w;o.frequency.setValueAtTime(f,t+at);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+at+d);g.gain.setValueAtTime(v,t+at);g.gain.exponentialRampToValueAtTime(.001,t+at+d);o.connect(g);g.connect(AC.destination);o.start(t+at);o.stop(t+at+d)};
 ({open:()=>{tone(300,.12,'square',.05);tone(500,.12,'square',.05,.1);tone(800,.3,'triangle',.08,.2)},
   right:()=>[523,659,784,1047].forEach((f,i)=>tone(f,.2,'triangle',.12,i*.09)),
   wrong:()=>tone(220,.3,'sawtooth',.06,0,130),
   coin:()=>{tone(988,.08,'square',.05);tone(1319,.15,'square',.05,.07)},
   hurt:()=>tone(300,.3,'square',.07,0,90),
   gate:()=>{tone(120,.6,'sawtooth',.05,0,240);[659,784,988].forEach((f,i)=>tone(f,.25,'triangle',.1,.3+i*.12))},
   step:()=>tone(90+Math.random()*30,.05,'triangle',.03),
   map:()=>tone(440,.4,'sine',.05,0,880),
   dig:()=>[0,.2,.4].forEach(a=>tone(110,.12,'sawtooth',.06,a,70)),
   win:()=>[523,659,784,1047,784,1047,1319,1568].forEach((f,i)=>tone(f,.25,'triangle',.12,i*.12))})[k]()}catch(e){}}
function say0(t){if(!('speechSynthesis' in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t.replace(/×/g,' times ').replace(/÷/g,' divided by ').replace(/−/g,' minus ').replace(/\?/g,''));u.lang='en-GB';u.rate=.9;
 const v=speechSynthesis.getVoices();u.voice=v.find(x=>/kate|serena|female/i.test(x.name)&&x.lang.startsWith('en'))||v.find(x=>x.lang==='en-GB')||null;speechSynthesis.speak(u)}

/* ---------- maths, tips, facts and voice lines (same as the 2D island) ---------- */
function opts(ans,spread,n=4){const s=new Set([ans]);let k=0;while(s.size<n&&k++<80){const v=ans+pick([-1,1])*R(1,3)*spread;if(v>=0||ans<0)s.add(v)}let i=1;while(s.size<n)s.add(ans+spread*(i++)*7);return [...s].sort(()=>Math.random()-.5)}
const QB={
 1:[()=>{const a=R(2,10),b=R(2,9);return[`${a} + ${b} = ?`,a+b,1]},()=>{const a=R(10,20),b=R(2,9);return[`${a} − ${b} = ?`,a-b,1]},()=>{const a=R(11,40),b=R(2,9);return[`${a} + ${b} = ?`,a+b,1]},()=>{const n=R(2,10);return[`Double ${n} is…`,2*n,2]},()=>{const n=R(2,10)*2;return[`Half of ${n} is…`,n/2,1]}],
 2:[()=>{const a=R(12,60),b=R(11,30);return[`${a} + ${b} = ?`,a+b,10]},()=>{const a=R(40,99),b=R(11,35);return[`${a} − ${b} = ?`,a-b,10]},()=>{const k=pick([2,5,10]),n=R(2,12);return[`${n} × ${k} = ?`,n*k,k]},()=>{const k=pick([2,5,10]),n=R(2,10);return[`${n*k} ÷ ${k} = ?`,n,1]},()=>{const a=R(20,60),b=R(5,30);return[`${a} + ? = ${a+b}`,b,5]}],
 3:[()=>{const a=R(120,600),b=R(110,350);return[`${a} + ${b} = ?`,a+b,100]},()=>{const a=R(400,950),b=R(110,380);return[`${a} − ${b} = ?`,a-b,100]},()=>{const k=pick([3,4,8]),n=R(2,12);return[`${n} × ${k} = ?`,n*k,k]},()=>{const k=pick([3,4,8]),n=R(2,12);return[`${n*k} ÷ ${k} = ?`,n,1]},()=>{const a=R(300,900),b=R(20,150);return[`${a} − ? = ${a-b}`,b,10]}],
 4:[()=>{const k=R(6,12),n=R(6,12);return[`${n} × ${k} = ?`,n*k,n]},()=>{const a=R(12,99),n=R(3,9);return[`${a} × ${n} = ?`,a*n,10]},()=>{const a=R(1200,6000),b=R(1100,3500);return[`${fmt(a)} + ${fmt(b)} = ?`,a+b,100]},()=>{const k=R(6,12),n=R(3,12);return[`${n*k} ÷ ${k} = ?`,n,1]},()=>{const a=R(5000,9800),b=R(1200,4500);return[`${fmt(a)} − ${fmt(b)} = ?`,a-b,100]}],
 5:[()=>{const a=R(120,450),n=R(3,9);return[`${a} × ${n} = ?`,a*n,10]},()=>{const a=R(12,35),b=R(11,25);return[`${a} × ${b} = ?`,a*b,10]},()=>{const n=R(3,9),q=R(12,99);return[`${n*q} ÷ ${n} = ?`,q,1]},()=>{const a=R(2,9),b=R(2,9),c=R(2,6);return[`(${a} + ${b}) × ${c} = ?`,(a+b)*c,c]},()=>{const a=R(12000,60000),b=R(11000,35000);return[`${fmt(a)} + ${fmt(b)} = ?`,a+b,1000]}]};
function makeQ(){const [q,a,s]=pick(QB[grade])();return{q,a,o:opts(a,s)}}
const TIPS={1:['To add 9, add 10 and take away 1!','Doubles are quick: double 6 is 12.','Number bonds to 10: 3 and 7, 4 and 6, 5 and 5.'],
 2:['To add 19, add 20 and take away 1.','Multiplying by 10? Every digit moves one place to the left.','Division is sharing into equal groups.'],
 3:['Check a subtraction by adding the answer back on.','To multiply by 4, double and then double again!','To multiply by 8, double, double and double again!'],
 4:['9 times table trick: the digits of the answer add up to 9. 9 × 4 = 36.','To multiply by 5, multiply by 10 and then halve it.','Use the inverse: if 7 × 8 = 56, then 56 ÷ 8 = 7.'],
 5:['Brackets first! In (3 + 4) × 2, add first, then multiply.','To multiply by 25, multiply by 100 and divide by 4.','A number divides by 3 if its digits add up to a multiple of 3.']};
const FACTS=['Pirates shared their treasure in equal parts. That is division!','Pieces of eight were silver coins worth 8 smaller coins.','The equals sign was invented in 1557 by Robert Recorde.','Crabs have 10 legs. Five crabs have 50 legs!','Some sea turtles live for more than 50 years.','A ship\u2019s speed is measured in knots. 1 knot is about 1.85 km an hour.'];
const VO={"intro": "Ahoy, explorer! The old Captain buried his treasure on this island. Follow the map, find the golden boxes, and use your maths to reach the spot marked X!", "back": "Welcome back, explorer! Let's carry on with the treasure hunt.", "map": "Follow the red dotted path. Find the golden boxes, and answer the question inside to get a key. Each key opens the next gate. Look out for snappy crabs, swooping seagulls and spiky sea urchins!", "key": "Correct! You found a key! The next gate is now open. Keep exploring!", "key3": "Correct! You have all the keys! Now go to Skull Rock, where X marks the spot.", "coins": "Bonus coins for exploring!", "gem": "A sparkling gem! You can spend gems in Math City.", "heart": "An extra heart! You found an extra life.", "win": "Hooray! You found the Captain's treasure! You earned the Treasure Hunter badge!", "zone0": "Sandy Cove.", "zone1": "Parrot Jungle.", "zone2": "Crab Coast.", "zone3": "Skull Rock.", "tip-1-0": "Here's a tip from Wise Owl. To add 9, add 10 and take away 1!", "tip-1-1": "Here's a tip from Wise Owl. Doubles are quick: double 6 is 12.", "tip-1-2": "Here's a tip from Wise Owl. Number bonds to 10: 3 and 7, 4 and 6, 5 and 5.", "tip-2-0": "Here's a tip from Wise Owl. To add 19, add 20 and take away 1.", "tip-2-1": "Here's a tip from Wise Owl. Multiplying by 10? Every digit moves one place to the left.", "tip-2-2": "Here's a tip from Wise Owl. Division is sharing into equal groups.", "tip-3-0": "Here's a tip from Wise Owl. Check a subtraction by adding the answer back on.", "tip-3-1": "Here's a tip from Wise Owl. To multiply by 4, double and then double again!", "tip-3-2": "Here's a tip from Wise Owl. To multiply by 8, double, double and double again!", "tip-4-0": "Here's a tip from Wise Owl. 9 times table trick: the digits of the answer add up to 9. 9 times 4 = 36.", "tip-4-1": "Here's a tip from Wise Owl. To multiply by 5, multiply by 10 and then halve it.", "tip-4-2": "Here's a tip from Wise Owl. Use the inverse: if 7 times 8 = 56, then 56 divided by 8 = 7.", "tip-5-0": "Here's a tip from Wise Owl. Brackets first! In (3 + 4) times 2, add first, then multiply.", "tip-5-1": "Here's a tip from Wise Owl. To multiply by 25, multiply by 100 and divide by 4.", "tip-5-2": "Here's a tip from Wise Owl. A number divides by 3 if its digits add up to a multiple of 3.", "fact-0": "Here's an amazing fact from Wise Owl. Pirates shared their treasure in equal parts. That is division!", "fact-1": "Here's an amazing fact from Wise Owl. Pieces of eight were silver coins worth 8 smaller coins.", "fact-2": "Here's an amazing fact from Wise Owl. The equals sign was invented in 1557 by Robert Recorde.", "fact-3": "Here's an amazing fact from Wise Owl. Crabs have 10 legs. Five crabs have 50 legs!", "fact-4": "Here's an amazing fact from Wise Owl. Some sea turtles live for more than 50 years.", "fact-5": "Here's an amazing fact from Wise Owl. A ship’s speed is measured in knots. 1 knot is about 1.85 km an hour."};

/* ======================= THE ISLAND ======================= */
/* world units: the explorer is about 2 tall. The island runs from x −108 to 108 and z −58 to 58. */
const ZONES=[{name:'Sandy Cove'},{name:'Parrot Jungle'},{name:'Crab Coast'},{name:'Skull Rock'}];
const WALLX=[-50,0,50],GATEZ=[-6,22,-14];
const STARTS=[[-90,24],[-45,-6],[5,22],[55,-14]];
const FINAL={x:86,z:-8};
const BOXES=[{x:-77,z:-30,k:'q'},{x:-21,z:33,k:'q'},{x:27,z:-31,k:'q'},
 {x:-92,z:0,k:'s'},{x:-64,z:34,k:'s'},{x:-36,z:-24,k:'s'},{x:-8,z:4,k:'s'},{x:16,z:12,k:'s'},{x:38,z:30,k:'s'},{x:68,z:30,k:'s'},{x:74,z:-34,k:'s'}];
const ROUTE=[[-90,24],[-84,-6],[-74,-24],[-62,-14],[-50,-6],[-36,10],[-25,28],[-12,26],[0,22],[14,4],[24,-24],[38,-22],[50,-14],[66,-6],[FINAL.x,FINAL.z]];
const sm=(a,b,x)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
function shapeS(x,z){return Math.pow(Math.pow(Math.abs(x/108),4)+Math.pow(Math.abs(z/58),4),.25)+Math.sin(x*.09)*.025+Math.cos(z*.11)*.025}
function segD(px,pz,a,b){const dx=b[0]-a[0],dz=b[1]-a[1],l=dx*dx+dz*dz;let t=l?((px-a[0])*dx+(pz-a[1])*dz)/l:0;t=Math.max(0,Math.min(1,t));return Math.hypot(px-a[0]-t*dx,pz-a[1]-t*dz)}
function pathD(x,z){let d=1e9;for(let i=0;i<ROUTE.length-1;i++)d=Math.min(d,segD(x,z,ROUTE[i],ROUTE[i+1]));return d}
function hgt(x,z){const s=shapeS(x,z),t=sm(1.12,.82,s);let h=-3+t*4.3;h+=t*(Math.sin(x*.13)*Math.cos(z*.11)*.35+Math.sin(x*.05+z*.07)*.3);
 h+=t*3.2*Math.exp(-((x-FINAL.x)**2+(z-FINAL.z)**2)/500);return h}
const land=(x,z)=>hgt(x,z)>.35;

/* ---------- three.js setup ---------- */
let renderer,scene,camera,sun,clock,raf=0,LOADED=null,ocean,oceanBase;
const loader=new GLTFLoader();const MODELS={};
const NEED=['palm-bend','palm-straight','palm-detailed-bend','palm-detailed-straight','rocks-a','rocks-b','rocks-c','rocks-sand-a','rocks-sand-b','rocks-sand-c','chest','crate','barrel','castle-gate','ship-pirate-large','ship-wreck','structure-platform-dock','boat-row-small','tower-watch','flag-pirate','grass-plant','patch-grass-foliage','hole','tool-shovel','crate-bottles','cannon'];
function loadModels(onp){if(LOADED)return LOADED;let n=0;LOADED=Promise.all(NEED.map(k=>new Promise(res=>loader.load(MP+k+'.glb',g=>{
  g.scene.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true}});const bb=new THREE.Box3().setFromObject(g.scene);MODELS[k]={g,bb};n++;onp(n/NEED.length);res()},undefined,()=>{n++;onp(n/NEED.length);res()}))));return LOADED}
function place(k,x,z,o={}){const m=MODELS[k];if(!m)return null;const obj=m.g.scene.clone(true);const s=o.s||1;obj.scale.setScalar(s);obj.rotation.y=o.ry||0;
 obj.position.set(x,(o.y!==undefined?o.y:hgt(x,z))-m.bb.min.y*s+(o.dy||0),z);scene.add(obj);return obj}
const mat=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.8,flatShading:true},o));

function buildWorld(){scene=new THREE.Scene();scene.background=new THREE.Color(0x8FD3F2);scene.fog=new THREE.Fog(0xA9E1F5,80,210);
 scene.add(new THREE.HemisphereLight(0xCFF0FF,0xE9C98F,1.1));
 sun=new THREE.DirectionalLight(0xFFF1D6,2.4);sun.position.set(30,50,20);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);
 const sc=sun.shadow.camera;sc.left=-40;sc.right=40;sc.top=40;sc.bottom=-40;sc.near=1;sc.far=140;sun.shadow.bias=-.0008;scene.add(sun);scene.add(sun.target);
 // terrain
 const tg=new THREE.PlaneGeometry(272,164,136,82);tg.rotateX(-Math.PI/2);const p=tg.attributes.position,col=[];const c=new THREE.Color();
 for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i),h=hgt(x,z);p.setY(i,h);
  const pd=pathD(x,z),n=Math.sin(x*1.7)*Math.cos(z*1.3)*.04;
  if(h<.2)c.setRGB(.92,.78,.52).lerp(new THREE.Color(.15,.55,.62),Math.min(1,(.2-h)/2.6));
  else if(h<.62||pd<2.6)c.setRGB(.95+n,.8+n,.53+n);
  else if(pd<3.6||h<.75)c.setRGB(.72,.76,.4);
  else c.setRGB(.36+n,.68+n,.3+n).lerp(new THREE.Color(.28,.55,.25),Math.max(0,Math.min(1,(h-1.4)/2)));
  col.push(c.r,c.g,c.b)}
 tg.setAttribute('color',new THREE.Float32BufferAttribute(col,3));tg.computeVertexNormals();
 const terr=new THREE.Mesh(tg,new THREE.MeshStandardMaterial({vertexColors:true,flatShading:true,roughness:.95}));terr.receiveShadow=true;scene.add(terr);
 // ocean
 const og=new THREE.PlaneGeometry(520,420,90,72);og.rotateX(-Math.PI/2);ocean=new THREE.Mesh(og,new THREE.MeshStandardMaterial({color:0x1E9CD0,transparent:true,opacity:.78,roughness:.25,metalness:.05,flatShading:true}));
 ocean.position.y=0;ocean.receiveShadow=true;scene.add(ocean);oceanBase=Float32Array.from(og.attributes.position.array);
 const far=new THREE.Mesh(new THREE.PlaneGeometry(2000,2000).rotateX(-Math.PI/2),mat(0x1A8CC0,{roughness:.4}));far.position.y=-3.3;scene.add(far);
 // the route as little stepping stones? (the sand path is painted on the ground)
 COL.length=0;
 // walls of rocks between the zones, each with a gate
 WALLX.forEach((wx,i)=>{for(let z=-66;z<=66;z+=3.1){if(Math.abs(z-GATEZ[i])<4.2)continue;if(hgt(wx,z)<-1.2)continue;const k=pick(['rocks-a','rocks-b','rocks-c']);
   place(k,wx+(Math.random()-.5)*1.2,z,{s:2.1+Math.random()*.7,ry:Math.random()*6.3,dy:-.4});COL.push({x:wx,z,r:2.3})}});
 G.gates=WALLX.map((wx,i)=>{const gz=GATEZ[i];const arch=place('castle-gate',wx,gz,{s:1,ry:Math.PI/2,dy:-.2});
   if(arch){const bb=new THREE.Box3().setFromObject(arch),sz=bb.getSize(new THREE.Vector3());const s=8.4/Math.max(sz.x,sz.z);arch.scale.setScalar(s);arch.position.y=hgt(wx,gz)-MODELS['castle-gate'].bb.min.y*s-.2}
   const bars=new THREE.Group();const wood=mat(0x6B4423);for(let k=-2;k<=2;k++){const b=new THREE.Mesh(new THREE.BoxGeometry(.35,5.2,.35),wood);b.position.set(0,2.6,k*1.05);b.castShadow=true;bars.add(b)}
   for(let k=0;k<3;k++){const b=new THREE.Mesh(new THREE.BoxGeometry(.3,.3,5),wood);b.position.set(0,1+k*1.6,0);bars.add(b)}
   bars.position.set(wx,hgt(wx,gz),gz);scene.add(bars);place('flag-pirate',wx+.5,gz-5.6,{s:1.6});place('flag-pirate',wx+.5,gz+5.6,{s:1.6});
   COL.push({x:wx,z:gz-4.6,r:1.4},{x:wx,z:gz+4.6,r:1.4});const blk={x:wx,z:gz,r:3.2};COL.push(blk);
   return{x:wx,z:gz,open:false,anim:0,bars,blk}});
 // palms and jungle
 const palmK=['palm-bend','palm-straight','palm-detailed-bend','palm-detailed-straight'];let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
 for(let i=0;i<900&&PALMS<170;i++){const x=-104+rnd()*208,z=-56+rnd()*112;if(!land(x,z))continue;const h=hgt(x,z);
  if(pathD(x,z)<5.5||WALLX.some(w=>Math.abs(x-w)<4.5))continue;if(BOXES.some(b=>Math.hypot(b.x-x,b.z-z)<5)||Math.hypot(FINAL.x-x,FINAL.z-z)<9||STARTS.some(s=>Math.hypot(s[0]-x,s[1]-z)<5))continue;
  if(COL.some(c=>Math.hypot(c.x-x,c.z-z)<c.r+2.2))continue;const r=rnd();
  if(r<.62){place(palmK[Math.floor(rnd()*4)],x,z,{s:1.6+rnd()*.7,ry:rnd()*6.3,dy:-.2});COL.push({x,z,r:.9});PALMS++}
  else if(r<.75){place(pick(['rocks-sand-a','rocks-sand-b','rocks-sand-c']),x,z,{s:1+rnd()*.6,ry:rnd()*6.3,dy:-.3});COL.push({x,z,r:2})}
  else if(h>.9)place(r<.88?'grass-plant':'patch-grass-foliage',x,z,{s:1.2+rnd(),ry:rnd()*6.3,dy:-.1})}
 // harbour, ships, wreck, lookout
 place('structure-platform-dock',-101,24,{s:1.6,ry:-Math.PI/2,y:.2});place('boat-row-small',-104,30,{s:1.4,ry:.4,y:-.3});
 place('crate-bottles',-86,30,{s:1.2,ry:.5});place('barrel',-84,31,{s:1.1});COL.push({x:-85,z:30.5,r:2});
 place('tower-watch',-70,8,{s:1.5,ry:.8});COL.push({x:-70,z:8,r:2.6});
 SHIPS.push(place('ship-pirate-large',-20,74,{s:2.4,ry:Math.PI/2.4,y:-1.2}),place('ship-pirate-large',62,-78,{s:2,ry:-Math.PI/1.7,y:-1}));
 const wr=place('ship-wreck',-30,-60,{s:1.8,ry:.6,y:-1.4});
 place('cannon',44,-5,{s:1.4,ry:-1});COL.push({x:44,z:-5,r:1.5});
 // the dig site
 G.final.x=new THREE.Group();const red=mat(0xC0263A);[[1,1],[1,-1]].forEach(([a,b])=>{const m=new THREE.Mesh(new THREE.BoxGeometry(5.2,.25,1),red);m.rotation.y=Math.atan2(a,b)+Math.PI/4;m.position.y=.12;m.receiveShadow=true;G.final.x.add(m)});
 G.final.x.position.set(FINAL.x,hgt(FINAL.x,FINAL.z)+.05,FINAL.z);scene.add(G.final.x);place('tool-shovel',FINAL.x+3.6,FINAL.z+1.5,{s:1.6,ry:.5});
 G.final.ring=ring(FINAL.x,FINAL.z,4.2,0xFFD166);
 // boxes
 G.boxes=BOXES.map((b,i)=>{const gold=b.k==='q';const obj=place(gold?'chest':'crate',b.x,b.z,{s:gold?1.5:1.25,ry:Math.atan2(-b.x,-b.z)*0+(gold?.4:0)});
  let mixer=null,act=null;if(gold&&obj){mixer=new THREE.AnimationMixer(obj);const clip=MODELS.chest.g.animations.find(a=>a.name==='open');if(clip){act=mixer.clipAction(clip);act.setLoop(THREE.LoopOnce);act.clampWhenFinished=true}}
  const rg=ring(b.x,b.z,gold?2.4:1.9,gold?0xFFD166:0xB79CFF);COL.push({x:b.x,z:b.z,r:1.3});
  return Object.assign({},b,{open:false,obj,mixer,act,ring:rg,anim:0})});
 // creatures
 G.critters=[];[[-40,-30,-18,-30],[-28,8,-10,8],[10,-10,30,-12],[30,10,44,22],[60,22,76,14]].forEach(([x1,z1,x2,z2])=>G.critters.push({k:'crab',a:[x1,z1],b:[x2,z2],t:Math.random(),obj:crab()}));
 [[20,0,16],[36,-12,12],[30,24,14]].forEach(([cx,cz,r],i)=>G.critters.push({k:'gull',cx,cz,r,t:i*2,obj:gull()}));
 G.sand=[];[[-30,-6],[-40,22],[-14,-12],[-12,40],[-34,40]].forEach(([x,z])=>{if(!land(x,z)||pathD(x,z)<3)return;const m=new THREE.Mesh(new THREE.CylinderGeometry(3,3,.12,20),mat(0xB98A4E,{roughness:1}));m.position.set(x,hgt(x,z)+.06,z);m.receiveShadow=true;scene.add(m);
  const sw=new THREE.Mesh(new THREE.TorusGeometry(1.6,.12,6,24),mat(0x8A6230));sw.rotation.x=Math.PI/2;sw.position.set(x,hgt(x,z)+.15,z);scene.add(sw);G.sand.push({x,z,r:3,sw})});
 G.urch=[];for(let i=0;i<14;i++){const x=6+Math.random()*40,z=-50+Math.random()*100;if(!land(x,z)||pathD(x,z)<2.6||pathD(x,z)>9||COL.some(c=>Math.hypot(c.x-x,c.z-z)<c.r+1))continue;const u=urchin();u.position.set(x,hgt(x,z)+.4,z);scene.add(u);G.urch.push({x,z,obj:u})}
 // explorer and compass
 G.hero=hero();scene.add(G.hero.g);
 G.arrow=new THREE.Mesh(new THREE.ConeGeometry(.45,1.4,4),mat(0xFFC93C,{emissive:0x7A4A10,emissiveIntensity:.4}));G.arrow.rotation.z=-Math.PI/2;const ag=new THREE.Group();ag.add(G.arrow);G.arrowG=ag;scene.add(ag);
 G.fx=[];}
let PALMS=0;const SHIPS=[];const COL=[];
function ring(x,z,r,c){const m=new THREE.Mesh(new THREE.RingGeometry(r*.78,r,40),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.6,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.set(x,hgt(x,z)+.12,z);scene.add(m);
 const beam=new THREE.Mesh(new THREE.CylinderGeometry(r*.55,r*.75,9,20,1,true),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.16,depthWrite:false,side:THREE.DoubleSide}));beam.position.set(x,hgt(x,z)+4.5,z);scene.add(beam);return{m,beam}}
function hero(){const g=new THREE.Group(),skin=mat(0xE8B48A),khaki=mat(0xC9A46A),shirt=mat(0xF1E6C8),boot=mat(0x5A3A22),pack=mat(0x5E8C3A),hat=mat(0xC98B3E),hair=mat(0x4A2F1C);
 const box=(w,h,d,m,x,y,z,p)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.position.set(x,y,z);b.castShadow=true;(p||g).add(b);return b};
 const leg=(s)=>{const p=new THREE.Group();p.position.set(s*.22,.95,0);g.add(p);box(.3,.62,.32,khaki,0,-.3,0,p);box(.32,.3,.42,boot,0,-.78,.06,p);return p};
 const L=leg(-1),Rl=leg(1);box(.8,.8,.5,shirt,0,1.35,0);box(.82,.12,.52,mat(0x6B4423),0,1.0,0);box(.6,.7,.3,pack,0,1.4,-.38);
 const arm=(s)=>{const p=new THREE.Group();p.position.set(s*.52,1.65,0);g.add(p);box(.22,.6,.24,shirt,0,-.25,0,p);box(.2,.2,.22,skin,0,-.62,0,p);return p};
 const A1=arm(-1),A2=arm(1);const head=new THREE.Mesh(new THREE.SphereGeometry(.38,12,10),skin);head.position.y=2.05;head.castShadow=true;g.add(head);
 const hr=new THREE.Mesh(new THREE.SphereGeometry(.4,12,10,0,Math.PI*2,0,Math.PI/2.2),hair);hr.position.set(0,2.08,-.04);g.add(hr);
 const brim=new THREE.Mesh(new THREE.CylinderGeometry(.72,.72,.06,18),hat);brim.position.y=2.32;brim.castShadow=true;g.add(brim);const top=new THREE.Mesh(new THREE.CylinderGeometry(.36,.42,.36,14),hat);top.position.y=2.5;g.add(top);
 [-1,1].forEach(s=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.06,6,6),mat(0x1B1B1B));e.position.set(s*.14,2.08,.34);g.add(e)});
 return{g,L,R:Rl,A1,A2}}
function crab(){const g=new THREE.Group(),red=mat(0xE0503A),dk=mat(0x8E2A1E);const b=new THREE.Mesh(new THREE.SphereGeometry(.7,10,8),red);b.scale.set(1.2,.55,.9);b.position.y=.45;b.castShadow=true;g.add(b);
 [-1,1].forEach(s=>{const cl=new THREE.Mesh(new THREE.SphereGeometry(.32,8,6),red);cl.scale.set(1.2,.7,.8);cl.position.set(s*1.05,.55,.55);g.add(cl);
  const ey=new THREE.Mesh(new THREE.SphereGeometry(.11,6,6),mat(0xffffff));ey.position.set(s*.22,.95,.45);g.add(ey);
  for(let k=0;k<3;k++){const l=new THREE.Mesh(new THREE.BoxGeometry(.6,.08,.08),dk);l.position.set(s*.85,.3,-.3+k*.28);l.rotation.z=s*-.5;g.add(l)}});scene.add(g);return g}
function gull(){const g=new THREE.Group(),w=mat(0xFFFFFF),gr=mat(0x8A96A2);const b=new THREE.Mesh(new THREE.SphereGeometry(.4,8,6),w);b.scale.set(1,.8,1.8);g.add(b);
 const L=new THREE.Mesh(new THREE.BoxGeometry(1.8,.06,.6),gr),Rw=L.clone();L.position.x=-1;Rw.position.x=1;g.add(L,Rw);const bk=new THREE.Mesh(new THREE.ConeGeometry(.1,.35,5),mat(0xF2A93B));bk.rotation.x=Math.PI/2;bk.position.z=.8;g.add(bk);
 g.userData={L,R:Rw};g.traverse(o=>{if(o.isMesh)o.castShadow=true});scene.add(g);return g}
function urchin(){const g=new THREE.Group(),m=mat(0x5B2A6E);g.add(new THREE.Mesh(new THREE.IcosahedronGeometry(.45,0),m));for(let i=0;i<14;i++){const s=new THREE.Mesh(new THREE.ConeGeometry(.06,.8,4),mat(0x2B1B3A));const d=new THREE.Vector3(Math.random()-.5,Math.random()*.8,Math.random()-.5).normalize();s.position.copy(d.clone().multiplyScalar(.5));s.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d);g.add(s)}return g}
function burst(x,y,z,c,n=26){for(let i=0;i<n;i++){const m=new THREE.Mesh(new THREE.OctahedronGeometry(.18,0),new THREE.MeshBasicMaterial({color:c[i%c.length]}));m.position.set(x,y,z);scene.add(m);G.fx.push({m,v:new THREE.Vector3((Math.random()-.5)*.35,.25+Math.random()*.3,(Math.random()-.5)*.35),l:70})}}

/* ---------- game state ---------- */
let G={};function reset(){G={x:STARTS[0][0],z:STARTS[0][1],ang:Math.PI/2,walk:0,hearts:3,coins:0,gems:0,keys:0,inv:0,boxes:[],gates:[],final:{open:false,step:0,anim:0},pause:true,first:0,asked:0,zone:0,t:0,seen:new Uint8Array(54*30),critters:[],fx:[],mix:[]}}
let HUDK='';function hud(){const hk=[G.hearts,G.coins,G.gems,G.keys].join();if(hk===HUDK)return;HUDK=hk;$('fg-hearts').textContent='❤️'.repeat(G.hearts)+'🤍'.repeat(Math.max(0,3-G.hearts));$('fg-coins').textContent='🪙 '+G.coins;$('fg-gems').textContent='💎 '+G.gems;$('fg-keys').innerHTML=pic('key',1.1,'vertical-align:-.2em')+' '+G.keys+'/4'}
function nextTarget(){const q=G.boxes.find(b=>b.k==='q'&&!b.open);if(q)return{x:q.x,z:q.z,t:'box'};const g=G.gates.find(g=>!g.open);if(g)return{x:g.x,z:g.z,t:'gate'};return{x:FINAL.x,z:FINAL.z,t:'final'}}
function goal(){const n=G.boxes.filter(b=>b.k==='q'&&b.open).length;const tg=nextTarget();$('fg-goal').textContent=tg.t==='final'?'📍 Go to Skull Rock: X marks the spot! ✖':`📍 ${ZONES[Math.min(n,3)].name}: find the golden chest ✖`}
function toast(t){const e=$('fg-toast');e.textContent=t;e.style.opacity=1;clearTimeout(toast.k);toast.k=setTimeout(()=>e.style.opacity=0,2200)}
function reveal(){const cx=Math.floor((G.x+108)/4),cz=Math.floor((G.z+60)/4);for(let z=cz-4;z<=cz+4;z++)for(let x=cx-5;x<=cx+5;x++)if(x>=0&&z>=0&&x<54&&z<30&&(x-cx)**2+(z-cz)**2<=22)G.seen[z*54+x]=1}

/* ---------- input ---------- */
const K={u:0,d:0,l:0,r:0};
const KM={ArrowUp:'u',w:'u',W:'u',ArrowDown:'d',s:'d',S:'d',ArrowLeft:'l',a:'l',A:'l',ArrowRight:'r',d:'r',D:'r'};
function busy(e){const tg=e.target&&e.target.tagName;return tg==='INPUT'||tg==='TEXTAREA'||tg==='SELECT'||!!document.getElementById('advov')}
addEventListener('keydown',e=>{if(!ON||busy(e))return;if(KM[e.key]){K[KM[e.key]]=1;e.preventDefault()}if((e.key===' '||e.key==='Enter')&&near){e.preventDefault();interact()}if(e.key==='m'||e.key==='M')showMap(false)});
addEventListener('keyup',e=>{if(!ON)return;if(KM[e.key])K[KM[e.key]]=0});
function bindUI(){document.querySelectorAll('#fgw .fg-pad button').forEach(b=>{const d=b.dataset.d;const on=e=>{e.preventDefault();K[d]=1;b.classList.add('fg-on')},off=e=>{e.preventDefault();K[d]=0;b.classList.remove('fg-on')};
 b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);b.addEventListener('pointerleave',off);b.addEventListener('pointercancel',off)});
 $('fg-act').addEventListener('pointerdown',e=>{e.preventDefault();interact()});$('fg-mapbtn').onclick=()=>showMap(false);$('fg-exit').onclick=()=>stop(true)}

/* ---------- movement ---------- */
function blocked(x,z){if(!land(x,z))return true;for(const c of COL)if(!c.off&&Math.hypot(c.x-x,c.z-z)<c.r+.55)return true;return false}
let near=null;
function update(dt){G.t+=dt;const f=dt*60;
 G.fx.forEach(p=>{p.m.position.add(p.v.clone().multiplyScalar(f));p.v.y-=.012*f;p.m.rotation.x+=.1*f;p.l-=f;if(p.l<=0){scene.remove(p.m);p.m.geometry.dispose()}});G.fx=G.fx.filter(p=>p.l>0);
 G.boxes.forEach(b=>{if(b.mixer)b.mixer.update(dt);const s=1+Math.sin(G.t*3+b.x)*.08;if(!b.open){b.ring.m.scale.set(s,s,1);b.ring.beam.material.opacity=.12+Math.sin(G.t*2.5+b.x)*.05}
  else if(b.anim<1){b.anim=Math.min(1,b.anim+dt*1.2);b.ring.m.material.opacity=.6*(1-b.anim);b.ring.beam.material.opacity=.16*(1-b.anim);if(b.k==='s'&&b.obj){b.obj.scale.setScalar(1.25*(1-b.anim));b.obj.rotation.y+=dt*8}}});
 G.mix.forEach(m=>m.update(dt));G.gates.forEach(g=>{if(g.open&&g.anim<1){g.anim=Math.min(1,g.anim+dt*.7);g.bars.position.y=hgt(g.x,g.z)+g.anim*5.4}});
 {const r=G.final.ring,on=G.keys>=3&&!G.final.open;r.m.visible=r.beam.visible=on||G.final.anim>0&&G.final.anim<1;const s=1+Math.sin(G.t*3)*.08;r.m.scale.set(s,s,1)}
 if(G.final.open&&G.final.anim<1){G.final.anim=Math.min(1,G.final.anim+dt*.5);const fc=G.final.chest;if(fc)fc.position.y=hgt(FINAL.x,FINAL.z)-1.6+G.final.anim*1.9;G.final.x.visible=false}
 if(ocean&&(Math.round(G.t*60)%2===0)){const p=ocean.geometry.attributes.position,a=p.array;for(let i=0;i<p.count;i++){const x=oceanBase[i*3],z=oceanBase[i*3+2];a[i*3+1]=Math.sin(x*.12+G.t*1.3)*.22+Math.cos(z*.1+G.t*1.1)*.2}p.needsUpdate=true}
 SHIPS.forEach((s,i)=>{if(s){s.rotation.z=Math.sin(G.t*.8+i)*.04;s.position.y+=Math.sin(G.t*1.2+i)*.004}});
 G.sand.forEach(q=>q.sw.rotation.z+=dt*.8);
 G.critters.forEach(c=>{if(c.k==='crab'){c.t+=dt*.12;const k=(Math.sin(c.t*Math.PI*2)+1)/2,x=c.a[0]+(c.b[0]-c.a[0])*k,z=c.a[1]+(c.b[1]-c.a[1])*k;c.x=x;c.z=z;c.obj.position.set(x,hgt(x,z)+Math.abs(Math.sin(G.t*10))*.12,z);c.obj.rotation.y=Math.atan2(c.b[0]-c.a[0],c.b[1]-c.a[1])+Math.PI/2}
  else{c.t+=dt*.55;const x=c.cx+Math.cos(c.t)*c.r,z=c.cz+Math.sin(c.t*1.3)*c.r*.7,y=Math.max(1.6,hgt(x,z)+1.6)+(Math.sin(c.t*.9)+1)*3.2;c.x=x;c.z=z;c.y=y;c.obj.position.set(x,y,z);c.obj.rotation.y=Math.atan2(-Math.sin(c.t),Math.cos(c.t)*1.3)+Math.PI;const fl=Math.sin(G.t*9)*.5;c.obj.userData.L.rotation.z=fl;c.obj.userData.R.rotation.z=-fl}});
 if(!G.pause){let dx=K.r-K.l,dz=K.d-K.u;const mv=dx||dz;if(dx&&dz){dx*=.71;dz*=.71}let sp=9;if(G.sand.some(q=>Math.hypot(q.x-G.x,q.z-G.z)<q.r))sp=4;
  if(mv){G.ang=Math.atan2(dx,dz);G.walk+=dt;if(Math.floor(G.walk*4)!==Math.floor((G.walk-dt)*4))snd('step')}else G.walk=0;
  const nx=G.x+dx*sp*dt,nz=G.z+dz*sp*dt;if(!blocked(nx,G.z))G.x=nx;if(!blocked(G.x,nz))G.z=nz;
  if(G.inv<=0){for(const c of G.critters){const hit=c.k==='crab'?Math.hypot(c.x-G.x,c.z-G.z)<1.6:Math.hypot(c.x-G.x,c.z-G.z)<1.6&&c.y<hgt(G.x,G.z)+3;if(hit){knock(c.x,c.z);hurt(c.k==='gull'?'A seagull swooped at you! 🐦':'Snap! A crab pinched you! 🦀');break}}
   if(G.inv<=0)for(const u of G.urch)if(Math.hypot(u.x-G.x,u.z-G.z)<1.2){knock(u.x,u.z);hurt('Ouch, spiky sea urchins!');break}}
  reveal();const z=G.x<WALLX[0]?0:G.x<WALLX[1]?1:G.x<WALLX[2]?2:3;if(z!==G.zone){G.zone=z;toast('📍 '+ZONES[z].name);talk('zone'+z)}}
 if(G.inv>0)G.inv-=dt;
 near=null;G.boxes.forEach(b=>{if(!b.open&&Math.hypot(b.x-G.x,b.z-G.z)<3.6)near=b});if(!near&&!G.final.open&&G.keys>=3&&Math.hypot(FINAL.x-G.x,FINAL.z-G.z)<5.5)near='final';
 const ab=$('fg-act');ab.style.display=near&&!G.pause?'block':'none';ab.textContent=near==='final'?'Dig':'Open';
 // explorer
 const h=G.hero,gy=hgt(G.x,G.z);h.g.position.set(G.x,gy,G.z);h.g.rotation.y+=(((G.ang-h.g.rotation.y+Math.PI*3)%(Math.PI*2))-Math.PI)*.25;const sw=G.walk?Math.sin(G.walk*11)*.7:0;
 h.L.rotation.x=sw;h.R.rotation.x=-sw;h.A1.rotation.x=-sw*.8;h.A2.rotation.x=sw*.8;h.g.position.y+=G.walk?Math.abs(Math.sin(G.walk*11))*.08:0;h.g.visible=!(G.inv>0&&Math.floor(G.t*12)%2);
 // compass arrow
 const tg=nextTarget(),d=Math.hypot(tg.x-G.x,tg.z-G.z);G.arrowG.visible=d>16&&!G.pause;G.arrowG.position.set(G.x,gy+3.3+Math.sin(G.t*4)*.15,G.z);G.arrowG.rotation.y=Math.atan2(tg.x-G.x,tg.z-G.z)-Math.PI/2;
 // camera and sun follow
 if(!G.dbg){const cx=G.x,cz=G.z+CAMZ,cy=gy+CAMY;camera.position.x+=(cx-camera.position.x)*.08;camera.position.y+=(cy-camera.position.y)*.08;camera.position.z+=(cz-camera.position.z)*.08;camera.lookAt(camera.position.x,camera.position.y-CAMY+1.5,camera.position.z-CAMZ);}
 sun.position.set(G.x+30,60,G.z+25);sun.target.position.set(G.x,0,G.z);hud()}
function knock(x,z){const a=Math.atan2(G.z-z,G.x-x);for(let i=0;i<14;i++){const nx=G.x+Math.cos(a)*.3,nz=G.z+Math.sin(a)*.3;if(!blocked(nx,nz)){G.x=nx;G.z=nz}}}
function hurt(msg){G.hearts--;G.inv=1.6;snd('hurt');toast(msg);burst(G.x,hgt(G.x,G.z)+1.5,G.z,[0xE05A47,0xFF8A7A],10);
 if(G.hearts<=0){G.hearts=3;const s=STARTS[G.zone];G.x=s[0];G.z=s[1];toast('Back to the start of this area. You can do it! 💪')}hud()}

/* ---------- chests, gates and the treasure ---------- */
const live=()=>typeof ADV!=='undefined'&&ADV&&typeof ME!=='undefined'&&ME;
function say(t,k){try{if(typeof window.say==='function'&&window.say!==say){window.say(t,k);return}}catch(e){}say0(t)}
function talk(k){if(VO[k])say(VO[k],'ig-'+k)}
function fgSave(){if(!live())return;ADV.coins=G.coins;ADV.gems=G.gems;ADV.ig={o:G.boxes.map((b,i)=>b.open?i:-1).filter(i=>i>=0),f:G.final.step};advSave()}
function card(html){$('fg-ov').innerHTML=`<div class="fg-card">${html}</div>`;$('fg-ov').hidden=false}
function close(){$('fg-ov').hidden=true;$('fg-ov').innerHTML='';G.pause=false;goal()}
function interact(){if(!near||G.pause)return;if(near==='final'){openFinal();return}const b=near;snd('open');G.pause=true;K.u=K.d=K.l=K.r=0;if(b.k==='q')askBox(b);else surprise(b)}
let Z=null;
/* one question card, in the same style as the rest of Maths Quest */
function qAsk(s,want,done){G.pause=true;K.u=K.d=K.l=K.r=0;
 let it=null;try{if(Z&&typeof advPick==='function')it=advPick(Z,want)}catch(e){}
 if(!it){const q=makeQ();it={id:'fg-'+Date.now(),q:q.q,a:String(q.a),t:'choice',c:q.o.map(String),h:'Read it slowly. Which digit or number matters?'}}
 let tries=0;
 let o=document.getElementById('advov');if(!o){o=document.createElement('div');o.id='advov';o.className='advov';document.body.appendChild(o)}
 if(typeof V!=='undefined')V.land=it._land||'NI';
 const sp=typeof splitPic==='function'?splitPic(it.q):[null,it.q],pc=sp[0],text=sp[1];
 const vis=(typeof fpFor==='function'&&fpFor(it.q))||(pc&&typeof picBox==='function'?picBox(pc):'');
 o.innerHTML=`<div class="advcard" role="dialog" aria-label="${esc(s.n)}"><button class="x" id="advx" aria-label="Close">✕</button>
 <div class="se"><img src="${IMGSRC[s.img]}" alt=""></div><h2>${esc(s.n)}</h2><div class="story">${esc(s.s)}</div>
 ${vis}<div class="qtext">${esc(text)} <button class="b2" id="hear" aria-label="Hear the question" style="padding:4px 12px;font-size:16px;vertical-align:middle">🔊</button></div>
 ${answerUI(it)}<div class="msg" id="fb"></div><div id="hn"></div></div>`;
 const g=id=>document.getElementById(id);
 g('advx').onclick=()=>{o.remove();G.pause=false;goal()};
 g('hear').onclick=()=>window.say(text,it.k);if(typeof autoRead==='function')autoRead(text,it.k);
 bindAnswer(it,ans=>{const ok=check(it,ans);
  if(tries===0&&!String(it.id).startsWith('fg-')&&live()){if(!it._use)rpc('mq_answer',{p_code:ME.code,p_qid:it.id,p_correct:ok}).then(({data})=>{if(typeof data==='number'){ME.stars=data;header()}});
   ME.facts=ME.facts||{};ME.wrong=ME.wrong||{};if(ok)ME.facts[it.id]=(ME.facts[it.id]||0)+1;else ME.wrong[it.id]=(ME.wrong[it.id]||0)+1}
  if(ok){const first=tries===0;o.remove();const fin=()=>{G.pause=true;done(first)};if(typeof miniParty==='function'){miniParty();setTimeout(fin,500)}else fin();return}
  if(tries===0){tries=1;if(typeof oops==='function')oops();g('fb').innerHTML='<span class="bad">Not quite. Have another go!</span>';
   g('hn').innerHTML=`<div class="hint">💡<div>${esc(it.h||'Read it again slowly and find the important numbers.')}</div></div>`;const i=g('ans');if(i){i.value='';i.focus()}return}
  if(typeof gentleSound==='function')gentleSound();
  g('fb').innerHTML=`<span class="bad">The answer is <b>${esc(it.a)}</b>.</span> ${typeof howBtn==='function'&&!String(it.id).startsWith('fg-')?howBtn(it):''} <div style="margin-top:10px"><button class="b3" id="fgnq">Try a new problem →</button></div>`;
  try{if(typeof bindHow==='function'&&!String(it.id).startsWith('fg-'))bindHow(it)}catch(e){}
  g('fgnq').onclick=()=>{o.remove();qAsk(s,want,f=>done(false))};
  o.querySelectorAll('[data-c],.ans,.b1').forEach(e=>e.disabled=true)})}

function askBox(b){const qi=G.boxes.filter(x=>x.k==='q').indexOf(b);const want=(Z&&Z.locks&&Z.locks.ch&&Z.locks.ch[qi])||{d:[Math.min(qi+1,3)]};
 qAsk({img:'gold',n:'Golden treasure chest',s:'Answer the question to open it. There is a key inside!'},want,first=>{
  G.asked++;if(first)G.first++;b.open=true;b.anim=0;if(b.act)b.act.reset().play();snd('open');burst(b.x,hgt(b.x,b.z)+1.6,b.z,[0xFFD166,0xFFF3A0,0xF2B134]);G.keys++;const c=first?30:15;G.coins+=c;
  const gi=G.keys-1,gate=G.gates[gi];fgSave();hud();talk(gate?'key':'key3');
  setTimeout(()=>{card(`<div class="fg-big">${pic('heroKey',6)}</div><h2>Correct! You found a key!</h2><p>+${c} 🪙 coins</p><p>${gate?'The gate to <b>'+ZONES[gi+1].name+'</b> is now open. Keep exploring!':'You have all the keys! Go to <b>Skull Rock</b>, where X marks the spot!'}</p><button class="fg-go" id="fg-ok">Let’s go! ➜</button>`);
   $('fg-ok').onclick=()=>{if(gate)openGate(gate);close()}},900)})}
function openGate(g){g.open=true;g.anim=0;g.blk.off=true;snd('gate');toast('🔓 The gate is open!')}
function surprise(b){b.open=true;b.anim=0;burst(b.x,hgt(b.x,b.z)+1.2,b.z,[0xB79CFF,0xFFFFFF,0xFFD166],18);const idx=G.boxes.indexOf(b),r=[2,0,3,1,4,0,2,1][idx-3]??idx%5;let html;
 if(r===0){talk('coins');G.coins+=25;html=`<div class="fg-big">${pic('surpOpen',4.5)}</div><h2>🪙 Bonus coins!</h2><p>+25 coins for exploring!</p>`;snd('coin')}
 else if(r===1){talk('gem');G.gems++;html=`<div class="fg-big">${pic('surpOpen',4.5)}</div><h2>💎 A sparkling gem!</h2><p>+1 gem. Spend gems in Math City!</p>`;snd('right')}
 else if(r===2){const ti=Math.floor(Math.random()*TIPS[grade].length),t=TIPS[grade][ti];html=`<div class="fg-owlrow">${pic('owl',6)}<div><h2>💡 Wise Owl’s maths tip!</h2><p>${t}</p></div></div>`;talk('tip-'+grade+'-'+ti)}
 else if(r===3){const fi=Math.floor(Math.random()*FACTS.length),f=FACTS[fi];html=`<div class="fg-owlrow">${pic('owl',6)}<div><h2>🤓 Wise Owl’s amazing fact!</h2><p>${f}</p></div></div>`;talk('fact-'+fi)}
 else{talk('heart');G.hearts=Math.min(G.hearts+1,4);html=`<div class="fg-big">${pic('surpOpen',4.5)}</div><h2>❤️ Extra heart!</h2><p>You found an extra life.</p>`;snd('right')}
 fgSave();card(html+`<button class="fg-go" id="fg-ok">Keep exploring ➜</button>`);$('fg-ok').onclick=close;hud()}
function openFinal(){G.pause=true;K.u=K.d=K.l=K.r=0;
 const step=()=>{if(G.final.step>=3){G.final.open=true;G.final.anim=0;snd('dig');const ch=place('chest',FINAL.x,FINAL.z,{s:2.2,ry:-.4});G.final.chest=ch;place('hole',FINAL.x,FINAL.z,{s:2.2,dy:-.9});
   if(ch){const mx=new THREE.AnimationMixer(ch),clip=MODELS.chest.g.animations.find(a=>a.name==='open');G.mix.push(mx);if(clip){const a=mx.clipAction(clip);a.setLoop(THREE.LoopOnce);a.clampWhenFinished=true;setTimeout(()=>a.play(),1600)}}
   G.keys=4;hud();close();G.pause=true;setTimeout(()=>{snd('open');burst(FINAL.x,hgt(FINAL.x,FINAL.z)+2,FINAL.z,[0xFFD166,0xFFF3A0,0xF2B134,0xFFFFFF],60)},1700);setTimeout(win,3400);return}
  const want=(Z&&Z.locks&&Z.locks.boss&&Z.locks.boss[G.final.step])||{d:[3]};
  qAsk({img:'goldOpen',n:'X marks the spot',s:`Dig ${G.final.step+1} of 3. Solve all three to dig up the Captain’s treasure!`},want,first=>{G.asked++;if(first)G.first++;G.final.step++;fgSave();snd('dig');setTimeout(step,300)})};step()}
function win(){G.pause=true;snd('win');setTimeout(()=>talk('win'),900);const pct=G.asked?G.first/G.asked:1,st=pct>=.85?3:pct>=.6?2:1;G.coins+=50;G.gems+=2;hud();
 let badge='';if(live()){ADV.coins=G.coins;ADV.gems=G.gems;ADV.ig=null;if(!ADV.badges.includes('island')){ADV.badges.push('island');badge=' You earned the <b>Treasure Hunter</b> badge! The Harbour in Math City is now open.'}advSave()}
 const nm=live()&&ME.first_name?', '+esc(ME.first_name):'';
 $('fg-ov').innerHTML=`<div class="fg-parch"><div class="fg-row" style="gap:0">${pic('heroKey',6.5)}${pic('goldOpen',4.5,'margin-left:-.3em')}</div><h1>🏆 You found the Captain’s treasure${nm}!</h1><div style="font-size:4em">${'⭐'.repeat(st)}${'☆'.repeat(3-st)}</div><p>+50 🪙 · +2 💎 · ${G.first} of ${G.asked} right first time</p><p>${badge||'Badge: <b>Treasure Hunter</b>'}</p>
 <div class="fg-row" style="font-size:.8em;padding-right:10%"><button class="fg-go" id="fg-again">Play again ↺</button><button class="fg-go fg-sub" id="fg-city">🏗️ Build Math City</button><button class="fg-go fg-sub" id="fg-back">Adventures</button></div></div>`;
 $('fg-ov').hidden=false;$('fg-again').onclick=()=>{if(live()){ADV.ig=null;advSave()}stop(true,{s:'adv',z:'island'})};$('fg-back').onclick=()=>stop(true);$('fg-city').onclick=()=>stop(true,{s:'adv',z:'city',land:'NI'})}

/* ---------- treasure maps ---------- */
let LANDC=null;function landCanvas(){if(LANDC)return LANDC;const c=document.createElement('canvas');c.width=216;c.height=120;const x=c.getContext('2d'),im=x.createImageData(216,120);
 for(let j=0;j<120;j++)for(let i=0;i<216;i++){const wx=i-108,wz=j-60,h=hgt(wx,wz),k=(j*216+i)*4;let r,g,b,a=255;
  if(h<.2){r=125;g=185;b=216;a=h<-1.5?0:Math.round(255*Math.min(1,(h+1.5)/1.7))}else if(h<.62||pathD(wx,wz)<2.6){r=236;g=214;b=160}else{r=127;g=163;b=106}im.data.set([r,g,b,a],k)}
 x.putImageData(im,0,0);return LANDC=c}
function paintMap(ctx,w,h,full){ctx.fillStyle='#F4E3B5';ctx.fillRect(0,0,w,h);const sx=w/216,sz=h/120,X=x=>(x+108)*sx,Y=z=>(z+60)*sz;ctx.imageSmoothingEnabled=true;ctx.drawImage(landCanvas(),0,0,w,h);
 if(!full){ctx.fillStyle='rgba(244,227,181,.92)';const cw=w/54,ch=h/30;for(let j=0;j<30;j++)for(let i=0;i<54;i++)if(!G.seen[j*54+i])ctx.fillRect(i*cw,j*ch,cw+.5,ch+.5)}
 ctx.strokeStyle='#B5402A';ctx.setLineDash([Math.max(3,w/150),Math.max(3,w/200)]);ctx.lineWidth=Math.max(2,w/400);ctx.beginPath();ROUTE.forEach(([x,z],i)=>i?ctx.lineTo(X(x),Y(z)):ctx.moveTo(X(x),Y(z)));ctx.stroke();ctx.setLineDash([]);
 G.gates.forEach(g=>{ctx.fillStyle=g.open?'#2DBE6C':'#8B5A2B';ctx.fillRect(X(g.x)-w/200,Y(g.z)-h/50,w/100,h/25)});
 G.boxes.forEach(b=>{if(b.k!=='q')return;const px=X(b.x),py=Y(b.z),r=Math.max(4,w/90);ctx.strokeStyle=b.open?'#2DBE6C':'#C0263A';ctx.lineWidth=Math.max(2.5,w/260);ctx.beginPath();if(b.open)ctx.arc(px,py,r,0,7);else{ctx.moveTo(px-r,py-r);ctx.lineTo(px+r,py+r);ctx.moveTo(px+r,py-r);ctx.lineTo(px-r,py+r)}ctx.stroke()});
 const r=Math.max(6,w/60);ctx.strokeStyle='#C0263A';ctx.lineWidth=Math.max(3,w/160);ctx.beginPath();ctx.moveTo(X(FINAL.x)-r,Y(FINAL.z)-r);ctx.lineTo(X(FINAL.x)+r,Y(FINAL.z)+r);ctx.moveTo(X(FINAL.x)+r,Y(FINAL.z)-r);ctx.lineTo(X(FINAL.x)-r,Y(FINAL.z)+r);ctx.stroke();
 ctx.fillStyle='#8B5CF6';ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(X(G.x),Y(G.z),Math.max(4,w/120),0,7);ctx.fill();ctx.stroke()}
function drawMini(){paintMap($('fg-mini').getContext('2d'),240,150,false)}
function showMap(first){G.pause=true;snd('map');K.u=K.d=K.l=K.r=0;
 $('fg-ov').innerHTML=`<div class="fg-parch"><h1>🗺️ ${first?'The Treasure Map of Treasure Island':'Your Treasure Map'}</h1>${first?'<p>Follow the red dotted path. Find the <b style="color:#C0263A">✖ golden chests</b> and answer the question inside to get a key. Each key opens the next gate.<br>Look out for <b>🦀 snappy crabs</b>, <b>🐦 swooping seagulls</b> and <b>spiky sea urchins</b>! Quicksand slows you down. <b style="color:#7B5BC4">Wooden crates</b> hide tips, facts and bonuses.</p>':'<p>The golden arrow above you always points to your next goal.</p>'}<canvas id="fg-bigmap" width="1080" height="600"></canvas><div class="fg-row"><button class="fg-go" id="fg-mapok">${first?'Start the adventure! 🧭':'Back to the island ➜'}</button></div></div>`;
 $('fg-ov').hidden=false;paintMap($('fg-bigmap').getContext('2d'),1080,600,true);$('fg-mapok').onclick=close}

/* ---------- start and stop ---------- */
let ON=false,WRAP=null,DONE=null,MINIT=0;
function intro(){G.pause=true;const n=G.boxes.filter(b=>b.k==='q'&&b.open).length,back=n>0||G.final.step>0||G.boxes.some(b=>b.open);const nm=live()&&ME.first_name?esc(ME.first_name):'explorer';
 $('fg-ov').innerHTML=`<div class="fg-parch">${pic('scroll',4.5,'margin-bottom:.2em')}<h1>🏝️ Treasure Island Adventure 🏝️</h1>
 <p>${back?`Welcome back, ${nm}! You have ${n} of 3 keys. Carry on from <b>${ZONES[Math.min(n,3)].name}</b>.`:`Ahoy, ${nm}! The old Captain buried his treasure on this island. Follow the map, find the golden chests and use your maths to reach the spot marked X!`}</p>
 <div class="fg-row" style="margin:.6em 0"><button class="fg-go" id="fg-begin">Open the map 🗺️</button>${back?'<button class="fg-go fg-sub" id="fg-restart">Start again ↺</button>':''}</div>
 <p style="font-size:1em;opacity:.8;padding-right:12%">Computer: arrow keys to walk · Space to open chests · M for the map &nbsp;|&nbsp; iPad: use the buttons</p></div>`;$('fg-ov').hidden=false;
 $('fg-begin').onclick=()=>{showMap(true);talk('map')};setTimeout(()=>talk(back?'back':'intro'),300);const rs=$('fg-restart');if(rs)rs.onclick=()=>{if(live()){ADV.ig=null;advSave()}stop(true,{s:'adv',z:'island'})}}
function restore(){if(live()){G.coins=ADV.coins;G.gems=ADV.gems}const fg=live()?ADV.ig:null;
 if(fg&&Array.isArray(fg.o)){fg.o.forEach(i=>{const b=G.boxes[i];if(b){b.open=true;b.anim=1;b.ring.m.visible=b.ring.beam.visible=false;if(b.act){b.act.play();b.mixer.update(5)}if(b.k==='s'&&b.obj)b.obj.visible=false;const c=COL.find(c=>c.x===b.x&&c.z===b.z);if(c&&b.k==='s')c.off=true}});
  G.keys=G.boxes.filter(b=>b.k==='q'&&b.open).length;G.gates.forEach((g,i)=>{if(i<G.keys){g.open=true;g.anim=1;g.blk.off=true;g.bars.position.y=hgt(g.x,g.z)+5.4}});G.final.step=+fg.f||0;
  const zi=Math.min(G.keys,3);G.x=STARTS[zi][0];G.z=STARTS[zi][1];G.zone=zi;for(let j=0;j<30;j++)for(let i=0;i<54;i++)if(i*4-108<(zi?WALLX[zi-1]:-200))G.seen[j*54+i]=1}
 reveal();hud();goal()}
function resize(){const el=$('fg-3d');if(!el||!renderer)return;const w=el.clientWidth,h=el.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}
function snapCam(){const gy=hgt(G.x,G.z);camera.position.set(G.x,gy+CAMY,G.z+CAMZ);camera.lookAt(G.x,gy+1.5,G.z)}
const CAMY=19,CAMZ=17;
let last=0;function loop(ts){if(!ON)return;raf=requestAnimationFrame(loop);const dt=Math.min(.05,(ts-last)/1000||0);last=ts;update(dt);renderer.render(scene,camera);if(++MINIT%6===0)drawMini()}
function stop(go,view){ON=false;cancelAnimationFrame(raf);try{speechSynthesis.cancel()}catch(e){}K.u=K.d=K.l=K.r=0;removeEventListener('resize',resize);
 const o=document.getElementById('advov');if(o)o.remove();
 try{scene.traverse(o=>{if(o.isMesh&&!o.userData.shared){o.geometry&&o.geometry.dispose()}});renderer.dispose();renderer.forceContextLoss()}catch(e){}renderer=null;
 if(WRAP){WRAP.remove();WRAP=null}document.body.classList.remove('fgon');if(go){const d=DONE;DONE=null;if(d)d(view)}}
function webgl(){try{const c=document.createElement('canvas');return !!(window.WebGLRenderingContext&&(c.getContext('webgl2')||c.getContext('webgl')))}catch(e){return false}}
function fallback(z,done){const s=document.createElement('script');s.src='island-game.js?v=1';s.onload=()=>window.IG.start(z,done);s.onerror=()=>done();document.head.appendChild(s)}

window.IG3={start(z,done){if(ON)return;if(!webgl())return fallback(z,done);Z=z;DONE=done;
 if(!document.getElementById('ig3css')){const s=document.createElement('style');s.id='ig3css';s.textContent=CSS;document.head.appendChild(s)}
 WRAP=document.createElement('div');WRAP.id='fgw';WRAP.innerHTML=HTML;document.body.appendChild(WRAP);document.body.classList.add('fgon');WRAP.style.setProperty('--paper','url('+IMGSRC.mapPaper+')');
 grade=Math.max(1,Math.min(5,live()?(+ME.grade||1):3));HUDK='';reset();bindUI();
 $('fg-ov').innerHTML='<div class="fg-load">🏝️ Sailing to Treasure Island…<div class="bar"><i id="fg-lb"></i></div></div>';$('fg-ov').hidden=false;
 try{renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'})}catch(e){WRAP.remove();WRAP=null;document.body.classList.remove('fgon');return fallback(z,done)}
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.92;
 $('fg-3d').appendChild(renderer.domElement);camera=new THREE.PerspectiveCamera(45,16/9,.5,400);ON=true;resize();addEventListener('resize',resize);
 loadModels(p=>{const b=$('fg-lb');if(b)b.style.width=Math.round(p*100)+'%'}).then(()=>{if(!ON)return;PALMS=0;SHIPS.length=0;buildWorld();restore();
  snapCam();intro();last=performance.now();raf=requestAnimationFrame(loop)})},
 stop(){stop(false)},get on(){return ON},_t:{cam:(a,b,c,d,e,f)=>{G.dbg=1;camera.position.set(a,b,c);camera.lookAt(d,e,f)},g:()=>G,go:(x,z)=>{G.x=x;G.z=z;reveal();snapCam()},use:()=>interact(),hgt}};
