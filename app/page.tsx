import Navbar from "@/components/Navbar";
import HeroCinematic from "@/components/HeroCinematic";
import Faixa from "@/components/Faixa";
import Numeros from "@/components/Numeros";
import About from "@/components/About";
import AgentDemo from "@/components/AgentDemo";
import LossCalculator from "@/components/LossCalculator";
import Planos from "@/components/Planos";
import SistemaOrigem from "@/components/SistemaOrigem";
import Projetos from "@/components/Projetos";
import DiagnosticQuiz from "@/components/DiagnosticQuiz";
import TecnologiaPorTras from "@/components/TecnologiaPorTras";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import BotaoFlutuante from "@/components/BotaoFlutuante";

/**
 * A ORDEM DA PÁGINA E O PORQUÊ DELA
 *
 * Eram 15 seções. Agora são 10, sem uma frase a menos: seções que
 * diziam a mesma coisa foram juntadas em vez de cortadas.
 *
 *   Sobre        = "Sobre a empresa" + o fluxo da venda + a frase de
 *                  posicionamento ("não criamos apenas sites")
 *   Demonstração = o vídeo do agente + "por que não é um chatbot comum"
 *   Planos       = Serviços + a Oferta do mês + as três garantias
 *   Sistema      = as 6 etapas do método + os 6 diferenciais
 *
 * A sequência também mudou de propósito: a calculadora vem ANTES do
 * preço. A pessoa primeiro vê quanto está perdendo por mês e só então
 * lê quanto custa resolver. Nessa ordem o preço parece pequeno; na
 * ordem antiga ele aparecia sozinho, sem nada para comparar.
 *
 * SAIU DAQUI: a galeria "Na prática", com três prints da demonstração
 * (mostrando a tabela de preços velha dentro da imagem) e três espaços
 * vazios escritos "em breve". No lugar dela entrou Projetos, com
 * trabalho de verdade e link para abrir.
 */

const segmentos = [
  "Clínicas",
  "Salões",
  "Restaurantes",
  "Oficinas",
  "Pet shops",
  "Lojas",
  "Contabilidades",
  "Prestadores de serviço",
];

export default function Home() {
  return (
    <main className="bg-abyss">
      <Navbar />

      {/* 1. A capa: a fala à esquerda, a marca em 3D à direita */}
      <HeroCinematic />
      <Faixa itens={segmentos} />
      <Numeros />

      {/* 2. Quem somos e como a venda acontece */}
      <About />

      {/* 3. A prova: o agente atendendo, e por que não é chatbot */}
      <AgentDemo />

      {/* 4. A dor, em dinheiro */}
      <LossCalculator />

      {/* 5. O preço, logo depois da dor — com as garantias ao lado */}
      <Planos />

      {/* 6. Como trabalhamos e por que nós */}
      <SistemaOrigem />

      {/* 7. Trabalho entregue, no ar, com link para conferir */}
      <Projetos />

      {/* 8. O convite interativo */}
      <DiagnosticQuiz />
      <TecnologiaPorTras />

      {/* 9. As dúvidas que travam a decisão */}
      <Faq />

      {/* 10. O fechamento */}
      <FinalCta />

      <Footer />

      {/* Acompanha a rolagem: a partir da segunda tela, nunca falta um
          caminho para o WhatsApp. */}
      <BotaoFlutuante />
    </main>
  );
}
