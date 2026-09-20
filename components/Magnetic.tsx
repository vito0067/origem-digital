"use client";

import { useEffect, useRef } from "react";

/**
 * Faz o que está dentro dele ser atraído pelo cursor quando o mouse
 * passa perto. É barato e causa aquela reação de "como ele fez isso".
 *
 * Uso:  <Magnetic><NeonButton ...>Texto</NeonButton></Magnetic>
 *
 * Só em aparelho com mouse. No toque, nada acontece — o que é o certo,
 * porque no celular o efeito ficaria preso depois do toque.
 */
export default function Magnetic({
  children,
  forca = 0.28,
}: {
  children: React.ReactNode;
  /** Quanto o elemento se desloca em relação à distância do cursor. */
  forca?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    const destino = { x: 0, y: 0 };
    const atual = { x: 0, y: 0 };
    let animacao = 0;
    let perto = false;

    const aoMover = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      // campo de atração: o raio do botão mais 90px em volta
      const alcance = Math.max(r.width, r.height) / 2 + 90;
      perto = Math.hypot(dx, dy) < alcance;
      if (perto) {
        destino.x = dx * forca;
        destino.y = dy * forca;
      } else {
        destino.x = 0;
        destino.y = 0;
      }
    };

    const quadro = () => {
      animacao = requestAnimationFrame(quadro);
      atual.x += (destino.x - atual.x) * 0.15;
      atual.y += (destino.y - atual.y) * 0.15;
      el.style.transform = `translate3d(${atual.x.toFixed(2)}px,${atual.y.toFixed(2)}px,0)`;
    };

    window.addEventListener("mousemove", aoMover, { passive: true });
    animacao = requestAnimationFrame(quadro);

    return () => {
      window.removeEventListener("mousemove", aoMover);
      cancelAnimationFrame(animacao);
      el.style.transform = "";
    };
  }, [forca]);

  return (
    <span ref={ref} style={{ display: "inline-block", willChange: "transform" }}>
      {children}
    </span>
  );
}
