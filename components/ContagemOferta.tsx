"use client";

import { useEffect, useState } from "react";

/**
 * Quanto falta para a oferta do mês acabar.
 *
 * A conta é real: pega o último instante do mês corrente e mede a
 * diferença. Nada de contador falso que reinicia quando a página
 * recarrega — isso é o tipo de coisa que o cliente percebe e nunca
 * mais confia no que o site diz.
 *
 * Em fevereiro, em mês de 31 dias, na virada do ano: sempre certo,
 * porque o mês seguinte é calculado pelo próprio JavaScript.
 *
 * O texto muda de tom conforme aperta:
 *   - mais de 1 dia  → "faltam 11 dias"
 *   - último dia     → "faltam 7 horas"
 *   - última hora    → "faltam 42 minutos"
 *
 * Renderiza vazio no servidor e preenche no navegador: a data do
 * servidor e a do visitante podem não bater, e um número piscando e
 * trocando logo na chegada estraga justamente a impressão de cuidado.
 */
export default function ContagemOferta({
  className = "",
}: {
  className?: string;
}) {
  const [texto, setTexto] = useState("");

  useEffect(() => {
    const calcular = () => {
      const agora = new Date();
      // dia 0 do mês seguinte = último dia deste mês, no último segundo
      const fim = new Date(
        agora.getFullYear(),
        agora.getMonth() + 1,
        0,
        23,
        59,
        59
      );
      const resta = fim.getTime() - agora.getTime();
      if (resta <= 0) {
        setTexto("");
        return;
      }

      const dias = Math.floor(resta / 86400000);
      const horas = Math.floor((resta % 86400000) / 3600000);
      const minutos = Math.floor((resta % 3600000) / 60000);

      if (dias >= 1) {
        setTexto(`${dias} ${dias === 1 ? "dia" : "dias"}`);
      } else if (horas >= 1) {
        setTexto(`${horas} ${horas === 1 ? "hora" : "horas"}`);
      } else {
        setTexto(`${minutos} ${minutos === 1 ? "minuto" : "minutos"}`);
      }
    };

    calcular();
    // de minuto em minuto: mais rápido do que isso só gasta bateria,
    // porque o menor número que aparece na tela é o minuto
    const relogio = setInterval(calcular, 60000);
    return () => clearInterval(relogio);
  }, []);

  if (!texto) return null;

  return (
    <span className={className}>
      <span
        aria-hidden
        className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-neon align-middle"
      />
      Faltam <strong className="font-semibold text-white">{texto}</strong> para
      acabar
    </span>
  );
}
