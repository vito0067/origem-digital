import Reveal from "./Reveal";
import NeonButton from "./NeonButton";

const faqs = [
  {
    q: "Quanto custa?",
    a: "Sites profissionais a partir de R$ 987 de setup único + R$ 43/mês (com domínio, hospedagem e manutenção básica inclusos). Agentes de IA a partir de R$ 657 de setup + R$ 217/mês. O Pacote Completo tem 10–15% de desconto no setup e mensalidade unificada de R$ 241/mês. No diagnóstico gratuito indicamos exatamente o que faz sentido para o seu caso.",
  },
  {
    q: "Quanto tempo demora?",
    a: "Entre 1 e 2 semanas, tanto para o site quanto para o agente de IA. Você acompanha o progresso e aprova antes de ir ao ar.",
  },
  {
    q: "Como funciona o processo?",
    a: "Diagnóstico gratuito no WhatsApp, planejamento da solução, desenvolvimento sob medida, implantação com testes junto com você e suporte contínuo depois da entrega.",
  },
  {
    q: "Preciso ter domínio ou hospedagem?",
    a: "Não. Domínio, hospedagem e manutenção básica já estão inclusos na mensalidade do site. Se você já tiver um domínio, aproveitamos ele.",
  },
  {
    q: "Como funciona o agente de IA no WhatsApp?",
    a: "Ele responde seus clientes em segundos usando inteligência artificial treinada com as informações do seu negócio: serviços, preços, horários e dúvidas frequentes. Qualifica interessados, registra os contatos e transfere a conversa para você nos momentos importantes.",
  },
  {
    q: "O atendimento é realmente 24 horas?",
    a: "Sim. O agente funciona em nuvem, sem depender do seu celular ligado. Madrugada, feriado ou horário de pico: nenhuma mensagem fica sem resposta.",
  },
  {
    q: "Posso personalizar o site e o agente?",
    a: "Totalmente. O site segue a identidade visual da sua marca e o agente é configurado com o seu tom de atendimento. Ajustes pontuais depois da entrega custam a partir de R$ 97 (site) e R$ 147 (agente) — ou entram no seu plano mensal.",
  },
  {
    q: "Vocês oferecem suporte depois da entrega?",
    a: "Sim, o suporte contínuo está incluso nos planos mensais: manutenção, correções e acompanhamento para o digital nunca parar.",
  },
  {
    q: "E se o projeto atrasar?",
    a: "Temos garantia de implantação: se o seu projeto não estiver no ar em até 14 dias, trabalhamos sem nenhum custo adicional até concluí-lo.",
  },
  {
    q: "E se eu quiser cancelar?",
    a: "Sem fidelidade escondida: conversamos abertamente sobre prazos e condições antes de qualquer contrato. Transparência faz parte do nosso jeito de trabalhar.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="relative py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="text-center text-xs font-medium uppercase tracking-[0.35em] text-violet-neon">
            Perguntas frequentes
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-bold text-white sm:text-4xl">
            Tudo o que você precisa saber{" "}
            <span className="text-gradient-neon">antes de decidir</span>.
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <details className="glass-card group overflow-hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display text-sm font-semibold text-white transition-colors hover:text-cyan-neon [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden
                    className="shrink-0 text-cyan-neon transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-slate-400">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-12 flex justify-center">
            <NeonButton
              href="https://wa.me/5511939299209?text=Ol%C3%A1!%20Tenho%20uma%20d%C3%BAvida%20sobre%20os%20servi%C3%A7os."
              variant="ghost"
              external
            >
              Ainda tem dúvidas? Chama no WhatsApp
            </NeonButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
