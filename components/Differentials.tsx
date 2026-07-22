import Reveal from "./Reveal";

const items = [
  {
    title: "Atendimento humano e consultivo",
    description:
      "Você fala com gente de verdade, que entende seu negócio antes de propor qualquer coisa. Sem letra miúda, sem surpresa no contrato.",
  },
  {
    title: "IA personalizada para o seu negócio",
    description:
      "Seu agente aprende seus serviços, seus preços e seu jeito de atender — não é um robô genérico de respostas prontas.",
  },
  {
    title: "Entrega rápida de verdade",
    description:
      "Projeto no ar em 1 a 2 semanas. Enquanto outros ainda estão orçando, seus clientes já estão sendo atendidos.",
  },
  {
    title: "Suporte contínuo incluso",
    description:
      "Manutenção e acompanhamento fazem parte dos planos mensais. Você nunca fica na mão depois da entrega.",
  },
  {
    title: "Tecnologia de ponta",
    description:
      "A mesma base de IA e automação usada por grandes empresas — OpenAI, n8n e infraestrutura em nuvem — no tamanho do seu bolso.",
  },
  {
    title: "Soluções sob medida",
    description:
      "Cada tipo de negócio recebe exatamente o que precisa. Nada de pacotes engessados que você paga e não usa.",
  },
];

export default function Differentials() {
  return (
    <section id="diferenciais" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-cyan-neon">
            Diferenciais
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl">
            Feita para o pequeno negócio que quer{" "}
            <span className="text-gradient-neon">resultado, não promessa</span>.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="group glass-card h-full p-7 transition-all duration-300 hover:border-violet-neon/50 hover:shadow-neon-violet">
                <span
                  aria-hidden
                  className="mb-4 block h-1 w-10 rounded-full bg-gradient-to-r from-cyan-neon to-violet-neon"
                />
                <h3 className="font-display text-base font-bold text-white transition-colors group-hover:text-cyan-neon">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
