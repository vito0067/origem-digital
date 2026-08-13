import Reveal from "./Reveal";
import NeonButton from "./NeonButton";

const WA = "https://wa.me/5511939299209?text=";

type Service = {
  eyebrow: string;
  title: string;
  pain: string;
  bullets: string[];
  price: string;
  priceNote: string;
  cta: string;
  ctaMsg: string;
  accent: "cyan" | "violet";
  highlight?: boolean;
};

const services: Service[] = [
  {
    eyebrow: "Presença online",
    title: "Sites Profissionais",
    pain: "Quem não te encontra no Google, fecha com o concorrente que aparece.",
    bullets: [
      "Design sob medida, alinhado à sua marca",
      "Rápido, responsivo e otimizado para o Google",
      "Botão direto para o seu WhatsApp",
      "Domínio, hospedagem e manutenção inclusos",
      "No ar em 1 a 2 semanas",
    ],
    price: "a partir de R$ 987",
    priceNote: "setup único + R$ 43/mês · versão completa com blog e formulários: R$ 1.647 + R$ 54/mês",
    cta: "Quero um site profissional",
    ctaMsg: "Ol%C3%A1!%20Quero%20um%20site%20profissional%20para%20meu%20neg%C3%B3cio.",
    accent: "cyan",
  },
  {
    eyebrow: "Atendimento inteligente",
    title: "Agentes de IA no WhatsApp",
    pain: "Cada mensagem sem resposta rápida é um cliente indo embora.",
    bullets: [
      "Responde clientes em segundos, 24 horas por dia",
      "Apresenta serviços e tira dúvidas em tempo real",
      "Qualifica leads e registra interessados",
      "Transfere para você nos momentos decisivos",
      "Funcionando em 1 a 2 semanas",
    ],
    price: "a partir de R$ 657",
    priceNote: "setup único + R$ 217/mês · versão avançada com CRM e handoff: R$ 1.097 + R$ 327/mês",
    cta: "Quero automatizar meu atendimento",
    ctaMsg: "Ol%C3%A1!%20Quero%20automatizar%20meu%20atendimento%20no%20WhatsApp%20com%20IA.",
    accent: "violet",
  },
  {
    eyebrow: "Presença digital completa",
    title: "Pacote Completo",
    pain: "O cliente te encontra no Google e é atendido na hora — do primeiro clique ao fechamento.",
    bullets: [
      "Site profissional + agente de IA integrados",
      "12% de desconto no setup combinado",
      "Mensalidade unificada de R$ 260/mês",
      "Uma única equipe cuidando de tudo",
      "Suporte contínuo incluso",
    ],
    price: "setup com desconto",
    priceNote: "10–15% off no setup somado + mensalidade unificada de R$ 260/mês",
    cta: "Quero o pacote completo",
    ctaMsg: "Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20o%20Pacote%20Completo%20(site%20%2B%20agente%20de%20IA).",
    accent: "cyan",
    highlight: true,
  },
];

const accentText = { cyan: "text-cyan-neon", violet: "text-violet-neon" };
const accentShadow = {
  cyan: "hover:shadow-neon-cyan hover:border-cyan-neon/50",
  violet: "hover:shadow-neon-violet hover:border-violet-neon/50",
};

export default function Services() {
  return (
    <section id="servicos" className="relative py-28">
      <div aria-hidden className="neon-grid absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-violet-neon">
            Serviços
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl">
            Escolha como o seu negócio vai{" "}
            <span className="text-gradient-neon">parar de perder clientes</span>.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 120}>
              <article
                className={`glass-card relative flex h-full flex-col p-8 transition-all duration-300 ${accentShadow[s.accent]} ${
                  s.highlight ? "ring-1 ring-cyan-neon/30" : ""
                }`}
              >
                {s.highlight && (
                  <span className="absolute -top-3 right-6 rounded-full border border-cyan-neon/50 bg-abyss px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-cyan-neon">
                    Melhor custo-benefício
                  </span>
                )}
                <p className={`text-[11px] font-semibold uppercase tracking-[0.25em] ${accentText[s.accent]}`}>
                  {s.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-xl font-bold text-white">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm italic leading-relaxed text-slate-400">
                  {s.pain}
                </p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span aria-hidden className={`mt-0.5 shrink-0 font-bold ${accentText[s.accent]}`}>
                        ✓
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="font-display text-lg font-bold text-white">
                    {s.price}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    {s.priceNote}
                  </p>
                </div>
                <div className="mt-6">
                  <NeonButton href={`${WA}${s.ctaMsg}`} variant={s.highlight ? "primary" : "ghost"} external>
                    {s.cta}
                  </NeonButton>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-8 text-center text-xs text-slate-500">
            Manutenções avulsas: ajuste simples de site R$ 97 · ajuste de
            comportamento do agente R$ 147
          </p>
        </Reveal>
      </div>
    </section>
  );
}
