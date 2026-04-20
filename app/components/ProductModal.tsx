'use client'

import { useState } from 'react'
import styles from './ProductModal.module.css'

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

  if (!open || !producto) return null

  const total = producto.precioTransfer + envio

  const handleConsultar = () => {
    const mensaje = `Hola! Quiero ${producto.nombre}.\nTotal: $${total} comprado desde la web El Campito`
    const url = `https://wa.me/5492262557322?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
  }

  const handlePagar = () => {
    // placeholder para integrar carrito / pago después
    console.log('Ir a pagar:', {
      producto,
      envio,
      total,
    })
  }

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

        <p className={styles.precioOriginal}>
          ${producto.precio}
        </p>

        <p className={styles.precioTransfer}>
          ${producto.precioTransfer}
        </p>

        {/* SELECT ENVÍO */}
        <select
          className={styles.select}
          onChange={(e) => setEnvio(Number(e.target.value))}
          defaultValue="0"
        >
          <option value="0">Retiro desde puntos de distribución (Gratis)</option>
          <option value="3000">Envio Zona 1 - $3000</option>
          <option value="5000">Envio Zona 2 - $5000</option>
          <option value="7000">Envio Zona 3 - $7000</option>
          <option value="9000">Envio Zona 4 - $9000</option>
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

          <button className={styles.pagar} onClick={handlePagar}>
            Continuar / Pagar
          </button>
        </div>
      </div>
    </div>
  )
}