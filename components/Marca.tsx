/**
 * A MARCA DA ORIGEM DIGITAL, MONTADA EM DUAS PARTES.
 *
 * O símbolo é um arquivo vetorial; o nome e a assinatura são TEXTO de
 * verdade, escritos aqui. Antes era tudo uma imagem só.
 *
 * Por que separar:
 *
 * 1. LEGIBILIDADE NO MENU. Na barra do topo a marca aparece com 44
 *    pixels de altura. Numa imagem única, a assinatura de duas linhas
 *    ("tecnologia e presença digital / para pequenas empresas") virava
 *    um borrão cinza ilegível — ocupando espaço e não comunicando
 *    nada. Separado, o menu mostra só símbolo e nome, e a assinatura
 *    aparece no rodapé, onde há tamanho para ela ser lida.
 *
 * 2. PESO E NITIDEZ. Texto não tem peso de arquivo e fica perfeito em
 *    qualquer tela e qualquer tamanho.
 *
 * 3. MANUTENÇÃO. Mudar a assinatura é editar uma linha aqui, em vez de
 *    refazer a arte e exportar de novo.
 *
 * O degradê em "DIGITAL" é o mesmo `text-gradient-neon` do resto do
 * site, então a marca e os títulos usam exatamente a mesma cor.
 *
 * ⚠️ A fonte aqui é a Space Grotesk, a mesma dos títulos do site. No
 * arquivo original da marca o nome está em outra fonte parecida. Se
 * algum dia isso incomodar, o caminho é usar o SVG completo
 * (/media/logo-full.svg, que existe e está correto) no lugar deste
 * componente — mas aí a assinatura volta a ficar ilegível no menu.
 *
 * SOBRE O <img> NO LUGAR DO <Image> DO NEXT:
 * O componente de imagem do Next RECUSA arquivos SVG — a requisição
 * volta com erro 400, a menos que se ligue uma opção chamada
 * "dangerouslyAllowSVG" na configuração. E não faz falta: SVG é
 * vetor, não tem o que otimizar nem tamanhos alternativos para gerar.
 * O <img> comum é o certo aqui, e ainda evita uma ida ao otimizador.
 */

const ASSINATURA = ["Tecnologia e presença digital", "para pequenas empresas"];

type Props = {
  /**
   * "linha"     — símbolo e nome lado a lado. Cabe em barra estreita.
   * "empilhada" — símbolo em cima do nome, como no arquivo original.
   */
  formato?: "linha" | "empilhada";
  /** Mostra a assinatura embaixo do nome. */
  assinatura?: boolean;
  className?: string;
};

export default function Marca({
  formato = "linha",
  assinatura = false,
  className = "",
}: Props) {
  const emLinha = formato === "linha";

  return (
    <span
      role="img"
      aria-label="Origem Digital — tecnologia e presença digital para pequenas empresas"
      className={`flex select-none ${
        emLinha ? "items-center gap-2.5" : "flex-col items-center gap-2"
      } ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/media/logo-od.svg"
        alt=""
        aria-hidden
        className={emLinha ? "h-8 w-auto" : "h-12 w-auto"}
      />

      <span
        className={`flex flex-col ${emLinha ? "items-start" : "items-center"}`}
      >
        <span
          className={`whitespace-nowrap font-display font-bold leading-none tracking-[0.06em] ${
            emLinha ? "text-[15px]" : "text-xl"
          }`}
        >
          <span className="text-white">ORIGEM</span>{" "}
          <span className="text-gradient-neon">DIGITAL</span>
        </span>

        {assinatura && (
          <span className="mt-2 flex flex-col items-center gap-0.5">
            {ASSINATURA.map((linha) => (
              <span
                key={linha}
                className="whitespace-nowrap text-[9px] uppercase leading-none tracking-[0.22em] text-slate-500"
              >
                {linha}
              </span>
            ))}
          </span>
        )}
      </span>
    </span>
  );
}
