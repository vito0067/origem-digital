import Reveal from "./Reveal";

/**
 * PLACEHOLDERS DE PROVA SOCIAL — substituir pelos números oficiais
 * assim que existirem. Tudo centralizado aqui para trocar num lugar só.
 */
const METRICS = [
  { value: "+XX", label: "Empresas atendidas" }, // PLACEHOLDER
  { value: "1–2 semanas", label: "Tempo médio de entrega" },
  { value: "24/7", label: "Atendimento com IA" },
  { value: "★★★★★", label: "Satisfação dos clientes" }, // PLACEHOLDER
];

export default function SocialProof() {
  return (
    <section aria-label="Resultados" className="relative -mt-2 pb-4 pt-10">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="glass-card grid grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
            {METRICS.map((m) => (
              <div key={m.label} className="p-6 text-center">
                <p className="font-display text-2xl font-bold text-gradient-neon">
                  {m.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-slate-400">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
