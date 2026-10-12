import type { Metadata } from "next";
import PaginaSegmento, { type Segmento } from "@/components/PaginaSegmento";

/**
 * PÁGINA DO RAMO: PRESTADORES DE SERVIÇO
 *
 * Só os textos moram aqui; o desenho é o molde components/PaginaSegmento.
 *
 * ⚠️ DECISÃO DO VITO (out/2026): os exemplos são três grupos —
 *   personal trainers e estúdios (pilates, dança, luta);
 *   advogados e consultores;
 *   fotógrafos e profissionais de eventos (buffet, decoração, DJ).
 *
 * A atendente apresenta o trabalho, informa valores e encaminha o
 * agendamento. Orientação técnica (treino, questão jurídica, detalhe do
 * projeto) fica sempre com o profissional. Para advogados: ela não dá
 * consulta nem promete resultado.
 */

export const metadata: Metadata = {
  title: "Site e atendente de IA no WhatsApp para prestadores de serviço — Origem Digital",
  description:
    "Site profissional e atendente de inteligência artificial para personal trainers, estúdios, advogados, consultores, fotógrafos e profissionais de eventos. Responde clientes no WhatsApp 24 horas por dia e encaminha o agendamento. Primeira versão em até 15 dias úteis.",
  alternates: { canonical: "/prestadores" },
  openGraph: {
    title: "Site e atendente de IA no WhatsApp para prestadores de serviço",
    description: "O seu serviço respondendo clientes no WhatsApp, a qualquer hora — enquanto você está trabalhando.",
    locale: "pt_BR",
    type: "website",
    siteName: "Origem Digital",
  },
};

const prestadores: Segmento = {
  mensagemWhatsApp: "Olá! Sou prestador de serviço e quero o diagnóstico gratuito.",
  textoBotao: "Quero o diagnóstico do meu negócio",

  capa: {
    etiqueta: "Para personal trainers, estúdios, advogados, consultores, fotógrafos e eventos",
    titulo: "Seu serviço respondendo clientes",
    destaque: "enquanto você está trabalhando.",
    apoio:
      "Site profissional e uma atendente de inteligência artificial que apresenta o seu trabalho, informa valores e disponibilidade e encaminha o agendamento — no meio da aula, da reunião ou do evento.",
    selos: ["Treinada com os seus serviços e valores", "Não dá orientação técnica no seu lugar", "Primeira versão em até 15 dias úteis"],
  },

  conversa: {
    nome: "Foto Exemplo",
    iniciais: "FE",
    aviso: "Conversa de exemplo. Profissional e valores ilustrativos.",
    falas: [
      { de: "cliente", texto: "Oi! Você faz ensaio de 15 anos? Quanto custa?", hora: "23:12" },
      {
        de: "aurora",
        texto:
          "Oi! Sou a assistente virtual da Foto Exemplo, um atendimento feito por inteligência artificial. Fazemos sim! O ensaio externo de 2 horas sai a partir de R$ 650, com 40 fotos editadas.",
        hora: "23:12",
        pensando: 1400,
      },
      { de: "aurora", texto: "Qual data você tem em mente? Eu anoto e a fotógrafa confere a agenda.", hora: "23:12", pensando: 1000 },
      { de: "cliente", texto: "Dia 14 de dezembro, à tarde.", hora: "23:13" },
      {
        de: "aurora",
        texto: "Anotado: ensaio de 15 anos, 14/12 à tarde ✅ A fotógrafa confirma a disponibilidade com você amanhã de manhã.",
        hora: "23:13",
        pensando: 1300,
      },
    ],
  },

  dores: {
    etiqueta: "O dia a dia de quem presta serviço",
    titulo: "Onde o prestador de serviço perde cliente sem perceber.",
    itens: [
      {
        titulo: "Ocupado atendendo",
        texto:
          "No meio da aula, da reunião ou do evento, não dá para pegar o celular. O cliente pergunta o valor, espera — e fecha com quem respondeu primeiro.",
      },
      {
        titulo: "A agenda espalhada",
        texto: "Pedido de horário no WhatsApp, no Instagram, na ligação. Fica difícil saber o que está livre e responder rápido.",
      },
      {
        titulo: "Explicar tudo de novo",
        texto: "Como funciona, quanto custa, o que está incluso. A mesma explicação, cliente por cliente, por quem devia estar trabalhando.",
      },
    ],
  },

  entrega: {
    etiqueta: "O que o seu negócio recebe",
    titulo: "Uma atendente que apresenta o seu trabalho, e um site que mostra por que contratar você.",
    atendente: [
      "Responde em segundos, 24 horas por dia: serviços, valores de referência, como funciona, endereço ou região de atendimento — só com as informações que você aprovar.",
      "Encaminha o agendamento. No Agente Avançado, ela é ligada ao Google Agenda e marca o horário direto; no Essencial, anota o pedido e passa para você confirmar.",
      "Não dá orientação técnica no seu lugar: treino, questão jurídica ou detalhe do projeto ficam com você.",
      "Chama você quando o cliente pede para falar com alguém, reclama ou pergunta algo que ela não sabe.",
      "Avisa que é um atendimento por inteligência artificial e mostra o seu aviso de privacidade.",
    ],
    siteApoio: "Quem procura o seu serviço no Google encontra uma página com o seu trabalho, a sua experiência e o caminho direto para o WhatsApp.",
    site: [
      "Serviços, valores de referência e fotos ou portfólio",
      "Endereço ou região de atendimento e botão direto para o WhatsApp",
      "Pensado para o celular, que é onde o cliente procura",
      "No Site Completo: páginas por serviço, blog e formulários",
      "Domínio, hospedagem e manutenção inclusos na mensalidade",
    ],
  },

  nomeSite: "Site profissional",
  tituloPreco: "Quanto custa para o seu negócio.",

  perguntas: {
    etiqueta: "Perguntas de quem presta serviço",
    titulo: "O que todo prestador de serviço pergunta antes de decidir.",
    itens: [
      {
        q: "Serve para o meu tipo de serviço?",
        a: "Se você vende serviço e marca horário, serve: personal trainers e estúdios (pilates, dança, luta), advogados e consultores, fotógrafos e profissionais de eventos (buffet, decoração, DJ). No diagnóstico gratuito a gente vê, com você, como a atendente se encaixa na sua rotina.",
      },
      {
        q: "Ela dá orientação técnica?",
        a: "Não. Ela apresenta o seu trabalho, informa valores e encaminha o agendamento. Treino, questão jurídica, detalhe técnico do projeto: tudo isso fica com você. Para advogados, ela não dá consulta nem promete resultado — só organiza a chegada do cliente.",
      },
      {
        q: "A atendente vai saber os meus serviços e valores?",
        a: "Sim. Antes de começar, definimos juntos, por escrito, tudo o que ela vai saber: serviços, valores de referência, como funciona, horários e região de atendimento — e o que ela nunca deve responder. Você escolhe o nome dela e o tom de voz. Ela atende só com as informações que você aprovar.",
      },
      {
        q: "E se ela responder errado para um cliente?",
        a: "Ela foi feita para não inventar: responde só com o que você aprovou e, quando não sabe a resposta, quando o cliente reclama ou pede uma pessoa, passa a conversa para você. Como todo sistema de inteligência artificial, pode errar de vez em quando — por isso você acompanha as conversas, e qualquer falha de configuração nossa é corrigida dentro da manutenção mensal.",
      },
      {
        q: "Quanto tempo leva para ficar pronto?",
        a: "A primeira versão fica pronta em até 15 dias úteis, contados depois do pagamento da entrada e do envio de todo o material — textos, fotos, logo e acessos. Você tem até 5 dias úteis para aprovar ou pedir ajustes (são até 4 rodadas incluídas) e, aprovado, vai ao ar em até 5 dias úteis. Vale para o site e para a atendente.",
      },
    ],
  },

  fechamento: {
    titulo: "Quer ver como ficaria",
    destaque: "no seu negócio?",
    texto:
      "No diagnóstico gratuito, em 10 a 15 minutos pelo WhatsApp, mostramos onde você está perdendo cliente — e você sai com uma proposta por escrito.",
  },
};

export default function Prestadores() {
  return <PaginaSegmento s={prestadores} />;
}
