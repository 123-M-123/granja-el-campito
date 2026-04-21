'use client'

import { useRouter } from 'next/navigation'
import styles from './checkout.module.css'
import { useCart } from '../store/useCart'
import { generarQR } from '../utils/qr'

type Metodo = 'transferencia' | 'tarjeta' | 'cuenta_mp' | 'otros' | null

export default function CheckoutPage() {
  const { items, total, metodo, setMetodo } = useCart()
  const router = useRouter()

  if (items.length === 0) {
    return <div className={styles.empty}>Carrito vacío</div>
  }

  const producto = items[0]

  const totalFinal =
    metodo === 'transferencia' ? Math.round(total * 0.9) : total

  const qrUrl = generarQR({
    alias: 'alias.ejemplo.mp',
    monto: totalFinal,
  })

  const handlePagar = () => {
    if (metodo === 'tarjeta' || metodo === 'cuenta_mp') {
      router.push('/checkout/pago')
    }
  }

  return (
    <div className={styles.container}>
      {/* RESUMEN */}
      <div className={styles.card}>
        <p className={styles.label}>Finalizar compra</p>
        <h2 className={styles.title}>{producto.producto.nombre}</h2>
        <p className={styles.price}>$ {totalFinal}</p>
      </div>

      {/* MÉTODOS */}
      <p className={styles.subtitle}>Elegí cómo pagar</p>

      <div className={styles.grid}>
        <button
          className={`${styles.method} ${
            metodo === 'transferencia' ? styles.active : ''
          }`}
          onClick={() => setMetodo('transferencia')}
        >
          💸 Transferencia
          <span>10% OFF</span>
        </button>

        <button
          className={`${styles.method} ${
            metodo === 'tarjeta' ? styles.active : ''
          }`}
          onClick={() => setMetodo('tarjeta')}
        >
          💳 Tarjeta / Efectivo
        </button>

        <button
          className={`${styles.method} ${
            metodo === 'cuenta_mp' ? styles.active : ''
          }`}
          onClick={() => setMetodo('cuenta_mp')}
        >
          🟢 Cuenta MP
        </button>

        <button
          className={`${styles.method} ${
            metodo === 'otros' ? styles.active : ''
          }`}
          onClick={() => setMetodo('otros')}
        >
          📲 Otros
        </button>
      </div>

      {/* CONTENIDO DINÁMICO */}

      {/* TRANSFERENCIA */}
      {metodo === 'transferencia' && (
        <div className={styles.box}>
          <p className={styles.ok}>
            Pagando por transferencia obtenés descuento
          </p>

          <p className={styles.alias}>alias.ejemplo.mp</p>

          <input type="file" className={styles.file} />

          <button className={styles.confirm}>
            Confirmar pedido
          </button>
        </div>
      )}

      {/* MP */}
      {(metodo === 'tarjeta' || metodo === 'cuenta_mp') && (
        <div className={styles.box}>
          <p className={styles.mpTitle}>Pagá con MercadoPago</p>

          <button className={styles.pay} onClick={handlePagar}>
            Pagar
          </button>
        </div>
      )}

      {/* QR */}
      {metodo === 'otros' && (
        <div className={styles.box}>
          <p className={styles.qrTitle}>Escaneá para pagar</p>

          <img src={qrUrl} alt="QR pago" className={styles.qr} />

          <p className={styles.alias}>alias.ejemplo.mp</p>

          <p className={styles.monto}>Monto: $ {totalFinal}</p>
        </div>
      )}
    </div>
  )
}