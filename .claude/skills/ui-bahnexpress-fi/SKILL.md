---
name: ui-bahnexpress-fi
description: UI-tyylijärjestelmä sivustolta bahnexpress.fi: tokenit, typografia, komponentit ja motion. Käytä kun rakennetaan sivua bahnexpress.fi-tyyliin tai yhdistetään sen osia muihin ui-skilleihin.
---

# ui-bahnexpress-fi

Lähde: https://www.bahnexpress.fi, poimittu 2026-10-12 kloonaa-ui:lla suoraan livesivun CSS:stä. 7 sivua, 6 sivupohjaa.
Tyyli lyhyesti: lämmin "koivu ja asfaltti" -neutraali pohja, jossa jokainen osio vaihtaa koko teeman (koivu, vaaleanharmaa, petrooli, metsänvihreä, asfaltti) ja otsikot ovat valtavia, leveitä, mustia versaaleja. Liike on hiljaista ja toiminnallista: liukuvat pillit, morphaavat kortit ja valikot, rullaavat numerot, ei koristeellisia scroll-revealeja.

## Pikakäyttö uudelle sivustolle
1. Lue references/01-design-dna.md kokonaan ennen kuin kirjoitat koodia.
2. Kopioi tokens.css projektiin ja lataa fontit ohjeen references/03-typography.md kohdan 03.1 mukaan (Archivo wdth 125 + Figtree).
3. Rakenna sivun runko references/04-layout.md:n mukaan ja valitse osiot references/10-pages.md:n sivupohjista. Anna jokaiselle osiolle data-theme.
4. Käytä components/*.html-tiedostoja pohjana. Vaihda sisältö, älä tyylejä.
5. Lisää motion/motion.css ja motion/motion.js. Tällä sivustolla EI käytetä yleisiä data-reveal-ilmestymisiä; liike tulee komponenteista (references/07-motion.md).
6. Tarkista references/08-responsive.md:n taulukko ja references/09-accessibility.md.
7. Jos tarvitset komponentin, jota sivustolla ei ole, johda se DNA:n periaatteista ja lähimmästä komponentista.
8. Valmis englanninkielinen rakennusprompti tekoälytyökaluille: references/13-build-prompt.md.

## Moduulit
| # | Tiedosto | Tokenit | Vaihdettavissa |
|---|---|---|---|
| 01 | references/01-design-dna.md | ei | ei (kirjoita yhdistelmälle oma) |
| 02 | references/02-color.md | @module 02-color | kyllä |
| 03 | references/03-typography.md | @module 03-typography | kyllä |
| 04 | references/04-layout.md | @module 04-layout | kyllä |
| 05 | references/05-surfaces.md | @module 05-surfaces | kyllä |
| 06 | references/06-components.md + components/ | @module 06-components | kyllä |
| 07 | references/07-motion.md + motion/ | @module 07-motion | kyllä |
| 08 | references/08-responsive.md | ei | seuraa 04:ää |
| 09 | references/09-accessibility.md | ei | tarkista aina |
| 10 | references/10-pages.md | ei | kyllä |
| 11 | references/11-visual-reference.md | ei | ei |
| 12 | references/12-sources-licensing.md | ei | ei |
| 13 | references/13-build-prompt.md | ei | lisämoduuli |

## Yhdistäminen muihin ui-skilleihin
- Token-nimet ja moduulirajat ovat samat kaikissa ui-skilleissä. Vaihda moduuli korvaamalla tokens.css:n lohko `/* @module NN-nimi:start */` ... `:end` toisen skillin vastaavalla.
- Komponentit viittaavat vain semanttisiin tokeneihin, joten ne toimivat vaihdetuilla lohkoilla.
- Tarkista kytkökset: typografia ↔ layout, typografia ↔ napit, väri ↔ varjot, motion ↔ hover-kestot.
- Tämän skillin erikoisuus: osioteemat ([data-theme]) ovat tokens.css:n lopussa moduulien ulkopuolella. Jos vaihdat väripaletin, kirjoita myös teemat uudelleen.
- Kirjoita yhdistelmälle lyhyt DNA, joka ratkaisee ristiriidat, ja merkitse tokens.css:n alkuun lähteet.

## Säännöt
- Älä koskaan käytä raaka-arvoja komponenteissa. Käytä tokeneita.
- Älä käytä lähdesivuston logoja, tekstejä, kuvia, videoita, grain-tekstuuria tai lisensoituja fontteja (references/12-sources-licensing.md).
- Ei varjoja, ei gradientteja painikkeissa, ei backdrop-blur-lasia: syvyys tehdään sävyaskelilla, 2 px raoilla ja renkailla.
- Jokainen osio on yksi teema koko leveydeltä. Teemat vuorottelevat, kaksi samaa peräkkäin vain jos toinen on kuvallinen.
- Isot otsikot: leveä groteski, paino 900, versaalit, line-height = font-size, keskitetty, text-wrap: balance, ja pienennys askel kerrallaan jos pisin sana ei mahdu.
