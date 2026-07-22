"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import NeonButton from "./NeonButton";

/**
 * Estimativa: ~40% das mensagens são potenciais clientes; a taxa de
 * perda cresce ~12% por hora de demora na resposta (teto de 60%).
 * Números conservadores, baseados em médias de mercado — e o texto
 * deixa claro que é uma estimativa.
 */
const fmt = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export default function LossCalculator() {
  const [msgs, setMsgs] = useState(150);
  const [hours, setHours] = useState(3);
  const [ticket, setTicket] = useState(400);

  const lossRate = Math.min(hours * 0.12, 0.6);
  const lostClients = Math.round(msgs * 0.4 * lossRate);
  const lostRevenue = lostClients * ticket;

  return (
    <section id="calculadora" className="relative py-28">
      <div aria-hidden className="neon-grid absolute inset-0" />
      <div className="relative mx-auto max-w-4xl px-6">
        <Reveal>
          <p className="text-center text-xs font-medium uppercase tracking-[0.35em] text-violet-neon">
            Faça as contas
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-bold text-white sm:text-4xl">
            Quantos clientes você{" "}
            <span className="text-gradient-neon">perde por mês</span>?
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass-card mt-12 p-8 sm:p-10">
            {/* Controles */}
            <div className="grid gap-8 sm:grid-cols-3">
              <label className="flex flex-col gap-3">
                <span className="text-xs uppercase tracking-widest text-slate-400">
                  Mensagens que você recebe por mês
                </span>
                <input
                  type="range"
                  min={20}
                  max={1000}
                  step={10}
                  value={msgs}
                  onChange={(e) => setMsgs(Number(e.target.value))}
                  className="accent-cyan-neon"
                />
                <span className="font-display text-xl font-bold text-white">
                  {msgs} mensagens
                </span>
              </label>

              <label className="flex flex-col gap-3">
                <span className="text-xs uppercase tracking-widest text-slate-400">
                  Tempo médio para responder
                </span>
                <input
                  type="range"
                  min={0.5}
                  max={12}
                  step={0.5}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="accent-cyan-neon"
                />
                <span className="font-display text-xl font-bold text-white">
                  {hours} {hours === 1 ? "hora" : "horas"}
                </span>
              </label>

              <label className="flex flex-col gap-3">
                <span className="text-xs uppercase tracking-widest text-slate-400">
                  Valor médio de uma venda (R$)
                </span>
                <input
                  type="range"
                  min={50}
                  max={3000}
                  step={50}
                  value={ticket}
                  onChange={(e) => setTicket(Number(e.target.value))}
                  className="accent-cyan-neon"
                />
                <span className="font-display text-xl font-bold text-white">
                  {fmt.format(ticket)}
                </span>
              </label>
            </div>

            {/* Fluxo do resultado */}
            <div className="mt-12 flex flex-col items-center gap-2 text-center">
              <p className="text-slate-300">
                Você recebe{" "}
                <strong className="text-white">{msgs} mensagens</strong> por mês
              </p>
              <span aria-hidden className="text-cyan-neon">↓</span>
              <p className="text-slate-300">
                Demora em média{" "}
                <strong className="text-white">
                  {hours} {hours === 1 ? "hora" : "horas"}
                </strong>{" "}
                para responder
              </p>
              <span aria-hidden className="text-cyan-neon">↓</span>
              <p className="text-slate-300">
                Pode estar perdendo cerca de{" "}
                <strong className="text-white">{lostClients} clientes</strong> e
              </p>
              <p className="mt-2 font-display text-5xl font-bold text-gradient-neon sm:text-6xl">
                {fmt.format(lostRevenue)}/mês
              </p>
            </div>

            <p className="mt-8 text-center text-xs text-slate-500">
              Estimativa baseada em médias de mercado: cerca de 40% das
              mensagens são potenciais clientes e a chance de perder a venda
              cresce a cada hora sem resposta. Os números do seu negócio podem
              variar.
            </p>

            <div className="mt-8 flex justify-center">
              <NeonButton
                href="https://wa.me/5511939299209?text=Ol%C3%A1!%20Fiz%20a%20conta%20no%20site%20e%20quero%20parar%20de%20perder%20clientes."
                external
              >
                Quero parar de perder esse dinheiro
              </NeonButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
