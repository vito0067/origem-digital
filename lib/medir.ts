import { track } from "@vercel/analytics";
import { podeMedir } from "./consentimento";

/**
 * Registra uma ação importante da pessoa no site.
 *
 * As visitas de página a Vercel conta sozinha. Isto aqui é para o que
 * ela não tem como adivinhar: quem clicou em qual botão de WhatsApp,
 * quem terminou o diagnóstico e com que nota, quem mexeu na
 * calculadora. É o que responde "a calculadora prende ou espanta?".
 *
 * ⚠️ Eventos assim dependem do plano da Vercel. Se o seu for o
 * gratuito, as visitas de página continuam sendo contadas normalmente
 * e estes eventos simplesmente não aparecem no painel — nada quebra,
 * nada fica lento, e o dia que você mudar de plano eles começam a
 * aparecer sozinhos.
 *
 * Nada aqui identifica a pessoa. Não vai nome, telefone nem e-mail —
 * só o que foi clicado. É medição de comportamento, não de gente, e é
 * assim que fica em paz com a LGPD.
 */
export function medir(evento: string, dados?: Record<string, string | number>) {
  // Segunda tranca. A primeira é o componente Medicao, que nem carrega
  // o código de medição sem permissão; esta aqui protege os eventos
  // disparados direto de dentro das seções (diagnóstico, calculadora),
  // que existem no código independentemente daquele componente.
  if (!podeMedir()) return;

  try {
    track(evento, dados);
  } catch {
    // medição nunca pode derrubar o site: se falhar, segue o jogo
  }
}

/**
 * Nomes usados no site. Ficam todos aqui para o painel da Vercel não
 * virar uma lista de nomes parecidos escritos de jeitos diferentes.
 */
export const EVENTOS = {
  whatsapp: "whatsapp_clique",
  diagnostico: "diagnostico_concluido",
  calculadora: "calculadora_usada",
  projeto: "projeto_visitado",
} as const;
