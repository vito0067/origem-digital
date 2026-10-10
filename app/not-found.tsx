import Link from "next/link";
import Marca from "@/components/Marca";

/**
 * PÁGINA NÃO ENCONTRADA (erro 404)
 *
 * Sem este arquivo, quem digita um endereço errado — ou abre um link
 * antigo — via a página padrão do Next, em inglês: "This page could not
 * be found." Num site que vende capricho, era a pior tela possível para
 * alguém cair.
 *
 * Aqui a pessoa entende o que houve em português e tem três saídas: a
 * página inicial, a página de clínicas e o WhatsApp. O Next já avisa ao
 * Google que esta página não deve ser indexada.
 */
export default function NaoEncontrada() {
  return (
    <main className="relative flex min-h-svh items-center overflow-hidden bg-abyss px-6 py-24">
      <div aria-hidden className="neon-grid absolute inset-0 opacity-50" />
      <div className="relative mx-auto w-full max-w-xl text-center">
        <Link href="/" aria-label="Origem Digital — página inicial" className="inline-block">
          <Marca formato="empilhada" />
        </Link>

        <p className="mt-12 font-display text-6xl font-bold text-gradient-neon">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
          Esta página não existe
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-slate-400">
          O endereço pode ter sido digitado errado ou a página mudou de
          lugar. Tudo o que importa continua a um clique daqui.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-neon px-7 py-3.5 text-sm font-semibold text-abyss shadow-neon-cyan transition-transform hover:scale-[1.03]"
          >
            Ir para a página inicial
          </Link>
          <a
            href="https://wa.me/5511939299209?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20quero%20um%20diagn%C3%B3stico%20gratuito."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-cyan-neon/50"
          >
            Falar no WhatsApp
          </a>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Tem clínica?{" "}
          <Link href="/clinicas" className="text-cyan-neon hover:underline">
            Veja a página feita para você
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
