"use client";

import { useEffect, useState } from "react";
import { WhatsApp } from "./Icones";

/**
 * Botão de WhatsApp que acompanha a página.
 *
 * Só aparece depois da capa (lá já há dois botões grandes) e some perto
 * do fim, onde o botão do fechamento já está na tela. No celular encolhe
 * para só o ícone.
 *
 * É o único lugar do site com o verde do WhatsApp: no canto da tela, é
 * a cor que todo mundo reconhece como "conversar" sem precisar ler.
 */

const WA = "https://wa.me/5511939299209?text=Ol%C3%A1!%20Quero%20um%20diagn%C3%B3stico%20gratuito%20para%20o%20meu%20neg%C3%B3cio.";

export default function BotaoFlutuante() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => {
      const y = window.scrollY;
      const fim = document.body.scrollHeight - window.innerHeight;
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
      className={`fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-zap p-3.5 text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)] transition-all duration-500 hover:bg-[#1FBE5B] sm:py-3.5 sm:pl-4 sm:pr-5 ${
        visivel ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <WhatsApp className="h-6 w-6 shrink-0" />
      <span className="hidden text-[15px] font-semibold sm:block">Falar no WhatsApp</span>
    </a>
  );
}
