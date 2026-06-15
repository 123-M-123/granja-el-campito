import { Metadata } from "next"

export const metadata: Metadata = {
  // SEO Estándar
  title: "Miel Pura de Abejas | El Campito Cañuelas",
  description: "Descubrí la verdadera miel artesanal de Cañuelas. Producción familiar, pura y natural. Ventas por mayor y menor con envíos a domicilio.",
  
  // Facebook / WhatsApp / Instagram (OpenGraph)
  openGraph: {
    title: "Miel Pura Artesanal - El Campito",
    description: "Llevá a tu mesa la mejor miel de Cañuelas. Calidad premium garantizada por El Campito.",
    url: "https://granja-el-campito.vercel.app/miel",
    siteName: "El Campito - Granja Agroecológica",
    images: [
      {
        url: "/preview-miel.jpg", // 👈 Asegurate que el archivo se llame así en /public
        width: 1000,
        height: 1200,
        alt: "Miel Pura de Abejas El Campito",
      },
    ],
    locale: "es_AR",
    type: "website",
  },

  // Twitter / X
  twitter: {
    card: "summary_large_image",
    title: "Miel Artesanal El Campito",
    description: "Miel pura de abejas y productos derivados directamente de nuestra granja en Cañuelas.",
    images: ["/preview-miel.jpg"],
  },

  // Metadata adicional para otras redes y robots
  robots: {
    index: true,
    follow: true,
  },
}

export default function MielLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* El layout envuelve la página de miel manteniendo la estructura */}
      {children}
    </section>
  )
}