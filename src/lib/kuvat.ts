import type { ImageMetadata } from 'astro';

/**
 * Kuvat haetaan repon kansiosta /assets/kuvat/. Tiedoston nimi (ilman päätettä)
 * on kuvan tunnus, esim. assets/kuvat/katot.jpg -> getKuva('katot').
 * Jos kuvaa ei ole, sivulla näytetään siisti paikkamerkki.
 */
const kuvat = import.meta.glob<{ default: ImageMetadata }>(
  '/assets/kuvat/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}',
  { eager: true },
);

const logot = import.meta.glob<{ default: ImageMetadata }>(
  '/assets/logot-ja-grafiikat/*.{svg,png,webp}',
  { eager: true },
);

function etsi(lista: Record<string, { default: ImageMetadata }>, nimi: string) {
  const avain = Object.keys(lista).find((polku) => {
    const tiedosto = polku.split('/').pop() ?? '';
    return tiedosto.replace(/\.[^.]+$/, '').toLowerCase() === nimi.toLowerCase();
  });
  return avain ? lista[avain].default : null;
}

export const getKuva = (nimi: string) => etsi(kuvat, nimi);
export const getLogo = (nimi = 'logo') => etsi(logot, nimi);
