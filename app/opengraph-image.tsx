import { imagemCompartilhamento } from "@/lib/imagemCompartilhamento";

/**
 * A IMAGEM QUE APARECE QUANDO ALGUÉM COMPARTILHA O SITE.
 *
 * O desenho está em lib/imagemCompartilhamento.tsx (com os cuidados para
 * o build não quebrar no Windows — leia antes de mexer). Aqui ficam só
 * as duas frases desta imagem.
 *
 * O Next gera a imagem sozinho ao publicar e serve em /opengraph-image.
 * Mexer no texto aqui já muda o que o WhatsApp mostra na próxima
 * publicação.
 */

// Tem que ser "edge" e tem que estar escrito aqui, à mão: o Next lê
// este valor direto do arquivo. Veja o motivo em lib/imagemCompartilhamento.
export const runtime = "edge";

export const alt =
  "Origem Digital — sites profissionais e agentes de IA no WhatsApp para pequenas empresas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return imagemCompartilhamento({
    titulo: "Sites profissionais e agentes de IA no WhatsApp",
    subtitulo: "Seu negócio respondendo clientes 24 horas por dia",
  });
}
