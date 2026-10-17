(function(){
 var tf=document.getElementById('typeFilter'); if(!tf) return;
 var sf=document.getElementById('starterFilter');
 var quests=[].slice.call(document.querySelectorAll('.quest'));
 var first=quests[0], empty=document.createElement('p');
 empty.className='filter-empty'; empty.hidden=true; empty.textContent='ไม่พบเควสต์ตามตัวกรองที่เลือก ลองเปลี่ยนตัวกรองหรือเลือก “ทุกประเภท”';
 if(first) first.parentNode.insertBefore(empty,first);
 function apply(){
  var s=sf?sf.value:'all', t=tf.value, shown=0;
  quests.forEach(function(q){
   var starters=(q.dataset.starter||'all').split(' ');
   var types=(q.dataset.type||'').split(' ');
   var sOK=s==='all'||starters.indexOf('all')>-1||starters.indexOf(s)>-1;
   var tOK=t==='all'||(t==='missable'?types.indexOf('missable')>-1:q.dataset.group===t);
   var ok=sOK&&tOK; q.style.display=ok?'':'none'; if(ok) shown++;
  });
  [].forEach.call(document.querySelectorAll('.group-head'),function(h){
   var g=h.id.replace('group-','');
   h.style.display=quests.some(function(q){return q.dataset.group===g&&q.style.display!=='none'})?'':'none';
  });
  var els=[].slice.call(document.querySelectorAll('.side nav > *')), label=null, cnt=0;
  els.forEach(function(el){
   if(el.classList.contains('nav-group')){ if(label) label.style.display=cnt?'':'none'; label=el; cnt=0; }
   else { var q=document.getElementById((el.getAttribute('href')||'').slice(1)); var hide=q&&q.style.display==='none'; el.style.display=hide?'none':''; if(!hide) cnt++; }
  });
  if(label) label.style.display=cnt?'':'none';
  empty.hidden=shown>0;
 }
 tf.addEventListener('change',apply); if(sf) sf.addEventListener('change',apply); apply();
})();
