/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * ENDEREÇOS DA VERCEL VÃO PARA O DOMÍNIO.
   *
   * A Vercel publica o site também em endereços próprios, como
   * origem-digital.vercel.app. Sem isto, eles abrem uma cópia inteira
   * do site — e o Google pode tratar como conteúdo duplicado, dividindo
   * a relevância entre os dois endereços. Agora qualquer endereço que
   * termine em .vercel.app leva a pessoa para o mesmo caminho no
   * domínio oficial, com redirecionamento permanente (o Google entende
   * que o endereço certo é o do domínio).
   *
   * Efeito colateral aceito: as "prévias" da Vercel (versões de teste
   * de cada envio) também redirecionam. Hoje tudo vai direto para o ar
   * pelo GitHub, então ninguém usa prévia. Se um dia precisar delas,
   * troque o valor abaixo por "origem-digital\\.vercel\\.app" para
   * redirecionar só o endereço principal.
   *
   * O computador local (localhost) não é afetado.
   */
  async redirects() {
    return [
      {
        source: "/:caminho*",
        has: [{ type: "host", value: ".*\\.vercel\\.app" }],
        destination: "https://origemdigitalsite.com.br/:caminho*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
