"use client";

import { useEffect, useRef } from "react";

/**
 * O SÍMBOLO "OD" SE MONTANDO DE PIXELS — a assinatura da capa.
 *
 * O símbolo da Origem já tem pixels se desprendendo à esquerda. Aqui a
 * ideia vai até o fim: milhares de pixels chegam da esquerda e se
 * encaixam até formar o símbolo — "do pixel à origem". Leva uns dois
 * segundos, acontece UMA vez e para. Depois disso é uma imagem parada,
 * sem custo nenhum para o celular.
 *
 * Como funciona:
 *  1. o símbolo é desenhado escondido, num quadro do tamanho da tela;
 *  2. cada ponto da grade que caiu dentro do desenho vira o destino de
 *     um pixel;
 *  3. cada pixel nasce mais à esquerda e viaja até o seu destino, com
 *     atraso crescente da esquerda para a direita.
 *
 * As cores seguem o degradê da marca: azul-claro → violeta → índigo.
 * Para quem pediu menos movimento, o símbolo já aparece pronto.
 */

const TRACO_PRINCIPAL = "M42 53.5A21.5 21.5 0 1 1 58.94 18.76L86.09 53.5H98A21.5 21.5 0 0 0 98 10.5H92";
const TRACO_D = "M98 10.5H44";
const TRACO_O = "M63.42 30.13A21.5 21.5 0 0 1 38.27 53.17";
const RECORTE_D: [number, number][] = [[40.61, -17.69], [89.87, 45.35], [168.7, -16.2], [119.4, -79.3]];
const RECORTE_O: [number, number][] = [[28.01, -7.83], [77.27, 55.21], [-1.53, 116.8], [-50.79, 53.74]];
const PIXELS = [
  [9, 23, 5],
  [2.5, 30, 4],
  [10, 35, 4.5],
  [4, 41.5, 3.5],
];

const CORES: [number, number, number][] = [
  [56, 189, 248], // #38BDF8
  [129, 140, 248], // #818CF8
  [49, 46, 129], // #312E81
];
const FAIXAS = 18;

function corNaFaixa(t: number) {
  const parte = t < 0.5 ? 0 : 1;
  const local = t < 0.5 ? t / 0.5 : (t - 0.5) / 0.5;
  const a = CORES[parte];
  const b = CORES[parte + 1];
  const m = (i: number) => Math.round(a[i] + (b[i] - a[i]) * local);
  return `rgb(${m(0)},${m(1)},${m(2)})`;
}

type Pixel = { x: number; y: number; dx: number; dy: number; atraso: number; faixa: number };

/** Desenha o símbolo num quadro escondido e devolve os pontos que caíram nele. */
function destinos(largura: number, altura: number) {
  const tela = document.createElement("canvas");
  tela.width = Math.ceil(largura);
  tela.height = Math.ceil(altura);
  const ctx = tela.getContext("2d", { willReadFrequently: true });
  if (!ctx) return { pontos: [] as { x: number; y: number }[], passo: 4 };

  // o símbolo ocupa 92% da largura (ou a altura toda, o que couber)
  const escala = Math.min((largura * 0.92) / 128, (altura * 0.94) / 64);
  const ox = (largura - 128 * escala) / 2;
  const oy = (altura - 64 * escala) / 2;
  ctx.setTransform(escala, 0, 0, escala, ox, oy);
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#000";
  ctx.lineWidth = 9;

  ctx.stroke(new Path2D(TRACO_PRINCIPAL));
  const recortado = (traco: string, recorte: [number, number][]) => {
    ctx.save();
    const p = new Path2D();
    recorte.forEach(([x, y], i) => (i ? p.lineTo(x, y) : p.moveTo(x, y)));
    p.closePath();
    ctx.clip(p);
    ctx.stroke(new Path2D(traco));
    ctx.restore();
  };
  recortado(TRACO_D, RECORTE_D);
  recortado(TRACO_O, RECORTE_O);
  PIXELS.forEach(([x, y, l]) => ctx.fillRect(x, y, l, l));

  // a grade: mais fina em tela pequena, para o símbolo não ficar ralo
  const passo = Math.max(3, Math.round(escala * 0.85 * 10) / 10);
  const dados = ctx.getImageData(0, 0, tela.width, tela.height).data;
  const pontos: { x: number; y: number }[] = [];
  for (let y = passo / 2; y < tela.height; y += passo) {
    for (let x = passo / 2; x < tela.width; x += passo) {
      if (dados[(Math.floor(y) * tela.width + Math.floor(x)) * 4 + 3] > 140) pontos.push({ x, y });
    }
  }
  return { pontos, passo };
}

export default function SimboloParticulas({ className = "", aoMontar }: { className?: string; aoMontar?: () => void }) {
  const caixa = useRef<HTMLDivElement>(null);
  const quadro = useRef<HTMLCanvasElement>(null);
  const avisar = useRef(aoMontar);
  avisar.current = aoMontar;

  useEffect(() => {
    const el = caixa.current;
    const canvas = quadro.current;
    if (!el || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parado = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pixels: Pixel[] = [];
    let tamanho = 2;
    let anima = 0;
    let terminou = false;
    let inicio = 0;
    const DURACAO = 1250;

    const preparar = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width < 10 || height < 10) return false;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const { pontos, passo } = destinos(width, height);
      tamanho = Math.max(1.6, passo * 0.56);
      let minX = Infinity;
      let maxX = -Infinity;
      pontos.forEach((p) => {
        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);
      });
      const faixaDe = (x: number) => Math.min(FAIXAS - 1, Math.floor(((x - minX) / Math.max(1, maxX - minX)) * FAIXAS));
      pixels = pontos.map((p) => {
        const t = (p.x - minX) / Math.max(1, maxX - minX);
        return {
          x: p.x,
          y: p.y,
          // nasce à esquerda, um pouco espalhado na vertical
          dx: -(width * (0.25 + Math.random() * 0.55)),
          dy: (Math.random() - 0.5) * height * 0.9,
          atraso: t * 620 + Math.random() * 380,
          faixa: faixaDe(p.x),
        };
      });
      // agrupados por cor: troca de cor custa caro, assim cada cor é trocada uma vez por quadro
      pixels.sort((a, b) => a.faixa - b.faixa);
      return true;
    };

    const desenhar = (agora: number) => {
      const { width, height } = el.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      let faixaAtual = -1;
      let pendentes = 0;
      for (const p of pixels) {
        let k = terminou ? 1 : (agora - inicio - p.atraso) / DURACAO;
        if (k <= 0) {
          pendentes++;
          continue;
        }
        if (k < 1) pendentes++;
        k = Math.min(1, k);
        const e = 1 - Math.pow(1 - k, 4); // desacelera no fim, como quem encaixa
        if (p.faixa !== faixaAtual) {
          faixaAtual = p.faixa;
          ctx.fillStyle = corNaFaixa(p.faixa / (FAIXAS - 1));
        }
        ctx.globalAlpha = Math.min(1, k * 1.6);
        const lado = tamanho * (1.6 - 0.6 * e);
        ctx.fillRect(p.x + p.dx * (1 - e) - lado / 2, p.y + p.dy * (1 - e) - lado / 2, lado, lado);
      }
      ctx.globalAlpha = 1;
      return pendentes;
    };

    const quadroAQuadro = (agora: number) => {
      if (!inicio) inicio = agora;
      const faltam = desenhar(agora);
      if (faltam > 0) {
        anima = requestAnimationFrame(quadroAQuadro);
      } else {
        terminou = true;
        desenhar(agora);
        avisar.current?.();
      }
    };

    if (!preparar()) return;
    let comeco: ReturnType<typeof setTimeout> | undefined;
    if (parado) {
      terminou = true;
      desenhar(0);
      avisar.current?.();
    }
    // Só começa quando o símbolo aparece na tela: no celular ele fica
    // abaixo do título, e a montagem não pode acontecer sem ninguém ver.
    const aparece = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        aparece.disconnect();
        if (terminou) return;
        // um respiro antes de começar: o título chega primeiro
        comeco = setTimeout(() => (anima = requestAnimationFrame(quadroAQuadro)), 350);
      },
      { threshold: 0.4 }
    );
    aparece.observe(el);

    // Mudou o tamanho da tela: recalcula e mostra pronto (sem repetir a animação).
    let largura = el.getBoundingClientRect().width;
    const vigia = new ResizeObserver(() => {
      const nova = el.getBoundingClientRect().width;
      if (Math.abs(nova - largura) < 2) return;
      largura = nova;
      cancelAnimationFrame(anima);
      clearTimeout(comeco);
      const estavaPronto = terminou;
      if (!preparar()) return;
      terminou = true;
      desenhar(0);
      if (!estavaPronto) avisar.current?.();
    });
    vigia.observe(el);

    return () => {
      aparece.disconnect();
      cancelAnimationFrame(anima);
      clearTimeout(comeco);
      vigia.disconnect();
    };
  }, []);

  return (
    <div ref={caixa} className={`relative ${className}`} aria-hidden>
      <canvas ref={quadro} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
