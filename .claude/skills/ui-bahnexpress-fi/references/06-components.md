# 06 Components

Kaikki mitat CSS-säännöistä ellei toisin mainita. Komponenttipohjat: components/.

## 06.01 Header
- Anatomia: logo (24 px korkea) · navigaatio = segmented-pilleri 3 kohdalla · oikealla accessories: aux-linkki (ghost) + toimintanappi + valikkonappi (ikoni).
- Mitat: korkeus 64 px + safe-area; inner max 1440, padding 24/12 → 36/24 (768) → 36 (1025); nav margin-left 16 / 20 / 24; accessories gap 6 / 8 / 12. Toimintanappi xs (40 px) mobiili, s (48 px) ≥768.
- Tilat: yläreunassa läpinäkyvä (`data-at-top`); vierittäessä tausta overlay. Siirtymä tehdään CSS scroll-timelinellä: `animation: header-band linear both; animation-timeline: scroll(); animation-range: 0 96px` (tausta transparent → overlay). Fallback: luokka `.is-scrolled`, transition 0,24 s.
- Navigaation aktiivinen kohta: liukuva pilleri `::before`, joka siirtää left/width 0,26 s `--ease-standard`. Hover = tekstin väri link.
- Ei piiloudu vierittäessä alas.
- Taittuminen leveyden mukaan: <1190 aux piiloon, <980 kolmas nav-kohta piiloon, <820 koko nav piiloon (vain hampurilainen), <380 kompakti logo.
- Toimintanappi vaihtuu sivun mukaan (asiakkaat: "Katso hinta", kuljettajat: "Lataa sovellus", ura: "Työpaikat").
Tiedosto: components/header.html

## 06.02 Announcement bar
Ei havaittu sivustolla. Ehdotus: overlay-tausta, korkeus 40, caption-4 keskitetty, sama gutter.

## 06.03 Navigaatio ja dropdownit
- Nav: ks. 06.01. Labelit 48 px korkeat, padding 0 22, Figtree 600 18 px.
- Dropdown (valikko/autocomplete): arkki fixed, tausta input-surface, radius 20, padding 4, max-height min(320px, 40dvh), scroll. Rivit radius 16, padding 8 x 16, gap 16, label 18/24 400, kuvaus 16/22 muted, media 24 px. Hover/aktiivinen rivi = input-hover-tausta. Sisään: opacity 0 + translateY(-4px) → 0, 0,14 s `--ease-standard`; ulos 0,12 s. Yläpuolelle avautuva versio peilattuna.
- Select-laukaisin: label 18/24 + chevron, chevron kääntyy 180° 0,15 s.
Tiedosto: components/interactive.html

## 06.04 Mobiilivalikko
- Avautuu headerin alta (ei koko ruudun overlay): arkki translateY(-100%) → 0, 0,24 s `--ease-standard`; scrim (dialog-scrim) fade 0,24 s; ryhmät fade 0,2 s viiveellä 80 ms. Sulkeutuu 0,18 s.
- Arkki: tausta surface + overlay, padding 12/24/24; ≥768 ryhmät rinnakkain 1 px pystyjakajin, alakulmat radius 24, padding 18/36/36; ≥1025 max 928, gap 48.
- Ryhmä: label (Figtree 600 16 muted, padding 0 22) + linkit pillereinä (48 px korkea, 600 18, padding 0 22); aktiivinen linkki = surface-selected pilleri.
- Headerin nav, aux ja toiminto häivytetään 0,15 s kun valikko on auki.
- Morph (View Transitions): headerin 3 nav-kohtaa liukuvat kunkin ryhmän ensimmäiseksi linkiksi. Avaus 0,24 s viiveillä 0 / 30 / 60 ms, sulkeminen 0,18 s käänteisillä viiveillä 40 / 20 / 0 ms. Aux ja toimintanappi: ulos 0,12 s, sisään 0,14 s viiveellä 90 ms.
- Hampurilaisikoni: ikoni-nappi (ghost). Ikonin morph X:ksi: ei havaittu (arvio: ikoni vaihtuu).
Tiedosto: components/nav-mobile.html

## 06.05 Footer
- Tausta surface, `box-shadow: 0 50vh 0 0 surface` (ylivieritys ei näytä valkoista).
- Ylärivi: brändisarake (logo + iskulause heading-wide 20/24 → 24/28) ja linkkisarakkeet: 1 → 2 (768) → 4 (1440). Sarakkeen otsikko 18 px linkki, linkit Figtree 300 16/22 headline-väri, gap 12 ... 16, margin-top 18 ... 24.
- Alarivi margin-top 96 / 128 / 144: pienpainatus 14/20 300 + meta-linkit (ehdot, tietosuoja, evästeasetukset-nappi) + kielivalitsin oikealla. Rahoitusmerkki (sininen pilleri radius 8).
Tiedosto: components/footer.html

## 06.06 Napit
| Koko | Korkeus | Padding-x | Fontti | Ikoni |
|---|---|---|---|---|
| xs | 40 | 20 | 16 | 20 |
| s | 48 | 22 | 18 | 24 |
| m | 56 | 24 | 20 | 28 |
| l | 64 | 28 | 22 | 32 |
| xl | 72 | 32 | 24 | 36 |
- Muoto pilleri, Figtree 600, nowrap, ei borderia, ei varjoa.
- Variantit: primary (asphalt → hover grey-900; tummissa teemoissa birch → hover grey-100), secondary (pinnan väri → hover grey-100), tertiary (grey-100 → hover sand), ghost-primary (vain teksti, hover link-väri), ghost-secondary (birch teksti medialla).
- Transition: background-color 0,15 s, color 0,15 s. Ei skaalausta, ei nuolen liikettä.
- Focus: outline 4 px focus-ring, offset 0.
- Disabled: tausta disabled-pinta, teksti muted (ei opacitya).
- Ikoni-nappi: neliö (leveys = korkeus), viivan paksuus skaalataan kokoon.
- Koko periytyy kontista (`--button-size`): section header s → m → l, hero CTA l → xl, kortti s.
Tiedosto: components/buttons.html

## 06.07 Linkit
Inline: alleviivaus `max(1px, .05em)`, offset .14583em, väri peritty, hover link-väri. Quiet: ei alleviivausta, hover lisää. Footer- ja meta-linkit: ei alleviivausta, hover alleviivaus. Ei nuolilinkkejä.
Tiedosto: components/links.html

## 06.08 Ikonit, nuolet ja kursori
Oma viivaikonisto 24 px gridillä, viiva 1,75 ... 2,25 px, **butt- tai square-päät** (ei pyöreitä), täyttö none. Viivan paksuus skaalataan kokoon niin, että optinen paksuus pysyy (esim. 32 px ikoni → stroke 2 * 24/32). Korvaus: Lucide + CSS `stroke-linecap: square; stroke-linejoin: miter`. Ikonilaatat 56 ... 128 px pyöristettyinä neliöinä feature-chip-taustalla. Kursori normaali.

## 06.09 Media
- Thumbnail: tausta surface-sunken, object-fit cover, kuvasuhteet wide 21/10, landscape 4/3, photo 5/3, video 16/9, portrait 3/4; radius 24 tai 12. Videon play-nappi 56 px ympyrä tertiary-värillä keskellä, hover tummenee.
- Hero backdrop: kuva + video (`autoplay muted loop playsinline preload=metadata poster`), object-position muuttujalla, + grain + wash + fade. Video piilotetaan reduced motionissa (poster jää).
- Ruutukaappaus: kehys 6/8 px border muted-väri (laitteen reunus), desktop radius 16 max 960, mobiili radius 24 max 256; kuvateksti alla 36 px välillä.
- Muotokuva: pyöristetty neliö 56 ... 128, tausta portrait-well.
- Kortin media kortin yläosassa radius 0 (kortti leikkaa).
- Ei hover-zoomia kuville.
Tiedosto: components/media.html

## 06.10 Badget, tagit ja chipit
Tag: pilleri, 1 px reuna currentColor, väri headline-muted, Figtree 400. Koot: 18/12 (oletus), s 20/14, m 24/16, l 28/18, xl 32/20 (korkeus/fontti). Käytetään kortin labelissa ja otsikon captionissa. Input-chip 18 px ympyrä.
Tiedosto: components/badges.html

## 06.11 Kortit
- Perus: surface, radius 24, padding 24/36/48, sisällä text-ryhmä (gap 18 ... 24) ja footer (vaihtoehtoisesti 1 px yläviiva + padding).
- Label-rivi: caption + tag (korkeus 20 ... 24).
- Otsikko clamp 2 riviä, kuvaus clamp 3.
- Horisontaalinen: media 50 % (3/4) vasemmalla ≥768, muuten media yläosassa 4/3.
- "Long"-variantti: media kiinteä leveys 144/198/252, sisältö rivinä.
- CTA-kortti: nappi oikeassa alakulmassa negatiivisella marginaalilla.
- Henkilö: muotokuva 56 ... 72 + nimi/rooli.
- Karusellissa autoplay: nykyinen kortti surface-subtle, muut "receded" surface-väriin, transition 0,3 s.
- **Käyttötapauskortti**: surface, radius 24, ylhäällä kuva (3/2 tai 4/3, radius 0), sisältö padding 24/48/64; sisällössä otsikkoryhmä, feature-tilet, todiste-rivi (1 px yläviiva) ja lainaus sivussa (2 saraketta, gap 64, kun kontti > 928).
Tiedosto: components/cards.html

## 06.12 Lomakkeet
- Tekstikenttä: surface-väri (input-surface), radius 20, min-height 72, padding 12 x 16, gap 12; vasemmalla 32 px ikoni muted; body: label (16/22 muted) + arvo (18/24). **Kelluva label:** tyhjänä ja ilman fokusta vain label näkyy pystykeskellä; fokuksessa arvorivi kasvaa 0 → 24 px (height 0,2 s `--ease-standard`, opacity 0,14 s) ja label siirtyy ylös. Focus: outline 4 px koko kenttään. Virhe: inset 3 px red.
- Kenttäryhmä: pinotut kentät 2 px raoilla, vain ryhmän ulkokulmat 20.
- **Hintalomake (quote bar)**: kaksi kenttää + notch join + iso primary-nappi (xl 72 px) rivissä ≥1025; tabletilla pinottuna max 480 keskellä; nappi l 64 px.
- Checkbox/radio: laatikko 24/28/32, radius 6 (radio 999), tausta input-box.
- Slider: rata 4 px pilleri, kulunut osa teal-300; nuppi 24 px ympyrä primary-värillä, hover tummenee.
- Segmented (valinta): rata pilleri padding 4, label 48 px 600 18; valittu pilleri liukuu `transform: translateX(index * 100%)` 0,26 s.
Tiedosto: components/forms.html

## 06.13 Interaktiiviset komponentit
- **Accordion**: `<details>`; kohteet 1 px dividerillä ja 12 px välillä; summary padding 12 0, kysymys 600 20/24 (l: 24/32), chevron 28 px kääntyy 180° 0,15 s; sisältö avautuu `::details-content` grid-template-rows 0fr → 1fr 0,32 s `--ease-emphasis` (sulku `--ease-in-out`), opacity mukana; vastaus 300 18/24, padding-right 48. Hover: kysymys muuttuu body-väriin.
- **Karuselli**: natiivi scroll-snap (x mandatory), piilotettu scrollbar, full bleed -rata, gap 24, kortit max 100% - 56 px (seuraava kurkistaa). Yläpalkki: otsikko + nuolinapit (ikoni-napit l 64 px, tertiary) + toistonappi. Alla sivuindikaattori: pisteet 8 px, aktiivinen venyy 32 px leveäksi (0,26 s) ja sen sisällä täyttö liukuu 6 s lineaarisesti (autoplay-edistyminen), pysähtyy hoverilla/fokuksella. Rail-variantit muuttuvat staattiseksi riviksi md/lg/xl-leveydellä.
- **Käyttötapausrata**: vaakarata, suljetut kortit 352 px (448 ≥1025); klikattu kortti saa `data-open` ja laajenee 100 % leveäksi, sulje-nappi oikeassa yläkulmassa. Morph View Transitionsilla: ryhmä 0,46 s `--ease-in-out`, image-pair radius 24, vanha sisältö fade out 0,18 s `--ease-exit`, uusi fade in 0,3 s viiveellä 0,14 s. Mobiilissa avautuu koko ruudun dialogina.
- **Aikajana**: vaakasuora, vaiheet ympyrä-bulleteilla (72/80/96 px, numero sisällä) ja 4 px viivalla; viimeinen viiva voi jatkua ruudun reunaan. Piirtyminen näkyviin tullessa: viiva scaleX 0 → 1 lineaarisesti, bullet scale .9 → 1 + fade, sisältö y 8 → 0 + fade; kukin vaihe viivästyy 0,62 s (beat).
- **Kartta + lainaukset**: pinnit 96 px laatikossa, laatta 58 px radius 9 + 3 px rengas; hover 66 px radius 13; valittu 88 px radius 16 + 4 px oranssi rengas (0,15 s). Valinta vaihtaa lainauksen alla olevassa snap-karusellissa.
- **Modaali**: ks. 05.8.
- **Cookie banner**: fixed oikea alakulma 12/24 px, 480 px, overlay radius 24, sisään translateY(12px) 0,24 s.
Tiedosto: components/interactive.html

## 06.14 Osiotyypit
- **Hero (lead)**: backdrop-media + keskitetty monirivinen H1 + hintalomake tai CTA + tumma hero strip (3 kohdetta tai 3 stat-lukua).
- **Section header**: keskitetty, caption/tag + display H2 + alaotsikko (max 888), gap 24/28/32, valinnainen nappi.
- **Feature grid**: 3 ... 4 tileä rinnakkain, ikonilaatta + otsikko + teksti.
- **Logo wall**: 2 sarakkeen solut 2 px raoilla, solut surface-subtle, logot muted-värisinä maskeina.
- **Testimonial**: quote block (Owners 700 isoina), muotokuva + nimi + yrityksen logo oikealla.
- **Laskuri**: kaksi paneelia notch joinilla, vasemmalla syötteet (label + pieni kenttä + slider), oikealla tulos ja erittelytaulukko.
- **FAQ**: green-teema, vasemmalla otsikko + CTA, oikealla accordion l.
- **Yhteystiedot**: kontaktikortit (muotokuva 96 → 128, radius 24, toimintonapit tertiary).
- **CTA band**: asphalt, keskitetty display-kysymys + primary-nappi s.
Tiedosto: components/sections.html

## 06.15 Muut
- Notch join (components/forms.html), digit tile / passcode (surface-subtle radius 12), order summary (rivit dividerein), banner (surface-sunken radius 12, ikoni 24), app banner (surface-sunken radius 24, QR ≥768), taulukko (dividerit, luvut tabular).
