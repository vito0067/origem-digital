import Reveal from "./Reveal";
import { produtos, reais, type Produto } from "@/lib/precos";

/**
 * A TABELA COMPLETA, COM OS SEIS PRODUTOS LADO A LADO.
 *
 * Os cartões acima vendem; esta tabela compara. São trabalhos
 * diferentes, e por isso ela existe: quem já entendeu o que quer
 * precisa de um lugar onde veja, de uma olhada só, quanto custa cada
 * degrau e o que separa um do outro.
 *
 * Antes, quem quisesse comparar precisava caçar valores espalhados em
 * letra pequena no rodapé dos cartões. "A partir de R$ 987" não diz
 * quanto custa a versão completa — e preço que a pessoa não acha ela
 * supõe, sempre para cima.
 *
 * NO CELULAR VIRA LISTA. Tabela de quatro colunas em tela de 390px é
 * texto ilegível com rolagem lateral. Cada produto vira um bloco com
 * os mesmos dados empilhados — mesma informação, forma diferente.
 *
 * Os preços vêm todos de lib/precos.ts. Não há número digitado aqui.
 */

const FAMILIA: Record<Produto["familia"], { rotulo: string; cor: string }> = {
  site: { rotulo: "Site", cor: "text-cyan-neon" },
  agente: { rotulo: "Agente de IA", cor: "text-violet-neon" },
  pacote: { rotulo: "Pacote", cor: "text-gradient-neon" },
};

export default function TabelaPrecos() {
  return (
    <div className="mt-6">
      <Reveal>
        <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
          Todos os planos, <span className="text-gradient-neon">lado a lado</span>
        </h3>
        <p className="mt-2 text-sm text-slate-400">
          Setup é o valor único da contratação. A mensalidade já inclui
          hospedagem, uso do agente e suporte.
        </p>
      </Reveal>

      {/* ---- Computador: tabela ---- */}
      <Reveal delay={100}>
        <div className="mt-7 hidden overflow-hidden rounded-2xl border border-white/10 md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-white/[0.04]">
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Produto
                </th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Setup
                </th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Mensalidade
                </th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Indicado para
                </th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((p) => {
                const ehPacote = p.familia === "pacote";
                return (
                  <tr
                    key={p.id}
                    className={`border-t border-white/[0.07] transition-colors hover:bg-white/[0.02] ${
                      ehPacote ? "bg-cyan-neon/[0.035]" : ""
                    }`}
                  >
                    <td className="px-6 py-5">
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${FAMILIA[p.familia].cor}`}
                      >
                        {FAMILIA[p.familia].rotulo}
                      </span>
                      <p className="mt-1 font-display text-base font-bold text-white">
                        {p.nome}
                      </p>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`font-display text-lg font-bold ${
                          ehPacote ? "text-gradient-neon" : "text-white"
                        }`}
                      >
                        {reais(p.setup)}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-display text-base font-bold text-white">
                        {reais(p.mensal)}
                      </span>
                      <span className="text-sm text-slate-500">/mês</span>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm text-slate-300">{p.indicado}</p>
                      {p.diferenca && (
                        <p className="mt-1 text-xs leading-relaxed text-slate-500">
                          {p.diferenca}
                        </p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* ---- Celular: um bloco por produto ---- */}
      <div className="mt-7 flex flex-col gap-3 md:hidden">
        {produtos.map((p, i) => {
          const ehPacote = p.familia === "pacote";
          return (
            <Reveal key={p.id} delay={Math.min(i * 60, 240)}>
              <div
                className={`rounded-2xl border p-5 ${
                  ehPacote
                    ? "border-cyan-neon/25 bg-cyan-neon/[0.035]"
                    : "border-white/10"
                }`}
              >
                <span
                  className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${FAMILIA[p.familia].cor}`}
                >
                  {FAMILIA[p.familia].rotulo}
                </span>
                <p className="mt-1 font-display text-lg font-bold text-white">
                  {p.nome}
                </p>

                <div className="mt-4 flex items-end gap-6 border-y border-white/[0.07] py-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500">
                      Setup
                    </p>
                    <p
                      className={`font-display text-lg font-bold ${
                        ehPacote ? "text-gradient-neon" : "text-white"
                      }`}
                    >
                      {reais(p.setup)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500">
                      Por mês
                    </p>
                    <p className="font-display text-lg font-bold text-white">
                      {reais(p.mensal)}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-sm text-slate-300">{p.indicado}</p>
                {p.diferenca && (
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    {p.diferenca}
                  </p>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
