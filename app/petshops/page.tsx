import type { Metadata } from "next";
import PaginaSegmento, { type Segmento } from "@/components/PaginaSegmento";

/**
 * PÁGINA DO RAMO: PET SHOPS
 *
 * Só os textos moram aqui; o desenho é o molde components/PaginaSegmento
 * (lá estão as regras que toda página de ramo segue — contrato, preços,
 * conversa de exemplo).
 *
 * A dor do pet shop é diferente da clínica: quem atende está com as mãos
 * ocupadas (literalmente, dando banho), o pico de mensagens é no sábado
 * — o dia mais cheio — e o preço muda com o porte e a raça, então a
 * mesma conta é feita à mão o dia inteiro.
 *
 * Saúde do animal fica fora da atendente: sintoma, remédio e alimentação
 * especial vão para a equipe ou para o veterinário, como na clínica.
 */

export const metadata: Metadata = {
  title: "Site e atendente de IA no WhatsApp para pet shops — Origem Digital",
  description:
    "Site profissional e atendente de inteligência artificial que responde tutores no WhatsApp 24 horas por dia, informa preços de banho e tosa e encaminha agendamentos. Primeira versão em até 15 dias úteis.",
  alternates: { canonical: "/petshops" },
  openGraph: {
    title: "Site e atendente de IA no WhatsApp para pet shops",
    description:
      "Seu pet shop respondendo tutores no WhatsApp, a qualquer hora — enquanto a equipe cuida dos bichos.",
    locale: "pt_BR",
    type: "website",
    siteName: "Origem Digital",
  },
};

const petshops: Segmento = {
  mensagemWhatsApp: "Olá! Tenho um pet shop e quero o diagnóstico gratuito.",
  textoBotao: "Quero o diagnóstico do meu pet shop",

  capa: {
    etiqueta: "Para pet shops e banho e tosa",
    titulo: "Seu pet shop respondendo tutores",
    destaque: "no WhatsApp, a qualquer hora.",
    apoio:
      "Site profissional e uma atendente de inteligência artificial que informa preços de banho e tosa, horários e serviços, e encaminha o agendamento — enquanto a sua equipe cuida dos bichos.",
    selos: [
      "Treinada com os preços do seu pet shop",
      "Não opina sobre a saúde do animal",
      "Primeira versão em até 15 dias úteis",
    ],
  },

  conversa: {
    nome: "Pet Shop Exemplo",
    iniciais: "PE",
    aviso: "Conversa de exemplo. Pet shop e valores ilustrativos.",
    falas: [
      {
        de: "cliente",
        texto: "Oi! Quanto fica banho e tosa para um shih-tzu?",
        hora: "20:42",
      },
      {
        de: "aurora",
        texto:
          "Oi! Sou a assistente virtual do Pet Shop Exemplo, um atendimento feito por inteligência artificial. Banho e tosa higiênica para porte pequeno sai R$ 85.",
        hora: "20:42",
        pensando: 1300,
      },
      {
        de: "aurora",
        texto:
          "Tenho horário amanhã às 9h ou às 14h. Quer que eu reserve um deles?",
        hora: "20:42",
        pensando: 1100,
      },
      {
        de: "cliente",
        texto: "14h! Ele anda coçando muito a orelha, pode ser alergia?",
        hora: "20:43",
      },
      {
        de: "aurora",
        texto:
          "Isso só um veterinário pode avaliar, combinado? Anotei o banho e tosa amanhã às 14h e passei para a equipe, que confirma com você às 8h ✅",
        hora: "20:43",
        pensando: 1500,
      },
    ],
  },

  dores: {
    etiqueta: "O dia a dia do pet shop",
    titulo: "Onde o pet shop perde cliente sem perceber.",
    itens: [
      {
        titulo: "As mãos ocupadas",
        texto:
          "Quem está dando banho não consegue pegar o celular. O tutor pergunta o preço, espera — e marca onde responderam primeiro.",
      },
      {
        titulo: "O sábado lotado",
        texto:
          "É no dia mais cheio que chegam mais mensagens pedindo horário. Justo quando ninguém da equipe tem um minuto para responder.",
      },
      {
        titulo: "Um preço para cada porte",
        texto:
          "Cada tutor pergunta o valor para o seu cachorro. A mesma conta, feita à mão, dezenas de vezes por semana.",
      },
    ],
  },

  entrega: {
    etiqueta: "O que o seu pet shop recebe",
    titulo:
      "Uma atendente que não deixa tutor esperando, e um site que mostra o capricho da casa.",
    atendente: [
      "Responde em segundos, 24 horas por dia: preços de banho e tosa por porte, horários, endereço, serviços e produtos — só com as informações que o pet shop aprovar.",
      "Encaminha o agendamento. No Agente Avançado, ela é ligada ao Google Agenda e marca o horário direto; no Essencial, anota o pedido e passa para a equipe confirmar.",
      "Chama a equipe quando o tutor pede para falar com alguém, reclama ou pergunta algo que ela não sabe.",
      "Avisa que é um atendimento por inteligência artificial e mostra o aviso de privacidade do pet shop.",
      "Não opina sobre a saúde do animal: sintoma, remédio ou alimentação especial vão para a equipe ou para o veterinário.",
    ],
    siteApoio:
      "Quem procura banho e tosa no Google encontra uma página que mostra, de cara, o cuidado que o seu pet shop tem com os bichos.",
    site: [
      "Serviços, preços de referência e fotos do espaço",
      "Endereço no Google Maps e botão direto para o WhatsApp",
      "Pensado para o celular, que é onde o tutor procura",
      "No Site Completo: páginas por serviço (banho e tosa, hotel, loja), blog e formulários",
      "Domínio, hospedagem e manutenção inclusos na mensalidade",
    ],
  },

  nomeSite: "Site do pet shop",
  tituloPreco: "Quanto custa para o seu pet shop.",

  perguntas: {
    etiqueta: "Perguntas de quem tem pet shop",
    titulo: "O que todo dono de pet shop pergunta antes de decidir.",
    itens: [
      {
        q: "A atendente vai saber os preços do meu pet shop?",
        a: "Sim. Antes de começar, definimos juntos, por escrito, tudo o que ela vai saber: serviços, preços por porte, horários, endereço, formas de pagamento, o jeito como a sua equipe fala com os tutores — e o que ela nunca deve responder. Você escolhe o nome dela e o tom de voz. Ela atende só com as informações que você aprovar.",
      },
      {
        q: "E se ela responder errado para um cliente?",
        a: "Ela foi feita para não inventar: responde só com o que você aprovou e, quando não sabe a resposta, quando o tutor reclama ou pede uma pessoa, passa a conversa para a sua equipe. Como todo sistema de inteligência artificial, pode errar de vez em quando — por isso você acompanha as conversas, e qualquer falha de configuração nossa é corrigida dentro da manutenção mensal.",
      },
      {
        q: "Quanto tempo leva para ficar pronto?",
        a: "A primeira versão fica pronta em até 15 dias úteis, contados depois do pagamento da entrada e do envio de todo o material — textos, fotos, logo e acessos. Você tem até 5 dias úteis para aprovar ou pedir ajustes (são até 4 rodadas incluídas) e, aprovado, vai ao ar em até 5 dias úteis. Vale para o site e para a atendente.",
      },
      {
        q: "Ela fala sobre a saúde do animal?",
        a: "Não. Ela responde sobre o pet shop — serviços, preços, horários, endereço — e passa para a sua equipe qualquer pergunta sobre sintoma, remédio ou alimentação especial. Saúde do bicho é com o veterinário.",
      },
      {
        q: "Funciona no sábado cheio e de madrugada?",
        a: "Sim. Ela atende 24 horas, inclusive no fim de semana. Quando o assunto precisa de alguém da equipe, ela registra o pedido e a equipe responde no próximo horário de atendimento.",
      },
    ],
  },

  fechamento: {
    titulo: "Quer ver como ficaria",
    destaque: "no seu pet shop?",
    texto:
      "No diagnóstico gratuito, em 10 a 15 minutos pelo WhatsApp, mostramos onde o atendimento do seu pet shop está travando — e você sai com uma proposta por escrito.",
  },
};

export default function PetShops() {
  return <PaginaSegmento s={petshops} />;
}
