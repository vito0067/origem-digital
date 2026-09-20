import { ImageResponse } from "next/og";

/**
 * A IMAGEM QUE APARECE QUANDO ALGUÉM COMPARTILHA O SITE.
 *
 * É o que o WhatsApp mostra quando você manda origemdigitalsite.com.br
 * numa conversa — e também o que aparece no Instagram, no LinkedIn e
 * no Google. Antes disso existir, o link virava um retângulo cinza só
 * com texto.
 *
 * Como toda a prospecção termina com o link sendo mandado no WhatsApp,
 * esta imagem é o primeiro contato visual que o cliente tem com a
 * empresa. Por isso ela repete a cara do site: fundo abissal, grade
 * neon, a marca e a frase que explica o que a Origem Digital vende.
 *
 * COMO FUNCIONA: o Next gera esta imagem sozinho na hora de publicar e
 * serve em /opengraph-image. Não existe arquivo de imagem para manter —
 * mexer no texto aqui já muda o que o WhatsApp mostra na próxima
 * publicação.
 *
 * ⚠️ O WhatsApp guarda o preview antigo por um tempo. Depois de
 * publicar, se o link ainda aparecer sem imagem, é cache: mande o link
 * com algo depois dele (origemdigitalsite.com.br/?1) para forçar.
 *
 * ⚠️ DUAS COISAS AQUI EXISTEM PARA O BUILD NÃO QUEBRAR NO WINDOWS.
 * NÃO TROQUE SEM LER:
 *
 * 1. `runtime = "edge"`. No modo normal, a biblioteca que desenha a
 *    imagem monta o caminho dos arquivos internos dela juntando texto
 *    de URL com barra do Windows, e isso estoura ("TypeError: Invalid
 *    URL") logo na importação — antes mesmo de este código rodar. O
 *    motor edge não passa por esse caminho.
 *
 * 2. A fonte e a marca são buscadas com `new URL(..., import.meta.url)`
 *    em vez de lidas do disco. No motor edge não existe leitura de
 *    arquivo; essa é a forma que funciona nos dois lados, aqui e na
 *    Vercel.
 *
 * O arquivo SpaceGrotesk.ttf mora nesta mesma pasta de propósito, por
 * causa do item 2. Não mova.
 */

export const runtime = "edge";

export const alt =
  "Origem Digital — sites profissionais e agentes de IA no WhatsApp para pequenas empresas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Transforma os bytes da imagem em texto para embutir no desenho.
 *
 * Vai de 8 em 8 mil bytes porque converter tudo de uma vez estoura a
 * pilha do JavaScript em arquivo grande — e a marca tem quase 700 KB.
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

export default async function OpenGraphImage() {
  const [fonte, logo] = await Promise.all([
    fetch(new URL("./SpaceGrotesk.ttf", import.meta.url)).then((r) =>
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
          // propósito: é onde a marca fica, e com o ciano atrás dela o
          // logo parecia ter um retângulo mais escuro em volta.
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
            Sites profissionais e agentes de IA no WhatsApp
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
            Seu negócio vendendo no digital em até 2 semanas
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
          {/* Os separadores são bolinhas DESENHADAS, não caracteres.
              Só existe uma fonte carregada aqui, e ela não tem símbolo
              nenhum — um "◆" saía como quadradinho de letra faltando.
              Um div redondo sempre desenha. */}
          <div style={{ display: "flex" }}>origemdigitalsite.com.br</div>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: "#A855F7",
            }}
          />
          <div style={{ display: "flex" }}>(11) 93929-9209</div>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: "#A855F7",
            }}
          />
          <div style={{ display: "flex" }}>Diagnóstico gratuito</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Space Grotesk", data: fonte, style: "normal" }],
    }
  );
}
