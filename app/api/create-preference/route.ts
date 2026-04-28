import { NextResponse } from 'next/server'
import MercadoPagoConfig, { Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const metodo = body.metodo || 'tarjeta'

    let items = []

    // ✅ Si viene carrito real
    if (body.items && Array.isArray(body.items)) {
      items = body.items.map((item: any) => {
        let price = Number(item.price)

        if (metodo === 'transferencia' || metodo === 'alias') {
          price = Math.round(price * 0.9)
        }

        return {
          title: item.title,
          unit_price: price,
          quantity: Number(item.quantity),
          currency_id: 'ARS',
        }
      })
    }

    // ✅ Si viene formato simple desde Bricks actual
    else {
      let price = Number(body.price)

      if (metodo === 'transferencia' || metodo === 'alias') {
        price = Math.round(price * 0.9)
      }

      items = [
        {
          title: body.title || 'Compra',
          unit_price: price,
          quantity: Number(body.quantity || 1),
          currency_id: 'ARS',
        },
      ]
    }

    const preference = new Preference(client)

    const result = await preference.create({
      body: {
        items,
      },
    })

    return NextResponse.json({ id: result.id })
  } catch (error: any) {
    console.error('ERROR MP:', error)

    return NextResponse.json(
      { error: 'Error creando preferencia' },
      { status: 500 }
    )
  }
}