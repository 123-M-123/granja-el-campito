'use client'

import { useRouter, usePathname } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()
  const pathname = usePathname()

  // 🚫 NO mostrar en HOME
  if (pathname === '/') return null

  const handleBack = () => {
    // 🔥 FIX CLAVE:
    // si no hay historial → ir al home en vez de romper
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <button
      onClick={handleBack}
      style={{
        position: 'fixed',
        bottom: '30px',
        left: '20px',
        zIndex: 200,
        background: '#0f3d2e',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        fontSize: '40px',
        cursor: 'pointer',
        boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
      }}
    >
      ⟵
    </button>
  )
}