import Link from "next/link";
import type { ReactNode } from "react";
import { Seta, WhatsApp } from "./Icones";

/**
 * O BOTÃO DO GELO.
 *
 *   noite  — a ação principal: índigo profundo, letra branca
 *   vidro  — a segunda opção: vidro fosco, letra índigo
 *
 * Redondo, sem borda grossa. Link de WhatsApp ganha o ícone e abre em
 * outra aba; os outros ganham a seta, que anda um pouco ao passar o
 * mouse — o único movimento dele.
 */

type Props = {
  href: string;
  children: ReactNode;
  tom?: "noite" | "vidro";
  className?: string;
  cheio?: boolean;
  /** Ícone no lugar do automático (WhatsApp ou seta), ex.: o do Instagram. */
  icone?: ReactNode;
};

const TONS = {
  noite: "bg-noite text-white shadow-botao hover:bg-noite-claro",
  vidro: "vidro text-tinta shadow-vidro hover:bg-white",
};

export default function Botao({ href, children, tom = "noite", className = "", cheio = false, icone }: Props) {
  const zap = href.includes("wa.me");
  const externo = zap || href.startsWith("http");
  const classes = `group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full px-6 py-3 text-center text-[15.5px] font-medium transition-[background-color,transform] duration-300 ${
    cheio ? "w-full" : ""
  } ${TONS[tom]} ${className}`;

  const miolo = (
    <>
      {icone ?? (zap && <WhatsApp className="h-[18px] w-[18px] shrink-0" />)}
      <span>{children}</span>
      {!zap && !icone && <Seta className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );

  if (externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {miolo}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {miolo}
    </Link>
  );
}
