# Design

Holsken visuaalinen järjestelmä, yksinkertainen versio, suunta "harjakatto". Lähteet: `src/styles/global.css`, komponentit `src/components/`.

## Tunnelma
Kattoalan ammattilainen, ei esite. Leveä, raskas typografia, kuusenvihreät pinnat ja viivapiirrokset kuin rakennuspiirustuksesta. Oranssi on huomioväri, ei koriste. Ohuet viivat erottavat rivejä, ei kortteja eikä kuvakeruudukkoja. Ei eyebrow-otsakkeita.

## Värit
| Token | Arvo | Käyttö |
|---|---|---|
| `--bg` | #f1f2ed | sivun pohja |
| `--surface` | #fafaf7 | nostetut pinnat |
| `--sand` | #e4e7de | vaihtuvat osiot |
| `--line` | #cfd4c8 | erotinviivat |
| `--ink` | #141a15 | leipäteksti |
| `--muted` | #4a554b | toissijainen teksti |
| `--green` | #1f3a2c | hero, otsikot, linkit |
| `--green-deep` | #13241a | "merkit"-osio, footer |
| `--green-text-on` | #e8efe6 | teksti vihreällä |
| `--orange` | #ed9121 | soittonapit, yhteystietokaista, piirrosten uusi kerros. Teksti päällä #141a15. Ei koskaan tekstinä vaalealla. |

## Typografia
- Archivo Variable (wdth-akseli) kaikkialla.
- H1: paino 760, font-stretch 125 %, clamp(2.6rem, 6rem), line-height 0.98, tracking -0.025em. Mobiilissa stretch 110 %.
- H2: 700 / 118 %. H3: 650 / 108 %.
- Teksti 18 px, line-height 1.6, rivin mitta noin 40rem.
- Puhelinnumero CTA-kaistalla jättikokoisena (780, 125 %).

## Asettelu
- Leveys max 74rem, sivumarginaali clamp(1rem, 4vw, 2.5rem), osioväli clamp(4rem, 9vw, 7.5rem).
- Hero: vihreä, vasemmalle tasattu otsikko, alla talon julkisivupiirros (tai valokuva, kun se on lisätty).
- Sisältöosiot: kaksi saraketta (otsikko vasemmalla, rivit oikealla).
- Rivit: `dl`/`ul`, 1px viiva, 1,5rem pystyväli.

## Piirrokset (korvaavat puuttuvat kuvat)
- `TaloPiirros`: talon pääty, mittaviivat, tekstit HARJA / KATON KORKEUS / RÄYSTÄS. Piirtyy esiin.
- `KattoProfiili`: poikkileikkaus katon tyypin mukaan, uusi kerros oranssina.
- `Huoltovalit`: aikajana 0–30 v, palkit kasvavat vierityksessä.
- Kun valokuva lisätään `assets/kuvat/`, se korvaa piirroksen automaattisesti (`Kuva vainJosOn`).

## Komponentit
- `.btn` oranssi, kulmasäde 6 px, 52 px korkea.
- Header: valikko alle 64rem hampurilaisena, oranssi Soita-nappi.
- Mobiilin alapalkki: Sähköposti + Soita.
- `CtaOsio`: oranssi kaista, jättinumero, sähköposti, palvelualue.

## Liike
Hillitty: piirrokset piirtyvät, aikajanan palkit kasvavat, osiot nousevat esiin (vain translateY). Kaikki pois, kun käyttäjä toivoo vähemmän liikettä.
