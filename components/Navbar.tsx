"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Marca from "./Marca";
import Magnetic from "./Magnetic";

/**
 * BARRA DO TOPO
 *
 * Três coisas novas, todas resolvendo problema real:
 *
 * 1. MENU NO CELULAR — os links ficavam escondidos em tela pequena e
 *    não havia como abri-los. Quem entrava pelo celular (que é a
 *    maioria) só tinha o botão do WhatsApp. Agora tem menu.
 *
 * 2. BARRA DE PROGRESSO — uma linha ciano embaixo da barra mostra o
 *    quanto da página já foi lida. Em página longa, saber que está
 *    perto do fim é o que segura a pessoa até o último bloco.
 *
 * 3. SEÇÃO ATUAL ACESA — o link da seção onde a pessoa está fica em
 *    ciano. Ela sempre sabe onde está.
 */

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#demonstracao", label: "Demonstração" },
  { href: "#servicos", label: "Serviços" },
  { href: "#como-funciona", label: "Sistema Origem" },
  { href: "#faq", label: "FAQ" },
];

const WA =
  "https://wa.me/5511939299209?text=Ol%C3%A1!%20Quero%20um%20diagn%C3%B3stico%20gratuito.";

export default function Navbar() {
  const [descido, setDescido] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [atual, setAtual] = useState("");
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const aoRolar = () => {
      const y = window.scrollY;
      setDescido(y > 32);

      const total = document.body.scrollHeight - window.innerHeight;
      setProgresso(total > 0 ? Math.min(1, y / total) : 0);
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Qual seção está ocupando o meio da tela agora.
  useEffect(() => {
    const alvos = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];
    if (!alvos.length) return;

    const vigia = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) setAtual(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    alvos.forEach((a) => vigia.observe(a));
    return () => vigia.disconnect();
  }, []);

  // Com o menu do celular aberto, a página atrás não rola.
  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        descido || aberto
          ? "border-b border-white/10 bg-abyss/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link
          href="#"
          aria-label="Origem Digital — início"
          onClick={() => setAberto(false)}
        >
          <Marca formato="linha" />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative py-1 text-sm transition-colors ${
                atual === l.href
                  ? "text-cyan-neon"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {l.label}
              {/* traço que cresce do meio para fora na seção atual */}
              <span
                aria-hidden
                className={`absolute -bottom-0.5 left-0 h-px w-full origin-center bg-cyan-neon transition-transform duration-300 ${
                  atual === l.href ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* O ímã fica só neste botão, e não em todos os links do
              menu. Cada Magnetic mantém o próprio laço de animação
              rodando; colocar em cinco links custaria cinco laços para
              um efeito que, repetido, faz o menu inteiro parecer
              instável. Aqui ele marca o botão que importa. */}
          <Magnetic forca={0.18}>
            <Link
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="brilho-passa inline-block rounded-lg border border-cyan-neon/40 bg-cyan-neon/10 px-4 py-2 text-xs font-medium text-cyan-neon backdrop-blur-md transition-shadow hover:shadow-neon-cyan sm:text-sm"
            >
              Diagnóstico gratuito
            </Link>
          </Magnetic>

          {/* Botão do menu — só no celular e no tablet */}
          <button
            type="button"
            onClick={() => setAberto((a) => !a)}
            aria-expanded={aberto}
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg border border-white/15 lg:hidden"
          >
            <span
              aria-hidden
              className={`h-px w-4 bg-white transition-transform duration-300 ${
                aberto ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              aria-hidden
              className={`h-px w-4 bg-white transition-opacity duration-200 ${
                aberto ? "opacity-0" : ""
              }`}
            />
            <span
              aria-hidden
              className={`h-px w-4 bg-white transition-transform duration-300 ${
                aberto ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Linha de progresso da leitura */}
      <div
        aria-hidden
        className="h-px origin-left bg-gradient-to-r from-cyan-neon to-violet-neon transition-transform duration-150"
        style={{ transform: `scaleX(${progresso})` }}
      />

      {/* Menu do celular */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-abyss/95 backdrop-blur-xl transition-[max-height] duration-300 lg:hidden ${
          aberto ? "max-h-96" : "max-h-0 border-t-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setAberto(false)}
                className={`block border-b border-white/[0.07] py-4 font-display text-base transition-colors ${
                  atual === l.href ? "text-cyan-neon" : "text-slate-300"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="#diagnostico"
              onClick={() => setAberto(false)}
              className="block py-4 font-display text-base text-slate-300"
            >
              Diagnóstico
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
