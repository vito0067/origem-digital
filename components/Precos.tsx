"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Reveal from "./Reveal";
import Botao from "./Botao";
import ContagemOferta from "./ContagemOferta";
import { VistoDuplo, WhatsApp } from "./Icones";
import { avulsos, porFamilia, reais, setupSeparado, type Produto } from "@/lib/precos";

/**
 * OS PREÇOS — três abas, dois planos por aba.
 *
 * A tabela inteira de uma vez era muita coisa para ler. Aqui a pessoa
 * escolhe o que procura (site, atendente ou os dois) e vê só dois
 * planos lado a lado. O indicador da aba escorrega até a escolhida — o
 * único movimento da seção.
 *
 * Preços: lib/precos.ts. Condições (50/50, mensalidade a partir do 2º
 * mês, fidelidade, avulsos): Contrato Master (out/2026).
 */

const ABAS = [
  { id: "site", nome: "Site", curto: "Site" },
  { id: "agente", nome: "Atendente de IA", curto: "Atendente" },
  { id: "pacote", nome: "Site + atendente", curto: "Os dois" },
] as const;

type Aba = (typeof ABAS)[number]["id"];

const ITENS: Record<string, string[]> = {
  "site-simples": ["Site profissional sob medida", "Pronto para o Google e para o celular", "Botão direto para o seu WhatsApp", "Domínio, hospedagem e manutenção inclusos"],
  "site-completo": ["Tudo do Site Simples", "Blog para aparecer mais no Google", "Formulários de contato e de pedido", "Para quem quer o site trabalhando por ele"],
  "agente-essencial": ["Atendimento 24/7 no seu WhatsApp", "Treinada com seus serviços e preços", "Registra cada contato interessado", "Responde no tom do seu negócio"],
  "agente-avancado": ["Tudo do Agente Essencial", "Para volume alto de conversas", "CRM e qualificação de leads", "Transferência para humano e agenda integrada"],
  "pacote-inicio": ["Site Simples + Agente Essencial", "12% de desconto no setup", "Presença e atendimento desde o primeiro dia", "Um contrato, um suporte"],
  "pacote-completo": ["Site Completo + Agente Avançado", "12% de desconto no setup", "Tudo funcionando no máximo", "Um contrato, um suporte"],
};

const WA = (texto: string) => `https://wa.me/5511939299209?text=${encodeURIComponent(texto)}`;

function Plano({ p, destaque }: { p: Produto; destaque: boolean }) {
  const riscado = p.familia === "pacote" ? setupSeparado[p.id as keyof typeof setupSeparado] : undefined;
  return (
    <article
      className={`relative flex h-full flex-col rounded-[28px] p-7 sm:p-8 ${destaque ? "bg-noite text-white shadow-flutua" : "vidro text-tinta shadow-vidro"}`}
    >
      {destaque && (
        <span className="mb-5 self-start rounded-full bg-white/12 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ceu-claro ring-1 ring-white/20 sm:absolute sm:right-6 sm:top-6 sm:mb-0">
          Melhor custo-benefício
        </span>
      )}
      <h3 className="font-display text-[1.45rem] font-medium tracking-[-0.025em]">{p.nome.replace("Pacote ", "")}</h3>
      <p className={`mt-1 text-[14.5px] ${destaque ? "text-white/75" : "text-cinza"}`}>{p.indicado}</p>

      <p className={`mt-8 text-[13.5px] ${destaque ? "text-white/70" : "text-cinza"}`}>
        {riscado ? (
          <>
            separado: <s>{reais(riscado)}</s>
          </>
        ) : (
          "setup único"
        )}
      </p>
      <p className="font-display text-[2.9rem] font-medium leading-none tracking-[-0.045em]">{reais(p.setup)}</p>
      <p className={`mt-2 font-mono text-[14px] ${destaque ? "text-ceu-claro" : "text-azul"}`}>+ {reais(p.mensal)}/mês</p>

      <ul className={`mt-8 flex flex-col gap-3 border-t pt-7 ${destaque ? "border-white/15" : "border-linha"}`}>
        {(ITENS[p.id] ?? []).map((i) => (
          <li key={i} className={`flex items-start gap-3 text-[15px] leading-relaxed ${destaque ? "text-white/90" : "text-grafite"}`}>
            <VistoDuplo className={`mt-[7px] h-3 w-[17px] shrink-0 ${destaque ? "text-ceu" : "text-violeta"}`} />
            {i}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-9">
        {destaque ? (
          <a
            href={WA(`Olá! Tenho interesse no ${p.nome}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-white px-6 text-[15.5px] font-medium text-noite transition-colors hover:bg-ceu-claro"
          >
            <WhatsApp className="h-[18px] w-[18px] shrink-0" />
            Quero o {p.nome}
          </a>
        ) : (
          <Botao href={WA(`Olá! Tenho interesse no ${p.nome}.`)} tom="vidro" cheio>
            Quero o {p.nome}
          </Botao>
        )}
      </div>
    </article>
  );
}

export default function Precos() {
  const [aba, setAba] = useState<Aba>("pacote");
  const botoes = useRef<(HTMLButtonElement | null)[]>([]);
  const indice = ABAS.findIndex((a) => a.id === aba);
  const [AJUSTE_SITE, AJUSTE_AGENTE] = avulsos;

  // Setas do teclado trocam de aba, como em qualquer grupo de abas.
  const teclas = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = (indice + (e.key === "ArrowRight" ? 1 : ABAS.length - 1)) % ABAS.length;
    setAba(ABAS[n].id);
    botoes.current[n]?.focus();
  };

  const mes = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(new Date());

  return (
    <section id="precos" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-pagina px-5 sm:px-8">
        <Reveal className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="rotulo">Preços</p>
            <h2 className="equilibrado mt-5 max-w-2xl font-display text-[2.4rem] font-medium leading-[1.04] tracking-[-0.04em] text-tinta sm:text-[3.2rem]">
              Preço na tela. <span className="font-serifa font-normal italic tracking-[-0.01em] text-azul">Antes de qualquer reunião.</span>
            </h2>
          </div>

          <div role="tablist" aria-label="Escolha o serviço" onKeyDown={teclas} className="vidro relative grid w-full grid-cols-3 rounded-full p-1.5 shadow-vidro sm:w-auto">
            <span
              aria-hidden
              className="absolute bottom-1.5 left-1.5 top-1.5 rounded-full bg-noite shadow-botao transition-transform duration-500 [transition-timing-function:cubic-bezier(.22,1,.36,1)]"
              style={{ width: "calc((100% - 12px) / 3)", transform: `translateX(${indice * 100}%)` }}
            />
            {ABAS.map((a, i) => (
              <button
                key={a.id}
                ref={(el) => {
                  botoes.current[i] = el;
                }}
                role="tab"
                id={`aba-${a.id}`}
                aria-selected={aba === a.id}
                aria-controls="painel-precos"
                tabIndex={aba === a.id ? 0 : -1}
                onClick={() => setAba(a.id)}
                className={`relative z-10 whitespace-nowrap rounded-full px-3 py-2.5 text-[13.5px] font-medium transition-colors duration-300 sm:px-6 sm:text-[14.5px] ${
                  aba === a.id ? "text-white" : "text-grafite hover:text-tinta"
                }`}
              >
                <span className="sm:hidden">{a.curto}</span>
                <span className="hidden sm:inline">{a.nome}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div id="painel-precos" role="tabpanel" aria-labelledby={`aba-${aba}`} key={aba} className="mt-12 grid gap-5 md:grid-cols-2" style={{ animation: "painelEntra .45s cubic-bezier(.22,1,.36,1) both" }}>
          {porFamilia(aba).map((p, i) => (
            <Plano key={p.id} p={p} destaque={aba === "pacote" && i === 0} />
          ))}
        </div>

        {aba === "pacote" && (
          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14.5px] text-grafite">
            <span className="rounded-full bg-violeta-suave px-3 py-1 font-mono text-[11.5px] uppercase tracking-[0.1em] text-azul">Oferta de {mes}</span>
            12% off no setup do pacote, para contratações até o fim do mês.
            <ContagemOferta className="font-medium text-azul" />
          </p>
        )}

        <Reveal delay={100}>
          <ul className="mt-12 grid gap-x-8 gap-y-3 border-t border-linha pt-8 text-[14px] leading-relaxed text-cinza sm:grid-cols-2 lg:grid-cols-4">
            <li>
              <span className="font-medium text-tinta">Pagamento do setup:</span> 50% na assinatura e 50% na entrega, antes de ir ao ar.
            </li>
            <li>
              <span className="font-medium text-tinta">Mensalidade:</span> a partir do 2º mês, vence dia 5. Hospedagem, uso da atendente e suporte inclusos.
            </li>
            <li>
              <span className="font-medium text-tinta">Fidelidade:</span> 3 meses no plano padrão. Condições completas nos{" "}
              <a href="/termos" className="text-azul underline underline-offset-4">
                termos
              </a>
              .
            </li>
            <li>
              <span className="font-medium text-tinta">Ajustes avulsos:</span> {reais(AJUSTE_SITE.valor)} no site e {reais(AJUSTE_AGENTE.valor)} no agente, por pedido.
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
