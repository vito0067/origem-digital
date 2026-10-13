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
      className="fixed inset-x-0 bottom-0 z-[95] p-2 sm:bottom-5 sm:p-0"
      style={{ animation: "revelaNaCarga .5s cubic-bezier(.22,1,.36,1) both", ["--de-y" as string]: "14px" }}
    >
      {/* No celular, uma faixa baixa (não cobre o botão da capa); da tela
          média para cima, a placa completa com o título. */}
      <div className="mx-auto flex items-center gap-3 rounded-2xl border border-white bg-white/95 px-3.5 py-2.5 shadow-flutua backdrop-blur-xl sm:block sm:max-w-[44rem] sm:rounded-3xl sm:p-5 md:flex md:items-center md:gap-6">
        <div className="min-w-0 flex-1">
          <p className="hidden font-display text-[15.5px] font-semibold text-tinta sm:block">Um aviso rápido sobre privacidade</p>
          <p className="text-[12.5px] leading-snug text-grafite sm:hidden">
            Sem cookies. Podemos contar visitas de forma anônima?{" "}
            <Link href="/privacidade" className="text-azul underline underline-offset-2">
              Saiba mais
            </Link>
          </p>
          <p className="mt-1.5 hidden text-[13.5px] leading-relaxed text-grafite sm:block">
            Este site não guarda cookies seus. Se você permitir, contamos de forma anônima quais partes da página são mais
            vistas — sem nome, sem telefone, sem identificar você.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 sm:mt-3 sm:flex-wrap sm:gap-2 md:mt-0 md:flex-col md:items-stretch">
          <button type="button" onClick={() => responder("aceito")} className="rounded-full bg-noite px-3.5 py-1.5 text-[13px] font-medium text-white sm:px-5 sm:py-2 sm:text-[14px]">
            <span className="sm:hidden">Pode</span>
            <span className="hidden sm:inline">Pode contar</span>
          </button>
          <button
            type="button"
            onClick={() => responder("recusado")}
            className="rounded-full border border-linha bg-white px-3.5 py-1.5 text-[13px] font-medium text-grafite hover:border-violeta sm:px-5 sm:py-2 sm:text-[14px]"
          >
            <span className="sm:hidden">Não</span>
            <span className="hidden sm:inline">Prefiro que não</span>
          </button>
          <Link href="/privacidade" className="ml-auto hidden text-[13px] text-azul underline underline-offset-4 sm:inline md:ml-0 md:text-center">
            Saiba mais
          </Link>
        </div>
      </div>
    </div>
  );
}
