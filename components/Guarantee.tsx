import Reveal from "./Reveal";

const garantias = [
  {
    titulo: "14 dias de implantação",
    texto: "Se o projeto não estiver no ar no prazo, seguimos trabalhando sem custo adicional até concluir.",
  },
  {
    titulo: "7 dias para desistir",
    texto: "Mudou de ideia na primeira semana? Devolvemos tudo. É o seu direito de arrependimento, previsto em lei.",
  },
  {
    titulo: "30 dias sem multa",
    texto: "No primeiro mês você pode cancelar a qualquer momento, sem pagar nada além do que já foi entregue.",
  },
];

export default function Guarantee() {
  return (
    <section aria-label="Garantias" className="relative py-14">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">
            O risco é <span className="text-gradient-neon">nosso</span>, não seu
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {garantias.map((g, i) => (
            <Reveal key={g.titulo} delay={i * 110}>
              <div className="glass-card h-full border-cyan-neon/25 p-7 text-center">
                <div
                  aria-hidden
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-neon/50 bg-cyan-neon/10 shadow-neon-cyan"
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#00F0FF" strokeWidth="1.8">
                    <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" strokeLinejoin="round" />
                    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="mt-5 font-display text-base font-bold text-white">
                  {g.titulo}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {g.texto}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={340}>
          <p className="mt-8 text-center text-xs text-slate-500">
            Condições completas nos{" "}
            <a href="/termos" className="text-cyan-neon hover:underline">
              Termos de Uso e Contratação
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
