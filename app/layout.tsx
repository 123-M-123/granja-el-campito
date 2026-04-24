import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import ConditionalHeader from "./components/ConditionalHeader"
import "./globals.css"

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
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <ConditionalHeader />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  )
}