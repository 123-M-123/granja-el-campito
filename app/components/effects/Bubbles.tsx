// components/effects/Bubbles.tsx
'use client'

import { useMemo } from 'react'

export default function Bubbles() {
  const bubbles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 120 + 60,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 20 + Math.random() * 20,
    }))
  }, [])

  return (
    <div className="bubbles-container">
      {bubbles.map(b => (
        <div
          key={b.id}
          className="bubble"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
    </div>
  )
}