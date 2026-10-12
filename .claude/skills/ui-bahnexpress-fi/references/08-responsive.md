# 08 Responsive

Mitattu CSS-säännöistä (@media ja @container). Kuvakaappausvertailua ei voitu tehdä (välilehti taustalla), joten kaikki rivit ovat "päätelty CSS:stä".

## 08.1 Breakpointit
sm 640 · **md 768** · **lg 1025** · xl 1280 · 2xl 1440 (+ 1345 karusellirail, 1536). Lisäksi container queryt komponenteissa.

## 08.2 Muutostaulukko
| Komponentti | < 768 (mobile) | 768 ... 1024 (tablet) | ≥ 1025 (desktop) |
|---|---|---|---|
| Gutter / section-gap / sub-gap | 24 / 48 / 24 | 36 / 56 / 28 | 48 / 64 / 32 |
| Osion pystypadding | 96 | 128 | 144 |
| Header inner padding | 24 / 12 | 36 / 24 | 36 |
| Header toimintanappi | xs 40 | s 48 | s 48 |
| Header nav | piilossa < 820 | näkyy ≥ 820 | näkyy, aux ≥ 1190 |
| Mobiilivalikko | ryhmät pinossa, vaakajakajat | ryhmät rinnakkain, pystyjakajat, alakulmat 24 | max 928 |
| Hero rivi 1 / 2 / 3 | 48 / 48 / 32 | 72 / 56 / 40 | 96 / 80 / 40 ... 48 |
| Hero-rivien väli | 8 | 10 | 12 |
| Hintalomake | pinottu, pystynotch, nappi 64 | pinottu max 480, nappi 64 | rivi, vaakanotch, nappi 72 |
| Hero strip | rivit, 2 px yläviivat | sarakkeet | sarakkeet, pad 48 |
| Section header -nappi | s | m | l |
| Kortti s/m/l | kaikki s (pad 24) | l → m (pad 36) | desktop-s/m/l |
| Horisontaalikortti | media ylhäällä 4/3 | media vasemmalla 50 % 3/4 | sama |
| Käyttötapaukset | oma puhelinkaruselli, kortit 240, avaus dialogina | rata 352 px kortit | rata 448 px kortit |
| Käyttötapaussisältö | pad 24 | pad 48 | pad 64, lainaus sivussa (> 928 kontti) |
| Laskuri | paneelit pinossa max 528, pystynotch | paneelit rinnakkain, vaakanotch, pad 36 | pad 48 |
| Feature grid | 1 sarake, tile vaakasuuntaan | kaikki rinnakkain | sama |
| Kontaktikortti | pinottu, pad 24 | pinottu, pad 36 | pad 48, kuva 128 |
| Ruutukaappaus | border 6, radius 12/20, mobiili max 192 | border 8, radius 16/24, max 216 | max 960 / 256 |
| Karusellin otsikko/nav väli | 24 (< 720 kontti) | 36 (< 952) | 48 |
| Footer sarakkeet | 1 | 2 (3 jos 3 saraketta) | 2, 4 ≥ 1440 |
| Footer alarivi | pinossa | rivi, space-between | rivi |
| Typografia | phone-* askeleet | tablet-* askeleet | perus |

## 08.3 Fluid-koot
Ei clamp-arvoja. Koot vaihtuvat porrastetusti breakpointeissa. Jos haluat fluidin version, käytä esim. display: `clamp(48px, 2.4rem + 4vw, 96px)` (johdettu, ei lähteestä).
