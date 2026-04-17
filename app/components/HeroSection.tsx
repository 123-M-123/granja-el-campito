'use client'

import Bubbles from '@/app/components/effects/Bubbles'
import BubbleNav from '@/app/components/navigation/BubbleNav'

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#009245] flex items-center justify-center">
      
      {/* 🌿 Fondo animado */}
      <Bubbles />

      {/* 🧭 Navegación en burbujas */}
      <div className="relative z-10 w-full">
        <BubbleNav />
      </div>

      {/* 🏷️ Título */}
      <div className="absolute top-10 w-full text-center z-10 text-white">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
          Granja Agroecológica
        </h1>
        <p className="text-lg italic opacity-90">
          Producción Familiar Artesanal
        </p>
      </div>

    </section>
  )
}