import Link from "next/link";
import Reveal from "./Reveal";
import { VistoDuplo, Seta } from "./Icones";
import { Simbolo } from "./Marca";
import { acheProduto, reais, setupSeparado } from "@/lib/precos";

/**
 * OS SERVIÇOS — duas peças, um objetivo.
 *
 * Dois cartões de vidro, cada um com um desenho mínimo do que entrega
 * (a janela de um site; três balões de conversa), três frases e o preço
 * de entrada. Embaixo, a faixa do pacote. Os detalhes de cada plano
 * ficam na seção de preços — aqui é só para entender o que é.
 */

function DesenhoSite() {
  return (
    <div aria-hidden className="relative overflow-hidden rounded-2xl border border-linha bg-white p-3 shadow-cartao">
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-linha" />
        <span className="h-2 w-2 rounded-full bg-linha" />
        <span className="h-2 w-2 rounded-full bg-linha" />
        <span className="ml-3 h-4 flex-1 rounded-full bg-nevoa px-3 font-mono text-[9px] leading-4 text-cinza">seunegocio.com.br</span>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-3">
        <div className="col-span-3 flex flex-col gap-2 pt-1">
          <span className="h-3 w-[85%] rounded-full bg-tinta/80" />
          <span className="h-3 w-[60%] rounded-full bg-tinta/80" />
          <span className="mt-1 h-2 w-[90%] rounded-full bg-linha" />
          <span className="h-2 w-[75%] rounded-full bg-linha" />
          <span className="mt-2 flex h-6 w-24 items-center justify-center rounded-full bg-[#128C4A] text-[9px] font-medium text-white">WhatsApp</span>
        </div>
        <div className="col-span-2 rounded-xl bg-gradient-to-br from-ceu-claro via-violeta-suave to-violeta-claro" />
      </div>
    </div>
  );
}

function DesenhoConversa() {
  return (
    <div aria-hidden className="flex flex-col gap-2 rounded-2xl border border-linha bg-nevoa p-3 shadow-cartao">
      <span className="ml-auto max-w-[75%] rounded-2xl rounded-tr-md bg-[#D9FDD3] px-3 py-1.5 text-[11.5px] text-tinta">Quanto custa a limpeza de pele?</span>
      <span className="flex max-w-[85%] items-start gap-1.5 rounded-2xl rounded-tl-md bg-white px-3 py-1.5 text-[11.5px] text-tinta">
        <Simbolo id="od-servico" className="mt-0.5 h-auto w-[13px] shrink-0" />
        R$ 180, com 1h de duração. Tenho quinta às 15h, quer reservar?
      </span>
      <span className="ml-auto max-w-[75%] rounded-2xl rounded-tr-md bg-[#D9FDD3] px-3 py-1.5 text-[11.5px] text-tinta">Quero sim!</span>
    </div>
  );
}

function Lista({ itens }: { itens: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {itens.map((i) => (
        <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-grafite">
          <VistoDuplo className="mt-[7px] h-3 w-[17px] shrink-0 text-violeta" />
          {i}
        </li>
      ))}
    </ul>
  );
}

export default function Servicos() {
  const site = acheProduto("site-simples");
  const agente = acheProduto("agente-essencial");
  const pacote = acheProduto("pacote-inicio");

  return (
    <section id="servicos" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-pagina px-5 sm:px-8">
        <Reveal>
          <p className="rotulo">O que fazemos</p>
          <h2 className="equilibrado mt-5 max-w-3xl font-display text-[2.4rem] font-medium leading-[1.04] tracking-[-0.04em] text-tinta sm:text-[3.4rem]">
            Duas peças. <span className="font-serifa font-normal italic tracking-[-0.01em] text-azul">Nenhum cliente sem resposta.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <article className="vidro flex h-full flex-col rounded-[28px] p-6 shadow-vidro sm:p-8">
              <DesenhoSite />
              <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.14em] text-cinza">01 · Presença</p>
              <h3 className="mt-2 font-display text-[1.75rem] font-medium tracking-[-0.03em] text-tinta">Site profissional</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-grafite">Quem procura no Google encontra você — com cara de empresa grande, rápido no celular.</p>
              <div className="mt-6">
                <Lista itens={["Design sob medida para a sua marca", "Pronto para o Google, com botão direto para o seu WhatsApp", "Domínio, hospedagem e manutenção inclusos"]} />
              </div>
              <p className="mt-auto pt-8 text-[14px] text-cinza">
                a partir de <span className="font-display text-[1.35rem] font-medium tracking-[-0.02em] text-tinta">{reais(site.setup)}</span> + {reais(site.mensal)}/mês
              </p>
            </article>
          </Reveal>

          <Reveal delay={120}>
            <article className="vidro flex h-full flex-col rounded-[28px] p-6 shadow-vidro sm:p-8">
              <DesenhoConversa />
              <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.14em] text-cinza">02 · Atendimento</p>
              <h3 className="mt-2 font-display text-[1.75rem] font-medium tracking-[-0.03em] text-tinta">Atendente de IA no WhatsApp</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-grafite">Responde seus clientes em segundos, a qualquer hora, com os seus serviços e os seus preços.</p>
              <div className="mt-6">
                <Lista itens={["Treinada com as informações do seu negócio", "Tira dúvidas, qualifica e registra cada contato", "Passa a conversa para você na hora de fechar"]} />
              </div>
              <p className="mt-auto pt-8 text-[14px] text-cinza">
                a partir de <span className="font-display text-[1.35rem] font-medium tracking-[-0.02em] text-tinta">{reais(agente.setup)}</span> + {reais(agente.mensal)}/mês
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <Link
            href="#precos"
            className="group mt-5 flex flex-col gap-4 rounded-[28px] bg-noite px-6 py-6 text-white shadow-botao transition-colors hover:bg-noite-claro sm:flex-row sm:items-center sm:justify-between sm:px-8"
          >
            <span>
              <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-violeta-claro">Os dois juntos · 12% off no setup</span>
              <span className="mt-1.5 block font-display text-[1.35rem] font-medium tracking-[-0.02em] sm:text-[1.5rem]">
                {pacote.nome}: <s className="text-white/60 decoration-1">{reais(setupSeparado["pacote-inicio"])}</s> {reais(pacote.setup)}{" "}
                <span className="text-white/75">+ {reais(pacote.mensal)}/mês</span>
              </span>
            </span>
            <span className="inline-flex items-center gap-2 text-[15px] font-medium text-ceu-claro">
              Ver todos os preços <Seta className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
