import type { Metadata } from "next";
import PaginaSegmento, { type Segmento } from "@/components/PaginaSegmento";

/**
 * PÁGINA DO RAMO: RESTAURANTES, LANCHONETES E DELIVERY
 *
 * Só os textos moram aqui; o desenho é o molde components/PaginaSegmento.
 *
 * ⚠️ DECISÃO DO VITO (out/2026): a atendente TIRA DÚVIDAS E MANDA O
 * CARDÁPIO / O LINK DE PEDIDO. Ela não fecha pedido nem confirma valor
 * sozinha — o pedido entra no canal que o restaurante já controla (site,
 * cardápio digital, aplicativo de entrega). Não prometa mais que isso.
 *
 * Alergia e restrição alimentar séria vão sempre para a equipe.
 */

export const metadata: Metadata = {
  title: "Site e atendente de IA no WhatsApp para restaurantes — Origem Digital",
  description:
    "Site profissional e atendente de inteligência artificial que responde clientes do seu restaurante no WhatsApp 24 horas por dia: horário, cardápio, taxa de entrega e o link certo para o pedido. Primeira versão em até 15 dias úteis.",
  alternates: { canonical: "/restaurantes" },
  openGraph: {
    title: "Site e atendente de IA no WhatsApp para restaurantes",
    description: "Seu restaurante respondendo na hora da fome — com o cardápio e o link de pedido na mão do cliente.",
    locale: "pt_BR",
    type: "website",
    siteName: "Origem Digital",
  },
};

const restaurantes: Segmento = {
  mensagemWhatsApp: "Olá! Tenho um restaurante e quero o diagnóstico gratuito.",
  textoBotao: "Quero o diagnóstico do meu restaurante",

  capa: {
    etiqueta: "Para restaurantes, lanchonetes e delivery",
    titulo: "Seu restaurante respondendo clientes",
    destaque: "na hora da fome, não depois.",
    apoio:
      "Site profissional e uma atendente de inteligência artificial que responde horário, cardápio, taxa de entrega e formas de pagamento, e manda o link certo para o pedido — no pico do almoço e do jantar.",
    selos: ["Manda o cardápio e o link de pedido", "Não fecha pedido sozinha", "Primeira versão em até 15 dias úteis"],
  },

  conversa: {
    nome: "Cantina Exemplo",
    iniciais: "CE",
    aviso: "Conversa de exemplo. Restaurante e valores ilustrativos.",
    falas: [
      { de: "cliente", texto: "Boa noite! Vocês entregam no Jardim Paulista? Qual a taxa?", hora: "19:52" },
      {
        de: "aurora",
        texto:
          "Boa noite! Sou a assistente virtual da Cantina Exemplo, um atendimento feito por inteligência artificial. Entregamos sim no Jardim Paulista: a taxa é R$ 8.",
        hora: "19:52",
        pensando: 1300,
      },
      { de: "aurora", texto: "O cardápio completo e o pedido estão aqui: cantinaexemplo.com.br/pedido 🍝", hora: "19:52", pensando: 1000 },
      { de: "cliente", texto: "Tem opção sem glúten? Tenho doença celíaca.", hora: "19:53" },
      {
        de: "aurora",
        texto:
          "O cardápio marca os pratos sem glúten. Como é doença celíaca, pedi para a nossa equipe te chamar agora e confirmar os ingredientes antes do pedido, combinado? ✅",
        hora: "19:53",
        pensando: 1500,
      },
    ],
  },

  dores: {
    etiqueta: "O dia a dia do restaurante",
    titulo: "Onde o restaurante perde pedido sem perceber.",
    itens: [
      {
        titulo: "O pico do almoço",
        texto:
          "É quando chegam mais mensagens — e quando ninguém tem um minuto para responder. Quem está com fome não espera: pede em outro lugar.",
      },
      {
        titulo: "As mesmas perguntas",
        texto: "Que horas abre? Entrega no meu bairro? Qual a taxa? Aceita Pix? Respondidas uma a uma, dezenas de vezes por dia.",
      },
      {
        titulo: "O cardápio perdido",
        texto: "Foto do cardápio desatualizada, preço antigo, link que ninguém acha. O cliente desiste antes de chegar ao pedido.",
      },
    ],
  },

  entrega: {
    etiqueta: "O que o seu restaurante recebe",
    titulo: "Uma atendente que responde na hora da fome, e um site que abre o apetite.",
    atendente: [
      "Responde em segundos, 24 horas por dia: horário de funcionamento, bairros e taxas de entrega, formas de pagamento e cardápio — só com as informações que o restaurante aprovar.",
      "Manda o link certo para o pedido: o seu site, o seu cardápio digital ou o seu aplicativo de entrega.",
      "Não fecha pedido nem confirma valor sozinha: o pedido entra no canal que você já controla, com preço, pagamento e cozinha do seu jeito.",
      "Alergia, restrição séria, reclamação ou pedido para falar com alguém vão direto para a sua equipe.",
      "Avisa que é um atendimento por inteligência artificial e mostra o aviso de privacidade do restaurante.",
    ],
    siteApoio: "Quem procura onde comer no Google encontra o seu cardápio, as fotos dos pratos e o caminho direto para pedir.",
    site: [
      "Cardápio com fotos, fácil de manter atualizado",
      "Endereço no Google Maps, horários e botão direto para o WhatsApp",
      "Pensado para o celular, que é onde o cliente decide o que comer",
      "No Site Completo: páginas por categoria do cardápio, blog e formulários (reservas e eventos)",
      "Domínio, hospedagem e manutenção inclusos na mensalidade",
    ],
  },

  nomeSite: "Site do restaurante",
  tituloPreco: "Quanto custa para o seu restaurante.",

  perguntas: {
    etiqueta: "Perguntas de quem tem restaurante",
    titulo: "O que todo dono de restaurante pergunta antes de decidir.",
    itens: [
      {
        q: "A atendente anota o pedido?",
        a: "Não. Ela tira as dúvidas e manda o link do seu canal de pedidos — site, cardápio digital ou aplicativo de entrega. Assim o pedido entra onde você já controla preço, pagamento e cozinha, sem risco de um pedido ficar perdido no meio da conversa.",
      },
      {
        q: "Ela fala de ingredientes e alergia?",
        a: "Ela informa o que estiver no cardápio aprovado, como os pratos marcados sem glúten ou vegetarianos. Para alergia ou restrição séria, ela passa a conversa para a sua equipe, que confirma os ingredientes com o cliente.",
      },
      {
        q: "Funciona no pico do almoço e do jantar?",
        a: "Sim. Ela responde várias conversas ao mesmo tempo, 24 horas por dia — inclusive fora do horário, quando o cliente já está escolhendo onde pedir amanhã.",
      },
      {
        q: "A atendente vai saber o meu cardápio e os meus horários?",
        a: "Sim. Antes de começar, definimos juntos, por escrito, tudo o que ela vai saber: horários, bairros e taxas de entrega, formas de pagamento, cardápio e links — e o que ela nunca deve responder. Você escolhe o nome dela e o tom de voz. Mudou o cardápio? Pequenos ajustes entram na mensalidade.",
      },
      {
        q: "Quanto tempo leva para ficar pronto?",
        a: "A primeira versão fica pronta em até 15 dias úteis, contados depois do pagamento da entrada e do envio de todo o material — textos, fotos, logo e acessos. Você tem até 5 dias úteis para aprovar ou pedir ajustes (são até 4 rodadas incluídas) e, aprovado, vai ao ar em até 5 dias úteis. Vale para o site e para a atendente.",
      },
    ],
  },

  fechamento: {
    titulo: "Quer ver como ficaria",
    destaque: "no seu restaurante?",
    texto:
      "No diagnóstico gratuito, em 10 a 15 minutos pelo WhatsApp, mostramos onde o seu restaurante está perdendo pedido — e você sai com uma proposta por escrito.",
  },
};

export default function Restaurantes() {
  return <PaginaSegmento s={restaurantes} />;
}
