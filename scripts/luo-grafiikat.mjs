// Luo faviconit ja jakokuvan (Open Graph) logotiedostoista. Aja: node scripts/luo-grafiikat.mjs
// Lähteet: assets/logot-ja-grafiikat/logo.svg ja logo-pieni.svg
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

const VIHREA = '#37432d';
const ORANSSI = '#ed9121';
const VAALEA = '#f7f4ee';

/** Poistaa svg-juuren ja palauttaa sisällön + viewBoxin, jotta logon voi upottaa toiseen SVG:hen */
function sisalto(svg) {
  const viewBox = svg.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
  const runko = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  return { viewBox, runko };
}

/** Upottaa logon annettuun laatikkoon (x, y, leveys, korkeus) säilyttäen mittasuhteet */
function upota(logo, x, y, w, h) {
  const [vx, vy, vw, vh] = logo.viewBox;
  const k = Math.min(w / vw, h / vh);
  const ox = x + (w - vw * k) / 2 - vx * k;
  const oy = y + (h - vh * k) / 2 - vy * k;
  return `<g transform="translate(${ox} ${oy}) scale(${k})">${logo.runko}</g>`;
}

const pieni = await readFile('assets/logot-ja-grafiikat/logo-pieni.svg', 'utf8');
const paa = await readFile('assets/logot-ja-grafiikat/logo.svg', 'utf8');

// Pienessä logossa H on valkoinen ja piste oranssi
let i = 0;
const pieniVarit = sisalto(
  pieni.replace(/fill="currentColor" fill-opacity/g, () => (i++ === 0 ? `fill="${VAALEA}" fill-opacity` : `fill="${ORANSSI}" fill-opacity`)),
);

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
<rect width="64" height="64" rx="14" fill="${VIHREA}"/>
${upota(pieniVarit, 11, 14, 42, 36)}
</svg>`;
await writeFile('public/favicon.svg', favicon);
const fav = Buffer.from(favicon);
await sharp(fav, { density: 300 }).resize(32, 32).png().toFile('public/favicon-32.png');
await sharp(fav, { density: 600 }).resize(180, 180).png().toFile('public/apple-touch-icon.png');

const paaValkoinen = sisalto(paa.replace(/currentColor/g, '#ffffff'));
const og = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g" cx="1" cy="0" r="1">
      <stop offset="0" stop-color="${ORANSSI}" stop-opacity="0.22"/>
      <stop offset="0.6" stop-color="${ORANSSI}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${VIHREA}"/>
  <rect width="1200" height="630" fill="url(#g)"/>
  ${upota(paaValkoinen, 90, 150, 560, 125)}
  <text x="90" y="400" font-family="'DejaVu Sans', Arial, sans-serif" font-size="40" fill="#e8e6dc">Kattoremontit ja katon maalaus</text>
  <text x="90" y="470" font-family="'DejaVu Sans', Arial, sans-serif" font-size="30" fill="${ORANSSI}">Tiilikatot · Peltikatot · Huopakatot · Talon maalaus</text>
</svg>`;
await sharp(Buffer.from(og)).png().toFile('public/og-holske.png');
console.log('Faviconit ja jakokuva luotu kansioon public/');
