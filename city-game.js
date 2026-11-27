/* Math City for Maths Quest. Loaded by adventures.js when a child opens Math City.
   Walk around your own city, choose an empty plot, and build it with maths:
   every building needs 3 construction challenges (foundations, walls, roof),
   and every upgrade needs 2. Coins and gems come from the other adventures.
   New districts open when the child finishes an adventure zone.
   Buildings are drawn in code for now. To use designed pictures later, add the file
   names to CITYART (for example 'house1' for img/city/house1.webp) and they replace the drawing. */
(function(){
const CITYART=[];
const CSS="#fgw #fg-wrap{position:fixed;inset:0;display:flex;align-items:center;justify-content:center}\n#fgw #fg-stage{position:relative;width:min(100vw,calc(100vh*16/9));aspect-ratio:16/9;font-size:min(1.6vw,2.85vh)}\n#fgw canvas{width:100%;height:100%;display:block;border-radius:14px}\n#fgw .fg-hud{position:absolute;top:2%;left:2%;display:flex;gap:.6em;align-items:center;pointer-events:none}\n#fgw .fg-pill{background:rgba(255,255,255,.93);border-radius:999px;padding:.35em .9em;font-weight:700;font-size:1.25em;color:#3B2A00;box-shadow:0 3px 0 rgba(0,0,0,.2)}\n#fgw .fg-goal{position:absolute;top:10.5%;left:50%;transform:translateX(-50%);background:rgba(20,60,35,.88);color:#FFE08A;border-radius:999px;padding:.35em 1.1em;font-weight:600;font-size:1.15em;white-space:nowrap;box-shadow:0 3px 0 rgba(0,0,0,.25)}\n#fgw #fg-mapbtn{position:absolute;top:2%;right:2%;border:0;border-radius:18px;background:#F4E3B5;border:3px solid #B98B4A;color:#5A3D00;font-family:inherit;font-weight:700;font-size:1.2em;padding:.3em .8em;box-shadow:0 4px 0 #8A6230;cursor:pointer}\n#fgw #fg-mini{position:absolute;top:11%;right:2%;width:20%;height:auto!important;border-radius:10px;border:3px solid #B98B4A;background:#F4E3B5;box-shadow:0 4px 10px rgba(0,0,0,.35)}\n#fgw .fg-pad{position:absolute;left:2%;bottom:3%;width:19%;aspect-ratio:1;display:grid;grid-template:repeat(3,1fr)/repeat(3,1fr);gap:4%}\n#fgw .fg-pad button{border:0;border-radius:22%;background:rgba(255,255,255,.55);font-size:2.2em;color:#1E5B3A;font-weight:700;box-shadow:0 4px 0 rgba(0,0,0,.25);touch-action:none}\n#fgw .fg-pad button.fg-on{background:rgba(255,224,138,.9);transform:translateY(2px)}\n#fgw #fg-act{position:absolute;right:3%;bottom:5%;width:13%;aspect-ratio:1;border-radius:50%;border:0;background:rgba(255,201,60,.9);color:#5A3D00;font-family:inherit;font-weight:700;font-size:1.4em;box-shadow:0 5px 0 #B7791F;display:none;touch-action:none}\n#fgw .fg-ov{position:absolute;inset:0;border-radius:14px;display:flex;align-items:center;justify-content:center;background:rgba(5,25,14,.72)}\n#fgw .fg-ov[hidden]{display:none}\n#fgw .fg-card{background:#FFFBEA;border:5px solid #FFC93C;border-radius:26px;box-shadow:0 10px 0 #D9A21A,0 20px 40px rgba(0,0,0,.4);padding:1.4em 1.8em;text-align:center;max-width:72%;color:#16323A;animation:fgpop .45s cubic-bezier(.2,1.6,.4,1)}\n@keyframes fgpop{from{transform:scale(.3);opacity:0}}\n#fgw .fg-card .fg-big{font-size:4em;line-height:1;animation:fgwob 1s infinite alternate}\n#fgw .fg-card .fg-big img{display:block;margin:0 auto;height:1.4em!important}\n#fgw .fg-card .fg-owlrow{display:flex;align-items:center;gap:.8em;text-align:left}\n#fgw .fg-card .fg-owlrow img{flex:none}\n@keyframes fgwob{to{transform:rotate(6deg) scale(1.06)}}\n#fgw .fg-card h2{margin:.2em 0;font-size:1.9em;color:#1E5B3A}\n#fgw .fg-card .fg-q{font-size:2.1em;font-weight:600;margin:.4em 0 .6em;line-height:1.2}\n#fgw .fg-ans{display:grid;grid-template-columns:repeat(2,1fr);gap:.6em}\n#fgw .fg-ans button,#fgw .fg-card .fg-go{font-family:inherit;font-weight:700;font-size:1.7em;border:0;border-radius:18px;padding:.4em .8em;background:#FFC93C;color:#5A3D00;box-shadow:0 5px 0 #D9A21A;cursor:pointer}\n#fgw .fg-ans button.fg-bad{background:#D6D0C4;color:#8B867A;box-shadow:0 5px 0 #A9A396;animation:fgshake .4s}\n#fgw .fg-ans button.fg-good{background:#2DBE6C;color:#fff;box-shadow:0 5px 0 #1E8A4C}\n@keyframes fgshake{25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}\n#fgw .fg-card .fg-say{border:0;background:#E0F4FF;border-radius:99px;font-size:1.2em;padding:.2em .7em;cursor:pointer;font-family:inherit;font-weight:700;color:#0B5C7A}\n#fgw .fg-card .fg-fb{min-height:1.4em;font-weight:600;font-size:1.2em;margin-top:.5em;color:#B54708}\n#fgw .fg-card p{font-size:1.35em;margin:.4em 0}\n#fgw .fg-parch{max-height:96%;display:flex;flex-direction:column;align-items:center;background:var(--paper) center/100% 100% no-repeat;filter:drop-shadow(0 14px 30px rgba(0,0,0,.5));padding:3.5% 9% 6% 6%;text-align:center;color:#5A3D00;max-width:86%;animation:fgunroll .7s ease-out}\n@keyframes fgunroll{from{transform:scaleY(.05);opacity:.3}}\n#fgw .fg-parch h1{margin:0 0 .2em;font-size:2.4em;color:#7A3E1A}\n#fgw .fg-parch p{margin:.2em 0;font-size:1.3em}\n#fgw .fg-parch canvas{width:100%;height:auto;min-height:0;flex:1 1 auto;object-fit:contain;border-radius:10px;border:2px dashed #B98B4A;margin:.4em 0}\n#fgw .fg-parch .fg-row{display:flex;gap:.7em;justify-content:center;align-items:center;flex-wrap:wrap}\n#fgw .fg-parch select,#fgw .fg-parch .fg-go{font-family:inherit;font-size:1.5em;border-radius:999px;border:0;padding:.3em 1.1em;font-weight:700}\n#fgw .fg-parch .fg-go{background:#2DBE6C;color:#fff;box-shadow:0 5px 0 #1E8A4C;cursor:pointer}\n#fgw .fg-toast{position:absolute;left:50%;top:22%;transform:translateX(-50%);background:rgba(0,0,0,.65);color:#fff;font-weight:600;font-size:1.4em;padding:.4em 1.2em;border-radius:999px;pointer-events:none;white-space:nowrap;transition:opacity .4s}\n#fgw{position:fixed;inset:0;z-index:60;background:#0B2216;font-family:Fredoka,'Trebuchet MS',sans-serif;overflow:hidden;touch-action:none;user-select:none;-webkit-user-select:none}\n#fgw *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}\n#fgw button{transition:none;line-height:1.2}\n#fgw .fg-pad button{padding:0}\n#fgw #fg-exit{position:absolute;top:2%;right:13%;border:0;border-radius:18px;background:rgba(255,255,255,.9);color:#1E5B3A;font-family:inherit;font-weight:700;font-size:1.2em;padding:.3em .8em;box-shadow:0 4px 0 rgba(0,0,0,.25);cursor:pointer}\n#fgw .fg-parch .fg-row .fg-sub{background:#fff;color:#1E5B3A;box-shadow:0 5px 0 #B98B4A}\nbody.fgon{overflow:hidden}\nbody.fgon .party,body.fgon .burst{z-index:80}body.fgon .cheer{z-index:85}\nbody.fgon .advov{z-index:75}\nbody.fgon .advcard .se img{height:96px;display:block;margin:0 auto}\n"+`
#fgw .fg-card{position:relative;max-width:80%;max-height:94%;overflow:auto}
#fgw .cg-x{position:absolute;top:.4em;right:.5em;border:0;background:transparent;font-size:1.5em;color:#7A6A4A;cursor:pointer;font-family:inherit}
#fgw .cg-steps{display:flex;gap:.4em;justify-content:center;margin:.2em 0 .5em}
#fgw .cg-steps span{background:#EFE6CF;color:#8A7A5A;border-radius:999px;padding:.15em .8em;font-weight:600;font-size:1.05em}
#fgw .cg-steps span.on{background:#FFC93C;color:#5A3D00}#fgw .cg-steps span.ok{background:#2DBE6C;color:#fff}
#fgw .cg-sub{font-size:1.2em;color:#7A5A20;font-weight:600;margin:.1em 0}
#fgw .cg-dia{display:block;margin:.2em auto;max-height:9em}
#fgw .cg-shop{display:grid;grid-template-columns:repeat(4,1fr);gap:.5em;margin-top:.6em}
#fgw .cg-shop button{font-family:inherit;border:3px solid #E8D9B0;background:#fff;border-radius:16px;padding:.3em .2em .4em;cursor:pointer;color:#16323A;display:flex;flex-direction:column;align-items:center;gap:.1em}
#fgw .cg-shop button img{height:4.2em;width:auto}
#fgw .cg-shop button b{font-size:1.05em}#fgw .cg-shop button i{font-style:normal;font-size:.95em;color:#7A5A20;font-weight:600}
#fgw .cg-shop button:disabled{opacity:.45;cursor:default}
#fgw .cg-shop button:not(:disabled):hover{border-color:#FFC93C}
#fgw .cg-up{display:flex;align-items:center;justify-content:center;gap:1em}#fgw .cg-up img{height:8em}
#fgw .cg-up .arr{font-size:2.5em;color:#B98B4A}
#fgw #fg-mapbtn.cg-on{background:#2B3A6B;color:#FFE08A;border-color:#11183A;box-shadow:0 4px 0 #11183A}
`;
const HTML=`<div id="fg-wrap"><div id="fg-stage">
 <canvas id="fg-c" width="1280" height="720"></canvas>
 <div class="fg-hud"><span class="fg-pill" id="cg-coins"></span><span class="fg-pill" id="cg-gems"></span><span class="fg-pill" id="cg-lvl"></span></div>
 <div class="fg-goal" id="fg-goal"></div>
 <button id="fg-exit">✕ Exit</button>
 <button id="fg-mapbtn">🌙 Night</button>
 <canvas id="fg-mini" width="240" height="150"></canvas>
 <div class="fg-pad"><span></span><button data-d="u">▲</button><span></span><button data-d="l">◀</button><span></span><button data-d="r">▶</button><span></span><button data-d="d">▼</button><span></span></div>
 <button id="fg-act">Build</button>
 <div class="fg-toast" id="fg-toast" style="opacity:0"></div>
 <div class="fg-ov" id="fg-ov" hidden></div>
</div></div>`;

let cv,X;const W=1280,H=720,T=64;
const $=id=>document.getElementById(id);
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)];
const fmt=n=>(+n).toLocaleString('en-GB');
const esc0=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- pictures borrowed from Number Forest ---------- */
const IMGSRC={};['heroD','heroU','heroR','grass','path','water','tree1','tree2','tree3','flowers','rock','bridge'].forEach(k=>IMGSRC[k]='img/forest/'+k+'.webp?v=1');
CITYART.forEach(k=>IMGSRC['c_'+k]='img/city/'+k+'.webp?v=1');
const IMG={};function loadImgs(){for(const k in IMGSRC)if(!IMG[k]){IMG[k]=new Image();IMG[k].src=IMGSRC[k]}}
let PAT=null;function pats(){if(PAT)return PAT;if(!['grass','path','water'].every(k=>IMG[k]&&IMG[k].complete&&IMG[k].naturalWidth))return null;PAT={};['grass','path','water'].forEach(k=>{const p=X.createPattern(IMG[k],'repeat');p.setTransform(new DOMMatrix().scale(.5));PAT[k]=p});return PAT}
function spr(k,cx,by,h,flip){const im=IMG[k];if(!im||!im.complete||!im.naturalWidth)return false;const w=im.naturalWidth*h/im.naturalHeight;X.save();X.translate(cx,by);if(flip)X.scale(-1,1);X.drawImage(im,-w/2,-h,w,h);X.restore();return true}

/* ---------- sound ---------- */
let AC=null;function snd(k){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const t=AC.currentTime;
 const tone=(f,d,w,v,at=0,f2)=>{const o=AC.createOscillator(),g=AC.createGain();o.type=w;o.frequency.setValueAtTime(f,t+at);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+at+d);g.gain.setValueAtTime(v,t+at);g.gain.exponentialRampToValueAtTime(.001,t+at+d);o.connect(g);g.connect(AC.destination);o.start(t+at);o.stop(t+at+d)};
 ({open:()=>{tone(400,.1,'triangle',.06);tone(600,.15,'triangle',.06,.08)},
   right:()=>[523,659,784,1047].forEach((f,i)=>tone(f,.2,'triangle',.12,i*.09)),
   wrong:()=>tone(220,.3,'sawtooth',.06,0,130),
   hammer:()=>[0,.18,.36].forEach(a=>{tone(140,.08,'square',.08,a,60);tone(900,.04,'square',.03,a)}),
   built:()=>[392,523,659,784,1047,1319].forEach((f,i)=>tone(f,.28,'triangle',.11,i*.1)),
   step:()=>tone(90+Math.random()*30,.05,'triangle',.03),
   night:()=>tone(660,.5,'sine',.05,0,330),day:()=>tone(330,.5,'sine',.05,0,660),
   locked:()=>{tone(200,.15,'square',.05);tone(150,.2,'square',.05,.12)}})[k]()}catch(e){}}
function say0(t){if(!('speechSynthesis' in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t.replace(/×/g,' times ').replace(/÷/g,' divided by ').replace(/−/g,' minus ').replace(/m²/g,' square metres').replace(/cm³/g,' cubic centimetres').replace(/\?/g,''));u.lang='en-GB';u.rate=.9;
 const v=speechSynthesis.getVoices();u.voice=v.find(x=>/kate|serena|female/i.test(x.name)&&x.lang.startsWith('en'))||v.find(x=>x.lang==='en-GB')||null;speechSynthesis.speak(u)}
function say(t,k){try{if(typeof window.say==='function'){window.say(t,k);return}}catch(e){}say0(t)}

/* ---------- construction maths, by grade (0 = KG2 / Year 1 … 5 = Grade 5 / Year 6) ---------- */
/* each returns {q, a, s (spread for wrong options), u (unit), h (hint), d (diagram)} */
const rect=(w,h,u,grid)=>({t:'rect',w,h,u,grid}),tri=(b,h,u)=>({t:'tri',b,h,u});
const QB=[
 [()=>{const a=R(3,9),b=R(1,9);return{q:`The builder has ${a} bricks and gets ${b} more. How many bricks now?`,a:a+b,s:1,h:'Start at the bigger number and count on.'}},
  ()=>{const a=R(8,18),b=R(1,7);return{q:`There are ${a} planks. The builder uses ${b}. How many planks are left?`,a:a-b,s:1,h:'Count back from the first number.'}},
  ()=>{const n=R(2,6);return{q:`Boots come in pairs. How many boots do ${n} builders wear?`,a:2*n,s:2,h:'Count in 2s.'}},
  ()=>{const n=R(2,10);return{q:`Double ${n} windows. How many windows?`,a:2*n,s:1,h:'Double means add the same number again.'}},
  ()=>{const n=R(5,19);return{q:`The wall has ${n} bricks. The builder adds 1 more. How many bricks now?`,a:n+1,s:1,h:'One more is the next number when you count.'}}],
 [()=>{const a=R(20,60),b=R(11,29);return{q:`The wall has ${a} bricks. The builder adds ${b} more. How many bricks now?`,a:a+b,s:10,h:'Add the tens, then add the ones.'}},
  ()=>{const k=pick([2,5,10]),n=R(2,10);return{q:`Each window has ${k} panes of glass. How many panes in ${n} windows?`,a:k*n,s:k,h:`Count in ${k}s, ${n} times.`}},
  ()=>{const c=R(1,9)*5;return{q:`A door costs ${c} coins. You pay with 50 coins. How much change do you get?`,a:50-c,s:5,h:`Count on from ${c} to 50.`}},
  ()=>{const n=R(3,15);return{q:`Half of ${2*n} roof tiles are red. How many tiles are red?`,a:n,s:1,h:'Half means 2 equal groups.'}},
  ()=>{const a=R(40,90),b=R(12,35);return{q:`The builder has ${a} nails and uses ${b}. How many nails are left?`,a:a-b,s:10,h:'Take away the tens, then the ones.'}}],
 [()=>{const w=R(3,9),h=R(2,7);return{q:'The builder puts a fence all the way around this garden. How long is the fence?',a:2*(w+h),s:2,u:'m',d:rect(w,h,'m'),h:'Add all four sides: two long sides and two short sides.'}},
  ()=>{const k=pick([3,4,8]),n=R(2,10);return{q:`Each floor has ${k} windows. How many windows on ${n} floors?`,a:k*n,s:k,h:`Use your ${k} times table.`}},
  ()=>{const c=R(3,19)*5;return{q:`A roof costs ${c} coins. You pay with 100 coins. How much change do you get?`,a:100-c,s:5,h:`What do you add to ${c} to make 100?`}},
  ()=>{const a=R(120,560),b=R(110,390);return{q:`The builder has ${a} tiles and buys ${b} more. How many tiles now?`,a:a+b,s:100,h:'Add the hundreds, the tens, then the ones.'}},
  ()=>{const r=R(3,8),k=R(4,9);return{q:`A wall has ${r} rows of bricks with ${k} bricks in each row. How many bricks?`,a:r*k,s:r,h:'Rows × bricks in each row.'}}],
 [()=>{const w=R(3,8),h=R(2,6);return{q:'How many square tiles cover this floor?',a:w*h,s:w,u:'m²',d:rect(w,h,'m',1),h:'Count one row, then multiply by the number of rows.'}},
  ()=>{const w=R(6,15),h=R(3,9);return{q:'How long is the fence around this garden?',a:2*(w+h),s:2,u:'m',d:rect(w,h,'m'),h:'Perimeter = all four sides added together.'}},
  ()=>{const n=R(2,9);return{q:`The wall is ${n} m long. How many centimetres is that?`,a:n*100,s:100,u:'cm',h:'1 metre = 100 centimetres.'}},
  ()=>{const k=R(6,12),n=R(3,9);return{q:`${n} lorries each carry ${k} bags of cement. How many bags altogether?`,a:k*n,s:n,h:`${n} × ${k}. Use your times tables.`}},
  ()=>{const p=R(6,12),n=R(3,9);return{q:`A pack of bricks costs ${p} coins. How much do ${n} packs cost?`,a:p*n,s:p,u:'coins',h:'Multiply the price by the number of packs.'}}],
 [()=>{const w=R(8,24),h=R(4,12);return{q:'What is the area of this floor?',a:w*h,s:10,u:'m²',d:rect(w,h,'m'),h:'Area = length × width.'}},
  ()=>{const s=R(6,25);return{q:`A square garden has sides of ${s} m. How long is the fence around it?`,a:4*s,s:4,u:'m',d:rect(s,s,'m'),h:'A square has 4 equal sides.'}},
  ()=>{const a=R(23,89),n=R(3,9);return{q:`A crane lifts ${a} kg each time. How much does it lift in ${n} trips?`,a:a*n,s:10,u:'kg',h:`${a} × ${n}: multiply the tens, then the ones, then add.`}},
  ()=>{const k=R(5,20);return{q:`¾ of ${4*k} bricks are red. How many bricks are red?`,a:3*k,s:k,h:'Find ¼ first (divide by 4), then multiply by 3.'}},
  ()=>{const n=R(2,9),half=pick([0,500]);return{q:`The builder has ${n}${half?'.5':''} kg of nails. How many grams is that?`,a:n*1000+half,s:500,u:'g',h:'1 kg = 1,000 g.'}}],
 [()=>{const l=R(3,9),w=R(2,6),h=R(2,5);return{q:`How many 1 cm cubes fill a box ${l} cm × ${w} cm × ${h} cm?`,a:l*w*h,s:l,u:'cm³',h:'Volume = length × width × height.'}},
  ()=>{const p=pick([10,20,25,50]),c=R(4,20)*20;return{q:`The tower costs ${c} coins. There is ${p}% off. How many coins do you save?`,a:c*p/100,s:10,u:'coins',h:p===50?'50% is a half.':p===25?'25% is a quarter.':`Find 10%, then use it to find ${p}%.`}},
  ()=>{const n=R(3,12),r=pick([2,3,4]);return{q:`Concrete uses sand and cement in the ratio ${r} : 1. How many buckets of sand go with ${n} buckets of cement?`,a:r*n,s:n,h:`For every 1 bucket of cement there are ${r} buckets of sand.`}},
  ()=>{const b=R(3,10)*2,h=R(3,12);return{q:'What is the area of this triangular roof?',a:b*h/2,s:5,u:'m²',d:tri(b,h,'m'),h:'Area of a triangle = base × height ÷ 2.'}},
  ()=>{const p=R(12,45),n=R(3,9);return{q:`You buy ${n} windows at ${p} coins each. You pay with 500 coins. How much change?`,a:500-p*n,s:10,u:'coins',h:`First find ${n} × ${p}, then take it away from 500.`}}]];
/* fixed question bank made from the generators above, so Kate can record every question (cg-q*.m4a) */
const CQB=[[{"q": "The builder has 3 bricks and gets 8 more. How many bricks now?", "a": 11, "s": 1, "h": "Start at the bigger number and count on.", "k": "cg-q0"}, {"q": "There are 18 planks. The builder uses 1. How many planks are left?", "a": 17, "s": 1, "h": "Count back from the first number.", "k": "cg-q1"}, {"q": "Boots come in pairs. How many boots do 2 builders wear?", "a": 4, "s": 2, "h": "Count in 2s.", "k": "cg-q2"}, {"q": "Double 2 windows. How many windows?", "a": 4, "s": 1, "h": "Double means add the same number again.", "k": "cg-q3"}, {"q": "The wall has 16 bricks. The builder adds 1 more. How many bricks now?", "a": 17, "s": 1, "h": "One more is the next number when you count.", "k": "cg-q4"}, {"q": "The builder has 7 bricks and gets 9 more. How many bricks now?", "a": 16, "s": 1, "h": "Start at the bigger number and count on.", "k": "cg-q5"}, {"q": "There are 16 planks. The builder uses 3. How many planks are left?", "a": 13, "s": 1, "h": "Count back from the first number.", "k": "cg-q6"}, {"q": "Boots come in pairs. How many boots do 3 builders wear?", "a": 6, "s": 2, "h": "Count in 2s.", "k": "cg-q7"}, {"q": "Double 9 windows. How many windows?", "a": 18, "s": 1, "h": "Double means add the same number again.", "k": "cg-q8"}, {"q": "The wall has 19 bricks. The builder adds 1 more. How many bricks now?", "a": 20, "s": 1, "h": "One more is the next number when you count.", "k": "cg-q9"}, {"q": "The builder has 4 bricks and gets 4 more. How many bricks now?", "a": 8, "s": 1, "h": "Start at the bigger number and count on.", "k": "cg-q10"}, {"q": "There are 8 planks. The builder uses 2. How many planks are left?", "a": 6, "s": 1, "h": "Count back from the first number.", "k": "cg-q11"}, {"q": "Boots come in pairs. How many boots do 6 builders wear?", "a": 12, "s": 2, "h": "Count in 2s.", "k": "cg-q12"}, {"q": "Double 3 windows. How many windows?", "a": 6, "s": 1, "h": "Double means add the same number again.", "k": "cg-q13"}, {"q": "The wall has 18 bricks. The builder adds 1 more. How many bricks now?", "a": 19, "s": 1, "h": "One more is the next number when you count.", "k": "cg-q14"}, {"q": "The builder has 4 bricks and gets 9 more. How many bricks now?", "a": 13, "s": 1, "h": "Start at the bigger number and count on.", "k": "cg-q15"}, {"q": "There are 18 planks. The builder uses 3. How many planks are left?", "a": 15, "s": 1, "h": "Count back from the first number.", "k": "cg-q16"}, {"q": "Boots come in pairs. How many boots do 5 builders wear?", "a": 10, "s": 2, "h": "Count in 2s.", "k": "cg-q17"}, {"q": "Double 6 windows. How many windows?", "a": 12, "s": 1, "h": "Double means add the same number again.", "k": "cg-q18"}, {"q": "The wall has 7 bricks. The builder adds 1 more. How many bricks now?", "a": 8, "s": 1, "h": "One more is the next number when you count.", "k": "cg-q19"}, {"q": "The builder has 9 bricks and gets 4 more. How many bricks now?", "a": 13, "s": 1, "h": "Start at the bigger number and count on.", "k": "cg-q20"}, {"q": "There are 18 planks. The builder uses 7. How many planks are left?", "a": 11, "s": 1, "h": "Count back from the first number.", "k": "cg-q21"}, {"q": "Boots come in pairs. How many boots do 4 builders wear?", "a": 8, "s": 2, "h": "Count in 2s.", "k": "cg-q22"}, {"q": "Double 4 windows. How many windows?", "a": 8, "s": 1, "h": "Double means add the same number again.", "k": "cg-q23"}, {"q": "The wall has 9 bricks. The builder adds 1 more. How many bricks now?", "a": 10, "s": 1, "h": "One more is the next number when you count.", "k": "cg-q24"}, {"q": "The builder has 6 bricks and gets 7 more. How many bricks now?", "a": 13, "s": 1, "h": "Start at the bigger number and count on.", "k": "cg-q25"}, {"q": "There are 14 planks. The builder uses 4. How many planks are left?", "a": 10, "s": 1, "h": "Count back from the first number.", "k": "cg-q26"}], [{"q": "The wall has 25 bricks. The builder adds 22 more. How many bricks now?", "a": 47, "s": 10, "h": "Add the tens, then add the ones.", "k": "cg-q27"}, {"q": "Each window has 2 panes of glass. How many panes in 6 windows?", "a": 12, "s": 2, "h": "Count in 2s, 6 times.", "k": "cg-q28"}, {"q": "A door costs 30 coins. You pay with 50 coins. How much change do you get?", "a": 20, "s": 5, "h": "Count on from 30 to 50.", "k": "cg-q29"}, {"q": "Half of 16 roof tiles are red. How many tiles are red?", "a": 8, "s": 1, "h": "Half means 2 equal groups.", "k": "cg-q30"}, {"q": "The builder has 67 nails and uses 21. How many nails are left?", "a": 46, "s": 10, "h": "Take away the tens, then the ones.", "k": "cg-q31"}, {"q": "The wall has 27 bricks. The builder adds 26 more. How many bricks now?", "a": 53, "s": 10, "h": "Add the tens, then add the ones.", "k": "cg-q32"}, {"q": "Each window has 10 panes of glass. How many panes in 9 windows?", "a": 90, "s": 10, "h": "Count in 10s, 9 times.", "k": "cg-q33"}, {"q": "A door costs 5 coins. You pay with 50 coins. How much change do you get?", "a": 45, "s": 5, "h": "Count on from 5 to 50.", "k": "cg-q34"}, {"q": "Half of 12 roof tiles are red. How many tiles are red?", "a": 6, "s": 1, "h": "Half means 2 equal groups.", "k": "cg-q35"}, {"q": "The builder has 58 nails and uses 22. How many nails are left?", "a": 36, "s": 10, "h": "Take away the tens, then the ones.", "k": "cg-q36"}, {"q": "The wall has 29 bricks. The builder adds 25 more. How many bricks now?", "a": 54, "s": 10, "h": "Add the tens, then add the ones.", "k": "cg-q37"}, {"q": "Each window has 5 panes of glass. How many panes in 3 windows?", "a": 15, "s": 5, "h": "Count in 5s, 3 times.", "k": "cg-q38"}, {"q": "A door costs 10 coins. You pay with 50 coins. How much change do you get?", "a": 40, "s": 5, "h": "Count on from 10 to 50.", "k": "cg-q39"}, {"q": "Half of 8 roof tiles are red. How many tiles are red?", "a": 4, "s": 1, "h": "Half means 2 equal groups.", "k": "cg-q40"}, {"q": "The builder has 83 nails and uses 13. How many nails are left?", "a": 70, "s": 10, "h": "Take away the tens, then the ones.", "k": "cg-q41"}, {"q": "The wall has 26 bricks. The builder adds 26 more. How many bricks now?", "a": 52, "s": 10, "h": "Add the tens, then add the ones.", "k": "cg-q42"}, {"q": "Each window has 10 panes of glass. How many panes in 5 windows?", "a": 50, "s": 10, "h": "Count in 10s, 5 times.", "k": "cg-q43"}, {"q": "A door costs 15 coins. You pay with 50 coins. How much change do you get?", "a": 35, "s": 5, "h": "Count on from 15 to 50.", "k": "cg-q44"}, {"q": "Half of 28 roof tiles are red. How many tiles are red?", "a": 14, "s": 1, "h": "Half means 2 equal groups.", "k": "cg-q45"}, {"q": "The builder has 40 nails and uses 17. How many nails are left?", "a": 23, "s": 10, "h": "Take away the tens, then the ones.", "k": "cg-q46"}, {"q": "The wall has 55 bricks. The builder adds 27 more. How many bricks now?", "a": 82, "s": 10, "h": "Add the tens, then add the ones.", "k": "cg-q47"}, {"q": "Each window has 5 panes of glass. How many panes in 10 windows?", "a": 50, "s": 5, "h": "Count in 5s, 10 times.", "k": "cg-q48"}, {"q": "A door costs 45 coins. You pay with 50 coins. How much change do you get?", "a": 5, "s": 5, "h": "Count on from 45 to 50.", "k": "cg-q49"}, {"q": "Half of 10 roof tiles are red. How many tiles are red?", "a": 5, "s": 1, "h": "Half means 2 equal groups.", "k": "cg-q50"}, {"q": "The builder has 44 nails and uses 27. How many nails are left?", "a": 17, "s": 10, "h": "Take away the tens, then the ones.", "k": "cg-q51"}, {"q": "The wall has 21 bricks. The builder adds 13 more. How many bricks now?", "a": 34, "s": 10, "h": "Add the tens, then add the ones.", "k": "cg-q52"}, {"q": "Each window has 5 panes of glass. How many panes in 8 windows?", "a": 40, "s": 5, "h": "Count in 5s, 8 times.", "k": "cg-q53"}, {"q": "A door costs 25 coins. You pay with 50 coins. How much change do you get?", "a": 25, "s": 5, "h": "Count on from 25 to 50.", "k": "cg-q54"}, {"q": "Half of 30 roof tiles are red. How many tiles are red?", "a": 15, "s": 1, "h": "Half means 2 equal groups.", "k": "cg-q55"}, {"q": "The builder has 40 nails and uses 34. How many nails are left?", "a": 6, "s": 10, "h": "Take away the tens, then the ones.", "k": "cg-q56"}], [{"q": "The builder puts a fence all the way around this garden. How long is the fence?", "a": 18, "s": 2, "u": "m", "d": {"t": "rect", "w": 3, "h": 6, "u": "m"}, "h": "Add all four sides: two long sides and two short sides.", "k": "cg-q57"}, {"q": "Each floor has 8 windows. How many windows on 8 floors?", "a": 64, "s": 8, "h": "Use your 8 times table.", "k": "cg-q58"}, {"q": "A roof costs 55 coins. You pay with 100 coins. How much change do you get?", "a": 45, "s": 5, "h": "What do you add to 55 to make 100?", "k": "cg-q59"}, {"q": "The builder has 499 tiles and buys 372 more. How many tiles now?", "a": 871, "s": 100, "h": "Add the hundreds, the tens, then the ones.", "k": "cg-q60"}, {"q": "A wall has 8 rows of bricks with 9 bricks in each row. How many bricks?", "a": 72, "s": 8, "h": "Rows × bricks in each row.", "k": "cg-q61"}, {"q": "The builder puts a fence all the way around this garden. How long is the fence?", "a": 18, "s": 2, "u": "m", "d": {"t": "rect", "w": 5, "h": 4, "u": "m"}, "h": "Add all four sides: two long sides and two short sides.", "k": "cg-q57"}, {"q": "Each floor has 4 windows. How many windows on 7 floors?", "a": 28, "s": 4, "h": "Use your 4 times table.", "k": "cg-q62"}, {"q": "A roof costs 25 coins. You pay with 100 coins. How much change do you get?", "a": 75, "s": 5, "h": "What do you add to 25 to make 100?", "k": "cg-q63"}, {"q": "The builder has 285 tiles and buys 247 more. How many tiles now?", "a": 532, "s": 100, "h": "Add the hundreds, the tens, then the ones.", "k": "cg-q64"}, {"q": "A wall has 5 rows of bricks with 8 bricks in each row. How many bricks?", "a": 40, "s": 5, "h": "Rows × bricks in each row.", "k": "cg-q65"}, {"q": "The builder puts a fence all the way around this garden. How long is the fence?", "a": 26, "s": 2, "u": "m", "d": {"t": "rect", "w": 7, "h": 6, "u": "m"}, "h": "Add all four sides: two long sides and two short sides.", "k": "cg-q57"}, {"q": "Each floor has 8 windows. How many windows on 2 floors?", "a": 16, "s": 8, "h": "Use your 8 times table.", "k": "cg-q66"}, {"q": "A roof costs 45 coins. You pay with 100 coins. How much change do you get?", "a": 55, "s": 5, "h": "What do you add to 45 to make 100?", "k": "cg-q67"}, {"q": "The builder has 519 tiles and buys 170 more. How many tiles now?", "a": 689, "s": 100, "h": "Add the hundreds, the tens, then the ones.", "k": "cg-q68"}, {"q": "A wall has 4 rows of bricks with 6 bricks in each row. How many bricks?", "a": 24, "s": 4, "h": "Rows × bricks in each row.", "k": "cg-q69"}, {"q": "The builder puts a fence all the way around this garden. How long is the fence?", "a": 28, "s": 2, "u": "m", "d": {"t": "rect", "w": 9, "h": 5, "u": "m"}, "h": "Add all four sides: two long sides and two short sides.", "k": "cg-q57"}, {"q": "Each floor has 4 windows. How many windows on 2 floors?", "a": 8, "s": 4, "h": "Use your 4 times table.", "k": "cg-q70"}, {"q": "A roof costs 40 coins. You pay with 100 coins. How much change do you get?", "a": 60, "s": 5, "h": "What do you add to 40 to make 100?", "k": "cg-q71"}, {"q": "The builder has 234 tiles and buys 194 more. How many tiles now?", "a": 428, "s": 100, "h": "Add the hundreds, the tens, then the ones.", "k": "cg-q72"}, {"q": "A wall has 7 rows of bricks with 4 bricks in each row. How many bricks?", "a": 28, "s": 7, "h": "Rows × bricks in each row.", "k": "cg-q73"}, {"q": "The builder puts a fence all the way around this garden. How long is the fence?", "a": 30, "s": 2, "u": "m", "d": {"t": "rect", "w": 9, "h": 6, "u": "m"}, "h": "Add all four sides: two long sides and two short sides.", "k": "cg-q57"}, {"q": "Each floor has 3 windows. How many windows on 5 floors?", "a": 15, "s": 3, "h": "Use your 3 times table.", "k": "cg-q74"}, {"q": "A roof costs 85 coins. You pay with 100 coins. How much change do you get?", "a": 15, "s": 5, "h": "What do you add to 85 to make 100?", "k": "cg-q75"}, {"q": "The builder has 152 tiles and buys 212 more. How many tiles now?", "a": 364, "s": 100, "h": "Add the hundreds, the tens, then the ones.", "k": "cg-q76"}, {"q": "A wall has 5 rows of bricks with 5 bricks in each row. How many bricks?", "a": 25, "s": 5, "h": "Rows × bricks in each row.", "k": "cg-q77"}, {"q": "The builder puts a fence all the way around this garden. How long is the fence?", "a": 22, "s": 2, "u": "m", "d": {"t": "rect", "w": 5, "h": 6, "u": "m"}, "h": "Add all four sides: two long sides and two short sides.", "k": "cg-q57"}, {"q": "Each floor has 3 windows. How many windows on 10 floors?", "a": 30, "s": 3, "h": "Use your 3 times table.", "k": "cg-q78"}, {"q": "A roof costs 20 coins. You pay with 100 coins. How much change do you get?", "a": 80, "s": 5, "h": "What do you add to 20 to make 100?", "k": "cg-q79"}, {"q": "The builder has 374 tiles and buys 303 more. How many tiles now?", "a": 677, "s": 100, "h": "Add the hundreds, the tens, then the ones.", "k": "cg-q80"}, {"q": "A wall has 4 rows of bricks with 4 bricks in each row. How many bricks?", "a": 16, "s": 4, "h": "Rows × bricks in each row.", "k": "cg-q81"}], [{"q": "How many square tiles cover this floor?", "a": 12, "s": 4, "u": "m²", "d": {"t": "rect", "w": 4, "h": 3, "u": "m", "grid": 1}, "h": "Count one row, then multiply by the number of rows.", "k": "cg-q82"}, {"q": "How long is the fence around this garden?", "a": 40, "s": 2, "u": "m", "d": {"t": "rect", "w": 11, "h": 9, "u": "m"}, "h": "Perimeter = all four sides added together.", "k": "cg-q83"}, {"q": "The wall is 7 m long. How many centimetres is that?", "a": 700, "s": 100, "u": "cm", "h": "1 metre = 100 centimetres.", "k": "cg-q84"}, {"q": "9 lorries each carry 10 bags of cement. How many bags altogether?", "a": 90, "s": 9, "h": "9 × 10. Use your times tables.", "k": "cg-q85"}, {"q": "A pack of bricks costs 10 coins. How much do 3 packs cost?", "a": 30, "s": 10, "u": "coins", "h": "Multiply the price by the number of packs.", "k": "cg-q86"}, {"q": "How many square tiles cover this floor?", "a": 15, "s": 3, "u": "m²", "d": {"t": "rect", "w": 3, "h": 5, "u": "m", "grid": 1}, "h": "Count one row, then multiply by the number of rows.", "k": "cg-q82"}, {"q": "How long is the fence around this garden?", "a": 32, "s": 2, "u": "m", "d": {"t": "rect", "w": 10, "h": 6, "u": "m"}, "h": "Perimeter = all four sides added together.", "k": "cg-q83"}, {"q": "The wall is 2 m long. How many centimetres is that?", "a": 200, "s": 100, "u": "cm", "h": "1 metre = 100 centimetres.", "k": "cg-q87"}, {"q": "5 lorries each carry 7 bags of cement. How many bags altogether?", "a": 35, "s": 5, "h": "5 × 7. Use your times tables.", "k": "cg-q88"}, {"q": "A pack of bricks costs 8 coins. How much do 9 packs cost?", "a": 72, "s": 8, "u": "coins", "h": "Multiply the price by the number of packs.", "k": "cg-q89"}, {"q": "How many square tiles cover this floor?", "a": 35, "s": 7, "u": "m²", "d": {"t": "rect", "w": 7, "h": 5, "u": "m", "grid": 1}, "h": "Count one row, then multiply by the number of rows.", "k": "cg-q82"}, {"q": "How long is the fence around this garden?", "a": 38, "s": 2, "u": "m", "d": {"t": "rect", "w": 15, "h": 4, "u": "m"}, "h": "Perimeter = all four sides added together.", "k": "cg-q83"}, {"q": "The wall is 3 m long. How many centimetres is that?", "a": 300, "s": 100, "u": "cm", "h": "1 metre = 100 centimetres.", "k": "cg-q90"}, {"q": "7 lorries each carry 10 bags of cement. How many bags altogether?", "a": 70, "s": 7, "h": "7 × 10. Use your times tables.", "k": "cg-q91"}, {"q": "A pack of bricks costs 6 coins. How much do 7 packs cost?", "a": 42, "s": 6, "u": "coins", "h": "Multiply the price by the number of packs.", "k": "cg-q92"}, {"q": "How many square tiles cover this floor?", "a": 30, "s": 6, "u": "m²", "d": {"t": "rect", "w": 6, "h": 5, "u": "m", "grid": 1}, "h": "Count one row, then multiply by the number of rows.", "k": "cg-q82"}, {"q": "How long is the fence around this garden?", "a": 38, "s": 2, "u": "m", "d": {"t": "rect", "w": 11, "h": 8, "u": "m"}, "h": "Perimeter = all four sides added together.", "k": "cg-q83"}, {"q": "The wall is 8 m long. How many centimetres is that?", "a": 800, "s": 100, "u": "cm", "h": "1 metre = 100 centimetres.", "k": "cg-q93"}, {"q": "9 lorries each carry 9 bags of cement. How many bags altogether?", "a": 81, "s": 9, "h": "9 × 9. Use your times tables.", "k": "cg-q94"}, {"q": "A pack of bricks costs 7 coins. How much do 7 packs cost?", "a": 49, "s": 7, "u": "coins", "h": "Multiply the price by the number of packs.", "k": "cg-q95"}, {"q": "How many square tiles cover this floor?", "a": 36, "s": 6, "u": "m²", "d": {"t": "rect", "w": 6, "h": 6, "u": "m", "grid": 1}, "h": "Count one row, then multiply by the number of rows.", "k": "cg-q82"}, {"q": "How long is the fence around this garden?", "a": 40, "s": 2, "u": "m", "d": {"t": "rect", "w": 13, "h": 7, "u": "m"}, "h": "Perimeter = all four sides added together.", "k": "cg-q83"}, {"q": "The wall is 5 m long. How many centimetres is that?", "a": 500, "s": 100, "u": "cm", "h": "1 metre = 100 centimetres.", "k": "cg-q96"}, {"q": "7 lorries each carry 11 bags of cement. How many bags altogether?", "a": 77, "s": 7, "h": "7 × 11. Use your times tables.", "k": "cg-q97"}, {"q": "A pack of bricks costs 10 coins. How much do 6 packs cost?", "a": 60, "s": 10, "u": "coins", "h": "Multiply the price by the number of packs.", "k": "cg-q98"}, {"q": "How many square tiles cover this floor?", "a": 15, "s": 5, "u": "m²", "d": {"t": "rect", "w": 5, "h": 3, "u": "m", "grid": 1}, "h": "Count one row, then multiply by the number of rows.", "k": "cg-q82"}, {"q": "How long is the fence around this garden?", "a": 32, "s": 2, "u": "m", "d": {"t": "rect", "w": 11, "h": 5, "u": "m"}, "h": "Perimeter = all four sides added together.", "k": "cg-q83"}, {"q": "The wall is 6 m long. How many centimetres is that?", "a": 600, "s": 100, "u": "cm", "h": "1 metre = 100 centimetres.", "k": "cg-q99"}, {"q": "8 lorries each carry 9 bags of cement. How many bags altogether?", "a": 72, "s": 8, "h": "8 × 9. Use your times tables.", "k": "cg-q100"}, {"q": "A pack of bricks costs 11 coins. How much do 7 packs cost?", "a": 77, "s": 11, "u": "coins", "h": "Multiply the price by the number of packs.", "k": "cg-q101"}], [{"q": "What is the area of this floor?", "a": 132, "s": 10, "u": "m²", "d": {"t": "rect", "w": 22, "h": 6, "u": "m"}, "h": "Area = length × width.", "k": "cg-q102"}, {"q": "A square garden has sides of 11 m. How long is the fence around it?", "a": 44, "s": 4, "u": "m", "d": {"t": "rect", "w": 11, "h": 11, "u": "m"}, "h": "A square has 4 equal sides.", "k": "cg-q103"}, {"q": "A crane lifts 29 kg each time. How much does it lift in 5 trips?", "a": 145, "s": 10, "u": "kg", "h": "29 × 5: multiply the tens, then the ones, then add.", "k": "cg-q104"}, {"q": "¾ of 52 bricks are red. How many bricks are red?", "a": 39, "s": 13, "h": "Find ¼ first (divide by 4), then multiply by 3.", "k": "cg-q105"}, {"q": "The builder has 2 kg of nails. How many grams is that?", "a": 2000, "s": 500, "u": "g", "h": "1 kg = 1,000 g.", "k": "cg-q106"}, {"q": "What is the area of this floor?", "a": 180, "s": 10, "u": "m²", "d": {"t": "rect", "w": 15, "h": 12, "u": "m"}, "h": "Area = length × width.", "k": "cg-q102"}, {"q": "A square garden has sides of 14 m. How long is the fence around it?", "a": 56, "s": 4, "u": "m", "d": {"t": "rect", "w": 14, "h": 14, "u": "m"}, "h": "A square has 4 equal sides.", "k": "cg-q107"}, {"q": "A crane lifts 82 kg each time. How much does it lift in 5 trips?", "a": 410, "s": 10, "u": "kg", "h": "82 × 5: multiply the tens, then the ones, then add.", "k": "cg-q108"}, {"q": "¾ of 60 bricks are red. How many bricks are red?", "a": 45, "s": 15, "h": "Find ¼ first (divide by 4), then multiply by 3.", "k": "cg-q109"}, {"q": "The builder has 8 kg of nails. How many grams is that?", "a": 8000, "s": 500, "u": "g", "h": "1 kg = 1,000 g.", "k": "cg-q110"}, {"q": "What is the area of this floor?", "a": 91, "s": 10, "u": "m²", "d": {"t": "rect", "w": 13, "h": 7, "u": "m"}, "h": "Area = length × width.", "k": "cg-q102"}, {"q": "A square garden has sides of 24 m. How long is the fence around it?", "a": 96, "s": 4, "u": "m", "d": {"t": "rect", "w": 24, "h": 24, "u": "m"}, "h": "A square has 4 equal sides.", "k": "cg-q111"}, {"q": "A crane lifts 43 kg each time. How much does it lift in 4 trips?", "a": 172, "s": 10, "u": "kg", "h": "43 × 4: multiply the tens, then the ones, then add.", "k": "cg-q112"}, {"q": "¾ of 28 bricks are red. How many bricks are red?", "a": 21, "s": 7, "h": "Find ¼ first (divide by 4), then multiply by 3.", "k": "cg-q113"}, {"q": "The builder has 8.5 kg of nails. How many grams is that?", "a": 8500, "s": 500, "u": "g", "h": "1 kg = 1,000 g.", "k": "cg-q114"}, {"q": "What is the area of this floor?", "a": 40, "s": 10, "u": "m²", "d": {"t": "rect", "w": 8, "h": 5, "u": "m"}, "h": "Area = length × width.", "k": "cg-q102"}, {"q": "A square garden has sides of 22 m. How long is the fence around it?", "a": 88, "s": 4, "u": "m", "d": {"t": "rect", "w": 22, "h": 22, "u": "m"}, "h": "A square has 4 equal sides.", "k": "cg-q115"}, {"q": "A crane lifts 49 kg each time. How much does it lift in 3 trips?", "a": 147, "s": 10, "u": "kg", "h": "49 × 3: multiply the tens, then the ones, then add.", "k": "cg-q116"}, {"q": "¾ of 76 bricks are red. How many bricks are red?", "a": 57, "s": 19, "h": "Find ¼ first (divide by 4), then multiply by 3.", "k": "cg-q117"}, {"q": "The builder has 2.5 kg of nails. How many grams is that?", "a": 2500, "s": 500, "u": "g", "h": "1 kg = 1,000 g.", "k": "cg-q118"}, {"q": "What is the area of this floor?", "a": 180, "s": 10, "u": "m²", "d": {"t": "rect", "w": 18, "h": 10, "u": "m"}, "h": "Area = length × width.", "k": "cg-q102"}, {"q": "A square garden has sides of 23 m. How long is the fence around it?", "a": 92, "s": 4, "u": "m", "d": {"t": "rect", "w": 23, "h": 23, "u": "m"}, "h": "A square has 4 equal sides.", "k": "cg-q119"}, {"q": "A crane lifts 63 kg each time. How much does it lift in 8 trips?", "a": 504, "s": 10, "u": "kg", "h": "63 × 8: multiply the tens, then the ones, then add.", "k": "cg-q120"}, {"q": "¾ of 56 bricks are red. How many bricks are red?", "a": 42, "s": 14, "h": "Find ¼ first (divide by 4), then multiply by 3.", "k": "cg-q121"}, {"q": "The builder has 5 kg of nails. How many grams is that?", "a": 5000, "s": 500, "u": "g", "h": "1 kg = 1,000 g.", "k": "cg-q122"}, {"q": "What is the area of this floor?", "a": 48, "s": 10, "u": "m²", "d": {"t": "rect", "w": 8, "h": 6, "u": "m"}, "h": "Area = length × width.", "k": "cg-q102"}, {"q": "A square garden has sides of 9 m. How long is the fence around it?", "a": 36, "s": 4, "u": "m", "d": {"t": "rect", "w": 9, "h": 9, "u": "m"}, "h": "A square has 4 equal sides.", "k": "cg-q123"}, {"q": "A crane lifts 33 kg each time. How much does it lift in 9 trips?", "a": 297, "s": 10, "u": "kg", "h": "33 × 9: multiply the tens, then the ones, then add.", "k": "cg-q124"}, {"q": "¾ of 20 bricks are red. How many bricks are red?", "a": 15, "s": 5, "h": "Find ¼ first (divide by 4), then multiply by 3.", "k": "cg-q125"}, {"q": "The builder has 9.5 kg of nails. How many grams is that?", "a": 9500, "s": 500, "u": "g", "h": "1 kg = 1,000 g.", "k": "cg-q126"}], [{"q": "How many 1 cm cubes fill a box 5 cm × 2 cm × 3 cm?", "a": 30, "s": 5, "u": "cm³", "h": "Volume = length × width × height.", "k": "cg-q127"}, {"q": "The tower costs 200 coins. There is 10% off. How many coins do you save?", "a": 20, "s": 10, "u": "coins", "h": "Find 10%, then use it to find 10%.", "k": "cg-q128"}, {"q": "Concrete uses sand and cement in the ratio 2 : 1. How many buckets of sand go with 6 buckets of cement?", "a": 12, "s": 6, "h": "For every 1 bucket of cement there are 2 buckets of sand.", "k": "cg-q129"}, {"q": "What is the area of this triangular roof?", "a": 36, "s": 5, "u": "m²", "d": {"t": "tri", "b": 8, "h": 9, "u": "m"}, "h": "Area of a triangle = base × height ÷ 2.", "k": "cg-q130"}, {"q": "You buy 5 windows at 45 coins each. You pay with 500 coins. How much change?", "a": 275, "s": 10, "u": "coins", "h": "First find 5 × 45, then take it away from 500.", "k": "cg-q131"}, {"q": "How many 1 cm cubes fill a box 8 cm × 4 cm × 2 cm?", "a": 64, "s": 8, "u": "cm³", "h": "Volume = length × width × height.", "k": "cg-q132"}, {"q": "The tower costs 380 coins. There is 25% off. How many coins do you save?", "a": 95, "s": 10, "u": "coins", "h": "25% is a quarter.", "k": "cg-q133"}, {"q": "Concrete uses sand and cement in the ratio 2 : 1. How many buckets of sand go with 3 buckets of cement?", "a": 6, "s": 3, "h": "For every 1 bucket of cement there are 2 buckets of sand.", "k": "cg-q134"}, {"q": "What is the area of this triangular roof?", "a": 77, "s": 5, "u": "m²", "d": {"t": "tri", "b": 14, "h": 11, "u": "m"}, "h": "Area of a triangle = base × height ÷ 2.", "k": "cg-q130"}, {"q": "You buy 7 windows at 34 coins each. You pay with 500 coins. How much change?", "a": 262, "s": 10, "u": "coins", "h": "First find 7 × 34, then take it away from 500.", "k": "cg-q135"}, {"q": "How many 1 cm cubes fill a box 5 cm × 5 cm × 5 cm?", "a": 125, "s": 5, "u": "cm³", "h": "Volume = length × width × height.", "k": "cg-q136"}, {"q": "The tower costs 320 coins. There is 20% off. How many coins do you save?", "a": 64, "s": 10, "u": "coins", "h": "Find 10%, then use it to find 20%.", "k": "cg-q137"}, {"q": "Concrete uses sand and cement in the ratio 3 : 1. How many buckets of sand go with 6 buckets of cement?", "a": 18, "s": 6, "h": "For every 1 bucket of cement there are 3 buckets of sand.", "k": "cg-q138"}, {"q": "What is the area of this triangular roof?", "a": 18, "s": 5, "u": "m²", "d": {"t": "tri", "b": 6, "h": 6, "u": "m"}, "h": "Area of a triangle = base × height ÷ 2.", "k": "cg-q130"}, {"q": "You buy 6 windows at 20 coins each. You pay with 500 coins. How much change?", "a": 380, "s": 10, "u": "coins", "h": "First find 6 × 20, then take it away from 500.", "k": "cg-q139"}, {"q": "How many 1 cm cubes fill a box 4 cm × 2 cm × 5 cm?", "a": 40, "s": 4, "u": "cm³", "h": "Volume = length × width × height.", "k": "cg-q140"}, {"q": "The tower costs 380 coins. There is 50% off. How many coins do you save?", "a": 190, "s": 10, "u": "coins", "h": "50% is a half.", "k": "cg-q141"}, {"q": "Concrete uses sand and cement in the ratio 4 : 1. How many buckets of sand go with 7 buckets of cement?", "a": 28, "s": 7, "h": "For every 1 bucket of cement there are 4 buckets of sand.", "k": "cg-q142"}, {"q": "What is the area of this triangular roof?", "a": 30, "s": 5, "u": "m²", "d": {"t": "tri", "b": 6, "h": 10, "u": "m"}, "h": "Area of a triangle = base × height ÷ 2.", "k": "cg-q130"}, {"q": "You buy 6 windows at 44 coins each. You pay with 500 coins. How much change?", "a": 236, "s": 10, "u": "coins", "h": "First find 6 × 44, then take it away from 500.", "k": "cg-q143"}, {"q": "How many 1 cm cubes fill a box 6 cm × 2 cm × 2 cm?", "a": 24, "s": 6, "u": "cm³", "h": "Volume = length × width × height.", "k": "cg-q144"}, {"q": "The tower costs 260 coins. There is 50% off. How many coins do you save?", "a": 130, "s": 10, "u": "coins", "h": "50% is a half.", "k": "cg-q145"}, {"q": "Concrete uses sand and cement in the ratio 3 : 1. How many buckets of sand go with 12 buckets of cement?", "a": 36, "s": 12, "h": "For every 1 bucket of cement there are 3 buckets of sand.", "k": "cg-q146"}, {"q": "What is the area of this triangular roof?", "a": 42, "s": 5, "u": "m²", "d": {"t": "tri", "b": 12, "h": 7, "u": "m"}, "h": "Area of a triangle = base × height ÷ 2.", "k": "cg-q130"}, {"q": "You buy 6 windows at 41 coins each. You pay with 500 coins. How much change?", "a": 254, "s": 10, "u": "coins", "h": "First find 6 × 41, then take it away from 500.", "k": "cg-q147"}, {"q": "How many 1 cm cubes fill a box 6 cm × 3 cm × 2 cm?", "a": 36, "s": 6, "u": "cm³", "h": "Volume = length × width × height.", "k": "cg-q148"}, {"q": "The tower costs 280 coins. There is 10% off. How many coins do you save?", "a": 28, "s": 10, "u": "coins", "h": "Find 10%, then use it to find 10%.", "k": "cg-q149"}, {"q": "Concrete uses sand and cement in the ratio 4 : 1. How many buckets of sand go with 3 buckets of cement?", "a": 12, "s": 3, "h": "For every 1 bucket of cement there are 4 buckets of sand.", "k": "cg-q150"}, {"q": "What is the area of this triangular roof?", "a": 55, "s": 5, "u": "m²", "d": {"t": "tri", "b": 10, "h": 11, "u": "m"}, "h": "Area of a triangle = base × height ÷ 2.", "k": "cg-q130"}, {"q": "You buy 8 windows at 44 coins each. You pay with 500 coins. How much change?", "a": 148, "s": 10, "u": "coins", "h": "First find 8 × 44, then take it away from 500.", "k": "cg-q151"}]];
let grade=2,RECENT=[];
function makeQ(){const bank=CQB[grade];let it,t=0;do{it=pick(bank)}while(RECENT.includes(it)&&t++<20);RECENT.push(it);if(RECENT.length>10)RECENT.shift();const g=Object.assign({},it);const s=new Set([g.a]);let k=0;while(s.size<4&&k++<80){const v=g.a+pick([-1,1])*R(1,3)*g.s;if(v>0)s.add(v)}let i=1;while(s.size<4)s.add(g.a+g.s*(i++)*5);g.o=[...s].sort(()=>Math.random()-.5);return g}
function diagram(d){if(!d)return'';const lab=(x,y,t,a)=>`<text x="${x}" y="${y}" text-anchor="${a||'middle'}" font-size="18" font-weight="700" fill="#5A3D00" font-family="Fredoka,sans-serif">${t}</text>`;
 if(d.t==='rect'){const mx=Math.max(d.w,d.h),sc=Math.min(26,170/mx),w=d.w*sc,h=d.h*sc,x=40,y=14;let g='';
  if(d.grid){for(let i=1;i<d.w;i++)g+=`<line x1="${x+i*sc}" y1="${y}" x2="${x+i*sc}" y2="${y+h}" stroke="#B98B4A" stroke-width="1.5"/>`;for(let j=1;j<d.h;j++)g+=`<line x1="${x}" y1="${y+j*sc}" x2="${x+w}" y2="${y+j*sc}" stroke="#B98B4A" stroke-width="1.5"/>`}
  return `<svg class="cg-dia" viewBox="0 0 ${w+90} ${h+44}" width="${(w+90)*1.1}"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${d.grid?'#F6E3B4':'#BFE5A0'}" stroke="#5A3D00" stroke-width="3"/>${g}${lab(x+w/2,y+h+24,d.w+' '+d.u)}${lab(x+w+8,y+h/2+6,d.h+' '+d.u,'start')}</svg>`}
 if(d.t==='tri'){const sc=Math.min(14,200/Math.max(d.b,d.h)),b=d.b*sc,h=d.h*sc,x=20,y=10;
  return `<svg class="cg-dia" viewBox="0 0 ${b+110} ${h+44}" width="${(b+110)*1.1}"><path d="M${x} ${y+h} L${x+b/2} ${y} L${x+b} ${y+h}Z" fill="#E98B6D" stroke="#5A3D00" stroke-width="3"/><line x1="${x+b/2}" y1="${y}" x2="${x+b/2}" y2="${y+h}" stroke="#5A3D00" stroke-width="2" stroke-dasharray="5 4"/>${lab(x+b/2,y+h+24,'base '+d.b+' '+d.u)}${lab(x+b/2+8,y+h/2+6,'height '+d.h+' '+d.u,'start')}</svg>`}return''}

/* ---------- buildings ---------- */
const B=[
 {id:'park',c:30,rep:1,lv:['Park','Flower park','Royal gardens']},
 {id:'house',c:40,rep:1,lv:['Cosy house','Family home','Grand villa']},
 {id:'fountain',c:60,lv:['Fountain','Twin fountain','Golden fountain']},
 {id:'shop',c:70,lv:['Market stall','Market','Grand bazaar']},
 {id:'clock',c:80,lv:['Clock tower','Tall clock tower','Royal clock tower']},
 {id:'library',c:90,lv:['Library','Domed library','Great library']},
 {id:'school',c:100,lv:['School','Big school','Academy']},
 {id:'tower',c:120,g:1,lv:['Tower','Sky tower','Crystal tower']},
 {id:'castle',c:150,g:1,lv:['Castle','Fortress','Royal palace']},
 {id:'stadium',c:180,g:2,lv:['Stadium','Big stadium','Grand arena']},
 {id:'wheel',c:200,g:2,lv:['Big wheel','Giant wheel','Golden wheel']},
 {id:'rocket',c:250,g:3,lv:['Rocket pad','Space centre','Moon launch']}];
const bOf=id=>B.find(b=>b.id===id);
const r5=n=>Math.round(n/5)*5;
function cost(b,lv){return lv===1?{c:b.c,g:b.g||0}:lv===2?{c:r5(b.c*.8),g:b.g||0}:{c:b.c,g:(b.g||0)+1}}
const LEVELS=[[0,'Empty land'],[1,'Village'],[4,'Town'],[10,'City'],[18,'Capital City']];
function cityLevel(){let p=0;PLOTS.forEach(q=>p+=q.lv||0);let n=LEVELS[0][1];LEVELS.forEach(([m,t])=>{if(p>=m)n=t});return{p,n}}

/* ---------- the map ---------- */
/* tiles: 0 grass, 1 tree, 2 water, 3 road, 4 plaza, 5 fence, 6 flowers, 7 sand, 8 pier, 9 fountain (solid) */
const MW=44,MH=28;const M=[];const SOLID=new Set([1,2,5,9]);
const DIST=[
 {id:'town',n:'Town Square',x0:2,y0:2,x1:20,y1:12,need:null,col:'#E9D8A6'},
 {id:'forest',n:'Forest Quarter',x0:23,y0:2,x1:41,y1:12,need:'forest',how:'Finish Number Forest to open the Forest Quarter',col:'#B7DFA0'},
 {id:'harbour',n:'Harbour',x0:23,y0:15,x1:38,y1:25,need:'island',how:'Finish Treasure Island to open the Harbour',col:'#A8D8EA'},
 {id:'hill',n:'Hilltop',x0:2,y0:15,x1:20,y1:25,need:'mount',how:'Geometry Mountains is coming soon. Then the Hilltop opens!',col:'#D6C8F0'}];
let PLOTS=[];
function mkPlots(){PLOTS=[];DIST.forEach((d,di)=>{const xs=d.id==='harbour'?[d.x0+1,d.x0+6,d.x0+11]:[d.x0+1,d.x0+7,d.x0+13];
 [d.y0+1,d.y0+6].forEach((py,r)=>xs.forEach((px,c)=>PLOTS.push({key:d.id+'-'+(r*3+c),d:di,x:px,y:py,id:null,lv:0,anim:1})))})}
mkPlots();
let seed=5;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
function build(){seed=5;for(let y=0;y<MH;y++){M[y]=[];for(let x=0;x<MW;x++)M[y][x]=0}
 const set=(x,y,v)=>{if(x>=0&&y>=0&&x<MW&&y<MH)M[y][x]=v};
 for(let x=0;x<MW;x++){set(x,0,1);set(x,1,1);set(x,MH-1,1);set(x,MH-2,1)}for(let y=0;y<MH;y++){set(0,y,1);set(1,y,1);set(MW-1,y,1);set(MW-2,y,1)}
 // sea along the harbour
 for(let y=14;y<MH-1;y++){set(39,y,7);for(let x=40;x<MW;x++)set(x,y,2)}
 [19,24].forEach(py=>{for(let x=39;x<42;x++)set(x,py,8)});
 // main roads and plaza
 for(let x=2;x<MW-2;x++){set(x,13,3);set(x,14,3)}for(let y=2;y<MH-2;y++){set(21,y,3);set(22,y,3)}
 for(let y=12;y<=15;y++)for(let x=19;x<=24;x++)set(x,y,4);
 set(21,13,9);set(22,13,9);set(21,14,9);set(22,14,9);
 for(let x=39;x<42;x++){set(x,13,3);set(x,14,3)}
 // district roads in front of each row of plots
 DIST.forEach(d=>{[d.y0+4,d.y0+9].forEach(ry=>{for(let x=d.x0;x<=d.x1;x++)set(x,ry,3)});
  for(let y=d.y0;y<=d.y1;y++)for(let x=d.x0;x<=d.x1;x++)if(M[y][x]===0&&rnd()<.07)set(x,y,6)});
 // a few trees between districts
 for(let y=2;y<MH-2;y++)for(let x=2;x<MW-2;x++){if(M[y][x]!==0)continue;const inD=DIST.some(d=>x>=d.x0&&x<=d.x1&&y>=d.y0&&y<=d.y1);if(!inD&&rnd()<.25)set(x,y,1)}
 // fences around districts that are still closed
 DIST.forEach(d=>{if(open(d))return;for(let x=d.x0;x<=d.x1;x++){set(x,d.y0,5);set(x,d.y1,5)}for(let y=d.y0;y<=d.y1;y++){set(d.x0,y,5);set(d.x1,y,5)}})}
function open(d){if(!d.need)return true;if(live()&&ADV.badges.includes(d.need))return true;return PLOTS.some(p=>DIST[p.d]===d&&p.lv>0)}

/* ---------- state ---------- */
let G=null,NIGHT=false;
const live=()=>typeof ADV!=='undefined'&&ADV&&typeof ME!=='undefined'&&ME;
const money=()=>live()?{c:ADV.coins,g:ADV.gems}:{c:G.coins,g:G.gems};
function pay(c,g){if(live()){ADV.coins-=c;ADV.gems-=g}else{G.coins-=c;G.gems-=g}}
function loadCity(){PLOTS.forEach(p=>{p.id=null;p.lv=0;p.anim=1});if(!live())return;
 if(!ADV.city||typeof ADV.city!=='object'){ADV.city={p:{}};const old=Object.values(ADV.built||{}),order=PLOTS.filter(p=>p.d<2);old.forEach((id,i)=>{if(order[i])ADV.city.p[order[i].key]=[id==='bridge'?'clock':id,1]})}
 if(!ADV.city.p)ADV.city.p={};
 Object.entries(ADV.city.p).forEach(([k,v])=>{const p=PLOTS.find(q=>q.key===k);if(p&&Array.isArray(v)&&bOf(v[0])){p.id=v[0];p.lv=Math.max(1,Math.min(3,+v[1]||1))}});NIGHT=!!ADV.city.night}
function saveCity(){if(!live())return;const o={};PLOTS.forEach(p=>{if(p.lv)o[p.key]=[p.id,p.lv]});ADV.city={p:o,night:NIGHT};
 const flat={};PLOTS.filter(p=>p.lv).forEach((p,i)=>flat[i]=p.id);ADV.built=flat;if(typeof advSave==='function')advSave()}
function reset(){G={px:22*T,py:11*T+32,dir:'d',walk:0,coins:300,gems:4,cam:{x:22*T-W/2,y:11*T-H/2},t:0,parts:[],pause:true}}

/* ---------- HUD and goal ---------- */
let HUDK='';function hud(){const m=money(),L=cityLevel(),k=[m.c,m.g,L.p].join();if(k===HUDK)return;HUDK=k;
 $('cg-coins').textContent='🪙 '+m.c;$('cg-gems').textContent='💎 '+m.g;$('cg-lvl').textContent='🏙️ '+L.n+' · '+L.p+' pts'}
function cheapest(){const m=money();return B.some(b=>m.c>=b.c&&m.g>=(b.g||0))}
function goal(){const empty=PLOTS.some(p=>!p.lv&&open(DIST[p.d]));
 $('fg-goal').textContent=!cheapest()?'🪙 Earn more coins in Number Forest and Treasure Island':empty?'🏗️ Walk to an empty plot and press Build':'⭐ Walk to a building and press Upgrade'}
function toast(t){const e=$('fg-toast');e.textContent=t;e.style.opacity=1;clearTimeout(toast.k);toast.k=setTimeout(()=>e.style.opacity=0,2400)}

/* ---------- input ---------- */
const K={u:0,d:0,l:0,r:0};
const KM={ArrowUp:'u',w:'u',W:'u',ArrowDown:'d',s:'d',S:'d',ArrowLeft:'l',a:'l',A:'l',ArrowRight:'r',d:'r',D:'r'};
function busy(e){const tg=e.target&&e.target.tagName;return tg==='INPUT'||tg==='TEXTAREA'||tg==='SELECT'||(G&&G.pause)}
addEventListener('keydown',e=>{if(!ON||busy(e))return;if(KM[e.key]){K[KM[e.key]]=1;e.preventDefault()}if((e.key===' '||e.key==='Enter')&&near){e.preventDefault();interact()}if(e.key==='n'||e.key==='N')night()});
addEventListener('keyup',e=>{if(!ON)return;if(KM[e.key])K[KM[e.key]]=0});
function bindUI(){document.querySelectorAll('#fgw .fg-pad button').forEach(b=>{const d=b.dataset.d;const on=e=>{e.preventDefault();K[d]=1;b.classList.add('fg-on')},off=e=>{e.preventDefault();K[d]=0;b.classList.remove('fg-on')};
 b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);b.addEventListener('pointerleave',off);b.addEventListener('pointercancel',off)});
 $('fg-act').addEventListener('pointerdown',e=>{e.preventDefault();interact()});$('fg-mapbtn').onclick=night;$('fg-exit').onclick=()=>stop(true)}
function night(){NIGHT=!NIGHT;snd(NIGHT?'night':'day');$('fg-mapbtn').textContent=NIGHT?'☀️ Day':'🌙 Night';$('fg-mapbtn').classList.toggle('cg-on',NIGHT);saveCity()}

/* ---------- movement ---------- */
const tileAt=(px,py)=>{const x=Math.floor(px/T),y=Math.floor(py/T);return (x<0||y<0||x>=MW||y>=MH)?1:M[y][x]};
const plotAt=(px,py)=>{const x=Math.floor(px/T),y=Math.floor(py/T);return PLOTS.find(p=>x>=p.x&&x<p.x+3&&y>=p.y&&y<p.y+3)};
const solidAt=(px,py)=>SOLID.has(tileAt(px,py))||!!plotAt(px,py);
const hits=(x,y)=>{const r=18;return solidAt(x-r,y-r+10)||solidAt(x+r,y-r+10)||solidAt(x-r,y+r)||solidAt(x+r,y+r)};
const front=p=>({x:(p.x+1.5)*T,y:(p.y+3)*T+26});
let near=null,lastD=-1;
function update(){G.t++;G.parts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=p.g||0;p.l--});G.parts=G.parts.filter(p=>p.l>0);
 PLOTS.forEach(p=>{if(p.anim<1){p.anim=Math.min(1,p.anim+1/110);if(G.t%6===0)for(let i=0;i<3;i++)G.parts.push({x:(p.x+R(0,3))*T,y:(p.y+3)*T-R(0,20),vx:R(-2,2)/2,vy:-R(1,3)/2,l:30,c:'rgba(190,170,130,.8)',r:7});if(G.t%22===0)snd('hammer');if(p.anim>=1)done(p)}});
 if(!G.pause){let dx=(K.r-K.l),dy=(K.d-K.u);if(dx&&dy){dx*=.71;dy*=.71}const sp=tileAt(G.px,G.py)===3||tileAt(G.px,G.py)===4?5:4.2;
  if(dx||dy){G.dir=Math.abs(dx)>Math.abs(dy)?(dx>0?'r':'l'):(dy>0?'d':'u');G.walk++;if(G.walk%16===0)snd('step')}else G.walk=0;
  const nx=G.px+dx*sp,ny=G.py+dy*sp;if(!hits(nx,G.py))G.px=nx;if(!hits(G.px,ny))G.py=ny;
  const di=DIST.findIndex(d=>G.px>=d.x0*T&&G.px<(d.x1+1)*T&&G.py>=d.y0*T&&G.py<(d.y1+1)*T);if(di!==lastD){lastD=di;if(di>=0)toast('📍 '+DIST[di].n+(open(DIST[di])?'':' 🔒'))}}
 near=null;let bd=95;PLOTS.forEach(p=>{const f=front(p),d=Math.hypot(f.x-G.px,f.y-G.py);if(d<bd&&p.anim>=1){bd=d;near=p}});
 if(!near){const sgn=DIST.find(d=>!open(d)&&Math.hypot(signPos(d).x-G.px,signPos(d).y-G.py)<110);if(sgn)near={sign:sgn}}
 const a=$('fg-act');a.style.display=near&&!G.pause?'block':'none';if(near)a.textContent=near.sign?'Read':!open(DIST[near.d])?'Locked':!near.lv?'Build':near.lv<3?'Upgrade':'Visit';
 const tx=G.px-W/2,ty=G.py-H/2;G.cam.x+=(Math.max(0,Math.min(tx,MW*T-W))-G.cam.x)*.12;G.cam.y+=(Math.max(0,Math.min(ty,MH*T-H))-G.cam.y)*.12;hud()}
function signPos(d){const right=d.x0>21;return{x:(right?d.x0:d.x1+1)*T+(right?-6:6),y:(d.y0+4.5)*T}}

/* ---------- building with maths ---------- */
function card(html){$('fg-ov').innerHTML=`<div class="fg-card"><button class="cg-x" id="cg-x" aria-label="Close">✕</button>${html}</div>`;$('fg-ov').hidden=false;$('cg-x').onclick=close}
function close(){$('fg-ov').hidden=true;$('fg-ov').innerHTML='';G.pause=false;goal()}
function interact(){if(!near||G.pause)return;K.u=K.d=K.l=K.r=0;const p=near;
 if(p.sign){snd('locked');G.pause=true;card(`<h2>🔒 ${esc0(p.sign.n)}</h2><p>${esc0(p.sign.how)}</p><button class="fg-go" id="fg-ok">OK ➜</button>`);$('fg-ok').onclick=close;return}
 if(!open(DIST[p.d])){snd('locked');toast('🔒 '+DIST[p.d].how);return}
 snd('open');G.pause=true;if(!p.lv)shop(p);else if(p.lv<3)upgrade(p);else{card(`<img src="${preview(p.id,3)}" style="height:9em" alt=""><h2>${esc0(bOf(p.id).lv[2])}</h2><p>⭐⭐⭐ Fully upgraded. This is one of the finest buildings in your city!</p><button class="fg-go" id="fg-ok">Keep exploring ➜</button>`);$('fg-ok').onclick=close}}
function priceTxt(c){return `🪙 ${c.c}${c.g?` + 💎 ${c.g}`:''}`}
function shop(p){const m=money(),have=new Set(PLOTS.filter(q=>q.lv).map(q=>q.id));
 card(`<h2>🏗️ What will you build here?</h2><p class="cg-sub">You have 🪙 ${m.c} and 💎 ${m.g}. Every building needs 3 maths challenges.</p>
 <div class="cg-shop">${B.map(b=>{const c=cost(b,1),own=!b.rep&&have.has(b.id),can=m.c>=c.c&&m.g>=c.g;
  return `<button data-b="${b.id}" ${can&&!own?'':'disabled'}><img src="${preview(b.id,1)}" alt=""><b>${esc0(b.lv[0])}</b><i>${own?'✓ Already built':priceTxt(c)}</i></button>`}).join('')}</div>`);
 document.querySelectorAll('#fgw .cg-shop [data-b]').forEach(btn=>btn.onclick=()=>challenge(p,bOf(btn.dataset.b),1))}
function upgrade(p){const b=bOf(p.id),nl=p.lv+1,c=cost(b,nl),m=money(),can=m.c>=c.c&&m.g>=c.g;
 card(`<h2>⬆️ Upgrade your ${esc0(b.lv[p.lv-1])}</h2><div class="cg-up"><img src="${preview(b.id,p.lv)}" alt=""><span class="arr">➜</span><img src="${preview(b.id,nl)}" alt=""></div>
 <p><b>${esc0(b.lv[nl-1])}</b> · ${priceTxt(c)} · 2 maths challenges</p>
 ${can?'<button class="fg-go" id="fg-ok">Start building 🔨</button>':`<p class="cg-sub">You need ${c.c>m.c?`🪙 ${c.c-m.c} more coins`:''}${c.c>m.c&&c.g>m.g?' and ':''}${c.g>m.g?`💎 ${c.g-m.g} more gem${c.g-m.g>1?'s':''}`:''}. Go exploring to earn them!</p><button class="fg-go" id="fg-no">OK ➜</button>`}`);
 if(can)$('fg-ok').onclick=()=>challenge(p,b,nl);else $('fg-no').onclick=close}
const STEPS={1:[['🧱','Lay the foundations'],['🪟','Build the walls'],['🏠','Put on the roof']],2:[['🏗️','Build it bigger'],['✨','Finishing touches']],3:[['🏗️','Build it bigger'],['👑','Golden finish']]};
function challenge(p,b,nl){const st=STEPS[nl],c=cost(b,nl);let i=0,tries=0,Q=null;
 const ask=fresh=>{if(fresh!==false){Q=makeQ();tries=0}
  card(`<div class="cg-steps">${st.map((s,j)=>`<span class="${j<i?'ok':j===i?'on':''}">${j<i?'✓':s[0]} ${s[1]}</span>`).join('')}</div>
  <h2>${esc0(b.lv[nl-1])} · step ${i+1} of ${st.length}</h2>${diagram(Q.d)}<div class="fg-q">${esc0(Q.q)}</div>
  <div class="fg-ans">${Q.o.map(v=>`<button data-v="${v}">${fmt(v)}${Q.u?' '+Q.u:''}</button>`).join('')}</div><div class="fg-fb" id="fb"></div><button class="fg-say" id="fg-sayq">🔊 Read it to me</button>`);
  say(Q.q,Q.k);$('fg-sayq').onclick=()=>say(Q.q,Q.k);
  document.querySelectorAll('#fgw .fg-ans button').forEach(btn=>btn.onclick=()=>{if(btn.classList.contains('fg-bad')||btn.disabled)return;
   if(+btn.dataset.v===Q.a){btn.classList.add('fg-good');snd('right');snd('hammer');i++;
    if(i>=st.length){setTimeout(()=>finish(p,b,nl,c),650);return}setTimeout(()=>ask(),750)}
   else{tries++;btn.classList.add('fg-bad');snd('wrong');
    if(tries===1){$('fb').innerHTML='Not quite. 💡 '+esc0(Q.h)}
    else{document.querySelectorAll('#fgw .fg-ans button').forEach(x=>x.disabled=true);$('fb').innerHTML=`The answer is <b>${fmt(Q.a)}${Q.u?' '+Q.u:''}</b>. <button class="fg-go" id="cg-new" style="font-size:1em;margin-left:.4em">Try a new one ➜</button>`;$('cg-new').onclick=()=>ask()}}})};
 ask()}
function finish(p,b,nl,c){const m=money();if(m.c<c.c||m.g<c.g){card('<h2>Oops!</h2><p>You do not have enough coins any more.</p><button class="fg-go" id="fg-ok">OK</button>');$('fg-ok').onclick=close;return}
 const before=cityLevel().n;pay(c.c,c.g);p.id=b.id;p.lv=nl;p.anim=0;p.before=before;saveCity();hud();
 $('fg-ov').hidden=true;$('fg-ov').innerHTML='';G.pause=true;toast('🔨 Building your '+b.lv[nl-1]+'…');
 // camera looks at the building
 G.px=front(p).x;G.py=front(p).y;G.dir='u'}
function done(p){const b=bOf(p.id),f=front(p);snd('built');
 for(let i=0;i<40;i++)G.parts.push({x:f.x+R(-90,90),y:f.y-R(60,200),vx:R(-5,5),vy:R(-7,-1),g:.25,l:R(40,70),c:pick(['#FFC93C','#2DBE6C','#E05A47','#5BC0EB','#A78BFA'])});
 G.parts.push({x:f.x,y:f.y-230,vx:0,vy:-.8,l:100,txt:(p.lv>1?'⬆️ ':'🎉 ')+b.lv[p.lv-1]+'!',c:'#FFE08A'});
 if(typeof miniParty==='function')try{miniParty()}catch(e){}
 const L=cityLevel();if(L.n!==p.before){setTimeout(()=>{G.pause=true;snd('built');say('Amazing! Your city is now a '+L.n+'!','cg-rank-'+L.n.replace(/ /g,'').toLowerCase());
  card(`<img src="${preview(b.id,p.lv)}" style="height:8em" alt=""><h2>🎉 Your city is now a ${esc0(L.n)}!</h2><p>You have ${L.p} city points. Keep building and upgrading to grow your city.</p><button class="fg-go" id="fg-ok">Keep building ➜</button>`);$('fg-ok').onclick=close},1300)}
 else{say('You built a '+b.lv[p.lv-1]+'!','cg-built-'+b.id+p.lv);setTimeout(()=>{G.pause=false;goal()},900)}}

/* ---------- drawing helpers ---------- */
const OL='#3A2614';
function shape(f,s){X.fillStyle=f;X.fill();X.lineWidth=4;X.lineJoin='round';X.strokeStyle=s||OL;X.stroke()}
function poly(pts,f){X.beginPath();pts.forEach(([x,y],i)=>i?X.lineTo(x,y):X.moveTo(x,y));X.closePath();shape(f)}
function box(x,y,w,h,f,r){X.beginPath();X.roundRect(x,y,w,h,r??5);shape(f)}
function circ(x,y,r,f){X.beginPath();X.arc(x,y,r,0,7);shape(f)}
function ell(x,y,rx,ry,f){X.beginPath();X.ellipse(x,y,rx,ry,0,0,7);shape(f)}
let LIGHTS=[];function light(x,y,r){const m=X.getTransform();LIGHTS.push([m.a*x+m.c*y+m.e,m.b*x+m.d*y+m.f,r*m.a])}
function win(x,y,w,h){box(x,y,w,h,NIGHT?'#FFD966':'#A9DDF5',3);if(NIGHT)light(x+w/2,y+h/2,Math.max(w,h)*1.4);X.beginPath();X.moveTo(x+w/2,y+2);X.lineTo(x+w/2,y+h-2);X.moveTo(x+2,y+h/2);X.lineTo(x+w-2,y+h/2);X.lineWidth=2;X.strokeStyle=OL;X.stroke()}
function door(x,y,w,h,f){X.beginPath();X.moveTo(x,y+h);X.lineTo(x,y+w/2);X.arc(x+w/2,y+w/2,w/2,Math.PI,0);X.lineTo(x+w,y+h);X.closePath();shape(f||'#8B5A2B');circ(x+w*.75,y+h*.6,2.5,'#FFC93C')}
function flag(x,y,c,t){X.beginPath();X.moveTo(x,y);X.lineTo(x,y-40);X.lineWidth=3;X.strokeStyle=OL;X.stroke();const w=Math.sin(t/8)*4;poly([[x,y-40],[x+26,y-34+w],[x,y-26]],c)}
function shadowE(cx,by,w){X.fillStyle='rgba(0,0,0,.2)';X.beginPath();X.ellipse(cx,by,w,14,0,0,7);X.fill()}
function roofTri(cx,y,w,h,f){poly([[cx-w/2,y],[cx,y-h],[cx+w/2,y]],f)}
function sparkle(cx,by,t){for(let i=0;i<3;i++){const a=t/20+i*2.1,x=cx+Math.cos(a)*70,y=by-110+Math.sin(a*1.3)*60,s=4+Math.sin(t/6+i)*2;X.fillStyle='#FFF3A0';X.beginPath();X.moveTo(x,y-s*2);X.lineTo(x+s/2,y);X.lineTo(x,y+s*2);X.lineTo(x-s/2,y);X.fill()}}
const GOLD='#F2C14E';
/* each building: cx = centre, by = ground line, lv 1–3 */
const DRAW={
 house(cx,by,lv,t){const w=lv===3?160:130,h=lv===1?70:115,wall=lv===3?'#FBF3E4':'#F6E1BC',roof=lv===3?'#3F6FB5':lv===2?'#B84A3E':'#D9573F';
  shadowE(cx,by,w/2+12);box(cx+w/2-34,by-h-62,18,40,'#A0663A',2);box(cx-w/2,by-h,w,h,wall,4);roofTri(cx,by-h+4,w+26,lv===3?62:56,roof);
  if(lv===3){X.beginPath();X.moveTo(cx-w/2-13,by-h+4);X.lineTo(cx,by-h-58);X.lineTo(cx+w/2+13,by-h+4);X.lineWidth=5;X.strokeStyle=GOLD;X.stroke();box(cx-w/2+8,by-h+14,w-16,8,'#E8D9B0',2)}
  door(cx-13,by-44,26,44,lv===3?'#2F5D9E':'#8B5A2B');win(cx-w/2+14,by-50,24,22);win(cx+w/2-38,by-50,24,22);
  if(lv>=2){win(cx-w/2+14,by-h+22,24,22);win(cx-12,by-h+22,24,22);win(cx+w/2-38,by-h+22,24,22)}
  if(lv>=2){for(let i=0;i<5;i++)circ(cx-w/2-6+i*8,by-4,4,['#E05A47','#FFC93C','#F49AC2'][i%3])}
  if(lv===3){box(cx-w/2-16,by-60,12,60,'#fff',2);box(cx+w/2+4,by-60,12,60,'#fff',2);flag(cx,by-h-54,'#E05A47',t)}},
 park(cx,by,lv,t){const w=lv===3?186:170,h=lv===3?120:104;shadowE(cx,by,w/2);box(cx-w/2,by-h,w,h,lv===3?'#7CC95B':'#8CD46A',20);
  X.fillStyle='#E8C98A';X.fillRect(cx-8,by-h+4,16,h-8);X.fillRect(cx-w/2+4,by-h/2-8,w-8,16);
  if(lv>=2){ell(cx+w/4+6,by-h/4-6,26,14,'#5BB8E8');}
  if(lv===3){box(cx-w/4-26,by-h+8,52,10,'#fff',3);[cx-w/4-20,cx-w/4+16].forEach(x=>box(x,by-h+16,6,30,'#fff',2));roofTri(cx-w/4,by-h+10,64,24,'#E05A47')}
  spr('tree2',cx-w/2+24,by-h+52,64);spr('tree1',cx+w/2-26,by-h+56,58);spr('tree3',cx-w/2+28,by-6,52);
  box(cx+w/2-62,by-30,40,10,'#A0663A',2);
  if(lv>=2){spr('flowers',cx+26,by-h+44,30);spr('flowers',cx-38,by-14,30)}if(lv===3)spr('flowers',cx+w/2-24,by-h+40,30)},
 fountain(cx,by,lv,t){shadowE(cx,by-10,86);ell(cx,by-40,90,46,'#D9CDB5');ell(cx,by-46,lv>=2?70:60,lv>=2?32:28,'#B9AE96');ell(cx,by-48,lv>=2?62:52,lv>=2?26:22,'#6EC6EE');
  const top=lv>=2?by-118:by-96;box(cx-8,top,16,by-50-top,'#C9BEA6',3);if(lv>=2)ell(cx,by-96,30,12,'#B9AE96');
  if(lv===3)circ(cx,top-14,13,GOLD);
  X.strokeStyle='rgba(255,255,255,.9)';X.lineWidth=3;for(let i=0;i<6;i++){const a=i/6*Math.PI*2+t/30,r=34+Math.sin(t/7+i)*4;X.beginPath();X.moveTo(cx,top+4);X.quadraticCurveTo(cx+Math.cos(a)*r*.6,top-26,cx+Math.cos(a)*r,by-48+Math.sin(a)*10);X.stroke()}},
 shop(cx,by,lv,t){const n=lv===1?1:2;shadowE(cx,by,92);
  if(lv===3){box(cx-88,by-120,176,120,'#F3D9A4',4);box(cx-60,by-150,120,34,'#C8553D',6);X.fillStyle='#fff';X.font='700 20px Fredoka';X.textAlign='center';X.fillText('BAZAAR',cx,by-127);win(cx-70,by-104,26,24);win(cx+44,by-104,26,24)}
  for(let k=0;k<n;k++){const x=n===1?cx:cx-46+k*92,w=lv===1?120:84;box(x-w/2,by-52,w,52,'#C9935B',4);
   for(let s=0;s<6;s++){const sx=x-w/2-6+s*(w+12)/6;poly([[sx,by-60-(lv===3?54:42)],[sx+(w+12)/6,by-60-(lv===3?54:42)],[sx+(w+12)/6,by-62],[sx,by-62]],s%2?'#fff':(k?'#2D8FC9':'#E05A47'))}
   for(let f=0;f<4;f++)circ(x-w/2+14+f*(w-28)/3,by-58,8,['#E05A47','#FFC93C','#7BC043','#F28C28'][f])}},
 clock(cx,by,lv,t){const h=lv===1?150:lv===2?190:200,w=lv===3?74:64;shadowE(cx,by,58);box(cx-w/2-14,by-40,w+28,40,'#D9CDB5',4);box(cx-w/2,by-h,w,h-30,'#E7D8BA',4);
  roofTri(cx,by-h+2,w+18,lv===1?46:58,lv===3?GOLD:'#5B6E9E');circ(cx,by-h+40,24,'#FFFBEA');
  const tt=Date.now()/1000;[[tt/43200*Math.PI*2,12],[tt/3600*Math.PI*2,18]].forEach(([a,l])=>{X.beginPath();X.moveTo(cx,by-h+40);X.lineTo(cx+Math.sin(a)*l,by-h+40-Math.cos(a)*l);X.lineWidth=3;X.strokeStyle=OL;X.stroke()});
  door(cx-12,by-40,24,40);if(lv>=2){win(cx-10,by-h+80,20,26)}if(lv===3){circ(cx,by-h-60,8,GOLD);flag(cx,by-h-60,'#2D8FC9',t)}},
 library(cx,by,lv,t){const w=lv===3?176:156;shadowE(cx,by,w/2+6);box(cx-w/2-8,by-14,w+16,14,'#CFC3AA',2);box(cx-w/2,by-96,w,82,'#F1E7D0',3);
  if(lv>=2){X.beginPath();X.arc(cx,by-118,lv===3?46:40,Math.PI,0);X.closePath();shape(lv===3?GOLD:'#7FA8C9')}
  roofTri(cx,by-94,w+20,34,'#E3D5B6');for(let i=0;i<5;i++)box(cx-w/2+10+i*(w-28)/4,by-90,10,76,'#fff',2);door(cx-12,by-50,24,36,'#6B4A2B');
  if(lv===3){[cx-w/2-16,cx+w/2+16].forEach(x=>{box(x-8,by-40,16,40,'#CFC3AA',2);circ(x,by-48,9,GOLD)})}},
 school(cx,by,lv,t){const w=176,h=lv===1?84:120;shadowE(cx,by,w/2+6);box(cx-w/2,by-h,w,h,'#E79A6A',4);box(cx-w/2-6,by-h-10,w+12,14,'#B5543C',3);
  box(cx-26,by-h-40,52,34,'#E79A6A',4);roofTri(cx,by-h-38,64,26,'#B5543C');circ(cx,by-h-22,11,'#FFFBEA');
  door(cx-16,by-50,32,50,'#2F5D9E');for(let r=0;r<(lv===1?1:2);r++)[-74,-46,24,52].forEach(dx=>win(cx+dx,by-70-r*40,22,24));
  flag(cx+w/2-16,by-h-10,'#2DBE6C',t);if(lv===3){box(cx-w/2-30,by-30,22,30,'#FFC93C',3);X.fillStyle=OL;X.font='700 14px Fredoka';X.textAlign='center';X.fillText('A+',cx-w/2-19,by-10);sparkle(cx,by,t)}},
 tower(cx,by,lv,t){const h=lv===1?170:lv===2?210:236,w=lv===1?70:84,col=lv===3?'#9FD3F0':'#B8C4E0';shadowE(cx,by,w/2+16);
  box(cx-w/2,by-h,w,h,col,4);if(lv>=2)box(cx-w/2-22,by-90,22,90,'#A6B3D2',3);
  for(let y=by-h+16;y<by-30;y+=30){win(cx-w/2+10,y,18,18);win(cx+w/2-28,y,18,18)}door(cx-10,by-30,20,30,'#4A5878');
  X.beginPath();X.moveTo(cx,by-h);X.lineTo(cx,by-h-34);X.lineWidth=4;X.strokeStyle=OL;X.stroke();
  const on=(t>>4)%2;circ(cx,by-h-36,6,on?'#FF5A5A':'#8A2E2E');if(on&&NIGHT)light(cx,by-h-36,30);if(lv===3){box(cx-w/2-4,by-h-6,w+8,10,GOLD,3);sparkle(cx,by-40,t)}},
 castle(cx,by,lv,t){const w=170;shadowE(cx,by,w/2+8);
  if(lv>=2){box(cx-34,by-150,68,110,'#BDB6AA',3);for(let i=0;i<4;i++)box(cx-34+i*20,by-162,12,14,'#BDB6AA',2)}
  box(cx-w/2,by-70,w,70,'#CFC8BC',3);for(let i=0;i<8;i++)box(cx-w/2+i*22,by-82,13,14,'#CFC8BC',2);
  [cx-w/2,cx+w/2].forEach(x=>{box(x-20,by-112,40,112,'#BDB6AA',3);roofTri(x,by-110,52,42,lv===3?GOLD:'#7B5BC4');if(lv>=2)flag(x,by-152,'#E05A47',t)});
  door(cx-20,by-50,40,50,'#6B4A2B');win(cx-60,by-52,14,20);win(cx+46,by-52,14,20);if(lv>=2)win(cx-10,by-130,20,26);if(lv===3)sparkle(cx,by,t)},
 stadium(cx,by,lv,t){shadowE(cx,by-6,96);ell(cx,by-56,96,56,lv===3?'#E7E1D6':'#D8D2C8');
  for(let i=0;i<(lv>=2?3:2);i++)ell(cx,by-58,84-i*8,48-i*6,['#E05A47','#2D8FC9','#FFC93C'][i]);ell(cx,by-58,60,30,'#5DBB4A');
  X.strokeStyle='#fff';X.lineWidth=2;X.beginPath();X.moveTo(cx,by-88);X.lineTo(cx,by-28);X.stroke();X.beginPath();X.arc(cx,by-58,9,0,7);X.stroke();
  const n=lv===1?2:4;for(let i=0;i<n;i++){const x=cx+(i%2?84:-84),y=by-(i<2?40:84);X.beginPath();X.moveTo(x,y);X.lineTo(x,y-56);X.lineWidth=4;X.strokeStyle=OL;X.stroke();box(x-12,y-66,24,12,NIGHT?'#FFF6B0':'#EEE',3);if(NIGHT)light(x,y-60,60)}
  if(lv===3){X.beginPath();X.ellipse(cx,by-60,98,58,0,Math.PI*1.05,Math.PI*1.95);X.lineWidth=9;X.strokeStyle=GOLD;X.stroke()}},
 wheel(cx,by,lv,t){const r=lv===1?62:lv===2?76:82,cy=by-r-24,a0=t/90;shadowE(cx,by,70);
  X.beginPath();X.moveTo(cx-44,by);X.lineTo(cx,cy);X.lineTo(cx+44,by);X.lineWidth=7;X.strokeStyle=lv===3?GOLD:'#7A8BA8';X.stroke();
  X.beginPath();X.arc(cx,cy,r,0,7);X.lineWidth=6;X.strokeStyle=lv===3?GOLD:'#E05A47';X.stroke();
  const n=lv===1?6:8;for(let i=0;i<n;i++){const a=a0+i/n*Math.PI*2;X.beginPath();X.moveTo(cx,cy);X.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);X.lineWidth=2;X.strokeStyle=OL;X.stroke()}
  for(let i=0;i<n;i++){const a=a0+i/n*Math.PI*2;box(cx+Math.cos(a)*r-10,cy+Math.sin(a)*r-6,20,18,['#2D8FC9','#FFC93C','#2DBE6C','#A78BFA'][i%4],4);if(NIGHT&&lv>=2)light(cx+Math.cos(a)*r,cy+Math.sin(a)*r,22)}
  circ(cx,cy,9,'#FFC93C');box(cx-30,by-12,60,12,'#CFC3AA',3)},
 rocket(cx,by,lv,t){shadowE(cx,by,80);box(cx-70,by-18,140,18,'#9AA3B5',4);
  if(lv>=2){box(cx+38,by-176,14,158,'#C8553D',2);for(let y=by-170;y<by-20;y+=22){X.beginPath();X.moveTo(cx+38,y);X.lineTo(cx+52,y+22);X.lineWidth=2;X.strokeStyle=OL;X.stroke()}box(cx+8,by-150,32,8,'#C8553D',2)}
  const lift=lv===3?Math.sin(t/14)*4-10:0,b=by-20+lift;
  if(lv===3){X.fillStyle='#FFB13B';X.beginPath();X.moveTo(cx-12,b);X.quadraticCurveTo(cx,b+40+Math.sin(t/2)*8,cx+12,b);X.fill();X.fillStyle='#FFF07A';X.beginPath();X.moveTo(cx-6,b);X.quadraticCurveTo(cx,b+22,cx+6,b);X.fill()}
  poly([[cx-20,b-30],[cx-40,b],[cx-20,b-6]],'#E05A47');poly([[cx+20,b-30],[cx+40,b],[cx+20,b-6]],'#E05A47');
  X.beginPath();X.moveTo(cx-20,b);X.lineTo(cx-20,b-120);X.quadraticCurveTo(cx,b-176,cx+20,b-120);X.lineTo(cx+20,b);X.closePath();shape('#F4F4F4');
  X.beginPath();X.moveTo(cx-17,b-128);X.quadraticCurveTo(cx,b-174,cx+17,b-128);X.closePath();shape('#E05A47');circ(cx,b-92,11,NIGHT?'#FFD966':'#7FD0F5');if(lv===3)sparkle(cx,by,t)}};
function drawBuilding(id,lv,cx,by,t,sc){X.save();X.translate(cx,by);if(sc)X.scale(sc,sc);if(!(CITYART.includes(id+lv)&&spr('c_'+id+lv,0,6,220))){const f=DRAW[id];if(f)f(0,0,lv,t)}X.restore()}
const PREV={};function preview(id,lv){const k=id+lv;if(PREV[k])return PREV[k];const c=document.createElement('canvas');c.width=240;c.height=260;const keep=X,keepN=NIGHT,keepL=LIGHTS;X=c.getContext('2d');NIGHT=false;LIGHTS=[];
 try{drawBuilding(id,lv,120,246,40)}catch(e){}X=keep;NIGHT=keepN;LIGHTS=keepL;let u='';try{u=c.toDataURL()}catch(e){}if(['tree1','tree2','tree3','flowers'].every(q=>IMG[q]&&IMG[q].complete&&IMG[q].naturalWidth))PREV[k]=u;return u}
function drawPlot(p,sx,sy){const d=DIST[p.d],cx=sx+96,by=sy+184,op=open(d);
 if(!p.lv){X.fillStyle=op?'#D9B98A':'#9DBF8A';X.beginPath();X.roundRect(sx+10,sy+30,172,150,10);X.fill();
  if(op){X.strokeStyle='#A8875A';X.lineWidth=3;X.setLineDash([10,8]);X.stroke();X.setLineDash([]);
   [[sx+14,sy+34],[sx+178,sy+34],[sx+14,sy+176],[sx+178,sy+176]].forEach(([x,y])=>box(x-4,y-14,8,16,'#A0663A',2));
   const glow=near===p&&!G.pause;if(glow){X.fillStyle='rgba(255,215,80,'+(.25+Math.sin(G.t/8)*.12)+')';X.beginPath();X.roundRect(sx+6,sy+26,180,158,14);X.fill()}
   box(cx-4,by-74,8,48,'#8B5A2B',2);box(cx-40,by-104,80,36,'#F4E3B5',6);X.fillStyle='#5A3D00';X.font='700 15px Fredoka';X.textAlign='center';X.fillText('BUILD',cx,by-89);X.fillText('HERE',cx,by-74)}
  else{spr('flowers',cx-40,by-40,34);spr('rock',cx+40,by-50,40)}return}
 const a=p.anim;if(a<1){X.save();X.beginPath();X.rect(sx-80,by-320*a-10,360,320*a+30);X.clip();drawBuilding(p.id,p.lv,cx,by,G.t,1.2);X.restore();
  X.strokeStyle='#C98A2E';X.lineWidth=4;const top=by-Math.max(60,300*a);for(let x=sx+16;x<=sx+176;x+=40){X.beginPath();X.moveTo(x,by);X.lineTo(x,top);X.stroke()}for(let y=by-30;y>top;y-=34){X.beginPath();X.moveTo(sx+16,y);X.lineTo(sx+176,y);X.stroke()}
  X.beginPath();X.moveTo(sx+190,by);X.lineTo(sx+190,by-250);X.lineTo(sx+60,by-250);X.lineWidth=6;X.strokeStyle='#F2B134';X.stroke();X.beginPath();X.moveTo(sx+100,by-250);X.lineTo(sx+100,by-250+60+Math.sin(G.t/10)*10);X.lineWidth=2;X.strokeStyle=OL;X.stroke();return}
 drawBuilding(p.id,p.lv,cx,by,G.t,1.2);
 if(near===p&&!G.pause){X.font='700 20px Fredoka';X.textAlign='center';X.fillStyle='#FFE08A';X.strokeStyle='rgba(0,0,0,.55)';X.lineWidth=5;const s='⭐'.repeat(p.lv)+'☆'.repeat(3-p.lv);X.strokeText(s,cx,by+18);X.fillText(s,cx,by+18)}}
function drawLamp(sx,sy){box(sx-3,sy-60,6,60,'#3A3A48',2);box(sx-9,sy-74,18,16,NIGHT?'#FFE58A':'#E8E8E8',4);if(NIGHT)light(sx,sy-66,70)}
function drawFountainBig(sx,sy){const cx=sx+64,cy=sy+70;ell(cx,cy+20,66,34,'#D9CDB5');ell(cx,cy+16,54,26,'#6EC6EE');box(cx-8,cy-40,16,56,'#C9BEA6',3);circ(cx,cy-46,12,GOLD);
 X.strokeStyle='rgba(255,255,255,.9)';X.lineWidth=3;for(let i=0;i<6;i++){const a=i/6*Math.PI*2+G.t/30;X.beginPath();X.moveTo(cx,cy-40);X.quadraticCurveTo(cx+Math.cos(a)*24,cy-60,cx+Math.cos(a)*40,cy+16+Math.sin(a)*8);X.stroke()}
 box(cx-70,cy-120,140,30,'#F4E3B5',10);X.fillStyle='#7A3E1A';X.font='700 22px Fredoka';X.textAlign='center';X.fillText('🏙️ MATH CITY',cx,cy-98)}
function drawSign(d){const p=signPos(d),sx=p.x-G.cam.x,sy=p.y-G.cam.y;box(sx-4,sy-50,8,50,'#8B5A2B',2);box(sx-46,sy-88,92,42,'#F4E3B5',6);X.fillStyle='#7A3E1A';X.font='700 15px Fredoka';X.textAlign='center';X.fillText('🔒 '+d.n.split(' ')[0],sx,sy-70);X.fillText('Closed',sx,sy-53)}

function draw(){LIGHTS=[];const cx=G.cam.x,cy=G.cam.y;X.clearRect(0,0,W,H);const P=pats();
 X.save();X.translate(-cx,-cy);X.fillStyle=P?P.grass:'#7BC96F';X.fillRect(cx,cy,W,H);X.restore();
 const x0=Math.max(0,Math.floor(cx/T)-1),y0=Math.max(0,Math.floor(cy/T)-1),x1=Math.min(MW-1,x0+W/T+2),y1=Math.min(MH-1,y0+H/T+3);
 // district ground tints
 DIST.forEach(d=>{X.fillStyle=open(d)?'rgba(255,255,255,.08)':'rgba(40,60,30,.18)';X.fillRect(d.x0*T-cx,d.y0*T-cy,(d.x1-d.x0+1)*T,(d.y1-d.y0+1)*T)});
 for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const v=M[y][x],sx=x*T-cx,sy=y*T-cy;
  if(v===3||v===4){X.save();X.translate(-cx,-cy);X.fillStyle=P?P.path:'#E8C98A';X.fillRect(x*T,y*T,T,T);X.restore();if(v===4){X.strokeStyle='rgba(120,90,50,.25)';X.lineWidth=2;X.strokeRect(sx+4,sy+4,T-8,T-8)}}
  if(v===2||v===8){X.save();X.translate(-cx,-cy);X.fillStyle=P?P.water:'#4FA9E0';X.fillRect(x*T,y*T,T,T);X.restore();if(v===2){X.strokeStyle='rgba(255,255,255,.4)';X.lineWidth=3;const o=(G.t/3+x*17+y*31)%T;X.beginPath();X.moveTo(sx+10,sy+o);X.quadraticCurveTo(sx+26,sy+o-5,sx+42,sy+o);X.stroke()}}
  if(v===8){box(sx,sy+10,T,T-20,'#B9874E',2);for(let k=1;k<4;k++){X.beginPath();X.moveTo(sx+k*16,sy+12);X.lineTo(sx+k*16,sy+T-12);X.lineWidth=2;X.strokeStyle='#7A5530';X.stroke()}}
  if(v===7){X.fillStyle='#F2DFA7';X.fillRect(sx,sy,T,T)}
  if(v===6)spr('flowers',sx+32,sy+56,38)}
 // boats in the harbour
 [[41.5,17],[41.2,22.3]].forEach(([bx,byy],i)=>{const sx=bx*T-cx,sy=byy*T-cy+Math.sin(G.t/20+i)*3;poly([[sx-34,sy],[sx+34,sy],[sx+24,sy+18],[sx-24,sy+18]],i?'#C8553D':'#2D8FC9');X.beginPath();X.moveTo(sx,sy);X.lineTo(sx,sy-50);X.lineWidth=3;X.strokeStyle=OL;X.stroke();poly([[sx+2,sy-48],[sx+30,sy-8],[sx+2,sy-8]],'#fff')});
 // things drawn row by row, so nearer things overlap further ones
 for(let y=y0;y<=y1;y++){for(let x=x0;x<=x1;x++){const v=M[y][x],sx=x*T-cx,sy=y*T-cy;
   if(v===1){X.fillStyle='rgba(0,0,0,.2)';X.beginPath();X.ellipse(sx+32,sy+60,26,8,0,0,7);X.fill();const h=((x*73856093)^(y*19349663))>>>0;spr(['tree1','tree2','tree3'][h%3],sx+32,sy+66,h%3===1?112:100)}
   if(v===5){box(sx+2,sy+26,T-4,10,'#C9935B',2);box(sx+2,sy+44,T-4,10,'#C9935B',2);box(sx+6,sy+14,8,46,'#A0663A',2);box(sx+T-14,sy+14,8,46,'#A0663A',2)}
   if(v===3&&y===13&&x%6===0)drawLamp(sx+32,sy+8);if(v===3&&x===21&&y%5===0&&(y<12||y>15))drawLamp(sx+6,sy+40)}
  if(y===12)drawFountainBig(21*T-cx,12*T-cy);
  PLOTS.forEach(p=>{if(p.y+2===y)drawPlot(p,p.x*T-cx,p.y*T-cy)});
  DIST.forEach(d=>{if(!open(d)&&Math.floor(signPos(d).y/T)===y)drawSign(d)});
  if(Math.floor(G.py/T)===y)drawHero()}
 // particles
 G.parts.forEach(p=>{const sx=p.x-cx,sy=p.y-cy;X.globalAlpha=Math.min(1,p.l/30);if(p.txt){X.font='700 36px Fredoka';X.textAlign='center';X.strokeStyle='rgba(0,0,0,.55)';X.lineWidth=6;X.strokeText(p.txt,sx,sy);X.fillStyle=p.c;X.fillText(p.txt,sx,sy)}else{X.fillStyle=p.c;X.beginPath();X.arc(sx,sy,p.r||5,0,7);X.fill()}X.globalAlpha=1});
 // night: darken, then add the lights
 if(NIGHT){X.fillStyle='rgba(12,20,60,.55)';X.fillRect(0,0,W,H);X.save();X.globalCompositeOperation='lighter';
  LIGHTS.forEach(([x,y,r])=>{const g=X.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'rgba(255,214,110,.55)');g.addColorStop(1,'rgba(255,214,110,0)');X.fillStyle=g;X.fillRect(x-r,y-r,r*2,r*2)});X.restore();
  for(let i=0;i<30;i++){const x=(i*97+cx*.05)%W,y=(i*53)%120;X.fillStyle='rgba(255,255,255,'+(.4+Math.sin(G.t/20+i)*.3)+')';X.fillRect(x,y,2,2)}}
 if(near&&near.sign&&!G.pause){const f=near.sign?signPos(near.sign):front(near),nx=f.x-cx,ny=f.y-cy+(near.sign?-110:72);const t=near.sign?'Space: read sign':!open(DIST[near.d])?'Closed':!near.lv?'Space: build':near.lv<3?'Space: upgrade':'Space: visit';
  X.font='700 20px Fredoka';const w=X.measureText(t).width+36;box(nx-w/2,ny-28,w,36,'rgba(255,255,255,.95)',18);X.fillStyle='#5A3D00';X.textAlign='center';X.fillText(t,nx,ny-4)}
 drawMini()}
function drawHero(){const sx=G.px-G.cam.x,sy=G.py-G.cam.y,b=G.walk?Math.abs(Math.sin(G.walk/5))*5:0;
 X.fillStyle='rgba(0,0,0,.22)';X.beginPath();X.ellipse(sx,sy+22,20,7,0,0,7);X.fill();
 const k=G.dir==='u'?'heroU':G.dir==='d'?'heroD':'heroR';X.save();X.translate(sx,sy+24-b);if(G.walk)X.rotate(Math.sin(G.walk/5)*.06);
 if(!spr(k,0,0,96,G.dir==='l')){X.fillStyle='#8B5CF6';X.fillRect(-14,-60,28,60)}X.restore()}
function drawMini(){const m=$('fg-mini').getContext('2d'),w=240,h=150,sx=w/MW,sy=h/MH;m.fillStyle='#CFE8B8';m.fillRect(0,0,w,h);
 for(let y=0;y<MH;y++)for(let x=0;x<MW;x++){const v=M[y][x];if(v===1){m.fillStyle='#5E9E4A';m.fillRect(x*sx,y*sy,sx+.5,sy+.5)}else if(v===2){m.fillStyle='#5BB8E8';m.fillRect(x*sx,y*sy,sx+.5,sy+.5)}else if(v===3||v===4||v===8){m.fillStyle='#E8C98A';m.fillRect(x*sx,y*sy,sx+.5,sy+.5)}}
 DIST.forEach(d=>{if(!open(d)){m.fillStyle='rgba(60,60,60,.35)';m.fillRect(d.x0*sx,d.y0*sy,(d.x1-d.x0+1)*sx,(d.y1-d.y0+1)*sy)}});
 PLOTS.forEach(p=>{m.fillStyle=p.lv?['#E05A47','#2D8FC9','#F2C14E'][p.lv-1]:open(DIST[p.d])?'#B98B4A':'#8A9A80';m.fillRect(p.x*sx,p.y*sy,3*sx,3*sy)});
 m.fillStyle='#8B5CF6';m.strokeStyle='#fff';m.lineWidth=2;m.beginPath();m.arc(G.px/T*sx,G.py/T*sy,4,0,7);m.fill();m.stroke()}

/* ---------- start and stop ---------- */
let ON=false,DONE=null,WRAP=null;
function intro(){G.pause=true;const L=cityLevel(),nm=live()&&ME.first_name?esc0(ME.first_name):'builder',m=money();const built=PLOTS.filter(p=>p.lv).length;
 const fb=PLOTS.find(p=>p.lv);card(`<img src="${preview(fb?fb.id:'house',fb?fb.lv:1)}" style="height:7em" alt=""><h2>🏙️ ${built?`Welcome back to your ${esc0(L.n)}, ${nm}!`:`Welcome to Math City, ${nm}!`}</h2>
 <p>${built?`You have ${built} building${built>1?'s':''} and ${L.p} city points.`:'This land is yours. Walk to an empty plot and build your city with maths!'}</p>
 <p class="cg-sub">You have 🪙 ${m.c} and 💎 ${m.g}. Every building needs 3 maths challenges. Upgrades need 2.</p>
 <p style="font-size:1em;opacity:.8">Computer: arrow keys to walk · Space to build · N for night &nbsp;|&nbsp; iPad: use the buttons</p><button class="fg-go" id="fg-ok">Start building 🔨</button>`);
 $('fg-ok').onclick=close;say(built?'Welcome back to your '+L.n+'!':'Welcome to Math City! Walk to an empty plot and build your city with maths.',built?'cg-back-'+L.n.replace(/ /g,'').toLowerCase():'cg-welcome')}
let last=0,acc=0;function loop(ts){if(!ON)return;acc+=Math.min(60,ts-last);last=ts;while(acc>=16.67){update();acc-=16.67}draw();requestAnimationFrame(loop)}
function stop(go,view){ON=false;try{speechSynthesis.cancel()}catch(e){}K.u=K.d=K.l=K.r=0;if(WRAP){WRAP.remove();WRAP=null}document.body.classList.remove('fgon');
 if(go){const d=DONE;DONE=null;if(d)d(view)}}
window.CG={start(z,done){if(ON)return;DONE=done;
 if(!document.getElementById('cgcss')){const s=document.createElement('style');s.id='cgcss';s.textContent=CSS;document.head.appendChild(s)}
 WRAP=document.createElement('div');WRAP.id='fgw';WRAP.innerHTML=HTML;document.body.appendChild(WRAP);document.body.classList.add('fgon');
 cv=$('fg-c');X=cv.getContext('2d');PAT=null;HUDK='';loadImgs();
 grade=Math.max(0,Math.min(5,live()?(+ME.grade||0):2));
 reset();loadCity();build();bindUI();$('fg-mapbtn').textContent=NIGHT?'☀️ Day':'🌙 Night';$('fg-mapbtn').classList.toggle('cg-on',NIGHT);
 ON=true;lastD=-1;hud();goal();intro();last=performance.now();acc=0;requestAnimationFrame(loop)},
 stop(){stop(false)},get on(){return ON},_t:{g:()=>G,plots:()=>PLOTS,go:(x,y)=>{G.px=x*T+32;G.py=y*T+32},use:()=>interact(),q:()=>makeQ(),prev:(i,l)=>preview(i,l),setGrade:g=>grade=g,night}};
})();
