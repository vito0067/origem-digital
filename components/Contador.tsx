"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Número que corre até o valor final.
 *
 * Duas situações, um componente só:
 *  1. Entrou na tela pela primeira vez → corre do zero até o valor.
 *  2. O valor mudou (a pessoa mexeu num controle) → corre do valor
 *     anterior até o novo, sem piscar.
 *
 * O dinheiro perdido na calculadora pulando de um número para o outro é
 * o que faz a conta doer. Sem isso é só um texto trocando.
 */
export default function Contador({
  valor,
  formatar = (n: number) => String(Math.round(n)),
  duracao = 800,
  className = "",
}: {
  valor: number;
  formatar?: (n: number) => string;
  duracao?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const deRef = useRef(0);
  const [mostrado, setMostrado] = useState(0);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisivel(true);
      return;
    }
    const vigia = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisivel(true);
          vigia.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    vigia.observe(el);
    return () => vigia.disconnect();
  }, []);

  useEffect(() => {
    if (!visivel) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      deRef.current = valor;
      setMostrado(valor);
      return;
    }

    const de = deRef.current;
    const inicio = performance.now();
    let quadro = 0;

    const passo = (agora: number) => {
      const t = Math.min(1, (agora - inicio) / duracao);
      // desacelera no fim: o número "assenta" em vez de travar de repente
      const suave = 1 - Math.pow(1 - t, 3);
      setMostrado(de + (valor - de) * suave);
      if (t < 1) quadro = requestAnimationFrame(passo);
      else deRef.current = valor;
    };

    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, [valor, visivel, duracao]);

  return (
    <span ref={ref} className={className}>
      {formatar(visivel ? mostrado : 0)}
    </span>
  );
}
