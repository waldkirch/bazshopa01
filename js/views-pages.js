/* ==========================================================================
   baz · views-pages.js
   Unternehmen, Philosophie (Ideale), Service, Kundenkonto, Recht, 404.
   ========================================================================== */
(function (B) {
  'use strict';
  const V = B.views = B.views || {};
  const { $, $$, esc, icon } = B;

  /* =======================================================================
     UNTERNEHMEN
     ======================================================================= */
  V.about = () => {
    const html = `
<section class="phead phead--xl container">
  <p class="eyebrow" data-reveal>Unternehmen</p>
  <h1 class="mega-title" tabindex="-1"><span class="ml"><span>Wir sind</span></span><span class="ml"><span class="hl-burst">baz.${B.sun({ anim: true, cls: 'hl-burst__mark' })}</span></span></h1>
  <div class="phead__cols">
    <p class="lead" data-reveal style="--i:1">Ein junges Label für Dinge, die weich sind und bleiben: Bettwäsche, Kissen und Wohnaccessoires aus Alpakawolle – von Hand gefertigt, ohne Kunstfaser, ohne Eile.</p>
    <p data-reveal style="--i:2">„soft happenz“ ist unser Versprechen: Wenn du dich abends hinlegst, soll etwas Gutes passieren. Dafür arbeiten wir mit wenigen Menschen, die ihr Handwerk lieben – und mit einem Material, das von Natur aus fast alles richtig macht.</p>
  </div>
</section>

<section class="timeline container" aria-labelledby="tl-title">
  <div class="sec-head"><div><p class="eyebrow">Markenentstehung</p><h2 class="h2" id="tl-title">Wie aus einer Nacht<br>eine Marke wurde.</h2></div></div>
  <ol class="timeline__list">
    ${[['Die Idee', 'Am Anfang stand eine schlechte Nacht unter einer Kunstfaserdecke – und die Frage, warum es so schwer ist, etwas wirklich Natürliches zu finden, das auch noch gut aussieht.'],
       ['Die Suche', 'Wir haben Wollen verglichen, Herden besucht, Manufakturen kennengelernt. Alpaka hat gewonnen: leicht, warm, atmungsaktiv und ohne Lanolin.'],
       ['Die Manufaktur', 'Mit kleinen Partner-Werkstätten entstanden die ersten Kissen. Jede Naht von Hand, jedes Detail so lange überarbeitet, bis es sich richtig anfühlte.'],
       ['Heute', 'Aus einem Kissen wurde eine kleine Kollektion. Die Prinzipien sind geblieben: wenige Produkte, ehrliche Materialien, volle Transparenz.']]
      .map(([t, d], i) => `<li class="tl" data-reveal style="--i:${i}"><span class="tl__dot"></span><span class="tl__no">0${i + 1}</span><h3 class="h3">${t}</h3><p>${d}</p></li>`).join('')}
  </ol>
</section>

<section class="fullscene" aria-label="Handwerk">
  <div class="fullscene__art" data-reveal="img">${B.art.product(B.product('morgentau'), 'sand', 'scene').replace('xMidYMid meet', 'xMidYMid slice')}</div>
  <div class="fullscene__card container"><div class="fullscene__box" data-reveal><p class="eyebrow">Handwerk & Herstellung</p><h2 class="h2">Handwerk statt Fließband.</h2><p>Jedes Stück wird in kleinen Manufakturen gemessen, zugeschnitten, genäht und gefüllt. Das dauert länger. Aber man sieht es – und man spürt es jede Nacht.</p></div></div>
</section>

<section class="chain container" id="lieferkette" aria-labelledby="chain-title">
  <div class="sec-head"><div><p class="eyebrow">Herkunft der Materialien</p><h2 class="h2" id="chain-title">Unsere Lieferkette.<br>Ganz offen.</h2></div><p class="sec-head__note">Partner, Standorte und Zertifikate werden im Live-Shop je Station verlinkt.</p></div>
  <ol class="chain__list">
    ${[['leaf', 'Herde', 'Kleine Familienbetriebe im Hochland'], ['feather', 'Schur', 'Einmal jährlich, schonend'], ['drop', 'Waschen', 'Mild, ohne Chlor'], ['refresh', 'Spinnen & Weben', 'Traditionelle Verfahren'], ['hand', 'Nähen & Füllen', 'Partner-Manufaktur'], ['package', 'Zu dir', 'Plastikfrei verpackt']]
      .map(([ic, t, d], i) => `<li class="chain__step" data-reveal style="--i:${i}"><span class="chain__ic">${icon(ic)}</span><strong>${t}</strong><span>${d}</span></li>`).join('')}
  </ol>
</section>

<section class="pillars container" id="nachhaltigkeit" aria-labelledby="pil-title">
  <div class="sec-head"><div><p class="eyebrow">Nachhaltigkeitskonzept</p><h2 class="h2" id="pil-title">Vier Versprechen,<br>die wir messen lassen.</h2></div></div>
  <div class="pillars__grid">
    ${[['Material', 'Ausschließlich Naturfasern: Alpaka, Bio-Leinen, Bio-Baumwolle. Keine Kunstfaser in Füllungen, kein Superwash.'],
       ['Herstellung', 'Kleine Serien statt Überproduktion. Wir fertigen nach, wenn etwas fehlt – nicht auf Verdacht.'],
       ['Verpackung', 'Baumwollbeutel zum Weiterverwenden, Versandkarton aus Recyclingpapier, kein Plastik.'],
       ['Langlebigkeit', 'Reparieren statt ersetzen: Nähte, Reißverschlüsse und Füllungen erneuern wir gern.']]
      .map(([t, d], i) => `<article class="pillar" data-reveal style="--i:${i}"><span class="pillar__no">0${i + 1}</span><h3 class="h3">${t}</h3><p>${d}</p></article>`).join('')}
  </div>
</section>

<section class="team container" aria-labelledby="team-title">
  <div class="sec-head"><div><p class="eyebrow">Team</p><h2 class="h2" id="team-title">Wenige Hände.<br>Viel Hingabe.</h2></div><p class="sec-head__note">Namen und Porträts werden im Theme über den Block „Team“ gepflegt.</p></div>
  <div class="team__grid">
    ${[['Gründung & Produkt', 'Entwickelt die Kollektion, testet jede Füllung selbst und sagt öfter „noch nicht gut genug“.', 'sonne'], ['Manufaktur & Handwerk', 'Verantwortet Zuschnitt, Nähte und Füllung – und das kleine Label in jedem Stück.', 'sand'], ['Design & Marke', 'Sorgt dafür, dass baz so aussieht, wie es sich anfühlt: weich, klar, fröhlich.', 'zimt'], ['Service & Versand', 'Beantwortet deine Fragen, packt deine Bestellung und legt manchmal eine Notiz bei.', 'schiefer']]
      .map(([r, d, f], i) => `<article class="member" data-reveal style="--i:${i}"><div class="member__art sw-bg--${f}">${B.sun({ variant: f === 'sonne' ? 'zimt' : 'gelb', anim: true })}</div><h3 class="h4">${r}</h3><p>${d}</p></article>`).join('')}
  </div>
</section>

<section class="cta-band container"><div class="cta-band__box" data-reveal><span class="cta-band__sun">${B.sun({ variant: 'gelb35', anim: true })}</span><p class="cta-band__mega" aria-hidden="true">soft?</p><div><h2 class="h2">Bereit für weicher?</h2><p>Entdecke die Kollektion – und schlaf ab heute ein bisschen besser.</p><a class="btn btn--primary btn--lg" href="#shop">Zum Shop ${icon('arrow')}</a></div></div></section>`;
    return { title: 'Unternehmen · baz', html, pose: 'unternehmen' };
  };

  /* =======================================================================
     PHILOSOPHIE / IDEALE  (Editorial / Brand Magazine)
     ======================================================================= */
  V.philosophy = () => {
    const values = [['Natürlich', 'Nur Fasern, die wachsen. Was wir verarbeiten, kann irgendwann zurück in den Kreislauf.'], ['Handgemacht', 'Ein Mensch, ein Stück. Kleine Unregelmäßigkeiten sind kein Fehler, sondern eine Handschrift.'], ['Transparent', 'Wir sagen dir, woher die Wolle kommt, wer näht und was ein Kissen kostet – und warum.'], ['Langlebig', 'Wir entwerfen für Jahrzehnte, nicht für Saisons. Und reparieren, wenn doch mal etwas reißt.'], ['Fair', 'Faire Preise für Tierhalter:innen und Manufakturen. Dafür verzichten wir auf Rabattschlachten.'], ['Fröhlich', 'Nachhaltig muss nicht ernst sein. soft happenz – das Gute darf sich auch gut anfühlen.']];
    const html = `
<section class="mag-cover container" aria-labelledby="mag-title">
  <div class="mag-cover__meta"><span>baz Journal</span><span>Ausgabe 01</span><span>Philosophie</span></div>
  <h1 class="mag-cover__title" id="mag-title" tabindex="-1">Ide<span class="mag-cover__burst">${B.sun({ anim: true })}</span>ale<em>.</em></h1>
  <div class="mag-cover__foot"><p class="mag-cover__dek">Sechs Gedanken darüber, wie wir schlafen, wohnen und konsumieren wollen.</p><p class="mag-cover__read">Lesezeit · 4 Minuten</p></div>
</section>

<section class="vision container" aria-label="Unsere Vision">
  <p class="eyebrow">Unsere Vision</p>
  <blockquote class="vision__quote" data-words>Wir wollen, dass Dinge wieder ein Leben lang halten – und dass man ihnen anfühlt, wer sie gemacht hat.</blockquote>
</section>

<section class="values container" aria-labelledby="val-title">
  <div class="sec-head"><div><p class="eyebrow">Unsere Werte</p><h2 class="h2" id="val-title">Woran wir glauben.</h2></div></div>
  <ol class="values__list">${values.map(([t, d], i) => `<li class="value" data-reveal><span class="value__no">0${i + 1}</span><h3 class="value__t">${t}</h3><p>${d}</p></li>`).join('')}</ol>
</section>

<section class="why" aria-labelledby="why-title">
  <div class="container">
    <div class="sec-head"><div><p class="eyebrow">Warum Alpaka?</p><h2 class="h2" id="why-title">Ein Material,<br>das mehr kann.</h2></div><p class="sec-head__note">Natürliche Materialien – ehrlich beschrieben.</p></div>
    <div class="why__grid">
      ${[['thermo', 'Wärmt ohne Gewicht', 'Viele Alpakafasern sind innen teilweise hohl. Die eingeschlossene Luft isoliert – leicht und trotzdem warm.'], ['drop', 'Atmet mit', 'Die Faser nimmt Feuchtigkeit auf und gibt sie wieder ab. So entsteht seltener Hitzestau.'], ['feather', 'Ohne Lanolin', 'Alpakavlies enthält kein Wollfett. Viele Menschen empfinden es deshalb als besonders angenehm auf der Haut.'], ['sparkle', 'Hält lange', 'Langes, glattes Haar neigt weniger zum Verfilzen – und bleibt bei guter Pflege über Jahre schön.']]
        .map(([ic, t, d], i) => `<article class="fact" data-reveal style="--i:${i}"><span class="fact__ic">${icon(ic)}</span><h3 class="h4">${t}</h3><p>${d}</p></article>`).join('')}
    </div>
  </div>
</section>

<section class="manifesto" aria-labelledby="man-title">
  <div class="container">
    <p class="eyebrow">Slow Living</p><h2 class="visually-hidden" id="man-title">Slow-Living-Manifest</h2>
    <ul class="manifesto__lines">${['Langsamer aufwachen.', 'Länger liegen bleiben.', 'Weniger, aber besser kaufen.', 'Reparieren statt ersetzen.', 'Behalten, was man liebt.'].map((l, i) => `<li data-reveal style="--i:${i}">${l}</li>`).join('')}</ul>
  </div>
</section>

<section class="principles container" aria-labelledby="pr-title">
  <div class="sec-head"><div><p class="eyebrow">Bewusster Konsum</p><h2 class="h2" id="pr-title">Drei einfache Regeln.</h2></div></div>
  <div class="principles__grid">${[['Weniger kaufen', 'Ein gutes Kissen statt drei mittelmäßige. Unser Sortiment ist bewusst klein.'], ['Besser kaufen', 'Natürliche Materialien, faire Herstellung, ehrliche Preise – ohne künstliche Rabatte.'], ['Länger nutzen', 'Pflege, Reparatur und Nachfüllservice verlängern das Leben jedes Stücks.']].map(([t, d], i) => `<article class="principle" data-reveal style="--i:${i}"><span class="principle__no">${['I', 'II', 'III'][i]}</span><h3 class="h3">${t}</h3><p>${d}</p></article>`).join('')}</div>
  <figure class="pull" data-reveal><blockquote>„Handwerk statt Massenproduktion heißt auch: Wir sagen öfter Nein – zu schnellen Kollektionen, zu billigen Füllungen, zu Wachstum um jeden Preis.“</blockquote><figcaption>Aus unserem Gründungsmanifest</figcaption></figure>
</section>

<section class="quality container" aria-labelledby="q-title">
  <div class="quality__grid">
    <div><p class="eyebrow">Unser Anspruch an Qualität</p><h2 class="h2" id="q-title">Bevor etwas<br>baz heißt, …</h2></div>
    <ul class="checklist checklist--lg">${['… schlafen wir selbst wochenlang darauf.', '… prüfen wir jede Naht auf Zug und Haltbarkeit.', '… kennen wir die Herkunft jeder Faser.', '… muss es ohne Kunstfaser auskommen.', '… muss es sich reparieren lassen.'].map((t, i) => `<li data-reveal style="--i:${i}">${icon('check')}<span>${t}</span></li>`).join('')}</ul>
  </div>
</section>

<section class="cta-band container"><div class="cta-band__box cta-band__box--sun" data-reveal><span class="cta-band__sun">${B.sun({ variant: 'weiss45', anim: true })}</span><p class="cta-band__mega" aria-hidden="true">happenz</p><div><h2 class="h2">Gute Nächte beginnen hier.</h2><p>Finde das Stück, mit dem du alt werden möchtest.</p><a class="btn btn--primary btn--lg" href="#shop">Kollektion entdecken ${icon('arrow')}</a></div></div></section>`;
    return { title: 'Philosophie · baz', html, pose: 'philosophie' };
  };

  /* =======================================================================
     SERVICE & SUPPORT
     ======================================================================= */
  V.service = () => {
    const topics = [['truck', 'Versand', 'versand'], ['refresh', 'Rückgabe', 'rueckgabe'], ['shield', 'Zahlung', 'zahlung'], ['drop', 'Pflege', 'pflege'], ['package', 'Bestellstatus', 'status'], ['alert', 'Reklamation', 'kontakt']];
    const html = `
<section class="phead container">
  <p class="eyebrow">Service & Support</p>
  <h1 class="page-title" tabindex="-1">Wie können wir<br>helfen?</h1>
  <div class="faq-search"><label class="visually-hidden" for="faq-q">Häufige Fragen durchsuchen</label>${icon('search')}<input id="faq-q" type="search" placeholder="Frag uns etwas – z. B. „Pflege“ oder „Rückgabe“" autocomplete="off"></div>
</section>

<section class="topics container" aria-label="Themen">${topics.map(([ic, t, a], i) => `<a class="topic" href="#service-${a}" data-reveal style="--i:${i}"><span class="topic__ic">${icon(ic)}</span><span>${t}</span>${icon('arrow')}</a>`).join('')}</section>

<section class="faq container" id="faq" aria-labelledby="faq-title">
  <div class="faq__grid">
    <div><p class="eyebrow">FAQ</p><h2 class="h2" id="faq-title">Häufige Fragen</h2><p class="muted">Nicht dabei? Unser Service-Assistent unten rechts oder das <a href="#service-kontakt">Kontaktformular</a> helfen weiter.</p></div>
    <div><div class="faq__list" data-acc-group="single" data-faq>${B.FAQ.map(f => `<div data-faq-item data-text="${esc((f.q + ' ' + f.a).toLowerCase())}">${B.acc(f.q, `<p>${f.a}</p>`)}</div>`).join('')}</div><p class="faq__empty" data-faq-empty hidden>Dazu haben wir noch keine Antwort. <a href="#service-kontakt">Schreib uns</a> – wir melden uns innerhalb eines Werktags.</p></div>
  </div>
</section>

<section class="svc container" aria-label="Service-Informationen">
  <article class="svc__card" id="versand"><span class="svc__ic">${icon('truck')}</span><h2 class="h3">Versand & Lieferung</h2><table class="mini-table"><tbody>
    <tr><th scope="row">Deutschland</th><td>4,90 € · ab 80 € kostenlos</td></tr><tr><th scope="row">Express (DE)</th><td>9,90 € · 1–2 Werktage</td></tr><tr><th scope="row">Österreich</th><td>9,90 €</td></tr><tr><th scope="row">Schweiz</th><td>14,90 € zzgl. Einfuhrabgaben</td></tr></tbody></table><p class="muted">Lagernde Ware verlässt uns in 1–2 Werktagen, klimafreundlich und plastikfrei verpackt.</p></article>
  <article class="svc__card" id="rueckgabe"><span class="svc__ic">${icon('refresh')}</span><h2 class="h3">Rückgabe & Widerruf</h2><p>14 Tage gesetzliches Widerrufsrecht, dazu freiwillig 30 Tage Rückgabe für ungenutzte Artikel. Starte die Rückgabe im Kundenkonto oder über das Kontaktformular – das Rücksendeetikett kommt per E-Mail.</p><a class="link-arrow" href="#recht-widerruf">Widerrufsbelehrung & Formular ${icon('arrow')}</a></article>
  <article class="svc__card" id="zahlung"><span class="svc__ic">${icon('shield')}</span><h2 class="h3">Zahlungsarten</h2><ul class="paylist">${['Kredit- & Debitkarte', 'Apple Pay', 'Google Pay', 'Klarna', 'SEPA-Lastschrift'].map(x => `<li>${icon('check')}${x}</li>`).join('')}</ul><p class="muted">Abgewickelt über Stripe (PCI-DSS Level 1). Kartendaten erreichen unseren Shop nie.</p></article>
  <article class="svc__card" id="pflege"><span class="svc__ic">${icon('drop')}</span><h2 class="h3">Pflegehinweise</h2><ul class="checklist">${['Lüften statt waschen – im Schatten', 'Kissen & Decken täglich aufschütteln', 'Bezüge im Wollprogramm bis 30 °C', 'Liegend trocknen, nie in den Trockner', 'Flecken sofort mit kaltem Wasser tupfen'].map(t => `<li>${icon('check')}<span>${t}</span></li>`).join('')}</ul></article>
</section>

<section class="svc-forms container">
  <article class="formcard" id="status" aria-labelledby="st-title">
    <p class="eyebrow">Bestellstatus</p><h2 class="h3" id="st-title">Wo ist mein Paket?</h2>
    <form data-form="status" novalidate>
      <div class="field"><label class="field__label" for="st-no">Bestellnummer</label><input id="st-no" name="no" required placeholder="BAZ-123456" pattern="[Bb][Aa][Zz]-[0-9]{6}" data-msg="Format: BAZ- gefolgt von 6 Ziffern, z. B. BAZ-123456."></div>
      <div class="field"><label class="field__label" for="st-mail">E-Mail-Adresse der Bestellung</label><input id="st-mail" name="email" type="email" required autocomplete="email"></div>
      <button class="btn btn--primary" type="submit">Status abfragen</button>
      <div class="status-out" data-status-out aria-live="polite"></div>
    </form>
  </article>
  <article class="formcard" id="kontakt" aria-labelledby="ct-title">
    <p class="eyebrow">Kontakt · Produktberatung · Reklamation</p><h2 class="h3" id="ct-title">Schreib uns.</h2>
    <form data-form="contact" novalidate>
      <div class="field-row"><div class="field"><label class="field__label" for="ct-name">Name</label><input id="ct-name" name="name" required autocomplete="name"></div>
      <div class="field"><label class="field__label" for="ct-mail">E-Mail</label><input id="ct-mail" name="email" type="email" required autocomplete="email"></div></div>
      <div class="field"><label class="field__label" for="ct-topic">Anliegen</label><div class="select select--field"><select id="ct-topic" name="topic" required><option value="">Bitte wählen</option><option>Produktberatung</option><option>Frage zur Bestellung</option><option>Rückgabe</option><option>Reklamation</option><option>Etwas anderes</option></select>${icon('chevron')}</div></div>
      <div class="field"><label class="field__label" for="ct-msg">Nachricht</label><textarea id="ct-msg" name="msg" rows="5" required minlength="10"></textarea></div>
      <div class="field"><label class="check"><input type="checkbox" required id="ct-dsgvo"><span>Ich stimme zu, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden (<a href="#recht-datenschutz">Datenschutz</a>).</span></label></div>
      <button class="btn btn--primary" type="submit">Nachricht senden</button>
      <p class="muted small">Erreichbar Mo–Fr 9–17 Uhr · E-Mail: [eure-adresse]@[domain].de · Telefon: [Nummer] – werden im Theme-Customizer gepflegt.</p>
    </form>
  </article>
</section>`;
    return {
      title: 'Service & Support · baz', html, pose: 'service',
      mount(root) {
        const q = $('#faq-q', root);
        q.addEventListener('input', () => {
          const v = q.value.trim().toLowerCase(); let n = 0;
          $$('[data-faq-item]', root).forEach(it => { const show = !v || it.dataset.text.includes(v); it.hidden = !show; if (show) n++; });
          $('[data-faq-empty]', root).hidden = n > 0;
          if (v && n) { const first = $('[data-faq-item]:not([hidden]) [data-acc]', root); if (first && first.getAttribute('aria-expanded') !== 'true') first.click(); }
        });
        $('[data-form="status"]', root).addEventListener('submit', e => {
          e.preventDefault(); const f = e.target; if (!B.validateForm(f)) return;
          const o = B.account.findOrder(f.no.value), out = $('[data-status-out]', root);
          out.innerHTML = o ? `<div class="alert alert--success">${icon('check')}<div><strong>${o.no} · ${o.status}</strong><p>Bestellt am ${new Date(o.date).toLocaleDateString('de-DE')} · ${o.items.length} Artikel · ${B.money(o.total)}. Versand in 1–2 Werktagen.</p></div></div>`
            : `<div class="alert alert--warning">${icon('alert')}<div><strong>Keine Bestellung gefunden</strong><p>Prüfe Nummer und E-Mail-Adresse. In der Demo findest du nur Bestellungen, die du hier im Checkout aufgegeben hast.</p></div></div>`;
        });
        $('[data-form="contact"]', root).addEventListener('submit', e => {
          e.preventDefault(); const f = e.target; if (!B.validateForm(f)) return;
          f.innerHTML = `<div class="alert alert--success">${icon('check')}<div><strong>Danke für deine Nachricht!</strong><p>Im Live-Shop geht deine Anfrage jetzt an unser Team (Antwort innerhalb eines Werktags). In dieser Demo wird nichts versendet.</p></div></div>`;
        });
      }
    };
  };

  /* =======================================================================
     KUNDENKONTO
     ======================================================================= */
  V.account = () => {
    const u = B.state.user;
    if (!u) {
      const html = `
<section class="auth container">
  <div class="auth__intro"><p class="eyebrow">Kundenkonto</p><h1 class="page-title" tabindex="-1">Schön,<br>dass du da bist.</h1><p class="lead">Bestellungen verfolgen, Rücksendungen starten, Adressen speichern – alles an einem Ort.</p><ul class="ticks">${['Bestellübersicht & Sendungsverfolgung', 'Rückgabe mit einem Klick', 'Schneller bezahlen beim nächsten Mal'].map(t => `<li>${icon('check')} ${t}</li>`).join('')}</ul></div>
  <div class="auth__card">
    <div class="tabs tabs--full" role="tablist" aria-label="Anmelden oder registrieren"><button class="tab" role="tab" id="t-login" aria-selected="true" aria-controls="p-login" type="button">Anmelden</button><button class="tab" role="tab" id="t-reg" aria-selected="false" aria-controls="p-reg" type="button">Registrieren</button></div>
    <form class="auth__form" id="p-login" role="tabpanel" aria-labelledby="t-login" data-form="login" novalidate>
      <div class="field"><label class="field__label" for="li-mail">E-Mail-Adresse</label><input id="li-mail" type="email" name="email" required autocomplete="email"></div>
      <div class="field"><label class="field__label" for="li-pw">Passwort</label><input id="li-pw" type="password" name="pw" required minlength="8" autocomplete="current-password"></div>
      <div class="auth__row"><label class="check"><input type="checkbox"><span>Angemeldet bleiben</span></label><button class="linklike" type="button" data-action="toast-demo" data-msg="Im Live-Shop erhältst du hier einen Link zum Zurücksetzen (WooCommerce „Passwort vergessen“).">Passwort vergessen?</button></div>
      <button class="btn btn--primary btn--block btn--lg" type="submit">Anmelden</button>
      <p class="muted small">Demo: Jede gültige E-Mail und ein Passwort mit mind. 8 Zeichen funktionieren.</p>
    </form>
    <form class="auth__form" id="p-reg" role="tabpanel" aria-labelledby="t-reg" data-form="register" novalidate hidden>
      <div class="field"><label class="field__label" for="rg-name">Vorname</label><input id="rg-name" name="name" required autocomplete="given-name"></div>
      <div class="field"><label class="field__label" for="rg-mail">E-Mail-Adresse</label><input id="rg-mail" type="email" name="email" required autocomplete="email"></div>
      <div class="field"><label class="field__label" for="rg-pw">Passwort <small>(mind. 8 Zeichen)</small></label><input id="rg-pw" type="password" name="pw" required minlength="8" autocomplete="new-password"></div>
      <div class="field"><label class="field__label" for="rg-pw2">Passwort wiederholen</label><input id="rg-pw2" type="password" required data-match="rg-pw" autocomplete="new-password"></div>
      <div class="field"><label class="check"><input type="checkbox" required><span>Ich akzeptiere die <a href="#recht-agb">AGB</a> und habe die <a href="#recht-datenschutz">Datenschutzhinweise</a> gelesen.</span></label></div>
      <button class="btn btn--primary btn--block btn--lg" type="submit">Konto erstellen</button>
    </form>
  </div>
</section>`;
      return {
        title: 'Anmelden · baz', html, pose: 'konto',
        mount(root) {
          const tabs = $$('[role="tab"]', root);
          tabs.forEach(t => t.addEventListener('click', () => { tabs.forEach(x => { x.setAttribute('aria-selected', x === t); document.getElementById(x.getAttribute('aria-controls')).hidden = x !== t; }); }));
          $('[data-form="login"]', root).addEventListener('submit', e => { e.preventDefault(); if (!B.validateForm(e.target)) return; B.account.login(e.target.email.value); B.toast({ title: 'Willkommen zurück!' }); B.rerender(); });
          $('[data-form="register"]', root).addEventListener('submit', e => { e.preventDefault(); if (!B.validateForm(e.target)) return; B.account.login(e.target.email.value, e.target.name.value); B.toast({ title: 'Konto erstellt', text: 'Schön, dass du dabei bist.' }); B.rerender(); });
        }
      };
    }
    const orders = B.state.orders, a = B.state.lastAddress;
    const html = `
<section class="dash container">
  <div class="dash__head"><p class="eyebrow">Mein Konto</p><h1 class="page-title" tabindex="-1">Hallo, ${esc(u.name)}.</h1></div>
  <div class="dash__grid">
    <nav class="dash__nav" aria-label="Kontobereiche"><ul>${[['uebersicht', 'Übersicht'], ['bestellungen', 'Bestellungen'], ['adressen', 'Adressen'], ['einstellungen', 'Kontoeinstellungen']].map(([id, l]) => `<li><a href="#konto-${id}">${l}</a></li>`).join('')}<li><button class="linklike" type="button" data-action="logout">Abmelden</button></li></ul></nav>
    <div class="dash__main">
      <div class="dash__stats" id="uebersicht">${[['Bestellungen', orders.length], ['Merkliste', B.state.wish.length], ['Im Warenkorb', B.cart.count()]].map(([l, n]) => `<div class="stat"><strong>${n}</strong><span>${l}</span></div>`).join('')}</div>
      <section class="dash__card" id="bestellungen"><h2 class="h3">Bestellungen</h2>
        ${orders.length ? `<div class="orders" data-acc-group="single">${orders.map(o => B.acc(`<span class="order__no">${o.no}</span><span class="order__meta">${new Date(o.date).toLocaleDateString('de-DE')} · ${B.money(o.total)}</span><span class="pill pill--info">${o.status}</span>`, `<ul class="order__items">${o.items.map(i => `<li><span>${i.qty} × ${esc(i.name)} <small>${esc(i.variant)}</small></span><strong>${B.money(i.total)}</strong></li>`).join('')}</ul><p class="muted">Lieferung an ${esc(o.address.first)} ${esc(o.address.last)}, ${esc(o.address.city)} · Zahlung: ${esc(o.payment)}</p><button class="btn btn--ghost btn--sm" type="button" data-action="toast-demo" data-msg="Im Live-Shop startest du hier die Rücksendung und erhältst ein Etikett per E-Mail.">Rücksendung starten</button>`)).join('')}</div>`
        : `<div class="empty empty--sm"><p>Noch keine Bestellungen. Zeit für etwas Weiches?</p><a class="btn btn--primary" href="#shop">Zum Shop</a></div>`}
      </section>
      <section class="dash__card" id="adressen"><h2 class="h3">Adressen</h2>${a ? `<address class="addr">${esc(a.first)} ${esc(a.last)}<br>${esc(a.street)}<br>${esc(a.zip)} ${esc(a.city)}<br>${esc(a.countryName)}</address>` : '<p class="muted">Noch keine Adresse gespeichert. Sie wird beim ersten Checkout übernommen.</p>'}</section>
      <section class="dash__card" id="einstellungen"><h2 class="h3">Kontoeinstellungen</h2><form class="dash__form" data-form="settings" novalidate><div class="field-row"><div class="field"><label class="field__label" for="s-name">Vorname</label><input id="s-name" name="name" value="${esc(u.name)}" required></div><div class="field"><label class="field__label" for="s-mail">E-Mail</label><input id="s-mail" name="email" type="email" value="${esc(u.email)}" required></div></div><label class="switch"><input type="checkbox" role="switch"><span class="switch__ui" aria-hidden="true"></span><span>Newsletter abonnieren</span></label><button class="btn btn--primary" type="submit">Speichern</button></form></section>
    </div>
  </div>
</section>`;
    return {
      title: 'Mein Konto · baz', html, pose: 'konto',
      mount(root) {
        $('[data-form="settings"]', root).addEventListener('submit', e => { e.preventDefault(); if (!B.validateForm(e.target)) return; B.account.login(e.target.email.value, e.target.name.value); B.toast({ title: 'Gespeichert', text: 'Deine Angaben wurden aktualisiert.' }); });
      }
    };
  };

  /* =======================================================================
     RECHTLICHE SEITEN (Struktur + benötigte Angaben)
     ======================================================================= */
  V.legal = id => {
    const l = B.LEGAL.find(x => x.id === id);
    if (!l) return V.notFound();
    const form = id === 'widerruf' ? `<article class="formcard"><h2 class="h3">Widerrufsformular</h2><form data-form="withdraw" novalidate>
  <div class="field-row"><div class="field"><label class="field__label" for="wd-no">Bestellnummer</label><input id="wd-no" required></div><div class="field"><label class="field__label" for="wd-date">Bestellt am</label><input id="wd-date" type="date" required></div></div>
  <div class="field"><label class="field__label" for="wd-name">Name</label><input id="wd-name" required autocomplete="name"></div>
  <div class="field"><label class="field__label" for="wd-items">Widerrufene Artikel</label><textarea id="wd-items" rows="3" required></textarea></div>
  <button class="btn btn--primary" type="submit">Widerruf absenden</button></form></article>` : '';
    const html = `<section class="phead container legal">
  <nav class="crumbs" aria-label="Brotkrumen"><ol><li><a href="#start">Start</a></li><li>Rechtliches</li><li aria-current="page">${l.name}</li></ol></nav>
  <h1 class="page-title" tabindex="-1">${l.name}</h1>
  <div class="alert alert--info">${icon('info')}<div><strong>Inhalt folgt durch den Betreiber</strong><p>Rechtstexte werden nicht generiert, sondern vom Betreiber bereitgestellt – idealerweise über einen Rechtstexte-Dienst mit Update-Schnittstelle. Für diese Seite werden folgende Angaben benötigt:</p></div></div>
  <ul class="checklist">${l.needs.map(n => `<li>${icon('check')}<span>${n}</span></li>`).join('')}</ul>
  ${form}
</section>`;
    return {
      title: l.name + ' · baz', html, pose: 'legal',
      mount(root) { const f = $('[data-form="withdraw"]', root); if (f) f.addEventListener('submit', e => { e.preventDefault(); if (!B.validateForm(f)) return; f.innerHTML = `<div class="alert alert--success">${icon('check')}<div><strong>Widerruf erfasst (Demo)</strong><p>Im Live-Shop erhältst du jetzt eine Eingangsbestätigung per E-Mail.</p></div></div>`; }); }
    };
  };

  V.notFound = () => ({
    title: 'Seite nicht gefunden · baz', pose: 'legal',
    html: `<section class="nf container"><p class="nf__mega" aria-hidden="true">4${B.sun({ anim: true, cls: 'nf__burst' })}4</p><h1 class="h2" tabindex="-1">Diese Seite hat sich ins Bett verkrochen.</h1><p class="lead">Vielleicht findest du, was du suchst, im Shop – oder frag unseren Service-Assistenten.</p><div class="btn-row"><a class="btn btn--primary" href="#shop">Zum Shop</a><a class="btn btn--text" href="#start">Zur Startseite</a></div></section>`
  });
})(window.BAZ = window.BAZ || {});
