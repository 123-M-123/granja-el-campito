import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Granja Agroecológica - Producción Familiar Artesanal",
  description: "Huevos de Gallinas Libres, Miel Envasada y productos derivados. Origen Cañuelas",
  generator: "El Campito",
  manifest: "/manifest.json",
  themeColor: "#4A0606",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "El campito",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es"translate="no">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4A0606" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="El Campito" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}