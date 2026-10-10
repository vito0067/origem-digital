import type { Metadata } from "next";
import Link from "next/link";
import Marca from "@/components/Marca";
import Reveal from "@/components/Reveal";
import TituloSecao from "@/components/TituloSecao";
import NeonButton from "@/components/NeonButton";
import Holofote from "@/components/Holofote";
import ConversaAurora, { type Fala } from "@/components/ConversaAurora";
import Footer from "@/components/Footer";
import BotaoFlutuante from "@/components/BotaoFlutuante";
import { acheProduto, reais, setupSeparado } from "@/lib/precos";

/**
 * PÁGINA DO RAMO: CLÍNICAS
 *
 * Mesma empresa, mesmos preços, mesmo contrato — mas falando só com o
 * dono de clínica: a dor da recepção dele, uma conversa com paciente e
 * as dúvidas que ele faz antes de fechar.
 *
 * Para que serve:
 *  - PROSPECÇÃO: na mensagem para uma clínica, vai o link desta página,
 *    e não o do site geral. O dono vê o negócio dele na tela.
 *  - GOOGLE: "site para clínica" e "atendente de WhatsApp para clínica"
 *    encontram uma página feita para isso.
 *
 * REGRAS QUE ESTA PÁGINA SEGUE:
 *  - Prazos e promessas são os do Contrato Master (out/2026). Nada de
 *    prazo menor ou garantia que o contrato não tenha.
 *  - Preços saem de lib/precos.ts, igual ao resto do site.
 *  - A conversa do celular é EXEMPLO, e a página diz isso embaixo dele:
 *    clínica e valores ilustrativos. Não há cliente clínica ainda, e
 *    insinuar que há derrubaria a confiança na primeira conferência.
 *  - A atendente se apresenta como inteligência artificial e nunca dá
 *    orientação de saúde — é como a Aurora funciona, e é o que o dono
 *    de clínica precisa ler antes de confiar.
 *
 * Para criar a página de outro ramo, copie esta pasta, troque os textos
 * e acrescente a página em app/sitemap.ts e no rodapé.
 */

export const metadata: Metadata = {
  title: "Site e atendente de IA no WhatsApp para clínicas — Origem Digital",
  description:
    "Site profissional e atendente de inteligência artificial que responde pacientes no WhatsApp 24 horas por dia, informa valores e encaminha agendamentos. Primeira versão em até 15 dias úteis.",
  alternates: { canonical: "/clinicas" },
  openGraph: {
    title: "Site e atendente de IA no WhatsApp para clínicas",
    description:
      "Sua clínica respondendo pacientes no WhatsApp, a qualquer hora — enquanto a recepção cuida de quem está na clínica.",
    locale: "pt_BR",
    type: "website",
    siteName: "Origem Digital",
  },
};

const WA = `https://wa.me/5511939299209?text=${encodeURIComponent(
  "Olá! Tenho uma clínica e quero o diagnóstico gratuito."
)}`;

/** Conversa de exemplo: paciente falando com a atendente de uma clínica. */
const conversaClinica: Fala[] = [
  {
    de: "cliente",
    texto: "Boa noite! Quanto custa a consulta com dermatologista?",
    hora: "21:14",
  },
  {
    de: "aurora",
    texto:
      "Boa noite! Sou a assistente virtual da Clínica Exemplo, um atendimento feito por inteligência artificial. A consulta particular de dermatologia é R$ 280.",
    hora: "21:14",
    pensando: 1300,
  },
  {
    de: "aurora",
    texto:
      "Tenho horário na quinta às 14h ou na sexta às 9h. Quer que eu reserve um deles?",
    hora: "21:14",
    pensando: 1100,
  },
  {
    de: "cliente",
    texto: "Quinta às 14h. E essa mancha que apareceu no meu braço, é grave?",
    hora: "21:15",
  },
  {
    de: "aurora",
    texto:
      "Essa avaliação só pode ser feita na consulta, com o especialista. Anotei seu pedido para quinta às 14h e passei para a recepção, que confirma com você amanhã às 8h ✅",
    hora: "21:15",
    pensando: 1500,
  },
];

const dores = [
  {
    titulo: "A mensagem das 21h",
    texto:
      "O paciente pergunta o valor da consulta à noite. A resposta só sai na manhã seguinte — e, até lá, muitas vezes ele já marcou em outro lugar.",
  },
  {
    titulo: "Recepção em três frentes",
    texto:
      "Quem atende o telefone e o balcão também responde o WhatsApp. Sempre tem alguém esperando.",
  },
  {
    titulo: "As mesmas perguntas, o dia todo",
    texto:
      "Valor, convênio, endereço, horário. Respondidas uma a uma, todos os dias, por quem podia estar cuidando do paciente na sua frente.",
  },
];

const atendente = [
  "Responde em segundos, 24 horas por dia: valores, especialidades, convênios aceitos, endereço e preparo de exames — só com as informações que a clínica aprovar.",
  "Encaminha o agendamento. No Agente Avançado, ela é ligada ao Google Agenda e marca o horário direto; no Essencial, anota o pedido e passa para a recepção confirmar.",
  "Chama a recepção quando o paciente pede para falar com alguém, reclama ou pergunta algo que ela não sabe.",
  "Avisa que é um atendimento por inteligência artificial e mostra o aviso de privacidade da clínica.",
  "Nunca dá diagnóstico nem orientação de saúde: dúvida clínica vai para a sua equipe.",
];

const site = [
  "Especialidades, equipe e convênios, com fotos da clínica",
  "Endereço no Google Maps e botão direto para o WhatsApp",
  "Pensado para o celular, que é onde o paciente procura",
  "No Site Completo: páginas por especialidade, blog e formulários",
  "Domínio, hospedagem e manutenção inclusos na mensalidade",
];

const perguntas = [
  {
    q: "A atendente vai ser personalizada para a minha clínica?",
    a: "Sim. Antes de começar, definimos juntos, por escrito, tudo o que ela vai saber: especialidades, valores, convênios, horários, endereço, o jeito como a sua recepção fala com os pacientes — e o que ela nunca deve responder. Você escolhe o nome dela e o tom de voz. Ela atende só com as informações que você aprovar.",
  },
  {
    q: "E se ela falar besteira com o meu paciente?",
    a: "Ela foi feita para não inventar: responde só com o que você aprovou e, quando não sabe a resposta, quando o paciente reclama ou pede uma pessoa, passa a conversa para a recepção. Também nunca dá diagnóstico nem orientação de saúde. Como todo sistema de inteligência artificial, pode errar de vez em quando — por isso você acompanha as conversas, e qualquer falha de configuração nossa é corrigida dentro da manutenção mensal.",
  },
  {
    q: "Quanto tempo leva para o site da minha clínica ficar pronto?",
    a: "A primeira versão fica pronta em até 15 dias úteis, contados depois do pagamento da entrada e do envio de todo o material — textos, fotos, logo e acessos. Você tem até 5 dias úteis para aprovar ou pedir ajustes (são até 4 rodadas incluídas) e, aprovado, o site vai ao ar em até 5 dias úteis. A atendente segue o mesmo prazo.",
  },
  {
    q: "A atendente dá diagnóstico ou orientação de saúde?",
    a: "Não. Ela responde sobre a clínica — valores, especialidades, convênios, horários, endereço, preparo de exames — e encaminha para a sua equipe qualquer dúvida sobre sintomas, tratamento ou medicação.",
  },
  {
    q: "E os dados dos meus pacientes?",
    a: "Seguem a Lei Geral de Proteção de Dados. A atendente avisa o paciente que é um atendimento por inteligência artificial e mostra o aviso de privacidade da sua clínica. A clínica é a dona dos dados e nós só os usamos para o atendimento, conforme um termo de tratamento de dados assinado junto com o contrato.",
  },
];

function Check() {
  return (
    <span aria-hidden className="mt-0.5 shrink-0 font-bold text-cyan-neon">
      ✓
    </span>
  );
}

export default function Clinicas() {
  const siteSimples = acheProduto("site-simples");
  const siteCompleto = acheProduto("site-completo");
  const essencial = acheProduto("agente-essencial");
  const avancado = acheProduto("agente-avancado");
  const pacote = acheProduto("pacote-inicio");

  return (
    <main className="bg-abyss">
      {/* ===== Barra do topo, simples: marca e o caminho para o WhatsApp ===== */}
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link href="/" aria-label="Origem Digital — página inicial" className="shrink-0">
            <Marca formato="linha" />
          </Link>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="brilho-passa inline-block whitespace-nowrap rounded-lg border border-cyan-neon/40 bg-cyan-neon/10 px-3 py-2 text-xs font-medium text-cyan-neon transition-shadow hover:shadow-neon-cyan sm:px-4 sm:text-sm"
          >
            Diagnóstico gratuito
          </a>
        </div>
      </header>

      {/* ===== Capa: a fala à esquerda, a conversa com paciente à direita ===== */}
      <section className="relative overflow-hidden pb-20 pt-28 sm:pt-32">
        <div aria-hidden className="neon-grid absolute inset-0 opacity-60" />
        <div
          aria-hidden
          className="brilho-descida absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full blur-[150px]"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            {/* `naCarga` em tudo da primeira tela: entra por CSS no
                primeiro instante, sem esperar o JavaScript. */}
            <Reveal de="esquerda" distancia={12} naCarga>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-neon/90 sm:text-xs">
                Para clínicas e consultórios
              </p>
            </Reveal>

            <Reveal de="esquerda" delay={80} naCarga>
              <h1 className="equilibrado mt-6 font-display text-[2.3rem] font-bold leading-[1.06] text-white sm:text-5xl lg:text-[3.3rem]">
                Sua clínica respondendo pacientes{" "}
                <span className="text-gradient-neon">
                  no WhatsApp, a qualquer hora.
                </span>
              </h1>
            </Reveal>

            <Reveal de="esquerda" delay={200} naCarga>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg">
                Site profissional e uma atendente de inteligência artificial
                que tira dúvidas, informa valores e encaminha o agendamento —
                enquanto a sua recepção cuida de quem está na clínica.
              </p>
            </Reveal>

            <Reveal de="esquerda" delay={300} naCarga>
              <div className="mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                <NeonButton href={WA} variant="primary" external>
                  Quero o diagnóstico da minha clínica
                </NeonButton>
                <NeonButton href="#precos" variant="ghost">
                  Ver preços
                </NeonButton>
              </div>

              <ul className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-7">
                {[
                  "Treinada com as informações da sua clínica",
                  "Nunca dá diagnóstico",
                  "Primeira versão em até 15 dias úteis",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-slate-400">
                    <span aria-hidden className="font-bold text-cyan-neon">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal de="direita" delay={150} naCarga>
              <ConversaAurora
                falas={conversaClinica}
                nome="Clínica Exemplo"
                iniciais="CE"
                selo="exemplo"
              />
              <p className="mt-5 text-center text-xs text-slate-500">
                Conversa de exemplo. Clínica e valores ilustrativos.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== A dor, no dia a dia da recepção ===== */}
      <section className="border-t border-white/[0.06] bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <TituloSecao
            etiqueta="O dia a dia da recepção"
            titulo="Onde a clínica perde paciente sem perceber."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {dores.map((d, i) => (
              <Reveal key={d.titulo} delay={i * 90}>
                <Holofote className="glass-card flex h-full flex-col p-7">
                  <span
                    aria-hidden
                    className="h-0.5 w-10 rounded-full bg-gradient-to-r from-cyan-neon to-violet-neon"
                  />
                  <h3 className="mt-5 font-display text-lg font-bold text-white">
                    {d.titulo}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {d.texto}
                  </p>
                </Holofote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== O que entra: a atendente e o site ===== */}
      <section className="border-t border-white/[0.06] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <TituloSecao
            etiqueta="O que a sua clínica recebe"
            titulo="Uma atendente que não deixa paciente esperando, e um site que passa confiança."
            tom="violet"
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal de="esquerda">
              <Holofote className="glass-card h-full p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-neon">
                  A atendente de IA no WhatsApp
                </p>
                <ul className="mt-6 flex flex-col gap-4">
                  {atendente.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-300">
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
              </Holofote>
            </Reveal>

            <Reveal de="direita" delay={120}>
              <Holofote className="glass-card h-full p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-violet-neon">
                  O site da clínica
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                  Quem procura a sua especialidade no Google encontra uma
                  página que mostra, de cara, por que confiar na sua clínica.
                </p>
                <ul className="mt-6 flex flex-col gap-4">
                  {site.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-300">
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
              </Holofote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Preço na mesa ===== */}
      <section
        id="precos"
        className="relative border-t border-white/[0.06] bg-surface py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-6">
          <TituloSecao
            etiqueta="Preço na mesa"
            titulo="Quanto custa para a sua clínica."
            apoio="O setup é pago metade no início e metade na entrega, antes de ir ao ar. A mensalidade começa no segundo mês."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Reveal>
              <Holofote className="glass-card flex h-full flex-col p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-neon">
                  Site da clínica
                </p>
                <p className="mt-4 text-xs text-slate-500">a partir de</p>
                <p className="font-display text-3xl font-bold text-white">
                  {reais(siteSimples.setup)}
                </p>
                <p className="text-sm text-slate-400">+ {reais(siteSimples.mensal)}/mês</p>
                <p className="mt-auto pt-5 text-xs leading-relaxed text-slate-500">
                  Site Completo: {reais(siteCompleto.setup)} +{" "}
                  {reais(siteCompleto.mensal)}/mês.
                </p>
              </Holofote>
            </Reveal>

            <Reveal delay={90}>
              <Holofote className="glass-card flex h-full flex-col p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-violet-neon">
                  Atendente de IA
                </p>
                <p className="mt-4 text-xs text-slate-500">a partir de</p>
                <p className="font-display text-3xl font-bold text-white">
                  {reais(essencial.setup)}
                </p>
                <p className="text-sm text-slate-400">+ {reais(essencial.mensal)}/mês</p>
                <p className="mt-auto pt-5 text-xs leading-relaxed text-slate-500">
                  Agente Avançado, ligado ao Google Agenda: {reais(avancado.setup)}{" "}
                  + {reais(avancado.mensal)}/mês.
                </p>
              </Holofote>
            </Reveal>

            <Reveal delay={180}>
              <Holofote className="glass-card flex h-full flex-col p-7 ring-1 ring-cyan-neon/30">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-neon">
                  Site + atendente
                </p>
                <p className="mt-4 text-xs text-slate-500">
                  separado: <s>{reais(setupSeparado["pacote-inicio"])}</s>
                </p>
                <p className="font-display text-3xl font-bold text-gradient-neon">
                  {reais(pacote.setup)}
                </p>
                <p className="text-sm text-slate-400">+ {reais(pacote.mensal)}/mês</p>
                <p className="mt-auto pt-5 text-xs leading-relaxed text-slate-500">
                  {pacote.nome}: Site Simples + Agente Essencial, com 12% de
                  desconto no setup.
                </p>
              </Holofote>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <p className="mt-8 text-sm text-slate-400">
              <Link href="/#servicos" className="text-cyan-neon hover:underline">
                Ver tudo o que cada plano inclui →
              </Link>
            </p>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              Plano padrão com fidelidade de 3 meses. Prazos, pagamento e
              cancelamento nos{" "}
              <Link href="/termos" className="text-cyan-neon hover:underline">
                Termos de Uso e Contratação
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== Dúvidas de dono de clínica =====
          <details> nativo: abre e fecha sem JavaScript nenhum, funciona
          no teclado e o Google lê as respostas mesmo fechadas. */}
      <section className="border-t border-white/[0.06] py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12 lg:gap-16">
          <div className="coluna-presa self-start lg:col-span-5">
            <TituloSecao
              etiqueta="Perguntas de quem tem clínica"
              titulo="O que todo dono de clínica pergunta antes de decidir."
              tom="violet"
            />
          </div>

          <div className="flex flex-col gap-2.5 lg:col-span-7">
            {perguntas.map((p, i) => (
              <Reveal key={p.q} delay={i * 60}>
                <details className="glass-card group overflow-hidden transition-colors duration-300 hover:border-white/20">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display text-base font-semibold text-white [&::-webkit-details-marker]:hidden">
                    {p.q}
                    <span
                      aria-hidden
                      className="shrink-0 text-xl leading-none text-cyan-neon transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-5 text-sm leading-relaxed text-slate-400">
                    {p.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Fechamento ===== */}
      <section className="relative overflow-hidden border-t border-white/[0.06] py-20 sm:py-28">
        <div
          aria-hidden
          className="brilho-descida absolute -left-20 top-1/2 h-[420px] w-[620px] -translate-y-1/2 rounded-full blur-[140px]"
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="equilibrado font-display text-3xl font-bold leading-[1.1] text-white sm:text-4xl">
              Quer ver como ficaria{" "}
              <span className="text-gradient-neon">na sua clínica?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-slate-400">
              No diagnóstico gratuito, em 10 a 15 minutos pelo WhatsApp,
              mostramos onde o atendimento da sua clínica está travando — e
              você sai com uma proposta na mesa.
            </p>
            <div className="mt-9">
              <NeonButton href={WA} variant="primary" external>
                Quero o diagnóstico da minha clínica
              </NeonButton>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer prefixo="/" />
      <BotaoFlutuante />
    </main>
  );
}
