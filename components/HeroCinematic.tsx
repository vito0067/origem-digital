"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import NeonButton from "./NeonButton";

/**
 * Hero cinematográfica com "video scroll scrubbing".
 *
 * Mecânica: a seção tem 300vh de altura; um contêiner sticky de 100vh
 * segura o vídeo em tela cheia. Enquanto o usuário rola esses 300vh,
 * a sensação é de scroll "travado" — a página não muda, apenas o
 * tempo do vídeo avança/retrocede proporcionalmente ao progresso.
 *
 * Modos de mídia:
 *  1. VÍDEO  — se /media/hero-video.mp4 existir (gerado no Higgsfield),
 *     o currentTime é interpolado suavemente até o alvo do scroll.
 *  2. FALLBACK — sem o vídeo, um crossfade cinematográfico entre
 *     foto-inicial.png e foto-final.png é dirigido pelo mesmo progresso.
 */

const SCROLL_LENGTH_VH = 300; // altura total da pista de scroll da hero

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

export default function HeroCinematic() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // progress vive em refs para o loop de rAF; state só para re-render dos textos
  const progressRef = useRef(0);
  const smoothTimeRef = useRef(0);
  const rafRef = useRef<number>(0);

  const [progress, setProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [videoMissing, setVideoMissing] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detecta preferência por movimento reduzido
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Calcula o progresso do scroll dentro da pista da hero
  const readProgress = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    if (scrollable <= 0) return 0;
    return clamp01(-rect.top / scrollable);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const p = readProgress();
      progressRef.current = p;
      // re-render leve apenas quando muda o suficiente para afetar os textos
      setProgress((prev) => (Math.abs(prev - p) > 0.004 ? p : prev));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [readProgress]);

  // Loop de rAF: interpola o currentTime do vídeo até o alvo do scroll,
  // criando um scrubbing amortecido e fluido (sem "pulos").
  useEffect(() => {
    if (!videoReady || reducedMotion) return;
    const video = videoRef.current;
    if (!video || !isFinite(video.duration)) return;

    const tick = () => {
      const target = progressRef.current * video.duration;
      const current = smoothTimeRef.current;
      const next = current + (target - current) * 0.12; // fator de amortecimento
      smoothTimeRef.current = next;
      if (Math.abs(video.currentTime - next) > 1 / 60) {
        video.currentTime = next;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [videoReady, reducedMotion]);

  // Fases dos textos sobre o vídeo
  const phase = (start: number, end: number) =>
    clamp01((progress - start) / (end - start));

  const titleIn = phase(0.02, 0.22);
  const subtitleIn = phase(0.22, 0.42);
  const ctaIn = phase(0.42, 0.6);
  const settleOut = 1 - phase(0.86, 1); // leve saída no fim da pista

  const staticMode = reducedMotion;

  return (
    <section
      ref={trackRef}
      aria-label="Apresentação Origem Digital"
      style={{ height: staticMode ? "100vh" : `${SCROLL_LENGTH_VH}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* ===== Camada de mídia ===== */}
        {!videoMissing && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src="/media/hero-video.mp4"
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={() => setVideoReady(true)}
            onError={() => setVideoMissing(true)}
          />
        )}

        {/* Fallback: crossfade entre as duas fotos, dirigido pelo scroll */}
        {(videoMissing || !videoReady) && (
          <div className="absolute inset-0">
            <Image
              src="/media/frame-inicial.png"
              alt="Empresário diante da cidade à noite com o monograma da Origem Digital no céu"
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{
                opacity: staticMode ? 0 : 1 - progress,
                transform: `scale(${1.05 + progress * 0.08})`,
              }}
            />
            <Image
              src="/media/frame-final.png"
              alt="Celular com o WhatsApp brilhando — nenhum cliente fica sem resposta"
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{
                opacity: staticMode ? 1 : progress,
                transform: `scale(${1.12 - progress * 0.07})`,
              }}
            />
          </div>
        )}

        {/* ===== Máscara escura para leitura perfeita ===== */}
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/80 via-abyss/40 to-abyss" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(11,13,23,0.72),transparent_75%)]" />

        {/* Linha de varredura sutil, ecoando as telas holográficas da referência */}
        {!staticMode && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 h-40 animate-scanline bg-gradient-to-b from-transparent via-cyan-neon/[0.05] to-transparent"
          />
        )}

        {/* ===== Conteúdo ===== */}
        <div
          className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center"
          style={{ opacity: staticMode ? 1 : settleOut }}
        >
          <p
            className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-cyan-neon/90 sm:text-sm"
            style={
              staticMode
                ? undefined
                : { opacity: titleIn, transform: `translateY(${(1 - titleIn) * 24}px)` }
            }
          >
            Para clínicas, salões, restaurantes, oficinas e lojas
          </p>

          <h1
            className="font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
            style={
              staticMode
                ? undefined
                : {
                    opacity: titleIn,
                    transform: `translateY(${(1 - titleIn) * 40}px)`,
                    filter: `blur(${(1 - titleIn) * 6}px)`,
                  }
            }
          >
            Você não perde vendas por falta de clientes.{" "}
            <span className="text-gradient-neon">
              Perde porque demora para responder.
            </span>
          </h1>

          <p
            className="mt-7 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
            style={
              staticMode
                ? undefined
                : {
                    opacity: subtitleIn,
                    transform: `translateY(${(1 - subtitleIn) * 32}px)`,
                  }
            }
          >
            A gente resolve: site profissional + agente de IA respondendo em
            segundos, 24 horas por dia — seu negócio vendendo no digital em
            até 2 semanas, enquanto você cuida dele.
          </p>

          <div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
            style={
              staticMode
                ? undefined
                : {
                    opacity: ctaIn,
                    transform: `translateY(${(1 - ctaIn) * 28}px)`,
                  }
            }
          >
            <NeonButton
              href="https://wa.me/5511939299209?text=Ol%C3%A1!%20Quero%20um%20diagn%C3%B3stico%20gratuito%20para%20digitalizar%20meu%20neg%C3%B3cio."
              variant="primary"
              external
            >
              Solicitar diagnóstico gratuito
            </NeonButton>
            <NeonButton href="#servicos" variant="ghost">
              Ver serviços e preços
            </NeonButton>
          </div>
        </div>

        {/* Indicador de scroll */}
        {!staticMode && (
          <div
            aria-hidden
            className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
            style={{ opacity: 1 - phase(0.05, 0.2) }}
          >
            <div className="flex h-12 w-7 items-start justify-center rounded-full border border-white/25 p-1.5">
              <div className="h-2.5 w-1 animate-float-y rounded-full bg-cyan-neon shadow-neon-cyan" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
