/* ==========================================================================
   baz · art.js
   Logo, Bildmarke, Icons und illustrative Produktdarstellungen (SVG).
   Die Produktbilder sind bewusst Illustrationen – keine Fotos realer Produkte.
   Im Theme werden sie durch echte Produktfotografie (WebP/AVIF) ersetzt.
   ========================================================================== */
(function (B) {
  'use strict';

  /* ---------- Logo (neues Corporate Design b02) ----------
     Geometrie aus „baz-CD-Logo-b02-WortBildmarkeZusatz-11.svg“ (Hauptlogo braun-blau).
     Alle Farbversionen nutzen dieselbe Geometrie: Bildmarke · Wortmarke · Zusatz „soft happenz“. */
  const BURST = "M149.17,63.61c-.63,0-1.26.06-1.9.19l-8.02,1.58,18.75-19.06c4.63-4.71,4.57-12.28-.14-16.91-2.33-2.29-5.36-3.43-8.39-3.43s-6.19,1.19-8.53,3.57l-36.91,37.53-1.85-.61-2.78-56.14c-.29-5.81-5.09-10.34-10.85-10.34-.18,0-.36,0-.55.01-6,.3-10.62,5.4-10.32,11.4l1.79,36.25-13.48-18.91c-3.18-4.47-8.2-6.85-13.3-6.85-3.27,0-6.58.98-9.45,3.03-6.6,4.7-8.62,13.4-5.17,20.45l-19.52-6.42c-1.47-.48-2.96-.71-4.42-.71-5.94,0-11.47,3.77-13.43,9.72-2.44,7.42,1.59,15.41,9.01,17.84l47.67,15.68-33.48,6.59c-5.3,1.04-8.76,6.19-7.71,11.49,1.04,5.3,6.18,8.76,11.49,7.71l45.61-8.98-26.03,26.46c-4.63,4.71-4.57,12.28.14,16.91,4.71,4.63,12.28,4.57,16.91-.14l18.83-19.15,1.5,30.37c.3,6,5.38,10.64,11.4,10.32,6-.3,10.62-5.4,10.32-11.4l-.54-10.82,11.1,15.58c5.23,7.34,15.41,9.04,22.75,3.82,7.34-5.23,9.04-15.41,3.82-22.75l-14.84-20.82c5.03-3.38,9.48-8.15,10.74-11.99,1.44-4.36,4.22-13.26,4.77-20.35l6.87-1.35c5.3-1.04,8.76-6.19,7.71-11.49-.92-4.67-5.01-7.9-9.59-7.9Z";
  const LETTERS = ["M150.47,55.44c-4.28-1.92-10.62-2.13-15.2-.85-7.08,2.34-12.2,6.62-16.72,12.71.8-6.54,3.72-21.08,1.91-32.56-1.76-11.12-6.05-16.42-13.01-16.4-11.51.03-13.42,9.61-14.17,14.59-1.66,10.95-6.1,68.6-1.57,90.65,3.81,18.52,12.38,27.58,27.55,26.55,17.15-1.16,26.91-12.09,35.46-25.52,7.22-11.35,9.5-27.89,10.22-35.31,1.35-13.88-1.18-27.91-14.47-33.86ZM139.77,97.29c-2.37,6.53-7.87,19.4-16.74,20.96-10.19,1.79-6.76-14.51-4.1-20.8,2.68-6.34,8.9-13.93,15.84-14.84,2.26-.29,4.4.67,5.39,2.73,1.64,3.41.93,8.31-.39,11.95Z", "M246.98,107.53c-1.47-18.29-3.76-55.03-34.73-53.74-17.95.75-28.64,9.81-34.89,19.19-7.44,11.15-11.74,23.65-11.99,37.11-.2,10.73,2.42,22.39,9.56,30.48,1.77,2,9.44,8.08,16.87,9.38,8.53,1.49,15.07-.1,19.51-2.56,9.84-5.44,11.37-15.05,11.37-15.05.28,9.15,4.02,17.48,12.76,17.86,14.07.63,13.01-24.38,11.54-42.67ZM217.79,99.13c-2.45,6.76-8.15,20.08-17.33,21.69-10.54,1.85-7-15.01-4.24-21.53,2.78-6.56,9.21-14.42,16.39-15.35,2.34-.31,4.55.7,5.58,2.83,1.7,3.53.96,8.6-.41,12.37Z", "M262.11,147.38c-17.07-6.16-11.14-24.09-7.75-30.27,2.53-4.62,9.92-14.4,14.03-19.07,4.69-5.33,7.67-9.1,4.78-11.89-3.23-3.13-7.83-.29-15.47-.61-11.76-.49-15.07-17.17-3.77-24.95,5.1-3.51,12.93-6.44,22.21-7.41,13.49-1.41,27.21.98,33.15,5.98,5.48,4.61,6.68,12.59,4.54,19.33-3.44,10.82-22.17,30.85-21.83,38.66.25,5.79,6.83,3.89,15.64,2.72,13.83-1.83,18.81,7.98,16.66,15.18-2.03,6.77-9.26,11.48-15.72,12.99-7.97,1.86-31.05,4.9-46.45-.67Z"];
  const TAG = ["M101.46,181.01c-.78-.33-1.8-.66-3.04-1-.95-.26-1.69-.5-2.23-.71-.48-.19-.88-.45-1.19-.76-.27-.27-.4-.6-.4-1.03,0-.54.22-.96.69-1.3.51-.37,1.22-.56,2.12-.56.97,0,1.75.23,2.3.69.55.45.84,1.04.89,1.79l.03.47h3.81l-.03-.52c-.09-1.79-.78-3.23-2.04-4.27-1.24-1.02-2.88-1.54-4.87-1.54-1.28,0-2.45.23-3.46.68-1.03.46-1.84,1.09-2.4,1.89-.58.81-.87,1.71-.87,2.68,0,1.21.33,2.21.97,2.97.62.73,1.37,1.29,2.23,1.65.81.35,1.88.7,3.16,1.03,1.34.34,2.33.68,2.95,1.02.5.27.73.66.73,1.22s-.24,1.02-.73,1.4c-.53.4-1.28.61-2.24.61-1.04,0-1.88-.24-2.5-.71-.6-.45-.93-1.02-1-1.73l-.04-.45h-3.9l.03.53c.07,1.13.43,2.14,1.09,3.02.65.86,1.54,1.54,2.65,2.02,1.09.47,2.34.71,3.7.71,1.28,0,2.44-.23,3.44-.68,1.02-.46,1.82-1.11,2.39-1.92.57-.82.86-1.77.86-2.81-.02-1.15-.35-2.1-.97-2.83-.6-.7-1.32-1.23-2.15-1.58Z", "M123.07,173.41c-1.37-.75-2.92-1.13-4.61-1.13s-3.24.38-4.61,1.13c-1.38.76-2.48,1.85-3.28,3.26-.79,1.4-1.2,3.03-1.2,4.85s.39,3.48,1.16,4.88c.78,1.41,1.86,2.51,3.23,3.28,1.36.76,2.9,1.15,4.57,1.15s3.25-.39,4.64-1.15c1.4-.76,2.52-1.87,3.34-3.27.82-1.4,1.23-3.05,1.23-4.89s-.4-3.47-1.2-4.87c-.8-1.4-1.9-2.49-3.28-3.24ZM123.66,181.52c0,1.27-.25,2.35-.75,3.22-.5.86-1.16,1.52-1.96,1.95-1.62.87-3.63.86-5.17.02-.76-.42-1.37-1.06-1.83-1.92-.47-.87-.7-1.97-.7-3.27s.24-2.36.71-3.23c.47-.86,1.09-1.51,1.86-1.92.78-.42,1.65-.64,2.6-.64s1.79.21,2.59.64c.78.42,1.42,1.07,1.91,1.93.49.87.74,1.96.74,3.23Z", "M137.38,171.85c0-.97.2-1.66.6-2.04.41-.39,1.17-.59,2.27-.59h.5v-3.36h-.5c-2.29,0-3.99.49-5.06,1.44-1.09.97-1.64,2.5-1.64,4.54v.71h-2.2v3.33h2.2v14.66h3.82v-14.66h3.56v-3.33h-3.56v-.71Z", "M151.23,168.28h-3.82v4.28h-2.2v3.33h2.2v9.51c0,1.79.45,3.11,1.34,3.93.88.81,2.18,1.22,3.87,1.22h3.04v-3.39h-2.58c-.72,0-1.23-.13-1.48-.37-.25-.24-.38-.72-.38-1.39v-9.51h4.43v-3.33h-4.43v-4.28Z", "M185.5,173.13h0c-1.1-.58-2.35-.88-3.71-.88s-2.48.26-3.52.76c-.6.29-1.13.65-1.59,1.09v-7.49h-3.82v23.94h3.82v-9.89c0-1.64.4-2.89,1.18-3.72.79-.83,1.83-1.24,3.19-1.24s2.35.39,3.11,1.19c.75.8,1.14,1.99,1.14,3.55v10.11h3.79v-10.51c0-1.65-.32-3.07-.94-4.24-.63-1.18-1.52-2.08-2.64-2.67Z", "M208.97,174.64c-.47-.5-1.04-.95-1.7-1.33-1.17-.68-2.56-1.03-4.13-1.03s-3.06.39-4.36,1.15c-1.3.77-2.34,1.86-3.08,3.25h0c-.74,1.38-1.11,3-1.11,4.81s.37,3.41,1.11,4.82c.74,1.42,1.77,2.54,3.07,3.33,1.29.79,2.76,1.19,4.35,1.19s2.93-.35,4.11-1.05c.67-.4,1.25-.86,1.74-1.38v2.14h3.85v-17.99h-3.85v2.08ZM208.26,178.41c.47.87.71,1.92.71,3.11s-.24,2.25-.71,3.13c-.47.87-1.11,1.55-1.9,2-1.59.92-3.71.92-5.28,0-.78-.46-1.42-1.13-1.89-2.01-.48-.88-.72-1.94-.72-3.16s.24-2.24.71-3.11c.47-.86,1.1-1.53,1.88-1.97.79-.45,1.67-.68,2.63-.68s1.85.23,2.65.69c.79.46,1.43,1.13,1.9,1.99Z", "M233.55,173.43c-1.3-.77-2.77-1.15-4.36-1.15s-2.94.35-4.11,1.05c-.67.4-1.25.85-1.74,1.37v-2.13h-3.82v26.05h3.82v-10.21c.5.52,1.09.99,1.77,1.39,1.18.69,2.55,1.05,4.08,1.05s3.06-.4,4.37-1.19c1.3-.79,2.34-1.91,3.08-3.33.74-1.41,1.11-3.03,1.11-4.82s-.37-3.43-1.11-4.81c-.74-1.39-1.78-2.48-3.09-3.25ZM233.86,181.49c0,1.21-.24,2.28-.72,3.16-.47.87-1.11,1.55-1.9,2-1.58.91-3.66.93-5.27,0-.79-.46-1.44-1.13-1.92-2.01-.48-.88-.73-1.93-.73-3.12s.24-2.21.73-3.09c.48-.87,1.13-1.55,1.92-2.01.8-.46,1.68-.69,2.62-.69s1.85.23,2.65.68c.79.45,1.43,1.11,1.9,1.97h0c.47.87.71,1.92.71,3.11Z", "M257.48,173.43c-1.3-.77-2.77-1.15-4.36-1.15s-2.94.35-4.11,1.05c-.67.4-1.25.85-1.74,1.37v-2.13h-3.82v26.05h3.82v-10.21c.5.52,1.09.99,1.77,1.39,1.18.69,2.55,1.05,4.08,1.05s3.06-.4,4.37-1.19c1.3-.79,2.34-1.91,3.08-3.33.74-1.41,1.11-3.03,1.11-4.82s-.38-3.43-1.11-4.81c-.74-1.39-1.78-2.48-3.09-3.25ZM257.8,181.49c0,1.21-.24,2.27-.72,3.16-.47.87-1.11,1.55-1.9,2-1.57.91-3.65.93-5.27,0-.79-.46-1.44-1.13-1.92-2.01-.48-.88-.73-1.93-.73-3.12s.25-2.21.73-3.09c.48-.88,1.13-1.55,1.92-2.01.8-.46,1.68-.69,2.62-.69s1.86.23,2.65.68c.79.45,1.43,1.11,1.9,1.97.47.88.71,1.92.71,3.11Z", "M279.83,173.4c-1.31-.74-2.83-1.12-4.52-1.12s-3.29.38-4.63,1.13c-1.35.76-2.41,1.85-3.16,3.26-.74,1.39-1.11,3.02-1.11,4.85s.39,3.47,1.14,4.87c.77,1.41,1.84,2.51,3.18,3.28,1.34.76,2.88,1.15,4.57,1.15,2.13,0,3.94-.55,5.38-1.64,1.45-1.09,2.43-2.52,2.91-4.25l.18-.63h-4.05l-.12.34c-.3.86-.8,1.52-1.53,2.03-.73.51-1.66.76-2.77.76-1.37,0-2.51-.42-3.46-1.28-.84-.76-1.33-1.76-1.51-3.05h13.48l.05-.45c.06-.6.09-1.19.09-1.76,0-1.63-.36-3.11-1.07-4.41-.71-1.31-1.74-2.35-3.06-3.09ZM270.39,179.81c.2-1.23.69-2.19,1.49-2.91.92-.83,2-1.23,3.31-1.23.91,0,1.75.19,2.49.55.73.36,1.31.89,1.73,1.58h0c.35.57.56,1.25.62,2.01h-9.64Z", "M298.44,172.25c-1.23,0-2.37.26-3.4.76-.59.29-1.11.65-1.56,1.08v-1.53h-3.82v17.99h3.82v-9.89c0-1.64.4-2.89,1.18-3.72.79-.83,1.83-1.24,3.19-1.24s2.35.39,3.11,1.19c.75.8,1.14,1.99,1.14,3.55v10.11h3.79v-10.51c0-2.48-.7-4.42-2.07-5.77-1.37-1.34-3.18-2.02-5.37-2.02Z", "M315.68 187.22 L323.52 175.5 L323.52 172.56 L311.08 172.56 L311.08 175.85 L318.83 175.85 L311.02 187.57 L311.02 190.55 L323.58 190.55 L323.58 187.22 L315.68 187.22Z"];
  B.LOGO = { BURST, LETTERS, TAG };
  /* Farbversionen laut CD: [Wortmarke, Bildmarke, Deckkraft Bildmarke, Zusatz, Deckkraft Zusatz] */
  B.LOGO_VARIANTS = {
    'braun-blau':    ['#E7825A', '#42ACE2', .25, '#42ACE2', .25],  /* Hauptlogo (11) */
    'blau':          ['#42ACE2', '#42ACE2', .25, '#42ACE2', 1],    /* einfarbig Blau (12) */
    'rosa':          ['#EB579A', '#EB579A', .25, '#EB579A', 1],    /* einfarbig Rosa (15) */
    'braun':         ['#E7825A', '#E7825A', .25, '#E7825A', 1],    /* einfarbig Braun */
    'weiss':         ['#FFFFFF', '#FFFFFF', .35, '#FFFFFF', .35],  /* Wortmarke 10 */
    'page':          ['#42ACE2', '#42ACE2', .25, '#42ACE2', 1]     /* einfarbig in der Seitenfarbe (per CSS) */
  };
  /* opts: variant, label. Eingesetzt wird nur Wort-Bildmarke ohne Zusatz (tagline: false ist Standard). */
  B.logo = function (o = {}) {
    const [ink, sun, so, tag, to] = B.LOGO_VARIANTS[o.variant] || B.LOGO_VARIANTS['braun-blau'];
    const withTag = o.tagline === true;
    const vb = withTag ? '0 0 324.77 198.61' : '0 0 324.77 164';
    return `<svg class="logo logo--${o.variant || 'braun-blau'}" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" ${o.label === '' ? 'aria-hidden="true" focusable="false"' : `role="img" aria-label="${o.label || 'baz'}"`}><path class="logo__sun" d="${BURST}" fill="${sun}" opacity="${so}"/><g class="logo__word" fill="${ink}">${LETTERS.map(d => `<path d="${d}"/>`).join('')}</g>${withTag ? `<g class="logo__tag" fill="${tag}" opacity="${to}">${TAG.map(d => `<path d="${d}"/>`).join('')}</g>` : ''}</svg>`;
  };
  /* Reine Wortmarke (ohne Bildmarke) */
  B.wordmark = (fill = '#E7825A') => `<svg class="wordmark" viewBox="89 18 237 133" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><g fill="${fill}">${LETTERS.map(d => `<path d="${d}"/>`).join('')}</g></svg>`;

  /* ---------- Bildmarke „Sonne“ (aus baz_Logo_Bildmarke_*.svg) ----------
     Statisch: Originalpfad. Animiert: 10 Strahlen als Keile (Clip an den
     Kerben der Form), die einzeln um das Zentrum skalieren → Strahlen werden
     länger/kürzer. Ruhezustand = pixelgenau das Original. */
  const SUN = 'M64.95,34.2l-6.7-2.2c1.96-.47,3.22-2.4,2.83-4.39-.35-1.8-1.93-3.04-3.7-3.04-.24,0-.49.02-.73.07l-2.71.53,7.01-7.12c1.78-1.81,1.76-4.72-.05-6.5-.9-.88-2.06-1.32-3.22-1.32s-2.38.46-3.28,1.37l-14.22,14.45-.72-.24-1.06-21.83c-.11-2.24-1.93-3.98-4.11-3.98-.07,0-.14,0-.21,0-2.27.11-4.02,2.08-3.91,4.39l.7,14.49-5.38-7.57c-1.22-1.72-3.14-2.63-5.09-2.63-1.25,0-2.52.38-3.62,1.16-2.53,1.81-3.3,5.15-1.98,7.85l-7.78-2.56c-.56-.18-1.12-.27-1.67-.27-2.25,0-4.34,1.43-5.08,3.68-.92,2.81.6,5.83,3.41,6.76l18.55,6.1-13.12,2.58c-2.04.4-3.37,2.39-2.97,4.43.4,2.04,2.38,3.38,4.43,2.97l18.02-3.55-10.16,10.34c-1.78,1.81-1.76,4.72.05,6.5,1.81,1.78,4.72,1.76,6.5-.05l7.29-7.41.57,11.68c.11,2.31,2.04,4.1,4.31,3.98,2.27-.11,4.02-2.08,3.91-4.39l-.19-3.97,4.16,5.86c2,2.82,5.9,3.47,8.71,1.47,2.81-2.01,3.46-5.92,1.46-8.74l-10.06-14.16,16.47,5.42c2.81.93,5.830-.6,6.76-3.41.92-2.81-.6-5.83-3.41-6.76Z';
  const SC = [35.61, 32.7];                                   /* Flächenschwerpunkt */
  const NOTCH = [-174, -144, -109, -60, -22, -2, 33, 76, 103, 144]; /* Kerben zwischen den Strahlen (Grad) */
  const SUN_VARIANTS = {
    blau: ['#42ACE2', 1], blau25: ['#42ACE2', .25], braun: ['#E7825A', 1], braun25: ['#E7825A', .25],
    rosa: ['#EB579A', 1], rosa25: ['#EB579A', .25], weiss: ['#FFFFFF', 1], weiss35: ['#FFFFFF', .35],
    page: ['#42ACE2', 1], page25: ['#42ACE2', .25],   /* Farbe per CSS aus der Seitenfarbe (--pc) */
    koralle: ['#E7825A', 1], koralle25: ['#E7825A', .25],
    /* frühere Namen → neue CD-Farben */
    gelb: ['#42ACE2', 1], gelb35: ['#42ACE2', .25], weiss45: ['#FFFFFF', .35], zimt: ['#E7825A', 1]
  };
  const wedge = (a1, a2) => {
    const P = a => { const r = a * Math.PI / 180; return `${(SC[0] + Math.cos(r) * 90).toFixed(2)},${(SC[1] + Math.sin(r) * 90).toFixed(2)}`; };
    return `M${SC[0]},${SC[1]}L${P(a1)}L${P((a1 + a2) / 2)}L${P(a2)}Z`;
  };
  const WEDGES = NOTCH.map((a, i) => wedge(a, i === NOTCH.length - 1 ? NOTCH[0] + 360 : NOTCH[i + 1]));
  const sunDefs = (pfx = 'bazW') => WEDGES.map((d, i) => `<clipPath id="${pfx}${i}" clipPathUnits="userSpaceOnUse"><path d="${d}"/></clipPath>`).join('');
  /* Reihenfolge der Verzögerung: im Uhrzeigersinn → wellenartiges „Atmen“ */
  const rays = (pfx, delayStep) => WEDGES.map((_, i) => `<g class="sun__ray" style="--rd:${(i * delayStep).toFixed(2)}s"><path d="${SUN}" clip-path="url(#${pfx}${i})"/></g>`).join('');

  B.SUN = SUN;
  /* opts: variant (gelb|gelb35|weiss45|zimt) | fill+opacity, anim, speed (slow|fast), cls, label */
  B.sun = function (o = {}) {
    if (typeof o === 'string') o = { fill: o };
    const [vf, vo] = SUN_VARIANTS[o.variant] || [o.fill || '#42ACE2', o.opacity ?? 1];
    const a11y = o.label ? `role="img" aria-label="${o.label}"` : 'aria-hidden="true" focusable="false"';
    const pg = o.variant === 'page' ? 'sun--page' : o.variant === 'page25' ? 'sun--page sun--p25' : '';
    o.cls = `${o.cls || ''} ${pg}`;
    if (!o.anim) return `<svg class="sun ${o.cls || ''}" viewBox="0 0 68.63 63" xmlns="http://www.w3.org/2000/svg" ${a11y}><path d="${SUN}" fill="${vf}" opacity="${vo}"/></svg>`;
    const step = o.speed === 'fast' ? .09 : .37;
    return `<svg class="sun sun--anim ${o.speed === 'fast' ? 'sun--fast' : ''} ${o.cls || ''}" viewBox="-4 -4 76.63 71" xmlns="http://www.w3.org/2000/svg" ${a11y}><g fill="${vf}" opacity="${vo}"><circle cx="${SC[0]}" cy="${SC[1]}" r="8.4"/>${rays('bazW', step)}</g></svg>`;
  };
  /* Rückwärtskompatibel: frühere B.burst()-Aufrufe zeigen nun die neue Sonne */
  B.burst = (fill = '#42ACE2', cls = '') => B.sun({ fill, cls });
  /* Globale Clip-Defs (einmal im Dokument) */
  B.sunDefsSvg = () => `<svg class="sun-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs>${sunDefs()}</defs></svg>`;
  /* Eigenständige animierte Sonne als Data-URI (z. B. Button-Ladezustand via CSS) */
  B.sunDataURI = (fill = '#42ACE2') => {
    const s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 76.63 71"><style>.r{transform-origin:${SC[0]}px ${SC[1]}px;animation:a .5s cubic-bezier(.65,0,.35,1) infinite alternate}@keyframes a{from{transform:scale(.55)}to{transform:scale(1.04)}}</style><defs>${sunDefs('w')}</defs><g fill="${fill}"><circle cx="${SC[0]}" cy="${SC[1]}" r="8.4"/>${WEDGES.map((_, i) => `<g class="r" style="animation-delay:${(i * .07).toFixed(2)}s"><path d="${SUN}" clip-path="url(#w${i})"/></g>`).join('')}</g></svg>`;
    return 'data:image/svg+xml,' + encodeURIComponent(s);
  };

  /* ---------- Icon-Welt ----------
     Abgeleitet vom Logo: runde Enden & Ecken, kräftige Strichstärke (1.9 @24px),
     organische Formen, Duotone mit Sonnengelb-Akzent (--icon-accent). */
  const I = {
    search:  ['<circle cx="10.6" cy="10.6" r="4.4"/>', '<circle cx="10.6" cy="10.6" r="6.6"/><path d="m15.6 15.6 4.6 4.6"/>'],
    user:    ['<circle cx="12" cy="8.2" r="3.3"/>', '<circle cx="12" cy="8.2" r="4.2"/><path d="M4.6 20.2c1.3-3.7 4.1-5.6 7.4-5.6s6.1 1.9 7.4 5.6"/>'],
    bag:     ['<path d="M6.4 12.4h11.2l-.55 6.4a2.2 2.2 0 0 1-2.2 2H9.15a2.2 2.2 0 0 1-2.2-2Z"/>', '<path d="M5.4 8.4h13.2a.9.9 0 0 1 .9 1l-.95 9.6a2.6 2.6 0 0 1-2.6 2.3H8.05a2.6 2.6 0 0 1-2.6-2.3L4.5 9.4a.9.9 0 0 1 .9-1Z"/><path d="M9 10.6V7a3 3 0 0 1 6 0v3.6"/>'],
    heart:   ['<circle cx="8.6" cy="9.8" r="2.4"/>', '<path d="M12 19.6s-7.6-4.4-7.6-10A4.1 4.1 0 0 1 12 7.3a4.1 4.1 0 0 1 7.6 2.3c0 5.6-7.6 10-7.6 10Z"/>'],
    menu:    ['<circle cx="18.6" cy="16" r="1.9"/>', '<path d="M4.5 8h15M4.5 16h9.5"/>'],
    close:   ['', '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>'],
    chevron: ['', '<path d="m7 10 5 5 5-5"/>'],
    left:    ['', '<path d="m14.5 6-6 6 6 6"/>'],
    right:   ['', '<path d="m9.5 6 6 6-6 6"/>'],
    arrow:   ['', '<path d="M4.8 12h14.4M13.4 6.2 19.2 12l-5.8 5.8"/>'],
    plus:    ['', '<path d="M12 5.2v13.6M5.2 12h13.6"/>'],
    minus:   ['', '<path d="M5.2 12h13.6"/>'],
    check:   ['', '<path d="m5.2 12.6 4.3 4.3 9.3-9.6"/>'],
    truck:   ['<circle cx="7.4" cy="17.4" r="2"/><circle cx="17.2" cy="17.4" r="2"/>', '<path d="M3.4 15.6V7.4a1.4 1.4 0 0 1 1.4-1.4h7.8a1.4 1.4 0 0 1 1.4 1.4v8.2M14 9.6h3.4l3.2 3.4v2.6"/><circle cx="7.4" cy="17.4" r="2"/><circle cx="17.2" cy="17.4" r="2"/>'],
    leaf:    ['<path d="M6 18.2c0-7.2 4.6-11.8 12.6-12.6 0 8-4.6 12.6-12.6 12.6Z"/>', '<path d="M5.2 19c0-8 5-13 14-14 0 9-5 14-14 14Z"/><path d="m5.2 19 7.6-7.6"/>'],
    hand:    ['<circle cx="12.4" cy="16.6" r="3.4"/>', '<path d="M8.2 12.8V6.6a1.5 1.5 0 0 1 3 0v5M11.2 11V5.2a1.5 1.5 0 0 1 3 0v5.8M14.2 11V6.8a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7-2.4 0-3.9-1.1-5.2-3.1L4.4 15a1.4 1.4 0 0 1 2.3-1.6L8.2 15"/>'],
    refresh: ['<circle cx="12" cy="12" r="3"/>', '<path d="M4.6 12a7.4 7.4 0 0 1 12.7-5.2L19.4 9M19.4 4.6V9H15M19.4 12a7.4 7.4 0 0 1-12.7 5.2L4.6 15M4.6 19.4V15H9"/>'],
    shield:  ['<path d="M12 5.2 7 7.3v3.9c0 3.4 2.1 6.2 5 7.6 2.9-1.4 5-4.2 5-7.6V7.3Z"/>', '<path d="M12 3.4 5.3 6.1v5c0 4.4 2.8 8 6.7 9.5 3.9-1.5 6.7-5.1 6.7-9.5v-5Z"/><path d="m9.2 12 2 2 3.8-3.9"/>'],
    chat:    ['<path d="M7.6 6.4h8.8a1.6 1.6 0 0 1 1.6 1.6v5.2a1.6 1.6 0 0 1-1.6 1.6H9.6l-3.6 2.4V8a1.6 1.6 0 0 1 1.6-1.6Z"/>', '<path d="M5 18.6V7a2.6 2.6 0 0 1 2.6-2.6h8.8A2.6 2.6 0 0 1 19 7v6.4a2.6 2.6 0 0 1-2.6 2.6H9.2Z"/><path d="M9 10.2h.01M12 10.2h.01M15 10.2h.01"/>'],
    send:    ['<path d="M6.4 11.4 18 5.6l-4.4 12.6-2.2-5.2Z"/>', '<path d="M4.2 11.6 19.8 4.2l-5.2 15.6-3-6.8Z"/><path d="m11.6 13 4-4"/>'],
    lock:    ['<rect x="6.2" y="11.6" width="11.6" height="7.6" rx="2"/>', '<rect x="5" y="10.4" width="14" height="10" rx="2.8"/><path d="M8.2 10.4V8a3.8 3.8 0 0 1 7.6 0v2.4M12 14.4v2"/>'],
    info:    ['<circle cx="12" cy="12" r="6.4"/>', '<circle cx="12" cy="12" r="8.6"/><path d="M12 11.2v5M12 7.9h.01"/>'],
    alert:   ['<path d="M12 7 6.2 17.4h11.6Z"/>', '<path d="M10.5 4.8a1.7 1.7 0 0 1 3 0l7.2 12.9a1.7 1.7 0 0 1-1.5 2.5H4.8a1.7 1.7 0 0 1-1.5-2.5Z"/><path d="M12 10v3.6M12 16.6h.01"/>'],
    grid:    ['<rect x="13.6" y="13.6" width="6.4" height="6.4" rx="2"/>', '<rect x="4" y="4" width="6.4" height="6.4" rx="2"/><rect x="13.6" y="4" width="6.4" height="6.4" rx="2"/><rect x="4" y="13.6" width="6.4" height="6.4" rx="2"/><rect x="13.6" y="13.6" width="6.4" height="6.4" rx="2"/>'],
    list:    ['<rect x="4" y="4.6" width="5.2" height="5.2" rx="1.8"/>', '<rect x="4" y="4.6" width="5.2" height="5.2" rx="1.8"/><rect x="4" y="14.2" width="5.2" height="5.2" rx="1.8"/><path d="M12.4 7.2h7.6M12.4 16.8h7.6"/>'],
    filter:  ['<circle cx="15.6" cy="7.4" r="2.1"/><circle cx="9.4" cy="16.6" r="2.1"/>', '<path d="M4.4 7.4h9M18 7.4h1.6M4.4 16.6h2.6M11.8 16.6h7.8"/><circle cx="15.6" cy="7.4" r="2.3"/><circle cx="9.4" cy="16.6" r="2.3"/>'],
    star:    ['<path d="m12 7.6 1.5 3 3.3.5-2.4 2.3.6 3.3-3-1.6-3 1.6.6-3.3-2.4-2.3 3.3-.5Z"/>', '<path d="m12 4.2 2.3 4.7 5.2.8-3.8 3.6.9 5.2-4.6-2.4-4.6 2.4.9-5.2-3.8-3.6 5.2-.8Z"/>'],
    package: ['<path d="M4.6 8 12 4.4 19.4 8 12 11.6Z"/>', '<path d="M4.4 8 12 4.2 19.6 8v8L12 19.8 4.4 16Z"/><path d="m4.4 8 7.6 3.8L19.6 8M12 11.8v8"/>'],
    mail:    ['<path d="m4.6 7.6 7.4 5.4 7.4-5.4"/>', '<rect x="3.6" y="5.6" width="16.8" height="12.8" rx="2.6"/><path d="m4.4 7.6 7.6 5.6 7.6-5.6"/>'],
    drop:    ['<path d="M7.4 14.4a4.6 4.6 0 0 0 9.2 0Z"/>', '<path d="M12 3.6s6 6.3 6 10.6a6 6 0 0 1-12 0C6 9.9 12 3.6 12 3.6Z"/>'],
    thermo:  ['<circle cx="12" cy="17.2" r="2.6"/>', '<path d="M10 14.2V5.6a2 2 0 0 1 4 0v8.6a4 4 0 1 1-4 0Z"/><path d="M12 10.4v6.6"/>'],
    feather: ['<path d="M9 15c0-5 3.4-8.6 9.4-9.4.2 3.6-1 6.6-3 8.4Z"/>', '<path d="M18.8 5C12.6 5 7.6 9 7.6 16v3.4M7.6 16h6M9.6 12h6.6c2-2 3-4.4 2.6-7"/>'],
    sparkle: ['<circle cx="12" cy="12" r="2.6"/>', '<path d="M12 3.6v3.4M12 17v3.4M3.6 12H7M17 12h3.4M6.1 6.1l2.4 2.4M15.5 15.5l2.4 2.4M6.1 17.9l2.4-2.4M15.5 8.5l2.4-2.4"/>']
  };
  /* Social-Media-Glyphen: gefüllt, ohne Konturen (Farbe via currentColor) */
  const SOCIAL = {
    instagram: 'M8.5 3h7A5.5 5.5 0 0 1 21 8.5v7a5.5 5.5 0 0 1-5.5 5.5h-7A5.5 5.5 0 0 1 3 15.5v-7A5.5 5.5 0 0 1 8.5 3ZM12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 1 0 0-9.4ZM12 9.3a2.7 2.7 0 1 1 0 5.4 2.7 2.7 0 1 1 0-5.4ZM16.9 5.8a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 1 0 0-2.5Z',
    pinterest: 'M12 3a9 9 0 0 0-3.3 17.4c-.1-.8-.1-2 .1-2.9l1.1-4.6s-.3-.6-.3-1.4c0-1.3.8-2.3 1.7-2.3.8 0 1.2.6 1.2 1.3 0 .8-.5 2-.8 3.1-.2.9.5 1.7 1.4 1.7 1.7 0 3-1.8 3-4.4 0-2.3-1.6-3.9-4-3.9-2.7 0-4.3 2-4.3 4.2 0 .8.3 1.7.7 2.2l.1.3-.3 1c0 .2-.2.2-.4.1-1.3-.6-2-2.4-2-3.9 0-3.2 2.3-6.1 6.7-6.1 3.5 0 6.2 2.5 6.2 5.8 0 3.5-2.2 6.3-5.2 6.3-1 0-2-.5-2.3-1.1l-.6 2.4c-.2.9-.9 2-1.3 2.7A9 9 0 1 0 12 3Z',
    tiktok: 'M16.6 3h-3.1v12.1a2.7 2.7 0 1 1-2.7-2.7c.3 0 .6 0 .8.1V9.4a5.9 5.9 0 1 0 5 5.8V9.1a7.2 7.2 0 0 0 4.2 1.3V7.3a4.2 4.2 0 0 1-4.2-4.3Z',
    facebook: 'M13.6 21v-7.2H16l.4-2.9h-2.8V9.1c0-.8.3-1.4 1.4-1.4h1.5V5.1c-.3 0-1.2-.1-2.2-.1-2.2 0-3.6 1.3-3.6 3.7v2.2H8.2v2.9h2.5V21Z',
    youtube: 'M21.6 8.2a2.6 2.6 0 0 0-1.8-1.8C18.2 6 12 6 12 6s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 8.2C2 9.8 2 12 2 12s0 2.2.4 3.8a2.6 2.6 0 0 0 1.8 1.8C5.8 18 12 18 12 18s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8c.4-1.6.4-3.8.4-3.8s0-2.2-.4-3.8ZM10 14.7V9.3l5.1 2.7Z'
  };
  B.SOCIAL = [['instagram', 'Instagram', 'https://www.instagram.com/'], ['pinterest', 'Pinterest', 'https://www.pinterest.de/'], ['tiktok', 'TikTok', 'https://www.tiktok.com/'], ['facebook', 'Facebook', 'https://www.facebook.com/'], ['youtube', 'YouTube', 'https://www.youtube.com/']];
  B.socialIcon = k => `<svg class="social__ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${SOCIAL[k]}" fill="currentColor" fill-rule="evenodd"/></svg>`;

  B.icon = (name, cls = '') => {
    const [acc, str] = I[name] || ['', ''];
    return `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${acc ? `<g class="icon__acc">${acc}</g>` : ''}<g class="icon__str" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${str}</g></svg>`;
  };

  /* ---------- Farb-Helfer ---------- */
  const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
  const mix = (a, b, t) => { const pa = hex(a), pb = hex(b); return '#' + pa.map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, '0')).join(''); };
  const fab = k => B.FABRICS[k] || B.FABRICS.natur;
  B.mix = mix;

  let uid = 0;
  const nid = () => 'g' + (++uid).toString(36);

  /* Gemeinsame Defs: Weichzeichner, Fasertextur, Licht-Verläufe */
  function defs(p, f, seed = 2) {
    return `
<filter id="${p}b" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="18"/></filter>
<filter id="${p}s" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="7"/></filter>
<filter id="${p}t" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="${seed}" result="n"/><feColorMatrix in="n" values="0 0 0 0 .3  0 0 0 0 .2  0 0 0 0 .1  1.4 0 0 0 -.56"/><feComposite in2="SourceGraphic" operator="in"/></filter>
<radialGradient id="${p}g" cx="36%" cy="28%" r="85%"><stop offset="0" stop-color="${mix(f.base, '#ffffff', .6)}"/><stop offset=".5" stop-color="${f.base}"/><stop offset="1" stop-color="${f.shade}"/></radialGradient>
<linearGradient id="${p}v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(f.base, '#ffffff', .45)}"/><stop offset=".55" stop-color="${f.base}"/><stop offset="1" stop-color="${f.shade}"/></linearGradient>
<linearGradient id="${p}h" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${f.shade}"/><stop offset=".28" stop-color="${mix(f.base, '#ffffff', .45)}"/><stop offset=".6" stop-color="${f.base}"/><stop offset="1" stop-color="${f.deep}"/></linearGradient>`;
  }
  const ground = (p, cx, cy, rx, ry = 22, o = .24) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#5A2A0B" opacity="${o}" filter="url(#${p}b)"/><ellipse cx="${cx}" cy="${cy - 4}" rx="${rx * .7}" ry="${ry * .35}" fill="#3a1d08" opacity="${o * .5}" filter="url(#${p}s)"/>`;
  const pillowPath = (x, y, w, h, i) => `M${x},${y}Q${x + w / 2},${y + i} ${x + w},${y}Q${x + w - i},${y + h / 2} ${x + w},${y + h}Q${x + w / 2},${y + h - i} ${x},${y + h}Q${x + i},${y + h / 2} ${x},${y}Z`;
  const tex = (p, d, o = .5) => `<path d="${d}" fill="#212121" filter="url(#${p}t)" opacity="${o}"/>`;
  const creases = (x, y, w, h, c) => {
    const s = `fill="none" stroke="${c}" stroke-width="2.4" stroke-linecap="round" opacity=".45"`;
    return `<path ${s} d="M${x + 8},${y + 8}Q${x + 38},${y + 26} ${x + 68},${y + 30}"/><path ${s} d="M${x + w - 8},${y + 8}Q${x + w - 38},${y + 26} ${x + w - 68},${y + 30}"/><path ${s} d="M${x + 8},${y + h - 8}Q${x + 38},${y + h - 26} ${x + 68},${y + h - 30}"/><path ${s} d="M${x + w - 8},${y + h - 8}Q${x + w - 38},${y + h - 26} ${x + w - 68},${y + h - 30}"/>`;
  };
  const label = (x, y, rot = 0) => `<g transform="rotate(${rot} ${x} ${y})"><rect x="${x}" y="${y}" width="12" height="30" rx="3" fill="#E7825A"/><rect x="${x + 3}" y="${y + 8}" width="6" height="14" rx="3" fill="#42ACE2"/></g>`;

  /* ---------- Generatoren: liefern {defs, body} im 600×600-Raum ---------- */
  const G = {};

  G.pillow = (fk, o = {}) => {
    const p = nid(), f = fab(fk), sq = !!o.square;
    const w = sq ? 330 : 400, h = sq ? 300 : 236, x = 300 - w / 2, y = 300 - h / 2 - 14;
    const d = pillowPath(x, y, w, h, 24);
    return { defs: defs(p, f, 3), body: `
${ground(p, 300, y + h + 46, w * .52)}
<g transform="rotate(-5 300 300)">
<path d="${pillowPath(x + 4, y + 20, w - 8, h, 22)}" fill="${f.deep}"/>
<path d="${d}" fill="url(#${p}g)"/>
${tex(p, d, .45)}
<ellipse cx="${300 - w * .12}" cy="${y + h * .36}" rx="${w * .3}" ry="${h * .22}" fill="#fff" opacity=".45" filter="url(#${p}b)"/>
${creases(x, y, w, h, f.shade)}
<path d="${pillowPath(x + 12, y + 12, w - 24, h - 24, 20)}" fill="none" stroke="${f.deep}" stroke-width="1.4" stroke-dasharray="1 6" stroke-linecap="round" opacity=".55"/>
${label(x + w - 6, y + h * .44)}
</g>` };
  };

  G.cushion = (fk, o = {}) => {
    const p = nid(), f = fab(fk);
    const x = 150, y = 135, w = 300, h = 300, d = pillowPath(x, y, w, h, 26);
    const knit = `<pattern id="${p}k" width="22" height="17" patternUnits="userSpaceOnUse"><path d="M1,2 L11,12 L21,2" fill="none" stroke="${f.shade}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/></pattern>`;
    const boucle = `<pattern id="${p}k" width="13" height="13" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="2.4" fill="${f.shade}" opacity=".5"/><circle cx="10" cy="9.5" r="2.6" fill="${f.shade}" opacity=".38"/><circle cx="9" cy="2" r="1.2" fill="#fff" opacity=".5"/></pattern>`;
    const em = o.emblem ? (() => { const s = 2.5, ex = 300 - 34.3 * s, ey = 284 - 31.5 * s, ink = fk === 'creme' || fk === 'natur' ? '#42ACE2' : '#E7825A';
      return `<g transform="translate(${ex} ${ey}) scale(${s})"><path d="${SUN}" fill="${ink}"/><path d="${SUN}" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width=".55" stroke-dasharray=".9 1.3" transform="translate(34.3 31.5) scale(.86) translate(-34.3 -31.5)"/></g>`; })() : '';
    return { defs: defs(p, f, 5) + (o.pattern === 'boucle' ? boucle : knit) + `<clipPath id="${p}c"><path d="${d}"/></clipPath>`, body: `
${ground(p, 300, y + h + 44, 190)}
<g transform="rotate(${o.rot ?? -4} 300 300)">
<path d="${pillowPath(x + 4, y + 20, w - 8, h, 24)}" fill="${f.deep}"/>
<path d="${d}" fill="url(#${p}g)"/>
<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${p}k)" clip-path="url(#${p}c)"/>
${tex(p, d, .4)}
<ellipse cx="270" cy="230" rx="100" ry="70" fill="#fff" opacity=".35" filter="url(#${p}b)"/>
${creases(x, y, w, h, f.deep)}
${em}
</g>` };
  };

  G.duvet = (fk, o = {}) => {
    const p = nid(), f = fab(fk);
    let s = ground(p, 300, 452, 230, 24);
    const lh = 66, base = 368;
    for (let i = 0; i < 3; i++) {
      const x = 104 + i * 9, w = 392 - i * 18, y = base - i * 58;
      s += `<rect x="${x}" y="${y}" width="${w}" height="${lh}" rx="${lh / 2}" fill="url(#${p}v)"/>
<rect x="${x}" y="${y}" width="${w}" height="${lh}" rx="${lh / 2}" fill="#212121" filter="url(#${p}t)" opacity=".35"/>
<path d="M${x + 34},${y + lh / 2 + 2}H${x + w - 34}" stroke="${f.deep}" stroke-width="1.6" stroke-dasharray="5 7" stroke-linecap="round" opacity=".55"/>
<path d="M${x + 30},${y + lh - 6}Q${x + w / 2},${y + lh + 2} ${x + w - 30},${y + lh - 6}" fill="none" stroke="${f.deep}" stroke-width="2" opacity=".3"/>`;
    }
    const tx = 140, tw = 320, ty = base - 2 * 58;
    const top = `M${tx},${ty + 10}L${tx + tw},${ty + 10}L${tx + tw - 34},${ty - 54}Q${300},${ty - 62} ${tx + 34},${ty - 54}Z`;
    s += `<path d="${top}" fill="url(#${p}g)"/>${tex(p, top, .35)}
<path d="M${tx + 110},${ty + 8}L${tx + 120},${ty - 56}M${tx + 210},${ty + 8}L${tx + 200},${ty - 56}M${tx + 22},${ty - 22}H${tx + tw - 22}" stroke="${f.deep}" stroke-width="1.5" stroke-dasharray="4 6" stroke-linecap="round" opacity=".5"/>
<ellipse cx="270" cy="${ty - 26}" rx="90" ry="18" fill="#fff" opacity=".5" filter="url(#${p}s)"/>
${label(104 + 392 - 26, base + 18, 0)}`;
    return { defs: defs(p, f, 7), body: s };
  };

  G.bedding = (fk, o = {}) => {
    const p = nid(), f = fab(fk), sheet = !!o.sheet;
    let s = ground(p, 300, 440, 220, 22);
    const n = sheet ? 3 : 4, lh = 44, base = 382;
    const lin = `<pattern id="${p}l" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0,3H6" stroke="${f.deep}" stroke-width=".8" opacity=".35"/><path d="M3,0V6" stroke="#fff" stroke-width=".6" opacity=".35"/></pattern>`;
    for (let i = 0; i < n; i++) {
      const x = 112 + i * 4, w = 376 - i * 8, y = base - i * 40;
      s += `<rect x="${x}" y="${y}" width="${w}" height="${lh}" rx="16" fill="url(#${p}v)"/><rect x="${x}" y="${y}" width="${w}" height="${lh}" rx="16" fill="url(#${p}l)"/>
<path d="M${x + 18},${y + lh - 7}Q${x + w / 2},${y + lh - 1} ${x + w - 18},${y + lh - 7}" fill="none" stroke="${f.deep}" stroke-width="1.6" opacity=".35"/>`;
    }
    const ty = base - (n - 1) * 40;
    const top = `M${126},${ty + 6}L${474},${ty + 6}L${448},${ty - 44}L${152},${ty - 44}Z`;
    s += `<path d="${top}" fill="url(#${p}g)"/><path d="${top}" fill="url(#${p}l)"/>`;
    if (!sheet) {
      s += `<rect x="186" y="${ty - 78}" width="228" height="46" rx="14" fill="url(#${p}v)" transform="rotate(-2 300 ${ty - 55})"/>
${[0, 1, 2, 3].map(k => `<circle cx="${226 + k * 50}" cy="${ty - 40}" r="4.2" fill="#6b5442" opacity=".8"/>`).join('')}
<rect x="318" y="${ty - 84}" width="46" height="${base + lh - ty + 86}" fill="#F9E0D6"/>
<rect x="318" y="${ty - 84}" width="46" height="${base + lh - ty + 86}" fill="#212121" filter="url(#${p}t)" opacity=".25"/>
<rect x="324" y="${ty - 10}" width="34" height="58" rx="3" fill="#fff"/>
<g transform="translate(330 ${ty - 3}) scale(.33)"><path d="${SUN}" fill="#42ACE2"/></g>
<text x="341" y="${ty + 40}" text-anchor="middle" font-family="Poppins, sans-serif" font-size="9" font-weight="700" fill="#E7825A">baz</text>`;
    } else {
      s += `<path d="M118,${base + lh - 4}q12,6 24,0t24,0t24,0t24,0t24,0t24,0t24,0t24,0t24,0t24,0t24,0t24,0t24,0t24,0t24,0" fill="none" stroke="${f.deep}" stroke-width="2" opacity=".45"/>`;
    }
    return { defs: defs(p, f, 9) + lin, body: s };
  };
  G.sheet = (fk) => G.bedding(fk, { sheet: true });

  G.throw = (fk) => {
    const p = nid(), f = fab(fk);
    const rib = `<pattern id="${p}r" width="16" height="10" patternUnits="userSpaceOnUse"><path d="M2,0V10" stroke="${f.deep}" stroke-width="2" opacity=".28"/><path d="M8,0 L11,5 L8,10" fill="none" stroke="#fff" stroke-width="1.2" opacity=".4"/></pattern>`;
    let s = ground(p, 300, 448, 220, 22);
    const lh = 84, base = 350;
    for (let i = 0; i < 2; i++) {
      const x = 120 + i * 10, w = 340 - i * 20, y = base - i * 74;
      s += `<rect x="${x}" y="${y}" width="${w}" height="${lh}" rx="30" fill="url(#${p}v)"/><rect x="${x}" y="${y}" width="${w}" height="${lh}" rx="30" fill="url(#${p}r)"/>${tex(p, `M${x},${y}h${w}v${lh}h-${w}Z`, .3)}
${Array.from({ length: 10 }, (_, k) => `<path d="M${x + w - 6},${y + 12 + k * 6.4}q14,2 22,${8 + (k % 3)}" fill="none" stroke="${f.shade}" stroke-width="2.2" stroke-linecap="round"/>`).join('')}`;
    }
    const ty = base - 74, top = `M136,${ty + 8}L444,${ty + 8}L418,${ty - 48}L162,${ty - 48}Z`;
    s += `<path d="${top}" fill="url(#${p}g)"/><path d="${top}" fill="url(#${p}r)"/>${label(124, base + 30)}`;
    return { defs: defs(p, f, 11) + rib, body: s };
  };

  G.roll = (fk) => {
    const p = nid(), f = fab(fk);
    const end = (cx) => `<ellipse cx="${cx}" cy="300" rx="26" ry="58" fill="${f.shade}"/>${Array.from({ length: 12 }, (_, k) => { const a = k / 12 * Math.PI * 2; return `<path d="M${cx},300L${cx + Math.cos(a) * 22},${300 + Math.sin(a) * 52}" stroke="${f.deep}" stroke-width="1.6" opacity=".55"/>`; }).join('')}<circle cx="${cx}" cy="300" r="7" fill="${f.deep}"/>`;
    return { defs: defs(p, f, 13).replace(`id="${p}v" x1="0" y1="0" x2="0" y2="1"`, `id="${p}v" x1="0" y1="0" x2="0" y2="1"`), body: `
${ground(p, 300, 392, 200, 20)}
<g transform="rotate(-7 300 300)">
<rect x="160" y="242" width="280" height="116" fill="url(#${p}v)"/>
<rect x="160" y="242" width="280" height="116" fill="#212121" filter="url(#${p}t)" opacity=".35"/>
<path d="M160,268H440M160,332H440" stroke="#fff" stroke-width="1" opacity=".3"/>
<ellipse cx="300" cy="266" rx="120" ry="10" fill="#fff" opacity=".55" filter="url(#${p}s)"/>
${end(160)}
<ellipse cx="440" cy="300" rx="26" ry="58" fill="url(#${p}v)"/>${end(440).replace(`fill="${f.shade}"`, `fill="${f.base}"`)}
${label(290, 352)}
</g>` };
  };

  G.topper = (fk) => {
    const p = nid(), f = fab(fk);
    const spiral = Array.from({ length: 5 }, (_, k) => `<circle cx="420" cy="300" r="${74 - k * 14}" fill="none" stroke="${f.deep}" stroke-width="2" opacity="${.25 + k * .08}"/>`).join('');
    return { defs: defs(p, f, 15), body: `
${ground(p, 300, 400, 220, 20)}
<rect x="150" y="226" width="270" height="148" rx="10" fill="url(#${p}v)"/>
<rect x="150" y="226" width="270" height="148" rx="10" fill="#212121" filter="url(#${p}t)" opacity=".35"/>
<path d="M150,262H420M150,300H420M150,338H420" stroke="${f.deep}" stroke-width="1.4" stroke-dasharray="4 6" opacity=".45"/>
<circle cx="420" cy="300" r="76" fill="url(#${p}g)"/>${spiral}
<rect x="226" y="222" width="14" height="156" fill="#C9A77E"/><rect x="320" y="222" width="14" height="156" fill="#C9A77E"/>
<ellipse cx="270" cy="244" rx="110" ry="12" fill="#fff" opacity=".55" filter="url(#${p}s)"/>` };
  };

  G.pouf = (fk) => {
    const p = nid(), f = fab(fk);
    const bc = `<pattern id="${p}k" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="2.2" fill="${f.shade}" opacity=".5"/><circle cx="9" cy="9" r="2.4" fill="${f.deep}" opacity=".25"/></pattern>`;
    const side = 'M128,282V368A172,62 0 0 0 472,368V282Z';
    return { defs: defs(p, f, 17) + bc, body: `
${ground(p, 300, 436, 210, 24)}
<path d="${side}" fill="url(#${p}h)"/><path d="${side}" fill="url(#${p}k)"/>
<ellipse cx="300" cy="282" rx="172" ry="62" fill="url(#${p}g)"/><ellipse cx="300" cy="282" rx="172" ry="62" fill="url(#${p}k)"/>
${tex(p, side, .3)}
${Array.from({ length: 8 }, (_, k) => { const a = k / 8 * Math.PI * 2; return `<path d="M300,282L${300 + Math.cos(a) * 110},${282 + Math.sin(a) * 40}" stroke="${f.deep}" stroke-width="1.6" opacity=".3"/>`; }).join('')}
<circle cx="300" cy="282" r="9" fill="${f.deep}"/>
<path d="M128,300A172,62 0 0 0 472,300" fill="none" stroke="${f.deep}" stroke-width="1.6" stroke-dasharray="3 6" opacity=".5"/>
<ellipse cx="250" cy="262" rx="80" ry="20" fill="#fff" opacity=".4" filter="url(#${p}s)"/>` };
  };

  /* Detailaufnahme: Material-Nahansicht mit eingewebtem Label */
  G.detail = (fk, o = {}) => {
    const p = nid(), f = fab(fk);
    const weave = o.pattern === 'knit'
      ? `<pattern id="${p}w" width="56" height="42" patternUnits="userSpaceOnUse"><path d="M2,4 L28,30 L54,4" fill="none" stroke="${f.shade}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/><path d="M6,2 L28,24 L50,2" fill="none" stroke="#fff" stroke-width="2" opacity=".35"/></pattern>`
      : `<pattern id="${p}w" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)"><path d="M0,7H14" stroke="${f.deep}" stroke-width="1.6" opacity=".22"/><path d="M7,0V14" stroke="#fff" stroke-width="1.4" opacity=".3"/></pattern>`;
    return { defs: defs(p, f, 19) + weave + `<filter id="${p}t2" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="3" seed="4"/><feColorMatrix values="0 0 0 0 .3  0 0 0 0 .2  0 0 0 0 .1  1.5 0 0 0 -.62"/><feComposite in2="SourceGraphic" operator="in"/></filter>`, body: `
<rect width="600" height="600" fill="url(#${p}g)"/>
<rect width="600" height="600" fill="url(#${p}w)"/>
<rect width="600" height="600" fill="#212121" filter="url(#${p}t2)" opacity=".7"/>
<path d="M-20,460C160,410 380,500 620,420" fill="none" stroke="${f.deep}" stroke-width="5" opacity=".5"/>
<path d="M-20,448C160,398 380,488 620,408" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="10 9" opacity=".6"/>
<g transform="rotate(-7 300 280)">
<rect x="208" y="214" width="184" height="104" rx="6" fill="#3a1d08" opacity=".18" filter="url(#${p}s)"/>
<rect x="204" y="206" width="184" height="104" rx="6" fill="#FDFBF7"/>
<g transform="translate(220 222) scale(.72)"><path d="${SUN}" fill="#42ACE2"/></g>
<text x="300" y="262" font-family="Poppins, sans-serif" font-size="34" font-weight="700" fill="#E7825A">baz</text>
<text x="226" y="292" font-family="Poppins, sans-serif" font-size="10" letter-spacing="2" font-weight="500" fill="#756A5E">100 % ALPAKA · HANDMADE</text>
</g>` };
  };

  /* Szene: Produkt im minimalistischen Schlafzimmer */
  G.scene = (art, o = {}) => {
    const p = nid();
    return { defs: art.defs + `<filter id="${p}b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter><linearGradient id="${p}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#FFFFFF"/></linearGradient>`, body: `
<rect width="600" height="600" fill="url(#${p}w)"/>
<path d="M330,0H540L430,360H220Z" fill="#fff" opacity=".75" filter="url(#${p}b)"/>
<rect y="476" width="600" height="124" style="fill:var(--pc25,#D0EAF8)"/>
<rect x="64" y="236" width="472" height="170" rx="22" style="fill:var(--pc,#42ACE2)" opacity=".25"/>
<rect x="64" y="236" width="472" height="12" rx="6" fill="#fff" opacity=".35"/>
<rect x="44" y="384" width="512" height="70" rx="16" fill="#FFFFFF" filter="drop-shadow(0 8px 14px rgba(33,33,33,.06))"/>
<path d="M44,420C150,396 260,436 330,410S500,398 556,416V454H44Z" fill="#FFFFFF"/>
<rect x="72" y="452" width="16" height="30" rx="4" style="fill:var(--pc,#42ACE2)"/><rect x="512" y="452" width="16" height="30" rx="4" style="fill:var(--pc,#42ACE2)"/>
<g transform="translate(141 172) scale(.53)">${art.body}</g>` };
  };

  /* Storytelling-Motive */
  G.fleece = () => { const p = nid(), f = fab('natur'); const c = [[300, 300, 110], [210, 330, 80], [390, 330, 84], [250, 240, 76], [355, 240, 78], [300, 380, 70]];
    return { defs: defs(p, f, 21), body: ground(p, 300, 440, 200) + c.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${p}g)"/>`).join('') + c.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#212121" filter="url(#${p}t)" opacity=".4"/>`).join('') }; };
  G.fibers = () => { const p = nid(); const cols = ['natur', 'himmel', 'rosa']; let s = '', d = '';
    cols.forEach((k, i) => { const f = fab(k); d += `<linearGradient id="${p}${i}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${f.shade}"/><stop offset=".5" stop-color="${mix(f.base, '#fff', .35)}"/><stop offset="1" stop-color="${f.shade}"/></linearGradient>`;
      const x = 170 + i * 130; s += `<path d="M${x - 40},430C${x - 50},330 ${x - 10},240 ${x - 30},150C${x + 10},150 ${x + 40},160 ${x + 40},160C${x + 30},250 ${x + 50},330 ${x + 40},430Z" fill="url(#${p}${i})"/>` + Array.from({ length: 7 }, (_, k) => `<path d="M${x - 30 + k * 10},420C${x - 34 + k * 10},330 ${x - 4 + k * 8},250 ${x - 20 + k * 9},165" fill="none" stroke="${f.deep}" stroke-width="1" opacity=".35"/>`).join(''); });
    return { defs: d + `<filter id="${p}b"><feGaussianBlur stdDeviation="16"/></filter>`, body: `<ellipse cx="300" cy="450" rx="210" ry="20" fill="#5A2A0B" opacity=".2" filter="url(#${p}b)"/>` + s }; };
  G.yarn = () => { const p = nid(), f = fab('sand');
    return { defs: defs(p, f, 23), body: ground(p, 300, 440, 150) + `<circle cx="300" cy="320" r="120" fill="url(#${p}g)"/>` + Array.from({ length: 9 }, (_, k) => `<ellipse cx="300" cy="320" rx="${118 - k * 2}" ry="${40 + k * 8}" transform="rotate(${k * 20 - 70} 300 320)" fill="none" stroke="${f.deep}" stroke-width="1.6" opacity=".45"/>`).join('') + `<path d="M410,360C470,400 520,330 560,380" fill="none" stroke="${f.shade}" stroke-width="5" stroke-linecap="round"/>` }; };
  G.needle = () => { const p = nid(), f = fab('creme');
    return { defs: defs(p, f, 25), body: ground(p, 300, 440, 210) + `<path d="${pillowPath(130, 210, 340, 200, 18)}" fill="url(#${p}g)"/><path d="M150,312H450" stroke="#E7825A" stroke-width="3" stroke-dasharray="14 10" stroke-linecap="round"/><path d="M420,140L250,330" stroke="#8a8178" stroke-width="5" stroke-linecap="round"/><ellipse cx="416" cy="145" rx="4" ry="9" transform="rotate(42 416 145)" fill="#fff" stroke="#8a8178" stroke-width="2"/><path d="M416,145C470,120 500,200 450,312" fill="none" stroke="#E7825A" stroke-width="2.4"/>` }; };

  /* ---------- Öffentliche API ---------- */
  const svg = (a, label, vb = '0 0 600 600') => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true" focusable="false"'} preserveAspectRatio="xMidYMid meet"><defs>${a.defs}</defs>${a.body}</svg>`;
  B.art = {
    raw: G,
    svg,
    product(prod, fabric, view = 'main', size) {
      const fk = fabric || prod.fabrics[0];
      const sq = size ? !!size.square : false;
      const fname = (B.FABRICS[fk] || {}).name || '';
      const lbl = `Illustration: ${prod.name} ${prod.type} in ${fname}`;
      const make = () => G[prod.art](fk, { square: sq, pattern: prod.pattern, emblem: prod.emblem });
      if (view === 'detail') return svg(G.detail(fk, { pattern: prod.pattern }), `${lbl}, Materialdetail`);
      if (view === 'scene') return svg(G.scene(make()), `${lbl}, im Schlafzimmer`);
      return svg(make(), lbl);
    },
    category(cat) { return svg(G[cat.art](cat.fabric, { pattern: 'knit' })); },
    hero() {
      const d = G.duvet('natur'), pl = G.pillow('creme'), cu = G.cushion('himmel', { pattern: 'boucle', emblem: true, rot: 7 }), r = G.roll('sand');
      return `<svg viewBox="0 0 900 720" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration: gestapelte Bettdecke, Kopfkissen, Zierkissen mit gestickter Sonne und Nackenrolle"><defs>${d.defs}${pl.defs}${cu.defs}${r.defs}</defs>
<g transform="translate(140 150)">${d.body}</g>
<g transform="translate(176 22) scale(.92)">${pl.body}</g>
<g transform="translate(470 86) scale(.66)">${cu.body}</g>
<g transform="translate(40 382) scale(.58)">${r.body}</g></svg>`;
    },
    story(kind) { return svg(G[kind]()); }
  };
})(window.BAZ = window.BAZ || {});
