import Link from "next/link";
import Reveal from "./Reveal";
import { Seta } from "./Icones";

/**
 * A CHAMADA PARA AS FERRAMENTAS — uma faixa só, logo depois dos preços.
 *
 * Quem acabou de ver o preço e ainda está em dúvida vê quanto a demora
 * custa por mês. As ferramentas moram em /diagnostico, para a página
 * inicial continuar limpa.
 */
export default function ChamadaDiagnostico() {
  return (
    <section aria-label="Ferramentas gratuitas" className="pb-8">
      <div className="mx-auto max-w-pagina px-5 sm:px-8">
        <Reveal>
          <div className="vidro grid gap-3 rounded-[28px] p-3 shadow-vidro md:grid-cols-[1.1fr_1fr_1fr] md:items-stretch">
            <div className="px-4 py-4 md:py-5">
              <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-azul">Ainda em dúvida?</p>
              <p className="mt-2 font-display text-[1.35rem] font-medium leading-snug tracking-[-0.025em] text-tinta">
                Faça as contas antes de decidir.
              </p>
            </div>
            <Link
              href="/diagnostico#calculadora"
              className="group flex items-center justify-between gap-4 rounded-[20px] bg-white px-5 py-4 shadow-cartao transition-colors hover:bg-violeta-suave"
            >
              <span>
                <span className="block text-[15.5px] font-medium text-tinta">Calculadora</span>
                <span className="mt-0.5 block text-[14px] text-grafite">Quanto a demora custa por mês</span>
              </span>
              <Seta className="h-4 w-4 shrink-0 text-azul transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/diagnostico#questionario"
              className="group flex items-center justify-between gap-4 rounded-[20px] bg-white px-5 py-4 shadow-cartao transition-colors hover:bg-violeta-suave"
            >
              <span>
                <span className="block text-[15.5px] font-medium text-tinta">Questionário</span>
                <span className="mt-0.5 block text-[14px] text-grafite">A nota do seu negócio em 30 segundos</span>
              </span>
              <Seta className="h-4 w-4 shrink-0 text-azul transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
