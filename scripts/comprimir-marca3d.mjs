/**
 * Encolhe o arquivo 3D da marca (public/media/marca.glb).
 *
 * O QUE O ARQUIVO TEM (medido com scripts/analisar-marca3d.mjs):
 * uma malha só, 25.027 vértices, 25.423 triângulos, nenhuma textura,
 * nenhum material, nenhuma animação. É geometria pura.
 *
 * ONDE ESTAVA O PESO, E O QUE FOI FEITO:
 *
 *  1. COORDENADAS DE TEXTURA (98 KB) — o arquivo guardava, para cada
 *     vértice, a posição dele numa textura. Só que não existe textura:
 *     o material de vidro da marca é montado no código, em
 *     MarcaTridimensional.tsx. Eram 98 KB descrevendo algo que nunca é
 *     usado. Apagados.
 *
 *  2. TRIÂNGULOS DEMAIS — 25 mil triângulos numa peça que aparece com
 *     uns 300 pixels de largura. O `simplify` reduz a malha respeitando
 *     um limite de erro: ele só junta triângulos enquanto o contorno
 *     não se afastar mais do que o tolerado.
 *
 *  3. SEM COMPRESSÃO — os números da geometria estavam soltos no
 *     arquivo. O `meshopt` reempacota tudo num formato comprimido.
 *
 * SOBRE O MESHOPT — por que ele e não o Draco:
 * Os dois comprimem geometria, e o Draco chega a apertar mais. Só que
 * o Draco precisa de um decodificador de uns 200 KB em WebAssembly
 * para o navegador abrir o arquivo — na prática você devolve no
 * download o que economizou. O decodificador do meshopt tem cerca de
 * 25 KB, JÁ VEM DENTRO DO three.js que o site usa, e não precisa
 * baixar nada de fora.
 *
 * ⚠️ QUEM ABRE O ARQUIVO PRECISA SABER DESCOMPRIMIR.
 * Em MarcaTridimensional.tsx o carregador recebe o decodificador com
 * `setMeshoptDecoder`. Se alguém tirar aquela linha, a marca 3D some
 * da capa e cai na imagem de reserva. As duas coisas andam juntas.
 *
 * ⚠️ A marca é a primeira coisa que a pessoa vê. Depois de rodar isto,
 * ABRA O SITE e confira o formato e o brilho. Se ficar facetada, suba
 * o ERRO_MAXIMO ou o ALVO_TRIANGULOS.
 *
 * COMO USAR:  node scripts/comprimir-marca3d.mjs
 *
 * É seguro rodar de novo: o original é guardado em
 * _antigos/midia-original na primeira vez, e as vezes seguintes sempre
 * partem dele.
 */

import { NodeIO } from "@gltf-transform/core";
import { KHRONOS_EXTENSIONS, EXTMeshoptCompression } from "@gltf-transform/extensions";
import {
  dedup,
  prune,
  weld,
  simplify,
  reorder,
  quantize,
} from "@gltf-transform/functions";
import { MeshoptSimplifier, MeshoptEncoder } from "meshoptimizer";
import { copyFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";

/** Quanto da malha sobra. 0.45 = fica com 45% dos triângulos. */
const ALVO_TRIANGULOS = 0.45;
/** O quanto o contorno pode se afastar do original. Quanto menor, mais fiel. */
const ERRO_MAXIMO = 0.002;

const RAIZ = process.cwd();
const ALVO = path.join(RAIZ, "public", "media", "marca.glb");
const GUARDADO = path.join(RAIZ, "_antigos", "midia-original", "marca.glb");

await mkdir(path.dirname(GUARDADO), { recursive: true });
try {
  await stat(GUARDADO);
} catch {
  await copyFile(ALVO, GUARDADO);
}

const antes = (await stat(GUARDADO)).size;

await MeshoptSimplifier.ready;
await MeshoptEncoder.ready;

const io = new NodeIO()
  .registerExtensions([...KHRONOS_EXTENSIONS, EXTMeshoptCompression])
  .registerDependencies({ "meshopt.encoder": MeshoptEncoder });

const doc = await io.read(GUARDADO);

// 1. fora as coordenadas de textura: não há textura para elas apontarem
let uvsRemovidas = 0;
for (const malha of doc.getRoot().listMeshes()) {
  for (const parte of malha.listPrimitives()) {
    for (const nome of parte.listSemantics()) {
      if (nome.startsWith("TEXCOORD")) {
        parte.setAttribute(nome, null);
        uvsRemovidas++;
      }
    }
  }
}

const contar = () => {
  let t = 0;
  for (const m of doc.getRoot().listMeshes())
    for (const p of m.listPrimitives()) {
      const i = p.getIndices();
      t += i ? i.getCount() / 3 : (p.getAttribute("POSITION")?.getCount() ?? 0) / 3;
    }
  return Math.round(t);
};

const triAntes = contar();

await doc.transform(
  dedup(),
  prune(),
  weld(),
  simplify({
    simplifier: MeshoptSimplifier,
    ratio: ALVO_TRIANGULOS,
    error: ERRO_MAXIMO,
  }),
  // REORDENAR ANTES DE COMPRIMIR — é o passo que mais rende e o mais
  // fácil de esquecer. O compressor guarda a diferença de um vértice
  // para o seguinte; com os vértices espalhados em ordem aleatória,
  // cada diferença é grande e comprime mal. Reordenado, vizinhos na
  // lista são vizinhos no desenho, as diferenças ficam pequenas e o
  // arquivo despenca. Sozinho, este passo vale mais do que o resto.
  reorder({ encoder: MeshoptEncoder }),
  // Guardar posição e normal em números inteiros curtos em vez de
  // decimais longos. 12 bits de posição dão 4096 passos em cada eixo —
  // muito mais do que se enxerga numa peça de 300 pixels. A normal,
  // que só aponta direção para a luz, vive bem com 8.
  quantize({ quantizePosition: 12, quantizeNormal: 8 })
);

const triDepois = contar();

doc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({
  // FILTER aproveita o fato de a normal ser sempre um vetor de
  // comprimento 1 e guarda só o ângulo. Comprime melhor que QUANTIZE.
  method: EXTMeshoptCompression.EncoderMethod.FILTER,
});

await io.write(ALVO, doc);

const depois = (await stat(ALVO)).size;
const kb = (n) => Math.round(n / 1024);

console.log(
  `marca.glb\n` +
    `  coordenadas de textura removidas: ${uvsRemovidas}\n` +
    `  triângulos: ${triAntes.toLocaleString("pt-BR")} -> ${triDepois.toLocaleString("pt-BR")}` +
    `  (${Math.round((1 - triDepois / triAntes) * 100)}% a menos)\n` +
    `  tamanho:    ${kb(antes)} KB -> ${kb(depois)} KB` +
    `  (${Math.round((1 - depois / antes) * 100)}% menor)\n\n` +
    `  ⚠️ Confira a marca 3D na capa do site antes de publicar.`
);
