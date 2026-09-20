"use client";

import { useEffect } from "react";

/**
 * Faz a grade neon do fundo andar mais devagar do que o conteúdo.
 *
 * É o truque mais antigo de profundidade que existe: o que está longe
 * se move menos. A grade deixa de ser um papel de parede colado e passa
 * a parecer um chão lá atrás, com o site flutuando por cima.
 *
 * COMO É BARATO: existem cinco `.neon-grid` espalhados pelo site
 * (capa, planos, calculadora, diagnóstico...). Em vez de cada um
 * escutar a rolagem, este componente escuta UMA vez e escreve a
 * posição numa variável de CSS na raiz do documento. Os cinco leem
 * dessa mesma variável, de graça, dentro do próprio desenho do
 * navegador.
 *
 * O movimento é de um terço da rolagem, e a grade se repete a cada
 * 56px — então o resto por 56 mantém o número sempre pequeno, em vez
 * de crescer sem parar ao longo da página.
 *
 * Desliga sozinho para quem pediu menos movimento no sistema.
 */

/** Quanto a grade anda em relação à página. 0.34 = um terço. */
const PROFUNDIDADE = 0.34;
/** Tamanho do quadrado da grade, igual ao do globals.css. */
const PASSO = 56;

export default function ParallaxGrade() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const raiz = document.documentElement;
    let agendado = false;

    const atualizar = () => {
      agendado = false;

      const deslocamento = (window.scrollY * PROFUNDIDADE) % PASSO;
      raiz.style.setProperty("--grade-y", `${deslocamento.toFixed(1)}px`);

      // Quanto da página já foi percorrido, de 0 a 1. Os brilhos de
      // fundo leem daqui e vão do ciano (topo) ao violeta (fim) —
      // a página muda de temperatura conforme desce, sem nenhuma
      // troca brusca que alguém consiga apontar.
      const curso = document.body.scrollHeight - window.innerHeight;
      const descida = curso > 0 ? Math.min(1, window.scrollY / curso) : 0;
      raiz.style.setProperty("--descida", descida.toFixed(3));
    };

    // A rolagem dispara muitas vezes por segundo; só vale recalcular
    // uma vez por quadro desenhado.
    const aoRolar = () => {
      if (agendado) return;
      agendado = true;
      requestAnimationFrame(atualizar);
    };

    atualizar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      window.removeEventListener("scroll", aoRolar);
      raiz.style.removeProperty("--grade-y");
      raiz.style.removeProperty("--descida");
    };
  }, []);

  return null;
}
