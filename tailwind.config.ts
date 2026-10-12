import type { Config } from "tailwindcss";

/**
 * "GELO" — A IDENTIDADE DESTA VERSÃO (outubro/2026).
 *
 * Futurismo limpo e calmo. O site de tecnologia típico grita: fundo
 * preto, neon, esfera 3D girando. Este fala baixo: muito branco, vidro
 * fosco, uma cor de destaque só — e o movimento acontece uma vez, na
 * hora certa, e para.
 *
 * AS QUATRO CORES QUE O VITO ESCOLHEU:
 *   #F8FAFC  gelo     — o fundo
 *   #BAE6FD  ceu      — o azul-claro (brilhos, realces suaves)
 *   #818CF8  violeta  — o destaque
 *   #312E81  noite    — o índigo profundo (botão principal, títulos)
 *
 * E AS DE APOIO, PARA O TEXTO SER LEGÍVEL:
 *   tinta    — o texto principal (índigo quase preto)
 *   grafite  — texto corrido
 *   cinza    — legendas
 *   linha    — bordas finas
 *   azul     — links e palavras em destaque (o violeta, escurecido o
 *              bastante para passar no teste de contraste)
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gelo: "#F8FAFC",
        papel: "#FFFFFF",
        nevoa: "#F1F5FB",
        ceu: { DEFAULT: "#BAE6FD", claro: "#E0F2FE", suave: "#F0F9FF" },
        violeta: { DEFAULT: "#818CF8", claro: "#C7D2FE", suave: "#EEF2FF" },
        noite: { DEFAULT: "#312E81", claro: "#3F3A9E", escuro: "#1E1B4B" },
        tinta: "#1E1B4B",
        grafite: "#475569",
        cinza: "#64748B",
        linha: "#E2E8F0",
        azul: { DEFAULT: "#4F46E5", escuro: "#3730A3", claro: "#A5B4FC", suave: "#EEF2FF" },
        zap: "#25D366",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-display)", "system-ui", "sans-serif"],
        serifa: ["var(--font-serifa)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        vidro: "inset 0 1px 0 rgba(255,255,255,.9), 0 1px 2px rgba(30,27,75,.04), 0 18px 40px -18px rgba(49,46,129,.22)",
        flutua: "inset 0 1px 0 rgba(255,255,255,.9), 0 2px 6px rgba(30,27,75,.05), 0 34px 70px -28px rgba(49,46,129,.35)",
        botao: "inset 0 1px 0 rgba(255,255,255,.18), 0 1px 2px rgba(30,27,75,.2), 0 10px 24px -10px rgba(49,46,129,.6)",
        cartao: "0 1px 2px rgba(30,27,75,.05), 0 8px 24px -12px rgba(49,46,129,.18)",
        celular: "0 0 0 1px rgba(30,27,75,.06), 0 50px 90px -30px rgba(49,46,129,.45), 0 20px 40px -20px rgba(30,27,75,.25)",
      },
      maxWidth: {
        pagina: "76rem",
      },
    },
  },
  plugins: [],
};

export default config;
