import Reveal from "./Reveal";
import Botao from "./Botao";
import { Simbolo } from "./Marca";
import { Instagram } from "./Icones";

/**
 * O FECHAMENTO — uma frase, um botão.
 *
 * O mesmo céu da capa, para a página terminar onde começou. O símbolo
 * aparece grande e parado, já montado.
 */

const WA = "https://wa.me/5511939299209?text=Ol%C3%A1!%20Quero%20um%20diagn%C3%B3stico%20gratuito%20para%20o%20meu%20neg%C3%B3cio.";

export default function Fechamento() {
  return (
    <section id="contato" className="px-3 pb-16 pt-8 sm:px-5 sm:pb-24">
      <div className="ceu-fundo relative mx-auto max-w-[82rem] overflow-hidden rounded-[36px] border border-white px-5 py-20 text-center shadow-vidro sm:py-28">
        <div aria-hidden className="pontos pointer-events-none absolute inset-0" />
        <Simbolo id="od-fechamento" className="pointer-events-none absolute -right-16 -top-10 h-auto w-[340px] opacity-[0.07] sm:w-[520px]" />
        <Reveal className="relative">
          <p className="rotulo justify-center">Diagnóstico gratuito</p>
          <h2 className="equilibrado mx-auto mt-6 max-w-3xl font-display text-[2.6rem] font-medium leading-[1.02] tracking-[-0.045em] text-tinta sm:text-[4rem]">
            Seu próximo cliente <span className="font-serifa font-normal italic tracking-[-0.01em] text-azul">já está mandando mensagem.</span>
          </h2>
          <p className="sem-orfa mx-auto mt-6 max-w-xl text-[17.5px] leading-relaxed text-grafite">
            Em 10 a 15 minutos pelo WhatsApp, você descobre onde o seu atendimento está travando — e sai com uma proposta por escrito.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Botao href={WA}>Quero o diagnóstico gratuito</Botao>
            <Botao href="https://instagram.com/origem__digital" tom="vidro" icone={<Instagram className="h-[18px] w-[18px] shrink-0" />}>
              @origem__digital
            </Botao>
          </div>
          <p className="mt-6 text-[14px] text-cinza">Resposta pelo WhatsApp (11) 93929-9209 — inclusive fim de semana, feriado e madrugada.</p>
        </Reveal>
      </div>
    </section>
  );
}
