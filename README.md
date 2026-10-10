# Origem Digital — site

Site da Origem Digital: **[origemdigitalsite.com.br](https://origemdigitalsite.com.br)**.
Sites profissionais e agentes de IA no WhatsApp (a Aurora) para pequenas empresas.

Feito em Next.js 14 + TypeScript + Tailwind CSS, publicado na Vercel.

---

## Como uma mudança vai ao ar

1. O arquivo é editado ou enviado aqui no GitHub (pelo navegador).
2. A Vercel percebe a mudança e publica sozinha, em 1 a 2 minutos.
3. O sinal verde ✓ ao lado da última mudança quer dizer que publicou. Um **X vermelho** quer dizer que a publicação falhou — **o site não cai**: continua no ar na versão anterior até a próxima publicação dar certo.

⚠️ Ao enviar arquivos, confira a pasta. Um arquivo de `components/` enviado na raiz do repositório quebra a publicação.

---

## Onde fica cada coisa

| O que | Onde |
|---|---|
| A página inicial e a ordem das seções | `app/page.tsx` |
| Cada seção da página inicial | `components/` (um arquivo por seção) |
| **Todos os preços** | `lib/precos.ts` — fonte única; o resto do site lê daqui |
| Página para clínicas | `app/clinicas/page.tsx` |
| Cases (projetos entregues) | `lib/cases.ts` — case novo entra na lista e ganha página sozinho |
| Termos de Uso | `app/termos/page.tsx` |
| Política de Privacidade | `app/privacidade/page.tsx` |
| Página de endereço não encontrado (404) | `app/not-found.tsx` |
| Cores, fontes e animações gerais | `app/globals.css` e `tailwind.config.ts` |
| Título e descrição para o Google, dados da empresa | `app/layout.tsx` |
| Lista de páginas para o Google | `app/sitemap.ts` e `app/robots.ts` |
| Imagem que aparece ao compartilhar o link | `app/opengraph-image.tsx` |
| Imagens, vídeo e a marca em 3D | `public/media/` |
| Ferramentas para comprimir imagem, vídeo e 3D | `scripts/` |

---

## Regras que evitam estrago

**O contrato manda, o site acompanha.** Prazo, pagamento, fidelidade, cancelamento e garantias do site seguem o Contrato Master revisado. Pelo Código de Defesa do Consumidor, o que o site anuncia vale como parte do contrato — então o site nunca promete mais do que o contrato. Esses textos estão em `components/Garantias.tsx`, `components/Faq.tsx`, `app/termos/page.tsx` e `app/clinicas/page.tsx`.

**Preço mudou?** Mude em `lib/precos.ts` e também nas respostas do FAQ (`components/Faq.tsx`), na conversa de demonstração (`components/ConversaAurora.tsx` e `components/AntesDepois.tsx`) — e, principalmente, **na tabela de preços da Aurora no n8n**. Senão o agente informa um valor e o site mostra outro.

**WhatsApp comercial** — (11) 93929-9209 — aparece em 14 arquivos. Para trocar, procure por `5511939299209` em `app/` e `components/`.

**E-mail oficial:** contato@origemdigitalsite.com.br.

**Animação com moderação.** Uma coisa se mexendo por tela, sempre com motivo. Nada de efeito em looping infinito ou que persegue o mouse.

---

## Para criar a página de outro ramo (salões, restaurantes…)

1. Copie a pasta `app/clinicas` com o nome do ramo (ex.: `app/saloes`).
2. Troque os textos e a conversa de exemplo.
3. Acrescente a página em `app/sitemap.ts` e no rodapé (`components/Footer.tsx`).

---

## Rodar no computador

```bash
npm install
npm run dev
```

Depois, abrir http://localhost:3000.
