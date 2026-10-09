'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Item = {
  href: string
  label: string
  x: number
  y: number
  size: number
  delay: number
}

// =========================================================================
// 🖥️ ITEMS DE ESCRITORIO (INTACTO - NO SE MODIFICA EN ABSOLUTO)
// =========================================================================
const desktopItems: Item[] = [
  { href: '/quienes-somos', label: 'logo', x: 50, y: -10, size: 250, delay: 0 },
  { href: '/miel', label: 'miel', x: 78, y: -10, size: 240, delay: 1 },
  { href: '/huevos', label: 'huevos', x: 20, y: 25, size: 130, delay: 2 },
  { href: '/corderos', label: 'corderos', x: 73, y: 30, size: 150, delay: 1.5 },
  // 📰 NUEVA BURBUJA BLOG (Entre corderos x:73 y el margen derecho x:100)
  { href: '/blog', label: 'blog', x: 88, y: 28, size: 110, delay: 2.2 },
  { href: '/ferias', label: 'ferias', x: 20, y: -5, size: 225, delay: 0.5 },
  { href: '/precios', label: 'precios', x: 35, y: 10, size: 160, delay: 2.5 },
  { href: '/envios', label: 'envios', x: 65, y: 5, size: 150, delay: 3.5 },
  { href: '/wp', label: 'wp', x: 27, y: 30, size: 80, delay: 5 },
]

// =========================================================================
// 📱 ITEMS MÓVILES (REACOMODADOS HACIA EL ESPACIO LIBRE INFERIOR)
//
// Distribución Milimétrica:
// 1. Logo (y: 19%): Libre del header, con margen superior limpio.
// 2. Franja de Texto (y: 32% a 48%): Libre de cualquier burbuja invasora.
// 3. Constelación de Burbujas (y: 60% a 90%): Ocupa el tercio inferior verde
//    que antes quedaba desaprovechado.
// =========================================================================
const mobileItems: Item[] = [
  // 1. Logo principal (204px) - Baja de y:11 a y:19 para despegarse del header
  { href: '/quienes-somos', label: 'logo', x: 50, y: 22, size: 204, delay: 0 },

  // --- FRANJA MEDIA TOTALMENTE LIMPIA PARA EL TEXTO DEL HERO ---

  // 2. Miel Envasada (191px) - Se corre a y:60 para no pisar el texto
  { href: '/miel', label: 'miel', x: 77, y: 72, size: 191, delay: 1 },

  // 3. Ferias Regionales (158px) - Se corre a y:62 debajo del texto
  { href: '/ferias', label: 'ferias', x: 22, y: 74, size: 158, delay: 0.5 },

  // 4. Lista de Precios 2026 (136px) - Centro dominante en y:73
  { href: '/precios', label: 'precios', x: 49, y: 85, size: 136, delay: 2.5 },

  // 5. Blog Rural (76px) - Lateral izquierdo en y:76
  { href: '/blog', label: 'blog', x: 14, y: 88, size: 76, delay: 1.8 },

  // 6. Corderos (98px) - Lateral derecho en y:76
  { href: '/corderos', label: 'corderos', x: 84, y: 88, size: 98, delay: 1.5 },

  // 7. Gallinas Libres / Huevos (102px) - Base izquierda en y:89
  { href: '/huevos', label: 'huevos', x: 24, y: 101, size: 102, delay: 2 },

  // 8. Botón WhatsApp Oficial (76px) - Base centro en y:89
  { href: '/wp', label: 'wp', x: 50, y: 101, size: 76, delay: 5 },

  // 9. Puntos de Distribución / Envíos (85px) - Base derecha en y:90
  { href: '/envios', label: 'envios', x: 78, y: 102, size: 85, delay: 3.5 },
]

export default function BubbleNav() {
  const [items, setItems] = useState<Item[]>(desktopItems)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) {
        setItems(mobileItems)
      } else {
        setItems(desktopItems)
      }
    }

    update()
    setMounted(true)

    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  if (!mounted) return null

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
      }}
    >
      <style>{`
        @keyframes floatSoft {
          0% { transform: translate(-50%, -50%) translate(0px, 0px); }
          25% { transform: translate(-50%, -50%) translate(5px, -8px); }
          50% { transform: translate(-50%, -50%) translate(-5px, -11px); }
          75% { transform: translate(-50%, -50%) translate(3px, -6px); }
          100% { transform: translate(-50%, -50%) translate(0px, 0px); }
        }
      `}</style>

      {items.map((item, i) => {
        const isWhatsapp = item.label === 'wp'

        const telefono = '5492262557322'
        const mensaje =
          'Hola! Estoy viendo la web de El Campito y quiero consultar info'

        const whatsappUrl = `https://wa.me/${telefono}?text=${encodeURIComponent(
          mensaje
        )}`

        const commonStyles = {
          position: 'absolute' as const,
          left: `${item.x}%`,
          top: `${item.y}%`,
          transform: 'translate(-50%, -50%)',
          width: item.size,
          height: item.size,
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'block',
          boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
          animation: `floatSoft 6s ease-in-out infinite`,
          animationDelay: `${item.delay}s`,
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        }

        const img = (
          <img
            src={
              item.label === 'logo'
                ? '/logo-b.png'
                : `/burbujas/${item.label}.png`
            }
            alt={item.label}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        )

        if (isWhatsapp) {
          return (
            <a
              key={i}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'click_whatsapp', {
                    event_category: 'engagement',
                    event_label: 'bubble_nav',
                  })
                }
              }}
              style={commonStyles}
            >
              {img}
            </a>
          )
        }

        return (
          <Link key={i} href={item.href} style={commonStyles}>
            {img}
          </Link>
        )
      })}
    </div>
  )
}