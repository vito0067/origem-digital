"use client";

import { useEffect, useRef } from "react";

/**
 * Pontos flutuando no fundo da capa, ligados por linhas quando ficam
 * perto uns dos outros. O mouse atrai os que estão em volta.
 *
 * Por que combina com esta marca: a Origem Digital vende CONEXÃO —
 * cliente ligado ao negócio, site ligado ao WhatsApp. Uma rede que se
 * forma e se desfaz sozinha diz isso sem escrever.
 *
 * DESENHADO NUM <canvas>, e não com elementos da página: são dezenas
 * de pontos se movendo a cada quadro. Como elementos de HTML, o
 * navegador recalcularia o desenho da página inteira sessenta vezes
 * por segundo. No canvas, é um retângulo só que se repinta.
 *
 * ONDE ELE NÃO RODA:
 *  - telas menores que 1024px: no celular o custo não se paga, e a
 *    bateria é do cliente
 *  - aparelho com pouca memória ou poucos núcleos
 *  - quem pediu menos movimento no sistema
 *  - aba escondida: o laço dorme
 *
 * O NÚMERO DE PONTOS ACOMPANHA O TAMANHO DA TELA, com teto. Fixar em
 * 80 encheria uma tela pequena e deixaria uma tela grande vazia.
 */

/** Um ponto a cada X pixels quadrados de tela. */
const DENSIDADE = 14000;
/** Teto de pontos, custe o que custar. */
const MAXIMO = 70;
/** Distância em que dois pontos passam a ser ligados por uma linha. */
const ALCANCE = 132;
/** Raio em que o mouse atrai os pontos. */
const ATRACAO = 160;

export default function Particulas() {
  const tela = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = tela.current;
    if (!c) return;

    const nav = navigator as Navigator & { deviceMemory?: number };
    if (
      window.innerWidth < 1024 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) ||
      (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 4)
    ) {
      return;
    }

    const ctx = c.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Limitar a 1.5 em vez dos 2 ou 3 da tela: o fundo é desfocado e
    // discreto, e cada ponto a mais de resolução custa em todos os
    // quadros. Aqui ninguém percebe a diferença.
    const densidadeTela = Math.min(window.devicePixelRatio || 1, 1.5);

    type Ponto = { x: number; y: number; vx: number; vy: number };
    let pontos: Ponto[] = [];
    let largura = 0;
    let altura = 0;
    let animacao = 0;
    let visivel = true;
    const mouse = { x: -9999, y: -9999 };

    const medir = () => {
      const r = c.getBoundingClientRect();
      largura = r.width;
      altura = r.height;
      c.width = Math.round(largura * densidadeTela);
      c.height = Math.round(altura * densidadeTela);
      ctx.setTransform(densidadeTela, 0, 0, densidadeTela, 0, 0);

      const quantos = Math.min(
        MAXIMO,
        Math.round((largura * altura) / DENSIDADE)
      );
      pontos = Array.from({ length: quantos }, () => ({
        x: Math.random() * largura,
        y: Math.random() * altura,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      }));
    };

    const quadro = () => {
      animacao = requestAnimationFrame(quadro);
      if (!visivel || document.hidden || !largura) return;

      ctx.clearRect(0, 0, largura, altura);

      for (const p of pontos) {
        p.x += p.vx;
        p.y += p.vy;

        // atravessa a borda e volta pelo outro lado
        if (p.x < -10) p.x = largura + 10;
        if (p.x > largura + 10) p.x = -10;
        if (p.y < -10) p.y = altura + 10;
        if (p.y > altura + 10) p.y = -10;

        // atração pelo mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < ATRACAO && dist > 1) {
          const forca = (1 - dist / ATRACAO) * 0.35;
          p.x += (dx / dist) * forca;
          p.y += (dy / dist) * forca;
        }
      }

      // As linhas primeiro, os pontos por cima: assim o ponto fica
      // sempre nítido, e não cortado por um fio passando em cima dele.
      for (let i = 0; i < pontos.length; i++) {
        for (let j = i + 1; j < pontos.length; j++) {
          const a = pontos[i];
          const b = pontos[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > ALCANCE) continue;
          // quanto mais perto, mais forte a linha
          ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - d / ALCANCE) * 0.16})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = "rgba(0, 240, 255, 0.5)";
      for (const p of pontos) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const aoMover = (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const aoSair = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    medir();
    const obs = new ResizeObserver(medir);
    obs.observe(c);

    const vigia = new IntersectionObserver(
      ([e]) => {
        visivel = e.isIntersecting;
      },
      { threshold: 0 }
    );
    vigia.observe(c);

    window.addEventListener("mousemove", aoMover, { passive: true });
    document.addEventListener("mouseleave", aoSair);
    animacao = requestAnimationFrame(quadro);

    return () => {
      cancelAnimationFrame(animacao);
      obs.disconnect();
      vigia.disconnect();
      window.removeEventListener("mousemove", aoMover);
      document.removeEventListener("mouseleave", aoSair);
    };
  }, []);

  return (
    <canvas
      ref={tela}
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
    />
  );
}
