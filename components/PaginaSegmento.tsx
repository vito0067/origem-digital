import Link from "next/link";
import Reveal from "./Reveal";
import Botao from "./Botao";
import Topo from "./Topo";
import Rodape from "./Rodape";
import BotaoFlutuante from "./BotaoFlutuante";
import OutrosRamos from "./OutrosRamos";
import ConversaAurora, { type Fala } from "./ConversaAurora";
import { VistoDuplo } from "./Icones";
import { acheProduto, reais, setupSeparado } from "@/lib/precos";

/**
 * O MOLDE DAS PÁGINAS POR RAMO (clínicas, pet shops…), NO GELO.
 *
 * Mesma empresa, mesmos preços, mesmo contrato — falando só com o dono
 * daquele ramo: a Aurora atendendo o cliente dele no celular, onde ele
 * perde cliente hoje, o que entra, o preço e as perguntas que ele faz.
 *
 * Cada página de ramo (app/clinicas, app/petshops) só tem os TEXTOS; o
 * desenho mora aqui.
 *
 * REGRAS: prazos e promessas do Contrato Master (out/2026); preços de
 * lib/precos.ts; a conversa do celular é EXEMPLO e a página diz isso; a
 * atendente se apresenta como IA e não opina sobre saúde.
 */

export type Segmento = {
  mensagemWhatsApp: string;
  textoBotao: string;
  capa: { etiqueta: string; titulo: string; destaque: string; apoio: string; selos: [string, string, string] };
  conversa: { falas: Fala[]; nome: string; iniciais: string; aviso: string };
  dores: { etiqueta: string; titulo: string; itens: { titulo: string; texto: string }[] };
  entrega: { etiqueta: string; titulo: string; atendente: string[]; siteApoio: string; site: string[] };
  nomeSite: string;
  tituloPreco: string;
  perguntas: { etiqueta: string; titulo: string; itens: { q: string; a: string }[] };
  fechamento: { titulo: string; destaque: string; texto: string };
};

const titulo2 = "equilibrado mt-5 max-w-3xl font-display text-[2.3rem] font-medium leading-[1.05] tracking-[-0.04em] text-tinta sm:text-[3rem]";

function Lista({ itens }: { itens: string[] }) {
  return (
    <ul className="flex flex-col gap-3.5">
      {itens.map((i) => (
        <li key={i} className="flex items-start gap-3 text-[15.5px] leading-relaxed text-grafite">
          <VistoDuplo className="mt-[7px] h-3 w-[17px] shrink-0 text-violeta" />
          {i}
        </li>
      ))}
    </ul>
  );
}

function Preco({ etiqueta, valor, mensal, nota, riscado, destaque = false }: { etiqueta: string; valor: string; mensal: string; nota: string; riscado?: string; destaque?: boolean }) {
  return (
    <div className={`flex h-full flex-col rounded-[28px] p-7 ${destaque ? "bg-noite text-white shadow-flutua" : "vidro text-tinta shadow-vidro"}`}>
      <p className={`font-mono text-[12px] uppercase tracking-[0.14em] ${destaque ? "text-ceu-claro" : "text-azul"}`}>{etiqueta}</p>
      <p className={`mt-6 text-[13.5px] ${destaque ? "text-white/70" : "text-cinza"}`}>{riscado ? <>separado: <s>{riscado}</s></> : "a partir de"}</p>
      <p className="font-display text-[2.4rem] font-medium leading-tight tracking-[-0.04em]">{valor}</p>
      <p className={`font-mono text-[14px] ${destaque ? "text-ceu-claro" : "text-azul"}`}>+ {mensal}/mês</p>
      <p className={`mt-auto pt-6 text-[14px] leading-relaxed ${destaque ? "text-white/80" : "text-grafite"}`}>{nota}</p>
    </div>
  );
}

export default function PaginaSegmento({ s }: { s: Segmento }) {
  const WA = `https://wa.me/5511939299209?text=${encodeURIComponent(s.mensagemWhatsApp)}`;
  const siteSimples = acheProduto("site-simples");
  const siteCompleto = acheProduto("site-completo");
  const essencial = acheProduto("agente-essencial");
  const avancado = acheProduto("agente-avancado");
  const pacote = acheProduto("pacote-inicio");

  return (
    <main>
      <Topo inicio="/" />

      {/* ===== Capa ===== */}
      <section className="ceu-fundo relative overflow-hidden pb-20 pt-[120px] sm:pt-[136px]">
        <div aria-hidden className="pontos pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-pagina items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="surge vidro inline-flex items-center gap-2 rounded-full py-1.5 pl-2 pr-4 text-[13px] text-grafite shadow-cartao">
              <span className="h-2 w-2 rounded-full bg-zap" />
              {s.capa.etiqueta}
            </p>
            <h1 className="surge equilibrado mt-7 font-display text-[2.7rem] font-medium leading-[1] tracking-[-0.045em] text-tinta sm:text-[3.8rem] lg:text-[4.2rem]" style={{ ["--atraso" as string]: "120ms" }}>
              {s.capa.titulo} <span className="font-serifa font-normal italic tracking-[-0.015em] text-azul">{s.capa.destaque}</span>
            </h1>
            <p className="surge sem-orfa mt-6 max-w-xl text-[17.5px] leading-relaxed text-grafite" style={{ ["--atraso" as string]: "260ms" }}>
              {s.capa.apoio}
            </p>
            <div className="surge mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ ["--atraso" as string]: "380ms" }}>
              <Botao href={WA}>{s.textoBotao}</Botao>
              <Botao href="#precos" tom="vidro">
                Ver preços
              </Botao>
            </div>
            <ul className="surge mt-8 flex flex-col gap-2" style={{ ["--atraso" as string]: "480ms" }}>
              {s.capa.selos.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[15px] text-grafite">
                  <VistoDuplo className="h-3 w-[17px] shrink-0 text-violeta" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="surge" style={{ ["--atraso" as string]: "200ms" }}>
              <ConversaAurora falas={s.conversa.falas} nome={s.conversa.nome} iniciais={s.conversa.iniciais} selo="exemplo" atraso={300} />
              <p className="mt-1 text-center text-[13px] text-cinza">{s.conversa.aviso}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Onde perde cliente ===== */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-pagina px-5 sm:px-8">
          <Reveal>
            <p className="rotulo">{s.dores.etiqueta}</p>
            <h2 className={titulo2}>{s.dores.titulo}</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {s.dores.itens.map((d, i) => (
              <Reveal key={d.titulo} delay={i * 90}>
                <article className="vidro h-full rounded-[28px] p-7 shadow-vidro">
                  <p className="font-mono text-[12px] tracking-[0.14em] text-cinza">0{i + 1}</p>
                  <h3 className="mt-3 font-display text-[1.3rem] font-medium tracking-[-0.02em] text-tinta">{d.titulo}</h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-grafite">{d.texto}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== O que entra ===== */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-pagina px-5 sm:px-8">
          <Reveal>
            <p className="rotulo">{s.entrega.etiqueta}</p>
            <h2 className={titulo2}>{s.entrega.titulo}</h2>
          </Reveal>
          <div className="mt-12 grid items-start gap-5 lg:grid-cols-2">
            <Reveal>
              <article className="vidro rounded-[28px] p-7 shadow-vidro sm:p-9">
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-cinza">Atendimento</p>
                <h3 className="mt-2 font-display text-[1.6rem] font-medium tracking-[-0.03em] text-tinta">A atendente de IA no WhatsApp</h3>
                <div className="mt-6 border-t border-linha pt-6">
                  <Lista itens={s.entrega.atendente} />
                </div>
              </article>
            </Reveal>
            <Reveal delay={120}>
              <article className="vidro rounded-[28px] p-7 shadow-vidro sm:p-9">
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-cinza">Presença</p>
                <h3 className="mt-2 font-display text-[1.6rem] font-medium tracking-[-0.03em] text-tinta">{s.nomeSite}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-grafite">{s.entrega.siteApoio}</p>
                <div className="mt-6 border-t border-linha pt-6">
                  <Lista itens={s.entrega.site} />
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Preço ===== */}
      <section id="precos" className="py-24 sm:py-28">
        <div className="mx-auto max-w-pagina px-5 sm:px-8">
          <Reveal>
            <p className="rotulo">Preço</p>
            <h2 className={titulo2}>{s.tituloPreco}</h2>
            <p className="sem-orfa mt-5 max-w-2xl text-[17px] leading-relaxed text-grafite">
              O setup é pago metade no início e metade na entrega, antes de ir ao ar. A mensalidade começa no segundo mês.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Reveal>
              <Preco etiqueta={s.nomeSite} valor={reais(siteSimples.setup)} mensal={reais(siteSimples.mensal)} nota={`Site Completo: ${reais(siteCompleto.setup)} + ${reais(siteCompleto.mensal)}/mês.`} />
            </Reveal>
            <Reveal delay={90}>
              <Preco
                etiqueta="Atendente de IA"
                valor={reais(essencial.setup)}
                mensal={reais(essencial.mensal)}
                nota={`Agente Avançado, ligado ao Google Agenda: ${reais(avancado.setup)} + ${reais(avancado.mensal)}/mês.`}
              />
            </Reveal>
            <Reveal delay={180}>
              <Preco
                destaque
                etiqueta="Site + atendente"
                riscado={reais(setupSeparado["pacote-inicio"])}
                valor={reais(pacote.setup)}
                mensal={reais(pacote.mensal)}
                nota={`${pacote.nome}: Site Simples + Agente Essencial, com 12% de desconto no setup.`}
              />
            </Reveal>
          </div>
          <p className="mt-8 text-[14.5px] leading-relaxed text-cinza">
            <Link href="/#precos" className="font-medium text-azul underline underline-offset-4">
              Ver todos os planos
            </Link>{" "}
            · Plano padrão com fidelidade de 3 meses. Prazos, pagamento e cancelamento nos{" "}
            <Link href="/termos" className="font-medium text-azul underline underline-offset-4">
              Termos de Uso e Contratação
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ===== Perguntas do ramo =====
          <details> nativo: abre sem JavaScript, funciona no teclado e o
          Google lê as respostas mesmo fechadas. */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto grid max-w-pagina items-start gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="coluna-presa self-start lg:col-span-4">
            <p className="rotulo">{s.perguntas.etiqueta}</p>
            <h2 className="equilibrado mt-5 font-display text-[2.1rem] font-medium leading-[1.06] tracking-[-0.04em] text-tinta sm:text-[2.6rem]">{s.perguntas.titulo}</h2>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={100}>
            <div className="vidro rounded-[28px] px-6 shadow-vidro sm:px-8">
              {s.perguntas.itens.map((p, i) => (
                <details key={p.q} className={`group ${i ? "border-t border-linha" : ""}`}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-6 [&::-webkit-details-marker]:hidden">
                    <span className="font-display text-[1.12rem] font-medium leading-7 tracking-[-0.015em] text-tinta">{p.q}</span>
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-linha bg-white text-[18px] leading-none text-azul transition-transform duration-300 group-open:rotate-45 group-open:border-violeta"
                    >
                      +
                    </span>
                  </summary>
                  <p className="pb-6 pr-10 text-[15.5px] leading-relaxed text-grafite">{p.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Fechamento ===== */}
      <section className="px-3 pb-16 pt-8 sm:px-5 sm:pb-24">
        <div className="ceu-fundo relative mx-auto max-w-[82rem] overflow-hidden rounded-[36px] border border-white px-5 py-20 text-center shadow-vidro sm:py-24">
          <div aria-hidden className="pontos pointer-events-none absolute inset-0" />
          <Reveal className="relative">
            <h2 className="equilibrado mx-auto max-w-3xl font-display text-[2.4rem] font-medium leading-[1.04] tracking-[-0.045em] text-tinta sm:text-[3.4rem]">
              {s.fechamento.titulo} <span className="font-serifa font-normal italic tracking-[-0.01em] text-azul">{s.fechamento.destaque}</span>
            </h2>
            <p className="sem-orfa mx-auto mt-6 max-w-xl text-[17.5px] leading-relaxed text-grafite">{s.fechamento.texto}</p>
            <div className="mt-10">
              <Botao href={WA}>{s.textoBotao}</Botao>
            </div>
          </Reveal>
        </div>
      </section>

      <OutrosRamos />
      <Rodape prefixo="/" />
      <BotaoFlutuante />
    </main>
  );
}
