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
#fgw .lv-wrap{max-width:92%}#fgw .lv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.6em;margin:.5em 0 .7em;width:100%}
#fgw .lv{font-family:inherit;border:3px solid #B98B4A;background:#FFF8E6;border-radius:16px;padding:.35em;display:flex;flex-direction:column;align-items:center;gap:.1em;cursor:pointer;color:#5A3D00}
#fgw .lv img{width:100%;border-radius:10px;aspect-ratio:216/120;object-fit:cover}#fgw .lv b{font-size:1.05em}#fgw .lv i{font-style:normal;font-size:.9em;color:#7A5A20}#fgw .lv span{font-weight:700;font-size:.95em}
#fgw .lv.locked{filter:grayscale(.9);opacity:.6;cursor:default}#fgw .lv:not(.locked):hover{border-color:#FFC93C}#fgw .lv-topic{font-size:1.15em;color:#7A3E1A}
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

/* ======================= THE ISLANDS (one per level) ======================= */
/* world units: the explorer is about 2 tall. Every island fits inside x −110…110, z −62…62.
   Each level: an island shape, a route from the start to the treasure, 3 gates on the route
   (each in a wall of rocks across the island), a theme (light, colours, decorations) and its zone names. */
const sm=(a,b,x)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
const se=(x,z,a,b,p)=>Math.pow(Math.pow(Math.abs(x/a),p)+Math.pow(Math.abs(z/b),p),1/p);
const wob=(x,z)=>Math.sin(x*.09)*.025+Math.cos(z*.11)*.025;
const bump=(x,z,cx,cz,h,r2)=>h*Math.exp(-((x-cx)**2+(z-cz)**2)/r2);
const ringPts=(a0,a1,n,rx,rz,cx=0,cz=0)=>Array.from({length:n},(_,i)=>{const a=(a0+(a1-a0)*i/(n-1))*Math.PI/180;return[Math.round(cx+rx*Math.cos(a)),Math.round(cz+rz*Math.sin(a))]});
const ISLAND_LEVELS=[
 {name:'Sandy Cove Island',theme:'sunny',deco:'harbour',zones:['Sandy Cove','Parrot Jungle','Crab Coast','Skull Rock'],
  S:(x,z)=>se(x,z,108,58,4)+wob(x,z),
  route:[[-90,24],[-84,-6],[-74,-24],[-62,-14],[-50,-6],[-36,10],[-25,28],[-12,26],[0,22],[14,4],[24,-24],[38,-22],[50,-14],[66,-6],[86,-8]],gi:[4,8,12]},
 {name:'Shipwreck Bay',theme:'rain',deco:'wrecks',zones:['Wreck Point','Coral Beach','Lagoon Shore','Captain’s Cape'],
  S:(x,z)=>{const d=Math.hypot(x,z+54);return Math.max(se(x,z,105,57,3)+wob(x,z),d<46?1+(46-d)/14:1-(d-46)/60)},
  route:[[-84,-30],[-88,-6],[-76,16],[-56,32],[-30,40],[-5,43],[20,41],[45,33],[68,18],[84,0],[86,-28]],gi:[3,6,8]},
 {name:'Fortress Isle',theme:'fortress',deco:'fortress',zones:['Cannon Beach','Fortress Walls','Tower Hill','Treasure Keep'],
  S:(x,z)=>se(x,z,100,58,2.6)+wob(x,z),hill:(x,z)=>bump(x,z,0,0,2.4,700),
  route:[[-88,10],[-72,-20],[-50,-38],[-30,-20],[-15,10],[-5,35],[15,40],[30,15],[35,-15],[50,-35],[70,-25],[85,0]],gi:[3,6,9]},
 {name:'Volcano Isle',theme:'volcano',deco:'volcano',zones:['Ash Beach','Smoky Slopes','Lava Ridge','Dragon’s Rest'],volc:[5,-2],
  S:(x,z)=>se(x,z,104,58,3)+wob(x,z),hill:(x,z)=>{const d=Math.hypot(x-5,z+2);let h=11*Math.pow(Math.max(0,1-d/36),1.5);if(d<6)h-=(6-d)*1.4;return h},
  route:[[-90,10],[-70,-22],[-45,-40],[-15,-46],[20,-46],[50,-38],[78,-12],[80,20],[55,40],[25,46],[-5,44],[-30,40]],gi:[3,6,9],close:[[-14,7],[-100,44]]},
 {name:'Ghost Lagoon',theme:'night',deco:'ghost',zones:['Misty Shore','Whispering Palms','Ghost Ship Point','Moonlight Cove'],
  S:(x,z)=>{const r=Math.hypot(x/104,z/57);return Math.abs(r-.72)/.28+wob(x,z)},
  route:ringPts(118,422,14,75,41),gi:[3,7,10],close:[[0,20],[0,62]]},
 {name:'Skull Archipelago',theme:'storm',deco:'archipelago',zones:['Skull Isle','Parrot Isle','Cannon Isle','Treasure Isle'],
  isl:[[-78,12,30,25],[-26,-14,24,22],[26,16,24,22],[78,-6,28,26]],
  S:function(x,z){return Math.min(...this.isl.map(([cx,cz,a,b])=>se(x-cx,z-cz,a,b,3)))+wob(x,z)},
  bridges:[[-60,1,-42,-8],[-6,-6,8,8],[45,14,56,-1]],
  route:[[-94,22],[-80,4],[-66,4],[-51,-4],[-38,-10],[-26,-14],[-14,-10],[1,1],[14,10],[26,16],[40,15],[51,6],[62,-2],[78,-6],[90,-12]],gi:[3,7,11]}];
const STORY=["The old Captain buried his treasure on this island. Follow the map, find the golden chests and use your maths to reach the spot marked X!", "Three old shipwrecks lie in this bay. The Captain hid the next treasure at the far end of the cape!", "Cannons and towers guard Fortress Isle. Open the fortress gates with your maths to reach the Treasure Keep!", "Smoke rises from the volcano! Walk around it, open the gates and find the treasure at Dragon’s Rest.", "The ghost ship floats in the moonlit lagoon. Follow the ring of sand all the way round to Moonlight Cove!", "Four islands joined by rope bridges. Cross every bridge to find the Captain’s greatest treasure!"];
const THEMES={
 sunny:{sky:0x8FD3F2,fog:0xB4E6F7,fogN:90,fogF:230,hemi:[0xD6F3FF,0xF0D49A,1.15],sun:[0xFFF4DC,2.5],sunDir:[30,60,25],exp:.86,
  sand:[.97,.84,.56],path:[.9,.74,.48],grass:[.38,.72,.32],grass2:[.28,.58,.26],edge:[.76,.8,.44],water:0x1EA8D6,deep:0x168FC4,amp:1,amb:'beach'},
 rain:{sky:0x8C98A3,fog:0x99A5AF,fogN:40,fogF:150,hemi:[0xC3CDD6,0x6E6A5E,1.0],sun:[0xDDE4EA,1.1],sunDir:[20,70,10],exp:.9,
  sand:[.72,.66,.53],path:[.6,.54,.43],grass:[.3,.5,.36],grass2:[.22,.4,.3],edge:[.5,.55,.4],water:0x3E7F8C,deep:0x2F6470,amp:1.4,rain:1,amb:'rain'},
 fortress:{sky:0xF2C58E,fog:0xEAC9A0,fogN:80,fogF:210,hemi:[0xFFE2BE,0x8A7356,1.0],sun:[0xFFC27A,2.6],sunDir:[-45,35,20],exp:.95,
  sand:[.86,.74,.52],path:[.6,.58,.56],stone:1,grass:[.55,.62,.3],grass2:[.45,.52,.26],edge:[.62,.6,.46],water:0x2A8FB8,deep:0x1E78A0,amp:1,banners:1,amb:'wind'},
 volcano:{sky:0x7A3A2A,fog:0x8E4A34,fogN:50,fogF:170,hemi:[0xFFB48A,0x3A2A26,.9],sun:[0xFF9A5A,1.9],sunDir:[25,40,-10],exp:1,
  sand:[.34,.31,.3],path:[.45,.4,.36],grass:[.33,.36,.24],grass2:[.18,.16,.16],edge:[.38,.36,.3],water:0x23667A,deep:0x1B5263,amp:1.1,embers:1,amb:'volcano'},
 night:{sky:0x0D1533,fog:0x141E45,fogN:30,fogF:140,hemi:[0x5A6FB8,0x1B1A2A,.55],sun:[0xAFC6FF,.7],sunDir:[-30,60,-20],exp:1.15,
  sand:[.7,.68,.66],path:[.62,.6,.58],grass:[.2,.36,.32],grass2:[.14,.28,.26],edge:[.4,.46,.42],water:0x173E6E,deep:0x10305A,amp:.8,fireflies:1,stars:1,lantern:1,mush:1,amb:'night'},
 storm:{sky:0x46525F,fog:0x56626E,fogN:40,fogF:160,hemi:[0xA8B6C4,0x3C3A36,.85],sun:[0xC8D2DC,1],sunDir:[10,70,30],exp:.95,
  sand:[.8,.73,.58],path:[.66,.58,.44],grass:[.3,.52,.3],grass2:[.22,.42,.24],edge:[.55,.58,.4],water:0x2F5F70,deep:0x24505E,amp:2.2,rain:.6,lightning:1,amb:'storm'}};
/* ---------- weather: rain, embers, fireflies, stars, lightning ---------- */
function addWeather(){G.wx={};const T=TH;
 if(T.rain){const n=Math.round(1400*T.rain),pos=new Float32Array(n*6);for(let i=0;i<n;i++){const x=(Math.random()-.5)*80,y=Math.random()*30,z=(Math.random()-.5)*80;pos.set([x,y,z,x+.15,y-1.1,z],i*6)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));const m=new THREE.LineSegments(g,new THREE.LineBasicMaterial({color:0xDDE8F2,transparent:true,opacity:.5}));m.frustumCulled=false;scene.add(m);G.wx.rain={m,pos,n}}
 if(T.snow){const n=1100,pos=new Float32Array(n*3);for(let i=0;i<n;i++)pos.set([(Math.random()-.5)*80,Math.random()*30,(Math.random()-.5)*80],i*3);
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));const m=new THREE.Points(g,new THREE.PointsMaterial({color:0xFFFFFF,size:.28,transparent:true,opacity:.9,depthWrite:false}));m.frustumCulled=false;scene.add(m);G.wx.snow={m,pos,n}}
 if(T.embers){const n=260,pos=new Float32Array(n*3),v=[];for(let i=0;i<n;i++){pos.set([(Math.random()-.5)*90,Math.random()*25,(Math.random()-.5)*90],i*3);v.push(.03+Math.random()*.05)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));const m=new THREE.Points(g,new THREE.PointsMaterial({color:0xFF8A2A,size:.35,transparent:true,opacity:.9,blending:THREE.AdditiveBlending,depthWrite:false}));m.frustumCulled=false;scene.add(m);G.wx.emb={m,pos,n,v}}
 if(T.fireflies){const n=220,pos=new Float32Array(n*3),ph=[];for(let i=0;i<n;i++){let x,z,k=0;do{x=-104+Math.random()*208;z=-58+Math.random()*116}while(!land(x,z)&&k++<20);pos.set([x,hgt(x,z)+1+Math.random()*3,z],i*3);ph.push(Math.random()*6.3)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));const base=pos.slice();const m=new THREE.Points(g,new THREE.PointsMaterial({color:0xFFF27A,size:.45,transparent:true,opacity:.95,blending:THREE.AdditiveBlending,depthWrite:false,fog:false}));scene.add(m);G.wx.ff={m,pos,base,ph,n}}
 if(T.stars){const n=900,pos=new Float32Array(n*3);for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,e=Math.random()*.9+.1;pos.set([Math.cos(a)*Math.cos(e)*320,Math.sin(e)*320,Math.sin(a)*Math.cos(e)*320],i*3)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));const st=new THREE.Points(g,new THREE.PointsMaterial({color:0xFFFFFF,size:1.4,sizeAttenuation:false,fog:false,transparent:true}));st.renderOrder=10;scene.add(st);G.wx.stars=st;
  const moon=new THREE.Mesh(new THREE.SphereGeometry(14,24,16),new THREE.MeshBasicMaterial({color:0xF4F1DA,fog:false,transparent:true}));moon.renderOrder=10;scene.add(moon);G.wx.moon=moon}
 if(T.lantern){const l=new THREE.PointLight(0xFFC77A,40,22,1.6);G.hero.g.add(l);l.position.set(.6,2,.4);const lamp=new THREE.Mesh(new THREE.SphereGeometry(.16,8,6),new THREE.MeshBasicMaterial({color:0xFFE6A0}));lamp.position.set(.62,1.3,.25);G.hero.g.add(lamp)}
 if(T.mush){const cols=[0x6FF2E8,0xB98CFF,0x7AF27A];for(let i=0,n=0;i<600&&n<90;i++){const x=-104+Math.random()*208,z=-58+Math.random()*116;if(!land(x,z)||hgt(x,z)<.9||pathD(x,z)<3||COL.some(c=>Math.hypot(c.x-x,c.z-z)<c.r+.5))continue;n++;
   const g=new THREE.Group(),c=pick(cols);const st=new THREE.Mesh(new THREE.CylinderGeometry(.08,.12,.5,6),new THREE.MeshStandardMaterial({color:0xE8E2D0,emissive:0x555044}));st.position.y=.25;const cap=new THREE.Mesh(new THREE.SphereGeometry(.32,10,6,0,Math.PI*2,0,Math.PI/2),new THREE.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:1.3}));cap.position.y=.48;g.add(st,cap);g.position.set(x,hgt(x,z),z);g.scale.setScalar(.8+Math.random()*1.4);scene.add(g)}}
 if(T.banners){const reds=[0xC0263A,0xD9A21A];G.boxes.forEach((b,i)=>{if(b.k!=='q')return});GATES.forEach((g,i)=>{const nx=-g.dz,nz=g.dx;[1,-1].forEach(s=>{const x=g.x+nx*7.5*s,z=g.z+nz*7.5*s;if(!land(x,z))return;
   const pole=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,7,6),mat(0x5A3A22));pole.position.set(x,hgt(x,z)+3.5,z);scene.add(pole);const ban=new THREE.Mesh(new THREE.PlaneGeometry(1.6,3.2),new THREE.MeshStandardMaterial({color:reds[i%2],side:THREE.DoubleSide,flatShading:true}));ban.position.set(x+.85,hgt(x,z)+5.1,z);scene.add(ban);(G.wx.ban=G.wx.ban||[]).push(ban)})})}
 if(T.lightning){G.wx.flash=0;G.wx.next=4+Math.random()*6;const d=document.createElement('div');d.style.cssText='position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none;border-radius:14px;transition:opacity .12s';$('fg-3d').appendChild(d);G.wx.fl=d}}
function updWeather(dt){const W=G.wx;if(!W)return;const cx=G.x,cz=G.z,gy=hgt(G.x,G.z);
 if(W.rain){const p=W.rain.pos;for(let i=0;i<W.rain.n;i++){const o=i*6;let y=p[o+1]-dt*38;if(y<gy-2){y=gy+26;const x=cx+(Math.random()-.5)*80,z=cz+(Math.random()-.5)*70;p[o]=x;p[o+2]=z;p[o+3]=x+.15;p[o+5]=z}p[o+1]=y;p[o+4]=y-1.1}W.rain.m.geometry.attributes.position.needsUpdate=true}
 if(W.snow){const p=W.snow.pos;for(let i=0;i<W.snow.n;i++){const o=i*3;p[o+1]-=dt*3.2;p[o]+=Math.sin(G.t+i)*.015;if(p[o+1]<gy-2){p[o]=cx+(Math.random()-.5)*80;p[o+1]=gy+26;p[o+2]=cz+(Math.random()-.5)*70}}W.snow.m.geometry.attributes.position.needsUpdate=true}
 if(W.emb){const p=W.emb.pos;for(let i=0;i<W.emb.n;i++){const o=i*3;p[o+1]+=W.emb.v[i]*dt*60;p[o]+=Math.sin(G.t*2+i)*.02;if(p[o+1]>gy+24){p[o]=cx+(Math.random()-.5)*90;p[o+1]=gy-1;p[o+2]=cz+(Math.random()-.5)*90}}W.emb.m.geometry.attributes.position.needsUpdate=true}
 if(W.ff){const p=W.ff.pos,b=W.ff.base;for(let i=0;i<W.ff.n;i++){const o=i*3,ph=W.ff.ph[i];p[o]=b[o]+Math.sin(G.t*.7+ph)*1.5;p[o+1]=b[o+1]+Math.sin(G.t*1.3+ph*2)*.6;p[o+2]=b[o+2]+Math.cos(G.t*.6+ph)*1.5}W.ff.m.geometry.attributes.position.needsUpdate=true;W.ff.m.material.opacity=.7+Math.sin(G.t*3)*.25}
 if(W.stars){W.stars.position.set(camera.position.x,0,camera.position.z);W.moon.position.set(camera.position.x-120,150,camera.position.z-260)}
 if(W.ban)W.ban.forEach((b,i)=>b.rotation.y=Math.sin(G.t*2+i)*.35);
 if(W.fl){W.next-=dt;if(W.next<=0){W.next=6+Math.random()*9;W.fl.style.opacity=.55;G.hemi.intensity=3;setTimeout(()=>{if(W.fl){W.fl.style.opacity=0;G.hemi.intensity=TH.hemi[2]}},140);setTimeout(()=>{if(W.fl){W.fl.style.opacity=.35;setTimeout(()=>{if(W.fl)W.fl.style.opacity=0},90)}},260);setTimeout(()=>amb.thunder(),500+Math.random()*900)}}}
/* ---------- background sounds, made in the browser (no files needed) ---------- */
const amb={nodes:[],timers:[],on:false,
 ctx(){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();return AC}catch(e){return null}},
 muted(){try{return typeof SND!=='undefined'&&SND&&(SND.fx===false||SND.music===false&&SND.fx===false)}catch(e){return false}},
 noise(type){const a=this.ctx(),len=a.sampleRate*3,buf=a.createBuffer(1,len,a.sampleRate),d=buf.getChannelData(0);let last=0;for(let i=0;i<len;i++){const w=Math.random()*2-1;if(type==='brown'){last=(last+.02*w)/1.02;d[i]=last*3.5}else d[i]=w}
  const s=a.createBufferSource();s.buffer=buf;s.loop=true;return s},
 loop(type,filt,freq,q,vol,lfo){const a=this.ctx();if(!a)return;const s=this.noise(type),f=a.createBiquadFilter(),g=a.createGain();f.type=filt;f.frequency.value=freq;f.Q.value=q||.7;g.gain.value=vol;s.connect(f).connect(g).connect(a.destination);
  if(lfo){const o=a.createOscillator(),og=a.createGain();o.frequency.value=lfo;og.gain.value=vol*.8;o.connect(og).connect(g.gain);o.start();this.nodes.push(o)}s.start();this.nodes.push(s,g)},
 every(ms,fn){const t=()=>{if(!this.on)return;fn();this.timers.push(setTimeout(t,ms*(0.6+Math.random()*.8)))};this.timers.push(setTimeout(t,ms*Math.random()))},
 tone(f,d,type,v,f2,at=0){const a=this.ctx();if(!a)return;const t=a.currentTime+at,o=a.createOscillator(),g=a.createGain();o.type=type;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.03);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g).connect(a.destination);o.start(t);o.stop(t+d+.05)},
 chirp(){const f=2400+Math.random()*1400;for(let i=0;i<3;i++)this.tone(f,.07,'sine',.02,f*1.3,i*.11)},
 drip(){const f=900+Math.random()*900;this.tone(f,.18,'sine',.05,f*.55);this.tone(f*.5,.5,'sine',.012,f*.4,.12)},
 gull(){this.tone(1400,.35,'triangle',.02,900);this.tone(1500,.3,'triangle',.018,1000,.4)},
 owl(){this.tone(420,.45,'sine',.05,380);this.tone(400,.6,'sine',.05,350,.6)},
 cricket(){for(let i=0;i<4;i++)this.tone(4200,.04,'square',.006,null,i*.07)},
 crackle(){for(let i=0;i<5;i++)this.tone(200+Math.random()*900,.03,'square',.012,null,Math.random()*.4)},
 thunder(){if(!this.on)return;const a=this.ctx();if(!a)return;const s=this.noise('brown'),f=a.createBiquadFilter(),g=a.createGain(),t=a.currentTime;f.type='lowpass';f.frequency.value=180;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.9,t+.15);g.gain.exponentialRampToValueAtTime(.0001,t+3.2);s.connect(f).connect(g).connect(a.destination);s.start();s.stop(t+3.4)},
 start(kind){this.stop();if(this.muted()||!this.ctx())return;this.on=true;
  if(kind==='beach'){this.loop('brown','lowpass',500,.7,.35,.12);this.every(6000,()=>this.gull())}
  if(kind==='rain'){this.loop('white','highpass',1800,.6,.05);this.loop('brown','lowpass',420,.7,.3,.1)}
  if(kind==='wind'){this.loop('white','bandpass',500,1.4,.05,.07);this.loop('brown','lowpass',380,.7,.18,.1)}
  if(kind==='volcano'){this.loop('brown','lowpass',120,.8,.6,.05);this.every(900,()=>this.crackle())}
  if(kind==='night'){this.loop('brown','lowpass',300,.7,.15,.08);this.every(700,()=>this.cricket());this.every(9000,()=>this.owl())}
  if(kind==='mountain'){this.loop('white','bandpass',900,1.2,.05,.06);this.loop('brown','lowpass',300,.7,.15,.08);this.every(11000,()=>{this.tone(1800,.5,'triangle',.02,1200);this.tone(1700,.6,'triangle',.018,1100,.5)})}
  if(kind==='river'){this.loop('white','bandpass',1200,.8,.05,.2);this.loop('brown','lowpass',500,.7,.25,.15);this.every(2500,()=>this.chirp())}
  if(kind==='cave'){this.loop('brown','lowpass',90,.8,.5,.04);this.every(1800,()=>this.drip())}
  if(kind==='storm'){this.loop('white','bandpass',700,1,.06,.09);this.loop('brown','lowpass',380,.7,.42,.15);this.loop('white','highpass',2000,.6,.025)}},
 stop(){this.on=false;this.timers.forEach(clearTimeout);this.timers=[];this.nodes.forEach(n=>{try{n.stop&&n.stop()}catch(e){}try{n.disconnect()}catch(e){}});this.nodes=[]}};
/* themes for Geometry Mountains, Fraction River and Mystery Caves */
const MT={hemi:[0xE6F2FF,0x8FA0B4,1.1],sun:[0xFFFFFF,2.3],sunDir:[30,60,25],exp:.9,fogN:70,fogF:220,water:0xF2F6FB,deep:0xD8E2EE,amp:.5,cloudSea:1,tree:'pine',treeCol:0x2F6B4A,peaks:1,snowH:3.6,greyRocks:1,amb:'mountain',
 sand:[.78,.76,.72],path:[.66,.6,.52],grass:[.42,.62,.36],grass2:[.36,.5,.34],edge:[.62,.64,.5]};
const RV={hemi:[0xD9F2FF,0xB9A982,1.1],sun:[0xFFF4DC,2.4],sunDir:[30,60,25],exp:.9,fogN:80,fogF:220,water:0x2FA6C8,deep:0x1E86A8,amp:.7,tree:'round',treeCol:0x3E9446,treeCol2:0x57A84E,amb:'river',
 sand:[.86,.78,.58],path:[.8,.68,.48],grass:[.42,.7,.34],grass2:[.32,.58,.28],edge:[.66,.72,.42]};
const CV={sky:0x05060C,fog:0x0A0A16,fogN:22,fogF:95,hemi:[0x6A6A9A,0x1A1626,.45],sun:[0xB8C0FF,.45],sunDir:[10,70,10],exp:1.15,water:0x05060A,deep:0x020205,amp:0,void:1,tree:'stalag',tree2:'crystal',greyRocks:1,lantern:1,amb:'cave',
 sand:[.36,.34,.4],path:[.46,.44,.5],grass:[.3,.28,.36],grass2:[.24,.22,.3],edge:[.34,.32,.38],rockCol:0x4E4864};
Object.assign(THEMES,{
 alpine:Object.assign({},MT,{sky:0x8CCBF5,fog:0xCBE6F7,snowTips:1}),
 snowfall:Object.assign({},MT,{sky:0xB4C3D2,fog:0xC8D3DE,fogN:40,fogF:150,hemi:[0xE8EEF6,0x8A96A6,1.05],sun:[0xE8EEF6,1.3],snow:1,snowH:2.2,snowTips:1,grass:[.62,.7,.64],grass2:[.8,.84,.88]}),
 peakdusk:Object.assign({},MT,{sky:0xF0A27A,fog:0xF2B894,hemi:[0xFFD2B0,0x6E5470,1],sun:[0xFF9A62,2.4],sunDir:[-45,28,10],water:0xF9D8C6,deep:0xE8B8A6,treeCol:0x2E5A40}),
 cloudy:Object.assign({},MT,{sky:0xA8D8F2,fog:0xE2F0F8,fogN:60,fogF:200,snowH:4.4}),
 snownight:Object.assign({},MT,{sky:0x0C1430,fog:0x16204A,fogN:30,fogF:140,hemi:[0x6A80C8,0x1A1A2A,.6],sun:[0xB0C4FF,.7],exp:1.15,water:0x3A4C78,deep:0x2A3A64,stars:1,lantern:1,snowH:2.6,snowTips:1,amb:'night'}),
 crystalpeak:Object.assign({},MT,{sky:0xB8A6F2,fog:0xD4C8F6,hemi:[0xEDE4FF,0x7A6A9A,1.05],water:0xEDE8FF,deep:0xD0C6F0,tree2:'crystal',cryst:0x9F7BFF,treeCol:0x3D5E58}),
 meadow:Object.assign({},RV,{sky:0x8FD3F2,fog:0xB4E6F7}),
 jungleriver:Object.assign({},RV,{sky:0x9AB3A6,fog:0xA9C0B4,fogN:45,fogF:160,hemi:[0xD4EADC,0x5E6A44,1],sun:[0xE8F0D8,1.4],rain:.5,tree:'palm',treeCol:0x2E7D3A,water:0x3E8C7A,deep:0x2C6E5E,grass:[.28,.58,.3],amb:'rain'}),
 autumn:Object.assign({},RV,{sky:0xA9CBE8,fog:0xE8D2B4,hemi:[0xFFE6C8,0x8A6A44,1.05],sun:[0xFFD29A,2.3],sunDir:[-40,40,20],treeCol:0xD9622B,treeCol2:0xE8A23A,grass:[.62,.6,.3],grass2:[.55,.5,.26],edge:[.7,.62,.38]}),
 canyon:Object.assign({},RV,{sky:0xF2C49A,fog:0xF0C8A0,hemi:[0xFFE0C0,0x8A4A30,1.05],sun:[0xFFC88A,2.5],sand:[.84,.52,.36],path:[.76,.5,.34],grass:[.72,.42,.3],grass2:[.6,.32,.24],edge:[.78,.5,.34],treeCol:0x5E7A3A,greyRocks:0,water:0x2F9AB0,deep:0x24788C,amb:'wind'}),
 evening:Object.assign({},RV,{sky:0x5A4F8E,fog:0x6C5E9A,fogN:40,fogF:160,hemi:[0xB0A0E8,0x4A3A3A,.8],sun:[0xFFB070,1.6],sunDir:[-50,22,10],exp:1.05,fireflies:1,treeCol:0x2E5A44,water:0x3A5C8E,deep:0x2A4A7A,amb:'night'}),
 rainriver:Object.assign({},RV,{sky:0x8C98A3,fog:0x99A5AF,fogN:40,fogF:150,hemi:[0xC3CDD6,0x6E6A5E,1],sun:[0xDDE4EA,1.1],rain:1,lava:false,water:0x4E8296,deep:0x3A6A7E,sand:[.66,.58,.44],grass:[.3,.52,.34],amb:'rain'}),
 crystal:Object.assign({},CV,{cryst:0x6FD8FF}),
 glowcave:Object.assign({},CV,{cryst:0x8CFF8A,fireflies:1,mush:1,grass:[.24,.32,.28],grass2:[.2,.26,.24]}),
 lavacave:Object.assign({},CV,{sky:0x120604,fog:0x2A0C06,hemi:[0xFF9A6A,0x2A1210,.6],cryst:0xFF7A2A,embers:1,deep:0x2A0800,water:0x3A0A02,rockCol:0x3A2A26,sand:[.3,.24,.22],grass:[.26,.2,.2],grass2:[.18,.14,.14],amb:'volcano'}),
 icecave:Object.assign({},CV,{sky:0x06101A,fog:0x0E2232,hemi:[0x9AD8FF,0x1A2A36,.7],cryst:0xA8F0FF,sand:[.62,.72,.8],path:[.72,.8,.86],grass:[.56,.66,.76],grass2:[.7,.8,.88],rockCol:0x6A8AA6,snow:1}),
 goldmine:Object.assign({},CV,{sky:0x0C0804,fog:0x1A1208,hemi:[0xFFD98A,0x2A2010,.6],cryst:0xFFC93C,sand:[.44,.36,.26],path:[.56,.46,.32],grass:[.38,.3,.22],grass2:[.3,.24,.18],rockCol:0x5A4630}),
 abyss:Object.assign({},CV,{sky:0x07040E,fog:0x120A22,cryst:0xC27BFF,hemi:[0x8A6AC8,0x140A20,.55]})});

/* ======================= THE OTHER ZONES ======================= */
/* Geometry Mountains, Fraction River and Mystery Caves reuse the island shapes, mirrored, with their own
   themes, trees, decorations and maths topics. */
function mirror(b,mx,mz,extra){const M=([x,z])=>[x*mx,z*mz];const o=Object.assign({},b,extra);
 o.S=(x,z)=>b.S.call(b,x*mx,z*mz);if(b.hill)o.hill=(x,z)=>b.hill(x*mx,z*mz);o.route=b.route.map(M);if(b.volc)o.volc=M(b.volc);if(b.close)o.close=b.close.map(M);
 if(b.bridges)o.bridges=b.bridges.map(([a,c,d,e])=>[...M([a,c]),...M([d,e])]);return o}
const B=ISLAND_LEVELS;
const ZCFG={
 island:{st:'ig',badge:'island',bname:'Treasure Hunter',word:'island',emoji:'🏝️',choose:'Choose your island',levels:ISLAND_LEVELS,voice:1,
  plan:()=>stops(['NI','TT']),fall:['Adding and taking away','Bigger numbers','Times tables','Multiplying','Dividing','Problem solving']},
 mount:{st:'gm',badge:'mount',bname:'Mountain Master',word:'mountain',emoji:'🏔️',choose:'Choose your mountain',after:' The Hilltop in Math City is now open!',
  plan:()=>stops(['SF','MM']),fall:['2D shapes','3D shapes','Angles','Perimeter','Area','Position and direction'],
  levels:[mirror(B[0],-1,1,{name:'Triangle Peak',theme:'alpine',deco:'geo',zones:['Base Camp','Pine Path','Snowy Ridge','Triangle Top'],story:'Snowy peaks and giant shapes! Climb past the gates to the treasure on Triangle Top.'}),
   mirror(B[3],1,-1,{name:'Cube Crag',theme:'snowfall',deco:'geo',lava:false,zones:['Frosty Foot','Cube Garden','Icicle Edge','Cube Crown'],story:'Snow is falling on Cube Crag. Walk around the great mountain to find the treasure.'}),
   mirror(B[2],-1,-1,{name:'Pyramid Pass',theme:'peakdusk',deco:'geo',zones:['Sunset Gate','Pyramid Steps','Golden Slope','Pyramid Point'],story:'The sun is setting over the pyramids. Use your maths to open the pass before dark!'}),
   mirror(B[5],1,-1,{name:'Prism Ridge',theme:'cloudy',deco:'geo',zones:['Cloud Rock','Prism Hop','Sky Bridge','Prism Peak'],story:'High above the clouds, rope bridges join the rocky peaks. Cross them all!'}),
   mirror(B[1],-1,1,{name:'Sphere Summit',theme:'snownight',deco:'geo',zones:['Moon Camp','Sphere Valley','Frozen Lake','Starlight Summit'],story:'A starry night in the mountains. Your lantern will light the way to the summit.'}),
   mirror(B[4],1,-1,{name:'Crystal Crown',theme:'crystalpeak',deco:'geo',zones:['Crystal Gate','Shimmer Path','Gem Ridge','The Crown'],story:'The highest mountain of all, covered in glowing crystals. The greatest treasure waits at the Crown!'})]},
 river:{st:'fr',badge:'river',bname:'River Ranger',word:'river',emoji:'🌊',choose:'Choose your river',
  plan:()=>stops(['FF']).concat(puzzles(['FF'],'Fraction puzzles')),fall:['Halves and quarters','Fractions of amounts','Equivalent fractions','Decimals','Fraction puzzles','Mixed fractions'],
  levels:[mirror(B[1],1,1,{name:'Halfway Falls',theme:'meadow',deco:'river',riverW:1,zones:['Meadow Bank','Halfway Bridge','Willow Bend','Halfway Falls'],story:'A sunny river meadow. Cross the bridges over the river to reach the treasure!'}),
   mirror(B[0],1,-1,{name:'Quarter Lagoon',theme:'jungleriver',deco:'river',riverW:1,zones:['Jungle Landing','Quarter Creek','Frog Pond','Quarter Lagoon'],story:'Warm rain falls on the jungle river. Follow the path from bridge to bridge.'}),
   mirror(B[2],1,1,{name:'Tenths Meadow',theme:'autumn',deco:'river',riverW:1,zones:['Maple Bank','Tenths Ford','Leaf Hollow','Golden Meadow'],story:'Orange and red trees line the river. Cross three bridges to find the treasure.'}),
   mirror(B[5],-1,1,{name:'Eighths Canyon',theme:'canyon',deco:'river',riverW:1,zones:['Red Rock','Canyon Bridge','Eagle Ledge','Canyon End'],story:'A river winds through a red rock canyon. Mind the edges!'}),
   mirror(B[4],-1,1,{name:'Fraction Forest',theme:'evening',deco:'river',riverW:1,zones:['Lantern Bank','Owl Woods','Firefly Ford','Forest Heart'],story:'Evening in the river forest. Fireflies light up as the sun goes down.'}),
   mirror(B[3],-1,-1,{name:'Decimal Delta',theme:'rainriver',deco:'river',riverW:1,lava:false,zones:['Delta Docks','Muddy Banks','Reed Maze','Delta Point'],story:'The great river splits into many streams. Find your way round the mountain to the treasure!'})]},
 caves:{st:'mc',badge:'caves',bname:'Cave Explorer',word:'cave',emoji:'🕯️',choose:'Choose your cave',
  plan:()=>stops(['DD','PP']).concat(puzzles(['NI','TT','MM','FF'],null)),fall:['Charts and tables','Number mysteries','Times table mysteries','Measure mysteries','Fraction mysteries','Mixed mysteries'],
  levels:[mirror(B[4],-1,-1,{name:'Crystal Grotto',theme:'crystal',deco:'cave',zones:['Grotto Gate','Blue Hall','Echo Pool','Crystal Heart'],story:'Glowing crystals light the dark grotto. Solve the mysteries to open each gate!'}),
   mirror(B[2],1,-1,{name:'Glow-Worm Hollow',theme:'glowcave',deco:'cave',zones:['Mossy Door','Glow-Worm Way','Mushroom Hall','The Hollow'],story:'Tiny glow-worms twinkle like stars. Follow the path deeper into the hollow.'}),
   mirror(B[3],-1,1,{name:'Lava Tunnels',theme:'lavacave',deco:'cave',zones:['Hot Steps','Magma Bend','Fire Hall','Dragon Den'],story:'Deep under the ground, lava glows red. Walk around the fiery pillar to the treasure.'}),
   mirror(B[0],-1,-1,{name:'Frozen Cavern',theme:'icecave',deco:'cave',zones:['Ice Door','Frost Tunnel','Icicle Hall','Frozen Vault'],story:'Everything is frozen in this icy cavern. Find the treasure in the Frozen Vault!'}),
   mirror(B[1],1,-1,{name:'Golden Mine',theme:'goldmine',deco:'cave',zones:['Mine Entrance','Cart Tracks','Gold Seam','Treasure Vault'],story:'An old gold mine full of sparkling nuggets. The miners hid their treasure at the very end.'}),
   mirror(B[5],-1,-1,{name:'The Deep Abyss',theme:'abyss',deco:'cave',zones:['Edge of the Deep','Floating Stones','Whisper Bridge','The Abyss'],story:'Stone islands float over a dark abyss. Cross every bridge to solve the final mystery!'})]}};
let ZC=ZCFG.island,ZID='island';
function stops(codes){const out=[];try{if(typeof C!=='undefined'&&C&&C.lands)codes.forEach(code=>{const l=C.lands.find(x=>x.code===code);if(l)l.stops.forEach(s=>out.push({code,n:s.n,topic:s.topic||l.name}))})}catch(e){}return out}
const PUZ={NI:'Number mysteries',TT:'Times table mysteries',MM:'Measure mysteries',FF:'Fraction mysteries'};
function puzzles(codes,name){const out=[];try{if(typeof C!=='undefined'&&C&&C.lands&&typeof advWords==='function')codes.forEach(code=>{if(advWords([code]).length>=3)out.push({code,puzzle:1,topic:name||PUZ[code]})})}catch(e){}return out}
/* trees and crystals, drawn with instancing so hundreds stay fast on iPads */
function instanced(list,parts){if(!list.length)return;const m4=new THREE.Matrix4(),q=new THREE.Quaternion(),e=new THREE.Euler(),one=new THREE.Vector3(1,1,1);
 parts.forEach(pt=>{const im=new THREE.InstancedMesh(pt.geo,pt.mat,list.length);im.castShadow=pt.shadow!==false;im.receiveShadow=true;
  list.forEach((t,i)=>{const local=new THREE.Matrix4().compose(new THREE.Vector3(...pt.pos),new THREE.Quaternion().setFromEuler(new THREE.Euler(...(pt.rot||[0,0,0]))),new THREE.Vector3(...(pt.scl||[1,1,1])));
   m4.compose(new THREE.Vector3(t.x,t.y,t.z),q.setFromEuler(e.set(0,t.ry,0)),one.clone().multiplyScalar(t.s));m4.multiply(local);im.setMatrixAt(i,m4)});scene.add(im)})}
function treeParts(kind){const T=TH,c=T.treeCol||0x2E7D4F,trunk=mat(0x6B4423),leaf=mat(c),em=T.cryst||0x7FE0FF;
 if(kind==='pine')return[{geo:new THREE.CylinderGeometry(.25,.35,1.6,6),mat:trunk,pos:[0,.8,0]},{geo:new THREE.ConeGeometry(1.9,2.8,7),mat:leaf,pos:[0,2.4,0]},{geo:new THREE.ConeGeometry(1.45,2.4,7),mat:leaf,pos:[0,3.7,0]},{geo:new THREE.ConeGeometry(1,2,7),mat:T.snowTips?mat(0xF4F8FF):leaf,pos:[0,4.8,0]}];
 if(kind==='round')return[{geo:new THREE.CylinderGeometry(.3,.42,2.6,6),mat:trunk,pos:[0,1.3,0]},{geo:new THREE.IcosahedronGeometry(1.9,0),mat:leaf,pos:[0,3.5,0]},{geo:new THREE.IcosahedronGeometry(1.3,0),mat:mat(T.treeCol2||c),pos:[.9,4.3,.3]}];
 if(kind==='stalag')return[{geo:new THREE.ConeGeometry(.9,4.2,6),mat:mat(T.rockCol||0x5A5470),pos:[0,2.1,0]},{geo:new THREE.ConeGeometry(.55,2.6,6),mat:mat(T.rockCol||0x5A5470),pos:[1,1.3,.4]},
  {geo:new THREE.OctahedronGeometry(.45,0),mat:new THREE.MeshStandardMaterial({color:em,emissive:em,emissiveIntensity:1.4,flatShading:true}),pos:[-.7,.5,.5],scl:[1,2.4,1],shadow:false}];
 if(kind==='crystal')return[{geo:new THREE.OctahedronGeometry(.7,0),mat:new THREE.MeshStandardMaterial({color:em,emissive:em,emissiveIntensity:1.2,flatShading:true,transparent:true,opacity:.92}),pos:[0,1.9,0],scl:[1,3,1],shadow:false},
  {geo:new THREE.OctahedronGeometry(.5,0),mat:new THREE.MeshStandardMaterial({color:em,emissive:em,emissiveIntensity:1.2,flatShading:true}),pos:[.8,1.1,.3],rot:[0,0,-.4],scl:[1,2.6,1],shadow:false},
  {geo:new THREE.OctahedronGeometry(.45,0),mat:new THREE.MeshStandardMaterial({color:em,emissive:em,emissiveIntensity:1.2,flatShading:true}),pos:[-.7,1,-.3],rot:[0,0,.5],scl:[1,2.4,1],shadow:false}];
 return[]}
/* river zone: the walls between the zones are rivers, crossed by a bridge at each gate */
function riverLayout(){L._rw=[];if(!L.riverW)return;const segs=[],br=[];
 GATES.forEach(g=>{const nx=-g.dz,nz=g.dx,end=[];for(const sgn of [1,-1]){let last=4;for(let d=4;d<95;d+=2){const x=g.x+nx*d*sgn,z=g.z+nz*d*sgn;if(hgt(x,z)<-1.4)break;if(L.volc&&Math.hypot(x-L.volc[0],z-L.volc[1])<20)break;if(pathD(x,z)<10&&Math.abs(arcOf(x,z)-g.s)>10)break;last=d}end.push([g.x+nx*(last+(hgt(g.x+nx*(last+2)*sgn,g.z+nz*(last+2)*sgn)<-1?3:0))*sgn,g.z+nz*(last+(hgt(g.x+nx*(last+2)*sgn,g.z+nz*(last+2)*sgn)<-1?3:0))*sgn])}
  segs.push([end[0][0],end[0][1],end[1][0],end[1][1]]);br.push([g.x-g.dx*6,g.z-g.dz*6,g.x+g.dx*6,g.z+g.dz*6])});
 L._rw=segs;L.bridges=L._bridges0.concat(br)}
function riverD(x,z){let d=1e9;(L._rw||[]).forEach(s=>d=Math.min(d,segD(x,z,[s[0],s[1]],[s[2],s[3]])));return d}
/* mountain zone: extra peaks away from the path */
function peaksLayout(){L._pk=[];if(TH_OF(L).peaks!==1)return;let seed=LV*31+7;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
 for(let i=0;i<400&&L._pk.length<11;i++){const x=-100+rnd()*200,z=-55+rnd()*110;if(hgt(x,z)<1)continue;if(pathD(x,z)<17||GATES.some(g=>Math.hypot(g.x-x,g.z-z)<16)||Math.hypot(FINAL.x-x,FINAL.z-z)<18||L._pk.some(p=>Math.hypot(p[0]-x,p[1]-z)<16))continue;L._pk.push([x,z,7+rnd()*6,70+rnd()*60])}}
function TH_OF(l){return THEMES[l.theme]}
function geoDecor(){const cols=[0xF28C8C,0x8CC8F2,0xF2D98C,0xA8E6A1,0xC9A8F2,0xF2B38C];const shapes=[()=>new THREE.BoxGeometry(3,3,3),()=>new THREE.ConeGeometry(2.2,3.6,4),()=>new THREE.CylinderGeometry(1.5,1.5,3.6,6),()=>new THREE.IcosahedronGeometry(1.9,0),()=>new THREE.TetrahedronGeometry(2.4,0),()=>new THREE.CylinderGeometry(1.6,1.6,3.2,24),()=>new THREE.SphereGeometry(1.9,16,12)];
 let n=0;for(let i=0;i<500&&n<26;i++){const x=-100+Math.random()*200,z=-55+Math.random()*110;if(!onLand(x,z,.8))continue;const g=pick(shapes)(),m=new THREE.Mesh(g,mat(pick(cols),{roughness:.5}));const s=.8+Math.random()*.9;m.scale.setScalar(s);
  m.position.set(x,hgt(x,z)+1.6*s,z);m.rotation.set(Math.random()*.3,Math.random()*6,Math.random()*.3);m.castShadow=m.receiveShadow=true;scene.add(m);COL.push({x,z,r:2.2*s});n++}}
function caveDecor(){const em=TH.cryst||0x7FE0FF;let n=0;const lights=[];GATES.forEach(g=>lights.push([g.x,g.z]));BOXES.filter(b=>b.k==='q').forEach(b=>lights.push([b.x,b.z]));lights.push([FINAL.x,FINAL.z]);
 lights.forEach(([x,z])=>{const pl=new THREE.PointLight(em,30,26,1.4);pl.position.set(x,hgt(x,z)+5,z);scene.add(pl)});
 for(let i=0;i<500&&n<20;i++){const x=-100+Math.random()*200,z=-55+Math.random()*110;if(!onLand(x,z,.8))continue;const t=place(pick(['rocks-a','rocks-b','rocks-c']),x,z,{s:2.4+Math.random(),ry:Math.random()*6.3,dy:-.4});if(t)t.scale.y*=2.2;COL.push({x,z,r:2.4});n++}}
function riverDecor(){(L.bridges||[]).forEach((b,i)=>{const mx=(b[0]+b[2])/2,mz=(b[1]+b[3])/2,dx=b[2]-b[0],dz=b[3]-b[1],l=Math.hypot(dx,dz),nx=-dz/l,nz=dx/l;for(const s of [10,-12]){const x=mx+nx*s,z=mz+nz*s;if(hgt(x,z)<-.6&&hgt(x,z)>-2.5){place('boat-row-small',x,z,{s:1.3,ry:Math.atan2(dx,dz)+.4,y:-.25});break}}});
 const reeds=[];for(let i=0;i<4000&&reeds.length<260;i++){const x=-104+Math.random()*208,z=-58+Math.random()*116,h=hgt(x,z);if(h<.1||h>.75||pathD(x,z)<3||bridgeD(x,z)<4)continue;reeds.push({x,y:h,z,ry:Math.random()*6,s:.7+Math.random()*.6})}
 instanced(reeds,[{geo:new THREE.CylinderGeometry(.04,.06,1.8,4),mat:mat(0x6F8A3A),pos:[0,.9,0],shadow:false},{geo:new THREE.CylinderGeometry(.04,.06,1.4,4),mat:mat(0x7E9A44),pos:[.25,.7,.1],rot:[0,0,.2],shadow:false},{geo:new THREE.CapsuleGeometry(.09,.35,2,6),mat:mat(0x6B4423),pos:[0,1.8,0],shadow:false}]);
 SHIPS.push(place('ship-small',FINAL.x>0?-70:70,FINAL.z>0?-66:66,{s:2,ry:.8,y:-1}))}

let LEVELS=ISLAND_LEVELS;
let L=LEVELS[0],LV=1,TH=THEMES.sunny,ROUTE=L.route,RARC=[],GATES=[],STARTS=[],FINAL={x:0,z:0},BOXES=[],ZONES=[];
function segD(px,pz,a,b){const dx=b[0]-a[0],dz=b[1]-a[1],l=dx*dx+dz*dz;let t=l?((px-a[0])*dx+(pz-a[1])*dz)/l:0;t=Math.max(0,Math.min(1,t));return Math.hypot(px-a[0]-t*dx,pz-a[1]-t*dz)}
function pathD(x,z){let d=1e9;for(let i=0;i<ROUTE.length-1;i++)d=Math.min(d,segD(x,z,ROUTE[i],ROUTE[i+1]));return d}
function bridgeD(x,z){if(!L.bridges)return 1e9;let d=1e9;L.bridges.forEach(b=>d=Math.min(d,segD(x,z,[b[0],b[1]],[b[2],b[3]])));return d}
function hgt(x,z){const s=L.S(x,z),t=sm(1.12,.82,s);let h=-3+t*4.3;h+=t*(Math.sin(x*.13)*Math.cos(z*.11)*.35+Math.sin(x*.05+z*.07)*.3);
 if(L.hill)h+=t*L.hill(x,z);h+=t*bump(x,z,FINAL.x,FINAL.z,2.6,420);if(L._pk)for(const p of L._pk)h+=t*bump(x,z,p[0],p[1],p[2],p[3]);
 if(L._rw&&L._rw.length){const d=riverD(x,z);if(d<4.2)h=Math.min(h,-.4-1.6*Math.min(1,(4.2-d)/2.2))}if(L.bridges&&bridgeD(x,z)<2.6)h=Math.max(h,.6);return h}
const land=(x,z)=>{const h=hgt(x,z);return h>.35&&h<5.2};
/* where things go, worked out from the route */
function routeAt(s){for(let i=0;i<ROUTE.length-1;i++){const a=ROUTE[i],b=ROUTE[i+1],l=Math.hypot(b[0]-a[0],b[1]-a[1]);if(s<=RARC[i]+l||i===ROUTE.length-2){const t=Math.max(0,Math.min(1,(s-RARC[i])/l));const dx=(b[0]-a[0])/l,dz=(b[1]-a[1])/l;return{x:a[0]+dx*l*t,z:a[1]+dz*l*t,dx,dz}}}}
function arcOf(x,z){let best=1e9,arc=0;for(let i=0;i<ROUTE.length-1;i++){const a=ROUTE[i],b=ROUTE[i+1],dx=b[0]-a[0],dz=b[1]-a[1],l2=dx*dx+dz*dz;let t=((x-a[0])*dx+(z-a[1])*dz)/l2;t=Math.max(0,Math.min(1,t));const d=Math.hypot(x-a[0]-t*dx,z-a[1]-t*dz);if(d<best){best=d;arc=RARC[i]+t*Math.sqrt(l2)}}return arc}
function sideSpot(s,off){const p=routeAt(s);for(const k of [1,-1,1.4,-1.4,.7,-.7]){const x=p.x-p.dz*off*k,z=p.z+p.dx*off*k;if(GATES.every(g=>Math.hypot(g.x-x,g.z-z)>9)&&hgt(x,z)>.8&&hgt(x,z)<4&&pathD(x,z)>2.8&&!(L.volc&&Math.hypot(x-L.volc[0],z-L.volc[1])<24)&&[.25,.5,.75].every(t=>hgt(p.x+(x-p.x)*t,p.z+(z-p.z)*t)>.5))return{x,z,lane:[p.x,p.z]}}return{x:p.x-p.dz*2.5,z:p.z+p.dx*2.5,lane:[p.x,p.z]}}
function layout(){ROUTE=L.route;RARC=[0];for(let i=1;i<ROUTE.length;i++)RARC.push(RARC[i-1]+Math.hypot(ROUTE[i][0]-ROUTE[i-1][0],ROUTE[i][1]-ROUTE[i-1][1]));
 const tot=RARC[RARC.length-1],end=ROUTE[ROUTE.length-1];FINAL={x:end[0],z:end[1]};ZONES=L.zones.map(name=>({name}));
 GATES=L.gi.map(i=>{const a=ROUTE[i],b=ROUTE[i+1];let dx=b[0]-a[0],dz=b[1]-a[1];const l=Math.hypot(dx,dz);return{x:(a[0]+b[0])/2,z:(a[1]+b[1])/2,dx:dx/l,dz:dz/l,s:RARC[i]+l/2}});
 STARTS=[ROUTE[0]].concat(GATES.map(g=>[g.x+g.dx*6,g.z+g.dz*6]));
 if(L._bridges0===undefined)L._bridges0=L.bridges||[];L.bridges=L._bridges0.slice();L._rw=[];L._pk=[];riverLayout();peaksLayout();
 const zs=[0].concat(GATES.map(g=>g.s)).concat([tot]);let seed=LV*97+3;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
 BOXES=[0,1,2].map(k=>Object.assign(sideSpot(zs[k]+(zs[k+1]-zs[k])*.62,4.6),{k:'q'}));
 for(let k=0;k<4;k++)for(let j=0;j<2;j++){const s=zs[k]+(zs[k+1]-zs[k])*(j?.82:.3)+(rnd()-.5)*6;const p=sideSpot(s,7+rnd()*5);if(BOXES.every(b=>Math.hypot(b.x-p.x,b.z-p.z)>6))BOXES.push(Object.assign(p,{k:'s'}))}}
function laneD(x,z){let d=1e9;BOXES.forEach(b=>{if(b.lane)d=Math.min(d,segD(x,z,b.lane,[b.x,b.z]))});return d}
function zoneOf(x,z){const a=arcOf(x,z);let n=0;GATES.forEach(g=>{if(a>g.s+1)n++});return n}

/* ---------- three.js setup ---------- */
let renderer,scene,camera,sun,clock,raf=0,LOADED=null,ocean,oceanBase;
const loader=new GLTFLoader();const MODELS={};
const NEED=['palm-bend','palm-straight','palm-detailed-bend','palm-detailed-straight','rocks-a','rocks-b','rocks-c','rocks-sand-a','rocks-sand-b','rocks-sand-c','chest','crate','barrel','castle-gate','ship-pirate-large','ship-wreck','structure-platform-dock','boat-row-small','tower-watch','flag-pirate','grass-plant','patch-grass-foliage','hole','tool-shovel','crate-bottles','cannon','ship-pirate-medium','castle-wall','tower-complete-large','tower-complete-small','cannon-mobile','ship-ghost','mast-ropes','structure-roof','ship-large','boat-row-large','bottle-large','ship-small'];
function loadModels(onp){if(LOADED)return LOADED;let n=0;LOADED=Promise.all(NEED.map(k=>new Promise(res=>loader.load(MP+k+'.glb',g=>{
  g.scene.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true}});const bb=new THREE.Box3().setFromObject(g.scene);MODELS[k]={g,bb};n++;onp(n/NEED.length);res()},undefined,()=>{n++;onp(n/NEED.length);res()}))));return LOADED}
function place(k,x,z,o={}){const m=MODELS[k];if(!m)return null;const obj=m.g.scene.clone(true);const s=o.s||1;obj.scale.setScalar(s);obj.rotation.y=o.ry||0;
 obj.position.set(x,(o.y!==undefined?o.y:hgt(x,z))-m.bb.min.y*s+(o.dy||0),z);scene.add(obj);return obj}
const mat=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.8,flatShading:true},o));

function rockLine(pts){pts.forEach(([x,z])=>{if(hgt(x,z)<-1.4||pathD(x,z)<3.4||laneD(x,z)<3.2)return;const k=pick(['rocks-a','rocks-b','rocks-c']);place(k,x+(Math.random()-.5)*1.2,z+(Math.random()-.5)*1.2,{s:2.1+Math.random()*.7,ry:Math.random()*6.3,dy:-.4});COL.push({x,z,r:2.3})})}
function wallAt(g){const nx=-g.dz,nz=g.dx,pts=[];for(const sgn of [1,-1]){let miss=0;for(let d=4.6;d<90;d+=3.1){const x=g.x+nx*d*sgn,z=g.z+nz*d*sgn;if(L.volc&&Math.hypot(x-L.volc[0],z-L.volc[1])<21)break;if(hgt(x,z)<-1.4){if(++miss>1)break;continue}miss=0;if(pathD(x,z)<5.5&&Math.abs(arcOf(x,z)-g.s)>10)break;pts.push([x,z])}}rockLine(pts)}
function buildWorld(){scene=new THREE.Scene();TH=THEMES[L.theme];scene.background=new THREE.Color(TH.sky);scene.fog=new THREE.Fog(TH.fog,TH.fogN,TH.fogF);renderer.toneMappingExposure=TH.exp;
 G.hemi=new THREE.HemisphereLight(TH.hemi[0],TH.hemi[1],TH.hemi[2]);scene.add(G.hemi);
 sun=new THREE.DirectionalLight(TH.sun[0],TH.sun[1]);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);
 const sc=sun.shadow.camera;sc.left=-40;sc.right=40;sc.top=40;sc.bottom=-40;sc.near=1;sc.far=140;sun.shadow.bias=-.0008;scene.add(sun);scene.add(sun.target);
 // terrain
 const tg=new THREE.PlaneGeometry(272,164,136,82);tg.rotateX(-Math.PI/2);const p=tg.attributes.position,col=[];const c=new THREE.Color(),deep=new THREE.Color(TH.deep);
 for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i),h=hgt(x,z);p.setY(i,h);
  const pd=pathD(x,z),n=Math.sin(x*1.7)*Math.cos(z*1.3)*.04,bd=bridgeD(x,z);
  if(h<.2)c.setRGB(TH.sand[0]-.03,TH.sand[1]-.02,TH.sand[2]).lerp(deep,Math.min(1,(.2-h)/2.6));
  else if(bd<2.6)c.setRGB(.55,.38,.22);
  else if(pd<2.6){const v=TH.stone?((Math.floor(x/1.6)+Math.floor(z/1.6))%2?.05:-.04)+n:n;c.setRGB(TH.path[0]+v,TH.path[1]+v,TH.path[2]+v)}
  else if(h<.62)c.setRGB(TH.sand[0]+n,TH.sand[1]+n,TH.sand[2]+n);
  else if(pd<3.6||h<.75)c.setRGB(...TH.edge);
  else c.setRGB(TH.grass[0]+n,TH.grass[1]+n,TH.grass[2]+n).lerp(new THREE.Color(...TH.grass2),Math.max(0,Math.min(1,(h-1.4)/(L.volc?4:2))));
  if(L.volc&&L.lava!==false){const d=Math.hypot(x-L.volc[0],z-L.volc[1]);if(d<30&&h>1.5)c.lerp(new THREE.Color(.18,.15,.15),Math.min(1,(30-d)/10))}
  if(TH.snowH&&h>TH.snowH)c.lerp(new THREE.Color(.95,.97,1),Math.min(1,(h-TH.snowH)/1.2));
  col.push(c.r,c.g,c.b)}
 tg.setAttribute('color',new THREE.Float32BufferAttribute(col,3));tg.computeVertexNormals();
 const terr=new THREE.Mesh(tg,new THREE.MeshStandardMaterial({vertexColors:true,flatShading:true,roughness:.95}));terr.receiveShadow=true;scene.add(terr);
 // ocean
 const og=new THREE.PlaneGeometry(520,420,90,72);og.rotateX(-Math.PI/2);ocean=new THREE.Mesh(og,new THREE.MeshStandardMaterial({color:TH.water,transparent:!TH.void,opacity:TH.void?1:TH.cloudSea?.93:.78,roughness:.25,metalness:.05,flatShading:true}));
 ocean.receiveShadow=true;scene.add(ocean);oceanBase=Float32Array.from(og.attributes.position.array);
 const far=new THREE.Mesh(new THREE.PlaneGeometry(2000,2000).rotateX(-Math.PI/2),TH.void?new THREE.MeshBasicMaterial({color:0x000000}):mat(TH.deep,{roughness:.4}));far.position.y=-3.3;scene.add(far);
 COL.length=0;PALMS=0;SHIPS.length=0;
 if(L.volc){COL.push({x:L.volc[0],z:L.volc[1],r:21})}
 if(L.volc&&L.lava!==false){const lava=new THREE.Mesh(new THREE.CircleGeometry(5.4,24).rotateX(-Math.PI/2),new THREE.MeshStandardMaterial({color:0xFF5A1F,emissive:0xFF3D00,emissiveIntensity:1.6}));
  lava.position.set(L.volc[0],hgt(L.volc[0],L.volc[1])+.6,L.volc[1]);scene.add(lava);const pl=new THREE.PointLight(0xFF6A2A,60,40);pl.position.set(L.volc[0],hgt(L.volc[0],L.volc[1])+4,L.volc[1]);scene.add(pl);G.smoke=[];
  for(let i=0;i<10;i++){const m=new THREE.Mesh(new THREE.IcosahedronGeometry(1.6,0),new THREE.MeshStandardMaterial({color:0x6E6460,transparent:true,opacity:.55,flatShading:true}));scene.add(m);G.smoke.push({m,t:i/10})}}
 // bridges (Skull Archipelago)
 (L.bridges||[]).forEach(b=>{const dx=b[2]-b[0],dz=b[3]-b[1],l=Math.hypot(dx,dz),wood=mat(0x9B6A3E),dark=mat(0x6B4423);const g=new THREE.Group();
  for(let k=0;k<=l;k+=1.1){const pl=new THREE.Mesh(new THREE.BoxGeometry(5,.25,.9),k%2.2<1.1?wood:dark);pl.position.set(0,0,k-l/2);pl.castShadow=pl.receiveShadow=true;g.add(pl)}
  [-2.4,2.4].forEach(s=>{const r=new THREE.Mesh(new THREE.BoxGeometry(.2,.2,l),dark);r.position.set(s,1,0);g.add(r);for(let k=0;k<=l;k+=3){const po=new THREE.Mesh(new THREE.BoxGeometry(.3,1.6,.3),dark);po.position.set(s,.5,k-l/2);po.castShadow=true;g.add(po)}});
  g.position.set((b[0]+b[2])/2,.75,(b[1]+b[3])/2);g.rotation.y=Math.atan2(dx,dz);scene.add(g)});
 // gates, each in a wall of rocks across the island
 G.gates=GATES.map(gt=>{if(!L.riverW)wallAt(gt);const ry=Math.atan2(gt.dx,gt.dz);const arch=place('castle-gate',gt.x,gt.z,{s:1,ry,dy:-.2});
   if(arch){const bb=new THREE.Box3().setFromObject(arch),sz=bb.getSize(new THREE.Vector3());const s=8.4/Math.max(sz.x,sz.z);arch.scale.setScalar(s);arch.position.y=hgt(gt.x,gt.z)-MODELS['castle-gate'].bb.min.y*s-.2}
   const bars=new THREE.Group();const wood=mat(0x6B4423);for(let k=-2;k<=2;k++){const b=new THREE.Mesh(new THREE.BoxGeometry(.35,5.2,.35),wood);b.position.set(0,2.6,k*1.05);b.castShadow=true;bars.add(b)}
   for(let k=0;k<3;k++){const b=new THREE.Mesh(new THREE.BoxGeometry(.3,.3,5),wood);b.position.set(0,1+k*1.6,0);bars.add(b)}
   bars.position.set(gt.x,hgt(gt.x,gt.z),gt.z);bars.rotation.y=ry-Math.PI/2;scene.add(bars);const nx=-gt.dz,nz=gt.dx;
   place('flag-pirate',gt.x+nx*5.6,gt.z+nz*5.6,{s:1.6});place('flag-pirate',gt.x-nx*5.6,gt.z-nz*5.6,{s:1.6});
   COL.push({x:gt.x+nx*4.6,z:gt.z+nz*4.6,r:1.4},{x:gt.x-nx*4.6,z:gt.z-nz*4.6,r:1.4});const blk={x:gt.x,z:gt.z,r:3.2};COL.push(blk);
   return{x:gt.x,z:gt.z,open:false,anim:0,bars,blk}});
 if(L.close){const [a,b]=L.close,l=Math.hypot(b[0]-a[0],b[1]-a[1]),pts=[];for(let d=0;d<=l;d+=3.1)pts.push([a[0]+(b[0]-a[0])*d/l,a[1]+(b[1]-a[1])*d/l]);rockLine(pts)}
 // the dig site and boxes are placed before the trees, so the trees keep clear of them
 G.final.x=new THREE.Group();const red=mat(0xC0263A);[[1,1],[1,-1]].forEach(([a,b])=>{const m=new THREE.Mesh(new THREE.BoxGeometry(5.2,.25,1),red);m.rotation.y=Math.atan2(a,b)+Math.PI/4;m.position.y=.12;m.receiveShadow=true;G.final.x.add(m)});
 G.final.x.position.set(FINAL.x,hgt(FINAL.x,FINAL.z)+.05,FINAL.z);scene.add(G.final.x);place('tool-shovel',FINAL.x+3.6,FINAL.z+1.5,{s:1.6,ry:.5});
 G.final.ring=ring(FINAL.x,FINAL.z,4.2,0xFFD166);
 G.boxes=BOXES.map(b=>{const gold=b.k==='q';const obj=place(gold?'chest':'crate',b.x,b.z,{s:gold?1.5:1.25,ry:gold?.4:0});
  let mixer=null,act=null;if(gold&&obj){mixer=new THREE.AnimationMixer(obj);const clip=MODELS.chest.g.animations.find(a=>a.name==='open');if(clip){act=mixer.clipAction(clip);act.setLoop(THREE.LoopOnce);act.clampWhenFinished=true}}
  const rg=ring(b.x,b.z,gold?2.4:1.9,gold?0xFFD166:0xB79CFF);COL.push({x:b.x,z:b.z,r:1.3});return Object.assign({},b,{open:false,obj,mixer,act,ring:rg,anim:0})});
 decorate();
 // palms, rocks and plants
 const palmK=['palm-bend','palm-straight','palm-detailed-bend','palm-detailed-straight'],TREES={};let seed=7+LV*13;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};const pd=L.volc?.35:.62;
 for(let i=0;i<1100&&PALMS<(L.volc?80:160);i++){const x=-108+rnd()*216,z=-60+rnd()*120;if(!land(x,z))continue;const h=hgt(x,z);
  if(pathD(x,z)<5.5||bridgeD(x,z)<4||laneD(x,z)<3.5)continue;if(BOXES.some(b=>Math.hypot(b.x-x,b.z-z)<5)||Math.hypot(FINAL.x-x,FINAL.z-z)<9||STARTS.some(s=>Math.hypot(s[0]-x,s[1]-z)<5))continue;
  if(COL.some(c=>Math.hypot(c.x-x,c.z-z)<c.r+2.2))continue;const r=rnd();
  if(r<pd){const kind=TH.tree2&&rnd()<.35?TH.tree2:(TH.tree||'palm');if(kind==='palm')place(palmK[Math.floor(rnd()*4)],x,z,{s:1.6+rnd()*.7,ry:rnd()*6.3,dy:-.2});else(TREES[kind]=TREES[kind]||[]).push({x,y:hgt(x,z)-.15,z,ry:rnd()*6.3,s:.85+rnd()*.5});COL.push({x,z,r:.9});PALMS++}
  else if(r<pd+.15){place((L.volc||TH.greyRocks)?pick(['rocks-a','rocks-b','rocks-c']):pick(['rocks-sand-a','rocks-sand-b','rocks-sand-c']),x,z,{s:1+rnd()*.6,ry:rnd()*6.3,dy:-.3});COL.push({x,z,r:2})}
  else if(h>.9&&!TH.void&&!(TH.snowH&&h>TH.snowH))place(r<.88?'grass-plant':'patch-grass-foliage',x,z,{s:1.2+rnd(),ry:rnd()*6.3,dy:-.1})}
 Object.keys(TREES).forEach(k=>instanced(TREES[k],treeParts(k)));
 // creatures, along the route
 const zs=[0].concat(GATES.map(g=>g.s)).concat([RARC[RARC.length-1]]),zm=k=>(zs[k]+zs[k+1])/2;G.critters=[];
 const crabAt=s=>{const p=routeAt(s),o=sideSpot(s,5.5);G.critters.push({k:'crab',a:[o.x-p.dx*7,o.z-p.dz*7],b:[o.x+p.dx*7,o.z+p.dz*7],t:Math.random(),obj:walker()})};
 [zm(1)-12,zm(1)+10,zm(2)-8,zm(2)+12,zm(3)].forEach(crabAt);if(LV>=3)[zm(0)+10,zm(3)-14].forEach(crabAt);
 [zm(2),zm(2)+18,zm(3)].concat(LV>=4?[zm(1)]:[]).forEach((s,i)=>{const p=routeAt(s);G.critters.push({k:'gull',cx:p.x,cz:p.z,r:11+i*2,t:i*2,obj:flyer()})});
 G.sand=[];[zm(1)-16,zm(1)-4,zm(1)+8].concat(LV>=2?[zm(0)+6]:[]).forEach(s=>{const o=sideSpot(s,6.5);const {x,z}=o;if(!land(x,z))return;
  const m=new THREE.Mesh(new THREE.CylinderGeometry(3,3,.12,20),mat(CR().slow,{roughness:1}));m.position.set(x,hgt(x,z)+.06,z);m.receiveShadow=true;scene.add(m);
  const sw=new THREE.Mesh(new THREE.TorusGeometry(1.6,.12,6,24),mat(CR().slow2));sw.rotation.x=Math.PI/2;sw.position.set(x,hgt(x,z)+.15,z);scene.add(sw);G.sand.push({x,z,r:3,sw})});
 G.urch=[];for(let i=0;i<10+LV*2;i++){const s=zs[2]+Math.random()*(zs[3]-zs[2]+(LV>=4?zs[2]-zs[1]:0))-(LV>=4?zs[2]-zs[1]:0);const p=sideSpot(s,3+Math.random()*4);const {x,z}=p;if(!land(x,z)||pathD(x,z)<2.4||COL.some(c=>Math.hypot(c.x-x,c.z-z)<c.r+1))continue;const u=urchin();u.position.set(x,hgt(x,z)+.4,z);scene.add(u);G.urch.push({x,z,obj:u})}
 // explorer and compass
 G.hero=hero();scene.add(G.hero.g);
 G.arrow=new THREE.Mesh(new THREE.ConeGeometry(.45,1.4,4),mat(0xFFC93C,{emissive:0x7A4A10,emissiveIntensity:.4}));G.arrow.rotation.z=-Math.PI/2;const ag=new THREE.Group();ag.add(G.arrow);G.arrowG=ag;scene.add(ag);
 G.fx=[];LANDC=null;addWeather()}
/* the things that make each island different */
function onLand(x,z,need=.6){return hgt(x,z)>need&&pathD(x,z)>6&&laneD(x,z)>4.5&&!COL.some(c=>Math.hypot(c.x-x,c.z-z)<c.r+2)&&BOXES.every(b=>Math.hypot(b.x-x,b.z-z)>8)}
function decorate(){if(L.deco==='geo')geoDecor();if(L.deco==='river')riverDecor();if(L.deco==='cave'){caveDecor();return}const s0=ROUTE[0],s1=ROUTE[1],dx=s0[0]-s1[0],dz=s0[1]-s1[1],l=Math.hypot(dx,dz);
 // a dock where the explorer lands
 let x=s0[0],z=s0[1];for(let k=0;k<30&&land(x,z);k++){x+=dx/l;z+=dz/l}if(!land(x,z)){place('structure-platform-dock',x+dx/l*2,z+dz/l*2,{s:1.6,ry:Math.atan2(dx,dz)+Math.PI,y:.2});place('boat-row-small',x+dx/l*5-dz/l*5,z+dz/l*5+dx/l*5,{s:1.4,ry:.4,y:-.3})}
 const sea=(a,ry,s,k)=>{const p=a;SHIPS.push(place(k||'ship-pirate-large',p[0],p[1],{s:s||2.2,ry,y:-1.1}))};
 const prop=(k,x,z,s,r=1.6)=>{if(onLand(x,z,.5)){place(k,x,z,{s,ry:Math.random()*6.3});COL.push({x,z,r})}};
 const D=L.deco;
 if(D==='harbour'){prop('crate-bottles',-86,30,1.2,2);prop('barrel',-82,33,1.1,1);prop('tower-watch',-70,8,1.5,2.6);prop('cannon',44,-5,1.4,1.5);sea([-20,74],Math.PI/2.4);sea([62,-78],-Math.PI/1.7,2);place('ship-wreck',-30,-60,{s:1.8,ry:.6,y:-1.4})}
 if(D==='wrecks'){place('ship-wreck',-8,-22,{s:2,ry:-.5,y:-1.5});place('ship-wreck',40,-34,{s:1.6,ry:1.1,y:-1.4});SHIPS.push(place('ship-pirate-medium',8,-48,{s:2,ry:1.3,y:-1}));sea([-10,76],Math.PI/2,2.4);
  [[-60,42],[-40,46],[30,48],[60,34],[76,20]].forEach(([x,z],i)=>prop(['barrel','crate','crate-bottles','barrel','bottle-large'][i],x,z,1.1,1.2));prop('tower-watch',-90,20,1.5,2.6)}
 if(D==='fortress'){[[-60,-10],[-20,-38],[0,-5],[20,24],[55,-5],[72,14]].forEach(([x,z],i)=>prop(i%2?'tower-complete-small':'tower-complete-large',x,z,1.6,3));
  [[-40,-6],[44,-24],[10,52],[-78,-30]].forEach(([x,z])=>prop('cannon-mobile',x,z,1.3,1.6));[[-30,-46],[30,0]].forEach(([x,z])=>prop('castle-wall',x,z,1.6,3));sea([-30,-72],.3,2.4);sea([70,72],Math.PI,2)}
 if(D==='volcano'){[[-80,-10],[-30,-30],[40,-30],[70,10],[40,40],[-10,30]].forEach(([x,z])=>prop(pick(['rocks-a','rocks-b']),x,z,2.4,2.6));prop('tower-watch',-78,30,1.5,2.6);sea([90,-60],-1,2.2,'ship-pirate-medium')}
 if(D==='ghost'){SHIPS.push(place('ship-ghost',0,0,{s:2.6,ry:.8,y:-1.2}));[[-70,20],[-60,-30],[50,-30],[70,20]].forEach(([x,z])=>prop('mast-ropes',x,z,1.4,1.4));[[-80,0],[0,-44],[80,0]].forEach(([x,z])=>prop('barrel',x,z,1.2,1.2))}
 if(D==='archipelago'){L.isl.forEach(([cx,cz],i)=>{prop(i%2?'structure-roof':'tower-watch',cx+(i%2?8:-8),cz-(i%2?-10:10),1.5,3)});sea([0,-58],.2,2.2,'ship-large');sea([-40,58],2.4,2,'ship-pirate-medium');place('boat-row-large',50,40,{s:1.6,ry:.8,y:-.3})}}

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
/* creatures and hazards for each zone */
const CRIT={island:{w:'crab',f:'gull',hw:'Snap! A crab pinched you! 🦀',hf:'A seagull swooped at you! 🐦',hz:'Ouch, spiky sea urchins!',spike:0x5B2A6E,spike2:0x2B1B3A,slow:0xB98A4E,slow2:0x8A6230},
 mount:{w:'boulder',f:'eagle',hw:'Bump! A rolling snowball hit you! ⛄',hf:'An eagle swooped at you! 🦅',hz:'Ouch, sharp icicles!',spike:0xBFE8FF,spike2:0x8CCBF0,slow:0xCFEFFF,slow2:0x9AD4F0},
 river:{w:'frog',f:'gull',hw:'Boing! A jumpy frog knocked you over! 🐸',hf:'A heron swooped at you! 🐦',hz:'Ouch, a thorny bush!',spike:0x3F6E2E,spike2:0x2A4A1E,slow:0x7A5A36,slow2:0x5A3E22},
 caves:{w:'spider',f:'bat',hw:'Eek! A cave spider made you jump! 🕷️',hf:'A bat flapped into you! 🦇',hz:'Ouch, sharp crystals!',spike:0xB98CFF,spike2:0x6A4AA6,slow:0x3A3A4A,slow2:0x6A6A88}};
function CR(){return CRIT[ZID]||CRIT.island}
function walker(){const k=CR().w;if(k==='crab')return crab();const g=new THREE.Group();
 if(k==='boulder'){const b=new THREE.Mesh(new THREE.IcosahedronGeometry(.95,1),mat(0xF4F8FF,{roughness:.9}));b.position.y=.95;b.castShadow=true;g.add(b);g.userData.roll=b}
 if(k==='frog'){const gr=mat(0x5DBB3A),dk=mat(0x2E7D22);const b=new THREE.Mesh(new THREE.SphereGeometry(.7,10,8),gr);b.scale.set(1,.7,1.2);b.position.y=.5;b.castShadow=true;g.add(b);
  [-1,1].forEach(s=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.22,8,6),mat(0xFFFFFF));e.position.set(s*.3,.95,.55);g.add(e);const pu=new THREE.Mesh(new THREE.SphereGeometry(.1,6,6),mat(0x111111));pu.position.set(s*.32,.98,.72);g.add(pu);
   const leg=new THREE.Mesh(new THREE.BoxGeometry(.3,.2,.7),dk);leg.position.set(s*.6,.2,-.2);g.add(leg)})}
 if(k==='spider'){const bk=mat(0x1E1A24),ey=new THREE.MeshBasicMaterial({color:0xFF3A3A});const b=new THREE.Mesh(new THREE.SphereGeometry(.6,10,8),bk);b.scale.set(1,.7,1.3);b.position.y=.6;b.castShadow=true;g.add(b);
  const h=new THREE.Mesh(new THREE.SphereGeometry(.35,8,6),bk);h.position.set(0,.6,.75);g.add(h);[-1,1].forEach(s=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.07,6,6),ey);e.position.set(s*.13,.72,1.05);g.add(e);
   for(let i=0;i<4;i++){const l=new THREE.Mesh(new THREE.BoxGeometry(1.1,.07,.07),bk);l.position.set(s*.75,.5,-.3+i*.25);l.rotation.z=s*-.6;g.add(l)}})}
 scene.add(g);return g}
function flyer(){const k=CR().f;if(k==='gull')return gull();const g=gull();const col=k==='eagle'?0x6B4423:0x2A2234,wcol=k==='eagle'?0x4A2E18:0x1A1420;
 g.traverse(o=>{if(o.isMesh&&o.geometry.type==='SphereGeometry')o.material=mat(col)});g.userData.L.material=mat(wcol);g.userData.R.material=mat(wcol);if(k==='eagle')g.scale.setScalar(1.4);if(k==='bat')g.scale.setScalar(.85);return g}
function crab(){const g=new THREE.Group(),red=mat(0xE0503A),dk=mat(0x8E2A1E);const b=new THREE.Mesh(new THREE.SphereGeometry(.7,10,8),red);b.scale.set(1.2,.55,.9);b.position.y=.45;b.castShadow=true;g.add(b);
 [-1,1].forEach(s=>{const cl=new THREE.Mesh(new THREE.SphereGeometry(.32,8,6),red);cl.scale.set(1.2,.7,.8);cl.position.set(s*1.05,.55,.55);g.add(cl);
  const ey=new THREE.Mesh(new THREE.SphereGeometry(.11,6,6),mat(0xffffff));ey.position.set(s*.22,.95,.45);g.add(ey);
  for(let k=0;k<3;k++){const l=new THREE.Mesh(new THREE.BoxGeometry(.6,.08,.08),dk);l.position.set(s*.85,.3,-.3+k*.28);l.rotation.z=s*-.5;g.add(l)}});scene.add(g);return g}
function gull(){const g=new THREE.Group(),w=mat(0xFFFFFF),gr=mat(0x8A96A2);const b=new THREE.Mesh(new THREE.SphereGeometry(.4,8,6),w);b.scale.set(1,.8,1.8);g.add(b);
 const L=new THREE.Mesh(new THREE.BoxGeometry(1.8,.06,.6),gr),Rw=L.clone();L.position.x=-1;Rw.position.x=1;g.add(L,Rw);const bk=new THREE.Mesh(new THREE.ConeGeometry(.1,.35,5),mat(0xF2A93B));bk.rotation.x=Math.PI/2;bk.position.z=.8;g.add(bk);
 g.userData={L,R:Rw};g.traverse(o=>{if(o.isMesh)o.castShadow=true});scene.add(g);return g}
function urchin(){const g=new THREE.Group(),m=mat(CR().spike);g.add(new THREE.Mesh(new THREE.IcosahedronGeometry(.45,0),m));for(let i=0;i<14;i++){const s=new THREE.Mesh(new THREE.ConeGeometry(.06,.8,4),mat(CR().spike2));const d=new THREE.Vector3(Math.random()-.5,Math.random()*.8,Math.random()-.5).normalize();s.position.copy(d.clone().multiplyScalar(.5));s.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d);g.add(s)}return g}
function burst(x,y,z,c,n=26){for(let i=0;i<n;i++){const m=new THREE.Mesh(new THREE.OctahedronGeometry(.18,0),new THREE.MeshBasicMaterial({color:c[i%c.length]}));m.position.set(x,y,z);scene.add(m);G.fx.push({m,v:new THREE.Vector3((Math.random()-.5)*.35,.25+Math.random()*.3,(Math.random()-.5)*.35),l:70})}}

/* ---------- game state ---------- */
let G={};function reset(){const s0=STARTS[0]||[0,0];G={x:s0[0],z:s0[1],ang:Math.PI/2,walk:0,hearts:3,coins:0,gems:0,keys:0,inv:0,boxes:[],gates:[],final:{open:false,step:0,anim:0},pause:true,first:0,asked:0,zone:0,t:0,seen:new Uint8Array(54*30),critters:[],fx:[],mix:[]}}
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
function blocked(x,z){if(!land(x,z))return true;if(G.gates&&G.gates.length&&zoneOf(x,z)>G.gates.filter(g=>g.open).length)return true;for(const c of COL)if(!c.off&&Math.hypot(c.x-x,c.z-z)<c.r+.55)return true;return false}
let near=null;
function update(dt){G.t+=dt;const f=dt*60;updWeather(dt);
 G.fx.forEach(p=>{p.m.position.add(p.v.clone().multiplyScalar(f));p.v.y-=.012*f;p.m.rotation.x+=.1*f;p.l-=f;if(p.l<=0){scene.remove(p.m);p.m.geometry.dispose()}});G.fx=G.fx.filter(p=>p.l>0);
 G.boxes.forEach(b=>{if(b.mixer)b.mixer.update(dt);const s=1+Math.sin(G.t*3+b.x)*.08;if(!b.open){b.ring.m.scale.set(s,s,1);b.ring.beam.material.opacity=.12+Math.sin(G.t*2.5+b.x)*.05}
  else if(b.anim<1){b.anim=Math.min(1,b.anim+dt*1.2);b.ring.m.material.opacity=.6*(1-b.anim);b.ring.beam.material.opacity=.16*(1-b.anim);if(b.k==='s'&&b.obj){b.obj.scale.setScalar(1.25*(1-b.anim));b.obj.rotation.y+=dt*8}}});
 G.mix.forEach(m=>m.update(dt));G.gates.forEach(g=>{if(g.open&&g.anim<1){g.anim=Math.min(1,g.anim+dt*.7);g.bars.position.y=hgt(g.x,g.z)+g.anim*5.4}});
 {const r=G.final.ring,on=G.keys>=3&&!G.final.open;r.m.visible=r.beam.visible=on||G.final.anim>0&&G.final.anim<1;const s=1+Math.sin(G.t*3)*.08;r.m.scale.set(s,s,1)}
 if(G.final.open&&G.final.anim<1){G.final.anim=Math.min(1,G.final.anim+dt*.5);const fc=G.final.chest;if(fc)fc.position.y=hgt(FINAL.x,FINAL.z)-1.6+G.final.anim*1.9;G.final.x.visible=false}
 if(ocean&&(Math.round(G.t*60)%2===0)){const p=ocean.geometry.attributes.position,a=p.array;for(let i=0;i<p.count;i++){const x=oceanBase[i*3],z=oceanBase[i*3+2];a[i*3+1]=(Math.sin(x*.12+G.t*1.3)*.22+Math.cos(z*.1+G.t*1.1)*.2)*TH.amp}p.needsUpdate=true}
 SHIPS.forEach((s,i)=>{if(s){s.rotation.z=Math.sin(G.t*.8+i)*.04;s.position.y+=Math.sin(G.t*1.2+i)*.004}});
 G.sand.forEach(q=>q.sw.rotation.z+=dt*.8);
 if(G.smoke&&L.volc)G.smoke.forEach(q=>{q.t=(q.t+dt*.08)%1;const y=hgt(L.volc[0],L.volc[1])+2+q.t*26;q.m.position.set(L.volc[0]+Math.sin(q.t*9)*2+q.t*8,y,L.volc[1]-q.t*4);q.m.scale.setScalar(.6+q.t*3);q.m.material.opacity=.55*(1-q.t)});
 G.critters.forEach(c=>{if(c.k==='crab'){c.t+=dt*.12;const k=(Math.sin(c.t*Math.PI*2)+1)/2,x=c.a[0]+(c.b[0]-c.a[0])*k,z=c.a[1]+(c.b[1]-c.a[1])*k;c.x=x;c.z=z;c.obj.position.set(x,hgt(x,z)+Math.abs(Math.sin(G.t*(CR().w==='frog'?5:10)))*(CR().w==='frog'?.7:.12),z);if(c.obj.userData.roll)c.obj.userData.roll.rotation.x+=dt*5;c.obj.rotation.y=Math.atan2(c.b[0]-c.a[0],c.b[1]-c.a[1])+Math.PI/2}
  else{c.t+=dt*.55;const x=c.cx+Math.cos(c.t)*c.r,z=c.cz+Math.sin(c.t*1.3)*c.r*.7,y=Math.max(1.6,hgt(x,z)+1.6)+(Math.sin(c.t*.9)+1)*3.2;c.x=x;c.z=z;c.y=y;c.obj.position.set(x,y,z);c.obj.rotation.y=Math.atan2(-Math.sin(c.t),Math.cos(c.t)*1.3)+Math.PI;const fl=Math.sin(G.t*9)*.5;c.obj.userData.L.rotation.z=fl;c.obj.userData.R.rotation.z=-fl}});
 if(!G.pause){let dx=K.r-K.l,dz=K.d-K.u;const mv=dx||dz;if(dx&&dz){dx*=.71;dz*=.71}let sp=9;if(G.sand.some(q=>Math.hypot(q.x-G.x,q.z-G.z)<q.r))sp=4;
  if(mv){G.ang=Math.atan2(dx,dz);G.walk+=dt;if(Math.floor(G.walk*4)!==Math.floor((G.walk-dt)*4))snd('step')}else G.walk=0;
  const nx=G.x+dx*sp*dt,nz=G.z+dz*sp*dt;if(!blocked(nx,G.z))G.x=nx;if(!blocked(G.x,nz))G.z=nz;
  if(G.inv<=0){for(const c of G.critters){const hit=c.k==='crab'?Math.hypot(c.x-G.x,c.z-G.z)<1.6:Math.hypot(c.x-G.x,c.z-G.z)<1.6&&c.y<hgt(G.x,G.z)+3;if(hit){knock(c.x,c.z);hurt(c.k==='gull'?CR().hf:CR().hw);break}}
   if(G.inv<=0)for(const u of G.urch)if(Math.hypot(u.x-G.x,u.z-G.z)<1.2){knock(u.x,u.z);hurt(CR().hz);break}}
  reveal();const z=zoneOf(G.x,G.z);if(z!==G.zone){G.zone=z;toast('📍 '+ZONES[z].name);talk('zone'+z)}}
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
 sun.position.set(G.x+TH.sunDir[0],TH.sunDir[1],G.z+TH.sunDir[2]);sun.target.position.set(G.x,0,G.z);hud()}
function knock(x,z){const a=Math.atan2(G.z-z,G.x-x);for(let i=0;i<14;i++){const nx=G.x+Math.cos(a)*.3,nz=G.z+Math.sin(a)*.3;if(!blocked(nx,nz)){G.x=nx;G.z=nz}}}
function hurt(msg){G.hearts--;G.inv=1.6;snd('hurt');toast(msg);burst(G.x,hgt(G.x,G.z)+1.5,G.z,[0xE05A47,0xFF8A7A],10);
 if(G.hearts<=0){G.hearts=3;const s=STARTS[G.zone];G.x=s[0];G.z=s[1];toast('Back to the start of this area. You can do it! 💪')}hud()}

/* ---------- chests, gates and the treasure ---------- */
const live=()=>typeof ADV!=='undefined'&&ADV&&typeof ME!=='undefined'&&ME;
function say(t,k){try{if(typeof window.say==='function'&&window.say!==say){window.say(t,k);return}}catch(e){}say0(t)}
function talk(k){if(!ZC.voice&&(/^(intro|back|map|key3|win)$/.test(k)||k.startsWith('zone')))return;if(VO[k])say(VO[k],'ig-'+k)}
function fgSave(){const ig=IGS();ig.cur={l:LV,o:G.boxes.map((b,i)=>b.open?i:-1).filter(i=>i>=0),f:G.final.step};if(!live())return;ADV.coins=G.coins;ADV.gems=G.gems;advSave()}
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
function win(){G.pause=true;snd('win');setTimeout(()=>talk('win'),900);const pct=G.asked?G.first/G.asked:1,st=pct>=.85?3:pct>=.6?2:1,cn=40+LV*10;G.coins+=cn;G.gems+=2;hud();
 const ig=IGS();ig.st[LV]=Math.max(ig.st[LV]||0,st);ig.un=Math.max(ig.un,Math.min(NLV,LV+1));ig.cur=null;let badge='';
 if(live()){ADV.coins=G.coins;ADV.gems=G.gems;if(!ADV.badges.includes(ZC.badge)){ADV.badges.push(ZC.badge);badge=` You earned the <b>${ZC.bname}</b> badge!`+(ZID==='island'?' The Harbour in Math City is now open.':ZC.after||'')}advSave()}
 const nm=live()&&ME.first_name?', '+esc(ME.first_name):'',more=LV<NLV;
 $('fg-ov').innerHTML=`<div class="fg-parch"><div class="fg-row" style="gap:0">${pic('heroKey',6.5)}${pic('goldOpen',4.5,'margin-left:-.3em')}</div><h1>🏆 Level ${LV} complete${nm}!</h1><div style="font-size:4em">${'⭐'.repeat(st)}${'☆'.repeat(3-st)}</div><p>+${cn} 🪙 · +2 💎 · ${G.first} of ${G.asked} right first time</p><p>${badge}${more?` <b>${LEVELS[LV].name}</b> is now open!`:` You found every treasure in ${esc0(BASEZ&&BASEZ.n||'this zone')}!`}</p>
 <div class="fg-row" style="font-size:.8em;padding-right:10%">${more?`<button class="fg-go" id="fg-next">Next ${ZC.word} ➜</button>`:''}<button class="fg-go fg-sub" id="fg-pick">${ZC.emoji} All levels</button><button class="fg-go fg-sub" id="fg-city">🏗️ Math City</button><button class="fg-go fg-sub" id="fg-back">Adventures</button></div></div>`;
 $('fg-ov').hidden=false;if(more)$('fg-next').onclick=()=>goLevel(LV+1);$('fg-pick').onclick=levelSelect;$('fg-back').onclick=()=>stop(true);$('fg-city').onclick=()=>stop(true,{s:'adv',z:'city',land:'NI'})}

/* ---------- treasure maps ---------- */
let LANDC=null;function landCanvas(){if(LANDC)return LANDC;const c=document.createElement('canvas');c.width=216;c.height=120;const x=c.getContext('2d'),im=x.createImageData(216,120);
 for(let j=0;j<120;j++)for(let i=0;i<216;i++){const wx=i-108,wz=j-60,h=hgt(wx,wz),k=(j*216+i)*4;let r,g,b,a=255;
  const T=TH,c3=v=>v.map(q=>Math.round(Math.min(1,q)*255));let col;if(h<.2){col=T.void?[40,40,60]:[125,185,216];a=h<-1.5?0:Math.round(255*Math.min(1,(h+1.5)/1.7))}else if(pathD(wx,wz)<2.6)col=c3(T.path);else if(h<.62)col=c3(T.sand);else if(T.snowH&&h>T.snowH)col=[240,244,250];else col=c3(T.grass);[r,g,b]=col;im.data.set([r,g,b,a],k)}
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
 $('fg-ov').innerHTML=`<div class="fg-parch"><h1>🗺️ ${first?'The Treasure Map of '+L.name:'Your Treasure Map'}</h1>${first?'<p>Follow the red dotted path. Find the <b style="color:#C0263A">✖ golden chests</b> and answer the question inside to get a key. Each key opens the next gate.<br>Look out for <b>🦀 snappy crabs</b>, <b>🐦 swooping seagulls</b> and <b>spiky sea urchins</b>! Quicksand slows you down. <b style="color:#7B5BC4">Wooden crates</b> hide tips, facts and bonuses.</p>':'<p>The golden arrow above you always points to your next goal.</p>'}<canvas id="fg-bigmap" width="1080" height="600"></canvas><div class="fg-row"><button class="fg-go" id="fg-mapok">${first?'Start the adventure! 🧭':'Back to the island ➜'}</button></div></div>`;
 $('fg-ov').hidden=false;paintMap($('fg-bigmap').getContext('2d'),1080,600,true);$('fg-mapok').onclick=close}

/* ---------- start and stop ---------- */
let ON=false,WRAP=null,DONE=null,MINIT=0;
function intro(){G.pause=true;const n=G.boxes.filter(b=>b.k==='q'&&b.open).length,back=n>0||G.final.step>0||G.boxes.some(b=>b.open);const nm=live()&&ME.first_name?esc(ME.first_name):'explorer';
 $('fg-ov').innerHTML=`<div class="fg-parch">${pic('scroll',4.5,'margin-bottom:.2em')}<h1>${ZC.emoji} Level ${LV}: ${L.name}</h1><p class="lv-topic">Maths topic: <b>${esc0(topicName(LV))}</b></p>
 <p>${back?`Welcome back, ${nm}! You have ${n} of 3 keys. Carry on from <b>${ZONES[Math.min(n,3)].name}</b>.`:`${ZID==='island'?'Ahoy':'Hello'}, ${nm}! ${L.story||STORY[LV-1]}`}</p>
 <div class="fg-row" style="margin:.6em 0"><button class="fg-go" id="fg-begin">Open the map 🗺️</button>${back?'<button class="fg-go fg-sub" id="fg-restart">Start again ↺</button>':''}<button class="fg-go fg-sub" id="fg-pick">${ZC.emoji} All levels</button></div>
 <p style="font-size:1em;opacity:.8;padding-right:12%">Computer: arrow keys to walk · Space to open chests · M for the map &nbsp;|&nbsp; iPad: use the buttons</p></div>`;$('fg-ov').hidden=false;
 $('fg-begin').onclick=()=>{if(!amb.on)amb.start(TH.amb);showMap(true);talk('map')};setTimeout(()=>talk(back?'back':'intro'),300);$('fg-pick').onclick=levelSelect;const rs=$('fg-restart');if(rs)rs.onclick=()=>{IGS().cur=null;if(live())advSave();goLevel(LV)}}
function restore(){if(live()){G.coins=ADV.coins;G.gems=ADV.gems}const ig=IGS(),fg=ig.cur&&ig.cur.l===LV?ig.cur:null;
 if(fg&&Array.isArray(fg.o)){fg.o.forEach(i=>{const b=G.boxes[i];if(b){b.open=true;b.anim=1;b.ring.m.visible=b.ring.beam.visible=false;if(b.act){b.act.play();b.mixer.update(5)}if(b.k==='s'&&b.obj)b.obj.visible=false;const c=COL.find(c=>c.x===b.x&&c.z===b.z);if(c&&b.k==='s')c.off=true}});
  G.keys=G.boxes.filter(b=>b.k==='q'&&b.open).length;G.gates.forEach((g,i)=>{if(i<G.keys){g.open=true;g.anim=1;g.blk.off=true;g.bars.position.y=hgt(g.x,g.z)+5.4}});G.final.step=+fg.f||0;
  const zi=Math.min(G.keys,3);G.x=STARTS[zi][0];G.z=STARTS[zi][1];G.zone=zi;for(let j=0;j<30;j++)for(let i=0;i<54;i++)if(zoneOf(i*4-106,j*4-58)<zi)G.seen[j*54+i]=1}
 else{G.x=STARTS[0][0];G.z=STARTS[0][1];G.zone=0}
 reveal();hud();goal()}
function resize(){const el=$('fg-3d');if(!el||!renderer)return;const w=el.clientWidth,h=el.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}
function snapCam(){const gy=hgt(G.x,G.z);camera.position.set(G.x,gy+CAMY,G.z+CAMZ);camera.lookAt(G.x,gy+1.5,G.z)}
const CAMY=19,CAMZ=17;
let last=0;function loop(ts){if(!ON)return;raf=requestAnimationFrame(loop);const dt=Math.min(.05,(ts-last)/1000||0);last=ts;update(dt);renderer.render(scene,camera);if(++MINIT%6===0)drawMini()}
function stop(go,view){ON=false;amb.stop();cancelAnimationFrame(raf);try{speechSynthesis.cancel()}catch(e){}K.u=K.d=K.l=K.r=0;removeEventListener('resize',resize);
 const o=document.getElementById('advov');if(o)o.remove();
 try{scene.traverse(o=>{if(o.isMesh&&!o.userData.shared){o.geometry&&o.geometry.dispose()}});renderer.dispose();renderer.forceContextLoss()}catch(e){}renderer=null;
 if(WRAP){WRAP.remove();WRAP=null}document.body.classList.remove('fgon');if(go){const d=DONE;DONE=null;if(d)d(view)}}
function webgl(){try{const c=document.createElement('canvas');return !!(window.WebGLRenderingContext&&(c.getContext('webgl2')||c.getContext('webgl')))}catch(e){return false}}

/* ---------- levels: one island per topic of the child's grade ---------- */
let NLV=6,BASEZ=null,LOCALIG=null;
function topics(){return ZC.plan().slice(0,LEVELS.length)}
function IGS(){if(!live()){LOCALIG=LOCALIG||{};LOCALIG[ZID]=LOCALIG[ZID]||{v:2,un:1,st:{},cur:null};return LOCALIG[ZID]}const k=ZC.st,g=ADV[k];
 if(!g||g.v!==2){const old=ZID==='island'&&g&&Array.isArray(g.o)?g:null;ADV[k]={v:2,un:ZID==='island'&&ADV.badges.includes('island')?2:1,st:{},cur:old?{l:1,o:old.o,f:+old.f||0}:null}}return ADV[k]}
function levelZone(n){const tp=topics()[n-1];if(!tp||!BASEZ)return BASEZ;if(tp.puzzle)return Object.assign({},BASEZ,{src:()=>advWords([tp.code]),words:()=>advWords([tp.code])});const l=C.lands.find(x=>x.code===tp.code),st=l&&l.stops.find(s=>s.n===tp.n);if(!st)return BASEZ;
 return Object.assign({},BASEZ,{src:()=>(st.practise||[]).map(it=>Object.assign({_land:tp.code},it)),words:()=>typeof advWords==='function'?advWords([tp.code]).filter(w=>String(w.id).startsWith('use-'+tp.code+'-'+tp.n+'-')):[]})}
function topicName(n){const tp=topics()[n-1];return tp?tp.topic:ZC.fall[n-1]}
const THUMB={};function levelThumb(n){if(THUMB[ZID+n])return THUMB[ZID+n];const keep=[L,LV];L=LEVELS[n-1];LV=n;layout();const c=document.createElement('canvas');c.width=216;c.height=120;const x=c.getContext('2d'),im=x.createImageData(216,120),th=THEMES[L.theme];
 const sea=[Math.round(th.sky>>16&255),Math.round(th.sky>>8&255),th.sky&255];
 for(let j=0;j<120;j++)for(let i=0;i<216;i++){const wx=i-108,wz=j-60,h=hgt(wx,wz),k=(j*216+i)*4;let col;
  const hx=c=>[c>>16&255,c>>8&255,c&255],mix=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);if(h<.2)col=h<-1.2?hx(th.deep):mix(hx(th.water),th.sand.map(v=>v*255),.35);else if(pathD(wx,wz)<2)col=th.path.map(v=>v*255);else if(h<.62)col=th.sand.map(v=>v*255);else col=th.grass.map(v=>v*255);if(L.volc&&L.lava!==false&&Math.hypot(wx-L.volc[0],wz-L.volc[1])<6)col=[255,90,30];im.data.set([col[0],col[1],col[2],255],k)}
 x.putImageData(im,0,0);x.strokeStyle='#B5402A';x.setLineDash([4,3]);x.lineWidth=2;x.beginPath();ROUTE.forEach(([a,b],i)=>i?x.lineTo(a+108,b+60):x.moveTo(a+108,b+60));x.stroke();x.setLineDash([]);
 x.strokeStyle='#C0263A';x.lineWidth=3;const f=[FINAL.x+108,FINAL.z+60];x.beginPath();x.moveTo(f[0]-5,f[1]-5);x.lineTo(f[0]+5,f[1]+5);x.moveTo(f[0]+5,f[1]-5);x.lineTo(f[0]-5,f[1]+5);x.stroke();
 [L,LV]=keep;layout();return THUMB[ZID+n]=c.toDataURL()}
function levelSelect(){G.pause=true;K.u=K.d=K.l=K.r=0;const ig=IGS();
 $('fg-ov').innerHTML=`<div class="fg-parch lv-wrap"><h1>${ZC.emoji} ${ZC.choose}</h1><p>Each ${ZC.word} has a new maths topic. Find the treasure to open the next ${ZC.word}!</p>
 <div class="lv-grid">${LEVELS.slice(0,NLV).map((lv,i)=>{const n=i+1,open=n<=ig.un,st=ig.st[n]||0,cur=ig.cur&&ig.cur.l===n;
  return `<button class="lv${open?'':' locked'}" data-lv="${n}" ${open?'':'disabled'}><img src="${levelThumb(n)}" alt=""><b>Level ${n} · ${lv.name}</b><i>${esc0(topicName(n))}</i><span>${open?(st?'⭐'.repeat(st)+'☆'.repeat(3-st):cur?'▶ Carry on':'New!'):'🔒 Locked'}</span></button>`}).join('')}</div>
 <div class="fg-row"><button class="fg-go fg-sub" id="lv-back">← Adventures</button></div></div>`;$('fg-ov').hidden=false;
 document.querySelectorAll('#fgw [data-lv]').forEach(b=>b.onclick=()=>goLevel(+b.dataset.lv));$('lv-back').onclick=()=>stop(true)}
const esc0=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function goLevel(n){amb.stop();if(G.wx&&G.wx.fl)G.wx.fl.remove();LV=n;L=LEVELS[n-1];layout();Z=levelZone(n);const coins=G.coins,gems=G.gems;reset();if(!live()&&coins!==undefined){G.coins=coins;G.gems=gems}
 buildWorld();restore();snapCam();amb.start(TH.amb);intro()}

function fallback(z,done){const s=document.createElement('script');s.src='island-game.js?v=1';s.onload=()=>window.IG.start(z,done);s.onerror=()=>done();document.head.appendChild(s)}

window.IG3={start(z,done){if(ON)return;ZID=ZCFG[z&&z.id]?z.id:'island';ZC=ZCFG[ZID];LEVELS=ZC.levels;L=LEVELS[0];if(!webgl())return ZID==='island'?fallback(z,done):done({s:'adv'});Z=z;BASEZ=z;DONE=done;
 if(!document.getElementById('ig3css')){const s=document.createElement('style');s.id='ig3css';s.textContent=CSS;document.head.appendChild(s)}
 WRAP=document.createElement('div');WRAP.id='fgw';WRAP.innerHTML=HTML;document.body.appendChild(WRAP);document.body.classList.add('fgon');WRAP.style.setProperty('--paper','url('+IMGSRC.mapPaper+')');
 grade=Math.max(1,Math.min(5,live()?(+ME.grade||1):3));HUDK='';layout();reset();bindUI();
 $('fg-ov').innerHTML='<div class="fg-load">'+ZC.emoji+' Opening '+esc0(z.n||'the adventure')+'…<div class="bar"><i id="fg-lb"></i></div></div>';$('fg-ov').hidden=false;
 try{renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'})}catch(e){WRAP.remove();WRAP=null;document.body.classList.remove('fgon');return fallback(z,done)}
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.92;
 $('fg-3d').appendChild(renderer.domElement);camera=new THREE.PerspectiveCamera(45,16/9,.5,400);ON=true;resize();addEventListener('resize',resize);
 loadModels(p=>{const b=$('fg-lb');if(b)b.style.width=Math.round(p*100)+'%'}).then(()=>{if(!ON)return;NLV=Math.max(1,topics().length||LEVELS.length);const ig=IGS();ig.un=Math.min(ig.un,NLV);
  const n=ig.cur&&ig.cur.l<=NLV?ig.cur.l:Math.min(ig.un,NLV);LV=n;L=LEVELS[n-1];layout();Z=levelZone(n);reset();buildWorld();restore();snapCam();last=performance.now();raf=requestAnimationFrame(loop);levelSelect()})},
 stop(){stop(false)},get on(){return ON},_t:{tp:()=>({t:topics(),n:NLV,src:[1,2,3,4,5].map(n=>{const z=levelZone(n);return z&&z.src?z.src().length:0})}),fin:()=>FINAL,why:(x,z)=>({land:land(x,z),h:hgt(x,z),zone:zoneOf(x,z),col:COL.filter(c=>!c.off&&Math.hypot(c.x-x,c.z-z)<c.r+.55).map(c=>[Math.round(c.x),Math.round(c.z),c.r]),gates:GATES.map(g=>[g.x,g.z])}),lv:n=>goLevel(n),sel:()=>levelSelect(),check:()=>{const bad=[];const keep=G.gates.map(g=>g.open);G.gates.forEach(g=>g.open=true);const tot=RARC[RARC.length-1];for(let d=0;d<=tot;d+=1){const p=routeAt(d);const gate=G.gates.some(g=>Math.hypot(g.x-p.x,g.z-p.z)<3.6);if(!gate&&blocked(p.x,p.z))bad.push([Math.round(p.x),Math.round(p.z)])}
 const bx=G.boxes.map((b,bi)=>{const s=arcOf(b.x,b.z),p=routeAt(s),l=Math.hypot(b.x-p.x,b.z-p.z);let ok=true;for(let t=0;t<l-2;t+=.5){const x=p.x+(b.x-p.x)*t/l,z=p.z+(b.z-p.z)*t/l;if(blocked(x,z))ok=false}if(!ok)console.log('box',bi,b.k,Math.round(b.x),Math.round(b.z),JSON.stringify(IG3._t.why((b.x+p.x)/2,(b.z+p.z)/2)));return ok?1:0});G.gates.forEach((g,i)=>g.open=keep[i]);return{bad:bad.slice(0,12),nbad:bad.length,bx,zones:ZONES.length,boxes:G.boxes.length,gates:G.gates.length}},cam:(a,b,c,d,e,f)=>{G.dbg=1;camera.position.set(a,b,c);camera.lookAt(d,e,f)},g:()=>G,go:(x,z)=>{G.x=x;G.z=z;reveal();snapCam()},use:()=>interact(),hgt}};
