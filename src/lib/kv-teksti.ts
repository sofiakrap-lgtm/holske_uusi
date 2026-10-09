import kv from '../data/kotitalousvahennys.json';

const e = (n: number) => n.toLocaleString('fi-FI');

/** Tilaa kuvaava lause: "Eduskunta hyväksyi 11.9.2026 ..." tai voimassa-muoto */
export const kvTila =
  kv.status === 'voimassa'
    ? `Korotus on voimassa vuosina ${kv.vuodet.join(' ja ')}.`
    : `Eduskunta hyväksyi ${kv.hyvaksytty} kotitalousvähennyksen korotuksen vuosille ${kv.vuodet.join(' ja ')}.`;

export const kvLuvut = `Vähennys on ${kv.prosentti} % työn osuudesta, enintään ${e(kv.enimmaismaaraHenkilo)} € henkilöä kohden, ja omavastuu on ${kv.omavastuu} €.`;

export const kvLyhyt = `${kv.prosentti} % työn osuudesta, enintään ${e(kv.enimmaismaaraHenkilo)} € henkilöä kohden`;

export { kv, e as euroluku };
