"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import NeonButton from "./NeonButton";
import TituloSecao from "./TituloSecao";
import Holofote from "./Holofote";
import Magnetic from "./Magnetic";
import Garantias from "./Garantias";
import ContagemOferta from "./ContagemOferta";
import Contador from "./Contador";
import { acheProduto, avulsos, reais, setupSeparado } from "@/lib/precos";

/**
 * PLANOS — Serviços, Oferta e Garantia em uma seção só.
 *
 * Eram três seções separadas dizendo a mesma coisa. A "Oferta do mês"
 * (Pacote Início Digital, R$ 1.446) é exatamente o Pacote Completo com
 * os 12% de desconto aplicados — quem descia a página via o mesmo
 * produto duas vezes, com nomes diferentes, e ficava em dúvida sobre
 * quantos pacotes existiam. Agora é um bloco só, com o preço cheio
 * riscado ao lado do preço com desconto.
 *
 * A garantia de 14 dias virou uma faixa no fim da seção: ela serve para
 * tirar o medo na hora de decidir, então precisa estar ao lado do preço,
 * não três telas depois dele.
 *
 * ATENÇÃO — os preços aqui aparecem em mais lugares (tabela da Aurora no
 * n8n, planilha, manuais). Mudar aqui e esquecer lá faz o agente informar
 * preço velho para cliente real. Todos os valores abaixo são os mesmos
 * que já estavam publicados.
 */

const WA = "https://wa.me/5511939299209?text=";

type Servico = {
  eyebrow: string;
  title: string;
  pain: string;
  bullets: string[];
  /** Os dois degraus desta família, por id em lib/precos.ts. */
  degraus: [string, string];
  cta: string;
  ctaMsg: string;
  accent: "cyan" | "violet";
};

const servicos: Servico[] = [
  {
    eyebrow: "Presença online",
    title: "Sites Profissionais",
    pain: "Quem não te encontra no Google, fecha com o concorrente que aparece.",
    bullets: [
      "Design sob medida, alinhado à sua marca",
      "Rápido, responsivo e otimizado para o Google",
      "Botão direto para o seu WhatsApp",
      "Domínio, hospedagem e manutenção inclusos",
      "No ar em 1 a 2 semanas",
    ],
    degraus: ["site-simples", "site-completo"],
    cta: "Quero um site profissional",
    ctaMsg: "Ol%C3%A1!%20Quero%20um%20site%20profissional%20para%20meu%20neg%C3%B3cio.",
    accent: "cyan",
  },
  {
    eyebrow: "Atendimento inteligente",
    title: "Agentes de IA no WhatsApp",
    pain: "Cada mensagem sem resposta rápida é um cliente indo embora.",
    bullets: [
      "Responde clientes em segundos, 24 horas por dia",
      "Apresenta serviços e tira dúvidas em tempo real",
      "Qualifica leads e registra interessados",
      "Transfere para você nos momentos decisivos",
      "Funcionando em 1 a 2 semanas",
    ],
    degraus: ["agente-essencial", "agente-avancado"],
    cta: "Quero automatizar meu atendimento",
    ctaMsg:
      "Ol%C3%A1!%20Quero%20automatizar%20meu%20atendimento%20no%20WhatsApp%20com%20IA.",
    accent: "violet",
  },
];

const pacoteBullets = [
  "Site profissional no ar em 1 a 2 semanas",
  "Agente de IA atendendo seu WhatsApp 24/7",
  "Site e agente integrados, uma única equipe cuidando de tudo",
  "Suporte e manutenção contínuos inclusos",
];

const TEXTO = { cyan: "text-cyan-neon", violet: "text-violet-neon" };
const BRILHO = {
  cyan: "hover:border-cyan-neon/50 hover:shadow-neon-cyan",
  violet: "hover:border-violet-neon/50 hover:shadow-neon-violet",
};

export default function Planos() {
  const [mes, setMes] = useState("este mês");

  useEffect(() => {
    const m = new Date().toLocaleDateString("pt-BR", { month: "long" });
    setMes(m.charAt(0).toUpperCase() + m.slice(1));
  }, []);

  return (
    <section
      id="servicos"
      className="relative border-t border-white/[0.06] py-20 sm:py-24"
    >
      <div aria-hidden className="neon-grid absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Cabeçalho em duas colunas: o título à esquerda e a promessa de
            preço à direita, em vez de tudo empilhado no meio. */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <TituloSecao
              etiqueta="Serviços e preços"
              titulo="Escolha como o seu negócio vai parar de perder clientes."
              tom="violet"
            />
          </div>
          <Reveal de="direita" delay={150} className="lg:col-span-5">
            <p className="leading-relaxed text-slate-400 lg:text-right">
              Preço na mesa, sem reunião para descobrir quanto custa. Setup
              único mais uma mensalidade que já inclui hospedagem, uso do
              agente e suporte.
            </p>
          </Reveal>
        </div>

        {/* ---- Os dois serviços ---- */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {servicos.map((s, i) => (
            <Reveal key={s.title} de={i === 0 ? "esquerda" : "direita"} delay={i * 110}>
              <Holofote
                as="article"
                inclinar
                className={`glass-card flex h-full flex-col p-8 transition-all duration-300 ${BRILHO[s.accent]}`}
              >
                <p
                  className={`text-[11px] font-semibold uppercase tracking-[0.25em] ${TEXTO[s.accent]}`}
                >
                  {s.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold text-white">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm italic leading-relaxed text-slate-400">
                  {s.pain}
                </p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-sm text-slate-300"
                    >
                      <span
                        aria-hidden
                        className={`mt-0.5 shrink-0 font-bold ${TEXTO[s.accent]}`}
                      >
                        ✓
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  {/* OS DOIS DEGRAUS, UM DO LADO DO OUTRO.
                      Antes havia só "a partir de R$ 987" e o preço da
                      versão completa ia escondido numa linha de letra
                      miúda embaixo. Preço que a pessoa não acha, ela
                      supõe — e supõe sempre para cima. Aqui os dois
                      aparecem com o mesmo peso, e embaixo de cada um o
                      que ele resolve. */}
                  <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/[0.06]">
                    {s.degraus.map((id, n) => {
                      const d = acheProduto(id);
                      return (
                        <div key={id} className="bg-abyss/80 p-4">
                          <p
                            className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
                              n === 0 ? "text-slate-500" : TEXTO[s.accent]
                            }`}
                          >
                            {d.nome.replace(/^(Site|Agente)\s/, "")}
                          </p>
                          <p className="mt-2 font-display text-xl font-bold text-white">
                            {reais(d.setup)}
                          </p>
                          <p className="text-xs text-slate-400">
                            + {reais(d.mensal)}/mês
                          </p>
                          <p className="mt-2.5 text-[11px] leading-relaxed text-slate-500">
                            {d.indicado}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6">
                    <NeonButton href={`${WA}${s.ctaMsg}`} variant="ghost" external>
                      {s.cta}
                    </NeonButton>
                  </div>
                </div>
              </Holofote>
            </Reveal>
          ))}
        </div>

        {/* ---- O Pacote, com a oferta do mês embutida ----
            É o que a empresa quer vender, então ocupa a largura inteira e
            sai da fileira dos outros dois. */}
        <Reveal delay={180}>
          <Holofote
            as="article"
            className="glass-card relative mt-6 overflow-hidden p-8 ring-1 ring-cyan-neon/30 transition-all duration-300 hover:border-cyan-neon/50 hover:shadow-neon-cyan sm:p-12"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_120%_at_85%_50%,rgba(0,229,255,0.10),transparent_70%)]"
            />
            <span
              aria-hidden
              className="numero-fantasma pointer-events-none absolute -bottom-8 -left-2 text-[10rem] sm:text-[14rem]"
            >
              12%
            </span>

            <div className="relative grid gap-12 md:grid-cols-5 md:items-center">
              <div className="md:col-span-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-cyan-neon/60 bg-cyan-neon/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-cyan-neon">
                    Oferta de {mes}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                    Melhor custo-benefício
                  </span>
                  <ContagemOferta className="text-[11px] uppercase tracking-widest text-slate-400" />
                </div>

                <h3 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
                  Pacote Completo
                </h3>
                <p className="mt-1 font-display text-lg text-slate-400">
                  Início Digital — site + agente de IA + suporte contínuo
                </p>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-400">
                  O cliente te encontra no Google e é atendido na hora — do
                  primeiro clique ao fechamento.
                </p>

                <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                  {pacoteBullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-sm text-slate-300"
                    >
                      <span aria-hidden className="mt-0.5 shrink-0 font-bold text-cyan-neon">
                        ✓
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* O preço, com a âncora do valor cheio logo acima.
                  Tudo sai de lib/precos.ts: o valor com desconto é
                  CALCULADO a partir das partes, não digitado, então ele
                  nunca deixa de bater com a conta dos 12%.

                  O número SOBE até o valor quando entra na tela. O olho
                  acompanha e para nele — que é onde a decisão acontece. */}
              <div className="md:col-span-2 md:border-l md:border-white/10 md:pl-12">
                <p className="text-sm text-slate-400">
                  Contratado separado:{" "}
                  <s className="text-slate-500">
                    {reais(setupSeparado["pacote-inicio"])}
                  </s>
                </p>
                <p className="mt-1 font-display text-5xl font-bold leading-none text-gradient-neon sm:text-6xl">
                  <Contador
                    valor={acheProduto("pacote-inicio").setup}
                    duracao={1400}
                    formatar={(n) => reais(n)}
                  />
                </p>
                <p className="mt-3 text-sm text-slate-300">
                  + {reais(acheProduto("pacote-inicio").mensal)}/mês —
                  hospedagem, uso do agente e suporte inclusos
                </p>
                <p className="mt-3 text-xs leading-relaxed text-slate-500">
                  O desconto de 12% vale sobre o setup. Combinando as versões
                  completas, o setup fica em{" "}
                  {reais(acheProduto("pacote-completo").setup)} e a mensalidade
                  em {reais(acheProduto("pacote-completo").mensal)}/mês.
                </p>

                <div className="mt-8">
                  <Magnetic>
                    <NeonButton
                      href={`${WA}Ol%C3%A1!%20Quero%20garantir%20o%20Pacote%20In%C3%ADcio%20Digital%20com%20desconto%20deste%20m%C3%AAs.`}
                      variant="primary"
                      external
                    >
                      Garantir minha condição de {mes}
                    </NeonButton>
                  </Magnetic>
                </div>
                <p className="mt-4 text-xs text-slate-500">
                  Condição válida para contratações realizadas até o fim do mês.
                </p>
              </div>
            </div>
          </Holofote>
        </Reveal>

        {/* ---- Manutenções avulsas ----
            Era uma linha de letra cinza no rodapé da seção, do tamanho de
            um aviso legal — e ninguém lia. É informação que tira objeção:
            prova que mexer no site depois não custa uma fortuna nem exige
            contratar outro plano. Agora tem cartão próprio, com os dois
            valores em destaque e um de cada lado. */}
        <Reveal delay={120}>
          <Holofote className="glass-card mt-6 flex flex-col gap-6 p-7 transition-colors duration-300 hover:border-cyan-neon/30 sm:flex-row sm:items-center sm:gap-10 sm:p-8">
            <div className="sm:flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-neon">
                Precisou mudar depois?
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                Ajuste avulso, sem mudar de plano e sem taxa escondida.
                Alterações maiores já entram na sua mensalidade.
              </p>
            </div>

            <dl className="grid shrink-0 grid-cols-2 gap-5 sm:gap-8">
              {avulsos.map((item) => (
                <div
                  key={item.valor}
                  className="border-l border-white/10 pl-5 sm:pl-6"
                >
                  <dt className="font-display text-2xl font-bold text-gradient-neon sm:text-3xl">
                    {reais(item.valor)}
                  </dt>
                  <dd className="mt-1.5 text-xs leading-relaxed text-slate-400">
                    {item.o_que}
                  </dd>
                </div>
              ))}
            </dl>
          </Holofote>
        </Reveal>

        {/* Aqui existia uma tabela com os seis produtos lado a lado.
            Saiu: os dois degraus dentro de cada cartão já mostram a
            diferença de preço e para quem serve, e a tabela repetia
            tudo logo abaixo — a pessoa lia a mesma coisa duas vezes e
            a seção ficava 600px mais longa. O componente continua em
            components/TabelaPrecos.tsx, caso um dia faça falta. */}

        {/* ---- As três garantias ----
            A garantia de 14 dias era uma faixa sozinha aqui. Agora ela é
            uma das três, ao lado do direito de arrependimento e da
            carência — as três com cláusula correspondente nos Termos. */}
        <Garantias />
      </div>
    </section>
  );
}
