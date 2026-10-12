# 02 Color

Kaikki arvot luettu livesivun CSS-muuttujista (`--bx-color-*`, `[data-bx-theme]`). Merkintä (CSS-sääntö) ellei toisin mainita.

## 02.1 Paletti
| Token | Hex | Alkuperäinen | Käyttö | Osuus (arvio) |
|---|---|---|---|---|
| --palette-birch | #fffef7 | --bx-color-birch | sivun pohja, kortit tummissa teemoissa, napit tummissa | 35 % |
| --palette-asphalt | #12110e | --bx-color-asphalt | otsikot, päänappi, tummat osiot | 25 % |
| --palette-grey-50 | #f1eee6 | grey-50 | vaaleanharmaa osio, kortit, kentät | 20 % |
| --palette-grey-100 | #e2ded4 | grey-100 | upotettu pinta, tertiary-nappi | 3 % |
| --palette-grey-200 | #ccc6ba | grey-200-sand | divider, pressed, sliderin rata | 2 % |
| --palette-grey-300 | #b7afa0 | grey-300 | aikajanan merkit, faint-teksti | <1 % |
| --palette-grey-400 | #a09786 | grey-400 | muted tummissa teemoissa | <1 % |
| --palette-grey-500 | #8a7f6b | grey-500 | muted-teksti, focus-rengas | 2 % |
| --palette-grey-600 | #726958 | grey-600 | linkin hover | <1 % |
| --palette-grey-900 | #2a2721 | grey-900 | leipäteksti, päänapin hover | 5 % |
| --palette-teal-800 | #205058 | teal-800 | laskuri-osion teema | 5 % |
| --palette-green-900 | #0f3123 | green-900 | FAQ-osion teema | 4 % |
| --palette-orange-500 | #fd6a31 | orange-500 | signaali: valittu pinni, lähtöpiste | <1 % |
| --palette-red-500 | #fd4a61 | red-500 | virhe, kartan "to" | <1 % |
| --palette-teal-300 | #85cdd9 | teal-300 | sliderin kulunut osa | <1 % |

Täydet rampit (50 ... 950) red, orange, teal ja green: katso tokens.css-kommentit ja sivun CSS. Grey-ramppi on lämmin (keltaruskea vivahde), ei sininen.

## 02.2 Semanttiset roolit
| Rooli | birch | light-grey | teal | green | asphalt |
|---|---|---|---|---|---|
| Osion tausta | birch | grey-50 | teal-800 | green-900 | asphalt |
| Otsikko | asphalt | asphalt | birch | birch | birch |
| Leipä | grey-900 | grey-900 | grey-100 | grey-100 | grey-100 |
| Muted | grey-500 | grey-500 | sand | grey-400 | grey-400 |
| Kortti | grey-50 | birch | birch | birch | birch |
| Kenttä | grey-50 | birch | birch | birch | grey-950 |
| Päänappi | asphalt / birch-teksti | sama | birch / asphalt-teksti | sama | sama |
| Divider | sand | sand | teal-600 | green-700 | grey-800 |
| Overlay | #f1eee6f2 | #e2ded4f2 | #2c707bf2 | #165038f2 | #1e1c17f2 |

Tummissa teemoissa kortit pysyvät vaaleina (birch), joten kortin sisällä käytetään vaalean teeman tekstivärejä (`.on-light` tokens.css:ssä).

## 02.3 Gradientit
Vain yksi: hero-median häivytys `linear-gradient(to bottom, transparent 65%, <seuraavan osion tausta>)`. Värivaihtoehdot birch, grey-50, teal-800, green-900, asphalt. Sliderin rata on kova kaksivärinen gradientti (kulunut teal-300 | jäljellä sand), ei pehmeä.

## 02.4 Overlayt
- Hero-video: grain-kuva 256 px tiilenä, opacity 0,3, mix-blend-mode overlay; wash `rgba(122,109,96,0.3)` mix-blend-mode lighten (lämmin usvainen sävy). Tee oma grain-PNG (älä käytä lähteen).
- Header ja valikot: overlay = teeman pinta 95 % alfalla (f2). Ei backdrop-filteriä.
- Dialogin scrim `rgba(18,17,14,0.7)`, valikon scrim `#12110e80`.
- Teksti median päällä: väri birch + text-shadow `0 1px 3px rgba(0,0,0,.45), 0 2px 16px rgba(0,0,0,.35)`.

## 02.5 Käyttösäännöt ja osuudet
Noin 75 % neutraali (birch, grey-50, asphalt), 20 % teemaosiot (teal, green), alle 5 % signaali (oranssi, punainen, teal-300). Oranssia ei koskaan käytetä napin taustana tai tekstinä.

## 02.6 Dark mode
Sivu kääntää koko paletin, kun käyttöjärjestelmä on tummassa tilassa ja `data-bx-palette` ei pakota vaaleaa: birch ↔ asphalt ja grey-ramppi käännetään (50 ↔ 950). Tokens.css: `:root[data-palette="auto"]`. Teemaosiot toimivat samoin.

## 02.7 Selection ja scrollbar
Ei havaittu sivustolla. Ehdotus: selection asphalt-tausta + birch-teksti. Karusellien scrollbar piilotettu (`scrollbar-width: none`).

## 02.8 Tilavärit
Success #00c853 / #29af77, warning = orange-500, danger red-500 (kentän virhe: `box-shadow: inset 0 0 0 3px red-500`). Info-banner: surface-sunken, radius 12.
