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
  MapPin,
  Clock,
  BookOpen
} from 'lucide-react'

// Animación para revelado al hacer scroll (Scroll Reveal)
const cardScrollVariants: Variants = {
  hidden: { opacity: 0, y: 45 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" as const } 
  }
}

export default function BlogHubPage() {
  // Función para scroll suave compensando la barra superior fija
  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #064f2a 0%, #032b17 100%)',
      color: '#ffffff',
      padding: '25px 16px 90px',
      fontFamily: 'Eras, sans-serif',
      overflowX: 'hidden', // 👈 Escudo para anular cualquier scroll horizontal accidental en celulares
      width: '100%'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>

        {/* =========================================================
            🖼️ 1. PORTADA RESPONSIVA (CELULAR VS ESCRITORIO)
        ========================================================= */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            width: '100%',
            borderRadius: '26px',
            overflow: 'hidden',
            boxShadow: '0 20px 45px rgba(0,0,0,0.4)',
            marginBottom: '28px',
            background: 'rgba(0,0,0,0.2)'
          }}
        >
          <picture style={{ width: '100%', display: 'block' }}>
            <source media="(max-width: 767px)" srcSet="/blog-cel.jpg" />
            <source media="(min-width: 768px)" srcSet="/blog-esc.jpg" />
            <img 
              src="/blog-esc.jpg" 
              alt="Portada Bitácora El Campito Cañuelas" 
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover'
              }}
            />
          </picture>
        </motion.div>

        {/* =========================================================
            🔘 2. BOTONERA RÁPIDA 2x2 (NAVEGACIÓN CON SCROLL SUAVE)
        ========================================================= */}
        <section aria-label="Navegación rápida de secciones" style={{ marginBottom: '45px', width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '14px',
            width: '100%'
          }}>
            {/* 1. SALUD */}
            <a 
              href="#salud" 
              onClick={(e) => handleScrollTo(e, 'salud')} 
              style={{ ...quickBtnStyle, border: '2px solid rgba(239, 68, 68, 0.45)', background: 'rgba(239, 68, 68, 0.18)' }}
            >
              <HeartPulse size={24} color="#fca5a5" />
              <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '16px' }}>Salud</span>
            </a>

            {/* 2. PRODUCCIÓN */}
            <a 
              href="#produccion" 
              onClick={(e) => handleScrollTo(e, 'produccion')} 
              style={{ ...quickBtnStyle, border: '2px solid rgba(34, 197, 94, 0.45)', background: 'rgba(34, 197, 94, 0.18)' }}
            >
              <Sprout size={24} color="#86efac" />
              <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '16px' }}>Producción</span>
            </a>

            {/* 3. TRADICIÓN */}
            <a 
              href="#tradicion" 
              onClick={(e) => handleScrollTo(e, 'tradicion')} 
              style={{ ...quickBtnStyle, border: '2px solid rgba(234, 179, 8, 0.45)', background: 'rgba(234, 179, 8, 0.18)' }}
            >
              <Wheat size={24} color="#fde047" />
              <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '16px' }}>Tradición</span>
            </a>

            {/* 4. NOTICIAS */}
            <a 
              href="#noticias" 
              onClick={(e) => handleScrollTo(e, 'noticias')} 
              style={{ ...quickBtnStyle, border: '2px solid rgba(56, 189, 248, 0.45)', background: 'rgba(56, 189, 248, 0.18)' }}
            >
              <Newspaper size={24} color="#7dd3fc" />
              <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '16px' }}>Noticias</span>
            </a>
          </div>
        </section>

        {/* 🌿 CABECERA EDITORIAL */}
        <header style={{ textAlign: 'center', marginBottom: '55px', width: '100%' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.14)',
            padding: '7px 22px',
            borderRadius: '50px',
            marginBottom: '18px',
            fontSize: '13px',
            color: '#bbf7d0',
            fontWeight: 800,
            letterSpacing: '0.8px'
          }}>
            <Sparkles size={16} />
            <span>BITÁCORA RURAL, CIENCIA & ALIMENTO VIVO</span>
          </div>
          
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 50px)',
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: '16px',
            color: '#ffffff'
          }}>
            Saberes de Nuestra Tierra
          </h1>
          
          <p style={{
            fontSize: '17px',
            color: '#d9f5e3',
            maxWidth: '720px',
            margin: '0 auto',
            lineHeight: 1.55
          }}>
            De nuestras colmenas y pasturas en Cañuelas directamente a tu hogar: nutrición biológica, respeto por el suelo y crónicas de la comunidad productiva.
          </p>
        </header>

        {/* =========================================================
            📚 GRILLA DE LAS 4 SECCIONES (RESPONSIVE SIN DESBORDE)
            
            Nota Técnica de Arquitectura:
            minmax(min(100%, 460px), 1fr) resuelve el bug:
            - En celular (<460px): min(100%, 460px) toma 100%, evitando el corte derecho.
            - En desktop (>460px): toma 460px y crea columnas paralelas amplias.
        ========================================================= */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          gap: '24px',
          marginBottom: '65px',
          width: '100%'
        }}>

          {/* =========================================================
              SECCIÓN 1: SALUD Y NUTRICIÓN (#salud)
          ========================================================= */}
          <motion.article 
            id="salud"
            variants={cardScrollVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            style={{ ...cardStyle, scrollMarginTop: '160px' }}
          >
            {/* 💧 MARCA DE AGUA GIGANTE AL FONDO */}
            <div style={{ ...watermarkStyle, color: '#ef4444' }}>
              <HeartPulse size={210} />
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div style={{ ...iconHeaderBoxStyle, background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5' }}>
                  <HeartPulse size={28} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#fecaca', fontWeight: 700 }}>
                  <Clock size={14} />
                  <span>Lectura: 4 min</span>
                </div>
              </div>

              <div style={{ ...badgeStyle, background: 'rgba(239, 68, 68, 0.22)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.35)' }}>
                <span>Salud & Alimento Vivo</span>
              </div>

              <h2 style={cardTitleStyle}>El Poder Terapéutico de la Miel Pura y los Huevos de Pastoreo</h2>
              
              <p style={cardDescStyle}>
                Descubrí por qué la miel auténtica cristaliza como sello de pureza biológica y cómo las gallinas criadas en libertad multiplican su aporte de nutrientes sin colorantes sintéticos.
              </p>

              <ul style={listStyle}>
                <li><CheckCircle2 size={15} color="#86efac" /> <strong>Miel cruda:</strong> Conserva enzimas activas (*diastasa e invertasa*) y antioxidantes polifenólicos.</li>
                <li><CheckCircle2 size={15} color="#86efac" /> <strong>Propóleo y Polen:</strong> El escudo inmunológico y bactericida natural generado en la colmena.</li>
                <li><CheckCircle2 size={15} color="#86efac" /> <strong>Huevos pastoriles:</strong> Yemas doradas por pasto verde real, con el triple de Vitamina D y Omega 3.</li>
                <li><CheckCircle2 size={15} color="#86efac" /> <strong>Sin pasteurizar:</strong> Mantenemos intactas las propiedades antisépticas que el calor destruye.</li>
              </ul>

              <Link href="/blog/salud" style={btnLinkStyle}>
                <span>Leer Nota Completa de Salud</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.article>

          {/* =========================================================
              SECCIÓN 2: PRODUCCIÓN AGROECOLÓGICA (#produccion)
          ========================================================= */}
          <motion.article 
            id="produccion"
            variants={cardScrollVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            style={{ ...cardStyle, scrollMarginTop: '160px' }}
          >
            {/* 💧 MARCA DE AGUA GIGANTE AL FONDO */}
            <div style={{ ...watermarkStyle, color: '#22c55e' }}>
              <Sprout size={210} />
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div style={{ ...iconHeaderBoxStyle, background: 'rgba(34, 197, 94, 0.2)', color: '#86efac' }}>
                  <Sprout size={28} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#bbf7d0', fontWeight: 700 }}>
                  <Clock size={14} />
                  <span>Lectura: 5 min</span>
                </div>
              </div>

              <div style={{ ...badgeStyle, background: 'rgba(34, 197, 94, 0.22)', color: '#86efac', border: '1px solid rgba(34,197,94,0.35)' }}>
                <span>Suelo Vivo & Manejo Limpio</span>
              </div>

              <h2 style={cardTitleStyle}>Cómo Producir Alimentos Limpios Cuidando los Ciclos de la Tierra</h2>
              
              <p style={cardDescStyle}>
                El secreto de nuestra chacra en Cañuelas: fertilidad natural del suelo, bienestar animal irrestricto y una apicultura que cuida la colmena antes que el volumen comercial.
              </p>

              <ul style={listStyle}>
                <li><CheckCircle2 size={15} color="#86efac" /> <strong>Suelo vivo:</strong> Microbiología sana que nutre las pasturas sin fertilizantes de síntesis.</li>
                <li><CheckCircle2 size={15} color="#86efac" /> <strong>Apicultura no extractiva:</strong> Dejamos reservas de miel para que las abejas invernen sin jarabes.</li>
                <li><CheckCircle2 size={15} color="#86efac" /> <strong>Rotación de pasturas:</strong> Aves y corderos pastorean en parcelas frescas evitando parásitos.</li>
                <li><CheckCircle2 size={15} color="#86efac" /> <strong>Cero venenos:</strong> Prohibición absoluta de glifosato y químicos residuales en todo el campo.</li>
              </ul>

              <Link href="/blog/produccion" style={btnLinkStyle}>
                <span>Conocer Métodos de Producción</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.article>

          {/* =========================================================
              SECCIÓN 3: CULTURA DE CAMPO & IDENTIDAD (#tradicion)
          ========================================================= */}
          <motion.article 
            id="tradicion"
            variants={cardScrollVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            style={{ ...cardStyle, scrollMarginTop: '160px' }}
          >
            {/* 💧 MARCA DE AGUA GIGANTE AL FONDO */}
            <div style={{ ...watermarkStyle, color: '#eab308' }}>
              <Wheat size={210} />
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div style={{ ...iconHeaderBoxStyle, background: 'rgba(234, 179, 8, 0.2)', color: '#fde047' }}>
                  <Wheat size={28} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#fef08a', fontWeight: 700 }}>
                  <Clock size={14} />
                  <span>Lectura: 6 min</span>
                </div>
              </div>

              <div style={{ ...badgeStyle, background: 'rgba(234, 179, 8, 0.22)', color: '#fde047', border: '1px solid rgba(234,179,8,0.35)' }}>
                <span>Tradición Criolla & Cocina</span>
              </div>

              <h2 style={cardTitleStyle}>Historias de Chacra, Uribelarrea y el Recetario Tradicional</h2>
              
              <p style={cardDescStyle}>
                La identidad gastronómica de la cuenca bonaerense: el encanto histórico de Uribelarrea, recetas caseras transmitidas por generaciones y el valor del productor de cercanía.
              </p>

              <ul style={listStyle}>
                <li><CheckCircle2 size={15} color="#86efac" /> <strong>Recetario tradicional:</strong> Pan de miel de campo, budines caseros e infusiones digestivas.</li>
                <li><CheckCircle2 size={15} color="#86efac" /> <strong>Uribelarrea histórica:</strong> El epicentro gastronómico y turístico de la tradición tambera.</li>
                <li><CheckCircle2 size={15} color="#86efac" /> <strong>Carnes y derivados:</strong> Cordero pastoril criado a cielo abierto en pastizales naturales.</li>
                <li><CheckCircle2 size={15} color="#86efac" /> <strong>Comercio justo:</strong> Venta directa del puestero al vecino, acortando la cadena de intermediarios.</li>
              </ul>

              <Link href="/blog/cultura" style={btnLinkStyle}>
                <span>Leer Notas de Tradición</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.article>

          {/* =========================================================
              SECCIÓN 4: MEDIOS LOCALES & COMUNIDAD (#noticias)
          ========================================================= */}
          <motion.article 
            id="noticias"
            variants={cardScrollVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            style={{ ...cardStyle, border: '2px solid rgba(134, 239, 172, 0.45)', scrollMarginTop: '160px' }}
          >
            {/* 💧 MARCA DE AGUA GIGANTE AL FONDO */}
            <div style={{ ...watermarkStyle, color: '#38bdf8' }}>
              <Newspaper size={210} />
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div style={{ ...iconHeaderBoxStyle, background: 'rgba(56, 189, 248, 0.2)', color: '#7dd3fc' }}>
                  <Newspaper size={28} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#bae6fd', fontWeight: 700 }}>
                  <BookOpen size={14} />
                  <span>Medios Cañuelas</span>
                </div>
              </div>

              <div style={{ ...badgeStyle, background: 'rgba(56, 189, 248, 0.22)', color: '#7dd3fc', border: '1px solid rgba(56,189,248,0.35)' }}>
                <span>Prensa & Comunidad Cañuelas</span>
              </div>

              <h2 style={cardTitleStyle}>El Campito en las Ferias y Medios de Comunicación de la Región</h2>
              
              <p style={cardDescStyle}>
                Nuestra participación en la Feria Rural de Cañuelas (Ruta 205 Km 65.200) y las crónicas de los principales diarios y radios del distrito sobre el crecimiento de la agroecología:
              </p>

              {/* ENLACES A DIARIOS REALES DE CAÑUELAS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', margin: '18px 0 24px' }}>
                <a 
                  href="https://www.infocanuelas.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={mediaLinkStyle}
                >
                  <span>📰 <strong>InfoCañuelas:</strong> Crónicas rurales, actualidad y ferias</span>
                  <ExternalLink size={15} />
                </a>

                <a 
                  href="https://www.elciudadano.com.ar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={mediaLinkStyle}
                >
                  <span>🗞️ <strong>El Ciudadano de Cañuelas:</strong> Actualidad agropecuaria local</span>
                  <ExternalLink size={15} />
                </a>

                <a 
                  href="https://www.nacpopcanuelas.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={mediaLinkStyle}
                >
                  <span>📻 <strong>NacPop Cañuelas:</strong> Voces de los productores y economía regional</span>
                  <ExternalLink size={15} />
                </a>
              </div>

              <Link href="/blog/comunidad" style={btnLinkStyle}>
                <span>Ver Nuestra Agenda en Ferias</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.article>

        </div>

        {/* 🗺️ PIE DE PÁGINA DEL BLOG */}
        <div style={{
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.18)',
          paddingTop: '32px',
          color: '#d9f5e3',
          fontSize: '15px'
        }}>
          <p style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={18} color="#86efac" />
            <span>Granja Agroecológica El Campito · Cañuelas, Provincia de Buenos Aires · Producción Artesanal</span>
          </p>
        </div>

      </div>
    </main>
  )
}

// =========================================================
// 🎨 ESTILOS MODULARES EN LÍNEA (ROBUSTOS Y RESPONSIVOS)
// =========================================================
const quickBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  padding: '16px 12px',
  borderRadius: '18px',
  textDecoration: 'none',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 6px 18px rgba(0,0,0,0.22)',
  transition: 'transform 0.2s ease, filter 0.2s ease',
  cursor: 'pointer'
}

const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.16)',
  borderRadius: '26px',
  padding: 'clamp(20px, 4vw, 32px)', // 👈 Padding fluido que respira en pantallas chicas
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
  position: 'relative',
  overflow: 'hidden',
  width: '100%'
}

const watermarkStyle: React.CSSProperties = {
  position: 'absolute',
  right: '-35px',
  bottom: '-35px',
  opacity: 0.065,
  pointerEvents: 'none',
  transform: 'rotate(-10deg)',
  zIndex: 0
}

const iconHeaderBoxStyle: React.CSSProperties = {
  width: '54px',
  height: '54px',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
}

const badgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '6px 14px',
  borderRadius: '50px',
  fontSize: '12px',
  fontWeight: 800,
  textTransform: 'uppercase',
  marginBottom: '16px',
  width: 'fit-content',
}

const cardTitleStyle: React.CSSProperties = {
  fontSize: 'clamp(19px, 3.5vw, 22px)',
  fontWeight: 900,
  lineHeight: 1.28,
  color: '#ffffff',
  marginBottom: '14px',
}

const cardDescStyle: React.CSSProperties = {
  fontSize: '15px',
  color: '#e2e8f0',
  lineHeight: 1.55,
  marginBottom: '18px',
}

const listStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: '0 0 24px 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  fontSize: '13.5px',
  color: '#d9f5e3',
}

const btnLinkStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '#ffffff',
  color: '#064f2a',
  padding: '13px 22px',
  borderRadius: '50px',
  fontWeight: 900,
  fontSize: '13px',
  textDecoration: 'none',
  textTransform: 'uppercase',
  boxShadow: '0 6px 18px rgba(0,0,0,0.22)',
  transition: 'transform 0.2s',
  marginTop: 'auto',
  position: 'relative',
  zIndex: 2
}

const mediaLinkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 14px',
  background: 'rgba(0, 0, 0, 0.25)',
  borderRadius: '12px',
  color: '#ffffff',
  textDecoration: 'none',
  fontSize: '12.5px',
  border: '1px solid rgba(255,255,255,0.12)',
  transition: 'background 0.2s ease',
}