import type { Metadata } from "next";
import PaginaSegmento, { type Segmento } from "@/components/PaginaSegmento";

/**
 * PÁGINA DO RAMO: CLÍNICAS
 *
 * Só os textos moram aqui; o desenho é o molde components/PaginaSegmento
 * (lá estão as regras que toda página de ramo segue — contrato, preços,
 * conversa de exemplo).
 *
 * Para que serve:
 *  - PROSPECÇÃO: na mensagem para uma clínica, vai o link desta página,
 *    e não o do site geral. O dono vê o negócio dele na tela.
 *  - GOOGLE: "site para clínica" e "atendente de WhatsApp para clínica"
 *    encontram uma página feita para isso.
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

const clinicas: Segmento = {
  mensagemWhatsApp: "Olá! Tenho uma clínica e quero o diagnóstico gratuito.",
  textoBotao: "Quero o diagnóstico da minha clínica",

  capa: {
    etiqueta: "Para clínicas e consultórios",
    titulo: "Sua clínica respondendo pacientes",
    destaque: "no WhatsApp, a qualquer hora.",
    apoio:
      "Site profissional e uma atendente de inteligência artificial que tira dúvidas, informa valores e encaminha o agendamento — enquanto a sua recepção cuida de quem está na clínica.",
    selos: [
      "Treinada com as informações da sua clínica",
      "Nunca dá diagnóstico",
      "Primeira versão em até 15 dias úteis",
    ],
  },

  conversa: {
    nome: "Clínica Exemplo",
    iniciais: "CE",
    aviso: "Conversa de exemplo. Clínica e valores ilustrativos.",
    falas: [
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
    ],
  },

  dores: {
    etiqueta: "O dia a dia da recepção",
    titulo: "Onde a clínica perde paciente sem perceber.",
    itens: [
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
    ],
  },

  entrega: {
    etiqueta: "O que a sua clínica recebe",
    titulo:
      "Uma atendente que não deixa paciente esperando, e um site que passa confiança.",
    atendente: [
      "Responde em segundos, 24 horas por dia: valores, especialidades, convênios aceitos, endereço e preparo de exames — só com as informações que a clínica aprovar.",
      "Encaminha o agendamento. No Agente Avançado, ela é ligada ao Google Agenda e marca o horário direto; no Essencial, anota o pedido e passa para a recepção confirmar.",
      "Chama a recepção quando o paciente pede para falar com alguém, reclama ou pergunta algo que ela não sabe.",
      "Avisa que é um atendimento por inteligência artificial e mostra o aviso de privacidade da clínica.",
      "Nunca dá diagnóstico nem orientação de saúde: dúvida clínica vai para a sua equipe.",
    ],
    siteApoio:
      "Quem procura a sua especialidade no Google encontra uma página que mostra, de cara, por que confiar na sua clínica.",
    site: [
      "Especialidades, equipe e convênios, com fotos da clínica",
      "Endereço no Google Maps e botão direto para o WhatsApp",
      "Pensado para o celular, que é onde o paciente procura",
      "No Site Completo: páginas por especialidade, blog e formulários",
      "Domínio, hospedagem e manutenção inclusos na mensalidade",
    ],
  },

  nomeSite: "Site da clínica",
  tituloPreco: "Quanto custa para a sua clínica.",

  perguntas: {
    etiqueta: "Perguntas de quem tem clínica",
    titulo: "O que todo dono de clínica pergunta antes de decidir.",
    itens: [
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
    ],
  },

  fechamento: {
    titulo: "Quer ver como ficaria",
    destaque: "na sua clínica?",
    texto:
      "No diagnóstico gratuito, em 10 a 15 minutos pelo WhatsApp, mostramos onde o atendimento da sua clínica está travando — e você sai com uma proposta por escrito.",
  },
};

export default function Clinicas() {
  return <PaginaSegmento s={clinicas} />;
}
