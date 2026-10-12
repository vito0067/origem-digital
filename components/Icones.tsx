/**
 * Ícones do site, desenhados em vetor — sem biblioteca e sem download.
 *
 * O VISTO DUPLO (✓✓) É O SINAL DA CASA. Todo mundo no Brasil sabe o que
 * ele quer dizer no WhatsApp: a mensagem chegou e foi lida. Nas listas do
 * site, cada item marcado com ele é uma promessa "vista e respondida" —
 * o que a Origem vende, em um símbolo que ninguém precisa aprender.
 */

type P = { className?: string };

export function VistoDuplo({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 18 12" className={className} fill="none" aria-hidden>
      <path d="M1 6.5 4.6 10 11.4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.6 9.2 8.4 10 15.2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Seta({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SetaDiagonal({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden>
      <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Xis({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden>
      <path d="m4.5 4.5 7 7m0-7-7 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function WhatsApp({ className = "h-5 w-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12.04 2a9.9 9.9 0 00-8.5 14.95L2 22l5.2-1.5A9.9 9.9 0 1012.04 2zm0 1.8a8.1 8.1 0 016.9 12.4l-.25.4.83 3.04-3.12-.82-.38.22a8.1 8.1 0 01-11.9-7.1 8.1 8.1 0 017.92-8.14zm-3.1 4.1c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.7 2.7 4.2 3.68 2.08.82 2.5.66 2.95.62.45-.04 1.45-.59 1.66-1.17.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.45-.72-1.67-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.77.96-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.45-1.35-1.69-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.33-.75-1.82-.19-.46-.38-.4-.53-.4z" />
    </svg>
  );
}

export function Instagram({ className = "h-5 w-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** O escudo das garantias: o contorno e o visto se desenham uma vez. */
export function Escudo({ className = "h-6 w-6" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path className="escudo-traco" d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" strokeLinejoin="round" />
      <path className="escudo-traco escudo-traco-2" d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
