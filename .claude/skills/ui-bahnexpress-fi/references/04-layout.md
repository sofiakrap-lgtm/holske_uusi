# 04 Layout

## 04.1 Containerit
`.section__inner`: max-width 1440 px, margin auto, padding-inline = gutter: 24 px (<768), 36 px (768 ... 1024), 48 px (≥1025). Flex-sarake, gap = section-gap. (CSS-sääntö)
Kapea mitta (measure): none / 640 / 888 px. Laskurin mobiilipaneelit max 528 px. Hintalomake max 960 px (tabletilla 480 px). Ruutukaappauskehys max 960 px.

## 04.2 Grid
Ei klassista 12 sarakkeen gridiä. Käytetyt kaavat:
- Korttigrid: `repeat(auto-fill, minmax(min(288px,100%), 1fr))` (232 mobiili, 290 tabletti), gap sub-section-gap.
- Feature grid: mobiilissa 1 sarake, ≥768 `grid-auto-flow: column` (kaikki rinnakkain), 4 kohdetta → 2 x 2.
- Hero strip: `grid-auto-flow: column`, sarakkeet `minmax(0,1fr)`, mobiilissa rivit.
- Käyttötapaussisältö "quote aside": 2 x `minmax(0,1fr)`, column-gap 64 px, kun kontti > 928 px.
- Split (kuva | sisältö): 2 saraketta ≥1025, kuva täyttää korkeuden.
- Footer: 4 saraketta ≥1440, 2 ≥768.
- Logo grid: 2 saraketta, gap 2 px, ulkoradius 24 (solut erottuvat 2 px raoista).

## 04.3 Spacing-asteikko
Lähde: kirjaimelliset px-tokenit 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80, 96, 128, 144, 168, 192, 256. Yleisimmät: 12, 16, 24, 36, 48, 64. Perusyksikkö 4 px, mutta mukana 6, 18, 22 (optinen hienosäätö).

## 04.4 Osioiden padding
| | Mobile | Tablet | Desktop |
|---|---|---|---|
| Osion pystypadding | 96 | 128 | 144 |
| Section gap (otsikko → sisältö) | 48 | 56 | 64 |
| Sub-section gap | 24 | 28 | 32 |
| Footer padding | 96 / 48 | 128 / 56 | 144 / 64 |
Muunnelmat: pt-0, pb-0, pt-48, pt-96, pb-48, pb-96. CTA-osio on matala (n. 330 ... 620 px).

## 04.5 Breakpointit
Todelliset kytkimet: **768 px** (tablet alkaa) ja **1025 px** (desktop alkaa). Lisäksi 640, 1280, 1440 (footer 4 saraketta), 1345 (karusellirail xl), 1536. Headerin taittumispisteet 1190 / 980 / 820 / 380 px. Lisäksi container queryt (hero strip 828 / 880 / 1104, karuselli 720 / 952, käyttötapaus 448 / 600 / 640 / 928).

## 04.6 Rytmi, asymmetria ja full bleed
- Jokainen osio on täysleveä väripinta, sisältö keskitetty 1440 px konttiin.
- Karusellien rata on full bleed: `margin-inline: calc(50% - 50vw); padding-inline: calc(-50% + 50vw)`; scroll-padding pitää ensimmäisen kortin linjassa gutteriin (`max(48px, 50vw - 672px)`).
- Aikajanan viiva jatkuu ruudun reunaan asti (`--timeline-reach: max(48px, (100vw - 1344px) / 2)`).
- Asymmetriaa ei juuri ole: kaikki keskiakselilla, poikkeuksena kuva/sisältö-split.

## 04.7 Header-offset
Header 64 px (+ safe-area). Ensimmäinen osio (`.section--lead`) vedetään headerin alle: `margin-top: -64px; padding-top: 64px + section-gap`. Siksi hero-media alkaa ruudun yläreunasta läpinäkyvän headerin takaa. Ankkureiden `scroll-margin-top` = header + safe-top + sub-section-gap.
