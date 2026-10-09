# Vanhan holske.fi:n "hintalaskuri" – logiikan selvitys

Haettu 9.10.2026 Apify web-fetchillä (sekä JS-renderöity HTML että alkuperäinen raw-HTML, inline-skriptit mukaan lukien).

## Johtopäätös

**Vanhalla sivustolla ei ole hintalaskuria eikä mitään hinnanlaskentalogiikkaa.** "Hintalaskuri"-nimiset sivut ovat pelkkiä navigaatiosivuja ja WPForms Lite -yhteydenottolomakkeita ("hinta-arviopyyntö"). Asiakas jättää yhteystiedot ja kuvauksen työstä, ja yritys vastaa tarjouksella (sivun mukaan "1-2 vuorokauden sisään").

Siksi seuraavia **ei löytynyt mistään**, eikä niitä voi dokumentoida:

- yksikköhinnat (€/m², €/h, €/kerta tms.): **ei löydy**
- kertoimet (kattotyyppi, kerrosluku, kunto, kaltevuus tms.): **ei löydy**
- minimiveloitus / aloitusmaksu: **ei löydy**
- laskukaava: **ei ole**
- kotitalousvähennyksen käsittely: **ei löydy** (sanaa "kotitalous" ei esiinny yhdelläkään tarkistetulla sivulla)
- laskurin tulosteksti: **ei ole** (lomake ei näytä hintaa)
- select-/radio-/numerokenttiä, joilla olisi arvoja: **ei ole**

## Mitä tarkistettiin

| Sivu | Sisältö | Laskuri? |
|---|---|---|
| https://holske.fi/hinta-laskuri/ | Elementor-sivu: 4 palvelukorttia + painikkeet "Pyydä hinta-arviota", jotka vievät lomakesivuille | Ei |
| https://holske.fi/hintalaskuri/ | Elementor-sivu: 5 palvelupainiketta, kaikkien linkki `#` (eivät tee mitään; Popup Makerissa `"popups":[]`) | Ei |
| https://holske.fi/katon-maalaus-hintalaskuri/ | WPForms-lomake 1647 "Katon maalaustyön hinta-arviopyyntö" | Ei |
| https://holske.fi/seinien-maalaustyot-pyynto/ | Sama WPForms-lomake 1647 | Ei |
| https://holske.fi/lumityot-pyynto/ | Sama WPForms-lomake 1647 | Ei |
| https://holske.fi/yleispyynto/ | Sama WPForms-lomake 1647 | Ei |

Raw-HTML:stä käytiin läpi kaikki `<script>`-tagit. Sivuilla ladattavat lisäosat: Elementor (+ Elementor Pro -tyylejä), Astra-teema, WPForms Lite 2.0.2.2, Contact Form 7 6.1.7, Popup Maker 1.25.0, PixelYourSite, Meta Pixel, Google Site Kit, GDPR Cookie Compliance, Rank Math. **Calculated Fields Form-, Forminator-, Fluent Forms- tai muuta laskurilisäosaa ei ole**, eikä yhdessäkään inline-skriptissä ole hintoja, kertoimia tai laskentaa (skriptit ovat analytiikkaa, evästeitä, Elementorin/teeman asetuksia ja lomakevalidointia).

## Lomakkeen kentät (WPForms, lomake-ID 1647)

Sama lomake on käytössä kaikilla neljällä "pyyntö"-sivulla; vain sivun otsikko vaihtuu (esim. "Katon maalaustyön hinta-arviopyyntö").

| # | Nimiö (label) | Tyyppi | Pakollinen | Placeholder | Kentän nimi |
|---|---|---|---|---|---|
| 1 | Minkälaisesta työstä on kyse? | text | ei | Kerro työstä mahdollisimman tarkasti | `wpforms[fields][14]` |
| 2 | Nimesi | text | kyllä | Tarvitsemme nimesi yhteydenottoa varten | `wpforms[fields][3]` |
| 3 | Sähköpostisi yhteydenottoa varten | email | kyllä | Sähköposti | `wpforms[fields][1]` |
| 4 | Puhelinnumerosi yhteydenottoa varten (valinnainen) | **email** (virhe: puhelinnumerokenttä on email-tyyppiä) | ei | Puhelinnumero | `wpforms[fields][11]` |
| 5 | Rakennuksen / tontin osoite | **email** (virhe: osoitekenttä on email-tyyppiä, joten validointi hylkää tavallisen osoitteen) | kyllä | – | `wpforms[fields][12]` |
| 6 | Kerro, milloin sinulle sopii, että tulisimme katsomaan työn kohdetta | textarea | kyllä | Ehdota muutamaa ajankohtaa | `wpforms[fields][2]` |
| – | Comment | text (honeypot, piilotettu) | – | – | `wpforms[hp]` |

Lisäksi lomake lähettää piilokentät `wpforms[id]=1647`, `page_title`, `page_url`, `url_referer`, `page_id`, `wpforms[post_id]` ja `wpforms[time_token]`.

Lähetyspainike: "Lähetä lomake" (lähetyksen aikana "Lähetetään").

Vahvistusviesti lähetyksen jälkeen: **ei saatavilla**. Se tulee palvelimelta AJAX-vastauksena eikä näy HTML:ssä. Lomaketta ei lähetetty.

Huom. og:description-metatiedossa näkyy lomakkeen vanhempi versio, jossa puhelinnumero oli pakollinen (`Puhelinnumerosi yhteydenottoa varten *`) ja kenttänä oli myös "Website". Nykyisessä HTML:ssä "Website"-kenttää ei ole.

## Ainoat hintaan/valuuttaan liittyvät arvot koodissa

WPFormsin yleisasetukset (`var wpforms_settings`, inline-skripti). Nämä ovat WPForms Liten oletuksia eikä mikään kenttä käytä niitä:

```js
"currency_code":"USD","currency_thousands":",","currency_decimals":"2","currency_decimal":".","currency_symbol":"$","currency_symbol_pos":"left"
```

Samassa objektissa on myös WPFormsin oletusvalidointiteksti `"val_minimum_price":"Amount entered is less than the required minimum."`. Se on lisäosan oletus, ei Holsken asettama minimihinta.

## Lomakkeen HTML sanatarkasti (katon-maalaus-hintalaskuri, raw)

Tokenit on korvattu merkillä `…`. Rivinvaihdot on lisätty tagien väliin luettavuuden vuoksi.

```html
<form id="wpforms-form-1647" class="wpforms-validate wpforms-form" data-formid="1647" method="post" enctype="multipart/form-data" action="/katon-maalaus-hintalaskuri/" data-token="…" data-token-time="…">
<noscript class="wpforms-error-noscript">Please enable JavaScript in your browser to complete this form.</noscript>
<div class="wpforms-field-container">
<div id="wpforms-1647-field_14-container" class="wpforms-field wpforms-field-text" data-field-id="14">
<label class="wpforms-field-label" for="wpforms-1647-field_14">Minkälaisesta työstä on kyse?</label>
<input type="text" id="wpforms-1647-field_14" class="wpforms-field-large" name="wpforms[fields][14]" placeholder="Kerro työstä mahdollisimman tarkasti" >
</div>
<div id="wpforms-1647-field_3-container" class="wpforms-field wpforms-field-text" data-field-id="3">
<label class="wpforms-field-label" for="wpforms-1647-field_3">Nimesi <span class="wpforms-required-label">*</span>
</label>
<input type="text" id="wpforms-1647-field_3" class="wpforms-field-large wpforms-field-required" name="wpforms[fields][3]" placeholder="Tarvitsemme nimesi yhteydenottoa varten" required>
</div>
<div id="wpforms-1647-field_1-container" class="wpforms-field wpforms-field-email" data-field-id="1">
<label class="wpforms-field-label" for="wpforms-1647-field_1">Sähköpostisi yhteydenottoa varten <span class="wpforms-required-label">*</span>
</label>
<input type="email" id="wpforms-1647-field_1" class="wpforms-field-large wpforms-field-required" name="wpforms[fields][1]" placeholder="Sähköposti" spellcheck="false" required>
</div>
<div id="wpforms-1647-field_11-container" class="wpforms-field wpforms-field-email" data-field-id="11">
<label class="wpforms-field-label" for="wpforms-1647-field_11">Puhelinnumerosi yhteydenottoa varten (valinnainen)</label>
<input type="email" id="wpforms-1647-field_11" class="wpforms-field-large" name="wpforms[fields][11]" placeholder="Puhelinnumero" spellcheck="false" >
</div>
<div id="wpforms-1647-field_12-container" class="wpforms-field wpforms-field-email" data-field-id="12">
<label class="wpforms-field-label" for="wpforms-1647-field_12">Rakennuksen / tontin osoite <span class="wpforms-required-label">*</span>
</label>
<input type="email" id="wpforms-1647-field_12" class="wpforms-field-large wpforms-field-required" name="wpforms[fields][12]" spellcheck="false" required>
</div>
<div id="wpforms-1647-field_2-container" class="wpforms-field wpforms-field-textarea" data-field-id="2">
<label class="wpforms-field-label" for="wpforms-1647-field_2">Kerro, milloin sinulle sopii, että tulisimme katsomaan työn kohdetta <span class="wpforms-required-label">*</span>
</label>
<textarea id="wpforms-1647-field_2" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][2]" placeholder="Ehdota muutamaa ajankohtaa" required>
</textarea>
</div>
</div>
<!-- .wpforms-field-container -->
<div class="wpforms-field wpforms-field-hp">
<label for="wpforms-1647-field-hp" class="wpforms-field-label">Comment</label>
<input type="text" name="wpforms[hp]" id="wpforms-1647-field-hp" class="wpforms-field-medium">
</div>
<div class="wpforms-submit-container" >
<input type="hidden" name="wpforms[id]" value="1647">
<input type="hidden" name="wpforms[time_token]" value="…">
<input type="hidden" name="page_title" value="katon maalaus, hintalaskuri">
<input type="hidden" name="page_url" value="https://holske.fi/katon-maalaus-hintalaskuri/">
<input type="hidden" name="url_referer" value="">
<input type="hidden" name="page_id" value="2210">
<input type="hidden" name="wpforms[post_id]" value="2210">
<button type="submit" name="wpforms[submit]" id="wpforms-submit-1647" class="wpforms-submit" data-alt-text="Lähetetään" data-submit-text="Lähetä lomake" aria-live="assertive" value="wpforms-submit">Lähetä lomake</button>
</div>
</form>
```

## Uuden sivuston kannalta

Uuden sivuston hintalaskurin hinnat, kertoimet ja kaava on määriteltävä alusta asti yrittäjän kanssa, koska vanhalla sivustolla ei ole mitään siirrettävää laskentalogiikkaa. Vanhasta sivustosta voi hyödyntää palvelujakoa (katon maalaus, seinien/julkisivun maalaus, lumityöt, ruohonleikkuu, katon pesu / muut korjaustyöt) ja lomakkeen yhteystietokenttiä.
