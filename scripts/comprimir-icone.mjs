// Reduz o ícone da aba (app/icon.png) de 512×512 / 84 KB para 192×192.
// Uso: node icone.mjs <pasta-do-projeto>
// O original fica guardado em _antigos/midia-original.
import sharp from "sharp";
import { copyFileSync, mkdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const raiz = process.argv[2];
const icone = join(raiz, "app", "icon.png");
const guarda = join(raiz, "_antigos", "midia-original");
mkdirSync(guarda, { recursive: true });
const copia = join(guarda, "icon-512-original.png");
if (!existsSync(copia)) copyFileSync(icone, copia);

const antes = statSync(copia).size;
const buf = await sharp(copia)
  .resize(192, 192, { kernel: "lanczos3" })
  .png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 })
  .toBuffer();
await sharp(buf).toFile(icone);
const depois = statSync(icone).size;
const meta = await sharp(icone).metadata();
console.log(`icon.png: ${Math.round(antes / 1024)} KB -> ${Math.round(depois / 1024)} KB (${meta.width}x${meta.height})`);
