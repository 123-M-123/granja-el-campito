'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Camera, History as HistoryIcon } from 'lucide-react' 
import styles from './ferias.module.css'

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

  // 🔄 LÓGICA PARA GRUPOS: Filtra todos los banners de una ubicación (feria-2, etc)
  const getBannerGroup = (slug: string) => banners.filter(b => b.ubicacion === slug)

  // 🔄 LÓGICA PUNTO 5: Banners que no son del 1 al 3 y no son por año
  const bannersRestantes = banners.filter(b => {
    const parts = b.ubicacion.split('-')
    const num = parseInt(parts[1])
    return b.ubicacion.includes('feria') && num >= 4 && num < 2000 
  })

  const BannerGroupRenderer = ({ tag }: { tag: string }) => {
    const group = getBannerGroup(tag)
    if (group.length === 0) return null
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
        {group.map((b, i) => (
          <div key={i} className={styles.bannerWrapper}>
            {b.linkDestino ? (
              <a href={b.linkDestino} target="_blank" rel="noopener noreferrer">
                <img src={b.imagen} alt={b.ubicacion} className={styles.bannerImg} />
              </a>
            ) : (
              <img src={b.imagen} alt={b.ubicacion} className={styles.bannerImg} />
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1>Ferias y Eventos</h1>
        <p>Participamos en ferias locales. ¡Vení a visitarnos y probá nuestra miel pura!</p>
      </section>

      <section className={styles.container}>
        {/* 1. Presentación */}
        <BannerGroupRenderer tag="feria-1" />

        {/* 2. Cronograma */}
        <h2 className={styles.sectionTitle}>Cronograma de Fechas</h2>
        <BannerGroupRenderer tag="feria-2" />

        {/* 3. Ferias Anteriores */}
        <h2 className={styles.sectionTitle}>Ferias Anteriores</h2>
        <BannerGroupRenderer tag="feria-3" />
        
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <Link href="/ferias/anteriores" className={`${styles.uploadLink} ${styles.historyBtn}`}>
            <HistoryIcon size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            EXPLORAR ARCHIVO 
          </Link>
        </div>

        {/* 4. Módulo de Subida */}
        <div className={styles.uploadBox}>
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
        </div>

        {/* 🚀 5. GALERÍA EXTRA (RESTABLECIDO) */}
        {bannersRestantes.length > 0 && (
          <>
            <h2 className={styles.sectionTitle}>Galería Extra</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
              {bannersRestantes.map((banner, index) => (
                <div key={index} className={styles.bannerWrapper}>
                  <img src={banner.imagen} alt="Extra" className={styles.bannerImg} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  )
}