"use client";

import { useRef, type ReactNode } from "react";

/**
 * Cartão com uma luz ciano que acompanha o mouse por dentro dele.
 *
 * O desenho é todo do CSS (`.holofote` no globals.css); aqui só
 * escrevemos dois números — onde o mouse está. Em aparelho de toque
 * nada acontece, que é o certo: no celular o efeito ficaria preso onde
 * a pessoa tocou.
 *
 * Já teve também uma opção de INCLINAR o cartão seguindo o cursor,
 * usada nos cartões de plano. Saiu na limpeza de animações: cartão
 * balançando justamente onde a pessoa está lendo preço atrapalha a
 * leitura. A luz, que só aparece onde o mouse está, ficou.
 */

export default function Holofote({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "figure";
}) {
  const ref = useRef<HTMLDivElement>(null);

  const aoMover = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Tag
      ref={ref as never}
      onMouseMove={aoMover}
      className={`holofote ${className}`}
    >
      {children}
    </Tag>
  );
}
