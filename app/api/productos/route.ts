import { NextResponse } from 'next/server'

// ✅ Al responder en memoria sin importar archivos externos,
// podés eliminar 'content/productos.json' y NUNCA más se romperá el build.
export async function GET() {
  return NextResponse.json({ secciones: [] })
}