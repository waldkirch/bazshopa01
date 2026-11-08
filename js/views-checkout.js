/* ==========================================================================
   baz · views-checkout.js
   Mini-Cart (Drawer), Checkout-Funnel (4 Schritte), Bestellbestätigung.
   Zahlungsmodul = Demo/Testmodus. Im Theme ersetzt durch das offizielle
   „WooCommerce Stripe Payment Gateway“ (Stripe Payment Element).
   ========================================================================== */
(function (B) {
  'use strict';
  const V = B.views = B.views || {};
  const { $, $$, esc, icon } = B;

  /* =======================================================================
     MINI-CART
     ======================================================================= */
  B.renderCart = () => {
    const el = $('#cart'); if (!el) return;
    const items = B.cart.items(), t = B.cart.totals('DE', 'standard'), n = B.cart.count();
    $$('[data-cart-count]').forEach(c => c.textContent = n);
    const cb = $('.cart-btn'); if (cb) { cb.setAttribute('aria-label', `Warenkorb öffnen, ${n} Artikel`); cb.classList.toggle('has-items', n > 0); }
    const pct = Math.min(100, (1 - t.toFree / B.SHIPPING.freeFrom) * 100);
    const cross = B.PRODUCTS.filter(p => B.inStock(p) && !items.some(l => l.id === p.id)).sort((a, b) => B.minPrice(a) - B.minPrice(b)).slice(0, 2);
    el.innerHTML = `<div class="drawer__panel">
  <header class="drawer__head"><h2 class="h4" id="cart-title">Warenkorb <span class="muted">(${n})</span></h2><button class="icon-btn" type="button" data-action="close-layer" aria-label="Warenkorb schließen">${icon('close')}</button></header>
  ${items.length ? `
  <div class="drawer__body">
    <div class="freeship ${t.toFree === 0 ? 'is-done' : ''}">
      <p>${t.toFree === 0 ? `${icon('check')} <strong>Versandkostenfrei!</strong> Deine Bestellung reist kostenlos.` : `Noch <strong>${B.money(t.toFree)}</strong> bis zum kostenlosen Versand.`}</p>
      <div class="freeship__bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(pct)}" aria-label="Fortschritt bis versandkostenfrei"><span style="width:${pct}%"></span></div>
    </div>
    <ul class="lines">${items.map(l => `<li class="line" data-line="${l.key}">
      <a class="line__art" href="#p-${l.id}">${B.art.product(l.p, l.fabric, 'main', l.p.sizes[l.size])}</a>
      <div class="line__info"><a class="line__name" href="#p-${l.id}">${esc(l.p.name)}</a><p class="line__var">${[l.p.type, l.sizeLabel, l.fabricLabel, l.optLabel].filter(Boolean).join(' · ')}</p>
        <div class="line__row">${B.qtyStepper(l.qty, `data-line-qty="${l.key}"`, l.p.stock)}<button class="linklike line__rm" type="button" data-action="remove-line" data-key="${l.key}">Entfernen</button></div></div>
      <p class="line__price">${B.money(l.total)}${l.p.sale ? `<small class="price__now--sale">−${l.p.sale} %</small>` : ''}</p>
    </li>`).join('')}</ul>
    ${cross.length ? `<div class="upsell"><p class="upsell__h">Passt dazu</p>${cross.map(p => `<div class="upsell__item"><span class="upsell__art">${B.art.product(p, p.fabrics[0])}</span><span><strong>${esc(p.name)}</strong><small>${esc(p.type)}</small></span>${B.priceHtml(p)}<button class="icon-btn icon-btn--line" type="button" data-action="quick" data-id="${p.id}" aria-label="${esc(p.name)} auswählen">${icon('plus')}</button></div>`).join('')}</div>` : ''}
  </div>
  <footer class="drawer__foot">
    ${couponBlock('cart')}
    <dl class="totals"><div><dt>Zwischensumme</dt><dd>${B.money(t.sub)}</dd></div>${t.disc ? `<div class="totals__disc"><dt>Rabatt (${B.state.coupon})</dt><dd>−${B.money(t.disc)}</dd></div>` : ''}<div><dt>Versand (DE)</dt><dd>${t.ship ? B.money(t.ship) : 'kostenlos'}</dd></div><div class="totals__sum"><dt>Gesamt <small>inkl. ${B.money(t.vat)} MwSt.</small></dt><dd>${B.money(t.total)}</dd></div></dl>
    <a class="btn btn--primary btn--block btn--lg" href="#kasse">Zur Kasse ${icon('lock')}</a>
    <p class="drawer__pay">Karte · Apple Pay · Google Pay · Klarna · SEPA</p>
  </footer>` : `
  <div class="drawer__body drawer__empty">
    <div class="empty"><div class="empty__art">${B.sun({ anim: true })}</div><h3 class="h3">Dein Warenkorb ist noch leer.</h3><p>Zeit für etwas Weiches. Unsere Lieblingsstücke warten schon.</p><a class="btn btn--primary" href="#shop">Kollektion entdecken</a><a class="btn btn--text" href="#kat-kissen">Zu den Kissen</a></div>
  </div>`}
</div>`;
  
    B.splitChars(el);
  };

  function couponBlock(ctx) {
    const c = B.state.coupon;
    if (c) return `<div class="coupon coupon--on">${icon('check')}<span><strong>${c}</strong> · ${B.COUPONS[c].label}</span><button class="linklike" type="button" data-action="remove-coupon">Entfernen</button></div>`;
    return `<details class="coupon"><summary>Gutscheincode eingeben</summary><form class="coupon__form" data-coupon="${ctx}" novalidate><div class="field"><label class="visually-hidden" for="cp-${ctx}">Gutscheincode</label><div class="field__row"><input id="cp-${ctx}" name="code" placeholder="z. B. SOFT10" autocomplete="off" autocapitalize="characters"><button class="btn btn--ghost" type="submit">Einlösen</button></div></div></form></details>`;
  }
  B.couponBlock = couponBlock;

  /* Delegation für Warenkorb-Interaktionen (Drawer + Checkout) */
  document.addEventListener('click', e => {
    const q = e.target.closest('[data-line-qty] [data-qty]');
    if (q) { const wrap = q.closest('[data-line-qty]'), key = wrap.dataset.lineQty, line = B.state.cart.find(l => l.key === key); if (!line) return;
      const r = B.cart.setQty(key, line.qty + +q.dataset.qty); if (r.error) B.toast({ type: 'warning', title: 'Menge angepasst', text: r.error }); }
    const rm = e.target.closest('[data-action="remove-line"]');
    if (rm) { const line = B.cart.items().find(l => l.key === rm.dataset.key); B.cart.remove(rm.dataset.key); if (line) B.toast({ type: 'info', title: `${line.p.name} entfernt`, text: 'Du kannst es jederzeit wieder hinzufügen.' }); }
    if (e.target.closest('[data-action="remove-coupon"]')) B.cart.removeCoupon();
  });
  document.addEventListener('change', e => {
    const inp = e.target.closest('[data-line-qty] input'); if (!inp) return;
    const r = B.cart.setQty(inp.closest('[data-line-qty]').dataset.lineQty, Math.round(+inp.value) || 0);
    if (r.error) B.toast({ type: 'warning', title: 'Menge angepasst', text: r.error });
  });
  document.addEventListener('submit', e => {
    const f = e.target.closest('[data-coupon]'); if (!f) return;
    e.preventDefault();
    const r = B.cart.applyCoupon(f.code.value);
    if (r.ok) B.toast({ type: 'success', title: 'Gutschein eingelöst', text: r.label });
    else {
      const field = f.querySelector('.field'); let m = field.querySelector('.field__error');
      if (!m) { m = document.createElement('p'); m.className = 'field__error'; m.id = f.code.id + '-err'; field.appendChild(m); }
      m.innerHTML = icon('alert') + '<span>' + r.error + '</span>'; field.classList.add('is-invalid'); f.code.setAttribute('aria-invalid', 'true'); f.code.setAttribute('aria-describedby', m.id); f.code.focus();
    }
  });

  /* =======================================================================
     CHECKOUT
     ======================================================================= */
  const co = B.co = { step: 1, data: { country: 'DE', method: 'standard', pay: 'card', sameBilling: true } };
  const STEPS = ['Adresse', 'Versand', 'Zahlung', 'Prüfen'];
  const PAY = [['card', 'Karte', 'card'], ['apple', 'Apple Pay', 'apple'], ['google', 'Google Pay', 'google'], ['klarna', 'Klarna', 'klarna'], ['sepa', 'SEPA', 'sepa']];
  const payName = k => ({ card: 'Kreditkarte', apple: 'Apple Pay', google: 'Google Pay', klarna: 'Klarna', sepa: 'SEPA-Lastschrift' }[k]);
  const field = (id, label, attrs = '', full = false) => `<div class="field ${full ? 'field--full' : ''}"><label class="field__label" for="co-${id}">${label}</label><input id="co-${id}" name="${id}" ${attrs} value="${esc(co.data[id] || '')}"></div>`;

  V.checkout = () => {
    if (!B.cart.count()) return {
      title: 'Kasse · baz', pose: 'kasse',
      html: `<section class="co-empty container"><div class="empty"><div class="empty__art">${B.sun({ anim: true })}</div><h1 class="h2" tabindex="-1">Dein Warenkorb ist leer.</h1><p>Bevor es an die Kasse geht, braucht es etwas Weiches.</p><a class="btn btn--primary" href="#shop">Zum Shop</a></div></section>`
    };
    co.step = 1;
    const a = B.state.lastAddress || {}; ['email', 'first', 'last', 'street', 'zip', 'city'].forEach(k => { if (!co.data[k] && a[k]) co.data[k] = a[k]; });
    if (!co.data.email && B.state.user) co.data.email = B.state.user.email;
    const html = `
<div class="co-wrap">
<section class="co container" aria-labelledby="co-title">
  <div class="co__main">
    <h1 class="h2 co__title" id="co-title" tabindex="-1">Kasse</h1>
    <ol class="co__progress" aria-label="Fortschritt">${STEPS.map((s, i) => `<li data-prog="${i + 1}" class="${i === 0 ? 'is-active' : ''}"><span>${i + 1}</span>${s}</li>`).join('')}</ol>
    <div class="co__express"><p class="co__express-h">Express-Checkout</p><div class="co__express-btns"><button class="paybtn paybtn--apple" type="button" data-action="express" data-m="apple">${icon('lock')} Apple&nbsp;Pay</button><button class="paybtn paybtn--google" type="button" data-action="express" data-m="google">G&nbsp;Pay</button></div><p class="co__or"><span>oder klassisch bestellen</span></p></div>
    <form class="co__form" data-co novalidate>
      <section class="costep is-active" data-cstep="1" aria-labelledby="cs1">
        <header class="costep__head"><span class="costep__no">1</span><h2 class="h4" id="cs1">Kontakt & Lieferadresse</h2><p class="costep__sum" data-sum="1"></p><button class="linklike costep__edit" type="button" data-goto="1">Ändern</button></header>
        <div class="costep__body"><div class="fgrid">
          ${field('email', 'E-Mail-Adresse', 'type="email" required autocomplete="email"', true)}
          ${field('first', 'Vorname', 'required autocomplete="given-name"')}${field('last', 'Nachname', 'required autocomplete="family-name"')}
          ${field('street', 'Straße & Hausnummer', 'required autocomplete="address-line1"', true)}
          ${field('zip', 'PLZ', 'required inputmode="numeric" autocomplete="postal-code" pattern="[0-9]{4,5}" data-msg="Bitte gib eine gültige Postleitzahl ein (4–5 Ziffern)."')}${field('city', 'Ort', 'required autocomplete="address-level2"')}
          <div class="field field--full"><label class="field__label" for="co-country">Land</label><div class="select select--field"><select id="co-country" name="country" autocomplete="country">${B.SHIPPING.countries.map(c => `<option value="${c.id}" ${co.data.country === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}</select>${icon('chevron')}</div></div>
          <label class="check field--full"><input type="checkbox" name="sameBilling" ${co.data.sameBilling ? 'checked' : ''}><span>Rechnungsadresse entspricht der Lieferadresse</span></label>
          <div class="fgrid field--full billing" data-billing ${co.data.sameBilling ? 'hidden' : ''}>
            <p class="billing__h field--full">Rechnungsadresse</p>
            ${field('bName', 'Vor- & Nachname', 'required autocomplete="billing name"', true)}${field('bStreet', 'Straße & Hausnummer', 'required autocomplete="billing address-line1"', true)}${field('bZip', 'PLZ', 'required inputmode="numeric" pattern="[0-9]{4,5}" data-msg="Bitte gib eine gültige Postleitzahl ein."')}${field('bCity', 'Ort', 'required')}
          </div>
        </div><button class="btn btn--primary btn--lg" type="button" data-next="1">Weiter zum Versand ${icon('arrow')}</button></div>
      </section>
      <section class="costep" data-cstep="2" aria-labelledby="cs2">
        <header class="costep__head"><span class="costep__no">2</span><h2 class="h4" id="cs2">Versandart</h2><p class="costep__sum" data-sum="2"></p><button class="linklike costep__edit" type="button" data-goto="2">Ändern</button></header>
        <div class="costep__body"><fieldset class="radiocards" data-ship-opts><legend class="visually-hidden">Versandart wählen</legend></fieldset><p class="muted small" data-ship-note></p><button class="btn btn--primary btn--lg" type="button" data-next="2">Weiter zur Zahlung ${icon('arrow')}</button></div>
      </section>
      <section class="costep" data-cstep="3" aria-labelledby="cs3">
        <header class="costep__head"><span class="costep__no">3</span><h2 class="h4" id="cs3">Zahlung</h2><p class="costep__sum" data-sum="3"></p><button class="linklike costep__edit" type="button" data-goto="3">Ändern</button></header>
        <div class="costep__body">
          <div class="testmode">${icon('info')}<span><strong>Testmodus.</strong> Es wird keine echte Zahlung ausgeführt. Im Theme ersetzt das offizielle WooCommerce-Stripe-Plugin (Payment Element) dieses Modul.</span></div>
          <div class="payel" data-payel>
            <div class="payel__tabs" role="radiogroup" aria-label="Zahlungsmethode">${PAY.map(([k, l]) => `<label class="payel__tab"><input type="radio" name="pay" value="${k}" ${co.data.pay === k ? 'checked' : ''}><span class="payel__logo payel__logo--${k}" aria-hidden="true"></span><span>${l}</span></label>`).join('')}</div>
            <div class="payel__panel" data-pay-panel></div>
          </div>
          <div class="pay-error" data-pay-error hidden role="alert"></div>
          <p class="payel__secure">${icon('lock')} Verschlüsselt über Stripe · PCI-DSS Level 1 · Kartendaten erreichen unseren Server nie.</p>
          <button class="btn btn--primary btn--lg" type="button" data-next="3">Weiter zur Prüfung ${icon('arrow')}</button>
        </div>
      </section>
      <section class="costep" data-cstep="4" aria-labelledby="cs4">
        <header class="costep__head"><span class="costep__no">4</span><h2 class="h4" id="cs4">Prüfen & bestellen</h2></header>
        <div class="costep__body">
          <div class="review" data-review></div>
          <div class="field"><label class="check"><input type="checkbox" name="agb" required><span>Ich habe die <a href="#recht-agb">AGB</a> und die <a href="#recht-widerruf">Widerrufsbelehrung</a> gelesen und akzeptiere sie.</span></label></div>
          <button class="btn btn--primary btn--lg btn--block btn--order" type="submit"><span class="atc__label">${icon('lock')} Zahlungspflichtig bestellen · <span data-order-total></span></span></button>
          <p class="muted small">Mit deiner Bestellung erklärst du dich mit unseren Datenschutzbestimmungen einverstanden.</p>
        </div>
      </section>
    </form>
  </div>
  <aside class="co__summary" aria-labelledby="sum-title">
    <button class="co__sumtoggle" type="button" aria-expanded="false" aria-controls="co-sum-body" data-action="sum-toggle"><span>${icon('bag')} Bestellübersicht</span><strong data-sum-total></strong>${icon('chevron')}</button>
    <div class="co__sumbody" id="co-sum-body"><h2 class="h4" id="sum-title">Deine Bestellung</h2><div data-summary></div></div>
  </aside>
</section>
</div>`;
    return { title: 'Kasse · baz', html, pose: 'kasse', mount: mountCheckout };
  };

  function renderSummary(root) {
    const t = B.cart.totals(co.data.country, co.data.method);
    $('[data-summary]', root).innerHTML = `<ul class="sumlines">${B.cart.items().map(l => `<li><span class="sumlines__art">${B.art.product(l.p, l.fabric, 'main', l.p.sizes[l.size])}<em>${l.qty}</em></span><span><strong>${esc(l.p.name)}</strong><small>${[l.sizeLabel, l.fabricLabel, l.optLabel].filter(Boolean).join(' · ')}</small></span><span>${B.money(l.total)}</span></li>`).join('')}</ul>
${couponBlock('co')}
<dl class="totals"><div><dt>Zwischensumme</dt><dd>${B.money(t.sub)}</dd></div>${t.disc ? `<div class="totals__disc"><dt>Rabatt (${B.state.coupon})</dt><dd>−${B.money(t.disc)}</dd></div>` : ''}<div><dt>Versand</dt><dd>${co.step >= 2 || t.ship === 0 ? (t.ship ? B.money(t.ship) : 'kostenlos') : 'wird berechnet'}</dd></div><div class="totals__sum"><dt>Gesamt <small>inkl. ${B.money(t.vat)} MwSt.</small></dt><dd>${B.money(t.total)}</dd></div></dl>
<ul class="co__trust"><li>${icon('lock')} SSL-verschlüsselt</li><li>${icon('refresh')} 30 Tage Rückgabe</li><li>${icon('leaf')} Plastikfrei verpackt</li></ul>`;
    $$('[data-sum-total], [data-order-total]', root).forEach(e => e.textContent = B.money(t.total));
  }

  function renderShip(root) {
    const c = B.SHIPPING.countries.find(x => x.id === co.data.country);
    const net = B.cart.subtotal() - B.cart.discount();
    $('[data-ship-opts]', root).innerHTML = '<legend class="visually-hidden">Versandart wählen</legend>' + B.SHIPPING.methods.map(m => {
      const price = (co.data.country === 'DE' && m.id === 'standard' && net >= B.SHIPPING.freeFrom) ? 0 : m.price + c.extra;
      return `<label class="radiocard"><input type="radio" name="method" value="${m.id}" ${co.data.method === m.id ? 'checked' : ''}><span class="radiocard__box"><span class="radiocard__t"><strong>${m.name}</strong><small>${m.eta}</small></span><span class="radiocard__p">${price ? B.money(price) : 'kostenlos'}</span></span></label>`;
    }).join('');
    $('[data-ship-note]', root).textContent = c.note || (co.data.country === 'DE' ? 'Kostenloser Standardversand ab 80 € Warenwert.' : '');
  }

  function renderPay(root) {
    const k = co.data.pay, p = $('[data-pay-panel]', root);
    const panels = {
      card: `<div class="fgrid"><div class="field field--full"><label class="field__label" for="cc-num">Kartennummer</label><div class="field__icon"><input id="cc-num" name="ccnum" inputmode="numeric" autocomplete="cc-number" required placeholder="1234 1234 1234 1234" maxlength="19" data-cc>${icon('lock')}</div></div>
        <div class="field"><label class="field__label" for="cc-exp">Ablaufdatum</label><input id="cc-exp" name="ccexp" inputmode="numeric" autocomplete="cc-exp" required placeholder="MM / JJ" maxlength="7" data-exp></div>
        <div class="field"><label class="field__label" for="cc-cvc">Prüfnummer (CVC)</label><input id="cc-cvc" name="cccvc" inputmode="numeric" autocomplete="cc-csc" required placeholder="123" pattern="[0-9]{3,4}" maxlength="4" data-msg="3 oder 4 Ziffern auf der Kartenrückseite."></div></div>
        <p class="payel__hint">Testkarten: <button class="linklike" type="button" data-fill-card="4242 4242 4242 4242">4242 4242 4242 4242</button> (erfolgreich) · <button class="linklike" type="button" data-fill-card="4000 0000 0000 0002">4000 0000 0000 0002</button> (wird abgelehnt) · Datum in der Zukunft, beliebige CVC.</p>`,
      apple: `<p class="payel__wallet">${icon('lock')} Nach dem Klick auf „Bestellen“ bestätigst du die Zahlung mit Face ID oder Touch ID in Apple Pay.</p>`,
      google: `<p class="payel__wallet">${icon('lock')} Nach dem Klick auf „Bestellen“ öffnet sich Google Pay zur Bestätigung.</p>`,
      klarna: `<p class="payel__wallet">${icon('info')} Rechnung in 30 Tagen oder Ratenkauf. Du wirst zur Bestätigung zu Klarna weitergeleitet.</p>`,
      sepa: `<div class="field"><label class="field__label" for="iban">IBAN</label><input id="iban" name="iban" required autocomplete="off" placeholder="DE89 3704 0044 0532 0130 00" pattern="[A-Za-z]{2}[0-9]{2}[A-Za-z0-9 ]{11,32}" data-msg="Bitte gib eine gültige IBAN ein, z. B. DE89 3704 0044 0532 0130 00."></div><p class="payel__mandate">Mit Angabe deiner IBAN ermächtigst du baz und Stripe, Zahlungen per Lastschrift einzuziehen (SEPA-Mandat).</p>`
    };
    p.innerHTML = panels[k];
    ['ccnum', 'ccexp', 'cccvc', 'iban'].forEach(n => { const i = p.querySelector(`[name="${n}"]`); if (i && co.data[n]) i.value = co.data[n]; });
  }

  const luhn = s => { const d = s.replace(/\D/g, ''); let sum = 0; for (let i = 0; i < d.length; i++) { let n = +d[d.length - 1 - i]; if (i % 2) { n *= 2; if (n > 9) n -= 9; } sum += n; } return d.length >= 13 && sum % 10 === 0; };
  function validateCard(root) {
    if (co.data.pay !== 'card') return true;
    const num = $('#cc-num', root), exp = $('#cc-exp', root);
    let ok = B.validateForm($('[data-pay-panel]', root));
    if (!ok) return false;
    const setErr = (el, m) => { el.setCustomValidity(''); const f = el.closest('.field'); let e = f.querySelector('.field__error'); if (!e) { e = document.createElement('p'); e.className = 'field__error'; e.id = el.id + '-err'; f.appendChild(e); } e.innerHTML = icon('alert') + '<span>' + m + '</span>'; f.classList.add('is-invalid'); el.setAttribute('aria-invalid', 'true'); el.setAttribute('aria-describedby', e.id); el.focus(); };
    if (!luhn(num.value)) { setErr(num, 'Diese Kartennummer ist ungültig. Bitte prüfe deine Eingabe.'); return false; }
    const m = exp.value.match(/^(\d{2})\s*\/\s*(\d{2})$/);
    const now = new Date(), y = now.getFullYear() % 100, mo = now.getMonth() + 1;
    if (!m || +m[1] < 1 || +m[1] > 12) { setErr(exp, 'Bitte im Format MM / JJ eingeben.'); return false; }
    if (+m[2] < y || (+m[2] === y && +m[1] < mo)) { setErr(exp, 'Diese Karte ist abgelaufen.'); return false; }
    return true;
  }

  function stepSummary(n) {
    const d = co.data;
    if (n === 1) return `${esc(d.first)} ${esc(d.last)}, ${esc(d.street)}, ${esc(d.zip)} ${esc(d.city)}`;
    if (n === 2) { const m = B.SHIPPING.methods.find(x => x.id === d.method); return `${m.name} · ${m.eta}`; }
    if (n === 3) return d.pay === 'card' && d.ccnum ? `Karte •••• ${d.ccnum.replace(/\D/g, '').slice(-4)}` : payName(d.pay);
    return '';
  }

  function goStep(root, n, focus = true) {
    co.step = n;
    $$('[data-cstep]', root).forEach(s => { const i = +s.dataset.cstep; s.classList.toggle('is-active', i === n); s.classList.toggle('is-done', i < n); const sum = s.querySelector('[data-sum]'); if (sum) sum.textContent = i < n ? stepSummary(i) : ''; });
    $$('[data-prog]', root).forEach(li => { const i = +li.dataset.prog; li.classList.toggle('is-active', i === n); li.classList.toggle('is-done', i < n); if (i === n) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current'); });
    if (n === 2) renderShip(root);
    if (n === 3) renderPay(root);
    if (n === 4) renderReview(root);
    renderSummary(root);
    if (focus) { const sec = $(`[data-cstep="${n}"]`, root); const top = sec.getBoundingClientRect().top + scrollY - 110; window.scrollTo({ top, behavior: B.reduced ? 'auto' : 'smooth' }); setTimeout(() => { const f = sec.querySelector('.costep__body input, .costep__body select, .costep__body button'); f && f.focus({ preventScroll: true }); }, 350); }
  }

  function renderReview(root) {
    const d = co.data, c = B.SHIPPING.countries.find(x => x.id === d.country);
    $('[data-review]', root).innerHTML = `<div class="review__grid">
<div><h3 class="h5">Lieferung an</h3><address>${esc(d.first)} ${esc(d.last)}<br>${esc(d.street)}<br>${esc(d.zip)} ${esc(d.city)}<br>${c.name}</address><button class="linklike" type="button" data-goto="1">Ändern</button></div>
<div><h3 class="h5">Versand</h3><p>${stepSummary(2)}</p><button class="linklike" type="button" data-goto="2">Ändern</button></div>
<div><h3 class="h5">Zahlung</h3><p>${stepSummary(3)}</p><button class="linklike" type="button" data-goto="3">Ändern</button></div>
<div><h3 class="h5">Kontakt</h3><p>${esc(d.email)}</p></div></div>`;
  }

  function collect(root) { const fd = new FormData($('[data-co]', root)); for (const [k, v] of fd.entries()) co.data[k] = v; co.data.sameBilling = fd.has('sameBilling'); }

  function mountCheckout(root) {
    const form = $('[data-co]', root);
    renderSummary(root);
    form.addEventListener('input', e => {
      if (e.target.matches('[data-cc]')) { const v = e.target.value.replace(/\D/g, '').slice(0, 16); e.target.value = v.replace(/(\d{4})(?=\d)/g, '$1 '); }
      if (e.target.matches('[data-exp]')) { const v = e.target.value.replace(/\D/g, '').slice(0, 4); e.target.value = v.length > 2 ? v.slice(0, 2) + ' / ' + v.slice(2) : v; }
    });
    form.addEventListener('change', e => {
      collect(root);
      if (e.target.name === 'sameBilling') $('[data-billing]', root).hidden = e.target.checked;
      if (e.target.name === 'country' || e.target.name === 'method') { if (co.step >= 2) renderShip(root); renderSummary(root); }
      if (e.target.name === 'pay') { renderPay(root); $('[data-pay-error]', root).hidden = true; }
    });
    root.addEventListener('click', e => {
      const nx = e.target.closest('[data-next]');
      if (nx) {
        const n = +nx.dataset.next, sec = $(`[data-cstep="${n}"] .costep__body`, root);
        if (n === 3 ? !validateCard(root) : !B.validateForm(sec)) return;
        collect(root); goStep(root, n + 1);
      }
      const gt = e.target.closest('[data-goto]'); if (gt && +gt.dataset.goto < co.step) goStep(root, +gt.dataset.goto);
      const fc = e.target.closest('[data-fill-card]');
      if (fc) { $('#cc-num', root).value = fc.dataset.fillCard; const d = new Date(); $('#cc-exp', root).value = '12 / ' + String((d.getFullYear() + 2) % 100); $('#cc-cvc', root).value = '123'; collect(root); }
      if (e.target.closest('[data-action="sum-toggle"]')) { const b = e.target.closest('[data-action="sum-toggle"]'); const o = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', o); $('.co__summary', root).classList.toggle('is-open', o); }
      const ex = e.target.closest('[data-action="express"]');
      if (ex) { co.data.pay = ex.dataset.m; B.toast({ type: 'info', title: `${payName(ex.dataset.m)} (Demo)`, text: 'Im Live-Shop öffnet sich jetzt das Wallet mit hinterlegter Adresse. Bitte fülle hier die Adresse aus, um den Ablauf zu testen.' }); }
    });
    B.on('cart', () => { if (document.body.contains(form)) { if (!B.cart.count()) B.rerender(); else renderSummary(root); } });
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (co.step !== 4) return;
      if (!B.validateForm($('[data-cstep="4"] .costep__body', root))) return;
      const btn = form.querySelector('.btn--order'); btn.classList.add('is-loading'); btn.disabled = true;
      B.processing(true, co.data.pay === 'card' ? 'Zahlung wird sicher über Stripe autorisiert …' : `Weiter zu ${payName(co.data.pay)} …`);
      setTimeout(() => {
        btn.classList.remove('is-loading'); btn.disabled = false; B.processing(false);
        const declined = co.data.pay === 'card' && (co.data.ccnum || '').replace(/\D/g, '') === '4000000000000002';
        if (declined) {
          goStep(root, 3);
          const pe = $('[data-pay-error]', root); pe.hidden = false;
          pe.innerHTML = `${icon('alert')}<div><strong>Zahlung abgelehnt</strong><p>Deine Bank hat die Zahlung nicht autorisiert (card_declined). Bitte nutze eine andere Karte oder Zahlungsart – deine Bestellung ist noch nicht abgeschlossen.</p></div>`;
          B.toast({ type: 'error', title: 'Zahlung fehlgeschlagen', text: 'Die Karte wurde abgelehnt. Bitte wähle eine andere Zahlungsart.' });
          return;
        }
        const t = B.cart.totals(co.data.country, co.data.method), c = B.SHIPPING.countries.find(x => x.id === co.data.country);
        const order = B.account.placeOrder({ total: t.total, payment: stepSummary(3), email: co.data.email, address: { first: co.data.first, last: co.data.last, street: co.data.street, zip: co.data.zip, city: co.data.city, countryName: c.name } });
        ['ccnum', 'ccexp', 'cccvc', 'iban'].forEach(k => delete co.data[k]);
        B.lastOrder = order; location.hash = 'danke';
      }, B.reduced ? 200 : 1600);
    });
  }

  /* =======================================================================
     BESTELLBESTÄTIGUNG
     ======================================================================= */
  V.thanks = () => {
    const o = B.lastOrder || B.state.orders[0];
    if (!o) return V.notFound();
    const html = `<section class="thanks container">
  <div class="thanks__burst" aria-hidden="true">${B.sun({ anim: true })}</div>
  <p class="eyebrow">Bestellung ${o.no}</p>
  <h1 class="mega-title thanks__title" tabindex="-1">Danke,<br>${esc(o.address.first)}!</h1>
  <p class="lead">Deine Bestellung ist eingegangen. Im Live-Shop bekommst du jetzt eine Bestätigung an <strong>${esc(o.email)}</strong>. <span class="muted">(Demo: keine echte Bestellung, keine Zahlung, keine E-Mail.)</span></p>
  <ol class="thanks__steps">${[['check', 'Bestätigt', 'Gerade eben'], ['hand', 'Wird verpackt', 'in 1–2 Werktagen'], ['truck', 'Unterwegs zu dir', 'Sendungsnummer per E-Mail']].map(([ic, t, d], i) => `<li class="${i === 0 ? 'is-done' : ''}"><span>${icon(ic)}</span><strong>${t}</strong><small>${d}</small></li>`).join('')}</ol>
  <div class="thanks__card"><h2 class="h4">Zusammenfassung</h2><ul class="order__items">${o.items.map(i => `<li><span>${i.qty} × ${esc(i.name)} <small>${esc(i.variant)}</small></span><strong>${B.money(i.total)}</strong></li>`).join('')}</ul><p class="thanks__total"><span>Gesamt</span><strong>${B.money(o.total)}</strong></p><p class="muted small">Zahlung: ${esc(o.payment)} · Lieferung nach ${esc(o.address.city)}</p></div>
  <div class="btn-row btn-row--center"><a class="btn btn--primary" href="#shop">Weiter stöbern</a><a class="btn btn--ghost" href="#konto">Bestellung im Konto ansehen</a></div>
</section>`;
    return { title: 'Danke für deine Bestellung · baz', html, pose: 'danke' };
  };
})(window.BAZ = window.BAZ || {});
