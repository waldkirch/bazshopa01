/* ==========================================================================
   baz · store.js
   Zustand: Warenkorb, Gutscheine, Merkliste, Konto, Bestellungen.
   Im Theme übernimmt WooCommerce (Cart Fragments / Store API) diese Aufgaben.
   ========================================================================== */
(function (B) {
  'use strict';
  const KEY = 'baz-demo-v1';
  const listeners = {};
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const saved = load();

  const S = B.state = {
    cart: Array.isArray(saved.cart) ? saved.cart : [],
    wish: Array.isArray(saved.wish) ? saved.wish : [],
    coupon: saved.coupon || null,
    user: saved.user || null,
    orders: Array.isArray(saved.orders) ? saved.orders : [],
    lastAddress: saved.lastAddress || null,
    cookies: saved.cookies || null
  };

  const persist = () => {
    try { localStorage.setItem(KEY, JSON.stringify({ cart: S.cart, wish: S.wish, coupon: S.coupon, user: S.user, orders: S.orders, lastAddress: S.lastAddress, cookies: S.cookies })); } catch (e) { /* Speicher nicht verfügbar – Demo läuft im Speicher weiter */ }
  };

  B.on = (ev, fn) => { (listeners[ev] = listeners[ev] || []).push(fn); };
  B.emit = (ev, data) => { (listeners[ev] || []).forEach(fn => fn(data)); };

  /* ---------- Produkte & Preise ---------- */
  B.product = id => B.PRODUCTS.find(p => p.id === id);
  B.round2 = n => Math.round(n * 100) / 100;

  /* Regulärer Preis einer Variante */
  B.basePrice = (p, sizeIdx = 0, optIdx) => {
    const s = p.sizes[sizeIdx] || p.sizes[0];
    const o = p.option ? p.option.values[optIdx ?? p.option.def ?? 0] : null;
    return s.price + (o ? o.delta : 0);
  };
  /* Verkaufspreis (inkl. Angebot) */
  B.price = (p, sizeIdx, optIdx) => {
    const b = B.basePrice(p, sizeIdx, optIdx);
    return p.sale ? B.round2(b * (1 - p.sale / 100)) : b;
  };
  B.minPrice = p => Math.min(...p.sizes.map((_, i) => B.price(p, i, p.option ? 0 : undefined)));
  B.inStock = p => p.stock > 0;
  B.lowStock = p => p.stock > 0 && p.stock <= 5;

  B.money = n => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(n);

  /* ---------- Warenkorb ---------- */
  const lineKey = (id, size, fabric, opt) => [id, size, fabric, opt ?? '-'].join('|');

  B.cart = {
    items() {
      return S.cart.map(l => {
        const p = B.product(l.id);
        if (!p) return null;
        const unit = B.price(p, l.size, l.opt);
        return { ...l, p, unit, total: B.round2(unit * l.qty), sizeLabel: p.sizes[l.size].label, fabricLabel: (B.FABRICS[l.fabric] || {}).name, optLabel: p.option ? p.option.values[l.opt].label : null };
      }).filter(Boolean);
    },
    count() { return S.cart.reduce((a, l) => a + l.qty, 0); },
    add(id, size = 0, fabric, opt, qty = 1) {
      const p = B.product(id);
      if (!p) return { ok: false, error: 'Produkt nicht gefunden.' };
      if (!B.inStock(p)) return { ok: false, error: `${p.name} ist leider gerade ausverkauft.` };
      fabric = fabric || p.fabrics[0];
      if (p.option && opt == null) opt = p.option.def ?? 0;
      const key = lineKey(id, size, fabric, opt);
      const line = S.cart.find(l => l.key === key);
      const current = line ? line.qty : 0;
      if (current + qty > p.stock) return { ok: false, error: `Von ${p.name} sind nur noch ${p.stock} Stück verfügbar.` };
      if (line) line.qty += qty; else S.cart.push({ key, id, size, fabric, opt, qty });
      persist(); B.emit('cart');
      return { ok: true, p };
    },
    setQty(key, qty) {
      const line = S.cart.find(l => l.key === key);
      if (!line) return { ok: false };
      const p = B.product(line.id);
      if (qty <= 0) return this.remove(key);
      if (qty > p.stock) { line.qty = p.stock; persist(); B.emit('cart'); return { ok: false, error: `Maximal ${p.stock} Stück verfügbar.` }; }
      line.qty = qty; persist(); B.emit('cart'); return { ok: true };
    },
    remove(key) { S.cart = S.cart.filter(l => l.key !== key); persist(); B.emit('cart'); return { ok: true }; },
    clear() { S.cart = []; S.coupon = null; persist(); B.emit('cart'); },
    subtotal() { return B.round2(this.items().reduce((a, l) => a + l.total, 0)); },
    applyCoupon(code) {
      const c = (code || '').trim().toUpperCase();
      if (!c) return { ok: false, error: 'Bitte gib einen Gutscheincode ein.' };
      const def = B.COUPONS[c];
      if (!def) return { ok: false, error: `Der Code „${c}“ ist uns nicht bekannt. Prüfe die Schreibweise.` };
      if (def.expired) return { ok: false, error: `Der Code „${c}“ ist leider abgelaufen.` };
      if (def.min && this.subtotal() < def.min) return { ok: false, error: `„${c}“ gilt ab ${B.money(def.min)} Warenwert. Dir fehlen noch ${B.money(def.min - this.subtotal())}.` };
      S.coupon = c; persist(); B.emit('cart');
      return { ok: true, label: def.label };
    },
    removeCoupon() { S.coupon = null; persist(); B.emit('cart'); },
    discount() {
      if (!S.coupon) return 0;
      const def = B.COUPONS[S.coupon];
      if (!def || (def.min && this.subtotal() < def.min)) return 0;
      return B.round2(this.subtotal() * def.value / 100);
    },
    shipping(country = 'DE', method = 'standard') {
      const net = this.subtotal() - this.discount();
      if (net <= 0) return 0;
      const m = B.SHIPPING.methods.find(x => x.id === method) || B.SHIPPING.methods[0];
      const c = B.SHIPPING.countries.find(x => x.id === country) || B.SHIPPING.countries[0];
      const free = country === 'DE' && method === 'standard' && net >= B.SHIPPING.freeFrom;
      return free ? 0 : B.round2(m.price + c.extra);
    },
    totals(country, method) {
      const sub = this.subtotal(), disc = this.discount(), ship = this.shipping(country, method);
      const total = B.round2(sub - disc + ship);
      return { sub, disc, ship, total, vat: B.round2(total - total / 1.19), toFree: Math.max(0, B.round2(B.SHIPPING.freeFrom - (sub - disc))) };
    }
  };

  /* ---------- Merkliste ---------- */
  B.wish = {
    has: id => S.wish.includes(id),
    toggle(id) { S.wish = S.wish.includes(id) ? S.wish.filter(x => x !== id) : [...S.wish, id]; persist(); B.emit('wish'); return S.wish.includes(id); }
  };

  /* ---------- Konto & Bestellungen (Demo) ---------- */
  B.account = {
    login(email, name) { S.user = { email, name: name || email.split('@')[0] }; persist(); B.emit('user'); },
    logout() { S.user = null; persist(); B.emit('user'); },
    placeOrder(data) {
      const no = 'BAZ-' + String(Date.now()).slice(-6);
      const order = { no, date: new Date().toISOString(), status: 'In Bearbeitung', items: B.cart.items().map(l => ({ name: l.p.name, type: l.p.type, qty: l.qty, total: l.total, variant: [l.sizeLabel, l.fabricLabel, l.optLabel].filter(Boolean).join(' · ') })), ...data };
      S.orders.unshift(order); S.lastAddress = data.address; persist();
      B.cart.clear();
      return order;
    },
    findOrder(no) { return S.orders.find(o => o.no.toUpperCase() === String(no || '').trim().toUpperCase()); }
  };

  B.setCookies = v => { S.cookies = v; persist(); };
})(window.BAZ = window.BAZ || {});
