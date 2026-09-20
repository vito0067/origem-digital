/**
 * A TABELA DE PREÇOS DA ORIGEM DIGITAL — FONTE ÚNICA.
 *
 * Todo preço que aparece no site sai daqui: os cartões de serviço, a
 * tabela comparativa, o pacote em destaque, as respostas do FAQ e a
 * conversa da Aurora na demonstração. Mudou aqui, mudou em todo lugar.
 *
 * Antes deste arquivo, o mesmo valor estava escrito à mão em quatro
 * lugares diferentes. Bastava esquecer um para o site anunciar dois
 * preços para o mesmo produto — que é o tipo de erro que custa a venda
 * na frente do cliente.
 *
 * ⚠️ O SITE NÃO É O ÚNICO LUGAR.
 * Esta tabela também vive FORA do código: na tabela de preços da
 * Aurora, no n8n (nó Consultar_Tabela_Precos), na planilha de receita
 * e nos manuais. Mudar aqui e esquecer o n8n faz o agente informar
 * preço velho para cliente real, 24 horas por dia, sem ninguém notar.
 *
 * ⚠️ SOBRE O ARREDONDAMENTO DO PACOTE.
 * O desconto de 12% incide SÓ sobre o setup somado, e a conta não dá
 * número redondo: 987 + 657 = 1.644, menos 12% = 1.446,72. O site
 * mostra R$ 1.447 — arredondado, igual à tabela impressa que o Vito
 * usa nas propostas, para o cliente nunca ver dois números
 * diferentes para a mesma coisa.
 *
 * O valor continua sendo CALCULADO a partir das partes, e só então
 * arredondado. Digitar "1447" à mão pareceria mais simples, mas aí o
 * dia em que um preço de base mudasse, o pacote ficaria para trás sem
 * ninguém perceber.
 */

export type Produto = {
  id: string;
  familia: "site" | "agente" | "pacote";
  nome: string;
  /** Valor pago uma vez, na contratação. */
  setup: number;
  /** Valor pago todo mês. */
  mensal: number;
  /** Para quem este degrau faz sentido. */
  indicado: string;
  /** O que este degrau tem que o anterior não tem. */
  diferenca?: string;
};

/** Desconto do pacote. Incide apenas sobre o setup somado. */
export const DESCONTO_PACOTE = 0.12;

const semDesconto = (a: number, b: number) => a + b;
/** Aplica o desconto e arredonda para o real mais próximo. */
const comDesconto = (a: number, b: number) =>
  Math.round((a + b) * (1 - DESCONTO_PACOTE));

const SITE_SIMPLES = 987;
const SITE_COMPLETO = 1647;
const AGENTE_ESSENCIAL = 657;
const AGENTE_AVANCADO = 1097;

export const produtos: Produto[] = [
  {
    id: "site-simples",
    familia: "site",
    nome: "Site Simples",
    setup: SITE_SIMPLES,
    mensal: 43,
    indicado: "Quem só precisa existir bem no digital",
    diferenca: "Site profissional no ar, com domínio e hospedagem inclusos",
  },
  {
    id: "site-completo",
    familia: "site",
    nome: "Site Completo",
    setup: SITE_COMPLETO,
    mensal: 54,
    indicado: "Quem quer o site trabalhando por ele",
    diferenca: "Tudo do Simples, mais blog e formulários",
  },
  {
    id: "agente-essencial",
    familia: "agente",
    nome: "Agente Essencial",
    setup: AGENTE_ESSENCIAL,
    mensal: 217,
    indicado: "Quem perde cliente por demora",
    diferenca: "Atendimento 24/7 com seus serviços e preços",
  },
  {
    id: "agente-avancado",
    familia: "agente",
    nome: "Agente Avançado",
    setup: AGENTE_AVANCADO,
    mensal: 327,
    indicado: "Volume alto e qualificação de leads",
    diferenca: "Tudo do Essencial, mais CRM e transferência para humano",
  },
  {
    id: "pacote-inicio",
    familia: "pacote",
    nome: "Pacote Início Digital",
    setup: comDesconto(SITE_SIMPLES, AGENTE_ESSENCIAL),
    mensal: 43 + 217,
    indicado: "Presença digital completa, pelo menor investimento",
    diferenca: "Site Simples + Agente Essencial, com 12% off no setup",
  },
  {
    id: "pacote-completo",
    familia: "pacote",
    nome: "Pacote Completo",
    setup: comDesconto(SITE_COMPLETO, AGENTE_AVANCADO),
    mensal: 54 + 327,
    indicado: "Quem quer tudo funcionando no máximo",
    diferenca: "Site Completo + Agente Avançado, com 12% off no setup",
  },
];

/** Quanto sairia contratar as partes do pacote separadamente. */
export const setupSeparado = {
  "pacote-inicio": semDesconto(SITE_SIMPLES, AGENTE_ESSENCIAL),
  "pacote-completo": semDesconto(SITE_COMPLETO, AGENTE_AVANCADO),
} as const;

export const acheProduto = (id: string) =>
  produtos.find((p) => p.id === id) as Produto;

export const porFamilia = (familia: Produto["familia"]) =>
  produtos.filter((p) => p.familia === familia);

/** Ajustes avulsos, para quem já é cliente. */
export const avulsos = [
  { valor: 97, o_que: "Ajuste simples de site" },
  { valor: 147, o_que: "Ajuste no comportamento do agente" },
];

/**
 * Escreve o valor em reais.
 * Mostra centavos só quando eles existem: "R$ 987", mas "R$ 1.446,72".
 * Centavo em número redondo polui; centavo omitido em número quebrado
 * parece preço escondido.
 */
export function reais(valor: number) {
  const temCentavos = Math.round(valor * 100) % 100 !== 0;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: temCentavos ? 2 : 0,
    maximumFractionDigits: temCentavos ? 2 : 0,
  }).format(valor);
}
