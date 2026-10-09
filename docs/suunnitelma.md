# Suunnitelma: holske.fi uudelleenrakennus

Tila: odottaa hyväksyntää.

## 1. Sivukartta ja URLit

| Sivu | URL | Tärkein hakusana |
|---|---|---|
| Etusivu | `/` | kiinteistöhuolto pääkaupunkiseutu, omakotitalo |
| Palvelut | `/palvelut/` | kiinteistöhuolto omakotitalo |
| Katot | `/palvelut/katot/` | katon maalaus, kattoremontti, kattomaalaus Vantaa |
| Maalaus | `/palvelut/maalaus/` | talon maalaus, seinien maalaustyöt, julkisivuremontti |
| Painepesu | `/palvelut/painepesu/` | painepesu Helsinki, katon pesu, terassin pesu |
| Lumityöt | `/palvelut/lumityot/` | lumityöt Espoo, katon lumenpudotus |
| Piha- ja puutarhatyöt | `/palvelut/pihatyot/` | pihatyöt, ruohonleikkuu, puutarhatyöt |
| Hintalaskuri | `/hintalaskuri/` | maalaustyön hinta, katon maalaus hinta |
| Ilmainen kuntoarvio | `/kuntoarvio/` | ilmainen kuntoarvio, tarjouspyyntö |
| Meistä | `/meista/` | perheyritys Vantaa |
| Yhteystiedot | `/yhteystiedot/` | |
| Tietosuojaseloste | `/tietosuojaseloste/` | |

Muut ulkokorjaukset esitellään /palvelut/-sivulla omana osionaan (ei omaa sivua, koska sisältöä on vähän).

Kaikki 27 vanhaa URLia ohjataan 301:llä, lista: `archive/url-lista.md`.

## 2. Sivujen osiot

**Header (kaikilla sivuilla):** logo, valikko (Palvelut, Hintalaskuri, Meistä, Yhteystiedot), puhelin klikattavana, nappi "Varaa ilmainen kuntoarvio". Mobiilissa: logo, puhelinikoni ja valikko. Kuntoarvio-nappi kiinteänä alareunassa.

**Etusivu**
1. Hero: iso kuva, H1 "Kiinteistöhuoltoa omakotitaloille pääkaupunkiseudulla", nappi kuntoarvioon ja toinen puhelimeen
2. Luottamusrivi: yli 25 vuoden kokemus, pieni perheyritys, kotitalousvähennys, nopea reagointi
3. Lumityöt-nosto (sesonki): kytkettävä päälle ja pois tiedostosta
4. Palvelut korttiruudukkona ikoneineen (6 kpl), ei toistoja
5. Näin se toimii: 1. kuntoarvio, 2. tarjous, 3. työ, 4. jälkitarkastus *(vain jos vanhalta sivulta löytyy, muuten 3 vaihetta ilman keksittyjä lupauksia)*
6. Meistä lyhyesti: "Pieni perheyritys, tue paikallista tekijää"
7. Palvelualue: Helsinki, Espoo, Vantaa, Kauniainen
8. Kotitalousvähennys selitettynä
9. Loppu-CTA: ilmainen kuntoarvio

**Palvelusivut (sama pohja kaikille)**
Hero ja H1 → mitä työ sisältää → kenelle ja milloin → miten etenee → kotitalousvähennys → usein kysyttyä (vain vanhan sivun faktoista) → CTA. Lisäksi Service-schema ja FAQ-schema.

**Hintalaskuri:** katso kohta 4.

**Kuntoarvio:** lyhyt johdanto, lomake, mitä tapahtuu lähetyksen jälkeen (vastaus 1-2 vuorokaudessa, kuten vanhalla sivulla).

**Meistä:** tarina, arvot, palvelualue, Y-tunnus.

**Yhteystiedot:** puhelin, sähköposti, osoite, kartta-linkki (ei upotettua karttaa, se hidastaa ja vaatii evästeitä).

**Footer:** Holske Oy, Y-tunnus 3419162-6, Pyörärinne 4, 01280 Vantaa, info@holske.fi, puhelin, linkit, evästeasetukset.

**Kampanjabanneri:** `src/data/kampanja.json` (päällä/pois, teksti, linkki, päättymispäivä). Piiloutuu automaattisesti päättymispäivän jälkeen.

## 3. Tekniikka

- **Astro 5**, `output: static`. Ei palvelinta, ei tietokantaa.
- **Ei UI-kirjastoja.** Oma CSS (design tokens), noin 5 kt JS:ää vain laskuriin, lomakkeeseen, valikkoon ja evästebanneriin.
- **Kuvat:** Astron `<Picture>` → AVIF ja WebP, oikeat koot, lazy loading.
- **Ikonit:** teen itse yhtenäisinä SVG-viivaikoneina.
- **Fontti:** nykyinen fontti säilyy, ladataan omalta palvelimelta (ei Google-palvelimelta), nopeampi ja GDPR-ystävällisempi.
- **Ilme (apple-design):** paljon tilaa, isot kuvat, tarkka typografia, hillityt ja nopeat animaatiot, reduced-motion-tuki, isot napit (vähintään 48 px), perusfontti 18 px.
- **Lomake:** Web3Forms → info@holske.fi, honeypot, avain tiedostossa `.env`.
- **Analytiikka:** GA4 ja Facebook-pikseli latautuvat vasta suostumuksen jälkeen (Google Consent Mode v2).
- **SEO:** title ja description joka sivulle, Open Graph, sitemap.xml, robots.txt, LocalBusiness-schema (HomeAndConstructionBusiness), palvelualueena pääkaupunkiseutu.
- **Cloudflare Pages:** build `npm run build`, output `dist`, `_redirects` ja `_headers` mukana.
- **Muokattava sisältö:** `src/content/palvelut/*.md`, `src/data/yhteystiedot.json`, `src/data/kampanja.json`, `src/data/hinnasto.json`.

## 4. Päätettävät asiat

1. **Hintalaskuri.** Vanhalla sivulla ei ollut laskentaa: ei hintoja, kertoimia eikä kaavaa. Hintoja en keksi. Ehdotus:
   - Rakennan laskurin valmiiksi: palvelu → koko (m²) → kunto → lisätyöt, tuloksena hinta-arvio ja hinta kotitalousvähennyksen jälkeen.
   - Hinnat tulevat tiedostosta `src/data/hinnasto.json`, jonka täytätte itse.
   - Niin kauan kuin hinnat puuttuvat, laskuri toimii ohjattuna tarjouspyyntönä: kerää tiedot ja vie ne valmiiksi täytettynä kuntoarviolomakkeelle.
2. **Kuvien lähetys lomakkeella.** Web3Formsin ilmaisversio ei tue liitteitä (maksullinen versio tukee). Ehdotus: ilmaisversio, ja lomakkeella teksti "Voit lähettää kuvat vastaamalla vahvistusviestiimme". Myöhemmin voi vaihtaa maksulliseen ilman koodimuutoksia.
3. **Puhelinnumero:** +358 50 3233075 (löytyi vanhalta sivulta, tulee klikattavaksi).
4. **Fontti:** vanha sivu käyttää Montserrat, DM Sans ja Forum. Ehdotus: otsikot Forum (arvokas, skandinaavinen), leipäteksti DM Sans (selkeä, hyvin luettava).
