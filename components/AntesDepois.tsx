"use client";

import { useRef, useState } from "react";
import Reveal from "./Reveal";

/**
 * A CORTINA: o mesmo cliente, de um lado sem agente e do outro com a
 * Aurora. A pessoa arrasta a barra e vê a diferença acontecer na mão
 * dela.
 *
 * Por que arrastar e não mostrar lado a lado: comparação em duas
 * colunas a pessoa lê e esquece. Arrastando, ela FAZ a troca — e o que
 * a gente faz com a mão fica.
 *
 * As duas telas são desenhadas com texto e caixas, não com imagem.
 * Isso significa peso zero de download, nitidez em qualquer tela, e —
 * o mais importante — horários e falas que se corrigem editando uma
 * linha aqui, em vez de refazer print.
 *
 * FUNCIONA NO TECLADO: a barra é um controle deslizante de verdade
 * (input range invisível por cima). Seta para o lado move, e leitor de
 * tela anuncia. Os dois lados também ficam empilhados e legíveis se o
 * JavaScript não rodar.
 */

const SEM = [
  { hora: "23:47", texto: "Oi, vocês fazem site pra clínica?", de: "cliente" },
  { hora: "23:47", texto: "Visualizado", de: "aviso" },
  { hora: "08:12", texto: "Bom dia! Desculpa a demora…", de: "dono" },
  { hora: "08:12", texto: "O cliente não respondeu mais.", de: "aviso" },
];

const COM = [
  { hora: "23:47", texto: "Oi, vocês fazem site pra clínica?", de: "cliente" },
  { hora: "23:47", texto: "Olá! Fazemos sim — a partir de R$ 987 + R$ 43/mês, pronto em 1 a 2 semanas.", de: "aurora" },
  { hora: "23:48", texto: "Que horas posso falar com alguém?", de: "cliente" },
  { hora: "23:48", texto: "Agendei amanhã às 10h e já avisei a equipe ✅", de: "aurora" },
];

function Tela({
  falas,
  titulo,
  tom,
}: {
  falas: typeof SEM;
  titulo: string;
  tom: "frio" | "quente";
}) {
  return (
    <div className="flex h-full w-full flex-col bg-[#0b141a]">
      <div
        className={`flex items-center justify-between border-b border-white/[0.06] px-5 py-3 ${
          tom === "quente" ? "bg-[#1f2c34]" : "bg-[#1a1a1f]"
        }`}
      >
        <span
          className={`text-[11px] font-bold uppercase tracking-[0.2em] ${
            tom === "quente" ? "text-cyan-neon" : "text-slate-500"
          }`}
        >
          {titulo}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-end gap-2 p-4">
        {falas.map((f, i) => {
          if (f.de === "aviso") {
            return (
              <p
                key={i}
                className="py-0.5 text-center text-[11px] italic text-slate-600"
              >
                {f.texto}
              </p>
            );
          }
          const meu = f.de === "cliente";
          return (
            <div
              key={i}
              className={`flex ${meu ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 ${
                  meu
                    ? "rounded-br-sm bg-[#005c4b] text-white"
                    : tom === "quente"
                      ? "rounded-tl-sm bg-[#1f2c34] text-slate-100"
                      : "rounded-tl-sm bg-[#22222a] text-slate-400"
                }`}
              >
                <p className="text-[12.5px] leading-relaxed">{f.texto}</p>
                <p className="mt-1 text-right text-[10px] text-white/40">
                  {f.hora}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AntesDepois() {
  const [corte, setCorte] = useState(50);
  const caixa = useRef<HTMLDivElement>(null);

  return (
    <Reveal className="mt-16">
      <div className="mx-auto max-w-3xl">
        <h3 className="text-center font-display text-xl font-bold text-white sm:text-2xl">
          Arraste e veja a{" "}
          <span className="text-gradient-neon">mesma mensagem</span> dos dois
          lados
        </h3>
        <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-slate-400">
          Uma pergunta que chega às 23h47. À esquerda, o que acontece hoje.
          À direita, com a Aurora atendendo.
        </p>

        <div
          ref={caixa}
          className="relative mt-8 select-none overflow-hidden rounded-2xl border border-white/10"
          style={{ aspectRatio: "16 / 11" }}
        >
          {/* Lado "com a Aurora" ocupa o fundo inteiro */}
          <div className="absolute inset-0">
            <Tela falas={COM} titulo="Com a Aurora" tom="quente" />
          </div>

          {/* Lado "sem" fica por cima, recortado até onde a barra está.
              É o recorte que cria a cortina: nada se move, só a área
              visível de cima muda. */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - corte}% 0 0)` }}
          >
            <Tela falas={SEM} titulo="Sem agente" tom="frio" />
          </div>

          {/* A linha da cortina */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 w-px bg-gradient-to-b from-cyan-neon/40 via-cyan-neon to-cyan-neon/40"
            style={{ left: `${corte}%` }}
          >
            <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-neon/60 bg-abyss/90 text-cyan-neon shadow-neon-cyan backdrop-blur-sm">
              <span className="text-xs">◂▸</span>
            </span>
          </div>

          {/* O controle de verdade, invisível por cima de tudo. Assim o
              arrastar funciona com mouse, com dedo e com o teclado, sem
              eu ter que reimplementar nenhum dos três. */}
          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={corte}
            onChange={(e) => setCorte(Number(e.target.value))}
            aria-label="Arraste para comparar o atendimento sem agente e com a Aurora"
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>
      </div>
    </Reveal>
  );
}
