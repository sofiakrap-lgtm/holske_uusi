/* ui-bahnexpress-fi motion.js
   State-driven motion measured from bahnexpress.fi. No libraries.
   Modules: header state fallback, segmented chip, mobile menu (+ View Transitions morph),
   carousel (arrows, autoplay 6s, page indicator), use-case morph, rolling digits,
   timeline draw, fit-to-width headings, slider fill, dropdown, optional [data-reveal]. */
(() => {
  const css = getComputedStyle(document.documentElement);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const vt = fn => (!reduce && document.startViewTransition) ? document.startViewTransition(fn) : (fn(), null);
  const onView = (els, cb, opts = { threshold: 0.35 }) => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { cb(e.target); io.unobserve(e.target); } }), opts);
    els.forEach(el => io.observe(el));
  };

  /* 1. Header: CSS scroll-timeline does the band. Fallback + data-at-top for styling. */
  const header = document.querySelector('.site-header');
  if (header) {
    const set = () => { const top = scrollY < 8; header.toggleAttribute('data-at-top', top); header.classList.toggle('is-scrolled', !top); };
    set(); addEventListener('scroll', set, { passive: true });
  }

  /* 2. Segmented chip: moves ::before (left/width via custom props) to current or hovered item. 0.26s standard (CSS). */
  document.querySelectorAll('[data-segmented]').forEach(seg => {
    const items = [...seg.querySelectorAll('.segmented__label')];
    const place = el => {
      if (!el) { seg.style.setProperty('--chip-width', '0px'); return; }
      seg.style.setProperty('--chip-left', el.offsetLeft + 'px');
      seg.style.setProperty('--chip-width', el.offsetWidth + 'px');
    };
    const current = () => items.find(i => i.hasAttribute('aria-current'));
    place(current());
    addEventListener('resize', () => place(current()));
  });

  /* 3. Mobile menu: sheet drops from under the header; header nav morphs into menu via View Transitions. */
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.getElementById(toggle?.getAttribute('aria-controls') || 'menu');
  if (toggle && menu) {
    const segs = [...document.querySelectorAll('.nav .segmented__label')];
    const firsts = [...menu.querySelectorAll('.nav-mobile__group .nav-mobile__links li:first-child a')];
    const name = (on) => { segs.forEach((s, i) => s.style.viewTransitionName = on ? '' : `nav-seg-${i + 1}`); firsts.forEach((a, i) => a.style.viewTransitionName = on ? `nav-seg-${i + 1}` : ''); };
    const open = () => {
      document.documentElement.dataset.navVt = 'open'; name(false);
      const t = vt(() => { menu.hidden = false; menu.dataset.state = 'open'; name(true); toggle.setAttribute('aria-expanded', 'true'); header?.classList.add('is-menu-open'); });
      t?.finished.finally(() => delete document.documentElement.dataset.navVt);
    };
    const close = () => {
      menu.dataset.state = 'closed';
      setTimeout(() => { menu.hidden = true; delete menu.dataset.state; }, reduce ? 0 : 180);
      toggle.setAttribute('aria-expanded', 'false'); header?.classList.remove('is-menu-open');
    };
    toggle.addEventListener('click', () => toggle.getAttribute('aria-expanded') === 'true' ? close() : open());
    addEventListener('keydown', e => { if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') close(); });
  }

  /* 4. Carousel: native scroll-snap, arrows scroll one card, autoplay with 6s page-indicator fill. */
  document.querySelectorAll('[data-carousel]').forEach(car => {
    const track = car.querySelector('.carousel__track');
    const slides = [...track.children];
    const ind = car.querySelector('[data-indicator]');
    const dur = parseFloat(css.getPropertyValue('--autoplay-duration')) * 1000 || 6000;
    let idx = 0, timer = null, paused = reduce;
    const dots = slides.map((_, i) => { const b = document.createElement('button'); b.className = 'page-indicator__dot'; b.setAttribute('aria-label', `Kortti ${i + 1}`); b.onclick = () => go(i); ind?.appendChild(b); return b; });
    const mark = () => { slides.forEach((s, i) => s.toggleAttribute('data-current', i === idx)); dots.forEach((d, i) => { d.removeAttribute('aria-current'); if (i === idx) { void d.offsetWidth; d.setAttribute('aria-current', 'true'); } }); };
    const go = i => { idx = (i + slides.length) % slides.length; track.scrollTo({ left: slides[idx].offsetLeft - parseFloat(getComputedStyle(track).scrollPaddingInlineStart || 0) - track.offsetLeft, behavior: reduce ? 'auto' : 'smooth' }); mark(); schedule(); };
    const schedule = () => { clearTimeout(timer); if (!paused && car.hasAttribute('data-autoplay')) timer = setTimeout(() => go(idx + 1), dur); };
    car.querySelector('[data-carousel-next]')?.addEventListener('click', () => go(idx + 1));
    car.querySelector('[data-carousel-prev]')?.addEventListener('click', () => go(idx - 1));
    car.querySelector('[data-carousel-play]')?.addEventListener('click', e => { paused = !paused; car.toggleAttribute('data-paused', paused); e.currentTarget.setAttribute('aria-label', paused ? 'Toista' : 'Pysäytä'); schedule(); });
    car.addEventListener('pointerenter', () => clearTimeout(timer)); car.addEventListener('pointerleave', schedule);
    car.addEventListener('focusin', () => clearTimeout(timer)); car.addEventListener('focusout', schedule);
    track.addEventListener('scrollend', () => { const x = track.scrollLeft; let best = 0; slides.forEach((s, i) => { if (Math.abs(s.offsetLeft - track.offsetLeft - x) < Math.abs(slides[best].offsetLeft - track.offsetLeft - x)) best = i; }); if (best !== idx) { idx = best; mark(); schedule(); } });
    mark(); schedule();
  });

  /* 5. Use-case rail: clicked slide expands to full width with a View Transitions morph (0.46s, content out .18s / in .3s +.14s). */
  document.querySelectorAll('[data-use-rail]').forEach(rail => {
    const slides = [...rail.querySelectorAll('.use-rail__slide')];
    slides.forEach((s, i) => { s.style.viewTransitionName = `uc-${i}`; s.dataset.morph = ''; });
    const set = target => {
      document.documentElement.dataset.ucVt = '';
      const t = vt(() => slides.forEach(s => s.toggleAttribute('data-open', s === target)));
      (t ? t.finished : Promise.resolve()).finally(() => { delete document.documentElement.dataset.ucVt; target?.scrollIntoView({ block: 'nearest', inline: 'start', behavior: reduce ? 'auto' : 'smooth' }); });
    };
    slides.forEach(s => {
      s.addEventListener('click', e => { if (e.target.closest('.use-rail__close')) { set(null); e.stopPropagation(); return; } if (!s.hasAttribute('data-open')) set(s); });
      s.addEventListener('keydown', e => { if (e.key === 'Enter' && !s.hasAttribute('data-open')) set(s); if (e.key === 'Escape') set(null); });
    });
  });

  /* 6. Rolling digits: [data-roll="5K+"] -> per-digit strips 0..d, 1s ease-out, 90ms stagger. */
  const stagger = parseFloat(css.getPropertyValue('--stagger-base')) || 90;
  const rolls = [...document.querySelectorAll('[data-roll]')];
  rolls.forEach(el => {
    const val = el.dataset.roll || el.textContent.trim(); el.textContent = ''; el.classList.add('roll');
    const sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = val; el.appendChild(sr);
    const vis = document.createElement('span'); vis.setAttribute('aria-hidden', 'true'); el.appendChild(vis);
    let n = 0;
    [...val].forEach(ch => {
      if (!/\d/.test(ch)) { vis.append(ch); return; }
      const d = +ch, box = document.createElement('span'); box.className = 'roll__digit';
      box.innerHTML = `<span class="roll__ghost">${ch}</span><span class="roll__strip" style="transition-delay:${n * stagger}ms">${Array.from({ length: d + 1 }, (_, k) => `<span>${k}</span>`).join('')}</span>`;
      box.dataset.target = d; vis.appendChild(box); n++;
    });
  });
  onView(rolls, el => el.querySelectorAll('.roll__digit').forEach(b => { const d = +b.dataset.target; b.querySelector('.roll__strip').style.transform = `translateY(${-(d / (d + 1)) * 100}%)`; }), { threshold: 0.6 });

  /* 7. Timeline draw: idle -> drawn when in view; per-step cue = n * beat (CSS). */
  onView([...document.querySelectorAll('.timeline[data-draw="idle"]')], tl => { tl.dataset.draw = 'on'; }, { threshold: 0.3 });

  /* 8. Fit-to-width: step a display heading down one size if a word overflows (96>80>72>56>48>40>36>32). */
  const steps = [96, 80, 72, 56, 48, 40, 36, 32];
  const fit = () => document.querySelectorAll('[data-fit]').forEach(el => {
    el.style.fontSize = ''; el.style.lineHeight = '';
    let size = parseFloat(getComputedStyle(el).fontSize);
    const longest = () => { const r = document.createRange(); let w = 0; const words = el.textContent.split(/\s+/); const probe = document.createElement('span'); probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap'; el.appendChild(probe); words.forEach(t => { probe.textContent = t; w = Math.max(w, probe.offsetWidth); }); probe.remove(); return w; };
    while (longest() > el.clientWidth && size > 32) { size = steps.find(s => s < size) || 32; el.style.fontSize = size + 'px'; el.style.lineHeight = size + 'px'; }
  });
  if (document.fonts) document.fonts.ready.then(fit); else fit();
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(fit, 120); });

  /* 9. Slider fill (spent part in teal-300). */
  document.querySelectorAll('input[type="range"][data-slider], input.slider').forEach(s => {
    const upd = () => s.style.setProperty('--fill', ((s.value - s.min) / (s.max - s.min)) * 100 + '%');
    upd(); s.addEventListener('input', upd);
  });

  /* 10. Dropdown: in .14s / out .12s (CSS keyframes). */
  document.querySelectorAll('[data-dropdown]').forEach(btn => {
    const sheet = btn.nextElementSibling;
    btn.addEventListener('click', () => { const open = sheet.hidden; sheet.hidden = !open; btn.setAttribute('aria-expanded', String(open)); });
    document.addEventListener('click', e => { if (!btn.parentElement.contains(e.target)) sheet.hidden = true; });
  });

  /* 11. Map pins: single selection. */
  document.querySelectorAll('[data-pins]').forEach(map => map.addEventListener('click', e => {
    const pin = e.target.closest('.pin'); if (!pin) return;
    map.querySelectorAll('.pin').forEach(p => p.setAttribute('aria-pressed', String(p === pin)));
  }));

  /* 12. Optional generic reveal (not used by this style; kept for ui-* mixing). */
  const rev = [...document.querySelectorAll('[data-reveal]')];
  if (reduce) rev.forEach(el => el.classList.add('is-inview'));
  else onView(rev, el => el.classList.add('is-inview'), { rootMargin: '0px 0px -15% 0px', threshold: 0 });
})();
