/* ==========================================================================
   baz · views-shop.js
   Startseite, Shop/Kategorie, Produktdetailseite, Schnellansicht, Suche.
   Jede View liefert { title, html, pose, mount(root) }.
   ========================================================================== */
(function (B) {
  'use strict';
  const V = B.views = B.views || {};
  const { $, $$, esc, icon } = B;
  const P = () => B.PRODUCTS;
  const byIds = ids => ids.map(B.product).filter(Boolean);
  const catName = id => (B.CATEGORIES.find(c => c.id === id) || {}).name || '';
  const PARTNER = { wolke: 'morgentau', huettenruh: 'morgentau', morgentau: 'wolke', masche: 'sonne', sonne: 'masche', sonntag: 'insel', ruhepol: 'wolke', unterwolke: 'halm', insel: 'sonntag', halm: 'unterwolke' };

  const secHead = (eyebrow, title, id, aside = '') => `<div class="sec-head"><div><p class="eyebrow">${eyebrow}</p><h2 class="h2" id="${id}">${title}</h2></div>${aside}</div>`;

  /* =======================================================================
     STARTSEITE
     ======================================================================= */
  const RAILS = {
    best: { label: 'Bestseller', ids: ['wolke', 'huettenruh', 'masche', 'morgentau', 'unterwolke', 'halm'] },
    new: { label: 'Neuheiten', ids: () => [...P()].sort((a, b) => b.added - a.added).slice(0, 6).map(p => p.id) },
    winter: { label: 'Für den Winter', ids: ['huettenruh', 'sonntag', 'insel', 'wolke', 'masche', 'ruhepol'] }
  };
  const railIds = k => typeof RAILS[k].ids === 'function' ? RAILS[k].ids() : RAILS[k].ids;

  const STORY = [
    { t: 'Die Schur', d: 'Einmal im Jahr, im Frühling, werden die Alpakas geschoren – schonend und von Menschen, die die Tiere kennen. Das Vlies eines Tieres reicht für etwa zwei Kopfkissen.', art: 'fleece' },
    { t: 'Sortieren & Waschen', d: 'Von Hand nach Feinheit und Farbe sortiert, dann mild gewaschen – ohne Chlor, ohne Superwash-Ausrüstung. Die natürlichen Farben bleiben, wie sie sind.', art: 'fibers' },
    { t: 'Kämmen & Spinnen', d: 'Für Füllungen wird die Wolle zu einem luftigen Vlies gekämmt, für Bezüge und Decken zu Garn gesponnen und auf traditionellen Webstühlen verarbeitet.', art: 'yarn' },
    { t: 'Nähen & Füllen', d: 'Am Ende steht ein Mensch an einem Tisch: misst, schneidet, näht, füllt. Jedes Stück trägt ein kleines Label – und die Sorgfalt von jemandem, der es ernst meint.', art: 'needle' }
  ];

  V.home = () => {
    const cats = B.CATEGORIES;
    const marquee = ['Temperaturausgleichend', 'Lanolinfrei', 'Handgefertigt', 'Plastikfrei verpackt', 'Versandkostenfrei ab 80 €', '30 Tage Rückgabe'];
    const mq = marquee.map(t => `<span>${t}</span>${B.sun({ anim: true, speed: 'fast', cls: 'marquee__sep' })}`).join('');
    const html = `
<section class="hero" aria-labelledby="hero-title">
  <div class="container hero__top">
    <div class="hero__intro">
      <p class="eyebrow" data-reveal>Handgefertigt aus Alpakawolle</p>
      <h1 class="hero__title" id="hero-title" tabindex="-1" data-reveal style="--i:1">Schlaf, der sich nach <span class="hl">Wolke</span> anfühlt.</h1>
      <p class="lead" data-reveal style="--i:2">Bettwäsche, Kissen und Decken aus Alpakawolle – von Hand gefertigt, frei von Kunstfasern und gemacht, um zu bleiben.</p>
      <div class="btn-row" data-reveal style="--i:3"><a class="btn btn--primary btn--lg" href="#shop">Kollektion entdecken ${icon('arrow')}</a><a class="btn btn--text" href="#philosophie">Unsere Idee</a></div>
    </div>
    <ul class="hero__facts" data-reveal style="--i:4">
      <li><strong>100&nbsp;%</strong><span>Alpakawolle in jeder Füllung</span></li>
      <li><strong>0&nbsp;%</strong><span>Kunstfaser, Plastik, Kompromiss</span></li>
      <li><strong>30</strong><span>Tage zum Probeliegen</span></li>
    </ul>
  </div>
  <div class="hero__stage">
    <p class="hero__mega" aria-hidden="true">${'soft'.split('').map((c, i) => `<span style="--i:${i}">${c}</span>`).join('')}</p>
    <div class="hero__art" data-parallax="-0.07">${B.art.hero()}</div>
    <a class="hero__tag" href="#p-sonne" data-parallax="0.06"><span class="hero__tag-burst">${B.sun({ anim: true })}</span><span><small>Neu</small><strong>Zierkissen „Sonne“</strong><em>Ansehen ${icon('arrow')}</em></span></a>
  </div>
</section>

<div class="marquee" aria-hidden="true"><div class="marquee__track">${mq}${mq}</div></div>

<section class="statement container" aria-label="Markenversprechen">
  <p class="eyebrow" data-reveal>Was wir machen</p>
  <p class="statement__text" data-words>Wir machen Dinge, die leise sind. Kissen, die nicht knistern. Decken, unter denen niemand schwitzt. Aus Wolle, deren Herkunft wir kennen – genäht von Händen, die sich Zeit lassen.</p>
  <a class="link-arrow" href="#unternehmen" data-reveal>Mehr über baz ${icon('arrow')}</a>
</section>

<section class="hcats" aria-labelledby="cats-title">
  <div class="hcats__sticky">
    <div class="container hcats__head"><div><p class="eyebrow">Kategorien</p><h2 class="h2" id="cats-title">Fünf Wege zu<br>weicherem Wohnen.</h2></div><p class="hcats__hint">${icon('arrow')} Scrollen</p></div>
    <div class="hcats__viewport"><div class="hcats__track" data-hscroll>
      ${cats.map((c, i) => `<a class="ctile" href="#kat-${c.id}"><span class="ctile__no">0${i + 1}</span><span class="ctile__art">${B.art.category(c)}</span><span class="ctile__name">${c.name}</span><span class="ctile__claim">${c.claim}</span><span class="ctile__count">${P().filter(p => p.cat === c.id).length} Produkte ${icon('arrow')}</span></a>`).join('')}
      <a class="ctile ctile--all" href="#shop"><span class="ctile__all">Alle<br>Produkte</span><span class="ctile__go">${icon('arrow')}</span></a>
    </div></div>
  </div>
</section>

<section class="rail container" aria-labelledby="rail-title">
  ${secHead('Ausgewählt', 'Lieblingsstücke', 'rail-title', `<div class="tabs" role="tablist" aria-label="Produktauswahl">${Object.entries(RAILS).map(([k, r], i) => `<button class="tab" type="button" role="tab" id="tab-${k}" aria-selected="${i === 0}" aria-controls="rail-panel" data-rail="${k}">${r.label}</button>`).join('')}</div>`)}
  <div class="rail__wrap">
    <div class="rail__track" id="rail-panel" role="tabpanel" aria-labelledby="tab-best" data-rail-track>${byIds(railIds('best')).map((p, i) => B.card(p, i)).join('')}</div>
    <div class="rail__nav"><button class="icon-btn icon-btn--line" type="button" data-action="rail" data-dir="-1" aria-label="Vorherige Produkte">${icon('left')}</button><button class="icon-btn icon-btn--line" type="button" data-action="rail" data-dir="1" aria-label="Nächste Produkte">${icon('right')}</button></div>
  </div>
</section>

<section class="spot" aria-labelledby="spot-title">
  <div class="container spot__grid">
    <div class="spot__media" data-reveal="img">
      <div class="spot__art">${B.art.product(B.product('wolke'), 'creme')}</div>
      ${[['22%', '30%', 'Bio-Baumwoll-Satin', 'Glatte, kühle Oberfläche mit feinem Glanz.'], ['78%', '46%', 'Verdeckter Reißverschluss', 'Füllung entnehmen oder ergänzen – ganz nach Gefühl.'], ['50%', '58%', 'Gekämmte Alpakawolle', 'Lose gefüllt, damit sie luftig bleibt und sich aufschütteln lässt.']].map(([x, y, t, d], i) => `<div class="hotspot" style="--x:${x};--y:${y}"><button class="hotspot__btn" type="button" aria-expanded="false" aria-controls="hs-${i}" data-action="hotspot"><span class="visually-hidden">${t}</span>${icon('plus')}</button><div class="hotspot__tip" id="hs-${i}" role="tooltip"><strong>${t}</strong><span>${d}</span></div></div>`).join('')}
    </div>
    <div class="spot__copy">
      <p class="eyebrow" data-reveal>Im Fokus · Wolke</p>
      <h2 class="h2" id="spot-title" data-reveal style="--i:1">Ein Kissen, das sich nach dir richtet.</h2>
      <p class="lead" data-reveal style="--i:2">Zu hoch? Zu flach? Über den verdeckten Reißverschluss passt du die Füllmenge an – bis Kopf und Nacken genau richtig liegen.</p>
      <ul class="ticks" data-reveal style="--i:3"><li>${icon('check')} Füllung aus 100 % Alpakawolle</li><li>${icon('check')} Zwei Größen: 40 × 80 und 80 × 80 cm</li><li>${icon('check')} Lüften statt waschen</li></ul>
      <div class="spot__buy" data-reveal style="--i:4">${B.priceHtml(B.product('wolke'))}<div class="btn-row"><button class="btn btn--primary" type="button" data-action="quick" data-id="wolke">Größe wählen</button><a class="btn btn--text" href="#p-wolke">Alle Details ${icon('arrow')}</a></div></div>
    </div>
  </div>
</section>

<section class="story" aria-labelledby="story-title">
  <div class="container story__grid">
    <div class="story__visual"><div class="story__sticky">
      <div class="story__stage">${STORY.map((s, i) => `<div class="story__frame ${i === 0 ? 'is-on' : ''}" data-frame="${i}">${B.art.story(s.art)}</div>`).join('')}<div class="story__burst">${B.sun({ anim: true })}</div></div>
      <p class="story__count"><span data-story-no>01</span> / 04</p>
    </div></div>
    <div class="story__steps">
      <header class="story__head"><p class="eyebrow">Herstellung</p><h2 class="h2" id="story-title">Vom Vlies<br>zum Lieblingsstück.</h2></header>
      ${STORY.map((s, i) => `<article class="story__step ${i === 0 ? 'is-on' : ''}" data-step="${i}"><span class="story__no">0${i + 1}</span><h3 class="h3">${s.t}</h3><p>${s.d}</p></article>`).join('')}
    </div>
  </div>
</section>

<section class="offer container" aria-labelledby="offer-title">
  <div class="offer__panel" data-reveal><span class="offer__sun">${B.sun({ variant: 'weiss45', anim: true })}</span>
    <div class="offer__copy">
      <p class="eyebrow">Winter-Edit · solange der Vorrat reicht</p>
      <p class="offer__mega" aria-hidden="true">−20%</p>
      <h2 class="h3" id="offer-title">auf unseren Strickbezug „Masche“</h2>
      <p>Grobes Rippenmuster, dickes Alpakagarn, Holzknöpfe. Und für deine erste Bestellung: 10 % mit dem Code <button class="code" type="button" data-action="copy-code" data-code="SOFT10" aria-label="Code SOFT10 kopieren">SOFT10</button></p>
      <a class="btn btn--primary" href="#p-masche">Zum Angebot ${icon('arrow')}</a>
    </div>
    <div class="offer__art" data-parallax="-0.05">${B.art.product(B.product('masche'), 'schiefer')}</div>
  </div>
</section>

<section class="promise container" aria-label="Unsere Versprechen">
  ${[['hand', 'Von Hand gefertigt', 'In kleinen Manufakturen statt am Fließband.'], ['leaf', 'Plastikfrei verpackt', 'Baumwollbeutel und Graspapier, das war’s.'], ['truck', 'Versandkostenfrei ab 80 €', 'Klimafreundlich innerhalb Deutschlands.'], ['refresh', '30 Tage Rückgabe', 'Zusätzlich zum gesetzlichen Widerrufsrecht.']].map(([ic, t, d], i) => `<div class="promise__item" data-reveal style="--i:${i}"><span class="promise__ic">${icon(ic)}</span><h3 class="h4">${t}</h3><p>${d}</p></div>`).join('')}
</section>

<section class="compare container" aria-labelledby="cmp-title">
  ${secHead('Warum Alpaka?', 'Ehrlich verglichen.', 'cmp-title', '<p class="sec-head__note">Vereinfachte Übersicht typischer Materialeigenschaften. Je mehr Punkte, desto ausgeprägter.</p>')}
  <div class="table-wrap" data-reveal><table class="ctable">
    <thead><tr><th scope="col">Eigenschaft</th><th scope="col" class="is-us">Alpaka</th><th scope="col">Schafwolle</th><th scope="col">Daune</th><th scope="col">Polyester</th></tr></thead>
    <tbody>
      ${[['Wärme bei geringem Gewicht', 3, 2, 3, 1], ['Feuchtigkeitsregulierung', 3, 3, 2, 1], ['Lanolinfrei', 'ja', 'nein', '–', '–'], ['Biologisch abbaubar', 'ja', 'ja', 'ja', 'nein'], ['Pflege', 'lüften', 'lüften', 'reinigen', 'waschen']].map(r => `<tr><th scope="row">${r[0]}</th>${r.slice(1).map((v, i) => `<td class="${i === 0 ? 'is-us' : ''}">${typeof v === 'number' ? `<span class="pips" role="img" aria-label="${v} von 3">${[1, 2, 3].map(n => `<i class="${n <= v ? 'on' : ''}"></i>`).join('')}</span>` : v}</td>`).join('')}</tr>`).join('')}
    </tbody>
  </table></div>
</section>

<section class="slow" aria-labelledby="slow-title">
  <div class="container slow__grid">
    <div class="slow__media" data-reveal="img">${B.art.product(B.product('huettenruh'), 'natur', 'scene')}</div>
    <div class="slow__copy">
      <p class="slow__mega" aria-hidden="true">slow.</p>
      <h2 class="h2" id="slow-title" data-reveal>Weniger Dinge.<br>Bessere Nächte.</h2>
      <p class="lead" data-reveal style="--i:1">Wir glauben nicht an Kollektionen, die nach einer Saison wieder verschwinden. Sondern an ein paar wirklich gute Dinge, die mit dir älter werden.</p>
      <a class="link-arrow" href="#philosophie" data-reveal style="--i:2">Unsere Philosophie lesen ${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="voices container" aria-labelledby="voices-title">
  ${secHead('Stimmen', 'Bewertungen', 'voices-title', `<p class="demo-note">${icon('info')} Platzhalter-Modul: zeigt im Live-Shop verifizierte Bewertungen aus WooCommerce.</p>`)}
  <div class="voices__grid">${B.SAMPLE_REVIEWS.map((r, i) => `<figure class="voice" data-reveal style="--i:${i}"><span class="voice__stars" aria-hidden="true">${[1, 2, 3, 4, 5].map(() => icon('star')).join('')}</span><blockquote>${r.text}</blockquote><figcaption>${r.title}</figcaption></figure>`).join('')}</div>
</section>

${V.newsletter()}`;
    return {
      title: 'baz – soft happenz · Handgefertigtes aus Alpakawolle', html, pose: 'home',
      mount(root) {
        /* Rail-Tabs */
        $$('[data-rail]', root).forEach(t => t.addEventListener('click', () => {
          $$('[data-rail]', root).forEach(x => x.setAttribute('aria-selected', x === t));
          const tr = $('[data-rail-track]', root);
          tr.setAttribute('aria-labelledby', t.id);
          tr.classList.add('is-swapping');
          setTimeout(() => { tr.innerHTML = byIds(railIds(t.dataset.rail)).map((p, i) => B.card(p, i)).join(''); tr.scrollLeft = 0; tr.classList.remove('is-swapping'); B.observe(tr); }, 220);
        }));
        $$('.tabs', root).forEach(list => list.addEventListener('keydown', e => {
          if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
          const tabs = $$('[role="tab"]', list), i = tabs.indexOf(document.activeElement);
          const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length]; n.focus(); n.click();
        }));
        /* Storytelling: aktiver Schritt */
        if ('IntersectionObserver' in window) {
          const so = new IntersectionObserver(es => es.forEach(en => {
            if (!en.isIntersecting) return;
            const i = +en.target.dataset.step;
            $$('[data-step]', root).forEach(s => s.classList.toggle('is-on', +s.dataset.step === i));
            $$('[data-frame]', root).forEach(f => f.classList.toggle('is-on', +f.dataset.frame === i));
            const no = $('[data-story-no]', root); if (no) no.textContent = '0' + (i + 1);
            const bu = $('.story__burst', root); if (bu) bu.style.setProperty('--r', (i * 45) + 'deg');
          }), { rootMargin: '-45% 0px -45% 0px' });
          $$('[data-step]', root).forEach(s => so.observe(s));
        }
        V.mountNewsletter(root);
      }
    };
  };

  /* Newsletter (wiederverwendbar) */
  V.newsletter = () => `<section class="news" aria-labelledby="news-title">
  <div class="container news__inner">
    <div class="news__copy"><p class="eyebrow">Newsletter</p><h2 class="h2" id="news-title">Post von baz.</h2><p>Neue Stücke, Pflegetipps und leise Geschichten aus der Manufaktur – etwa einmal im Monat. Als Dankeschön gibt’s 10 % auf deine erste Bestellung.</p></div>
    <form class="news__form" data-form="newsletter" novalidate>
      <div class="field field--inline"><label class="field__label" for="nl-email">E-Mail-Adresse</label><div class="field__row"><input id="nl-email" name="email" type="email" required autocomplete="email" placeholder="du@beispiel.de"><button class="btn btn--primary" type="submit">Anmelden</button></div></div>
      <div class="field"><label class="check"><input type="checkbox" id="nl-consent" name="consent" required><span>Ich möchte den Newsletter erhalten und habe die <a href="#recht-datenschutz">Datenschutzhinweise</a> gelesen. Abmeldung jederzeit möglich.</span></label></div>
      <div class="news__done" hidden role="status"><span class="news__done-ic">${icon('check')}</span><div><strong>Fast geschafft!</strong><p>Im Live-Shop folgt jetzt die Bestätigungs-E-Mail (Double-Opt-in). In dieser Demo wird nichts versendet.</p></div></div>
    </form>
  </div>
</section>`;
  V.mountNewsletter = root => {
    const f = $('[data-form="newsletter"]', root); if (!f) return;
    f.addEventListener('submit', e => {
      e.preventDefault();
      if (!B.validateForm(f)) return;
      $$('.field', f).forEach(x => x.hidden = true);
      $('.news__done', f).hidden = false;
    });
  };

  /* =======================================================================
     SHOP & KATEGORIEN
     ======================================================================= */
  const PAGE = 6;
  const maxPriceAll = () => Math.ceil(Math.max(...P().map(p => B.basePrice(p, p.sizes.length - 1, p.option ? p.option.values.length - 1 : undefined))) / 10) * 10;
  const freshState = (cat) => ({ cats: cat ? [cat] : [], price: maxPriceAll(), fabrics: [], flags: [], avail: false, sort: 'featured', view: (B.shopState && B.shopState.view) || 'grid', shown: PAGE, q: '' });
  B.shopState = freshState();

  const filtered = () => {
    const s = B.shopState;
    let list = P().filter(p =>
      (!s.cats.length || s.cats.includes(p.cat)) &&
      B.minPrice(p) <= s.price &&
      (!s.fabrics.length || p.fabrics.some(f => s.fabrics.includes(f))) &&
      (!s.flags.length || s.flags.some(f => p.badges.includes(f))) &&
      (!s.avail || B.inStock(p)) &&
      (!s.q || (p.name + ' ' + p.type + ' ' + catName(p.cat) + ' ' + p.material).toLowerCase().includes(s.q.toLowerCase()))
    );
    const srt = { featured: (a, b) => (B.inStock(b) - B.inStock(a)) || (b.badges.length - a.badges.length), new: (a, b) => b.added - a.added, 'price-asc': (a, b) => B.minPrice(a) - B.minPrice(b), 'price-desc': (a, b) => B.minPrice(b) - B.minPrice(a), name: (a, b) => a.name.localeCompare(b.name, 'de') }[s.sort];
    return list.sort(srt);
  };

  V.shop = (catId, opts = {}) => {
    const cat = B.CATEGORIES.find(c => c.id === catId);
    if (!opts.keep) { const q = B.shopState.pendingQ; B.shopState = freshState(catId); if (q) B.shopState.q = q; }
    const s = B.shopState, mx = maxPriceAll();
    const count = id => P().filter(p => p.cat === id).length;
    const head = cat ? `
<section class="cathead container">
  <div class="cathead__copy"><nav class="crumbs" aria-label="Brotkrumen"><ol><li><a href="#start">Start</a></li><li><a href="#shop">Shop</a></li><li aria-current="page">${cat.name}</li></ol></nav>
    <h1 class="page-title" tabindex="-1">${cat.name}</h1><p class="lead">${cat.claim}</p>
    <ul class="catnav">${B.CATEGORIES.map(c => `<li><a class="chip ${c.id === cat.id ? 'is-on' : ''}" href="#kat-${c.id}" ${c.id === cat.id ? 'aria-current="page"' : ''}>${c.name}</a></li>`).join('')}</ul></div>
  <div class="cathead__art" data-parallax="-0.05">${B.art.category(cat)}</div>
</section>` : `
<section class="phead container">
  <p class="eyebrow">Shop · ${P().length} Produkte</p>
  <h1 class="page-title" tabindex="-1">Alles, was<br>weich ist.</h1>
  <ul class="catnav">${B.CATEGORIES.map(c => `<li><a class="chip" href="#kat-${c.id}">${c.name}</a></li>`).join('')}</ul>
</section>`;
    const html = `${head}
<div class="shop container">
  <aside class="filters" id="filters" aria-label="Produktfilter" role="dialog" aria-modal="false">
    <div class="filters__head"><h2 class="h4">Filter</h2><button class="icon-btn filters__close" type="button" data-action="close-layer" aria-label="Filter schließen">${icon('close')}</button></div>
    <form class="filters__form" data-filters>
      <fieldset class="fgroup"><legend>Kategorie</legend>${B.CATEGORIES.map(c => `<label class="check"><input type="checkbox" name="cat" value="${c.id}" ${s.cats.includes(c.id) ? 'checked' : ''}><span>${c.name}</span><em>${count(c.id)}</em></label>`).join('')}</fieldset>
      <fieldset class="fgroup"><legend>Preis bis <output data-price-out>${B.money(s.price)}</output></legend><input class="range" type="range" name="price" min="50" max="${mx}" step="10" value="${s.price}" aria-label="Maximaler Preis"><div class="range__scale"><span>50 €</span><span>${mx} €</span></div></fieldset>
      <fieldset class="fgroup"><legend>Farbe</legend><div class="fswatches">${Object.entries(B.FABRICS).map(([k, f]) => `<label class="fswatch"><input type="checkbox" name="fabric" value="${k}" ${s.fabrics.includes(k) ? 'checked' : ''}><span class="dot sw--${k}"></span><span>${f.name}</span></label>`).join('')}</div></fieldset>
      <fieldset class="fgroup"><legend>Kennzeichnung</legend>${Object.entries(B.BADGES).map(([k, b]) => `<label class="check"><input type="checkbox" name="flag" value="${k}" ${s.flags.includes(k) ? 'checked' : ''}><span>${b.label}</span></label>`).join('')}</fieldset>
      <fieldset class="fgroup"><legend>Verfügbarkeit</legend><label class="switch"><input type="checkbox" name="avail" role="switch" ${s.avail ? 'checked' : ''}><span class="switch__ui" aria-hidden="true"></span><span>Nur verfügbare Artikel</span></label></fieldset>
      <button class="btn btn--ghost btn--block" type="button" data-action="reset-filters">Filter zurücksetzen</button>
    </form>
    <div class="filters__foot"><button class="btn btn--primary btn--block" type="button" data-action="close-layer"><span data-result-count>0</span>&nbsp;Ergebnisse anzeigen</button></div>
  </aside>
  <div class="shop__main">
    <div class="toolbar">
      <button class="btn btn--ghost btn--sm toolbar__filter" type="button" data-action="open-filters" aria-controls="filters">${icon('filter')} Filter <span class="toolbar__fc" data-filter-count></span></button>
      <p class="toolbar__count" aria-live="polite"><strong data-result-count>0</strong> Produkte</p>
      <div class="toolbar__right">
        <label class="select"><span class="visually-hidden">Sortieren nach</span><select data-sort>${[['featured', 'Empfohlen'], ['new', 'Neueste zuerst'], ['price-asc', 'Preis aufsteigend'], ['price-desc', 'Preis absteigend'], ['name', 'Name A–Z']].map(([v, l]) => `<option value="${v}" ${s.sort === v ? 'selected' : ''}>${l}</option>`).join('')}</select>${icon('chevron')}</label>
        <div class="viewtoggle" role="group" aria-label="Ansicht"><button type="button" data-view="grid" aria-pressed="${s.view === 'grid'}" aria-label="Rasteransicht">${icon('grid')}</button><button type="button" data-view="list" aria-pressed="${s.view === 'list'}" aria-label="Listenansicht">${icon('list')}</button></div>
      </div>
    </div>
    <div class="chips-row" data-chips></div>
    <div class="pgrid ${s.view === 'list' ? 'is-list' : ''}" data-grid></div>
    <div class="loadmore" data-loadmore></div>
  </div>
</div>`;
    return {
      title: (cat ? cat.name : 'Shop') + ' · baz', html, pose: cat ? 'category' : 'shop',
      mount(root) {
        const form = $('[data-filters]', root);
        const read = () => {
          const fd = new FormData(form);
          Object.assign(B.shopState, { cats: fd.getAll('cat'), fabrics: fd.getAll('fabric'), flags: fd.getAll('flag'), avail: fd.has('avail'), price: +fd.get('price'), shown: PAGE });
          $('[data-price-out]', root).textContent = B.money(B.shopState.price);
          renderGrid(root);
        };
        form.addEventListener('change', read);
        form.querySelector('.range').addEventListener('input', read);
        $('[data-sort]', root).addEventListener('change', e => { B.shopState.sort = e.target.value; renderGrid(root); });
        $$('[data-view]', root).forEach(b => b.addEventListener('click', () => {
          B.shopState.view = b.dataset.view;
          $$('[data-view]', root).forEach(x => x.setAttribute('aria-pressed', x === b));
          $('[data-grid]', root).classList.toggle('is-list', B.shopState.view === 'list');
          renderGrid(root, true);
        }));
        root.addEventListener('click', e => {
          const chip = e.target.closest('[data-unfilter]');
          if (chip) { const [k, v] = chip.dataset.unfilter.split(':'); const s = B.shopState;
            if (k === 'q') s.q = ''; else if (k === 'avail') s.avail = false; else if (k === 'price') s.price = maxPriceAll(); else s[k] = s[k].filter(x => x !== v);
            syncForm(root); renderGrid(root); }
          if (e.target.closest('[data-action="reset-filters"]')) { const keepView = B.shopState.view; B.shopState = freshState(); B.shopState.view = keepView; syncForm(root); renderGrid(root); }
          const lmb = e.target.closest('[data-action="load-more"]');
          if (lmb) { lmb.classList.add('is-loading'); lmb.disabled = true; setTimeout(() => { B.shopState.shown += PAGE; renderGrid(root, false, true); }, B.reduced ? 0 : 650); }
        });
        renderGrid(root);
      }
    };
  };

  function syncForm(root) {
    const s = B.shopState, form = $('[data-filters]', root);
    $$('input[name="cat"]', form).forEach(i => i.checked = s.cats.includes(i.value));
    $$('input[name="fabric"]', form).forEach(i => i.checked = s.fabrics.includes(i.value));
    $$('input[name="flag"]', form).forEach(i => i.checked = s.flags.includes(i.value));
    form.avail.checked = s.avail; form.price.value = s.price;
    $('[data-price-out]', root).textContent = B.money(s.price);
  }

  function renderGrid(root, keepShown, append) {
    const s = B.shopState, list = filtered(), grid = $('[data-grid]', root);
    const show = list.slice(0, s.shown);
    $$('[data-result-count]').forEach(e => e.textContent = list.length);
    const chips = [
      ...(s.q ? [[`„${esc(s.q)}“`, 'q:']] : []),
      ...s.cats.map(c => [catName(c), 'cats:' + c]), ...s.fabrics.map(f => [B.FABRICS[f].name, 'fabrics:' + f]),
      ...s.flags.map(f => [B.BADGES[f].label, 'flags:' + f]), ...(s.avail ? [['Verfügbar', 'avail:']] : []),
      ...(s.price < maxPriceAll() ? [['bis ' + B.money(s.price), 'price:']] : [])];
    $('[data-chips]', root).innerHTML = chips.map(([l, k]) => `<button class="chip chip--x" type="button" data-unfilter="${k}" aria-label="Filter ${l} entfernen">${l}${icon('close')}</button>`).join('') + (chips.length > 1 ? `<button class="linklike" type="button" data-action="reset-filters">Alle entfernen</button>` : '');
    const fc = $('[data-filter-count]', root); if (fc) fc.textContent = chips.length ? `(${chips.length})` : '';
    if (!list.length) {
      grid.innerHTML = `<div class="empty"><div class="empty__art">${B.sun({ anim: true })}</div><h2 class="h3">Hier ist es gerade etwas zu leer.</h2><p>Für diese Filterkombination haben wir nichts gefunden. Lockere die Auswahl – oder lass dich vom ganzen Sortiment inspirieren.</p><button class="btn btn--primary" type="button" data-action="reset-filters">Filter zurücksetzen</button></div>`;
      $('[data-loadmore]', root).innerHTML = ''; return;
    }
    const isList = s.view === 'list';
    if (append) {
      const have = grid.querySelectorAll('.pcard').length;
      grid.insertAdjacentHTML('beforeend', show.slice(have).map((p, i) => B.card(p, i, { list: isList })).join(''));
    } else grid.innerHTML = show.map((p, i) => B.card(p, i, { list: isList })).join('');
    B.observe(grid);
    const lm = $('[data-loadmore]', root);
    lm.innerHTML = list.length > PAGE ? `<p>Du hast <strong>${show.length}</strong> von <strong>${list.length}</strong> Produkten gesehen</p><div class="loadmore__bar" aria-hidden="true"><span style="width:${show.length / list.length * 100}%"></span></div>${show.length < list.length ? `<button class="btn btn--ghost" type="button" data-action="load-more">Mehr laden</button>` : ''}` : '';
  }

  /* =======================================================================
     PRODUKTDETAILSEITE
     ======================================================================= */
  const VIEWS = [['main', 'Hauptansicht'], ['scene', 'Im Raum'], ['detail', 'Materialdetail']];
  const ORIGIN = 'Unsere Alpakawolle stammt von kleinen Herden im Hochland der Anden, wo die Tiere ganzjährig draußen leben. Sortiert, gewaschen und verarbeitet wird in kleinen Manufakturen – jedes Stück wird von Hand genäht und gefüllt.<br><small class="muted">Konkrete Herkunfts-, Manufaktur- und Zertifikatsangaben werden je Produkt im Shop gepflegt.</small>';

  V.product = (id) => {
    const p = B.product(id);
    if (!p) return V.notFound();
    const st = { fabric: p.fabrics[0], size: 0, opt: p.option ? (p.option.def ?? 0) : undefined, qty: 1, view: 0 };
    if (B.pdpPreset && B.pdpPreset.id === id) { Object.assign(st, B.pdpPreset); B.pdpPreset = null; }
    const sold = !B.inStock(p);
    const partner = B.product(PARTNER[p.id]);
    const similar = P().filter(x => x.id !== p.id && (x.cat === p.cat || x.art === p.art)).concat(P().filter(x => x.id !== p.id)).filter((x, i, a) => a.indexOf(x) === i).slice(0, 4);
    const img = (v, sz) => B.art.product(p, st.fabric, v, p.sizes[sz ?? st.size]);
    const html = `
<nav class="crumbs container" aria-label="Brotkrumen"><ol><li><a href="#start">Start</a></li><li><a href="#shop">Shop</a></li><li><a href="#kat-${p.cat}">${catName(p.cat)}</a></li><li aria-current="page">${esc(p.name)}</li></ol></nav>
<section class="pdp container" aria-labelledby="pdp-title">
  <div class="pdp__gallery">
    <div class="pdp__thumbs" role="tablist" aria-label="Produktansichten">${VIEWS.map(([v, l], i) => `<button class="pdp__thumb" type="button" role="tab" aria-selected="${i === 0}" data-gview="${i}" aria-label="${l}">${img(v)}</button>`).join('')}</div>
    <div class="pdp__stage" data-zoom><div class="pdp__img" data-stage>${img('main')}</div>${B.badges(p, 'pdp__badges')}<p class="pdp__hint">${icon('search')} <span>Zum Zoomen über das Bild fahren</span></p></div>
  </div>
  <div class="pdp__info"><div class="pdp__sticky">
    <p class="eyebrow">${esc(p.type)} · ${catName(p.cat)}</p>
    <h1 class="pdp__title" id="pdp-title" tabindex="-1">${esc(p.name)}</h1>
    <div class="pdp__price" data-price aria-live="polite">${B.priceHtml(p, st.size, st.opt)}</div>
    <p class="pdp__tax">inkl. MwSt., zzgl. <a href="#service-versand">Versandkosten</a></p>
    <p class="pdp__short">${esc(p.short)}</p>
    <form class="pdp__form" data-pdp-form novalidate>
      ${B.picker(p, st, 'pdp')}
      <div data-stock>${B.stockHtml(p)}</div>
      ${sold ? `<div class="notify"><p><strong>Bald wieder da.</strong> Wir sagen dir Bescheid, sobald „${esc(p.name)}“ wieder verfügbar ist.</p><div class="field field--inline"><label class="field__label" for="notify-email">E-Mail-Adresse</label><div class="field__row"><input id="notify-email" type="email" required autocomplete="email" placeholder="du@beispiel.de"><button class="btn btn--primary" type="submit" data-main-atc>Benachrichtigen</button></div></div></div>`
      : `<div class="pdp__buy">${B.qtyStepper(1, 'data-pdp-qty', p.stock)}<button class="btn btn--primary btn--lg btn--atc" type="submit" data-main-atc><span class="atc__label">In den Warenkorb</span><span class="atc__sum" data-atc-sum>${B.money(B.price(p, st.size, st.opt))}</span></button><button class="icon-btn icon-btn--line ${B.wish.has(p.id) ? 'is-on' : ''}" type="button" data-action="wish" data-id="${p.id}" aria-pressed="${B.wish.has(p.id)}" aria-label="Auf die Merkliste">${icon('heart')}</button></div>`}
    </form>
    <ul class="pdp__perks"><li>${icon('truck')}<span><strong>Versandkostenfrei ab 80 €</strong> · Lieferung in 2–4 Werktagen</span></li><li>${icon('refresh')}<span><strong>30 Tage Rückgabe</strong> · zusätzlich zum Widerrufsrecht</span></li><li>${icon('shield')}<span><strong>Sicher bezahlen</strong> · Karte, Apple Pay, Google Pay, Klarna</span></li></ul>
    <div class="pdp__acc" data-acc-group="single">
      ${B.acc('Beschreibung', `<p>${esc(p.story)}</p>`, true)}
      ${B.acc('Material & Füllung', `<p>${esc(p.material)}</p><p class="muted">Gewicht: ${esc(p.weight)}</p>`)}
      ${B.acc('Pflege', `<p>${esc(p.care)}</p>`)}
      ${B.acc('Herkunft & Herstellung', `<p>${ORIGIN}</p>`)}
      ${B.acc('Versand & Rückgabe', '<p>Lagernde Artikel verlassen unsere Manufaktur innerhalb von 1–2 Werktagen. Innerhalb Deutschlands ab 80 € versandkostenfrei, sonst 4,90 €. 14 Tage Widerrufsrecht plus freiwillige 30-Tage-Rückgabe für ungenutzte Artikel.</p>')}
    </div>
  </div></div>
</section>

<section class="highs container" aria-label="Produktvorteile">${p.highlights.map(([t, d], i) => `<div class="high" data-reveal style="--i:${i}"><span class="high__no">0${i + 1}</span><h2 class="h3">${t}</h2><p>${d}</p></div>`).join('')}</section>

${partner ? `<section class="bundle container" aria-labelledby="bundle-title">
  ${secHead('Kombinieren', 'Passt perfekt dazu', 'bundle-title')}
  <div class="bundle__box" data-reveal>
    <div class="bundle__items">
      <div class="bundle__item"><div class="bundle__art">${B.art.product(p, p.fabrics[0])}</div><p><strong>${esc(p.name)}</strong><span>${esc(p.type)} · ${p.sizes[0].label}</span>${B.priceHtml(p, 0, p.option ? p.option.def : undefined)}</p></div>
      <span class="bundle__plus" aria-hidden="true">${icon('plus')}</span>
      <div class="bundle__item"><a class="bundle__art" href="#p-${partner.id}">${B.art.product(partner, partner.fabrics[0])}</a><p><strong><a href="#p-${partner.id}">${esc(partner.name)}</a></strong><span>${esc(partner.type)} · ${partner.sizes[0].label}</span>${B.priceHtml(partner, 0, partner.option ? partner.option.def : undefined)}</p></div>
    </div>
    <div class="bundle__cta"><p>Zusammen <strong>${B.money(B.price(p, 0, p.option ? p.option.def : undefined) + B.price(partner, 0, partner.option ? partner.option.def : undefined))}</strong></p><button class="btn btn--primary" type="button" data-action="add-bundle" data-ids="${p.id},${partner.id}" ${(!B.inStock(p) || !B.inStock(partner)) ? 'disabled' : ''}>Beides in den Warenkorb</button></div>
  </div>
</section>` : ''}

<section class="reviews container" aria-labelledby="rev-title">
  <div class="reviews__grid">
    <div><p class="eyebrow">Bewertungen</p><h2 class="h2" id="rev-title">Erfahrungen</h2><p class="demo-note">${icon('info')} Platzhalter: Im Live-Shop erscheinen hier verifizierte Bewertungen inklusive Sterne-Schnitt (strukturierte Daten für Google).</p><button class="btn btn--ghost" type="button" data-action="toast-demo" data-msg="Bewertungen schreiben ist im Live-Shop für verifizierte Käufer:innen möglich.">Bewertung schreiben</button></div>
    <div class="faq-mini" data-acc-group="single"><h3 class="h4">Häufige Fragen</h3>${B.FAQ.filter(f => ['material', 'pflege', 'groessen'].includes(f.topic)).slice(0, 4).map(f => B.acc(f.q, `<p>${f.a}</p>`)).join('')}</div>
  </div>
</section>

<section class="rail container" aria-labelledby="sim-title">
  ${secHead('Entdecken', 'Das könnte dir auch gefallen', 'sim-title')}
  <div class="pgrid pgrid--4">${similar.map((x, i) => B.card(x, i)).join('')}</div>
</section>

${sold ? '' : `<div class="sticky-atc" aria-hidden="true">
  <div class="container sticky-atc__inner">
    <span class="sticky-atc__art" data-sticky-art>${img('main')}</span>
    <p class="sticky-atc__info"><strong>${esc(p.name)}</strong><span data-sticky-variant></span></p>
    <span class="sticky-atc__price" data-sticky-price></span>
    <button class="btn btn--primary" type="button" data-action="sticky-add" tabindex="-1">In den Warenkorb</button>
  </div>
</div>`}`;

    return {
      title: `${p.name} ${p.type} · baz`, html, pose: 'product',
      mount(root) {
        const form = $('[data-pdp-form]', root);
        const stage = $('[data-stage]', root);
        const update = (imgChanged) => {
          $('[data-price]', root).innerHTML = B.priceHtml(p, st.size, st.opt);
          const sum = $('[data-atc-sum]', root); if (sum) sum.textContent = B.money(B.price(p, st.size, st.opt) * st.qty);
          $$('[data-pick-val="fabric"]', root).forEach(e => e.textContent = B.FABRICS[st.fabric].name);
          $$('[data-pick-val="size"]', root).forEach(e => e.textContent = p.sizes[st.size].label);
          const variant = [p.sizes[st.size].label, B.FABRICS[st.fabric].name, p.option ? p.option.values[st.opt].label : ''].filter(Boolean).join(' · ');
          const sv = $('[data-sticky-variant]', root); if (sv) sv.textContent = variant;
          const sp = $('[data-sticky-price]', root); if (sp) sp.innerHTML = B.priceHtml(p, st.size, st.opt);
          if (imgChanged) {
            stage.classList.add('is-swap');
            setTimeout(() => { stage.innerHTML = img(VIEWS[st.view][0]); stage.classList.remove('is-swap'); }, 180);
            $$('[data-gview]', root).forEach((t, i) => t.innerHTML = img(VIEWS[i][0]));
            const sa = $('[data-sticky-art]', root); if (sa) sa.innerHTML = img('main');
          }
        };
        form.addEventListener('change', e => {
          const k = e.target.dataset.pick; if (!k) return;
          st[k] = k === 'fabric' ? e.target.value : +e.target.value;
          update(k === 'fabric' || k === 'size');
        });
        const qty = $('[data-pdp-qty]', root);
        if (qty) {
          const inp = $('input', qty);
          qty.addEventListener('click', e => { const b = e.target.closest('[data-qty]'); if (!b) return; inp.value = Math.min(p.stock, Math.max(1, (+inp.value || 1) + +b.dataset.qty)); st.qty = +inp.value; update(); });
          inp.addEventListener('change', () => { inp.value = Math.min(p.stock, Math.max(1, Math.round(+inp.value) || 1)); st.qty = +inp.value; update(); });
        }
        form.addEventListener('submit', e => {
          e.preventDefault();
          if (sold) { if (B.validateForm(form)) { B.toast({ type: 'success', title: 'Wir melden uns!', text: `Sobald „${esc(p.name)}“ wieder da ist, bekommst du eine E-Mail. (Demo)` }); form.reset(); } return; }
          B.addToCart(p.id, st, $('[data-main-atc]', root));
        });
        const sbtn = $('[data-action="sticky-add"]', root);
        if (sbtn) sbtn.addEventListener('click', () => B.addToCart(p.id, st, sbtn));
        /* Galerie */
        $$('[data-gview]', root).forEach(t => t.addEventListener('click', () => {
          st.view = +t.dataset.gview;
          $$('[data-gview]', root).forEach(x => x.setAttribute('aria-selected', x === t));
          stage.classList.add('is-swap');
          setTimeout(() => { stage.innerHTML = img(VIEWS[st.view][0]); stage.classList.remove('is-swap'); }, 180);
        }));
        /* Zoom */
        const z = $('[data-zoom]', root);
        z.addEventListener('pointermove', e => { if (e.pointerType !== 'mouse') return; const r = z.getBoundingClientRect(); stage.style.transformOrigin = `${(e.clientX - r.left) / r.width * 100}% ${(e.clientY - r.top) / r.height * 100}%`; z.classList.add('is-zoom'); });
        z.addEventListener('pointerleave', () => z.classList.remove('is-zoom'));
        z.addEventListener('click', e => { if (e.pointerType === 'mouse') return; z.classList.toggle('is-zoom'); });
        update();
      }
    };
  };

  /* Zentrale Add-to-Cart-Logik inkl. Feedback-States */
  B.addToCart = (id, st, btn) => {
    const p = B.product(id);
    if (btn) { btn.classList.add('is-loading'); btn.disabled = true; }
    setTimeout(() => {
      const r = B.cart.add(id, st.size || 0, st.fabric, st.opt, st.qty || 1);
      if (btn) { btn.classList.remove('is-loading'); btn.disabled = false; }
      if (!r.ok) { B.toast({ type: 'error', title: 'Konnte nicht hinzugefügt werden', text: r.error }); return; }
      if (btn) { btn.classList.add('is-done'); setTimeout(() => btn.classList.remove('is-done'), 1600); }
      B.flyToCart(btn);
      const variant = [p.sizes[st.size || 0].label, B.FABRICS[st.fabric || p.fabrics[0]].name].join(' · ');
      B.toast({ type: 'success', title: `${p.name} liegt im Warenkorb`, text: `${st.qty || 1} × ${variant}`, action: { label: 'Zum Warenkorb', act: 'open-cart' } });
    }, B.reduced ? 0 : 450);
  };

  /* =======================================================================
     SCHNELLANSICHT (Modal)
     ======================================================================= */
  V.openQuick = (id, opener) => {
    const p = B.product(id); if (!p) return;
    const st = { fabric: p.fabrics[0], size: 0, opt: p.option ? (p.option.def ?? 0) : undefined, qty: 1 };
    const box = $('#quick .modal__content');
    box.innerHTML = `<div class="quick">
  <div class="quick__art" data-q-art>${B.art.product(p, st.fabric, 'main', p.sizes[0])}</div>
  <div class="quick__info">
    ${B.badges(p)}
    <p class="eyebrow">${esc(p.type)}</p>
    <h2 class="h3" id="quick-title">${esc(p.name)}</h2>
    <div data-q-price>${B.priceHtml(p, st.size, st.opt)}</div>
    <form class="quick__form" data-q-form>${B.picker(p, st, 'q')}${B.stockHtml(p)}
      <div class="pdp__buy">${B.qtyStepper(1, 'data-q-qty', p.stock)}<button class="btn btn--primary btn--atc" type="submit"><span class="atc__label">In den Warenkorb</span></button></div>
    </form>
    <a class="link-arrow" href="#p-${p.id}">Alle Details ansehen ${icon('arrow')}</a>
  </div>
</div>`;
    const form = $('[data-q-form]', box), inp = $('[data-q-qty] input', box);
    form.addEventListener('change', e => {
      const k = e.target.dataset.pick; if (!k) return;
      st[k] = k === 'fabric' ? e.target.value : +e.target.value;
      $('[data-q-price]', box).innerHTML = B.priceHtml(p, st.size, st.opt);
      $$('[data-pick-val="fabric"]', box).forEach(x => x.textContent = B.FABRICS[st.fabric].name);
      $$('[data-pick-val="size"]', box).forEach(x => x.textContent = p.sizes[st.size].label);
      if (k !== 'opt') $('[data-q-art]', box).innerHTML = B.art.product(p, st.fabric, 'main', p.sizes[st.size]);
    });
    $('[data-q-qty]', box).addEventListener('click', e => { const b = e.target.closest('[data-qty]'); if (!b) return; inp.value = Math.min(p.stock, Math.max(1, (+inp.value || 1) + +b.dataset.qty)); });
    form.addEventListener('submit', e => { e.preventDefault(); st.qty = Math.max(1, +inp.value || 1); const btn = form.querySelector('[type="submit"]'); B.addToCart(p.id, st, btn); setTimeout(() => B.closeLayer('quick'), 900); });
    B.splitChars(box);
    B.openLayer('quick', opener);
  };

  /* =======================================================================
     SUCHE
     ======================================================================= */
  V.search = q => {
    const out = $('[data-search-results]');
    q = (q || '').trim().toLowerCase();
    if (q.length < 2) { out.innerHTML = ''; return; }
    const hits = P().filter(p => (p.name + ' ' + p.type + ' ' + catName(p.cat) + ' ' + p.material + ' ' + p.fabrics.map(f => B.FABRICS[f].name).join(' ')).toLowerCase().includes(q));
    const faq = B.FAQ.filter(f => (f.q + ' ' + f.a).toLowerCase().includes(q)).slice(0, 3);
    out.innerHTML = (hits.length ? `<p class="search__label">${hits.length} Produkt${hits.length > 1 ? 'e' : ''}</p><ul class="search__list">${hits.slice(0, 6).map(p => `<li><a class="sresult" href="#p-${p.id}"><span class="sresult__art">${B.art.product(p, p.fabrics[0])}</span><span><strong>${esc(p.name)}</strong><small>${esc(p.type)}</small></span>${B.priceHtml(p)}</a></li>`).join('')}</ul>${hits.length > 1 ? `<button class="btn btn--ghost" type="button" data-action="search-all" data-q="${esc(q)}">Alle ${hits.length} Treffer im Shop ${icon('arrow')}</button>` : ''}` : `<p class="search__none">Kein Produkt zu „${esc(q)}“. Probier es mit „Kissen“, „Decke“ oder „Sand“.</p>`)
      + (faq.length ? `<p class="search__label">Aus dem Service</p><ul class="search__faq">${faq.map(f => `<li><a href="#service">${esc(f.q)} ${icon('arrow')}</a></li>`).join('')}</ul>` : '');
  };
})(window.BAZ = window.BAZ || {});
