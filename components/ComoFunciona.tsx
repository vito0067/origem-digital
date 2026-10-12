"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { Escudo } from "./Icones";

/**
 * COMO FUNCIONA — quatro passos numa linha, e o que está no contrato.
 *
 * Quando a seção aparece, a linha se preenche da esquerda para a direita
 * e cada passo acende quando ela passa por ele. Uma vez só.
 *
 * Prazos e pagamento: Contrato Master revisado (out/2026). Os 15 dias
 * úteis contam depois da entrada e do material — a nota do passo 3 diz
 * isso, porque o contrato diz.
 */

const passos = [
  { n: "01", titulo: "Diagnóstico gratuito", texto: "10 a 15 minutos no WhatsApp. Você sai sabendo o que faz sentido para o seu negócio." },
  { n: "02", titulo: "Escopo e contrato", texto: "Tudo por escrito antes de começar. 50% do setup na assinatura." },
  {
    n: "03",
    titulo: "Primeira versão",
    texto: "Em até 15 dias úteis, com até 4 rodadas de ajustes.",
    nota: "contados após a entrada e o envio do material",
  },
  { n: "04", titulo: "No ar, com suporte", texto: "Os outros 50% na entrega, antes de ir ao ar. Depois, suporte contínuo na mensalidade." },
];

const garantias = [
  { titulo: "Metade só na entrega", texto: "Você paga a segunda parte quando o projeto está pronto." },
  { titulo: "4 rodadas de ajuste", texto: "Incluídas no preço, antes de publicar. Falha nossa não conta." },
  { titulo: "7 dias para desistir", texto: "Direito de arrependimento para pessoa física." },
];

export default function ComoFunciona() {
  const trilho = useRef<HTMLOListElement>(null);
  const [ligado, setLigado] = useState(false);

  useEffect(() => {
    const el = trilho.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLigado(true);
      return;
    }
    const vigia = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLigado(true);
          vigia.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    vigia.observe(el);
    return () => vigia.disconnect();
  }, []);

  return (
    <section id="como-funciona" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-pagina px-5 sm:px-8">
        <Reveal>
          <p className="rotulo">Como funciona</p>
          <h2 className="equilibrado mt-5 max-w-3xl font-display text-[2.4rem] font-medium leading-[1.04] tracking-[-0.04em] text-tinta sm:text-[3.2rem]">
            Do primeiro “oi” ao site no ar, <span className="font-serifa font-normal italic tracking-[-0.01em] text-azul">em quatro passos.</span>
          </h2>
        </Reveal>

        <ol ref={trilho} className="relative mt-16 grid gap-10 lg:grid-cols-4 lg:gap-6">
          {/* o trilho: vertical no celular, horizontal no computador */}
          <span aria-hidden className="absolute bottom-2 left-[11px] top-2 w-px bg-linha lg:bottom-auto lg:left-0 lg:right-0 lg:top-[11px] lg:h-px lg:w-auto" />
          <span
            aria-hidden
            className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-gradient-to-b from-ceu via-violeta to-noite lg:hidden"
            style={{ transform: ligado ? "none" : "scaleY(0)", transition: "transform 1.8s cubic-bezier(.65,0,.35,1)" }}
          />
          <span
            aria-hidden
            className="absolute left-0 right-0 top-[11px] hidden h-px origin-left bg-gradient-to-r from-ceu via-violeta to-noite lg:block"
            style={{ transform: ligado ? "none" : "scaleX(0)", transition: "transform 1.8s cubic-bezier(.65,0,.35,1)" }}
          />
          {passos.map((p, i) => (
            <li key={p.n} className="relative pl-12 lg:pl-0 lg:pt-12">
              <span
                aria-hidden
                className={`absolute left-0 top-0 flex h-[23px] w-[23px] items-center justify-center rounded-full border transition-[background-color,border-color,box-shadow] duration-500 ${
                  ligado ? "border-noite bg-noite shadow-[0_0_0_6px_rgba(129,140,248,.18)]" : "border-linha bg-white"
                }`}
                style={{ transitionDelay: ligado ? `${300 + i * 420}ms` : "0ms" }}
              >
                <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${ligado ? "bg-white" : "bg-linha"}`} style={{ transitionDelay: ligado ? `${300 + i * 420}ms` : "0ms" }} />
              </span>
              <p className="font-mono text-[12px] tracking-[0.14em] text-cinza">{p.n}</p>
              <h3 className="mt-2 font-display text-[1.3rem] font-medium tracking-[-0.02em] text-tinta">{p.titulo}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-grafite">{p.texto}</p>
              {p.nota && <p className="mt-1.5 text-[13px] text-cinza">({p.nota})</p>}
            </li>
          ))}
        </ol>

        <Reveal delay={100}>
          <div className="mt-20 rounded-[28px] border border-linha bg-white/60 p-6 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <p className="font-display text-[1.25rem] font-medium tracking-[-0.02em] text-tinta">Escrito no contrato, antes de você assinar.</p>
              <Link href="/termos" className="text-[14.5px] font-medium text-azul underline-offset-4 hover:underline">
                Ler os termos completos →
              </Link>
            </div>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {garantias.map((g) => (
                <li key={g.titulo} className="flex gap-3.5 rounded-2xl bg-white p-4 shadow-cartao">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violeta-suave text-azul">
                    <Escudo className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[15.5px] font-medium text-tinta">{g.titulo}</span>
                    <span className="mt-0.5 block text-[14px] leading-snug text-grafite">{g.texto}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
