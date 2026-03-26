const pcv=document.getElementById('pcv'),pc=pcv.getContext('2d');
let pts=[];
function rz(){pcv.width=window.innerWidth;pcv.height=window.innerHeight}
rz();window.addEventListener('resize',rz);
for(let i=0;i<65;i++) pts.push({x:Math.random()*pcv.width,y:Math.random()*pcv.height,r:Math.random()*1.4+.3,dx:(Math.random()-.5)*.28,dy:(Math.random()-.5)*.28,o:Math.random()*.45+.08});
function drawPts(){
  pc.clearRect(0,0,pcv.width,pcv.height);
  pts.forEach(p=>{
    pc.beginPath();pc.arc(p.x,p.y,p.r,0,Math.PI*2);
    pc.fillStyle=`rgba(59,130,246,${p.o})`;pc.fill();
    p.x+=p.dx;p.y+=p.dy;
    if(p.x<0||p.x>pcv.width)p.dx*=-1;
    if(p.y<0||p.y>pcv.height)p.dy*=-1;
  });
  for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
    const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y);
    if(d<110){pc.beginPath();pc.strokeStyle=`rgba(37,99,235,${.07*(1-d/110)})`;pc.lineWidth=.5;pc.moveTo(pts[i].x,pts[i].y);pc.lineTo(pts[j].x,pts[j].y);pc.stroke()}
  }
  requestAnimationFrame(drawPts);
}
drawPts();



/* NAV  */
const nb=document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  nb.classList.toggle('sc',window.scrollY>50);
  document.getElementById('btt').classList.toggle('on',window.scrollY>400);
});
const hbg=document.getElementById('hbg'),mm=document.getElementById('mm');
hbg.addEventListener('click',()=>{hbg.classList.toggle('on');mm.classList.toggle('on')});
function cm(){hbg.classList.remove('on');mm.classList.remove('on')}

/* TYPED  */
const words=['Full-Stack Developer','AI/ML Engineer','Business Owner','UI/UX Designer','Java Developer','Python Programmer','Problem Solver'];
let wi=0,ci=0,del=false;
const tEl=document.getElementById('typed');
function type(){
  const w=words[wi];
  if(!del){tEl.textContent=w.slice(0,++ci);if(ci===w.length){del=true;setTimeout(type,1900);return}}
  else{tEl.textContent=w.slice(0,--ci);if(ci===0){del=false;wi=(wi+1)%words.length}}
  setTimeout(type,del?55:85);
}
type();

/* SCROLL REVEAL  */
const rvEls=document.querySelectorAll('.rv,.rvl,.rvr');
const ro=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('in'),i*40);ro.unobserve(e.target)}});
},{threshold:.1});
rvEls.forEach(el=>ro.observe(el));

/*  SKILL BARS */
const sbo=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('.skfill').forEach(f=>{f.style.width=f.dataset.w+'%'});sbo.unobserve(e.target)}});
},{threshold:.25});
document.querySelectorAll('.sc2').forEach(el=>sbo.observe(el));

/*  ORBITAL TOOLTIP  */
(function(){
  const tip=document.getElementById('orbTip');
  if(!tip) return;
  const labels={'fa-github':'GitHub','fa-linux':'Linux','fa-database':'MySQL',
    'fa-java':'Java','fa-python':'Python','fa-desktop':'IntelliJ IDEA',
    'fa-html5':'HTML5','fa-css3-alt':'CSS3','fa-js':'JavaScript',
    'fa-code':'C++','fa-leaf':'Spring Boot','fa-brain':'AI / ML',
    'fa-gamepad':'Game Dev','fa-camera':'Photography'};
  document.querySelectorAll('.orb-node').forEach(node=>{
    const icon=node.querySelector('i');
    if(!icon) return;
    let label='';
    for(const[cls,lbl] of Object.entries(labels)){if(icon.classList.contains(cls)){label=lbl;break}}
    if(!label) label=node.querySelector('span')?.textContent||'';
    node.addEventListener('mouseenter',()=>{tip.textContent='◆ '+label+' ◆';tip.style.opacity='1'});
    node.addEventListener('mouseleave',()=>{tip.style.opacity='0'});
  });
})();

/*  COUNTER ANIMATION  */
function animCount(el,target,suffix=''){
  let c=0;const inc=Math.ceil(target/40);
  const t=setInterval(()=>{c=Math.min(c+inc,target);el.textContent=c+suffix;if(c>=target)clearInterval(t)},50);
}

/* CONTACT */
function sendMsg(){
  const n=document.getElementById('fn').value.trim(),
        e=document.getElementById('fe').value.trim(),
        s=document.getElementById('fs').value.trim(),
        m=document.getElementById('fm').value.trim();
  const msg=document.getElementById('fmsg');
  if(!n||!e||!m){msg.textContent='⚠ Please fill in all required fields.';msg.className='fmsg err';return}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)){msg.textContent='⚠ Enter a valid email address.';msg.className='fmsg err';return}
  window.location.href=`mailto:praveengunasekara7@gmail.com?subject=${encodeURIComponent(s||'Portfolio Contact')}&body=${encodeURIComponent('Name: '+n+'\nEmail: '+e+'\n\n'+m)}`;
  msg.textContent='✓ Opening your email client...';msg.className='fmsg ok';
  setTimeout(()=>msg.textContent='',4000);
}
