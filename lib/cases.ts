export type Case = {
  slug: string;
  titulo: string;
  segmento: string;
  problema: string;
  solucao: string;
  resultado: string;
};

/**
 * COMO ADICIONAR UM CASE NOVO:
 * copie o objeto abaixo, preencha com os dados reais do cliente
 * (com autorização dele!) e a página /cases/<slug> passa a existir
 * automaticamente. Nunca publique um case sem resultado verdadeiro.
 *
 * O campo `tecnologias` saiu: a lista de ferramentas não dizia nada
 * para o dono de salão que lê o case, e ocupava um bloco inteiro da
 * página logo antes do resultado, que é a parte que importa.
 */
export const cases: Case[] = [
  {
    slug: "origem-digital",
    titulo: "Origem Digital — nosso próprio sistema",
    segmento: "Tecnologia · Serviços digitais",
    problema:
      "Como toda empresa nova, precisávamos provar valor antes do primeiro cliente: apresentar serviços com clareza, transmitir autoridade técnica e atender interessados a qualquer hora — sem uma equipe de plantão.",
    solucao:
      "Aplicamos o Sistema Origem™ em nós mesmos: site profissional com vídeo cinematográfico, demonstração real do agente de IA, calculadora de perda de clientes, diagnóstico interativo e agente de IA atendendo o WhatsApp 24/7 com nossos preços e serviços.",
    resultado:
      "Este site que você está navegando é o resultado — cada seção, animação e automação daqui é exatamente o que entregamos para nossos clientes. O produto é a prova.",
  },
  {
    slug: "o-mundo-da-sa",
    titulo: "O Mundo da Sá",
    segmento: "Tecnologia · Redes sociais",
    problema:
      "O negócio existia nas redes sociais, mas não tinha um endereço próprio na internet. Quem procurava pelo nome no Google não encontrava nada oficial, e todo contato dependia de a pessoa achar o perfil primeiro.",
    solucao:
      "Site profissional com layout exclusivo, desenhado do zero para a marca — sem template pronto. Otimizado para carregar rápido no celular, com botão de WhatsApp visível em todas as páginas e cada página com título e descrição preparados para o Google.",
    resultado:
      "O site está no ar em mundodasa.com.br, indexado no Google e carregando rápido no celular — que é de onde vem a maior parte dos visitantes. É o projeto que mostra o padrão de entrega da Origem Digital.",
  },
  // <- adicione novos cases aqui
];
