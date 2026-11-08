/**
 * DEPOIMENTOS DE CLIENTES — só entram aqui os REAIS, com autorização por escrito.
 *
 * O componente components/Depoimentos.tsx só aparece na página quando esta
 * lista tem pelo menos um item. Nada é inventado: sem depoimento, sem seção.
 *
 * Para adicionar (exemplo, NÃO é um depoimento real):
 *   { texto: "Frase exata que o cliente escreveu.", nome: "Nome", cargo: "Profissão, cidade", site: "https://endereco-do-site-dele" }
 *
 * Pendente (08/11/2026): Karina Sposito (site-karina-sposito) — pedido de
 * depoimento e de autorização para mostrar o site dela. Só adicionar quando ela responder.
 */
export type Depoimento = { texto: string; nome: string; cargo: string; site?: string };

export const depoimentos: Depoimento[] = [];
