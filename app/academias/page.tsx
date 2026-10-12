import type { Metadata } from "next";
import PaginaSegmento, { type Segmento } from "@/components/PaginaSegmento";

/**
 * PÁGINA DO RAMO: ACADEMIAS (TODOS OS TIPOS)
 *
 * Só os textos moram aqui; o desenho é o molde components/PaginaSegmento.
 *
 * Musculação, crossfit, funcional, lutas (jiu-jitsu, muay thai, boxe,
 * judô), dança, pilates, natação, escolinhas de esporte.
 *
 * A atendente informa planos, modalidades e horários das turmas e
 * encaminha a AULA EXPERIMENTAL. Nunca monta treino nem opina sobre
 * lesão, dor ou restrição: isso vai para o professor (e, se for o caso,
 * para o médico) — a mesma regra da saúde na página de clínicas.
 */

export const metadata: Metadata = {
  title: "Site e atendente de IA no WhatsApp para academias — Origem Digital",
  description:
    "Site profissional e atendente de inteligência artificial para academias de musculação, crossfit, lutas, dança e pilates. Responde no WhatsApp 24 horas por dia, informa planos e horários e agenda a aula experimental. Primeira versão em até 15 dias úteis.",
  alternates: { canonical: "/academias" },
  openGraph: {
    title: "Site e atendente de IA no WhatsApp para academias",
    description: "Sua academia respondendo interessados no WhatsApp, a qualquer hora — enquanto você está dando aula.",
    locale: "pt_BR",
    type: "website",
    siteName: "Origem Digital",
  },
};

const academias: Segmento = {
  mensagemWhatsApp: "Olá! Tenho uma academia e quero o diagnóstico gratuito.",
  textoBotao: "Quero o diagnóstico da minha academia",

  capa: {
    etiqueta: "Para academias, lutas, dança, pilates e crossfit",
    titulo: "Sua academia respondendo alunos",
    destaque: "enquanto você está dando aula.",
    apoio:
      "Site profissional e uma atendente de inteligência artificial que informa planos, modalidades e horários das turmas e agenda a aula experimental — da musculação ao jiu-jitsu.",
    selos: ["Treinada com os seus planos e horários", "Não monta treino nem opina sobre lesão", "Primeira versão em até 15 dias úteis"],
  },

  conversa: {
    nome: "Academia Exemplo",
    iniciais: "AE",
    aviso: "Conversa de exemplo. Academia e valores ilustrativos.",
    falas: [
      { de: "cliente", texto: "Oi! Quanto é a mensalidade do jiu-jitsu? Nunca treinei.", hora: "22:31" },
      {
        de: "aurora",
        texto:
          "Oi! Sou a assistente virtual da Academia Exemplo, um atendimento feito por inteligência artificial. O plano de jiu-jitsu sai R$ 180 por mês, com turma para iniciantes às segundas, quartas e sextas, às 19h.",
        hora: "22:31",
        pensando: 1400,
      },
      { de: "aurora", texto: "Quer fazer uma aula experimental? Tenho vaga na segunda ou na quarta, às 19h.", hora: "22:31", pensando: 1000 },
      { de: "cliente", texto: "Segunda! Tenho um problema no joelho, posso treinar?", hora: "22:32" },
      {
        de: "aurora",
        texto:
          "Isso quem avalia é o professor — e, se precisar, o seu médico, combinado? Anotei a aula experimental de segunda às 19h com essa observação, e a equipe confirma com você ✅",
        hora: "22:32",
        pensando: 1500,
      },
    ],
  },

  dores: {
    etiqueta: "O dia a dia da academia",
    titulo: "Onde a academia perde aluno sem perceber.",
    itens: [
      {
        titulo: "No meio da aula",
        texto:
          "Professor dando treino não pega o celular. O interessado pergunta o valor, espera — e se matricula onde responderam primeiro.",
      },
      {
        titulo: "O pico de procura",
        texto:
          "Janeiro, volta das férias, segunda-feira: é quando todo mundo decide começar. Mensagem sem resposta nessa hora é matrícula na academia vizinha.",
      },
      {
        titulo: "As mesmas perguntas",
        texto: "Quanto é o plano? Qual o horário da turma? Tem aula experimental? Respondidas uma a uma, dezenas de vezes por semana.",
      },
    ],
  },

  entrega: {
    etiqueta: "O que a sua academia recebe",
    titulo: "Uma atendente que transforma curioso em aluno, e um site que mostra a energia da sua academia.",
    atendente: [
      "Responde em segundos, 24 horas por dia: planos e valores, modalidades, horários das turmas, endereço e formas de pagamento — só com as informações que a academia aprovar.",
      "Agenda a aula experimental. No Agente Avançado, ela é ligada ao Google Agenda e marca o horário direto; no Essencial, anota o pedido e passa para a equipe confirmar.",
      "Não monta treino nem dá orientação de saúde: lesão, dor ou restrição vão para o professor — e, quando for o caso, para o médico.",
      "Chama a equipe quando o aluno pede para falar com alguém, quer cancelar, reclama ou pergunta algo que ela não sabe.",
      "Avisa que é um atendimento por inteligência artificial e mostra o aviso de privacidade da academia.",
    ],
    siteApoio: "Quem procura academia no Google encontra as modalidades, a grade de horários, os planos e o caminho direto para a aula experimental.",
    site: [
      "Modalidades, grade de horários e planos",
      "Fotos do espaço e dos professores, com endereço no Google Maps",
      "Botão direto para o WhatsApp e para a aula experimental",
      "No Site Completo: páginas por modalidade, blog e formulários",
      "Domínio, hospedagem e manutenção inclusos na mensalidade",
    ],
  },

  nomeSite: "Site da academia",
  tituloPreco: "Quanto custa para a sua academia.",

  perguntas: {
    etiqueta: "Perguntas de quem tem academia",
    titulo: "O que todo dono de academia pergunta antes de decidir.",
    itens: [
      {
        q: "Serve para qualquer tipo de academia?",
        a: "Serve: musculação, crossfit, funcional, jiu-jitsu, muay thai, boxe, judô, dança, pilates, natação e escolinhas de esporte. Cada atendente é treinada com as modalidades, os planos e a grade de horários da sua academia.",
      },
      {
        q: "Ela monta treino ou fala de lesão?",
        a: "Não. Ela informa planos, modalidades e horários e agenda a aula experimental. Treino, lesão, dor ou restrição de saúde vão sempre para o professor — e, quando for o caso, para o médico.",
      },
      {
        q: "A atendente vai saber os meus planos e horários?",
        a: "Sim. Antes de começar, definimos juntos, por escrito, tudo o que ela vai saber: planos, valores, modalidades, grade de horários, regras da aula experimental e formas de pagamento — e o que ela nunca deve responder. Você escolhe o nome dela e o tom de voz. Mudou a grade? Pequenos ajustes entram na mensalidade.",
      },
      {
        q: "E se ela responder errado para um aluno?",
        a: "Ela foi feita para não inventar: responde só com o que você aprovou e, quando não sabe a resposta, quando o aluno reclama ou pede uma pessoa, passa a conversa para a sua equipe. Como todo sistema de inteligência artificial, pode errar de vez em quando — por isso você acompanha as conversas, e qualquer falha de configuração nossa é corrigida dentro da manutenção mensal.",
      },
      {
        q: "Quanto tempo leva para ficar pronto?",
        a: "A primeira versão fica pronta em até 15 dias úteis, contados depois do pagamento da entrada e do envio de todo o material — textos, fotos, logo e acessos. Você tem até 5 dias úteis para aprovar ou pedir ajustes (são até 4 rodadas incluídas) e, aprovado, vai ao ar em até 5 dias úteis. Vale para o site e para a atendente.",
      },
    ],
  },

  fechamento: {
    titulo: "Quer ver como ficaria",
    destaque: "na sua academia?",
    texto:
      "No diagnóstico gratuito, em 10 a 15 minutos pelo WhatsApp, mostramos onde a sua academia está perdendo aluno — e você sai com uma proposta por escrito.",
  },
};

export default function Academias() {
  return <PaginaSegmento s={academias} />;
}
