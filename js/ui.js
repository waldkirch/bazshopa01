/* ==========================================================================
   baz · ui.js
   Wiederverwendbare UI: Produktkarten, Varianten-Picker, Layer (Drawer,
   Modals), Toasts, Header, Mega-Menü, Footer, Scroll-Effekte, Bildmarke.
   ========================================================================== */
(function (B) {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  B.$ = $; B.$$ = $$; B.esc = esc;
  const mq = matchMedia('(prefers-reduced-motion: reduce)');
  B.reduced = mq.matches;
  mq.addEventListener && mq.addEventListener('change', e => { B.reduced = e.matches; document.documentElement.classList.toggle('reduce-motion', e.matches); });
  document.documentElement.classList.toggle('reduce-motion', B.reduced);
  const icon = B.icon;

  /* ---------- Badges & Preise ---------- */
  B.badges = (p, extraCls = '') => {
    const list = [];
    if (!B.inStock(p)) list.push(['Ausverkauft', 'badge--out']);
    p.badges.forEach(k => { const b = B.BADGES[k]; if (b) list.push([k === 'sale' ? `−${p.sale} %` : b.label, b.cls]); });
    return list.length ? `<ul class="badges ${extraCls}">${list.map(([l, c]) => `<li class="badge ${c}">${l}</li>`).join('')}</ul>` : '';
  };
  B.priceHtml = (p, sizeIdx, optIdx, opts = {}) => {
    const fixed = sizeIdx != null;
    const multi = !fixed && (p.sizes.length > 1 || !!p.option);
    const now = fixed ? B.price(p, sizeIdx, optIdx) : B.minPrice(p);
    const was = fixed ? B.basePrice(p, sizeIdx, optIdx) : Math.min(...p.sizes.map((_, i) => B.basePrice(p, i, p.option ? 0 : undefined)));
    const from = multi ? '<span class="price__from">ab</span> ' : '';
    if (p.sale) return `<span class="price ${opts.cls || ''}">${from}<strong class="price__now price__now--sale">${B.money(now)}</strong> <s class="price__was"><span class="visually-hidden">statt </span>${B.money(was)}</s></span>`;
    return `<span class="price ${opts.cls || ''}">${from}<strong class="price__now">${B.money(now)}</strong></span>`;
  };
  B.stockHtml = p => {
    if (!B.inStock(p)) return `<p class="stock stock--out"><span class="stock__dot"></span>Ausverkauft – wir benachrichtigen dich gern</p>`;
    if (B.lowStock(p)) return `<p class="stock stock--low"><span class="stock__dot"></span>Nur noch ${p.stock} Stück verfügbar</p>`;
    return `<p class="stock stock--in"><span class="stock__dot"></span>Auf Lager · Versand in 1–2 Werktagen</p>`;
  };

  /* ---------- Produktkarte ---------- */
  B.card = (p, i = 0, o = {}) => {
    const sold = !B.inStock(p), fk = p.fabrics[0];
    const wish = B.wish.has(p.id);
    const quick = sold ? `<a class="pcard__quick" href="#p-${p.id}">Benachrichtigen</a>`
      : `<button class="pcard__quick" type="button" data-action="quick" data-id="${p.id}">${(p.sizes.length > 1 || p.option || p.fabrics.length > 1) ? 'Schnell wählen' : 'In den Warenkorb'}</button>`;
    return `<article class="pcard ${sold ? 'is-soldout' : ''} ${o.cls || ''}" data-card="${p.id}" data-reveal style="--i:${i % 6}">
  <div class="pcard__media">
    <a class="pcard__link" href="#p-${p.id}" tabindex="-1" aria-hidden="true">
      <span class="pcard__img pcard__img--a">${B.art.product(p, fk)}</span>
      <span class="pcard__img pcard__img--b">${B.art.product(p, fk, 'detail')}</span>
    </a>
    ${B.badges(p, 'pcard__badges')}
    <button class="pcard__wish ${wish ? 'is-on' : ''}" type="button" data-action="wish" data-id="${p.id}" aria-pressed="${wish}" aria-label="${p.name} ${wish ? 'von der Merkliste entfernen' : 'auf die Merkliste'}">${icon('heart')}</button>
    ${quick}
  </div>
  <div class="pcard__body">
    <p class="pcard__type">${esc(p.type)}</p>
    <h3 class="pcard__name"><a href="#p-${p.id}">${esc(p.name)}</a></h3>
    ${o.list ? `<p class="pcard__desc">${esc(p.short)}</p>` : ''}
    <div class="pcard__meta">
      ${B.priceHtml(p)}
      ${p.fabrics.length > 1 ? `<div class="pcard__swatches" role="group" aria-label="Farben">${p.fabrics.map((k, n) => `<button type="button" class="dot sw--${k} ${n === 0 ? 'is-on' : ''}" data-action="card-fabric" data-id="${p.id}" data-fabric="${k}" aria-label="Farbe ${B.FABRICS[k].name}" aria-pressed="${n === 0}"></button>`).join('')}</div>` : ''}
    </div>
    ${B.lowStock(p) ? `<p class="pcard__stock">Nur noch ${p.stock} verfügbar</p>` : ''}
  </div>
</article>`;
  };

  /* ---------- Varianten-Picker (PDP & Schnellansicht) ---------- */
  B.picker = (p, st, ctx) => {
    const F = B.FABRICS;
    let h = `<fieldset class="pick"><legend class="pick__label">Farbe <span class="pick__val" data-pick-val="fabric">${F[st.fabric].name}</span></legend>
<div class="swatches">${p.fabrics.map(k => `<label class="swatch"><input type="radio" name="${ctx}-fabric" value="${k}" data-pick="fabric" ${k === st.fabric ? 'checked' : ''}><span class="swatch__dot sw--${k}"></span><span class="visually-hidden">${F[k].name}</span></label>`).join('')}</div></fieldset>`;
    h += `<fieldset class="pick"><legend class="pick__label">Größe <span class="pick__val" data-pick-val="size">${p.sizes[st.size].label}</span></legend>
<div class="sizes">${p.sizes.map((s, i) => `<label class="size"><input type="radio" name="${ctx}-size" value="${i}" data-pick="size" ${i === st.size ? 'checked' : ''}><span>${s.label}</span></label>`).join('')}</div></fieldset>`;
    if (p.option) h += `<fieldset class="pick"><legend class="pick__label">${p.option.label}</legend>
<div class="opts">${p.option.values.map((v, i) => `<label class="opt"><input type="radio" name="${ctx}-opt" value="${i}" data-pick="opt" ${i === st.opt ? 'checked' : ''}><span class="opt__box"><strong>${v.label}</strong><small>${v.note}</small><em>${v.delta ? (v.delta > 0 ? '+' : '−') + B.money(Math.abs(v.delta)) : 'Basis'}</em></span></label>`).join('')}</div></fieldset>`;
    return h;
  };
  B.qtyStepper = (val, attrs = '', max = 99) => `<div class="qty" ${attrs}><button type="button" class="qty__btn" data-qty="-1" aria-label="Menge verringern">${icon('minus')}</button><input class="qty__input" type="number" inputmode="numeric" min="1" max="${max}" value="${val}" aria-label="Menge"><button type="button" class="qty__btn" data-qty="1" aria-label="Menge erhöhen">${icon('plus')}</button></div>`;

  /* ---------- Layer: Drawer & Dialoge mit Fokusfalle ---------- */
  let layerStack = [];
  const focusables = el => $$('a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select,textarea,[tabindex]:not([tabindex="-1"])', el).filter(x => x.offsetParent !== null || x === document.activeElement);
  B.openLayer = (id, opener) => {
    const el = document.getElementById(id); if (!el) return;
    if (layerStack.find(l => l.el === el)) return;
    el.hidden = false;
    requestAnimationFrame(() => el.classList.add('is-open'));
    layerStack.push({ el, opener: opener || document.activeElement });
    document.documentElement.classList.add('is-locked');
    $('.scrim').classList.add('is-on');
    setTimeout(() => { const f = el.querySelector('[data-autofocus]') || focusables(el)[0]; f && f.focus({ preventScroll: true }); }, 60);
  };
  B.closeLayer = (id) => {
    const idx = id ? layerStack.findIndex(l => l.el.id === id) : layerStack.length - 1;
    if (idx < 0) return;
    const { el, opener } = layerStack.splice(idx, 1)[0];
    el.classList.remove('is-open');
    setTimeout(() => { if (!el.classList.contains('is-open')) el.hidden = true; }, 420);
    if (!layerStack.length) { document.documentElement.classList.remove('is-locked'); $('.scrim').classList.remove('is-on'); }
    opener && opener.focus && opener.focus({ preventScroll: true });
  };
  B.closeAllLayers = () => { while (layerStack.length) B.closeLayer(); };
  /* Vollflächiger Ladezustand (z. B. Zahlungsabwicklung) */
  B.processing = (on, text = '') => {
    const el = $('.processing'); if (!el) return;
    if (on) { el.querySelector('.processing__txt').textContent = text; el.hidden = false; requestAnimationFrame(() => el.classList.add('is-on')); }
    else { el.classList.remove('is-on'); setTimeout(() => { if (!el.classList.contains('is-on')) el.hidden = true; }, 400); }
  };
  document.addEventListener('keydown', e => {
    if (!layerStack.length) return;
    const top = layerStack[layerStack.length - 1].el;
    if (e.key === 'Escape') { e.preventDefault(); B.closeLayer(); return; }
    if (e.key === 'Tab') {
      const f = focusables(top); if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- Toasts ---------- */
  B.toast = ({ type = 'success', title, text = '', action } = {}) => {
    const reg = $('.toasts');
    const ic = { success: 'check', error: 'alert', info: 'info', warning: 'alert' }[type];
    const t = document.createElement('div');
    t.className = `toast toast--${type}`;
    t.setAttribute('role', type === 'error' ? 'alert' : 'status');
    t.innerHTML = `<span class="toast__icon">${icon(ic)}</span><div class="toast__body"><strong>${esc(title)}</strong>${text ? `<p>${text}</p>` : ''}${action ? (action.href ? `<a class="toast__action" href="${action.href}">${esc(action.label)}</a>` : `<button class="toast__action" type="button" data-action="${action.act}">${esc(action.label)}</button>`) : ''}</div><button class="toast__close" type="button" aria-label="Meldung schließen">${icon('close')}</button>`;
    reg.appendChild(t);
    requestAnimationFrame(() => t.classList.add('is-in'));
    let timer;
    const kill = () => { t.classList.remove('is-in'); t.classList.add('is-out'); setTimeout(() => t.remove(), 400); };
    const arm = () => { timer = setTimeout(kill, type === 'error' ? 7000 : 4500); };
    t.addEventListener('mouseenter', () => clearTimeout(timer));
    t.addEventListener('mouseleave', arm);
    t.querySelector('.toast__close').addEventListener('click', kill);
    arm();
  };

  /* ---------- Formular-Validierung ---------- */
  const MSG = {
    required: 'Bitte fülle dieses Feld aus.',
    email: 'Bitte gib eine gültige E-Mail-Adresse ein, z. B. name@beispiel.de.',
    minlength: n => `Bitte mindestens ${n} Zeichen eingeben.`,
    pattern: el => el.dataset.msg || 'Bitte prüfe das Format.',
    checkbox: 'Bitte bestätige dieses Feld.',
    match: 'Die Eingaben stimmen nicht überein.'
  };
  B.validateField = el => {
    const v = (el.value || '').trim();
    let err = '';
    if (el.type === 'checkbox') { if (el.required && !el.checked) err = MSG.checkbox; }
    else if (el.required && !v) err = MSG.required;
    else if (v && el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) err = MSG.email;
    else if (v && el.minLength > 0 && v.length < el.minLength) err = MSG.minlength(el.minLength);
    else if (v && el.pattern && !new RegExp('^(?:' + el.pattern + ')$').test(v)) err = MSG.pattern(el);
    else if (el.dataset.match) { const o = document.getElementById(el.dataset.match); if (o && o.value !== el.value) err = MSG.match; }
    const field = el.closest('.field') || el.parentElement;
    let msg = field.querySelector('.field__error');
    if (err) {
      if (!msg) { msg = document.createElement('p'); msg.className = 'field__error'; msg.id = (el.id || el.name) + '-err'; field.appendChild(msg); }
      msg.innerHTML = icon('alert') + '<span>' + err + '</span>';
      el.setAttribute('aria-invalid', 'true'); el.setAttribute('aria-describedby', msg.id);
      field.classList.add('is-invalid'); field.classList.remove('is-valid');
    } else {
      msg && msg.remove();
      el.removeAttribute('aria-invalid'); el.removeAttribute('aria-describedby');
      field.classList.remove('is-invalid'); if (v) field.classList.add('is-valid');
    }
    return !err;
  };
  B.validateForm = form => {
    const fields = $$('input,select,textarea', form).filter(el => !el.disabled && el.type !== 'hidden' && el.offsetParent !== null);
    let first = null;
    fields.forEach(el => { if (!B.validateField(el) && !first) first = el; });
    if (first) { first.focus(); return false; }
    return true;
  };
  document.addEventListener('blur', e => { const el = e.target; if (el.matches && el.matches('.field input, .field select, .field textarea') && (el.value || el.closest('.field').classList.contains('is-invalid'))) B.validateField(el); }, true);
  document.addEventListener('input', e => { const el = e.target; if (el.matches && el.matches('[aria-invalid="true"]')) B.validateField(el); });

  /* ---------- Bildmarke als Cross-Page-Element ---------- */
  const POSES = {
    home:        { x: 54, y: -6, s: 1.15, r: -8, o: .9 },
    shop:        { x: 70, y: 4, s: .7, r: 18, o: .55 },
    category:    { x: 66, y: 2, s: .82, r: 32, o: .6 },
    product:     { x: -18, y: 46, s: .9, r: -24, o: .45 },
    unternehmen: { x: 58, y: 20, s: 1.3, r: 12, o: .6 },
    philosophie: { x: 20, y: -10, s: 1.6, r: -40, o: .5 },
    service:     { x: 74, y: 30, s: .75, r: 50, o: .5 },
    konto:       { x: 70, y: 40, s: .8, r: 10, o: .45 },
    kasse:       { x: 86, y: 70, s: .5, r: 0, o: .3 },
    danke:       { x: 34, y: 8, s: 1.2, r: 0, o: 1 },
    legal:       { x: 80, y: 60, s: .5, r: 0, o: .35 }
  };
  B.burstTo = (name) => {
    const pose = POSES[name] || POSES.home, el = $('.burst-pose');
    if (!el) return;
    el.style.setProperty('--bx', pose.x + 'vw'); el.style.setProperty('--by', pose.y + 'vh');
    el.style.setProperty('--bs', pose.s); el.style.setProperty('--br', pose.r + 'deg'); el.style.setProperty('--bo', pose.o);
  };

  /* ---------- Scroll-Effekte: Reveal, Parallax, Wort-Highlight, Header ---------- */
  let io;
  B.observe = (root = document) => {
    const els = $$('[data-reveal]:not(.is-in)', root);
    if (B.reduced || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('is-in')); return; }
    io = io || new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: .12 });
    els.forEach(e => io.observe(e));
  };
  /* Buchstaben-Hover: Überschriften in Wort- und Zeichen-Spans zerlegen.
     Screenreader lesen das aria-label; Links/Buttons bleiben unangetastet. */
  const CHAR_SEL = 'h1, h2, h3, .hero__mega, .footer__mega, .offer__mega, .slow__mega, .cta-band__mega, .nf__mega, .manifesto__lines li, .high__no, .pillar__no, .mega__claim, .ctile__all';
  B.splitChars = (root = document) => {
    $$(CHAR_SEL, root).forEach(el => {
      if (el.dataset.chars || el.closest('a, button, [data-words], .visually-hidden, .chat, .toast') || el.querySelector('a, button, input, select, textarea, [data-words]')) return;
      el.dataset.chars = '1';
      const hidden = !!el.closest('[aria-hidden="true"]');
      if (!hidden && !el.hasAttribute('aria-label')) el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
      const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [];
      while (tw.nextNode()) nodes.push(tw.currentNode);
      nodes.forEach(n => {
        if (!n.nodeValue.trim() || n.parentElement.closest('svg')) return;
        const frag = document.createDocumentFragment();
        n.nodeValue.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const w = document.createElement('span'); w.className = 'wd'; if (!hidden) w.setAttribute('aria-hidden', 'true');
          [...part].forEach(c => { const s = document.createElement('span'); s.className = 'ch'; s.textContent = c; w.appendChild(s); });
          frag.appendChild(w);
        });
        n.replaceWith(frag);
      });
    });
  };
  B.splitWords = root => $$('[data-words]', root).forEach(el => {
    if (el.dataset.split) return; el.dataset.split = 1;
    el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="w">${esc(w)}</span>`).join(' ');
  });

  let ticking = false, lastY = 0;
  const onScroll = () => {
    const y = window.scrollY, vh = innerHeight;
    const hdr = $('.site-header');
    if (hdr) {
      hdr.classList.toggle('is-scrolled', y > 8);
      const hide = y > 480 && y > lastY + 4 && !document.documentElement.classList.contains('is-locked') && !hdr.classList.contains('mega-open');
      if (hide) hdr.classList.add('is-hidden'); else if (y < lastY - 4 || y < 480) hdr.classList.remove('is-hidden');
    }
    lastY = y;
    if (!B.reduced) {
      const spin = $('.burst-spin');
      if (spin) spin.style.transform = `rotate(${y * .035}deg) scale(${1 + Math.min(y / 6000, .18)})`;
      $$('[data-parallax]').forEach(el => {
        const r = el.getBoundingClientRect(); if (r.bottom < -200 || r.top > vh + 200) return;
        const f = parseFloat(el.dataset.parallax) || .1;
        el.style.transform = `translate3d(0, ${((r.top + r.height / 2) - vh / 2) * f}px, 0)`;
      });
      $$('[data-words]').forEach(el => {
        const r = el.getBoundingClientRect();
        const prog = Math.min(1, Math.max(0, (vh * .85 - r.top) / (r.height + vh * .35)));
        const ws = el.querySelectorAll('.w'), n = Math.round(prog * ws.length);
        ws.forEach((w, i) => w.classList.toggle('is-on', i < n));
      });
      $$('[data-hscroll]').forEach(el => {
        if (innerWidth < 900) { el.style.transform = ''; return; }
        const wrap = el.closest('.hcats'), r = wrap.getBoundingClientRect();
        const max = el.scrollWidth - innerWidth + 80;
        const prog = Math.min(1, Math.max(0, -r.top / (r.height - vh)));
        el.style.transform = `translate3d(${-prog * Math.max(0, max)}px,0,0)`;
      });
    } else {
      $$('[data-words] .w').forEach(w => w.classList.add('is-on'));
    }
    const sticky = $('.sticky-atc');
    if (sticky) { const btn = $('[data-main-atc]'); if (btn) { const r = btn.getBoundingClientRect(); const show = r.bottom < 0; sticky.classList.toggle('is-on', show); document.body.classList.toggle('has-sticky-atc', show); } }
    const prog = $('.scroll-progress'); if (prog) { const h = document.documentElement.scrollHeight - vh; prog.style.transform = `scaleX(${h > 0 ? y / h : 0})`; }
    ticking = false;
  };
  B.onScroll = onScroll;
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', () => requestAnimationFrame(onScroll));

  /* ---------- Fly-to-Cart Mikrointeraktion ---------- */
  B.flyToCart = (fromEl) => {
    const hdr = $('.site-header'); if (hdr) hdr.classList.remove('is-hidden');
    const cart = $('.cart-btn'); if (!fromEl || !cart || B.reduced) { bump(); return; }
    const a = fromEl.getBoundingClientRect(), b = cart.getBoundingClientRect();
    const dot = document.createElement('span'); dot.className = 'fly-dot';
    dot.innerHTML = B.burst('#FFDE48');
    document.body.appendChild(dot);
    const sx = a.left + a.width / 2, sy = a.top + a.height / 2, ex = b.left + b.width / 2, ey = b.top + b.height / 2;
    const anim = dot.animate([
      { transform: `translate(${sx}px,${sy}px) scale(1) rotate(0deg)`, opacity: 1 },
      { transform: `translate(${(sx + ex) / 2}px,${Math.min(sy, ey) - 140}px) scale(1.5) rotate(180deg)`, opacity: 1, offset: .5 },
      { transform: `translate(${ex}px,${ey}px) scale(.35) rotate(360deg)`, opacity: .2 }
    ], { duration: 820, easing: 'cubic-bezier(.5,0,.3,1)' });
    anim.onfinish = () => { dot.remove(); bump(); };
  };
  function bump() { const c = $('.cart-btn'); if (!c) return; c.classList.remove('is-bump'); void c.offsetWidth; c.classList.add('is-bump'); }

  /* ---------- Akkordeons ---------- */
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-acc]'); if (!btn) return;
    const open = btn.getAttribute('aria-expanded') !== 'true';
    const group = btn.closest('[data-acc-group="single"]');
    if (group && open) $$('[data-acc][aria-expanded="true"]', group).forEach(b => { b.setAttribute('aria-expanded', 'false'); document.getElementById(b.getAttribute('aria-controls')).classList.remove('is-open'); });
    btn.setAttribute('aria-expanded', open);
    document.getElementById(btn.getAttribute('aria-controls')).classList.toggle('is-open', open);
  });
  let accN = 0;
  B.acc = (title, body, open = false) => { const id = 'acc' + (++accN); return `<div class="acc"><h3 class="acc__h"><button class="acc__btn" type="button" data-acc aria-expanded="${open}" aria-controls="${id}"><span>${title}</span><span class="acc__ic" aria-hidden="true"></span></button></h3><div class="acc__panel ${open ? 'is-open' : ''}" id="${id}" role="region"><div class="acc__inner">${body}</div></div></div>`; };

  /* ---------- Header: Mega-Menü & Mobile Navigation ---------- */
  B.renderChrome = () => {
    $('.brand').innerHTML = B.logo({ tagline: false, label: 'baz – zur Startseite' });
    const cats = B.CATEGORIES;
    $('#mega').innerHTML = `<div class="mega__inner container">
  <div class="mega__intro"><p class="eyebrow">Kategorien</p><p class="mega__claim">Alles, was weich ist – von Hand gemacht.</p><a class="link-arrow" href="#shop">Alle Produkte ${icon('arrow')}</a></div>
  <ul class="mega__grid">${cats.map(c => `<li><a class="mega__item" href="#kat-${c.id}"><span class="mega__art">${B.art.category(c)}</span><span class="mega__name">${c.name}</span><span class="mega__sub">${c.claim}</span></a></li>`).join('')}</ul>
</div>`;
    $('#mobile-nav').innerHTML = `<div class="mnav">
  <div class="mnav__head"><span class="mnav__logo">${B.logo({ tagline: false })}</span><button class="icon-btn" type="button" data-action="close-layer" aria-label="Menü schließen">${icon('close')}</button></div>
  <nav aria-label="Mobile Navigation"><ul class="mnav__list">
    ${[['#start', 'Start'], ['#shop', 'Shop'], ['#unternehmen', 'Unternehmen'], ['#philosophie', 'Philosophie'], ['#service', 'Service']].map(([h, l], i) => `<li style="--i:${i}"><a href="${h}">${l}</a></li>`).join('')}
  </ul>
  <p class="mnav__label">Kategorien</p>
  <ul class="mnav__cats">${cats.map(c => `<li><a href="#kat-${c.id}">${c.name}</a></li>`).join('')}</ul></nav>
  <div class="mnav__foot"><a class="btn btn--ghost btn--block" href="#konto">${icon('user')} Mein Konto</a><button class="btn btn--primary btn--block" type="button" data-action="open-cart">${icon('bag')} <span>Warenkorb (<span data-cart-count>0</span>)</span></button></div>
</div>`;
    renderFooter();
  };
  B.closeMega = () => { const btn = $('[data-action="toggle-mega"]'); if (!btn) return; btn.setAttribute('aria-expanded', 'false'); $('#mega').classList.remove('is-open'); $('.site-header').classList.remove('mega-open'); setTimeout(() => { if (!$('#mega').classList.contains('is-open')) $('#mega').hidden = true; }, 350); };
  B.toggleMega = (force) => {
    const btn = $('[data-action="toggle-mega"]'), mega = $('#mega');
    const open = force ?? btn.getAttribute('aria-expanded') !== 'true';
    if (!open) return B.closeMega();
    mega.hidden = false; requestAnimationFrame(() => mega.classList.add('is-open'));
    btn.setAttribute('aria-expanded', 'true'); $('.site-header').classList.add('mega-open');
  };

  function renderFooter() {
    $('.site-footer').innerHTML = `<div class="container">
  <div class="footer__top">
    <div class="footer__brand">${B.logo({ label: 'baz – soft happenz' })}<p>Handgefertigte Bettwäsche, Kissen und Wohnaccessoires aus Alpakawolle. Gemacht, um zu bleiben.</p></div>
    <nav class="footer__cols" aria-label="Footer">
      <div><h2 class="footer__h">Shop</h2><ul><li><a href="#shop">Alle Produkte</a></li>${B.CATEGORIES.map(c => `<li><a href="#kat-${c.id}">${c.name}</a></li>`).join('')}</ul></div>
      <div><h2 class="footer__h">baz</h2><ul><li><a href="#unternehmen">Über uns</a></li><li><a href="#philosophie">Philosophie</a></li><li><a href="#unternehmen-nachhaltigkeit">Nachhaltigkeit</a></li><li><a href="#konto">Kundenkonto</a></li></ul></div>
      <div><h2 class="footer__h">Service</h2><ul><li><a href="#service">Hilfe & FAQ</a></li><li><a href="#service-versand">Versand & Lieferung</a></li><li><a href="#service-rueckgabe">Rückgabe & Widerruf</a></li><li><a href="#service-status">Bestellstatus</a></li><li><a href="#service-kontakt">Kontakt</a></li></ul></div>
      <div><h2 class="footer__h">Rechtliches</h2><ul>${B.LEGAL.map(l => `<li><a href="#recht-${l.id}">${l.name}</a></li>`).join('')}<li><button class="linklike" type="button" data-action="cookie-settings">Cookie-Einstellungen</button></li></ul></div>
    </nav>
  </div>
  <div class="footer__pay" aria-label="Zahlungsarten"><span>Sicher bezahlen über Stripe</span><ul>${['Visa', 'Mastercard', 'Apple Pay', 'Google Pay', 'Klarna', 'SEPA'].map(x => `<li>${x}</li>`).join('')}</ul></div>
  <p class="footer__mega" aria-hidden="true">soft happenz</p>
  <div class="footer__bottom"><p>© ${new Date().getFullYear()} baz · UI-Prototyp</p><p>Demo-Inhalte: Preise, Bestände und Texte sind beispielhaft. Produktbilder sind Illustrationen, keine Fotos realer Produkte.</p></div>
</div>`;
  }

  B.LEGAL = [
    { id: 'impressum', name: 'Impressum', needs: ['Firmenname & Rechtsform', 'Anschrift', 'Vertretungsberechtigte Person(en)', 'Kontakt (E-Mail, Telefon)', 'Registergericht & -nummer', 'USt-IdNr.', 'Verantwortlich i. S. d. § 18 Abs. 2 MStV'] },
    { id: 'datenschutz', name: 'Datenschutz', needs: ['Verantwortliche Stelle', 'Hosting-Anbieter', 'WooCommerce & Kundenkonto', 'Stripe (Zahlungsabwicklung, Drittlandtransfer)', 'Newsletter-Dienst & Double-Opt-in', 'Cookies & Consent-Tool', 'Betroffenenrechte'] },
    { id: 'agb', name: 'AGB', needs: ['Geltungsbereich', 'Vertragsschluss', 'Preise & Versandkosten', 'Zahlung', 'Eigentumsvorbehalt', 'Gewährleistung', 'Streitbeilegung'] },
    { id: 'widerruf', name: 'Widerrufsbelehrung', needs: ['Muster-Widerrufsbelehrung (Anlage 1 EGBGB)', 'Widerrufsformular (Anlage 2 EGBGB)', 'Freiwillige 30-Tage-Rückgabe (optional)'] },
    { id: 'versand', name: 'Versand & Zahlung', needs: ['Liefergebiete', 'Versandkosten je Land', 'Lieferzeiten', 'Zahlungsarten via Stripe'] }
  ];

  /* ---------- Cookie-Hinweis ---------- */
  B.renderCookie = (force) => {
    const el = $('.cookie');
    if (!force && B.state.cookies) { el.hidden = true; return; }
    el.hidden = false;
    el.innerHTML = `<div class="cookie__inner"><div><h2 class="cookie__h">Kekse? Nur die guten.</h2><p>Wir nutzen notwendige Cookies für Warenkorb und Checkout. Optionale Statistik hilft uns, den Shop zu verbessern. <a href="#recht-datenschutz">Mehr erfahren</a></p>
<div class="cookie__opts" hidden><label class="check"><input type="checkbox" checked disabled><span>Notwendig</span></label><label class="check"><input type="checkbox" data-ck="stats"><span>Statistik</span></label><label class="check"><input type="checkbox" data-ck="marketing"><span>Marketing</span></label></div></div>
<div class="cookie__actions"><button class="btn btn--ghost btn--sm" type="button" data-action="cookie-more">Einstellungen</button><button class="btn btn--ghost btn--sm" type="button" data-action="cookie-min">Nur notwendige</button><button class="btn btn--primary btn--sm" type="button" data-action="cookie-all">Alle akzeptieren</button></div></div>`;
    requestAnimationFrame(() => el.classList.add('is-in'));
  };
})(window.BAZ = window.BAZ || {});
