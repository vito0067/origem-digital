/**
 * Encolhe o vídeo de fundo da capa.
 *
 * O ORIGINAL: 1280x720, 24 quadros por segundo, 5 segundos, 483 KB.
 *
 * POR QUE DÁ PARA SER AGRESSIVO AQUI: este vídeo nunca é visto de
 * verdade. Ele fica atrás de tudo, a 40% de opacidade, coberto por
 * dois degradês e por uma grade neon. Serve como textura, não como
 * imagem. Detalhe fino nele é peso jogado fora — literalmente, no 4G
 * do cliente.
 *
 * O QUE O SCRIPT FAZ:
 *
 *  1. Reduz para 960x540. Na tela ele é esticado para cobrir a capa
 *     inteira e ainda por cima recebe um zoom leve — borrão a mais
 *     nessa camada some dentro dos degradês.
 *  2. Aumenta a compressão (CRF 32). Em vídeo escuro e desfocado,
 *     esse nível não aparece.
 *  3. Tira o áudio. O vídeo já toca mudo no site; o canal de som era
 *     peso sem função.
 *  4. Gera TAMBÉM uma versão WebM. O formato comprime bem melhor que
 *     o MP4, e os navegadores escolhem sozinhos o que sabem tocar —
 *     quem não souber cai no MP4, que continua ali.
 *  5. Move o índice do MP4 para o começo do arquivo (faststart), para
 *     ele começar a tocar enquanto ainda está baixando, em vez de
 *     esperar o arquivo inteiro.
 *
 * COMO USAR:  node scripts/comprimir-video.mjs
 *
 * É seguro rodar de novo: o original vai para _antigos/midia-original
 * na primeira vez, e as vezes seguintes sempre partem dele.
 */

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { copyFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import ffmpeg from "ffmpeg-static";

const rodar = promisify(execFile);

const RAIZ = process.cwd();
const MIDIA = path.join(RAIZ, "public", "media");
const ORIGINAIS = path.join(RAIZ, "_antigos", "midia-original");

const NOME = "hero-video.mp4";
const ALVO_MP4 = path.join(MIDIA, NOME);
const ALVO_WEBM = path.join(MIDIA, "hero-video.webm");
const GUARDADO = path.join(ORIGINAIS, NOME);

await mkdir(ORIGINAIS, { recursive: true });

try {
  await stat(GUARDADO);
} catch {
  await copyFile(ALVO_MP4, GUARDADO);
}

const antes = (await stat(GUARDADO)).size;
const kb = (n) => Math.round(n / 1024);

const ESCALA = "scale=960:-2";

console.log("Recodificando o MP4...");
await rodar(ffmpeg, [
  "-y",
  "-i", GUARDADO,
  "-an",                       // sem áudio: o vídeo toca mudo no site
  "-vf", ESCALA,
  "-c:v", "libx264",
  "-preset", "veryslow",       // demora mais para codificar, arquivo menor
  "-crf", "32",
  "-pix_fmt", "yuv420p",       // compatível com qualquer navegador
  "-movflags", "+faststart",   // começa a tocar antes de baixar tudo
  ALVO_MP4,
]);

console.log("Gerando a versão WebM...");
await rodar(ffmpeg, [
  "-y",
  "-i", GUARDADO,
  "-an",
  "-vf", ESCALA,
  "-c:v", "libvpx-vp9",
  "-crf", "40",
  "-b:v", "0",                 // qualidade constante, sem teto de taxa
  "-deadline", "good",
  "-cpu-used", "2",
  "-row-mt", "1",
  ALVO_WEBM,
]);

const mp4 = (await stat(ALVO_MP4)).size;
const webm = (await stat(ALVO_WEBM)).size;

console.log(
  `\nhero-video\n` +
    `  original:  ${kb(antes)} KB\n` +
    `  mp4 novo:  ${kb(mp4)} KB  (${Math.round((1 - mp4 / antes) * 100)}% menor)\n` +
    `  webm:      ${kb(webm)} KB  (${Math.round((1 - webm / antes) * 100)}% menor)\n\n` +
    `  Quase todo navegador atual toca WebM, então na prática o que vai\n` +
    `  para o cliente é o menor dos dois. O MP4 fica de reserva.\n\n` +
    `  ⚠️ Abra a capa do site e confira o fundo antes de publicar.`
);
