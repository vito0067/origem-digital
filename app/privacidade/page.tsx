import type { Metadata } from "next";
import PaginaSimples from "@/components/PaginaSimples";

export const metadata: Metadata = {
  title: "Política de Privacidade — Origem Digital",
  robots: { index: false },
};

const Bloco = ({ id, titulo, children }: { id?: string; titulo: string; children: React.ReactNode }) => (
  <section id={id} className="flex scroll-mt-24 flex-col gap-4">
    <h2 className="font-display text-[1.4rem] font-semibold tracking-[-0.02em] text-tinta">{titulo}</h2>
    <div className="flex flex-col gap-4">{children}</div>
  </section>
);

const Forte = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-semibold text-tinta">{children}</strong>
);

export default function Privacidade() {
  return (
    <PaginaSimples etiqueta="Privacidade" titulo="Política de Privacidade" apoio="Última atualização: setembro de 2026.">
      <div className="flex flex-col gap-12 text-[16px] leading-relaxed text-grafite">
        <Bloco titulo="1. Quem somos">
          <p>
            A Origem Digital respeita a sua privacidade e trata dados pessoais em conformidade com a Lei Geral de
            Proteção de Dados (LGPD — Lei nº 13.709/2018). Contato para qualquer assunto de privacidade:
            contato@origemdigitalsite.com.br.
          </p>
        </Bloco>

        <Bloco titulo="2. Quais dados coletamos">
          <p>Coletamos apenas os dados que você nos envia ao entrar em contato:</p>
          <p>
            <Forte>No WhatsApp:</Forte> seu nome de perfil, seu número de telefone e o conteúdo das mensagens que
            você manda.
          </p>
          <p>
            <Forte>No Instagram:</Forte> seu nome de usuário, o identificador da sua conta fornecido pelo
            Instagram, o conteúdo das mensagens que você manda no direct e os comentários que você faz nas nossas
            publicações.
          </p>
          <p>
            Não acessamos sua lista de seguidores, suas fotos, sua localização nem qualquer outro dado da sua conta.
          </p>
        </Bloco>

        <Bloco titulo="3. Para que usamos">
          <p>
            Exclusivamente para responder à sua mensagem, apresentar nossos serviços e, se você demonstrar interesse,
            registrar o seu contato para que um atendente humano continue a conversa.
          </p>
          <p>Não vendemos, alugamos nem compartilhamos seus dados com terceiros para fins de marketing.</p>
        </Bloco>

        <Bloco titulo="4. Atendimento com inteligência artificial">
          <p>
            As primeiras respostas no WhatsApp e no direct do Instagram são feitas por um assistente de inteligência
            artificial. Para gerar a resposta, o texto da sua mensagem é processado pela OpenAI, empresa com
            servidores fora do Brasil. Esse envio acontece apenas para produzir a resposta e segue as salvaguardas
            previstas na LGPD para transferência internacional de dados.
          </p>
          <p>
            Sempre que você pedir para falar com uma pessoa, ou quando o assunto fugir do que o assistente sabe
            responder, a conversa é encaminhada para atendimento humano.
          </p>
        </Bloco>

        <Bloco titulo="5. Onde os dados ficam e por quanto tempo">
          <p>
            O histórico da conversa fica guardado em banco de dados em nuvem, para que o atendimento continue de onde
            parou. Os contatos de quem demonstrou interesse ficam registrados em uma planilha do Google com acesso
            restrito.
          </p>
          <p>
            Guardamos esses dados pelo tempo necessário para concluir o atendimento e, se você virar cliente, pelo
            tempo do contrato e das obrigações legais que dele decorrem.
          </p>
        </Bloco>

        <Bloco id="exclusao-de-dados" titulo="6. Como pedir a exclusão dos seus dados">
          <p>
            Você pode pedir a qualquer momento a exclusão de todos os dados que temos sobre você — histórico de
            conversa, registro de contato e qualquer outra informação.
          </p>
          <p>Basta fazer o pedido por um destes canais:</p>
          <p>
            <Forte>E-mail:</Forte> contato@origemdigitalsite.com.br, com o assunto &quot;Exclusão de dados&quot; e o
            seu número de WhatsApp ou nome de usuário do Instagram.
          </p>
          <p>
            <Forte>Direct do Instagram ou WhatsApp:</Forte> envie a mensagem &quot;quero apagar meus dados&quot;.
          </p>
          <p>
            Confirmamos o recebimento e concluímos a exclusão em até 15 dias, avisando você pelo mesmo canal. Você
            também pode, pelo mesmo contato, pedir para ver ou corrigir os dados que temos.
          </p>
        </Bloco>

        {/* Este trecho tem que bater com o que o aviso de privacidade diz
            na tela e com o que o código realmente faz. Se a medição mudar,
            mude aqui também. */}
        <Bloco titulo="7. Cookies e medição de audiência do site">
          <p>
            <Forte>Cookies:</Forte> este site não guarda cookies de rastreamento no seu navegador.
          </p>
          <p>
            <Forte>Medição de audiência:</Forte> se você permitir no aviso que aparece na primeira visita,
            registramos de forma anônima quais páginas e seções são mais visitadas, de onde vêm os acessos e a
            velocidade de carregamento. Esses dados não identificam você: não guardam nome, telefone, e-mail nem
            endereço de internet completo. Usamos a ferramenta de análise da Vercel, que hospeda o site.
          </p>
          <p>
            Se você recusar, nada disso é carregado — o site funciona igual. Você pode mudar de ideia a qualquer
            momento limpando os dados deste site no seu navegador, e o aviso aparecerá de novo.
          </p>
        </Bloco>
      </div>
    </PaginaSimples>
  );
}
