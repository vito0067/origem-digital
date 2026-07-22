import Reveal from "./Reveal";
import NeonButton from "./NeonButton";

export default function AgentDemo() {
  return (
    <section id="demonstracao" className="relative overflow-hidden py-28">
      <div
        aria-hidden
        className="absolute left-[8%] top-1/3 h-72 w-72 rounded-full bg-violet-neon/10 blur-[130px]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
        <Reveal>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-cyan-neon">
              Veja com seus próprios olhos
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
              O agente de IA{" "}
              <span className="text-gradient-neon">atendendo de verdade</span>.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-slate-400">
              Cliente pergunta o preço. O agente responde na hora, apresenta o
              serviço e agenda a conversa — em menos de 2 minutos, sem você
              tocar no celular. É exatamente assim que ele vai trabalhar para o
              seu negócio, 24 horas por dia.
            </p>
            <ul className="mt-7 flex flex-col gap-2.5">
              {[
                "Resposta em segundos, a qualquer hora",
                "Preços e serviços apresentados na conversa",
                "Agendamento fechado sem intervenção humana",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <span aria-hidden className="mt-0.5 font-bold text-cyan-neon">✓</span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <NeonButton
                href="https://wa.me/5511939299209?text=Ol%C3%A1!%20Vi%20a%20demonstra%C3%A7%C3%A3o%20do%20agente%20de%20IA%20e%20quero%20um%20para%20o%20meu%20neg%C3%B3cio."
                external
              >
                Quero um agente assim
              </NeonButton>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="flex justify-center">
            {/* Mockup de celular com o vídeo da conversa */}
            <div className="glass-card w-full max-w-[340px] overflow-hidden rounded-[2.4rem] border-white/15 p-2.5 shadow-neon-cyan">
              <video
                className="w-full rounded-[2rem]"
                src="/media/demo-agente.mp4"
                autoPlay
                muted
                loop
                playsInline
                aria-label="Demonstração do agente de IA respondendo um cliente no WhatsApp e agendando um atendimento"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
