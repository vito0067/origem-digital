"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

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
  /**
   * NA CARGA: entra assim que a página aparece, por CSS, sem esperar o
   * JavaScript. Use SÓ no que já está na primeira tela (o topo da capa).
   *
   * Por quê: no modo normal, o bloco sai do servidor invisível e só
   * aparece depois que o JavaScript carrega e percebe que ele está na
   * tela. Num celular comum isso leva 2 a 4 segundos — a capa ficava
   * com o título pela metade e o parágrafo em branco esse tempo todo.
   * O Lighthouse media isso como "maior conteúdo da tela em 4,9 s".
   * Com a animação no CSS, ela começa no primeiro instante, e o texto
   * aparece mesmo se o JavaScript falhar.
   */
  naCarga?: boolean;
  /**
   * A tag do bloco. Use "li" quando o Reveal for um item de lista: um
   * <div> entre o <ul> e o <li> quebra a lista para leitor de tela (o
   * Lighthouse acusava isso como erro de acessibilidade).
   */
  como?: "div" | "li";
};

const DESLOCAMENTO = {
  baixo: (d: number) => `translate3d(0, ${d}px, 0)`,
  esquerda: (d: number) => `translate3d(-${d}px, 0, 0)`,
  direita: (d: number) => `translate3d(${d}px, 0, 0)`,
  parado: () => "none",
};

/** O mesmo deslocamento, em variáveis, para a animação de CSS da carga. */
const PONTO_DE_PARTIDA = {
  baixo: (d: number) => ({ "--de-x": "0px", "--de-y": `${d}px` }),
  esquerda: (d: number) => ({ "--de-x": `-${d}px`, "--de-y": "0px" }),
  direita: (d: number) => ({ "--de-x": `${d}px`, "--de-y": "0px" }),
  parado: () => ({ "--de-x": "0px", "--de-y": "0px" }),
};

/**
 * Revela o conteúdo quando ele entra na tela.
 *
 * Além do fade, acrescenta a classe `desenhado` assim que fica visível —
 * é o gancho que o traço neon dos títulos usa para se desenhar da
 * esquerda para a direita (regra `.desenhado .regua-neon` no globals.css).
 *
 * MAIS CURTO E SEM DESFOQUE (limpeza de outubro/2026). Antes cada bloco
 * percorria 28px e saía de um desfoque. Repetido em quase todo bloco da
 * página, isso dava a sensação de o site inteiro estar "chegando" o
 * tempo todo. Com 18px e sem desfoque a entrada continua perceptível,
 * mas some do caminho da leitura — e desfoque animado ainda custa caro
 * para celular simples.
 *
 * Para quem pediu menos movimento no sistema, aparece tudo pronto. Sem
 * JavaScript, uma regra em <noscript> no layout mostra tudo também
 * (o atributo `data-reveal` é o gancho dela).
 */
export default function Reveal({
  children,
  delay = 0,
  de = "baixo",
  distancia = 18,
  className = "",
  naCarga = false,
  como = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (naCarga) return; // quem entra na carga não precisa de vigia
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
  }, [naCarga]);

  const Tag = como;

  if (naCarga) {
    return (
      <Tag
        ref={ref as never}
        className={`${className} desenhado`}
        style={
          {
            ...PONTO_DE_PARTIDA[de](distancia),
            animation: `revelaNaCarga .7s cubic-bezier(.22,1,.36,1) ${delay}ms both`,
          } as CSSProperties
        }
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref as never}
      data-reveal
      className={`${className} ${visivel ? "desenhado" : ""}`}
      style={{
        transform: visivel ? "none" : DESLOCAMENTO[de](distancia),
        opacity: visivel ? 1 : 0,
        transition: "transform .7s cubic-bezier(.22,1,.36,1), opacity .6s ease",
        // Depois do atalho `transition`, senão o atraso é zerado por ele.
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
