import Link from "next/link";
import Reveal from "./Reveal";
import Holofote from "./Holofote";

/**
 * TUDO COMBINADO ANTES DE COMEÇAR
 *
 * Três garantias, e as três saem do Contrato Master revisado pela
 * advogada (outubro/2026). Não é frase de efeito: cada cartão aponta
 * para uma cláusula.
 *
 *   Metade só na entrega  → cláusula 4.3
 *   4 rodadas de ajuste   → cláusulas 3.4 e 3.5
 *   7 dias para desistir  → cláusula 5.3
 *
 * ⚠️ O CONTRATO MANDA, O SITE ACOMPANHA.
 * Pelo Código de Defesa do Consumidor (art. 30), o que o site anuncia
 * passa a fazer parte do contrato. Por isso aqui não pode haver
 * promessa que o contrato não tenha. Já houve: "14 dias ou seguimos
 * trabalhando sem custo" e "30 dias sem multa" — nenhuma das duas
 * existe no contrato (o plano padrão tem fidelidade de 3 meses), e as
 * duas saíram.
 *
 * Fica logo abaixo do preço de propósito. É ali que a pessoa hesita.
 *
 * Se uma cláusula mudar, mude aqui, em /termos e no FAQ.
 */

const garantias = [
  {
    titulo: "Metade só na entrega",
    texto:
      "Você paga 50% do setup para começar. A outra metade, só depois de ver o projeto pronto — antes de ele ir ao ar.",
  },
  {
    titulo: "4 rodadas de ajuste",
    texto:
      "Até quatro rodadas de ajustes antes de publicar, já incluídas no preço. Correção de falha nossa não conta como rodada.",
  },
  {
    titulo: "7 dias para desistir",
    texto:
      "Contratou como pessoa física e mudou de ideia? São 7 dias a partir da assinatura. Se ainda não começamos, devolvemos tudo; se já começamos a seu pedido, descontamos só o que foi feito.",
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
        {/* Antes: "O risco é nosso, não seu". Com fidelidade e multa no
            contrato, a frase prometia mais do que o contrato entrega. */}
        <h3 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">
          Tudo combinado <span className="text-gradient-neon">antes</span> de
          começar
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
              {/* O selo é parado. Já "respirou" — crescendo e
                  diminuindo sem fim — mas o movimento aqui é o escudo
                  se desenhando uma vez; o pulso eterno ao lado de uma
                  promessa de garantia lia mais como alarme do que como
                  segurança. */}
              <span
                aria-hidden
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-neon/40 bg-cyan-neon/[0.07] shadow-[0_0_20px_rgba(0,240,255,0.18)]"
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
          Prazos, fidelidade e cancelamento nos{" "}
          <Link href="/termos" className="text-cyan-neon hover:underline">
            Termos de Uso e Contratação
          </Link>
          .
        </p>
      </Reveal>
    </div>
  );
}
