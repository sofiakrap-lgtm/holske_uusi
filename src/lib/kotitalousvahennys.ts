/**
 * Kotitalousvähennyksen laskenta. Luvut tulevat tiedostosta src/data/kotitalousvahennys.json.
 * Vähennys per henkilö: min(enimmäismäärä, max(0, prosentti × oma osuus työstä − omavastuu)).
 */

export interface KvAsetukset {
  prosentti: number;
  omavastuu: number;
  enimmaismaaraHenkilo: number;
}

export interface KvTulos {
  henkilot: 1 | 2;
  perHenkilo: number;
  yhteensa: number;
}

export function vahennys(tyonOsuus: number, henkilot: 1 | 2, kv: KvAsetukset): KvTulos {
  const osuus = Math.max(0, tyonOsuus) / henkilot;
  const perHenkilo = Math.round(
    Math.min(kv.enimmaismaaraHenkilo, Math.max(0, osuus * (kv.prosentti / 100) - kv.omavastuu)),
  );
  return { henkilot, perHenkilo, yhteensa: perHenkilo * henkilot };
}

/** Vertaa yhden ja kahden henkilön vähennystä ja kertoo, kumpi on parempi */
export function vertaa(tyonOsuus: number, kv: KvAsetukset) {
  const yksi = vahennys(tyonOsuus, 1, kv);
  const kaksi = vahennys(tyonOsuus, 2, kv);
  return { yksi, kaksi, parempi: kaksi.yhteensa > yksi.yhteensa ? kaksi : yksi };
}
