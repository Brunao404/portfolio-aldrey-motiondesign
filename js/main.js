/* ============================================================
   ALDREY RAMOS — main.js
   Cursor · Nav scroll · Mobile menu · Filtro · Grid · Reveal
   ============================================================ */

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const rm  = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const touch = () => window.matchMedia('(hover: none)').matches;

/* ----------------------------------------------------------
   CURSOR
---------------------------------------------------------- */
;(function () {
  const dot  = $('#cur');
  const ring = $('#cur-ring');
  if (!dot || !ring) return;

  if (touch()) {
    document.body.classList.add('no-cursor');
    dot.style.display = ring.style.display = 'none';
    return;
  }

  let mx = -100, my = -100, rx = -100, ry = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
  });

  (function loop() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
    requestAnimationFrame(loop);
  })();

  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, .chip')) document.body.classList.add('ch');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, .chip')) document.body.classList.remove('ch');
  });
})();

/* ----------------------------------------------------------
   NAV — fica sólida ao scrollar
---------------------------------------------------------- */
;(function () {
  const nav = $('#nav');
  if (!nav) return;
  const update = () => nav.classList.toggle('solid', window.scrollY > 10);
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ----------------------------------------------------------
   MENU MOBILE
---------------------------------------------------------- */
;(function () {
  const btn    = $('#burger');
  const drawer = $('#drawer');
  if (!btn || !drawer) return;

  btn.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  $$('a', drawer).forEach(a => a.addEventListener('click', () => {
    drawer.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }));
})();

/* ----------------------------------------------------------
   ANO NO FOOTER
---------------------------------------------------------- */
const yr = $('#yr');
if (yr) yr.textContent = new Date().getFullYear();

/* ----------------------------------------------------------
   TRANSIÇÃO DE PÁGINA
---------------------------------------------------------- */
;(function () {
  const pt = $('#pt');
  if (!pt || rm()) return;

  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const h = a.getAttribute('href');
    if (!h || h.startsWith('http') || h.startsWith('#') ||
        h.startsWith('mailto') || h.startsWith('tel') ||
        a.target === '_blank') return;
    e.preventDefault();
    pt.classList.add('on');
    setTimeout(() => { window.location.href = h; }, 280);
  });
})();

/* ----------------------------------------------------------
   SCROLL REVEAL genérico
---------------------------------------------------------- */
;(function () {
  if (rm()) { $$('.fi').forEach(el => el.classList.add('in')); return; }
  const obs = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  $$('.fi').forEach(el => obs.observe(el));
})();

/* ----------------------------------------------------------
   GRID DE PROJETOS — só na index
---------------------------------------------------------- */
;(function () {
  const grid   = $('#grid');
  const fwrap  = $('#filter-wrap');
  if (!grid || !fwrap) return;

  /* ── mapa categoria → label ── */
  const catMap = {};
  CATEGORIAS.forEach(c => { catMap[c.slug] = c.label; });

  /* ── filtros ── */
  CATEGORIAS.forEach(cat => {
    const btn = document.createElement('button');
    btn.className     = 'chip';
    btn.dataset.cat   = cat.slug;
    btn.textContent   = cat.label;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', cat.slug === 'todos' ? 'true' : 'false');
    if (cat.slug === 'todos') btn.classList.add('on');
    fwrap.appendChild(btn);
  });

  /* ── cards ── */
  const frag = document.createDocumentFragment();

  PROJETOS.forEach((p, i) => {
    const wrap = document.createElement('div');
    wrap.className    = 'card-wrap';
    wrap.dataset.cat  = p.categoria;
    wrap.setAttribute('role', 'listitem');

    const prevUrl = getPreviewUrl(p);
    const fbUrl   = getPreviewFallbackUrl(p);
    const noMedia = !prevUrl;
    const catLbl  = catMap[p.categoria] || p.categoria;
    const num     = String(i + 1).padStart(2, '0');

    wrap.innerHTML = `
      <a href="project.html?id=${encodeURIComponent(p.id)}"
         class="card"
         aria-label="${p.titulo} — ${catLbl}">

        ${noMedia
          ? `<div class="card-skel" aria-hidden="true"></div>`
          : `<img class="card-thumb"
                  src="${prevUrl}"
                  alt="Prévia de ${p.titulo}"
                  loading="lazy"
                  decoding="async"
                  onerror="if(!this.dataset.fb){this.dataset.fb=1;this.src='${fbUrl}'}"
             />`
        }

        <div class="card-overlay" aria-hidden="true"></div>

        <div class="card-info">
          <p class="card-cat">${catLbl}</p>
          <p class="card-name">${p.titulo}</p>
        </div>

        <span class="card-num" aria-hidden="true">${num}</span>
      </a>`;

    frag.appendChild(wrap);
  });

  grid.appendChild(frag);

  /* ── scroll reveal dos cards ── */
  if (!rm()) {
    const obs = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) {
          /* delay escalonado por coluna */
          const cols = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
          const idx  = $$('.card-wrap').indexOf(e.target);
          e.target.style.transitionDelay = `${(idx % cols) * 0.06}s`;
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });
    $$('.card-wrap').forEach(w => obs.observe(w));
  } else {
    $$('.card-wrap').forEach(w => w.classList.add('in'));
  }

  /* ── filtragem ── */
  let active = 'todos';

  function applyFilter(cat, btn) {
    active = cat;

    /* atualiza chips */
    $$('.chip').forEach(c => {
      c.classList.toggle('on', c.dataset.cat === cat);
      c.setAttribute('aria-selected', String(c.dataset.cat === cat));
    });

    /* URL */
    const url = new URL(location.href);
    cat === 'todos' ? url.searchParams.delete('categoria') : url.searchParams.set('categoria', cat);
    history.replaceState(null, '', url.toString());

    const cards = $$('.card-wrap');
    let vis = 0;

    if (rm()) {
      cards.forEach(w => {
        const show = cat === 'todos' || w.dataset.cat === cat;
        w.classList.toggle('hide', !show);
        if (show) vis++;
      });
    } else {
      /* fase out */
      cards.forEach(w => {
        if (!w.classList.contains('hide') && cat !== 'todos' && w.dataset.cat !== cat)
          w.classList.add('out');
      });
      setTimeout(() => {
        cards.forEach(w => {
          const show = cat === 'todos' || w.dataset.cat === cat;
          w.classList.remove('out');
          w.classList.toggle('hide', !show);
          if (show) { w.classList.add('in'); vis++; }
        });
        const empty = $('#grid-empty');
        if (empty) empty.style.display = vis ? 'none' : 'block';
      }, 220);
      return;
    }

    const empty = $('#grid-empty');
    if (empty) empty.style.display = vis ? 'none' : 'block';
  }

  fwrap.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip || chip.dataset.cat === active) return;
    applyFilter(chip.dataset.cat, chip);
  });

  /* filtro inicial via URL */
  const initCat = new URLSearchParams(location.search).get('categoria');
  if (initCat && catMap[initCat]) {
    applyFilter(initCat);
  }
})();
