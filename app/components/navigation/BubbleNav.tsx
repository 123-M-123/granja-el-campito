'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const items = [
  { href: '/miel', label: 'Miel', size: 200, x: 0, y: -120 },
  { href: '/huevos', label: 'Huevos', size: 150, x: -120, y: 80 },
  { href: '/corderos', label: 'Corderos', size: 150, x: 120, y: 80 },
  { href: '/ferias', label: 'Ferias', size: 120, x: -80, y: 180 },
  { href: '/precios', label: 'Precios', size: 120, x: 80, y: 180 },
]

export default function BubbleNav() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [target, setTarget] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  // 👇 SOLO cuando movés el mouse
  useEffect(() => {
    let timeout: NodeJS.Timeout

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10
      const y = (e.clientY / window.innerHeight - 0.5) * 10

      setTarget({ x, y })
      setActive(true)

      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setActive(false) // 👈 se apaga si dejás de mover
      }, 100)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timeout)
    }
  }, [])

  // 👇 SUAVIZADO SOLO SI ESTÁ ACTIVO
  useEffect(() => {
    if (!active) return

    const interval = setInterval(() => {
      setOffset(prev => ({
        x: prev.x + (target.x - prev.x) * 0.08,
        y: prev.y + (target.y - prev.y) * 0.08,
      }))
    }, 16)

    return () => clearInterval(interval)
  }, [target, active])

  return (
    <div
      className="nav-container"
      style={{
        transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)`
      }}
    >
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
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${7 + Math.random() * 5}s`,
              }}
            >
              <img
                src={`/burbujas/${item.label.toLowerCase()}.png`}
                className="bubble-img"
              />
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}