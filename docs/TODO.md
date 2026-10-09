# Avoimet asiat (TODO)

## Odottaa teiltä
1. **Omat hinnat**: laskurissa on nyt väliaikaiset alan keskihinnat (`src/data/hinnasto.json`). Korvataan kyselyn vastauksilla (suomi: https://claude.ai/artifact/XrQRG5UxsHqbSjNit7ykYM, venäjä: https://claude.ai/artifact/1ERZELWpZwrJAaDoqgpYuZ).
2. **Lomakkeen testaus**: Web3Forms-avain on lisätty. Lähetä julkaisun jälkeen yksi testipyyntö ja tarkista, että se tulee osoitteeseen info@holske.fi.
3. **Kuvat** kansioon `assets/kuvat/` (10 kuvaa, nimet README:ssä).
4. **Logo** kansioon `assets/logot-ja-grafiikat/`: `logo.svg` ja `logo-valkoinen.svg`. Sen jälkeen `node scripts/luo-grafiikat.mjs`.
5. **Kotitalousvähennys**: päivitetty lukuihin 40 %, enintään 2 100 €, omavastuu 150 € (EV 122/2026 vp). Kun laki näkyy Finlexissä, vaihda `src/data/hinnasto.json` kentän `tila` teksti. Vuoden 2027 lopussa palautus 35 %:iin ja 1 600 €:oon, ellei uutta lakia tule.
5b. **Ennakkoperintärekisteri**: kertokaa, onko Holske Oy rekisterissä. Jos on, lisätään maininta sivulle (asiakkaan vähennyksen ehto). Laskuun työn osuus erikseen.
6. **Google Analytics**: aseta GA4:ssä tietojen säilytysajaksi 14 kuukautta (Admin > Data collection and modification > Data retention), koska tietosuojaseloste lupaa sen.
7. **Tarjouspyyntöjen säilytys 12 kk**: tietosuojaseloste lupaa poistaa tarjouspyynnöt, jotka eivät johda tilaukseen, 12 kuukauden jälkeen. Siivotkaa sähköposti sen mukaan.

## Julkaisun jälkeen
8. Cloudflare Pages ja domainin siirto (README kohdat 3 ja 4). Sähköpostin DNS-tietueet ensin.
9. Google Search Console: lisää holske.fi ja lähetä `https://holske.fi/sitemap-index.xml`.
10. Google Business Profile: tarkista, että nimi, osoite ja puhelin ovat samat kuin sivulla.
11. Vanha WordPress alas vasta, kun uusi sivu toimii.

## Myöhemmin
12. Referenssit ja asiakaskokemukset, kun asiakkailta on lupa.
