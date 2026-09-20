/**
 * Prepara o SVG da marca que saiu do vetorizador automático.
 *
 * O vetorizador entrega o desenho dentro de um quadrado de 1000x1000
 * com o fundo escuro do PNG original pintado por cima de tudo. Isso
 * traz dois problemas para o site:
 *
 *  1. O fundo é opaco. Sobre o vídeo da capa ou sobre qualquer degradê
 *     ele aparece como um quadrado escuro em volta da marca.
 *
 *  2. O desenho ocupa só o meio do quadrado. Como no menu a altura é
 *     fixa (44px), a marca sairia minúscula, cercada de espaço vazio.
 *
 * Este script resolve o primeiro: apaga os grupos que pintam a tela
 * inteira. O recorte (problema 2) é feito depois, com o tamanho real
 * do desenho medido no navegador — que é o único lugar que sabe
 * exatamente onde os traços começam e terminam.
 *
 * COMO USAR:
 *   node scripts/limpar-logo.mjs entrada.svg saida.svg
 *   node scripts/limpar-logo.mjs entrada.svg saida.svg "x y largura altura"
 *
 * O terceiro argumento, quando existe, vira o novo viewBox (o recorte).
 */

import { readFile, writeFile } from "node:fs/promises";
import { optimize } from "svgo";

const [, , entrada, saida, recorte] = process.argv;

if (!entrada || !saida) {
  console.error("uso: node scripts/limpar-logo.mjs entrada.svg saida.svg [recorte]");
  process.exit(1);
}

let svg = await readFile(entrada, "utf8");
const tamanhoAntes = Buffer.byteLength(svg);

// O tamanho da tela sai do próprio arquivo: cada exportação do
// vetorizador vem num tamanho diferente (1000x1000, 1225x816...), e
// prender o detector a um número só fazia ele não achar fundo nenhum.
const vb = svg.match(/viewBox\s*=\s*"\s*0\s+0\s+([\d.]+)\s+([\d.]+)\s*"/);
const LARG = vb ? vb[1] : null;
const ALT = vb ? vb[2] : null;

/**
 * Um grupo é "fundo" quando o traçado dele começa desenhando o
 * retângulo da tela inteira: M 0 ALT → LARG ALT → LARG 0 → 0 0.
 * É assim que o vetorizador marca a moldura do PNG original.
 */
const num = (n) => String(n).replace(".", "\\.") + "(?:\\.0+)?";
const ehFundo = (bloco) => {
  if (!LARG) return false;
  const padrao = new RegExp(
    `M\\s*${num(0)}\\s+${num(ALT)}\\s+L\\s*${num(LARG)}\\s+${num(ALT)}` +
      `\\s+L\\s*${num(LARG)}\\s+${num(0)}\\s+L\\s*${num(0)}\\s+${num(0)}`
  );
  return padrao.test(bloco);
};

const grupos = svg.match(/<g\b[\s\S]*?<\/g>/g) ?? [];
let removidos = 0;

for (const grupo of grupos) {
  if (ehFundo(grupo)) {
    svg = svg.replace(grupo, "");
    removidos++;
  }
}

if (recorte) {
  svg = svg
    .replace(/viewBox\s*=\s*"[^"]*"/, `viewBox="${recorte}"`)
    .replace(/\s(width|height)="[^"]*"/g, "");
}

const { data } = optimize(svg, {
  multipass: true,
  floatPrecision: 2,
  // Nesta versão do svgo o viewBox já é preservado por padrão, então
  // não precisa (nem aceita) desligar o removeViewBox aqui. E o
  // viewBox é justamente o recorte: sem ele a marca voltaria a ficar
  // perdida dentro do quadrado original.
  plugins: ["preset-default"],
});

await writeFile(saida, data, "utf8");

const kb = (n) => Math.round(n / 1024);
console.log(
  `${entrada} -> ${saida}\n` +
    `  grupos de fundo removidos: ${removidos}\n` +
    `  ${kb(tamanhoAntes)} KB -> ${kb(Buffer.byteLength(data))} KB` +
    (recorte ? `\n  recorte aplicado: ${recorte}` : "\n  (sem recorte ainda)")
);
