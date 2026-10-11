# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Pääkaupunkiseudun (Helsinki, Espoo, Vantaa, Kauniainen) omakotitalojen omistajat, noin 35-80-vuotiaat. He huomaavat katossa sammalta, ruostetta tai haalistumista tai talon maalipinnan kuluneen, ja etsivät luotettavaa paikallista tekijää, jolle soittaa. Monet selaavat puhelimella, osa vanhempia käyttäjiä: tekstin on oltava selkeää ja isoa, yhteystietojen helposti löydettävissä.

## Product Purpose
Holske Oy:n verkkosivu. Kertoo rauhallisesti ja selkeästi, mitä Holske tekee (pääosassa kattoremontit, katon maalaus ja pinnoitus sekä talon maalaus) ja miten työ etenee, ja saa kävijän soittamaan tai lähettämään sähköpostia. Onnistuminen = yhteydenotto puhelimella tai sähköpostilla.

## Positioning
Pieni vantaalainen perheyritys, jonka tekijöillä on yli 25 vuoden kokemus kattotöistä. Ilmainen kuntoarvio, selkeä suunnitelma ja kiinteä hinta ilman sitoutumista. Siisti työmaa, työn tarkistus asiakkaan kanssa, jätteiden kierrätys.

## Operating Context
Kävijä vertailee muutamaa paikallista tekijää. Päätös syntyy puhelussa. Kuntoarvio tehdään paikan päällä. Sesongit: maalaus ja katot keväästä syksyyn, lumityöt talvella.

## Capabilities and Constraints
- Yksinkertainen esittelysivu (haara `yksinkertainen`): etusivu, palvelusivut (katot, maalaus, painepesu, lumityöt, pihatyöt, muut korjaukset), yhteystiedot, tietosuojaseloste.
- Ei lomaketta: yhteydenotto vain puhelimella (050 323 3075) ja sähköpostilla (info@holske.fi).
- Ei hintalaskuria eikä kotitalousvähennyksen mainintaa tässä versiossa. Laaja versio laskureineen säilyy haarassa `laaja-versio`.
- Astro, staattinen, Cloudflare Workers. Sisältö tiedostoissa `src/data/*.json` ja `src/content/palvelut/*.md`.
- Suomi. Ei ajatusviivoja tekstissä.

## Brand Commitments
- Nimi Holske Oy, Y-tunnus 3419162-6, Pyörärinne 4, 01280 Vantaa.
- Logo: `assets/logot-ja-grafiikat/logo.svg` (väri CSS:stä) ja `logo-pieni.svg` (H.).
- Värit (omistajan paletti 10/2026): oliivi #555936 (pääväri), ruoste #8C451C (soittonapit), luu #D9D2C5 (pinnat), hiili #262626 (teksti ja footer).
- Fontti: Geist.
- Suunta: malli bahnexpress.fi (omistajan valinta 10/2026). Kevyt, lähes yksivärinen, kuvat ja video tuovat värin. Ei raskaita elementtejä.
- Puhelinnumero vain Yhteystiedot-sivulla, muualla "Ota yhteyttä".
- Sävy: tarjoileva mutta hillitty, arvokas, skandinaavinen. Ei huutomerkkejä.

## Evidence on Hand
- Vanhan sivun tekstit: `archive/`. Palvelukuvaukset ja huoltovälit sieltä.
- Valokuvat tulossa: `assets/kuvat/` (nimet README:ssä). Nyt paikkamerkit.
- Ei asiakasarvosteluja, referenssejä, sertifikaatteja eikä hintoja. Niitä ei saa keksiä.

## Product Principles
1. Vähemmän on enemmän: vain se, mikä auttaa soittamaan.
2. Katot ensin.
3. "Ota yhteyttä" aina yhden napautuksen päässä, numero Yhteystiedot-sivulla.
4. Vain todet asiat, vanhan sivun faktoista.

## Accessibility & Inclusion
WCAG 2.2 AA. Perusfontti vähintään 18 px, isot kosketusalueet (48 px), selkeä kontrasti, toimii ilman JavaScriptiä.
