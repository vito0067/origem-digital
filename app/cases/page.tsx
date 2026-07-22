import type { Metadata } from "next";
import Link from "next/link";
import { cases } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Cases — Origem Digital",
  description: "Projetos reais: problema, solução, tecnologias e resultado.",
};

export default function CasesIndex() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-28">
      <p className="text-xs font-medium uppercase tracking-[0.35em] text-cyan-neon">
        Cases
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
        Projetos <span className="text-gradient-neon">de verdade</span>.
      </h1>

      <div className="mt-12 flex flex-col gap-5">
        {cases.map((c) => (
          <Link
            key={c.slug}
            href={`/cases/${c.slug}`}
            className="glass-card group block p-7 transition-all hover:border-cyan-neon/50 hover:shadow-neon-cyan"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-neon">
              {c.segmento}
            </p>
            <h2 className="mt-2 font-display text-xl font-bold text-white group-hover:text-cyan-neon">
              {c.titulo}
            </h2>
            <p className="mt-2 line-clamp-2 text-sm text-slate-400">{c.problema}</p>
            <span className="mt-4 inline-block text-sm text-cyan-neon">
              Ver case completo →
            </span>
          </Link>
        ))}
      </div>

      <Link href="/" className="mt-12 inline-block text-sm text-cyan-neon hover:underline">
        ← Voltar ao início
      </Link>
    </main>
  );
}
