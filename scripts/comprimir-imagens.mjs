/**
 * Reduz o peso das imagens sem que ninguém perceba diferença na tela.
 *
 * O problema que isto resolve: as imagens foram salvas no tamanho em
 * que saíram da ferramenta de design, e não no tamanho em que o site
 * realmente usa. A marca tinha 1186px de largura para aparecer com 44
 * pixels de altura no menu — mais de vinte vezes maior do que precisa.
 * Quem paga essa conta é o cliente abrindo o site no 4G.
 *
 * A regra de cada arquivo está na lista abaixo, com o porquê. O
 * tamanho de destino é sempre o dobro do maior tamanho em que a imagem
 * aparece, para continuar nítida em tela de celular (que tem o dobro
 * de pontos por polegada).
 *
 * COMO USAR:  node scripts/comprimir-imagens.mjs
 *
 * É seguro rodar de novo: o original vai para _antigos/midia-original
 * na primeira vez, e as vezes seguintes partem sempre desse original,
 * então a imagem nunca é comprimida em cima de outra compressão.
 */

import { readdir, mkdir, copyFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const RAIZ = process.cwd();
const MIDIA = path.join(RAIZ, "public", "media");
const ORIGINAIS = path.join(RAIZ, "_antigos", "midia-original");

const trabalhos = [
  {
    arquivo: "frame-inicial.png",
    larguraMax: 1920,
    // Fica atrás do texto da capa, escurecida a 40% e desfocada pelo
    // degradê. Ninguém olha detalhe dela — JPEG a 72 resolve.
    formato: "jpeg",
    qualidade: 72,
    porque: "fundo da capa, sempre escurecido por cima",
  },
  {
    arquivo: "logo-full.png",
    larguraMax: 480,
    // Aparece com 80px de altura no rodapé, no máximo. 480 de largura
    // já dá o dobro da resolução para tela de celular.
    formato: "png",
    porque: "marca completa: menu (44px) e rodapé (80px)",
  },
  {
    arquivo: "logo-od.png",
    larguraMax: 256,
    formato: "png",
    porque: "só o símbolo: reserva da capa e cabeçalho da conversa",
  },
  {
    arquivo: "print-mundodasa.png",
    larguraMax: 1600,
    formato: "jpeg",
    qualidade: 80,
    porque: "print do cliente, mostrado com no máximo 700px de largura",
  },
];

await mkdir(ORIGINAIS, { recursive: true });

const kb = (n) => Math.round(n / 1024);
let antesTotal = 0;
let depoisTotal = 0;

for (const t of trabalhos) {
  const destino = path.join(MIDIA, t.arquivo);
  const guardado = path.join(ORIGINAIS, t.arquivo);

  let origem = guardado;
  try {
    await stat(guardado);
  } catch {
    // primeira vez: guarda o original antes de tocar nele
    try {
      await copyFile(destino, guardado);
      origem = guardado;
    } catch {
      console.log(`  (pulando ${t.arquivo}: não encontrado)`);
      continue;
    }
  }

  const antes = (await stat(origem)).size;
  const img = sharp(origem).resize({
    width: t.larguraMax,
    withoutEnlargement: true,
  });

  const saida =
    t.formato === "jpeg"
      ? path.join(MIDIA, t.arquivo.replace(/\.png$/i, ".jpg"))
      : destino;

  if (t.formato === "jpeg") {
    await img.jpeg({ quality: t.qualidade, mozjpeg: true }).toFile(saida);
  } else {
    // paleta reduzida: logo tem poucas cores, e isso encolhe muito
    await img.png({ compressionLevel: 9, palette: true }).toFile(saida);
  }

  const depois = (await stat(saida)).size;
  antesTotal += antes;
  depoisTotal += depois;

  const trocouNome = saida !== destino;
  console.log(
    `${t.arquivo}${trocouNome ? ` -> ${path.basename(saida)}` : ""}\n` +
      `  ${kb(antes)} KB -> ${kb(depois)} KB  (${Math.round(
        (1 - depois / antes) * 100
      )}% menor)\n` +
      `  ${t.porque}`
  );
}

console.log(
  `\nTOTAL: ${kb(antesTotal)} KB -> ${kb(depoisTotal)} KB ` +
    `(${kb(antesTotal - depoisTotal)} KB a menos)`
);
console.log(`Originais guardados em _antigos/midia-original`);
