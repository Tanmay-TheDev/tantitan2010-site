/* TanTitan2010 lightweight motion system
 * Visual-only. Never owns transforms/scrolling/dragging of app surfaces.
 */
(() => {
  'use strict';
  const root = document.documentElement;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const coarse = window.matchMedia?.('(pointer: coarse)');
  const blocked = 'canvas,iframe,video,audio,.window,[data-window],.win,.mac-window,#desktop,#desktop-area,.chess-board,.checkers-board,.board,.game-board,.game-canvas,.piece,.chess-piece,.checker-piece,[draggable="true"],[data-draggable],[data-drag],.nb-gui-surface,.nb-gui-comp,.carrom-board,#lockScreen,#sleepOverlay,#sleepOv,#bootScreen,#boot-loader';
  const interactive = 'button,[role="button"],a,.ui-button,.tool-card,.app-card,.game-card';
  const isBlocked = el => !!el?.closest?.(blocked);
  const canPress = el => el instanceof Element && !isBlocked(el) && !el.matches('input,textarea,select,option,[contenteditable="true"]') && !el.closest('[data-no-motion],.no-motion,dialog') && el.matches(interactive);

  document.addEventListener('pointerdown', e => {
    if (reduce?.matches) return;
    const el = e.target.closest?.(interactive);
    if (canPress(el)) el.classList.add('tt-motion-target','tt-pressing');
  }, {passive:true});
  const clear = e => {
    const el = e.target.closest?.('.tt-motion-target');
    if (el) el.classList.remove('tt-pressing');
  };
  document.addEventListener('pointerup', clear, {passive:true});
  document.addEventListener('pointercancel', clear, {passive:true});

  function setupReveal(){
    if (reduce?.matches || !('IntersectionObserver' in window)) return;
    const targets = [...document.querySelectorAll('.card,.tool-card,.game-card,.app-card,.tile,.setting-row')]
      .filter(el => !isBlocked(el));
    if (!targets.length) return;
    const io = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('tt-visible');
        io.unobserve(entry.target);
      }
    }, {rootMargin:'0px 0px -10% 0px', threshold:0.03});
    targets.forEach((el,i)=>{
      if (el.dataset.ttReveal === '1') return;
      el.dataset.ttReveal='1';
      el.classList.add('tt-reveal');
      el.style.setProperty('--tt-reveal-delay', `${Math.min((i%5)*20,80)}ms`);
      io.observe(el);
    });
  }

  function boot(){
    setupReveal();
    root.dataset.ttMotion='ready';
    window.TT_MOTION = Object.freeze({
      version:'3.0.0-light',
      reducedMotion:!!reduce?.matches,
      refresh:setupReveal,
      spring(el){ if(!el || isBlocked(el) || reduce?.matches) return; el.classList.remove('tt-pressing'); void el.offsetWidth; el.classList.add('tt-pressing'); setTimeout(()=>el.classList.remove('tt-pressing'),180); }
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();
