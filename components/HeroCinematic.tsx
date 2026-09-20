"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import NeonButton from "./NeonButton";
import TextReveal from "./TextReveal";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import Particulas from "./Particulas";

// O three.js só existe no navegador e pesa. Carregado à parte, ele não
// atrasa o texto da capa — que é o que precisa aparecer primeiro.
const MarcaTridimensional = dynamic(() => import("./MarcaTridimensional"), {
  ssr: false,
});

/**
 * CAPA
 *
 * Saiu o bloco centralizado sobre o vídeo. Entrou uma capa de duas
 * colunas: a fala fica à esquerda, onde a leitura começa, e a marca em
 * 3D ocupa a direita, girando sozinha e reagindo ao mouse.
 *
 * Por que 3D e não vídeo em tela cheia: o vídeo é o mesmo para todo
 * mundo e passa igual. A peça em 3D responde ao movimento da pessoa —
 * e é a própria marca da Origem Digital. Quem chega entende em dois
 * segundos de quem é o site.
 *
 * O vídeo não foi jogado fora: continua ao fundo, bem apagado, dando
 * textura e profundidade atrás de tudo.
 *
 * Camadas, de trás para a frente:
 *  1. VÍDEO   — /media/hero-video.mp4, mudo, em looping, bem escurecido.
 *               Se faltar, entra /media/frame-inicial.jpg parada.
 *  2. MALHA   — grade neon e brilhos de cor, para o preto não ficar chapado.
 *  3. MARCA   — /media/marca.glb em 3D. Se o aparelho não der conta,
 *               cai para o logo em PNG com brilho, sem buraco na tela.
 *  4. TEXTO   — título, apoio e os dois botões.
 */
export default function HeroCinematic() {
  const video = useRef<HTMLVideoElement>(null);

  const [semVideo, setSemVideo] = useState(false);
  const [sem3D, setSem3D] = useState(false);
  const [poucoMovimento, setPoucoMovimento] = useState(false);
  const [rolagem, setRolagem] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPoucoMovimento(mq.matches);
    const aoMudar = (e: MediaQueryListEvent) => setPoucoMovimento(e.matches);
    mq.addEventListener("change", aoMudar);
    return () => mq.removeEventListener("change", aoMudar);
  }, []);

  // progresso só dentro da primeira tela: alimenta o giro da marca e o
  // desaparecer suave do conteúdo conforme a pessoa desce
  useEffect(() => {
    const aoRolar = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      setRolagem((ant) => (Math.abs(ant - p) > 0.01 ? p : ant));
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // alguns navegadores recusam o autoplay na primeira carga, então
  // insistimos no primeiro toque ou rolagem da pessoa
  useEffect(() => {
    const v = video.current;
    if (!v || poucoMovimento) return;
    const tentar = () => {
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    };
    tentar();
    ["touchstart", "click", "scroll"].forEach((e) =>
      addEventListener(e, tentar, { once: true, passive: true })
    );
  }, [poucoMovimento]);

  const usarReserva = semVideo || poucoMovimento;

  return (
    <section
      aria-label="Apresentação Origem Digital"
      className="relative flex min-h-[680px] w-full items-center overflow-hidden pb-16 pt-28 lg:h-svh lg:pb-0 lg:pt-0"
    >
      {/* ===== 1. Vídeo de fundo ===== */}
      <div aria-hidden className="absolute inset-0">
        {!usarReserva && (
          // Duas versões do mesmo vídeo, e o navegador escolhe. O WebM
          // vem primeiro porque pesa menos (56 KB contra 72 KB); quem
          // não souber tocar cai no MP4 sozinho, sem código nenhum.
          // Se nenhum dos dois tocar, o onError acende a imagem parada.
          <video
            ref={video}
            className="h-full w-full object-cover opacity-40"
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setSemVideo(true)}
            style={{
              transform: `scale(${1.08 + rolagem * 0.05})`,
              willChange: "transform",
            }}
          >
            <source src="/media/hero-video.webm" type="video/webm" />
            <source src="/media/hero-video.mp4" type="video/mp4" />
          </video>
        )}

        {usarReserva && (
          <Image
            src="/media/frame-inicial.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
        )}
      </div>

      {/* ===== 2. Máscaras e luz ===== */}
      {/* O degradê vem da esquerda: escurece exatamente onde o texto fica,
          e deixa o lado direito respirar para a marca 3D aparecer. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-abyss via-abyss/85 to-abyss/30"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-abyss via-transparent to-abyss/80"
      />
      <div aria-hidden className="neon-grid absolute inset-0 opacity-70" />

      {/* Rede de pontos se formando e se desfazendo, atraída pelo mouse.
          Fica entre a grade e o texto: aparece atrás da fala, nunca por
          cima dela. Só roda em tela grande e em aparelho que aguenta. */}
      <Particulas />
      {/* `brilho-descida`: a cor destes brilhos vai do ciano ao violeta
          conforme a pessoa desce a página. A troca é lenta demais para
          alguém apontar o momento em que aconteceu — só se percebe que
          o fim da página é mais quente do que o começo. */}
      <div
        aria-hidden
        className="brilho-descida absolute -right-20 top-1/4 h-[460px] w-[460px] rounded-full blur-[150px]"
      />
      <div
        aria-hidden
        className="brilho-descida absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full blur-[150px]"
      />

      {!poucoMovimento && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 h-40 animate-scanline bg-gradient-to-b from-transparent via-cyan-neon/[0.05] to-transparent"
        />
      )}

      {/* ===== Conteúdo ===== */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* --- Fala, à esquerda --- */}
          <div
            className="lg:col-span-7"
            style={{
              // some junto com a rolagem, para a capa "entregar" a próxima
              // seção em vez de simplesmente sair de cena
              opacity: poucoMovimento ? 1 : 1 - rolagem * 1.15,
              transform: poucoMovimento
                ? undefined
                : `translate3d(0, ${rolagem * -40}px, 0)`,
            }}
          >
            <div className="flex items-center gap-4">
              <span
                aria-hidden
                className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-cyan-neon shadow-neon-cyan"
              />
              <TextReveal
                como="p"
                passo={26}
                origem="esquerda"
                className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-neon/90 sm:text-xs"
              >
                Agência digital · São Paulo · atende todo o Brasil
              </TextReveal>
            </div>

            {/* O título entra palavra por palavra, da esquerda para a
                direita: é o momento em que a pessoa decide se o site é
                bem feito ou não. */}
            <TextReveal
              como="h1"
              passo={72}
              origem="esquerda"
              className="equilibrado mt-7 font-display text-[2.5rem] font-bold leading-[1.05] text-white sm:text-5xl lg:text-[3.6rem]"
            >
              Você não perde vendas por falta de clientes.
            </TextReveal>
            {/* Esta linha NÃO pode entrar palavra por palavra.
                O `text-gradient-neon` pinta o texto com um degradê recortado
                no formato das letras; o TextReveal fecha cada palavra dentro
                de uma máscara própria e o degradê não atravessa a máscara —
                resultado: a linha inteira fica invisível. Aqui ela desliza
                da esquerda como um bloco só, que dá no mesmo efeito. */}
            <Reveal de="esquerda" delay={520} distancia={36}>
              <p className="equilibrado mt-2 font-display text-[2.5rem] font-bold leading-[1.05] text-gradient-neon sm:text-5xl lg:text-[3.6rem]">
                Perde porque demora para responder.
              </p>
            </Reveal>

            <TextReveal
              como="p"
              passo={18}
              origem="esquerda"
              className="mt-8 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg"
            >
              A gente resolve: site profissional + agente de IA respondendo em segundos, 24 horas por dia — seu negócio vendendo no digital em até 2 semanas, enquanto você cuida dele.
            </TextReveal>

            <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <Magnetic>
                <NeonButton
                  href="https://wa.me/5511939299209?text=Ol%C3%A1!%20Quero%20um%20diagn%C3%B3stico%20gratuito%20para%20digitalizar%20meu%20neg%C3%B3cio."
                  variant="primary"
                  external
                >
                  Solicitar diagnóstico gratuito
                </NeonButton>
              </Magnetic>
              <Magnetic forca={0.2}>
                <NeonButton href="#servicos" variant="ghost">
                  Ver serviços e preços
                </NeonButton>
              </Magnetic>
            </div>

            {/* Três garantias curtas logo abaixo do botão: tiram o medo
                de clicar antes que ele apareça. */}
            <ul className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
              {[
                "Sem compromisso",
                "No ar em 1 a 2 semanas",
                "Suporte contínuo incluso",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-xs text-slate-400"
                >
                  <span aria-hidden className="font-bold text-cyan-neon">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* --- Marca em 3D, à direita --- */}
          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="relative aspect-square w-full">
              {!sem3D && !poucoMovimento ? (
                <MarcaTridimensional
                  progress={rolagem}
                  onFail={() => setSem3D(true)}
                />
              ) : (
                // Reserva: o logo parado, com o mesmo brilho. Ninguém
                // percebe que deveria haver 3D ali.
                <div className="flex h-full w-full items-center justify-center">
                  <div
                    aria-hidden
                    className="absolute inset-[18%] rounded-full bg-cyan-neon/15 blur-[90px]"
                  />
                  {/* <img> e não <Image>: o componente do Next recusa
                      SVG (erro 400) sem ligar o "dangerouslyAllowSVG". */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/media/logo-od.svg"
                    alt=""
                    aria-hidden
                    className="relative w-3/5 animate-float-y"
                  />
                </div>
              )}
            </div>

            {/* Legenda discreta que convida a mexer. Sem ela, muita gente
                não descobre que a peça reage ao mouse. */}
            {!sem3D && !poucoMovimento && (
              <p className="pointer-events-none absolute inset-x-0 bottom-0 text-center text-[10px] uppercase tracking-[0.3em] text-slate-600">
                mexa o mouse
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Indicador de rolagem */}
      {!poucoMovimento && (
        <div
          aria-hidden
          className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
          style={{ opacity: 1 - rolagem * 4 }}
        >
          <div className="flex h-11 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
            <div className="h-2.5 w-1 animate-float-y rounded-full bg-cyan-neon shadow-neon-cyan" />
          </div>
        </div>
      )}
    </section>
  );
}
