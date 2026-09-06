import Reveal from "./Reveal";

const chatbot = [
  "Só entende palavra-chave exata",
  "Menu engessado: digite 1, digite 2",
  "Trava quando o cliente foge do roteiro",
  "Repete a mesma resposta pronta",
  "Não conhece seus serviços nem seus preços",
  "Deixa o cliente esperando quando quer fechar",
];

const aurora = [
  "Entende a pergunta escrita do jeito do cliente",
  "Conversa livre, sem menu e sem número para digitar",
  "Responde objeção que não estava no roteiro",
  "Treinada com os seus serviços e a sua tabela de preços",
  "Registra o contato para você não perder o lead",
  "Chama você no WhatsApp na hora que o cliente quer fechar",
];

export default function Comparison() {
  return (
    <section aria-label="Comparativo" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="text-center text-xs font-medium uppercase tracking-[0.35em] text-cyan-neon">
            A pergunta que todo mundo faz
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-bold text-white sm:text-4xl">
            Por que não é um{" "}
            <span className="text-gradient-neon">chatbot comum</span>?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center leading-relaxed text-slate-400">
            Chatbot segue roteiro. A Aurora entende o que a pessoa escreveu e
            responde de acordo — inclusive quando a pergunta não estava
            prevista.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal delay={100}>
            <div className="glass-card h-full border-red-500/20 p-8">
              <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
                Chatbot comum
              </p>
              <ul className="mt-6 flex flex-col gap-3.5">
                {chatbot.map((item) => (
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
                Aurora, da Origem Digital
              </p>
              <ul className="mt-6 flex flex-col gap-3.5">
                {aurora.map((item) => (
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
