# holske.fi

Holske Oy:n verkkosivut. Staattinen [Astro](https://astro.build)-sivusto, joka julkaistaan ilmaiseksi Cloudflare Pagesissa. Sivusto ei tarvitse omaa palvelinta eikä tietokantaa.

## 1. Sivun ajaminen omalla koneella

Tarvitset [Node.js](https://nodejs.org):n (versio 20 tai uudempi).

```bash
npm install        # asentaa riippuvuudet, vain ensimmäisellä kerralla
npm run dev        # käynnistää sivun osoitteeseen http://localhost:4321
npm run build      # rakentaa valmiin sivuston kansioon dist/
npm run preview    # näyttää rakennetun sivuston
```

## 2. Sisällön muokkaaminen

Kaikki muokattava sisältö on omissa tiedostoissaan. Koodiin ei tarvitse koskea. Kun tallennat muutoksen GitHubiin, Cloudflare julkaisee sen automaattisesti parissa minuutissa.

| Mitä | Tiedosto |
|---|---|
| Puhelin, sähköposti, osoite, Y-tunnus, palvelualue | `src/data/yritys.json` |
| Palvelut (tekstit, otsikot, usein kysytyt, SEO-tekstit) | `src/content/palvelut/*.md`, yksi tiedosto per palvelu |
| Kampanjabanneri (päälle/pois, teksti, päättymispäivä) | `src/data/kampanja.json` |
| Hintalaskurin hinnat | `src/data/hinnasto.json` |
| Etusivun sesonkimerkintä ja sen päivät | `src/data/etusivu.json` |
| Kotitalousvähennyksen luvut ja tila | `src/data/kotitalousvahennys.json` |
| Kuvien alt-tekstit ja rajaus | `src/data/kuvat.json` |
| Google Analytics- ja Facebook-pikselin tunnukset | `src/data/seuranta.json` |
| Lomakkeen asetukset | `src/data/lomake.json` |

### Kampanjabanneri

```json
{
  "paalla": true,
  "teksti": "Varaa ilmainen kuntoarvio ja suunnitellaan työ hyvissä ajoin.",
  "linkkiTeksti": "Varaa kuntoarvio",
  "linkki": "/kuntoarvio/",
  "paattyy": "2026-12-31"
}
```

Banneri näkyy kaikkien sivujen yläreunassa, kun `paalla` on `true`. Se piiloutuu itsestään päättymispäivän jälkeen.

### Hintalaskuri

Hinnat täytetään tiedostoon `src/data/hinnasto.json`. Arvo `null` tarkoittaa, että hintaa ei ole. Silloin laskuri ei näytä hintaa, vaan ohjaa asiakkaan kuntoarvioon ja vie hänen vastauksensa valmiiksi lomakkeelle. Hinnat ovat euroja ja sisältävät ALV:n.

Hinnastokysely, jonka vastauksista hinnat täytetään: https://claude.ai/artifact/XrQRG5UxsHqbSjNit7ykYM

### Kuvat ja logo

Kuvat ja logo lisätään repon juureen, ja sivusto pakkaa ne automaattisesti AVIF- ja WebP-muotoon oikeisiin kokoihin.

**Kuvat** kansioon `assets/kuvat/`. Tiedoston nimi ratkaisee, mihin kuva tulee (pääte .jpg, .png tai .webp). Pääaihe kuvan keskelle, vaakakuvat, luonnonvalo, ei tekstiä kuvassa.

| Tiedosto | Missä | Desktop | Tabletti | Mobiili | Vähintään |
|---|---|---|---|---|---|
| `etusivu.jpg` | Etusivun pääkuva, koko leveys | 16:9 | 4:3 | 4:5 | 3200 × 1800 |
| `katto-huolto.jpg` | Etusivu, katon kunto, koko leveys | 21:9 | 16:9 | 4:5 | 3200 × 1372 |
| `maalaus.jpg` | Etusivu ja Maalaus-sivu, koko leveys | 21:9 / 16:9 | 16:9 / 4:3 | 4:5 | 3200 × 1800 |
| `perheyritys.jpg` | Etusivu, Meistä-osio | 4:5 | 4:3 | 4:5 | 2000 × 2500 |
| `meista.jpg` | Meistä-sivu | 4:5 | 4:3 | 4:5 | 2000 × 2500 |
| `katot.jpg` | Katot-sivun pääkuva | 16:9 | 4:3 | 4:5 | 3200 × 1800 |
| `painepesu.jpg`, `lumityot.jpg`, `pihatyot.jpg`, `muut-korjaukset.jpg` | Palvelusivujen pääkuvat ja etusivun kortit | 16:9 | 4:3 | 4:5 | 3200 × 1800 |
| `katot-2.jpg`, `katot-3.jpg`, `maalaus-2.jpg` (valinnaiset) | Lisäkuvat palvelusivulle | 4:3 | 4:3 | 4:3 | 2400 × 1800 |

Mihin tahansa kuvaan voi lisätä erillisen mobiiliversion `<nimi>-mobiili.jpg` (4:5, vähintään 1600 × 2000) ja tablettiversion `<nimi>-tabletti.jpg` (4:3, vähintään 2400 × 1800). Ilman niitä pääkuva rajataan automaattisesti keskeltä.

Alt-tekstit ja rajauksen kohta: `src/data/kuvat.json`. Niin kauan kuin kuvaa ei ole, sen paikalla näkyy saman muotoinen paikkamerkki.

**Logo** on kansiossa `assets/logot-ja-grafiikat/`:
- `logo.svg`: päälogo (Holske™), käytössä headerissa ja footerissa
- `logo-pieni.svg`: pieni logo (H.), käytössä faviconissa
- `päälogo, holske.svg` ja `holske pieni.svg`: alkuperäiset tiedostot

Logon väri tulee sivun CSS:stä (`color`), joten samaa tiedostoa käytetään vaaleana ja tummana. Värin vaihto: `src/components/Logo.astro`. Jos vaihdat logotiedoston, aja `node scripts/luo-grafiikat.mjs`, niin favicon ja jakokuva päivittyvät.

## 3. Julkaisu Cloudflaressa (Workers)

Sivusto on julkaistu Cloudflaren Workers-palvelussa nimellä `holske-uusi`. Testiosoite: https://holske-uusi.sofia-krap.workers.dev (ei näy Googlessa). Asetukset ovat tiedostossa `wrangler.jsonc`.

Jos projekti pitää joskus luoda uudelleen:

1. https://dash.cloudflare.com → **Compute → Workers & Pages → Create** → yhdistä GitHub-repo `holske_uusi`.
2. **Settings → Build → Build configuration:**
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
   - **Build variables:** `NODE_VERSION` = `22`
3. **Deployments → Retry build**, jos ensimmäinen build epäonnistui ennen asetuksia.

Jokainen GitHubiin pushattu muutos julkaistaan automaattisesti. Tiedostot `public/_redirects` (301-ohjaukset) ja `public/_headers` (tietoturva, välimuisti, testiosoitteen piilotus Googlelta) toimivat automaattisesti.

Domain kytketään projektin **Domains**-välilehdeltä (kohta 4).

## 4. Domainin kytkentä (holske.fi)

Sähköposti info@holske.fi jää nykyiselle palveluntarjoajalle. **Sähköpostitietueet on kopioitava Cloudflareen ennen nimipalvelinten vaihtoa**, muuten sähköposti katkeaa.

1. **Ota talteen nykyiset DNS-tietueet.** Kirjaudu nykyisen palveluntarjoajan hallintapaneeliin ja kirjaa ylös kaikki holske.fi:n DNS-tietueet, erityisesti:
   - **MX** (minne sähköposti menee)
   - **TXT, jossa `v=spf1`** (SPF)
   - **DKIM**, yleensä TXT tai CNAME nimellä kuten `default._domainkey`
   - **DMARC**, TXT nimellä `_dmarc`
   - mahdolliset `mail`, `webmail`, `autodiscover`, `smtp`- ja `imap`-tietueet (A tai CNAME)
2. **Lisää domain Cloudflareen:** Cloudflaren etusivulla **Add a domain → holske.fi → Free**. Cloudflare yrittää tuoda tietueet automaattisesti.
3. **Vertaa tietueet.** Tarkista Cloudflaren DNS-listasta, että jokainen kohdan 1 sähköpostitietue on mukana täsmälleen samana. Lisää puuttuvat käsin. Sähköpostitietueiden pilvi-ikonin pitää olla **harmaa (DNS only)**, ei oranssi.
4. **Vaihda nimipalvelimet.** Cloudflare antaa kaksi nimipalvelinta (esim. `xxx.ns.cloudflare.com`). Vaihda ne domainin rekisteröijän hallintapaneelissa nykyisten tilalle. Muutos voi kestää muutamasta tunnista vuorokauteen.
5. **Kytke domain sivustoon.** Workers & Pages → `holske-uusi` → **Domains → Add custom domain** → `holske.fi`, ja sama uudelleen `www.holske.fi`.
6. **Testaa.** Lähetä sähköposti osoitteeseen info@holske.fi ulkopuolisesta osoitteesta ja lähetä myös sieltä. Avaa https://holske.fi ja kokeile muutamaa vanhaa osoitetta, esim. https://holske.fi/kela-hiden/.

Vinkki: ennen vaihtoa voi tarkistaa nykyiset tietueet esim. palvelulla https://mxtoolbox.com (haku `holske.fi`).

## 5. Lomakkeen avain (Web3Forms)

Kuntoarviolomake lähettää viestit osoitteeseen info@holske.fi Web3Forms-palvelun kautta ilman omaa palvelinta.

1. Mene osoitteeseen https://web3forms.com, syötä `info@holske.fi` ja paina **Create Access Key**. Avain tulee sähköpostiin.
2. Lisää avain Cloudflare Pagesissa: projekti → **Settings → Variables and Secrets** → nimi `PUBLIC_WEB3FORMS_KEY`, arvo avaimesi. Tee sama sekä Production- että Preview-ympäristöön.
3. Julkaise sivu uudelleen (**Deployments → Retry deployment**).

Paikallisesti: kopioi `.env.example` nimelle `.env` ja lisää avain sinne. Vaihtoehtoisesti avaimen voi kirjoittaa tiedostoon `src/data/lomake.json` kenttään `web3formsAvain`. Avain ei ole salainen, sillä se näkyy joka tapauksessa sivun koodissa.

Ilmaisversio ei tue liitetiedostoja, joten lomake ohjaa lähettämään kuvat sähköpostilla. Roskapostisuojana on piilotettu kenttä (honeypot).

## Rakenne

```
assets/kuvat/                 omat valokuvat
assets/logot-ja-grafiikat/    logot
archive/                      vanhan sivuston arkisto (tekstit, URLit, kuvat)
public/                       _redirects, _headers, robots.txt, favicon
src/content/palvelut/         palvelusivujen sisältö
src/data/                     yhteystiedot, hinnat, kampanja, seuranta
src/pages/                    sivut
src/components/               sivujen osat (header, footer, lomake, ikonit)
```
