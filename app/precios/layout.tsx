import { Metadata } from "next"

export const metadata: Metadata = {
  // SEO Estándar - Enfoque Mayorista
  title: "Lista de Precios Mayorista | El Campito Cañuelas",
  description: "Accedé a nuestro catálogo exclusivo para distribuidores y ventas por mayor. Productos agroecológicos con origen en Cañuelas. Calidad artesanal directo de granja.",
  
  // Facebook / WhatsApp / Instagram / LinkedIn
  openGraph: {
    title: "Ventas Mayoristas y Distribución - El Campito",
    description: "Catálogo de productos agroecológicos origen Cañuelas. Precios especiales para comercios y revendedores.",
    url: "https://granja-el-campito.vercel.app/precios",
    siteName: "El Campito - Producción en Cañuelas",
    images: [
      {
        url: "/preview-precios.jpg", // 👈 Debe estar en /public/preview-precios.jpg
        width: 1200,
        height: 1000,
        alt: "Catálogo Mayorista El Campito Origen Cañuelas",
      },
    ],
    locale: "es_AR",
    type: "website",
  },

  // Twitter / X
  twitter: {
    card: "summary_large_image",
    title: "Precios Mayoristas | El Campito Cañuelas",
    description: "Catálogo para distribución y comercios de productos naturales de Cañuelas.",
    images: ["/preview-precios.jpg"],
  },

  // Etiquetas para buscadores
  keywords: ["venta mayorista", "distribución de miel", "productos de cañuelas", "agroecología", "precios granja"],
  robots: {
    index: true,
    follow: true,
  },
}

export default function PreciosLayout({
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