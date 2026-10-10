import type { Metadata } from "next";
import Link from "next/link";
import { avulsos, reais } from "@/lib/precos";

export const metadata: Metadata = {
  title: "Termos de Uso e Contratação — Origem Digital",
  description:
    "Prazo, pagamento, fidelidade, cancelamento, direito de arrependimento, suporte e responsabilidades na contratação de sites e agentes de IA da Origem Digital.",
  alternates: { canonical: "/termos" },
};

/**
 * TERMOS DE USO E CONTRATAÇÃO
 *
 * Resumo do Contrato Master de Prestação de Serviços, na versão revisada
 * pela advogada (outubro/2026). Cada seção aponta, no comentário, a
 * cláusula de onde saiu.
 *
 * ⚠️ O CONTRATO MANDA, ESTA PÁGINA ACOMPANHA.
 * Pelo Código de Defesa do Consumidor (art. 30), o que o site anuncia
 * passa a fazer parte do contrato. Então esta página nunca pode
 * prometer mais do que o contrato — nem prazo menor, nem cancelamento
 * mais fácil. Já aconteceu: a versão anterior falava em 14 dias
 * corridos e em 30 dias sem multa para todos, e o contrato não tem
 * nenhum dos dois.
 *
 * Se uma cláusula mudar, mude também: components/Garantias.tsx, as
 * respostas de components/Faq.tsx e a página app/clinicas.
 *
 * Fica de fora, de propósito: CPF e endereço da responsável. Estão no
 * contrato, que é entre as partes; não são para página pública.
 */

type Secao = {
  titulo: string;
  paragrafos: React.ReactNode[];
};

const [AJUSTE_SITE, AJUSTE_AGENTE] = avulsos;

const secoes: Secao[] = [
  {
    // Preâmbulo do contrato
    titulo: "1. Quem presta o serviço",
    paragrafos: [
      "A Origem Digital é uma operação de tecnologia sediada em São Paulo/SP, sob responsabilidade de Samantha Mañe Carrieri Portella Scaglione. Contato oficial: contato@origemdigitalsite.com.br e WhatsApp (11) 93929-9209.",
    ],
  },
  {
    // Cláusulas 1 e 2
    titulo: "2. O que oferecemos",
    paragrafos: [
      "Site Simples, Site Completo, Agente de IA Essencial e Agente de IA Avançado (Aurora), contratados separadamente ou em Pacote Completo — um site e um agente juntos, em qualquer das quatro combinações.",
      "O que cada projeto inclui (páginas, funcionalidades, integrações, fluxos e limites de uso) é definido no Anexo I – Escopo do Projeto, preenchido e assinado pelas duas partes antes do início dos trabalhos. O que não estiver no contrato ou no Anexo I não está incluído.",
    ],
  },
  {
    // Cláusula 3
    titulo: "3. Prazo de execução",
    paragrafos: [
      "A primeira versão do projeto fica pronta em até 15 dias úteis. A contagem começa no primeiro dia útil depois de duas coisas acontecerem: o pagamento da primeira parcela do setup e o recebimento de todo o material necessário (textos, imagens, logotipo, acessos e informações).",
      "O cliente envia esse material em até 5 dias úteis da assinatura. Se ele chegar incompleto, o prazo fica pausado até a regularização. O prazo também é prorrogado por aprovações pendentes, pedidos de alteração e falhas de serviços de terceiros (hospedagem, domínio, WhatsApp/Meta, ferramentas de inteligência artificial).",
    ],
  },
  {
    // Cláusulas 3.3 a 3.6
    titulo: "4. Aprovação e ajustes",
    paragrafos: [
      "Com a primeira versão pronta, o cliente tem 5 dias úteis para aprovar ou pedir ajustes. Estão incluídas até 4 rodadas de ajustes antes da publicação, dentro do escopo aprovado. Correções de falhas técnicas nossas não contam como rodada.",
      "Aprovado sem alterações, o projeto é publicado em até 5 dias úteis. Havendo ajustes, eles são feitos em até 7 dias úteis.",
    ],
  },
  {
    // Cláusula 4
    titulo: "5. Pagamento",
    paragrafos: [
      "O setup (taxa de implementação) é pago em duas partes: 50% na assinatura, para começar, e 50% depois da entrega e antes da publicação. A publicação depende da quitação da segunda parte.",
      "A mensalidade não é cobrada no mês da implantação: começa no segundo mês, com vencimento todo dia 5. Pagamento por Pix ou cartão de crédito; encargos de parcelamento no cartão ficam com o cliente.",
      "No Pacote Completo, o desconto de 12% vale só sobre o setup somado dos dois itens. A mensalidade do pacote é a soma das mensalidades, sem desconto.",
      "Atraso de pagamento: multa de 2% e juros de 1% ao mês. Com mais de 10 dias de atraso, os serviços podem ser suspensos após aviso; com mais de 30, o contrato pode ser encerrado.",
    ],
  },
  {
    // Cláusulas 5 e 6
    titulo: "6. Fidelidade e cancelamento",
    paragrafos: [
      <>
        <strong className="text-slate-300">Plano padrão:</strong> fidelidade
        mínima de 3 meses, contados do início da mensalidade. Depois disso, o
        contrato segue sem prazo e qualquer parte pode encerrá-lo com 30 dias
        de aviso.
      </>,
      <>
        <strong className="text-slate-300">Plano anual:</strong> 12 meses de
        contrato. Nos primeiros 30 dias da assinatura há carência: o cliente
        pode cancelar sem multa, com aviso prévio e pagando o que já foi
        executado.
      </>,
      <>
        <strong className="text-slate-300">Multa:</strong> fora da carência e
        do direito de arrependimento, o cancelamento antes do fim da
        fidelidade tem multa de 15% sobre a soma das mensalidades que faltam
        até o fim dela. A multa não é cobrada se o cancelamento vier de uma
        falha relevante nossa que não tenha sido corrigida em até 10 dias
        úteis após aviso por escrito.
      </>,
      "O encerramento depois da fidelidade, na carência ou no arrependimento é feito com aviso prévio por escrito de 30 dias corridos, por WhatsApp ou e-mail.",
    ],
  },
  {
    // Cláusula 5.3
    titulo: "7. Direito de arrependimento",
    paragrafos: [
      "Por ser contratação à distância, o cliente pessoa física pode desistir em até 7 dias corridos da assinatura, conforme o art. 49 do Código de Defesa do Consumidor. Se os trabalhos ainda não começaram, a devolução é integral. Se começaram a pedido expresso do cliente dentro desse prazo, podem ser descontados os custos proporcionais já feitos.",
    ],
  },
  {
    // Cláusulas 11 e 12
    titulo: "8. Suporte e manutenção",
    paragrafos: [
      "A mensalidade inclui hospedagem, monitoramento, correção de erros técnicos e pequenos ajustes: até 5 textos, 5 imagens ou 5 informações por pedido mensal, sem mudança de layout, estrutura ou código. Novas páginas, novas funcionalidades, redesign e integrações fora do Anexo I são orçados à parte.",
      `Valores de referência para ajustes avulsos: ${reais(AJUSTE_SITE.valor)} (${AJUSTE_SITE.o_que.toLowerCase()}) e ${reais(AJUSTE_AGENTE.valor)} (${AJUSTE_AGENTE.o_que.toLowerCase()}), por pedido.`,
      "Atendimento de suporte: de segunda a sexta, das 9h às 18h (horário de Brasília), exceto feriados, com primeira resposta em até 1 dia útil.",
    ],
  },
  {
    // Cláusulas 11.6, 11.7 e 13
    titulo: "9. Domínio, hospedagem e propriedade",
    paragrafos: [
      "Sempre que tecnicamente possível, o domínio é registrado em nome do cliente, que fica com a titularidade e as credenciais de acesso.",
      "Com o setup quitado, o site e as configurações do agente feitos para o cliente passam a ser de uso exclusivo dele. Continuam nossos os componentes, modelos, automações e métodos reutilizáveis (metodologia Sistema Origem). Podemos mostrar o projeto no nosso portfólio, salvo objeção por escrito do cliente.",
      "Encerrado o contrato, a hospedagem fica ativa por até 15 dias corridos, para o cliente poder migrar o site.",
    ],
  },
  {
    // Cláusula 8
    titulo: "10. Sobre o agente de inteligência artificial",
    paragrafos: [
      "O agente é uma ferramenta de apoio ao atendimento e não substitui por completo o atendimento humano. Ele responde com base nas informações fornecidas e aprovadas pelo cliente, que é responsável por mantê-las corretas e atualizadas. Como qualquer sistema de IA, pode eventualmente dar respostas incompletas ou imprecisas — por isso recomendamos acompanhar as conversas, e o agente encaminha para atendimento humano conforme as regras definidas no Anexo I.",
      "Não garantimos resultados específicos de vendas ou faturamento. O agente depende de número de telefone e conta comercial do WhatsApp/Meta, registrados em nome do cliente sempre que possível; bloqueios, mudanças de política ou indisponibilidades da Meta e de outros fornecedores não são de nossa responsabilidade. Falhas recorrentes de configuração nossa são ajustadas dentro da manutenção mensal.",
    ],
  },
  {
    // Cláusula 14 e Anexo II
    titulo: "11. Dados pessoais (LGPD)",
    paragrafos: [
      <>
        Nos dados dos clientes e contatos do contratante, ele é o controlador
        e nós somos operadores, tratando os dados só para as finalidades que
        ele definir. As condições estão no Anexo II – Termo de Tratamento de
        Dados Pessoais, assinado junto com o contrato. O agente informa que o
        atendimento é feito por inteligência artificial e apresenta o aviso de
        privacidade do contratante. Os dados podem ser processados por
        fornecedores de IA e de nuvem com servidores fora do Brasil. Sobre os
        dados de quem fala com a Origem Digital, veja a nossa{" "}
        <Link href="/privacidade" className="text-cyan-neon hover:underline">
          Política de Privacidade
        </Link>
        .
      </>,
    ],
  },
  {
    // Cláusula 16
    titulo: "12. Assinatura e comunicações",
    paragrafos: [
      "O contrato e seus anexos são assinados por plataforma de assinatura eletrônica (como a ZapSign). Mensagens por WhatsApp e e-mail valem como comunicação oficial entre as partes, inclusive para avisos e notificações.",
    ],
  },
  {
    // Cláusula 17
    titulo: "13. Foro",
    paragrafos: [
      "Fica eleito o foro da Comarca de São Paulo/SP. Tratando-se de relação de consumo, o cliente pessoa física pode optar pelo foro do seu próprio domicílio.",
    ],
  },
];

export default function TermosPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-28">
      <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
        Termos de Uso e Contratação
      </h1>
      <p className="mt-3 text-sm text-slate-500">
        Última atualização: outubro de 2026.
      </p>

      {/* O aviso que dá a regra do jogo: isto é resumo, o que vale é o
          contrato assinado. */}
      <p className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-relaxed text-slate-400">
        Este é um resumo das regras de contratação, para você ler antes de
        decidir. Ele não substitui o Contrato Master de Prestação de Serviços
        e seus anexos: em caso de diferença, vale o contrato assinado pelas
        duas partes.
      </p>

      <div className="mt-14 flex flex-col gap-10">
        {secoes.map((s) => (
          <section key={s.titulo}>
            <h2 className="font-display text-lg font-bold text-white">
              {s.titulo}
            </h2>
            {s.paragrafos.map((p, i) => (
              <p key={i} className="mt-4 text-sm leading-relaxed text-slate-400">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>

      <Link
        href="/"
        className="mt-16 inline-block text-sm text-cyan-neon hover:underline"
      >
        ← Voltar para o início
      </Link>
    </main>
  );
}
