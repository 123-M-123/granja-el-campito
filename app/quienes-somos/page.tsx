'use client'

import { useState } from 'react'
import styles from './quienes.module.css'
import {
  Leaf,
  HeartHandshake,
  Sprout,
  Egg,
  Beef,
  Flower
} from 'lucide-react'

export default function QuienesSomos() {

  const [paused, setPaused] = useState(false)

  const contenido = (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>Quiénes Somos</h1>
        <p>Producción agroecológica, familiar y consciente</p>
      </section>

      {/* FILOSOFÍA */}
      <section className={styles.grid}>
        <div className={styles.card}>
          <Leaf />
          <h3>Nuestra filosofía</h3>
          <p>
            Trabajamos respetando la naturaleza, sin químicos ni procesos industriales,
            priorizando la calidad real del alimento.
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
            Buscamos generar confianza con quienes nos eligen,
            ofreciendo transparencia y cercanía directa.
          </p>
        </div>
      </section>

      {/* QUE PRODUCIMOS */}
      <section className={styles.section}>
        <h2>Qué producimos</h2>
      </section>

      {/* PRODUCTOS */}
      <section className={styles.gridProductos}>
        <div className={styles.card}>
          <Egg />
          <h3>Huevos de gallinas libres</h3>
          <p>
            Producción natural con alto valor nutricional,
            respetando el bienestar animal.
          </p>
        </div>

        <div className={styles.card}>
          <Flower />
          <h3>Miel y derivados</h3>
          <p>
            Miel pura, caramelos, polen y productos elaborados artesanalmente.
          </p>
        </div>

        <div className={styles.card}>
          <Beef />
          <h3>Corderos</h3>
          <p>
            Crianza responsable, alimentación natural y calidad real en cada producto.
          </p>
        </div>
      </section>

      {/* TEXTO EXTRA (👇 ahora en el lugar correcto) */}
      <section className={styles.section}>
        <p>
          También trabajamos con productos de estación y elaboraciones artesanales,
          respetando los tiempos naturales.
        </p>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2>¿Querés trabajar con nosotros?</h2>
        <p>
          Si tenés un comercio, sos revendedor o querés distribuir nuestros productos,
          podés solicitar nuestra lista.
        </p>

        <a
          href="https://wa.me/5492262557322?text=Hola!%20Soy%20de%20una%20localidad%20y%20quiero%20información%20para%20distribuir%20sus%20productos"
          target="_blank"
          className={styles.btn}
        >
          <img src="/whats.png" />
          PEDIR INFORMACIÓN
        </a>
      </section>
    </>
  )

  return (
    <main className={styles.page}>
      <div
        className={styles.scroller}
        onClick={() => setPaused(!paused)}
      >
        <div className={`${styles.track} ${paused ? styles.paused : ''}`}>
          {contenido}
          {contenido}
        </div>
      </div>
    </main>
  )
}