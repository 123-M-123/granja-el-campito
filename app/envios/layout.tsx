import { Metadata } from "next"

export const metadata: Metadata = {
  // 🔍 SEO General
  title: "Zonas de Envíos y Puntos de Retiro en AMBA | El Campito",
  description: "Llegamos a todo AMBA con productos frescos y naturales directo de Cañuelas. Retiros gratis en Caballito y Flores (CABA). Envíos programados a domicilio.",

  // 📱 Facebook / WhatsApp / Instagram / LinkedIn (OpenGraph)
  openGraph: {
    title: "Zonas de Envíos y Puntos de Distribución - El Campito",
    description: "Llegamos a todo AMBA. Centro logístico en Cañuelas, puntos de retiro en CABA (Caballito y Flores) y entregas seguras en Zona Sur y Oeste.",
    url: "https://granja-el-campito.vercel.app/envios",
    siteName: "El Campito - Granja Agroecológica",
    images: [
      {
        url: "/preview-envios.jpg", // 👈 Debe estar en /public/preview-envios.jpg
        width: 1200,
        height: 800,
        alt: "Mapa de Puntos de Distribución y Envíos El Campito AMBA",
      },
    ],
    locale: "es_AR",
    type: "website",
  },

  // 🐦 Twitter / X
  twitter: {
    card: "summary_large_image",
    title: "Envíos en AMBA y Puntos de Retiro | El Campito",
    description: "Conocé nuestras zonas de entrega y puntos de retiro en CABA y Gran Buenos Aires. Productos naturales de Cañuelas.",
    images: ["/preview-envios.jpg"],
  },

  // 🏷️ Palabras clave relevantes para búsqueda local
  keywords: [
    "envíos cañuelas",
    "puntos de retiro cabalito",
    "puntos de retiro flores",
    "envíos amba productos naturales",
    "reparto zona sur oeste miel granja",
    "distribución el campito"
  ],

  robots: {
    index: true,
    follow: true,
  },
}

export default function EnviosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {children}
    </section>
  )
}