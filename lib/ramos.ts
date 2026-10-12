/**
 * OS RAMOS ATENDIDOS — lista única.
 *
 * Cada ramo tem a sua página (app/<slug>/page.tsx). Esta lista alimenta
 * a seção "Para quem" da página inicial, o rodapé, a faixa "Também
 * atendemos" das páginas por ramo e o sitemap. Ramo novo: crie a página
 * copiando uma pasta existente e acrescente uma linha aqui.
 */
export const ramos = [
  { slug: "clinicas", nome: "Clínicas" },
  { slug: "petshops", nome: "Pet shops" },
  { slug: "saloes", nome: "Salões" },
  { slug: "academias", nome: "Academias" },
  { slug: "restaurantes", nome: "Restaurantes" },
  { slug: "oficinas", nome: "Oficinas" },
  { slug: "lojas", nome: "Lojas" },
  { slug: "contabilidades", nome: "Contabilidades" },
  { slug: "prestadores", nome: "Prestadores de serviço" },
] as const;

export type Ramo = (typeof ramos)[number];
