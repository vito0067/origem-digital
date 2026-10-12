"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { lerEscolha, guardarEscolha, type Escolha } from "@/lib/consentimento";

/**
 * O aviso de privacidade da primeira visita — uma placa de vidro no pé.
 *
 * 1. NÃO MENTE: este site não guarda cookie nenhum; o que existe é uma
 *    contagem de audiência que não identifica ninguém.
 * 2. O "NÃO" FUNCIONA DE VERDADE: recusar não carrega a medição.
 * 3. NÃO BLOQUEIA A TELA: fica no pé da tela, longe dos botões da capa.
 */
export default function AvisoCookies() {
  const [escolha, setEscolha] = useState<Escolha>("nao-perguntado");
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (lerEscolha() !== "nao-perguntado") return;
    const t = setTimeout(() => {
      setEscolha("nao-perguntado");
      setVisivel(true);
    }, 1800);
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
      className="fixed inset-x-0 bottom-0 z-[95] p-3 sm:bottom-5 sm:p-0"
      style={{ animation: "revelaNaCarga .5s cubic-bezier(.22,1,.36,1) both", ["--de-y" as string]: "14px" }}
    >
      <div className="mx-auto rounded-3xl border border-white bg-white/95 p-4 shadow-flutua backdrop-blur-xl sm:max-w-[44rem] sm:p-5 md:flex md:items-center md:gap-6">
        <div className="md:flex-1">
          <p className="font-display text-[15.5px] font-semibold text-tinta">Um aviso rápido sobre privacidade</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-grafite sm:text-[13.5px]">
            Este site não guarda cookies seus. Se você permitir, contamos de forma anônima quais partes da página são mais
            vistas — sem nome, sem telefone, sem identificar você.
          </p>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 md:mt-0 md:shrink-0 md:flex-col md:items-stretch">
          <button type="button" onClick={() => responder("aceito")} className="rounded-full bg-noite px-5 py-2 text-[14px] font-medium text-white">
            Pode contar
          </button>
          <button
            type="button"
            onClick={() => responder("recusado")}
            className="rounded-full border border-linha bg-white px-5 py-2 text-[14px] font-medium text-grafite hover:border-violeta"
          >
            Prefiro que não
          </button>
          <Link href="/privacidade" className="ml-auto text-[13px] text-azul underline underline-offset-4 md:ml-0 md:text-center">
            Saiba mais
          </Link>
        </div>
      </div>
    </div>
  );
}
