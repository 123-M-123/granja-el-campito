'use client'

import { useState, useEffect } from 'react'
import styles from './ferias.module.css'

export default function FeriasClientContent({ banners }: { banners: any[] }) {
  const [mounted, setMounted] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

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
        setStatus('✅ ¡Gracias! Foto enviada a Eliana.')
        setFile(null)
      } else {
        setStatus('❌ Error al subir')
      }
    } catch {
      setStatus('❌ Error de conexión')
    } finally {
      setUploading(false)
    }
  }

  // Lógica para filtrar banners
  const getBanner = (slug: string) => banners.find(b => b.ubicacion === slug)
  const bannersRestantes = banners.filter(b => {
    const parts = b.ubicacion.split('-')
    const num = parseInt(parts[1])
    return b.ubicacion.includes('feria') && num >= 4
  })

  const BannerBlock = ({ banner }: { banner: any }) => {
    if (!banner) return null
    const content = <img src={banner.imagen} alt={banner.ubicacion} className={styles.bannerImg} />
    return (
      <div className={styles.bannerWrapper}>
        {banner.linkDestino ? (
          <a href={banner.linkDestino} target="_blank" rel="noopener noreferrer">{content}</a>
        ) : content}
      </div>
    )
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1>Ferias y Eventos</h1>
        <p>
          Participamos en ferias locales donde podés encontrar todos nuestros productos. 
          ¡Vení a visitarnos y probá nuestra miel pura!
        </p>
      </section>

      <section className={styles.container}>
        {/* 1. Presentación */}
        <BannerBlock banner={getBanner('feria-1')} />

        {/* 2. Cronograma */}
        <h2 className={styles.sectionTitle}>Cronograma de fechas de futuras Ferias</h2>
        <BannerBlock banner={getBanner('feria-2')} />

        {/* 3. Ferias Anteriores */}
        <h2 className={styles.sectionTitle}>Ferias anteriores</h2>
        <BannerBlock banner={getBanner('feria-3')} />

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
          {status && <p style={{ marginTop: '10px', fontSize: '14px', fontWeight: 'bold' }}>{status}</p>}
        </div>

        {/* 5. Más Fotos */}
        {bannersRestantes.length > 0 && <h2 className={styles.sectionTitle}>Más fotos</h2>}
        {bannersRestantes.map((banner, index) => (
          <BannerBlock key={index} banner={banner} />
        ))}
      </section>
    </main>
  )
}