'use client'

import { useState } from 'react'
import styles from './Header.module.css'
import { useCartStore } from '../store/useCartStore'
import CartModal from './CartModal'
import CintillaAviso from './CintillaAviso' // 👈 1. Importamos la cintilla acá

export default function Header() {
  const { items } = useCartStore()
  const [openCart, setOpenCart] = useState(false)

  const totalItems = items.reduce(
    (acc, item) => acc + item.cantidad,
    0
  )

  return (
    <>
      {/* 
        📦 CONTENEDOR FIJO MAESTRO:
        Agrupa la Cintilla arriba y la Barra Verde abajo como un solo bloque.
        Al scrollear, bajan juntos y nunca se superponen.
      */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* 📢 1. La Cintilla va primero arriba de todo */}
        <CintillaAviso />

        {/* 🟢 2. La barra verde de siempre va pegada debajo */}
        <header 
          className={styles.header} 
          style={{ position: 'relative', top: 'auto' }}
        >
          {/* IZQUIERDA */}
          <div className={styles.left}>
            <a
              href="https://www.instagram.com/el_campito_agroecologico/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/icons/instagram.png" className={styles.icon} alt="Instagram" />
            </a>
          </div>

          {/* CENTRO */}
          <div className={styles.center}>
            <img src="/logo.png" className={styles.logo} alt="El Campito" />
          </div>

          {/* DERECHA */}
          <div className={styles.right}>
            <button
              className={styles.cart}
              onClick={() => setOpenCart(true)}
              aria-label="Ver carrito"
            >
              <img src="/icons/cart.png" className={styles.icon} alt="Carrito" />

              {totalItems > 0 && (
                <span className={styles.badge}>
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </header>
      </div>

      <CartModal
        open={openCart}
        onClose={() => setOpenCart(false)}
      />
    </>
  )
}