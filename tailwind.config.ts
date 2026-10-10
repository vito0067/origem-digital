import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        abyss: "#0B0D17",
        // Um degrau acima do abyss. Serve para separar uma faixa da outra
        // sem desenhar borda: o olho percebe a mudança de seção sozinho.
        surface: "#0E1120",
        cyan: {
          neon: "#00F0FF",
        },
        violet: {
          neon: "#A855F7",
        },
        /**
         * CINZA DOS TEXTOS PEQUENOS, MAIS CLARO DO QUE O PADRÃO.
         *
         * O `slate-500` original (#64748B) é o cinza das letras miúdas do
         * site: observações, rodapé, legendas, horários. Sobre o fundo
         * escuro ele dava contraste de 4,1 para 1 — abaixo do mínimo de
         * 4,5 recomendado para texto pequeno. No celular, no sol, essas
         * linhas sumiam.
         *
         * Clareando o tom aqui, num lugar só, os 37 textos que usam essa
         * cor passam a 5,8 para 1 sem mexer em nenhum componente. E ele
         * continua mais escuro que o `slate-400` do texto corrido (7,6
         * para 1), então a hierarquia entre texto e observação se mantém.
         *
         * Só a tonalidade 500 muda; as outras do cinza seguem as padrão.
         */
        slate: {
          500: "#7F8EA3",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        "neon-cyan": "0 0 24px rgba(0, 240, 255, 0.35), 0 0 64px rgba(0, 240, 255, 0.15)",
        "neon-violet": "0 0 24px rgba(168, 85, 247, 0.35), 0 0 64px rgba(168, 85, 247, 0.15)",
        "glass": "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.45)",
      },
      // Saíram daqui na limpeza de animações (outubro/2026): o brilho
      // que pulsava sem parar nos botões principais (pulseGlow) e a
      // faixa de luz que varria a capa de cima a baixo (scanline).
      keyframes: {
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        // Faixa infinita que desliza da direita para a esquerda.
        // Metade da largura porque o conteúdo é duplicado no HTML —
        // quando a primeira cópia sai, a segunda já está no lugar dela.
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        // Traço que se desenha da esquerda para a direita sob os títulos.
        drawLine: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "float-y": "floatY 6s ease-in-out infinite",
        "marquee": "marquee 38s linear infinite",
        "draw-line": "drawLine 1.1s cubic-bezier(.22,1,.36,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
