"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import MedirCliques from "./MedirCliques";
import { lerEscolha } from "@/lib/consentimento";

/**
 * Liga a medição — mas só depois de a pessoa permitir.
 *
 * O ponto todo é que o "prefiro que não" do aviso seja de verdade:
 * enquanto a resposta não for "aceito", nada disto entra na página.
 * Não é um interruptor que desliga o envio depois de carregar; o
 * código de medição simplesmente não é baixado.
 *
 * Fica de olho no evento que o aviso dispara ao ser respondido, para
 * a medição começar na hora em que a pessoa clica em "pode contar" —
 * sem precisar recarregar a página.
 *
 * Analytics conta quantas pessoas entram, de onde vêm e até onde
 * descem. SpeedInsights mede a velocidade real nos celulares de quem
 * visita, não a do seu computador. Os dois só funcionam com o site
 * publicado na Vercel, e precisam ser ativados uma vez no painel de
 * lá, em Analytics e em Speed Insights.
 */
export default function Medicao() {
  const [permitido, setPermitido] = useState(false);

  useEffect(() => {
    setPermitido(lerEscolha() === "aceito");

    const aoResponder = (e: Event) => {
      const escolha = (e as CustomEvent<string>).detail;
      setPermitido(escolha === "aceito");
    };
    window.addEventListener("origem-consentimento", aoResponder);
    return () => window.removeEventListener("origem-consentimento", aoResponder);
  }, []);

  if (!permitido) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
      <MedirCliques />
    </>
  );
}
