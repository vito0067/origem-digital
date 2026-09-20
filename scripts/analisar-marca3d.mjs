/**
 * Mostra do que o arquivo 3D da marca é feito, para decidir onde dá
 * para cortar peso sem estragar o desenho.
 *
 * Não altera nada — só lê e conta.
 */

import { NodeIO } from "@gltf-transform/core";
import {
  KHRONOS_EXTENSIONS,
  EXTMeshoptCompression,
} from "@gltf-transform/extensions";
import { MeshoptDecoder, MeshoptEncoder } from "meshoptimizer";
import { stat } from "node:fs/promises";
import path from "node:path";

const alvo = process.argv[2] ?? path.join("public", "media", "marca.glb");

await MeshoptDecoder.ready;
await MeshoptEncoder.ready;

// Depois de comprimido, o arquivo só abre para quem sabe descomprimir
const io = new NodeIO()
  .registerExtensions([...KHRONOS_EXTENSIONS, EXTMeshoptCompression])
  .registerDependencies({
    "meshopt.decoder": MeshoptDecoder,
    "meshopt.encoder": MeshoptEncoder,
  });
const doc = await io.read(alvo);
const raiz = doc.getRoot();

let triangulos = 0;
let vertices = 0;
const atributos = new Map();

for (const malha of raiz.listMeshes()) {
  for (const parte of malha.listPrimitives()) {
    const pos = parte.getAttribute("POSITION");
    if (pos) vertices += pos.getCount();

    const indices = parte.getIndices();
    triangulos += indices ? indices.getCount() / 3 : (pos?.getCount() ?? 0) / 3;

    for (const nome of parte.listSemantics()) {
      const a = parte.getAttribute(nome);
      if (!a) continue;
      const atual = atributos.get(nome) ?? { bytes: 0, tipo: "" };
      atual.bytes += a.getArray()?.byteLength ?? 0;
      atual.tipo = a.getArray()?.constructor.name ?? "";
      atributos.set(nome, atual);
    }
  }
}

const kb = (n) => Math.round(n / 1024);
const tamanho = (await stat(alvo)).size;

console.log(`=== ${alvo} — ${kb(tamanho)} KB ===\n`);
console.log(`  malhas:      ${raiz.listMeshes().length}`);
console.log(`  materiais:   ${raiz.listMaterials().length}`);
console.log(`  texturas:    ${raiz.listTextures().length}`);
console.log(`  animações:   ${raiz.listAnimations().length}`);
console.log(`  vértices:    ${vertices.toLocaleString("pt-BR")}`);
console.log(`  triângulos:  ${Math.round(triangulos).toLocaleString("pt-BR")}`);
console.log(`\n  peso por atributo de cada vértice:`);
for (const [nome, info] of atributos) {
  console.log(`    ${nome.padEnd(12)} ${String(kb(info.bytes)).padStart(4)} KB   (${info.tipo})`);
}

const extensoes = raiz.listExtensionsUsed().map((e) => e.extensionName);
console.log(
  `\n  extensões em uso: ${extensoes.length ? extensoes.join(", ") : "nenhuma"}`
);
