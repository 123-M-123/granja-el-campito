import { NextRequest, NextResponse } from 'next/server'
import { savePaymentToMaster } from '@/lib/googleSheets' // 👈 Usamos el nuevo motor JSON

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('🔔 Webhook Recibido en El Campito:', body)

    // Solo procesamos avisos de pago
    if (body.type !== 'payment') {
      return NextResponse.json({ status: 'ignored' }, { status: 200 })
    }

    const paymentId = body.data?.id
    if (!paymentId) {
      return NextResponse.json({ status: 'no payment id' }, { status: 200 })
    }

    // Consultar detalle a Mercado Pago
    // Usamos el token de MP que ya tenés en las variables de entorno
    const mpRes = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      { headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` } }
    )
    
    if (!mpRes.ok) {
        console.error("Error al consultar MP:", await mpRes.text())
        return NextResponse.json({ status: 'error mp' }, { status: 200 })
    }

    const pago = await mpRes.json()

    // Solo registrar si está aprobado
    if (pago.status !== 'approved') {
      return NextResponse.json({ status: 'not approved' }, { status: 200 })
    }

    const fecha = new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires'
    })

    // Capturamos el mail del vendedor (external_reference o metadata)
    const emailVendedor = pago.metadata?.vendedor || pago.external_reference || 'elianamarti90@gmail.com'

    // 📊 Armamos la fila para las 7 columnas de la Maestra (webhoock MP)
    const fila = [
      emailVendedor,                       // Col A: Vendedor
      fecha,                               // Col B: Fecha
      pago.description || 'Compra Online', // Col C: Producto
      pago.transaction_amount || 0,        // Col D: Precio
      'PAGADO',                            // Col E: Estado
      paymentId.toString(),                // Col F: ID Pago / Comprobante
      pago.payment_method_id               // Col G: Notas / Método
    ]

    // 🚀 GUARDADO SEGURO: Usamos la cuenta de servicio (JSON)
    await savePaymentToMaster(fila)

    console.log('✅ Venta registrada en Maestra para El Campito:', emailVendedor)
    return NextResponse.json({ status: 'ok' }, { status: 200 })

  } catch (error: any) {
    console.error('Error en webhook El Campito:', error.message)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}