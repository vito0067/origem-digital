import type { MetadataRoute } from "next";

/**
 * O arquivo que diz aos buscadores o que eles podem ler.
 *
 * Não é preciso criar nada em /public: o Next gera o robots.txt a
 * partir daqui na hora de publicar, e ele passa a existir em
 * origemdigitalsite.com.br/robots.txt.
 *
 * ⚠️ POR QUE A PÁGINA DE PRIVACIDADE NÃO ESTÁ BLOQUEADA AQUI.
 * Ela não deve aparecer no Google, e isso já está resolvido de outro
 * jeito: a própria página pede "não me indexe" (`robots: index: false`
 * em app/privacidade/page.tsx). Bloquear a leitura aqui teria o efeito
 * CONTRÁRIO do esperado — o Google não conseguiria abrir a página,
 * logo nunca leria o pedido para não indexar, e ela poderia acabar
 * listada assim mesmo, só que sem descrição nenhuma.
 *
 * A regra é essa: para esconder do Google, deixe ele ENTRAR e leia o
 * "não indexe" lá dentro. Bloquear no robots serve para outra coisa —
 * poupar o buscador de varrer páginas que não interessam a ninguém,
 * como área administrativa.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://origemdigitalsite.com.br/sitemap.xml",
  };
}
