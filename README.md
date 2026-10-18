# Origem Digital — "Gelo" (versão de outubro/2026)

**"O cliente chamou. Já foi respondido."**

Futurismo limpo e calmo. O site de tecnologia típico grita (fundo preto, neon, esfera 3D girando); este fala baixo: muito branco, vidro fosco, uma cor de destaque — e o movimento acontece uma vez, na hora certa, e para.

Cores: **#F8FAFC** (gelo) · **#BAE6FD** (azul-claro) · **#818CF8** (violeta) · **#312E81** (índigo).
Letras: Instrument Sans (tudo), Instrument Serif itálico (uma frase por título), DM Mono (etiquetas).

Feito em Next.js 14 + TypeScript + Tailwind CSS, publicado na Vercel.

---

## As três coisas que só este site tem

1. **O símbolo que se monta de pixels** (capa) — o "OD" se forma com milhares de pixels vindos da esquerda, uma vez, quando aparece na tela. Depois chegam a mensagem do cliente (23:47) e a resposta da atendente. `components/SimboloParticulas.tsx` e `components/Capa.tsx`.
2. **"Pergunte"** — as perguntas frequentes viraram uma conversa: a pessoa escolhe a pergunta e a resposta chega como no WhatsApp. É o FAQ e a demonstração do produto ao mesmo tempo (a tela avisa que é demonstração). `components/Pergunte.tsx`.
3. **Preços em abas** — Site / Atendente / Os dois, dois planos por aba. `components/Precos.tsx`.

---

## Onde fica cada coisa

| O que | Onde |
|---|---|
| A ordem das seções | `app/page.tsx` |
| **Todos os preços** | `lib/precos.ts` — fonte única |
| A janela de conversa "Pergunte" | `components/Pergunte.tsx` |
| Serviços (os dois cartões e a faixa do pacote) | `components/Servicos.tsx` |
| Os quatro passos e as garantias do contrato | `components/ComoFunciona.tsx` |
| Ramos e o case | `components/ParaQuem.tsx` |
| **A lista dos 8 ramos** (página inicial, rodapé, sitemap) | `lib/ramos.ts` |
| Páginas por ramo (só os textos) | `app/clinicas`, `app/petshops`, `app/saloes`, `app/restaurantes`, `app/oficinas`, `app/lojas`, `app/contabilidades`, `app/prestadores` |
| Calculadora e questionário (página /diagnostico) | `app/diagnostico/page.tsx`, `components/Calculadora.tsx`, `components/Questionario.tsx` |
| Perguntas frequentes (conversa e FAQ do Google) | `lib/perguntas.ts` |
| O desenho das páginas por ramo | `components/PaginaSegmento.tsx` |
| Termos, privacidade, cases | `components/PaginaSimples.tsx` |
| Cores e letras | `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx` |
| Imagem de compartilhamento no WhatsApp | `app/**/opengraph-image.png` — imagens prontas, geradas com as fontes do site (peça ao Claude para refazer se mudar o texto) |
| Ícones (aba do navegador, iPhone) | `app/icon.png`, `app/apple-icon.png` — gerados por `node scripts/gerar-marca.mjs` |

**A logomarca completa** (SVG e PNG, versões para fundo claro e escuro, foto de perfil, ícone de app e a folha de apresentação) está em `Documents\Origem Digital\2-marca\ATUAL-logomarca-gelo-2026\`. O mapa de todas as pastas (site, marca, documentos, mídia) está em `Documents\Origem Digital\LEIA-ME.md`.

---

## Regras que evitam estrago

**O contrato manda, o site acompanha.** Prazo, pagamento, fidelidade, cancelamento e garantias seguem o Contrato Master revisado (out/2026). Esses textos estão em `lib/perguntas.ts`, `components/ComoFunciona.tsx`, `components/Precos.tsx`, `app/termos/page.tsx` e nas páginas por ramo.

**Preço mudou?** Mude em `lib/precos.ts` (o resto do site lê de lá) e na conversa de `components/ConversaAurora.tsx` — e **na tabela de preços da Aurora no n8n**.

**Regras das páginas por ramo (decididas pelo Vito, out/2026):** restaurante — a atendente tira dúvidas e manda cardápio/link de pedido, não fecha pedido; lojas — fala com loja física e virtual, e o nosso site é vitrine (não loja com carrinho); contabilidade — só informações do escritório, dúvida de imposto vai para o contador; prestadores — personal e estúdios, advogados e consultores, fotógrafos e eventos (nunca dá orientação técnica nem promete resultado). Em todas: a atendente se apresenta como IA, e agenda direto só no Agente Avançado.

**Animação com moderação.** O símbolo se monta uma vez; a linha dos passos se desenha uma vez; a primeira pergunta se faz sozinha uma vez. Nada fica em looping, nada segue o mouse. Quem pede menos movimento no sistema vê tudo pronto.

**WhatsApp comercial** — (11) 93929-9209: procure por `5511939299209`. **E-mail:** contato@origemdigitalsite.com.br.

---

## O que saiu, de propósito, para o site respirar

Comparação "chatbot × Aurora", método em seis etapas, diferenciais e a carta "sobre". A calculadora e o questionário de diagnóstico continuam no site, na página `/diagnostico` (menu "Faça as contas"). As informações que importam (preço, prazo, contrato, perguntas, ramos, case) continuam todas.

---

## Rodar no computador

```bash
npm install
npm run dev
```
