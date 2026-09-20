import Reveal from "./Reveal";

/**
 * TECNOLOGIA POR TRÁS
 *
 * Uma linha discreta, sem cartão e sem título de seção. Diz de que é
 * feito o serviço sem transformar isso em assunto: o dono de salão não
 * contrata por causa de "infraestrutura em nuvem global", mas ler que
 * existe tira o medo de estar comprando gambiarra.
 *
 * Por isso os nomes são descritos, não citados como marca — "OpenAI" e
 * "n8n" não significam nada para quem lê. A lista de marcas de verdade
 * continua no bloco de diferenciais, onde tem contexto.
 */

const itens = [
  "Inteligência artificial de última geração",
  "Automação de processos",
  "Atendimento integrado ao WhatsApp",
  "Infraestrutura em nuvem global",
];

export default function TecnologiaPorTras() {
  return (
    <div className="border-t border-white/[0.06] py-14">
      <Reveal>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-slate-500">
            Tecnologia por trás
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            {itens.map((item, i) => (
              <li
                key={item}
                className="flex items-center gap-5 text-sm text-slate-400"
              >
                {item}
                {i < itens.length - 1 && (
                  <span aria-hidden className="text-violet-neon/50">
                    ●
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
