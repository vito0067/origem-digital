"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import NeonButton from "./NeonButton";
import TituloSecao from "./TituloSecao";
import Holofote from "./Holofote";
import Magnetic from "./Magnetic";
import CursorArea from "./CursorArea";

/**
 * SISTEMA ORIGEM + DIFERENCIAIS — as duas viraram uma seção.
 *
 * Eram duas paradas parecidas: seis etapas do método em uma grade e,
 * logo abaixo, seis diferenciais em outra. Doze cartões seguidos, todos
 * do mesmo tamanho, descendo. O olho desiste no sexto.
 *
 * Agora o método anda de lado: enquanto a pessoa rola para baixo, os
 * seis cartões correm da direita para a esquerda, presos na tela. É o
 * movimento que ela não esperava e o que faz o site parecer caro. Os
 * diferenciais vêm em seguida, numa grade limpa de seis, cada um com um
 * traço em degradê marcando o topo.
 *
 * No celular não existe prender a tela: os cartões viram um carrossel
 * que se arrasta com o dedo, que é o gesto que a pessoa já conhece.
 *
 * Nenhum texto das duas seções antigas foi cortado.
 */

const etapas = [
  { n: "01", title: "Diagnóstico", text: "Entendemos seu negócio e mapeamos onde você está perdendo clientes hoje." },
  { n: "02", title: "Estratégia", text: "Desenhamos a presença digital certa para o seu caso — sem pacote engessado." },
  { n: "03", title: "Site", text: "Sua vitrine profissional no ar em até 2 semanas, otimizada para o Google." },
  { n: "04", title: "IA", text: "Agente treinado com seus serviços e preços, atendendo o WhatsApp 24/7." },
  { n: "05", title: "Automação", text: "Agendamentos, registro de leads e follow-ups acontecendo sem esforço." },
  { n: "06", title: "Suporte", text: "Acompanhamento contínuo, manutenção e melhorias mês a mês." },
];

const diferenciais = [
  {
    title: "Atendimento humano e consultivo",
    description:
      "Você fala com gente de verdade, que entende seu negócio antes de propor qualquer coisa. Sem letra miúda.",
  },
  {
    title: "IA personalizada para o seu negócio",
    description:
      "Seu agente aprende seus serviços, seus preços e seu jeito de atender — não é um robô genérico de respostas prontas.",
  },
  {
    title: "Entrega rápida de verdade",
    description:
      "Projeto no ar em 1 a 2 semanas. Enquanto outros ainda estão orçando, seus clientes já estão sendo atendidos.",
  },
  {
    title: "Suporte contínuo incluso",
    description:
      "Manutenção e acompanhamento fazem parte dos planos mensais. Você nunca fica na mão depois da entrega.",
  },
  {
    title: "Tecnologia de ponta",
    description:
      "A mesma base de IA e automação usada por grandes empresas — OpenAI, n8n e infraestrutura em nuvem — no tamanho do seu bolso.",
  },
  {
    title: "Soluções sob medida",
    description:
      "Cada tipo de negócio recebe exatamente o que precisa. Nada de pacotes engessados que você paga e não usa.",
  },
];

/**
 * Quanto de rolagem a trilha custa, em relação ao tanto que ela anda.
 * Em 1, um pixel de rolagem move um pixel de cartão — a seção fica presa
 * por muito tempo e a página inteira parece mais longa. Em 0,5 os
 * cartões andam o dobro da rolagem: o efeito continua inteiro e a seção
 * prende por metade da tela que prendia antes.
 *
 * Não desça muito abaixo disso. Perto de 0,3 os cartões passam rápido
 * demais para ler, e a etapa vira borrão em vez de informação.
 */
const RITMO = 0.5;

export default function SistemaOrigem() {
  const palco = useRef<HTMLDivElement>(null);
  const trilho = useRef<HTMLDivElement>(null);
  const lista = useRef<HTMLOListElement>(null);

  /** Quanto os cartões precisam andar para o último aparecer inteiro. */
  const [excedente, setExcedente] = useState(0);
  /** Se a tela é grande o bastante para prender a seção. */
  const [prender, setPrender] = useState(false);
  const [avanco, setAvanco] = useState(0);

  // Mede o quanto de trilha sobra para fora da tela. Refaz a conta quando
  // a janela muda de tamanho — senão o último cartão fica cortado.
  //
  // A medida sai da largura natural da lista (`w-max`, então scrollWidth é
  // o tamanho real dela) menos o espaço disponível. Medir pelo scroll do
  // contêiner não serve: quando a seção está presa ele deixa de rolar e a
  // conta voltaria zero.
  useEffect(() => {
    const decidir = () => {
      const grande =
        window.matchMedia("(min-width: 1024px)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setPrender(grande);

      const caixa = trilho.current;
      const ol = lista.current;
      if (!grande || !caixa || !ol) {
        setExcedente(0);
        return;
      }
      // px-6 dos dois lados = 48px que não contam como espaço útil
      const disponivel = caixa.clientWidth - 48;
      setExcedente(Math.max(0, ol.scrollWidth - disponivel));
    };
    decidir();

    const obs = new ResizeObserver(decidir);
    if (trilho.current) obs.observe(trilho.current);
    window.addEventListener("resize", decidir);
    return () => {
      obs.disconnect();
      window.removeEventListener("resize", decidir);
    };
  }, []);

  // Converte a rolagem vertical dentro do palco em deslocamento lateral.
  useEffect(() => {
    if (!prender || excedente <= 0) {
      setAvanco(0);
      return;
    }
    const aoRolar = () => {
      const el = palco.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const curso = el.offsetHeight - window.innerHeight;
      if (curso <= 0) return;
      const p = Math.min(1, Math.max(0, -r.top / curso));
      setAvanco(p * excedente);
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, [prender, excedente]);

  const cartao = (e: (typeof etapas)[number], i: number) => (
    <Holofote
      key={e.n}
      as="li"
      className="glass-card relative flex w-[268px] shrink-0 snap-center flex-col justify-between overflow-hidden p-7 transition-colors duration-300 hover:border-cyan-neon/40 sm:w-[300px] lg:h-[290px] lg:w-[312px]"
    >
      <span aria-hidden className="numero-fantasma absolute -right-2 -top-4 text-[7rem]">
        {e.n}
      </span>
      <div className="relative">
        <span className="font-display text-sm font-bold text-gradient-neon">
          {e.n}
        </span>
        <h3 className="mt-3 font-display text-xl font-bold text-white">
          {e.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">{e.text}</p>
      </div>
      <span
        aria-hidden
        className="relative mt-6 h-px w-full bg-gradient-to-r from-cyan-neon/60 to-transparent"
        style={{ opacity: 0.3 + (i / etapas.length) * 0.7 }}
      />
    </Holofote>
  );

  return (
    <section
      id="como-funciona"
      className="relative border-t border-white/[0.06] bg-surface"
    >
      {/* ====== Palco alto: enquanto ele passa, a trilha anda de lado ====== */}
      <div
        ref={palco}
        style={
          prender && excedente > 0
            ? { height: `calc(100vh + ${Math.round(excedente * RITMO)}px)` }
            : undefined
        }
      >
        <div
          className={`${
            prender && excedente > 0
              ? "sticky top-0 flex h-screen flex-col justify-center"
              : ""
          } overflow-hidden py-20 sm:py-24`}
        >
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="grid items-end gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <TituloSecao
                  etiqueta="Nosso método proprietário"
                  titulo="Sistema Origem: seis etapas, uma única equipe."
                  apoio="Um resultado: seu negócio vendendo no digital sem depender de você responder mensagem."
                />
              </div>
              <Reveal de="direita" delay={200} className="lg:col-span-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500 lg:text-right">
                  {prender && excedente > 0
                    ? "role para avançar →"
                    : "arraste para o lado →"}
                </p>
              </Reveal>
            </div>
          </div>

          {/* A trilha começa alinhada com o conteúdo e sangra para fora da
              direita: o cartão cortado na borda avisa que tem mais coisa
              adiante, sem precisar de seta.

              O cursor vira um disco escrito "role" enquanto o mouse passa
              por cima — é o aviso no lugar onde o olho já está. */}
          <CursorArea
            className="mt-12 overflow-hidden"
            rotulo={prender && excedente > 0 ? "role" : "arraste"}
          >
            <div
              ref={trilho}
              className={`mx-auto max-w-6xl px-6 ${
                prender && excedente > 0
                  ? "overflow-visible"
                  : "snap-x snap-mandatory overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              }`}
            >
              <ol
                ref={lista}
                className={`flex w-max gap-5 ${
                  prender && excedente > 0 ? "trilha" : ""
                }`}
                style={
                  prender && excedente > 0
                    ? ({ "--avanco": avanco } as React.CSSProperties)
                    : undefined
                }
              >
                {etapas.map(cartao)}
              </ol>
            </div>
          </CursorArea>

          <div className="mx-auto mt-12 w-full max-w-6xl px-6">
            <Reveal>
              <Magnetic>
                <NeonButton
                  href="https://wa.me/5511939299209?text=Ol%C3%A1!%20Quero%20come%C3%A7ar%20pelo%20Sistema%20Origem%20com%20o%20diagn%C3%B3stico%20gratuito."
                  external
                >
                  Começar pelo diagnóstico gratuito
                </NeonButton>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ====== Diferenciais ====== */}
      <div id="diferenciais" className="mx-auto max-w-6xl px-6 pb-24 pt-8 sm:pb-28">
        <TituloSecao
          etiqueta="Diferenciais"
          titulo="Feita para o pequeno negócio que quer resultado, não promessa."
          tom="violet"
        />

        {/* Grade de seis iguais, com um traço em degradê marcando o topo
            de cada cartão. Os números gigantes de fundo saíram: ali eles
            sugeriam uma ordem — 1º, 2º, 3º — que não existe. Nenhum
            diferencial vale mais do que o outro. */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {diferenciais.map((item, i) => (
            <Reveal
              key={item.title}
              de={i % 3 === 0 ? "esquerda" : i % 3 === 2 ? "direita" : "baixo"}
              delay={(i % 3) * 90}
            >
              <Holofote className="glass-card group flex h-full flex-col p-7 transition-colors duration-300 hover:border-cyan-neon/40">
                <span
                  aria-hidden
                  className="h-0.5 w-10 rounded-full bg-gradient-to-r from-cyan-neon to-violet-neon transition-all duration-300 group-hover:w-16"
                />
                <h3 className="mt-5 font-display text-base font-bold text-white transition-colors group-hover:text-cyan-neon">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {item.description}
                </p>
              </Holofote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
