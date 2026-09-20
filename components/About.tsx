import Reveal from "./Reveal";
import TituloSecao from "./TituloSecao";
import Holofote from "./Holofote";

/**
 * SOBRE — agora com o fluxo de venda dentro dela.
 *
 * Antes eram duas seções: "Sobre a empresa" e, logo abaixo, uma fileira
 * de cinco caixinhas com o fluxo da venda. Duas paradas para dizer uma
 * coisa só. Agora a apresentação fica presa à esquerda enquanto o fluxo
 * corre à direita — a pessoa lê quem somos e vê o que fazemos ao mesmo
 * tempo, em uma seção em vez de duas.
 *
 * Nenhuma frase foi cortada: todo o texto das duas seções antigas está
 * aqui.
 */

const etapas = [
  { label: "Cliente chama", icon: "💬", detalhe: "Chega uma mensagem no WhatsApp" },
  { label: "WhatsApp recebe", icon: "📱", detalhe: "A qualquer hora, inclusive de madrugada" },
  { label: "IA responde", icon: "🤖", detalhe: "Em segundos, com seus preços e serviços" },
  { label: "Horário agendado", icon: "📅", detalhe: "Sem você tocar no celular" },
  { label: "Venda realizada", icon: "✓", detalhe: "O cliente que ia embora ficou" },
];

export default function About() {
  return (
    <section id="sobre" className="relative border-t border-white/[0.06] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ---- Coluna presa: quem somos ---- */}
          <div className="coluna-presa self-start lg:col-span-5">
            <TituloSecao
              etiqueta="Sobre a empresa"
              titulo="Tecnologia e presença digital para pequenas empresas."
            />

            <Reveal de="esquerda" delay={120}>
              <p className="mt-6 max-w-lg leading-relaxed text-slate-400">
                A Origem Digital é uma empresa brasileira especializada em
                transformação digital para pequenos negócios. Muitas empresas
                perdem clientes todos os dias por não terem um site profissional
                ou por demorarem para responder no WhatsApp — a Origem Digital
                resolve exatamente isso, com soluções rápidas, acessíveis e sob
                medida.
              </p>
            </Reveal>

            <Reveal de="esquerda" delay={220}>
              <Holofote className="glass-card mt-8 block p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-violet-neon">
                  Missão
                </p>
                <p className="mt-4 font-display text-lg font-medium leading-relaxed text-white">
                  Ajudar pequenas empresas a darem o próximo passo no digital,
                  com presença online profissional e atendimento automatizado que
                  nunca dorme.
                </p>
              </Holofote>
            </Reveal>
          </div>

          {/* ---- Coluna que rola: o fluxo da venda ---- */}
          <div className="lg:col-span-7">
            <Reveal de="direita">
              <p className="text-sm leading-relaxed text-slate-400">
                Do primeiro &ldquo;oi&rdquo; à venda fechada,{" "}
                <span className="text-cyan-neon">em segundos</span> — sem você
                tocar no celular:
              </p>
            </Reveal>

            {/* Cada etapa é uma linha, e uma luz percorre a coluna de cima
                para baixo acendendo uma de cada vez. A fileira horizontal
                antiga só cabia no computador; assim funciona nos dois. */}
            <ol className="relative mt-9">
              <span
                aria-hidden
                className="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-cyan-neon/50 via-violet-neon/30 to-transparent"
              />

              {etapas.map((etapa, i) => (
                <Reveal key={etapa.label} de="direita" delay={i * 90}>
                  <li className="relative flex items-center gap-5 py-3">
                    <span
                      className="flow-node glass-card relative z-10 flex h-14 w-14 shrink-0 items-center justify-center text-xl"
                      style={{ animationDelay: `${i * 1.1}s` }}
                      aria-hidden
                    >
                      {etapa.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-base font-bold text-white">
                        {etapa.label}
                      </p>
                      <p className="mt-0.5 text-sm text-slate-500">
                        {etapa.detalhe}
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className="flow-arrow ml-auto hidden text-lg text-cyan-neon sm:block"
                      style={{ animationDelay: `${i * 1.1 + 0.55}s` }}
                    >
                      {i < etapas.length - 1 ? "↓" : "★"}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        {/* Frase de posicionamento fechando a seção. Era uma seção
            inteira só para ela; aqui ela ganha mais força, porque vem
            logo depois de a pessoa ver o fluxo da venda acontecendo. */}
        <Reveal delay={120}>
          <p className="mx-auto mt-20 max-w-3xl text-center font-display text-2xl font-medium leading-snug text-white sm:text-3xl">
            Não criamos apenas sites.{" "}
            <span className="text-gradient-neon">
              Construímos sistemas que trabalham para a sua empresa 24 horas
              por dia.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
