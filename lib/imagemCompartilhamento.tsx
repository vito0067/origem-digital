import { ImageResponse } from "next/og";

/**
 * O DESENHO DA IMAGEM QUE APARECE QUANDO ALGUÉM COMPARTILHA UM LINK.
 *
 * É o que o WhatsApp mostra quando você manda um link do site numa
 * conversa — e também o que aparece no Instagram, no LinkedIn e no
 * Google. Como toda a prospecção termina com um link no WhatsApp, esta
 * imagem é o primeiro contato visual que o cliente tem com a empresa.
 *
 * O desenho mora aqui, num lugar só, e cada página escolhe o texto:
 *   app/opengraph-image.tsx          → a imagem do site inteiro
 *   app/clinicas/opengraph-image.tsx → a imagem da página de clínicas
 * Para outro ramo, copie o arquivo de clínicas e troque as duas frases.
 *
 * ⚠️ CUIDADOS QUE EXISTEM PARA O BUILD NÃO QUEBRAR NO WINDOWS.
 * NÃO TROQUE SEM LER:
 *
 * 1. Os arquivos que chamam esta função declaram `runtime = "edge"`. No
 *    modo normal, a biblioteca que desenha a imagem monta o caminho dos
 *    arquivos internos dela juntando texto de URL com barra do Windows,
 *    e isso estoura ("TypeError: Invalid URL") logo na importação.
 *
 * 2. A fonte e a marca são buscadas com `new URL(..., import.meta.url)`
 *    em vez de lidas do disco. No motor edge não existe leitura de
 *    arquivo; essa é a forma que funciona nos dois lados, aqui e na
 *    Vercel. Os caminhos abaixo partem DESTA pasta (lib/). O arquivo
 *    SpaceGrotesk.ttf mora em app/ — não mova sem trocar o caminho.
 *
 * ⚠️ O WhatsApp guarda a prévia antiga por um tempo. Depois de publicar,
 * se o link ainda aparecer com a imagem velha, é memória do WhatsApp:
 * mande o link com algo depois dele (por exemplo, /clinicas?1).
 */

export const TAMANHO = { width: 1200, height: 630 };

/**
 * Transforma os bytes da imagem em texto para embutir no desenho.
 *
 * Vai de 8 em 8 mil bytes porque converter tudo de uma vez estoura a
 * pilha do JavaScript em arquivo grande.
 */
function paraBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let texto = "";
  const passo = 8192;
  for (let i = 0; i < bytes.length; i += passo) {
    const pedaco = bytes.subarray(i, i + passo);
    // `apply` no lugar de espalhar com "...": o TypeScript do projeto
    // não permite espalhar Uint8Array, e o resultado é o mesmo.
    texto += String.fromCharCode.apply(
      null,
      pedaco as unknown as number[]
    );
  }
  return btoa(texto);
}

/** Bolinha separadora — desenhada, porque a fonte não tem símbolo nenhum. */
const separador = (
  <div
    style={{
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#A855F7",
    }}
  />
);

export async function imagemCompartilhamento({
  titulo,
  subtitulo,
}: {
  /** A frase grande, em branco. Cabe bem até uns 50 caracteres. */
  titulo: string;
  /** A linha em ciano embaixo dela. */
  subtitulo: string;
}) {
  const [fonte, logo] = await Promise.all([
    fetch(new URL("../app/SpaceGrotesk.ttf", import.meta.url)).then((r) =>
      r.arrayBuffer()
    ),
    fetch(new URL("../public/media/logo-full.png", import.meta.url)).then((r) =>
      r.arrayBuffer()
    ),
  ]);

  const marca = `data:image/png;base64,${paraBase64(logo)}`;

  // O desenhador desta imagem entende bem menos CSS do que um navegador:
  // um `background-image` com vários degradês empilhados (que é como o
  // site faz a grade neon) faz ele engasgar. Por isso o fundo abaixo é
  // um degradê só, na diagonal, do ciano ao violeta — as cores da marca,
  // num jeito que ele desenha sem reclamar.
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "Space Grotesk",
          backgroundColor: "#0B0D17",
          // 225deg põe o ciano no canto superior DIREITO e o violeta no
          // inferior esquerdo. O canto superior esquerdo fica escuro de
          // propósito: é onde a marca fica.
          backgroundImage:
            "linear-gradient(225deg, rgba(0,240,255,0.20) 0%, rgba(11,13,23,0) 42%, rgba(11,13,23,0) 60%, rgba(168,85,247,0.22) 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={marca} alt="" height={88} style={{ objectFit: "contain" }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 62,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              maxWidth: 940,
            }}
          >
            {titulo}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 32,
              color: "#00F0FF",
              lineHeight: 1.3,
              maxWidth: 900,
            }}
          >
            {subtitulo}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 24,
            color: "#94a3b8",
          }}
        >
          <div style={{ display: "flex" }}>origemdigitalsite.com.br</div>
          {separador}
          <div style={{ display: "flex" }}>(11) 93929-9209</div>
          {separador}
          <div style={{ display: "flex" }}>Diagnóstico gratuito</div>
        </div>
      </div>
    ),
    {
      ...TAMANHO,
      fonts: [{ name: "Space Grotesk", data: fonte, style: "normal" }],
    }
  );
}
