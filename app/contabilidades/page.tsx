import type { Metadata } from "next";
import PaginaSegmento, { type Segmento } from "@/components/PaginaSegmento";

/**
 * PÁGINA DO RAMO: ESCRITÓRIOS DE CONTABILIDADE
 *
 * Só os textos moram aqui; o desenho é o molde components/PaginaSegmento.
 *
 * ⚠️ DECISÃO DO VITO (out/2026): a atendente informa SÓ o que é do
 * escritório — serviços, valores, documentos, prazos, horários. Qualquer
 * dúvida técnica (imposto, MEI, declaração, enquadramento) vai para o
 * contador. Orientação contábil e fiscal é de quem tem registro no CRC.
 */

export const metadata: Metadata = {
  title: "Site e atendente de IA no WhatsApp para contabilidades — Origem Digital",
  description:
    "Site profissional e atendente de inteligência artificial que responde clientes do seu escritório de contabilidade no WhatsApp 24 horas por dia — serviços, valores e documentos — e passa toda dúvida técnica para o contador. Primeira versão em até 15 dias úteis.",
  alternates: { canonical: "/contabilidades" },
  openGraph: {
    title: "Site e atendente de IA no WhatsApp para contabilidades",
    description: "Seu escritório respondendo clientes no WhatsApp, a qualquer hora — sem tirar o contador da planilha.",
    locale: "pt_BR",
    type: "website",
    siteName: "Origem Digital",
  },
};

const contabilidades: Segmento = {
  mensagemWhatsApp: "Olá! Tenho um escritório de contabilidade e quero o diagnóstico gratuito.",
  textoBotao: "Quero o diagnóstico do meu escritório",

  capa: {
    etiqueta: "Para escritórios de contabilidade",
    titulo: "Seu escritório respondendo clientes",
    destaque: "sem tirar o contador da planilha.",
    apoio:
      "Site profissional e uma atendente de inteligência artificial que informa serviços, valores, documentos e prazos do escritório — e passa toda dúvida técnica para o contador.",
    selos: ["Treinada com os serviços do seu escritório", "Dúvida de imposto vai para o contador", "Primeira versão em até 15 dias úteis"],
  },

  conversa: {
    nome: "Contábil Exemplo",
    iniciais: "CE",
    aviso: "Conversa de exemplo. Escritório e valores ilustrativos.",
    falas: [
      { de: "cliente", texto: "Boa noite! Quanto vocês cobram para cuidar de um MEI?", hora: "20:05" },
      {
        de: "aurora",
        texto:
          "Boa noite! Sou a assistente virtual da Contábil Exemplo, um atendimento feito por inteligência artificial. O acompanhamento de MEI sai a partir de R$ 89 por mês, com a declaração anual inclusa.",
        hora: "20:05",
        pensando: 1400,
      },
      { de: "aurora", texto: "Posso agendar uma conversa com o nosso contador: amanhã às 10h ou às 16h?", hora: "20:05", pensando: 1000 },
      { de: "cliente", texto: "16h. Ah, eu passei do limite de faturamento do MEI esse ano, e agora?", hora: "20:06" },
      {
        de: "aurora",
        texto:
          "Essa é uma questão técnica, e quem orienta com segurança é o contador. Anotei a conversa de amanhã às 16h com esse assunto, para ele já chegar preparado ✅",
        hora: "20:06",
        pensando: 1500,
      },
    ],
  },

  dores: {
    etiqueta: "O dia a dia do escritório",
    titulo: "Onde o escritório perde cliente sem perceber.",
    itens: [
      {
        titulo: "A época de declaração",
        texto: "Quando o trabalho explode, as mensagens de quem quer contratar ficam sem resposta — justo quando mais gente procura contador.",
      },
      {
        titulo: "As mesmas perguntas",
        texto: "Quanto custa? Quais documentos eu mando? Qual o prazo? Respondidas uma a uma, por quem devia estar fechando balanço.",
      },
      {
        titulo: "O contato que esfriou",
        texto: "Quem pede orçamento e não recebe resposta no mesmo dia já está conversando com outro escritório no dia seguinte.",
      },
    ],
  },

  entrega: {
    etiqueta: "O que o seu escritório recebe",
    titulo: "Uma atendente que organiza a chegada de clientes, e um site que passa credibilidade.",
    atendente: [
      "Responde em segundos, 24 horas por dia: serviços, valores de referência, documentos pedidos, prazos e horários do escritório — só com as informações que você aprovar.",
      "Não responde dúvida técnica: imposto, MEI, declaração e enquadramento vão sempre para o contador.",
      "Registra quem quer contratar — nome, tipo de empresa e serviço de interesse — e encaminha para a sua equipe.",
      "Encaminha a reunião. No Agente Avançado, ela é ligada ao Google Agenda e marca o horário direto; no Essencial, anota o pedido e passa para a equipe confirmar.",
      "Avisa que é um atendimento por inteligência artificial e mostra o aviso de privacidade do escritório.",
    ],
    siteApoio: "Quem procura contador no Google encontra uma página que mostra os seus serviços, a sua experiência e o caminho direto para conversar.",
    site: [
      "Serviços por tipo de cliente (MEI, Simples Nacional, profissionais liberais)",
      "Endereço no Google Maps e botão direto para o WhatsApp",
      "Pensado para o celular, que é onde o cliente procura",
      "No Site Completo: blog, para o escritório aparecer no Google respondendo dúvidas comuns, e formulários",
      "Domínio, hospedagem e manutenção inclusos na mensalidade",
    ],
  },

  nomeSite: "Site do escritório",
  tituloPreco: "Quanto custa para o seu escritório.",

  perguntas: {
    etiqueta: "Perguntas de quem tem escritório",
    titulo: "O que todo contador pergunta antes de decidir.",
    itens: [
      {
        q: "Ela responde dúvida de imposto?",
        a: "Não. Ela informa só o que é do escritório — serviços, valores, documentos, prazos e horários — e passa toda dúvida técnica para o contador. Orientação contábil e fiscal é responsabilidade de quem tem registro no CRC, e a atendente deixa isso claro para o cliente.",
      },
      {
        q: "E os dados dos meus clientes?",
        a: "Seguem a Lei Geral de Proteção de Dados. A atendente avisa que é um atendimento por inteligência artificial e mostra o aviso de privacidade do escritório. O escritório é o dono dos dados e nós só os usamos para o atendimento, conforme um termo de tratamento de dados assinado junto com o contrato.",
      },
      {
        q: "A atendente vai saber os serviços do meu escritório?",
        a: "Sim. Antes de começar, definimos juntos, por escrito, tudo o que ela vai saber: serviços, valores de referência, documentos pedidos, prazos e horários — e o que ela nunca deve responder. Você escolhe o nome dela e o tom de voz. Ela atende só com as informações que você aprovar.",
      },
      {
        q: "E se ela responder errado para um cliente?",
        a: "Ela foi feita para não inventar: responde só com o que você aprovou e, quando não sabe a resposta, quando o cliente reclama ou pede uma pessoa, passa a conversa para a sua equipe. Como todo sistema de inteligência artificial, pode errar de vez em quando — por isso você acompanha as conversas, e qualquer falha de configuração nossa é corrigida dentro da manutenção mensal.",
      },
      {
        q: "Quanto tempo leva para ficar pronto?",
        a: "A primeira versão fica pronta em até 15 dias úteis, contados depois do pagamento da entrada e do envio de todo o material — textos, fotos, logo e acessos. Você tem até 5 dias úteis para aprovar ou pedir ajustes (são até 4 rodadas incluídas) e, aprovado, vai ao ar em até 5 dias úteis. Vale para o site e para a atendente.",
      },
    ],
  },

  fechamento: {
    titulo: "Quer ver como ficaria",
    destaque: "no seu escritório?",
    texto:
      "No diagnóstico gratuito, em 10 a 15 minutos pelo WhatsApp, mostramos onde o atendimento do seu escritório está travando — e você sai com uma proposta por escrito.",
  },
};

export default function Contabilidades() {
  return <PaginaSegmento s={contabilidades} />;
}
