import Reveal from "./Reveal";
import NeonButton from "./NeonButton";

const steps = [
  { n: "01", title: "Diagnóstico", text: "Entendemos seu negócio e mapeamos onde você está perdendo clientes hoje." },
  { n: "02", title: "Estratégia", text: "Desenhamos a presença digital certa para o seu caso — sem pacote engessado." },
  { n: "03", title: "Site", text: "Sua vitrine profissional no ar em até 2 semanas, otimizada para o Google." },
  { n: "04", title: "IA", text: "Agente treinado com seus serviços e preços, atendendo o WhatsApp 24/7." },
  { n: "05", title: "Automação", text: "Agendamentos, registro de leads e follow-ups acontecendo sem esforço." },
  { n: "06", title: "Suporte", text: "Acompanhamento contínuo, manutenção e melhorias mês a mês." },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-cyan-neon">
            Nosso método proprietário
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl">
            Sistema <span className="text-gradient-neon">Origem</span>
            <sup className="text-lg align-super">™</sup>
          </h2>
          <p className="mt-4 max-w-xl text-slate-400">
            Seis etapas, uma única equipe, um resultado: seu negócio vendendo
            no digital sem depender de você responder mensagem.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <li className="glass-card relative h-full p-6">
                <span className="font-display text-sm font-bold text-gradient-neon">{s.n}</span>
                <h3 className="mt-3 font-display text-base font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={250}>
          <div className="mt-12 flex justify-center">
            <NeonButton
              href="https://wa.me/5511939299209?text=Ol%C3%A1!%20Quero%20come%C3%A7ar%20pelo%20Sistema%20Origem%20com%20o%20diagn%C3%B3stico%20gratuito."
              external
            >
              Começar pelo diagnóstico gratuito
            </NeonButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
