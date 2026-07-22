import Reveal from "./Reveal";
import NeonButton from "./NeonButton";

const benefits = [
  "Diagnóstico gratuito e sem compromisso",
  "Projeto no ar em 1 a 2 semanas",
  "Suporte contínuo incluso",
];

export default function FinalCta() {
  return (
    <section id="contato" className="relative overflow-hidden py-28">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[480px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-neon/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="absolute right-[10%] top-[20%] h-64 w-64 rounded-full bg-violet-neon/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-bold text-white sm:text-5xl">
            Cada dia sem site e sem IA é{" "}
            <span className="text-gradient-neon">cliente indo embora</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-slate-400">
            Sua empresa no digital. Seus clientes sempre com você. Comece hoje
            com um diagnóstico gratuito no WhatsApp — em poucos minutos você
            sabe exatamente o que o seu negócio precisa.
          </p>

          <ul className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-6">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm text-slate-300">
                <span aria-hidden className="font-bold text-cyan-neon">✓</span>
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex justify-center">
            <NeonButton
              href="https://wa.me/5511939299209?text=Ol%C3%A1!%20Quero%20meu%20diagn%C3%B3stico%20gratuito%20agora."
              external
            >
              Quero meu diagnóstico gratuito
            </NeonButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
