import type { ReactNode } from "react";
import Topo from "./Topo";
import Rodape from "./Rodape";

/**
 * A MOLDURA DAS PÁGINAS DE LEITURA — termos, privacidade, cases.
 *
 * Uma folha de vidro sobre o céu claro. Leitura confortável (linhas
 * curtas, letra de texto), sem enfeite atrapalhando.
 */
export default function PaginaSimples({
  etiqueta,
  titulo,
  apoio,
  largura = "estreita",
  children,
}: {
  etiqueta: string;
  titulo: ReactNode;
  apoio?: ReactNode;
  largura?: "estreita" | "larga";
  children: ReactNode;
}) {
  return (
    <>
      <Topo inicio="/" />
      <main className="ceu-fundo relative pb-24 pt-[120px]">
        <div aria-hidden className="pontos pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
        <div className={`relative mx-auto px-4 sm:px-6 ${largura === "larga" ? "max-w-4xl" : "max-w-3xl"}`}>
          <article className="vidro rounded-[32px] px-6 pb-14 pt-12 shadow-flutua sm:px-14 sm:pt-14">
            <p className="rotulo">{etiqueta}</p>
            <h1 className="equilibrado mt-5 font-display text-[2.3rem] font-medium leading-[1.04] tracking-[-0.04em] text-tinta sm:text-[3rem]">{titulo}</h1>
            {apoio && <div className="mt-4 font-mono text-[13px] text-cinza">{apoio}</div>}
            <div className="mt-10 border-t border-linha pt-10">{children}</div>
          </article>
        </div>
      </main>
      <Rodape prefixo="/" />
    </>
  );
}
