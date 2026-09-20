import Link from "next/link";
import Reveal from "./Reveal";
import TituloSecao from "./TituloSecao";
import Holofote from "./Holofote";
import PrintPasseando from "./PrintPasseando";

/**
 * PROJETOS — trabalho entregue e no ar.
 *
 * Substitui a antiga galeria "Na prática", que mostrava seis quadros:
 * três prints da demonstração do agente (com a tabela de preços velha,
 * R$ 897 + R$ 39/mês, aparecendo dentro da imagem) e três espaços
 * vazios esperando material. Prometia portfólio e entregava lacuna.
 *
 * Um projeto real, no ar, com link para abrir e conferir, vale mais do
 * que seis quadros em que metade é "em breve".
 *
 * PARA ADICIONAR UM PROJETO NOVO:
 * 1. coloque o print em /public/media/
 * 2. copie um objeto da lista abaixo e preencha
 * 3. se ele também tiver case escrito, use o mesmo `slug` do lib/cases.ts
 */

type Projeto = {
  imagem: string;
  alt: string;
  etiqueta: string;
  titulo: string;
  descricao: string;
  destaques: string[];
  siteUrl: string;
  slug?: string;
};

const projetos: Projeto[] = [
  {
    imagem: "/media/print-mundodasa.jpg",
    alt: "Site O Mundo da Sá, desenvolvido pela Origem Digital",
    etiqueta: "Site profissional",
    titulo: "O Mundo da Sá",
    descricao:
      "Layout exclusivo, feito do zero. Otimizado para celular, preparado para aparecer no Google e com contato direto pelo WhatsApp.",
    destaques: [
      "Design sob medida, sem template pronto",
      "Carregamento rápido em qualquer celular",
      "Indexado no Google desde o primeiro dia",
    ],
    siteUrl: "https://mundodasa.com.br",
    slug: "o-mundo-da-sa",
  },
];

export default function Projetos() {
  return (
    <section
      id="projetos"
      className="relative border-t border-white/[0.06] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <TituloSecao
              etiqueta="Projetos"
              titulo="Trabalhos entregues e no ar."
              tom="violet"
            />
          </div>
          <Reveal de="direita" delay={160} className="lg:col-span-4">
            <Link
              href="/cases"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan-neon lg:justify-end"
            >
              Ver cases completos
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              >
                →
              </span>
            </Link>
            <p className="mt-2 text-xs text-slate-500 lg:text-right">
              Problema, solução e resultado de cada projeto.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-col gap-6">
          {projetos.map((p, i) => (
            <Reveal key={p.slug ?? p.titulo} delay={i * 120}>
              <Holofote
                as="article"
                className="glass-card grid overflow-hidden transition-colors duration-300 hover:border-cyan-neon/40 lg:grid-cols-12"
              >
                {/* O print ocupa a maior parte, à esquerda: é a prova.
                    O texto fica ao lado, não embaixo — assim o cartão
                    inteiro cabe na tela sem precisar rolar. */}
                <div className="lg:col-span-7">
                  <PrintPasseando src={p.imagem} alt={p.alt} />
                </div>

                <div className="flex flex-col justify-center p-8 lg:col-span-5 sm:p-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-neon">
                    {p.etiqueta}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
                    {p.titulo}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    {p.descricao}
                  </p>

                  <ul className="mt-6 flex flex-col gap-2">
                    {p.destaques.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2.5 text-sm text-slate-400"
                      >
                        <span aria-hidden className="mt-0.5 font-bold text-cyan-neon">
                          ✓
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <a
                      href={p.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-cyan-neon transition-colors hover:border-cyan-neon/50 hover:bg-white/5"
                    >
                      Ver site ao vivo
                      <span aria-hidden>↗</span>
                    </a>
                    {p.slug && (
                      <Link
                        href={`/cases/${p.slug}`}
                        className="text-sm text-slate-400 transition-colors hover:text-cyan-neon"
                      >
                        Ler o case →
                      </Link>
                    )}
                  </div>
                </div>
              </Holofote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
