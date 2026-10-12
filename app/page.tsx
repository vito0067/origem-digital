import type { Metadata } from "next";
import Topo from "@/components/Topo";
import Capa from "@/components/Capa";
import Servicos from "@/components/Servicos";
import Pergunte from "@/components/Pergunte";
import Precos from "@/components/Precos";
import ChamadaDiagnostico from "@/components/ChamadaDiagnostico";
import ComoFunciona from "@/components/ComoFunciona";
import ParaQuem from "@/components/ParaQuem";
import Fechamento from "@/components/Fechamento";
import Rodape from "@/components/Rodape";
import BotaoFlutuante from "@/components/BotaoFlutuante";
import { perguntas } from "@/lib/perguntas";

/**
 * O GELO, DE CIMA A BAIXO — cada seção com UMA ideia:
 *
 *   capa          — "O cliente chamou. Já foi respondido." + o símbolo
 *                   se montando de pixels + a mensagem respondida
 *   serviços      — site e atendente, em dois cartões
 *   pergunte      — o FAQ em forma de conversa com a atendente
 *   preços        — três abas, dois planos por aba
 *   faça as contas — a faixa que leva à calculadora e ao questionário
 *                   (as ferramentas moram em /diagnostico)
 *   como funciona — quatro passos e o que está no contrato
 *   para quem     — os oito ramos (cada um com página) e o case
 *   fechamento    — uma frase, o WhatsApp e o Instagram
 *
 * O que saiu da página, de propósito, para ela respirar: comparação com
 * chatbot, método em seis etapas, diferenciais e carta. A calculadora e
 * o questionário continuam no site, em /diagnostico.
 */

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** As perguntas frequentes também vão para o Google em formato de FAQ. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: perguntas.map((p) => ({
    "@type": "Question",
    name: p.q,
    acceptedAnswer: { "@type": "Answer", text: p.a },
  })),
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Topo />
      <Capa />
      <Servicos />
      <Pergunte />
      <Precos />
      <ChamadaDiagnostico />
      <ComoFunciona />
      <ParaQuem />
      <Fechamento />
      <Rodape />
      <BotaoFlutuante />
    </main>
  );
}
