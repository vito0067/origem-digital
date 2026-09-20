"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Rolagem com inércia. É o efeito que mais faz um site parecer caro
 * e que quase ninguém sabe nomear: a página passa a ter peso.
 *
 * Instalar:  npm install lenis
 * Usar:      envolver o conteúdo em app/layout.tsx com <SmoothScroll>
 *
 * Desliga sozinho para quem pediu menos movimento no sistema — aí a
 * rolagem volta a ser a nativa, que é o certo nesse caso.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,          // peso da inércia; acima de 1.4 fica lento demais
      smoothWheel: true,
      touchMultiplier: 1.6,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });

    let animacao = 0;
    const quadro = (tempo: number) => {
      lenis.raf(tempo);
      animacao = requestAnimationFrame(quadro);
    };
    animacao = requestAnimationFrame(quadro);

    // âncoras do menu continuam funcionando, agora com a inércia
    const aoClicar = (e: MouseEvent) => {
      const alvo = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!alvo) return;
      const id = alvo.getAttribute("href");
      if (!id || id === "#") return;
      const destino = document.querySelector(id);
      if (!destino) return;
      e.preventDefault();
      lenis.scrollTo(destino as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", aoClicar);

    return () => {
      cancelAnimationFrame(animacao);
      document.removeEventListener("click", aoClicar);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
