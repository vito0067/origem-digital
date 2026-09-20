"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * O print do site do cliente passeando devagar dentro da moldura, como
 * se alguém estivesse rolando a página.
 *
 * Antes era um retângulo parado mostrando só a primeira dobra — quem
 * olhava não tinha como saber se o resto do site era bom. Vendo a
 * página inteira passar, a pessoa avalia o trabalho sem sair daqui.
 *
 * O COMPONENTE SE VIRA SOZINHO COM QUALQUER IMAGEM.
 * Ele mede a altura real do print e a altura da moldura e passeia
 * exatamente a diferença. Se o print for mais baixo do que a moldura
 * (como um print só da primeira tela), não sobra nada para percorrer e
 * ele simplesmente fica parado, sem defeito visual.
 *
 * ➜ PARA O EFEITO APARECER DE VERDADE, o print precisa ser da PÁGINA
 *   INTEIRA, não só da primeira tela. No Chrome: abra o site do
 *   cliente, aperte F12, depois Ctrl+Shift+P, digite "full size" e
 *   escolha "Capture full size screenshot". Salve em /public/media/ e
 *   aponte o caminho aqui. Quanto mais alto o arquivo, mais página a
 *   pessoa vê passar — o resto se ajusta sozinho.
 *
 * A velocidade é fixa em pixels por segundo, e não em "X segundos do
 * começo ao fim": assim um print três vezes mais alto passeia no mesmo
 * ritmo calmo, em vez de disparar.
 */

/** Pixels por segundo. Devagar de propósito: é para acompanhar lendo. */
const VELOCIDADE = 26;
/** Abaixo disso não vale a pena mexer — parado fica melhor que tremendo. */
const MINIMO = 40;

export default function PrintPasseando({
  src,
  alt,
  largura = 2048,
  altura = 1152,
}: {
  src: string;
  alt: string;
  largura?: number;
  altura?: number;
}) {
  const moldura = useRef<HTMLDivElement>(null);
  const trilho = useRef<HTMLDivElement>(null);

  const [percurso, setPercurso] = useState(0);
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const medir = () => {
      const m = moldura.current;
      const t = trilho.current;
      if (!m || !t) return;

      const sobra = t.offsetHeight - m.clientHeight;
      if (sobra < MINIMO) {
        setPercurso(0);
        return;
      }
      setPercurso(sobra);
      // ida + volta, mais as pausas das pontas embutidas no keyframe
      setSegundos(Math.round((sobra / VELOCIDADE) * 2.6));
    };

    medir();
    const obs = new ResizeObserver(medir);
    if (moldura.current) obs.observe(moldura.current);
    if (trilho.current) obs.observe(trilho.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={moldura}
      className="group/print relative aspect-[16/9] overflow-hidden border-b border-white/10 lg:border-b-0 lg:border-r"
    >
      <div
        ref={trilho}
        className="absolute inset-x-0 top-0"
        style={
          percurso > 0
            ? {
                animation: `passeiaPrint ${segundos}s ease-in-out infinite`,
                // o keyframe lê daqui o quanto tem para percorrer
                ["--percurso" as string]: `${percurso}px`,
              }
            : undefined
        }
      >
        <Image
          src={src}
          alt={alt}
          width={largura}
          height={altura}
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="w-full"
        />
      </div>

      {/* Escurece a base para o degradê do site do cliente nunca brigar
          com a borda do cartão. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-abyss/40 to-transparent"
      />

      {/* Só aparece quando há passeio acontecendo e o mouse está em cima. */}
      {percurso > 0 && (
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-abyss/75 px-3 py-1 text-[10px] uppercase tracking-widest text-slate-400 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/print:opacity-100"
        >
          pausado
        </span>
      )}
    </div>
  );
}
