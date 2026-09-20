"use client";

import { useRef, useState } from "react";
import Reveal from "./Reveal";
import NeonButton from "./NeonButton";
import TituloSecao from "./TituloSecao";
import Contador from "./Contador";
import Magnetic from "./Magnetic";
import { medir, EVENTOS } from "@/lib/medir";

/**
 * CALCULADORA DE PERDA
 *
 * Antes: controles em cima, resultado embaixo, tudo centralizado. Quem
 * arrastava o controle não via o número mudar — precisava olhar para
 * baixo depois. O efeito da conta se perdia exatamente onde ele importa.
 *
 * Agora os controles ficam à esquerda e o resultado à direita, preso na
 * tela: a pessoa arrasta e vê o dinheiro subir no mesmo instante, no
 * canto do olho. E o número corre até o valor em vez de trocar de seco.
 *
 * Estimativa: ~40% das mensagens são potenciais clientes; a taxa de
 * perda cresce ~12% por hora de demora na resposta (teto de 60%).
 * Números conservadores, baseados em médias de mercado — e o texto
 * deixa claro que é uma estimativa.
 */
const fmt = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

type ControleProps = {
  rotulo: string;
  valor: number;
  min: number;
  max: number;
  passo: number;
  mostrar: string;
  aoMudar: (n: number) => void;
};

function Controle({ rotulo, valor, min, max, passo, mostrar, aoMudar }: ControleProps) {
  const preenchido = ((valor - min) / (max - min)) * 100;

  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-xs uppercase tracking-widest text-slate-400">
          {rotulo}
        </span>
        <span className="font-display text-lg font-bold text-white">
          {mostrar}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={passo}
        value={valor}
        onChange={(e) => aoMudar(Number(e.target.value))}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full accent-cyan-neon"
        // A parte já percorrida fica acesa em ciano: dá para ver de
        // relance o quanto daquele controle está puxado.
        style={{
          background: `linear-gradient(90deg, #00F0FF 0%, #00F0FF ${preenchido}%, rgba(255,255,255,0.12) ${preenchido}%, rgba(255,255,255,0.12) 100%)`,
        }}
      />
    </label>
  );
}

export default function LossCalculator() {
  const [msgs, setMsgs] = useState(150);
  const [horas, setHoras] = useState(3);
  const [ticket, setTicket] = useState(400);

  const taxa = Math.min(horas * 0.12, 0.6);
  const clientesPerdidos = Math.round(msgs * 0.4 * taxa);
  const dinheiroPerdido = clientesPerdidos * ticket;

  /**
   * Anota uma vez só, no primeiro controle que a pessoa mexer.
   *
   * Sem isso, arrastar um controle dispararia dezenas de registros por
   * visita e o painel viraria lixo. O que interessa saber é outra
   * coisa: de cada cem pessoas que chegam aqui, quantas encostam na
   * calculadora? Se for pouca gente, ela está espantando em vez de
   * prender, e é melhor sair da frente do preço.
   */
  const jaAnotou = useRef(false);
  const anotarUso = () => {
    if (jaAnotou.current) return;
    jaAnotou.current = true;
    medir(EVENTOS.calculadora);
  };

  return (
    <section
      id="calculadora"
      className="relative border-t border-white/[0.06] py-20 sm:py-24"
    >
      <div aria-hidden className="neon-grid absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-6">
        <TituloSecao
          etiqueta="Faça as contas"
          titulo="Quantos clientes você perde por mês?"
          tom="violet"
          apoio="Mexa nos três controles com os números do seu negócio. A conta muda na hora."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* ---- Controles, à esquerda ---- */}
          <Reveal de="esquerda" className="lg:col-span-7">
            <div className="glass-card flex h-full flex-col gap-9 p-8 sm:p-10">
              <Controle
                rotulo="Mensagens que você recebe por mês"
                valor={msgs}
                min={20}
                max={1000}
                passo={10}
                mostrar={`${msgs} mensagens`}
                aoMudar={(n) => {
                  anotarUso();
                  setMsgs(n);
                }}
              />
              <Controle
                rotulo="Tempo médio para responder"
                valor={horas}
                min={0.5}
                max={12}
                passo={0.5}
                mostrar={`${horas} ${horas === 1 ? "hora" : "horas"}`}
                aoMudar={(n) => {
                  anotarUso();
                  setHoras(n);
                }}
              />
              <Controle
                rotulo="Valor médio de uma venda"
                valor={ticket}
                min={50}
                max={3000}
                passo={50}
                mostrar={fmt.format(ticket)}
                aoMudar={(n) => {
                  anotarUso();
                  setTicket(n);
                }}
              />

              {/* O raciocínio, em uma linha só, para a conta não parecer
                  um número tirado do nada. */}
              <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/10 pt-7 text-sm text-slate-400">
                <span>
                  <strong className="text-white">{msgs}</strong> mensagens
                </span>
                <span aria-hidden className="text-cyan-neon">→</span>
                <span>
                  demora de{" "}
                  <strong className="text-white">
                    {horas} {horas === 1 ? "hora" : "horas"}
                  </strong>
                </span>
                <span aria-hidden className="text-cyan-neon">→</span>
                <span>
                  cerca de{" "}
                  <strong className="text-white">
                    <Contador valor={clientesPerdidos} /> clientes
                  </strong>{" "}
                  perdidos
                </span>
              </div>
            </div>
          </Reveal>

          {/* ---- Resultado, à direita e preso ---- */}
          <Reveal de="direita" delay={140} className="lg:col-span-5">
            <div className="coluna-presa glass-card relative flex flex-col overflow-hidden p-8 ring-1 ring-violet-neon/25 sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet-neon/15 blur-[90px]"
              />

              <p className="relative text-xs uppercase tracking-[0.3em] text-slate-400">
                Você pode estar perdendo
              </p>

              <p className="relative mt-4 font-display text-[2.7rem] font-bold leading-none text-gradient-neon sm:text-5xl">
                <Contador valor={dinheiroPerdido} formatar={(n) => fmt.format(n)} />
              </p>
              <p className="relative mt-2 font-display text-lg text-white">
                por mês
              </p>

              <p className="relative mt-6 text-sm leading-relaxed text-slate-300">
                São cerca de{" "}
                <strong className="text-white">
                  <Contador valor={clientesPerdidos} />
                </strong>{" "}
                clientes por mês que chegaram até você e não foram atendidos a
                tempo.
              </p>

              <p className="relative mt-6 border-t border-white/10 pt-6 text-xs leading-relaxed text-slate-500">
                Estimativa baseada em médias de mercado: cerca de 40% das
                mensagens são potenciais clientes e a chance de perder a venda
                cresce a cada hora sem resposta. Os números do seu negócio podem
                variar.
              </p>

              <div className="relative mt-8">
                <Magnetic>
                  <NeonButton
                    href="https://wa.me/5511939299209?text=Ol%C3%A1!%20Fiz%20a%20conta%20no%20site%20e%20quero%20parar%20de%20perder%20clientes."
                    external
                  >
                    Quero parar de perder esse dinheiro
                  </NeonButton>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
