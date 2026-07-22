import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="sobre" className="relative py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-5">
        <div className="md:col-span-3">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-cyan-neon">
              Sobre a empresa
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
              Tecnologia e presença digital para{" "}
              <span className="text-gradient-neon">pequenas empresas</span>.
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-slate-400">
              A Origem Digital é uma empresa brasileira especializada em
              transformação digital para pequenos negócios. Muitas empresas
              perdem clientes todos os dias por não terem um site profissional
              ou por demorarem para responder no WhatsApp — a Origem Digital
              resolve exatamente isso, com soluções rápidas, acessíveis e sob
              medida.
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-2">
          <Reveal delay={150}>
            <aside className="glass-card h-full p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-violet-neon">
                Missão
              </p>
              <p className="mt-4 font-display text-lg font-medium leading-relaxed text-white">
                Ajudar pequenas empresas a darem o próximo passo no digital,
                com presença online profissional e atendimento automatizado que
                nunca dorme.
              </p>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
