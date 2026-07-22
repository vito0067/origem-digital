import Reveal from "./Reveal";

const techs = [
  "OpenAI",
  "Claude",
  "n8n",
  "WhatsApp Business",
  "HostGator",
  "Cloudfy",
  "APIs e Automações",
];

export default function Technologies() {
  return (
    <section aria-label="Tecnologias" className="relative py-16">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Construído com tecnologia de ponta
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {techs.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 font-display text-sm text-slate-300 backdrop-blur-md transition-colors hover:border-cyan-neon/40 hover:text-cyan-neon"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
