(function(){
  // 1) Ajuste padding-top conforme altura real da topbar
  const topbar = document.getElementById('topbar');
  function setTopPad(){
    const h = topbar.offsetHeight || 64;
    document.body.style.paddingTop = h + 'px';
  }
  setTopPad();
  addEventListener('resize', setTopPad, {passive:true});

  // 2) Shrink da topbar no scroll (para versão curta no mobile)
  function onScroll(){
    if (scrollY > 12) topbar.classList.add('shrink');
    else topbar.classList.remove('shrink');
    updateFabIcon();
  }
  onScroll();
  addEventListener('scroll', onScroll, {passive:true});

  // 3) “Saiba mais” confiável (todos os cards)
  function setupMore(){
    document.querySelectorAll('.more').forEach(p => { p.hidden = true; p.style.height = '0px'; });
    document.addEventListener('click', (ev)=>{
      const btn = ev.target.closest('.chip-more');
      if (!btn) return;
      const id = btn.getAttribute('aria-controls');
      const panel = id && document.getElementById(id);
      const txt = btn.querySelector('.txt');
      if (!panel) return;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      if (expanded){
        const h = panel.scrollHeight;
        panel.style.height = h + 'px';
        panel.getBoundingClientRect(); // reflow
        panel.style.height = '0px';
        panel.classList.remove('is-open');
        const onEnd = () => {
          panel.hidden = true; panel.style.height = '';
          panel.removeEventListener('transitionend', onEnd);
        };
        panel.addEventListener('transitionend', onEnd);
        btn.setAttribute('aria-expanded','false');
        if (txt) txt.textContent = 'Saiba mais';
      } else {
        panel.hidden = false;
        panel.style.height = '0px';
        panel.classList.add('is-open');
        requestAnimationFrame(()=> panel.style.height = panel.scrollHeight + 'px');
        const onEnd = () => {
          panel.style.height = 'auto';
          panel.removeEventListener('transitionend', onEnd);
        };
        panel.addEventListener('transitionend', onEnd);
        btn.setAttribute('aria-expanded','true');
        if (txt) txt.textContent = 'Ver menos';
        // garantir visibilidade sob a topbar
        const rect = panel.getBoundingClientRect();
        const topOffset = (topbar.offsetHeight || 64) + 12;
        if (rect.top < topOffset){
          const y = window.scrollY + rect.top - topOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  }
  setupMore();

  // 4) Copiar e‑mail do Conecta
  const copyBtn = document.getElementById('copyEmail');
  if (copyBtn){
    copyBtn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText('ccs@ccstelecom.com.br'); copyBtn.textContent='✅ E‑mail copiado'; }
      catch { copyBtn.textContent='✅ E‑mail copiado'; }
      setTimeout(()=> copyBtn.textContent='Copiar e‑mail', 1400);
    });
  }

  // 5) Quick Dock — seção ativa
  const dockLinks = Array.from(document.querySelectorAll('.quick-dock a'));
  const setActiveDock = (id) => {
    dockLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
  };
  const sections = Array.from(document.querySelectorAll('main .section'));
  const io = new IntersectionObserver(entries => {
    const vis = entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if (vis) setActiveDock(vis.target.id);
  }, { threshold:[0.25,0.5,0.75] });
  sections.forEach(s => io.observe(s));

  // 6) FAB: subir/ir ao final
  const fab = document.getElementById('fab');
  function updateFabIcon(){
    const nearTop = window.scrollY < 100;
    if (nearTop){
      fab.setAttribute('aria-label','Ir para o final');
      fab.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>';
    } else {
      fab.setAttribute('aria-label','Ir para o topo');
      fab.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    }
  }
  updateFabIcon();

  fab.addEventListener('click', () => {
    const nearTop = window.scrollY < 100;
    if (nearTop){
      const fin = document.getElementById('s-final') || document.querySelector('footer');
      const y = fin.getBoundingClientRect().top + window.scrollY - 16;
      window.scrollTo({ top:y, behavior:'smooth' });
    } else {
      window.scrollTo({ top:0, behavior:'smooth' });
    }
  });
})();
