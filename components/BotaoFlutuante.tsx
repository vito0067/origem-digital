"use client";

import { useEffect, useState } from "react";

/**
 * Botão de WhatsApp que acompanha a página.
 *
 * Só aparece depois que a pessoa passa da capa: na primeira tela já
 * existem dois botões grandes, e um terceiro flutuando por cima deles
 * seria só barulho. Ele entra quando os botões da capa saem — a partir
 * daí nunca mais falta um caminho para o WhatsApp, em nenhuma altura
 * da página.
 *
 * Some de novo perto do rodapé, onde o botão grande de fechamento já
 * está na tela.
 *
 * No celular ele encolhe para só o ícone: ali a barra de baixo do
 * navegador já disputa espaço com o polegar.
 */

const WA =
  "https://wa.me/5511939299209?text=Ol%C3%A1!%20Quero%20um%20diagn%C3%B3stico%20gratuito%20para%20o%20meu%20neg%C3%B3cio.";

export default function BotaoFlutuante() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => {
      const y = window.scrollY;
      const fim = document.body.scrollHeight - window.innerHeight;
      // entra depois da primeira tela, sai nos últimos 900px
      setVisivel(y > window.innerHeight * 0.9 && y < fim - 900);
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <a
      href={WA}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      tabIndex={visivel ? 0 : -1}
      aria-hidden={!visivel}
      className={`group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full border border-cyan-neon/40 bg-abyss/90 py-3.5 pl-3.5 pr-3.5 shadow-neon-cyan backdrop-blur-xl transition-all duration-500 sm:pr-6 ${
        visivel
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span aria-hidden className="relative flex h-6 w-6 shrink-0">
        {/* anel que pulsa, para o olho encontrar o botão sem esforço */}
        <span className="absolute inset-0 animate-ping rounded-full bg-cyan-neon/25" />
        <svg viewBox="0 0 24 24" className="relative h-6 w-6 fill-cyan-neon">
          <path d="M12.04 2a9.9 9.9 0 00-8.5 14.95L2 22l5.2-1.5A9.9 9.9 0 1012.04 2zm0 1.8a8.1 8.1 0 016.9 12.4l-.25.4.83 3.04-3.12-.82-.38.22a8.1 8.1 0 01-11.9-7.1 8.1 8.1 0 017.92-8.14zm-3.1 4.1c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.7 2.7 4.2 3.68 2.08.82 2.5.66 2.95.62.45-.04 1.45-.59 1.66-1.17.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.45-.72-1.67-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.77.96-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.45-1.35-1.69-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.33-.75-1.82-.19-.46-.38-.4-.53-.4z" />
        </svg>
      </span>
      <span className="hidden text-sm font-semibold text-white transition-colors group-hover:text-cyan-neon sm:block">
        Falar no WhatsApp
      </span>
    </a>
  );
}
