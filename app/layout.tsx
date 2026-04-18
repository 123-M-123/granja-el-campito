import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Granja Agroecológica - Producción Familiar Artesanal",
  description:
    "Huevos de Gallinas Libres, Miel Envasada y productos derivados. Origen Cañuelas",
  generator: "El Campito",

  metadataBase: new URL("https://granja-el-campito.vercel.app"), // 
  openGraph: {
    title: "Granja Agroecológica",
    description:
      "Huevos de Gallinas Libres, Miel Envasada y productos artesanales",
    url: "https://granja-el-campito.vercel.app", // 
    siteName: "El Campito",
    images: [
      {
        url: "https://granja-el-campito.vercel.app/preview.png", // 👈 TU IMAGEN
        width: 1200,
        height: 630,
        alt: "Granja Agroecológica El Campito",
      },
    ],
    locale: "es_AR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Granja Agroecológica",
    description:
      "Huevos de Gallinas Libres, Miel Envasada y productos artesanales",
    images: ["https://granja-el-campito.vercel.app/preview.png"],
  },

  icons: {
    icon: "/favicon.png",
    apple: "/icon-192.png",
  },

  manifest: "/manifest.json",
  themeColor: "#4A0606",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "El Campito",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" translate="no">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}