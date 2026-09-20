"use client";

import { useEffect, useRef } from "react";

/**
 * Faixa que desliza sem parar — e que REAGE À ROLAGEM.
 *
 * Parada, ela anda sozinha devagar. Quando a pessoa rola a página, ela
 * acelera; quando a pessoa rola para cima, ela inverte o sentido. Ao
 * parar de rolar, volta sozinha ao passo calmo.
 *
 * É o efeito que quase ninguém sabe nomear e todo mundo percebe: a
 * faixa deixa de ser um enfeite rodando em looping e passa a responder
 * ao que a pessoa está fazendo. A página inteira parece ter física.
 *
 * POR QUE NÃO É UMA ANIMAÇÃO DE CSS:
 * Animação de CSS tem velocidade fixa. Para mudar de ritmo e de
 * direção, a posição precisa ser calculada quadro a quadro. É o que o
 * laço abaixo faz — e ele só roda enquanto a faixa está na tela.
 *
 * O DESLOCAMENTO NUNCA CRESCE SEM FIM: a lista é escrita duas vezes no
 * HTML, e a posição usa o resto da divisão pela largura de uma cópia.
 * Quando a primeira sai de cena, a segunda já está exatamente no lugar
 * dela — a emenda não existe.
 */

/** Pixels por segundo com a página parada. */
const PASSO_CALMO = 38;
/** Quanto cada pixel de rolagem empurra a faixa. */
const FORCA_ROLAGEM = 9;
/** Quão rápido o empurrão da rolagem se dissipa. 0.9 = perde 10% por quadro. */
const ATRITO = 0.9;
/** Teto do empurrão, para uma rolagem brusca não borrar tudo. */
const LIMITE = 1400;

export default function Faixa({ itens }: { itens: string[] }) {
  const trilho = useRef<HTMLDivElement>(null);
  const caixa = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = trilho.current;
    const c = caixa.current;
    if (!t || !c) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Tira a animação de CSS antes de assumir o controle. Sem isto os
    // dois brigam pelo mesmo `transform` — e a animação ganharia, porque
    // no CSS ela tem prioridade sobre estilo escrito direto no elemento.
    // A classe existe para funcionar sem JavaScript; a partir daqui,
    // quem manda é o laço abaixo.
    t.classList.remove("animate-marquee");

    let posicao = 0;
    let empurrao = 0;
    let ultimoY = window.scrollY;
    let ultimoTempo = performance.now();
    let animacao = 0;
    let visivel = true;
    let pausado = false;

    const aoRolar = () => {
      const y = window.scrollY;
      empurrao += (y - ultimoY) * FORCA_ROLAGEM;
      empurrao = Math.max(-LIMITE, Math.min(LIMITE, empurrao));
      ultimoY = y;
    };

    const quadro = (agora: number) => {
      animacao = requestAnimationFrame(quadro);

      const dt = Math.min(0.05, (agora - ultimoTempo) / 1000);
      ultimoTempo = agora;
      if (!visivel || document.hidden) return;

      if (!pausado) posicao += (PASSO_CALMO + empurrao) * dt;
      empurrao *= ATRITO;

      // uma cópia da lista = metade do trilho
      const volta = t.scrollWidth / 2;
      if (volta > 0) {
        posicao = ((posicao % volta) + volta) % volta;
        t.style.transform = `translate3d(${-posicao}px, 0, 0)`;
      }
    };

    const vigia = new IntersectionObserver(
      ([e]) => {
        visivel = e.isIntersecting;
      },
      { threshold: 0 }
    );
    vigia.observe(c);

    // pousar o mouse congela: dá para ler um segmento com calma
    const entrar = () => (pausado = true);
    const sair = () => (pausado = false);
    c.addEventListener("mouseenter", entrar);
    c.addEventListener("mouseleave", sair);

    window.addEventListener("scroll", aoRolar, { passive: true });
    animacao = requestAnimationFrame(quadro);

    return () => {
      cancelAnimationFrame(animacao);
      window.removeEventListener("scroll", aoRolar);
      c.removeEventListener("mouseenter", entrar);
      c.removeEventListener("mouseleave", sair);
      vigia.disconnect();
    };
  }, []);

  const linha = (oculto: boolean) => (
    <ul
      className="flex shrink-0 items-center gap-10 px-5"
      aria-hidden={oculto || undefined}
    >
      {itens.map((item) => (
        <li
          key={item}
          className="flex items-center gap-10 whitespace-nowrap font-display text-sm font-medium uppercase tracking-[0.25em] text-slate-500"
        >
          {item}
          <span aria-hidden className="text-cyan-neon/60">
            ◆
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      ref={caixa}
      className="faixa relative overflow-hidden border-y border-white/[0.07] bg-white/[0.015] py-5"
    >
      {/* Sem JavaScript a faixa fica parada e legível, em vez de sumir.
          A animação de CSS abaixo é a reserva: o laço do quadro
          sobrescreve o transform assim que assume. */}
      <div ref={trilho} className="faixa-trilho flex w-max animate-marquee">
        {linha(false)}
        {linha(true)}
      </div>
    </div>
  );
}
