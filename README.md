# Origem Digital — Landing Page

Landing page cinematográfica em **Next.js 14 (App Router) + TypeScript + Tailwind CSS**, com Hero de scroll scrubbing de vídeo e identidade dark futurista (ciano `#00F0FF` + violeta `#A855F7` sobre `#0B0D17`).

## Como rodar

```bash
npm install
npm run dev
# abrir http://localhost:3000
```

Build de produção:

```bash
npm run build && npm start
```

## O vídeo da Hero (Higgsfield)

A Hero funciona em dois modos, automaticamente:

1. **Com vídeo** — coloque o arquivo gerado no Higgsfield em:
   `public/media/hero-video.mp4`
   O scroll da página passa a "esfregar" (scrub) o tempo do vídeo, com interpolação suave via requestAnimationFrame.
2. **Sem vídeo (fallback atual)** — enquanto o arquivo não existe, a Hero faz um crossfade cinematográfico entre `frame-inicial.png` e `frame-final.png`, dirigido pelo mesmo progresso de scroll.

### Prompt sugerido para o Higgsfield (start frame → end frame)

- **Start frame:** `public/media/frame-inicial.png`
- **End frame:** `public/media/frame-final.png`
- **Prompt:** "Ultra-realistic cinematic transition representing digital transformation for small businesses. The camera glides forward through a dark server room bathed in deep purple neon, glowing data particles begin to rise from the grid floor, accelerating into streaks of cyan light; the environment dissolves at high speed into a futuristic holographic interface bursting with electric cyan panels, charts and UI elements — fluid, seamless, high-energy morph, volumetric neon lighting, 4K, no text artifacts."
- **Dica técnica:** exporte em 1080×1920 ou 1920×1080 conforme o corte desejado (o CSS usa `object-cover`, então qualquer proporção funciona), H.264, e de preferência com **keyframes frequentes** (ex.: `ffmpeg -g 15`) — vídeos com poucos keyframes fazem o scrubbing "engasgar" no navegador.

## Estrutura

```
app/
  layout.tsx       # fontes (Space Grotesk + Inter), metadata pt-BR
  page.tsx         # composição das seções
  globals.css      # tema, glassmorphism, grid neon, reduced-motion
components/
  HeroCinematic.tsx  # hero 300vh sticky com video scrubbing + fallback
  NeonButton.tsx     # CTA com brilho pulsante ciano / ghost em vidro
  Navbar.tsx         # navegação fixa em vidro
  Services.tsx       # Sites, Agentes de IA, Pacote Completo
  Differentials.tsx  # entrega rápida, suporte, tecnologia
  FinalCta.tsx       # CTA final com brilhos ambientes
  Footer.tsx
  Reveal.tsx         # animação de entrada por IntersectionObserver
public/media/
  frame-inicial.png   # frame inicial (referência Higgsfield)
  frame-final.png     # frame final (referência Higgsfield)
  hero-video.mp4     # ← colocar aqui o vídeo gerado
```

## Acessibilidade

- `prefers-reduced-motion` respeitado: hero vira imagem estática, animações desativadas.
- Foco visível nos CTAs, textos com contraste garantido pela máscara escura.
