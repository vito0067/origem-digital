import Reveal from "./Reveal";
import NeonButton from "./NeonButton";
import TextReveal from "./TextReveal";
import Magnetic from "./Magnetic";

/**
 * FECHAMENTO
 *
 * A frase de impacto ocupa a esquerda, grande, entrando palavra por
 * palavra. O cartão de ação fica à direita, destacado do fundo. É o
 * último bloco antes do rodapé: a frase convence e o botão está ali
 * do lado, sem a pessoa precisar procurar.
 */

const beneficios = [
  "Diagnóstico gratuito e sem compromisso",
  "Projeto no ar em 1 a 2 semanas",
  "Suporte contínuo incluso",
];

export default function FinalCta() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden border-t border-white/[0.06] py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="brilho-descida absolute -left-20 top-1/2 h-[480px] w-[720px] -translate-y-1/2 rounded-full blur-[140px]"
      />
      <div
        aria-hidden
        className="brilho-descida absolute right-[6%] top-[15%] h-64 w-64 rounded-full blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---- A frase ---- */}
          <div className="lg:col-span-7">
            <TextReveal
              como="h2"
              passo={70}
              origem="esquerda"
              className="equilibrado font-display text-[2.4rem] font-bold leading-[1.06] text-white sm:text-5xl lg:text-[3.6rem]"
            >
              Cada dia sem site e sem IA é
            </TextReveal>
            {/* Bloco só, e não palavra por palavra: o degradê do
                `text-gradient-neon` não sobrevive à máscara que o
                TextReveal coloca em volta de cada palavra. */}
            <Reveal de="esquerda" delay={420} distancia={36}>
              <p className="equilibrado font-display text-[2.4rem] font-bold leading-[1.06] text-gradient-neon sm:text-5xl lg:text-[3.6rem]">
                cliente indo embora.
              </p>
            </Reveal>

            <Reveal de="esquerda" delay={200}>
              <p className="mt-7 max-w-lg leading-relaxed text-slate-400">
                Sua empresa no digital. Seus clientes sempre com você. Comece
                hoje com um diagnóstico gratuito no WhatsApp — em poucos minutos
                você sabe exatamente o que o seu negócio precisa.
              </p>
            </Reveal>
          </div>

          {/* ---- A ação ---- */}
          <Reveal de="direita" delay={160} className="lg:col-span-5">
            <div className="glass-card p-8 ring-1 ring-cyan-neon/25 sm:p-9">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-neon">
                Diagnóstico gratuito
              </p>

              <ul className="mt-6 flex flex-col gap-3">
                {beneficios.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-sm text-slate-300"
                  >
                    <span aria-hidden className="mt-0.5 font-bold text-cyan-neon">
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Magnetic>
                  <NeonButton
                    href="https://wa.me/5511939299209?text=Ol%C3%A1!%20Quero%20meu%20diagn%C3%B3stico%20gratuito%20agora."
                    external
                  >
                    Quero meu diagnóstico gratuito
                  </NeonButton>
                </Magnetic>
              </div>

              {/* O atendimento é todos os dias, a qualquer hora — não há
                  janela de horário comercial. Se um dia isso mudar, mude
                  também a regra de transferência para humano da Aurora,
                  no n8n: as duas precisam contar a mesma história. */}
              <p className="mt-4 text-xs text-slate-500">
                Resposta pelo WhatsApp (11) 93929-9209.{" "}
                <span className="text-slate-400">
                  Todos os dias, a qualquer hora
                </span>{" "}
                — inclusive fim de semana, feriado e madrugada.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
