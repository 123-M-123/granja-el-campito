'use client'

import BubbleNav from './navigation/BubbleNav'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <section className={styles.hero}>

      <div className={styles.content}>
        <p className={styles.subtitle}>
          Producción Familiar Artesanal
        </p>

        <h1 className={styles.title}>
          Entra a Nuestras <br />
          Esferas de Producción
        </h1>

        <p className={styles.subtitle}>
          Y enterate de todo lo que hacemos
        </p>
      </div>

      <div suppressHydrationWarning>
        <BubbleNav />
      </div>

    </section>
  )
}