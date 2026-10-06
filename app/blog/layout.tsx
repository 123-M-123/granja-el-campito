import type { Metadata } from 'next'

// =========================================================================
// 🌐 METADATA MULTIREDES PARA EL BLOG DE EL CAMPITO
// =========================================================================
export const metadata: Metadata = {
  // 🔍 1. SEO ESTÁNDAR (Para Google y buscadores)
  title: 'Blog & Saberes de Campo | Granja Agroecológica El Campito',
  description:
    'Artículos sobre salud natural, beneficios de la miel pura, huevos de pastoreo sin químicos, métodos agroecológicos y cultura rural de Cañuelas.',
  
  // Palabras clave para indexación orgánica
  keywords: [
    'blog agroecológico',
    'beneficios miel pura',
    'huevos de pastoreo cañuelas',
    'propóleo y polen salud',
    'producción sin agrotóxicos',
    'feria rural cañuelas',
    'granja el campito',
    'cultura criolla uribelarrea'
  ],

  // 📱 2. OPEN GRAPH (Para WhatsApp, Facebook, Instagram, Telegram y LinkedIn)
  openGraph: {
    title: 'Bitácora de Campo & Salud Agroecológica · El Campito',
    description:
      'Descubrí la ciencia detrás de la miel pura, el valor de los huevos de gallinas libres y las historias vivas de nuestra granja en Cañuelas.',
    url: 'https://granja-el-campito.vercel.app/blog',
    siteName: 'El Campito - Granja Agroecológica',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        // 🖼️ Toma directo tu archivo public/prev-blog.jpg
        url: '/prev-blog.jpg',
        width: 1200,
        height: 1000,
        alt: 'Blog El Campito - Saberes de Campo, Salud y Agroecología en Cañuelas',
      },
    ],
  },

  // 🐦 3. TWITTER / X (Genera la tarjeta grande con foto completa)
  twitter: {
    card: 'summary_large_image',
    title: 'Blog El Campito | Agroecología y Vida de Campo',
    description:
      'Nutrición consciente, apicultura respetuosa y noticias de la comunidad rural de Cañuelas.',
    images: ['/prev-blog.jpg'],
  },

  // 🤖 4. DIRECTIVAS PARA BOTS Y CRAWLERS DE REDES SOCIALES
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// =========================================================================
// 📦 COMPONENTE LAYOUT (Envuelve la página /blog sin romper el diseño)
// =========================================================================
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* 
        El layout inyecta las etiquetas <head> con la metadata para todas 
        las redes sociales y renderiza adentro el contenido de app/blog/page.tsx 
      */}
      {children}
    </section>
  )
}