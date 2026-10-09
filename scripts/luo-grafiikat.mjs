// Luo väliaikaisen faviconin ja jakokuvan (Open Graph). Aja: node scripts/luo-grafiikat.mjs
// Kun oikea logo on valmis, korvaa public/favicon.svg ja aja skripti uudelleen.
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#37432d"/>
  <path d="M12 31 32 15l20 16" fill="none" stroke="#f7f4ee" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M18 27v22h28V27" fill="none" stroke="#f7f4ee" stroke-width="4.5" stroke-linejoin="round"/>
  <path d="M27 49V38h10v11z" fill="#ed9121"/>
</svg>`;
await writeFile('public/favicon.svg', favicon);
const svg = await readFile('public/favicon.svg');
await sharp(svg).resize(32, 32).png().toFile('public/favicon-32.png');
await sharp(svg).resize(180, 180).png().toFile('public/apple-touch-icon.png');

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g" cx="1" cy="0" r="1">
      <stop offset="0" stop-color="#ed9121" stop-opacity="0.22"/>
      <stop offset="0.6" stop-color="#ed9121" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#37432d"/>
  <rect width="1200" height="630" fill="url(#g)"/>
  <g transform="translate(90 120)">
    <path d="M0 62 70 6l70 56" fill="none" stroke="#f7f4ee" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20 50v80h100V50" fill="none" stroke="#f7f4ee" stroke-width="9" stroke-linejoin="round"/>
    <path d="M52 130V92h36v38z" fill="#ed9121"/>
  </g>
  <text x="90" y="370" font-family="Georgia, 'DejaVu Serif', serif" font-size="96" fill="#ffffff">Holske</text>
  <text x="90" y="440" font-family="'DejaVu Sans', Arial, sans-serif" font-size="38" fill="#e8e6dc">Kiinteistöhuoltoa pääkaupunkiseudulla</text>
  <text x="90" y="510" font-family="'DejaVu Sans', Arial, sans-serif" font-size="30" fill="#ed9121">Katot · Maalaus · Painepesu · Lumityöt · Pihatyöt</text>
</svg>`;
await sharp(Buffer.from(og)).png().toFile('public/og-holske.png');
console.log('Grafiikat luotu kansioon public/');
