import { acheProduto, avulsos, reais } from "./precos";

/**
 * AS PERGUNTAS FREQUENTES — fonte única.
 *
 * Aparecem na conversa "Pergunte" da página inicial (components/
 * Pergunte.tsx) e vão para o Google como FAQ (app/page.tsx).
 *
 * ⚠️ AS RESPOSTAS SEGUEM O CONTRATO MASTER (out/2026) E lib/precos.ts.
 * Mudou prazo, pagamento ou cancelamento no contrato? Mude aqui, em
 * /termos e nas páginas por ramo.
 */

const site = acheProduto("site-simples");
const agente = acheProduto("agente-essencial");
const pacote = acheProduto("pacote-inicio");
const [AJUSTE_SITE, AJUSTE_AGENTE] = avulsos;

export const perguntas = [
  {
    q: "Quanto custa?",
    a: `Site a partir de ${reais(site.setup)} + ${reais(site.mensal)}/mês, com domínio, hospedagem e manutenção inclusos. Atendente de IA a partir de ${reais(agente.setup)} + ${reais(agente.mensal)}/mês. Os dois juntos têm 12% de desconto no setup: ${reais(pacote.setup)} + ${reais(pacote.mensal)}/mês.`,
  },
  {
    q: "Em quanto tempo fica pronto?",
    a: "A primeira versão fica pronta em até 15 dias úteis, contados depois da entrada e do envio do material (textos, fotos, logo e acessos). Você tem até 4 rodadas de ajustes e, aprovado, vai ao ar em até 5 dias úteis.",
  },
  {
    q: "Como eu pago?",
    a: "O setup é dividido em duas partes: 50% na assinatura do contrato e 50% na entrega, antes de ir ao ar. A mensalidade começa no segundo mês e vence todo dia 5.",
  },
  {
    q: "Tem fidelidade?",
    a: "No plano padrão, 3 meses. Depois disso você cancela quando quiser, com 30 dias de aviso. No plano anual, há 30 dias de carência para cancelar sem multa. Fora desses casos e dos 7 dias de arrependimento (pessoa física), o cancelamento antecipado tem multa de 15% sobre as mensalidades que faltam até o fim da fidelidade.",
  },
  {
    q: "Funciona de madrugada?",
    a: "Funciona. A atendente roda em nuvem, sem depender do seu celular ligado: madrugada, feriado e fim de semana.",
  },
  {
    q: "A atendente é um robô?",
    a: "Ela é uma inteligência artificial — e se apresenta assim para o seu cliente. Responde só com as informações que você aprovar e, quando não sabe a resposta ou o cliente pede uma pessoa, passa a conversa para você.",
  },
  {
    q: "Posso pedir ajustes depois?",
    a: `Pode. Pequenos ajustes já entram na mensalidade: até 5 textos, imagens ou informações por pedido. O que passar disso custa ${reais(AJUSTE_SITE.valor)} no site ou ${reais(AJUSTE_AGENTE.valor)} no agente, por pedido.`,
  },
  {
    q: "E o suporte?",
    a: "Está incluso na mensalidade: hospedagem, monitoramento, correção de erros e pequenos ajustes. O suporte atende de segunda a sexta, das 9h às 18h, com primeira resposta em até 1 dia útil.",
  },
  {
    q: "Preciso ter domínio?",
    a: "Não. Domínio e hospedagem já estão na mensalidade do site. Se você já tem um domínio, a gente aproveita.",
  },
  {
    q: "E se atrasar?",
    a: "O prazo está escrito no contrato. Ele só pausa quando depende de você — material ou aprovação pendente — ou de serviços de terceiros, como WhatsApp e hospedagem. E você é sempre avisado.",
  },
  {
    q: "Como eu começo?",
    a: "Pelo diagnóstico gratuito: 10 a 15 minutos no WhatsApp para entender o seu negócio. Você sai sabendo o que faz sentido para o seu caso, com uma proposta por escrito.",
    comecar: true,
  },
];

