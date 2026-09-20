import Reveal from "./Reveal";
import NeonButton from "./NeonButton";
import TituloSecao from "./TituloSecao";
import Magnetic from "./Magnetic";
import ConversaAurora from "./ConversaAurora";
import AntesDepois from "./AntesDepois";

/**
 * VEJA FUNCIONANDO — demonstração e comparativo na mesma seção.
 *
 * Antes eram duas: o vídeo do agente atendendo e, logo depois, dois
 * cartões "sem a Origem / com a Origem". Ficavam longe uma da outra
 * justamente quando deveriam se apoiar.
 *
 * Agora o celular fica preso à esquerda rodando a conversa real
 * enquanto o argumento corre à direita, e o comparativo virou uma
 * balança: cada problema de um lado, a solução exatamente em frente.
 * Ver o par lado a lado explica sozinho — é mais forte do que ler duas
 * listas separadas.
 */

/**
 * A objeção real de quem já foi enganado por "robô de WhatsApp".
 * Cada linha é um par: o defeito do chatbot comum de um lado, o que a
 * Aurora faz no lugar exatamente em frente.
 */
const linhas = [
  {
    sem: "Só entende palavra-chave exata",
    com: "Entende a pergunta escrita do jeito do cliente",
  },
  {
    sem: "Menu engessado: digite 1, digite 2",
    com: "Conversa livre, sem menu e sem número para digitar",
  },
  {
    sem: "Trava quando o cliente foge do roteiro",
    com: "Responde objeção que não estava no roteiro",
  },
  {
    sem: "Não conhece seus serviços nem seus preços",
    com: "Treinada com os seus serviços e a sua tabela de preços",
  },
  {
    sem: "Repete a mesma resposta pronta",
    com: "Registra o contato para você não perder o lead",
  },
  {
    sem: "Deixa o cliente esperando quando quer fechar",
    com: "Chama você no WhatsApp na hora que o cliente quer fechar",
  },
];

const beneficios = [
  "Resposta em segundos, a qualquer hora",
  "Preços e serviços apresentados na conversa",
  "Agendamento fechado sem intervenção humana",
];

export default function AgentDemo() {
  return (
    <section
      id="demonstracao"
      className="relative overflow-hidden border-t border-white/[0.06] bg-surface py-20 sm:py-24"
    >
      <div
        aria-hidden
        className="brilho-descida absolute left-[6%] top-1/4 h-72 w-72 rounded-full blur-[130px]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ---- Celular preso, à esquerda ----
               Saiu o vídeo gravado (/media/demo-agente.mp4), entrou a
               conversa que se digita sozinha. O arquivo continua na
               pasta, caso você queira voltar atrás. Dois motivos para a
               troca: vídeo a pessoa reconhece como vídeo, e o vídeo
               tinha a tabela de preços antiga gravada dentro dele. */}
          <div className="coluna-presa order-1 self-start lg:col-span-5">
            <Reveal de="esquerda">
              <ConversaAurora />
            </Reveal>
          </div>

          {/* ---- Argumento, à direita ---- */}
          <div className="order-2 lg:col-span-7">
            <TituloSecao
              etiqueta="Veja com seus próprios olhos"
              titulo="O agente de IA atendendo de verdade."
            />

            <Reveal de="direita" delay={120}>
              <p className="mt-6 max-w-lg leading-relaxed text-slate-400">
                Cliente pergunta o preço. O agente responde na hora, apresenta o
                serviço e agenda a conversa — em menos de 2 minutos, sem você
                tocar no celular. É exatamente assim que ele vai trabalhar para
                o seu negócio, 24 horas por dia.
              </p>
            </Reveal>

            <ul className="mt-7 flex flex-col gap-2.5">
              {beneficios.map((b, i) => (
                <Reveal key={b} de="direita" delay={180 + i * 70}>
                  <li className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span aria-hidden className="mt-0.5 font-bold text-cyan-neon">
                      ✓
                    </span>
                    {b}
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal de="direita" delay={400}>
              <div className="mt-9">
                <Magnetic>
                  <NeonButton
                    href="https://wa.me/5511939299209?text=Ol%C3%A1!%20Vi%20a%20demonstra%C3%A7%C3%A3o%20do%20agente%20de%20IA%20e%20quero%20um%20para%20o%20meu%20neg%C3%B3cio."
                    external
                  >
                    Quero um agente assim
                  </NeonButton>
                </Magnetic>
              </div>
            </Reveal>

            {/* ---- A balança ---- */}
            <Reveal de="direita" delay={200} className="mt-14">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-violet-neon">
                A pergunta que todo mundo faz
              </p>
              <h3 className="mt-3 font-display text-xl font-bold text-white sm:text-2xl">
                Por que não é um{" "}
                <span className="text-gradient-neon">chatbot comum</span>?
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-400">
                Chatbot segue roteiro. A Aurora entende o que a pessoa escreveu
                e responde de acordo — inclusive quando a pergunta não estava
                prevista.
              </p>
            </Reveal>

            {/* ---- No computador: a balança, par a par ----
                Duas colunas lado a lado só funcionam com largura. No
                celular cada coluna caía para 165px e frases como "chama
                você no WhatsApp na hora que o cliente quer fechar"
                viravam seis linhas de letra miúda. Por isso existem duas
                montagens do mesmo conteúdo: aqui a tabela pareada, e
                logo abaixo as duas listas empilhadas para telas
                pequenas. A lista de dados é uma só — nada pode divergir
                entre as duas. */}
            <div className="mt-6 hidden overflow-hidden rounded-2xl border border-white/10 sm:block">
              <div className="grid grid-cols-2 border-b border-white/10 bg-white/[0.03]">
                <p className="px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Chatbot comum
                </p>
                <p className="border-l border-white/10 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-neon">
                  Aurora, da Origem Digital
                </p>
              </div>

              {linhas.map((linha, i) => (
                <Reveal key={linha.sem} de="direita" delay={i * 80}>
                  {/* Linhas mais justas do que antes (py-4 → py-3, texto
                      um ponto menor). As seis continuam aqui: você pediu
                      para encurtar sem perder informação, então o que
                      encolheu foi o espaço em volta, não o conteúdo. */}
                  <div className="group grid grid-cols-2 border-b border-white/[0.07] last:border-0 transition-colors hover:bg-white/[0.02]">
                    <p className="flex items-start gap-2.5 px-5 py-3 text-[13px] leading-snug text-slate-500">
                      <span aria-hidden className="mt-px font-bold text-red-400/70">
                        ✕
                      </span>
                      {linha.sem}
                    </p>
                    <p className="flex items-start gap-2.5 border-l border-white/[0.07] bg-cyan-neon/[0.03] px-5 py-3 text-[13px] leading-snug text-white">
                      <span aria-hidden className="mt-px font-bold text-cyan-neon">
                        ✓
                      </span>
                      {linha.com}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* ---- No celular: duas listas, uma embaixo da outra ---- */}
            <div className="mt-6 flex flex-col gap-4 sm:hidden">
              <div className="rounded-2xl border border-white/10 p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Chatbot comum
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {linhas.map((linha) => (
                    <li
                      key={linha.sem}
                      className="flex items-start gap-2.5 text-sm text-slate-500"
                    >
                      <span aria-hidden className="mt-0.5 shrink-0 font-bold text-red-400/70">
                        ✕
                      </span>
                      {linha.sem}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-cyan-neon/25 bg-cyan-neon/[0.03] p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-neon">
                  Aurora, da Origem Digital
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {linhas.map((linha) => (
                    <li
                      key={linha.com}
                      className="flex items-start gap-2.5 text-sm text-white"
                    >
                      <span aria-hidden className="mt-0.5 shrink-0 font-bold text-cyan-neon">
                        ✓
                      </span>
                      {linha.com}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* A cortina fecha a seção: depois de ler a diferença em lista,
            a pessoa arrasta e VÊ a diferença acontecer. Ocupa a largura
            inteira porque precisa das duas telas lado a lado. */}
        <AntesDepois />
      </div>
    </section>
  );
}
