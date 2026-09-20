"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A abertura da primeira visita: a marca aparece, respira uma vez e
 * sai dando lugar ao site.
 *
 * Dura 1,5 segundo e SÓ ACONTECE UMA VEZ por navegador. Quem volta ao
 * site — ou dá F5 no meio de uma conversa pelo WhatsApp — cai direto na
 * capa. Abertura que se repete deixa de ser apresentação e vira
 * pedágio: na terceira vez a pessoa já odeia.
 *
 * NÃO ATRASA O SITE. A página é montada por baixo desde o primeiro
 * instante; a abertura é só uma cortina por cima. Se ela falhar, ou se
 * o JavaScript não rodar, o site já está lá, inteiro.
 *
 * DUAS TRAVAS DE SEGURANÇA, porque nada nesta tela pode prender o
 * visitante:
 *  1. some sozinha depois do tempo, aconteça o que acontecer;
 *  2. qualquer clique, toque ou tecla a dispensa na hora.
 *
 * Quem pediu menos movimento no sistema não vê abertura nenhuma.
 */

/** Quanto tempo a marca fica na tela antes de começar a sair. */
const DURACAO = 1500;
/** Quanto tempo leva para sumir. */
const SAIDA = 550;
/** Onde fica registrado que esta pessoa já viu. */
const CHAVE = "origem-abertura";

export default function Abertura() {
  const [fase, setFase] = useState<"escondida" | "mostrando" | "saindo">(
    "escondida"
  );

  /**
   * A decisão de mostrar é tomada UMA VEZ e guardada aqui.
   *
   * Por que não decidir direto dentro do efeito: em desenvolvimento o
   * React monta o componente, desmonta e monta de novo de propósito,
   * para expor vazamentos. Na primeira passada o código marcava
   * "já viu" no navegador e programava os relógios; a desmontagem
   * cancelava os relógios; e a segunda passada lia "já viu" e desistia
   * — deixando a marca PRESA NA TELA para sempre, sem nada programado
   * para tirá-la.
   *
   * Com a decisão guardada num ref, a segunda passada sabe que era
   * para mostrar e reprograma os relógios. Funciona igual nos dois
   * modos, e não depende de o React se comportar de um jeito só.
   */
  const decidido = useRef(false);
  const deveMostrar = useRef(false);

  useEffect(() => {
    if (!decidido.current) {
      decidido.current = true;

      const poucoMovimento = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      let jaViu = false;
      try {
        jaViu = sessionStorage.getItem(CHAVE) === "1";
      } catch {
        // navegador com dados de site bloqueados: mostra uma vez e pronto
      }

      deveMostrar.current = !jaViu && !poucoMovimento;

      if (deveMostrar.current) {
        try {
          sessionStorage.setItem(CHAVE, "1");
        } catch {
          /* sem onde guardar — vale só para esta visita */
        }
      }
    }

    if (!deveMostrar.current) return;

    setFase("mostrando");

    const sair = () => setFase("saindo");
    const sumir = () => setFase("escondida");

    const t1 = setTimeout(sair, DURACAO);
    const t2 = setTimeout(sumir, DURACAO + SAIDA);

    // dispensar na hora com qualquer interação
    const dispensar = () => {
      clearTimeout(t1);
      sair();
      setTimeout(sumir, SAIDA);
    };
    window.addEventListener("pointerdown", dispensar, { once: true });
    window.addEventListener("keydown", dispensar, { once: true });
    window.addEventListener("wheel", dispensar, { once: true, passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("pointerdown", dispensar);
      window.removeEventListener("keydown", dispensar);
      window.removeEventListener("wheel", dispensar);
    };
  }, []);

  if (fase === "escondida") return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[110] flex items-center justify-center bg-abyss transition-all ease-out ${
        fase === "saindo" ? "scale-[1.04] opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${SAIDA}ms` }}
    >
      <div className="flex flex-col items-center gap-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/media/logo-od.svg"
          alt=""
          className="h-20 w-auto"
          style={{ animation: "marcaEntra .8s cubic-bezier(.22,1,.36,1) both" }}
        />

        <span
          className="font-display text-sm font-bold uppercase tracking-[0.35em] text-white"
          style={{
            animation: "marcaEntra .8s cubic-bezier(.22,1,.36,1) .18s both",
          }}
        >
          Origem Digital
        </span>

        {/* Um fio que se enche da esquerda para a direita: dá ao 1,5
            segundo uma razão de existir, em vez de ser só espera. */}
        <span className="mt-1 block h-px w-32 overflow-hidden bg-white/10">
          <span
            className="block h-full w-full origin-left bg-gradient-to-r from-cyan-neon to-violet-neon"
            style={{
              animation: `enchendo ${DURACAO}ms linear both`,
            }}
          />
        </span>
      </div>
    </div>
  );
}
