/* ==========================================================================
   baz · chatbot.js
   FAQ-basierter Service-Assistent mit Entscheidungsbaum.
   Keine KI. Erweiterungspunkt für eine spätere KI-Anbindung: B.chat.resolve()
   (z. B. Aufruf eines eigenen WP-REST-Endpunkts, der serverseitig ein LLM nutzt).
   ========================================================================== */
(function (B) {
  'use strict';
  const { $, esc, icon } = B;
  const faq = i => B.FAQ[i].a;

  const N = {
    start: { text: 'Hallo! Ich bin der Service-Assistent von baz. Ich beantworte häufige Fragen sofort – bei allem anderen verbinde ich dich mit unserem Team. Worum geht’s?',
      opts: [['Produktberatung', 'advice'], ['Material & Alpaka', 'material'], ['Größen', 'sizes'], ['Pflege', 'care'], ['Versand', 'shipping'], ['Rückgabe', 'returns'], ['Bestellstatus', 'status'], ['Kontakt', 'contact']] },
    advice: { text: 'Sehr gern! Wonach suchst du?', opts: [['Kopfkissen', 'pillow'], ['Bettdecke', 'duvet'], ['Ein Geschenk', 'gift']] },
    pillow: { text: 'Wie schläfst du meistens?', opts: [['Auf der Seite', 'p_side'], ['Auf dem Rücken', 'p_back'], ['Auf dem Bauch', 'p_belly']] },
    p_side: { text: 'Für Seitenschläfer passt „Wolke“ in 40 × 80 cm – gut gefüllt, damit Kopf und Nacken in einer Linie liegen.', product: ['wolke', { size: 0 }] },
    p_back: { text: 'Rückenschläfer liegen oft gut auf „Wolke“ in 80 × 80 cm. Nimm über den Reißverschluss etwas Füllung heraus, bis sich der Nacken entspannt.', product: ['wolke', { size: 1 }] },
    p_belly: { text: 'Bauchschläfer mögen es flach: „Wolke“ in 40 × 80 cm, mit reduzierter Füllung. Die Füllmenge lässt sich jederzeit wieder ergänzen.', product: ['wolke', { size: 0 }] },
    duvet: { text: 'Wie warm schläfst du?', opts: [['Ich friere schnell', 'd_winter'], ['Mal so, mal so', 'd_all'], ['Mir ist oft zu warm', 'd_summer']] },
    d_winter: { text: 'Dann empfehle ich „Hüttenruh“ in der Wärmeklasse Winter – extra Füllung, trotzdem atmungsaktiv.', product: ['huettenruh', { opt: 2 }] },
    d_all: { text: '„Hüttenruh“ Ganzjahr ist unser Allrounder: im Winter warm, im Sommer ohne Hitzestau.', product: ['huettenruh', { opt: 1 }] },
    d_summer: { text: 'Für warme Schläfer: „Hüttenruh“ Sommer. Leicht gefüllt, ideal auch fürs Gästebett.', product: ['huettenruh', { opt: 0 }] },
    gift: { text: 'Schöne Idee! Beliebt als Geschenk sind das Zierkissen „Sonne“ mit gestickter Bildmarke und die Wohndecke „Sonntag“.', products: ['sonne', 'sonntag'] },
    material: { text: faq(0), opts: [['Gut für Allergiker?', 'allergy'], ['Wie pflege ich das?', 'care']] },
    allergy: { text: faq(1) },
    sizes: { text: faq(3), opts: [['Kissen-Beratung', 'pillow']] },
    care: { text: faq(2), link: ['Alle Pflegehinweise', '#service-pflege'] },
    shipping: { text: faq(4) + ' ' + faq(5) },
    returns: { text: faq(6), link: ['Widerrufsbelehrung', '#recht-widerruf'] },
    payment: { text: faq(7) },
    status: { text: 'Gib mir deine Bestellnummer, z. B. BAZ-123456.', expect: 'order' },
    contact: { text: 'Unser Team ist Mo–Fr von 9 bis 17 Uhr für dich da. Am schnellsten geht’s über das Kontaktformular – wir antworten innerhalb eines Werktags.', link: ['Zum Kontaktformular', '#service-kontakt'] },
    complaint: { text: faq(9), link: ['Reklamation melden', '#service-kontakt'] },
    fallback: { text: 'Das kann ich leider noch nicht beantworten. Wähle ein Thema – oder schreib direkt unserem Team.', opts: [['Themen anzeigen', 'start'], ['Team kontaktieren', 'contact']] }
  };

  const KEYS = [
    ['allergy', ['allerg', 'unverträg', 'kratz']], ['complaint', ['kaputt', 'mangel', 'defekt', 'reklam', 'loch']],
    ['returns', ['rückgabe', 'rueckgabe', 'retour', 'widerruf', 'zurück', 'umtausch']], ['shipping', ['versand', 'liefer', 'paket', 'wann kommt']],
    ['payment', ['zahl', 'klarna', 'paypal', 'kreditkarte', 'apple pay', 'rechnung']], ['status', ['status', 'sendung', 'tracking', 'wo ist', 'bestellnummer']],
    ['care', ['wasch', 'pflege', 'reinig', 'lüft', 'fleck', 'trockner']], ['sizes', ['größe', 'groesse', 'maß', 'format', 'welche cm']],
    ['duvet', ['bettdecke', 'decke', 'frier', 'schwitz', 'warm']], ['pillow', ['kopfkissen', 'kissen', 'nacken', 'seitenschläfer']],
    ['gift', ['geschenk', 'schenken']], ['material', ['alpaka', 'material', 'wolle', 'lanolin', 'faser']], ['contact', ['kontakt', 'mensch', 'telefon', 'mail', 'team', 'anrufen']],
    ['start', ['hallo', 'hi', 'hey', 'moin', 'menü', 'hilfe']]
  ];

  let expect = null;
  const log = () => $('.chat__log');

  function add(html, who = 'bot') {
    const m = document.createElement('div');
    m.className = `msg msg--${who}`;
    m.innerHTML = html;
    log().appendChild(m);
    log().scrollTop = log().scrollHeight;
    return m;
  }

  function typing(cb) {
    const t = add(`<span class="typing" role="status"><span class="typing__sun">${B.sun({ anim: true, speed: 'fast' })}</span><span>schreibt</span><i></i><i></i><i></i></span>`);
    setTimeout(() => { t.remove(); cb(); }, B.reduced ? 0 : 520);
  }

  function say(key) {
    const n = N[key] || N.fallback;
    expect = n.expect || null;
    typing(() => {
      let h = `<p>${n.text}</p>`;
      const prods = n.product ? [n.product] : (n.products || []).map(id => [id, {}]);
      prods.forEach(([id, pre]) => { const p = B.product(id); if (!p) return;
        h += `<a class="msg__product" href="#p-${p.id}" data-chat-pre='${JSON.stringify({ id: p.id, ...pre })}'><span class="msg__art">${B.art.product(p, p.fabrics[0])}</span><span><strong>${esc(p.name)}</strong><small>${esc(p.type)}</small>${B.priceHtml(p, pre.size ?? (pre.opt != null ? 0 : undefined), pre.opt)}</span>${icon('arrow')}</a>`; });
      if (n.link) h += `<a class="msg__link" href="${n.link[1]}">${n.link[0]} ${icon('arrow')}</a>`;
      add(h);
      quick(n.opts || (key === 'start' ? N.start.opts : [['Weitere Frage', 'start'], ['Team kontaktieren', 'contact']]));
    });
  }

  function quick(opts) { $('[data-chat-quick]').innerHTML = opts.map(([l, k]) => `<button class="chip" type="button" data-chat-go="${k}">${l}</button>`).join(''); }

  /* Erweiterungspunkt: Hier kann später ein KI-Endpunkt angebunden werden. */
  B.chat = {
    resolve(text) {
      const t = text.toLowerCase();
      const order = text.match(/baz-?\s?(\d{6})/i);
      if (order || expect === 'order') return { order: order ? 'BAZ-' + order[1] : text.trim() };
      const hit = KEYS.find(([, ks]) => ks.some(k => t.includes(k)));
      return { key: hit ? hit[0] : 'fallback' };
    }
  };

  function handleText(text) {
    if (!text.trim()) return;
    add(`<p>${esc(text)}</p>`, 'user');
    $('[data-chat-quick]').innerHTML = '';
    const r = B.chat.resolve(text);
    if (r.order) {
      expect = null;
      const o = B.account.findOrder(r.order);
      typing(() => {
        add(o ? `<p><strong>${o.no}</strong> ist <strong>${o.status.toLowerCase()}</strong>. Bestellt am ${new Date(o.date).toLocaleDateString('de-DE')}, ${o.items.length} Artikel, ${B.money(o.total)}. Die Sendungsnummer kommt per E-Mail, sobald das Paket unterwegs ist.</p>`
          : `<p>Zu „${esc(r.order)}“ finde ich keine Bestellung. Prüfe bitte die Nummer – in dieser Demo kenne ich nur Bestellungen, die du hier aufgegeben hast.</p>`);
        quick([['Weitere Frage', 'start'], ['Team kontaktieren', 'contact']]);
      });
      return;
    }
    say(r.key);
  }

  B.initChat = () => {
    const root = $('[data-chat]');
    root.innerHTML = `<button class="chat__fab" type="button" aria-expanded="false" aria-controls="chat-panel" data-action="chat-toggle"><span class="chat__fab-ic">${icon('chat')}</span><span class="chat__fab-label">Fragen?</span></button>
<section class="chat__panel" id="chat-panel" aria-labelledby="chat-title" hidden>
  <header class="chat__head"><span class="chat__avatar">${B.sun({ anim: true, speed: 'fast' })}</span><div><h2 class="chat__title" id="chat-title">baz Service</h2><small><span class="chat__online"></span>FAQ-Assistent · antwortet sofort</small></div><button class="icon-btn" type="button" data-action="chat-reset" aria-label="Unterhaltung neu starten">${icon('refresh')}</button><button class="icon-btn" type="button" data-action="chat-toggle" aria-label="Service-Assistent schließen">${icon('close')}</button></header>
  <div class="chat__log" role="log" aria-live="polite" aria-relevant="additions"></div>
  <div class="chat__quick" data-chat-quick></div>
  <form class="chat__form" data-chat-form><label class="visually-hidden" for="chat-in">Deine Frage</label><input id="chat-in" autocomplete="off" placeholder="Frage eingeben …"><button class="icon-btn chat__send" type="submit" aria-label="Senden">${icon('send')}</button></form>
  <p class="chat__note">Automatischer FAQ-Assistent, keine KI. Persönliche Hilfe über das <a href="#service-kontakt">Kontaktformular</a>.</p>
</section>`;
    let started = false;
    const toggle = (force) => {
      const panel = $('#chat-panel'), fab = $('.chat__fab');
      const open = force ?? panel.hidden;
      if (open) { panel.hidden = false; requestAnimationFrame(() => panel.classList.add('is-open')); root.classList.add('is-open'); if (!started) { started = true; say('start'); } setTimeout(() => $('#chat-in').focus({ preventScroll: true }), 300); }
      else { panel.classList.remove('is-open'); root.classList.remove('is-open'); setTimeout(() => { if (!panel.classList.contains('is-open')) panel.hidden = true; }, 300); fab.focus({ preventScroll: true }); }
      fab.setAttribute('aria-expanded', open);
    };
    B.toggleChat = toggle;
    root.addEventListener('click', e => {
      if (e.target.closest('[data-action="chat-toggle"]')) toggle();
      if (e.target.closest('[data-action="chat-reset"]')) { log().innerHTML = ''; expect = null; say('start'); }
      const go = e.target.closest('[data-chat-go]');
      if (go) { add(`<p>${esc(go.textContent)}</p>`, 'user'); $('[data-chat-quick]').innerHTML = ''; say(go.dataset.chatGo); }
      const pre = e.target.closest('[data-chat-pre]');
      if (pre) { B.pdpPreset = JSON.parse(pre.dataset.chatPre); if (innerWidth < 700) toggle(false); }
    });
    root.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#chat-panel').hidden) toggle(false); });
    $('[data-chat-form]').addEventListener('submit', e => { e.preventDefault(); const i = $('#chat-in'); handleText(i.value); i.value = ''; });
  };
})(window.BAZ = window.BAZ || {});
