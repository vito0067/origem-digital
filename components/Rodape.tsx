import Link from "next/link";
import { Simbolo } from "./Marca";
import { ramos } from "@/lib/ramos";

/**
 * O RODAPÉ — simples, em quatro colunas.
 *
 * `prefixo`: os links apontam para seções da página inicial; fora dela
 * (como em /clinicas) precisam de "/" na frente.
 */
export default function Rodape({ prefixo = "" }: { prefixo?: "" | "/" }) {
  const link = "text-[14.5px] text-grafite transition-colors hover:text-azul";
  const titulo = "font-mono text-[11.5px] uppercase tracking-[0.16em] text-cinza";
  return (
    <footer className="border-t border-linha bg-white/60 pb-8 pt-16">
      <div className="mx-auto grid max-w-pagina gap-12 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <span className="flex items-center gap-2.5">
            <Simbolo id="od-rodape" className="h-[22px] w-auto" />
            <span className="font-display text-[17px] font-semibold tracking-[-0.02em] text-tinta">Origem Digital</span>
          </span>
          <p className="mt-4 max-w-xs text-[14.5px] leading-relaxed text-grafite">Tecnologia e presença digital para pequenas empresas.</p>
          <p className="mt-2 text-[14.5px] text-grafite">São Paulo, SP — atendemos todo o Brasil.</p>
        </div>

        <div className="lg:col-span-2">
          <p className={titulo}>Navegação</p>
          <ul className="mt-5 flex flex-col gap-3">
            <li><Link href={`${prefixo}#servicos`} className={link}>Serviços</Link></li>
            <li><Link href={`${prefixo}#precos`} className={link}>Preços</Link></li>
            <li><Link href={`${prefixo}#como-funciona`} className={link}>Como funciona</Link></li>
            <li><Link href={`${prefixo}#perguntas`} className={link}>Perguntas</Link></li>
            <li><Link href="/diagnostico" className={link}>Faça as contas</Link></li>
            <li><Link href="/cases" className={link}>Cases</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className={titulo}>Para o seu ramo</p>
          <ul className="mt-5 flex flex-col gap-3">
            {ramos.map((r) => (
              <li key={r.slug}>
                <Link href={`/${r.slug}`} className={link}>
                  {r.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className={titulo}>Contato</p>
          <ul className="mt-5 flex flex-col gap-3">
            <li><a href="https://wa.me/5511939299209" target="_blank" rel="noopener noreferrer" className={link}>WhatsApp: (11) 93929-9209</a></li>
            <li><a href="mailto:contato@origemdigitalsite.com.br" className={`${link} break-all`}>contato@origemdigitalsite.com.br</a></li>
            <li><a href="https://instagram.com/origem__digital" target="_blank" rel="noopener noreferrer" className={link}>@origem__digital</a></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className={titulo}>Legal</p>
          <ul className="mt-5 flex flex-col gap-3">
            <li><Link href="/termos" className={link}>Termos de uso e contratação</Link></li>
            <li><Link href="/privacidade" className={link}>Política de privacidade</Link></li>
          </ul>
          {/* Quem responde pela empresa. Enquanto o CNPJ não sai, é isto
              que dá rosto ao contrato (transparência na venda à distância). */}
          <p className="mt-6 text-[13px] leading-relaxed text-cinza">
            Origem Digital — São Paulo/SP.
            <br />
            Responsável: Samantha Mañe Carrieri Portella Scaglione.
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-cinza">
            Seus dados são tratados conforme a LGPD (Lei 13.709/2018) e usados apenas para responder ao seu contato.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-pagina flex-wrap items-center justify-between gap-3 border-t border-linha px-5 pt-6 sm:px-8">
        <p className="text-[13px] text-cinza">© {new Date().getFullYear()} Origem Digital. Todos os direitos reservados.</p>
        <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-cinza">Feito em São Paulo · online 24/7</p>
      </div>
    </footer>
  );
}
