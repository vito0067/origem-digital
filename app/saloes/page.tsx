import type { Metadata } from "next";
import PaginaSegmento, { type Segmento } from "@/components/PaginaSegmento";

/**
 * PÁGINA DO RAMO: SALÕES, BARBEARIAS E ESTÉTICA
 *
 * Só os textos moram aqui; o desenho é o molde components/PaginaSegmento.
 *
 * A dor do salão: quem atende está com a tesoura, o secador ou a pinça na
 * mão, e o preço de muitos serviços depende de ver o cabelo. Por isso a
 * atendente informa a FAIXA de valor aprovada e deixa claro que a
 * profissional confirma — nunca promete um preço que o salão não combinou.
 */

export const metadata: Metadata = {
  title: "Site e atendente de IA no WhatsApp para salões e barbearias — Origem Digital",
  description:
    "Site profissional e atendente de inteligência artificial que responde clientes do seu salão no WhatsApp 24 horas por dia, informa preços e encaminha o agendamento. Primeira versão em até 15 dias úteis.",
  alternates: { canonical: "/saloes" },
  openGraph: {
    title: "Site e atendente de IA no WhatsApp para salões",
    description: "Seu salão respondendo clientes no WhatsApp, a qualquer hora — sem você largar a cadeira.",
    locale: "pt_BR",
    type: "website",
    siteName: "Origem Digital",
  },
};

const saloes: Segmento = {
  mensagemWhatsApp: "Olá! Tenho um salão e quero o diagnóstico gratuito.",
  textoBotao: "Quero o diagnóstico do meu salão",

  capa: {
    etiqueta: "Para salões, barbearias e estética",
    titulo: "Seu salão respondendo clientes",
    destaque: "enquanto você está com a tesoura na mão.",
    apoio:
      "Site profissional e uma atendente de inteligência artificial que informa serviços, preços e horários e encaminha o agendamento — sem você largar o atendimento da cadeira.",
    selos: ["Treinada com os serviços e preços do seu salão", "Encaminha o agendamento", "Primeira versão em até 15 dias úteis"],
  },

  conversa: {
    nome: "Studio Exemplo",
    iniciais: "SE",
    aviso: "Conversa de exemplo. Salão e valores ilustrativos.",
    falas: [
      { de: "cliente", texto: "Oi! Quanto custa escova progressiva? Meu cabelo é longo.", hora: "21:08" },
      {
        de: "aurora",
        texto:
          "Oi! Sou a assistente virtual do Studio Exemplo, um atendimento feito por inteligência artificial. Para cabelo longo, a progressiva sai a partir de R$ 220 — o valor final a cabeleireira confirma na hora, conforme o volume.",
        hora: "21:08",
        pensando: 1400,
      },
      { de: "aurora", texto: "Tenho horário na sexta às 10h ou no sábado às 15h. Quer que eu reserve um deles?", hora: "21:08", pensando: 1100 },
      { de: "cliente", texto: "Sábado às 15h!", hora: "21:09" },
      {
        de: "aurora",
        texto: "Anotado: progressiva no sábado às 15h ✅ Passei para a equipe, que confirma com você amanhã de manhã.",
        hora: "21:09",
        pensando: 1300,
      },
    ],
  },

  dores: {
    etiqueta: "O dia a dia do salão",
    titulo: "Onde o salão perde cliente sem perceber.",
    itens: [
      {
        titulo: "As mãos ocupadas",
        texto:
          "Com a tesoura, o secador ou a pinça na mão, não dá para responder. A cliente pergunta o preço, espera — e marca onde responderam primeiro.",
      },
      {
        titulo: "A agenda espalhada",
        texto:
          "Horários anotados no caderno e em conversas soltas. Fica difícil saber o que está livre — e mais difícil ainda responder rápido.",
      },
      {
        titulo: "A mesma pergunta o dia todo",
        texto: "Quanto custa? Quanto tempo demora? Tem horário amanhã? Respondidas uma a uma, entre um atendimento e outro.",
      },
    ],
  },

  entrega: {
    etiqueta: "O que o seu salão recebe",
    titulo: "Uma atendente que não deixa cliente esperando, e um site que mostra o seu trabalho.",
    atendente: [
      "Responde em segundos, 24 horas por dia: serviços, preços de referência, duração, endereço e formas de pagamento — só com as informações que o salão aprovar.",
      "Encaminha o agendamento. No Agente Avançado, ela é ligada ao Google Agenda e marca o horário direto; no Essencial, anota o pedido e passa para a equipe confirmar.",
      "Quando o preço depende de avaliação (comprimento, volume, técnica), informa a faixa de valor aprovada e deixa claro que a profissional confirma.",
      "Chama a equipe quando a cliente pede para falar com alguém, reclama ou pergunta algo que ela não sabe.",
      "Avisa que é um atendimento por inteligência artificial e mostra o aviso de privacidade do salão.",
    ],
    siteApoio: "Quem procura salão no Google encontra uma página com o seu trabalho em fotos, os serviços e o caminho direto para o WhatsApp.",
    site: [
      "Serviços, preços de referência e fotos dos trabalhos",
      "Endereço no Google Maps e botão direto para o WhatsApp",
      "Pensado para o celular, que é onde a cliente procura",
      "No Site Completo: páginas por serviço, blog e formulários",
      "Domínio, hospedagem e manutenção inclusos na mensalidade",
    ],
  },

  nomeSite: "Site do salão",
  tituloPreco: "Quanto custa para o seu salão.",

  perguntas: {
    etiqueta: "Perguntas de quem tem salão",
    titulo: "O que todo dono de salão pergunta antes de decidir.",
    itens: [
      {
        q: "A atendente vai saber os serviços e preços do meu salão?",
        a: "Sim. Antes de começar, definimos juntos, por escrito, tudo o que ela vai saber: serviços, preços, duração, horários, endereço, formas de pagamento, o jeito como a sua equipe fala com as clientes — e o que ela nunca deve responder. Você escolhe o nome dela e o tom de voz. Ela atende só com as informações que você aprovar.",
      },
      {
        q: "Ela consegue marcar direto na minha agenda?",
        a: "No Agente Avançado, sim: ela é ligada ao Google Agenda e marca o horário direto. No Essencial, ela anota o pedido — serviço, dia e horário preferidos — e passa para a sua equipe confirmar.",
      },
      {
        q: "E quando o preço depende de ver o cabelo?",
        a: "Ela informa a faixa de valor que você aprovar e avisa que o preço final é confirmado pela profissional. Nada de prometer um valor que você não combinou.",
      },
      {
        q: "E se ela responder errado para uma cliente?",
        a: "Ela foi feita para não inventar: responde só com o que você aprovou e, quando não sabe a resposta, quando a cliente reclama ou pede uma pessoa, passa a conversa para a sua equipe. Como todo sistema de inteligência artificial, pode errar de vez em quando — por isso você acompanha as conversas, e qualquer falha de configuração nossa é corrigida dentro da manutenção mensal.",
      },
      {
        q: "Quanto tempo leva para ficar pronto?",
        a: "A primeira versão fica pronta em até 15 dias úteis, contados depois do pagamento da entrada e do envio de todo o material — textos, fotos, logo e acessos. Você tem até 5 dias úteis para aprovar ou pedir ajustes (são até 4 rodadas incluídas) e, aprovado, vai ao ar em até 5 dias úteis. Vale para o site e para a atendente.",
      },
    ],
  },

  fechamento: {
    titulo: "Quer ver como ficaria",
    destaque: "no seu salão?",
    texto:
      "No diagnóstico gratuito, em 10 a 15 minutos pelo WhatsApp, mostramos onde o atendimento do seu salão está travando — e você sai com uma proposta por escrito.",
  },
};

export default function Saloes() {
  return <PaginaSegmento s={saloes} />;
}
