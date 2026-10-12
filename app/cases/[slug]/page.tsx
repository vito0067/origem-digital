import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PaginaSimples from "@/components/PaginaSimples";
import Botao from "@/components/Botao";
import { cases } from "@/lib/cases";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = cases.find((x) => x.slug === params.slug);
  return {
    title: c ? `${c.titulo} — Case Origem Digital` : "Case",
    // Sem descrição própria, o case aparecia no Google com a descrição
    // genérica da capa. O problema do cliente diz muito mais.
    description: c?.problema,
    alternates: { canonical: `/cases/${params.slug}` },
  };
}

/** Problema, solução e resultado: uma linha do tempo de três passos. */
const Bloco = ({ n, label, children, ultimo = false }: { n: string; label: string; children: React.ReactNode; ultimo?: boolean }) => (
  <div className="relative grid gap-3 pb-12 pl-14 last:pb-0">
    {!ultimo && <span aria-hidden className="absolute bottom-0 left-[19px] top-11 w-px bg-linha" />}
    <span
      aria-hidden
      className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl font-mono text-[13px] ${
        ultimo ? "bg-azul text-white" : "border border-linha bg-white text-tinta"
      }`}
    >
      {n}
    </span>
    <p className="pt-2 font-mono text-[12px] uppercase tracking-[0.16em] text-azul">{label}</p>
    <div className="text-[17px] leading-relaxed text-grafite">{children}</div>
  </div>
);

export default function CasePage({ params }: { params: { slug: string } }) {
  const c = cases.find((x) => x.slug === params.slug);
  if (!c) notFound();

  return (
    <PaginaSimples etiqueta={c.segmento} titulo={c.titulo}>
      <div>
        <Bloco n="01" label="O problema">
          {c.problema}
        </Bloco>
        <Bloco n="02" label="A solução">
          {c.solucao}
        </Bloco>
        <Bloco n="03" label="O resultado" ultimo>
          {c.resultado}
        </Bloco>
      </div>

      <div className="mt-14 flex flex-wrap items-center gap-6">
        <Botao href="https://wa.me/5511939299209?text=Ol%C3%A1!%20Vi%20o%20case%20no%20site%20e%20quero%20um%20projeto%20assim.">
          Quero um projeto assim
        </Botao>
        <Link href="/cases" className="text-[15px] font-medium text-grafite transition-colors hover:text-azul">
          ← Todos os cases
        </Link>
      </div>
    </PaginaSimples>
  );
}
