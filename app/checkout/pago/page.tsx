'use client'

import { useEffect, useRef, useState } from 'react'
import { useCart } from '../../store/useCartStore'
import { useRouter } from 'next/navigation'

declare global {
  interface Window {
    MercadoPago: any
  }
}

export default function PagoPage() {
  const { items, total } = useCart()
  const router = useRouter()

  const brickContainer = useRef<HTMLDivElement>(null)
  const brickRendered = useRef(false)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  if (items.length === 0) {
    return <div style={{ padding: 20 }}>Carrito vacío</div>
  }

  const producto = items[0] // simplificado
  const precio = total

  useEffect(() => {
    if (brickRendered.current) return
    brickRendered.current = true

    const init = async () => {
      try {
        const res = await fetch('/api/create-preference', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
  metodo: 'tarjeta', // 👈 por ahora fijo
  items: items.map((item) => ({
    title: item.producto.nombre,
    price: item.producto.precio,
    quantity: item.cantidad,
  })),
})
})

const data = await res.json()

if (!res.ok) throw new Error(data.error)
        const preferenceId = data.id

        const script = document.createElement('script')
        script.src = 'https://sdk.mercadopago.com/js/v2'
        script.async = true
        document.body.appendChild(script)

        script.onload = async () => {
          const mp = new window.MercadoPago(
            process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!,
            { locale: 'es-AR' }
          )

          const bricksBuilder = mp.bricks()

          await bricksBuilder.create('payment', 'payment-brick-container', {
            initialization: {
              amount: precio,
              preferenceId,
            },
            callbacks: {
              onReady: () => setLoading(false),
              onSubmit: async ({ formData }: any) => {
                const result = await fetch('/api/process-payment', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(formData),
                })

                const payment = await result.json()

                if (payment.status === 'approved') {
                  router.push('/success')
                } else if (
                  payment.status === 'pending' ||
                  payment.status === 'in_process'
                ) {
                  router.push('/pending')
                } else {
                  router.push('/failure')
                }
              },
              onError: (err: any) => {
                console.error(err)
                setError('Error en el pago')
              },
            },
          })
        }
      } catch (err: any) {
        setError(err.message)
        setLoading(false)
      }
    }

    init()
  }, [])

  return (
    <div style={{ maxWidth: 420, margin: 'auto', padding: 20 }}>
      <h2>Pago</h2>

      <p>{producto.producto.nombre}</p>
      <p style={{ fontWeight: 'bold' }}>${precio}</p>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div id="payment-brick-container" ref={brickContainer} />
    </div>
  )
}