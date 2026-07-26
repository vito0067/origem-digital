import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

/**
 * GALERIA — os 3 primeiros itens são frames reais da demonstração do
 * agente (com os preços reais da Origem Digital). Os itens marcados
 * com `placeholder: true` são espaços para prints reais de projetos:
 * substitua o arquivo em /public/media/ e remova a flag.
 */
const items = [
  {
    src: "/media/print-agente-1.jpg",
    caption: "Agente respondendo com preços reais em segundos",
    tag: "Agente de IA · demonstração",
  },
  {
    src: "/media/print-agente-2.jpg",
    caption: "Oferecendo horários e conduzindo o agendamento",
    tag: "Agente de IA · demonstração",
  },
  {
    src: "/media/print-agente-3.jpg",
    caption: "Atendimento concluído com agendamento confirmado",
    tag: "Agente de IA · demonstração",
  },
];

export default function Showcase() {
  return (
    <section id="na-pratica" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-violet-neon">
            Na prática
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl">
            Menos promessa, mais{" "}
            <span className="text-gradient-neon">tela funcionando</span>.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.caption} delay={i * 90}>
              <figure className="glass-card overflow-hidden">
                {"placeholder" in item && item.placeholder ? (
                  <div className="flex aspect-[3/4] items-center justify-center border-b border-dashed border-white/15 bg-white/[0.02]">
                    <p className="max-w-[200px] text-center text-xs uppercase tracking-widest text-slate-500">
                      Espaço reservado
                      <br />
                      para print real
                    </p>
                  </div>
                ) : (
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={item.src as string}
                      alt={item.caption}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover object-top"
                    />
                  </div>
                )}
                <figcaption className="p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-neon">
                    {item.tag}
                  </p>
                  <p className="mt-1.5 text-sm text-slate-300">{item.caption}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-10 text-center">
            <Link
              href="/cases"
              className="text-sm font-semibold text-cyan-neon hover:underline"
            >
              Ver cases completos — problema, solução e resultado →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
