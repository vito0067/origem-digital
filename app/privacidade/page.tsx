import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade — Origem Digital",
  robots: { index: false },
};

export default function Privacidade() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-display text-3xl font-bold text-white">
        Política de Privacidade
      </h1>
      <div className="mt-8 flex flex-col gap-5 text-sm leading-relaxed text-slate-400">
        <p>
          A Origem Digital respeita a sua privacidade e trata dados pessoais em
          conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº
          13.709/2018).
        </p>
        <p>
          Coletamos apenas os dados que você nos fornece voluntariamente ao
          entrar em contato (como nome e número de WhatsApp), com a finalidade
          exclusiva de responder à sua solicitação e apresentar nossos
          serviços.
        </p>
        <p>
          Não vendemos, alugamos ou compartilhamos seus dados com terceiros
          para fins de marketing. Você pode solicitar a atualização ou
          exclusão dos seus dados a qualquer momento pelo e-mail
          origemdigital00@gmail.com.
        </p>
        <p>
          Este site pode utilizar cookies essenciais ao seu funcionamento. Ao
          continuar navegando, você concorda com esta política.
        </p>
      </div>
      <Link
        href="/"
        className="mt-10 inline-block text-sm text-cyan-neon hover:underline"
      >
        ← Voltar ao início
      </Link>
    </main>
  );
}
