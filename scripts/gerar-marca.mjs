/**
 * GERA OS ÍCONES DO SITE A PARTIR DO DESENHO EM VETOR — identidade "Gelo".
 *
 *   public/media/simbolo.svg   — o símbolo "OD", em degradê (para usar onde quiser)
 *   public/media/simbolo.png   — o mesmo em imagem
 *   app/icon.png               — o ícone da aba do navegador (e do Google)
 *   app/apple-icon.png         — o ícone de quando salvam o site no iPhone
 *
 * O desenho é o mesmo de components/Marca.tsx. Mudou lá, mude aqui.
 *
 * O KIT COMPLETO DA LOGOMARCA (logo com o nome, versões para fundo
 * escuro, foto de perfil, PNG em alta) fica em:
 *   Documents\Origem Digital\imagens-e-logos\logomarca-gelo-2026\
 *
 * Uso: node scripts/gerar-marca.mjs
 */
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// o degradê do símbolo: azul-claro → violeta → índigo
const CLARO = ["#38BDF8", "#818CF8", "#312E81"];
// a versão clara, para o símbolo em cima do índigo (ícone)
const SOBRE_ESCURO = ["#7DD3FC", "#A5B4FC", "#E0E7FF"];

/** O símbolo, com uma tinta qualquer (cor ou "url(#g)"). */
function simbolo(tinta, cores = CLARO) {
  return `
  <defs>
    <linearGradient id="g" gradientUnits="userSpaceOnUse" x1="4" y1="14" x2="122" y2="52">
      <stop offset="0" stop-color="${cores[0]}"/><stop offset="0.5" stop-color="${cores[1]}"/><stop offset="1" stop-color="${cores[2]}"/>
    </linearGradient>
    <clipPath id="d" clipPathUnits="userSpaceOnUse"><polygon points="40.61,-17.69 89.87,45.35 168.7,-16.2 119.4,-79.3"/></clipPath>
    <clipPath id="o" clipPathUnits="userSpaceOnUse"><polygon points="28.01,-7.83 77.27,55.21 -1.53,116.8 -50.79,53.74"/></clipPath>
  </defs>
  <g fill="none" stroke="${tinta}" stroke-width="9">
    <path d="M42 53.5A21.5 21.5 0 1 1 58.94 18.76L86.09 53.5H98A21.5 21.5 0 0 0 98 10.5H92"/>
    <path d="M98 10.5H44" clip-path="url(#d)"/>
    <path d="M63.42 30.13A21.5 21.5 0 0 1 38.27 53.17" clip-path="url(#o)"/>
  </g>
  <g fill="${tinta}">
    <rect x="9" y="23" width="5" height="5" rx=".8"/><rect x="2.5" y="30" width="4" height="4" rx=".7"/>
    <rect x="10" y="35" width="4.5" height="4.5" rx=".8"/><rect x="4" y="41.5" width="3.5" height="3.5" rx=".6"/>
  </g>`;
}

const simboloSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 64" width="128" height="64">${simbolo("url(#g)")}</svg>\n`;

/** Quadrado índigo com o símbolo claro no meio (o ícone de app). */
function icone(tam, raio) {
  const larg = tam * 0.66;
  const escala = larg / 128;
  const x = (tam - larg) / 2;
  const y = (tam - 64 * escala) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${tam}" height="${tam}" viewBox="0 0 ${tam} ${tam}">
  <defs><linearGradient id="fundo" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#4F46E5"/><stop offset="1" stop-color="#1E1B4B"/>
  </linearGradient></defs>
  <rect width="${tam}" height="${tam}" rx="${raio}" fill="url(#fundo)"/>
  <g transform="translate(${x} ${y}) scale(${escala})">${simbolo("url(#g)", SOBRE_ESCURO)}</g>
</svg>`;
}

const raiz = fileURLToPath(new URL("..", import.meta.url));

await writeFile(join(raiz, "public/media/simbolo.svg"), simboloSvg);
await sharp(Buffer.from(simboloSvg), { density: 72 * 8 }).resize({ width: 1024 }).png().toFile(join(raiz, "public/media/simbolo.png"));
await sharp(Buffer.from(icone(512, 112))).resize(192, 192).png().toFile(join(raiz, "app/icon.png"));
// O iPhone arredonda sozinho: aqui o quadrado vai sem canto.
await sharp(Buffer.from(icone(540, 0))).resize(180, 180).png().toFile(join(raiz, "app/apple-icon.png"));

console.log("ícones gerados");
