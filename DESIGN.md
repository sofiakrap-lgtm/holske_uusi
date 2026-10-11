# Design

Holsken visuaalinen järjestelmä, yksinkertainen versio. Suunta: alan standardi huippulaatuisena, valokuvavetoinen. Lähteet: `src/styles/global.css`, komponentit `src/components/`.

## Tunnelma
Selkeä ja luotettava. Iso valokuva, lyhyt lupaus, puhelinnumero. Oliivi pääväri, ruoste vain soittamiseen, luunvaalea pohja. Ei eyebrow-otsakkeita, ei piirrettyjä kuvituksia, ei ajatusviivoja.

## Värit (vaalea / tumma tila)
Omistajan paletti: oliivi #555936, ruoste #8C451C, luu #D9D2C5, hiili #262626.

| Token | Vaalea | Tumma | Käyttö |
|---|---|---|---|
| `--bg` | #efebe3 | #1d1c1a | sivun pohja |
| `--surface` | #f7f4ee | #262626 | kortit |
| `--sand` | #d9d2c5 | #2c2b28 | vaihtuvat osiot ja kortit |
| `--ink` | #262626 | #efebe3 | teksti |
| `--muted` | #5d5a52 | #b9b2a5 | toissijainen teksti |
| `--green` | #555936 | #c9cc9f | otsikot ja linkit (oliivi tekstinä) |
| `--green-fill` | #555936 | #555936 | oliivipinnat (esittelysolu, yhteyspaneeli) |
| `--green-deep` | #262626 | #141413 | footer |
| `--orange` | #8c451c | #b65e2c | vain soittonapit, teksti valkoinen |

Kontrastit tarkistettu (WCAG AA): oliivi pohjalla 6.2:1, ruostenappi 7.0:1, hiili pohjalla 12.7:1.

## Typografia
- Archivo Variable. H1 720 / stretch 112 %, enintään 5rem. H2 680 / 108 %. H3 640.
- Teksti 18 px, rivinväli 1.6.

## Muodot
Yksi järjestelmä: pinnat, kortit ja kuvat 16px, napit ja pienet ohjaimet 10px. Varjo kuusenvihreään sävytetty.

## Etusivun osiot (jokaisella eri asettelu)
1. Hero: koko leveyden valokuva ja tumma liukuvärihuntu, otsikko, lause, Soita ja sähköposti vasemmassa alakulmassa. Ilman kuvaa vihreä pinta.
2. Kattotyöt: bento-ruudukko (vihreä esittelysolu, kuva, viisi palvelusolua vuorotellen vaalea ja hiekka).
3. Merkit: kuva ja tarkistuslista rinnakkain.
4. Huoltovälit: neljä isoa lukua hiekkapohjalla.
5. Maalaus: teksti ja alapalvelut, kuva oikealla.
6. Vaiheet: kolme numeroitua vaihetta.
7. Muut palvelut: kuvakortit.
8. Meistä: iso lause ja yritystiedot.
9. Yhteys: vihreä paneeli, iso numero.

## Kuvat
Kuvat kansioon `assets/kuvat/` (nimet README:ssä). Kuvapaikka katoaa, jos kuvaa ei ole, joten sivu toimii myös ilman kuvia.

## Ikonit
Phosphor (`@phosphor-icons/core`, regular) komponentin `Icon.astro` kautta.

## Liike
Hillitty: kuvat nousevat esiin vierityksessä, kortit nousevat 3px hoverissa, napit painuvat. Kaikki pois, kun käyttäjä toivoo vähemmän liikettä.
