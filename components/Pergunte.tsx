"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { Simbolo } from "./Marca";
import { Seta, WhatsApp } from "./Icones";
import { perguntas } from "@/lib/perguntas";
import { medir, EVENTOS } from "@/lib/medir";

/**
 * "PERGUNTE" — AS PERGUNTAS FREQUENTES, EM FORMA DE CONVERSA.
 *
 * Em vez de uma lista de perguntas para ler, uma janela de conversa: a
 * pessoa escolhe a pergunta e a resposta chega como chegaria no WhatsApp
 * — "digitando…" e o texto aparecendo. É ao mesmo tempo o FAQ e a
 * demonstração do produto: é assim que a atendente vai tratar os
 * clientes de quem contratar.
 *
 * ⚠️ É DEMONSTRAÇÃO, COM RESPOSTAS PRONTAS — e a tela diz isso. A IA de
 * verdade é a Aurora no WhatsApp.
 *
 * As perguntas e respostas moram em lib/perguntas.ts (seguem o contrato).
 *
 * Para quem não quer clicar (e para o Google), "Ler todas as respostas"
 * abre a lista inteira em texto.
 */

const WA = "https://wa.me/5511939299209?text=Ol%C3%A1!%20Quero%20um%20diagn%C3%B3stico%20gratuito.";

type Mensagem = { de: "cliente" | "aurora"; texto: string; comecar?: boolean };

const SAUDACAO: Mensagem = {
  de: "aurora",
  texto: "Oi! Sou a Aurora, a atendente de IA da Origem Digital. Escolha uma pergunta e eu respondo agora.",
};

export default function Pergunte() {
  const [conversa, setConversa] = useState<Mensagem[]>([SAUDACAO]);
  const [digitando, setDigitando] = useState(false);
  /** Quantas palavras da última resposta já apareceram. */
  const [palavras, setPalavras] = useState(Infinity);
  const [feitas, setFeitas] = useState<Set<number>>(new Set());
  const [lerTudo, setLerTudo] = useState(false);
  const rolagem = useRef<HTMLDivElement>(null);
  const relogios = useRef<ReturnType<typeof setTimeout>[]>([]);
  const ocupado = digitando || palavras !== Infinity;

  useEffect(() => () => relogios.current.forEach(clearTimeout), []);

  // Quando a janela aparece pela primeira vez, a primeira pergunta se
  // faz sozinha — uma vez só — para mostrar como funciona. Depois, é a
  // pessoa quem pergunta.
  const janela = useRef<HTMLDivElement>(null);
  const perguntarRef = useRef<(i: number) => void>(() => {});
  useEffect(() => {
    const el = janela.current;
    if (!el) return;
    const vigia = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        vigia.disconnect();
        relogios.current.push(setTimeout(() => perguntarRef.current(0), 700));
      },
      { threshold: 0.55 }
    );
    vigia.observe(el);
    return () => vigia.disconnect();
  }, []);

  // A conversa fica colada embaixo, como num aplicativo — rola só a
  // janela da conversa, nunca a página.
  useEffect(() => {
    const el = rolagem.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [conversa, digitando, palavras]);

  const perguntar = (i: number) => {
    if (ocupado) return;
    const p = perguntas[i];
    const parado = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setFeitas((f) => new Set(f).add(i));
    medir(EVENTOS.pergunta, { pergunta: p.q });
    setConversa((c) => [...c, { de: "cliente", texto: p.q }]);

    if (parado) {
      setConversa((c) => [...c, { de: "aurora", texto: p.a, comecar: p.comecar }]);
      return;
    }

    const marcar = (fn: () => void, ms: number) => relogios.current.push(setTimeout(fn, ms));
    marcar(() => setDigitando(true), 350);
    marcar(() => {
      setDigitando(false);
      setPalavras(0);
      setConversa((c) => [...c, { de: "aurora", texto: p.a, comecar: p.comecar }]);
      // o texto "escorre" palavra por palavra, rápido — como resposta gerada na hora
      const total = p.a.split(" ").length;
      for (let k = 1; k <= total; k++) marcar(() => setPalavras(k === total ? Infinity : k), k * 22);
    }, 1350);
  };
  perguntarRef.current = (i: number) => {
    if (conversa.length === 1) perguntar(i);
  };

  return (
    <section id="perguntas" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/3 h-[60%] bg-[radial-gradient(50%_50%_at_70%_50%,rgba(199,210,254,.45),transparent)]" />
      <div className="relative mx-auto grid max-w-pagina gap-x-12 gap-y-10 px-5 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-5 lg:row-start-1">
          <p className="rotulo">Pergunte</p>
          <h2 className="equilibrado mt-5 font-display text-[2.4rem] font-medium leading-[1.04] tracking-[-0.04em] text-tinta sm:text-[3.2rem]">
            Pergunte o que quiser. <span className="font-serifa font-normal italic tracking-[-0.01em] text-azul">A resposta vem em segundos.</span>
          </h2>
          <p className="sem-orfa mt-5 max-w-md text-[17px] leading-relaxed text-grafite">
            É assim que a sua atendente vai tratar os seus clientes. Escolha uma pergunta — as respostas são as do nosso contrato.
          </p>
        </Reveal>

        {/* A janela da conversa */}
        <Reveal delay={120} className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
          <div ref={janela} className="vidro overflow-hidden rounded-[28px] shadow-flutua">
            <div className="flex items-center gap-3 border-b border-linha/80 bg-white/60 px-5 py-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-cartao">
                <Simbolo id="od-pergunte" className="h-auto w-[24px]" />
              </span>
              <div>
                <p className="text-[15px] font-medium text-tinta">
                  Aurora<span className="hidden sm:inline"> · Origem Digital</span>
                </p>
                <p className={`text-[12.5px] ${digitando ? "text-azul" : "text-cinza"}`}>{digitando ? "digitando…" : "online agora"}</p>
              </div>
              <span className="ml-auto rounded-full border border-linha bg-white px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-cinza">
                demonstração
              </span>
            </div>

            <div ref={rolagem} data-lenis-prevent className="flex h-[390px] flex-col gap-3 overflow-y-auto px-4 py-5 sm:h-[480px] sm:px-6" aria-live="polite">
              <div className="mt-auto" />
              {conversa.map((m, i) => {
                const ultima = i === conversa.length - 1;
                const texto = m.de === "aurora" && ultima && palavras !== Infinity ? m.texto.split(" ").slice(0, palavras).join(" ") : m.texto;
                return (
                  <div key={i} className={`flex ${m.de === "cliente" ? "justify-end" : "justify-start"}`} style={{ animation: "balaoEntra .32s cubic-bezier(.22,1,.36,1)" }}>
                    <div
                      className={`max-w-[86%] rounded-[20px] px-4 py-2.5 text-[15px] leading-relaxed ${
                        m.de === "cliente" ? "rounded-br-md bg-noite text-white" : "rounded-bl-md border border-linha bg-white text-tinta shadow-cartao"
                      }`}
                    >
                      {texto}
                      {m.comecar && (ultima ? palavras === Infinity : true) && (
                        <a
                          href={WA}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 flex items-center justify-center gap-2 rounded-full bg-zap px-4 py-2.5 text-[14px] font-medium text-tinta"
                        >
                          <WhatsApp className="h-4 w-4" /> Pedir meu diagnóstico
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
              {digitando && (
                <div className="flex w-fit items-center gap-1 rounded-[20px] rounded-bl-md border border-linha bg-white px-4 py-3.5 shadow-cartao">
                  {[0, 1, 2].map((k) => (
                    <span key={k} className="h-1.5 w-1.5 rounded-full bg-violeta" style={{ animation: `pontoDigita 1.1s ease-in-out ${k * 0.15}s infinite` }} />
                  ))}
                </div>
              )}
            </div>

            <div aria-hidden className="flex items-center gap-2 border-t border-linha/80 bg-white/60 px-4 py-3">
              <span className="flex-1 truncate rounded-full bg-nevoa px-4 py-2.5 text-[14px] text-cinza">
                {ocupado ? "Aurora está respondendo…" : "Escolha uma pergunta"}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-noite text-white">
                <Seta className="h-4 w-4 -rotate-90" />
              </span>
            </div>
          </div>
        </Reveal>

        {/* As perguntas */}
        <Reveal delay={200} className="lg:col-span-5 lg:row-start-2">
          <div className="flex flex-wrap gap-2">
            {perguntas.map((p, i) => (
              <button
                key={p.q}
                type="button"
                onClick={() => perguntar(i)}
                aria-disabled={ocupado}
                className={`rounded-full border px-4 py-2 text-[14.5px] transition-[background-color,border-color,color,opacity] duration-200 ${
                  feitas.has(i) ? "border-violeta-claro bg-violeta-suave text-azul-escuro" : "border-linha bg-white text-tinta hover:border-violeta hover:text-azul"
                } ${ocupado ? "cursor-wait opacity-60" : ""}`}
              >
                {p.q}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setLerTudo((v) => !v)}
            aria-expanded={lerTudo}
            aria-controls="respostas-em-texto"
            className="mt-7 inline-flex items-center gap-2 text-[14.5px] font-medium text-azul underline-offset-4 hover:underline"
          >
            {lerTudo ? "Fechar as respostas" : "Prefere ler tudo de uma vez?"}
          </button>
          <div id="respostas-em-texto" className={`sanfona ${lerTudo ? "sanfona-aberta" : ""}`}>
            <div>
              <dl className="mt-5 flex flex-col divide-y divide-linha rounded-3xl border border-linha bg-white/70 px-5">
                {perguntas.map((p) => (
                  <div key={p.q} className="py-4">
                    <dt className="text-[15px] font-medium text-tinta">{p.q}</dt>
                    <dd className="mt-1.5 text-[14.5px] leading-relaxed text-grafite">{p.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
