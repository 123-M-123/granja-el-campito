'use client'
import Link from 'next/link'
import { ArrowLeft, History } from 'lucide-react'
import styles from '../ferias.module.css'

export default function AnterioresClient({ banners }: { banners: any[] }) {
  const años = [2026, 2025, 2024, 2023, 2022, 2021, 2020]

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <History size={60} color="white" style={{ marginBottom: '15px' }} />
        <h1>Archivo Histórico</h1>
        <p>Reviví nuestros mejores momentos desde el 2020</p>
      </header>

      <section className={styles.container}>
        <Link href="/ferias" style={{ color: 'white', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <ArrowLeft size={24} /> VOLVER A FERIAS ACTUALES
        </Link>

        {años.map(año => {
          const fotos = banners.filter(b => b.ubicacion === `feria-${año}`)
          if (fotos.length === 0) return null

          return (
            <div key={año} style={{ marginTop: '50px' }}>
              <h2 className={styles.sectionTitle}>Ediciones {año}</h2>
              {/* 🚀 Grilla de 3 columnas configurada en el CSS */}
              <div className={styles.gridAnteriores}>
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

      <footer style={{ textAlign: 'center', padding: '60px 0' }}>
          <Link href="/" className={styles.uploadLink}>VOLVER A LA TIENDA</Link>
      </footer>
    </main>
  )
}