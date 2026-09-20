/**
 * A ESCOLHA DA PESSOA SOBRE SER MEDIDA.
 *
 * O site não guarda cookie nenhum por conta própria, e a medição de
 * audiência que ele usa (Vercel Analytics) também não usa cookies nem
 * identifica ninguém: ela conta quantas pessoas passaram por cada
 * seção, não QUEM passou.
 *
 * Mesmo assim, a medição só liga depois de a pessoa aceitar. A LGPD
 * pede base legal para tratar dado de quem visita, e consentimento é a
 * base mais segura — ainda mais para uma empresa que vende justamente
 * organização e transparência. Pedir é mais barato do que explicar
 * depois.
 *
 * CONSEQUÊNCIA PRÁTICA, para o Vito decidir com o número na mão:
 * quem não clicar em nada não é contado. Costuma ficar entre metade e
 * dois terços das visitas fora da conta. Os números do painel viram
 * uma AMOSTRA, não o total — servem para comparar ("a calculadora
 * prende mais que o diagnóstico?"), não para dizer "tive X visitas".
 *
 * Se um dia ele preferir medir todo mundo por legítimo interesse (o
 * que é defensável, já que nada identifica ninguém), é trocar o
 * PADRAO abaixo para "aceito" — e ajustar a política de privacidade
 * junto, senão os dois passam a contar histórias diferentes.
 */

const CHAVE = "origem-consentimento";

export type Escolha = "aceito" | "recusado" | "nao-perguntado";

/** O que vale enquanto a pessoa não escolheu. */
const PADRAO: Escolha = "nao-perguntado";

export function lerEscolha(): Escolha {
  if (typeof window === "undefined") return PADRAO;
  try {
    const guardado = localStorage.getItem(CHAVE);
    if (guardado === "aceito" || guardado === "recusado") return guardado;
  } catch {
    // navegador com dados de site bloqueados: pergunta de novo, e
    // enquanto isso não mede nada
  }
  return PADRAO;
}

export function guardarEscolha(escolha: Exclude<Escolha, "nao-perguntado">) {
  try {
    localStorage.setItem(CHAVE, escolha);
  } catch {
    /* sem onde guardar: vale só para esta visita */
  }
  // avisa a página inteira na hora, sem precisar recarregar
  window.dispatchEvent(new CustomEvent("origem-consentimento", { detail: escolha }));
}

/** Só é verdade quando a pessoa disse sim, de forma explícita. */
export function podeMedir() {
  return lerEscolha() === "aceito";
}
