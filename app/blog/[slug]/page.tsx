import type { Metadata } from 'next'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Sparkles, 
  Clock, 
  MessageCircle, 
  MapPin, 
  Sprout, 
  HeartPulse, 
  Wheat, 
  Newspaper 
} from 'lucide-react'

// =========================================================================
// 📚 DICCIONARIO MAESTRO DE SLUGS Y CONTENIDO EDITORIAL
// =========================================================================
interface BlogTopic {
  badge: string
  themeColor: string
  borderColor: string
  bgSoft: string
  icon: typeof HeartPulse
  title: string
  subtitle: string
  readTime: string
  summary: string[]
  teaser: string
}

const TOPICS: Record<string, BlogTopic> = {
  salud: {
    badge: 'Salud & Alimento Vivo',
    themeColor: '#fca5a5',
    borderColor: 'rgba(239, 68, 68, 0.45)',
    bgSoft: 'rgba(239, 68, 68, 0.18)',
    icon: HeartPulse,
    title: 'El Poder Terapéutico de la Miel Pura y los Huevos de Pastoreo',
    subtitle: 'Enzimas vivas, inmunidad de la colmena y nutrición sin ultraprocesados.',
    readTime: '4 min',
    teaser: 'Estamos terminando de redactar la ficha científica completa con las investigaciones sobre cristalización natural, contenido de diastasa/invertasa y el impacto del pastoreo libre en la concentración de Omega-3.',
    summary: [
      'Propiedades biológicas de la miel no pasteurizada y cómo identificar pureza.',
      'Tinturas de propóleo y polen granulado: escudos antibacterianos naturales.',
      'Comparativa nutricional entre huevo pastoril auténtico y huevo de granja industrial.'
    ]
  },
  produccion: {
    badge: 'Suelo Vivo & Manejo Limpio',
    themeColor: '#86efac',
    borderColor: 'rgba(34, 197, 94, 0.45)',
    bgSoft: 'rgba(34, 197, 94, 0.18)',
    icon: Sprout,
    title: 'Cómo Producir Alimentos Limpios Cuidando los Ciclos de la Tierra',
    subtitle: 'Técnicas agroecológicas aplicadas en nuestra chacra de Cañuelas.',
    readTime: '5 min',
    teaser: 'Próximamente publicaremos el desglose técnico de nuestro sistema de rotación de parcelas, invernada apícola sin jarabes artificiales y el manejo libre de pesticidas sintéticos.',
    summary: [
      'Rotación regenerativa: suelo oxigenado y pasturas limpias sin agroquímicos.',
      'Apicultura ética: cosechas respetuosas preservando reservas de alimento para la colmena.',
      'Bienestar de aves y ovinos a cielo abierto con sol y forraje verde todo el año.'
    ]
  },
  cultura: {
    badge: 'Tradición Criolla & Cocina',
    themeColor: '#fde047',
    borderColor: 'rgba(234, 179, 8, 0.45)',
    bgSoft: 'rgba(234, 179, 8, 0.18)',
    icon: Wheat,
    title: 'Historias de Chacra, Uribelarrea y el Recetario Tradicional',
    subtitle: 'Crónicas de campo, gastronomía casera y la identidad de Cañuelas.',
    readTime: '6 min',
    teaser: 'Estamos compilando las recetas tradicionales de budines caseros con miel, infusiones herbales y anécdotas de los puesteros de Uribelarrea que dieron origen a nuestra comunidad productiva.',
    summary: [
      'Recetas criollas: pan de campo con miel pura e infusiones digestivas con propóleo.',
      'Uribelarrea histórica: el valor patrimonial del pueblo tambero y turístico.',
      'Comercio de cercanía: el puente directo entre el productor y la mesa de la familia.'
    ]
  },
  comunidad: {
    badge: 'Prensa & Comunidad Cañuelas',
    themeColor: '#7dd3fc',
    borderColor: 'rgba(56, 189, 248, 0.45)',
    bgSoft: 'rgba(56, 189, 248, 0.18)',
    icon: Newspaper,
    title: 'El Campito en las Ferias y Medios de Comunicación de la Región',
    subtitle: 'Crónicas rurales, participación comunitaria y agenda de ferias locales.',
    readTime: '5 min',
    teaser: 'Aquí encontrarás recopiladas las entrevistas y coberturas de InfoCañuelas, El Ciudadano y radios de la zona, junto al cronograma de fechas de la Feria Rural de Cañuelas (Ruta 205 Km 65.200).',
    summary: [
      'Calendario de participación en la Feria Rural de Cañuelas y eventos regionales.',
      'Prensa destacada: cobertura del crecimiento agroecológico en medios locales.',
      'Puntos de encuentro para retirar pedidos y charlar cara a cara con el productor.'
    ]
  }
}

// Fallback amigable para cualquier slug imprevisto
const FALLBACK_TOPIC: BlogTopic = {
  badge: 'Bitácora Rural',
  themeColor: '#bbf7d0',
  borderColor: 'rgba(134, 239, 172, 0.45)',
  bgSoft: 'rgba(134, 239, 172, 0.18)',
  icon: Sparkles,
  title: 'Saberes y Crónicas de Nuestra Tierra',
  subtitle: 'Granja Agroecológica El Campito · Cañuelas',
  readTime: '3 min',
  teaser: 'Estamos redactando nuevos artículos sobre alimentación limpia, apicultura consciente y producción artesanal bonaerense.',
  summary: [
    'Artículos editoriales en preparación.',
    'Consulta personalizada de productos y envíos vía WhatsApp.',
    'Visitas y ferias en Cañuelas y Uribelarrea.'
  ]
}

// =========================================================================
// 🔍 GENERADOR DE METADATA DINÁMICO (SEO & OPENGRAPH)
// =========================================================================
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const topic = TOPICS[params.slug] || FALLBACK_TOPIC
  return {
    title: `${topic.title} | Blog El Campito`,
    description: topic.subtitle,
    openGraph: {
      title: `${topic.title} · El Campito`,
      description: topic.subtitle,
      url: `https://www.elcampito.tdt.ar/blog/${params.slug}`,
      siteName: 'Granja Agroecológica El Campito',
      locale: 'es_AR',
      type: 'article',
    }
  }
}

// =========================================================================
// 📄 PÁGINA DEL ARTÍCULO (SERVER COMPONENT ANTI-404)
// =========================================================================
export default function BlogPostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const topic = TOPICS[params.slug] || FALLBACK_TOPIC
  const IconComponent = topic.icon

  const telefono = '5492262557322'
  const mensajeWp = `Hola! Estuve leyendo la sección de "${topic.title}" en el blog de El Campito y quería consultarles más info.`
  const whatsappUrl = `https://wa.me/${telefono}?text=${encodeURIComponent(mensajeWp)}`

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #064f2a 0%, #032b17 100%)',
      color: '#ffffff',
      padding: '24px 16px 80px',
      fontFamily: 'Eras, sans-serif'
    }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>

        {/* ⬅️ BOTÓN VOLVER A LA BITÁCORA */}
        <div style={{ marginBottom: '28px' }}>
          <Link 
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '50px',
              background: 'rgba(255, 255, 255, 0.12)',
              color: '#d9f5e3',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 800,
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
              transition: 'background 0.2s ease'
            }}
          >
            <ArrowLeft size={16} />
            <span>Volver a la Bitácora</span>
          </Link>
        </div>

        {/* 🌿 TARJETA PRINCIPAL DEL ARTÍCULO */}
        <article style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(14px)',
          border: `1.5px solid ${topic.borderColor}`,
          borderRadius: '26px',
          padding: 'clamp(24px, 5vw, 42px)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
          marginBottom: '32px'
        }}>

          {/* BADGE Y TIEMPO DE LECTURA */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '50px',
              background: topic.bgSoft,
              border: `1px solid ${topic.borderColor}`,
              color: topic.themeColor,
              fontWeight: 800,
              fontSize: '13px',
              textTransform: 'uppercase'
            }}>
              <IconComponent size={16} />
              <span>{topic.badge}</span>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              color: '#d9f5e3',
              fontWeight: 700
            }}>
              <Clock size={15} />
              <span>Lectura estimada: {topic.readTime}</span>
            </div>
          </div>

          {/* TÍTULO Y SUBTÍTULO */}
          <h1 style={{
            fontSize: 'clamp(26px, 4.5vw, 40px)',
            fontWeight: 900,
            lineHeight: 1.2,
            marginBottom: '16px',
            color: '#ffffff'
          }}>
            {topic.title}
          </h1>

          <p style={{
            fontSize: '18px',
            lineHeight: 1.5,
            color: '#d9f5e3',
            marginBottom: '28px',
            fontWeight: 600
          }}>
            {topic.subtitle}
          </p>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.15)', margin: '24px 0' }} />

          {/* CAJA DE ESTADO: NOTA EN REDACCIÓN FINAL */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.22)',
            borderRadius: '18px',
            padding: '22px',
            border: '1px dashed rgba(255, 255, 255, 0.25)',
            marginBottom: '30px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#fde047',
              fontWeight: 800,
              fontSize: '14px',
              marginBottom: '10px'
            }}>
              <Sparkles size={18} />
              <span>INFORME EN PROCESO DE PUBLICACIÓN</span>
            </div>
            <p style={{ fontSize: '15px', color: '#e2e8f0', lineHeight: 1.6, margin: 0 }}>
              {topic.teaser}
            </p>
          </div>

          {/* PUNTOS CLAVE QUE SE DESARROLLAN */}
          <h2 style={{
            fontSize: '18px',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Ejes Principales de Esta Edición:
          </h2>

          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 34px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {topic.summary.map((item, idx) => (
              <li 
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  fontSize: '15px',
                  color: '#d9f5e3',
                  lineHeight: 1.45
                }}
              >
                <span style={{ color: topic.themeColor, fontWeight: 900, marginTop: '2px' }}>✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* BOTÓN WHATSAPP DE CONSULTA */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '20px',
            borderRadius: '18px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#e2e8f0' }}>
              ¿Tenés dudas sobre nuestros alimentos o querés reservar productos de esta tanda?
            </p>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                background: '#22c55e',
                color: '#ffffff',
                padding: '14px 24px',
                borderRadius: '50px',
                fontWeight: 900,
                fontSize: '14px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                boxShadow: '0 6px 20px rgba(34, 197, 94, 0.35)',
                transition: 'transform 0.2s ease'
              }}
            >
              <MessageCircle size={18} />
              <span>Consultar al Productor por WhatsApp</span>
            </a>
          </div>

        </article>

        {/* PIE DE PÁGINA */}
        <footer style={{
          textAlign: 'center',
          color: '#d9f5e3',
          fontSize: '14px',
          paddingTop: '16px'
        }}>
          <p style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={16} color="#86efac" />
            <span>Granja Agroecológica El Campito · Cañuelas, Prov. de Buenos Aires</span>
          </p>
        </footer>

      </div>
    </main>
  )
}