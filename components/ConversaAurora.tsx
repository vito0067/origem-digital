"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * A AURORA ATENDENDO, AO VIVO, DENTRO DA PÁGINA.
 *
 * A conversa se digita sozinha quando entra na tela: o balão do cliente
 * aparece, o "digitando…" pisca pelo tempo que a resposta levaria, e aí
 * a resposta entra. No fim, recomeça.
 *
 * POR QUE ISSO E NÃO O VÍDEO GRAVADO:
 *
 * 1. O vídeo a pessoa reconhece como vídeo. Texto se formando na frente
 *    dela passa a sensação de estar acontecendo agora.
 *
 * 2. O PREÇO. Os prints e o vídeo antigos tinham "R$ 897 + R$ 39/mês"
 *    gravado dentro da imagem — preço de duas tabelas atrás, no ar, em
 *    um site que vende justamente organização. Aqui o preço é texto:
 *    corrigir é trocar uma linha, e não gravar vídeo de novo.
 *
 * ⚠️ O PREÇO ABAIXO TAMBÉM VIVE EM OUTROS LUGARES.
 * Mudou aqui, mude em components/Planos.tsx, no FAQ, e principalmente
 * na tabela de preços da Aurora de verdade, no n8n — senão o agente
 * informa um valor para o cliente e o site mostra outro.
 *
 * Para quem pediu menos movimento no sistema, a conversa aparece
 * inteira e parada, sem digitação.
 */

const SITE_SETUP = "R$ 987";
const SITE_MENSAL = "R$ 43/mês";

type Fala = {
  de: "cliente" | "aurora";
  texto: string;
  hora: string;
  /** Quanto tempo o "digitando…" fica no ar antes desta fala. */
  pensando?: number;
};

const conversa: Fala[] = [
  {
    de: "cliente",
    texto: "Oi! Quanto custa um site para a minha clínica?",
    hora: "14:02",
  },
  {
    de: "aurora",
    texto:
      "Olá! Sou a Aurora, o agente de inteligência artificial da Origem Digital. Atendo por aqui a qualquer hora.",
    hora: "14:02",
    pensando: 900,
  },
  {
    de: "aurora",
    texto: `Nossos sites profissionais saem a partir de ${SITE_SETUP} + ${SITE_MENSAL} — com domínio, hospedagem e manutenção inclusos. Fica pronto em 1 a 2 semanas.`,
    hora: "14:02",
    pensando: 1500,
  },
  {
    de: "cliente",
    texto: "Gostei! Como faço para começar?",
    hora: "14:03",
  },
  {
    de: "aurora",
    texto:
      "Posso agendar um diagnóstico gratuito com nosso especialista. Tenho amanhã às 10h ou às 15h. Qual prefere?",
    hora: "14:03",
    pensando: 1300,
  },
  {
    de: "cliente",
    texto: "15h está ótimo",
    hora: "14:03",
  },
  {
    de: "aurora",
    texto:
      "Agendado ✅ Registrei seu contato e nosso especialista te chama amanhã às 15h. Até lá!",
    hora: "14:04",
    pensando: 1100,
  },
];

/**
 * Quantos graus o celular gira de ponta a ponta ao seguir o cursor.
 * Fica maior do que o dos cartões (8): aqui o objeto É o assunto, e
 * uma inclinação tímida não leria como aparelho de verdade.
 */
const GIRO_CELULAR = 16;

/** Pausa antes de o cliente escrever a próxima mensagem. */
const PAUSA_CLIENTE = 800;
/** Quanto tempo a conversa fica completa na tela antes de recomeçar. */
const PAUSA_FINAL = 4200;

function Digitando() {
  return (
    <div className="flex w-fit items-center gap-1.5 rounded-2xl rounded-tl-sm bg-[#1f2c34] px-4 py-3.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
          style={{ animationDelay: `${i * 150}ms`, animationDuration: "1s" }}
        />
      ))}
    </div>
  );
}

export default function ConversaAurora() {
  const caixa = useRef<HTMLDivElement>(null);
  const rolagem = useRef<HTMLDivElement>(null);
  /** A moldura do celular, que gira seguindo o cursor. */
  const aparelho = useRef<HTMLDivElement>(null);
  const relogios = useRef<ReturnType<typeof setTimeout>[]>([]);

  const [quantas, setQuantas] = useState(0);
  const [digitando, setDigitando] = useState(false);
  const [parado, setParado] = useState(false);
  /**
   * Conta quantas vezes a conversa já rodou do começo ao fim. Só existe
   * para reiniciar: quando ele muda, o efeito abaixo roda de novo e a
   * conversa recomeça.
   *
   * Antes eu reiniciava desligando e religando o `ligar` com dois
   * relógios seguidos. Não funcionava: desligar dispara a limpeza do
   * efeito, que apaga TODOS os relógios pendentes — inclusive o que ia
   * religar 60ms depois. A conversa rodava uma vez e morria.
   */
  const [ciclo, setCiclo] = useState(0);

  // Só começa quando a seção entra na tela: rodar escondido gastaria
  // bateria e a pessoa perderia justamente o começo da conversa.
  const [ligar, setLigar] = useState(false);
  useEffect(() => {
    const el = caixa.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setParado(true);
      setQuantas(conversa.length);
      return;
    }

    const vigia = new IntersectionObserver(
      ([e]) => setLigar(e.isIntersecting),
      { threshold: 0.25 }
    );
    vigia.observe(el);
    return () => vigia.disconnect();
  }, []);

  useEffect(() => {
    if (!ligar || parado) return;

    const limpar = () => {
      relogios.current.forEach(clearTimeout);
      relogios.current = [];
    };
    const marcar = (fn: () => void, ms: number) => {
      relogios.current.push(setTimeout(fn, ms));
    };

    let acumulado = 0;
    limpar();
    setQuantas(0);
    setDigitando(false);

    conversa.forEach((fala, i) => {
      if (fala.de === "aurora") {
        acumulado += 350;
        marcar(() => setDigitando(true), acumulado);
        acumulado += fala.pensando ?? 1000;
        marcar(() => {
          setDigitando(false);
          setQuantas(i + 1);
        }, acumulado);
      } else {
        acumulado += PAUSA_CLIENTE;
        marcar(() => setQuantas(i + 1), acumulado);
      }
    });

    // Recomeça: mudar o ciclo faz este efeito rodar de novo, e a
    // primeira coisa que ele faz é zerar a conversa.
    marcar(() => setCiclo((c) => c + 1), acumulado + PAUSA_FINAL);

    return limpar;
  }, [ligar, parado, ciclo]);

  // mantém a conversa colada embaixo, como num aplicativo de verdade
  useEffect(() => {
    const el = rolagem.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [quantas, digitando]);

  /**
   * O celular acompanha o cursor.
   *
   * Escreve três números direto no elemento: os dois ângulos e a
   * intensidade do brilho. Nada de estado do React aqui — o mouse se
   * move dezenas de vezes por segundo, e redesenhar o componente a
   * cada movimento derrubaria a conversa que está rodando ao lado.
   */
  const inclinarCelular = (e: React.MouseEvent) => {
    const el = aparelho.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;

    el.style.setProperty("--girox", `${(-dy * GIRO_CELULAR).toFixed(2)}deg`);
    el.style.setProperty("--giroy", `${(dx * GIRO_CELULAR).toFixed(2)}deg`);
    // o brilho acende conforme a face vira para a esquerda, de onde
    // vem a luz principal da cena
    el.style.setProperty("--luz", (0.5 - dx).toFixed(2));
  };

  const endireitarCelular = () => {
    const el = aparelho.current;
    if (!el) return;
    el.style.setProperty("--girox", "0deg");
    el.style.setProperty("--giroy", "0deg");
    el.style.setProperty("--luz", "0.5");
  };

  return (
    <div
      ref={caixa}
      onMouseMove={inclinarCelular}
      onMouseLeave={endireitarCelular}
      className="palco-celular relative mx-auto w-full max-w-[330px]"
    >
      <div
        aria-hidden
        className="absolute -inset-8 rounded-full bg-cyan-neon/10 blur-[80px]"
      />

      {/* A moldura inteira gira seguindo o cursor; a tela por dentro
          fica empurrada para a frente. É esse afastamento entre as
          camadas que dá espessura ao aparelho — não uma sombra
          desenhada. Em CSS, sem modelo 3D e sem download nenhum. */}
      <div
        ref={aparelho}
        className="celular-3d glass-card relative overflow-hidden rounded-[2.4rem] border-white/15 p-2.5 shadow-neon-cyan"
      >
        <span
          aria-hidden
          className="celular-luz pointer-events-none absolute inset-0 z-10 rounded-[2.4rem]"
        />
        <div className="celular-tela overflow-hidden rounded-[2rem] bg-[#0b141a]">
          {/* Cabeçalho, como o do WhatsApp */}
          <div className="flex items-center gap-3 border-b border-white/[0.06] bg-[#1f2c34] px-4 py-3">
            {/* <img> e não <Image>: o componente do Next recusa SVG
                (erro 400) a menos que se ligue o "dangerouslyAllowSVG".
                E não faz falta — vetor não tem o que otimizar. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/logo-od.svg"
              alt=""
              aria-hidden
              className="h-9 w-9 object-contain"
            />
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-semibold text-white">
                Aurora · Origem Digital
              </p>
              <p className="text-[11px] text-cyan-neon">
                {digitando ? "digitando…" : "online"}
              </p>
            </div>
          </div>

          {/* Conversa.
              A máscara no topo faz a mensagem que já subiu desaparecer
              suave, em vez de ficar cortada na metade com o horário
              solto no ar. É o mesmo desbotado que um aplicativo de
              conversa de verdade tem quando você rola. */}
          <div
            ref={rolagem}
            className="flex h-[360px] flex-col gap-2 overflow-hidden px-3.5 py-4"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent, black 14%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 14%, black 100%)",
            }}
            aria-live="polite"
          >
            {/* empurra tudo para baixo enquanto a conversa é curta */}
            <div className="mt-auto" />

            {conversa.slice(0, quantas).map((fala, i) => (
              <div
                key={`${fala.hora}-${i}`}
                className={`flex ${
                  fala.de === "cliente" ? "justify-end" : "justify-start"
                }`}
                style={{ animation: "balaoEntra .32s cubic-bezier(.22,1,.36,1)" }}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                    fala.de === "cliente"
                      ? "rounded-br-sm bg-[#005c4b] text-white"
                      : "rounded-tl-sm bg-[#1f2c34] text-slate-100"
                  }`}
                >
                  <p className="text-[13px] leading-relaxed">{fala.texto}</p>
                  <p className="mt-1 text-right text-[10px] text-white/45">
                    {fala.hora}
                    {fala.de === "cliente" && (
                      <span className="ml-1 text-cyan-neon/80">✓✓</span>
                    )}
                  </p>
                </div>
              </div>
            ))}

            {digitando && <Digitando />}
          </div>
        </div>
      </div>

      <span className="absolute -right-3 top-6 rounded-full border border-cyan-neon/50 bg-abyss px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-cyan-neon shadow-neon-cyan">
        ao vivo
      </span>
    </div>
  );
}
