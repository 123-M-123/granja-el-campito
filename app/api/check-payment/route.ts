import { NextResponse } from 'next/server'

const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN!

export async function GET() {
  try {
    const res = await fetch(
      'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&limit=1',
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    )

    const data = await res.json()

    const payment = data.results?.[0]

    if (payment?.status === 'approved') {
      return NextResponse.json({ paid: true })
    }

    return NextResponse.json({ paid: false })
  } catch (error) {
    return NextResponse.json({ paid: false })
  }
}