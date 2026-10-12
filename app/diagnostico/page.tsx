import type { Metadata } from "next";
import Link from "next/link";
import Topo from "@/components/Topo";
import Calculadora from "@/components/Calculadora";
import Questionario from "@/components/Questionario";
import Fechamento from "@/components/Fechamento";
import Rodape from "@/components/Rodape";
import BotaoFlutuante from "@/components/BotaoFlutuante";

/**
 * /diagnostico — AS DUAS FERRAMENTAS GRATUITAS.
 *
 * Saíram da página inicial (para ela respirar) e moram aqui:
 *   01 · a calculadora de clientes perdidos pela demora
 *   02 · o questionário "o seu negócio está pronto para vender online?"
 *
 * As duas terminam no WhatsApp levando o resultado junto, para o
 * diagnóstico gratuito já começar direcionado.
 */

export const metadata: Metadata = {
  title: "Faça as contas: calculadora de clientes perdidos e diagnóstico — Origem Digital",
  description:
    "Descubra quanto a demora para responder no WhatsApp pode estar custando por mês e dê uma nota ao seu negócio em 30 segundos. Ferramentas gratuitas da Origem Digital.",
  alternates: { canonical: "/diagnostico" },
};

export default function Diagnostico() {
  return (
    <main>
      <Topo inicio="/" />

      <section className="ceu-fundo relative overflow-hidden pb-10 pt-[124px] sm:pt-[140px]">
        <div aria-hidden className="pontos pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-pagina px-5 sm:px-8">
          <p className="surge rotulo">Ferramentas gratuitas</p>
          <h1
            className="surge equilibrado mt-6 max-w-4xl font-display text-[2.8rem] font-medium leading-[1] tracking-[-0.045em] text-tinta sm:text-[4.2rem]"
            style={{ ["--atraso" as string]: "120ms" }}
          >
            Faça as contas. <span className="font-serifa font-normal italic tracking-[-0.015em] text-azul">Antes de decidir qualquer coisa.</span>
          </h1>
          <p className="surge sem-orfa mt-6 max-w-2xl text-[17.5px] leading-relaxed text-grafite" style={{ ["--atraso" as string]: "240ms" }}>
            Duas ferramentas rápidas: quanto a demora para responder pode estar custando ao seu negócio, e uma nota de 0 a 100 para
            saber se ele está pronto para vender online.
          </p>
          <div className="surge mt-8 flex flex-wrap gap-2" style={{ ["--atraso" as string]: "340ms" }}>
            <Link href="#calculadora" className="vidro rounded-full px-5 py-2.5 text-[14.5px] font-medium text-tinta shadow-cartao hover:bg-white">
              01 · Calculadora ↓
            </Link>
            <Link href="#questionario" className="vidro rounded-full px-5 py-2.5 text-[14.5px] font-medium text-tinta shadow-cartao hover:bg-white">
              02 · Questionário ↓
            </Link>
          </div>
        </div>
      </section>

      <Calculadora />
      <Questionario />
      <Fechamento />
      <Rodape prefixo="/" />
      <BotaoFlutuante />
    </main>
  );
}
