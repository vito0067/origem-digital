"use client";

import { useRef, useState } from "react";
import Reveal from "./Reveal";
import Botao from "./Botao";
import Contador from "./Contador";
import { medir, EVENTOS } from "@/lib/medir";

/**
 * A CALCULADORA DE CLIENTES PERDIDOS.
 *
 * À esquerda, três controles com os números do negócio. À direita, a
 * conta inteira, linha por linha — a pessoa vê o raciocínio, não só o
 * resultado — e o total, que corre até o valor novo a cada mudança.
 *
 * Estimativa: ~40% das mensagens são potenciais clientes; a chance de
 * perder a venda cresce ~12% por hora de demora (teto de 60%). Números
 * conservadores, de médias de mercado — e o texto diz que é estimativa.
 */
const fmt = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

function Controle({
  id,
  rotulo,
  valor,
  min,
  max,
  passo,
  mostrar,
  aoMudar,
}: {
  id: string;
  rotulo: string;
  valor: number;
  min: number;
  max: number;
  passo: number;
  mostrar: string;
  aoMudar: (n: number) => void;
}) {
  const cheio = ((valor - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <label htmlFor={id} className="text-[15px] text-grafite">
          {rotulo}
        </label>
        <span className="whitespace-nowrap font-display text-[1.35rem] font-medium tracking-[-0.02em] text-tinta">{mostrar}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={passo}
        value={valor}
        onChange={(e) => aoMudar(Number(e.target.value))}
        className="deslizante mt-4"
        style={{ ["--cheio" as string]: `${cheio}%` }}
      />
    </div>
  );
}

function Linha({ esq, dir }: { esq: string; dir: string }) {
  return (
    <p className="flex justify-between gap-3 border-b border-white/10 py-2.5">
      <span className="text-white/70">{esq}</span>
      <span className="tabular-nums text-white">{dir}</span>
    </p>
  );
}

export default function Calculadora() {
  const [msgs, setMsgs] = useState(150);
  const [horas, setHoras] = useState(3);
  const [ticket, setTicket] = useState(400);

  const taxa = Math.min(horas * 0.12, 0.6);
  const interessados = Math.round(msgs * 0.4);
  const clientesPerdidos = Math.round(msgs * 0.4 * taxa);
  const dinheiroPerdido = clientesPerdidos * ticket;

  const jaAnotou = useRef(false);
  const muda = (f: (n: number) => void) => (n: number) => {
    if (!jaAnotou.current) {
      jaAnotou.current = true;
      medir(EVENTOS.calculadora);
    }
    f(n);
  };

  const horasTexto = `${String(horas).replace(".", ",")} ${horas === 1 ? "hora" : "horas"}`;
  const wa = `https://wa.me/5511939299209?text=${encodeURIComponent(
    `Olá! Fiz a conta no site: recebo cerca de ${msgs} mensagens por mês e posso estar perdendo ${fmt.format(dinheiroPerdido)} por mês. Quero o diagnóstico gratuito.`
  )}`;

  return (
    <section id="calculadora" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-pagina px-5 sm:px-8">
        <Reveal>
          <p className="rotulo">01 · Calculadora</p>
          <h2 className="equilibrado mt-5 max-w-3xl font-display text-[2.3rem] font-medium leading-[1.05] tracking-[-0.04em] text-tinta sm:text-[3rem]">
            Quantos clientes a demora <span className="font-serifa font-normal italic tracking-[-0.01em] text-azul">custa por mês?</span>
          </h2>
          <p className="sem-orfa mt-5 max-w-2xl text-[17px] leading-relaxed text-grafite">
            Mexa nos três controles com os números do seu negócio. A conta aparece inteira, na hora.
          </p>
        </Reveal>

        <div className="mt-12 grid items-start gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="vidro flex flex-col gap-10 rounded-[28px] p-7 shadow-vidro sm:p-9">
              <Controle id="calc-mensagens" rotulo="Mensagens que você recebe por mês" valor={msgs} min={20} max={1000} passo={10} mostrar={`${msgs} mensagens`} aoMudar={muda(setMsgs)} />
              <Controle id="calc-horas" rotulo="Tempo médio para responder" valor={horas} min={0.5} max={12} passo={0.5} mostrar={horasTexto} aoMudar={muda(setHoras)} />
              <Controle id="calc-ticket" rotulo="Valor médio de uma venda" valor={ticket} min={50} max={3000} passo={50} mostrar={fmt.format(ticket)} aoMudar={muda(setTicket)} />
              <p className="border-t border-linha pt-6 text-[13.5px] leading-relaxed text-cinza">
                Estimativa baseada em médias de mercado: cerca de 40% das mensagens são potenciais clientes, e a chance de perder a
                venda cresce a cada hora sem resposta. Os números do seu negócio podem variar.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="coluna-presa">
              <div className="rounded-[28px] bg-noite p-7 text-white shadow-flutua sm:p-8" aria-live="polite">
                <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-violeta-claro">A conta</p>
                <div className="mt-4 font-mono text-[14px]">
                  <Linha esq="mensagens por mês" dir={String(msgs)} />
                  <Linha esq="× 40% são clientes" dir={`= ${interessados}`} />
                  <Linha esq={`× ${Math.round(taxa * 100)}% perdidos (${horasTexto})`} dir={`= ${clientesPerdidos}`} />
                  <Linha esq="× valor médio" dir={fmt.format(ticket)} />
                </div>
                <p className="mt-7 text-[14px] text-white/70">você pode estar perdendo</p>
                <p className="mt-1 font-display text-[3rem] font-medium leading-none tracking-[-0.045em] sm:text-[3.4rem]">
                  <Contador valor={dinheiroPerdido} formatar={(n) => fmt.format(n)} />
                </p>
                <p className="mt-2 text-[15px] text-ceu-claro">por mês · cerca de {clientesPerdidos} clientes que chegaram e não foram atendidos a tempo</p>
              </div>
              <div className="mt-5">
                <Botao cheio href={wa}>
                  Quero parar de perder esse dinheiro
                </Botao>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
