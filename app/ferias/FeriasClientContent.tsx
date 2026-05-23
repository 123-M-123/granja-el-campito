'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, ShoppingBag, ArrowLeft, Share2, Eraser, ChevronRight, Camera } from 'lucide-react'
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

  // 🔄 NUEVA LÓGICA: En lugar de find (uno), usamos filter (todos)
  const getBannerGroup = (slug: string) => banners.filter(b => b.ubicacion === slug)

  const bannersRestantes = banners.filter(b => {
    const parts = b.ubicacion.split('-')
    const num = parseInt(parts[1])
    // Excluimos las fijas y las que tienen año (feria-2026, etc)
    return b.ubicacion.includes('feria') && num >= 4 && num < 2000 
  })

  // Componente para dibujar un grupo de banners del mismo tag
  const BannerGroup = ({ tag }: { tag: string }) => {
    const items = getBannerGroup(tag)
    if (items.length === 0) return null
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
        {items.map((banner, index) => (
          <div key={`${tag}-${index}`} className={styles.bannerWrapper}>
            {banner.linkDestino ? (
              <a href={banner.linkDestino} target="_blank" rel="noopener noreferrer">
                <img src={banner.imagen} alt={banner.ubicacion} className={styles.bannerImg} />
              </a>
            ) : (
              <img src={banner.imagen} alt={banner.ubicacion} className={styles.bannerImg} />
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
        <p>
          Participamos en ferias locales donde podés encontrar todos nuestros productos. 
          ¡Vení a visitarnos y probá nuestra miel pura!
        </p>
      </section>

      <section className={styles.container}>
        {/* 1. Presentación */}
        <BannerGroup tag='feria-1' />

        {/* 2. Cronograma (Aquí podés repetir feria-2 en el Excel y salen todos) */}
        <h2 className={styles.sectionTitle}>Cronograma de fechas de futuras Ferias</h2>
        <BannerGroup tag='feria-2' />

        {/* 3. Ferias Anteriores (Con botón a la nueva página) */}
        <h2 className={styles.sectionTitle}>Ferias anteriores</h2>
        <BannerGroup tag='feria-3' />
        <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '30px' }}>
          <Link href="/ferias/anteriores" className={styles.uploadLink} style={{ background: '#000', color: 'white', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 25px' }}>
            VER HISTORIAL DE FERIAS <ChevronRight size={18} />
          </Link>
        </div>

        {/* 4. Módulo de Subida (Tu código intacto) */}
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
        {bannersRestantes.length > 0 && <h2 className={styles.sectionTitle}>Galería Extra</h2>}
        {bannersRestantes.map((banner, index) => (
          <div key={index} className={styles.bannerWrapper}>
             <img src={banner.imagen} alt="Extra" className={styles.bannerImg} />
          </div>
        ))}
      </section>
    </main>
  )
}