# Design

Holsken visuaalinen järjestelmä, yksinkertainen versio. Malli: bahnexpress.fi (omistajan valinta 10/2026). Rauhallinen, lähes yksivärinen pohja, väri tulee kuvista ja videosta. Lähteet: `src/styles/global.css`, komponentit `src/components/`.

## Periaatteet (omistajan palaute)
- Ei raskaita elementtejä: ei koko ruudun kuvabanneria, ei kuvakehyksiä, ei varjoja napeissa.
- Napit yksinkertaisia: "Ota yhteyttä", musta pilleri.
- Puhelinnumero näkyy vain Yhteystiedot-sivulla. Muualla "Ota yhteyttä" vie sinne.
- Ruudukko, jossa kuva on keskellä ja solut ympärillä (`Bento.astro`), on talon tunnusmerkki. Käytä sitä uusissa osioissa.

## Värit (vaalea / tumma)
| Token | Vaalea | Tumma | Käyttö |
|---|---|---|---|
| `--bg` | #ffffff | #161615 | pohja |
| `--surface` | #f5f3ef | #1f1f1d | vuorottelevat osiot, kortit |
| `--sand` | #ece8e1 | #262624 | joka toinen kortti |
| `--ink` | #262626 | #f2efe9 | otsikot, napit |
| `--ink-2` | #3d3c39 | #d9d5cd | leipäteksti |
| `--muted` | #6b6964 | #a8a49c | toissijainen teksti |
| `--green-fill` | #555936 | #555936 | oliivi: yksi korostussolu per ruudukko, hero-paikka |

Omistajan paletti: oliivi #555936, ruoste #8C451C, luu #D9D2C5, hiili #262626.

## Typografia
Geist Variable. Lausekirjoitus kaikkialla, ei isoja kirjaimia.
- H1 88/46px, 560, -0.035em, rivit omille riveilleen, sanat nousevat esiin (`SanaOtsikko`).
- H2 54/32px, 560, -0.03em. H3 26/20px, 560.
- Leipäteksti 18px, 1.55. Pieni selite 15px muted.

## Muodot
Kuvat ja kortit 24-28px kulmat, napit ja chipit pillereitä, kentät 14px. Ei varjoja korteissa.

## Komponentit
- `Header`: koko leveys, läpinäkyvä, vieritettäessä lasimainen (IntersectionObserver). Linkit ja "Ota yhteyttä".
- `SanaOtsikko`: sana kerrallaan nouseva otsikko, rivit `|`-merkillä.
- `HeroMedia`: neliövideo `public/video/<nimi>.mp4` (+ `-poster.jpg`, `.webm`). Ilman videota oliivi neliö.
- `Bento`: kuva keskellä, solut vasemmalla ja oikealla, viimeinen solu voi olla oliivi linkki.
- `RullaLuku`: numerot rullaavat paikalleen kuin matkamittari.
- `Ukk`: haitari, yksi auki kerrallaan.
- `CtaOsio`: yksi kysymys ja yksi nappi.
- `PalveluKaruselli`: iso kuva vasemmalla, teksti ja kolme kohtaa oikealla, nuolinapit ja pyyhkäisy.
- `TyoVaiheet`: kolme välilehteä, kuva vaihtuu ristihäivytyksellä, vaihtuu itsestään 6 s välein.
- `Galleria`: liukuva kuvanauha kansiosta `assets/kuvat/galleria/` (pysähtyy hoverilla).
- `Kuva` + `vara`: jokaisella kuvapaikalla oma nimi ja varakuvat, kuvat saavat toistua.

## Etusivu
Hero (otsikko + neliökuva/video) · kolme lupausta kuvineen · palvelukaruselli · kattotyöt (Bento) · katon merkit (Bento) · huoltovälit (rullaavat luvut) · maalaus (Bento) · galleria · työn vaiheet (välilehdet) · meistä kuvalla · usein kysyttyä · lopetus.

## Liike
Sanat nousevat 0.9s, porrastus 80ms. Osiot nousevat vierityksessä. Numerot rullaavat 1.4s. Kuvat zoomaavat 1.03 hoverissa. Napit painuvat 0.97. Kaikki pois, kun käyttäjä toivoo vähemmän liikettä.
