import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const title =
  "Origem Digital — Sites profissionais e Agentes de IA no WhatsApp para pequenas empresas";
const description =
  "Pare de perder clientes por falta de site ou demora no WhatsApp. Sites profissionais e atendimento automatizado com IA 24/7, entregues em 1 a 2 semanas. Diagnóstico gratuito.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "site profissional para pequenas empresas",
    "agente de IA WhatsApp",
    "atendimento automatizado",
    "automação com IA",
    "presença digital",
  ],
  openGraph: {
    title,
    description,
    locale: "pt_BR",
    type: "website",
    siteName: "Origem Digital",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Origem Digital",
  description,
  areaServed: "BR",
  address: {
    "@type": "PostalAddress",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  email: "origemdigital00@gmail.com",
  telephone: "+55-11-93929-9209",
  sameAs: ["https://instagram.com/origem__digital"],
  makesOffer: [
    { "@type": "Offer", name: "Sites Profissionais" },
    { "@type": "Offer", name: "Agentes de IA no WhatsApp" },
    { "@type": "Offer", name: "Pacote Completo (Site + Agente de IA)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body className="bg-abyss font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
