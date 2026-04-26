type Props = {
  params: { slug: string }
}
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const texto = params.slug.replace(/-/g, ' ')

  return {
    title: `${texto} | El Campito`,
    description: `Comprá ${texto} directo de producción agroecológica en Cañuelas. Calidad natural y envíos.`,
  }
}
export default function SlugPage({ params }: Props) {
  const { slug } = params

  const texto = slug.replace(/-/g, ' ')

  return (
    <main style={{ padding: 20 }}>
      <h1>{texto}</h1>

      <p>
        Estás buscando {texto}. En El Campito ofrecemos productos agroecológicos
        de alta calidad, producción natural y entrega en la zona.
      </p>

      <p>
        Consultanos por disponibilidad, precios y puntos de retiro o envíos.
      </p>

      <a
        href="https://wa.me/5492262557322"
        target="_blank"
      >
        Consultar por WhatsApp
      </a>
    </main>
  )
}