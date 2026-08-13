"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import NeonButton from "./NeonButton";

/**
 * Ancoragem real: R$ 1.644 é o setup de site (R$ 987) + agente (R$ 657)
 * contratados separadamente; R$ 1.447 aplica os 10% de desconto do
 * pacote. Oferta válida no mês corrente (nome do mês é dinâmico).
 */
export default function Offer() {
  const [month, setMonth] = useState("este mês");

  useEffect(() => {
    const m = new Date().toLocaleDateString("pt-BR", { month: "long" });
    setMonth(m.charAt(0).toUpperCase() + m.slice(1));
  }, []);

  return (
    <section id="oferta" className="relative overflow-hidden py-28">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[420px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-neon/10 blur-[130px]"
      />
      <div className="relative mx-auto max-w-3xl px-6">
        <Reveal>
          <div className="glass-card relative p-9 text-center ring-1 ring-cyan-neon/40 shadow-neon-cyan sm:p-12">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-cyan-neon/60 bg-abyss px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-cyan-neon">
              Oferta de {month}
            </span>

            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Pacote <span className="text-gradient-neon">Início Digital</span>
            </h2>
            <p className="mt-3 text-slate-300">
              Site profissional + Agente de IA + Suporte contínuo
            </p>

            <div className="mt-8 flex flex-col items-center gap-1">
              <p className="text-sm text-slate-400">
                Setup contratado separado:{" "}
                <s className="text-slate-500">R$ 1.644</s>
              </p>
              <p className="font-display text-5xl font-bold text-gradient-neon sm:text-6xl">
                R$ 1.447
              </p>
              <p className="mt-1 text-sm text-slate-300">
                + R$ 260/mês (hospedagem, uso do agente e suporte inclusos)
              </p>
            </div>

            <ul className="mx-auto mt-8 flex max-w-md flex-col gap-2.5 text-left">
              {[
                "Site profissional no ar em 1 a 2 semanas",
                "Agente de IA atendendo seu WhatsApp 24/7",
                "Suporte e manutenção contínuos inclusos",
                "12% de desconto no setup — válido somente este mês",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <span aria-hidden className="mt-0.5 font-bold text-cyan-neon">✓</span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex justify-center">
              <NeonButton
                href="https://wa.me/5511939299209?text=Ol%C3%A1!%20Quero%20garantir%20o%20Pacote%20In%C3%ADcio%20Digital%20com%20desconto%20deste%20m%C3%AAs."
                external
              >
                Garantir minha condição de {month}
              </NeonButton>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Condição válida para contratações realizadas até o fim do mês.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
