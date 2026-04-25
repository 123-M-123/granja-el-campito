'use client'

import { useState } from 'react'
import styles from './ProductModal.module.css'
import { Producto } from '../data/productos'
import { useCartStore } from '../store/useCartStore'

type Props = {
  open: boolean
  producto: Producto | null
  onClose: () => void
}

export default function ProductModal({
  open,
  producto,
  onClose,
}: Props) {
  const [envio, setEnvio] = useState(0)
  const { addToCart } = useCartStore()

  if (!open || !producto) return null

  const total = producto.precioTransfer + envio

  const handleAdd = () => {
    addToCart(producto, envio) // ✅ CORRECTO
    onClose()
  }

  const telefono = '5492262557322'
  const mensaje = `Hola! Estoy comprando en la web-El Campito, quiero consultar por ${producto.nombre}. Precio: $${total}. Me pasas info para coordinar puntos de Retiro o ¿tenés disponibilidad para el envio? Gracias!`

  const whatsappUrl = `https://wa.me/${telefono}?text=${encodeURIComponent(
    mensaje
  )}`

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.title}>{producto.nombre}</h2>

        <img
          src={producto.imagen}
          alt={producto.nombre}
          className={styles.image}
        />

        <p className={styles.precioOriginal}>
          ${producto.precio}
        </p>

        <p className={styles.precioTransfer}>
          ${producto.precioTransfer}
        </p>

        <p className={styles.descuentoInfo}>
          10% OFF con transferencia (Alias MP)
        </p>

        <select
          className={styles.select}
          onChange={(e) => setEnvio(Number(e.target.value))}
        >
          <option value={0}>
            Consultar Retiro gratis por Puntos de Distribución
          </option>
          <option value={3000}>
            (Consultar) Envio | Zona 1 | Valor Estimado ($3.000)
          </option>
          <option value={5000}>
            (Consultar) Envio | Zona 2 | Valor Estimado($5.000)
          </option>
          <option value={7000}>
            (Consultar) Envio | Zona 3 | Valor Estimado ($7.000)
          </option>
          <option value={9000}>
            (Consultar) Envio | Zona 4 | Valor Estimado ($9.000)
          </option>
        </select>

        <p className={styles.total}>Total: ${total}</p>

        <button className={styles.pagar} onClick={handleAdd}>
          Agregar al carrito
        </button>

        <button className={styles.close} onClick={onClose}>
          ✕
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          className={styles.consultar}
        >
          <img
            src="/whats.png"
            alt="WhatsApp"
            className={styles.whatsappIcon}
          />
          CONSULTAR
        </a>
      </div>
    </div>
  )
}