import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import yritys from '../data/yritys.json';
import { kvTila, kvLuvut } from '../lib/kv-teksti';

// Tiivis kuvaus sivustosta tekoälyhakuja varten (llms.txt). Generoidaan yritys.json:sta.
export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL('https://holske.fi')).href.replace(/\/$/, '');
  const palvelut = (await getCollection('palvelut')).sort((a, b) => a.data.jarjestys - b.data.jarjestys);
  const rivit = [
    `# ${yritys.nimi}`,
    '',
    `> ${yritys.nimi} (Y-tunnus ${yritys.ytunnus}) on vantaalainen perheyritys, joka tekee kattoremontteja, katon ja talon maalausta, painepesua, lumitöitä ja pihatöitä omakotitaloille: ${yritys.palvelualue.join(', ')}. ${yritys.kokemusLause}`,
    '',
    '## Palvelut',
    ...palvelut.map((p) => `- [${p.data.otsikko}](${base}/palvelut/${p.id}/): ${p.data.kortti}`),
    '',
    '## Tilaaminen',
    `- [Ilmainen kuntoarvio](${base}/kuntoarvio/): lomake, ${yritys.vastausaika.toLowerCase()}.`,
    `- [Hintalaskuri](${base}/hintalaskuri/): suuntaa-antava hinta.`,
    `- [Kotitalousvähennys](${base}/kotitalousvahennys/): ${kvTila} ${kvLuvut}`,
    '',
    '## Yhteystiedot',
    `- Puhelin: ${yritys.puhelinNaytto} (${yritys.puhelinE164})`,
    `- Sähköposti: ${yritys.sahkoposti}`,
    `- Osoite: ${yritys.katuosoite}, ${yritys.postinumero} ${yritys.kaupunki}`,
    `- Palvelualue: pääkaupunkiseutu (${yritys.palvelualue.join(', ')})`,
    '',
  ];
  return new Response(rivit.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
