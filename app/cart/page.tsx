'use client'

import { useRouter } from 'next/navigation'
import styles from './cart.module.css'
import { useCart } from '../store/useCart'

export default function CartPage() {
  const { items, total, removeFromCart, clearCart } = useCart()
  const router = useRouter()

  if (items.length === 0) {
    return <div className={styles.empty}>Carrito vacío</div>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tu carrito</h1>

      {items.map((item) => (
        <div key={item.producto.id} className={styles.item}>
          <img src={item.producto.imagen} className={styles.img} />

          <div className={styles.info}>
            <p>{item.producto.nombre}</p>
            <p>Cantidad: {item.cantidad}</p>
            <p>
              $ {item.producto.precio * item.cantidad + item.envio}
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

      <div className={styles.total}>
        Total: $ {total}
      </div>

      <div className={styles.actions}>
        <button onClick={clearCart} className={styles.clear}>
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