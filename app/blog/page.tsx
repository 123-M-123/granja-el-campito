'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import { 
  HeartPulse, 
  Sprout, 
  Wheat, 
  Newspaper, 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  MapPin 
} from 'lucide-react'

// 🛡️ TIPADO ESTRICTO DE FRAMER MOTION (Soluciona el error ts(2322))
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" as const } 
  }
}

export default function BlogHubPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #064f2a 0%, #032b17 100%)',
      color: '#ffffff',
      padding: '40px 16px 80px',
      fontFamily: 'Eras, sans-serif'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* 🌿 CABECERA DEL BLOG */}
        <header style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.15)',
            padding: '6px 18px',
            borderRadius: '50px',
            marginBottom: '15px',
            fontSize: '13px',
            color: '#bbf7d0',
            fontWeight: 700
          }}>
            <Sparkles size={16} />
            <span>BITÁCORA RURAL & BIENESTAR</span>
          </div>
          
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '15px',
            color: '#ffffff'
          }}>
            Saberes de Nuestra Tierra
          </h1>
          
          <p style={{
            fontSize: '16px',
            color: '#d9f5e3',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.5
          }}>
            De nuestras colmenas y pasturas en Cañuelas directamente a tu hogar: ciencia natural, métodos limpios de producción y vida de campo.
          </p>
        </header>

        {/* 📚 GRILLA DE LAS 4 SECCIONES MAESTRAS */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '25px',
            marginBottom: '60px'
          }}
        >

          {/* =========================================================
              SECCIÓN 1: SALUD Y NUTRICIÓN
          ========================================================= */}
          <motion.article variants={cardVariants} whileHover={{ y: -6 }} style={cardStyle}>
            <div style={{ ...badgeStyle, background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.3)' }}>
              <HeartPulse size={16} />
              <span>Salud & Alimento Vivo</span>
            </div>

            <h2 style={cardTitleStyle}>El Poder Terapéutico de la Miel Pura y los Huevos de Pastoreo</h2>
            <p style={cardDescStyle}>
              Descubrí por qué la miel auténtica cristaliza y cómo los huevos de gallinas criadas en libertad multiplican su aporte de Omega 3 y Vitamina D.
            </p>

            <ul style={listStyle}>
              <li><CheckCircle2 size={14} color="#86efac" /> <strong>Miel cruda:</strong> Enzimas vivas vs. miel industrial pasteurizada.</li>
              <li><CheckCircle2 size={14} color="#86efac" /> <strong>Propóleo y Polen:</strong> El antibiótico natural de las abejas.</li>
              <li><CheckCircle2 size={14} color="#86efac" /> <strong>Yemas doradas:</strong> Nutrientes de pastura real sin químicos.</li>
            </ul>

            <Link href="/blog/salud" style={btnLinkStyle}>
              <span>Explorar Artículos de Salud</span>
              <ArrowRight size={18} />
            </Link>
          </motion.article>

          {/* =========================================================
              SECCIÓN 2: PRODUCCIÓN AGROECOLÓGICA
          ========================================================= */}
          <motion.article variants={cardVariants} whileHover={{ y: -6 }} style={cardStyle}>
            <div style={{ ...badgeStyle, background: 'rgba(34, 197, 94, 0.2)', color: '#86efac', border: '1px solid rgba(34,197,94,0.3)' }}>
              <Sprout size={16} />
              <span>Suelo Vivo & Manejo Limpio</span>
            </div>

            <h2 style={cardTitleStyle}>Cómo Producir Alimentos Limpios sin Agrotóxicos</h2>
            <p style={cardDescStyle}>
              El secreto detrás de nuestra granja en Cañuelas: regeneración de suelos, apicultura no extractiva y respeto irrestricto por los ciclos biológicos.
            </p>

            <ul style={listStyle}>
              <li><CheckCircle2 size={14} color="#86efac" /> <strong>Suelo fértil:</strong> La clave de los nutrientes en el forraje.</li>
              <li><CheckCircle2 size={14} color="#86efac" /> <strong>Colmenas cuidadas:</strong> Cosecha sustentable de miel.</li>
              <li><CheckCircle2 size={14} color="#86efac" /> <strong>Pastoreo rotativo:</strong> Corderos y aves en equilibrio.</li>
            </ul>

            <Link href="/blog/produccion" style={btnLinkStyle}>
              <span>Conocer Métodos de Producción</span>
              <ArrowRight size={18} />
            </Link>
          </motion.article>

          {/* =========================================================
              SECCIÓN 3: CULTURA DE CAMPO & IDENTIDAD
          ========================================================= */}
          <motion.article variants={cardVariants} whileHover={{ y: -6 }} style={cardStyle}>
            <div style={{ ...badgeStyle, background: 'rgba(234, 179, 8, 0.2)', color: '#fde047', border: '1px solid rgba(234,179,8,0.3)' }}>
              <Wheat size={16} />
              <span>Tradición Criolla & Cocina</span>
            </div>

            <h2 style={cardTitleStyle}>Historias de Chacra, Uribelarrea y Recetario Criollo</h2>
            <p style={cardDescStyle}>
              Tradiciones gastronómicas del campo bonaerense. Recetas caseras con miel pura, secretos del pan de campo y el valor del productor familiar.
            </p>

            <ul style={listStyle}>
              <li><CheckCircle2 size={14} color="#86efac" /> <strong>Recetario tradicional:</strong> Pan de miel, budines e infusiones.</li>
              <li><CheckCircle2 size={14} color="#86efac" /> <strong>Uribelarrea histórica:</strong> El polo turístico de la cuenca lechera.</li>
              <li><CheckCircle2 size={14} color="#86efac" /> <strong>Consumo local:</strong> Del productor al vecino sin intermediarios.</li>
            </ul>

            <Link href="/blog/cultura" style={btnLinkStyle}>
              <span>Leer Notas de Cultura Criolla</span>
              <ArrowRight size={18} />
            </Link>
          </motion.article>

          {/* =========================================================
              SECCIÓN 4: MEDIOS LOCALES & COMUNIDAD CAÑUELAS
          ========================================================= */}
          <motion.article variants={cardVariants} whileHover={{ y: -6 }} style={{ ...cardStyle, border: '2px solid rgba(134, 239, 172, 0.4)' }}>
            <div style={{ ...badgeStyle, background: 'rgba(56, 189, 248, 0.2)', color: '#7dd3fc', border: '1px solid rgba(56,189,248,0.3)' }}>
              <Newspaper size={16} />
              <span>Prensa & Comunidad Cañuelas</span>
            </div>

            <h2 style={cardTitleStyle}>El Campito en las Ferias y Medios de la Región</h2>
            <p style={cardDescStyle}>
              Noticias sobre la Feria Rural de Cañuelas (Ruta 205 Km 65.200) y menciones de nuestra granja en los principales periódicos y portales de noticias locales:
            </p>

            {/* ENLACES A DIARIOS REALES DE CAÑUELAS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '15px 0 20px' }}>
              <a 
                href="https://www.infocanuelas.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={mediaLinkStyle}
              >
                <span>📰 <strong>InfoCañuelas:</strong> Crónicas rurales y cobertura regional</span>
                <ExternalLink size={14} />
              </a>

              <a 
                href="https://www.elciudadano.com.ar" 
                target="_blank" 
                rel="noopener noreferrer"
                style={mediaLinkStyle}
              >
                <span>🗞️ <strong>El Ciudadano de Cañuelas:</strong> Actualidad productiva</span>
                <ExternalLink size={14} />
              </a>

              <a 
                href="https://www.nacpopcanuelas.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={mediaLinkStyle}
              >
                <span>📻 <strong>NacPop Cañuelas:</strong> Voces de los productores locales</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <Link href="/blog/comunidad" style={btnLinkStyle}>
              <span>Ver Nuestra Agenda en Ferias</span>
              <ArrowRight size={18} />
            </Link>
          </motion.article>

        </motion.div>

        {/* 🗺️ PIE DE PÁGINA DEL BLOG */}
        <div style={{
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.15)',
          paddingTop: '30px',
          color: '#d9f5e3',
          fontSize: '14px'
        }}>
          <p style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={16} color="#86efac" />
            <span>Granja Agroecológica El Campito · Cañuelas, Provincia de Buenos Aires</span>
          </p>
        </div>

      </div>
    </main>
  )
}

// =========================================================
// 🎨 ESTILOS MODULARES EN LÍNEA
// =========================================================
const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  borderRadius: '24px',
  padding: '28px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
}

const badgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '5px 12px',
  borderRadius: '50px',
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'uppercase',
  marginBottom: '15px',
  width: 'fit-content',
}

const cardTitleStyle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 800,
  lineHeight: 1.25,
  color: '#ffffff',
  marginBottom: '12px',
}

const cardDescStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#e2e8f0',
  lineHeight: 1.5,
  marginBottom: '16px',
}

const listStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: '0 0 20px 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  fontSize: '13px',
  color: '#d9f5e3',
}

const btnLinkStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '#ffffff',
  color: '#064f2a',
  padding: '12px 20px',
  borderRadius: '50px',
  fontWeight: 800,
  fontSize: '13px',
  textDecoration: 'none',
  textTransform: 'uppercase',
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  transition: 'transform 0.2s',
  marginTop: 'auto',
}

const mediaLinkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 12px',
  background: 'rgba(0, 0, 0, 0.2)',
  borderRadius: '10px',
  color: '#ffffff',
  textDecoration: 'none',
  fontSize: '12px',
  border: '1px solid rgba(255,255,255,0.1)',
}