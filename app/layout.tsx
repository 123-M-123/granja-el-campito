import type { Metadata } from "next"
import Script from "next/script"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import ConditionalHeader from "./components/ConditionalHeader"
import "./globals.css"
import BackButton from "./components/BackButton"

export const metadata: Metadata = {
  title: "Granja Agroecológica - El Campito Cañuelas",
  description: "Somos distribuidores de: Huevos de Gallinas Libres, Miel Envasada y sus productos derivados, Origen Cañuelas",
  generator: "El Campito",
  metadataBase: new URL("https://granja-el-campito.vercel.app"),

  openGraph: {
    title: "Granja Agroecológica | El Campito | Cañuelas",
    description: "Somos distribuidores de: Huevos de Gallinas Libres, Miel Envasada y sus productos derivados, Origen Cañuelas",
    url: "https://granja-el-campito.vercel.app",
    siteName: "El Campito",
    images: [
      {
        url: "/og/image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpg",
        alt: "Granja Agroecológica El Campito",
      },
    ],
    locale: "es_AR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Granja Agroecológica | El Campito | Cañuelas",
    description: "Somos distribuidores de: Huevos de Gallinas Libres, Miel Envasada y sus productos derivados, Origen Cañuelas",
    images: ["/og/image.jpg"],
  },

  icons: {
    icon: "/favicon.png",
    apple: "/icon-192.png",
  },

  manifest: "/manifest.json",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "El Campito",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" translate="no">
      <head>
        <meta name="theme-color" content="#008a29" />

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-N88KRR1LFX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N88KRR1LFX');
          `}
        </Script>
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <ConditionalHeader />
        <main>{children}</main>

        {/* 👇 BOTÓN VOLVER GLOBAL */}
        <BackButton />

        <Analytics />
      </body>
    </html>
  )
}