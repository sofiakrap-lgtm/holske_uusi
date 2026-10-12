# 01 Design DNA

## 01.1 Tyyli yhdellä lauseella
Lämmin, paperinen logistiikkabrändi: koivunvalkoinen ja asfaltinmusta pohja, osio kerrallaan vaihtuvat täysleveät väriteemat, jättimäiset leveät versaaliotsikot ja pehmeät 24 px kulmat, joissa kaikki liike on toiminnallista ja nopeaa (0,14 s ... 0,46 s).

## 01.2 Viisi adjektiivia
Itsevarma, lämmin, tekninen, rauhallinen, kosketeltava.

## 01.3 Periaatteet
1. **Teema per osio.** Jokainen `<section>` saa oman teeman: birch, light-grey, teal, green tai asphalt. Teema vaihtaa koko token-setin (tausta, otsikko, leipäteksti, napit, kentät). (CSS-sääntö)
2. **Leveä ääni, kevyt puhe.** Otsikot ovat leveää groteskia painolla 900 ja versaaleina. Leipäteksti on geometrista sansia painolla 300. Kontrasti syntyy painosta ja leveydestä, ei väreistä. (CSS-sääntö)
3. **Ei varjoja.** Mikään elementti ei käytä box-shadow-syvyyttä. Pinnat erottuvat sävyaskelilla (birch → grey-50 → grey-100 → sand), 2 px raoilla ja 3 ja 4 px renkailla. (CSS-sääntö)
4. **Pilleri ja pyöristetty neliö.** Napit, tagit, segmentit ja sliderit ovat täysiä pillereitä (999 px). Kortit, kentät ja media ovat 20 ja 24 px pyöristettyjä. Muotokuvat ovat pyöristettyjä neliöitä (12 ... 24 px), eivät ympyröitä. (CSS-sääntö)
5. **Yksi signaaliväri.** Oranssi #fd6a31 esiintyy vain pieninä merkkeinä (valittu kartan pinni, lähtöpiste). Pääkorostus on asfaltinmusta pilleri. (CSS-sääntö)
6. **Liike palvelee tilaa.** Ei scroll-reveal-koristeita. Liike tulee tilamuutoksista: liukuva valintapilleri, View Transitions -morph, rullaavat numerot, aikajanan piirtyminen, haitarin korkeus. (mitattu)
7. **Media sulautuu.** Hero-video on koko osion taustana, päällä grain-kohina (overlay 30 %), lämmin wash (lighten) ja lopussa gradientti seuraavan osion väriin. (CSS-sääntö)
8. **Yhdistetyt kentät.** Vierekkäiset paneelit ja kentät liitetään "notch join" -sillalla (kapea muoto, jonka ylä- ja alareunassa puoliympyrän lovet). Hintalomake ja laskuri näyttävät yhdeltä esineeltä. (mitattu SVG)
9. **Kaikki keskitetään.** Osio-otsikot, hero, CTA ja alaotsikot ovat keskitettyjä. Leipäteksti on vasemmalla vain proosassa ja korteissa. (CSS-sääntö)
10. **Sisältö skaalautuu kontin mukaan.** Komponentit käyttävät container queryja (hero-strip, karuselli, käyttötapaukset), joten sama komponentti toimii sarakkeessa ja täysleveänä. (CSS-sääntö)

## 01.4 Do
- Käytä isoja tyhjiä alueita: osion padding 144 px desktopilla.
- Laita lyhyt kuvateksti (caption, Duplet/Figtree 600) otsikon yläpuolelle tai alle, ei eyebrow-versaaleja.
- Käytä tabular-nums-numeroita ja leveää fonttia stat-luvuissa.
- Tee aktiivinen tila liukuvalla pillerillä (segmented `::before`), ei alleviivauksella.
- Vuorottele vaaleat ja tummat teemat: birch → light-grey → teal → asphalt → ... → green (FAQ) → birch (yhteystiedot) → asphalt (CTA).

## 01.5 Don't
- Ei drop shadow -varjoja, ei glassmorphism-blurria, ei gradientteja napeissa.
- Ei ympyräavatareja (paitsi aikajanan pallot).
- Ei pyöreillä päillä piirrettyjä ikoneita: ikonit ovat butt- tai square-päisiä viivoja.
- Ei sivun latausanimaatiota eikä kursoriefektejä.
- Ei pitkiä otsikoita: display-otsikko on 2 ... 4 sanaa.

## 01.6 Tiheys ja rytmi
Väljä. Osio = otsikko + yksi alaotsikko + yksi interaktiivinen elementti. Väli otsikosta sisältöön 64 px (desktop), alaväli 32 px. Kortin sisäpadding 24 / 36 / 48 kokoluokan mukaan. Yksi rivikorkeus = fonttikoko otsikoissa, leipätekstissä 1,4.

## 01.7 Kontrasti ja hierarkia
Hierarkia: display 72 ... 96 px / 900 versaali → heading 32 ... 48 px / 500 → caption 18 ... 24 px / 600 → body 18 ... 20 px / 300. Muted-teksti on lämmintä harmaata (#8a7f6b), ei siniharmaata. Tummissa teemoissa otsikko on birch ja leipä grey-100.

## 01.8 Ekstrapolointi: miten puuttuvat komponentit tehdään
- Uusi kortti: tausta `--color-surface`, radius 24, ei reunaa, padding 24/36/48, sisäinen "kaivo" `--color-surface-raised`.
- Uusi valitsin: pillerirata (track) + liukuva valintapilleri, 0,26 s `--ease-standard`.
- Uusi popover: overlay-tausta, radius 20, sisäpadding 4, rivit radius 16, sisääntulo translateY(-4px) → 0 0,14 s.
- Uusi tila-animaatio: kesto 0,14 ... 0,32 s, `--ease-standard` tai `--ease-emphasis`. Poistuminen nopeampi kuin tulo (n. 0,75 x).

## 01.9 Tunnistettavimmat yksityiskohdat
1. Hero-otsikon rivit eri leveyksillä ja kokoluokilla: rivi 1 XWide 96 px, rivi 2 Wide 80 px, rivi 3 heading 40 ... 48 px.
2. Hero-video, jonka päällä grain + lämmin wash + häivytys seuraavan osion väriin.
3. Tumma "hero strip" -paneeli herossa: kolme saraketta, 2 px raot, overlay-tausta, radius 24.
4. Notch join -silta kenttien ja laskuripaneelien välissä.
5. Käyttötapauskortti, joka klikattaessa laajenee täysleveäksi View Transitions -morphilla.
6. Asiakaslainaukset kartalla: pyöristetyt muotokuvapinnit, valittu kasvaa 58 → 88 px oranssilla renkaalla.
7. Headerin navigaatio on segmented-pilleri, jonka valintapilleri liukuu, ja hampurilaisvalikossa linkit morphaavat headerista valikkoon.
