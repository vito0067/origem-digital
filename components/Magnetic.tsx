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
 *
 * Use pouco: hoje só os dois botões onde a pessoa decide (o principal
 * da capa e o do fechamento). Em todo botão, o efeito deixa de marcar
 * o que importa e o site inteiro parece instável.
 *
 * O laço de animação DORME quando o botão chega ao lugar e só acorda
 * com o próximo movimento do mouse. Antes ele rodava sem parar, a cada
 * quadro, mesmo com a pessoa parada lendo.
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
    let rodando = false;

    const quadro = () => {
      const fx = destino.x - atual.x;
      const fy = destino.y - atual.y;
      atual.x += fx * 0.15;
      atual.y += fy * 0.15;
      el.style.transform = `translate3d(${atual.x.toFixed(2)}px,${atual.y.toFixed(2)}px,0)`;

      if (Math.abs(fx) < 0.05 && Math.abs(fy) < 0.05) {
        rodando = false; // chegou: dorme até o mouse se mexer de novo
        return;
      }
      animacao = requestAnimationFrame(quadro);
    };

    const aoMover = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      // campo de atração: o raio do botão mais 90px em volta
      const alcance = Math.max(r.width, r.height) / 2 + 90;
      const perto = Math.hypot(dx, dy) < alcance;
      const nx = perto ? dx * forca : 0;
      const ny = perto ? dy * forca : 0;

      // longe e já em repouso: nada a fazer, nem acordar o laço
      if (nx === destino.x && ny === destino.y) return;
      destino.x = nx;
      destino.y = ny;

      if (!rodando) {
        rodando = true;
        animacao = requestAnimationFrame(quadro);
      }
    };

    window.addEventListener("mousemove", aoMover, { passive: true });

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
