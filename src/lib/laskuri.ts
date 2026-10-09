/**
 * Hintalaskurin laskenta. Hinnat tulevat tiedostosta src/data/hinnasto.json.
 * Jos jokin tarvittava hinta puuttuu (null), laskuri ei näytä hintaa vaan ohjaa kuntoarvioon.
 */

type Hinta = number | null;

export interface Hinnasto {
  yleiset: {
    tyonOsuus: Hinta;
    minimilasku: Hinta;
    matkakulut: Hinta;
    naytto: 'haarukka' | 'alkaen' | 'arvio' | string;
    haarukkaProsentti: Hinta;
  };
  kotitalousvahennys: {
    kaytossa: boolean;
    prosentti: number;
    omavastuu: number;
    enimmaismaara: number;
  };
  katot: Record<
    'peltiMaalaus' | 'tiiliPinnoitus' | 'ruosteenpoisto' | 'jyrkkaLisa' | 'kaksikerroksinenLisa' | 'huonoKuntoLisa' | 'kattoKerroin',
    Hinta
  >;
  maalaus: Record<'kerta1' | 'kerta2' | 'pohjatyot', Hinta>;
  painepesu: Record<'katto' | 'kiveys' | 'terassi' | 'julkisivu' | 'suojaAine', Hinta>;
  lumityot: Record<'kattoPieni' | 'kattoIso' | 'piha' | 'talvisopimus', Hinta>;
  pihatyot: Record<'nurmiPieni' | 'nurmiKeski' | 'nurmiIso' | 'kesasopimus', Hinta>;
}

export type Syote =
  | {
      palvelu: 'katot';
      tyyppi: 'pelti' | 'tiili';
      ala: number | null;
      pohjaAla: number | null;
      kerrokset: 1 | 2;
      jyrkka: boolean;
      kunto: 'hyva' | 'kohtalainen' | 'huono';
      ruoste: boolean;
    }
  | { palvelu: 'maalaus'; ala: number | null; kerrat: 1 | 2; pohjatyot: boolean }
  | {
      palvelu: 'painepesu';
      katto: number | null;
      kiveys: number | null;
      terassi: number | null;
      julkisivu: number | null;
      suojaAine: boolean;
    }
  | { palvelu: 'lumityot'; kohde: 'katto' | 'piha' | 'molemmat'; kattoKoko: 'pieni' | 'iso'; sopimus: boolean }
  | { palvelu: 'pihatyot'; nurmi: 'pieni' | 'keski' | 'iso'; sopimus: boolean };

export interface Tulos {
  /** Arvioitu kokonaishinta euroina, tai null jos hintaa ei voi laskea */
  hinta: number | null;
  ala: number | null;
  kuukausihinta: boolean;
  alaraja: number | null;
  ylaraja: number | null;
  vahennyksenJalkeen: number | null;
  /** Syy, miksi hintaa ei voitu laskea */
  puuttuu: 'hinnat' | 'mitat' | null;
}

const on = (v: Hinta): v is number => typeof v === 'number' && Number.isFinite(v);
const lisa = (prosentti: Hinta) => (on(prosentti) ? 1 + prosentti / 100 : null);
const pyorista = (n: number) => Math.round(n / 10) * 10;

function perushinta(h: Hinnasto, s: Syote): { hinta: number | null; ala: number | null; puuttuu: Tulos['puuttuu']; kk: boolean } {
  switch (s.palvelu) {
    case 'katot': {
      const ala = s.ala ?? (s.pohjaAla && on(h.katot.kattoKerroin) ? s.pohjaAla * h.katot.kattoKerroin : null);
      if (!ala) return { hinta: null, ala: null, puuttuu: 'mitat', kk: false };
      const yksikko = s.tyyppi === 'pelti' ? h.katot.peltiMaalaus : h.katot.tiiliPinnoitus;
      if (!on(yksikko)) return { hinta: null, ala, puuttuu: 'hinnat', kk: false };
      let hinta = yksikko * ala;
      if (s.tyyppi === 'pelti' && s.ruoste) {
        if (!on(h.katot.ruosteenpoisto)) return { hinta: null, ala, puuttuu: 'hinnat', kk: false };
        hinta += h.katot.ruosteenpoisto * ala;
      }
      const kertoimet = [
        s.jyrkka ? lisa(h.katot.jyrkkaLisa) : 1,
        s.kerrokset === 2 ? lisa(h.katot.kaksikerroksinenLisa) : 1,
        s.kunto === 'huono' ? lisa(h.katot.huonoKuntoLisa) : 1,
      ];
      if (kertoimet.some((k) => k === null)) return { hinta: null, ala, puuttuu: 'hinnat', kk: false };
      hinta = kertoimet.reduce<number>((acc, k) => acc * (k as number), hinta);
      return { hinta, ala, puuttuu: null, kk: false };
    }
    case 'maalaus': {
      if (!s.ala) return { hinta: null, ala: null, puuttuu: 'mitat', kk: false };
      const yksikko = s.kerrat === 2 ? h.maalaus.kerta2 : h.maalaus.kerta1;
      if (!on(yksikko)) return { hinta: null, ala: s.ala, puuttuu: 'hinnat', kk: false };
      let hinta = yksikko * s.ala;
      if (s.pohjatyot) {
        if (!on(h.maalaus.pohjatyot)) return { hinta: null, ala: s.ala, puuttuu: 'hinnat', kk: false };
        hinta += h.maalaus.pohjatyot * s.ala;
      }
      return { hinta, ala: s.ala, puuttuu: null, kk: false };
    }
    case 'painepesu': {
      const osat: [number | null, Hinta][] = [
        [s.katto, h.painepesu.katto],
        [s.kiveys, h.painepesu.kiveys],
        [s.terassi, h.painepesu.terassi],
        [s.julkisivu, h.painepesu.julkisivu],
      ];
      const valitut = osat.filter(([m]) => m && m > 0);
      if (!valitut.length) return { hinta: null, ala: null, puuttuu: 'mitat', kk: false };
      if (valitut.some(([, y]) => !on(y))) return { hinta: null, ala: null, puuttuu: 'hinnat', kk: false };
      let hinta = valitut.reduce((acc, [m, y]) => acc + (m as number) * (y as number), 0);
      if (s.suojaAine && s.katto) {
        if (!on(h.painepesu.suojaAine)) return { hinta: null, ala: null, puuttuu: 'hinnat', kk: false };
        hinta += h.painepesu.suojaAine * s.katto;
      }
      const ala = valitut.reduce((acc, [m]) => acc + (m as number), 0);
      return { hinta, ala, puuttuu: null, kk: false };
    }
    case 'lumityot': {
      if (s.sopimus) {
        return on(h.lumityot.talvisopimus)
          ? { hinta: h.lumityot.talvisopimus, ala: null, puuttuu: null, kk: true }
          : { hinta: null, ala: null, puuttuu: 'hinnat', kk: true };
      }
      const osat: Hinta[] = [];
      if (s.kohde !== 'piha') osat.push(s.kattoKoko === 'iso' ? h.lumityot.kattoIso : h.lumityot.kattoPieni);
      if (s.kohde !== 'katto') osat.push(h.lumityot.piha);
      if (osat.some((o) => !on(o))) return { hinta: null, ala: null, puuttuu: 'hinnat', kk: false };
      return { hinta: osat.reduce<number>((a, b) => a + (b as number), 0), ala: null, puuttuu: null, kk: false };
    }
    case 'pihatyot': {
      if (s.sopimus) {
        return on(h.pihatyot.kesasopimus)
          ? { hinta: h.pihatyot.kesasopimus, ala: null, puuttuu: null, kk: true }
          : { hinta: null, ala: null, puuttuu: 'hinnat', kk: true };
      }
      const y = { pieni: h.pihatyot.nurmiPieni, keski: h.pihatyot.nurmiKeski, iso: h.pihatyot.nurmiIso }[s.nurmi];
      return on(y)
        ? { hinta: y, ala: null, puuttuu: null, kk: false }
        : { hinta: null, ala: null, puuttuu: 'hinnat', kk: false };
    }
  }
}

export function laske(h: Hinnasto, s: Syote): Tulos {
  const p = perushinta(h, s);
  if (p.hinta === null) {
    return { hinta: null, ala: p.ala, kuukausihinta: p.kk, alaraja: null, ylaraja: null, vahennyksenJalkeen: null, puuttuu: p.puuttuu };
  }
  let hinta = p.hinta;
  if (!p.kk) {
    if (on(h.yleiset.matkakulut)) hinta += h.yleiset.matkakulut;
    if (on(h.yleiset.minimilasku)) hinta = Math.max(hinta, h.yleiset.minimilasku);
  }
  const vaihtelu = h.yleiset.naytto === 'haarukka' && on(h.yleiset.haarukkaProsentti) ? h.yleiset.haarukkaProsentti / 100 : 0;
  const alaraja = pyorista(hinta * (1 - vaihtelu));
  const ylaraja = pyorista(hinta * (1 + vaihtelu));

  let vahennyksenJalkeen: number | null = null;
  const kv = h.kotitalousvahennys;
  if (!p.kk && kv.kaytossa && on(h.yleiset.tyonOsuus)) {
    const tyo = hinta * (h.yleiset.tyonOsuus / 100);
    const vahennys = Math.min(Math.max(tyo * (kv.prosentti / 100) - kv.omavastuu, 0), kv.enimmaismaara);
    vahennyksenJalkeen = pyorista(hinta - vahennys);
  }

  return {
    hinta: pyorista(hinta),
    ala: p.ala,
    kuukausihinta: p.kk,
    alaraja,
    ylaraja,
    vahennyksenJalkeen,
    puuttuu: null,
  };
}

export const euro = (n: number) =>
  new Intl.NumberFormat('fi-FI', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
