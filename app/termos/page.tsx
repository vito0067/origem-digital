import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de Uso e Contratação — Origem Digital",
  description:
    "Prazo de entrega, direito de arrependimento, carência, cancelamento e responsabilidades na contratação de sites e agentes de IA da Origem Digital.",
};

/**
 * TERMOS DE USO E CONTRATAÇÃO
 *
 * Texto igual ao que já está publicado — não foi reescrito nem
 * "melhorado". Documento com efeito jurídico não se mexe por conta de
 * layout: os prazos daqui são os mesmos que a seção de garantias
 * promete na página inicial, e três cláusulas ainda aguardam revisão
 * de advogado.
 *
 * Se algum prazo mudar aqui, mude também em components/Garantias.tsx.
 */

type Secao = {
  titulo: string;
  paragrafos: React.ReactNode[];
};

const secoes: Secao[] = [
  {
    titulo: "1. Quem presta o serviço",
    paragrafos: [
      "A Origem Digital é uma operação de tecnologia sediada em São Paulo/SP, sob responsabilidade de Samantha Mañe Carrieri Portella Scaglione. Contato oficial: origemdigital00@gmail.com e WhatsApp (11) 93929-9209.",
    ],
  },
  {
    titulo: "2. O que oferecemos",
    paragrafos: [
      "Desenvolvimento de sites profissionais e implantação de agentes de atendimento com inteligência artificial no WhatsApp, com valor de setup na contratação e mensalidade de manutenção. O escopo exato de cada projeto é definido em contrato e anexo próprios, assinados antes do início dos trabalhos.",
    ],
  },
  {
    titulo: "3. Prazo e garantia de implantação",
    paragrafos: [
      "O prazo de entrega é de até 14 dias corridos, contados a partir da confirmação do projeto e do envio, pelo cliente, de todo o material necessário. Se o projeto não estiver no ar nesse prazo por responsabilidade nossa, seguimos trabalhando sem nenhum custo adicional até concluí-lo.",
    ],
  },
  {
    titulo: "4. Direito de arrependimento",
    paragrafos: [
      "Por se tratar de contratação à distância, o cliente pessoa física tem direito de desistir em até 7 dias corridos contados da assinatura, com devolução integral dos valores pagos, conforme o art. 49 do Código de Defesa do Consumidor. Basta comunicar por WhatsApp ou e-mail, sem necessidade de justificativa.",
    ],
  },
  {
    titulo: "5. Carência e cancelamento",
    paragrafos: [
      "Nos primeiros 30 dias da assinatura, o cliente pode cancelar sem qualquer multa. Após esse período, o cancelamento antes do fim da fidelidade contratada sujeita o cliente à multa prevista em contrato. Em qualquer hipótese, o cancelamento exige aviso prévio por escrito de 30 dias, por WhatsApp ou e-mail.",
    ],
  },
  {
    titulo: "6. Domínio e conteúdo",
    paragrafos: [
      "Sempre que tecnicamente possível, o domínio é registrado em nome do próprio cliente, que detém a titularidade e as credenciais de acesso. O site é seu, não nosso.",
      "Os textos, imagens e informações fornecidos pelo cliente são de sua responsabilidade, inclusive quanto a direitos de uso e à veracidade do que é publicado.",
    ],
  },
  {
    titulo: "7. Sobre o agente de inteligência artificial",
    paragrafos: [
      "O agente é treinado com as informações e os preços fornecidos pelo cliente e opera dentro desse escopo. Como qualquer sistema baseado em IA, ele pode eventualmente responder de forma imprecisa, e por isso não substitui orientação profissional — especialmente em áreas de saúde, jurídica ou financeira.",
      "Cabe ao cliente manter as informações atualizadas e revisar o atendimento periodicamente. O agente sempre encaminha para atendimento humano quando o assunto foge do que foi configurado.",
    ],
  },
  {
    titulo: "8. Disponibilidade e dependências de terceiros",
    paragrafos: [
      "Nossos serviços dependem de plataformas de terceiros, como WhatsApp, provedores de hospedagem e provedores de inteligência artificial. Indisponibilidades causadas por esses terceiros fogem ao nosso controle, e nos comprometemos a restabelecer o serviço no menor prazo possível.",
    ],
  },
  {
    titulo: "9. Privacidade",
    paragrafos: [
      <>
        O tratamento de dados pessoais segue a Lei Geral de Proteção de Dados e
        está detalhado na nossa{" "}
        <Link href="/privacidade" className="text-cyan-neon hover:underline">
          Política de Privacidade
        </Link>
        .
      </>,
    ],
  },
  {
    titulo: "10. Foro",
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
        Última atualização: setembro de 2026.
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
