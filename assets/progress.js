(function(){
 function setup(){
  var boxes=[].slice.call(document.querySelectorAll('.quest-checkbox'));
  if(!boxes.length) return;
  var head=document.querySelector('.side h2'), counter=null;
  if(head){ counter=document.createElement('span'); counter.className='toc-progress'; head.appendChild(counter); }
  function sync(){
   var done=0,total=0;
   boxes.forEach(function(b){
    var q=b.closest('.quest'); if(!q||!q.id) return;
    var link=document.querySelector('.side nav a[href="#'+q.id+'"]');
    if(link){ link.classList.toggle('done',b.checked); link.setAttribute('aria-label',link.textContent+(b.checked?' (ทำแล้ว)':'')); }
    if(q.hasAttribute('data-group')){ total++; if(b.checked) done++; }
   });
   if(counter) counter.textContent='ทำแล้ว '+done+' / '+total;
  }
  document.addEventListener('change',function(e){ if(e.target&&e.target.classList&&e.target.classList.contains('quest-checkbox')) sync(); });
  sync();
 }
 if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',setup); else setup();
})();
