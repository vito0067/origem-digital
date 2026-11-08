import Reveal from "./Reveal";
import { depoimentos } from "@/lib/depoimentos";

/** Prova social: aparece SÓ quando há depoimento real e autorizado em lib/depoimentos.ts. */
export default function Depoimentos() {
  if (depoimentos.length === 0) return null;
  return (
    <section aria-label="Depoimentos de clientes" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-pagina px-5 sm:px-8">
        <Reveal>
          <p className="rotulo">Quem já tem</p>
          <h2 className="equilibrado mt-5 max-w-3xl font-display text-[2.2rem] font-medium leading-[1.05] tracking-[-0.04em] text-tinta sm:text-[3rem]">
            O que dizem os clientes <span className="font-serifa font-normal italic text-azul">da Origem.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {depoimentos.map((d, i) => (
            <Reveal key={d.nome} delay={i * 90}>
              <figure className="vidro h-full rounded-[28px] p-7 shadow-vidro sm:p-9">
                <blockquote className="font-display text-[1.25rem] leading-snug tracking-[-0.01em] text-tinta sm:text-[1.4rem]">“{d.texto}”</blockquote>
                <figcaption className="mt-6 text-[14.5px] text-grafite">
                  <span className="font-medium text-tinta">{d.nome}</span>, {d.cargo}
                  {d.site && (
                    <>
                      {" · "}
                      <a href={d.site} target="_blank" rel="noopener noreferrer" className="text-azul underline underline-offset-4">
                        ver o site
                      </a>
                    </>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
