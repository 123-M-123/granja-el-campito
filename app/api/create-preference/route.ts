import { NextResponse } from 'next/server'
import MercadoPagoConfig, { Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const metodo = body.metodo

    const items = body.items.map((item: any) => {
      let price = Number(item.price)

      // 🔥 DESCUENTO SOLO SI TRANSFERENCIA
      if (metodo === 'transferencia') {
        price = Math.round(price * 0.9)
      }

      return {
        title: item.title,
        unit_price: price,
        quantity: Number(item.quantity),
      }
    })

    const preference = new Preference(client)

    const result = await preference.create({
      body: {
        items,
      },
    })

    return NextResponse.json({ id: result.id })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      { error: 'Error creando preferencia' },
      { status: 500 }
    )
  }
}