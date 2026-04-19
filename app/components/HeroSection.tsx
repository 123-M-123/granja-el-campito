'use client'

import BubbleNav from './navigation/BubbleNav'

export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 'calc(100vh - 110px)',
        paddingTop: '-5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <div style={{ zIndex: 2 }}>
        <p style={{ opacity: 0.8 }}>Producción Familiar Artesanal</p>

        <h1 style={{ fontSize: '28px', fontWeight: 800 }}>
          Entra ya a Nuestras Esferas de Producción
        </h1>

        <p style={{ fontSize: '14px', opacity: 0.9 }}>
          Y enterate de todo lo que hacemos        </p>
      </div>

      <BubbleNav />
    </section>
  )
}