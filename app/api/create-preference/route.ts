import { NextResponse } from 'next/server'
import MercadoPagoConfig, { Preference } from 'mercadopago'

/**
 * CREACIÓN DE PREFERENCIA DE CHECKOUT - GRANJA EL CAMPITO
 * =========================================================================
 * Arquitectura Híbrida:
 * 1. Consulta dinámica a tdt.ar para obtener las credenciales de Eliana (gaId: 534606659).
 * 2. Fallback de seguridad hacia process.env.MP_ACCESS_TOKEN (Cuenta de Marcos).
 * 3. 🟢 PRESERVA INTACTO el descuento del 10% (* 0.9) para pagos por transferencia/alias.
 * 4. 🟢 ARREGLA URLs: Notificación centralizada en tdt.ar y retornos automáticos (back_urls).
 */

// Fallback de seguridad: Tu cuenta personal de Marcos en Vercel
const FALLBACK_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || '';

// gaId oficial de El Campito registrado en la Planilla Maestra de TdT
const EL_CAMPITO_GAID = process.env.GA_ID || "534606659";

// Secreto interno de comunicación con la Nave Nodriza
const INTERNAL_SECRET = process.env.TIENDAS_INTERNAL_SECRET || "tdt-secure-bridge-2026";

type ItemCarrito = {
  id?: string;
  title: string;
  price?: number;
  unit_price?: number;
  quantity: number;
  currency_id?: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const metodo = body.metodo || 'tarjeta'
    const vendedorEmail = body.vendedorEmail || "elianamarti90@gmail.com"; 
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://granja-el-campito.vercel.app";

    // 1. 🟢 RESOLUCIÓN DINÁMICA DEL TOKEN (Consulta a tdt.ar)
    let tokenActivo = FALLBACK_ACCESS_TOKEN;
    let origenToken = "FALLBACK_MARCOS";

    try {
      const resToken = await fetch(`https://tdt.ar/api/tiendas/mp-token?gaId=${EL_CAMPITO_GAID}`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-store",
          "x-tiendas-secret": INTERNAL_SECRET,
        },
        signal: AbortSignal.timeout(3000),
      });

      if (resToken.ok) {
        const dataToken = await resToken.json();
        if (dataToken.success && dataToken.access_token) {
          tokenActivo = dataToken.access_token;
          origenToken = "OFICIAL_EL_CAMPITO";
        }
      }
    } catch (errToken) {
      console.warn(
        `[CHECKOUT EL CAMPITO] No se pudo consultar tdt.ar. Usando token de fallback:`,
        errToken
      );
    }

    // Validación de seguridad
    if (!tokenActivo) {
      console.error("[CHECKOUT EL CAMPITO] Error crítico: No hay ningún token disponible.");
      return NextResponse.json(
        { error: "Medio de pago no configurado actualmente. Por favor coordinar por WhatsApp." },
        { status: 500 }
      );
    }

    console.log(`[CHECKOUT EL CAMPITO] Procesando preferencia con credencial: [${origenToken}]`);

    // 2. 🟢 CONSTRUCCIÓN DE ITEMS RESPETANDO EL DESCUENTO DEL 10% POR TRANSFERENCIA/ALIAS
    let items = []
    const esTransferencia = metodo === 'transferencia' || metodo === 'alias';

    if (body.items && Array.isArray(body.items)) {
      items = body.items.map((item: any) => {
        const rawPrice = Number(item.price ?? item.unit_price ?? 0);
        const finalPrice = esTransferencia ? Math.round(rawPrice * 0.9) : rawPrice;

        return {
          id: String(item.id || 'prod'),
          title: String(item.title || 'Producto Granja El Campito').substring(0, 250),
          unit_price: finalPrice,
          quantity: Number(item.quantity || 1),
          currency_id: 'ARS',
        }
      })
    } else {
      const rawPrice = Number(body.price ?? body.unit_price ?? 0);
      const finalPrice = esTransferencia ? Math.round(rawPrice * 0.9) : rawPrice;

      items = [{
        id: '1',
        title: String(body.title || 'Compra Granja El Campito').substring(0, 250),
        unit_price: finalPrice,
        quantity: Number(body.quantity || 1),
        currency_id: 'ARS',
      }]
    }

    // 3. 🟢 INSTANCIACIÓN DINÁMICA DEL SDK MERCADOPAGO
    const client = new MercadoPagoConfig({
      accessToken: tokenActivo,
    })

    const preference = new Preference(client)

    // 4. 🟢 CREACIÓN DE PREFERENCIA CON RETORNOS Y WEBHOOK OFICIAL TDT
    const result = await preference.create({
      body: {
        items,
        external_reference: vendedorEmail,

        // 🛡️ ARREGLADO: Webhook oficial centralizado en tdt.ar
        notification_url: "https://tdt.ar/api/webhook",

        // 🛡️ ARREGLADO: URLs de retorno amigables para el cliente tras pagar
        back_urls: {
          success: `${baseUrl}/success`,
          failure: `${baseUrl}/failure`,
          pending: `${baseUrl}/pending`,
        },
        auto_return: 'approved',

        metadata: {
          vendedor_email: vendedorEmail,
          cliente_nombre: body.clienteNombre || "Cliente El Campito",
          cliente_whatsapp: body.clienteWhatsapp || "S/D",
          metodo_pago: metodo,
        }
      },
    })

    return NextResponse.json({ id: result.id })
  } catch (error: any) {
    console.error("🔥 ERROR MP PREFERENCE EL CAMPITO:", error.message);
    return NextResponse.json({ error: 'Error al generar la preferencia de pago' }, { status: 500 })
  }
}