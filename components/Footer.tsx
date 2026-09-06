import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 pb-8 pt-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/media/logo-full.png"
            alt="Origem Digital"
            width={1186}
            height={619}
            className="h-20 w-auto"
          />
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Tecnologia e presença digital para pequenas empresas. São Paulo,
            SP — atendemos todo o Brasil.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-300">
            Navegação
          </p>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
            <li><Link href="#sobre" className="hover:text-cyan-neon">Sobre</Link></li>
            <li><Link href="#servicos" className="hover:text-cyan-neon">Serviços e preços</Link></li>
            <li><Link href="#como-funciona" className="hover:text-cyan-neon">Como funciona</Link></li>
            <li><Link href="#faq" className="hover:text-cyan-neon">Perguntas frequentes</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-300">
            Contato
          </p>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
            <li>
              <a href="https://wa.me/5511939299209" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-neon">
                WhatsApp: (11) 93929-9209
              </a>
            </li>
            <li>
              <a href="mailto:origemdigital00@gmail.com" className="hover:text-cyan-neon">
                origemdigital00@gmail.com
              </a>
            </li>
            <li>
              <a href="https://instagram.com/origem__digital" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-neon">
                @origem__digital
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-300">
                      <ul className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
            <li>
              <Link href="/termos" className="hover:text-cyan-neon">
                Termos de uso e contratação
              </Link>
            </li>
            <li>
              <Link href="/privacidade" className="hover:text-cyan-neon">
                Política de privacidade
              </Link>
            </li>
            <li className="mt-2 text-xs leading-relaxed text-slate-500">
              Origem Digital — São Paulo/SP.
              <br />
              Responsável: Samantha Mañe Carrieri Portella Scaglione.
            </li>
            <li className="text-xs leading-relaxed text-slate-500">
              Seus dados são tratados conforme a LGPD (Lei 13.709/2018) e
              usados apenas para responder ao seu contato.
            </li>
          </ul>
