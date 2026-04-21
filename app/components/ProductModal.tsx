'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './ProductModal.module.css'
import { addToCart } from '../store/cart'

type Producto = {
  id: string
  nombre: string
  precio: number
  precioTransfer: number
  imagen: string
}

type Props = {
  open: boolean
  producto: Producto | null
  onClose: () => void
}

export default function ProductModal({ open, producto, onClose }: Props) {
  const [envio, setEnvio] = useState(0)
  const router = useRouter()

  if (!open || !producto) return null

  const total = producto.precio + envio

  const handleConsultar = () => {
    const mensaje = `Hola! Quiero ${producto.nombre}.\nTotal: $${total} comprado desde la web El Campito`
    const url = `https://wa.me/5492262557322?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
  }

  const handlePagar = () => {
 addToCart(producto, envio)
console.log('AGREGADO AL CARRITO')
window.location.href = '/cart'
}
console.log('ENVIO:', envio, typeof envio)
console.log('PRODUCTO:', producto)

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>

        <img
          src={producto.imagen}
          alt={producto.nombre}
          className={styles.image}
        />

        <h2 className={styles.title}>{producto.nombre}</h2>

        <p className={styles.precioTransfer}>
          ${producto.precio}
        </p>

        <p className={styles.descuentoInfo}>
          10% OFF pagando por transferencia
        </p>

        {/* SELECT ENVÍO */}
        <select
  className={styles.select}
  onChange={(e) => {
    const value = Number(e.target.value)
    console.log('SELECT ENVIO:', value)
    setEnvio(value)
  }}
>
  <option value={0}>Retiro gratis</option>
  <option value={3000}>Zona 1 ($3000)</option>
  <option value={5000}>Zona 2 ($5000)</option>
  <option value={7000}>Zona 3 ($7000)</option>
  <option value={9000}>Zona 4 ($9000)</option>
</select>

        {/* TOTAL */}
        <div className={styles.total}>
          Total: ${total}
        </div>

        {/* BOTONES */}
        <div className={styles.actions}>
          <button className={styles.consultar} onClick={handleConsultar}>
            <img src="/whats.png" alt="WhatsApp" />
            Consultar
          </button>

          <button
  className={styles.pay}
  onClick={() => {
    console.log('CLICK FUNCIONA')
    addToCart(producto, envio)
    window.location.href = '/cart'
  }}
>
  Continuar / Pagar
</button>
        </div>
      </div>
    </div>
  )
}