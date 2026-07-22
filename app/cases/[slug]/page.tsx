import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cases } from "@/lib/cases";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = cases.find((x) => x.slug === params.slug);
  return { title: c ? `${c.titulo} — Case Origem Digital` : "Case" };
}

const Block = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="glass-card p-7">
    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-neon">
      {label}
    </p>
    <div className="mt-3 text-sm leading-relaxed text-slate-300">{children}</div>
  </div>
);

export default function CasePage({ params }: { params: { slug: string } }) {
  const c = cases.find((x) => x.slug === params.slug);
  if (!c) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-28">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-neon">
        {c.segmento}
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
        {c.titulo}
      </h1>

      <div className="mt-10 flex flex-col gap-5">
        <Block label="O problema">{c.problema}</Block>
        <Block label="A solução">{c.solucao}</Block>
        <Block label="Tecnologias utilizadas">
          <div className="flex flex-wrap gap-2">
            {c.tecnologias.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        </Block>
        <Block label="O resultado">{c.resultado}</Block>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <a
          href="https://wa.me/5511939299209?text=Ol%C3%A1!%20Vi%20o%20case%20no%20site%20e%20quero%20um%20projeto%20assim."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl bg-cyan-neon px-7 py-3.5 text-sm font-semibold text-abyss animate-pulse-glow"
        >
          Quero um projeto assim
        </a>
        <Link href="/cases" className="text-sm text-cyan-neon hover:underline">
          ← Todos os cases
        </Link>
      </div>
    </main>
  );
}
