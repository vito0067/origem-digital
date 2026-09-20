"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import TituloSecao from "./TituloSecao";
import Contador from "./Contador";
import RadarDiagnostico from "./RadarDiagnostico";
import { somLigado, guardarSom, tocarTec } from "@/lib/som";
import { medir, EVENTOS } from "@/lib/medir";

/**
 * DIAGNÓSTICO
 *
 * Antes: as cinco perguntas centralizadas e a nota só aparecia depois
 * da última resposta, embaixo de tudo. Quem respondia duas e desistia
 * não via nada acontecer e ia embora.
 *
 * Agora as perguntas ficam à esquerda e o painel da nota fica preso à
 * direita, andando junto: a cada "sim" ou "não" o anel se preenche e a
 * nota sobe. Ver a barra andar é o que faz a pessoa terminar as cinco.
 */

const perguntas = [
  "Seu negócio tem um site profissional no ar?",
  "Você responde o WhatsApp em menos de 5 minutos?",
  "Alguém atende seus clientes fora do horário comercial?",
  "Sua empresa aparece no Google quando buscam seu serviço?",
  "Você registra todos os contatos que chegam (nome, interesse)?",
];

export default function DiagnosticQuiz() {
  const [respostas, setRespostas] = useState<(boolean | null)[]>(
    Array(perguntas.length).fill(null)
  );

  const respondidas = respostas.filter((r) => r !== null).length;
  const completo = respondidas === perguntas.length;
  const nota = respostas.filter(Boolean).length * 20;

  const veredito =
    nota <= 40
      ? "Situação crítica: seu negócio está praticamente invisível no digital — e provavelmente perdendo clientes todos os dias."
      : nota <= 70
      ? "Você já começou, mas há furos importantes por onde clientes escapam sem você perceber."
      : "Boa base! Ainda assim, os pontos que faltam são exatamente os que separam quem atende de quem vende.";

  // O som começa desligado. A preferência é lida depois da montagem,
  // porque o servidor não tem como saber o que está guardado no
  // navegador da pessoa — ler antes faria o botão piscar.
  const [som, setSom] = useState(false);
  useEffect(() => setSom(somLigado()), []);

  const alternarSom = () => {
    const novo = !som;
    setSom(novo);
    guardarSom(novo);
    if (novo) tocarTec(880);
  };

  const responder = (i: number, v: boolean) => {
    const proximas = [...respostas];
    proximas[i] = v;
    setRespostas(proximas);
    // "sim" soa um pouco mais agudo que "não" — dá para sentir o
    // diagnóstico indo bem ou mal sem olhar para a nota
    if (som) tocarTec(v ? 920 : 640);

    // Anota só quando a última resposta entra. Assim o painel mostra
    // quantas pessoas realmente chegam ao fim — e com que nota, que é
    // o retrato de quem está batendo na porta.
    if (proximas.every((r) => r !== null)) {
      medir(EVENTOS.diagnostico, {
        nota: proximas.filter(Boolean).length * 20,
      });
    }
  };

  const waText = encodeURIComponent(
    `Olá! Fiz o diagnóstico no site e minha nota foi ${nota}/100. Quero uma consultoria gratuita.`
  );

  return (
    <section
      id="diagnostico"
      className="relative border-t border-white/[0.06] bg-surface py-20 sm:py-24"
    >
      <div aria-hidden className="neon-grid absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex items-start justify-between gap-6">
          <TituloSecao
            etiqueta="Diagnóstico gratuito"
            titulo="O seu negócio está preparado para vender online?"
            apoio="Cinco perguntas, trinta segundos. No fim você recebe uma nota e o que fazer com ela."
          />

          {/* Liga/desliga o "tec" das respostas. Fica aqui, ao lado do
              que produz o som, e não escondido num canto da tela. */}
          <button
            type="button"
            onClick={alternarSom}
            aria-pressed={som}
            aria-label={som ? "Desligar som das respostas" : "Ligar som das respostas"}
            title={som ? "Desligar som" : "Ligar som"}
            className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${
              som
                ? "border-cyan-neon/50 bg-cyan-neon/10 text-cyan-neon"
                : "border-white/15 text-slate-500 hover:border-white/30 hover:text-slate-300"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M11 5L6 9H3v6h3l5 4V5z" strokeLinejoin="round" />
              {som ? (
                <>
                  <path d="M15.5 8.5a5 5 0 010 7" strokeLinecap="round" />
                  <path d="M18.5 5.5a9 9 0 010 13" strokeLinecap="round" />
                </>
              ) : (
                <path d="M16 9l5 6M21 9l-5 6" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* ---- Perguntas ---- */}
          <div className="lg:col-span-7">
            <ol className="flex flex-col gap-3">
              {perguntas.map((p, i) => (
                <Reveal key={p} de="esquerda" delay={i * 70}>
                  <li
                    className={`glass-card flex flex-col gap-4 p-5 transition-colors duration-300 sm:flex-row sm:items-center sm:justify-between ${
                      respostas[i] !== null
                        ? "border-white/[0.16]"
                        : "border-white/10"
                    }`}
                  >
                    <p className="flex gap-3 text-sm text-slate-200">
                      <span className="font-display font-bold text-gradient-neon">
                        {i + 1}.
                      </span>
                      {p}
                    </p>
                    <div className="flex shrink-0 gap-2">
                      {([true, false] as const).map((v) => (
                        <button
                          key={String(v)}
                          type="button"
                          onClick={() => responder(i, v)}
                          aria-pressed={respostas[i] === v}
                          className={`min-w-[74px] rounded-lg border px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                            respostas[i] === v
                              ? v
                                ? "border-cyan-neon bg-cyan-neon/15 text-cyan-neon shadow-neon-cyan"
                                : "border-violet-neon bg-violet-neon/15 text-violet-neon shadow-neon-violet"
                              : "border-white/15 bg-white/[0.04] text-slate-400 hover:border-white/30 hover:text-white"
                          }`}
                        >
                          {v ? "Sim" : "Não"}
                        </button>
                      ))}
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* ---- Painel da nota, preso ---- */}
          <Reveal de="direita" delay={140} className="lg:col-span-5">
            <div
              className="coluna-presa glass-card flex flex-col items-center p-8 text-center ring-1 ring-cyan-neon/20 sm:p-10"
              aria-live="polite"
            >
              {/* O gráfico se remodela a cada resposta.
                  A nota sozinha dizia que estava mal, mas não ONDE. Aqui
                  o formato mostra o furo: os eixos encolhidos são por
                  onde o cliente escapa, e a conversa no WhatsApp já
                  começa sabendo do que falar. */}
              <div className="h-56 w-56 sm:h-60 sm:w-60">
                <RadarDiagnostico respostas={respostas} />
              </div>

              {completo ? (
                <div className="mt-2 flex items-baseline gap-2">
                  <p className="font-display text-4xl font-bold text-gradient-neon">
                    <Contador valor={nota} />
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                    de 100
                  </p>
                </div>
              ) : (
                <div className="mt-2 w-full max-w-[220px]">
                  <div className="h-1 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-neon to-violet-neon transition-all duration-500"
                      style={{
                        width: `${(respondidas / perguntas.length) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="mt-2.5 text-[10px] uppercase tracking-[0.25em] text-slate-500">
                    {respondidas} de {perguntas.length} respondidas
                  </p>
                </div>
              )}

              {!completo ? (
                <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-500">
                  Responda as {perguntas.length - respondidas} perguntas que
                  faltam para ver sua nota e o que ela significa.
                </p>
              ) : (
                <>
                  <p className="mt-7 max-w-xs text-sm leading-relaxed text-slate-300">
                    {veredito}
                  </p>
                  <a
                    href={`https://wa.me/5511939299209?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex w-full animate-pulse-glow items-center justify-center rounded-xl bg-cyan-neon px-7 py-3.5 text-sm font-semibold text-abyss transition-transform hover:scale-[1.03]"
                  >
                    Solicitar minha consultoria gratuita
                  </a>
                  <p className="mt-3 text-xs leading-relaxed text-slate-500">
                    Sua nota vai junto na mensagem — a consultoria já começa
                    direcionada.
                  </p>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
