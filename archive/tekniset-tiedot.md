# Tekniset tiedot: holske.fi (vanha WordPress-sivusto)

Arkistoitu 2026-10-09 Apify web-fetchillä (raaka-HTML). Lähteenä ovat sivujen `<head>`, inline-skriptit ja CSS.

## Yritys- ja yhteystiedot (sivulta /palvelut-3/ "Yhteystiedot")
- **Yritys:** Holske Oy (og:site_name on kirjoitettu muotoon "Holske oY")
- **Y-tunnus:** 3419162-6
- **Puhelin:** +358 50 3233075. Tämä on sivuston ainoa puhelinnumero, eikä sitä ole linkitetty `tel:`-linkiksi.
- **Sähköposti:** info@holske.fi (ei `mailto:`-linkkiä)
- **Osoite:** Pyörärinne 4, 01280 Vantaa. Osoite näkyy vain mobiilinäkymän yhteystietolohkossa, ei työpöytäversiossa.
- **Toiminta-alue:** Pääkaupunkiseutu
- **Kokemus:** "Yli 25 vuoden" / "25 vuotta kokemusta", perheyritys

## Seuranta ja analytiikka
| Mikä | ID | Mistä löytyi |
|---|---|---|
| Google tag (gtag.js, Site Kitin lisäämä) | **GT-NFBTM8QZ** | `googletagmanager.com/gtag/js?id=GT-NFBTM8QZ&l=dataLayerPYS`, `gtag("config","GT-NFBTM8QZ")` |
| Google Analytics 4 (PixelYourSiten kautta) | **G-SGFH2ZKBL6** | `pysOptions.ga.trackingIds` |
| "Sign in with Google" (Site Kit) clientID | G-ZBK9WPFC0H | `data-siwg-config` (kentässä on G-alkuinen arvo, eli mahdollisesti virheellinen asetus) |
| Meta (Facebook) Pixel | **650402047995832** | PixelYourSite / Official Facebook Pixel (`pixelId`) |

UA-alkuisia (Universal Analytics) eikä GTM-alkuisia ID:itä ei löytynyt.

## Fontit
- **Google Fonts** (Astra-teeman kautta): `Montserrat` (400, 600), `DM Sans` (400, 500, 700), `Forum` (400)
  - URL: `https://fonts.googleapis.com/css?family=Montserrat:400,,600|DM+Sans:500,400,700|Forum:400&display=swap`
  - Käyttö CSS:ssä: DM Sans on yleisin (leipäteksti ja otsikot), Montserrat toiseksi yleisin, Forum vähän käytetty (display).
- **Elementorin globaalit typografia-asetukset** (oletusarvot, eli ei varsinaisesti muokattu): Roboto (primary 600, text 400, accent 500), Roboto Slab (secondary 400)

## Värit
Astra-teeman globaali paletti (`--ast-global-color-*`), joka on varsinainen brändipaletti:
| Muuttuja | Väri | Huom |
|---|---|---|
| color-0 / color-1 | **#EF820D** | Oranssi pääväri (eniten käytetty väri koko CSS:ssä) |
| color-2 | #1C0D0A | Lähes musta (tummanruskea) |
| color-3 | #353535 | Tummanharmaa teksti |
| color-4 | #FEF1E4 | Vaalea persikka-tausta |
| color-5 | #FFFFFF | Valkoinen |
| color-6 | #E5D7D1 | Vaalea beige |
| color-7 | #140B06 | Lähes musta |
| color-8 | #222222 | Tumma |

Muita usein käytettyjä värejä:
- **#0C4DA2**: sininen. Esiintyy paljon, todennäköisesti WPForms- tai painike-/linkkityyleissä.
- **#37432D**: tummanvihreä. Elementor-otsikot ja -tekstit esim. katon remontti -sivulla.
- **#ED9121**: oranssi. Faviconin taustaväri.
- **#9FCE00**: limenvihreä (Elementor global color, mukautettu).

Elementorin oletusvärit (`#6EC1E4`, `#54595F`, `#7A7A7A`) ovat jääneet asetuksiin, mutta ne eivät ole brändivärejä.

## Kesäkampanjan ponnahdusikkuna (Popup Maker, id 2891, slug `kesatarjous`)
Ikkuna on vain etusivulla. Se avautuu automaattisesti 500 ms viiveellä, ja suljettaessa asetetaan eväste `pum-2891` kuukaudeksi.

> **Kesän erikoistarjous!**
> Saat **15 % alennusta kaikista palveluista,** jos varaat ilmaisen kuntoarvion ennen kesäkuun loppua – vain rajoitetun ajan! Älä jää paitsi.
> Painike: "Varaa ilmainen kuntoarvio" → https://holske.fi/varaa-ilmainen-kuntoarvio/

## Alusta ja lisäosat
- WordPress 7.1.3, teema **Astra** (+ Astra Sites / Starter Templates)
- **Elementor** 4.3.4 (CSS print method: internal; Google Fonts käytössä)
- **WPForms Lite**: kaikilla sivuilla sama lomake id 1647, 6 kenttää, painike "Lähetä lomake". Lomakkeessa on virheitä: puhelinnumero- ja osoitekenttä ovat tyypiltään `email`.
- Contact Form 7 (asennettu, ei näkyvää lomaketta)
- **Popup Maker** (kesätarjous)
- **GDPR Cookie Compliance** (Moove): evästebanneri ja asetusikkuna, jossa kategoriat Välittömät evästeet, Google Analytics ja Facebook-pikseli
- **PixelYourSite** ja **Official Facebook Pixel** (Meta Pixel)
- **Site Kit by Google** 1.189.0
- **Rank Math SEO**: meta description, OG- ja Twitter-tagit, JSON-LD
- Faviconit: `cropped-Add-a-subheading-32x32/180x180/192x192/270x270.png`

## Havaittuja ongelmia vanhassa sivustossa
- Etusivun mobiiliosion painike "Palvelut" vie osoitteeseen **/tiimi/**, joka palauttaa **404**.
- Etusivun mobiiliosion painike "Meistä" vie väärin osoitteeseen /hinta-laskuri/.
- Meistä-sivun ja muutaman mobiilisivun painikkeet vievät osoitteeseen /yhteystiedot/, vaikka Yhteystiedot-sivun oikea slug on /palvelut-3/. Osoitteen /yhteystiedot/ toimivuutta ei tarkistettu.
- Lumityöpyynnön lomakkeen otsikossa on kirjoitusvirhe: "Lymityön hinta-arviopyyntö". Lisäksi slug on kirjoitettu muotoon "ruoronleikkuu".
- /pakettitarjoukset/ on Astra-demosisältöä englanniksi ("Web Design", "From $99"). /pakettitarjoukset-2/ on keskeneräinen Lorem ipsum -luonnos. /palvelut-2/ on tyhjä.
- /kela/, /maalaustyo-mob/ ja /julkisivu-mob/ ovat tyhjiä sivuja, joissa näkyy vain otsikko ja "Uncategorized / Kirjoittaja admin". Tekijän URL paljastaa käyttäjänimen `sofiakrap_ptrdzjaq`.
- /ruohonleikkuu-mob/ sisältää Elementorin paikkatekstiä ("I am text block...").
