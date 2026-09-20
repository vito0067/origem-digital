"use client";

import { useRef, useState, type ReactNode } from "react";

/**
 * Troca o cursor por um disco com um rótulo, dentro da área envolvida.
 *
 * Usado na trilha do Sistema Origem. Sem ele, muita gente não percebe
 * que aqueles cartões andam — o cursar vira o aviso, no lugar exato
 * onde a pessoa está olhando, sem precisar de uma frase a mais na tela.
 *
 * Só em aparelho com mouse. No toque não existe cursor para trocar, e
 * a pessoa já sabe arrastar com o dedo.
 *
 * O disco segue o mouse por transform, não por `left/top`: assim o
 * navegador anima na placa de vídeo e não recalcula o layout a cada
 * pixel — é a diferença entre parecer preso ao cursor e parecer
 * arrastado por ele.
 */
export default function CursorArea({
  children,
  rotulo = "arrastar",
  className = "",
}: {
  children: ReactNode;
  rotulo?: string;
  className?: string;
}) {
  const area = useRef<HTMLDivElement>(null);
  const disco = useRef<HTMLDivElement>(null);
  const [dentro, setDentro] = useState(false);

  const aoMover = (e: React.MouseEvent) => {
    const a = area.current;
    const d = disco.current;
    if (!a || !d) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    const r = a.getBoundingClientRect();
    d.style.transform = `translate3d(${e.clientX - r.left}px, ${
      e.clientY - r.top
    }px, 0) translate(-50%, -50%)`;
  };

  return (
    <div
      ref={area}
      onMouseMove={aoMover}
      onMouseEnter={() => setDentro(true)}
      onMouseLeave={() => setDentro(false)}
      className={`relative lg:cursor-none ${className}`}
    >
      {children}

      <div
        ref={disco}
        aria-hidden
        className={`pointer-events-none absolute left-0 top-0 z-30 hidden h-20 w-20 items-center justify-center rounded-full border border-cyan-neon/50 bg-abyss/70 backdrop-blur-sm transition-opacity duration-300 lg:flex ${
          dentro ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
      >
        <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-cyan-neon">
          {rotulo}
        </span>
        <span
          className="absolute inset-0 animate-pulse rounded-full bg-cyan-neon/[0.06]"
          aria-hidden
        />
      </div>
    </div>
  );
}
