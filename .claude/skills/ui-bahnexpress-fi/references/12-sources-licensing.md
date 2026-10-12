# 12 Sources and Licensing

## 12.1 Läpikäydyt URL:t
/, /kuljettajat, /kuljetusliikkeet, /tietoa-meista, /ura, /tarinat/kamux, /yhteystiedot (7 sivua, 6 sivupohjaa). Linkkien perusteella lisäksi olemassa: /tarinat, /tarinat/autohuset-vestergaard, /tarinat/forza-leasing, /ehdot, /tietosuoja (samat pohjat E ja F).

## 12.2 Tunnistettu teknologia
- Next.js (App Router, `_next/static/immutable`), isännöinti Vercel.
- Tailwind CSS v4 (lab()-värit, utilityt) + oma BEM-designjärjestelmä etuliitteellä `bx-` (n. 350 omaa custom propertya), Lightning CSS.
- Teemat `data-bx-theme`, paletti `data-bx-palette`, container queryt, style queryt (`@container style(--bx-button-size: m)`), `:has()`, anchor positioning, View Transitions API, `::details-content`, CSS scroll-driven animations, popover API.
- Mapbox GL (kartat).
- EI: GSAP, ScrollTrigger, Lenis, Locomotive, Swiper, Embla, Framer Motion -tunnisteita.

## 12.3 Fonttilisenssit ja korvaajat
| Alkuperäinen | Tekijä | Lisenssi | Korvaaja | Säädöt |
|---|---|---|---|---|
| Owners Wide / Owners XWide 500, 700, 900 | Jeremy Mickel, MCKL | kaupallinen | Archivo (OFL), font-stretch 125 % | XWide-rooleihin tracking +0.02em |
| Duplet Open 300, 400, 600 | Diana Ovezea, Rafał Buchner, Indian Type Foundry | kaupallinen | Figtree (OFL) | sama paino |
| Geist Sans, Geist Mono | Vercel | OFL | sama | |
| Reddit Mono | Reddit | OFL | sama | |
Fonttitiedostoja ei ladata lähdesivustolta. Jos haluat alkuperäiset, osta lisenssit: Owners MCKL:ltä, Duplet Open ITF:ltä (myös MyFonts, Fontstand).

## 12.4 Ikonikirjasto ja lisenssi
Oma ikonisto (ei tunnistettavaa kirjastoa). Korvaus: Lucide (ISC) tai Iconoir (MIT) + `stroke-linecap: square`, viiva 2 px 24 gridillä.

## 12.5 Pois jätetyt elementit
Logo ja wordmark, kaikki tekstit ja sloganit, valokuvat, hero-videot, grain-tekstuuri, kartan tyyli ja data, asiakkaiden logot ja muotokuvat, EU-rahoitusmerkki, sivuston omat SVG-ikonit. Notch join -muoto on yksinkertainen geometrinen muoto, joka on piirretty uudelleen.

## 12.6 Arviot ja epävarmuudet
- Kuvakaappausverifiointi puuttuu (välilehti taustalla). Visuaaliset kuvaukset päätelty koodista.
- Fonttikorvaajien valinta on arvio; vertaa Google Fontsissa.
- Hampurilaisikonin animaatiota ei mitattu.
- Aikajanan bulletin ja sisällön transition-kesto: "settle" 0,5 s on muuttuja, tarkka easing ei näkynyt (päätelty ease-out).
- Laskurinumeroiden lopullinen translate laskettu rakenteesta (nauhassa N+1 numeroa).
- Aiempi tutkimusraportti oletti fontiksi Geistin, sana kerrallaan -otsikkoanimaation, Embla/Lenis-kirjastot ja lähes mustavalkoisen paletin. Nämä olivat virheellisiä; tämä skill korvaa ne mitatuilla arvoilla.
