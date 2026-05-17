import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    // 📧 Mail de Eliana para El Campito
    const vendedorEmail = "elianamarti90@gmail.com";

    // "Limpiamos" el objeto para que MP no reciba campos desconocidos
    const { vendedorEmail: _, ...datosLimpios } = formData;

    const response = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        'X-Idempotency-Key': crypto.randomUUID(),
      },
      body: JSON.stringify({ 
        ...datosLimpios, 
        external_reference: vendedorEmail, // 👈 Identificador para la Maestra
        metadata: {
          vendedor: vendedorEmail // 👈 Respaldo en metadata
        },
        differential_pricing_id: undefined 
      }),
    });

    const data = await response.json();

    if (response.ok && data.status === 'approved') {
      // Notificamos a nuestro propio webhook para que grabe en la Maestra
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/webhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'payment', data: { id: data.id } })
      });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error procesando pago El Campito:', error.message);
    return NextResponse.json({ error: 'Error procesando el pago' }, { status: 500 });
  }
}