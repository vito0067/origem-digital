"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Simbolo } from "./Marca";

/**
 * O TOPO: uma cápsula de vidro flutuando sobre a página.
 *
 * Na capa ela é quase invisível; ao descer, o vidro ganha corpo e
 * sombra. No celular, os links viram um painel de vidro.
 */

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#perguntas", label: "Pergunte" },
  { href: "#precos", label: "Preços" },
  { href: "#como-funciona", label: "Como funciona" },
];

/** Links para outras páginas (não são seções da página inicial). */
const paginas = [{ href: "/diagnostico", label: "Faça as contas" }];

const WA = "https://wa.me/5511939299209?text=Ol%C3%A1!%20Quero%20um%20diagn%C3%B3stico%20gratuito.";

export default function Topo({ inicio = "#" }: { inicio?: string }) {
  const [descido, setDescido] = useState(false);
  const [aberto, setAberto] = useState(false);
  const prefixo = inicio === "#" ? "" : "/";

  useEffect(() => {
    const aoRolar = () => setDescido(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        className={`mx-auto flex h-[60px] max-w-pagina items-center justify-between gap-3 rounded-full pl-5 pr-2 transition-[background-color,box-shadow,border-color] duration-500 ${
          descido || aberto ? "vidro shadow-vidro" : "border border-transparent"
        }`}
      >
        <Link href={inicio} aria-label="Origem Digital — início" onClick={() => setAberto(false)} className="flex shrink-0 items-center gap-2.5">
          <Simbolo id="od-topo" className="h-[22px] w-auto" />
          <span className="whitespace-nowrap font-display text-[17px] font-semibold tracking-[-0.02em] text-tinta">Origem Digital</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={`${prefixo}${l.href}`}
              className="rounded-full px-4 py-2 text-[14.5px] text-grafite transition-colors hover:bg-white/70 hover:text-tinta"
            >
              {l.label}
            </Link>
          ))}
          {paginas.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-[14.5px] text-grafite transition-colors hover:bg-white/70 hover:text-tinta"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden whitespace-nowrap rounded-full bg-noite px-5 py-2.5 text-[14px] font-medium text-white shadow-botao transition-colors hover:bg-noite-claro min-[420px]:inline-block"
          >
            Diagnóstico gratuito
          </a>
          <button
            type="button"
            onClick={() => setAberto((a) => !a)}
            aria-expanded={aberto}
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full lg:hidden"
          >
            <span aria-hidden className={`h-[1.5px] w-4 bg-tinta transition-transform duration-300 ${aberto ? "translate-y-[6.5px] rotate-45" : ""}`} />
            <span aria-hidden className={`h-[1.5px] w-4 bg-tinta transition-opacity duration-200 ${aberto ? "opacity-0" : ""}`} />
            <span aria-hidden className={`h-[1.5px] w-4 bg-tinta transition-transform duration-300 ${aberto ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      <div
        className={`mx-auto mt-2 max-w-pagina overflow-hidden rounded-[28px] transition-[max-height,opacity] duration-300 lg:hidden ${
          aberto ? "vidro max-h-[calc(100svh-90px)] opacity-100 shadow-flutua" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 pb-6 pt-3">
          {[...links.map((l) => ({ ...l, href: `${prefixo}${l.href}` })), ...paginas].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setAberto(false)}
                className="block border-b border-linha py-4 font-display text-[1.6rem] font-medium tracking-[-0.02em] text-tinta"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-6">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-noite px-6 text-[16px] font-medium text-white shadow-botao"
            >
              Solicitar diagnóstico gratuito
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
