"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { lerEscolha, guardarEscolha, type Escolha } from "@/lib/consentimento";

/**
 * O aviso de privacidade que aparece na primeira visita.
 *
 * COMO ELE É DIFERENTE DA MAIORIA:
 *
 * 1. NÃO MENTE. Quase todo site brasileiro abre um aviso falando de
 *    "cookies" que ele nem usa. Este site não guarda cookie nenhum —
 *    o que existe é uma contagem de audiência que não identifica
 *    ninguém. O aviso diz exatamente isso, em uma frase.
 *
 * 2. O "NÃO" FUNCIONA DE VERDADE. Recusar não é um botão decorativo:
 *    a medição simplesmente não é carregada. Aceitar é o único
 *    caminho que liga alguma coisa.
 *
 * 3. NÃO BLOCA A TELA. Fica numa faixa embaixo, no canto, sem cobrir
 *    o conteúdo e sem prender ninguém. Quem quiser ignorar, ignora e
 *    navega — e nesse caso nada é medido, que é o padrão mais seguro.
 *
 * Aparece com 1,2 segundo de atraso: chegar junto com a capa
 * atrapalharia justamente o momento em que a pessoa está decidindo se
 * fica no site.
 */

export default function AvisoCookies() {
  const [escolha, setEscolha] = useState<Escolha>("nao-perguntado");
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (lerEscolha() !== "nao-perguntado") return;
    const t = setTimeout(() => {
      setEscolha("nao-perguntado");
      setVisivel(true);
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  const responder = (resposta: "aceito" | "recusado") => {
    guardarEscolha(resposta);
    setEscolha(resposta);
    setVisivel(false);
  };

  if (!visivel || escolha !== "nao-perguntado") return null;

  return (
    <div
      role="region"
      aria-label="Aviso de privacidade"
      className="fixed inset-x-0 bottom-0 z-[95] p-4 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-sm sm:p-0"
    >
      <div className="glass-card border-white/15 p-5 shadow-glass">
        <p className="font-display text-sm font-bold text-white">
          Um aviso rápido sobre privacidade
        </p>
        <p className="mt-2.5 text-xs leading-relaxed text-slate-400">
          Este site não guarda cookies seus. Se você permitir, contamos de
          forma anônima quais partes da página são mais vistas — sem nome,
          sem telefone, sem identificar você. Serve só para melhorarmos o
          site.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => responder("aceito")}
            className="brilho-passa rounded-lg bg-cyan-neon px-4 py-2 text-xs font-semibold text-abyss transition-transform hover:scale-[1.03]"
          >
            Pode contar
          </button>
          <button
            type="button"
            onClick={() => responder("recusado")}
            className="rounded-lg border border-white/15 px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-white/30 hover:text-white"
          >
            Prefiro que não
          </button>
          <Link
            href="/privacidade"
            className="ml-auto text-[11px] text-slate-500 underline-offset-2 hover:text-cyan-neon hover:underline"
          >
            Saiba mais
          </Link>
        </div>
      </div>
    </div>
  );
}
