# Testitulokset 9.10.2026

Ajettu paikallisesti Cloudflaren `wrangler dev` -palvelimella (sama ympäristö kuin julkaisussa).

| Testi | Tulos |
|---|---|
| Build (`npm run build`) | OK, 16 sivua |
| Yksikkötestit, kotitalousvähennys (`npm test`) | 3/3 OK (3 000 € → 1 050 €, 4 500 € → 1 650 €, 5 625 € → 2 100 €, kahdelle 11 250 € → 4 200 €, kahdelle 4 500 € → 1 500 €) |
| 301-ohjaukset vanhoista osoitteista | Kaikki 301 oikeaan kohteeseen, ei ketjuja, kaikki kohteet 200 |
| robots.txt, llms.txt, sitemap-index.xml | 200 |
| Sisäiset linkit (580 kpl) | 0 rikki |
| Vaakavieritys, 15 sivua × 15 leveyttä (360-1920 px) | 0 |
| H1 ja pää-CTA näkyvissä ilman vieritystä | OK kaikilla leveyksillä |
| Valikko aukeaa kosketuksella (iPad-leveydet) | OK |
| Alareunan palkki ei peitä sisältöä | OK |
| axe-core (WCAG 2.2 AA + best practice), 15 sivua, mobiili ja desktop | 0 rikkomusta |
| Ajatusviivat (U+2013, U+2014) tekstissä | 0 |

## Lighthouse (mobiili)

| Sivu | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| / | 98 | 100 | 100 | 100 | 1,8 s | 0,002 |
| /palvelut/katot/ | 100 | 100 | 100 | 100 | 1,5 s | 0,001 |
| /hintalaskuri/ | 99 | 100 | 100 | 100 | 1,7 s | 0 |
| /kuntoarvio/ | 100 | 100 | 100 | 100 | 1,5 s | 0 |
| /kotitalousvahennys/ | 100 | 100 | 100 | 100 | 1,5 s | 0,015 |

Huom: mitattu ilman oikeita valokuvia. Aja uudelleen, kun kuvat on lisätty.

## Ei testattavissa ennen domainin siirtoa

- Tekoälybottien pääsy holske.fi:hin. workers.dev-osoitteessa Cloudflaren bottiesto ei ole käytössä, mutta domainilla se voi olla oletuksena päällä. Ks. TODO.
