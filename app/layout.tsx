import type { Metadata } from "next"
import Script from "next/script"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import ConditionalHeader from "./components/ConditionalHeader"
import { getThemeConfig, generarVariablesCss } from "@/lib/themeEngine";
import Footer from "./components/Footer"
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

// 🔥 FUSIÓN: Una sola función RootLayout
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Leemos la configuración viva de la tienda (gaId de El Campito) desde Supabase/tdt.ar
  const theme = await getThemeConfig(process.env.GA_ID_TIENDA || "534606659");
  const cssInyectado = generarVariablesCss(theme);

  return (
    <html lang="es" translate="no">
      <head>
        <meta name="theme-color" content="#008a29" />
        <meta name="google-site-verification" content="c43EWcKPaKQuTZ0w9M0U0iLPzJEgoEQmVTxKVhzfn8I" />

        {/* 🎨 ESCUDO 2: INYECCIÓN NATIVA DE VARIABLES CSS EN :root ANTES DEL RENDER */}
        <style id="tdt-theme-engine" dangerouslySetInnerHTML={{ __html: cssInyectado }} />

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
        
        {/* 🧭 Header condicional */}
        <ConditionalHeader />

        {/* 📄 Contenido de cada página */}
        <main>{children}</main>

        {/* 🦶 Footer visible en toda la web */}
        <Footer />

        {/* 🔙 Botón Volver flotante global */}
        <BackButton />

        <Analytics />
      </body>
    </html>
  )
}