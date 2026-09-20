"use client";

import { useRef, type ReactNode } from "react";

/**
 * Cartão que reage ao cursor de duas formas:
 *
 *  1. BRILHO — uma luz ciano acompanha o mouse por dentro do cartão.
 *  2. INCLINAÇÃO (opcional) — o cartão gira de leve na direção do
 *     cursor, como se fosse uma placa apoiada no ar.
 *
 * As duas saem do MESMO movimento de mouse. Isso é de propósito: um
 * ouvinte só alimenta os dois efeitos, então ligar a inclinação não
 * custa processamento a mais do que já custava o brilho.
 *
 * O desenho é todo do CSS (`.holofote` e `.inclina` no globals.css);
 * aqui só escrevemos quatro números — onde o mouse está e quanto
 * girar. Em aparelho de toque nada acontece, que é o certo: no celular
 * o efeito ficaria preso onde a pessoa tocou.
 */

/**
 * Quantos graus o cartão gira de ponta a ponta. O cursor no canto
 * chega à metade disso, porque a distância até o centro é meia
 * largura — ou seja, 8 aqui dá uns 4 graus no canto. Acima de uns 14
 * o cartão começa a parecer que vai cair da tela.
 */
const GIRO_MAXIMO = 8;

export default function Holofote({
  children,
  className = "",
  as: Tag = "div",
  /** Liga a inclinação. Use em cartão grande; em cartão pequeno embrulha. */
  inclinar = false,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "figure";
  inclinar?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const aoMover = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();

    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);

    if (!inclinar) return;
    // -0.5 a 0.5 a partir do centro do cartão
    const dx = x / r.width - 0.5;
    const dy = y / r.height - 0.5;
    // o sinal do eixo X é invertido: mouse embaixo inclina a parte de
    // cima para trás, que é como um objeto real se comportaria
    el.style.setProperty("--girox", `${(-dy * GIRO_MAXIMO).toFixed(2)}deg`);
    el.style.setProperty("--giroy", `${(dx * GIRO_MAXIMO).toFixed(2)}deg`);
  };

  const aoSair = () => {
    const el = ref.current;
    if (!el || !inclinar) return;
    // volta ao plano sozinho; a transição do CSS cuida da suavidade
    el.style.setProperty("--girox", "0deg");
    el.style.setProperty("--giroy", "0deg");
  };

  return (
    <Tag
      ref={ref as never}
      onMouseMove={aoMover}
      onMouseLeave={aoSair}
      className={`holofote ${inclinar ? "inclina" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
