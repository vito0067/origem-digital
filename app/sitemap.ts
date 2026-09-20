import type { MetadataRoute } from "next";
import { cases } from "@/lib/cases";

/**
 * O MAPA DO SITE — a lista de páginas entregue pronta ao Google.
 *
 * Sem ele, o buscador precisa descobrir as páginas seguindo links, e
 * as que ficam mais escondidas (os cases, os termos) podem demorar
 * semanas para entrar no índice. Com o mapa, ele recebe tudo de uma
 * vez e sabe o que olhar primeiro.
 *
 * Assim como o robots, não existe arquivo em /public: o Next monta o
 * sitemap.xml a partir daqui ao publicar.
 *
 * AS PÁGINAS DE CASE SAEM DE lib/cases.ts, a mesma lista que cria as
 * páginas de verdade. Case novo que você escrever entra no mapa
 * sozinho — não há uma segunda lista para alguém esquecer de
 * atualizar.
 *
 * ⚠️ /privacidade ESTÁ FORA DE PROPÓSITO. Ela pede para não ser
 * indexada; colocá-la no mapa seria mandar dois recados contrários
 * para o mesmo buscador.
 */

/**
 * Quando o conteúdo mudou pela última vez.
 *
 * É uma data fixa, e não `new Date()`, de propósito: com a data de
 * hoje, toda publicação — mesmo a que só troca uma cor — anunciaria
 * "esta página mudou". O Google aprende que o aviso não vale nada e
 * passa a ignorá-lo. Atualize esta linha quando mexer no TEXTO do
 * site, não a cada ajuste.
 */
const ATUALIZADO_EM = new Date("2026-09-20");

export default function sitemap(): MetadataRoute.Sitemap {
  const site = "https://origemdigitalsite.com.br";

  const paginas: MetadataRoute.Sitemap = [
    {
      url: site,
      lastModified: ATUALIZADO_EM,
      changeFrequency: "weekly",
      // A capa é a página que importa: é para ela que vão todos os
      // links, e é ela que precisa aparecer na busca por "site para
      // clínica" ou "agente de IA WhatsApp".
      priority: 1,
    },
    {
      url: `${site}/cases`,
      lastModified: ATUALIZADO_EM,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site}/termos`,
      lastModified: ATUALIZADO_EM,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const paginasDeCase: MetadataRoute.Sitemap = cases.map((c) => ({
    url: `${site}/cases/${c.slug}`,
    lastModified: ATUALIZADO_EM,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...paginas, ...paginasDeCase];
}
