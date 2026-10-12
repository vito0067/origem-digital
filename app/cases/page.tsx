import type { Metadata } from "next";
import Link from "next/link";
import PaginaSimples from "@/components/PaginaSimples";
import { Seta } from "@/components/Icones";
import { cases } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Cases — Origem Digital",
  description: "Projetos reais da Origem Digital: o problema, a solução e o resultado.",
  alternates: { canonical: "/cases" },
};

export default function CasesIndex() {
  return (
    <PaginaSimples
      etiqueta="Cases"
      largura="larga"
      titulo={
        <>
          Projetos <span className="text-azul">de verdade</span>.
        </>
      }
    >
      <div className="flex flex-col gap-4">
        {cases.map((c) => (
          <Link
            key={c.slug}
            href={`/cases/${c.slug}`}
            className="group block rounded-3xl border border-linha bg-white px-7 pb-7 pt-6 shadow-cartao transition-transform duration-300 hover:-translate-y-1 sm:px-9"
          >
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-azul">{c.segmento}</p>
            <h2 className="mt-3 font-display text-[1.6rem] font-medium tracking-[-0.03em] text-tinta transition-colors group-hover:text-azul">
              {c.titulo}
            </h2>
            <p className="mt-3 line-clamp-2 text-[16px] leading-relaxed text-grafite">{c.problema}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-azul">
              Ver case completo
              <Seta className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </PaginaSimples>
  );
}
