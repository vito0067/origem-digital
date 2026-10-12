import type { Metadata } from "next";
import PaginaSegmento, { type Segmento } from "@/components/PaginaSegmento";

/**
 * PÁGINA DO RAMO: OFICINAS MECÂNICAS E CENTROS AUTOMOTIVOS
 *
 * Só os textos moram aqui; o desenho é o molde components/PaginaSegmento.
 *
 * A atendente informa preços de REFERÊNCIA (troca de óleo, alinhamento)
 * e recebe a descrição do problema, o modelo e o ano do carro para o
 * mecânico orçar. Diagnóstico e orçamento fechado ficam sempre com a
 * oficina — como a saúde fica com o médico na página de clínicas.
 */

export const metadata: Metadata = {
  title: "Site e atendente de IA no WhatsApp para oficinas mecânicas — Origem Digital",
  description:
    "Site profissional e atendente de inteligência artificial que responde clientes da sua oficina no WhatsApp 24 horas por dia, informa preços de referência e encaminha o orçamento e o agendamento. Primeira versão em até 15 dias úteis.",
  alternates: { canonical: "/oficinas" },
  openGraph: {
    title: "Site e atendente de IA no WhatsApp para oficinas",
    description: "Sua oficina respondendo clientes no WhatsApp, a qualquer hora — sem parar o serviço.",
    locale: "pt_BR",
    type: "website",
    siteName: "Origem Digital",
  },
};

const oficinas: Segmento = {
  mensagemWhatsApp: "Olá! Tenho uma oficina e quero o diagnóstico gratuito.",
  textoBotao: "Quero o diagnóstico da minha oficina",

  capa: {
    etiqueta: "Para oficinas mecânicas e centros automotivos",
    titulo: "Sua oficina respondendo clientes",
    destaque: "sem parar o serviço.",
    apoio:
      "Site profissional e uma atendente de inteligência artificial que informa serviços, horários e preços de referência, recebe a descrição do problema e encaminha para o mecânico orçar — enquanto você está debaixo do carro.",
    selos: ["Recebe o pedido e passa para o orçamento", "Não dá diagnóstico do carro", "Primeira versão em até 15 dias úteis"],
  },

  conversa: {
    nome: "Auto Center Exemplo",
    iniciais: "AC",
    aviso: "Conversa de exemplo. Oficina e valores ilustrativos.",
    falas: [
      { de: "cliente", texto: "Boa tarde! Quanto custa a troca de óleo de um Onix 2020?", hora: "18:37" },
      {
        de: "aurora",
        texto:
          "Boa tarde! Sou a assistente virtual do Auto Center Exemplo, um atendimento feito por inteligência artificial. A troca de óleo com filtro para o Onix sai a partir de R$ 190, conforme o óleo indicado no manual.",
        hora: "18:37",
        pensando: 1400,
      },
      { de: "aurora", texto: "Tenho horário amanhã às 8h ou às 13h. Quer que eu reserve?", hora: "18:37", pensando: 1000 },
      { de: "cliente", texto: "8h. E tem um barulho estranho quando eu freio, o que pode ser?", hora: "18:38" },
      {
        de: "aurora",
        texto:
          "Isso só o mecânico consegue avaliar com o carro aqui, combinado? Anotei a troca de óleo amanhã às 8h e pedi para ele olhar o freio — a equipe confirma com você ✅",
        hora: "18:38",
        pensando: 1500,
      },
    ],
  },

  dores: {
    etiqueta: "O dia a dia da oficina",
    titulo: "Onde a oficina perde cliente sem perceber.",
    itens: [
      {
        titulo: "As mãos sujas de graxa",
        texto:
          "Ninguém atende o celular no meio do serviço. O cliente pergunta o preço da revisão, espera — e leva o carro onde responderam primeiro.",
      },
      {
        titulo: "O orçamento que ninguém mandou",
        texto: "O cliente descreve o problema, a mensagem fica para depois e o depois não chega. Às vezes, era o serviço grande do mês.",
      },
      {
        titulo: "Fora do Google",
        texto:
          "Quem está com o carro parado procura “oficina perto de mim”. Se a sua não aparece com telefone e endereço, ele chama a próxima.",
      },
    ],
  },

  entrega: {
    etiqueta: "O que a sua oficina recebe",
    titulo: "Uma atendente que segura o cliente enquanto você trabalha, e um site que passa confiança.",
    atendente: [
      "Responde em segundos, 24 horas por dia: serviços, preços de referência, horários, endereço e formas de pagamento — só com as informações que a oficina aprovar.",
      "Recebe a descrição do problema, o modelo e o ano do carro, e passa para o mecânico fazer o orçamento.",
      "Encaminha o agendamento. No Agente Avançado, ela é ligada ao Google Agenda e marca o horário direto; no Essencial, anota o pedido e passa para a equipe confirmar.",
      "Não dá diagnóstico nem orçamento fechado: o que depende de ver o carro fica com o mecânico.",
      "Avisa que é um atendimento por inteligência artificial e mostra o aviso de privacidade da oficina.",
    ],
    siteApoio: "Quem procura oficina no Google encontra uma página com os seus serviços, o endereço e o caminho direto para o WhatsApp.",
    site: [
      "Serviços, marcas atendidas e fotos da oficina",
      "Endereço no Google Maps e botão direto para o WhatsApp",
      "Pensado para o celular — muita gente procura com o carro parado",
      "No Site Completo: páginas por serviço, blog e formulários de orçamento",
      "Domínio, hospedagem e manutenção inclusos na mensalidade",
    ],
  },

  nomeSite: "Site da oficina",
  tituloPreco: "Quanto custa para a sua oficina.",

  perguntas: {
    etiqueta: "Perguntas de quem tem oficina",
    titulo: "O que todo dono de oficina pergunta antes de decidir.",
    itens: [
      {
        q: "Ela faz orçamento?",
        a: "Ela informa os preços de referência que você aprovar — troca de óleo, alinhamento, revisão — e, para o resto, recebe a descrição do problema, o modelo e o ano do carro e passa para o mecânico orçar. Diagnóstico e orçamento fechado são sempre com você.",
      },
      {
        q: "A atendente vai saber os serviços da minha oficina?",
        a: "Sim. Antes de começar, definimos juntos, por escrito, tudo o que ela vai saber: serviços, preços de referência, marcas atendidas, horários, endereço e formas de pagamento — e o que ela nunca deve responder. Você escolhe o nome dela e o tom de voz.",
      },
      {
        q: "Funciona fora do horário da oficina?",
        a: "Sim, 24 horas por dia. O cliente que escreve à noite já deixa o pedido anotado, e a sua equipe confirma no próximo horário de atendimento.",
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
    destaque: "na sua oficina?",
    texto:
      "No diagnóstico gratuito, em 10 a 15 minutos pelo WhatsApp, mostramos onde a sua oficina está perdendo cliente — e você sai com uma proposta por escrito.",
  },
};

export default function Oficinas() {
  return <PaginaSegmento s={oficinas} />;
}
