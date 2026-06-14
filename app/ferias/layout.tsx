import { Metadata } from "next"

export const metadata: Metadata = {
  // Título para buscadores
  title: "Cronograma Ferias 2026 | El Campito Cañuelas",
  description: "Consultá las próximas fechas de la Feria Rural en Cañuelas y Uribelarrea. Mapas, ubicaciones y cronograma completo de El Campito para 2026.",
  
  // Facebook / WhatsApp / LinkedIn
  openGraph: {
    title: "Cronograma Ferias 2026 - El Campito",
    description: "Toda la info de nuestras próximas presentaciones: Cañuelas y Uribelarrea. ¡Vení a visitarnos!",
    url: "https://granja-el-campito.vercel.app/ferias",
    siteName: "El Campito - Granja Agroecológica",
    images: [
      {
        url: "/og/preview-ferias.jpg", // 👈 Tu imagen de la captura
        width: 1200,
        height: 630,
        alt: "Cronograma de Ferias 2026 El Campito",
      },
    ],
    locale: "es_AR",
    type: "website",
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Ferias 2026 - El Campito",
    description: "Cronograma, mapas e info de las ferias en Cañuelas y Uribelarrea.",
    images: ["/og/preview-ferias.jpg"],
  },
}

export default function FeriasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* 
         Acá podrías agregar un Header específico para ferias 
         si quisieras, pero por ahora solo envuelve el contenido 
      */}
      {children}
    </section>
  )
}