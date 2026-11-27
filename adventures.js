/* =====================================================================
   MATHS QUEST — ADVENTURES
   A game world separate from the quests: explore Number Forest, clear
   obstacles and open treasure chests by solving maths problems, earn
   coins and gems, then spend them building Math City.
   Questions come from the child's own grade (Number Island practice bank),
   and every first try is recorded with mq_answer so teachers see it.
   Progress is saved on the device and, once mq-adventures.sql has been
   run in Supabase, on the server too (so it follows the child's code).
   ===================================================================== */
(function(){const s=document.createElement('style');s.textContent=`
.advfun{grid-column:1/-1;position:relative;overflow:hidden;min-height:132px;flex-direction:row!important;justify-content:flex-start!important;gap:16px!important;text-align:left;border-color:#2E8556!important;color:#fff!important;background:#1E5B3A url(img/adv-forest-sm.webp) center/cover!important;padding:16px 22px!important}
.advfun::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(10,40,25,.88) 0%,rgba(10,40,25,.55) 55%,rgba(10,40,25,.05) 100%)}
.advfun>*{position:relative}.advfun .fe{font-size:52px!important}.advfun b{font-size:28px!important;color:#FFE08A}.advfun .small{color:#E8F5EC!important;font-size:17px;max-width:520px}
.advfun .advgo{margin-left:auto;background:#FFC93C;color:#5A3D00;border-radius:999px;padding:10px 20px;font-size:20px;white-space:nowrap;box-shadow:0 4px 0 #D9A21A}
@media(max-width:600px){.advfun{flex-wrap:wrap}.advfun .advgo{margin-left:0}}
.advbar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:12px}
.advbar .ttl{font-family:Fredoka;font-weight:700;font-size:26px;color:#1E5B3A}
.advbar .sp{flex:1}
.advchip{background:#FFF3C4;border:2px solid #FFC93C;color:#5A3D00;border-radius:999px;padding:5px 14px;font-weight:800;font-family:Fredoka;font-size:19px;white-space:nowrap}
.advchip.gem{background:#EEE6FF;border-color:#A78BFA;color:#4B2E96}
.advchip.pop{animation:advpop .5s}
@keyframes advpop{40%{transform:scale(1.3)}}
.advzones{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
@media(max-width:800px){.advzones{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.advzones{grid-template-columns:1fr}}
.advz{background:#fff;border:3px solid #CFE6D7;border-radius:22px;overflow:hidden;padding:0;text-align:left;color:var(--ink);display:flex;flex-direction:column;box-shadow:0 6px 16px rgba(20,90,60,.12)}
.advz .zimg{aspect-ratio:16/9;background:center/cover;position:relative}
.advz .zimg .zemo{position:absolute;inset:0;display:grid;place-items:center;font-size:64px}
.advz .zt{padding:10px 14px 14px}.advz h3{font-size:22px;color:#1E5B3A}.advz p{margin:2px 0 0;font-family:Nunito;font-weight:700;color:var(--muted);font-size:16px}
.advz .zst{display:inline-block;margin-top:8px;background:#2DBE6C;color:#fff;border-radius:999px;padding:4px 14px;font-size:16px}
.advz.soon{filter:saturate(.55);opacity:.85;cursor:default}.advz.soon .zst{background:#B9C3BD}
.advmapw{position:relative;margin:0 calc(50% - 50vw);padding:0 12px 18px;background:linear-gradient(180deg,#0F3B26,#1E5B3A)}
.advmap{position:relative;max-width:1180px;margin:0 auto;aspect-ratio:1536/864;background:url(img/adv-forest.webp) center/cover;border-radius:22px;overflow:hidden;box-shadow:0 14px 34px rgba(0,0,0,.35);container-type:inline-size}
@media(max-width:600px){.advmapw{padding:0 0 14px}.advmap{border-radius:0}}
.advscroll{overflow-x:auto;-webkit-overflow-scrolling:touch}
@media(max-width:760px){.advmap{width:860px;max-width:none}.advscroll::after{content:'⟷ Swipe to see the whole forest';display:block;text-align:center;color:#CFE9D9;font-weight:800;font-size:14px;padding:6px 0 0;position:sticky;left:0;width:100vw}}
.advspot{position:absolute;transform:translate(-50%,-50%);width:clamp(36px,6.2cqw,74px);height:clamp(36px,6.2cqw,74px);border-radius:50%;padding:0;display:grid;place-items:center;font-size:clamp(20px,3.6cqw,42px);line-height:1;background:rgba(255,248,231,.92);border:3px solid #fff;box-shadow:0 6px 14px rgba(0,0,0,.35);font-family:system-ui}
.advspot.lock{background:rgba(30,50,40,.55);border-color:rgba(255,255,255,.55);filter:grayscale(.3)}
.advspot.lock .e{opacity:.8}
.advspot.done{background:#2DBE6C;border-color:#fff;color:#fff;font-size:clamp(16px,2.6cqw,30px);width:clamp(28px,4.4cqw,52px);height:clamp(28px,4.4cqw,52px)}
.advspot.next{background:#FFF3C4;border-color:#FFC93C;animation:advglow 1.4s ease-in-out infinite;z-index:3}
.advspot.boss{width:clamp(44px,8cqw,96px);height:clamp(44px,8cqw,96px)}
@keyframes advglow{0%,100%{box-shadow:0 0 0 0 rgba(255,201,60,.9),0 6px 14px rgba(0,0,0,.35)}50%{box-shadow:0 0 0 clamp(6px,1.4cqw,16px) rgba(255,201,60,0),0 6px 14px rgba(0,0,0,.35)}}
.advspot .tag{position:absolute;top:100%;left:50%;transform:translate(-50%,4px);background:#1E5B3A;color:#fff;font-family:Fredoka;font-size:clamp(11px,1.5cqw,17px);padding:2px 10px;border-radius:999px;white-space:nowrap;pointer-events:none}
.advme{position:absolute;transform:translate(-50%,-100%);width:clamp(40px,7cqw,86px);pointer-events:none;z-index:4;transition:left .9s ease,top .9s ease;filter:drop-shadow(0 6px 6px rgba(0,0,0,.35))}
.advme svg{width:100%;height:auto;display:block}
.advmeb{animation:advbob 1.6s ease-in-out infinite}@keyframes advbob{50%{transform:translateY(-6px)}}
@media (prefers-reduced-motion:reduce){.advspot.next,.advmeb{animation:none}.advme{transition:none}}
.advtip{max-width:1180px;margin:10px auto 0;display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap;color:#E8F5EC;font-weight:800}
.advtip .b1{font-size:18px}
.advov{position:fixed;inset:0;background:rgba(8,30,20,.62);display:flex;align-items:center;justify-content:center;z-index:70;padding:12px}
.advcard{background:#FFFDF6;border-radius:28px;border:5px solid #FFC93C;max-width:680px;width:100%;padding:18px 22px 20px;box-shadow:0 24px 60px rgba(0,0,0,.35);max-height:94vh;overflow:auto;text-align:center;position:relative}
.advcard .x{position:absolute;right:10px;top:8px;background:transparent;box-shadow:none;color:var(--muted);font-size:26px;padding:4px 10px}
.advcard .se{font-size:64px;line-height:1.1}
.advcard h2{font-size:28px;color:#1E5B3A}
.advcard .story{color:var(--muted);font-weight:800;margin:4px 0 8px}
.advlocks{font-size:30px;letter-spacing:6px;margin:2px 0 6px}
.advlocks .o{filter:none}.advlocks .c{opacity:.35}
.advcard .qtext{font-family:Fredoka;font-size:28px;color:#16323A;margin:10px 0 14px;font-weight:600}
.advcard .hint{display:flex;gap:10px;align-items:center;text-align:left;background:#E6F8FF;border-radius:16px;padding:10px 12px;margin-top:10px;font-weight:700;color:#1D4E89}
.advword{display:inline-block;background:#E0F4FF;color:#0B5C7A;border-radius:999px;padding:3px 14px;font-weight:800;font-size:16px;margin:4px 0}
.advrew{font-family:Fredoka;font-size:34px;color:#B7791F;margin:6px 0}
.advcity{background:linear-gradient(180deg,#BEE7A5,#8FD07A);border:4px solid #6DB05A;border-radius:26px;padding:16px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;max-width:760px;margin:0 auto}
.advplot{aspect-ratio:4/3;border-radius:20px;background:#D9C59A;border:3px dashed #A88C5A;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;color:#6B5531;font-family:Fredoka;font-size:18px;padding:6px;min-width:0;text-align:center;line-height:1.1}
@media(max-width:520px){.advcity{padding:10px;gap:8px}.advplot{font-size:14px;border-radius:14px}.advplot .pe{font-size:40px}}
.advplot .pe{font-size:clamp(46px,11vw,88px);line-height:1;filter:drop-shadow(0 6px 4px rgba(0,0,0,.25))}
.advplot.built{background:#E9F7DF;border:3px solid #fff;box-shadow:0 6px 0 #6DB05A;color:#1E5B3A}
.advplot.built.new .pe{animation:advbuild .8s cubic-bezier(.2,1.6,.4,1)}@keyframes advbuild{from{transform:scale(.2) translateY(30px);opacity:0}}
.advshop{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:10px}
@media(max-width:520px){.advshop{grid-template-columns:repeat(2,1fr)}}
.advshop button{background:#fff;border:3px solid #E6DCC3;box-shadow:0 4px 0 #E6DCC3;color:#1E5B3A;display:flex;flex-direction:column;align-items:center;gap:2px;padding:10px 6px;font-size:17px}
.advshop button .pe{font-size:44px;line-height:1.1}.advshop button .pr{font-family:Nunito;font-weight:800;font-size:15px;color:#7A5A12}
.advshop button:disabled{opacity:.45}
.advprog{max-width:760px;margin:0 auto 12px;background:#fff;border-radius:18px;padding:10px 14px;border:3px solid #CFE6D7;display:flex;align-items:center;gap:12px;font-weight:800;color:#1E5B3A}
.advprog .bar{flex:1;height:16px;border-radius:99px;background:#E4F1E8;overflow:hidden}.advprog .bar i{display:block;height:100%;background:linear-gradient(90deg,#2DBE6C,#FFC93C);border-radius:99px}
`;document.head.appendChild(s)})();

/* ---------- the zones ----------
   Each playable zone has a map picture (1536×864), stops along its path (x,y on that picture),
   and where its questions come from. Kinds: ob = obstacle, ch = treasure chest (3 locks),
   my = mystery chest (gem), boss = the final challenge. */
const ADVKIND={ob:{coins:10,gems:0},ch:{coins:30,gems:0},my:{coins:15,gems:1},boss:{coins:50,gems:2}};
const FOREST=[
 {x:147,y:772,k:'ob',e:'🪵',n:'Fallen log',s:'A giant log blocks the path!',w:'You rolled the log away!'},
 {x:387,y:622,k:'ch',e:'🧰',n:'Treasure chest',s:'A treasure chest with 3 locks!',w:'The chest is open!'},
 {x:612,y:630,k:'ob',e:'🌵',n:'Thorny bushes',s:'Prickly thorns are in the way!',w:'You cut a path through the thorns!'},
 {x:868,y:651,k:'ob',e:'🪨',n:'Big boulder',s:'A big boulder has rolled onto the path!',w:'You pushed the boulder away!'},
 {x:1015,y:547,k:'ch',e:'🧰',n:'Treasure chest',s:'Another chest with 3 locks!',w:'The chest is open!'},
 {x:950,y:440,k:'ob',e:'🌉',n:'Broken bridge',s:'The bridge planks are broken. Fix them to cross the stream!',w:'You fixed the bridge!'},
 {x:792,y:392,k:'my',e:'🎁',n:'Mystery chest',s:'A glowing mystery chest. Only a tricky problem opens it!',w:'You found a gem!'},
 {x:650,y:345,k:'ob',e:'🕸️',n:'Giant web',s:'A giant sticky web is blocking the way!',w:'You cleared the web!'},
 {x:706,y:248,k:'ch',e:'🧰',n:'Treasure chest',s:'A chest with 3 locks!',w:'The chest is open!'},
 {x:904,y:248,k:'ob',e:'🔒',n:'Locked gate',s:'A wooden gate with a number lock!',w:'The gate swings open!'},
 {x:1106,y:258,k:'my',e:'🎁',n:'Mystery chest',s:'Another glowing mystery chest!',w:'You found a gem!'},
 {x:1284,y:198,k:'ch',e:'🧰',n:'Treasure chest',s:'The last chest before the gate!',w:'The chest is open!'},
 {x:1318,y:112,k:'boss',e:'✨',n:'The Forest Gate',s:'The ancient Forest Gate! Solve 3 tricky problems to open it.',w:'You opened the Forest Gate!'}];
const ISLAND=[
 {x:251,y:600,k:'ob',e:'🦀',n:'Grumpy crab',s:'A grumpy crab snaps at you and won’t move!',w:'The crab scuttled away happily!'},
 {x:464,y:573,k:'ch',e:'🧰',n:'Treasure chest',s:'A pirate chest with 3 locks!',w:'The chest is open!'},
 {x:671,y:605,k:'ob',e:'🌴',n:'Fallen palm tree',s:'A palm tree has fallen across the path!',w:'You moved the palm tree!'},
 {x:797,y:530,k:'ob',e:'🐚',n:'Giant clam',s:'A giant clam is snapped shut on the path!',w:'The clam opened up!'},
 {x:623,y:427,k:'ch',e:'🧰',n:'Treasure chest',s:'Another pirate chest with 3 locks!',w:'The chest is open!'},
 {x:507,y:377,k:'my',e:'🎁',n:'Mystery chest',s:'A glowing mystery chest. Only a real-life problem opens it!',w:'You found a gem!'},
 {x:512,y:293,k:'ob',e:'🦜',n:'Pirate parrot',s:'A cheeky pirate parrot says: “Answer my question or you shall not pass!”',w:'The parrot flew off squawking “Well done!”'},
 {x:647,y:281,k:'ch',e:'🧰',n:'Treasure chest',s:'A chest hidden by the waterfall!',w:'The chest is open!'},
 {x:820,y:330,k:'ob',e:'🌉',n:'Wobbly rope bridge',s:'Planks are missing from the rope bridge!',w:'You fixed the rope bridge!'},
 {x:1067,y:353,k:'ob',e:'🌊',n:'Big wave',s:'A big wave washes over the path! Wait for the answer to calm the sea.',w:'The sea is calm again!'},
 {x:1026,y:238,k:'my',e:'🎁',n:'Mystery chest',s:'Another glowing mystery chest!',w:'You found a gem!'},
 {x:1031,y:158,k:'ob',e:'🗿',n:'Stone guardian',s:'An old stone guardian blocks the hilltop path!',w:'The guardian stepped aside!'},
 {x:1183,y:165,k:'ch',e:'🧰',n:'Treasure chest',s:'The last chest before the treasure!',w:'The chest is open!'},
 {x:1290,y:118,k:'boss',e:'❌',n:'X marks the spot',s:'The Captain’s Treasure! Solve 3 real-life problems to dig it up.',w:'You found the Captain’s Treasure!'}];
/* where questions come from: src() gives a list of items; each lock asks for a level (d) or a word problem (w) */
const ZONES=[
 {id:'forest',n:'Number Forest',t:'Number and place value',img:'img/adv-forest-sm.webp',map:'img/adv-forest.webp',open:true,game:'forest-game.js?v=2',ico:'🌲',bg:'linear-gradient(180deg,#0F3B26,#1E5B3A)',spots:FOREST,start:[62,852],badge:'Forest Explorer',
  locks:{ob:[{d:[1,2]}],ch:[{d:[1]},{d:[2]},{d:[3]}],my:[{d:[3]}],boss:[{d:[2,3]},{d:[2,3]},{d:[3]}]},src:()=>advLand('NI')},
 {id:'island',n:'Treasure Island',t:'Calculations and problem-solving',img:'img/adv-island-sm.webp',map:'img/adv-island.webp',open:true,game:'island3d.js?v=3',api:'IG3',mod:true,st:'ig',ico:'🏝️',bg:'linear-gradient(180deg,#0B5C7A,#138FB0)',spots:ISLAND,start:[150,690],badge:'Treasure Hunter',
  locks:{ob:[{d:[1,2]}],ch:[{d:[1]},{d:[2]},{w:1}],my:[{w:1}],boss:[{w:1},{w:1},{w:1}]},src:()=>advLand('TT').concat(advLand('NI').filter(it=>/[+−×÷]/.test(it.q))),words:()=>advWords(['NI','TT','MM'])},
 {id:'city',n:'Math City',t:'Build and grow your own city',img:'img/adv-city-sm.webp',open:true,build:true,game:'city-game.js?v=2',api:'CG',ico:'🏙️'},
 {id:'mount',n:'Geometry Mountains',t:'Shapes, angles and geometry',e:'🏔️',bg:'linear-gradient(135deg,#B9A6F2,#E7E1FF)'},
 {id:'river',n:'Fraction River',t:'Fractions and decimals',e:'🌊',bg:'linear-gradient(135deg,#5BC0EB,#C6F1E7)'},
 {id:'caves',n:'Mystery Caves',t:'Reasoning and logic',e:'🕯️',bg:'linear-gradient(135deg,#3B3355,#8C7AB8)'}];
const BUILD=[
 {id:'house',e:'🏠',n:'Cosy house',c:40},{id:'park',e:'🌳',n:'Park',c:30},{id:'fountain',e:'⛲',n:'Fountain',c:60},
 {id:'shop',e:'🏪',n:'Market',c:70},{id:'school',e:'🏫',n:'School',c:100},{id:'bridge',e:'🌉',n:'Bridge',c:80},
 {id:'library',e:'🏛️',n:'Library',c:90},{id:'tower',e:'🗼',n:'Tower',c:120,g:1},{id:'castle',e:'🏰',n:'Castle',c:150,g:1},
 {id:'stadium',e:'🏟️',n:'Stadium',c:180,g:2},{id:'wheel',e:'🎡',n:'Big wheel',c:200,g:2},{id:'rocket',e:'🚀',n:'Rocket launch',c:250,g:3}];
const PLOTS=9;
const advX=(x)=>(x/1536*100).toFixed(2)+"%",advY=(y)=>(y/864*100).toFixed(2)+"%";
function advZ(id){return ZONES.find(z=>z.id===id)}

/* ---------- saving ---------- */
let ADV=null,ADVQ=null,ADVSAVE=null,ADVSRV=null;
function advKey(){return 'mq-adv-'+ME.code}
function advBlank(){return {v:2,t:0,coins:0,gems:0,zs:{},built:{},badges:[],seen:[]}}
function advFix(a){const b=advBlank();if(!a||typeof a!=='object')return b;Object.keys(b).forEach(k=>{if(a[k]===undefined)a[k]=b[k]});
 a.coins=Math.max(0,+a.coins||0);a.gems=Math.max(0,+a.gems||0);if(!Array.isArray(a.seen))a.seen=[];if(!a.built||typeof a.built!=='object')a.built={};if(!Array.isArray(a.badges))a.badges=[];
 if(!a.zs||typeof a.zs!=='object')a.zs={};
 if(Array.isArray(a.cleared)){a.zs.forest=a.zs.forest||{c:a.cleared,r:a.round||1};delete a.cleared;delete a.round}
 Object.keys(a.zs).forEach(k=>{const z=a.zs[k];if(!z||!Array.isArray(z.c))a.zs[k]={c:[],r:1}});a.v=2;return a}
function advZS(id){if(!ADV.zs[id])ADV.zs[id]={c:[],r:1};return ADV.zs[id]}
async function advLoad(){if(ADV&&ADV._code===ME.code)return ADV;let loc=null;try{loc=JSON.parse(localStorage.getItem(advKey())||'null')}catch(e){}
 let srv=null;const r=await rpc0('mq_adv_get',{p_code:ME.code});if(!r.error){ADVSRV=true;srv=r.data}else ADVSRV=false;
 const a=advFix(srv&&loc?((+srv.t||0)>=(+loc.t||0)?srv:loc):(srv||loc));a._code=ME.code;ADV=a;
 if(loc&&(!srv||(+loc.t||0)>(+srv.t||0)))advSave();return ADV}
function advSave(){if(!ADV)return;ADV.t=Date.now();const out=Object.assign({},ADV);delete out._code;out.seen=out.seen.slice(-60);ADV.seen=out.seen;
 try{localStorage.setItem(advKey(),JSON.stringify(out))}catch(e){}
 clearTimeout(ADVSAVE);ADVSAVE=setTimeout(()=>{if(ADVSRV!==false)rpc0('mq_adv_save',{p_code:ME.code,p_state:out}).then(r=>{if(r.error&&!netErr(r.error))ADVSRV=false})},700)}

/* ---------- questions from the child's grade ---------- */
function advLand(code){const l=(C.lands||[]).find(x=>x.code===code);return l?l.stops.flatMap(s=>(s.practise||[]).map(it=>Object.assign({_land:code},it))):[]}
/* real-life word problems with an answer the website can mark (a number, maybe with a unit) */
function advWords(codes){const out=[];codes.forEach(code=>{const l=(C.lands||[]).find(x=>x.code===code);if(!l)return;
 l.stops.forEach(s=>(s.use||[]).forEach((u,i)=>{if(u&&typeof u.a==='string'&&/^-?[\d,]+(\.\d+)?( ?[a-z²³%]+)?$/i.test(u.a.trim())&&u.q)
  out.push({id:'use-'+code+'-'+s.n+'-'+i,_use:true,_land:code,q:u.q,a:u.a.trim(),t:'number',d:3,k:u.k,h:'Read it slowly. What do you need to find? Which numbers matter? Do you need to add, take away, multiply or divide?'})}))});return out}
function advPick(z,want){let pool;if(want.w&&z.words){pool=z.words();if(!pool.length)want={d:[3]}}
 if(!want.w||!pool||!pool.length){pool=z.src().filter(it=>want.d.includes(it.d));if(!pool.length)pool=z.src()}
 if(!pool.length)return null;const seen=new Set(ADV.seen.slice(-40)),w=ME.wrong||{},f=ME.facts||{};
 let c=pool.filter(it=>!seen.has(it.id));if(!c.length)c=pool.slice();
 const sc=it=>(f[it.id]||0)*2-(w[it.id]||0)*3+Math.random()*4;c.sort((a,b)=>sc(a)-sc(b));
 const it=c[0];ADV.seen.push(it.id);return it}

/* ---------- views ---------- */
function advChips(){return `<span class="advchip" id="advc">🪙 ${ADV.coins}</span><span class="advchip gem" id="advg">💎 ${ADV.gems}</span>`}
function advView(){const a=$('#app');if(!ADV||ADV._code!==ME.code){a.innerHTML='<p class="center muted">Opening your adventure map…</p>';advLoad().then(()=>{if(V.s==='adv')render()});return}
 const z=V.z&&advZ(V.z);if(z&&z.game)return advGame(z);if(z&&z.build)return advCity();if(z&&z.spots)return advZone(z);
 const cb=ADV.city&&ADV.city.p?Object.keys(ADV.city.p).length:Object.keys(ADV.built).length;
 a.innerHTML=`<div class="advbar"><button class="back" id="advbk">← Map</button><span class="ttl">🗺️ Adventures</span><span class="sp"></span>${advChips()}</div>
 <p class="muted" style="margin:0 0 12px;font-weight:800">Explore magical worlds. Every problem you solve opens the way, unlocks treasure and earns coins to build your own Math City!</p>
 <div class="advzones">${ZONES.map(z=>{const d=z.spots?advZS(z.id).c.length:0;const st=z.st==='ig'&&ADV.ig&&ADV.ig.v===2?(ADV.ig.cur?`Level ${ADV.ig.cur.l}: ${ADV.ig.cur.o.filter(i=>i<3).length} of 3 keys`:`Level ${ADV.ig.un} is open`):z.build?(cb?`${cb} building${cb>1?'s':''} in your city`:'Start building'):z.game?(ADV[z.st||'fg']&&Array.isArray(ADV[z.st||'fg'].o)?`${ADV[z.st||'fg'].o.filter(i=>i<3).length} of 3 keys`:ADV.badges.includes(z.id)?'🏆 Explored! Play again':'Start exploring'):z.spots?(ADV.badges.includes(z.id)&&!d?'🏆 Explored! Play again':d?`${d} of ${z.spots.length} stops`:'Start exploring'):z.build?`${cb} of ${PLOTS} buildings`:'Coming soon';
  return `<button class="advz${z.open?'':' soon'}" data-zone="${z.id}"><div class="zimg" style="background-image:${z.img?`url(${z.img})`:'none'};${z.img?'':'background:'+z.bg}">${z.e?`<span class="zemo">${z.e}</span>`:''}</div><div class="zt"><h3>${esc(z.n)}</h3><p>${esc(z.t)}</p><span class="zst">${z.open?(z.build?'🏗️ ':'🧭 ')+st:'🔒 Coming soon'}</span></div></button>`}).join('')}</div>`;
 $('#advbk').onclick=()=>{V={s:'map'};render()};
 document.querySelectorAll('[data-zone]').forEach(b=>b.onclick=()=>{const z=advZ(b.dataset.zone);if(!z.open){cheer(z.n+' is coming soon! 🧭');return}V={s:'adv',z:z.id,land:'NI'};render()})}

function advZone(z){const a=$('#app'),S=z.spots,zs=advZS(z.id);const n=zs.c.length,all=n>=S.length;const cur=all?S.length-1:n;
 const me=S[all?S.length-1:Math.max(0,n-1)],meX=n===0?z.start[0]:me.x,meY=n===0?z.start[1]:me.y-24;
 const spots=S.map((s,i)=>{const done=i<n,next=i===n&&!all;const cls=done?'done':next?'next':'lock';
  return `<button class="advspot ${cls}${s.k==='boss'?' boss':''}" data-spot="${i}" style="left:${advX(s.x)};top:${advY(s.y)}" aria-label="${esc(s.n)}${done?', done':next?', next stop':', locked'}">${done?'✓':`<span class="e">${s.e}</span>`}${next?`<span class="tag">${esc(s.n)}</span>`:''}</button>`}).join('');
 a.innerHTML=`<div class="advbar"><button class="back" id="advbk">← Adventures</button><span class="ttl">${z.ico} ${esc(z.n)}</span><span class="sp"></span>${advChips()}</div>
 <div class="advmapw" style="background:${z.bg}"><div class="advscroll" id="advsc"><div class="advmap" style="background-image:url(${z.map})">${spots}<div class="advme" style="left:${advX(meX)};top:${advY(meY)}"><div class="advmeb">${avatarSVG(myAv(),120)}</div></div></div></div>
 <div class="advtip">${all?`🏆 You explored the whole of ${esc(z.n)}! <button class="b1" id="advagain">🔁 Explore again with new problems</button>`:`<span>Next: ${S[cur].e} <b>${esc(S[cur].n)}</b> · ${n} of ${S.length} stops</span><button class="b1" id="advnext">Go! 🧭</button>`}<button class="b2" id="advcity">🏗️ Build Math City</button></div></div>`;
 $('#advbk').onclick=()=>{V={s:'adv'};render()};$('#advcity').onclick=()=>{V={s:'adv',z:'city',land:'NI'};render()};
 const nx=$('#advnext');if(nx)nx.onclick=()=>advOpen(z,n);
 {const sc=$('#advsc'),mp=sc&&sc.firstElementChild;if(sc&&mp&&mp.offsetWidth>sc.clientWidth){const t=S[cur].x/1536*mp.offsetWidth;sc.scrollLeft=Math.max(0,t-sc.clientWidth/2)}}
 const ag=$('#advagain');if(ag)ag.onclick=()=>{zs.c=[];zs.r=(zs.r||1)+1;advSave();render();cheer('A new adventure! '+z.ico)};
 document.querySelectorAll('[data-spot]').forEach(b=>b.onclick=()=>{const i=+b.dataset.spot;
  if(i<zs.c.length){cheer(`${S[i].e} Done! Keep exploring.`);return}if(i>zs.c.length){cheer('Clear the glowing stop first! ✨');return}advOpen(z,i)})}

/* ---------- Number Forest: the explore-the-forest game (forest-game.js) ---------- */
function advGame(z){const a=$('#app'),nm=z.api||'FG';if(window[nm]&&window[nm].on)return;a.innerHTML=`<p class="center muted" style="padding:40px 0">${z.ico||'🌲'} Opening ${esc(z.n)}…</p>`;
 const go=()=>window[nm].start(z,view=>{V=view||{s:'adv'};render()});
 if(window[nm])return go();
 if(z.mod){import('./'+z.game).then(go).catch(()=>{a.innerHTML=`<p class="center muted" style="padding:40px 0">${esc(z.n)} could not open. Check the internet and try again.</p><div class="center"><button class="b1" id="advbk2">← Adventures</button></div>`;$('#advbk2').onclick=()=>{V={s:'adv'};render()}});return}
 const s=document.createElement('script');s.src=z.game;s.onload=go;
 s.onerror=()=>{s.remove();a.innerHTML=`<p class="center muted" style="padding:40px 0">${esc(z.n)} could not open. Check the internet and try again.</p><div class="center"><button class="b1" id="advbk2">← Adventures</button></div>`;$('#advbk2').onclick=()=>{V={s:'adv'};render()}};
 document.head.appendChild(s)}

/* ---------- solving a stop ---------- */
function advOpen(z,i){const s=z.spots[i],K=ADVKIND[s.k],L=z.locks[s.k];ADVQ={z,i,s,K,L,got:0,it:null,tries:0};advNextQ()}
function advClose(){const o=document.getElementById('advov');if(o)o.remove();ADVQ=null}
function advNextQ(){const q=ADVQ;q.it=advPick(q.z,q.L[Math.min(q.got,q.L.length-1)]);q.tries=0;advDraw()}
function advDraw(){const q=ADVQ,s=q.s,it=q.it,nq=q.L.length;let o=document.getElementById('advov');if(!o){o=document.createElement('div');o.id='advov';o.className='advov';document.body.appendChild(o)}
 if(!it){o.innerHTML=`<div class="advcard"><p>No questions found for your grade yet.</p><button class="b1" id="advx2">OK</button></div>`;$('#advx2').onclick=advClose;return}
 V.land=it._land||'NI';const [pic,text]=splitPic(it.q);const locks=nq>1?`<div class="advlocks" aria-label="${q.got} of ${nq} locks open">${Array.from({length:nq},(_,j)=>j<q.got?'<span class="o">🔓</span>':'<span class="c">🔒</span>').join('')}</div>`:'';
 o.innerHTML=`<div class="advcard" role="dialog" aria-label="${esc(s.n)}"><button class="x" id="advx" aria-label="Close">✕</button><div class="se">${s.e}</div><h2>${esc(s.n)}</h2><div class="story">${esc(s.s)}${nq>1?` Solve ${nq} problems to open it.`:' Solve this to get past.'}</div>${locks}
 ${it._use?'<div class="advword">🗺️ Real-life problem</div>':''}${fpFor(it.q)||(pic?picBox(pic):'')}<div class="qtext">${esc(text)} <button class="b2" id="hear" aria-label="Hear the question" style="padding:4px 12px;font-size:16px;vertical-align:middle">🔊</button></div>
 ${answerUI(it)}<div class="msg" id="fb"></div><div id="hn"></div></div>`;
 $('#advx').onclick=advClose;$('#hear').onclick=()=>say(text,it.k);autoRead(text,it.k);
 bindAnswer(it,g=>{const ok=check(it,g);
  if(q.tries===0){if(!it._use)rpc('mq_answer',{p_code:ME.code,p_qid:it.id,p_correct:ok}).then(({data})=>{if(typeof data==='number'){ME.stars=data;header()}});
   ME.facts=ME.facts||{};ME.wrong=ME.wrong||{};if(ok)ME.facts[it.id]=(ME.facts[it.id]||0)+1;else ME.wrong[it.id]=(ME.wrong[it.id]||0)+1}
  if(ok){q.got++;celebrate(false,()=>{if(!ADVQ)return;if(q.got>=nq)advWin();else advNextQ()});return}
  if(q.tries===0){q.tries=1;oops();$('#fb').innerHTML='<span class="bad">Not quite. Have another go!</span>';$('#hn').innerHTML=`<div class="hint">💡<div>${esc(it.h||'Read it again slowly and find the important numbers.')}</div></div>`;const i=$('#ans');if(i){i.value='';i.focus()}return}
  gentleSound();$('#fb').innerHTML=`<span class="bad">The answer is <b>${esc(it.a)}</b>.</span> ${it._use?'':howBtn(it)} <div style="margin-top:10px"><button class="b3" id="advnq">Try a new problem →</button></div>`;if(!it._use)bindHow(it);$('#advnq').onclick=advNextQ;
  document.querySelectorAll('#advov [data-c],#advov .ans,#advov .b1').forEach(e=>e.disabled=true)})}
function advWin(){const q=ADVQ,s=q.s,K=q.K,z=q.z,zs=advZS(z.id);ADV.coins+=K.coins;ADV.gems+=K.gems;if(!zs.c.includes(q.i))zs.c.push(q.i);
 const fin=s.k==='boss';if(fin&&!ADV.badges.includes(z.id))ADV.badges.push(z.id);advSave();
 const o=document.getElementById('advov');miniParty();happySound(true);setTimeout(()=>clapSound(true),150);
 const opened=s.k==='ob'?'✅':s.k==='boss'?'🏆':'💰';
 o.innerHTML=`<div class="advcard"><div class="se" style="font-size:84px">${opened}</div><h2>${esc(s.w)}</h2>
 <div class="advrew">+${K.coins} 🪙${K.gems?` &nbsp;+${K.gems} 💎`:''}</div>
 ${fin?`<p style="font-weight:800;color:#1E5B3A">${z.ico} You explored the whole of ${esc(z.n)}, ${esc(ME.first_name)}! You earned the <b>${esc(z.badge)}</b> badge.</p>`:''}
 <p class="muted" style="font-weight:800">You now have 🪙 ${ADV.coins} and 💎 ${ADV.gems}. Spend them in Math City!</p>
 <div class="row" style="justify-content:center;gap:10px;display:flex;flex-wrap:wrap">${fin?'':'<button class="b1" id="advon">Keep exploring 🧭</button>'}<button class="b2" id="advbuild">🏗️ Build in Math City</button></div></div>`;
 say(s.w+(K.gems?' You found a gem!':''));
 const done=()=>{advClose();render()};const on=$('#advon');if(on)on.onclick=done;$('#advbuild').onclick=()=>{advClose();V={s:'adv',z:'city',land:'NI'};render()};
 o.onclick=e=>{if(e.target===o)done()}}

/* ---------- Math City: spend coins and gems on buildings ---------- */
let ADVNEW=null;
function advCity(){const a=$('#app');const b=ADV.built,n=Object.keys(b).length,pc=Math.round(n/PLOTS*100);
 a.innerHTML=`<div class="advbar"><button class="back" id="advbk">← Adventures</button><span class="ttl">🏙️ Math City</span><span class="sp"></span>${advChips()}</div>
 <div class="advprog"><span>City progress</span><div class="bar"><i style="width:${pc}%"></i></div><span>${pc}%</span></div>
 <div class="advcity">${Array.from({length:PLOTS},(_,i)=>{const it=b[i]&&BUILD.find(x=>x.id===b[i]);
  return it?`<div class="advplot built${ADVNEW===i?' new':''}"><span class="pe">${it.e}</span><span>${esc(it.n)}</span></div>`:`<button class="advplot" data-plot="${i}"><span style="font-size:34px">＋</span><span>Build here</span></button>`}).join('')}</div>
 <p class="center muted" style="font-weight:800;margin-top:12px">${n>=PLOTS?'🎉 Your city is complete! Amazing work, '+esc(ME.first_name)+'!':'Earn 🪙 coins and 💎 gems in Number Forest and Treasure Island, then tap an empty plot to build.'}</p>
 <div class="center"><button class="b1" id="advfor">🗺️ Go exploring</button></div>`;ADVNEW=null;
 $('#advbk').onclick=()=>{V={s:'adv'};render()};$('#advfor').onclick=()=>{V={s:'adv'};render()};
 document.querySelectorAll('[data-plot]').forEach(p=>p.onclick=()=>advShop(+p.dataset.plot))}
function advShop(i){let o=document.getElementById('advov');if(!o){o=document.createElement('div');o.id='advov';o.className='advov';document.body.appendChild(o)}
 const have=new Set(Object.values(ADV.built));
 o.innerHTML=`<div class="advcard"><button class="x" id="advx" aria-label="Close">✕</button><h2>What will you build?</h2><p class="muted" style="font-weight:800;margin:4px 0">You have 🪙 ${ADV.coins} and 💎 ${ADV.gems}</p>
 <div class="advshop">${BUILD.map(x=>{const can=ADV.coins>=x.c&&ADV.gems>=(x.g||0),own=have.has(x.id);
  return `<button data-b="${x.id}" ${can&&!own?'':'disabled'}><span class="pe">${x.e}</span><span>${esc(x.n)}</span><span class="pr">${own?'✓ Built':`🪙 ${x.c}${x.g?` + 💎 ${x.g}`:''}`}</span></button>`}).join('')}</div></div>`;
 $('#advx').onclick=()=>o.remove();o.onclick=e=>{if(e.target===o)o.remove()};
 o.querySelectorAll('[data-b]').forEach(btn=>btn.onclick=()=>{const x=BUILD.find(z=>z.id===btn.dataset.b);if(ADV.coins<x.c||ADV.gems<(x.g||0))return;
  ADV.coins-=x.c;ADV.gems-=(x.g||0);ADV.built[i]=x.id;advSave();o.remove();ADVNEW=i;render();miniParty();happySound(true);say('You built a '+x.n+'!')})}
