import Reveal from "./Reveal";

const nodes = [
  { label: "Cliente chama", icon: "💬" },
  { label: "WhatsApp recebe", icon: "📱" },
  { label: "IA responde", icon: "🤖" },
  { label: "Horário agendado", icon: "📅" },
  { label: "Venda realizada", icon: "✓" },
];

/**
 * Fluxo animado em loop: cada nó acende em sequência (delays de CSS)
 * mostrando a venda acontecendo em segundos. Sem JavaScript.
 */
export default function SaleFlow() {
  return (
    <section aria-label="Fluxo de venda" className="relative py-16">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="text-center text-sm text-slate-400">
            Do primeiro &ldquo;oi&rdquo; à venda fechada,{" "}
            <span className="text-cyan-neon">em segundos</span> — sem você tocar
            no celular:
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-0">
            {nodes.map((node, i) => (
              <div key={node.label} className="flex flex-col items-center sm:flex-row">
                <div
                  className="flow-node glass-card flex min-w-[150px] flex-col items-center gap-1.5 px-5 py-4"
                  style={{ animationDelay: `${i * 1.1}s` }}
                >
                  <span aria-hidden className="text-xl">{node.icon}</span>
                  <span className="text-center text-xs font-semibold text-slate-300">
                    {node.label}
                  </span>
                </div>
                {i < nodes.length - 1 && (
                  <span
                    aria-hidden
                    className="flow-arrow px-2 py-1 text-cyan-neon sm:rotate-0 rotate-90"
                    style={{ animationDelay: `${i * 1.1 + 0.55}s` }}
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
