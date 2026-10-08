'use client'

import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'

export default function BackButton() {
  const router = useRouter()
  const pathname = usePathname()

  // 🚫 En la Home principal no se muestra
  if (!pathname || pathname === '/') return null

  // Calculamos los niveles de profundidad según la URL
  // Ej: "/ferias" ➔ ["ferias"] (Nivel 1)
  // Ej: "/blog/ferias_fechas" ➔ ["blog", "ferias_fechas"] (Nivel 2)
  const segments = pathname.split('/').filter(Boolean)
  const depth = segments.length // 1, 2, 3...

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  const handleGoHome = () => {
    router.push('/')
  }

  return (
    <motion.aside
      aria-label="Navegación rápida de niveles"
      initial={{ opacity: 0, scale: 0.85, y: 25 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 25 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        bottom: '95px',
        left: '18px',
        zIndex: 200,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 14px',
        background: 'rgba(6, 79, 42, 0.85)',
        backdropFilter: 'blur(14px)',
        border: '1.5px solid rgba(134, 239, 172, 0.35)',
        borderRadius: '50px',
        boxShadow: '0 10px 28px rgba(0,0,0,0.4)',
        userSelect: 'none',
      }}
    >
      {/* =========================================================
          1. BOTÓN VOLVER 1 NIVEL ATRÁS (router.back)
      ========================================================= */}
      <motion.button
        type="button"
        onClick={handleBack}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        title="Volver un paso atrás"
        style={{
          background: 'rgba(255, 255, 255, 0.12)',
          border: 'none',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <ArrowLeft size={18} />
      </motion.button>

      {/* =========================================================
          2. LÍNEA DE PROGRESO DE NIVELES (BREADCRUMB VIVO)
      ========================================================= */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '0 4px',
        }}
      >
        {/* NODO 0: CASITA / HOME (SIEMPRE ACTIVA COMO BASE) */}
        <motion.button
          type="button"
          onClick={handleGoHome}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          title="Ir al Inicio"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#86efac',
            cursor: 'pointer',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Home size={17} />
        </motion.button>

        {/* LÍNEA CONECTORA 1 */}
        <span
          style={{
            width: '12px',
            height: '2px',
            background: depth >= 1 ? '#86efac' : 'rgba(255,255,255,0.25)',
            borderRadius: '2px',
            transition: 'background 0.3s ease',
          }}
        />

        {/* NODO NIVEL 1 */}
        <span
          title={segments[0] || 'Sección'}
          style={{
            width: depth === 1 ? '10px' : '7px',
            height: depth === 1 ? '10px' : '7px',
            borderRadius: '50%',
            background: depth >= 1 ? '#86efac' : 'rgba(255,255,255,0.3)',
            boxShadow: depth === 1 ? '0 0 8px #86efac' : 'none',
            transition: 'all 0.3s ease',
            display: 'inline-block',
          }}
        />

        {/* SI ESTAMOS EN NIVEL 2 O MÁS (Ej: /blog/ferias_fechas) */}
        {depth >= 2 && (
          <>
            {/* LÍNEA CONECTORA 2 */}
            <span
              style={{
                width: '12px',
                height: '2px',
                background: '#86efac',
                borderRadius: '2px',
              }}
            />

            {/* NODO NIVEL 2 (ACTIVO) */}
            <span
              title={segments[1] || 'Subsección'}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#fde047', // Destello ámbar activo
                boxShadow: '0 0 10px #fde047',
                transition: 'all 0.3s ease',
                display: 'inline-block',
              }}
            />
          </>
        )}
      </div>
    </motion.aside>
  )
}