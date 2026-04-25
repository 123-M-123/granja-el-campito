'use client'

import { useState, useEffect } from 'react'
import styles from './miel.module.css'
import ProductModal from '../components/ProductModal'
import { Producto, productos } from '../data/productos'

export default function Miel() {
  const [selected, setSelected] = useState<Producto | null>(null)

  const handleClick = (id: string) => {
    const prod = productos.find(p => p.id === id)
    if (prod) setSelected(prod)
  }
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

if (!mounted) return null

  return (
    <main className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>
        <h1>Nuestra Miel</h1>
        <p>Productos naturales, puros y elaborados en la granja</p>
      </section>

      {/* 1. MIEL ENVASADA */}
      <section className={styles.section}>
        <h2>Miel Envasada</h2>

        <div className={styles.bubbles}>
          {[
            { id: "miel-2kg", nombre: "2KG", img: "/products/miel-2kg.png" },
            { id: "miel-1kg", nombre: "1KG", img: "/products/miel-1kg.png" },
            { id: "miel-500", nombre: "1/2KG", img: "/products/miel-500.png" }
          ].map((item) => (
            <div 
              key={item.id}
              className={styles.bubble}
              onClick={() => handleClick(item.id)}
            >
              <img src={item.img} alt={item.nombre} />
              <span>{item.nombre}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. CARAMELOS */}
      <section className={styles.section}>
        <h2>Caramelos de Miel</h2>

        <div className={styles.bubbles}>
          {[1,2,3,4,5,6,7].map((v) => (
            <div 
              key={v}
              className={styles.bubble}
              onClick={() => handleClick(`caramelo-${v}`)}
            >
              <img src={`/products/caramelo-${v}.png`} alt={`V${v}`} />
              <span>V{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. EXTRAS */}
      <section className={styles.section}>
        <h2>Otros Productos</h2>

        <div className={styles.bubbles}>
          {[
            { id: "polen", nombre: "Polen", img: "/products/polen.png" },
            { id: "tintura", nombre: "Tintura", img: "/products/tintura.png" },
            { id: "panal", nombre: "Panal", img: "/products/panal.png" }
          ].map((item) => (
            <div 
              key={item.id}
              className={styles.bubble}
              onClick={() => handleClick(item.id)}
            >
              <img src={item.img} alt={item.nombre} />
              <span>{item.nombre}</span>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      <ProductModal
        open={!!selected}
        producto={selected}
        onClose={() => setSelected(null)}
      />

    </main>
  )
}