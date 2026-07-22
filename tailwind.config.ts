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
        cyan: {
          neon: "#00F0FF",
        },
        violet: {
          neon: "#A855F7",
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
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,240,255,0.35), 0 0 48px rgba(0,240,255,0.12)" },
          "50%": { boxShadow: "0 0 32px rgba(0,240,255,0.65), 0 0 96px rgba(0,240,255,0.28)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 2.6s ease-in-out infinite",
        "float-y": "floatY 6s ease-in-out infinite",
        "scanline": "scanline 7s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
