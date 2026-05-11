// ── PAGE NAVIGATION ──
var pages={home:'index.html',about:'about.html',class9:'class9.html',class10:'class10.html',class11:'class11.html',jee:'jee.html',neet:'neet.html',syllabus:'syllabus.html',fees:'fees.html',faqs:'faqs.html',contact:'contact.html'};
function goTo(key){
  var target = pages[key];
  if(target){
    window.location.href = target;
  }
}
function initAnims(){
  document.querySelectorAll('.page.active .au').forEach(function(el){
    el.style.opacity='0';el.style.animationPlayState='paused';
  });
  var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.style.animationPlayState='running';obs.unobserve(e.target);}});},{threshold:0.1});
  document.querySelectorAll('.page.active .au').forEach(function(el){obs.observe(el);});
}

// ── WHATSAPP ──
var waOpen=false;
function toggleWa(){waOpen=!waOpen;document.getElementById('waPanel').classList.toggle('open',waOpen);document.getElementById('waN').style.display=waOpen?'none':'flex';}

// ── MODALS ──
function openAssess(){document.getElementById('assessModal').classList.add('open');document.body.style.overflow='hidden';}
function closeAssess(){document.getElementById('assessModal').classList.remove('open');document.body.style.overflow='';}
function submitAssess(){
  var n=document.getElementById('f_name').value.trim(),p=document.getElementById('f_parent').value.trim(),ph=document.getElementById('f_phone').value.trim(),g=document.getElementById('f_grade').value,d=document.getElementById('f_date').value,s=document.getElementById('f_slot').value,b=document.getElementById('f_board').value,l=document.getElementById('f_loc').value.trim();
  if(!n||!p||!ph||!g||!d||!s||!b||!l){alert('Please fill all required fields (*)');return;}
  document.getElementById('assessBody').style.display='none';document.getElementById('assessOk').style.display='block';
}
function openFee(){document.getElementById('feeModal').classList.add('open');document.body.style.overflow='hidden';}
function closeFee(){document.getElementById('feeModal').classList.remove('open');document.body.style.overflow='';}
function submitFee(){
  var n=document.getElementById('fm_name').value.trim(),p=document.getElementById('fm_phone').value.trim(),g=document.getElementById('fm_grade').value;
  if(!n||!p||!g){alert('Please fill all required fields (*)');return;}
  document.getElementById('feeBody').style.display='none';document.getElementById('feeOk').style.display='block';
}
function submitFeePage(){
  var n=document.getElementById('ff_name').value.trim(),p=document.getElementById('ff_phone').value.trim(),g=document.getElementById('ff_grade').value;
  if(!n||!p||!g){alert('Please fill all required fields (*)');return;}
  document.getElementById('feePageSubmit').style.display='none';document.getElementById('feePageOk').style.display='block';
}
function submitContact(){
  var n=document.getElementById('c_name').value.trim(),p=document.getElementById('c_phone').value.trim();
  if(!n||!p){alert('Please fill all required fields (*)');return;}
  document.getElementById('contactForm').style.display='none';document.getElementById('contactOk').style.display='block';
}

// ── FAQ ──
function toggleFaq(el){
  var item=el.closest('.faq-item'),icon=el.querySelector('.faq-tog'),isOpen=item.classList.contains('open');
  item.closest('.faq-list').querySelectorAll('.faq-item').forEach(function(i){i.classList.remove('open');i.querySelector('.faq-tog').textContent='+';});
  if(!isOpen){item.classList.add('open');icon.textContent='−';}
}

// ── BOARD / SUBJECT TAB SWITCHERS ──
function switchBoard(classId,boardId,btn){
  var wrap=btn.closest('.syl-pane,.page');
  wrap.querySelectorAll('#'+classId+'-btabs .syl-tab').forEach(function(t){t.classList.remove('active');});
  wrap.querySelectorAll('.board-pane').forEach(function(p){p.classList.remove('active');});
  btn.classList.add('active');
  var target=document.getElementById(classId+'-'+boardId);
  if(target)target.classList.add('active');
}
function switchSubj(groupId,subjId,btn){
  var wrap=btn.closest('.board-pane,.syl-pane,.page');
  wrap.querySelectorAll('#'+groupId+'-stabs .syl-tab').forEach(function(t){t.classList.remove('active');});
  wrap.querySelectorAll('.subj-pane').forEach(function(p){p.classList.remove('active');});
  btn.classList.add('active');
  var target=document.getElementById(groupId+'-'+subjId);
  if(target)target.classList.add('active');
}
function switchClass(id,btn){
  document.getElementById('classTabs').querySelectorAll('.syl-tab').forEach(function(t){t.classList.remove('active');});
  document.querySelectorAll('#pg-syllabus > section > .syl-pane').forEach(function(p){p.classList.remove('active');});
  btn.classList.add('active');
  var target=document.getElementById('sc-'+id);
  if(target)target.classList.add('active');
}

// ── INIT ──
document.addEventListener('DOMContentLoaded',function(){
  var d=new Date(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0'),el=document.getElementById('f_date');
  if(el)el.min=d.getFullYear()+'-'+m+'-'+day;
  document.getElementById('assessModal').addEventListener('click',function(e){if(e.target===this)closeAssess();});
  document.getElementById('feeModal').addEventListener('click',function(e){if(e.target===this)closeFee();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeAssess();closeFee();}});

  // Dropdown click toggle for Classes menu, useful on touch and click devices
  document.querySelectorAll('.nav-item > .nav-link').forEach(function(btn){
    btn.addEventListener('click', function(e){
      var item = btn.closest('.nav-item');
      if(!item) return;
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.nav-item.open').forEach(function(other){
        if(other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open', !isOpen);
      e.stopPropagation();
    });
  });
  document.addEventListener('click', function(e){
    if(!e.target.closest('.nav-item')){
      document.querySelectorAll('.nav-item.open').forEach(function(item){item.classList.remove('open');});
    }
  });

  initAnims();
});
