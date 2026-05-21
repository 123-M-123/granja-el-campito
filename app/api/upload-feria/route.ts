import { NextRequest, NextResponse } from 'next/server'

// 📂 IMPORTANTE: Asegurate que este ID sea el de tu carpeta Glamour actual
const FOLDER_ID      = '1m72MaKJbUjqBG6vSGRexE319gYnp1y5g' 
const SHEET_ID       = process.env.GOOGLE_SHEET_ID!
const CLIENT_ID      = process.env.GOOGLE_CLIENT_ID!
const CLIENT_SECRET  = process.env.GOOGLE_CLIENT_SECRET!
const REFRESH_TOKEN  = process.env.GOOGLE_REFRESH_TOKEN!

async function getAccessToken(): Promise<string> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID, client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN, grant_type: 'refresh_token',
    }),
  })
  const data = await res.json()
  return data.access_token
}

async function agregarEnSheet(token: string, nombre: string, linkDrive: string, fecha: string): Promise<void> {
  // Aseguramos que el nombre de la pestaña coincida con tu captura
  const range = "'subida de fotos'!A:C" 
  const values = [[fecha, nombre, linkDrive]]

  console.log(`Intentando escribir en Planilla: ${SHEET_ID} - Pestaña: subida de fotos`)

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`,
    {
      method:  'POST',
      headers: { Authorization:  `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values }),
    }
  )
  if (!res.ok) {
    const err = await res.json()
    console.error("Error Sheets:", err)
    throw new Error('Error al escribir en Sheet')
  }
}

async function subirADrive(token: string, archivo: File, nombre: string): Promise<string> {
  const metadata = JSON.stringify({ name: nombre, parents: [FOLDER_ID] })
  const form = new FormData()
  form.append('metadata', new Blob([metadata], { type: 'application/json' }))
  form.append('file', archivo)

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink', {
    method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form,
  })
  const data = await res.json()
  if (!data.id) throw new Error('Error subiendo a Drive')

  // Hacer el archivo público
  await fetch(`https://www.googleapis.com/drive/v3/files/${data.id}/permissions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ role: 'reader', type: 'anyone' }),
  })
  return data.webViewLink
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const archivo = form.get('archivo') as File | null
    if (!archivo) return NextResponse.json({ error: 'No hay archivo' }, { status: 400 })

    const token = await getAccessToken()
    const fecha = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })
    const nombreLindo = `APORTE-WEB-${fecha.replace(/[/:, ]/g, '-')}`
    
    const linkDrive = await subirADrive(token, archivo, nombreLindo)
    await agregarEnSheet(token, nombreLindo, linkDrive, fecha)

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error("🔥 CRASH API FERIA:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}