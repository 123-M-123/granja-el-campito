import { NextResponse } from 'next/server'

const SHEET_ID      = process.env.GOOGLE_SHEET_ID!
const CLIENT_ID     = process.env.GOOGLE_CLIENT_ID!
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN!
const ACCESS_TOKEN  = process.env.MP_ACCESS_TOKEN!

async function getAccessToken() {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  })

  const data = await res.json()
  if (!data.access_token) throw new Error('No se pudo obtener access token')
  return data.access_token
}

async function agregarEnSheet(token: string, fila: any[]) {
  const range = 'webhoock MP!A:F'

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [fila],
      }),
    }
  )
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (body.type !== 'payment') {
      return NextResponse.json({ status: 'ignored' }, { status: 200 })
    }

    const paymentId = body.data?.id
    if (!paymentId) {
      return NextResponse.json({ status: 'no payment id' }, { status: 200 })
    }

    const mpRes = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    )

    const pago = await mpRes.json()

    if (pago.status !== 'approved') {
      return NextResponse.json({ status: 'not approved' }, { status: 200 })
    }

    // 🔥 PARSE external_reference (CLAVE)
    let ref: any = {}
    try {
      ref = JSON.parse(pago.external_reference)
    } catch {
      ref = {}
    }

    const fecha = new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires',
    })

    const fila = [
      fecha,
      ref.productos || pago.description || 'Pedido',
      pago.transaction_amount || '',
      'PAGADO',
      pago.id, // comprobante = ID MP
      ref.cliente || pago.payer?.email || '',
    ]

    const token = await getAccessToken()
    await agregarEnSheet(token, fila)

    console.log('Pago registrado en Sheet:', paymentId)

    return NextResponse.json({ status: 'ok' }, { status: 200 })
  } catch (error) {
    console.error('Error en webhook:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}