import Image from "next/image";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section id="projetos" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-violet-neon">
            Projetos
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl">
            Trabalhos entregues e{" "}
            <span className="text-gradient-neon">no ar</span>.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass-card mt-14 overflow-hidden lg:grid lg:grid-cols-2">
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px]">
              <Image
                src="/media/print-mundodasa.jpg"
                alt="Site O Mundo da Sá, desenvolvido pela Origem Digital"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-neon">
                Site Profissional · entregue
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
                O Mundo da Sá
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                Layout exclusivo, feito do zero. Otimizado para celular,
                preparado para aparecer no Google e com contato direto pelo
                WhatsApp.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-slate-400">
                <li>Design sob medida, sem template pronto</li>
                <li>Carregamento rápido em qualquer celular</li>
                <li>Indexado no Google desde o primeiro dia</li>
              </ul>
              
                href="https://mundodasa.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-cyan-neon transition hover:bg-white/5"
              >
                Ver site ao vivo →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
