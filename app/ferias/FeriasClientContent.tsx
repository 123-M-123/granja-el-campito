// el-campito/app/ferias/FeriasClientContent.tsx - Renderizado Exacto con Separación de Mapas Blindada
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

  const allBanners = banners || []

  // Helper de búsqueda por tag
  const getBannerByTag = (tag: string) => {
    const clean = tag.toLowerCase().trim()
    return allBanners.find(b => (b.ubicacion || '').toLowerCase().trim() === clean)
  }

  // =========================================================================
  // 🧭 1. DÓNDE NOS PODÉS ENCONTRAR (3 PISOS BLINDADOS)
  // =========================================================================

  // PISO 1 (ARRIBA): Foto fija de las dos carpas verdes
  const bannerCarpas = getBannerByTag('feria-portada') || 
    allBanners.find(b => {
      const u = (b.ubicacion || '').toLowerCase().trim()
      const link = (b.linkDestino || '').toLowerCase().trim()
      return u === 'feria-2' && !link.includes('maps') && !link.includes('goo.gl') && !link.includes('fechas')
    })

  // PISO 2 (EN EL MEDIO): El nuevo anuncio de la Expo Cañuelas
  const bannerEnElMedio = getBannerByTag('anuncio-feria-nueva')

  // PISO 3 (ABAJO): El afiche de Noviembre 2026 (linkea a las fechas)
  const bannerMes = getBannerByTag('feria-mes') || 
    allBanners.find(b => {
      const link = (b.linkDestino || '').toLowerCase().trim()
      return link.includes('fechas') || link.includes('blog/ferias_fechas')
    })

  // =========================================================================
  // 🗺️ 2. UBICACIÓN DIRECTA: TODOS LOS MAPAS (Cero desapariciones)
  // Cualquier banner que tenga link de Google Maps se muestra EXCLUSIVAMENTE acá
  // =========================================================================
  const mapsVistos = new Set<string>()
  const bannersMaps = allBanners.filter(b => {
    const link = (b.linkDestino || '').toLowerCase().trim()
    const esGoogleMaps = link.includes('maps') || link.includes('goo.gl')
    
    // Si es de Maps y no lo agregamos todavía
    if (esGoogleMaps && !mapsVistos.has(link)) {
      mapsVistos.add(link)
      return true
    }
    return false
  })

  // 3. FERIAS ANTERIORES Y EXTRAS (INTACTOS)
  const bannersFeria1 = allBanners.filter(b => (b.ubicacion || '').toLowerCase().trim() === 'feria-1')
  const bannersFeria3 = allBanners.filter(b => (b.ubicacion || '').toLowerCase().trim() === 'feria-3')

  const bannersRestantes = allBanners.filter(b => {
    const u = (b.ubicacion || '').toLowerCase().trim()
    const parts = u.split('-')
    const num = parseInt(parts[1])
    return u.includes('feria') && num >= 4 && num < 2000 
  })

  return (
    <main className={styles.page}>

      {/* 🔘 0. NAVEGACIÓN SUPERIOR */}
      <div className={styles.topNav}>
        <Link href="/" className={styles.homeLink}>
          <Home size={15} color="#86efac" />
          <span>Inicio</span>
        </Link>
      </div>

      {/* 🌿 1. HERO PRINCIPAL */}
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

        {/* 🖼️ PRESENTACIÓN SUPERIOR (feria-1) */}
        {bannersFeria1.length > 0 && (
          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}
          >
            {bannersFeria1.map((b, i) => (
              <div key={i} className={styles.bannerWrapper}>
                <img src={b.imagen} alt="Presentación Feria" className={styles.bannerImg} />
              </div>
            ))}
          </motion.div>
        )}

        {/* =========================================================
            📍 DÓNDE NOS PODÉS ENCONTRAR (3 PISOS CLAROS Y SEPARADOS)
        ========================================================= */}
        <motion.div
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}
        >
          <h2 className={styles.sectionTitle}>Dónde nos podés encontrar</h2>
          
          {/* PISO 1 (ARRIBA): FOTO DE LAS DOS CARPAS */}
          <div className={styles.bannerWrapper}>
            {bannerCarpas ? (
              <img src={bannerCarpas.imagen} alt="Ferias Uribelarrea y Cañuelas" className={styles.bannerImg} />
            ) : (
              <img 
                src="/ferias/solo ferias.jpg" 
                alt="Ferias Uribelarrea y Cañuelas" 
                className={styles.bannerImg}
                onError={(e) => { e.currentTarget.src = '/ferias/solo-ferias.jpg' }}
              />
            )}
          </div>

          {/* 🟢 PISO 2 (EN EL MEDIO): ANUNCIO FERIA NUEVA (Expo Cañuelas) */}
          {bannerEnElMedio && (
            <div className={styles.bannerWrapper}>
              {bannerEnElMedio.linkDestino ? (
                <a href={bannerEnElMedio.linkDestino} target="_blank" rel="noopener noreferrer">
                  <img src={bannerEnElMedio.imagen} alt="Anuncio Feria" className={styles.bannerImg} />
                </a>
              ) : (
                <img src={bannerEnElMedio.imagen} alt="Anuncio Feria" className={styles.bannerImg} />
              )}
            </div>
          )}

          {/* PISO 3 (ABAJO): AFICHE DE NOVIEMBRE 2026 */}
          {bannerMes && (
            <div className={styles.bannerWrapper}>
              <Link href="/blog/ferias_fechas" title="Ver fechas del mes">
                <img 
                  src={bannerMes.imagen} 
                  alt="Cronograma de Ferias" 
                  className={styles.bannerImg} 
                />
              </Link>
            </div>
          )}
        </motion.div>

        {/* =========================================================
            🗺️ UBICACIÓN DIRECTA: TODOS LOS MAPAS SE RENDERIZAN ACÁ
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

          {/* 🟢 LISTADO COMPLETO DE BOTONES DE GOOGLE MAPS */}
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
            {bannersMaps.map((b, i) => (
              <div key={i} className={styles.bannerWrapper}>
                <a href={b.linkDestino} target="_blank" rel="noopener noreferrer">
                  <img src={b.imagen} alt={b.ubicacion || 'Ubicación Google Maps'} className={styles.bannerImg} />
                </a>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 🏛️ FERIAS ANTERIORES (feria-3) */}
        {bannersFeria3.length > 0 && (
          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <h2 className={styles.sectionTitle}>Ferias Anteriores</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
              {bannersFeria3.map((b, i) => (
                <div key={i} className={styles.bannerWrapper}>
                  {b.linkDestino ? (
                    <a href={b.linkDestino} target="_blank" rel="noopener noreferrer">
                      <img src={b.imagen} alt="Feria Anterior" className={styles.bannerImg} />
                    </a>
                  ) : (
                    <img src={b.imagen} alt="Feria Anterior" className={styles.bannerImg} />
                  )}
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <Link href="/ferias/anteriores" className={`${styles.uploadLink} ${styles.historyBtn}`}>
                EXPLORAR ARCHIVO 
              </Link>
            </div>
          </motion.div>
        )}

        {/* 📸 SUBIDA DE FOTOS */}
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

        {/* 🚀 GALERÍA EXTRA */}
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