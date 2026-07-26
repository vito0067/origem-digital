export type Case = {
  slug: string;
  titulo: string;
  segmento: string;
  problema: string;
  solucao: string;
  tecnologias: string[];
  resultado: string;
};

/**
 * COMO ADICIONAR UM CASE NOVO:
 * copie o objeto abaixo, preencha com os dados reais do cliente
 * (com autorização dele!) e a página /cases/<slug> passa a existir
 * automaticamente. Nunca publique um case sem resultado verdadeiro.
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
    tecnologias: ["OpenAI Chat Model", "n8n", "WhatsApp Business", "Vercel", "Cloudfy", "APIs e Automações"],
    resultado:
      "Este site que você está navegando é o resultado — cada seção, animação e automação daqui é exatamente o que entregamos para nossos clientes. O produto é a prova.",
  },
  // <- adicione novos cases aqui
];
