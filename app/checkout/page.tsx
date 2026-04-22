'use client'

import { useRouter } from 'next/navigation'
import styles from './checkout.module.css'
import { useCart } from '../store/useCartStore'

export default function CheckoutPage() {
  const { items, total } = useCart()
  const router = useRouter()

  if (items.length === 0) {
    return <div className={styles.empty}>Carrito vacío</div>
  }

  return (
    <div className={styles.container}>
      <h1>Checkout</h1>

      <div>Total: ${total}</div>

      <button onClick={() => router.push('/cart')}>
        Volver al carrito
      </button>
    </div>
  )
}