/* Number Forest Adventure for Maths Quest. Loaded by adventures.js when a child opens Number Forest. */
(function(){
const FGCSS="#fgw #fg-wrap{position:fixed;inset:0;display:flex;align-items:center;justify-content:center}\n#fgw #fg-stage{position:relative;width:min(100vw,calc(100vh*16/9));aspect-ratio:16/9;font-size:min(1.6vw,2.85vh)}\n#fgw canvas{width:100%;height:100%;display:block;border-radius:14px}\n#fgw .fg-hud{position:absolute;top:2%;left:2%;display:flex;gap:.6em;align-items:center;pointer-events:none}\n#fgw .fg-pill{background:rgba(255,255,255,.93);border-radius:999px;padding:.35em .9em;font-weight:700;font-size:1.25em;color:#3B2A00;box-shadow:0 3px 0 rgba(0,0,0,.2)}\n#fgw .fg-goal{position:absolute;top:10.5%;left:50%;transform:translateX(-50%);background:rgba(20,60,35,.88);color:#FFE08A;border-radius:999px;padding:.35em 1.1em;font-weight:600;font-size:1.15em;white-space:nowrap;box-shadow:0 3px 0 rgba(0,0,0,.25)}\n#fgw #fg-mapbtn{position:absolute;top:2%;right:2%;border:0;border-radius:18px;background:#F4E3B5;border:3px solid #B98B4A;color:#5A3D00;font-family:inherit;font-weight:700;font-size:1.2em;padding:.3em .8em;box-shadow:0 4px 0 #8A6230;cursor:pointer}\n#fgw #fg-mini{position:absolute;top:11%;right:2%;width:20%;height:auto!important;border-radius:10px;border:3px solid #B98B4A;background:#F4E3B5;box-shadow:0 4px 10px rgba(0,0,0,.35)}\n#fgw .fg-pad{position:absolute;left:2%;bottom:3%;width:19%;aspect-ratio:1;display:grid;grid-template:repeat(3,1fr)/repeat(3,1fr);gap:4%}\n#fgw .fg-pad button{border:0;border-radius:22%;background:rgba(255,255,255,.55);font-size:2.2em;color:#1E5B3A;font-weight:700;box-shadow:0 4px 0 rgba(0,0,0,.25);touch-action:none}\n#fgw .fg-pad button.fg-on{background:rgba(255,224,138,.9);transform:translateY(2px)}\n#fgw #fg-act{position:absolute;right:3%;bottom:5%;width:13%;aspect-ratio:1;border-radius:50%;border:0;background:rgba(255,201,60,.9);color:#5A3D00;font-family:inherit;font-weight:700;font-size:1.4em;box-shadow:0 5px 0 #B7791F;display:none;touch-action:none}\n#fgw .fg-ov{position:absolute;inset:0;border-radius:14px;display:flex;align-items:center;justify-content:center;background:rgba(5,25,14,.72)}\n#fgw .fg-ov[hidden]{display:none}\n#fgw .fg-card{background:#FFFBEA;border:5px solid #FFC93C;border-radius:26px;box-shadow:0 10px 0 #D9A21A,0 20px 40px rgba(0,0,0,.4);padding:1.4em 1.8em;text-align:center;max-width:72%;color:#16323A;animation:fgpop .45s cubic-bezier(.2,1.6,.4,1)}\n@keyframes fgpop{from{transform:scale(.3);opacity:0}}\n#fgw .fg-card .fg-big{font-size:4em;line-height:1;animation:fgwob 1s infinite alternate}\n#fgw .fg-card .fg-big img{display:block;margin:0 auto;height:1.4em!important}\n#fgw .fg-card .fg-owlrow{display:flex;align-items:center;gap:.8em;text-align:left}\n#fgw .fg-card .fg-owlrow img{flex:none}\n@keyframes fgwob{to{transform:rotate(6deg) scale(1.06)}}\n#fgw .fg-card h2{margin:.2em 0;font-size:1.9em;color:#1E5B3A}\n#fgw .fg-card .fg-q{font-size:2.1em;font-weight:600;margin:.4em 0 .6em;line-height:1.2}\n#fgw .fg-ans{display:grid;grid-template-columns:repeat(2,1fr);gap:.6em}\n#fgw .fg-ans button,#fgw .fg-card .fg-go{font-family:inherit;font-weight:700;font-size:1.7em;border:0;border-radius:18px;padding:.4em .8em;background:#FFC93C;color:#5A3D00;box-shadow:0 5px 0 #D9A21A;cursor:pointer}\n#fgw .fg-ans button.fg-bad{background:#D6D0C4;color:#8B867A;box-shadow:0 5px 0 #A9A396;animation:fgshake .4s}\n#fgw .fg-ans button.fg-good{background:#2DBE6C;color:#fff;box-shadow:0 5px 0 #1E8A4C}\n@keyframes fgshake{25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}\n#fgw .fg-card .fg-say{border:0;background:#E0F4FF;border-radius:99px;font-size:1.2em;padding:.2em .7em;cursor:pointer;font-family:inherit;font-weight:700;color:#0B5C7A}\n#fgw .fg-card .fg-fb{min-height:1.4em;font-weight:600;font-size:1.2em;margin-top:.5em;color:#B54708}\n#fgw .fg-card p{font-size:1.35em;margin:.4em 0}\n#fgw .fg-parch{max-height:96%;display:flex;flex-direction:column;align-items:center;background:var(--paper) center/100% 100% no-repeat;filter:drop-shadow(0 14px 30px rgba(0,0,0,.5));padding:3.5% 9% 6% 6%;text-align:center;color:#5A3D00;max-width:86%;animation:fgunroll .7s ease-out}\n@keyframes fgunroll{from{transform:scaleY(.05);opacity:.3}}\n#fgw .fg-parch h1{margin:0 0 .2em;font-size:2.4em;color:#7A3E1A}\n#fgw .fg-parch p{margin:.2em 0;font-size:1.3em}\n#fgw .fg-parch canvas{width:100%;height:auto;min-height:0;flex:1 1 auto;object-fit:contain;border-radius:10px;border:2px dashed #B98B4A;margin:.4em 0}\n#fgw .fg-parch .fg-row{display:flex;gap:.7em;justify-content:center;align-items:center;flex-wrap:wrap}\n#fgw .fg-parch select,#fgw .fg-parch .fg-go{font-family:inherit;font-size:1.5em;border-radius:999px;border:0;padding:.3em 1.1em;font-weight:700}\n#fgw .fg-parch .fg-go{background:#2DBE6C;color:#fff;box-shadow:0 5px 0 #1E8A4C;cursor:pointer}\n#fgw .fg-toast{position:absolute;left:50%;top:22%;transform:translateX(-50%);background:rgba(0,0,0,.65);color:#fff;font-weight:600;font-size:1.4em;padding:.4em 1.2em;border-radius:999px;pointer-events:none;white-space:nowrap;transition:opacity .4s}\n#fgw{position:fixed;inset:0;z-index:60;background:#0B2216;font-family:Fredoka,'Trebuchet MS',sans-serif;overflow:hidden;touch-action:none;user-select:none;-webkit-user-select:none}\n#fgw *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}\n#fgw button{transition:none;line-height:1.2}\n#fgw .fg-pad button{padding:0}\n#fgw #fg-exit{position:absolute;top:2%;right:13%;border:0;border-radius:18px;background:rgba(255,255,255,.9);color:#1E5B3A;font-family:inherit;font-weight:700;font-size:1.2em;padding:.3em .8em;box-shadow:0 4px 0 rgba(0,0,0,.25);cursor:pointer}\n#fgw .fg-parch .fg-row .fg-sub{background:#fff;color:#1E5B3A;box-shadow:0 5px 0 #B98B4A}\nbody.fgon{overflow:hidden}\nbody.fgon .party,body.fgon .burst{z-index:80}body.fgon .cheer{z-index:85}\nbody.fgon .advov{z-index:75}\nbody.fgon .advcard .se img{height:96px;display:block;margin:0 auto}\n";
const FGHTML="<div id=\"fg-wrap\"><div id=\"fg-stage\">\n <canvas id=\"fg-c\" width=\"1280\" height=\"720\"></canvas>\n <div class=\"fg-hud\"><span class=\"fg-pill\" id=\"fg-hearts\">\u2764\ufe0f\u2764\ufe0f\u2764\ufe0f</span><span class=\"fg-pill\" id=\"fg-coins\">\ud83e\ude99 0</span><span class=\"fg-pill\" id=\"fg-gems\">\ud83d\udc8e 0</span><span class=\"fg-pill\" id=\"fg-keys\">\ud83d\udddd\ufe0f 0/4</span></div>\n <div class=\"fg-goal\" id=\"fg-goal\"></div>\n <button id=\"fg-exit\">\u2715 Exit</button>\n <button id=\"fg-mapbtn\">\ud83d\uddfa\ufe0f Map</button>\n <canvas id=\"fg-mini\" width=\"240\" height=\"150\"></canvas>\n <div class=\"fg-pad\"><span></span><button data-d=\"u\">\u25b2</button><span></span><button data-d=\"l\">\u25c0</button><span></span><button data-d=\"r\">\u25b6</button><span></span><button data-d=\"d\">\u25bc</button><span></span></div>\n <button id=\"fg-act\">Open</button>\n <div class=\"fg-toast\" id=\"fg-toast\" style=\"opacity:0\"></div>\n <div class=\"fg-ov\" id=\"fg-ov\"></div>\n</div></div>";

/* ======================= NUMBER FOREST ADVENTURE (test version) =======================
   Explore a forest seen from above. A treasure map shows where the golden boxes are.
   Each golden box holds a maths question: answer it to get a key and open the next gate.
   Surprise boxes hold a maths tip, a maths fact, bonus coins, a gem or an extra heart.
   Drawings are placeholders, to be replaced by the designed pictures.                       */
let cv,X;const W=1280,H=720,T=64;
const FGK=["heroD", "mush", "bridge", "mud", "thorns", "flowers", "rock", "tree3", "tree2", "tree1", "heroWin", "heroR", "heroU", "grass", "path", "water", "gate", "gateAjar", "mapPaper", "owl", "boar", "bee", "key", "stone", "surpOpen", "surp", "goldOpen", "gold", "scroll", "heroKey"];const IMGSRC={};FGK.forEach(k=>IMGSRC[k]='img/forest/'+k+'.webp?v=1');
const pic=(k,h,st='')=>`<img src="${IMGSRC[k]}" style="height:${h}em;${st}" alt="">`;
const IMG={};function loadImgs(){if(IMG.grass)return;for(const k in IMGSRC){IMG[k]=new Image();IMG[k].src=IMGSRC[k]}}
let PAT=null;function pats(){if(PAT)return PAT;if(!IMG.grass.complete||!IMG.path.complete||!IMG.water.complete)return null;PAT={};['grass','path','water'].forEach(k=>{const p=X.createPattern(IMG[k],'repeat');p.setTransform(new DOMMatrix().scale(.5));PAT[k]=p});return PAT}
function spr(k,cx,by,h,flip){const im=IMG[k];if(!im||!im.complete||!im.naturalWidth)return false;const w=im.naturalWidth*h/im.naturalHeight;X.save();X.translate(cx,by);if(flip)X.scale(-1,1);X.drawImage(im,-w/2,-h,w,h);X.restore();return true}
const $=id=>document.getElementById(id);
let grade=3;

/* ---------- random with a seed, so the forest is the same every time ---------- */
let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)];

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
   win:()=>[523,659,784,1047,784,1047,1319,1568].forEach((f,i)=>tone(f,.25,'triangle',.12,i*.12))})[k]()}catch(e){}}
function say0(t){if(!('speechSynthesis' in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t.replace(/×/g,' times ').replace(/÷/g,' divided by ').replace(/−/g,' minus ').replace(/°C/g,' degrees').replace(/\?/g,''));u.lang='en-GB';u.rate=.9;
 const v=speechSynthesis.getVoices();u.voice=v.find(x=>/kate|serena|samantha|female/i.test(x.name)&&x.lang.startsWith('en'))||v.find(x=>x.lang==='en-GB')||null;speechSynthesis.speak(u)}

/* ---------- maths: number and place value, by grade (test bank) ---------- */
const fmt=n=>n.toLocaleString('en-GB');
function opts(ans,spread,n=4){const s=new Set([ans]);let k=0;while(s.size<n&&k++<80){const v=ans+pick([-1,1])*R(1,3)*spread;if(v>=0||ans<0)s.add(v)}let i=1;while(s.size<n)s.add(ans+spread*(i++)*7);return [...s].sort(()=>Math.random()-.5)}
const QB={
 1:[()=>{const a=R(10,89),k=pick([1,10]);return[`What is ${k} more than ${a}?`,a+k,k]},()=>{const t=R(1,9),o=R(0,9);return[`${t} tens and ${o} ones make…`,t*10+o,10]},()=>{const a=R(11,99);return[`How many tens are in ${a}?`,Math.floor(a/10),1]},()=>{const a=R(5,20)*2;return[`Count in 2s: ${a-4}, ${a-2}, …`,a,2]},()=>{const a=R(20,99),k=pick([1,10]);return[`What is ${k} less than ${a}?`,a-k,k]}],
 2:[()=>{const a=R(100,880),k=pick([10,100]);return[`What is ${k} more than ${a}?`,a+k,k]},()=>{const a=R(120,899);return[`How many hundreds are in ${a}?`,Math.floor(a/100),1]},()=>{const a=R(3,12)*50;return[`Count in 50s: ${a-100}, ${a-50}, …`,a,50]},()=>{const a=R(201,989),k=pick([10,100]);return[`What is ${k} less than ${a}?`,a-k,k]},()=>{const h=R(1,9),t=R(0,9),o=R(0,9);return[`${h} hundreds, ${t} tens and ${o} ones make…`,h*100+t*10+o,10]}],
 3:[()=>{const a=R(1000,8900),k=pick([10,100,1000]);return[`What is ${fmt(k)} more than ${fmt(a)}?`,a+k,k]},()=>{const a=R(101,989);return[`Round ${a} to the nearest 10.`,Math.round(a/10)*10,10]},()=>{const a=R(3,12)*25;return[`Count in 25s: ${a-50}, ${a-25}, …`,a,25]},()=>{const th=R(1,9),h=R(1,9),t=R(1,9),o=R(1,9),d=pick([['thousands',th*1000,1000],['hundreds',h*100,100],['tens',t*10,10]]);return[`In ${fmt(th*1000+h*100+t*10+o)}, what is the value of the ${d[0]} digit?`,d[1],d[2]]},()=>{const a=R(1001,9899);return[`Round ${fmt(a)} to the nearest 100.`,Math.round(a/100)*100,100]}],
 4:[()=>{const a=R(10000,98000),k=pick([100,1000,10000]);return[`What is ${fmt(k)} more than ${fmt(a)}?`,a+k,k]},()=>{const a=R(1001,9899);return[`Round ${fmt(a)} to the nearest 100.`,Math.round(a/100)*100,100]},()=>{const a=R(-9,-1),b=R(3,9);return[`It is ${a}°C. It gets ${b}°C warmer. What is the temperature now?`,a+b,1]},()=>{const a=R(12000,98000);return[`Round ${fmt(a)} to the nearest 1,000.`,Math.round(a/1000)*1000,1000]},()=>{const a=R(2,9)*1000+R(1,9)*100;return[`What is ${fmt(a)} ÷ 100?`,a/100,1]}],
 5:[()=>{const a=R(100000,900000),k=pick([1000,10000,100000]);return[`What is ${fmt(k)} more than ${fmt(a)}?`,a+k,k]},()=>{const a=R(123000,987000);return[`Round ${fmt(a)} to the nearest 10,000.`,Math.round(a/10000)*10000,10000]},()=>{const a=R(-12,-2),b=R(4,15);return[`From ${a}°C to ${a+b}°C. How many degrees warmer?`,b,1]},()=>{const n=R(2,9);return[`What is ${n} squared (${n}²)?`,n*n,n]},()=>{const n=pick([4,6,8,9,10,12,15]);return[`Which number is a factor of ${n*7}?`,7,1]}]};
function makeQ(){const [q,a,s]=pick(QB[grade])();return{q,a,o:opts(a,s)}}
const TIPS={1:['To find 10 more, the tens digit goes up by 1!','Counting in 2s: 2, 4, 6, 8, 10… these are even numbers.','A number line helps you count on and back.'],
 2:['To find 100 more, the hundreds digit goes up by 1.','In 345, the 3 means 3 hundreds: 300!','Counting in 50s: 50, 100, 150, 200… it goes up by half a hundred.'],
 3:['Rounding: look at the digit to the right. 5 or more? Round up!','In 4,582 the 4 is worth 4,000.','Roman numerals: I = 1, V = 5, X = 10, L = 50, C = 100.'],
 4:['Negative numbers are below zero, like a cold winter morning: −5°C.','Rounding to the nearest 1,000? Look at the hundreds digit.','Dividing by 100 moves every digit two places to the right.'],
 5:['A square number is a number times itself: 6 × 6 = 36.','A prime number has exactly two factors: 1 and itself.','One million has six zeros: 1,000,000!']};
const FACTS=['Zero is the only number that is neither positive nor negative.','The word "hundred" comes from an old word meaning 120!','A googol is 1 followed by 100 zeros.','Ancient Egyptians used a picture of a frog for 100,000!','If you count one number every second, it takes 11½ days to reach one million.','Bees build their honeycombs from hexagons. Clever bees!'];

/* ---------- build the forest ---------- */
/* tiles: 0 grass, 1 tree, 2 water, 3 path, 4 bridge, 5 rock, 6 thorns, 7 flowers, 8 mud, 9 gate (closed), 10 stone gate (final) */
const MW=60,MH=34;const M=[];const SOLID=new Set([1,2,5,9,10]);
const ZONES=[{x0:1,x1:14,name:'Sunny Meadow'},{x0:16,x1:29,name:'Whispering River'},{x0:31,x1:44,name:'Buzzing Woods'},{x0:46,x1:58,name:'Ancient Hill'}];
const GATES=[{x:15,y:8},{x:30,y:26},{x:45,y:9}];
const BOXES=[ // k: q = golden question box (gives a key), s = surprise box
 {x:5,y:5,k:'q',z:0},{x:22,y:29,k:'q',z:1},{x:41,y:4,k:'q',z:2},
 {x:11,y:29,k:'s',z:0},{x:26,y:4,k:'s',z:1},{x:35,y:30,k:'s',z:2},{x:55,y:28,k:'s',z:3},{x:2,y:18,k:'s',z:0}];
const FINAL={x:56,y:6};
function build(){seed=11;for(let y=0;y<MH;y++){M[y]=[];for(let x=0;x<MW;x++)M[y][x]=0}
 const set=(x,y,v)=>{if(x>=0&&y>=0&&x<MW&&y<MH)M[y][x]=v};
 for(let x=0;x<MW;x++){set(x,0,1);set(x,MH-1,1)}for(let y=0;y<MH;y++){set(0,y,1);set(MW-1,y,1)}
 [15,30,45].forEach(wx=>{for(let y=0;y<MH;y++){set(wx,y,1);set(wx+(y%3===0?0:0),y,1)}});
 // path through the forest (start → gates → final)
 const pts=[[3,30],[3,20],[8,12],[14,8],[15,8],[18,9],[20,14],[26,20],[29,26],[30,26],[33,24],[36,18],[40,12],[44,9],[45,9],[49,12],[53,9],[56,7]];
 for(let i=0;i<pts.length-1;i++){let [x,y]=pts[i];const [x2,y2]=pts[i+1];while(x!==x2||y!==y2){set(x,y,3);if(x!==x2)x+=Math.sign(x2-x);else y+=Math.sign(y2-y)}set(x2,y2,3)}
 // river in zone 2, with a bridge where the path crosses
 for(let y=1;y<MH-1;y++){const rx=22+Math.round(Math.sin(y/3)*1.5);for(let k=0;k<2;k++){if(M[y][rx+k]===3)set(rx+k,y,4);else set(rx+k,y,2)}}
 // little pond in zone 1 and zone 4
 for(let y=22;y<26;y++)for(let x=7;x<11;x++)set(x,y,2);
 for(let y=17;y<20;y++)for(let x=50;x<54;x++)set(x,y,2);
 // trees, rocks, flowers, thorns, mud
 for(let y=1;y<MH-1;y++)for(let x=1;x<MW-1;x++){if(M[y][x]!==0)continue;const r=rnd();
  const z=x<15?0:x<30?1:x<45?2:3;const dens=[.16,.18,.26,.2][z];
  if(r<dens)set(x,y,1);else if(r<dens+.03)set(x,y,5);else if(r<dens+.08)set(x,y,7);else if(z===2&&r<dens+.13)set(x,y,6);else if(z===1&&r<dens+.12)set(x,y,8)}
 // clear around boxes, gates, start, final
 const clear=(cx,cy,r)=>{for(let y=cy-r;y<=cy+r;y++)for(let x=cx-r;x<=cx+r;x++)if(x>0&&y>0&&x<MW-1&&y<MH-1&&![2,4,3].includes(M[y][x])&&![15,30,45].includes(x))set(x,y,0)};
 BOXES.forEach(b=>clear(b.x,b.y,1));clear(3,30,2);clear(FINAL.x,FINAL.y,2);GATES.forEach(g=>{clear(g.x-1,g.y,1);clear(g.x+1,g.y,1)});
 GATES.forEach(g=>set(g.x,g.y,9));set(FINAL.x,FINAL.y-2,10);
 // make sure every box and gate can be reached (cut a path if not)
 [[...BOXES.map(b=>[b.x,b.y])],[[FINAL.x,FINAL.y]]].flat().forEach(([tx,ty])=>{const zx=tx<15?3:tx<30?16:tx<45?31:46;const sy=tx<15?30:tx<30?8:tx<45?26:9;
   let x=zx,y=sy;while(x!==tx||y!==ty){if(M[y][x]===1||M[y][x]===5||M[y][x]===6)set(x,y,0);if(Math.abs(tx-x)>Math.abs(ty-y))x+=Math.sign(tx-x);else y+=Math.sign(ty-y)}});
 // fix any river crossings needed for boxes: a stepping stone bridge
 for(let y=1;y<MH-1;y++)for(let x=1;x<MW-1;x++)if(M[y][x]===0&&M[y][x-1]===2&&M[y][x+1]===2)set(x,y,4);
}
build();

/* ---------- game state ---------- */
let G;function reset(){G={px:3*T+32,py:30*T+32,dir:'u',walk:0,hearts:3,coins:0,gems:0,keys:0,inv:0,boxes:BOXES.map(b=>({...b,open:false,anim:0})),
 gates:GATES.map(g=>({...g,open:false,anim:0})),final:{open:false,step:0,anim:0},seen:Array.from({length:MH},()=>Array(MW).fill(false)),
 cam:{x:0,y:0},t:0,parts:[],pause:true,first:0,asked:0,zone:0,
 critters:[{k:'boar',x:20*T,y:20*T,vx:2.2,vy:0,min:17*T,max:29*T},{k:'boar',x:24*T,y:11*T,vx:0,vy:2,min:6*T,max:16*T},
  {k:'bee',x:33*T,y:12*T,a:0,cx:34*T,cy:13*T,r:110},{k:'bee',x:38*T,y:22*T,a:2,cx:38*T,cy:22*T,r:130},{k:'bee',x:42*T,y:16*T,a:4,cx:41*T,cy:16*T,r:100},{k:'bee',x:35*T,y:6*T,a:1,cx:36*T,cy:7*T,r:90}]};
 reveal();hud();goal()}
let HUDK='';function hud(){const hk=[G.hearts,G.coins,G.gems,G.keys].join();if(hk===HUDK)return;HUDK=hk;$('fg-hearts').textContent='❤️'.repeat(G.hearts)+'🤍'.repeat(Math.max(0,3-G.hearts));$('fg-coins').textContent='🪙 '+G.coins;$('fg-gems').textContent='💎 '+G.gems;$('fg-keys').innerHTML=pic('key',1.1,'vertical-align:-.2em')+' '+G.keys+'/4'}
function nextTarget(){const q=G.boxes.find(b=>b.k==='q'&&!b.open);if(q)return{x:q.x,y:q.y,t:'box'};const k=G.gates.find(g=>!g.open);if(k)return{x:k.x,y:k.y,t:'gate'};return{x:FINAL.x,y:FINAL.y-2,t:'final'}}
function goal(){const n=G.boxes.filter(b=>b.k==='q'&&b.open).length;const tg=nextTarget();
 $('fg-goal').textContent=tg.t==='final'?'📍 Go to the Ancient Stone Gate! 🏛':`📍 ${ZONES[Math.min(n,3)].name}: find the golden box ✖`}
function toast(t){const e=$('fg-toast');e.textContent=t;e.style.opacity=1;clearTimeout(toast.k);toast.k=setTimeout(()=>e.style.opacity=0,2200)}
function reveal(){const cx=Math.floor(G.px/T),cy=Math.floor(G.py/T);for(let y=cy-5;y<=cy+5;y++)for(let x=cx-6;x<=cx+6;x++)if(x>=0&&y>=0&&x<MW&&y<MH&&(x-cx)**2+(y-cy)**2<=30)G.seen[y][x]=true}

/* ---------- input: keys and on-screen pad ---------- */
const K={u:0,d:0,l:0,r:0};
const KM={ArrowUp:'u',w:'u',W:'u',ArrowDown:'d',s:'d',S:'d',ArrowLeft:'l',a:'l',A:'l',ArrowRight:'r',d:'r',D:'r'};
addEventListener('keydown',e=>{if(!ON||busy(e))return;if(KM[e.key]){K[KM[e.key]]=1;e.preventDefault()}if((e.key===' '||e.key==='Enter')&&near){e.preventDefault();interact()}if(e.key==='m'||e.key==='M')showMap(false)});
addEventListener('keyup',e=>{if(!ON)return;if(KM[e.key])K[KM[e.key]]=0});
function bindUI(){document.querySelectorAll('#fgw .fg-pad button').forEach(b=>{const d=b.dataset.d;const on=e=>{e.preventDefault();K[d]=1;b.classList.add('fg-on')},off=e=>{e.preventDefault();K[d]=0;b.classList.remove('fg-on')};
 b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);b.addEventListener('pointerleave',off);b.addEventListener('pointercancel',off)});
$('fg-act').addEventListener('pointerdown',e=>{e.preventDefault();interact()});
$('fg-mapbtn').onclick=()=>showMap(false);$('fg-exit').onclick=()=>stop(true);}

/* ---------- movement ---------- */
const tileAt=(px,py)=>{const x=Math.floor(px/T),y=Math.floor(py/T);return (x<0||y<0||x>=MW||y>=MH)?1:M[y][x]};
const solidAt=(px,py)=>{const v=tileAt(px,py);if(v===9){const g=G.gates.find(g=>g.x===Math.floor(px/T)&&g.y===Math.floor(py/T));return !(g&&g.open)}if(v===10)return !G.final.open;
 if(G.boxes.some(b=>Math.floor(px/T)===b.x&&Math.floor(py/T)===b.y))return true;return SOLID.has(v)};
const hits=(x,y)=>{const r=18;return solidAt(x-r,y-r+10)||solidAt(x+r,y-r+10)||solidAt(x-r,y+r)||solidAt(x+r,y+r)};
let near=null;
function update(){G.t++;if(G.pause)return;
 let dx=(K.r-K.l),dy=(K.d-K.u);if(dx&&dy){dx*=.71;dy*=.71}
 let sp=4.2;if(tileAt(G.px,G.py)===8)sp=2;
 if(dx||dy){G.dir=Math.abs(dx)>Math.abs(dy)?(dx>0?'r':'l'):(dy>0?'d':'u');G.walk++;if(G.walk%16===0)snd('step')}else G.walk=0;
 const nx=G.px+dx*sp,ny=G.py+dy*sp;if(!hits(nx,G.py))G.px=nx;if(!hits(G.px,ny))G.py=ny;
 if(tileAt(G.px,G.py)===6&&G.inv===0){hurt('Ouch, thorns! 🌵')}
 G.critters.forEach(c=>{if(c.k==='boar'){c.x+=c.vx;c.y+=c.vy;if(c.vx&&(c.x<c.min||c.x>c.max))c.vx*=-1;if(c.vy&&(c.y<c.min||c.y>c.max))c.vy*=-1}
  else{c.a+=.025;c.x=c.cx+Math.cos(c.a)*c.r;c.y=c.cy+Math.sin(c.a*1.3)*c.r*.6}
  if(G.inv===0&&Math.hypot(c.x-G.px,c.y-G.py)<40){const ang=Math.atan2(G.py-c.y,G.px-c.x);for(let i=0;i<12;i++){const tx=G.px+Math.cos(ang)*6,ty=G.py+Math.sin(ang)*6;if(!hits(tx,ty)){G.px=tx;G.py=ty}}hurt(c.k==='bee'?'Bzzz! A bee stung you! 🐝':'The wild boar bumped you! 🐗')}});
 if(G.inv>0)G.inv--;
 reveal();
 // zone check
 const z=G.px<15*T?0:G.px<30*T?1:G.px<45*T?2:3;if(z!==G.zone){G.zone=z;toast('📍 '+ZONES[z].name);talk('zone'+z)}
 // near a box / final gate?
 near=null;G.boxes.forEach(b=>{if(!b.open&&Math.hypot(b.x*T+32-G.px,b.y*T+32-G.py)<80)near=b});
 if(!near&&!G.final.open&&G.keys>=3&&Math.hypot(FINAL.x*T+32-G.px,(FINAL.y-2)*T+32-G.py)<110)near='final';
 $('fg-act').style.display=near?'block':'none';$('fg-act').textContent=near==='final'?'Gate':'Open';
 G.parts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=p.g||0;p.l--});G.parts=G.parts.filter(p=>p.l>0);
 G.boxes.forEach(b=>{if(b.open&&b.anim<40)b.anim++});G.gates.forEach(g=>{if(g.open&&g.anim<60)g.anim++});if(G.final.open&&G.final.anim<80)G.final.anim++;
 const tx=G.px-W/2,ty=G.py-H/2;G.cam.x+=(Math.max(0,Math.min(tx,MW*T-W))-G.cam.x)*.12;G.cam.y+=(Math.max(0,Math.min(ty,MH*T-H))-G.cam.y)*.12;
 hud();}
function hurt(msg){G.hearts--;G.inv=100;snd('hurt');toast(msg);for(let i=0;i<10;i++)G.parts.push({x:G.px,y:G.py-20,vx:R(-4,4),vy:R(-6,-2),g:.3,l:30,c:'#E05A47'});
 if(G.hearts<=0){G.hearts=3;const zs=[[3,30],[16,8],[31,26],[46,9]][G.zone];G.px=zs[0]*T+32;G.py=zs[1]*T+32;toast('Back to the start of this area. You can do it! 💪')}hud()}

/* ---------- boxes and questions ---------- */
function interact(){if(!near||G.pause)return;if(near==='final'){openFinal();return}const b=near;
 snd('open');G.pause=true;K.u=K.d=K.l=K.r=0;
 if(b.k==='q')askBox(b);else surprise(b)}
function card(html){$('fg-ov').innerHTML=`<div class="fg-card">${html}</div>`;$('fg-ov').hidden=false}
function close(){$('fg-ov').hidden=true;$('fg-ov').innerHTML='';G.pause=false;goal()}
function askBox(b,first=true){const Q=makeQ();G.asked++;let tries=0;
 card(`<div class="fg-big">${pic("goldOpen",4.5)}</div><h2>A golden box! Answer to open it</h2><div class="fg-q">${Q.q}</div><div class="fg-ans">${Q.o.map(v=>`<button data-v="${v}">${fmt(v)}</button>`).join('')}</div><div class="fg-fb" id="fb"></div><button class="fg-say" id="fg-sayq">🔊 Read it to me</button>`);
 say(Q.q);$('fg-sayq').onclick=()=>say(Q.q);
 document.querySelectorAll('.ans button').forEach(btn=>btn.onclick=()=>{const v=+btn.dataset.v;if(btn.classList.contains('bad'))return;
  if(v===Q.a){btn.classList.add('good');snd('right');if(tries===0)G.first++;b.open=true;G.keys++;G.coins+=tries===0?30:15;
   setTimeout(()=>{const gi=G.keys-1;const gate=G.gates[gi];
    card(`<div class="fg-big">${pic("heroKey",6)}</div><h2>Correct! You found a key!</h2><p>+${tries===0?30:15} 🪙 coins</p><p>${gate?'The gate to <b>'+ZONES[gi+1].name+'</b> is now open. Keep exploring!':'You have all the keys! Go to the <b>Ancient Stone Gate</b> on the hill.'}</p><button class="fg-go" id="fg-ok">Let’s go! ➜</button>`);
    $('fg-ok').onclick=()=>{if(gate){gate.open=true;snd('gate');G.parts.push({x:gate.x*T+32,y:gate.y*T,vx:0,vy:-1,l:90,txt:'Gate open! 🔓',c:'#FFE08A'})}close()}},700)}
  else{tries++;btn.classList.add('bad');snd('wrong');$('fb').textContent=tries===1?'Not quite. Have another go!':'Read the question again slowly. You can do it!'}})}
function surprise(b){b.open=true;const r=b.x%5;let html;
 if(r===0){G.coins+=25;html=`<div class="fg-big">${pic("surpOpen",4.5)}</div><h2>🪙 Bonus coins!</h2><p>+25 coins for exploring!</p>`;snd('coin')}
 else if(r===1){G.gems++;html=`<div class="fg-big">${pic("surpOpen",4.5)}</div><h2>💎 A sparkling gem!</h2><p>+1 gem. Spend gems in Math City!</p>`;snd('right')}
 else if(r===2){const t=pick(TIPS[grade]);html=`<div class="fg-owlrow">${pic("owl",6)}<div><h2>💡 Wise Owl’s maths tip!</h2><p>${t}</p></div></div>`;say(t)}
 else if(r===3){const f=pick(FACTS);html=`<div class="fg-owlrow">${pic("owl",6)}<div><h2>🤓 Wise Owl’s amazing fact!</h2><p>${f}</p></div></div>`;say(f)}
 else{G.hearts=Math.min(G.hearts+1,4);html=`<div class="fg-big">${pic("surpOpen",4.5)}</div><h2>❤️ Extra heart!</h2><p>You found an extra life.</p>`;snd('right')}
 card(html+`<button class="fg-go" id="fg-ok">Keep exploring ➜</button>`);$('fg-ok').onclick=close;hud()}
function openFinal(){G.pause=true;K.u=K.d=K.l=K.r=0;const step=()=>{if(G.final.step>=3){G.final.open=true;snd('gate');G.keys=4;hud();setTimeout(win,1500);close();return}
  const Q=makeQ();G.asked++;let tries=0;
  card(`<div class="fg-big">${pic("stone",5)}</div><h2>The Ancient Stone Gate · Riddle ${G.final.step+1} of 3</h2><div class="fg-q">${Q.q}</div><div class="fg-ans">${Q.o.map(v=>`<button data-v="${v}">${fmt(v)}</button>`).join('')}</div><div class="fg-fb" id="fb"></div><button class="fg-say" id="fg-sayq">🔊 Read it to me</button>`);
  say(Q.q);$('fg-sayq').onclick=()=>say(Q.q);
  document.querySelectorAll('.ans button').forEach(btn=>btn.onclick=()=>{if(btn.classList.contains('bad'))return;if(+btn.dataset.v===Q.a){btn.classList.add('good');snd('right');if(!tries)G.first++;G.final.step++;setTimeout(step,800)}else{tries++;btn.classList.add('bad');snd('wrong');$('fb').textContent='Not quite. Try again!'}})};step()}
function win(){G.pause=true;snd('win');const pct=G.asked?G.first/G.asked:1,st=pct>=.85?3:pct>=.6?2:1;G.coins+=50;G.gems+=2;hud();
 $('fg-ov').innerHTML=`<div class="fg-parch"><div class="fg-row" style="gap:0">${pic("heroKey",6.5)}${pic("goldOpen",4.5,"margin-left:-.3em")}</div><h1>🏆 You explored Number Forest!</h1><div style="font-size:4em">${'⭐'.repeat(st)}${'☆'.repeat(3-st)}</div><p>🪙 ${G.coins} coins · 💎 ${G.gems} gems · ${G.first} of ${G.asked} right first time</p><p>Badge earned: <b>Forest Explorer</b></p><div class="fg-row"><button class="fg-go" id="fg-again">Play again ↺</button></div></div>`;
 $('fg-ov').hidden=false;$('fg-again').onclick=()=>{intro()}}

/* ---------- drawing ---------- */
function rr(x,y,w,h,r,f,s){X.beginPath();X.roundRect(x,y,w,h,r);if(f){X.fillStyle=f;X.fill()}if(s){X.strokeStyle=s;X.lineWidth=3;X.stroke()}}
const hash=(x,y)=>((x*73856093)^(y*19349663))>>>0;
function drawTile(x,y,v,sx,sy){const h=hash(x,y);
 if(v===3){const P=pats();X.save();X.translate(-G.cam.x,-G.cam.y);X.fillStyle=P?P.path:'#E8C98A';X.fillRect(x*T,y*T,T,T);X.restore()}
 if(v===2||v===4){const P=pats();X.save();X.translate(-G.cam.x,-G.cam.y);X.fillStyle=P?P.water:'#4FA9E0';X.fillRect(x*T,y*T,T,T);X.restore();X.strokeStyle='rgba(255,255,255,.45)';X.lineWidth=3;const o=(G.t/3+h)%T;X.beginPath();X.moveTo(sx+10,sy+o);X.quadraticCurveTo(sx+26,sy+o-5,sx+42,sy+o);X.stroke()}
 if(v===7){if(h%3===0)spr('mush',sx+32,sy+58,46);else spr('flowers',sx+32,sy+58,48)}
 if(v===8)spr('mud',sx+32,sy+54,40);
 if(v===5){X.fillStyle='rgba(0,0,0,.18)';X.beginPath();X.ellipse(sx+34,sy+56,26,8,0,0,7);X.fill();spr('rock',sx+32,sy+60,56)}
 if(v===6)spr('thorns',sx+32,sy+62,60);
}
function drawTree(sx,sy,h){X.fillStyle='rgba(0,0,0,.2)';X.beginPath();X.ellipse(sx+32,sy+60,28,9,0,0,7);X.fill();const k=['tree1','tree2','tree3','tree1','tree2'][h%5];spr(k,sx+32,sy+66,k==='tree2'?118:108)}
function drawBox(b,sx,sy){const gold=b.k==='q',bob=b.open?0:Math.sin(G.t/12+b.x)*3;
 if(!b.open){X.fillStyle=gold?'rgba(255,215,80,.4)':'rgba(190,160,255,.4)';X.beginPath();X.arc(sx+32,sy+34,34+Math.sin(G.t/10)*4,0,7);X.fill()}
 X.fillStyle='rgba(0,0,0,.22)';X.beginPath();X.ellipse(sx+32,sy+58,28,8,0,0,7);X.fill();
 const k=gold?(b.open?'goldOpen':'gold'):(b.open?'surpOpen':'surp');const sc=b.open&&b.anim<12?1+(12-b.anim)/30:1;
 X.save();X.translate(sx+32,sy+60+bob);X.scale(sc,sc);X.globalAlpha=b.open?.85:1;spr(k,0,0,62);X.restore();X.globalAlpha=1;
 if(b.open&&b.anim<40){X.fillStyle='rgba(255,230,120,'+(1-b.anim/40)+')';X.beginPath();X.moveTo(sx+12,sy+20);X.lineTo(sx+32,sy-50);X.lineTo(sx+52,sy+20);X.fill()}}
function drawGate(g,sx,sy){if(g.open&&g.anim>=60)return;const a=g.open?Math.max(0,1-(g.anim-15)/45):1,lift=g.open?Math.max(0,g.anim-15)*.8:0;
 X.globalAlpha=Math.min(1,a);X.fillStyle='rgba(0,0,0,.2)';X.beginPath();X.ellipse(sx+32,sy+60,40,9,0,0,7);X.fill();
 spr(g.open?'gateAjar':'gate',sx+32,sy+66-lift,100);X.globalAlpha=1;
 if(g.open&&g.anim<40)for(let i=0;i<2;i++)G.parts.push({x:g.x*T+32+R(-30,30),y:g.y*T+R(-30,40),vx:R(-1,1),vy:R(-2,-.5),l:25,c:'#FFE08A'})}
function drawFinal(sx,sy){const ready=G.keys>=3,cx=sx+32,by=sy+82;
 if(ready||G.final.open){X.fillStyle='rgba(120,230,255,'+(G.final.open?.55:.25+Math.sin(G.t/10)*.12)+')';X.beginPath();X.ellipse(cx,by-90,80,110,0,0,7);X.fill()}
 X.fillStyle='rgba(0,0,0,.22)';X.beginPath();X.ellipse(cx,by-4,70,14,0,0,7);X.fill();
 X.save();if(!ready&&!G.final.open)X.filter='grayscale(.9) brightness(.85)';spr('stone',cx,by,210);X.restore();
 if(!ready&&!G.final.open){X.font='700 22px Fredoka';X.textAlign='center';X.strokeStyle='rgba(0,0,0,.5)';X.lineWidth=4;const t='🔒 '+G.keys+'/3 keys';X.strokeText(t,cx,by-215);X.fillStyle='#fff';X.fillText(t,cx,by-215)}}
function drawHero(){const sx=G.px-G.cam.x,sy=G.py-G.cam.y;if(G.inv>0&&G.t%8<4)return;const b=G.walk?Math.abs(Math.sin(G.walk/5))*5:0;
 X.fillStyle='rgba(0,0,0,.22)';X.beginPath();X.ellipse(sx,sy+22,20,7,0,0,7);X.fill();
 const k=G.dir==='u'?'heroU':G.dir==='d'?'heroD':'heroR';X.save();X.translate(sx,sy+24-b);if(G.walk)X.rotate(Math.sin(G.walk/5)*.06);
 if(!spr(k,0,0,96,G.dir==='l')){X.fillStyle='#8B5CF6';X.fillRect(-14,-60,28,60)}X.restore()}
function drawCritter(c){const sx=c.x-G.cam.x,sy=c.y-G.cam.y;if(sx<-80||sy<-80||sx>W+80||sy>H+80)return;
 if(c.k==='boar'){X.fillStyle='rgba(0,0,0,.2)';X.beginPath();X.ellipse(sx,sy+22,28,7,0,0,7);X.fill();const left=(c.vx||0)<0||(c.vy||0)<0;
  X.save();X.translate(sx,sy+26+Math.abs(Math.sin(G.t/4))*-4);spr('boar',0,0,62,left);X.restore()}
 else{const left=Math.sin(c.a)>0;X.fillStyle='rgba(0,0,0,.15)';X.beginPath();X.ellipse(sx,sy+26,12,4,0,0,7);X.fill();
  X.save();X.translate(sx,sy+18+Math.sin(G.t/6)*4);X.rotate(Math.sin(G.t/3)*.08);spr('bee',0,0,44,left);X.restore()}}
function draw(){const cx=G.cam.x,cy=G.cam.y;X.clearRect(0,0,W,H);{const P=pats();X.save();X.translate(-cx,-cy);X.fillStyle=P?P.grass:'#7BC96F';X.fillRect(cx,cy,W,H);X.restore()}
 const x0=Math.floor(cx/T),y0=Math.floor(cy/T),x1=Math.min(MW-1,x0+W/T+1),y1=Math.min(MH-1,y0+H/T+1);
 for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const v=M[y][x],sx=x*T-cx,sy=y*T-cy;drawTile(x,y,v===1||v===9||v===10?0:v,sx,sy)}
 for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)if(M[y][x]===4&&(x===0||M[y][x-1]!==4)){let e=x;while(M[y][e+1]===4)e++;const w=(e-x+1)*T+30;X.drawImage(IMG.bridge,x*T-cx-15,y*T-cy-8,w,T+16)}
 // things sorted by row so trees overlap nicely
 for(let y=y0;y<=y1;y++){for(let x=x0;x<=x1;x++){const v=M[y][x],sx=x*T-cx,sy=y*T-cy;if(v===1)drawTree(sx,sy,hash(x,y))
   if(v===9){const g=G.gates.find(g=>g.x===x&&g.y===y);drawGate(g,sx,sy)}}
  G.boxes.forEach(b=>{if(b.y===y)drawBox(b,b.x*T-cx,b.y*T-cy)});
  if(y===FINAL.y-2)drawFinal(FINAL.x*T-cx,(FINAL.y-2)*T-cy);
  if(Math.floor(G.py/T)===y)drawHero()}
 G.critters.forEach(drawCritter);
 // fog over unexplored places
 for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)if(!G.seen[y][x]){X.fillStyle='rgba(18,48,30,.82)';X.fillRect(Math.round(x*T-cx),Math.round(y*T-cy),T,T)}
 // particles
 G.parts.forEach(p=>{const sx=p.x-cx,sy=p.y-cy;X.globalAlpha=Math.min(1,p.l/30);if(p.txt){X.font='700 34px Fredoka';X.textAlign='center';X.strokeStyle='rgba(0,0,0,.5)';X.lineWidth=5;X.strokeText(p.txt,sx,sy);X.fillStyle=p.c;X.fillText(p.txt,sx,sy)}else{X.fillStyle=p.c;X.beginPath();X.arc(sx,sy,5,0,7);X.fill()}X.globalAlpha=1});
 // compass arrow pointing to the next goal
 const tg=nextTarget(),tx=tg.x*T+32-G.px,ty=tg.y*T+32-G.py,d=Math.hypot(tx,ty);
 if(d>260){const a=Math.atan2(ty,tx),ax=G.px-cx+Math.cos(a)*70,ay=G.py-cy-10+Math.sin(a)*70;X.save();X.translate(ax,ay);X.rotate(a);X.fillStyle='#FFC93C';X.strokeStyle='#7A4A10';X.lineWidth=3;X.beginPath();X.moveTo(18,0);X.lineTo(-10,-12);X.lineTo(-4,0);X.lineTo(-10,12);X.closePath();X.fill();X.stroke();X.restore()}
 // near prompt
 if(near&&!G.pause){const nx=(near==='final'?FINAL.x:near.x)*T+32-cx,ny=(near==='final'?FINAL.y-2:near.y)*T-cy-30;rr(nx-70,ny-28,140,36,18,'rgba(255,255,255,.95)','#B7791F');X.fillStyle='#5A3D00';X.font='700 20px Fredoka';X.textAlign='center';X.fillText(near==='final'?'Space: solve riddles':'Space: open box',nx,ny-4)}
 drawMini();}

/* ---------- treasure maps ---------- */
function paintMap(ctx,w,h,full){const sx=w/MW,sy=h/MH;ctx.fillStyle='#F4E3B5';ctx.fillRect(0,0,w,h);
 for(let y=0;y<MH;y++)for(let x=0;x<MW;x++){const v=M[y][x];if(!full&&!G.seen[y][x])continue;
  ctx.fillStyle=v===1?'#7FA36A':v===2?'#7DB9D8':v===3?'#D7B16D':v===4?'#A0703E':v===9||v===10?'#8B5A2B':null;if(ctx.fillStyle&&v)ctx.fillRect(x*sx,y*sy,sx+.5,sy+.5)}
 // route (dotted)
 ctx.strokeStyle='#B5402A';ctx.setLineDash([sx*.8,sx*.6]);ctx.lineWidth=Math.max(2,sx*.35);ctx.beginPath();const route=[[3,30],...BOXES.filter(b=>b.k==='q').flatMap((b,i)=>[[b.x,b.y],[GATES[i].x,GATES[i].y]]),[FINAL.x,FINAL.y-2]];
 route.forEach(([x,y],i)=>{const px=x*sx+sx/2,py=y*sy+sy/2;i?ctx.lineTo(px,py):ctx.moveTo(px,py)});ctx.stroke();ctx.setLineDash([]);
 // X marks for golden boxes, ★ for surprises already seen
 G.boxes.forEach(b=>{const px=b.x*sx+sx/2,py=b.y*sy+sy/2;if(b.k==='q'){ctx.strokeStyle=b.open?'#2DBE6C':'#C0263A';ctx.lineWidth=Math.max(3,sx*.5);const r=Math.max(5,sx*1.1);
  if(b.open){ctx.beginPath();ctx.arc(px,py,r,0,7);ctx.stroke()}else{ctx.beginPath();ctx.moveTo(px-r,py-r);ctx.lineTo(px+r,py+r);ctx.moveTo(px+r,py-r);ctx.lineTo(px-r,py+r);ctx.stroke()}}
  else if(G.seen[b.y][b.x]&&!b.open){ctx.fillStyle='#7B5BC4';ctx.font=`700 ${Math.max(10,sx*1.6)}px Fredoka`;ctx.textAlign='center';ctx.fillText('★',px,py+sx*.5)}});
 ctx.fillStyle='#7A3E1A';ctx.font=`700 ${Math.max(10,sx*1.7)}px Fredoka`;ctx.textAlign='center';ctx.fillText('🏛',FINAL.x*sx+sx/2,(FINAL.y-2)*sy+sy);
 // hero
 ctx.fillStyle='#8B5CF6';ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(G.px/T*sx,G.py/T*sy,Math.max(4,sx*.9),0,7);ctx.fill();ctx.stroke()}
function drawMini(){const m=$('fg-mini').getContext('2d');paintMap(m,240,150,false)}
function showMap(first){G.pause=true;snd('map');K.u=K.d=K.l=K.r=0;
 $('fg-ov').innerHTML=`<div class="fg-parch"><h1>🗺️ ${first?'The Treasure Map of Number Forest':'Your Treasure Map'}</h1>${first?'<p>Follow the red dotted path. Find the <b style="color:#C0263A">✖ golden boxes</b> and answer the question inside to get a key. Each key opens the next gate.<br>Look out for <b>'+pic('bee',1.3,'vertical-align:-.3em')+' bees</b>, the <b>'+pic('boar',1.3,'vertical-align:-.3em')+' wild boar</b> and <b>🌵 thorns</b>! <b style="color:#7B5BC4">★ Surprise boxes</b> hide tips, facts and bonuses.</p>':'<p>The golden arrow next to you always points to your next goal.</p>'}<canvas id="fg-bigmap" width="1200" height="680"></canvas><div class="fg-row"><button class="fg-go" id="fg-mapok">${first?'Start the adventure! 🧭':'Back to the forest ➜'}</button></div></div>`;
 $('fg-ov').hidden=false;paintMap($('fg-bigmap').getContext('2d'),1200,680,first||true);$('fg-mapok').onclick=close}

/* ---------- start ---------- */
function intro(){reset();G.pause=true;$('fg-ov').innerHTML=`<div class="fg-parch">${pic("scroll",4.5,"margin-bottom:.2em")}<h1>🌲 Number Forest Adventure 🌲</h1><p>An old explorer has left you a treasure map. Explore the forest, find the golden boxes and use your maths to unlock the way to the Ancient Stone Gate!</p>
 <div class="fg-row" style="margin:.6em 0"><select id="fg-grade"><option value="1">Grade 1</option><option value="2">Grade 2</option><option value="3" selected>Grade 3</option><option value="4">Grade 4</option><option value="5">Grade 5</option></select><button class="fg-go" id="fg-begin">Open the map 🗺️</button></div>
 <p style="font-size:1em;opacity:.8;padding-right:12%">Computer: arrow keys to walk · Space to open boxes · M for the map &nbsp;|&nbsp; iPad: use the buttons</p></div>`;$('fg-ov').hidden=false;
 $('fg-begin').onclick=()=>{grade=+$('fg-grade').value;showMap(true)}}
let last=0,acc=0;function loop(ts){if(!ON)return;acc+=Math.min(60,ts-last);last=ts;while(acc>=16.67){update();acc-=16.67}draw();requestAnimationFrame(loop)}


/* ================= Maths Quest connection =================
   Questions come from the child's own grade (Number and place value), answers are recorded
   like everywhere else on the site, and coins, gems and progress are saved to the adventure. */
let ON=false,Z=null,WRAP=null,DONE=null;
const live=()=>typeof ADV!=='undefined'&&ADV&&typeof ME!=='undefined'&&ME;
function say(t,k){try{if(typeof window.say==='function'&&window.say!==say){window.say(t,k);return}}catch(e){}say0(t)}
const VO={"intro": "An old explorer has left you a treasure map. Explore the forest, find the golden boxes, and use your maths to unlock the way to the Ancient Stone Gate!", "back": "Welcome back, explorer! Let's carry on with your adventure.", "map": "Follow the red dotted path. Find the golden boxes, and answer the question inside to get a key. Each key opens the next gate. Look out for bees, the wild boar, and the prickly thorns!", "key": "Correct! You found a key! The next gate is now open. Keep exploring!", "key3": "Correct! You have all the keys! Now go to the Ancient Stone Gate on the hill.", "coins": "Bonus coins for exploring!", "gem": "A sparkling gem! You can spend gems in Math City.", "heart": "An extra heart! You found an extra life.", "win": "Hooray! You explored Number Forest! You earned the Forest Explorer badge!", "zone0": "Sunny Meadow.", "zone1": "Whispering River.", "zone2": "Buzzing Woods.", "zone3": "Ancient Hill.", "tip-1-0": "Here's a tip from Wise Owl. To find ten more, the tens digit goes up by one!", "tip-1-1": "Here's a tip from Wise Owl. Counting in twos: 2, 4, 6, 8, 10. These are even numbers.", "tip-1-2": "Here's a tip from Wise Owl. A number line helps you count on and back.", "tip-2-0": "Here's a tip from Wise Owl. To find one hundred more, the hundreds digit goes up by one.", "tip-2-1": "Here's a tip from Wise Owl. In 345, the 3 means 3 hundreds. That's 300!", "tip-2-2": "Here's a tip from Wise Owl. Counting in fifties: 50, 100, 150, 200. It goes up by half a hundred.", "tip-3-0": "Here's a tip from Wise Owl. When you round, look at the digit to the right. If it is 5 or more, round up!", "tip-3-1": "Here's a tip from Wise Owl. In 4,582, the 4 is worth 4,000.", "tip-3-2": "Here's a tip from Wise Owl. Roman numerals: I is 1, V is 5, X is 10, L is 50, and C is 100.", "tip-4-0": "Here's a tip from Wise Owl. Negative numbers are below zero, like a cold winter morning of minus 5 degrees.", "tip-4-1": "Here's a tip from Wise Owl. Rounding to the nearest thousand? Look at the hundreds digit.", "tip-4-2": "Here's a tip from Wise Owl. Dividing by one hundred moves every digit two places to the right.", "tip-5-0": "Here's a tip from Wise Owl. A square number is a number times itself. 6 times 6 is 36.", "tip-5-1": "Here's a tip from Wise Owl. A prime number has exactly two factors: one, and itself.", "tip-5-2": "Here's a tip from Wise Owl. One million has six zeros!", "fact-0": "Here's an amazing fact from Wise Owl. Zero is the only number that is neither positive nor negative.", "fact-1": "Here's an amazing fact from Wise Owl. The word hundred comes from an old word that meant one hundred and twenty!", "fact-2": "Here's an amazing fact from Wise Owl. A googol is 1 followed by one hundred zeros.", "fact-3": "Here's an amazing fact from Wise Owl. Ancient Egyptians used a picture of a frog for one hundred thousand!", "fact-4": "Here's an amazing fact from Wise Owl. If you count one number every second, it takes eleven and a half days to reach one million.", "fact-5": "Here's an amazing fact from Wise Owl. Bees build their honeycombs from hexagons. Clever bees!"};
function talk(k){if(VO[k])say(VO[k],'fg-'+k)}
function busy(e){const tg=e.target&&e.target.tagName;return tg==='INPUT'||tg==='TEXTAREA'||tg==='SELECT'||!!document.getElementById('advov')}
function fgSave(){if(!live())return;ADV.coins=G.coins;ADV.gems=G.gems;
 ADV.fg={o:G.boxes.map((b,i)=>b.open?i:-1).filter(i=>i>=0),f:G.final.step};advSave()}

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

function askBox(b){const qi=G.boxes.filter(x=>x.k==='q').indexOf(b);
 const want=(Z&&Z.locks&&Z.locks.ch&&Z.locks.ch[qi])||{d:[Math.min(qi+1,3)]};
 qAsk({img:'gold',n:'Golden treasure box',s:'Answer the question to open it. There is a key inside!'},want,first=>{
  G.asked++;if(first)G.first++;b.open=true;b.anim=0;snd('open');G.keys++;const c=first?30:15;G.coins+=c;
  const gi=G.keys-1,gate=G.gates[gi];fgSave();hud();talk(gate?'key':'key3');
  card(`<div class="fg-big">${pic('heroKey',6)}</div><h2>Correct! You found a key!</h2><p>+${c} 🪙 coins</p><p>${gate?'The gate to <b>'+ZONES[gi+1].name+'</b> is now open. Keep exploring!':'You have all the keys! Go to the <b>Ancient Stone Gate</b> on the hill.'}</p><button class="fg-go" id="fg-ok">Let’s go! ➜</button>`);
  $('fg-ok').onclick=()=>{if(gate){gate.open=true;gate.anim=0;snd('gate');G.parts.push({x:gate.x*T+32,y:gate.y*T,vx:0,vy:-1,l:90,txt:'Gate open! 🔓',c:'#FFE08A'})}close()}})}

function surprise(b){b.open=true;b.anim=0;const r=({11:2,2:0,26:3,35:4,55:1})[b.x]??b.x%5;let html;
 if(r===0){talk('coins');G.coins+=25;html=`<div class="fg-big">${pic('surpOpen',4.5)}</div><h2>🪙 Bonus coins!</h2><p>+25 coins for exploring!</p>`;snd('coin')}
 else if(r===1){talk('gem');G.gems++;html=`<div class="fg-big">${pic('surpOpen',4.5)}</div><h2>💎 A sparkling gem!</h2><p>+1 gem. Spend gems in Math City!</p>`;snd('right')}
 else if(r===2){const ti=Math.floor(Math.random()*TIPS[grade].length),t=TIPS[grade][ti];html=`<div class="fg-owlrow">${pic('owl',6)}<div><h2>💡 Wise Owl’s maths tip!</h2><p>${t}</p></div></div>`;talk('tip-'+grade+'-'+ti)}
 else if(r===3){const fi=Math.floor(Math.random()*FACTS.length),f=FACTS[fi];html=`<div class="fg-owlrow">${pic('owl',6)}<div><h2>🤓 Wise Owl’s amazing fact!</h2><p>${f}</p></div></div>`;talk('fact-'+fi)}
 else{talk('heart');G.hearts=Math.min(G.hearts+1,4);html=`<div class="fg-big">${pic('surpOpen',4.5)}</div><h2>❤️ Extra heart!</h2><p>You found an extra life.</p>`;snd('right')}
 fgSave();card(html+`<button class="fg-go" id="fg-ok">Keep exploring ➜</button>`);$('fg-ok').onclick=close;hud()}

function openFinal(){G.pause=true;K.u=K.d=K.l=K.r=0;
 const step=()=>{if(G.final.step>=3){G.final.open=true;snd('gate');G.keys=4;hud();close();G.pause=true;setTimeout(win,1500);return}
  const want=(Z&&Z.locks&&Z.locks.boss&&Z.locks.boss[G.final.step])||{d:[3]};
  qAsk({img:'stone',n:'The Ancient Stone Gate',s:`Riddle ${G.final.step+1} of 3. Solve all three to open the gate!`},want,first=>{
   G.asked++;if(first)G.first++;G.final.step++;fgSave();snd('right');setTimeout(step,300)})};step()}

function win(){G.pause=true;snd('win');setTimeout(()=>talk('win'),900);const pct=G.asked?G.first/G.asked:1,st=pct>=.85?3:pct>=.6?2:1;G.coins+=50;G.gems+=2;hud();
 let badge='';if(live()){ADV.coins=G.coins;ADV.gems=G.gems;ADV.fg=null;if(!ADV.badges.includes('forest')){ADV.badges.push('forest');badge=' You earned the <b>Forest Explorer</b> badge!'}advSave()}
 const nm=live()&&ME.first_name?', '+esc(ME.first_name):'';
 $('fg-ov').innerHTML=`<div class="fg-parch"><div class="fg-row" style="gap:0">${pic('heroKey',6.5)}${pic('goldOpen',4.5,'margin-left:-.3em')}</div><h1>🏆 You explored Number Forest${nm}!</h1><div style="font-size:4em">${'⭐'.repeat(st)}${'☆'.repeat(3-st)}</div><p>+50 🪙 · +2 💎 · ${G.first} of ${G.asked} right first time</p><p>${badge||'Badge: <b>Forest Explorer</b>'}</p>
 <div class="fg-row" style="font-size:.8em;padding-right:10%"><button class="fg-go" id="fg-again">Play again ↺</button><button class="fg-go fg-sub" id="fg-city">🏗️ Build Math City</button><button class="fg-go fg-sub" id="fg-back">Adventures</button></div></div>`;
 $('fg-ov').hidden=false;$('fg-again').onclick=()=>{fresh();intro()};$('fg-back').onclick=()=>stop(true);
 $('fg-city').onclick=()=>stop(true,{s:'adv',z:'city',land:'NI'})}

function intro(){G.pause=true;const n=G.boxes.filter(b=>b.k==='q'&&b.open).length,back=n>0||G.final.step>0||G.boxes.some(b=>b.open);
 const nm=live()&&ME.first_name?esc(ME.first_name):'explorer';
 $('fg-ov').innerHTML=`<div class="fg-parch">${pic('scroll',4.5,'margin-bottom:.2em')}<h1>🌲 Number Forest Adventure 🌲</h1>
 <p>${back?`Welcome back, ${nm}! You have ${n} of 3 keys. Carry on from <b>${ZONES[Math.min(n,3)].name}</b>.`:`Hello ${nm}! An old explorer has left you a treasure map. Explore the forest, find the golden boxes and use your maths to unlock the way to the Ancient Stone Gate!`}</p>
 <div class="fg-row" style="margin:.6em 0"><button class="fg-go" id="fg-begin">Open the map 🗺️</button>${back?'<button class="fg-go fg-sub" id="fg-restart">Start again ↺</button>':''}</div>
 <p style="font-size:1em;opacity:.8;padding-right:12%">Computer: arrow keys to walk · Space to open boxes · M for the map &nbsp;|&nbsp; iPad: use the buttons</p></div>`;$('fg-ov').hidden=false;
 $('fg-begin').onclick=()=>{showMap(true);talk('map')};setTimeout(()=>talk(back?'back':'intro'),300);const rs=$('fg-restart');if(rs)rs.onclick=()=>{fresh();intro()}}

/* start a new forest (keeps coins and gems) */
function fresh(){if(live()){ADV.fg=null;advSave()}reset();if(live()){G.coins=ADV.coins;G.gems=ADV.gems}hud()}
/* put back what the child already did */
function restore(){reset();if(!live())return;G.coins=ADV.coins;G.gems=ADV.gems;const fg=ADV.fg;
 if(fg&&Array.isArray(fg.o)){fg.o.forEach(i=>{const b=G.boxes[i];if(b){b.open=true;b.anim=40}});
  G.keys=G.boxes.filter(b=>b.k==='q'&&b.open).length;G.gates.forEach((g,i)=>{if(i<G.keys){g.open=true;g.anim=60}});G.final.step=+fg.f||0;
  const zi=Math.min(G.keys,3),zs=[[3,30],[16,8],[31,26],[46,9]][zi];G.px=zs[0]*T+32;G.py=zs[1]*T+32;G.zone=zi;
  const x1=[0,15,30,45][zi];for(let y=0;y<MH;y++)for(let x=0;x<x1;x++)G.seen[y][x]=true;reveal()}
 hud();goal()}

function stop(go,view){ON=false;try{speechSynthesis.cancel()}catch(e){}K.u=K.d=K.l=K.r=0;
 const o=document.getElementById('advov');if(o)o.remove();if(WRAP){WRAP.remove();WRAP=null}document.body.classList.remove('fgon');
 if(go){const d=DONE;DONE=null;if(d)d(view)}}

window.FG={start(z,done){if(ON)return;Z=z;DONE=done;
 if(!document.getElementById('fgcss')){const s=document.createElement('style');s.id='fgcss';s.textContent=FGCSS;document.head.appendChild(s)}
 WRAP=document.createElement('div');WRAP.id='fgw';WRAP.innerHTML=FGHTML;document.body.appendChild(WRAP);document.body.classList.add('fgon');
 WRAP.style.setProperty('--paper','url('+IMGSRC.mapPaper+')');
 cv=document.getElementById('fg-c');X=cv.getContext('2d');PAT=null;HUDK='';loadImgs();
 grade=Math.max(1,Math.min(5,live()?(+ME.grade||1):3));
 if(!window.FG._bound){bindUI0();window.FG._bound=true}bindUI();
 ON=true;restore();intro();last=performance.now();acc=0;requestAnimationFrame(loop)},
 stop(){stop(false)},get on(){return ON},_t:{g:()=>G,go:(x,y)=>{G.px=x*T+32;G.py=y*T+32;reveal()},use:()=>interact()}};
function bindUI0(){}

})();
