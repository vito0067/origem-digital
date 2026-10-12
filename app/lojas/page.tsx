import type { Metadata } from "next";
import PaginaSegmento, { type Segmento } from "@/components/PaginaSegmento";

/**
 * PÁGINA DO RAMO: LOJAS (FÍSICAS E VIRTUAIS)
 *
 * Só os textos moram aqui; o desenho é o molde components/PaginaSegmento.
 *
 * ⚠️ DECISÃO DO VITO (out/2026): a página fala com as duas — a loja de rua
 * que vende pelo WhatsApp e quem vende pela internet.
 *
 * ⚠️ O NOSSO SITE É VITRINE, NÃO LOJA COM CARRINHO. Quem já vende numa
 * plataforma de loja virtual recebe o cliente lá: a atendente manda o
 * link do produto. Estoque muda toda hora — o que depende de conferir
 * (tamanho, cor, quantidade) vai para a equipe.
 */

export const metadata: Metadata = {
  title: "Site e atendente de IA no WhatsApp para lojas — Origem Digital",
  description:
    "Site profissional e atendente de inteligência artificial que responde clientes da sua loja no WhatsApp 24 horas por dia: preço, pagamento, entrega e troca — e leva até a compra. Para lojas físicas e virtuais. Primeira versão em até 15 dias úteis.",
  alternates: { canonical: "/lojas" },
  openGraph: {
    title: "Site e atendente de IA no WhatsApp para lojas",
    description: "Sua loja respondendo clientes no WhatsApp, a qualquer hora — antes que eles comprem no concorrente.",
    locale: "pt_BR",
    type: "website",
    siteName: "Origem Digital",
  },
};

const lojas: Segmento = {
  mensagemWhatsApp: "Olá! Tenho uma loja e quero o diagnóstico gratuito.",
  textoBotao: "Quero o diagnóstico da minha loja",

  capa: {
    etiqueta: "Para lojas físicas e lojas virtuais",
    titulo: "Sua loja respondendo clientes",
    destaque: "antes que eles comprem no concorrente.",
    apoio:
      "Site profissional e uma atendente de inteligência artificial que tira dúvidas de preço, pagamento, entrega e troca — e leva o cliente até a compra, na loja ou no site.",
    selos: ["Treinada com os produtos e as regras da sua loja", "Leva o cliente até a compra", "Primeira versão em até 15 dias úteis"],
  },

  conversa: {
    nome: "Loja Exemplo",
    iniciais: "LE",
    aviso: "Conversa de exemplo. Loja e valores ilustrativos.",
    falas: [
      { de: "cliente", texto: "Oi! Quanto custa o tênis branco ref. 2201? Tem no 38?", hora: "22:15" },
      {
        de: "aurora",
        texto:
          "Oi! Sou a assistente virtual da Loja Exemplo, um atendimento feito por inteligência artificial. O tênis branco ref. 2201 custa R$ 249,90, em até 3x sem juros.",
        hora: "22:15",
        pensando: 1300,
      },
      {
        de: "aurora",
        texto: "O 38 eu peço para a equipe conferir no estoque e te responder amanhã às 9h ✅ Você prefere receber em casa ou retirar na loja?",
        hora: "22:15",
        pensando: 1200,
      },
      { de: "cliente", texto: "Receber. Moro em Campinas.", hora: "22:16" },
      {
        de: "aurora",
        texto: "Entregamos para todo o Brasil pela nossa loja virtual, com o frete calculado na compra: lojaexemplo.com.br/2201 📦",
        hora: "22:16",
        pensando: 1300,
      },
    ],
  },

  dores: {
    etiqueta: "O dia a dia da loja",
    titulo: "Onde a loja perde venda sem perceber.",
    itens: [
      {
        titulo: "A pergunta do preço",
        texto: "“Quanto custa?” chega no WhatsApp e no Instagram, à noite e no domingo. Cada resposta que demora é uma compra feita em outro lugar.",
      },
      {
        titulo: "O balcão e o celular",
        texto: "Quem atende na loja não consegue responder o WhatsApp ao mesmo tempo. Ou perde o cliente da frente, ou o da mensagem.",
      },
      {
        titulo: "Tamanho, frete e troca",
        texto: "Tem no meu tamanho? Entrega na minha cidade? Posso trocar? As mesmas perguntas o dia todo, respondidas uma a uma.",
      },
    ],
  },

  entrega: {
    etiqueta: "O que a sua loja recebe",
    titulo: "Uma atendente que não deixa a venda esfriar, e um site que mostra os seus produtos.",
    atendente: [
      "Responde em segundos, 24 horas por dia: preços, formas de pagamento, regras de entrega e de troca — só com as informações que a loja aprovar.",
      "Leva o cliente até a compra: manda o link do produto na sua loja virtual ou o endereço da loja física.",
      "Estoque, tamanho e cor que dependem de conferência vão para a equipe, com o pedido do cliente já anotado.",
      "Chama a equipe quando o cliente pede para falar com alguém, reclama ou pergunta algo que ela não sabe.",
      "Avisa que é um atendimento por inteligência artificial e mostra o aviso de privacidade da loja.",
    ],
    siteApoio: "Quem procura o seu produto no Google encontra uma vitrine com fotos, preços e o caminho direto para comprar ou chamar no WhatsApp.",
    site: [
      "Vitrine com produtos, fotos e preços",
      "Link para a sua loja virtual, se você já vende pela internet",
      "Endereço no Google Maps e botão direto para o WhatsApp",
      "No Site Completo: mais páginas, blog e formulários",
      "Domínio, hospedagem e manutenção inclusos na mensalidade",
    ],
  },

  nomeSite: "Site da loja",
  tituloPreco: "Quanto custa para a sua loja.",

  perguntas: {
    etiqueta: "Perguntas de quem tem loja",
    titulo: "O que todo dono de loja pergunta antes de decidir.",
    itens: [
      {
        q: "Ela sabe o meu estoque?",
        a: "Ela sabe o que estiver nas informações que você aprovar. Como o estoque muda toda hora, quando a resposta depende de conferir — tamanho, cor, quantidade — ela anota o pedido do cliente e passa para a sua equipe responder.",
      },
      {
        q: "Vocês fazem loja virtual com carrinho?",
        a: "O nosso site é uma vitrine profissional: produtos, fotos, preços e o caminho direto para o WhatsApp. Se você já vende numa plataforma de loja virtual, a atendente manda o cliente para o produto certo lá. Loja com carrinho e pagamento integrado não faz parte dos planos — se você precisar, a gente conversa no diagnóstico.",
      },
      {
        q: "Serve para loja que só vende no WhatsApp e no Instagram?",
        a: "Serve. É o caso mais comum: a atendente responde as perguntas de preço, pagamento e entrega na hora, e passa para você quando o cliente quer fechar ou pede alguém da equipe.",
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
    destaque: "na sua loja?",
    texto:
      "No diagnóstico gratuito, em 10 a 15 minutos pelo WhatsApp, mostramos onde a sua loja está perdendo venda — e você sai com uma proposta por escrito.",
  },
};

export default function Lojas() {
  return <PaginaSegmento s={lojas} />;
}
