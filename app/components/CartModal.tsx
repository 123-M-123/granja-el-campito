'use client'

import styles from './CartModal.module.css'
import { useCart } from '../store/useCartStore'

type Props = {
  open: boolean
  onClose: () => void
}

export default function CartModal({ open, onClose }: Props) {
  const { items, total, removeFromCart, clearCart } = useCart()

  if (!open) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // 👈 evita cierre interno
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Tu carrito</h2>

          <button className={styles.close} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.list}>
          {items.map((item) => (
            <div key={item.producto.id} className={styles.card}>
              <img
                src={item.producto.imagen}
                className={styles.img}
              />

              <div className={styles.info}>
                <p className={styles.name}>{item.producto.nombre}</p>
                <p className={styles.desc}>Cant: {item.cantidad}</p>
                <p className={styles.price}>
                  $ {item.producto.precio * item.cantidad}
                </p>
              </div>

              <button
                className={styles.remove}
                onClick={() => removeFromCart(item.producto.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.total}>
            Total: $ {total}
          </div>

          <div className={styles.actions}>
            <button className={styles.clear} onClick={clearCart}>
              Vaciar
            </button>

            <button className={styles.buy}>
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}