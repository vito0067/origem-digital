import Reveal from "./Reveal";

const sem = [
  "Demora para responder",
  "Perde clientes todos os dias",
  "Sem site — invisível no Google",
  "Atendimento manual, preso ao celular",
];

const com = [
  "Responde em segundos",
  "IA atendendo 24 horas por dia",
  "Site profissional no ar",
  "Mais vendas, menos esforço",
];

export default function Comparison() {
  return (
    <section aria-label="Comparativo" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-bold text-white sm:text-4xl">
            A diferença é{" "}
            <span className="text-gradient-neon">simples de enxergar</span>.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal delay={100}>
            <div className="glass-card h-full border-red-500/20 p-8">
              <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
                Sem a Origem Digital
              </p>
              <ul className="mt-6 flex flex-col gap-3.5">
                {sem.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-400">
                    <span aria-hidden className="mt-0.5 font-bold text-red-400">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="glass-card h-full p-8 ring-1 ring-cyan-neon/30 shadow-neon-cyan">
              <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-gradient-neon">
                Com a Origem Digital
              </p>
              <ul className="mt-6 flex flex-col gap-3.5">
                {com.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white">
                    <span aria-hidden className="mt-0.5 font-bold text-cyan-neon">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
