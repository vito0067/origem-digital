"use client";

import { useEffect, useState } from "react";

/**
 * Quanto falta para a oferta do mês acabar.
 *
 * A conta é real: mede até o último segundo do mês corrente. Nada de
 * contador falso que reinicia quando a página recarrega.
 *   mais de 1 dia → "faltam 11 dias!"; último dia → "faltam 7 horas!";
 *   última hora → "faltam 42 minutos!".
 *
 * Renderiza vazio no servidor e preenche no navegador: a data do
 * servidor e a do visitante podem não bater.
 */
export default function ContagemOferta({ className = "" }: { className?: string }) {
  const [texto, setTexto] = useState("");

  useEffect(() => {
    const calcular = () => {
      const agora = new Date();
      const fim = new Date(agora.getFullYear(), agora.getMonth() + 1, 0, 23, 59, 59);
      const resta = fim.getTime() - agora.getTime();
      if (resta <= 0) {
        setTexto("");
        return;
      }
      const dias = Math.floor(resta / 86400000);
      const horas = Math.floor((resta % 86400000) / 3600000);
      const minutos = Math.floor((resta % 3600000) / 60000);
      if (dias >= 1) setTexto(`${dias} ${dias === 1 ? "dia" : "dias"}`);
      else if (horas >= 1) setTexto(`${horas} ${horas === 1 ? "hora" : "horas"}`);
      else setTexto(`${minutos} ${minutos === 1 ? "minuto" : "minutos"}`);
    };
    calcular();
    const relogio = setInterval(calcular, 60000);
    return () => clearInterval(relogio);
  }, []);

  if (!texto) return null;
  return <span className={className}>faltam {texto} para acabar!</span>;
}
