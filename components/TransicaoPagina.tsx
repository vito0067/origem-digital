"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * A tela fecha e abre quando se troca de página.
 *
 * Sem isto, ir para /cases ou /termos é um pisca-pisca: a página some,
 * dá um branco e a outra aparece. Com a cortina, o site deixa de
 * parecer "várias páginas soltas" e passa a parecer um aplicativo —
 * é a mudança que mais altera a percepção por menos código.
 *
 * COMO FUNCIONA:
 *  1. A pessoa clica num link interno → a cortina sobe (0,35s).
 *  2. O Next troca a página por baixo dela.
 *  3. O endereço muda → a cortina desce e some.
 *
 * DETALHES QUE EVITAM DOR DE CABEÇA:
 *
 * - Só entra em links internos. Link de WhatsApp, e-mail, âncora da
 *   mesma página e link que abre em outra aba passam direto — fechar a
 *   tela para algo que nem vai sair da página seria só atraso.
 *
 * - Ctrl+clique, clique do meio e afins abrem em nova aba. A página
 *   atual não vai a lugar nenhum, então a cortina não sobe.
 *
 * - Tem uma SOLTA DE SEGURANÇA de 1,2s. Se por qualquer motivo a
 *   navegação não acontecer (clique cancelado, rede parada), a cortina
 *   abre sozinha em vez de deixar a pessoa olhando para uma tela
 *   escura sem saída. Nenhuma animação pode prender o site.
 *
 * - Quem pediu menos movimento no sistema não vê cortina nenhuma.
 */

/** Quanto tempo a cortina leva para cobrir e para sair. */
const DURACAO = 350;
/**
 * O mínimo que a cortina fica fechada antes de reabrir.
 *
 * Sem isso o efeito não existe na prática: navegar entre páginas do
 * próprio site é quase instantâneo (o Next já carregou a página antes
 * do clique), então a cortina fechava e reabria no mesmo piscar —
 * resultado igual ao de não ter cortina nenhuma, mas com o código
 * todo lá. Segurar por este tempo é o que faz a troca ser percebida
 * como uma transição, e não como um susto.
 */
const MINIMO_FECHADA = 300;
/** Se a navegação não vier neste tempo, a cortina abre de qualquer jeito. */
const SOLTA_DE_SEGURANCA = 1200;

export default function TransicaoPagina() {
  const caminho = usePathname();
  const [fechando, setFechando] = useState(false);
  const primeiraVez = useRef(true);
  const relogio = useRef<ReturnType<typeof setTimeout>>();
  /** Instante em que a cortina começou a fechar, para medir o mínimo. */
  const fechouEm = useRef(0);

  // Fecha ao clicar num link que realmente troca de página
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const aoClicar = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link = (e.target as HTMLElement | null)?.closest?.("a");
      if (!link) return;
      if (link.target && link.target !== "_self") return;
      if (link.hasAttribute("download")) return;

      const destino = link.getAttribute("href") ?? "";
      if (!destino || destino.startsWith("#")) return;
      if (!destino.startsWith("/")) return; // externo: wa.me, mailto, instagram

      // mesmo endereço: não há troca de página para cobrir
      const so = destino.split("#")[0].split("?")[0];
      if (so === caminho) return;

      setFechando(true);
      fechouEm.current = performance.now();

      clearTimeout(relogio.current);
      relogio.current = setTimeout(() => setFechando(false), SOLTA_DE_SEGURANCA);
    };

    document.addEventListener("click", aoClicar, { capture: true });
    return () => document.removeEventListener("click", aoClicar, { capture: true });
  }, [caminho]);

  // Abre quando a página nova chega — mas nunca antes do tempo mínimo
  useEffect(() => {
    if (primeiraVez.current) {
      primeiraVez.current = false;
      return;
    }
    clearTimeout(relogio.current);

    const jaFechada = performance.now() - fechouEm.current;
    const esperar = Math.max(0, MINIMO_FECHADA - jaFechada);
    relogio.current = setTimeout(() => setFechando(false), esperar);
  }, [caminho]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[100] bg-abyss transition-opacity ease-out ${
        fechando ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionDuration: `${DURACAO}ms` }}
    >
      {/* Um fio de luz no meio da cortina: dá o que olhar durante a
          fração de segundo em que a tela está coberta. */}
      <span className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-cyan-neon/60 to-transparent" />
    </div>
  );
}
