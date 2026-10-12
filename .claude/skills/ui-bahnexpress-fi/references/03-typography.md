# 03 Typography

## 03.1 Fontit ja lataus
| Rooli | Alkuperäinen (mitattu @font-face) | Lähde ja lisenssi | Korvaaja (Google Fonts) | Säädöt |
|---|---|---|---|---|
| Display, heading, title, numerot | **Owners Wide** 500/700/900 ja **Owners XWide** 500/700/900 (Jeremy Mickel, MCKL) | itse hostattu woff2, kaupallinen | **Archivo** variable, `font-stretch: 125%` (Expanded) | display 900 versaali; XWide-rooleissa lisää tracking +0.02em leveyden kompensoimiseksi |
| Leipä, caption, napit, kentät | **Duplet Open** 300/400/600 (Diana Ovezea ja Rafał Buchner, Indian Type Foundry) | itse hostattu woff2, kaupallinen | **Figtree** 300/400/600 | sama paino-asteikko; vaihtoehto Urbanist jos haluat geometrisemman |
| Mono | GeistMono, Reddit Mono (ladattu, harvoin näkyvissä) | OFL | **Geist Mono** | ei käytössä pääsisällössä |
| (Geist Sans ladattu html-luokkana, ei näkyvä pääfontti) | | OFL | | |

Miksi nämä korvaajat:
- Owners on kansainvälisen tyylin groteski, jota on venytetty leveäksi kuten LA:n käsintehdyissä kylteissä. Archivo on samaa groteskiperhettä (suorat terminaalit, neutraali R ja G) ja ainoa laajalti käytetty Google-groteski, jossa on width-akseli 125 % asti ja paino 900. Se antaa saman "kyltti" -leveyden. Unbounded tai Syne ovat liian geometrisia ja pyöreitä.
- Duplet Open on matalakontrastinen geometrinen sans, jonka e ja s -kirjaimissa on viistot päätteet ja avoimet aukot. Figtree on samaa ystävällistä geometristä tyyliä, hyvä kevyissä painoissa ruudulla. (arvio, vertaa silmämääräisesti)

Lataus:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Figtree:ital,wght@0,300..700;1,300..700&family=Geist+Mono:wght@400..600&display=swap" rel="stylesheet">
```
Next.js: `Archivo({ subsets:['latin','latin-ext'], axes:['wdth'] })` ja `Figtree({ subsets:['latin','latin-ext'], weight:['300','400','600'] })`.
Kaikkiin Archivo-tyyleihin: `font-stretch: var(--stretch-display)`.

## 03.2 Tyyppiasteikko
Sivusto käyttää kiinteitä px-askelia ja vaihtaa askelta breakpointeissa (ei clampia). Hero-rivit valitsevat askeleen per breakpoint data-attribuutilla.
| Rooli (lähteen nimi) | Desktop | Tablet | Mobile | Line-height | Tracking | Weight | Transform | Features |
|---|---|---|---|---|---|---|---|---|
| display-xwide-1 (hero rivi 1) | 96 | 72 | 48 | = koko | -0.3px | 900 | uppercase | |
| display-wide-2 (hero rivi 2) | 80 | 56 | 48 | = koko | -0.3px | 900 | uppercase | |
| display-wide-3 (osio-otsikko H2) | 72 | 56 | 40 ... 48 | = koko | -0.3px | 900 | uppercase | |
| display-wide 4 ... 8 | 56 / 48 / 40 / 36 / 32 | | | = koko | -0.3px | 900 | uppercase | |
| heading-xwide (hero rivi 3) | 40 (heading2) | 40 | 32 (heading3) | 48 / 36 | +0.3px | 500 | none | |
| heading-wide-1 ... 8 | 48/56, 40/48, 32/36, 28/32, 24/28, 20/24, 18/20, 16/18 | | | ks. vasen | +0.3px | 500 | none | |
| title-1 ... 6 | 40/48, 36/40, 32/36, 28/32, 24/28, 20/24 | | | | -0.3px | 700 | none | |
| number-1 ... 4 (stat) | 64, 56, 48, 40 | 56 | 48 | = koko | +1.8px | 700 (XWide) | | tabular-nums |
| quote xl / l / m / s | 40/48, 32/36, 24/28, 20/24 | | | | -0.3px | 700 (Wide) | | |
| body-1 ... 6 | 24/32, 20/28, 18/24, 16/22, 14/20, 12/18 | | | | 0 | 300 | | ss02 ss06 ss07 |
| caption-1 ... 4 | 24/32, 20/24, 18/22, 16/20 | | | | 0 | 600 | | ss02 ss06 ss07 |
| link-1 ... 6 | = body | | | | 0 | 300 | underline | |
| button xs ... xl | 16, 18, 20, 22, 24 (line = koko) | | | | 0 | 600 | none | |
| nav (segmented label) | 18/18 | | | | 0 | 600 | | |
| input label / value | 16/22 / 18/24 | | | | 0 | 400 | | |
| tag | 12 ... 20 | | | | 0 | 400 | | |
(Kaikki CSS-sääntö. Proosassa body-2 skaalautuu 16 → 18 → 20 ja heading-wide-3 24 → 28 → 32.)

## 03.3 Mitta ja kappalevälit
Measure: ei rajaa mobiilissa, 640 px tabletilla, 888 px desktopilla (osion alaotsikko, proosa). Proosan kappaleväli 24 px, väliotsikko + kappale 12 ... 18 px. Accordion-vastauksen oikea padding 48 px (tila ikonille).

## 03.4 Hierarkiakaavat
- Osio: [caption tai tag] → display-wide-3 H2 (versaali) → body-1/caption-1 alaotsikko → sisältö. Kaikki keskitetty.
- Hero: H1 koostuu 2 ... 3 rivistä eri tyyleillä: rivi 1 XWide 900 versaali (esim. yksi sana), rivi 2 Wide 900 versaali, rivi 3 heading-xwide 500 tavallinen kirjainkoko (lause). Rivien väli 12 px desktop.
- Kortti: caption-label + tag → heading 20 ... 28 / 500 (2 riviä max) → body 16 ... 20 / 300 (3 riviä max).
- Hero strip -kohde: caption-2 muted (yksi sana) → heading-wide-3 (lyhyt väite) → body-2.

## 03.5 Tasaus ja rivitys
Otsikot ja captionit `text-wrap: balance`, muu teksti `text-wrap: pretty`. Hero-rivit `hyphens: auto; hyphenate-limit-chars: 10 5 5` (pitkät suomenkieliset sanat). **Fit-to-width:** jos display-otsikon pisin sana ei mahdu, pienennä yksi askel (72 → 56). Motion.js sisältää toteutuksen (`data-fit`).

## 03.6 Tekstin koristelu
Linkit: `text-decoration: underline max(1px, 0.05em); text-underline-offset: 0.14583em;` väri peritään, hover = link-väri. Quiet-linkki: ei alleviivausta ennen hoveria. Ei highlight-taustoja, ei kursiiviaksentteja.

## 03.7 Numerot, hinnat ja stat-luvut
Stat: XWide 700, tracking +1.8px, line = koko, `tabular-nums`, white-space nowrap. Label ylhäällä caption muted. Taulukoissa luvut oikealle, `lining-nums tabular-nums`. Hinnoissa yliviivattu vanha hinta (`order-summary__strike`).

## 03.8 Laskurianimaatiot
Rullaavat numerot (mitattu DOM): jokainen numero on `overflow:hidden; display:inline-block` -laatikko, jossa näkymätön paikkamerkki ja absoluuttinen pystynauha numeroista 0 → kohdenumero. Kun näkyvissä, nauha siirtyy `translateY(-N / (N+1) * 100%)`. Kesto 1 s, easing cubic-bezier(0, 0, 0.2, 1), viive 90 ms jokaista edellistä numeroa kohti (vasemmalta oikealle). Ei-numeromerkit (K, +, /, %) staattisia. Ruudunlukijalle `sr-only`-kopio arvosta. Reduced motion: ei siirtymää.
