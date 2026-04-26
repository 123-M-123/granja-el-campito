import { MetadataRoute } from 'next'

const baseUrl = 'https://granja-el-campito.vercel.app'

// 🔥 base SEO
const productos = ['miel', 'huevos', 'cordero']
const modificadores = ['natural', 'organica', 'artesanal', 'pura', 'de campo']
const ubicaciones = ['canuelas', 'buenos-aires', 'zona-sur']

// 🚫 slugs reservados (evita conflictos futuros)
const reserved = ['sitemap.xml', 'robots.txt']

// 🔥 generador de slugs SEO controlado
const slugs = productos.flatMap((producto) =>
  modificadores.flatMap((mod) =>
    ubicaciones.map((loc) => {
      const slug = `${producto}-${mod}-${loc}`.replace(/\s+/g, '-')
      return slug
    })
  )
)

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/miel',
    '/huevos',
    '/corderos',
    '/quienes-somos',
    '/ferias',
    '/envios',
    '/precios',
  ]

  const staticUrls = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }))

  const slugUrls = slugs
    .filter((slug) => !reserved.includes(slug))
    .map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
    }))

  return [...staticUrls, ...slugUrls]
}