// Responsiivisuus-, valikko- ja axe-testi 15 leveydellä.
// Aja: npm run build && npx wrangler dev --port 8787 (toisessa ikkunassa), sitten
// PW=$(npm root -g)/playwright AXE=<polku>/axe-core/axe.min.js SP=/tmp node scripts/testit/responsiivisuus.cjs
const { chromium } = require(process.env.PW);
const fs = require('fs');
const AXE = fs.readFileSync(process.env.AXE, 'utf8');
const BASE = 'http://127.0.0.1:8787';
const SIVUT = ['/', '/palvelut/', '/palvelut/katot/', '/palvelut/maalaus/', '/palvelut/painepesu/', '/palvelut/lumityot/', '/palvelut/pihatyot/', '/palvelut/muut-korjaukset/', '/hintalaskuri/', '/kuntoarvio/', '/kotitalousvahennys/', '/meista/', '/yhteystiedot/', '/tietosuojaseloste/', '/404.html'];
const LEV = [[360,780],[390,844],[430,932],[744,1133],[768,1024],[810,1080],[820,1180],[834,1194],[1024,1366],[1080,810],[1180,820],[1194,834],[1366,1024],[1440,900],[1920,1080]];
(async () => {
  const b = await chromium.launch();
  const virheet = [];
  for (const [w, h] of LEV) {
    const touch = w < 1440;
    const ctx = await b.newContext({ viewport: { width: w, height: h }, hasTouch: touch, isMobile: w < 744 });
    await ctx.addInitScript(() => localStorage.setItem('holske-evasteet', JSON.stringify({ v: 1, analytiikka: false, markkinointi: false, aika: '' })));
    const p = await ctx.newPage();
    const js = []; p.on('pageerror', (e) => js.push(e.message));
    for (const u of SIVUT) {
      await p.goto(BASE + u, { waitUntil: 'networkidle' });
      const r = await p.evaluate(() => {
        const out = {};
        out.overflow = document.documentElement.scrollWidth > window.innerWidth;
        const h1 = document.querySelector('h1')?.getBoundingClientRect();
        out.h1 = h1 && h1.top < window.innerHeight && h1.bottom > 0;
        return out;
      });
      if (r.overflow) virheet.push(`${w} ${u}: vaakavieritys`);
      if (!r.h1) virheet.push(`${w} ${u}: H1 ei näy`);
    }
    // etusivu: CTA näkyvissä ilman vieritystä
    await p.goto(BASE + '/', { waitUntil: 'networkidle' });
    const cta = await p.evaluate(() => { const e = document.querySelector('.hero-text .btn'); const r = e.getBoundingClientRect(); return r.bottom <= window.innerHeight; });
    if (!cta) virheet.push(`${w} /: hero-CTA ei näy ilman vieritystä`);
    // valikko kosketuksella
    const toggle = p.locator('[data-menu-toggle]');
    if (await toggle.isVisible()) {
      if (touch) await toggle.tap(); else await toggle.click();
      await p.waitForTimeout(400);
      const auki = await p.evaluate(() => { const l = document.querySelector('[data-nav]'); return getComputedStyle(l).visibility === 'visible'; });
      if (!auki) virheet.push(`${w}: valikko ei aukea`);
      await p.keyboard.press('Escape');
    }
    // alareunan palkki ei peitä footeria
    const peitto = await p.evaluate(async () => {
      document.documentElement.style.scrollBehavior='auto'; window.scrollTo(0, document.body.scrollHeight); await new Promise((r) => setTimeout(r, 300));
      const bar = document.querySelector('.mobiili-cta'); if (!bar || getComputedStyle(bar).display === 'none') return false;
      const last = [...document.querySelectorAll('.site-footer .bottom p')].pop().getBoundingClientRect();
      return last.bottom > bar.getBoundingClientRect().top + 1;
    });
    if (peitto) virheet.push(`${w}: alareunan palkki peittää footerin`);
    if (js.length) virheet.push(`${w}: JS-virheet ${js.join(' | ')}`);
    if (w === 390 || w === 820 || w === 1440) await p.screenshot({ path: `${process.env.SP}/w${w}.png`, fullPage: false });
    await ctx.close();
  }
  // axe kaikille sivuille (390 ja 1440)
  for (const w of [390, 1440]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
    await ctx.addInitScript(() => localStorage.setItem('holske-evasteet', JSON.stringify({ v: 1, analytiikka: false, markkinointi: false, aika: '' })));
    const p = await ctx.newPage();
    for (const u of SIVUT) {
      await p.goto(BASE + u, { waitUntil: 'networkidle' });
      await p.addScriptTag({ content: AXE });
      const res = await p.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] })).violations.map((v) => `${v.id} (${v.nodes.length}): ${v.nodes.slice(0, 2).map((n) => n.target.join(' ')).join(', ')}`));
      res.forEach((x) => virheet.push(`axe ${w} ${u}: ${x}`));
    }
    await ctx.close();
  }
  await b.close();
  console.log(virheet.length ? virheet.join('\n') : 'KAIKKI OK');
})();
