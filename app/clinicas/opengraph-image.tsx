import { imagemCompartilhamento } from "@/lib/imagemCompartilhamento";

/**
 * A IMAGEM DA PÁGINA DE CLÍNICAS NO WHATSAPP.
 *
 * Quando você manda origemdigitalsite.com.br/clinicas para o dono de uma
 * clínica, é isto que aparece na conversa antes de ele clicar. Por isso
 * fala de clínica, e não do site inteiro.
 *
 * O desenho é o mesmo do site (lib/imagemCompartilhamento.tsx); aqui
 * ficam só as frases. Para outro ramo, copie este arquivo para a pasta
 * da página nova e troque as duas frases.
 */

// Tem que ser "edge" e escrito aqui, à mão — ver lib/imagemCompartilhamento.
export const runtime = "edge";

export const alt =
  "Origem Digital — site e atendente de IA no WhatsApp para clínicas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ImagemClinicas() {
  return imagemCompartilhamento({
    titulo: "Atendente de IA no WhatsApp para clínicas",
    subtitulo: "Pacientes respondidos na hora, 24 horas por dia",
  });
}
