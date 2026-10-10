"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import Contador from "./Contador";

/**
 * Quatro respostas rápidas, logo abaixo da capa.
 *
 * São as perguntas que a pessoa faz na cabeça antes de rolar a página:
 * é pacote pronto? quanto demora? atende de madrugada? me abandonam
 * depois? Responder as quatro em uma linha faz ela continuar descendo.
 *
 * Nenhum número aqui é invenção — não há "+500 clientes" nem estrelinha
 * de satisfação, porque ainda não existe cliente pagante fechado.
 * Métrica inventada é a primeira coisa que um comprador desconfiado vai
 * conferir, e a única que derruba a venda inteira quando não se sustenta.
 *
 * A ENTRADA: o "24" sobe do zero, e os valores escritos aparecem letra
 * por letra. São quatro blocos iguais em fileira — sem movimento, o
 * olho passa por cima sem ler nenhum. Com a entrada escalonada, ele
 * acompanha os quatro na ordem.
 */

type Item = {
  valor: string;
  rotulo: string;
  /** Quando existe, este pedaço do valor sobe do zero em vez de aparecer. */
  conta?: number;
  /** O que vem depois do número contado. */
  sufixo?: string;
};

// O prazo é o do Contrato Master (cláusula 3.1). Não é "tempo médio":
// é o máximo que o contrato promete para a primeira versão.
const itens: Item[] = [
  { valor: "Sob medida", rotulo: "Cada projeto é único" },
  { valor: "15 dias úteis", rotulo: "Prazo da 1ª versão" },
  { valor: "24/7", rotulo: "Atendimento com IA", conta: 24, sufixo: "/7" },
  { valor: "Suporte", rotulo: "Incluso em todo plano" },
];

/**
 * Escreve o texto letra por letra quando ele entra na tela.
 *
 * Cada letra é um pedaço com atraso próprio. Sem JavaScript, ou para
 * quem pediu menos movimento, o texto já aparece inteiro — nunca fica
 * invisível.
 */
function LetraPorLetra({ texto, atraso = 0 }: { texto: string; atraso?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visivel, setVisivel] = useState(false);
  const [ligado, setLigado] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisivel(true);
      return;
    }
    setLigado(true);

    const el = ref.current;
    if (!el) return;
    const vigia = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisivel(true);
          vigia.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    vigia.observe(el);
    return () => vigia.disconnect();
  }, []);

  /**
   * Cada PALAVRA fica num bloco que não quebra, e as letras animam
   * dentro dele. Sem isso, o navegador podia quebrar a linha entre duas
   * letras quaisquer — no celular estreito "15 dias úteis" virava
   * "15 dias ú" numa linha e "teis" na outra.
   *
   * `split("")` e não `[...texto]`: o TypeScript do projeto não permite
   * percorrer texto com reticências. Dá no mesmo aqui, porque estes
   * rótulos não têm emoji nem acento combinado ("ú" é um caractere só).
   */
  let n = 0; // posição da letra no texto inteiro, para o atraso seguir
  return (
    <span ref={ref}>
      {texto.split(" ").map((palavra, p) => (
        <span key={`${palavra}-${p}`}>
          {p > 0 && " "}
          <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {palavra.split("").map((letra) => {
              const i = n++;
              return (
                <span
                  key={`${letra}-${i}`}
                  style={{
                    display: "inline-block",
                    opacity: ligado && !visivel ? 0 : 1,
                    transform:
                      ligado && !visivel ? "translate3d(0, 0.35em, 0)" : "none",
                    transition: `opacity .4s ease ${atraso + i * 28}ms, transform .5s cubic-bezier(.22,1,.36,1) ${atraso + i * 28}ms`,
                  }}
                >
                  {letra}
                </span>
              );
            })}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function Numeros() {
  return (
    <div className="border-b border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-6">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {itens.map((item, i) => (
            <Reveal
              key={item.rotulo}
              delay={i * 90}
              className={`border-white/[0.06] py-7 ${
                i % 2 === 1 ? "border-l" : ""
              } ${i < 2 ? "border-b lg:border-b-0" : ""} ${
                i === 2 ? "lg:border-l" : ""
              } ${i === 3 ? "border-l" : ""}`}
            >
              <div className="px-5 text-center">
                <dt className="font-display text-xl font-bold text-gradient-neon sm:text-2xl">
                  {item.conta !== undefined ? (
                    <>
                      <Contador valor={item.conta} duracao={1100} />
                      {item.sufixo}
                    </>
                  ) : (
                    <LetraPorLetra texto={item.valor} atraso={i * 90} />
                  )}
                </dt>
                <dd className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-slate-500 sm:text-[11px]">
                  {item.rotulo}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </div>
  );
}
