'use client'

import styles from './CartModal.module.css'
import { useCartStore } from '../store/useCartStore'
import { useRouter } from 'next/navigation'


type Props = {
  open: boolean
  onClose: () => void
}

export default function CartModal({ open, onClose }: Props) {
  const router = useRouter()
  const {
    items,
    total,
    removeFromCart,
    clearCart,
    updateEnvio, // 🔥 NUEVO
  } = useCartStore()

  if (!open) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Tu carrito</h2>

          <button className={styles.close} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.list}>
          {items.map((item, index) => {
            const precioProducto =
              item.producto.precioTransfer * item.cantidad

            const subtotal = precioProducto + item.envio

            return (
              <div
                key={`${item.producto.id}-${item.envio}-${index}`}
                className={styles.card}
              >
                <img
                  src={item.producto.imagen}
                  className={styles.img}
                />

                <div className={styles.info}>
                  <p className={styles.name}>
                    {item.producto.nombre}
                  </p>

                  <p className={styles.desc}>
                    Cant: {item.cantidad}
                  </p>

                  {/* PRODUCTO */}
                  <div className={styles.row}>
                    <span className={styles.productoLabel}>
                      Producto
                    </span>
                    <span className={styles.price}>
                      $ {precioProducto}
                    </span>
                  </div>

                  <div className={styles.divider} />

                  {/* 🔥 ENVÍO DINÁMICO */}
                  <div className={styles.row}>
                    <span className={styles.envioLabel}>
                      Envío
                    </span>

                    <select
                      value={item.envio}
                      onChange={(e) =>
                        updateEnvio(
                          item.producto.id,
                          item.envio,
                          Number(e.target.value)
                        )
                      }
                    >
                      <option value={0}>Retiro</option>
                      <option value={3000}>Zona 1</option>
                      <option value={5000}>Zona 2</option>
                      <option value={7000}>Zona 3</option>
                      <option value={9000}>Zona 4</option>
                    </select>
                  </div>

                  <div className={styles.divider} />

                  {/* SUBTOTAL */}
                  <div className={styles.subtotalRow}>
                    <span className={styles.subtotalLabel}>
                      Subtotal
                    </span>
                    <span className={styles.subtotal}>
                      $ {subtotal}
                    </span>
                  </div>
                </div>

                <button
                  className={styles.remove}
                  onClick={() =>
                    removeFromCart(item.producto.id, item.envio)
                  }
                >
                  ✕
                </button>
              </div>
            )
          })}
        </div>

        <div className={styles.footer}>
          <div className={styles.total}>
            Total: $ {total}
          </div>

          <div className={styles.actions}>
            <button className={styles.clear} onClick={clearCart}>
              Vaciar
            </button>

            <button
  className={styles.buy}
  onClick={() => router.push('/checkout')}
>
  Comprar
</button>
          </div>
        </div>
      </div>
    </div>
  )
}