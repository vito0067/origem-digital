"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ramos } from "@/lib/ramos";

/**
 * "TAMBÉM ATENDEMOS" — a faixa no pé das páginas por ramo, com os outros
 * ramos. Ajuda quem caiu na página errada e ajuda o Google a achar todas.
 * A página atual sai da lista sozinha.
 */
export default function OutrosRamos() {
  const atual = usePathname();
  const outros = ramos.filter((r) => `/${r.slug}` !== atual);
  return (
    <section className="pb-8">
      <div className="mx-auto max-w-pagina px-5 sm:px-8">
        <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-cinza">Também atendemos</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {outros.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/${r.slug}`}
                className="inline-block rounded-full border border-linha bg-white px-4 py-2 text-[14px] text-grafite transition-colors hover:border-violeta hover:text-azul"
              >
                {r.nome}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
