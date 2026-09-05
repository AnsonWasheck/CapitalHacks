const header=document.getElementById('siteHeader');
const menuToggle=document.getElementById('menuToggle');
const mobileMenu=document.getElementById('mobileMenu');

window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>24),{passive:true});
menuToggle.addEventListener('click',()=>{const open=menuToggle.classList.toggle('open');mobileMenu.classList.toggle('open',open);menuToggle.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('[data-scroll]').forEach(button=>button.addEventListener('click',()=>{document.getElementById(button.dataset.scroll)?.scrollIntoView({behavior:'smooth'});menuToggle.classList.remove('open');mobileMenu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}));

const sections=['tracks','schedule','prizes','faq'];
const navButtons=[...document.querySelectorAll('.desktop-nav [data-scroll]')];
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)navButtons.forEach(button=>button.classList.toggle('active',button.dataset.scroll===entry.target.id));}),{rootMargin:'-35% 0px -60% 0px'});
sections.forEach(id=>document.getElementById(id)&&observer.observe(document.getElementById(id)));

function runTypewriter(element){
  if(element.dataset.ran)return;
  element.dataset.ran='1';
  const text=element.dataset.text||'';
  const delay=Number(element.dataset.delay||0);
  element.textContent='';
  setTimeout(()=>{element.classList.add('typing');let index=0;const timer=setInterval(()=>{index++;element.textContent=text.slice(0,index);if(index>=text.length){clearInterval(timer);setTimeout(()=>element.classList.remove('typing'),800);}},34);},delay);
}
const typeObserver=new IntersectionObserver(entries=>entries.forEach(entry=>entry.isIntersecting&&runTypewriter(entry.target)),{threshold:.2});
document.querySelectorAll('.typewriter').forEach(element=>typeObserver.observe(element));

const faqs=[
  ['WHO CAN PARTICIPATE?','Capital Hacks is built for Sacramento State students who want to hack, build, explore AI, and make an impact. Bring your curiosity and a willingness to collaborate.'],
  ['DO I NEED A TEAM BEFORE I ARRIVE?','No. Day one includes time and space for team formation. Teams may have a minimum of two and a maximum of six members.'],
  ['WHAT SHOULD WE BUILD?','Pick a real-world problem in Healthcare, Construction, Productivity, or the Wildcard category. Your approach and tools are up to you.'],
  ['HOW ARE PROJECTS JUDGED?','Judges evaluate projects on innovation, applicability, technical proficiency, and potential impact. Be ready to show what you built and why it matters.'],
  ['WHAT IS PROVIDED?','The Carlsen Center is open as your workspace, with scheduled meals, guest speakers, mentors, and subject-matter experts available throughout the weekend.']
];
let openFaq=0;
const faqList=document.getElementById('faqList');
function renderFaq(){
  faqList.innerHTML=faqs.map((faq,index)=>`<div class="faq-item ${index===openFaq?'open':''}"><button class="faq-question" data-faq="${index}"><span>${faq[0]}</span><i>${index===openFaq?'—':'+'}</i></button><div class="faq-answer"><p>${faq[1]}</p></div></div>`).join('');
  faqList.querySelectorAll('[data-faq]').forEach(button=>button.addEventListener('click',()=>{const index=Number(button.dataset.faq);openFaq=openFaq===index?-1:index;renderFaq();}));
}
renderFaq();

/* Choreographed, IDE-local Live Share loop. Every action is restored before the next. */
(() => {
  const editor=document.querySelector('.ide-editor');
  if(!editor)return;
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cursors=Object.fromEntries([...editor.querySelectorAll('[data-local-editor]')].map(el=>[el.dataset.localEditor,el]));
  const lines=[...editor.querySelectorAll('[data-code-line]')];
  const tabs=editor.querySelector('.ide-tabs');
  const originalLines=lines.map(line=>line.innerHTML);
  const sleep=ms=>new Promise(resolve=>setTimeout(resolve,reduceMotion?Math.min(ms,80):ms));
  /* Cursors are anchored to real code lines so they stay on target at every breakpoint. */
  const collabLayer=editor.querySelector('.ide-collaborators');
  const homes={ALEX_K:[18,0],JIN_L:[31,6],SARA_M:[62,1],MILA_V:[77,7]};
  const placement={};

  function topForLine(index){
    const line=lines[index];
    if(!line||!collabLayer)return 0;
    return line.getBoundingClientRect().top-collabLayer.getBoundingClientRect().top;
  }
  function place(name,left,lineIndex,working){
    const cursor=cursors[name];
    if(!cursor)return;
    placement[name]=[left,lineIndex,working];
    cursor.classList.toggle('is-working',working);
    cursor.style.left=`${left}%`;
    cursor.style.top=`${topForLine(lineIndex)}px`;
  }
  function move(name,left,lineIndex){place(name,left,lineIndex,true);}
  function home(name){const [left,lineIndex]=homes[name];place(name,left,lineIndex,false);}
  window.addEventListener('resize',()=>{
    Object.entries(placement).forEach(([name,[left,lineIndex,working]])=>place(name,left,lineIndex,working));
  });
  function highlight(line,color){
    editor.querySelectorAll('.local-edit').forEach(item=>item.classList.remove('local-edit'));
    line.style.setProperty('--local-color',color);
    line.classList.add('local-edit');
  }
  async function typeSuffix(line,suffix,color){
    const base=line.textContent;
    highlight(line,color);
    for(let i=1;i<=suffix.length;i++){line.textContent=base+suffix.slice(0,i);await sleep(45);}
    await sleep(850);
    for(let i=suffix.length-1;i>=0;i--){line.textContent=base+suffix.slice(0,i);await sleep(28);}
  }
  function restore(){
    lines.forEach((line,index)=>{line.innerHTML=originalLines[index];line.classList.remove('local-edit');line.style.removeProperty('--local-color');});
    tabs.classList.remove('show-model-tab');
  }

  async function alex(){
    move('ALEX_K',34,3);await sleep(650);
    tabs.classList.add('show-model-tab');
    const model=['from impact import score, feasibility','','def evaluate(prototype):','  reach = score.people_helped(prototype)','  effort = feasibility.hours(prototype)','  return reach / max(effort, 1)','','evaluate(prototype="commons")','# model ready for team review'];
    lines.forEach((line,index)=>line.textContent=model[index]);
    highlight(lines[3],'#7DE5EA');await sleep(1500);
    restore();await sleep(450);home('ALEX_K');
  }
  async function jin(){
    move('JIN_L',51,3);await sleep(650);
    await typeSuffix(lines[3],', urgency="high"','#00A6A0');
    restore();await sleep(350);home('JIN_L');
  }
  async function sara(){
    move('SARA_M',59,4);await sleep(650);
    await typeSuffix(lines[4],', feedback="live"','#B64A91');
    restore();await sleep(350);home('SARA_M');
  }
  async function mila(){
    move('MILA_V',44,8);await sleep(650);
    const line=lines[8];
    const previous=line.textContent;
    highlight(line,'#C7A346');line.textContent='';
    const message='# ✓ 18 tests passed · preview ready';
    for(let i=1;i<=message.length;i++){line.textContent=message.slice(0,i);await sleep(42);}
    await sleep(1200);
    for(let i=message.length-1;i>=0;i--){line.textContent=message.slice(0,i);await sleep(24);}
    line.textContent=previous;restore();await sleep(350);home('MILA_V');
  }
  async function run(){
    Object.keys(homes).forEach(home);
    while(true){await alex();await sleep(500);await jin();await sleep(500);await sara();await sleep(500);await mila();await sleep(900);}
  }
  run();
})();

/* =========================================================
   PAGE-LEVEL COLLABORATION PRESENCE
   Simulated collaborators; decorative and intentionally ambient.
   ========================================================= */
(() => {
  const overlay=document.querySelector('.collaboration-presence');
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile=window.matchMedia('(max-width: 767px)');
  if(!overlay||reducedMotion.matches||mobile.matches)return;

  const collaborators=[
    {name:'ALEX_K',color:'#FFD600',textColor:'#0A0A0A',duration:18000},
    {name:'SARA_M',color:'#FF6B35',textColor:'#FFFFFF',duration:22000},
    {name:'JIN_L',color:'#4ADE80',textColor:'#0A0A0A',duration:26000},
    {name:'MILA_V',color:'#60A5FA',textColor:'#0A0A0A',duration:30000}
  ];

  const zones={
    hero:[[.14,.28],[.76,.27],[.18,.55],[.70,.58],[.84,.46],[.10,.44]],
    alumni:[[.04,.28],[.84,.31],[.08,.77],[.79,.74]],
    tracks:[[.04,.33],[.85,.30],[.07,.76],[.80,.75]],
    schedule:[[.04,.29],[.86,.35],[.10,.79],[.79,.78]],
    prizes:[[.05,.72],[.86,.70],[.89,.29]],
    faq:[[.04,.77],[.87,.73],[.88,.28]],
    register:[[.06,.31],[.84,.34],[.12,.76],[.78,.75]],
    default:[[.05,.30],[.86,.32],[.08,.76],[.80,.74]]
  };
  const density={hero:3,alumni:0,tracks:0,schedule:0,prizes:0,faq:0,register:0,default:0};
  const safe=28;
  let currentSection='hero';
  let heroPhase='headline';
  let activeIds=new Set();
  let rotationTimer;
  const ideEditor=document.querySelector('.ide-editor');
  const alumniSection=document.querySelector('.winner-reel');
  const heroSection=document.getElementById('hero');

  const states=collaborators.map((person,index)=>{
    const element=overlay.querySelector(`[data-collaborator="${person.name}"]`);
    element.style.setProperty('--cursor-color',person.color);
    element.style.setProperty('--cursor-text',person.textColor);
    const state={...person,index,element,active:false,x:index%2?-130:window.innerWidth+30,y:80+index*90,timer:null,editTimer:null,currentLine:null,animation:null};
    element.style.transform=`translate3d(${state.x}px,${state.y}px,0)`;
    return state;
  });

  const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
  const random=(min,max)=>min+Math.random()*(max-min);
  const shuffle=values=>[...values].sort(()=>Math.random()-.5);

  function pointFor(section){
    if(section==='hero'&&heroPhase==='ide'&&ideEditor){
      const rect=ideEditor.getBoundingClientRect();
      const line=Math.floor(random(2,8));
      const idePoints=[
        {x:rect.left+rect.width*.20,y:rect.top+58+line*18},
        {x:rect.left+rect.width*.52,y:rect.top+58+line*18},
        {x:rect.left+rect.width*.76,y:rect.top+58+line*18},
        {x:rect.right-105,y:rect.bottom-28}
      ];
      const point=idePoints[Math.floor(Math.random()*idePoints.length)];
      return {x:clamp(point.x,safe,window.innerWidth-126),y:clamp(point.y,safe+34,window.innerHeight-54),ideLine:line};
    }
    const candidates=zones[section]||zones.default;
    const [xRatio,yRatio]=candidates[Math.floor(Math.random()*candidates.length)];
    return {
      x:clamp(window.innerWidth*xRatio+random(-18,18),safe,window.innerWidth-126),
      y:clamp(window.innerHeight*yRatio+random(-16,16),safe+34,window.innerHeight-54)
    };
  }

  function offscreenPoint(state){
    const leaveLeft=state.x<window.innerWidth/2;
    return {x:leaveLeft?-125:window.innerWidth+25,y:clamp(state.y+random(-50,50),50,window.innerHeight-60)};
  }

  function scheduleMove(state,delay=random(900,2600)){
    clearTimeout(state.timer);
    state.timer=setTimeout(()=>move(state),delay);
  }

  function showCollaborativeEdit(state,lineIndex){
    if(heroPhase!=='ide'||currentSection!=='hero')return;
    const lines=[...document.querySelectorAll('[data-code-line]')];
    const line=lines[lineIndex%lines.length];
    if(!line)return;
    if(state.currentLine&&state.currentLine.dataset.editor===state.name){
      state.currentLine.classList.remove('is-selected','is-editing');
      state.currentLine.style.removeProperty('--editing-color');
      delete state.currentLine.dataset.editor;
    }
    line.style.setProperty('--editing-color',state.color);
    line.dataset.editor=state.name;
    line.classList.add('is-selected','is-editing');
    state.currentLine=line;
    clearTimeout(state.editTimer);
    state.editTimer=setTimeout(()=>{
      if(line.dataset.editor!==state.name)return;
      line.classList.remove('is-selected','is-editing');
      line.style.removeProperty('--editing-color');
      delete line.dataset.editor;
      state.currentLine=null;
    },random(1100,1900));
  }

  function move(state){
    state.animation?.cancel();
    const target=state.active?pointFor(currentSection):offscreenPoint(state);
    const correction=state.active?{x:clamp(target.x+random(-12,12),safe,window.innerWidth-126),y:clamp(target.y+random(-9,9),safe+34,window.innerHeight-54)}:target;
    const entering=state.active&&(state.x<0||state.x>window.innerWidth);
    const duration=state.active?(entering?random(3200,5200):state.duration*random(.82,1.12)):Math.min(7000,state.duration*.38);
    state.animation=state.element.animate([
      {transform:`translate3d(${state.x}px,${state.y}px,0)`,offset:0},
      {transform:`translate3d(${target.x}px,${target.y}px,0)`,offset:.64},
      {transform:`translate3d(${target.x}px,${target.y}px,0)`,offset:.78},
      {transform:`translate3d(${correction.x}px,${correction.y}px,0)`,offset:.9},
      {transform:`translate3d(${correction.x}px,${correction.y}px,0)`,offset:1}
    ],{duration,easing:'cubic-bezier(0.4, 0, 0.2, 1)',fill:'forwards'});
    if(target.ideLine!==undefined&&state.active){
      clearTimeout(state.editTimer);
      state.editTimer=setTimeout(()=>showCollaborativeEdit(state,target.ideLine),duration*.58);
    }
    state.animation.finished.then(()=>{
      state.x=correction.x;
      state.y=correction.y;
      state.element.style.transform=`translate3d(${state.x}px,${state.y}px,0)`;
      state.animation=null;
      scheduleMove(state,state.active?random(700,1800):random(3500,8000));
    }).catch(()=>{});
  }

  function rebalance(){
    let count=density[currentSection]??density.default;
    if(currentSection==='hero')count=heroPhase==='ide'?3:2+(Math.random()<.34?1:0);
    const preferred=shuffle(states.filter(state=>!activeIds.has(state.index)));
    const fallback=shuffle(states.filter(state=>activeIds.has(state.index)));
    const selected=[...preferred,...fallback].slice(0,count);
    activeIds=new Set(selected.map(state=>state.index));
    const peripheralId=selected.length>1?selected[selected.length-1].index:-1;
    states.forEach(state=>{
      const active=activeIds.has(state.index);
      state.element.classList.toggle('is-active',active);
      state.element.classList.toggle('is-peripheral',active&&state.index===peripheralId);
      if(state.active===active)return;
      state.active=active;
      scheduleMove(state,active?random(100,900):random(500,1600));
    });
    clearTimeout(rotationTimer);
    rotationTimer=setTimeout(rebalance,random(15000,26000));
  }

  const observed=[
    document.getElementById('hero'),
    document.querySelector('.winner-reel'),
    document.getElementById('tracks'),
    document.getElementById('schedule'),
    document.getElementById('prizes'),
    document.getElementById('faq'),
    document.getElementById('register')
  ].filter(Boolean);
  const ratios=new Map();
  const sectionObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>ratios.set(entry.target,entry.intersectionRatio));
    const visible=[...ratios.entries()].sort((a,b)=>b[1]-a[1])[0];
    if(!visible||visible[1]===0)return;
    const resolved=visible[0].classList.contains('winner-reel')?'alumni':(visible[0].id||'default');
    if(resolved!==currentSection){currentSection=resolved;rebalance();}
  },{threshold:[.15,.35,.6],rootMargin:'-12% 0px -18% 0px'});
  observed.forEach(section=>sectionObserver.observe(section));

  let scrollFrame=0;
  function updateHeroActivity(){
    scrollFrame=0;
    if(!heroSection||!alumniSection)return;
    const alumniRect=alumniSection.getBoundingClientRect();
    const heroRect=heroSection.getBoundingClientRect();
    if(alumniRect.top<=window.innerHeight*.88){
      if(currentSection!=='alumni'){currentSection='alumni';rebalance();}
      return;
    }
    if(heroRect.bottom>0&&heroRect.top<window.innerHeight){
      if(currentSection!=='hero'){currentSection='hero';rebalance();}
      if(ideEditor){
        const rect=ideEditor.getBoundingClientRect();
        const nextPhase=rect.top<window.innerHeight*.78&&rect.bottom>90?'ide':'headline';
        if(nextPhase!==heroPhase){
          heroPhase=nextPhase;
          rebalance();
          states.filter(state=>state.active).forEach(state=>scheduleMove(state,random(120,650)));
        }
      }
    }
  }
  window.addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(updateHeroActivity);},{passive:true});
  window.addEventListener('resize',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(updateHeroActivity);},{passive:true});

  const terminalLog=document.querySelector('.terminal-log');
  const terminalMessages=[
    '<b>›</b> SARA_M updated impact_model.py',
    '<b>›</b> JIN_L resolved 2 comments',
    '<b>›</b> MILA_V pushed commit <i>8f2c1a</i>',
    '<b>›</b> tests <strong>✓ 18 passed</strong>',
    '<b>›</b> preview deployed in <i>842ms</i>'
  ];
  let terminalIndex=0;
  setInterval(()=>{
    if(heroPhase!=='ide'||currentSection!=='hero'||!terminalLog)return;
    const rows=[...terminalLog.querySelectorAll('p')];
    const row=document.createElement('p');
    row.className='new-output';
    row.innerHTML=terminalMessages[terminalIndex++%terminalMessages.length];
    terminalLog.appendChild(row);
    if(rows.length>=3)rows[0].remove();
  },4200);

  document.addEventListener('visibilitychange',()=>{
    if(document.hidden)states.forEach(state=>state.animation?.pause());
    else states.forEach(state=>state.animation?.play());
  });
  updateHeroActivity();
  rebalance();
})();
