# 07 Motion

Lähteet: @keyframes, animation- ja transition-säännöt (41 x cubic-bezier(0.2,0,0,1), 12 x (0.22,1,0.36,1), 29 x ease-out), View Transitions -säännöt ja live-DOM. GSAP:ia, Lenisiä, Swiperia tai Emblaa ei ole. (mitattu)

## 07.1 Liikkeen luonne
Nopea, napakka ja toiminnallinen. Kestot 0,09 ... 0,46 s, laskurirulla 1 s, autoplay 6 s. Liike tapahtuu käyttäjän toiminnasta tai tilamuutoksesta, ei vierityksestä. Ei bounceja, ei springejä, ei parallaxia. Poistuminen aina nopeampi kuin tulo.

## 07.2 Smooth scroll
Ei kirjastoa. Natiivi vieritys. Karusellit natiivi scroll-snap.

## 07.3 Latausanimaatio
Ei preloaderia eikä intro-animaatiota. Hero-videon poster näkyy heti, video jatkaa saumattomasti.

## 07.4 Scroll reveal
| Kohde | From | To | Kesto | Easing | Stagger | Trigger | Kerran |
|---|---|---|---|---|---|---|---|
| Yleiset osiot ja kortit | ei animaatiota | | | | | | |
| Aikajanan viiva | scaleX(0), origin left | scaleX(1) | 0,62 s (beat) | linear | 0,62 s per vaihe | kun näkyvissä | kyllä |
| Aikajanan bullet | opacity 0, scale .9 | 1, 1 | ~0,5 s (settle) | ease-out | 0,62 s | sama | kyllä |
| Aikajanan sisältö | opacity 0, y 8 px | 1, 0 | ~0,5 s | ease-out | 0,62 s | sama | kyllä |
| Stat-numerot (rulla) | translateY(0) | translateY(-N/(N+1)·100%) | 1 s | cubic-bezier(0,0,0.2,1) | 90 ms per numero | kun näkyvissä | kyllä |
Motion.js tukee silti `data-reveal`-attribuuttia yhdisteltävyyden vuoksi; tässä tyylissä jätä se käyttämättä.

## 07.5 Scroll-linked
Header: tausta transparent → overlay ensimmäisen 96 px vierityksen aikana (`animation-timeline: scroll(); animation-range: 0 96px`). Ei muuta.

## 07.6 Sivusiirtymät
Ei sivujen välisiä siirtymiä. Sivun sisäiset View Transitions -morphit: navigaatio → valikko (06.04) ja käyttötapauskortin laajennus (06.13).

## 07.7 Hover ja mikrointeraktiot
| Elementti | Ominaisuus | Kesto | Easing |
|---|---|---|---|
| Napit | background-color, color | 0,15 s | ease |
| Nav-valintapilleri | left, width | 0,26 s | cubic-bezier(0.2,0,0,1) |
| Segmented-pilleri | transform | 0,26 s | sama; opacity 0,14 s |
| Sivuindikaattorin piste | width 8 → 32 | 0,26 s | sama; tausta 0,2 s |
| Select / accordion chevron | rotate 180° | 0,15 s | ease |
| Kartan pinni | width, height, radius, rengas | 0,15 s | ease |
| Kelluva label | height, gap | 0,2 s | cubic-bezier(0.2,0,0,1); opacity 0,14 s |
| Karusellikorttien tausta | background-color | 0,3 s | ease |
| Headerin tausta | background-color | 0,24 s | ease |

## 07.8 Marquee, karusellit ja accordionit
- Marquee: `translateX(0 → -50%)`, 120 s lineaarinen, ääretön (määritelty, harvinainen).
- Karuselli: scroll-snap, nuolet vierittävät yhden kortin (`scrollBy` smooth), autoplay 6 s, indikaattorin täyttö `translateX(-100% → 0)` 6 s linear forwards, pysähtyy hoverilla (`animation-play-state: paused`).
- Accordion: `::details-content` grid-template-rows 0fr → 1fr ja padding-end 0 → 12 px, auki 0,32 s cubic-bezier(0.22,1,0.36,1), kiinni 0,32 s cubic-bezier(0.4,0,0.2,1), opacity 0,2 s. Vaatii `interpolate-size`/`content-visibility allow-discrete` -tuen; fallback JS-korkeus.
- Dropdown: y -4 → 0 + fade 0,14 s, ulos 0,12 s.
- Valikko: arkki y -100% → 0 0,24 s, scrim 0,24 s, ryhmät 0,2 s viive 80 ms; sulku 0,18 s.
- Lainausarkki: opacity 0 + y 24 → 0, 0,26 s cubic-bezier(0.22,1,0.36,1).
- Videodialogi: scale .96 → 1 + fade 0,48 s cubic-bezier(0.22,1,0.36,1).
- Pieni nousu (ops-rise): y 6 → 0 + fade 0,35 s.
- Cookie banner: y 12 → 0 0,24 s.

## 07.9 Tekstianimaatiot
Ei sana- tai kirjainanimaatioita. Hero-rivit ovat erillisiä elementtejä vain typografiaa varten. (Korjaus aiempaan arvioon: sana kerrallaan -reveal EI ole käytössä.)

## 07.10 Kursori
Ei custom-kursoria.

## 07.11 Reduced motion
23 sääntöä: kaikki kestot 1 ms, hero-video piiloon (poster jää), sivuindikaattorin täyttö piiloon, aikajana ja numerot lopputilaan, valikko ilman animaatiota. Tokens.css asettaa kestot 1 ms:ksi.

## 07.12 Toteutus
- motion/motion.css: keyframet (header-band, sheet-in, dropdown-in, rise, page-indicator-fill, marquee, timeline-draw), View Transitions -säännöt ja reduced motion.
- motion/motion.js: header-tila (fallback), segmented-pilleri, karuselli (nuolet, autoplay, indikaattori), käyttötapausmorph (`document.startViewTransition`), rullaavat numerot, aikajanan piirto, fit-to-width, accordionin JS-fallback, valikon avaus ja sulku.
- GSAP-versio: ei tarpeen; alkuperäinen ei käytä GSAP:ia.
