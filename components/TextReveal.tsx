"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** O texto a revelar. Use só texto puro — a marcação fica fora. */
  children: string;
  /** Milissegundos entre uma palavra e a próxima. */
  passo?: number;
  /** De onde as palavras vêm: de baixo, da esquerda ou da direita. */
  origem?: "baixo" | "esquerda" | "direita";
  className?: string;
  /** Tag renderizada. Use h1/h2 para manter a semântica do título. */
  como?: "h1" | "h2" | "h3" | "p" | "span";
};

/**
 * Revela um texto palavra por palavra quando ele entra na tela.
 *
 * CSS puro, sem biblioteca: cada palavra é um span com um atraso próprio.
 * Sem JavaScript o texto aparece completo — nunca fica invisível.
 *
 * Use nos títulos das seções, não em parágrafo longo: palavra por palavra
 * em texto corrido atrasa a leitura e irrita.
 *
 * NUNCA use junto com a classe `text-gradient-neon`.
 * O degradê pinta as letras recortando o fundo do parágrafo inteiro, e
 * aqui cada palavra fica fechada dentro da própria máscara (overflow
 * hidden) — o fundo não atravessa e o texto some da tela, sem erro
 * nenhum no console. Para título com degradê, use <Reveal de="esquerda">
 * em volta de um <p> comum: o efeito de entrada é praticamente o mesmo.
 */
export default function TextReveal({
  children,
  passo = 55,
  origem = "baixo",
  className = "",
  como = "h2",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visivel, setVisivel] = useState(false);
  const [ligado, setLigado] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisivel(true);
      return;
    }
    setLigado(true);

    const el = ref.current;
    if (!el) return;
    const vigia = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisivel(true);
          vigia.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -40px 0px" }
    );
    vigia.observe(el);
    return () => vigia.disconnect();
  }, []);

  const deslocamento =
    origem === "esquerda"
      ? "translate3d(-28px,0,0)"
      : origem === "direita"
        ? "translate3d(28px,0,0)"
        : "translate3d(0,0.9em,0)";

  // `keyof JSX.IntrinsicElements` abre o leque de TODAS as tags de HTML
  // e o TypeScript desiste de montar o tipo ("union type too complex").
  // Aqui só existem cinco tags possíveis, e dizer isso resolve.
  const Tag = como;
  const palavras = children.split(" ");

  return (
    <Tag ref={ref as never} className={className}>
      {palavras.map((palavra, i) => (
        <span
          key={`${palavra}-${i}`}
          /**
           * A máscara que esconde a palavra antes de ela entrar.
           *
           * O `overflow: hidden` é o que faz a palavra surgir por trás
           * de uma borda invisível, em vez de simplesmente aparecer.
           *
           * ⚠️ E ERA ELE QUE CORTAVA AS LETRAS.
           * A caixa da máscara tem a altura da linha, e os títulos do
           * site usam entrelinha apertada (1.05 a 1.1). A perna do "g",
           * do "p" e do "ç" desce abaixo dessa altura e o overflow
           * cortava: "negócio" e "agente" apareciam com o g raspado.
           *
           * A correção é esticar a caixa para baixo com `padding` e
           * puxá-la de volta com a mesma medida de `margin` negativa: a
           * perna da letra passa a caber dentro da máscara e nada muda
           * de lugar na página. O 0.24em cobre a descida da Space
           * Grotesk com folga.
           */
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            paddingBottom: "0.24em",
            marginBottom: "-0.24em",
          }}
        >
          <span
            style={{
              display: "inline-block",
              transform: ligado && !visivel ? deslocamento : "translate3d(0,0,0)",
              opacity: ligado && !visivel ? 0 : 1,
              transition: `transform .75s cubic-bezier(.22,1,.36,1) ${i * passo}ms, opacity .6s ease ${i * passo}ms`,
            }}
          >
            {palavra}
          </span>
          {i < palavras.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
