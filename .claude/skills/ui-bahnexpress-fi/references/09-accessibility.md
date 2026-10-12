# 09 Accessibility

## 09.1 Focus ring
Outline 4 px `--color-focus` (grey-500 vaaleissa, grey-200/400 tummissa), offset 0. Tekstikentässä rengas koko kentän ympäri (`:has(:focus-visible)`). Accordionissa outline sisäpuolelle (offset -4 px) pyöristettynä. Karusellin radalle rengas piirretään anchor positioningilla koko radan ympärille. (CSS-sääntö)

## 09.2 Kontrastiparit
| Pari | Suhde | WCAG |
|---|---|---|
| asphalt / birch | 18,68 | AAA |
| grey-900 leipä / birch | 14,73 | AAA |
| grey-900 / grey-50 | 12,84 | AAA |
| grey-500 muted / birch | 3,90 | AA vain isolle tekstille |
| grey-500 muted / grey-50 | 3,40 | AA vain isolle tekstille |
| birch / teal-800 | 8,84 | AAA |
| grey-200 muted / teal-800 | 5,26 | AA |
| grey-100 / teal-800 | 6,65 | AA |
| grey-400 / asphalt | 6,53 | AA |
| grey-100 / green-900 | 10,53 | AAA |
| grey-400 / green-900 | 4,90 | AA |
| grey-300 faint / birch | 2,15 | ei riitä tekstille |
(laskettu tokeneista)

## 09.3 Kosketuskohteet
Pienin nappi 40 px (xs), oletus 48 ... 56. Nav-labelit 48 px. Kartan pinnit 96 px laatikko. Kentät 72 px. Kaikki ≥ 40 px.

## 09.4 Havaitut puutteet ja korjausehdotukset
- Muted-teksti grey-500 vaalealla on 3,4 ... 3,9:1. Pienessä tekstissä (alle 18 px normaali) käytä grey-600 (#726958, n. 5,3:1) tai varaa grey-500 vain 18 px+ captioneille.
- Faint (grey-300) vain placeholdereille, ei sisällölle.
- Rullaavissa numeroissa käytä sr-only-kopiota ja aria-hidden nauhoille (lähde tekee näin).
- Autoplay-karusellissa pidä toista/pysäytä-nappi ja pysäytä hoverilla ja fokuksella (lähde tekee).
- Reduced motion: lähde piilottaa videon ja nollaa kestot; säilytä.
- Display-versaalit: lisää `aria-label` tai jätä teksti alkuperäiseen kirjainkokoon (text-transform hoitaa ulkoasun), jotta ruudunlukija ei tavaa.
