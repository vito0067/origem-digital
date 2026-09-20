/**
 * Conserta arquivo que teve os acentos estragados por uma gravação
 * com codificação errada.
 *
 * O QUE ACONTECEU: o arquivo era UTF-8 sem marca de ordem de bytes
 * (BOM). O PowerShell leu como Windows-1252, onde cada byte vira uma
 * letra separada, e gravou de volta como UTF-8 — codificando tudo duas
 * vezes. "Página" virou "PÃ¡gina", "—" virou "â€”".
 *
 * COMO DESFAZ: percorre o texto letra por letra e devolve cada uma ao
 * byte que ela representava em Windows-1252; a sequência de bytes
 * resultante é o UTF-8 original.
 *
 * Atenção ao detalhe que quase estraga o conserto: Windows-1252 NÃO é
 * a mesma coisa que Latin-1. Na faixa 0x80–0x9F ela tem símbolos
 * próprios (€, travessão, aspas curvas) que o Latin-1 não tem. Usar
 * Latin-1 aqui perderia justamente os travessões, que aparecem em
 * quase todo comentário deste projeto. Por isso a tabela abaixo.
 *
 * COMO USAR:  node scripts/consertar-acentos.mjs arquivo1 arquivo2 ...
 */

import { readFile, writeFile } from "node:fs/promises";

/** Windows-1252, faixa 0x80–0x9F: letra -> byte original. */
const ESPECIAIS = new Map(
  Object.entries({
    "€": 0x80, "‚": 0x82, "ƒ": 0x83, "„": 0x84,
    "…": 0x85, "†": 0x86, "‡": 0x87, "ˆ": 0x88,
    "‰": 0x89, "Š": 0x8a, "‹": 0x8b, "Œ": 0x8c,
    "Ž": 0x8e, "‘": 0x91, "’": 0x92, "“": 0x93,
    "”": 0x94, "•": 0x95, "–": 0x96, "—": 0x97,
    "˜": 0x98, "™": 0x99, "š": 0x9a, "›": 0x9b,
    "œ": 0x9c, "ž": 0x9e, "Ÿ": 0x9f,
  })
);

function desfazer(texto) {
  const bytes = [];
  for (const letra of texto) {
    const codigo = letra.codePointAt(0);
    const especial = ESPECIAIS.get(letra);
    if (especial !== undefined) bytes.push(especial);
    else if (codigo <= 0xff) bytes.push(codigo);
    else return null; // letra que não cabe em um byte: não era isso
  }
  return Buffer.from(bytes).toString("utf8");
}

const arquivos = process.argv.slice(2);
if (!arquivos.length) {
  console.error("uso: node scripts/consertar-acentos.mjs arquivo.tsx ...");
  process.exit(1);
}

const estragado = /Ã[-¿]|â€|Ã§|Ã£|Ã©|Ã­|Ã¡|Ãµ/;

for (const arquivo of arquivos) {
  const cru = await readFile(arquivo);
  // tira a marca de ordem de bytes que a gravação errada acrescentou
  const semBom = cru[0] === 0xef && cru[1] === 0xbb && cru[2] === 0xbf
    ? cru.subarray(3)
    : cru;
  const texto = semBom.toString("utf8");

  if (!estragado.test(texto)) {
    console.log(`${arquivo}: já está certo, nada a fazer`);
    continue;
  }

  const certo = desfazer(texto);
  if (certo === null || estragado.test(certo)) {
    console.log(`${arquivo}: NÃO consegui desfazer com segurança — deixei como está`);
    continue;
  }

  await writeFile(arquivo, certo, "utf8");
  console.log(`${arquivo}: consertado`);
}
