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

const desktopItems: Item[] = [
  { href: '/quienes-somos', label: 'logo', x: 50, y: 30, size: 250, delay: 0 },
  { href: '/miel', label: 'miel', x: 50, y: 65, size: 220, delay: 1 },
  { href: '/huevos', label: 'huevos', x: 25, y: 60, size: 150, delay: 2 },
  { href: '/corderos', label: 'corderos', x: 75, y: 40, size: 135, delay: 1.5 },
  { href: '/ferias', label: 'ferias', x: 20, y: 45, size: 175, delay: 0.5 },
  { href: '/precios', label: 'precios', x: 60, y: 70, size: 160, delay: 2.5 },
  { href: '/envios', label: 'envios', x: 35, y: 62, size: 70, delay: 3.5 },
  { href: '/wp', label: 'wp', x: 35, y: 62, size: 70, delay: 5 },
]

const mobileItems: Item[] = [
  { href: '/quienes-somos', label: 'logo', x: 50, y: 19, size: 240, delay: 0 },
  { href: '/miel', label: 'miel', x: 75, y: 59, size: 225, delay: 1 },
  { href: '/huevos', label: 'huevos', x: 25, y: 87, size: 150, delay: 2 },
  { href: '/corderos', label: 'corderos', x: 80, y: 78, size: 135, delay: 1.5 },
  { href: '/ferias', label: 'ferias', x: 21, y: 61, size: 175, delay: 0.5 },
  { href: '/precios', label: 'precios', x: 45, y: 76, size: 160, delay: 2.5 },
  { href: '/envios', label: 'envios', x: 78, y: 90, size: 140, delay: 3.5 },
  { href: '/wp', label: 'wp', x: 52, y: 89, size: 90, delay: 5 },
]

export default function BubbleNav() {
  const [items, setItems] = useState<Item[]>(desktopItems)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) {
        setItems(mobileItems)
      } else {
        setItems(desktopItems)
      }
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

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
          25% { transform: translate(-50%, -50%) translate(6px, -10px); }
          50% { transform: translate(-50%, -50%) translate(-6px, -14px); }
          75% { transform: translate(-50%, -50%) translate(4px, -8px); }
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
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        )

        // 👉 WHATSAPP
        if (isWhatsapp) {
          return (
            <a
              key={i}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={commonStyles}
            >
              {img}
            </a>
          )
        }

        // 👉 LINKS NORMALES
        return (
          <Link key={i} href={item.href} style={commonStyles}>
            {img}
          </Link>
        )
      })}
    </div>
  )
}