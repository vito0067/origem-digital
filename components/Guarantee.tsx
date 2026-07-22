import Reveal from "./Reveal";

export default function Guarantee() {
  return (
    <section aria-label="Garantia" className="relative py-10">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <div className="glass-card flex flex-col items-center gap-5 border-cyan-neon/25 p-8 text-center sm:flex-row sm:text-left">
            {/* selo de escudo */}
            <div
              aria-hidden
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-cyan-neon/50 bg-cyan-neon/10 shadow-neon-cyan"
            >
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="#00F0FF" strokeWidth="1.8">
                <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="font-display text-lg font-bold text-white">
                Garantia de implantação:{" "}
                <span className="text-gradient-neon">14 dias</span>
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                Se o seu projeto não estiver no ar em até 14 dias,
                trabalharemos sem nenhum custo adicional até concluí-lo.
                Simples assim.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
