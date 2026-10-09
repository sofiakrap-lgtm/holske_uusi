# Avoimet asiat (TODO)

## Odottaa teiltä
1. **Kuvat** kansioon `assets/kuvat/`. Nimet ja koot README:n kuvataulukossa. Alt-tekstit tiedostoon `src/data/kuvat.json` (kuvaile, mitä kuvassa oikeasti näkyy).
2. **Omat hinnat** laskuriin (kyselyt: suomi https://claude.ai/artifact/XrQRG5UxsHqbSjNit7ykYM, venäjä https://claude.ai/artifact/1ERZELWpZwrJAaDoqgpYuZ). Nyt laskurissa väliaikaiset keskihinnat ja työn osuus 70 %.
3. **Lomakkeen testi**: lähetä yksi pyyntö ja tarkista, että se tulee osoitteeseen info@holske.fi.
4. **Vahvista sanamuodot** (`src/data/yritys.json`):
   - "Tekijöillämme on yli 25 vuoden kokemus alalta" (yhtiö on rekisteröity 2024, siksi kokemus on muotoiltu tekijöiden kokemukseksi)
   - "Vastaamme 1-2 vuorokauden sisällä"
   - "kiinteä hinta" ja "Pinnoitus voi pidentää tiilikaton käyttöikää jopa 20 vuodella" (molemmat vanhalta sivulta)
5. **Ennakkoperintärekisteri**: onko Holske Oy rekisterissä? Jos on, lisätään maininta sivulle.
6. **Google Analytics**: aseta tietojen säilytysajaksi 14 kuukautta.
7. **Tarjouspyynnöt**: poistakaa 12 kuukauden jälkeen ne, joista ei tullut tilausta (tietosuojaseloste lupaa).
8. **Kotitalousvähennys**: kun korotus näkyy Finlexissä, vaihda `src/data/kotitalousvahennys.json` kenttä `status` arvoon `voimassa`.
9. **Some-profiilit**: jos tulee Facebook, Instagram tai Google Business Profile, lisää linkit `src/data/yritys.json` kenttään `sameAs`.

## Domainin siirron yhteydessä (holske.fi Cloudflareen)
10. Sähköpostin DNS-tietueet ensin (README kohta 4).
11. **Tekoälybotit**: Cloudflare estää AI-botit oletuksena uusilla domaineilla. Heti kun holske.fi on Cloudflaressa:
    - Security → Bots → **AI Crawl Control** (tai "Block AI bots"): salli OAI-SearchBot, ChatGPT-User, GPTBot, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended.
    - Kytke pois **"Manage your robots.txt" / "Instruct AI bot traffic with robots.txt"**, jottei Cloudflare lisää omia estojaan robots.txt:n alkuun.
    - Tarkista: `https://holske.fi/robots.txt` ei saa sisältää riviä "# BEGIN Cloudflare Managed content".
12. Google Search Console: lisää holske.fi ja lähetä `https://holske.fi/sitemap-index.xml`.
13. Google Business Profile: nimi, osoite ja puhelin samat kuin sivulla.
14. Vanha WordPress alas vasta, kun uusi sivu toimii.

## Myöhemmin
15. Referenssit ja asiakaskokemukset, kun asiakkailta on lupa.
16. Palvelusivujen tekstien laajennus (nyt 200-500 sanaa). Lisätään vain oikeita tietoja: työvaiheet, materiaalit, kokemukset.
