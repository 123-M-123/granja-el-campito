'use client'
import { C } from '@/styles/colores'
// import { CarritoProvider, useCarrito } from './context/CarritoContext'
import Header from './components/Header'
import HeroSection from '@/app/components/HeroSection'

// import CarritoPanel from '@/app/components/CarritoPanel'
// import ModalImagen from '@/app/components/ModalImagen'

/*
function Toast() {
  const { notif } = useCarrito()
  if (!notif) return null
  return (
    <div style={{
      position: 'fixed', bottom: '1.5rem', left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999, display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: '0.4rem',
      animation: 'fadeIn 0.3s ease',
    }}>
      <div style={{
        background: C.naranja, color: C.white,
        padding: '0.65rem 1.5rem', borderRadius: 24,
        fontWeight: 700, fontSize: '0.9rem',
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        whiteSpace: 'nowrap',
      }}>
        🛒 {notif}
      </div>

      <div style={{
        background: C.vino, color: '#FFD700',
        padding: '0.5rem 1.25rem', borderRadius: 20,
        fontWeight: 800, fontSize: '0.75rem',
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        textAlign: 'center', letterSpacing: '0.03em',
      }}>
        ⚠️ ANTES DE PAGAR CONSULTÁ EL STOCK POR WHATSAPP
      </div>
    </div>
  )
}
*/



function AppContent() {
  return (
    <div className="app-content">
      
      <HeroSection />

      {/* TODO lo del carrito desactivado temporalmente */}
      {/* <CarritoPanel /> */}
      {/* <ModalImagen /> */}
      {/* <Toast /> */}

      
    </div>
  )
}

export default function Home() {
  return (
    <>
      {/* <CarritoProvider> */}
      <AppContent />
      {/* </CarritoProvider> */}
    </>
  )
}