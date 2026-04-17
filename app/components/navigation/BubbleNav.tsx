'use client'

import Link from 'next/link'

const items = [
  { href: '/miel', label: 'Miel', size: 200, x: 0, y: -120 },
  { href: '/huevos', label: 'Huevos', size: 150, x: -120, y: 80 },
  { href: '/corderos', label: 'Corderos', size: 150, x: 120, y: 80 },
  { href: '/ferias', label: 'Ferias', size: 120, x: -80, y: 180 },
  { href: '/precios', label: 'Precios', size: 120, x: 80, y: 180 },
]

export default function BubbleNav() {
  return (
    <div className="nav-container">
      {items.map((item, i) => (
        
        <div
          key={i}
          className="bubble-link"
          style={{
            transform: `translate(${item.x}px, ${item.y}px)`
          }}
        >
          <Link href={item.href}>
            <div
              className="bubble-nav"
              style={{
                width: item.size,
                height: item.size,
                animationDelay: `${i * 0.6}s`,
              }}
            >
              <img src={`/burbujas/${item.label.toLowerCase()}.png`} />
              <span>{item.label}</span>
            </div>
          </Link>
        </div>

      ))}
    </div>
  )
}