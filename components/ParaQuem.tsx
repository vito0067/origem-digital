import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import { Seta } from "./Icones";
import { ramos } from "@/lib/ramos";

/**
 * PARA QUEM — os ramos e o projeto entregue, numa seção curta.
 *
 * Cada ramo tem a sua página (lista em lib/ramos.ts). Ao lado, o case
 * que já está no ar.
 */

export default function ParaQuem() {
  return (
    <section id="para-quem" className="relative py-24 sm:py-28">
      <div className="mx-auto grid max-w-pagina items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <p className="rotulo">Para quem</p>
          <h2 className="equilibrado mt-5 font-display text-[2.4rem] font-medium leading-[1.04] tracking-[-0.04em] text-tinta sm:text-[3.2rem]">
            Feito para quem <span className="font-serifa font-normal italic tracking-[-0.01em] text-azul">atende gente.</span>
          </h2>
          <p className="sem-orfa mt-5 max-w-md text-[17px] leading-relaxed text-grafite">
            Pequenas empresas que vivem de responder clientes — e perdem venda quando demoram. Escolha o seu ramo e veja como fica no seu negócio.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {ramos.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/${r.slug}`}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-linha bg-white px-4 py-2 text-[14.5px] text-tinta shadow-cartao transition-colors hover:border-violeta hover:text-azul"
                >
                  {r.nome}
                  <Seta className="h-3.5 w-3.5 text-violeta transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-6">
          <Link href="/cases/o-mundo-da-sa" className="group vidro block overflow-hidden rounded-[28px] p-3 shadow-flutua">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-nevoa">
              <Image
                src="/media/print-mundodasa.jpg"
                alt="Site O Mundo da Sá, feito pela Origem Digital"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex items-center justify-between gap-4 px-3 pb-2 pt-4">
              <span>
                <span className="block font-mono text-[11.5px] uppercase tracking-[0.14em] text-cinza">Projeto entregue</span>
                <span className="mt-1 block font-display text-[1.2rem] font-medium tracking-[-0.02em] text-tinta">O Mundo da Sá · mundodasa.com.br</span>
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-noite text-white transition-transform duration-300 group-hover:translate-x-0.5">
                <Seta className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
