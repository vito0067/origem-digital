/**
 * Corta a barra de rolagem do navegador que ficou gravada na borda
 * direita do print do site do cliente.
 *
 * Quem tira print da tela inteira leva junto a barra de rolagem: uma
 * faixa escura vertical colada na direita. Num cartão de portfólio
 * isso denuncia que é uma captura de tela, em vez de parecer o site.
 *
 * O script NÃO CHUTA onde cortar. Ele mede: percorre as colunas da
 * direita para a esquerda e compara o brilho médio de cada uma com o
 * do miolo da imagem. A barra é bem mais escura que o site (que aqui
 * é claro, em tons de rosa e lilás), então a primeira coluna que
 * volta ao brilho normal marca o fim dela.
 *
 * Se um dia o print for de um site escuro, a medição por brilho pode
 * não separar barra e conteúdo — nesse caso passe o corte na mão:
 *   node scripts/tirar-barra-do-print.mjs 18
 *
 * COMO USAR:  node scripts/tirar-barra-do-print.mjs [colunas]
 *
 * É seguro rodar de novo: parte sempre do original guardado em
 * _antigos/midia-original.
 */

import sharp from "sharp";
import { copyFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const RAIZ = process.cwd();
const ORIGINAL = path.join(RAIZ, "_antigos", "midia-original", "print-mundodasa.png");
const SAIDA = path.join(RAIZ, "public", "media", "print-mundodasa.jpg");

/** Até onde procurar a barra, em pixels a partir da direita. */
const BUSCA = 60;
/** O quanto mais escura a coluna precisa ser para contar como barra. */
const LIMITE_ESCURO = 0.78;

await mkdir(path.dirname(ORIGINAL), { recursive: true });
await stat(ORIGINAL); // se não existir, o erro já diz o que falta

const base = sharp(ORIGINAL);
const { width, height } = await base.metadata();
if (!width || !height) throw new Error("não consegui ler o tamanho da imagem");

/** Brilho médio de uma faixa vertical de 1px. */
async function brilhoDaColuna(x) {
  const { data } = await sharp(ORIGINAL)
    .extract({ left: x, top: 0, width: 1, height })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let soma = 0;
  for (const v of data) soma += v;
  return soma / data.length / 255;
}

let corte = Number(process.argv[2]);

if (!Number.isFinite(corte)) {
  // referência: uma coluna do miolo, longe de qualquer borda
  const referencia = await brilhoDaColuna(Math.floor(width * 0.6));

  corte = 0;
  for (let i = 1; i <= BUSCA; i++) {
    const brilho = await brilhoDaColuna(width - i);
    if (brilho < referencia * LIMITE_ESCURO) corte = i;
  }
  // uma coluna a mais, para não sobrar a linha de transição
  if (corte > 0) corte += 1;
}

if (corte <= 0) {
  console.log("Nenhuma barra escura encontrada na borda direita — nada a cortar.");
  process.exit(0);
}

const antes = (await stat(SAIDA).catch(() => ({ size: 0 }))).size;

await sharp(ORIGINAL)
  .extract({ left: 0, top: 0, width: width - corte, height })
  .resize({ width: 1600, withoutEnlargement: true })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(SAIDA);

const depois = (await stat(SAIDA)).size;
const kb = (n) => Math.round(n / 1024);

console.log(
  `print-mundodasa\n` +
    `  imagem original:   ${width}x${height}\n` +
    `  barra encontrada:  ${corte}px na borda direita\n` +
    `  recortada para:    ${width - corte}x${height}\n` +
    `  arquivo:           ${kb(antes)} KB -> ${kb(depois)} KB`
);
