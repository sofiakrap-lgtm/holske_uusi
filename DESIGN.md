# Design

Holsken visuaalinen järjestelmä, yksinkertainen versio. Lähteet: `src/styles/global.css`, komponentit `src/components/`.

## Tunnelma
Rauhallinen skandinaavinen esite. Iso kuva, yksi lause, puhelinnumero. Ohuet viivat erottavat rivejä, ei kortteja eikä kuvakeruudukkoja. Ei eyebrow-otsakkeita.

## Värit
| Token | Arvo | Käyttö |
|---|---|---|
| `--bg` | #f7f4ee | sivun pohja |
| `--surface` | #fffdf9 | nostetut pinnat |
| `--sand` | #ece6da | vaihtuvat osiot |
| `--line` | #e2dbcd | erotinviivat |
| `--ink` | #20261b | leipäteksti |
| `--muted` | #586050 | toissijainen teksti |
| `--green` | #37432d | otsikot, linkit, yhteystietokaista |
| `--green-deep` | #262f1f | footer |
| `--orange` | #ed9121 | vain soittonapit ja pienet merkit, teksti päällä #1d1609. Ei koskaan tekstinä vaalealla. |

## Typografia
- Otsikot: Forum 400, H1 clamp(2.5rem, 4.6rem), tracking -0.02em, line-height 1.04.
- Teksti: DM Sans, 18 px, line-height 1.6. Rivin mitta noin 40rem.
- Puhelinnumero yhteystietokaistalla Forumilla isona.

## Asettelu
- Leveys max 74rem, sivumarginaali clamp(1rem, 4vw, 2.5rem), osioväli clamp(4rem, 9vw, 7.5rem).
- Hero: keskitetty otsikko ja toiminnot, alla reunasta reunaan kuva (16:9 / 4:3 / 4:5).
- Sisältöosiot: kaksi saraketta (otsikko vasemmalla, rivit oikealla), tai kuva + teksti rinnakkain.
- Rivit: `dl`/`ul`, 1px viiva, 1,5rem pystyväli.

## Komponentit
- `.btn` oranssi pilleri 52 px, `.btn--secondary` reunaviiva.
- Header: läpikuultava, sumennettu, valikko alle 1024 px hampurilaisena.
- Mobiilin alapalkki: Sähköposti + Soita.
- `CtaOsio`: vihreä kaista, iso numero, sähköposti, palvelualue.
- `Kuva`: variantit hero, leveä, jaettu, kortti; paikkamerkki ennen kuvia.

## Liike
Hillitty: napin painallus scale 0.97, nuolet liikkuvat hoverissa, kuvat nousevat esiin vierityksessä. Kaikki pois, kun käyttäjä toivoo vähemmän liikettä.
