"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { WhatsApp } from "./Icones";
import { medir, EVENTOS } from "@/lib/medir";

/**
 * O QUESTIONÁRIO — "o seu negócio está pronto para vender online?"
 *
 * Cinco perguntas de sim ou não. Respondeu a quinta, o anel da nota se
 * desenha uma vez até o valor, com o veredito ao lado — e o botão leva
 * a nota junto para o WhatsApp, para o diagnóstico já começar
 * direcionado.
 */

const perguntas = [
  "Seu negócio tem um site profissional no ar?",
  "Você responde o WhatsApp em menos de 5 minutos?",
  "Alguém atende seus clientes fora do horário comercial?",
  "Sua empresa aparece no Google quando buscam o seu serviço?",
  "Você registra todos os contatos que chegam (nome, interesse)?",
];

const RAIO = 54;
const VOLTA = 2 * Math.PI * RAIO;

function SimNao({ valor, aoEscolher, pergunta }: { valor: boolean | null; aoEscolher: (v: boolean) => void; pergunta: string }) {
  const botao = (v: boolean, rotulo: string) => (
    <button
      type="button"
      onClick={() => aoEscolher(v)}
      aria-pressed={valor === v}
      aria-label={`${rotulo} — ${pergunta}`}
      className={`min-w-[64px] rounded-full px-4 py-2 text-[14px] font-medium transition-colors duration-200 ${
        valor === v ? "bg-noite text-white shadow-botao" : "text-grafite hover:text-tinta"
      }`}
    >
      {rotulo}
    </button>
  );
  return (
    <div className="flex shrink-0 gap-1 self-start rounded-full border border-linha bg-white p-1 sm:self-auto">
      {botao(true, "Sim")}
      {botao(false, "Não")}
    </div>
  );
}

export default function Questionario() {
  const [respostas, setRespostas] = useState<(boolean | null)[]>(Array(perguntas.length).fill(null));
  const respondidas = respostas.filter((r) => r !== null).length;
  const completo = respondidas === perguntas.length;
  const nota = respostas.filter(Boolean).length * 20;

  const veredito =
    nota <= 40
      ? "Situação crítica: o seu negócio está quase invisível no digital — e provavelmente perdendo clientes todos os dias."
      : nota <= 70
        ? "Você já começou, mas há furos importantes por onde clientes escapam sem você perceber."
        : "Boa base! Ainda assim, os pontos que faltam são exatamente os que separam quem atende de quem vende.";

  const responder = (i: number, v: boolean) => setRespostas((atuais) => atuais.map((r, j) => (j === i ? v : r)));

  useEffect(() => {
    if (completo) medir(EVENTOS.diagnostico, { nota });
  }, [completo, nota]);

  const wa = `https://wa.me/5511939299209?text=${encodeURIComponent(`Olá! Fiz o questionário no site e minha nota foi ${nota}/100. Quero o diagnóstico gratuito.`)}`;

  return (
    <section id="questionario" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-pagina px-5 sm:px-8">
        <Reveal>
          <p className="rotulo">02 · Questionário</p>
          <h2 className="equilibrado mt-5 max-w-3xl font-display text-[2.3rem] font-medium leading-[1.05] tracking-[-0.04em] text-tinta sm:text-[3rem]">
            O seu negócio está pronto <span className="font-serifa font-normal italic tracking-[-0.01em] text-azul">para vender online?</span>
          </h2>
          <p className="sem-orfa mt-5 max-w-2xl text-[17px] leading-relaxed text-grafite">
            Cinco perguntas, trinta segundos. No fim você recebe uma nota e o que fazer com ela.
          </p>
        </Reveal>

        <div className="mt-12 grid items-start gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="vidro rounded-[28px] p-6 shadow-vidro sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-cinza">
                  {respondidas} de {perguntas.length} respondidas
                </p>
                <span className="h-1.5 w-32 overflow-hidden rounded-full bg-linha" aria-hidden>
                  <span
                    className="block h-full rounded-full bg-gradient-to-r from-ceu via-violeta to-noite transition-[width] duration-500"
                    style={{ width: `${(respondidas / perguntas.length) * 100}%` }}
                  />
                </span>
              </div>
              <ol className="mt-4 divide-y divide-linha">
                {perguntas.map((p, i) => (
                  <li key={p} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="flex gap-3 text-[16px] leading-snug text-tinta">
                      <span className="font-mono text-[13px] leading-6 text-cinza">0{i + 1}</span>
                      {p}
                    </p>
                    <SimNao pergunta={p} valor={respostas[i]} aoEscolher={(v) => responder(i, v)} />
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="coluna-presa rounded-[28px] bg-noite p-7 text-white shadow-flutua sm:p-8" aria-live="polite">
              <div className="flex items-center gap-6">
                <div className="relative h-[132px] w-[132px] shrink-0">
                  <svg viewBox="0 0 132 132" className="h-full w-full -rotate-90" aria-hidden>
                    <defs>
                      <linearGradient id="anel-nota" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#BAE6FD" />
                        <stop offset="1" stopColor="#818CF8" />
                      </linearGradient>
                    </defs>
                    <circle cx="66" cy="66" r={RAIO} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="10" />
                    <circle
                      cx="66"
                      cy="66"
                      r={RAIO}
                      fill="none"
                      stroke="url(#anel-nota)"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={VOLTA}
                      strokeDashoffset={completo ? VOLTA * (1 - Math.max(nota, 2) / 100) : VOLTA}
                      style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1)" }}
                    />
                  </svg>
                  <p className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-[2.4rem] font-medium leading-none tracking-[-0.04em]">{completo ? nota : "—"}</span>
                    <span className="mt-1 font-mono text-[11px] text-white/60">de 100</span>
                  </p>
                </div>
                <p className="text-[15.5px] leading-relaxed text-white/85">
                  {completo ? veredito : `Responda as ${perguntas.length - respondidas} perguntas que faltam para ver a sua nota.`}
                </p>
              </div>
              {completo && (
                <div style={{ animation: "painelEntra .5s cubic-bezier(.22,1,.36,1) both" }}>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-white px-6 text-[15.5px] font-medium text-noite transition-colors hover:bg-ceu-claro"
                  >
                    <WhatsApp className="h-[18px] w-[18px]" /> Quero o diagnóstico gratuito
                  </a>
                  <p className="mt-3 text-center text-[13.5px] text-white/65">A sua nota vai junto na mensagem — o diagnóstico já começa direcionado.</p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
