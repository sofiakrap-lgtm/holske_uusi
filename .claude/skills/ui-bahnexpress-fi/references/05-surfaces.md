# 05 Surfaces

## 05.1 Radius-asteikko ja käyttö
Asteikko: 2, 3, 4, 6, 8, 12, 16, 20, 24, 48, 999 px. (CSS-sääntö)
| Elementti | Radius |
|---|---|
| Napit, tagit, segmentit, slider, sivuindikaattori | 999 (pilleri) |
| Kortit, käyttötapauskortti, hero strip, laskuripaneeli, logo grid, kontaktikortti, cookie banner, iso modaali | 24 |
| Tekstikenttä, dropdown-arkki, quote-kortti, kenttäryhmä, notice-modaali | 20 |
| Dropdown-rivi | 16 |
| Thumbnail: radius-l / radius-m | 24 / 12 |
| Ruutukaappauskehys desktop / mobiili | 16 / 24 (mobiilissa 12 / 20) |
| Ikonilaatat ja muotokuvat 56-64 / 72-80 / 96 / 128 | 12 / 16 / 20 / 24 |
| Digit tile, banner, QR-laatta | 12 |
| Checkbox | 6 |
| Kartan quote-pinni 58 / 66 / 88 | 9 / 13 / 16 |

## 05.2 Varjot
Ei yhtään box-shadow-syvyysvarjoa. Box-shadowia käytetään vain renkaina: kartan pinni `0 0 0 3px surface-subtle` (hover `surface-disabled`, valittu `0 0 0 4px orange-500`), kentän virhe `inset 0 0 0 3px red-500`, footerin ylivieritystäyte `0 50vh 0 0 surface`.

## 05.3 Borderit ja dividerit
Divider 1 px `--color-border` (sand vaaleissa). Accordion-kohteiden välissä 1 px + 12 px väli. Hero stripin kohteiden välissä 2 px birch-viiva (näyttää raolta). Tag: 1 px currentColor. Ruutukaappauksen kehys: paksu 6 ... 8 px border muted-värillä (laitteen reunus).

## 05.4 Lasi ja blur
Ei backdrop-filteriä. "Frosted" vaikutelma tehdään 95 % peittävällä overlay-värillä (`#f1eee6f2`, tummassa `#1e1c17f2`). Header muuttuu läpinäkyvästä overlayksi ensimmäisen 96 px vierityksen aikana (scroll-timeline).

## 05.5 Opacity
Overlay 0,95. Hero grain 0,3. Hero wash 0,3 alfa. Scrim 0,5, dialogin scrim 0,7. Disabled käyttää värejä, ei opacitya.

## 05.6 Tekstuurit, kuviot ja dekoratiiviset muodot
- Hero grain: 256 x 256 px kohinakuva tiilenä, overlay-blend, opacity 0,3. Tee oma (esim. SVG feTurbulence → PNG).
- **Notch join** -silta: muoto, jonka leveys on 16 px ja korkeus 32 px (laskurissa 24 x 48), ylä- ja alareunassa puoliympyrän lovet (säde = puolet leveydestä). Väri = liitettävän pinnan väri. Pystysuuntainen versio (32 x 16) kun elementit pinotaan. Tekee kahdesta pilleristä/paneelista yhden "luun". Oma SVG components/forms.html-tiedostossa.
- Ei blobeja, ei kuvioita, ei viivapiirroksia.

## 05.7 z-index-kerrokset
Sticky elementit 1 ... 2, cookie banner 30, header 40 (johdettu), dropdown 50, modaali 60 (dialog top layer).

## 05.8 Kortit, paneelit ja modaalit
- Kortti: tausta surface, radius 24, `overflow: clip`, ei reunaa, padding 24 / 36 / 48, min-height 272 / 338 / 392.
- Paneeli (laskuri): surface-raised, radius 24, padding 24 / 36 / 48, gap 24 / 28 / 32.
- Hero strip: overlay-tausta, radius 24, kohteet padding 48 (36 ja 28x24 kapeammissa).
- Modaali iso: koko ruutu mobiilissa, radius 24 ≥768; sulje-nappi oikeassa yläkulmassa 12 px. Notice: 320 ... 400 px, radius 20, padding 24 ... 36.
- Dialogin sisääntulo: opacity 0 → 1 ja translateY(8px) → 0, 0,18 s ease-out; scrim fade 0,18 s.
