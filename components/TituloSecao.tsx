import Reveal from "./Reveal";
import TextReveal from "./TextReveal";

type Props = {
  /** Palavra-chave pequena acima do título. */
  etiqueta: string;
  /** Título da seção. Texto puro: a marcação fica por conta do componente. */
  titulo: string;
  /** Linha de apoio, opcional. */
  apoio?: string;
  /** Cor da etiqueta e do traço. */
  tom?: "cyan" | "violet";
  /** Alinhamento. O padrão é à esquerda — centralizar é a exceção. */
  centro?: boolean;
  className?: string;
};

const TOM = {
  cyan: "text-cyan-neon",
  violet: "text-violet-neon",
};

/**
 * Cabeçalho padrão de seção: etiqueta, traço que se desenha da esquerda
 * para a direita, título entrando palavra por palavra e linha de apoio.
 *
 * Existe para que toda seção comece do mesmo jeito. Quando o começo é
 * sempre igual, o olho para de procurar onde a informação começa e a
 * página inteira parece mais organizada — é o que separa um site caro
 * de um amontoado de blocos bonitos.
 */
export default function TituloSecao({
  etiqueta,
  titulo,
  apoio,
  tom = "cyan",
  centro = false,
  className = "",
}: Props) {
  return (
    <Reveal className={className}>
      <div className={centro ? "mx-auto max-w-3xl text-center" : ""}>
        <div
          className={`flex items-center gap-4 ${centro ? "justify-center" : ""}`}
        >
          <p
            className={`text-[11px] font-semibold uppercase tracking-[0.35em] ${TOM[tom]}`}
          >
            {etiqueta}
          </p>
          <span aria-hidden className="regua-neon w-16 sm:w-24" />
        </div>

        <TextReveal
          como="h2"
          passo={52}
          origem="esquerda"
          className="equilibrado mt-5 max-w-3xl font-display text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-[2.75rem]"
        >
          {titulo}
        </TextReveal>

        {apoio && (
          <p
            className={`mt-5 max-w-xl leading-relaxed text-slate-400 ${
              centro ? "mx-auto" : ""
            }`}
          >
            {apoio}
          </p>
        )}
      </div>
    </Reveal>
  );
}
