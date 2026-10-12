import Link from "next/link";
import Botao from "@/components/Botao";
import { Simbolo } from "@/components/Marca";

/**
 * PÁGINA NÃO ENCONTRADA (erro 404).
 *
 * Uma placa de vidro com três saídas: a página inicial, o WhatsApp e a
 * página de clínicas. O Next já avisa ao Google que esta página não
 * deve ser indexada.
 */
export default function NaoEncontrada() {
  return (
    <main className="ceu-fundo relative flex min-h-svh items-center justify-center px-5 py-24">
      <div aria-hidden className="pontos pointer-events-none absolute inset-0" />
      <div className="vidro relative w-full max-w-xl rounded-[32px] px-8 pb-12 pt-12 text-center shadow-flutua sm:px-12">
        <Simbolo id="od-404" className="mx-auto h-auto w-16" />
        <p className="mt-6 font-mono text-[13px] uppercase tracking-[0.16em] text-azul">Erro 404</p>
        <h1 className="mt-3 font-display text-[2rem] font-medium leading-tight tracking-[-0.035em] text-tinta sm:text-[2.4rem]">
          Esta página <span className="font-serifa font-normal italic text-azul">não existe.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[17px] leading-relaxed text-grafite">
          O endereço pode ter sido digitado errado ou a página mudou de lugar. Tudo o que importa continua a um clique daqui.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Botao href="/" tom="vidro">
            Página inicial
          </Botao>
          <Botao href="https://wa.me/5511939299209?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20quero%20um%20diagn%C3%B3stico%20gratuito.">Falar no WhatsApp</Botao>
        </div>
        <p className="mt-8 text-[15px] text-cinza">
          Tem clínica?{" "}
          <Link href="/clinicas" className="font-medium text-azul underline underline-offset-4">
            Veja a página feita para você
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
