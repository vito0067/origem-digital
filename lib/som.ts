/**
 * Um "tec" curto quando a pessoa responde uma pergunta do diagnóstico.
 *
 * O som é gerado na hora pelo próprio navegador (Web Audio) — não há
 * arquivo de áudio para baixar, então não pesa nada na carga da página.
 *
 * COMEÇA DESLIGADO, DE PROPÓSITO.
 * Site que emite som sem avisar é motivo de fechar a aba, ainda mais
 * para quem abre com o celular no meio de outra coisa. Quem quiser liga
 * no botãozinho ao lado do diagnóstico, e a escolha fica guardada no
 * navegador da pessoa.
 *
 * Para começar ligado (não recomendo), troque o `false` em PADRAO_LIGADO.
 */

const CHAVE = "origem-som";
const PADRAO_LIGADO = false;

export function somLigado(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const salvo = localStorage.getItem(CHAVE);
    return salvo === null ? PADRAO_LIGADO : salvo === "1";
  } catch {
    // navegador com dados de site bloqueados: segue desligado
    return PADRAO_LIGADO;
  }
}

export function guardarSom(ligado: boolean) {
  try {
    localStorage.setItem(CHAVE, ligado ? "1" : "0");
  } catch {
    // sem onde guardar: vale só para esta visita, e tudo bem
  }
}

let contexto: AudioContext | null = null;

/**
 * @param agudo  frequência em hertz. Mais alto = mais "sim", mais
 *               baixo = mais "não". A diferença é sutil de propósito:
 *               é um retorno, não um alarme.
 */
export function tocarTec(agudo = 880) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return;

    contexto = contexto ?? new Ctx();
    // alguns navegadores só liberam o áudio depois de um clique;
    // como o som só toca em resposta a um, isto costuma bastar
    if (contexto.state === "suspended") contexto.resume();

    const agora = contexto.currentTime;
    const osc = contexto.createOscillator();
    const volume = contexto.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(agudo, agora);

    // ataque rápido e queda curta: vira um toque, não um apito
    volume.gain.setValueAtTime(0.0001, agora);
    volume.gain.exponentialRampToValueAtTime(0.06, agora + 0.008);
    volume.gain.exponentialRampToValueAtTime(0.0001, agora + 0.12);

    osc.connect(volume).connect(contexto.destination);
    osc.start(agora);
    osc.stop(agora + 0.14);
  } catch {
    // áudio indisponível: o diagnóstico funciona igual, em silêncio
  }
}
