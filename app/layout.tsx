import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Instrument_Serif, DM_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Medicao from "@/components/Medicao";
import AvisoCookies from "@/components/AvisoCookies";
import "./globals.css";

/**
 * AS TRÊS LETRAS DO "GELO"
 *
 * Instrument Sans — tudo: títulos e texto. Grotesca limpa, um pouco
 *   estreita, com cara de interface bem desenhada.
 * Instrument Serif (itálico) — UMA palavra ou frase por título, para
 *   dar respiro humano no meio da tecnologia. É o que separa este site
 *   do "site de tecnologia" de sempre.
 * DM Mono — etiquetas pequenas e números de sistema.
 *
 * Só a primeira é pré-carregada; as outras duas aparecem em detalhes.
 */
const display = Instrument_Sans({ subsets: ["latin"], variable: "--font-display", axes: ["wdth"] });
const serifa = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serifa", preload: false });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", preload: false });

const title = "Origem Digital — Sites profissionais e Agentes de IA no WhatsApp para pequenas empresas";
const description =
  "Site profissional e atendente de IA no WhatsApp para pequenas empresas. Seu cliente respondido em segundos, 24 horas por dia. Primeira versão em até 15 dias úteis. Diagnóstico gratuito.";

export const viewport: Viewport = { themeColor: "#F8FAFC" };

export const metadata: Metadata = {
  metadataBase: new URL("https://origemdigitalsite.com.br"),
  title,
  description,
  keywords: [
    "site profissional para pequenas empresas",
    "agente de IA WhatsApp",
    "atendimento automatizado",
    "automação com IA",
    "presença digital",
  ],
  openGraph: { title, description, locale: "pt_BR", type: "website", siteName: "Origem Digital" },
  twitter: { card: "summary_large_image", title, description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Origem Digital",
  description,
  url: "https://origemdigitalsite.com.br",
  logo: "https://origemdigitalsite.com.br/icon.png",
  image: "https://origemdigitalsite.com.br/opengraph-image",
  areaServed: "BR",
  address: { "@type": "PostalAddress", addressLocality: "São Paulo", addressRegion: "SP", addressCountry: "BR" },
  email: "contato@origemdigitalsite.com.br",
  telephone: "+55-11-93929-9209",
  sameAs: ["https://instagram.com/origem__digital"],
  makesOffer: [
    { "@type": "Offer", name: "Sites Profissionais" },
    { "@type": "Offer", name: "Agentes de IA no WhatsApp" },
    { "@type": "Offer", name: "Pacote Completo (Site + Agente de IA)" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${serifa.variable} ${mono.variable}`}>
      <body className="font-body text-tinta antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <noscript
          dangerouslySetInnerHTML={{
            __html: "<style>[data-reveal]{opacity:1!important;transform:none!important}</style>",
          }}
        />
        <SmoothScroll>{children}</SmoothScroll>
        <Medicao />
        <AvisoCookies />
      </body>
    </html>
  );
}
