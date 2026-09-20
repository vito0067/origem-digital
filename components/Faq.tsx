"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import NeonButton from "./NeonButton";
import TituloSecao from "./TituloSecao";
import Magnetic from "./Magnetic";

/**
 * FAQ
 *
 * Antes: título centralizado e dez sanfonas em coluna única no meio da
 * tela — a seção mais alta do site e a mais monótona de percorrer.
 *
 * Agora o título e o convite para chamar no WhatsApp ficam presos à
 * esquerda, e as perguntas correm à direita. A pessoa nunca perde o
 * botão de vista enquanto procura a dúvida dela.
 *
 * Os preços citados nas respostas são os mesmos da seção de planos.
 * Mudou um, mude o outro — e lembre da tabela da Aurora no n8n.
 */

const faqs = [
  {
    q: "Quanto custa?",
    a: "Sites profissionais a partir de R$ 987 de setup único + R$ 43/mês (com domínio, hospedagem e manutenção básica inclusos). Agentes de IA a partir de R$ 657 de setup + R$ 217/mês. O Pacote Completo tem 12% de desconto no setup somado e mensalidade de R$ 260 a R$ 381/mês, conforme a combinação. No diagnóstico gratuito indicamos exatamente o que faz sentido para o seu caso.",
  },
  {
    q: "Quanto tempo demora?",
    a: "Entre 1 e 2 semanas, tanto para o site quanto para o agente de IA. Você acompanha o progresso e aprova antes de ir ao ar.",
  },
  {
    q: "Como funciona o processo?",
    a: "Diagnóstico gratuito no WhatsApp, planejamento da solução, desenvolvimento sob medida, implantação com testes junto com você e suporte contínuo depois da entrega.",
  },
  {
    q: "Preciso ter domínio ou hospedagem?",
    a: "Não. Domínio, hospedagem e manutenção básica já estão inclusos na mensalidade do site. Se você já tiver um domínio, aproveitamos ele.",
  },
  {
    q: "Como funciona o agente de IA no WhatsApp?",
    a: "Ele responde seus clientes em segundos usando inteligência artificial treinada com as informações do seu negócio: serviços, preços, horários e dúvidas frequentes. Qualifica interessados, registra os contatos e transfere a conversa para você nos momentos importantes.",
  },
  {
    q: "O atendimento é realmente 24 horas?",
    a: "Sim. O agente funciona em nuvem, sem depender do seu celular ligado. Madrugada, feriado ou horário de pico: nenhuma mensagem fica sem resposta.",
  },
  {
    q: "Posso personalizar o site e o agente?",
    a: "Totalmente. O site segue a identidade visual da sua marca e o agente é configurado com o seu tom de atendimento. Ajustes pontuais depois da entrega custam R$ 97 (site) e R$ 147 (agente) — ou entram no seu plano mensal.",
  },
  {
    q: "Vocês oferecem suporte depois da entrega?",
    a: "Sim, o suporte contínuo está incluso nos planos mensais: manutenção, correções e acompanhamento para o digital nunca parar.",
  },
  {
    q: "E se o projeto atrasar?",
    a: "Temos garantia de implantação: se o seu projeto não estiver no ar em até 14 dias, trabalhamos sem nenhum custo adicional até concluí-lo.",
  },
  {
    q: "E se eu quiser cancelar?",
    a: "Sem fidelidade escondida: conversamos abertamente sobre prazos e condições antes de qualquer contrato. Transparência faz parte do nosso jeito de trabalhar.",
  },
];

/**
 * Quantas perguntas aparecem antes de a pessoa pedir o resto.
 *
 * As dez continuam no site — nenhuma foi cortada. Só que dez sanfonas
 * abertas de uma vez faziam desta a seção mais alta da página, e as
 * quatro últimas são as que quase ninguém procura. Mostrando seis, a
 * seção encolhe cerca de 330px e quem quer as outras clica uma vez.
 *
 * As respostas escondidas continuam no HTML, então o Google lê as dez.
 */
const VISIVEIS = 6;

export default function Faq() {
  const [tudo, setTudo] = useState(false);
  const escondidas = faqs.length - VISIVEIS;

  /**
   * Quais respostas estão abertas. É um conjunto, e não um índice só,
   * porque quem está comparando preço com prazo quer as duas abertas
   * ao mesmo tempo — fechar uma para abrir a outra irrita.
   */
  const [abertas, setAbertas] = useState<Set<number>>(new Set());

  const alternar = (i: number) =>
    setAbertas((atuais) => {
      const proximas = new Set(atuais);
      if (proximas.has(i)) proximas.delete(i);
      else proximas.add(i);
      return proximas;
    });

  return (
    <section id="faq" className="relative border-t border-white/[0.06] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---- Título preso, à esquerda ---- */}
          <div className="coluna-presa self-start lg:col-span-5">
            <TituloSecao
              etiqueta="Perguntas frequentes"
              titulo="Tudo o que você precisa saber antes de decidir."
              tom="violet"
              apoio="As dez perguntas que mais chegam no WhatsApp, respondidas sem enrolação."
            />

            <Reveal de="esquerda" delay={220}>
              <div className="mt-9">
                <Magnetic forca={0.2}>
                  <NeonButton
                    href="https://wa.me/5511939299209?text=Ol%C3%A1!%20Tenho%20uma%20d%C3%BAvida%20sobre%20os%20servi%C3%A7os."
                    variant="ghost"
                    external
                  >
                    Ainda tem dúvidas? Chama no WhatsApp
                  </NeonButton>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* ---- Perguntas, à direita ---- */}
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-2.5">
              {faqs.map((f, i) => {
                const aberta = abertas.has(i);
                return (
                  <Reveal key={f.q} de="direita" delay={Math.min(i * 45, 260)}>
                    <div
                      // As escondidas continuam no HTML, só não ocupam a
                      // tela: assim o Google continua lendo as dez.
                      hidden={!tudo && i >= VISIVEIS}
                      className={`glass-card group overflow-hidden transition-colors duration-300 hover:border-white/20 ${
                        aberta ? "border-cyan-neon/25" : ""
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => alternar(i)}
                        aria-expanded={aberta}
                        aria-controls={`resposta-${i}`}
                        className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left font-display text-sm font-semibold text-white transition-colors hover:text-cyan-neon"
                      >
                        {f.q}
                        <span
                          aria-hidden
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-cyan-neon transition-transform duration-300 ${
                            aberta
                              ? "rotate-45 border-cyan-neon/50"
                              : "border-white/15"
                          }`}
                        >
                          +
                        </span>
                      </button>

                      {/* A resposta desliza abrindo em vez de aparecer de
                          estalo. O <details> do navegador não permite
                          animar isso — por isso a sanfona é feita à mão,
                          com a linha de grade indo de 0fr a 1fr. */}
                      <div
                        id={`resposta-${i}`}
                        className={`sanfona ${aberta ? "sanfona-aberta" : ""}`}
                      >
                        <div>
                          <p className="px-5 pb-5 text-sm leading-relaxed text-slate-400">
                            {f.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {!tudo && escondidas > 0 && (
              <button
                type="button"
                onClick={() => setTudo(true)}
                className="group mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 py-4 text-sm font-semibold text-slate-400 transition-colors hover:border-cyan-neon/40 hover:text-cyan-neon"
              >
                Ver as outras {escondidas} perguntas
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
