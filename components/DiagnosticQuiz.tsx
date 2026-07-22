"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const questions = [
  "Seu negócio tem um site profissional no ar?",
  "Você responde o WhatsApp em menos de 5 minutos?",
  "Alguém atende seus clientes fora do horário comercial?",
  "Sua empresa aparece no Google quando buscam seu serviço?",
  "Você registra todos os contatos que chegam (nome, interesse)?",
];

export default function DiagnosticQuiz() {
  const [answers, setAnswers] = useState<(boolean | null)[]>(
    Array(questions.length).fill(null)
  );

  const answered = answers.filter((a) => a !== null).length;
  const done = answered === questions.length;
  const score = answers.filter(Boolean).length * 20;

  const verdict =
    score <= 40
      ? "Situação crítica: seu negócio está praticamente invisível no digital — e provavelmente perdendo clientes todos os dias."
      : score <= 70
      ? "Você já começou, mas há furos importantes por onde clientes escapam sem você perceber."
      : "Boa base! Ainda assim, os pontos que faltam são exatamente os que separam quem atende de quem vende.";

  const setAnswer = (i: number, v: boolean) => {
    const next = [...answers];
    next[i] = v;
    setAnswers(next);
  };

  const waText = encodeURIComponent(
    `Olá! Fiz o diagnóstico no site e minha nota foi ${score}/100. Quero uma consultoria gratuita.`
  );

  return (
    <section id="diagnostico" className="relative py-28">
      <div aria-hidden className="neon-grid absolute inset-0" />
      <div className="relative mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="text-center text-xs font-medium uppercase tracking-[0.35em] text-cyan-neon">
            Diagnóstico gratuito
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-bold text-white sm:text-4xl">
            O seu negócio está preparado para{" "}
            <span className="text-gradient-neon">vender online</span>?
          </h2>
          <p className="mt-3 text-center text-sm text-slate-400">
            Responda 5 perguntas e receba sua nota na hora.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass-card mt-10 p-7 sm:p-9">
            <ol className="flex flex-col gap-6">
              {questions.map((q, i) => (
                <li key={q} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-slate-200">
                    <span className="mr-2 font-display font-bold text-gradient-neon">{i + 1}.</span>
                    {q}
                  </p>
                  <div className="flex gap-2">
                    {([true, false] as const).map((v) => (
                      <button
                        key={String(v)}
                        type="button"
                        onClick={() => setAnswer(i, v)}
                        className={`rounded-lg border px-5 py-2 text-sm font-semibold transition-all ${
                          answers[i] === v
                            ? v
                              ? "border-cyan-neon bg-cyan-neon/15 text-cyan-neon shadow-neon-cyan"
                              : "border-violet-neon bg-violet-neon/15 text-violet-neon shadow-neon-violet"
                            : "border-white/15 bg-white/[0.04] text-slate-400 hover:border-white/30"
                        }`}
                      >
                        {v ? "Sim" : "Não"}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ol>

            {/* Resultado */}
            <div className="mt-10 border-t border-white/10 pt-8 text-center" aria-live="polite">
              {!done ? (
                <p className="text-sm text-slate-500">
                  {answered} de {questions.length} respondidas — complete para ver sua nota.
                </p>
              ) : (
                <>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Sua nota</p>
                  <p className="mt-2 font-display text-6xl font-bold text-gradient-neon">
                    {score}<span className="text-3xl text-slate-400">/100</span>
                  </p>
                  <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-300">{verdict}</p>
                  <a
                    href={`https://wa.me/5511939299209?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center justify-center rounded-xl bg-cyan-neon px-7 py-3.5 text-sm font-semibold text-abyss animate-pulse-glow transition-transform hover:scale-[1.03]"
                  >
                    Solicitar minha consultoria gratuita
                  </a>
                  <p className="mt-3 text-xs text-slate-500">Sua nota vai junto na mensagem — a consultoria já começa direcionada.</p>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
