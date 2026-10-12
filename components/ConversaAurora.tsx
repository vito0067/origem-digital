"use client";

import { useEffect, useRef, useState } from "react";
import { Simbolo } from "./Marca";
import { VistoDuplo } from "./Icones";

/**
 * A AURORA ATENDENDO, DENTRO DE UM CELULAR DESENHADO NA PÁGINA.
 *
 * A conversa se digita sozinha quando aparece na tela: o cliente manda a
 * mensagem, o "digitando…" aparece pelo tempo que a resposta levaria, e a
 * resposta entra. Roda UMA vez e para — no fim aparece "Ver de novo",
 * para quem quiser assistir outra vez. (A versão antiga recomeçava sem
 * parar; uma conversa em looping ao lado do texto disputava a leitura.)
 *
 * É o celular do CLIENTE: as mensagens dele ficam à direita, em verde,
 * e a Aurora responde à esquerda — exatamente o que o cliente do seu
 * negócio vai ver.
 *
 * ⚠️ O PREÇO ABAIXO TAMBÉM VIVE EM OUTROS LUGARES.
 * Mudou aqui, mude em lib/precos.ts, no FAQ, em AntesDepois.tsx e,
 * principalmente, na tabela de preços da Aurora de verdade, no n8n.
 *
 * Para quem pediu menos movimento, a conversa aparece inteira e parada.
 *
 * OUTRAS CONVERSAS: o mesmo celular mostra a Aurora atendendo um cliente
 * de outro ramo (as páginas de clínicas e pet shops usam assim). Basta
 * passar `falas`, `nome`, `iniciais` e `selo`.
 */

const SITE_SETUP = "R$ 987";
const SITE_MENSAL = "R$ 43/mês";

export type Fala = {
  de: "cliente" | "aurora";
  texto: string;
  hora: string;
  /** Quanto tempo o "digitando…" fica no ar antes desta fala. */
  pensando?: number;
};

const conversa: Fala[] = [
  { de: "cliente", texto: "Oi! Quanto custa um site para a minha clínica?", hora: "14:02" },
  {
    de: "aurora",
    texto:
      "Olá! Sou a Aurora, o agente de inteligência artificial da Origem Digital. Atendo por aqui a qualquer hora.",
    hora: "14:02",
    pensando: 900,
  },
  {
    de: "aurora",
    // Prazo do contrato (cláusula 3.1): 15 dias úteis para a 1ª versão.
    texto: `Nossos sites profissionais saem a partir de ${SITE_SETUP} + ${SITE_MENSAL} — com domínio, hospedagem e manutenção inclusos. A primeira versão fica pronta em até 15 dias úteis.`,
    hora: "14:02",
    pensando: 1500,
  },
  { de: "cliente", texto: "Gostei! Como faço para começar?", hora: "14:03" },
  {
    de: "aurora",
    texto:
      "Posso agendar um diagnóstico gratuito com nosso especialista. Tenho amanhã às 10h ou às 15h. Qual prefere?",
    hora: "14:03",
    pensando: 1300,
  },
  { de: "cliente", texto: "15h está ótimo", hora: "14:03" },
  {
    de: "aurora",
    texto: "Agendado ✅ Registrei seu contato e nosso especialista te chama amanhã às 15h. Até lá!",
    hora: "14:04",
    pensando: 1100,
  },
];

/** Pausa antes de o cliente escrever a próxima mensagem. */
const PAUSA_CLIENTE = 900;

function Digitando() {
  return (
    <div className="flex w-fit items-center gap-1 rounded-2xl rounded-tl-md bg-white px-4 py-3 shadow-[0_1px_1px_rgba(11,18,32,0.08)]">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-cinza"
          style={{ animation: `pontoDigita 1.1s ease-in-out ${i * 0.15}s infinite` }}
        />
      ))}
    </div>
  );
}

export default function ConversaAurora({
  falas = conversa,
  nome = "Aurora · Origem Digital",
  iniciais,
  selo = "demonstração",
  atraso = 0,
}: {
  falas?: Fala[];
  nome?: string;
  /** Com iniciais, o topo mostra um círculo com elas no lugar do símbolo. */
  iniciais?: string;
  /** Etiqueta no canto do aparelho. */
  selo?: string;
  /** Espera antes de começar (na capa, deixa o título chegar primeiro). */
  atraso?: number;
} = {}) {
  const caixa = useRef<HTMLDivElement>(null);
  const rolagem = useRef<HTMLDivElement>(null);
  const relogios = useRef<ReturnType<typeof setTimeout>[]>([]);

  const [quantas, setQuantas] = useState(0);
  const [digitando, setDigitando] = useState(false);
  const [parado, setParado] = useState(false);
  const [ligar, setLigar] = useState(false);
  /** Muda a cada "Ver de novo": faz a conversa rodar outra vez. */
  const [rodada, setRodada] = useState(0);

  // Só começa quando o celular aparece na tela — senão a pessoa perde o
  // começo da conversa. Depois de começar, não depende mais da tela.
  useEffect(() => {
    const el = caixa.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setParado(true);
      setQuantas(falas.length);
      return;
    }
    const vigia = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLigar(true);
          vigia.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    vigia.observe(el);
    return () => vigia.disconnect();
  }, [falas.length]);

  useEffect(() => {
    if (!ligar || parado) return;
    const marcar = (fn: () => void, ms: number) => relogios.current.push(setTimeout(fn, ms));

    relogios.current.forEach(clearTimeout);
    relogios.current = [];
    setQuantas(0);
    setDigitando(false);

    let t = atraso;
    falas.forEach((fala, i) => {
      if (fala.de === "aurora") {
        t += 350;
        marcar(() => setDigitando(true), t);
        t += fala.pensando ?? 1000;
        marcar(() => {
          setDigitando(false);
          setQuantas(i + 1);
        }, t);
      } else {
        t += i === 0 ? 300 : PAUSA_CLIENTE;
        marcar(() => setQuantas(i + 1), t);
      }
    });

    const lista = relogios.current;
    return () => lista.forEach(clearTimeout);
  }, [ligar, parado, rodada, falas, atraso]);

  // A conversa fica colada embaixo, como num aplicativo de verdade.
  useEffect(() => {
    const el = rolagem.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: quantas > 1 ? "smooth" : "auto" });
  }, [quantas, digitando]);

  const terminou = quantas >= falas.length && !digitando;

  return (
    <div ref={caixa} className="relative mx-auto w-full max-w-[340px]">
      <div className="rounded-[2.9rem] bg-tinta p-[9px] shadow-celular">
        <div className="relative overflow-hidden rounded-[2.35rem] bg-[#EEF0F4]">
          {/* Barra de status do aparelho */}
          <div className="relative flex items-center justify-between bg-white px-7 pb-1.5 pt-3 text-[12px] font-semibold text-tinta">
            <span>{falas[0]?.hora}</span>
            <span aria-hidden className="absolute left-1/2 top-2.5 h-[20px] w-[78px] -translate-x-1/2 rounded-full bg-tinta" />
            <span aria-hidden className="flex items-center gap-1">
              <span className="flex items-end gap-[2px]">
                {[4, 6, 8, 10].map((h) => (
                  <span key={h} className="w-[3px] rounded-[1px] bg-tinta" style={{ height: h }} />
                ))}
              </span>
              <span className="ml-1 h-[10px] w-[20px] rounded-[3px] border border-tinta/60 p-[1.5px]">
                <span className="block h-full w-3/4 rounded-[1px] bg-tinta" />
              </span>
            </span>
          </div>

          {/* Cabeçalho, como o do WhatsApp */}
          <div className="flex items-center gap-3 border-b border-tinta/[0.06] bg-white px-4 pb-3 pt-2">
            <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-tinta/70" fill="none">
              <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {iniciais ? (
              <span
                aria-hidden
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-azul-suave font-display text-xs font-bold text-azul"
              >
                {iniciais}
              </span>
            ) : (
              <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-linha bg-white">
                <Simbolo id="od-celular" className="h-auto w-[26px]" />
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold leading-tight text-tinta">{nome}</p>
              <p className={`text-[12px] leading-tight ${digitando ? "text-[#11804A]" : "text-cinza"}`}>
                {digitando ? "digitando…" : "online"}
              </p>
            </div>
          </div>

          {/* A conversa. A máscara do topo faz a mensagem que subiu sumir
              suave, em vez de ficar cortada no meio. */}
          <div
            ref={rolagem}
            className="pontilhado flex h-[372px] flex-col gap-2 overflow-hidden px-3 py-4"
            style={{
              maskImage: "linear-gradient(to bottom, transparent, black 10%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%)",
            }}
            aria-live="polite"
          >
            <div className="mt-auto" />
            {falas.slice(0, quantas).map((fala, i) => {
              const cliente = fala.de === "cliente";
              return (
                <div
                  key={`${rodada}-${i}`}
                  className={`flex ${cliente ? "justify-end" : "justify-start"}`}
                  style={{ animation: "balaoEntra .32s cubic-bezier(.22,1,.36,1)" }}
                >
                  <div
                    className={`max-w-[84%] rounded-2xl px-3 py-2 shadow-[0_1px_1px_rgba(11,18,32,0.08)] ${
                      cliente ? "rounded-tr-md bg-[#D9FDD3]" : "rounded-tl-md bg-white"
                    }`}
                  >
                    <p className="text-[13.5px] leading-snug text-tinta">{fala.texto}</p>
                    <p className="mt-0.5 flex items-center justify-end gap-1 text-[10.5px] text-[#5F687A]">
                      {fala.hora}
                      {cliente && <VistoDuplo className="h-[10px] w-[14px] text-[#53BDEB]" />}
                    </p>
                  </div>
                </div>
              );
            })}
            {digitando && <Digitando />}
          </div>

          {/* Barra de escrever (decorativa) */}
          <div aria-hidden className="flex items-center gap-2 bg-[#EEF0F4] px-3 pb-4 pt-1">
            <span className="flex-1 rounded-full bg-white px-4 py-2.5 text-[13px] text-cinza">Mensagem</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1DAA61]">
              <svg viewBox="0 0 16 16" className="h-4 w-4 text-white" fill="currentColor">
                <path d="M8 10.5a2.5 2.5 0 0 0 2.5-2.5V4a2.5 2.5 0 0 0-5 0v4A2.5 2.5 0 0 0 8 10.5Zm4.5-2.5a.75.75 0 0 0-1.5 0 3 3 0 0 1-6 0 .75.75 0 0 0-1.5 0 4.5 4.5 0 0 0 3.75 4.43V14a.75.75 0 0 0 1.5 0v-1.57A4.5 4.5 0 0 0 12.5 8Z" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <span className="absolute -top-3 right-6 rounded-full border border-linha bg-white px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-cinza shadow-cartao">
        {selo}
      </span>

      {/* Só aparece no fim: assistir de novo é escolha da pessoa. */}
      <div className="mt-4 flex h-8 justify-center">
        {terminou && !parado && (
          <button
            type="button"
            onClick={() => setRodada((r) => r + 1)}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium text-cinza transition-colors hover:text-azul"
          >
            <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
              <path d="M13 8a5 5 0 1 1-1.46-3.54M13 3v2.5h-2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Ver a conversa de novo
          </button>
        )}
      </div>
    </div>
  );
}
