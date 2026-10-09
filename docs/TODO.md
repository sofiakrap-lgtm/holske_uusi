# Avoimet asiat (TODO)

## Teidän täytettävät
1. **Hinnat** hintalaskuriin: täyttäkää hinnastokysely (suomi: https://claude.ai/artifact/XrQRG5UxsHqbSjNit7ykYM, venäjä: https://claude.ai/artifact/1ERZELWpZwrJAaDoqgpYuZ). Hinnat siirretään tiedostoon `src/data/hinnasto.json`.
2. **Web3Forms-avain** lomakkeelle (README kohta 5). Ilman avainta lomake pyytää soittamaan.
3. **Kuvat** kansioon `assets/kuvat/` (10 kuvaa, nimet README:ssä).
4. **Logo** kansioon `assets/logot-ja-grafiikat/`: `logo.svg` ja `logo-valkoinen.svg`. Sen jälkeen favicon ja jakokuva uusiksi (`node scripts/luo-grafiikat.mjs`).
5. **Aukioloajat / puhelinajat**: `src/data/yritys.json` kenttä `aukioloajat` (ei vielä näkyvissä sivulla).
6. **Some-linkit** (Facebook, Instagram): `src/data/yritys.json`.
7. **Ruohonleikkuun kesäsopimus**: vanhalla sivulla vain paikkateksti. Kuvaus puuttuu (`src/content/palvelut/pihatyot.md`).
8. **Tietosuojaselosteen säilytysaika**: vanhassa versiossa luki "tietoja ei välttämättä erikseen poisteta ikinä". Lause poistettiin, koska se on GDPR:n vastainen. Määrittäkää tarkka säilytysaika.
9. **Kotitalousvähennyksen luvut** (35 %, omavastuu 150 €, enintään 1 600 €) ovat vuoden 2025 säännöistä. Tarkistakaa vero.fi:stä ja päivittäkää `src/data/hinnasto.json`.
10. **Referenssit ja asiakaskokemukset**: ei ollut vanhalla sivulla, joten niitä ei ole lisätty. Lisätään, kun saatte luvan asiakkailta.

## Julkaisu
11. Cloudflare Pages -projekti ja domainin siirto (README kohdat 3 ja 4). **Sähköpostin DNS-tietueet ensin.**
12. Google Search Console: lisää holske.fi ja lähetä `https://holske.fi/sitemap-index.xml`.
13. Google Business Profile (Google Maps): tarkista, että nimi, osoite ja puhelin ovat samat kuin sivulla.
14. Vanha WordPress-sivusto alas vasta, kun uusi toimii.
