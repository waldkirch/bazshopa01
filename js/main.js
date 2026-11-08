/* ==========================================================================
   baz · main.js
   Hash-Router mit Seitenübergängen, globale Event-Delegation, Initialisierung.
   Routen (nur #name): start, shop, kat-<id>, p-<id>, unternehmen, philosophie,
   service[-anker], konto[-anker], kasse, danke, recht-<id>
   ========================================================================== */
(function (B) {
  'use strict';
  const { $, $$, icon } = B;
  const V = B.views;
  const wait = ms => new Promise(r => setTimeout(r, ms));

  function resolve(hash) {
    const h = decodeURIComponent((hash || '').replace(/^#/, '')) || 'start';
    if (h === 'start') return { key: 'home', nav: 'start', make: () => V.home() };
    if (h === 'shop') return { key: 'shop', nav: 'shop', make: () => V.shop() };
    if (h.startsWith('kat-')) return { key: h, nav: 'shop', make: () => V.shop(h.slice(4)) };
    if (h.startsWith('p-')) return { key: h, nav: 'shop', make: () => V.product(h.slice(2)) };
    if (h.startsWith('recht-')) return { key: h, make: () => V.legal(h.slice(6)) };
    const [base, ...rest] = h.split('-'), anchor = rest.join('-');
    const map = { unternehmen: V.about, philosophie: V.philosophy, service: V.service, konto: V.account, kasse: V.checkout, danke: V.thanks };
    if (map[base]) return { key: base, nav: base, anchor, make: () => map[base]() };
    return { key: '404', make: () => V.notFound() };
  }

  let current = null, first = true, busy = false, queued = false;
  async function route() {
    if (busy) { queued = true; return; }
    busy = true;
    const r = resolve(location.hash);
    const app = $('[data-app]');
    B.closeAllLayers(); B.closeMega();
    $$('.toast--error').forEach(t => t.remove());
    const samePage = current && current.key === r.key && r.anchor;
    if (samePage) { scrollToAnchor(r.anchor); busy = false; return; }
    const bar = $('.route-bar');
    if (!first) { bar.classList.remove('is-done'); void bar.offsetWidth; bar.classList.add('is-loading'); }
    if (!first && !B.reduced) { app.classList.add('is-leaving'); await wait(320); }
    const view = r.make();
    app.innerHTML = view.html;
    document.title = view.title;
    document.body.classList.toggle('is-checkout', r.key === 'kasse');
    document.body.classList.remove('has-sticky-atc');
    B.burstTo(view.pose);
    $$('.main-nav a[data-nav]').forEach(a => { if (a.dataset.nav === r.nav) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    if (r.anchor) setTimeout(() => scrollToAnchor(r.anchor), 60); else window.scrollTo(0, 0);
    view.mount && view.mount(app);
    B.splitWords(app); B.splitChars(app); B.observe(app);
    app.classList.remove('is-leaving');
    if (!first && !B.reduced) { app.classList.add('is-entering'); setTimeout(() => app.classList.remove('is-entering'), 900); }
    if (!first) { const h1 = app.querySelector('h1'); if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); } }
    requestAnimationFrame(B.onScroll);
    if (!first) { bar.classList.add('is-done'); setTimeout(() => bar.classList.remove('is-loading', 'is-done'), 700); }
    current = r; first = false; busy = false;
    if (queued) { queued = false; route(); }
  }
  function scrollToAnchor(id) {
    const el = document.getElementById(id); if (!el) return;
    const top = el.getBoundingClientRect().top + scrollY - 100;
    window.scrollTo({ top, behavior: B.reduced ? 'auto' : 'smooth' });
  }
  B.rerender = () => { current = null; const f = first; first = true; route().then(() => { first = f; }); };

  /* ---------- Globale Delegation ---------- */
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-action]');
    if (!a) {
      const link = e.target.closest('a[href^="#"]');
      if (link && link.getAttribute('href') === location.hash) { const r = resolve(location.hash); if (r.anchor) scrollToAnchor(r.anchor); else window.scrollTo({ top: 0, behavior: B.reduced ? 'auto' : 'smooth' }); }
      if (!e.target.closest('#mega') && !e.target.closest('[data-action="toggle-mega"]')) B.closeMega();
      if (!e.target.closest('.hotspot')) $$('.hotspot.is-open').forEach(h => { h.classList.remove('is-open'); h.querySelector('button').setAttribute('aria-expanded', 'false'); });
      return;
    }
    const act = a.dataset.action, id = a.dataset.id;
    switch (act) {
      case 'open-cart': B.closeAllLayers(); B.openLayer('cart', a); break;
      case 'open-search': B.openLayer('search', a); break;
      case 'open-menu': B.openLayer('mobile-nav', a); a.setAttribute('aria-expanded', 'true'); break;
      case 'open-filters': B.openLayer('filters', a); break;
      case 'close-layer': B.closeLayer(); $$('[data-action="open-menu"]').forEach(b => b.setAttribute('aria-expanded', 'false')); break;
      case 'toggle-mega': e.stopPropagation(); B.toggleMega(); break;
      case 'quick': B.views.openQuick(id, a); break;
      case 'add': B.addToCart(id, { size: 0, qty: 1 }, a); break;
      case 'add-bundle': a.dataset.ids.split(',').forEach((pid, i) => setTimeout(() => B.addToCart(pid, { size: 0, qty: 1 }, i === 0 ? a : null), i * 120)); break;
      case 'wish': {
        const on = B.wish.toggle(id), p = B.product(id);
        $$(`[data-action="wish"][data-id="${id}"]`).forEach(b => { b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
        B.toast({ type: on ? 'success' : 'info', title: on ? `${p.name} gemerkt` : `${p.name} von der Merkliste entfernt`, text: on ? 'Deine Merkliste findest du im Kundenkonto.' : '' });
        break;
      }
      case 'card-fabric': {
        const card = a.closest('.pcard'), p = B.product(id), fk = a.dataset.fabric;
        card.querySelector('.pcard__img--a').innerHTML = B.art.product(p, fk);
        card.querySelector('.pcard__img--b').innerHTML = B.art.product(p, fk, 'detail');
        $$('.dot', card).forEach(d => { d.classList.toggle('is-on', d === a); d.setAttribute('aria-pressed', d === a); });
        break;
      }
      case 'rail': { const tr = a.closest('.rail').querySelector('.rail__track'); tr.scrollBy({ left: +a.dataset.dir * tr.clientWidth * .8, behavior: B.reduced ? 'auto' : 'smooth' }); break; }
      case 'hotspot': { const h = a.closest('.hotspot'), open = !h.classList.contains('is-open'); $$('.hotspot.is-open').forEach(x => { x.classList.remove('is-open'); x.querySelector('button').setAttribute('aria-expanded', 'false'); }); h.classList.toggle('is-open', open); a.setAttribute('aria-expanded', open); break; }
      case 'copy-code': {
        const code = a.dataset.code;
        const done = () => B.toast({ type: 'success', title: `Code ${code} kopiert`, text: 'Im Warenkorb unter „Gutscheincode“ einfügen.' });
        try { navigator.clipboard.writeText(code).then(done, () => B.toast({ type: 'info', title: `Dein Code: ${code}`, text: 'Bitte manuell im Warenkorb eingeben.' })); } catch (err) { B.toast({ type: 'info', title: `Dein Code: ${code}` }); }
        break;
      }
      case 'search-all': B.shopState.pendingQ = a.dataset.q; B.closeLayer('search'); if (location.hash === '#shop') B.rerender(); else location.hash = 'shop'; setTimeout(() => { B.shopState.pendingQ = ''; }, 800); break;
      case 'logout': B.account.logout(); B.toast({ type: 'info', title: 'Abgemeldet', text: 'Bis bald!' }); B.rerender(); break;
      case 'toast-demo': B.toast({ type: 'info', title: 'Demo-Funktion', text: a.dataset.msg }); break;
      case 'cookie-more': $('.cookie__opts').hidden = !$('.cookie__opts').hidden; a.textContent = $('.cookie__opts').hidden ? 'Einstellungen' : 'Auswahl speichern'; if ($('.cookie__opts').hidden) closeCookie({ stats: $('[data-ck="stats"]').checked, marketing: $('[data-ck="marketing"]').checked }); break;
      case 'cookie-min': closeCookie({ stats: false, marketing: false }); break;
      case 'cookie-all': closeCookie({ stats: true, marketing: true }); break;
      case 'cookie-settings': B.renderCookie(true); break;
      case 'skip': { e.preventDefault(); const m = $('#main'); m.focus(); m.scrollIntoView(); break; }
      default: break;
    }
  });
  function closeCookie(v) { B.setCookies(v); const c = $('.cookie'); c.classList.remove('is-in'); setTimeout(() => { c.hidden = true; }, 400); }

  /* Mega-Menü: Hover auf Desktop */
  let megaT;
  document.addEventListener('pointerover', e => {
    if (e.pointerType !== 'mouse') return;
    const inMega = e.target.closest('.has-mega, #mega');
    clearTimeout(megaT);
    if (inMega) { if (!$('#mega').classList.contains('is-open')) megaT = setTimeout(() => B.toggleMega(true), 120); }
    else if ($('#mega').classList.contains('is-open') && !e.target.closest('.site-header')) megaT = setTimeout(B.closeMega, 220);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && $('#mega').classList.contains('is-open')) { B.closeMega(); $('[data-action="toggle-mega"]').focus(); } });

  /* Suche */
  document.addEventListener('input', e => { if (e.target.id === 'search-q') V.search(e.target.value); });
  document.addEventListener('submit', e => {
    if (!e.target.matches('[data-search-form]')) return;
    e.preventDefault(); const q = $('#search-q').value.trim(); if (!q) return;
    const first = $('.sresult'); if (first && $$('.sresult').length === 1) { location.hash = first.getAttribute('href').slice(1); return; }
    B.shopState.pendingQ = q; B.closeLayer('search'); if (location.hash === '#shop') B.rerender(); else location.hash = 'shop'; setTimeout(() => { B.shopState.pendingQ = ''; }, 800);
  });
  document.addEventListener('click', e => { const c = e.target.closest('[data-search-chip]'); if (!c) return; const i = $('#search-q'); i.value = c.dataset.searchChip; V.search(i.value); i.focus(); });

  /* ---------- Init ---------- */
  function init() {
    $('#search').innerHTML = `<div class="search__inner container">
  <form class="search__bar" data-search-form role="search"><label class="visually-hidden" for="search-q">Shop durchsuchen</label>${icon('search')}<input id="search-q" type="search" placeholder="Wonach suchst du?" autocomplete="off" data-autofocus><button class="icon-btn" type="button" data-action="close-layer" aria-label="Suche schließen">${icon('close')}</button></form>
  <div class="search__body"><div class="search__sugg"><p class="search__label">Beliebte Suchen</p><div class="chips">${['Kissen', 'Bettdecke', 'Bettwäsche', 'Sand', 'Pflege', 'Bouclé'].map(s => `<button class="chip" type="button" data-search-chip="${s}">${s}</button>`).join('')}</div></div><div class="search__results" data-search-results aria-live="polite"></div></div>
</div>`;
    $('#quick').innerHTML = `<div class="modal__box" role="document"><button class="icon-btn modal__close" type="button" data-action="close-layer" aria-label="Schnellansicht schließen">${icon('close')}</button><div class="modal__content"></div></div>`;
    document.body.insertAdjacentHTML('afterbegin', B.sunDefsSvg());
    $('.burst-spin').innerHTML = B.sun({ variant: 'gelb35', anim: true, cls: 'sun--bg' });
    $('.preloader__sun').innerHTML = B.sun({ anim: true, speed: 'fast' });
    $('.route-bar__sun').innerHTML = B.sun({ anim: true, speed: 'fast' });
    $('.processing__sun').innerHTML = B.sun({ anim: true, speed: 'fast' });
    document.documentElement.style.setProperty('--sun-loader', `url("${B.sunDataURI('#FFDE48')}")`);
    document.documentElement.style.setProperty('--sun-loader-zimt', `url("${B.sunDataURI('#AB5317')}")`);
    B.renderChrome();
    B.renderCart();
    B.initChat();
    B.renderCookie();
    B.splitChars(document);
    B.on('cart', B.renderCart);
    $('.scrim').addEventListener('click', () => { B.closeLayer(); $$('[data-action="open-menu"]').forEach(b => b.setAttribute('aria-expanded', 'false')); });
    window.addEventListener('hashchange', route);
    route();
    document.documentElement.classList.add('is-ready');
    /* Preloader: Ladebalken füllt sich, sobald Schriften bereit sind (max. 1,6 s) */
    const pre = $('.preloader'), t0 = performance.now();
    const done = () => { const wait = Math.max(0, (B.reduced ? 0 : 700) - (performance.now() - t0)); setTimeout(() => { pre.classList.add('is-done'); setTimeout(() => pre.remove(), 800); }, wait); };
    requestAnimationFrame(() => pre.classList.add('is-loading'));
    Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), wait(1600)]).then(done);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})(window.BAZ = window.BAZ || {});
