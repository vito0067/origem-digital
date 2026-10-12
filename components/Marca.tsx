/**
 * A MARCA DA ORIGEM DIGITAL — o símbolo "OD" redesenhado (out/2026).
 *
 * É o mesmo desenho de sempre: o O que vira uma diagonal e fecha no D,
 * como um infinito, com os pixels se desprendendo à esquerda. A
 * diferença é que agora ele é desenhado em vetor limpo, em poucas
 * linhas, e não um contorno copiado de imagem (o arquivo antigo tinha
 * 56 KB e bordas tremidas quando ampliado). Fica nítido do favicon ao
 * outdoor.
 *
 * COMO O DESENHO FUNCIONA (para quem um dia precisar mexer):
 *  - um traço só faz o O, desce pela diagonal, forma a base e a barriga
 *    do D e volta pelo topo;
 *  - dois recortes paralelos à diagonal criam as folgas onde o O "passa
 *    por trás" dela — é o que dá a sensação de infinito;
 *  - o degradê vai do azul-claro ao índigo, passando pelo violeta — as
 *    cores do "Gelo".
 *
 * `id` precisa ser diferente quando a marca aparece mais de uma vez na
 * mesma página (topo e rodapé), porque o degradê e os recortes são
 * referenciados pelo nome.
 */

export const ASSINATURA = "Tecnologia e presença digital para pequenas empresas";

export function Simbolo({
  id = "od",
  className = "",
  cor,
}: {
  id?: string;
  className?: string;
  /** Uma cor só (ex.: "#fff") no lugar do degradê. */
  cor?: string;
}) {
  const tinta = cor ?? `url(#${id}-g)`;
  return (
    <svg viewBox="0 0 128 64" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id={`${id}-g`} gradientUnits="userSpaceOnUse" x1="4" y1="14" x2="122" y2="52">
          <stop offset="0" stopColor="#38BDF8" />
          <stop offset="0.5" stopColor="#818CF8" />
          <stop offset="1" stopColor="#312E81" />
        </linearGradient>
        <clipPath id={`${id}-d`} clipPathUnits="userSpaceOnUse">
          <polygon points="40.61,-17.69 89.87,45.35 168.7,-16.2 119.4,-79.3" />
        </clipPath>
        <clipPath id={`${id}-o`} clipPathUnits="userSpaceOnUse">
          <polygon points="28.01,-7.83 77.27,55.21 -1.53,116.8 -50.79,53.74" />
        </clipPath>
      </defs>
      <g fill="none" stroke={tinta} strokeWidth="9">
        <path d="M42 53.5A21.5 21.5 0 1 1 58.94 18.76L86.09 53.5H98A21.5 21.5 0 0 0 98 10.5H92" />
        <path d="M98 10.5H44" clipPath={`url(#${id}-d)`} />
        <path d="M63.42 30.13A21.5 21.5 0 0 1 38.27 53.17" clipPath={`url(#${id}-o)`} />
      </g>
      <g fill={tinta}>
        <rect x="9" y="23" width="5" height="5" rx=".8" />
        <rect x="2.5" y="30" width="4" height="4" rx=".7" />
        <rect x="10" y="35" width="4.5" height="4.5" rx=".8" />
        <rect x="4" y="41.5" width="3.5" height="3.5" rx=".6" />
      </g>
    </svg>
  );
}

type Props = {
  id?: string;
  /** "escuro" quando a marca fica sobre fundo escuro: o nome vira branco. */
  tom?: "claro" | "escuro";
  /** Mostra a assinatura embaixo do nome (no rodapé, onde há espaço). */
  assinatura?: boolean;
  className?: string;
};

export default function Marca({ id = "od", tom = "claro", assinatura = false, className = "" }: Props) {
  return (
    <span
      role="img"
      aria-label={`Origem Digital — ${ASSINATURA.toLowerCase()}`}
      className={`inline-flex select-none items-center gap-2.5 ${className}`}
    >
      <Simbolo id={id} className="h-[26px] w-auto shrink-0" />
      <span className="flex flex-col">
        <span
          className={`whitespace-nowrap font-display text-[19px] font-bold leading-none tracking-[-0.02em] ${
            tom === "escuro" ? "text-white" : "text-tinta"
          }`}
        >
          Origem Digital
        </span>
        {assinatura && (
          <span
            className={`mt-1.5 text-[12px] leading-snug ${
              tom === "escuro" ? "text-white/60" : "text-cinza"
            }`}
          >
            {ASSINATURA}
          </span>
        )}
      </span>
    </span>
  );
}
