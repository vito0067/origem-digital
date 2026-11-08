"use client";

import { useState, type CSSProperties } from "react";
import Botao from "./Botao";
import SimboloParticulas from "./SimboloParticulas";
import { Simbolo } from "./Marca";
import { VistoDuplo, Seta } from "./Icones";
import { BLACK_FRIDAY, acheProduto, economia, reais, setupNormal } from "@/lib/precos";
import ContadorBF from "./ContadorBF";

/**
 * A CAPA — "O cliente chamou. Já foi respondido."
 *
 * Uma frase, um símbolo, uma prova. À direita, o símbolo da Origem se
 * monta de pixels; quando termina, chega uma mensagem de cliente às
 * 23:47 e, logo depois, a resposta da atendente. É o produto inteiro
 * contado em três segundos, sem nenhum parágrafo.
 *
 * Embaixo, a faixa com os quatro números que importam.
 */

const WA = "https://wa.me/5511939299209?text=Ol%C3%A1!%20Quero%20um%20diagn%C3%B3stico%20gratuito%20para%20o%20meu%20neg%C3%B3cio.";

const atraso = (ms: number) => ({ ["--atraso" as string]: `${ms}ms` }) as CSSProperties;

const numeros = [
  { valor: "Segundos", texto: "para o seu cliente ter resposta" },
  { valor: "24/7", texto: "inclusive madrugada e feriado" },
  { valor: "15 dias úteis", texto: "para a primeira versão ficar pronta" },
  { valor: "R$ 0", texto: "para o diagnóstico do seu negócio" },
];

/** O cartão da oferta, no alto da capa: o preço de verdade, o riscado, o quanto economiza e o relógio. */
function OfertaBF() {
  const site = acheProduto("site-simples");
  const agente = acheProduto("agente-essencial");
  const pacote = acheProduto("pacote-inicio");
  const itens = [
    { nome: "Site", de: setupNormal["site-simples"], por: site.setup },
    { nome: "Atendente de IA", de: setupNormal["agente-essencial"], por: agente.setup },
    { nome: "Site + atendente", de: setupNormal["pacote-inicio"], por: pacote.setup },
  ];
  return (
    <div className="surge mt-7 max-w-[34rem] rounded-3xl border border-brasa/25 bg-brasa-suave/80 p-4 shadow-cartao sm:p-5" style={atraso(500)}>
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12.5px] font-medium uppercase tracking-[0.1em] text-brasa-escuro">
        <span className="rounded-full bg-brasa px-3 py-1 text-white">Black Friday</span>
        desconto no setup até 30/11 · <ContadorBF />
      </p>
      <ul className="mt-3 grid grid-cols-3 gap-1.5 sm:gap-2">
        {itens.map((i) => (
          <li key={i.nome} className="rounded-2xl bg-white/80 px-2.5 py-2 sm:px-3.5 sm:py-2.5">
            <p className="text-[12.5px] leading-tight text-grafite sm:text-[13px]">{i.nome}</p>
            <p className="flex flex-wrap items-baseline gap-x-2">
              <s className="text-[12.5px] text-cinza decoration-brasa">{reais(i.de)}</s>
              <span className="font-display text-[1.1rem] font-semibold sm:text-[1.3rem] tracking-[-0.03em] text-tinta">{reais(i.por)}</span>
            </p>
            <p className="text-[12px] font-medium leading-tight text-brasa-escuro sm:text-[12.5px]">economize {reais(economia(i.nome === "Site" ? "site-simples" : i.nome === "Atendente de IA" ? "agente-essencial" : "pacote-inicio", i.por))}</p>
          </li>
        ))}
      </ul>
      <p className="mt-2.5 text-[13px] text-grafite">Mensalidade normal, e só começa no 2º mês.</p>
    </div>
  );
}

/** Só entram na página depois que o símbolo se monta: vidro fosco por
 *  cima de uma animação obriga o navegador a refazer o desfoque a cada
 *  quadro — invisível ou não. */
function Notificacoes({ ligado }: { ligado: boolean }) {
  // No celular as duas mensagens ficam empilhadas embaixo do símbolo, com
  // o espaço já reservado (nada pula quando elas chegam); da tela média
  // para cima, flutuam sobre o símbolo.
  return (
    <div className="relative min-h-[232px] sm:static sm:min-h-0">
      {ligado && (
    <>
      <div
        className="vidro relative mt-2 w-[86%] rounded-2xl p-3.5 shadow-flutua sm:absolute sm:left-[2%] sm:top-[58%] sm:mt-0 sm:w-[300px]"
        style={{ animation: "notifica .7s cubic-bezier(.22,1,.36,1) both" }}
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ceu-claro font-mono text-[11px] font-medium text-noite">MC</span>
          <div className="min-w-0 flex-1">
            <p className="flex items-center justify-between text-[12px] text-cinza">
              <span className="font-medium text-tinta">Nova mensagem</span>
              <span className="font-mono">23:47</span>
            </p>
            <p className="truncate text-[14px] text-grafite">Oi! Vocês atendem no sábado?</p>
          </div>
        </div>
      </div>

      <div
        className="vidro relative ml-auto mt-3 w-[92%] rounded-2xl p-4 shadow-flutua sm:absolute sm:right-[1%] sm:top-[71%] sm:mt-0 sm:w-[330px]"
        style={{ animation: "notifica .7s cubic-bezier(.22,1,.36,1) .7s both" }}
      >
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-cartao">
            <Simbolo id="od-notificacao" className="h-auto w-[18px]" />
          </span>
          <p className="text-[12.5px] font-medium text-tinta">Aurora</p>
          <span className="ml-auto rounded-full bg-violeta-suave px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-azul">respondeu em segundos</span>
        </div>
        <p className="mt-2.5 text-[14px] leading-snug text-tinta">Atendemos sim, das 9h às 14h. Quer que eu reserve um horário para você?</p>
        <p className="mt-1.5 flex items-center justify-end gap-1 font-mono text-[11px] text-cinza">
          23:47 <VistoDuplo className="h-[10px] w-[14px] text-[#53BDEB]" />
        </p>
      </div>
    </>
      )}
    </div>
  );
}

export default function Capa() {
  const [montado, setMontado] = useState(false);

  return (
    <section id="inicio" className={`ceu-fundo relative overflow-hidden pb-14 ${BLACK_FRIDAY.ativa ? "pt-[150px] sm:pt-[158px]" : "pt-[118px] sm:pt-[132px]"}`}>
      <div aria-hidden className="pontos pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-pagina items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6">
          <p className="surge vidro inline-flex items-center gap-2 rounded-full py-1.5 pl-2 pr-4 text-[13px] text-grafite shadow-cartao" style={atraso(0)}>
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-zap" />
            </span>
            Sites + atendente de IA no WhatsApp
          </p>

          <h1 className="mt-7 font-display text-[3.1rem] font-medium leading-[0.98] tracking-[-0.045em] text-tinta sm:text-[4.4rem] lg:text-[5.1rem]">
            <span className="surge block" style={atraso(120)}>
              O cliente chamou.
            </span>
            <span className="surge block font-serifa text-[1.08em] font-normal italic tracking-[-0.02em] text-azul" style={atraso(260)}>
              Já foi respondido.
            </span>
          </h1>

          <p className="surge sem-orfa mt-7 max-w-[34rem] text-[17.5px] leading-relaxed text-grafite sm:text-[18.5px]" style={atraso(420)}>
            Site profissional e uma atendente de inteligência artificial no seu WhatsApp, respondendo clientes em segundos, 24 horas por dia.
            Preço, prazo e contrato claros antes de você decidir.
          </p>

          {BLACK_FRIDAY.ativa && <OfertaBF />}

          <div className="surge mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={atraso(560)}>
            {BLACK_FRIDAY.ativa ? (
              <a
                href="#precos"
                className="group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-brasa px-6 py-3 text-center text-[15.5px] font-medium text-white shadow-[0_14px_30px_-12px_rgba(217,31,46,.75)] transition-[background-color,transform] duration-300 hover:bg-brasa-escuro"
              >
                Ver preços da Black Friday
                <Seta className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            ) : (
              <Botao href={WA}>Quero o diagnóstico gratuito</Botao>
            )}
            {BLACK_FRIDAY.ativa ? <Botao href={WA} tom="vidro">Diagnóstico gratuito</Botao> : <Botao href="#precos" tom="vidro">Ver preços</Botao>}
          </div>
          <p className="surge mt-5 font-mono text-[12.5px] uppercase tracking-[0.12em] text-cinza" style={atraso(680)}>
            Sem compromisso · 10 a 15 minutos · pelo WhatsApp
          </p>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative mx-auto w-full max-w-[620px] sm:aspect-[1.45]">
            <div aria-hidden className="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(186,230,253,.7),transparent)] blur-2xl" />
            <SimboloParticulas className="h-[120px] sm:absolute sm:inset-x-0 sm:top-0 sm:h-[62%]" aoMontar={() => setMontado(true)} />
            <Notificacoes ligado={montado} />
          </div>
          <p className="mt-5 text-center font-mono text-[12.5px] uppercase tracking-[0.14em] text-cinza sm:mt-12">Exemplo de atendimento com IA</p>
        </div>
      </div>

      {/* A faixa dos quatro números */}
      <div className="relative mx-auto mt-14 max-w-pagina px-5 sm:px-8">
        <dl className="vidro grid grid-cols-2 overflow-hidden rounded-3xl shadow-vidro lg:grid-cols-4">
          {numeros.map((n, i) => (
            <div
              key={n.valor}
              className={`surge px-5 py-6 sm:px-7 ${i % 2 === 1 ? "border-l border-linha" : ""} ${i >= 2 ? "border-t border-linha lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
              style={atraso(800 + i * 90)}
            >
              <dt className="font-display text-[1.45rem] font-medium tracking-[-0.03em] text-tinta sm:text-[1.75rem]">{n.valor}</dt>
              <dd className="mt-1 text-[13.5px] leading-snug text-cinza sm:text-[14px]">{n.texto}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
