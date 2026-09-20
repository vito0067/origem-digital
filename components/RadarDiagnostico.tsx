"use client";

/**
 * O resultado do diagnóstico em forma de gráfico, e não só de nota.
 *
 * "60/100" diz que está mal, mas não diz ONDE. O radar mostra o
 * formato do problema: cinco eixos, e os que ficam encolhidos são
 * exatamente os furos por onde o cliente escapa. A conversa no
 * WhatsApp já começa sabendo do que falar.
 *
 * Cada eixo tem só dois estados — respondeu "sim" (cheio) ou "não"
 * (quase no centro). É honesto: a pergunta era de sim ou não, então o
 * gráfico não pode fingir que existe meio-termo medido.
 *
 * O desenho é SVG puro, sem biblioteca de gráficos: são cinco pontos
 * numa circunferência, e isso não justifica carregar 80 KB de código.
 */

/** Rótulo curto de cada pergunta, na mesma ordem do questionário. */
const EIXOS = ["Site no ar", "Resposta rápida", "Fora do horário", "Google", "Registro"];

const CENTRO = 110;
const RAIO = 74;
/** O "não" não vai a zero: um polígono com vértice no centro vira risco. */
const PISO = 0.2;

/** Posição de um vértice, começando no topo e girando no sentido horário. */
function ponto(i: number, total: number, fracao: number) {
  const angulo = (Math.PI * 2 * i) / total - Math.PI / 2;
  return {
    x: CENTRO + Math.cos(angulo) * RAIO * fracao,
    y: CENTRO + Math.sin(angulo) * RAIO * fracao,
  };
}

const paraPoligono = (valores: number[]) =>
  valores
    .map((v, i) => {
      const p = ponto(i, valores.length, v);
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    })
    .join(" ");

export default function RadarDiagnostico({
  respostas,
}: {
  respostas: (boolean | null)[];
}) {
  const valores = respostas.map((r) => (r ? 1 : PISO));
  const total = respostas.length;

  return (
    // A área desenhada vai de 0 a 220, mas os rótulos das pontas da
    // esquerda e da direita saem para fora disso — "REGISTRO" virava
    // "EDISTRO" e "RESPOSTA RÁPIDA" virava "RESPOSTA R". O viewBox
    // começa antes do zero e termina depois de 220 justamente para
    // caber o texto que sobra nas laterais.
    <svg
      viewBox="-30 -6 280 234"
      className="h-full w-full"
      role="img"
      aria-label={`Diagnóstico por área: ${EIXOS.map(
        (e, i) => `${e}: ${respostas[i] ? "ok" : "precisa de atenção"}`
      ).join(", ")}`}
    >
      <defs>
        <linearGradient id="radarPreenche" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="radarBorda" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>

      {/* Teia de fundo: três anéis e os cinco raios */}
      {[0.4, 0.7, 1].map((r) => (
        <polygon
          key={r}
          points={paraPoligono(Array(total).fill(r))}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: total }).map((_, i) => {
        const p = ponto(i, total, 1);
        return (
          <line
            key={i}
            x1={CENTRO}
            y1={CENTRO}
            x2={p.x}
            y2={p.y}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        );
      })}

      {/* A forma do diagnóstico. Muda de formato junto com as respostas,
          e a transição faz o desenho se remodelar na frente da pessoa. */}
      <polygon
        points={paraPoligono(valores)}
        fill="url(#radarPreenche)"
        stroke="url(#radarBorda)"
        strokeWidth="2"
        strokeLinejoin="round"
        style={{ transition: "all .7s cubic-bezier(.22,1,.36,1)" }}
      />

      {/* Um ponto em cada vértice: acende no "sim", apaga no "não" */}
      {valores.map((v, i) => {
        const p = ponto(i, total, v);
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={respostas[i] ? 4 : 3}
            fill={respostas[i] ? "#00F0FF" : "#64748b"}
            style={{ transition: "all .7s cubic-bezier(.22,1,.36,1)" }}
          />
        );
      })}

      {/* Rótulos, empurrados um pouco para fora da teia */}
      {EIXOS.map((rotulo, i) => {
        const p = ponto(i, total, 1.34);
        return (
          <text
            key={rotulo}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-500 text-[9px] uppercase"
            style={{ letterSpacing: "0.06em" }}
          >
            {rotulo}
          </text>
        );
      })}
    </svg>
  );
}
