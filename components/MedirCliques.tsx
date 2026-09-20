"use client";

import { useEffect } from "react";
import { medir, EVENTOS } from "@/lib/medir";

/**
 * Anota todo clique em link de WhatsApp do site, seja qual for.
 *
 * Existem oito botões de WhatsApp espalhados pela página — capa, menu,
 * demonstração, planos, calculadora, diagnóstico, FAQ e fechamento —
 * mais o botão flutuante. Em vez de marcar um por um (e esquecer o
 * próximo que for criado), este componente escuta os cliques da página
 * inteira e identifica o botão pelo texto dele.
 *
 * Vantagem prática: quando você criar um botão novo, ele já entra na
 * medição sozinho, sem ninguém lembrar de nada.
 *
 * O que fica registrado é só o texto do botão e a seção onde ele está.
 * Nenhum dado da pessoa.
 */
export default function MedirCliques() {
  useEffect(() => {
    const aoClicar = (e: MouseEvent) => {
      const alvo = (e.target as HTMLElement | null)?.closest?.("a");
      if (!alvo) return;

      const destino = alvo.getAttribute("href") || "";
      if (!destino.includes("wa.me")) return;

      // De qual seção partiu o clique: é isso que responde "as pessoas
      // chamam no WhatsApp depois de ver o preço ou antes?"
      const secao =
        alvo.closest("section")?.id ||
        alvo.closest("header")?.tagName.toLowerCase() ||
        "flutuante";

      medir(EVENTOS.whatsapp, {
        botao: (alvo.textContent || "").trim().slice(0, 60) || "sem texto",
        secao,
      });
    };

    document.addEventListener("click", aoClicar, { capture: true });
    return () => document.removeEventListener("click", aoClicar, { capture: true });
  }, []);

  return null;
}
