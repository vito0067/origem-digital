"use client";

import { useEffect, useRef } from "react";

/**
 * Um ponto de luz que acompanha o mouse pelo site inteiro.
 *
 * São duas peças: um miolo pequeno, que gruda no cursor, e um anel
 * maior, que chega atrasado. Esse atraso é o efeito todo — o anel
 * parece ter peso e ir atrás, em vez de estar colado.
 *
 * Sobre link, botão ou campo, o anel cresce e acende. A pessoa percebe
 * o que é clicável antes mesmo de ler.
 *
 * O CURSOR DO SISTEMA CONTINUA LIGADO, de propósito. Esconder o cursor
 * de verdade é moda em site de agência e atrapalha todo mundo: quem
 * tem visão baixa perde a referência, e qualquer engasgo do site deixa
 * a pessoa sem saber onde está apontando. Aqui o ponto ACOMPANHA o
 * cursor, não o substitui.
 *
 * ONDE ELE NÃO APARECE:
 *  - aparelho sem mouse (celular e tablet): não há cursor para seguir
 *  - quem pediu menos movimento no sistema
 *  - sobre a trilha do Sistema Origem, que já tem o disco "role" dela
 *
 * CUSTO: um ouvinte de mouse e um laço de animação para o site todo.
 * O laço dorme quando o mouse para de se mexer e acorda no movimento
 * seguinte — parado, não gasta nada.
 */

/** Quanto o anel se aproxima do alvo por quadro. Menor = mais atrasado. */
const MACIEZ = 0.16;
/** Abaixo desta distância o anel já chegou e o laço pode dormir. */
const PARADO = 0.1;

const CLICAVEIS = 'a, button, input, select, textarea, summary, [role="button"]';

export default function CursorGlobal() {
  const miolo = useRef<HTMLDivElement>(null);
  const anel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const m = miolo.current;
    const a = anel.current;
    if (!m || !a) return;

    const alvo = { x: -100, y: -100 };
    const atual = { x: -100, y: -100 };
    let animacao = 0;
    let rodando = false;

    const quadro = () => {
      const dx = alvo.x - atual.x;
      const dy = alvo.y - atual.y;

      atual.x += dx * MACIEZ;
      atual.y += dy * MACIEZ;

      a.style.transform = `translate3d(${atual.x}px, ${atual.y}px, 0) translate(-50%, -50%)`;

      if (Math.abs(dx) < PARADO && Math.abs(dy) < PARADO) {
        // chegou: dorme até o mouse se mexer de novo
        rodando = false;
        return;
      }
      animacao = requestAnimationFrame(quadro);
    };

    const acordar = () => {
      if (rodando) return;
      rodando = true;
      animacao = requestAnimationFrame(quadro);
    };

    const aoMover = (e: MouseEvent) => {
      alvo.x = e.clientX;
      alvo.y = e.clientY;
      // o miolo não tem atraso: vai direto, no mesmo quadro
      m.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;

      const sobre = (e.target as HTMLElement | null)?.closest?.(CLICAVEIS);
      const naTrilha = (e.target as HTMLElement | null)?.closest?.(".lg\\:cursor-none");
      a.dataset.estado = naTrilha ? "escondido" : sobre ? "clicavel" : "normal";
      m.dataset.estado = naTrilha ? "escondido" : "normal";

      acordar();
    };

    const aoSairDaJanela = () => {
      a.dataset.estado = "escondido";
      m.dataset.estado = "escondido";
    };

    window.addEventListener("mousemove", aoMover, { passive: true });
    document.addEventListener("mouseleave", aoSairDaJanela);

    return () => {
      cancelAnimationFrame(animacao);
      window.removeEventListener("mousemove", aoMover);
      document.removeEventListener("mouseleave", aoSairDaJanela);
    };
  }, []);

  return (
    <>
      <div
        ref={anel}
        aria-hidden
        data-estado="escondido"
        className="cursor-anel pointer-events-none fixed left-0 top-0 z-[90] hidden rounded-full border border-cyan-neon/50 lg:block"
      />
      <div
        ref={miolo}
        aria-hidden
        data-estado="escondido"
        className="cursor-miolo pointer-events-none fixed left-0 top-0 z-[91] hidden h-1.5 w-1.5 rounded-full bg-cyan-neon lg:block"
      />
    </>
  );
}
