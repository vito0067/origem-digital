"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Atraso em milissegundos antes de revelar. */
  delay?: number;
  /**
   * De onde o conteúdo entra. O padrão continua sendo "baixo", que é o
   * comportamento antigo — nenhuma seção quebra por causa disso.
   *
   * Use "esquerda" e "direita" em blocos que ficam em colunas opostas:
   * é o que dá a sensação de a página se montar para os lados, em vez
   * de tudo subir do mesmo jeito.
   */
  de?: "baixo" | "esquerda" | "direita" | "parado";
  /** Distância percorrida, em pixels. */
  distancia?: number;
  className?: string;
};

const DESLOCAMENTO = {
  baixo: (d: number) => `translate3d(0, ${d}px, 0)`,
  esquerda: (d: number) => `translate3d(-${d}px, 0, 0)`,
  direita: (d: number) => `translate3d(${d}px, 0, 0)`,
  parado: () => "none",
};

/**
 * Revela o conteúdo quando ele entra na tela.
 *
 * Além do fade, acrescenta a classe `desenhado` assim que fica visível —
 * é o gancho que o traço neon dos títulos usa para se desenhar da
 * esquerda para a direita (regra `.desenhado .regua-neon` no globals.css).
 *
 * Para quem pediu menos movimento no sistema, aparece tudo pronto.
 */
export default function Reveal({
  children,
  delay = 0,
  de = "baixo",
  distancia = 28,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisivel(true);
      return;
    }

    const vigia = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            setVisivel(true);
            vigia.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    vigia.observe(el);
    return () => vigia.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${visivel ? "desenhado" : ""}`}
      style={{
        transform: visivel ? "none" : DESLOCAMENTO[de](distancia),
        opacity: visivel ? 1 : 0,
        // O desfoque sumindo junto com o movimento é o que faz o bloco
        // parecer entrar em foco, em vez de só deslizar.
        filter: visivel ? "none" : "blur(6px)",
        transition:
          "transform .85s cubic-bezier(.22,1,.36,1), opacity .7s ease, filter .7s ease",
        // Depois do atalho `transition`, senão o atraso é zerado por ele.
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
