import Link from "next/link";
import Marca from "./Marca";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 pb-8 pt-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          {/* No rodapé há espaço para a marca inteira, com a assinatura
              legível — que é justamente o que não cabe no menu. */}
          <Marca formato="empilhada" assinatura className="items-start" />
          <p className="mt-5 text-sm leading-relaxed text-slate-400">
            São Paulo, SP — atendemos todo o Brasil.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-300">
            Navegação
          </p>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
            <li><Link href="#sobre" className="sublinha hover:text-cyan-neon">Sobre</Link></li>
            <li><Link href="#servicos" className="sublinha hover:text-cyan-neon">Serviços e preços</Link></li>
            <li><Link href="#como-funciona" className="sublinha hover:text-cyan-neon">Como funciona</Link></li>
            <li><Link href="#faq" className="sublinha hover:text-cyan-neon">Perguntas frequentes</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-300">
            Contato
          </p>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
            <li>
              <a href="https://wa.me/5511939299209" target="_blank" rel="noopener noreferrer" className="sublinha hover:text-cyan-neon">
                WhatsApp: (11) 93929-9209
              </a>
            </li>
            <li>
              <a href="mailto:origemdigital00@gmail.com" className="sublinha hover:text-cyan-neon">
                origemdigital00@gmail.com
              </a>
            </li>
            <li>
              <a href="https://instagram.com/origem__digital" target="_blank" rel="noopener noreferrer" className="sublinha hover:text-cyan-neon">
                @origem__digital
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-300">
            Legal
          </p>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
            <li>
              <Link href="/termos" className="sublinha hover:text-cyan-neon">
                Termos de uso e contratação
              </Link>
            </li>
            <li>
              <Link href="/privacidade" className="sublinha hover:text-cyan-neon">
                Política de privacidade
              </Link>
            </li>
          </ul>

          {/* Quem responde pela empresa, com nome. Enquanto o CNPJ não
              sai, é isto que dá rosto ao contrato — e é exigência de
              transparência para venda à distância. */}
          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            Origem Digital — São Paulo/SP.
            <br />
            Responsável: Samantha Mañe Carrieri Portella Scaglione.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            Seus dados são tratados conforme a LGPD (Lei 13.709/2018) e usados
            apenas para responder ao seu contato.
          </p>
        </div>
      </div>

      <p className="mt-12 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Origem Digital. Todos os direitos
        reservados.
      </p>
    </footer>
  );
}
