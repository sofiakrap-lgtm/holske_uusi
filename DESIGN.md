# Design

Holsken visuaalinen järjestelmä. Pohja: Bahnin mitattu tyylijärjestelmä (`.claude/skills/ui-bahnexpress-fi/`, poimittu bahnexpress.fi:n CSS:stä 10/2026) Holsken paletilla ja sisällöllä. Lähteet: `src/styles/global.css`, `src/components/`.

## Periaatteet
- Jokainen osio on yksi teema koko leveydeltä (`data-theme`): koivu, vaaleanharmaa, oliivi, metsä, hiili. Teemat vuorottelevat.
- Display-otsikot: Archivo leveänä (font-stretch 125 %), paino 900, versaalit, keskitetty, rivikorkeus = koko. 2-4 sanaa. Liian pitkä sana pienennetään askel kerrallaan (`data-fit`).
- Leipäteksti Figtree 300, alaotsikot ja selitteet Figtree 600.
- Ei varjoja, ei sumennusta, ei gradientteja napeissa. Syvyys sävyaskelilla ja 2 px raoilla.
- Napit pillereitä (xs 40, s 48, m 56, l 64, xl 72 px), kortit ja media 24 px.
- Liike on toiminnallista: liukuva valintapilleri navigaatiossa, rullaavat numerot, haitari, karusellin nuolet. Ei koristeellisia vieritysilmestymisiä.
- Puhelinnumero vain Yhteystiedot-sivulla. Muualla "Ota yhteyttä".
- Kuva keskellä -ruudukko (`Bento`) on Holsken oma tunnusmerkki.

## Paletti
| Token | Arvo | Käyttö |
|---|---|---|
| `--p-birch` | #fffef7 | koivu-teeman pohja, kortit tummissa teemoissa |
| `--p-grey-50` | #f1eee6 | vaaleanharmaa teema, kortit koivulla, footer |
| `--p-grey-100` | #e2ded4 | toissijaiset napit, hiekkasolut |
| `--p-asphalt` | #262626 | päänappi, hiili-teema, korostussolu |
| `--p-olive` | #555936 | oliivi-teema (Holsken pääväri) |
| `--p-forest` | #2e3120 | metsä-teema (usein kysytyt) |
| `--p-rust` | #8c451c | signaaliväri, vain pienet merkit |
| `--muted` | #625a4c | toissijainen teksti vaaleilla pohjilla (AA kaikilla vaaleilla sävyillä) |

## Typografia
| Rooli | Desktop / tabletti / mobiili |
|---|---|
| Hero rivi 1 (Archivo 900 versaali) | 96 / 72 / 48 px, sovitetaan |
| Hero rivi 2 | 80 / 56 / 48 px |
| Hero rivi 3 (Archivo 500) | 44 / 40 / 26 px |
| Osio-otsikko H2 | 72 px asti, clamp ja sovitus |
| Kortin otsikko (Archivo 500) | 24-28 px |
| Leipä (Figtree 300) | 20 / 20 / 18 px |
| Alaotsikko (Figtree 600) | 24 / 20 / 18 px |
| Luku (Archivo 700, +1.8px, tabular) | 56 / 48 / 40 px |

## Asettelu
Kontti 1440 px, gutter 24 / 36 / 48. Osion padding 96 / 128 / 144. Otsikosta sisältöön 48 / 56 / 64.

## Etusivu (teema)
Hero + tumma kolmen sarakkeen paneeli (taustakuva/video tasaisesti tummennettu, hento kohina, ei tekstivarjoa; etusivulla yläusva ja häivytys, palvelusivuilla ei) · Katot ja seinät -palvelurata (vaaleanharmaa) · Kaikki kattotyöt (koivu, Bento) · Katon merkit (oliivi, Bento) · Huoltovälit (hiili, rullaavat luvut) · Talon maalaus (vaaleanharmaa, Bento) · Näin työ etenee (koivu, välilehdet) · Katot ja pihat -galleria (vaaleanharmaa) · Kysymyksiä (metsä) · Lopetus (hiili) · Footer (vaaleanharmaa).

## Komponentit
`HeroLead`, `Bento`, `PalveluKaruselli`, `Huoltovalit` + `RullaLuku`, `TyoVaiheet`, `Galleria`, `Ukk`, `CtaOsio`, `Header` (segmenttinavigaatio, mobiiliarkki), `Footer`, `Kuva` (varakuvat).

## Päivitys: napit, kuvat ja palvelusivut

- Napit matalampia: `.btn` 44 px, `.btn--iso`/`.btn--l` 50 px (56 px desktop), yläpalkin nappi ja navigaatio 36-38 px.
- Kuvan päällä `.btn--kuvalla`: vaalea pohja 72 % peittävyydellä, tumma teksti 82 %, ei sumennusta.
- Bento-solut: otsikot ylhäällä samalla tasolla, pyöreä ikonimerkki (Phosphor) jokaisessa solussa, linkkisoluissa nuoli.
- Palvelusivu: ingressi pääosiossa (kuva hieman sumeana, ei näkyvää murupolkua, BreadcrumbList vain schemassa), teksti + kaksi kuvaa pinossa (`<kuva>-3`, `<kuva>-4`), Tiesitkö-nosto (frontmatter `tiesitko`), Näin työ etenee, Lyhyesti-osio galleriaan, Muut palvelut kuvakortteina.
- Ikonit: Phosphor, ikonilaatat pyöristettyinä neliöinä (12-16 px) light-painolla. Alapalvelun ikoni frontmatterissa (`alapalvelut[].ikoni`).
- Näin työ etenee (`Vaiheet.astro`): neljä korttia, välissä nuoli (mobiilissa alas). Etusivu, palvelusivut, yhteystiedot.
- Huoltovälit: luvut oliivipohjalla. Header-logo tekstin värinen. Hero-paneelin jakajat 1 px, 12 % peittävyys.
