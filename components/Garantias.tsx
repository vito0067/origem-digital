import Link from "next/link";
import Reveal from "./Reveal";
import Holofote from "./Holofote";

/**
 * O RISCO É NOSSO, NÃO SEU
 *
 * Três garantias, e as três existem de verdade nos Termos de Uso e
 * Contratação — prazo, arrependimento e carência. Não é frase de
 * efeito: cada cartão tem cláusula correspondente.
 *
 * Fica logo abaixo do preço de propósito. É ali que a pessoa hesita,
 * e é ali que precisa ler que pode desistir.
 *
 * Se mudar algum prazo aqui, mude também em /termos — divergência entre
 * a promessa do site e o contrato é problema jurídico, não de layout.
 */

const garantias = [
  {
    titulo: "14 dias de implantação",
    texto:
      "Se o projeto não estiver no ar no prazo, seguimos trabalhando sem custo adicional até concluir.",
  },
  {
    titulo: "7 dias para desistir",
    texto:
      "Mudou de ideia na primeira semana? Devolvemos tudo. É o seu direito de arrependimento, previsto em lei.",
  },
  {
    titulo: "30 dias sem multa",
    texto:
      "No primeiro mês você pode cancelar a qualquer momento, sem pagar nada além do que já foi entregue.",
  },
];

/**
 * O escudo é traçado como se alguém estivesse desenhando: primeiro o
 * contorno, depois o visto dentro dele. Quem está lendo "devolvemos
 * tudo" vê a promessa sendo assinada na frente dele.
 *
 * O truque é o traço pontilhado: uma linha de 100 de comprimento
 * empurrada 100 para fora do desenho, que volta ao lugar na animação.
 * A classe `desenhado` é ligada pelo Reveal quando o cartão entra na
 * tela (regra no globals.css).
 */
function Escudo() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="#00F0FF"
      strokeWidth="1.6"
      aria-hidden
    >
      <path
        className="escudo-traco"
        d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z"
        strokeLinejoin="round"
      />
      <path
        className="escudo-traco escudo-traco-2"
        d="M9 12l2 2 4-4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Garantias() {
  return (
    <div className="mt-16">
      <Reveal>
        <h3 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">
          O risco é <span className="text-gradient-neon">nosso</span>, não seu
        </h3>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {garantias.map((g, i) => (
          <Reveal
            key={g.titulo}
            de={i === 0 ? "esquerda" : i === 2 ? "direita" : "baixo"}
            delay={i * 100}
          >
            <Holofote className="glass-card flex h-full flex-col items-center p-8 text-center transition-colors duration-300 hover:border-cyan-neon/40">
              {/* O selo respira devagar: cresce e diminui uns 4%, num
                  ciclo de quatro segundos e meio. Cada um começa o
                  ciclo num momento diferente, senão os três pulsariam
                  juntos e pareceria um alarme piscando. */}
              <span
                aria-hidden
                className="respira flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-neon/40 bg-cyan-neon/[0.07]"
                style={{ animationDelay: `${i * 1.3}s` }}
              >
                <Escudo />
              </span>
              <p className="mt-6 font-display text-lg font-bold text-white">
                {g.titulo}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {g.texto}
              </p>
            </Holofote>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <p className="mt-8 text-center text-xs text-slate-500">
          Condições completas nos{" "}
          <Link href="/termos" className="text-cyan-neon hover:underline">
            Termos de Uso e Contratação
          </Link>
          .
        </p>
      </Reveal>
    </div>
  );
}
