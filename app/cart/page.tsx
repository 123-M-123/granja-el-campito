'use client'

import { useRouter } from 'next/navigation'
import styles from './cart.module.css'
import { useCartStore } from '../store/useCartStore'

export default function CartPage() {
  const { items, total, removeFromCart, clearCart } = useCartStore()
  const router = useRouter()

  console.log('CART ITEMS:', items)

  if (items.length === 0) {
    return <div className={styles.empty}>Carrito vacío</div>
  }
<h1 style={{ color: 'red' }}>CART PAGE REAL</h1>
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tu carrito</h1>

      {items.map((item, index) => {
        console.log('ITEM:', item)

        const precioProducto =
          item.producto.precioTransfer * item.cantidad

        const subtotal = precioProducto + item.envio

        return (
          <div
            key={`${item.producto.id}-${index}`}
            className={styles.item}
          >
            <img
              src={item.producto.imagen}
              className={styles.img}
            />

            <div className={styles.info}>
              <p className={styles.name}>
                {item.producto.nombre}
              </p>

              <p>Cantidad: {item.cantidad}</p>

              {/* PRECIO PRODUCTO */}
              <p className={styles.price}>
                Producto: $ {precioProducto}
              </p>

              {/* ENVÍO */}
              {item.envio > 0 && (
                <p className={styles.envio}>
                  Envío: $ {item.envio}
                </p>
              )}

              {/* SUBTOTAL */}
              <p className={styles.subtotal}>
                Subtotal: $ {subtotal}
              </p>
            </div>

            <button
              className={styles.remove}
             onClick={() => removeFromCart(item.producto.id, item.envio)}
            >
              ✕
            </button>
          </div>
        )
      })}

      <div className={styles.total}>
        Total: $ {total}
      </div>

      <div className={styles.actions}>
        <button
          onClick={clearCart}
          className={styles.clear}
        >
          Vaciar carrito
        </button>

        <button
          onClick={() => router.push('/checkout')}
          className={styles.checkout}
        >
          Continuar compra
        </button>
      </div>
    </div>
  )
}