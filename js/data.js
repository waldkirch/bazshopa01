/* ==========================================================================
   baz · data.js
   Katalog, Kategorien, Service-Wissen.
   HINWEIS: Alle Preise, Bestände und Herkunftsangaben sind Demo-Inhalte und
   werden im WordPress-Theme durch WooCommerce-Produktdaten ersetzt.
   ========================================================================== */
(function (B) {
  'use strict';

  /* Stofftöne für Illustrationen & Farbvarianten */
  B.FABRICS = {
    natur:    { name: 'Natur',    base: '#F3ECDF', shade: '#D8CAB3', deep: '#B9A88C' },
    creme:    { name: 'Creme',    base: '#FBF7EF', shade: '#E6DCCB', deep: '#C9BCA6' },
    sand:     { name: 'Sand',     base: '#E5D3B8', shade: '#C7AF8B', deep: '#A68D68' },
    zimt:     { name: 'Zimt',     base: '#C98B5E', shade: '#A1653C', deep: '#7C4825' },
    schiefer: { name: 'Schiefer', base: '#ABA59D', shade: '#86807A', deep: '#625D56' },
    sonne:    { name: 'Sonne',    base: '#FFDA4D', shade: '#EDBD24', deep: '#C99A0E' }
  };

  B.CATEGORIES = [
    { id: 'bettwaesche',   name: 'Bettwäsche',          claim: 'Alpaka & Bio-Leinen. Atmet mit dir.',          art: 'bedding', fabric: 'sand' },
    { id: 'kissen',        name: 'Kissen',              claim: 'Von Hand gefüllt. Ein Leben lang anpassbar.',  art: 'pillow',  fabric: 'natur' },
    { id: 'kissenbezuege', name: 'Kissenbezüge',        claim: 'Strick, Stickerei, Struktur.',                 art: 'cushion', fabric: 'creme' },
    { id: 'bettdecken',    name: 'Bettdecken & Topper', claim: 'Drei Wärmeklassen. Null Kunstfaser.',          art: 'duvet',   fabric: 'natur' },
    { id: 'wohnen',        name: 'Wohnaccessoires',     claim: 'Weiches für den Tag dazwischen.',              art: 'throw',   fabric: 'schiefer' }
  ];

  B.BADGES = {
    best:     { label: 'Bestseller',      cls: 'badge--best' },
    new:      { label: 'Neu',             cls: 'badge--new' },
    sale:     { label: 'Angebot',         cls: 'badge--sale' },
    limited:  { label: 'Limitiert',       cls: 'badge--limited' },
    handmade: { label: 'Handgefertigt',   cls: 'badge--hand' }
  };

  B.PRODUCTS = [
    {
      id: 'wolke', name: 'Wolke', type: 'Kopfkissen', cat: 'kissen', art: 'pillow',
      fabrics: ['natur', 'creme'],
      sizes: [{ label: '40 × 80 cm', price: 129, square: false }, { label: '80 × 80 cm', price: 159, square: true }],
      badges: ['best'], stock: 24, added: 3,
      short: 'Das Kopfkissen, das sich deinem Schlaf anpasst – Füllmenge per Reißverschluss regulierbar.',
      story: 'Wolke ist mit loser, gekämmter Alpakawolle gefüllt. Sie bleibt luftig, gleicht Temperatur aus und lässt sich aufschütteln wie am ersten Tag. Über den verdeckten Reißverschluss nimmst du Füllung heraus oder gibst sie wieder hinzu – bis es sich genau richtig anfühlt.',
      material: 'Füllung: 100 % Alpakawolle, gekämmt · Bezug: Bio-Baumwoll-Satin · verdeckter Reißverschluss',
      care: 'Regelmäßig aufschütteln und an der frischen Luft auslüften, nicht in praller Sonne. Wolle reinigt sich weitgehend selbst – gewaschen wird nur bei Bedarf im Wollprogramm bis 30 °C.',
      highlights: [['Temperatur', 'gleicht aus statt zu stauen'], ['Lanolinfrei', 'Alpakavlies enthält kein Wollfett'], ['Anpassbar', 'Füllung per Reißverschluss']],
      weight: 'ca. 900 g (40 × 80)'
    },
    {
      id: 'huettenruh', name: 'Hüttenruh', type: 'Bettdecke', cat: 'bettdecken', art: 'duvet',
      fabrics: ['natur'],
      sizes: [{ label: '135 × 200 cm', price: 349 }, { label: '155 × 220 cm', price: 429 }, { label: '200 × 200 cm', price: 529 }],
      option: { label: 'Wärmeklasse', values: [
        { label: 'Sommer', note: 'leicht, für warme Schläfer', delta: -60 },
        { label: 'Ganzjahr', note: 'unser Allrounder', delta: 0 },
        { label: 'Winter', note: 'für alle, die schnell frieren', delta: 60 }
      ], def: 1 },
      badges: ['best', 'handmade'], stock: 8, added: 5,
      short: 'Leicht wie ein Atemzug, warm wie eine Hütte im Schnee – in drei Wärmeklassen.',
      story: 'In Kassetten abgesteppt, damit die Wolle bleibt, wo sie wärmen soll. Alpakafasern sind teilweise hohl: Sie speichern Luft, wärmen ohne Gewicht und leiten Feuchtigkeit nach außen. So entsteht ein Schlafklima ohne Hitzestau und ohne Frösteln.',
      material: 'Füllung: 100 % Alpakawolle · Hülle: Bio-Baumwoll-Batist · Kassetten-Steppung',
      care: 'Täglich aufschütteln, regelmäßig auslüften. Flecken punktuell mit Wollwaschmittel behandeln. Reinigung durch einen Fachbetrieb empfohlen.',
      highlights: [['3 Wärmeklassen', 'Sommer, Ganzjahr, Winter'], ['Kassetten', 'Füllung verrutscht nicht'], ['Atmungsaktiv', 'kein Hitzestau']],
      weight: 'ca. 1.250 g (Ganzjahr, 135 × 200)'
    },
    {
      id: 'morgentau', name: 'Morgentau', type: 'Bettwäsche-Set', cat: 'bettwaesche', art: 'bedding',
      fabrics: ['natur', 'sand', 'zimt'],
      sizes: [{ label: '135 × 200 + 80 × 80 cm', price: 219 }, { label: '155 × 220 + 80 × 80 cm', price: 259 }],
      badges: ['new'], stock: 15, added: 10,
      short: 'Bettwäsche aus Alpaka und Bio-Leinen – kühl im Sommer, kuschelig im Winter.',
      story: 'Leinen bringt Struktur und Frische, Alpaka die Weichheit. Zusammen entsteht ein Gewebe, das mit jeder Wäsche geschmeidiger wird und dabei seine natürliche, leicht unregelmäßige Oberfläche behält. Geschlossen wird mit Knöpfen aus Steinnuss.',
      material: '30 % Alpaka, 70 % Bio-Leinen · Knopfleiste mit Steinnussknöpfen',
      care: 'Wollprogramm 30 °C, mildes Waschmittel, liegend trocknen. Wird mit jeder Wäsche weicher.',
      highlights: [['Mischgewebe', 'Alpaka trifft Bio-Leinen'], ['Ganzjährig', 'temperaturausgleichend'], ['Steinnuss', 'Knöpfe statt Plastik']],
      weight: 'ca. 1.400 g (Set 135 × 200)'
    },
    {
      id: 'masche', name: 'Masche', type: 'Kissenbezug Strick', cat: 'kissenbezuege', art: 'cushion', pattern: 'knit',
      fabrics: ['creme', 'sand', 'schiefer'],
      sizes: [{ label: '40 × 40 cm', price: 59 }, { label: '50 × 50 cm', price: 69 }],
      badges: ['sale'], sale: 20, stock: 30, added: 2,
      short: 'Grob gestrickt, wunderbar griffig – der Bezug, der jedes Sofa weicher macht.',
      story: 'Masche wird aus dickem Alpakagarn im Rippenmuster gestrickt. Die Rückseite schließt mit einer Holzknopfleiste, damit du das Inlett jederzeit herausnehmen kannst.',
      material: '100 % Alpakawolle, grob gestrickt · Rückseite mit Knopfleiste · ohne Inlett',
      care: 'Handwäsche kalt, nicht wringen, liegend trocknen.',
      highlights: [['Rippenstrick', 'aus dickem Garn'], ['Knopfleiste', 'Inlett herausnehmbar'], ['Pilling-arm', 'langes, glattes Haar']],
      weight: 'ca. 320 g (50 × 50)'
    },
    {
      id: 'sonne', name: 'Sonne', type: 'Zierkissen mit Stickerei', cat: 'kissenbezuege', art: 'cushion', pattern: 'boucle', emblem: true,
      fabrics: ['sonne', 'creme'],
      sizes: [{ label: '45 × 45 cm', price: 89 }],
      badges: ['new', 'handmade'], stock: 18, added: 12,
      short: 'Unsere Bildmarke als Stickerei auf Alpaka-Bouclé. Gute Laune, die bleibt.',
      story: 'Die baz-Sonne wird mit Alpakagarn von Hand auf den Bouclé-Bezug gestickt – jedes Kissen ein klein wenig anders. Inklusive Inlett mit Alpakafüllung.',
      material: 'Bezug: 100 % Alpaka-Bouclé · Stickerei: Alpakagarn · Inlett: Bio-Baumwolle mit Alpakafüllung',
      care: 'Bezug: Handwäsche kalt, liegend trocknen. Inlett regelmäßig auslüften.',
      highlights: [['Handgestickt', 'jedes Stück ein Unikat'], ['Bouclé', 'lebendige Oberfläche'], ['Inklusive', 'Inlett mit Alpakafüllung']],
      weight: 'ca. 650 g'
    },
    {
      id: 'sonntag', name: 'Sonntag', type: 'Wohndecke', cat: 'wohnen', art: 'throw',
      fabrics: ['sand', 'schiefer', 'zimt'],
      sizes: [{ label: '130 × 180 cm', price: 229 }],
      badges: ['limited'], stock: 3, added: 8,
      short: 'Für Sofa-Sonntage und kühle Abende. Auf traditionellen Webstühlen gewebt.',
      story: 'Sonntag ist aus feinem Baby-Alpaka gewebt und so leicht, dass sie sich fast schwebend über die Schultern legt. Abgeschlossen mit einem handgeknoteten Fransenrand. Erscheint in limitierter Auflage pro Farbe.',
      material: '100 % Baby-Alpaka · handgeknotete Fransen',
      care: 'Auslüften statt waschen. Bei Bedarf Handwäsche kalt, liegend trocknen.',
      highlights: [['Baby-Alpaka', 'besonders feines Haar'], ['Gewebt', 'auf traditionellen Webstühlen'], ['Limitiert', 'kleine Auflage pro Farbe']],
      weight: 'ca. 700 g'
    },
    {
      id: 'ruhepol', name: 'Ruhepol', type: 'Nackenrolle', cat: 'kissen', art: 'roll',
      fabrics: ['natur', 'sand'],
      sizes: [{ label: '15 × 40 cm', price: 89 }],
      badges: [], stock: 0, added: 1,
      short: 'Stützt sanft im Nacken – zum Lesen, Liegen oder als Seitenschläfer-Hilfe.',
      story: 'Ruhepol ist fest mit Alpakawolle gestopft und an den Enden von Hand gerafft. Perfekt fürs Lesen im Bett oder als Stütze auf dem Sofa.',
      material: 'Füllung: 100 % Alpakawolle · Bezug: Bio-Leinen · geraffte Enden',
      care: 'Auslüften, Bezug bei 30 °C im Wollprogramm waschbar.',
      highlights: [['Formstabil', 'fest gestopft'], ['Vielseitig', 'Bett & Sofa'], ['Leinen', 'kühle Oberfläche']],
      weight: 'ca. 550 g'
    },
    {
      id: 'unterwolke', name: 'Unterwolke', type: 'Matratzen-Topper', cat: 'bettdecken', art: 'topper',
      fabrics: ['natur'],
      sizes: [{ label: '90 × 200 cm', price: 249 }, { label: '140 × 200 cm', price: 329 }, { label: '180 × 200 cm', price: 399 }],
      badges: [], stock: 12, added: 4,
      short: 'Die weiche Schicht zwischen dir und der Matratze. Regulierend, atmungsaktiv, natürlich.',
      story: 'Der Topper verbessert das Schlafklima jeder Matratze: Die Alpakafüllung nimmt Feuchtigkeit auf, gibt sie wieder ab und polstert sanft. Mit Eckgummis bleibt er an seinem Platz.',
      material: 'Füllung: 100 % Alpakawolle · Bezug: Bio-Baumwolle · vier Eckgummis',
      care: 'Regelmäßig wenden und auslüften. Reinigung durch Fachbetrieb.',
      highlights: [['Schlafklima', 'feuchtigkeitsregulierend'], ['Eckgummis', 'verrutscht nicht'], ['Rollbar', 'leicht zu lüften']],
      weight: 'ca. 2.600 g (140 × 200)'
    },
    {
      id: 'insel', name: 'Insel', type: 'Sitzkissen', cat: 'wohnen', art: 'pouf',
      fabrics: ['sand', 'zimt', 'schiefer'],
      sizes: [{ label: 'Ø 45 cm', price: 119 }],
      badges: [], stock: 9, added: 6,
      short: 'Bodenkissen, Fußhocker, Lieblingsplatz. Mit Kern aus Naturkautschuk.',
      story: 'Insel kombiniert einen formstabilen Kern aus Naturkautschuk mit einer weichen Schicht Alpakawolle. Der Bouclé-Bezug ist abnehmbar und an der Unterseite mit einem Griff versehen.',
      material: 'Bezug: Alpaka-Bouclé · Füllung: Alpakawolle & Naturkautschuk-Kern',
      care: 'Bezug: Handwäsche kalt. Kern auslüften.',
      highlights: [['Formstabil', 'Kern aus Naturkautschuk'], ['Abnehmbar', 'Bezug mit Reißverschluss'], ['Tragegriff', 'an der Unterseite']],
      weight: 'ca. 2.100 g'
    },
    {
      id: 'halm', name: 'Halm', type: 'Spannbetttuch', cat: 'bettwaesche', art: 'sheet',
      fabrics: ['natur', 'sand'],
      sizes: [{ label: '90 × 200 cm', price: 89 }, { label: '140 × 200 cm', price: 109 }, { label: '180 × 200 cm', price: 129 }],
      badges: [], stock: 20, added: 7,
      short: 'Das Fundament für guten Schlaf: Alpaka-Leinen mit Rundum-Gummizug.',
      story: 'Halm passt sich Matratzen bis 25 cm Steghöhe an und bleibt dank Rundum-Gummizug glatt. Das Mischgewebe fühlt sich kühl und trocken an.',
      material: '25 % Alpaka, 75 % Bio-Leinen · Rundum-Gummizug · Steghöhe bis 25 cm',
      care: 'Wollprogramm 30 °C, liegend oder auf der Leine trocknen.',
      highlights: [['Steghöhe', 'bis 25 cm'], ['Gummizug', 'rundum'], ['Kühl', 'trockenes Liegegefühl']],
      weight: 'ca. 750 g (140 × 200)'
    }
  ];

  B.COUPONS = {
    SOFT10:       { type: 'pct', value: 10, label: '10 % Willkommensrabatt' },
    WILLKOMMEN15: { type: 'pct', value: 15, min: 150, label: '15 % ab 150 € Warenwert' },
    SOMMER24:     { expired: true }
  };

  B.SHIPPING = {
    freeFrom: 80,
    methods: [
      { id: 'standard', name: 'Standard · klimafreundlich', eta: '2–4 Werktage', price: 4.9 },
      { id: 'express',  name: 'Express', eta: '1–2 Werktage', price: 9.9 }
    ],
    countries: [
      { id: 'DE', name: 'Deutschland', extra: 0 },
      { id: 'AT', name: 'Österreich', extra: 5 },
      { id: 'CH', name: 'Schweiz', extra: 10, note: 'Zzgl. Einfuhrabgaben bei Zustellung.' }
    ]
  };

  B.FAQ = [
    { topic: 'material', q: 'Was macht Alpakawolle so besonders?', a: 'Alpakahaar ist fein, glatt und teilweise hohl. Dadurch speichert es Luft, wärmt bei geringem Gewicht und transportiert Feuchtigkeit nach außen. Es enthält kein Lanolin (Wollfett) und kratzt deshalb meist weniger als Schafwolle.' },
    { topic: 'material', q: 'Ist Alpaka für Allergiker geeignet?', a: 'Weil Alpakavlies kein Lanolin enthält, wird es von vielen Menschen mit Wollunverträglichkeit gut vertragen. Eine Garantie können wir nicht geben – bei bekannten Allergien sprich bitte vorher mit deiner Ärztin oder deinem Arzt.' },
    { topic: 'pflege', q: 'Wie pflege ich Kissen und Decken aus Alpaka?', a: 'Vor allem: lüften statt waschen. Wolle reinigt sich weitgehend selbst. Schüttle Kissen und Decken regelmäßig auf und lüfte sie im Schatten. Bezüge und Bettwäsche wäschst du im Wollprogramm bei maximal 30 °C.' },
    { topic: 'groessen', q: 'Welche Kissengröße passt zu mir?', a: 'Seitenschläfer greifen meist zu 40 × 80 cm, Rückenschläfer zu 80 × 80 cm. Bei Wolke kannst du die Füllmenge über den Reißverschluss anpassen – so wird jede Größe zu deiner.' },
    { topic: 'versand', q: 'Wie lange dauert der Versand?', a: 'Lagernde Artikel verschicken wir innerhalb von 1–2 Werktagen. Standard-Lieferungen innerhalb Deutschlands dauern 2–4 Werktage, Express 1–2 Werktage.' },
    { topic: 'versand', q: 'Was kostet der Versand?', a: 'Innerhalb Deutschlands versenden wir ab 80 € Warenwert kostenlos, darunter berechnen wir 4,90 €. Nach Österreich und in die Schweiz gelten eigene Pauschalen, die dir im Checkout angezeigt werden.' },
    { topic: 'rueckgabe', q: 'Kann ich Produkte zurückgeben?', a: 'Ja. Du hast ein 14-tägiges gesetzliches Widerrufsrecht. Ungenutzte Artikel nehmen wir zusätzlich freiwillig innerhalb von 30 Tagen zurück. Starte die Rückgabe einfach über dein Kundenkonto oder das Kontaktformular.' },
    { topic: 'zahlung', q: 'Welche Zahlungsarten bietet ihr an?', a: 'Kredit- und Debitkarte, Apple Pay, Google Pay, Klarna und SEPA-Lastschrift. Die Zahlung wird sicher über Stripe abgewickelt – deine Kartendaten erreichen unseren Shop nie.' },
    { topic: 'bestellung', q: 'Wo finde ich meinen Bestellstatus?', a: 'Im Kundenkonto unter „Bestellungen“ oder ohne Konto mit Bestellnummer und E-Mail-Adresse im Service-Bereich. Unser Service-Assistent hilft dir ebenfalls.' },
    { topic: 'reklamation', q: 'Mein Produkt hat einen Mangel. Was nun?', a: 'Das tut uns leid! Schreib uns über das Kontaktformular mit Bestellnummer und einem Foto. Wir kümmern uns innerhalb von zwei Werktagen – oft reparieren wir statt zu ersetzen.' }
  ];

  /* Beispiel-Bewertungen: Struktur für WooCommerce-Reviews (klar als Demo gekennzeichnet) */
  B.SAMPLE_REVIEWS = [
    { title: 'Beispiel · Seitenschläfer', text: 'So oder ähnlich erscheinen hier später echte, verifizierte Kundenbewertungen aus WooCommerce – mit Sternen, Datum und Variante.' },
    { title: 'Beispiel · Wärmeklasse', text: 'Bewertungen lassen sich nach Variante filtern, z. B. „Ganzjahr“ oder „Winter“. Das hilft bei der Auswahl der passenden Decke.' },
    { title: 'Beispiel · Pflege', text: 'Kundinnen und Kunden können Fotos hochladen. Shop-Antworten werden direkt unter der Bewertung angezeigt.' }
  ];
})(window.BAZ = window.BAZ || {});
