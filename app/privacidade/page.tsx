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
        {/* Este trecho tem que bater com o que o aviso de privacidade
            diz na tela e com o que o código realmente faz. Antes ele
            falava só de "cookies essenciais" — e o site passou a ter
            medição de audiência, então a política ficou desatualizada
            sem ninguém perceber. Se a medição mudar, mude aqui também. */}
        <p>
          <strong className="text-slate-300">Cookies:</strong> este site não
          guarda cookies de rastreamento no seu navegador.
        </p>
        <p>
          <strong className="text-slate-300">Medição de audiência:</strong> se
          você permitir no aviso que aparece na primeira visita, registramos de
          forma anônima quais páginas e seções são mais visitadas, de onde vêm
          os acessos e a velocidade de carregamento. Esses dados não
          identificam você: não guardam nome, telefone, e-mail nem endereço de
          internet completo. Usamos a ferramenta de análise da Vercel, que
          hospeda o site.
        </p>
        <p>
          Se você recusar, nada disso é carregado — o site funciona igual. Você
          pode mudar de ideia a qualquer momento limpando os dados deste site
          no seu navegador, e o aviso aparecerá de novo.
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
