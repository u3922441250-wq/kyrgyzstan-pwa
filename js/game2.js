/**
 * game2.js — Kyrgy Hill Climb v3
 * Improved: bigger fuel HUD, denser obstacles, better graphics, more fun
 */
var GAME_ACTIVE=false;var carImg=null;
var charImgs=[];
(function(){
  carImg=new Image();carImg.src='icons/header-right.png';
  for(var i=1;i<=9;i++){var img=new Image();img.src='icons/char-'+i+'.png';charImgs.push(img);}
})();

function startGame(){
if(GAME_ACTIVE)return;GAME_ACTIVE=true;
var ov=document.createElement('div');
ov.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;z-index:400;background:#000;touch-action:none;user-select:none;overflow:hidden';
var cv=document.createElement('canvas');cv.style.cssText='width:100%;height:100%;display:block';ov.appendChild(cv);

// HUD — fuel bar is now BIG and centered at top
var hd=document.createElement('div');hd.style.cssText='position:fixed;top:0;left:0;right:0;padding:6px 10px;z-index:401;pointer-events:none';
hd.innerHTML='<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">' +
  '<div style="flex:0 0 auto;"><div id="gD" style="color:#fff;font:800 1.3rem system-ui;text-shadow:2px 2px 4px #000">0m</div>' +
  '<div id="gH" style="color:#FFD700;font:600 .75rem system-ui;text-shadow:1px 1px 2px #000">Best: 0m</div></div>' +
  // FUEL BAR — big, centered, always visible
  '<div style="flex:1;max-width:220px;">' +
  '<div style="position:relative;width:100%;height:22px;background:rgba(0,0,0,.6);border-radius:11px;border:2px solid rgba(255,255,255,.5);overflow:hidden;box-shadow:0 0 10px rgba(0,0,0,.5);">' +
  '<div id="gF" style="height:100%;background:linear-gradient(90deg,#e8732a,#FFD700);border-radius:9px;width:100%;transition:width .1s;"></div>' +
  '<div id="gFL" style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;color:#fff;font:bold .75rem system-ui;text-shadow:1px 1px 2px #000;">⛽ 100%</div>' +
  '</div></div>' +
  '<div id="gC" style="color:#FFD700;font:700 1rem system-ui;text-shadow:1px 1px 2px #000;flex:0 0 auto;">💰 0</div>' +
  '</div>';
ov.appendChild(hd);

// Close button — top-left, respects safe-area inset, always within reach in both orientations
var closeBtn=document.createElement('button');
closeBtn.id='gX';closeBtn.textContent='✕ ESCI';
closeBtn.style.cssText='pointer-events:auto;touch-action:manipulation;position:fixed;top:max(env(safe-area-inset-top,0px),12px);left:12px;height:36px;padding:0 14px;border:2px solid rgba(255,255,255,.6);background:rgba(0,0,0,.75);color:#fff;font:bold 0.85rem system-ui;border-radius:18px;cursor:pointer;z-index:402;backdrop-filter:blur(4px);';
ov.appendChild(closeBtn);

// Controls — bigger, more visible
var ct=document.createElement('div');ct.style.cssText='position:fixed;bottom:0;left:0;right:0;padding:12px 16px;z-index:401;display:flex;justify-content:space-between;align-items:flex-end;pointer-events:none';
ct.innerHTML='<button id="gB" style="pointer-events:auto;touch-action:manipulation;width:90px;height:90px;border-radius:50%;border:3px solid rgba(255,255,255,.5);background:radial-gradient(circle at 30% 30%,rgba(255,80,80,.7),rgba(180,30,30,.7));color:#fff;font:800 2.2rem system-ui;cursor:pointer;text-shadow:2px 2px 4px #000;box-shadow:0 4px 15px rgba(0,0,0,.4);">◀</button>' +
  '<button id="gJ" style="pointer-events:auto;touch-action:manipulation;width:65px;height:65px;border-radius:50%;border:3px solid rgba(255,255,255,.5);background:radial-gradient(circle at 30% 30%,rgba(255,220,50,.7),rgba(200,150,0,.7));color:#fff;font:800 1.5rem system-ui;cursor:pointer;text-shadow:2px 2px 4px #000;box-shadow:0 4px 15px rgba(0,0,0,.4);">⬆</button>' +
  '<button id="gG" style="pointer-events:auto;touch-action:manipulation;width:90px;height:90px;border-radius:50%;border:3px solid rgba(255,255,255,.5);background:radial-gradient(circle at 30% 30%,rgba(80,220,80,.7),rgba(30,150,30,.7));color:#fff;font:800 2.2rem system-ui;cursor:pointer;text-shadow:2px 2px 4px #000;box-shadow:0 4px 15px rgba(0,0,0,.4);">▶</button>';
ov.appendChild(ct);document.body.appendChild(ov);
// Prevent zoom on double-tap anywhere in game
ov.addEventListener('touchstart',function(e){if(e.touches.length>1)e.preventDefault();},{passive:false});
ov.addEventListener('dblclick',function(e){e.preventDefault();});
document.addEventListener('gesturestart',function(e){e.preventDefault();},{passive:false});

var W,H,c;function rsz(){W=cv.width=window.innerWidth;H=cv.height=window.innerHeight;}
rsz();c=cv.getContext('2d');window.addEventListener('resize',rsz);
// Request fullscreen FIRST, then lock orientation. Android requires fullscreen
// for screen.orientation.lock() to succeed. Both calls are safely no-op on
// browsers that don't support them.
function enterFullscreenAndLock(){
  var p=null;
  try{
    if(ov.requestFullscreen)p=ov.requestFullscreen();
    else if(ov.webkitRequestFullscreen)p=ov.webkitRequestFullscreen();
  }catch(_){p=null;}
  function lock(){
    try{if(screen.orientation&&screen.orientation.lock)screen.orientation.lock('landscape').catch(function(){});}catch(_){}
  }
  if(p&&typeof p.then==='function')p.then(lock).catch(lock);else lock();
}
enterFullscreenAndLock();

var G=0.35,cam={x:0,y:0};
var car={x:200,y:0,vx:0,vy:0,angle:0,angVel:0,fuel:100,wr:0,grounded:false};
var WB=22,WR=8;
var dist=0,coins=0,over=false,started=false;
var hi=parseInt(localStorage.getItem('kg-game-high')||'0');
var gasOn=false,brakeOn=false,jumpOn=false,particles=[];
var wasAir=false,airA=0,flipB=0;
var screenShake=0;
var comboTimer=0,comboCount=0;
var notifications=[];

// TERRAIN — more varied, more interesting
var tP=[],tL=0,TS=8;
function genT(u){while(tL*TS<u+2000){var px=tL*TS;var d=Math.min(px/8000,1.3);var y=H*0.65;
// === NATURAL TERRAIN: big dramatic mountains ===
// Primary wave: BIG mountains, very pronounced
y+=Math.sin(px/500)*(70+50*d);
// Secondary: medium dramatic hills
y+=Math.sin(px/250+2.5)*(35+25*d);
// Tertiary: gentle rolling
y+=Math.sin(px/800+5)*25;
// Micro: very subtle, no sharp bumps
y+=Math.sin(px/180+8)*(3+2*d);

// === SOFT VALLEYS ===
if(tL>40){var valleyPhase=(px%2400)/2400;
if(valleyPhase>0.7&&valleyPhase<0.85){var vt=(valleyPhase-0.7)/0.15;y+=20*Math.sin(vt*Math.PI)*d;}}

// === BIG MOUNTAIN CLIMBS (very dramatic) ===
// Mountain 1: steep climb
if(px>4000&&px<6500){var mp=(px-4000)/2500;y-=70*Math.sin(mp*Math.PI);}
// Mountain 2: bigger
if(px>8500&&px<11500){var mp2=(px-8500)/3000;y-=90*Math.sin(mp2*Math.PI);}
// Mountain 3: epic pass
if(px>15000&&px<19000){var mp3=(px-15000)/4000;y-=110*Math.sin(mp3*Math.PI);}
// Mountain 4: final monster
if(px>24000&&px<28500){var mp4=(px-24000)/4500;y-=120*Math.sin(mp4*Math.PI);}
// Extra peaks between
if(px>6500&&px<7500){var mp5=(px-6500)/1000;y-=40*Math.sin(mp5*Math.PI);}
if(px>12000&&px<13500){var mp6=(px-12000)/1500;y-=55*Math.sin(mp6*Math.PI);}
if(px>20000&&px<22000){var mp7=(px-20000)/2000;y-=65*Math.sin(mp7*Math.PI);}

// === SMOOTH RAMPS ===
if(tL>30&&tL%50>46&&tL%50<50){var rampT=(tL%50-46)/4;y-=(10+8*d)*Math.sin(rampT*Math.PI*0.5);}

// === DEEP PITS / HOLES (dangerous! can flip you) ===
if(tL>25&&tL%40>36&&tL%40<40){var pitT=(tL%40-36)/4;y+=40*Math.sin(pitT*Math.PI)*d;}
if(tL>50&&tL%30>26&&tL%30<30){var pitT2=(tL%30-26)/4;y+=55*Math.sin(pitT2*Math.PI)*d;}
if(tL>80&&tL%20>17&&tL%20<20){var pitT3=(tL%20-17)/3;y+=45*Math.sin(pitT3*Math.PI)*d;}

// Flat start area
if(px<300)y=H*0.7;else if(px<600){var t=(px-300)/300;y=H*0.7*(1-t)+y*t;}
y=Math.max(H*0.15,Math.min(H*0.88,y));tP.push(y);tL++;}}
function tY(px){genT(px+500);var i=px/TS,i0=Math.max(0,Math.floor(i)),i1=Math.min(tP.length-1,i0+1),t=i-i0;t=t*t*(3-2*t);return(tP[i0]||H*0.6)*(1-t)+(tP[i1]||H*0.6)*t;}

// BG ELEMENTS — MUCH denser obstacles
var bgC={};
var STAGES=[{d:0,n:'Bishkek',e:'🏙️'},{d:80,n:'Ala-Archa',e:'🏔️'},{d:200,n:'Karakol',e:'🏘️'},{d:350,n:'Jyrgalan',e:'🌿'},{d:500,n:'Altyn-Arashan',e:'♨️'},{d:650,n:'Issyk-Kul',e:'🏖️'},{d:850,n:'Son-Kul',e:'⛺'},{d:1050,n:'Naryn',e:'🏔️'},{d:1250,n:'Tash Rabat',e:'🏛️'},{d:1450,n:'Kel-Suu',e:'💎'},{d:1700,n:'Kazarman',e:'🌙'},{d:2000,n:'Arslanbob',e:'🌳'},{d:2300,n:'Osh',e:'🕌'},{d:2600,n:'Toktogul',e:'💧'},{d:3000,n:'Bishkek!',e:'🏁'}];

function bgG(ch){if(bgC[ch])return bgC[ch];var e=[],r=Math.abs(ch*7919),r2=Math.abs(ch*3571),r3=Math.abs(ch*9311);
// Background scenery
if(ch%2===0)e.push({t:'m',px:r%500,h:90+r%130});
if(ch%3===1)e.push({t:'m',px:250+r%250,h:50+r%80});
if(ch%5===2)e.push({t:'y',px:100+r%350});
if(ch%7===4)e.push({t:'h',px:50+r%400});
if(ch%9===3)e.push({t:'e',px:150+r%300,ey:30+r%50});
// Pine trees (more!)
e.push({t:'p',px:80+r%150});
e.push({t:'p',px:250+r2%150});
if(ch%2===0)e.push({t:'p',px:400+r3%150});
// Characters
if(ch%3===1)e.push({t:'char',px:180+r%300,ci:r%9});
if(ch%5===0)e.push({t:'char',px:50+r2%200,ci:(r*7)%9});

// === COINS — more frequent ===
e.push({t:'c',px:100+r%200,got:false});
e.push({t:'c',px:350+r2%200,got:false});
if(ch%2===0)e.push({t:'c',px:500+r3%80,got:false});

// === FUEL CANS — every ~4 chunks ===
if(ch%4===0)e.push({t:'f',px:200+r%300,got:false});
if(ch%7===3)e.push({t:'f',px:100+r2%400,got:false});

// === OBSTACLES — balanced density ===
// Rocks: appear from chunk 3, not every chunk
if(ch>2&&ch%2===0)e.push({t:'rock',px:150+r%250});
if(ch>6&&ch%3===0)e.push({t:'rock',px:400+r2%150});
// Logs: appear from chunk 4, spaced out
if(ch>3&&ch%3===1)e.push({t:'log',px:100+r%300});
if(ch>7&&ch%4===0)e.push({t:'log',px:380+r3%180});
// Boulders (big rocks, need to jump!)
if(ch>5&&ch%4===0)e.push({t:'boulder',px:200+r%250});
if(ch>10&&ch%5===2)e.push({t:'boulder',px:450+r2%100});
// Mud patches (less frequent)
if(ch>3&&ch%3===0)e.push({t:'mud',px:180+r2%300});
// Water streams
if(ch>4&&ch%5===2)e.push({t:'stream',px:150+r%350,w:50+r2%40});
// River fords (wide, must drive through — splashes!)
if(ch>2&&ch%4===1)e.push({t:'ford',px:150+r%300,w:70+r2%50});
if(ch>6&&ch%6===3)e.push({t:'ford',px:400+r3%150,w:60+r%40});
// Big trees (tall, wide trunk — must avoid or slow down)
if(ch>2&&ch%3===0)e.push({t:'bigtree',px:200+r%250});
if(ch>5&&ch%4===2)e.push({t:'bigtree',px:450+r2%100});
// Waterfalls with secret passage (bonus coins if you drive through!)
if(ch>5&&ch%8===3)e.push({t:'waterfall',px:250+r%200,secret:true,collected:false});
if(ch>10&&ch%11===7)e.push({t:'waterfall',px:100+r2%300,secret:true,collected:false});
// Bridges! (wooden bridge over gap — decorative + slight speed boost)
if(ch>3&&ch%6===2)e.push({t:'bridge',px:200+r%250,w:80+r2%40});
if(ch>8&&ch%9===5)e.push({t:'bridge',px:100+r3%300,w:60+r%30});
// Sheep flocks
if(ch>3&&ch%6===1)e.push({t:'flock',px:200+r%250,n:2+r2%2,dir:1,off:0});
// Yak (rare)
if(ch>8&&ch%9===4)e.push({t:'yak',px:250+r%200,dir:r2%2?1:-1,off:0});
// Ramp markers
if(ch>4&&ch%7===0)e.push({t:'ramp',px:300+r%200});
// Gas stations
if(ch>3&&ch%10===0)e.push({t:'gas',px:250+r%200});

// Filter: drop big-sprite overlaps. For sprites that take noticeable horizontal
// space, walk them in px order and skip any whose px is within MIN_GAP of the
// previously kept big sprite. Smaller items (coins, fuel, rocks, mud) are not
// filtered so density stays interesting.
var BIG_TYPES_=['y','h','p','char','bigtree','waterfall','gas','bridge','ford'];
var MIN_GAP_=70;
var bigs_=[];
for(var fi=0;fi<e.length;fi++){if(BIG_TYPES_.indexOf(e[fi].t)>=0)bigs_.push(e[fi]);}
bigs_.sort(function(a,b){return a.px-b.px;});
var keepBig_={};
var lastPx_=-1e9;
for(var fj=0;fj<bigs_.length;fj++){
  if(bigs_[fj].px-lastPx_>=MIN_GAP_){
    keepBig_[fj]=true;
    lastPx_=bigs_[fj].px;
  }
}
var bigKeepSet_=[];
for(var fk=0;fk<bigs_.length;fk++)if(keepBig_[fk])bigKeepSet_.push(bigs_[fk]);
e=e.filter(function(it){
  if(BIG_TYPES_.indexOf(it.t)<0)return true;
  return bigKeepSet_.indexOf(it)>=0;
});

bgC[ch]=e;return e;}

// === NOTIFICATION SYSTEM ===
function addNotif(text,color){notifications.push({text:text,color:color||'#FFD700',life:90,y:0});}

// === DRAW FUNCTIONS ===
function drawSky(){
var cycle=dist%2000;var nf=0;
if(cycle>1400&&cycle<1800)nf=(cycle-1400)/400;
else if(cycle>=1800)nf=1-(cycle-1800)/200;
nf=Math.max(0,Math.min(1,nf));
var g=c.createLinearGradient(0,0,0,H*0.55);
g.addColorStop(0,'rgb('+Math.round(74*(1-nf*0.7))+','+Math.round(144*(1-nf*0.5))+','+Math.round(217*(1-nf*0.3))+')');
g.addColorStop(0.4,'rgb('+Math.round(135*(1-nf*0.5))+','+Math.round(206*(1-nf*0.4))+','+Math.round(235*(1-nf*0.2))+')');
g.addColorStop(0.8,'rgb('+Math.round(201*(1-nf*0.4))+','+Math.round(228*(1-nf*0.3))+','+Math.round(242*(1-nf*0.2))+')');
g.addColorStop(1,'rgb('+Math.round(232*(1-nf*0.3))+','+Math.round(213*(1-nf*0.2))+','+Math.round(183*(1-nf*0.1))+')');
c.fillStyle=g;c.fillRect(0,0,W,H);
// Stars
if(nf>0.3){c.fillStyle='rgba(255,255,255,'+(nf*0.7)+')';
for(var si=0;si<40;si++){var stx=((si*137+50)-cam.x*0.005)%(W+100)-50;
c.beginPath();c.arc(stx,10+si*3%100,0.5+si%3*0.5,0,Math.PI*2);c.fill();}}
// Sun with glow
var sunX=W*0.82,sunY=50,sunR=28;
c.fillStyle='rgba(255,215,0,0.15)';c.beginPath();c.arc(sunX,sunY,sunR*2.5,0,Math.PI*2);c.fill();
c.fillStyle='rgba(255,215,0,0.3)';c.beginPath();c.arc(sunX,sunY,sunR*1.5,0,Math.PI*2);c.fill();
c.fillStyle='#FFD700';c.beginPath();c.arc(sunX,sunY,sunR,0,Math.PI*2);c.fill();
// Tunduk pattern on sun
c.strokeStyle='rgba(180,120,0,0.4)';c.lineWidth=1.5;
c.beginPath();c.arc(sunX,sunY,sunR*0.5,0,Math.PI*2);c.stroke();
for(var i=0;i<6;i++){var a=i*Math.PI/3;c.beginPath();c.moveTo(sunX,sunY);c.lineTo(sunX+Math.cos(a)*sunR*0.5,sunY+Math.sin(a)*sunR*0.5);c.stroke();}
// Clouds (parallax, fluffy)
c.fillStyle='rgba(255,255,255,0.25)';
for(var ci=0;ci<8;ci++){var cx=((ci*280+60)-cam.x*0.015)%(W+400)-200;var cy=30+ci*10;
c.beginPath();c.ellipse(cx,cy,50+ci*6,10+ci*2,0,0,Math.PI*2);c.fill();
c.beginPath();c.ellipse(cx+20,cy-4,30+ci*3,8,0,0,Math.PI*2);c.fill();}
// Mountain range (far)
var mg=c.createLinearGradient(0,H*0.25,0,H*0.55);mg.addColorStop(0,'#7B8FA1');mg.addColorStop(1,'#5A6A7A');
c.fillStyle=mg;c.beginPath();c.moveTo(-5,H*0.55);
for(var mx=0;mx<=W+10;mx+=6){var wx=mx+cam.x*0.06;c.lineTo(mx,H*0.36+Math.sin(wx/200)*30+Math.sin(wx/80+2)*18+Math.sin(wx/400+5)*22);}
c.lineTo(W+10,H*0.55);c.closePath();c.fill();
// Snow caps
c.fillStyle='rgba(240,245,250,0.7)';c.beginPath();c.moveTo(-5,H*0.55);
for(var sx=0;sx<=W+10;sx+=6){var swx=sx+cam.x*0.06;var smy=H*0.36+Math.sin(swx/200)*30+Math.sin(swx/80+2)*18+Math.sin(swx/400+5)*22;c.lineTo(sx,smy+4);}
c.lineTo(W+10,H*0.55);c.closePath();c.fill();
// Closer mountains
var mg2=c.createLinearGradient(0,H*0.4,0,H*0.58);mg2.addColorStop(0,'#5C6B7A');mg2.addColorStop(1,'#3E4E5A');
c.fillStyle=mg2;c.beginPath();c.moveTo(-5,H*0.58);
for(var m2=0;m2<=W+10;m2+=5){var w2=m2+cam.x*0.12;c.lineTo(m2,H*0.45+Math.sin(w2/130)*22+Math.sin(w2/55+3)*12+Math.sin(w2/250+8)*18);}
c.lineTo(W+10,H*0.58);c.closePath();c.fill();
// Individual mountains (drawn here so they're BEHIND everything else)
var sc2=Math.floor(cam.x/600);
for(var ch2=sc2-1;ch2<sc2+4;ch2++){var els2=bgG(ch2);
for(var i2=0;i2<els2.length;i2++){var e2=els2[i2];
if(e2.t==='m'){var bx2=ch2*600+e2.px-cam.x*0.15;var mh=e2.h*3;
var mg3=c.createLinearGradient(bx2,H*0.1-mh*0.3,bx2,H*0.6);mg3.addColorStop(0,'#7B8FA1');mg3.addColorStop(0.5,'#5C6B7A');mg3.addColorStop(1,'#4A5A6A');
c.fillStyle=mg3;c.beginPath();c.moveTo(bx2-mh*1.8,H*0.6);c.lineTo(bx2-mh*0.3,H*0.2-mh*0.4);c.lineTo(bx2,H*0.15-mh*0.5);c.lineTo(bx2+mh*0.35,H*0.2-mh*0.35);c.lineTo(bx2+mh*1.8,H*0.6);c.fill();
c.fillStyle='#ECF0F1';c.beginPath();c.moveTo(bx2-mh*0.2,H*0.15-mh*0.5+mh*0.12);c.lineTo(bx2,H*0.15-mh*0.5);c.lineTo(bx2+mh*0.18,H*0.15-mh*0.5+mh*0.1);c.fill();
c.fillStyle='rgba(0,0,0,0.05)';c.beginPath();c.moveTo(bx2,H*0.15-mh*0.5);c.lineTo(bx2+mh*1.8,H*0.6);c.lineTo(bx2+mh*0.5,H*0.6);c.fill();}}}
}

function drawBg(){
var sc=Math.floor(cam.x/600),t=Date.now()/1000;
for(var ch=sc-1;ch<sc+4;ch++){var els=bgG(ch);
for(var i=0;i<els.length;i++){var e=els[i],bx;
// Mountains drawn in drawSky now — skip here
if(e.t==='m') continue;
// Yurts — HUGE (5x)
if(e.t==='y'){bx=ch*600+e.px-cam.x;var yy=tY(ch*600+e.px);
c.fillStyle='#F5E6CA';c.beginPath();c.arc(bx,yy-45,70,Math.PI,0);c.lineTo(bx+70,yy);c.lineTo(bx-70,yy);c.fill();
c.strokeStyle='#CC3333';c.lineWidth=5;c.beginPath();c.arc(bx,yy-45,70,Math.PI+0.15,Math.PI*2-0.15);c.stroke();
// Decorative patterns
c.strokeStyle='#CC3333';c.lineWidth=2;c.beginPath();c.arc(bx,yy-45,55,Math.PI+0.3,Math.PI*2-0.3);c.stroke();
c.fillStyle='#8B4513';c.fillRect(bx-12,yy-40,24,40);
// Tunduk
c.fillStyle='#8B4513';c.beginPath();c.arc(bx,yy-115,10,0,Math.PI*2);c.fill();
c.strokeStyle='#A0522D';c.lineWidth=2;c.beginPath();c.arc(bx,yy-115,7,0,Math.PI*2);c.stroke();
// Smoke (big puffs)
c.fillStyle='rgba(200,200,200,0.2)';
c.beginPath();c.arc(bx+Math.sin(t)*10,yy-130,12+Math.sin(t*1.5)*4,0,Math.PI*2);c.fill();
c.beginPath();c.arc(bx+Math.sin(t+1)*15,yy-150,10+Math.sin(t*2)*3,0,Math.PI*2);c.fill();
c.beginPath();c.arc(bx+Math.sin(t+2)*20,yy-170,8+Math.sin(t*2.5)*2,0,Math.PI*2);c.fill();}
// Horses — HUGE, animated
if(e.t==='h'){bx=ch*600+e.px-cam.x;var hy=tY(ch*600+e.px)-25;
// Body (big ellipse)
c.fillStyle='#5D4037';c.beginPath();c.ellipse(bx,hy-35,45,25,0,0,Math.PI*2);c.fill();
// Legs (animated trot, thick)
var legOff=Math.sin(t*3+ch)*8;
c.fillRect(bx-30,hy-10,8,35+legOff);c.fillRect(bx-10,hy-10,8,35-legOff);
c.fillRect(bx+10,hy-10,8,35+legOff);c.fillRect(bx+25,hy-10,8,35-legOff);
// Neck + head
c.fillRect(bx+35,hy-70,12,40);
c.beginPath();c.ellipse(bx+40,hy-80,16,11,0.3,0,Math.PI*2);c.fill();
// Eye
c.fillStyle='#000';c.beginPath();c.arc(bx+45,hy-82,3,0,Math.PI*2);c.fill();
// Mane
c.fillStyle='#3E2723';c.fillRect(bx+30,hy-70,6,30);
// Tail (flowing)
c.strokeStyle='#3E2723';c.lineWidth=6;c.beginPath();c.moveTo(bx-40,hy-30);c.quadraticCurveTo(bx-60,hy-20+Math.sin(t*2)*10,bx-55,hy+5);c.stroke();
// Rider
c.fillStyle='#C0392B';c.beginPath();c.ellipse(bx+5,hy-65,14,18,0,0,Math.PI*2);c.fill();
c.fillStyle='#F5CBA7';c.beginPath();c.arc(bx+5,hy-88,12,0,Math.PI*2);c.fill();
// Kalpak hat (big)
c.fillStyle='#FFF';c.beginPath();c.moveTo(bx-5,hy-100);c.lineTo(bx+5,hy-112);c.lineTo(bx+15,hy-100);c.fill();
c.strokeStyle='#CC3333';c.lineWidth=1.5;c.beginPath();c.moveTo(bx-3,hy-100);c.lineTo(bx+13,hy-100);c.stroke();}
// Eagles — HUGE wingspan
if(e.t==='e'){bx=ch*600+e.px-cam.x+Math.sin(t*0.7+ch)*80;var ey=e.ey*2+Math.sin(t*0.5+ch*2)*20;var ws=100+Math.sin(t*2)*25;
c.fillStyle='#3E2723';c.beginPath();c.moveTo(bx,ey);
c.quadraticCurveTo(bx-ws*0.4,ey-ws*0.3,bx-ws,ey-5);
c.quadraticCurveTo(bx-ws*0.4,ey+5,bx,ey+6);
c.quadraticCurveTo(bx+ws*0.4,ey+5,bx+ws,ey-5);
c.quadraticCurveTo(bx+ws*0.4,ey-ws*0.3,bx,ey);c.fill();
// Body detail
c.fillStyle='#4E342E';c.beginPath();c.ellipse(bx,ey+2,12,8,0,0,Math.PI*2);c.fill();
// Head
c.fillStyle='#5D4037';c.beginPath();c.arc(bx+8,ey-4,7,0,Math.PI*2);c.fill();
// Beak (golden)
c.fillStyle='#F39C12';c.beginPath();c.moveTo(bx+14,ey-5);c.lineTo(bx+24,ey-2);c.lineTo(bx+14,ey);c.fill();
// Eye
c.fillStyle='#FFF';c.beginPath();c.arc(bx+10,ey-6,2.5,0,Math.PI*2);c.fill();
c.fillStyle='#000';c.beginPath();c.arc(bx+10,ey-6,1.5,0,Math.PI*2);c.fill();}
// Pine trees — HUGE
if(e.t==='p'){bx=ch*600+e.px-cam.x;var py=tY(ch*600+e.px)-40;
// Trunk (thick)
c.fillStyle='#4E342E';c.fillRect(bx-8,py-20,16,60);
// Bark lines
c.strokeStyle='rgba(0,0,0,0.1)';c.lineWidth=1;
c.beginPath();c.moveTo(bx-4,py-15);c.lineTo(bx-3,py+30);c.stroke();
c.beginPath();c.moveTo(bx+4,py-10);c.lineTo(bx+5,py+25);c.stroke();
// Canopy layers (massive!)
c.fillStyle='#1B5E20';c.beginPath();c.moveTo(bx,py-120);c.lineTo(bx-45,py-20);c.lineTo(bx+45,py-20);c.fill();
c.fillStyle='#2E7D32';c.beginPath();c.moveTo(bx,py-155);c.lineTo(bx-35,py-70);c.lineTo(bx+35,py-70);c.fill();
c.fillStyle='#388E3C';c.beginPath();c.moveTo(bx,py-180);c.lineTo(bx-25,py-120);c.lineTo(bx+25,py-120);c.fill();
// Snow on top branches
c.fillStyle='rgba(255,255,255,0.3)';c.beginPath();c.moveTo(bx,py-180);c.lineTo(bx-12,py-155);c.lineTo(bx+12,py-155);c.fill();}
// Characters — HUGE, fixed parallax so they don't disappear
if(e.t==='char'){bx=ch*600+e.px-cam.x;var cy2=tY(ch*600+e.px)-20;
var ci2=charImgs[e.ci];if(ci2&&ci2.complete){c.imageSmoothingEnabled=false;c.drawImage(ci2,bx-75,cy2-150,150,150);c.imageSmoothingEnabled=true;}}
}}}

function drawForeground(){
var sc=Math.floor(cam.x/600),t=Date.now()/1000;
for(var ch=sc-1;ch<sc+4;ch++){var els=bgG(ch);
for(var i=0;i<els.length;i++){var e=els[i],bx,wx;
// === COINS ===
if(e.t==='c'&&!e.got){bx=ch*600+e.px-cam.x;wx=ch*600+e.px;var cy=tY(wx)-32;
// Animated floating coin
cy+=Math.sin(t*3+ch*2+i)*4;
c.fillStyle='#FFD700';c.shadowColor='#FFD700';c.shadowBlur=8;
c.beginPath();c.arc(bx,cy,8,0,Math.PI*2);c.fill();c.shadowBlur=0;
c.fillStyle='#B8860B';c.font='bold 10px system-ui';c.textAlign='center';c.fillText('$',bx,cy+4);
// Sparkle
c.fillStyle='rgba(255,255,255,'+(0.3+Math.sin(t*5+i)*0.3)+')';
c.beginPath();c.arc(bx-3,cy-4,2,0,Math.PI*2);c.fill();
if(Math.abs(car.x-wx)<25&&Math.abs(car.y-cy)<40){e.got=true;coins+=10;addNotif('+10 💰','#FFD700');
// Coin particles
for(var cp=0;cp<5;cp++)particles.push({x:bx,y:cy,vx:(Math.random()-0.5)*4,vy:-2-Math.random()*3,life:15+Math.random()*10,ml:25,gold:true});}}
// === FUEL CANS ===
if(e.t==='f'&&!e.got){bx=ch*600+e.px-cam.x;wx=ch*600+e.px;var fy=tY(wx)-28;
fy+=Math.sin(t*2+ch)*3;
// Can body
c.fillStyle='#e74c3c';c.beginPath();
c.roundRect(bx-6,fy-10,12,18,3);c.fill();
c.fillStyle='#c0392b';c.fillRect(bx-4,fy-12,8,4);
c.fillStyle='#fff';c.font='bold 9px system-ui';c.textAlign='center';c.fillText('⛽',bx,fy+3);
// Glow when low fuel
if(car.fuel<30){c.strokeStyle='rgba(231,76,60,'+(0.5+Math.sin(t*4)*0.3)+')';c.lineWidth=2;c.beginPath();c.arc(bx,fy,14,0,Math.PI*2);c.stroke();}
if(Math.abs(car.x-wx)<22&&Math.abs(car.y-fy)<35){e.got=true;car.fuel=Math.min(100,car.fuel+25);addNotif('+25⛽ FUEL','#2ecc71');screenShake=5;}}
// === ROCKS ===
if(e.t==='rock'){bx=ch*600+e.px-cam.x;wx=ch*600+e.px;var ry=tY(wx);
// Better rock graphics
c.fillStyle='#6B6B6B';c.beginPath();c.ellipse(bx,ry-7,14,10,0,0,Math.PI*2);c.fill();
c.fillStyle='#888';c.beginPath();c.ellipse(bx-2,ry-10,8,5,0.2,0,Math.PI*2);c.fill();
c.fillStyle='#555';c.beginPath();c.ellipse(bx+4,ry-5,5,3,-0.3,0,Math.PI*2);c.fill();
// Shadow
c.fillStyle='rgba(0,0,0,0.15)';c.beginPath();c.ellipse(bx,ry-1,12,3,0,0,Math.PI*2);c.fill();
if(Math.abs(car.x-wx)<16&&car.grounded&&Math.abs(car.y-ry)<18){car.vx*=0.25;car.vy=-3.5;screenShake=8;addNotif('💥 ROCK!','#e74c3c');
for(var rp=0;rp<4;rp++)particles.push({x:bx,y:ry-5,vx:(Math.random()-0.5)*5,vy:-2-Math.random()*3,life:12,ml:12,dirt:true});}}
// === LOGS ===
if(e.t==='log'){bx=ch*600+e.px-cam.x;wx=ch*600+e.px;var ly=tY(wx);
c.fillStyle='#5D4037';c.beginPath();c.roundRect(bx-18,ly-7,36,7,3);c.fill();
c.fillStyle='#795548';c.beginPath();c.arc(bx-18,ly-3.5,3.5,0,Math.PI*2);c.fill();
c.beginPath();c.arc(bx+18,ly-3.5,3.5,0,Math.PI*2);c.fill();
// Wood grain
c.strokeStyle='rgba(0,0,0,0.15)';c.lineWidth=0.5;
c.beginPath();c.moveTo(bx-15,ly-5);c.lineTo(bx+15,ly-5);c.stroke();
c.beginPath();c.moveTo(bx-12,ly-3);c.lineTo(bx+12,ly-3);c.stroke();
if(Math.abs(car.x-wx)<20&&car.grounded&&Math.abs(car.y-ly)<14){car.vx*=0.4;car.vy=-2.5;screenShake=5;}}
// === BOULDERS (big, need jump) ===
if(e.t==='boulder'){bx=ch*600+e.px-cam.x;wx=ch*600+e.px;var by=tY(wx);
c.fillStyle='#5D5D5D';c.beginPath();c.arc(bx,by-14,16,0,Math.PI*2);c.fill();
c.fillStyle='#777';c.beginPath();c.arc(bx-4,by-18,8,0,Math.PI*2);c.fill();
c.fillStyle='#444';c.beginPath();c.arc(bx+5,by-10,6,0,Math.PI*2);c.fill();
// Warning indicator
c.fillStyle='rgba(231,76,60,'+(0.4+Math.sin(t*3)*0.2)+')';c.font='bold 12px system-ui';c.textAlign='center';c.fillText('⚠️',bx,by-35);
c.fillStyle='rgba(0,0,0,0.2)';c.beginPath();c.ellipse(bx,by-1,14,4,0,0,Math.PI*2);c.fill();
if(Math.abs(car.x-wx)<18&&car.grounded&&Math.abs(car.y-by)<22){car.vx*=0.15;car.vy=-4;screenShake=12;addNotif('💥 BOULDER!','#e74c3c');coins=Math.max(0,coins-5);}}
// === MUD ===
if(e.t==='mud'){bx=ch*600+e.px-cam.x;wx=ch*600+e.px;var my=tY(wx);
c.fillStyle='rgba(101,67,33,0.6)';c.beginPath();c.ellipse(bx,my-1,22,5,0,0,Math.PI*2);c.fill();
c.fillStyle='rgba(139,90,43,0.4)';c.beginPath();c.ellipse(bx+5,my-2,10,3,0.2,0,Math.PI*2);c.fill();
// Mud splatter dots
c.fillStyle='rgba(101,67,33,0.3)';
for(var md=0;md<4;md++){c.beginPath();c.arc(bx-12+md*8,my-4+md%2*2,2,0,Math.PI*2);c.fill();}
if(Math.abs(car.x-wx)<24&&car.grounded&&Math.abs(car.y-my)<14){car.vx*=0.9;
// Mud spray
if(Math.abs(car.vx)>1.5)particles.push({x:bx,y:my-3,vx:(Math.random()-0.5)*3,vy:-1.5-Math.random()*2,life:10,ml:10,dirt:true});}}
// === WATER STREAM ===
if(e.t==='stream'){bx=ch*600+e.px-cam.x;wx=ch*600+e.px;var sy=tY(wx);
var sw=e.w;
c.fillStyle='rgba(41,128,185,0.5)';c.beginPath();c.ellipse(bx,sy-1,sw/2,5,0,0,Math.PI*2);c.fill();
c.fillStyle='rgba(52,152,219,0.3)';c.beginPath();c.ellipse(bx,sy-2,sw/2-4,3,0,0,Math.PI*2);c.fill();
// Animated ripples
c.strokeStyle='rgba(255,255,255,0.2)';c.lineWidth=1;
for(var rip=0;rip<3;rip++){var rx=bx-sw/3+rip*sw/3+Math.sin(t*2+rip)*5;
c.beginPath();c.ellipse(rx,sy-2,4+Math.sin(t*3+rip)*2,2,0,0,Math.PI*2);c.stroke();}
if(Math.abs(car.x-wx)<sw/2&&car.grounded&&Math.abs(car.y-sy)<14){car.vx*=0.85;
// Water splash
if(Math.abs(car.vx)>2){for(var wp=0;wp<3;wp++)particles.push({x:car.x-cam.x,y:sy-3,vx:(Math.random()-0.5)*4,vy:-2-Math.random()*3,life:12,ml:12,water:true});}}}
// === RIVER FORD (wide, dramatic water crossing) ===
if(e.t==='ford'){bx=ch*600+e.px-cam.x;wx=ch*600+e.px;var fdy=tY(wx);var fw=e.w;
// River bed (darker)
c.fillStyle='rgba(30,80,120,0.4)';c.beginPath();c.ellipse(bx,fdy+2,fw/2+5,8,0,0,Math.PI*2);c.fill();
// Water surface
c.fillStyle='rgba(41,128,185,0.6)';c.beginPath();c.ellipse(bx,fdy-1,fw/2,6,0,0,Math.PI*2);c.fill();
c.fillStyle='rgba(52,152,219,0.4)';c.beginPath();c.ellipse(bx,fdy-2,fw/2-6,4,0,0,Math.PI*2);c.fill();
// Current lines (animated)
c.strokeStyle='rgba(255,255,255,0.25)';c.lineWidth=1.5;
for(var cl=0;cl<4;cl++){var clx=bx-fw/3+cl*fw/4+Math.sin(t*1.5+cl*2)*8;
c.beginPath();c.moveTo(clx-8,fdy-1);c.quadraticCurveTo(clx,fdy-3,clx+8,fdy-1);c.stroke();}
// Rocks in river
c.fillStyle='rgba(100,100,100,0.5)';
c.beginPath();c.arc(bx-fw/4,fdy-2,4,0,Math.PI*2);c.fill();
c.beginPath();c.arc(bx+fw/5,fdy-1,3,0,Math.PI*2);c.fill();
// Collision: slow down + big splash
if(Math.abs(car.x-wx)<fw/2&&car.grounded&&Math.abs(car.y-fdy)<14){
car.vx*=0.92;
// Splash particles
if(Math.abs(car.vx)>1.5&&Math.floor(Date.now()/100)%3===0){
for(var sp2=0;sp2<4;sp2++)particles.push({x:car.x-cam.x+(Math.random()-0.5)*20,y:fdy-4,vx:(Math.random()-0.5)*5,vy:-3-Math.random()*4,life:15,ml:15,water:true});}}}
// === BIG TREE (must avoid — slows you down) ===
if(e.t==='bigtree'){bx=ch*600+e.px-cam.x;wx=ch*600+e.px;var tty=tY(wx);
// Trunk
c.fillStyle='#5D4037';c.fillRect(bx-5,tty-40,10,40);
// Canopy (medium, not huge)
c.fillStyle='#1B5E20';c.beginPath();c.arc(bx,tty-48,18,0,Math.PI*2);c.fill();
c.fillStyle='#2E7D32';c.beginPath();c.arc(bx-6,tty-42,12,0,Math.PI*2);c.fill();
c.beginPath();c.arc(bx+8,tty-44,10,0,Math.PI*2);c.fill();
c.fillStyle='#388E3C';c.beginPath();c.arc(bx+2,tty-56,9,0,Math.PI*2);c.fill();
// Shadow
c.fillStyle='rgba(0,0,0,0.08)';c.beginPath();c.ellipse(bx,tty+1,14,3,0,0,Math.PI*2);c.fill();
// Collision
if(Math.abs(car.x-wx)<9&&car.grounded&&Math.abs(car.y-tty)<14){car.vx*=0.2;car.vy=-2;screenShake=8;addNotif('🌳 ALBERO!','#2E7D32');}}
// === WATERFALL with SECRET PASSAGE (stay under to unlock coin trail!) ===
if(e.t==='waterfall'){bx=ch*600+e.px-cam.x;wx=ch*600+e.px;var wfy=tY(wx);
// Cliff face (big, dramatic)
c.fillStyle='#5A5A5A';c.fillRect(bx-25,wfy-130,50,130);
c.fillStyle='#4A4A4A';c.fillRect(bx-20,wfy-125,40,120);
// Rock texture
c.fillStyle='rgba(0,0,0,0.08)';c.fillRect(bx-15,wfy-100,12,30);c.fillRect(bx+5,wfy-80,10,25);
// Ledge at top
c.fillStyle='#6B6B6B';c.fillRect(bx-30,wfy-132,60,8);
// Water streams falling (animated, multiple)
for(var wf=0;wf<8;wf++){
var wfx=bx-14+wf*4+Math.sin(t*4+wf*1.3)*3;
var wfAlpha=0.3+Math.sin(t*3+wf*2)*0.15;
c.fillStyle='rgba(100,180,255,'+wfAlpha+')';
c.fillRect(wfx,wfy-124,3+Math.sin(t*5+wf)*1,118);}
// Splash at base (animated)
c.fillStyle='rgba(150,210,255,0.4)';
for(var sp=0;sp<6;sp++){var spx=bx-18+sp*7+Math.sin(t*4+sp)*4;var spy=wfy-5+Math.sin(t*3+sp*2)*3;
c.beginPath();c.arc(spx,spy,4+Math.sin(t*5+sp)*2,0,Math.PI*2);c.fill();}
// Mist cloud (big, animated)
c.fillStyle='rgba(200,230,255,0.25)';
c.beginPath();c.arc(bx,wfy-15,30+Math.sin(t*1.5)*8,0,Math.PI*2);c.fill();
c.beginPath();c.arc(bx-15,wfy-25,18+Math.sin(t*2)*5,0,Math.PI*2);c.fill();
c.beginPath();c.arc(bx+18,wfy-20,15+Math.sin(t*2.5)*4,0,Math.PI*2);c.fill();
// Pool at base
c.fillStyle='rgba(41,128,185,0.5)';c.beginPath();c.ellipse(bx,wfy+4,35,7,0,0,Math.PI*2);c.fill();
c.fillStyle='rgba(52,152,219,0.3)';c.beginPath();c.ellipse(bx,wfy+2,28,5,0,0,Math.PI*2);c.fill();
// SECRET PASSAGE indicator (golden glow behind water)
if(!e.collected){
// Pulsing golden cave entrance
var glowA=0.4+Math.sin(t*3)*0.2;
c.fillStyle='rgba(255,215,0,'+glowA+')';c.beginPath();c.arc(bx,wfy-50,12,0,Math.PI*2);c.fill();
c.fillStyle='rgba(255,180,0,'+(glowA*0.6)+')';c.beginPath();c.arc(bx,wfy-50,20,0,Math.PI*2);c.fill();
// Sparkles
for(var sk=0;sk<4;sk++){var ska=t*2+sk*Math.PI/2;
c.fillStyle='rgba(255,255,200,'+(0.5+Math.sin(t*4+sk)*0.3)+')';
c.beginPath();c.arc(bx+Math.cos(ska)*15,wfy-50+Math.sin(ska)*10,2,0,Math.PI*2);c.fill();}
// Text hint
c.fillStyle='rgba(255,215,0,'+(0.5+Math.sin(t*2)*0.3)+')';c.font='bold 11px system-ui';c.textAlign='center';
c.fillText('⭐ SEGRETO',bx,wfy-75);}
// SECRET MECHANIC: drive under waterfall = unlock coin trail!
if(Math.abs(car.x-wx)<20&&Math.abs(car.y-wfy)<25&&!e.collected){
e.collected=true;
// Big reward!
coins+=100;
addNotif('🌊✨ STRADA SEGRETA! +100','#FFD700');
screenShake=5;
// Explosion of coins and water
for(var sc3=0;sc3<12;sc3++){
particles.push({x:bx,y:wfy-40,vx:(Math.random()-0.5)*8,vy:-3-Math.random()*5,life:25,ml:25,gold:true});
particles.push({x:bx,y:wfy-20,vx:(Math.random()-0.5)*6,vy:-2-Math.random()*4,life:18,ml:18,water:true});}
// Spawn bonus coins ahead (the "secret road")
for(var bc=1;bc<=5;bc++){
var bcx=wx+bc*40;var bcy=tY(bcx)-35;
particles.push({x:bcx-cam.x,y:bcy,vx:0,vy:-0.5,life:120,ml:120,gold:true});}}}
// === SHEEP FLOCK ===
if(e.t==='flock'){bx=ch*600+e.px-cam.x;wx=ch*600+e.px;var fy2=tY(wx);
e.off+=e.dir*0.25;if(Math.abs(e.off)>50)e.dir*=-1;
for(var si=0;si<e.n;si++){var sx=bx+e.off+si*18-e.n*9;var sy2=fy2;
c.fillStyle='#FAFAFA';c.beginPath();c.ellipse(sx,sy2-6,7,5,0,0,Math.PI*2);c.fill();
c.fillStyle='#333';c.beginPath();c.arc(sx+(e.dir>0?6:-6),sy2-8,2.5,0,Math.PI*2);c.fill();
c.fillStyle='#DDD';c.fillRect(sx-2,sy2-1,2,4);c.fillRect(sx+1,sy2-1,2,4);}
// Collision with any sheep
if(Math.abs(car.x-(wx+e.off))<e.n*10&&car.grounded&&Math.abs(car.y-fy2)<16){car.vx*=0.3;addNotif('🐑 BAAAH!','#fff');}}
// === YAK ===
if(e.t==='yak'){bx=ch*600+e.px-cam.x;wx=ch*600+e.px;var yky=tY(wx);
e.off+=e.dir*0.15;if(Math.abs(e.off)>40)e.dir*=-1;
var yx=bx+e.off;
// Big yak body
c.fillStyle='#3E2723';c.beginPath();c.ellipse(yx,yky-10,16,10,0,0,Math.PI*2);c.fill();
// Legs
c.fillStyle='#2C1810';c.fillRect(yx-12,yky-2,4,10);c.fillRect(yx-4,yky-2,4,10);c.fillRect(yx+4,yky-2,4,10);c.fillRect(yx+10,yky-2,4,10);
// Head
c.fillStyle='#4E342E';c.beginPath();c.arc(yx+(e.dir>0?14:-14),yky-14,7,0,Math.PI*2);c.fill();
// Horns
c.strokeStyle='#8D6E63';c.lineWidth=2;
c.beginPath();c.arc(yx+(e.dir>0?16:-16),yky-20,5,0.5,Math.PI-0.5);c.stroke();
if(Math.abs(car.x-(wx+e.off))<20&&car.grounded&&Math.abs(car.y-yky)<20){car.vx*=0.15;car.vy=-3;screenShake=10;addNotif('🐂 YAK!','#8D6E63');}}
// === RAMP ===
if(e.t==='ramp'){bx=ch*600+e.px-cam.x;wx=ch*600+e.px;var rpy=tY(wx);
c.fillStyle='#e8732a';c.beginPath();c.moveTo(bx-20,rpy);c.lineTo(bx+5,rpy-12);c.lineTo(bx+20,rpy);c.fill();
c.fillStyle='#fff';c.font='bold 10px system-ui';c.textAlign='center';c.fillText('🚀',bx,rpy-16);
if(Math.abs(car.x-wx)<15&&car.grounded&&car.vx>2){car.vy=-5-car.vx*0.5;car.grounded=false;addNotif('🚀 LAUNCH!','#e8732a');}}
// === BRIDGE (wooden bridge — decorative, slight speed boost) ===
if(e.t==='bridge'){bx=ch*600+e.px-cam.x;wx=ch*600+e.px;var bry=tY(wx);var bw=e.w;
// Bridge deck (wooden planks)
c.fillStyle='#8B6914';c.fillRect(bx-bw/2,bry-4,bw,6);
// Planks
c.strokeStyle='#6D4C2A';c.lineWidth=1;
for(var pl=0;pl<bw;pl+=8){c.beginPath();c.moveTo(bx-bw/2+pl,bry-4);c.lineTo(bx-bw/2+pl,bry+2);c.stroke();}
// Railings
c.fillStyle='#5D4037';
c.fillRect(bx-bw/2,bry-18,3,14);c.fillRect(bx+bw/2-3,bry-18,3,14);
c.fillRect(bx-bw/2,bry-18,bw,3);
// Support posts underneath
c.fillStyle='#4E342E';
c.fillRect(bx-bw/3,bry+2,4,12);c.fillRect(bx+bw/3-4,bry+2,4,12);
// Cross beams
c.strokeStyle='#5D4037';c.lineWidth=2;
c.beginPath();c.moveTo(bx-bw/3,bry+2);c.lineTo(bx+bw/3,bry+14);c.stroke();
c.beginPath();c.moveTo(bx+bw/3,bry+2);c.lineTo(bx-bw/3,bry+14);c.stroke();
// Speed boost on bridge
if(Math.abs(car.x-wx)<bw/2&&car.grounded&&Math.abs(car.y-bry)<12){car.vx*=1.003;}}
// === GAS STATION ===
if(e.t==='gas'){bx=ch*600+e.px-cam.x;wx=ch*600+e.px;var gy=tY(wx);
c.fillStyle='#ecf0f1';c.fillRect(bx-20,gy-42,40,6);
c.fillStyle='#bdc3c7';c.fillRect(bx-2,gy-48,4,6);
c.fillStyle='#e74c3c';c.beginPath();c.roundRect(bx-9,gy-36,18,32,3);c.fill();
c.fillStyle='#c0392b';c.fillRect(bx-7,gy-34,14,10);
c.fillStyle='#fff';c.font='bold 12px system-ui';c.textAlign='center';c.fillText('⛽',bx,gy-14);
// Refuel when stopped near
if(Math.abs(car.x-wx)<28&&car.grounded&&Math.abs(car.y-gy)<22&&Math.abs(car.vx)<1.5){
car.fuel=Math.min(100,car.fuel+0.8);
c.fillStyle='rgba(46,204,113,0.9)';c.font='bold 14px system-ui';c.fillText('⛽ REFUELING...',bx,gy-52);}}
}}}

function drawTerrain(){
// Ground fill with gradient
var tg=c.createLinearGradient(0,H*0.5,0,H);
tg.addColorStop(0,'#4CAF50');tg.addColorStop(0.08,'#43A047');tg.addColorStop(0.3,'#2E7D32');tg.addColorStop(1,'#1B5E20');
c.fillStyle=tg;c.beginPath();c.moveTo(-5,H);
for(var px=-5;px<=W+5;px+=3)c.lineTo(px,tY(px+cam.x));
c.lineTo(W+5,H);c.closePath();c.fill();
// Road signs at stages
for(var si=0;si<STAGES.length;si++){
var s=STAGES[si];var signX=s.d*10+200;var screenX=signX-cam.x;
if(screenX<-100||screenX>W+100)continue;
var signY=tY(signX)-5;
// Post
c.fillStyle='#5D4037';c.fillRect(screenX-3,signY-70,6,70);
// Sign board: width measured from actual font metrics so emojis + variable-width
// glyphs always fit. Text is drawn with textBaseline='middle' centered in board.
c.font='bold 14px Arial,system-ui';c.textAlign='center';c.textBaseline='middle';
var label=s.e+' '+s.n;
var measured=c.measureText(label).width;
var tw=Math.max(80,measured+24);
var boardTop=signY-92,boardH=34;
c.fillStyle='#1B5E20';c.beginPath();c.roundRect(screenX-tw/2,boardTop,tw,boardH,6);c.fill();
c.strokeStyle='#fff';c.lineWidth=2;c.strokeRect(screenX-tw/2+3,boardTop+3,tw-6,boardH-6);
c.fillStyle='#fff';
c.fillText(label,screenX,boardTop+boardH/2);
c.textBaseline='alphabetic';}}

function drawCar(){
var sx=car.x-cam.x+Math.random()*screenShake*(Math.random()>0.5?1:-1);
var sy=car.y+Math.random()*screenShake*(Math.random()>0.5?1:-1);
c.save();c.translate(sx,sy-14);c.rotate(car.angle);
if(carImg&&carImg.complete){c.save();c.scale(-1,1);c.drawImage(carImg,-38,-22,76,40);c.restore();}
else{
// Fallback car drawing (better)
c.fillStyle='#2d6b3f';c.beginPath();c.roundRect(-28,-14,56,18,4);c.fill();
c.fillStyle='#1a5c38';c.beginPath();c.roundRect(-14,-22,28,10,3);c.fill();
c.fillStyle='rgba(135,206,235,0.6)';c.fillRect(-12,-20,24,7);}
// Wheels with better detail
car.wr+=car.vx*0.12;
for(var wi=-1;wi<=1;wi+=2){c.save();c.translate(wi*WB,10);
// Tire
c.fillStyle='#1a1a1a';c.beginPath();c.arc(0,0,WR,0,Math.PI*2);c.fill();
// Tire tread
c.strokeStyle='#333';c.lineWidth=1;c.beginPath();c.arc(0,0,WR-1,0,Math.PI*2);c.stroke();
// Rim
c.fillStyle='#AAA';c.beginPath();c.arc(0,0,WR*0.5,0,Math.PI*2);c.fill();
// Hub
c.fillStyle='#666';c.beginPath();c.arc(0,0,WR*0.2,0,Math.PI*2);c.fill();
// Spokes (rotating)
c.save();c.rotate(car.wr);c.strokeStyle='#888';c.lineWidth=1.5;
for(var sp=0;sp<5;sp++){var a=sp*Math.PI*2/5;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(a)*WR*0.45,Math.sin(a)*WR*0.45);c.stroke();}
c.restore();c.restore();}
c.restore();

// Exhaust smoke when accelerating
if(gasOn&&car.fuel>0&&car.grounded){
particles.push({x:sx+Math.cos(car.angle)*30,y:sy-4,vx:0.5+Math.random(),vy:-0.5-Math.random()*1.2,life:15+Math.random()*8,ml:23,smoke:true});}
// Dust under wheels
if(car.grounded&&Math.abs(car.vx)>2.5){
particles.push({x:sx-Math.cos(car.angle)*WB,y:sy+8,vx:(Math.random()-0.5)*2-car.vx*0.08,vy:-0.5-Math.random()*1,life:10+Math.random()*6,ml:16,dust:true});}
// Brake sparks
if(brakeOn&&car.grounded&&Math.abs(car.vx)>3){
particles.push({x:sx-Math.cos(car.angle)*WB,y:sy+6,vx:-car.vx*0.3+Math.random()*2,vy:-1-Math.random()*2,life:6+Math.random()*4,ml:10,spark:true});}
}

function drawParticles(){
for(var i=particles.length-1;i>=0;i--){var p=particles[i];
p.x+=p.vx;p.y+=p.vy;p.vy+=0.08;p.life--;
if(p.life<=0){particles.splice(i,1);continue;}
var a=p.life/p.ml;
if(p.gold){c.fillStyle='rgba(255,215,0,'+(a*0.8)+')';c.beginPath();c.arc(p.x,p.y,3*a,0,Math.PI*2);c.fill();}
else if(p.water){c.fillStyle='rgba(52,152,219,'+(a*0.6)+')';c.beginPath();c.arc(p.x,p.y,2.5*a,0,Math.PI*2);c.fill();}
else if(p.spark){c.fillStyle='rgba(255,200,50,'+(a*0.9)+')';c.beginPath();c.arc(p.x,p.y,1.5*a,0,Math.PI*2);c.fill();}
else if(p.dirt){c.fillStyle='rgba(101,67,33,'+(a*0.5)+')';c.beginPath();c.arc(p.x,p.y,2.5*a,0,Math.PI*2);c.fill();}
else if(p.smoke){c.fillStyle='rgba(180,180,180,'+(a*0.3)+')';c.beginPath();c.arc(p.x,p.y,3*a,0,Math.PI*2);c.fill();}
else if(p.dust){c.fillStyle='rgba(160,140,100,'+(a*0.35)+')';c.beginPath();c.arc(p.x,p.y,2.5*a,0,Math.PI*2);c.fill();}
else{c.fillStyle='rgba(150,150,150,'+(a*0.3)+')';c.beginPath();c.arc(p.x,p.y,2*a,0,Math.PI*2);c.fill();}}}

function drawNotifications(){
for(var i=notifications.length-1;i>=0;i--){var n=notifications[i];
n.life--;n.y+=0.8;
if(n.life<=0){notifications.splice(i,1);continue;}
var a=Math.min(1,n.life/30);
c.fillStyle=n.color;c.globalAlpha=a;
c.font='bold 16px system-ui';c.textAlign='center';
c.fillText(n.text,W/2,H*0.35-n.y);
c.globalAlpha=1;}}

// === PHYSICS ===
var airTime=0,engineTorque=0.22,wheelSlip=0;

function update(){
if(over||!started)return;genT(car.x+1000);
// Screen shake decay
if(screenShake>0)screenShake*=0.85;if(screenShake<0.5)screenShake=0;

var cG=tY(car.x);var fG=tY(car.x+WB);var rG=tY(car.x-WB);
var groundAngle=Math.atan2(fG-rG,WB*2);
var penetration=(car.y+12)-cG;
var wasGrounded=car.grounded;
car.grounded=penetration>=-1;
car.vy+=G;

if(car.grounded){
  var springK=0.28,damperK=0.42;
  if(penetration>0){car.vy-=penetration*springK;car.vy*=(1-damperK);}
  if(car.y+12>cG){car.y=cG-12;if(car.vy>0)car.vy*=-0.15;}
  var angleDiff=groundAngle-car.angle;
  car.angVel+=angleDiff*0.14;car.angVel*=0.5;
  if(gasOn&&car.fuel>0){car.vx+=Math.cos(car.angle)*engineTorque;car.angVel-=0.002;}
  if(brakeOn){if(car.vx>0.5)car.vx*=0.91;else car.vx-=0.1;car.angVel+=0.0015;}
  car.vx*=0.994;
  car.vx+=Math.sin(groundAngle)*G*0.7;
  if(jumpOn&&car.grounded){car.vy=-6.5;car.grounded=false;jumpOn=false;addNotif('⬆ JUMP!','#f39c12');}
  wheelSlip=Math.abs(car.vx)>1&&gasOn?Math.abs(car.vx)*0.3:0;
  if(brakeOn&&Math.abs(car.vx)>2)wheelSlip=Math.abs(car.vx)*0.5;
  // Landing
  if(!wasGrounded&&car.grounded){
    if(airTime>0.4){var airCoins=Math.floor(airTime*20);coins+=airCoins;addNotif('🪂 Air +'+airCoins,'#3498db');}
    if(wasAir){var totalRot=Math.abs(car.angle-airA);
    if(totalRot>Math.PI*1.5){flipB++;var fc=100*flipB;coins+=fc;addNotif('🔄 FLIP x'+flipB+'! +'+fc,'#9b59b6');}}
    airTime=0;wasAir=false;
    if(Math.abs(car.angle)>1.5){endG();return;}}
}else{
  airTime+=1/60;
  if(!wasAir){wasAir=true;airA=car.angle;flipB=0;}
  if(gasOn)car.angVel-=0.0012;
  if(brakeOn)car.angVel+=0.0015;
  car.angVel*=0.996;
  if(car.angVel>0.03)car.angVel=0.03;
  if(car.angVel<-0.03)car.angVel=-0.03;
  wheelSlip=0;
}
car.angle+=car.angVel;
if(car.vx>9)car.vx=9;if(car.vx<-3)car.vx=-3;
car.x+=car.vx;car.y+=car.vy;
if(gasOn&&car.fuel>0)car.fuel-=0.07;
car.fuel-=0.006;
dist=Math.max(dist,Math.floor((car.x-200)/10));
cam.x+=(car.x-W*0.3-cam.x)*0.06;
cam.y+=(car.y-H*0.6-cam.y)*0.04;
if(car.fuel<=0){car.fuel=0;endG();}
if(car.y>H+100)endG();
if(car.grounded&&Math.abs(car.angle)>1.4)endG();
}

function endG(){over=true;if(dist>hi){hi=dist;localStorage.setItem('kg-game-high',String(hi));}}
function resetHi(){localStorage.removeItem('kg-game-high');hi=0;}

function drawHUD(){
// Update HTML HUD
document.getElementById('gD').textContent='🏔️ '+dist+'m';
document.getElementById('gH').textContent='🏆 Best: '+hi+'m';
document.getElementById('gC').textContent='💰 '+coins;
var ff=document.getElementById('gF');var fl=document.getElementById('gFL');
ff.style.width=car.fuel+'%';
fl.textContent='⛽ '+Math.round(car.fuel)+'%';
if(car.fuel<20){ff.style.background='#e74c3c';fl.style.color='#fff';
// Pulsing warning
if(Math.floor(Date.now()/300)%2===0)fl.style.textShadow='0 0 8px #e74c3c';else fl.style.textShadow='none';}
else if(car.fuel<40){ff.style.background='linear-gradient(90deg,#e74c3c,#f39c12)';fl.style.textShadow='none';}
else{ff.style.background='linear-gradient(90deg,#e8732a,#FFD700)';fl.style.textShadow='none';}

// Canvas HUD: speed indicator — moved above buttons
var speed=Math.abs(car.vx);
c.fillStyle='rgba(0,0,0,0.4)';c.beginPath();c.roundRect(W/2-30,H-130,60,22,6);c.fill();
c.fillStyle=speed>5?'#e74c3c':speed>3?'#f39c12':'#2ecc71';
c.font='bold 11px system-ui';c.textAlign='center';
c.fillText(Math.round(speed*15)+' km/h',W/2,H-115);

// Stage progress bar — above the speed
var curStage=0;for(var si=STAGES.length-1;si>=0;si--){if(dist>=STAGES[si].d){curStage=si;break;}}
var nextStage=Math.min(curStage+1,STAGES.length-1);
var stgPct=nextStage>curStage?(dist-STAGES[curStage].d)/(STAGES[nextStage].d-STAGES[curStage].d):1;
var barW=W*0.6,barX=(W-barW)/2,barY=H-155;
c.fillStyle='rgba(0,0,0,0.4)';c.beginPath();c.roundRect(barX,barY,barW,14,7);c.fill();
c.fillStyle='#e8732a';c.beginPath();c.roundRect(barX,barY,barW*Math.min(1,stgPct),14,7);c.fill();
c.strokeStyle='rgba(255,255,255,0.3)';c.lineWidth=1;c.beginPath();c.roundRect(barX,barY,barW,14,7);c.stroke();
c.fillStyle='#fff';c.font='bold 8px system-ui';c.textAlign='left';
c.fillText(STAGES[curStage].e+' '+STAGES[curStage].n,barX+4,barY+11);
c.textAlign='right';c.fillText(STAGES[nextStage].e+' '+STAGES[nextStage].n,barX+barW-4,barY+11);
// Stage unlock
if(curStage>0&&dist>=STAGES[curStage].d&&dist<STAGES[curStage].d+8){
c.fillStyle='rgba(232,115,42,0.95)';c.font='bold 18px system-ui';c.textAlign='center';
c.fillText('📍 '+STAGES[curStage].n+' raggiunto!',W/2,H*0.25);}
}

function draw(){
c.clearRect(0,0,W,H);
// Apply screen shake to camera
var shakeX=screenShake*(Math.random()-0.5)*2;
var shakeY=screenShake*(Math.random()-0.5)*2;
c.save();c.translate(shakeX,shakeY);
drawSky();drawBg();drawTerrain();drawForeground();drawParticles();drawCar();
c.restore();
drawHUD();drawNotifications();

if(over){c.fillStyle='rgba(0,0,0,.8)';c.fillRect(0,0,W,H);c.textAlign='center';
c.fillStyle='#fff';c.font='bold 30px system-ui';
c.fillText(car.fuel<=0?'⛽ BENZINA FINITA!':'💥 RIBALTATO!',W/2,H/2-55);
c.fillStyle='#e8732a';c.font='bold 24px system-ui';
c.fillText('📏 '+dist+' m',W/2,H/2-18);
c.fillStyle='#FFD700';c.font='bold 18px system-ui';
c.fillText('💰 '+coins+' monete',W/2,H/2+12);
var rs=STAGES[0];for(var rsi=STAGES.length-1;rsi>=0;rsi--){if(dist>=STAGES[rsi].d){rs=STAGES[rsi];break;}}
c.fillStyle='#fff';c.font='14px system-ui';c.fillText('📍 '+rs.e+' '+rs.n,W/2,H/2+40);
if(dist>=hi&&dist>0){c.fillStyle='#FFD700';c.font='bold 20px system-ui';c.fillText('🏆 NUOVO RECORD!',W/2,H/2+70);}
else{c.fillStyle='rgba(255,255,255,.4)';c.font='13px system-ui';c.fillText('🏆 Record: '+hi+'m',W/2,H/2+68);}
c.fillStyle='rgba(255,255,255,.7)';c.font='bold 15px system-ui';c.fillText('Tocca per riprovare',W/2,H/2+100);
c.fillStyle='rgba(255,255,255,.25)';c.font='11px system-ui';c.fillText('🗑️ Tieni premuto per resettare record',W/2,H/2+125);}

if(!started){c.fillStyle='rgba(0,0,0,.6)';c.fillRect(0,0,W,H);c.textAlign='center';
c.fillStyle='#fff';c.font='bold 26px system-ui';c.fillText('🏔️ KYRGY HILL CLIMB',W/2,H/2-30);
c.font='13px system-ui';c.fillStyle='rgba(255,255,255,.7)';
c.fillText('◀ FRENO    ⬆ SALTA    GAS ▶',W/2,H/2+5);
c.fillStyle='#e8732a';c.font='bold 16px system-ui';c.fillText('Tocca per iniziare',W/2,H/2+35);
c.fillStyle='rgba(255,255,255,.4)';c.font='12px system-ui';c.fillText('🏆 Record: '+hi+'m',W/2,H/2+60);}}

function loop(){if(!GAME_ACTIVE)return;update();draw();requestAnimationFrame(loop);}
function reset(){car={x:200,y:0,vx:0,vy:0,angle:0,angVel:0,fuel:100,wr:0,grounded:false};
dist=0;coins=0;cam.x=0;cam.y=0;over=false;started=true;
tP=[];tL=0;bgC={};particles=[];flipB=0;wasAir=false;airTime=0;airA=0;screenShake=0;notifications=[];}

// === CONTROLS ===
function onS(g){return function(e){e.preventDefault();if(!started){started=true;return;}if(over){reset();return;}if(g)gasOn=true;else brakeOn=true;};}
function onE(g){return function(e){e.preventDefault();if(g)gasOn=false;else brakeOn=false;};}
var gb=ov.querySelector('#gG'),bb=ov.querySelector('#gB'),jb=ov.querySelector('#gJ');
gb.addEventListener('touchstart',onS(true),{passive:false});gb.addEventListener('touchend',onE(true),{passive:false});
bb.addEventListener('touchstart',onS(false),{passive:false});bb.addEventListener('touchend',onE(false),{passive:false});
var onJump=function(e){e.preventDefault();if(!started){started=true;return;}if(over){reset();return;}jumpOn=true;};
if(jb){jb.addEventListener('touchstart',onJump,{passive:false});jb.addEventListener('mousedown',onJump);}
gb.addEventListener('mousedown',onS(true));gb.addEventListener('mouseup',onE(true));
bb.addEventListener('mousedown',onS(false));bb.addEventListener('mouseup',onE(false));
var kh=function(e){if(!GAME_ACTIVE)return;if(!started){started=true;return;}if(over&&(e.key===' '||e.key==='Enter')){reset();return;}
if(e.type==='keydown'){if(e.key==='ArrowRight'||e.key==='d')gasOn=true;if(e.key==='ArrowLeft'||e.key==='a')brakeOn=true;if(e.key==='ArrowUp'||e.key==='w'||e.key===' ')jumpOn=true;}
if(e.type==='keyup'){if(e.key==='ArrowRight'||e.key==='d')gasOn=false;if(e.key==='ArrowLeft'||e.key==='a')brakeOn=false;}};
document.addEventListener('keydown',kh);document.addEventListener('keyup',kh);

// Unified close: removes overlay, releases orientation/fullscreen,
// detaches global listeners. Safe to call multiple times.
var closed=false;
function exitGame(){
  if(closed)return;closed=true;
  GAME_ACTIVE=false;
  try{ov.remove();}catch(_){}
  document.removeEventListener('keydown',kh);
  document.removeEventListener('keyup',kh);
  window.removeEventListener('resize',rsz);
  window.removeEventListener('popstate',onBack);
  try{if(screen.orientation&&screen.orientation.unlock)screen.orientation.unlock();}catch(_){}
  try{
    if(document.fullscreenElement&&document.exitFullscreen)document.exitFullscreen().catch(function(){});
    else if(document.webkitFullscreenElement&&document.webkitExitFullscreen)document.webkitExitFullscreen();
  }catch(_){}
}
closeBtn.addEventListener('click',function(){history.back();});

// Browser back / hardware back closes the game. Also handles the close
// button via history.back() above, so both paths converge on popstate
// and the pushed history entry is always popped exactly once.
history.pushState({game:true},'');
function onBack(){exitGame();}
window.addEventListener('popstate',onBack);
// Long-press to reset high score
var resetTimer=null;
cv.addEventListener('touchstart',function(e){if(!over)return;var ty=e.touches[0].clientY;
if(ty>H/2+105&&ty<H/2+140){resetTimer=setTimeout(function(){resetHi();if(navigator.vibrate)navigator.vibrate(100);},1500);}},{passive:true});
cv.addEventListener('touchend',function(){if(resetTimer){clearTimeout(resetTimer);resetTimer=null;}},{passive:true});
loop();}
