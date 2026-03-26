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


/*CURSOR */
const cur=document.getElementById('cur'),cur2=document.getElementById('cur2');
if(cur){
  document.addEventListener('mousemove',e=>{cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px';cur2.style.left=e.clientX+'px';cur2.style.top=e.clientY+'px'});
  document.querySelectorAll('a,button,.tc,.ptag,.pc,.exc').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cur2.style.width='46px';cur2.style.height='46px';cur2.style.borderColor='var(--cyan)'});
    el.addEventListener('mouseleave',()=>{cur2.style.width='30px';cur2.style.height='30px';cur2.style.borderColor='var(--blue2)'});
  });
}
