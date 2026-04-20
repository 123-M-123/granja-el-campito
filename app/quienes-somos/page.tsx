import styles from './quienes.module.css'
import { Leaf, HeartHandshake, Sprout } from 'lucide-react'

export default function QuienesSomos() {
  return (
    <main className={styles.page}>

      <section className={styles.hero}>
        <h1>Quiénes Somos</h1>
        <p>Producción agroecológica, familiar y consciente</p>
      </section>

      <section className={styles.grid}>

        <div className={styles.card}>
          <Leaf />
          <h3>Nuestra filosofía</h3>
          <p>
            Trabajamos respetando la naturaleza, sin químicos ni procesos
            industriales, priorizando la calidad real del alimento.
          </p>
        </div>

        <div className={styles.card}>
          <Sprout />
          <h3>Producción artesanal</h3>
          <p>
            Cada producto nace de procesos cuidados, con tiempos naturales
            y dedicación familiar en cada etapa.
          </p>
        </div>

        <div className={styles.card}>
          <HeartHandshake />
          <h3>Compromiso</h3>
          <p>
            Buscamos generar confianza con quienes nos eligen, ofreciendo
            transparencia y cercanía directa.
          </p>
        </div>

      </section>
    </main>
  )
}