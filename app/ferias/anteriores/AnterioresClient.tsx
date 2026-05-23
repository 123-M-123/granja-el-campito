'use client'
import Link from 'next/link'
import { ArrowLeft, History } from 'lucide-react'
import styles from '../ferias.module.css'

export default function AnterioresClient({ banners }: { banners: any[] }) {
  const años = [2026, 2025, 2024, 2023, 2022, 2021, 2020]

  return (
    <main className={styles.page} style={{ background: 'white' }}>
      <header className={styles.hero}>
        <History size={50} color="#064f2a" style={{ marginBottom: '15px' }} />
        <h1>Archivo Histórico</h1>
        <p>Nuestra historia en fotos desde el año 2020</p>
      </header>

      <section className={styles.container}>
        <Link href="/ferias" style={{ color: '#064f2a', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <ArrowLeft size={20} /> VOLVER
        </Link>

        {años.map(año => {
          const fotos = banners.filter(b => b.ubicacion === `feria-${año}`)
          if (fotos.length === 0) return null

          return (
            <div key={año} style={{ marginTop: '40px' }}>
              <h2 className={styles.sectionTitle}>Ferias {año}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {fotos.map((f, i) => (
                  <div key={i} className={styles.bannerWrapper}>
                    <img src={f.imagen} alt={`Feria ${año}`} className={styles.bannerImg} />
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </section>
    </main>
  )
}