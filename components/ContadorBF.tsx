"use client";

import { useEffect, useState } from "react";
import { BLACK_FRIDAY } from "@/lib/precos";

/**
 * "faltam 22 dias" / "faltam 5 h 12 min" / "último dia".
 *
 * A data é REAL (30/11, 23h59, horário de Brasília), então a contagem não é
 * truque de pressão: é só o relógio da promoção. Calculada no navegador
 * depois de a página abrir, para não dar diferença entre servidor e tela.
 */
export function faltam(agora = Date.now()) {
  const ms = BLACK_FRIDAY.fim.getTime() - agora;
  if (ms <= 0) return "últimas horas";
  const min = Math.floor(ms / 60000);
  const dias = Math.floor(min / 1440);
  const h = Math.floor((min % 1440) / 60);
  if (dias >= 2) return `faltam ${dias} dias`;
  if (dias === 1) return `falta 1 dia e ${h} h`;
  return `faltam ${h} h ${String(min % 60).padStart(2, "0")} min`;
}

export default function ContadorBF() {
  const [texto, setTexto] = useState("");
  useEffect(() => {
    const atualiza = () => setTexto(faltam());
    atualiza();
    const t = setInterval(atualiza, 60000);
    return () => clearInterval(t);
  }, []);
  return <>{texto}</>;
}
