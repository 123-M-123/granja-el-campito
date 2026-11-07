// el-campito/app/ferias/FeriasClientContent.tsx - Gestor Dinámico con Nombres Limpios y Respaldo Failsafe
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { 
  Home,
  Calendar,
  MapPin, 
  ExternalLink 
} from 'lucide-react' 
import styles from './ferias.module.css'

const scrollRevealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.55, ease: 'easeOut' as const } 
  }
}

export default function FeriasClientContent({ banners }: { banners: any[] }) {
  const [mounted, setMounted] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    setStatus('🚀 Subiendo foto...')
    const formData = new FormData()
    formData.append('archivo', file)
    try {
      const res = await fetch('/api/upload-feria', { method: 'POST', body: formData })
      if (res.ok) {
        setStatus('✅ ¡Gracias! Foto enviada.')
        setFile(null)
      } else { setStatus('❌ Error al subir') }
    } catch { setStatus('❌ Error de conexión') } finally { setUploading(false) }
  }

  // Helper que normaliza la búsqueda sin importar mayúsculas o minúsculas
  const getBannerGroup = (slug: string) => {
    const cleanSlug = slug.toLowerCase().trim()
    return (banners || []).filter(b => (b.ubicacion || '').toLowerCase().trim() === cleanSlug)
  }

  // =========================================================================
  // 🧭 RESOLUCIÓN ORDENADA Y LIMPIA DE LO QUE ANTES ERA "FERIA-2"
  // =========================================================================

  // 1. ANUNCIO FERIA NUEVA: Busca 'anuncio-feria-nueva'. Si no está, busca el primer 'feria-2' sin link
  const bannersAnuncioNuevo = getBannerGroup('anuncio-feria-nueva')
  const bannerAnuncio = bannersAnuncioNuevo.length > 0 
    ? bannersAnuncioNuevo[0]
    : getBannerGroup('feria-2').find(b => !b.linkDestino || b.linkDestino === '#' || !b.linkDestino.includes('maps'))

  // 2. AFICHE DEL MES: Busca 'feria-mes'. Si no está, busca el 'feria-2' que linkee a 'blog/ferias_fechas'
  const bannersMes = getBannerGroup('feria-mes')
  const bannerMesDinamico = bannersMes.length > 0
    ? bannersMes[0]
    : getBannerGroup('feria-2').find(b => (b.linkDestino || '').includes('blog/ferias_fechas') || (b.linkDestino || '').includes('fechas'))

  // 3. MAPAS: Busca 'feria-maps'. Si no está, busca los 'feria-2' que tengan link a Google Maps
  const bannersMapsNuevos = getBannerGroup('feria-maps')
  const feriaMaps = bannersMapsNuevos.length > 0
    ? bannersMapsNuevos
    : getBannerGroup('feria-2').filter(b => (b.linkDestino || '').includes('maps') || (b.linkDestino || '').includes('goo.gl'))

  // =========================================================================
  // 🛡️ LO QUE ESTÁ MÁS ABAJO QUEDA 100% INTACTO TAL CUAL ESTABA
  // =========================================================================
  const bannersRestantes = (banners || []).filter(b => {
    const parts = (b.ubicacion || '').split('-')
    const num = parseInt(parts[1])
    return (b.ubicacion || '').includes('feria') && num >= 4 && num < 2000 
  })

  const BannerGroupRenderer = ({ items }: { items: any[] }) => {
    if (!items || items.length === 0) return null
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
        {items.map((b, i) => (
          <div key={i} className={styles.bannerWrapper}>
            {b.linkDestino && b.linkDestino !== '#' ? (
              <a href={b.linkDestino} target="_blank" rel="noopener noreferrer">
                <img src={b.imagen} alt={b.ubicacion || 'Banner'} className={styles.bannerImg} />
              </a>
            ) : (
              <img src={b.imagen} alt={b.ubicacion || 'Banner'} className={styles.bannerImg} />
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <main className={styles.page}>

      {/* =========================================================
          🔘 0. NAVEGACIÓN SUPERIOR (BOTÓN INICIO)
      ========================================================= */}
      <div className={styles.topNav}>
        <Link href="/" className={styles.homeLink}>
          <Home size={15} color="#86efac" />
          <span>Inicio</span>
        </Link>
      </div>

      {/* =========================================================
          🌿 1. HERO PRINCIPAL (INTACTO)
      ========================================================= */}
      <motion.section 
        className={styles.hero}
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Ferias y Eventos</h1>
        <p>Participamos en ferias locales. ¡Vení a visitarnos y probá nuestra miel pura!</p>

        <div style={{ marginTop: '24px' }}>
          <Link href="/blog/ferias_fechas" className={styles.ctaCronogramaBtn}>
            <Calendar size={18} color="#064f2a" />
            <span>Ver Cronograma de Fechas ➔</span>
          </Link>
        </div>
      </motion.section>

      <section className={styles.container}>

        {/* =========================================================
            🖼️ 2. PRESENTACIÓN (feria-1) - INTACTO
        ========================================================= */}
        <motion.div
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <BannerGroupRenderer items={getBannerGroup('feria-1')} />
        </motion.div>

        {/* =========================================================
            📍 3. DÓNDE NOS PODÉS ENCONTRAR (100% DINÁMICO)
        ========================================================= */}
        <motion.div
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}
        >
          <h2 className={styles.sectionTitle}>Dónde nos podés encontrar</h2>
          
          {/* FOTO 1: ANUNCIO FERIA NUEVA (Lee de Supabase/Sheets dinámico) */}
          {bannerAnuncio ? (
            <div className={styles.bannerWrapper}>
              {bannerAnuncio.linkDestino && bannerAnuncio.linkDestino !== '#' ? (
                <a href={bannerAnuncio.linkDestino} target="_blank" rel="noopener noreferrer">
                  <img src={bannerAnuncio.imagen} alt="Anuncio Feria" className={styles.bannerImg} />
                </a>
              ) : (
                <img src={bannerAnuncio.imagen} alt="Anuncio Feria" className={styles.bannerImg} />
              )}
            </div>
          ) : (
            // Fallback si todavía no cargaste la foto en el panel
            <div className={styles.bannerWrapper}>
              <img 
                src="/ferias/solo ferias.jpg" 
                alt="Ferias Uribelarrea y Cañuelas" 
                className={styles.bannerImg}
                onError={(e) => { e.currentTarget.src = '/ferias/solo-ferias.jpg' }}
              />
            </div>
          )}

          {/* FOTO 2: AFICHE DEL MES (Noviembre/Diciembre - Dinámico y Clickeable al Cronograma) */}
          {bannerMesDinamico && (
            <div className={styles.bannerWrapper}>
              <Link href="/blog/ferias_fechas" title="Ver fechas del mes">
                <img 
                  src={bannerMesDinamico.imagen} 
                  alt="Cronograma Ferias del Mes" 
                  className={styles.bannerImg}
                />
              </Link>
            </div>
          )}
        </motion.div>

        {/* =========================================================
            🗺️ 4. SEPARADOR: UBICACIÓN DIRECTA (MAPS EXCLUSIVOS)
        ========================================================= */}
        <motion.div
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className={styles.ubicacionSeparador}
        >
          <div className={styles.ubicacionTitulo}>
            <MapPin size={22} color="#86efac" />
            <span>Ubicación directa</span>
            <ExternalLink size={18} color="#86efac" style={{ opacity: 0.8 }} />
          </div>
          <p className={styles.ubicacionSub}>
            Abrí la geolocalización desde tu celular
          </p>

          {/* BANNERS DE MAPS EXCLUSIVOS (Sin el afiche del mes metido acá adentro) */}
          <div style={{ marginTop: '20px', width: '100%' }}>
            <BannerGroupRenderer items={feriaMaps} />
          </div>
        </motion.div>

        {/* =========================================================
            🏛️ 5. FERIAS ANTERIORES (feria-3) - 100% INTACTO
        ========================================================= */}
        <motion.div
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <h2 className={styles.sectionTitle}>Ferias Anteriores</h2>
          <BannerGroupRenderer items={getBannerGroup('feria-3')} />
          
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <Link href="/ferias/anteriores" className={`${styles.uploadLink} ${styles.historyBtn}`}>
              EXPLORAR ARCHIVO 
            </Link>
          </div>
        </motion.div>

        {/* =========================================================
            📸 6. MÓDULO DE SUBIDA DE FOTOS - 100% INTACTO
        ========================================================= */}
        <motion.div
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className={styles.uploadBox}
        >
          <p>¿Tenés fotos de nuestras ferias?</p>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setFile(e.target.files?.[0] || null)} 
            className={styles.fileInput} 
          />
          {file && (
            <button onClick={handleUpload} disabled={uploading} className={styles.uploadLink}>
              {uploading ? 'Enviando...' : '📷 Enviar foto a Eliana'}
            </button>
          )}
          {status && <p style={{ marginTop: '10px', color: 'white', fontWeight: 'bold', fontSize: '14px' }}>{status}</p>}
        </motion.div>

        {/* =========================================================
            🚀 7. GALERÍA EXTRA (feria-4 a feria-8) - 100% INTACTO
        ========================================================= */}
        {bannersRestantes.length > 0 && (
          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <h2 className={styles.sectionTitle}>Galería Extra</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
              {bannersRestantes.map((banner, index) => (
                <div key={index} className={styles.bannerWrapper}>
                  <img src={banner.imagen} alt="Extra" className={styles.bannerImg} />
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </section>
    </main>
  )
}