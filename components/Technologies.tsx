import Reveal from "./Reveal";

const capacidades = [
  "Inteligência artificial de última geração",
  "Automação de processos",
  "Atendimento integrado ao WhatsApp",
  "Infraestrutura em nuvem global",
];

export default function Technologies() {
  return (
    <section aria-label="Tecnologia" className="relative py-12">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-slate-500">
            Tecnologia por trás
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {capacidades.map((c, i) => (
              <span key={c} className="flex items-center gap-3">
                <span className="text-xs text-slate-500">{c}</span>
                {i < capacidades.length - 1 && (
                  <span aria-hidden className="text-slate-700">•</span>
                )}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
