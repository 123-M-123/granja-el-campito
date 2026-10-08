/**
 * =========================================================================
 * 🌿 ACCIONES DE DATOS: CRONOGRAMA DE FERIAS (EL CAMPITO)
 * =========================================================================
 * Este módulo lee la pestaña de fechas desde la planilla de El Campito
 * bajo una caché de 7 días (revalidate = 604800) para asegurar CERO
 * consumo de API de Google Sheets.
 */

export interface FeriaFechaItem {
  id: string // 'uribelarrea' | 'rural' | 'plaza-sm' | 'campo-cultura'
  imagenJpg: string
  fechas: string[] // Array de fechas individuales limpias
  version: string
}

// 🛡️ Fallback de fábrica: Si Google Sheets demora o está offline, la web NUNCA se ve vacía
const FERIAS_FALLBACK: FeriaFechaItem[] = [
  {
    id: 'uribelarrea',
    imagenJpg: '/ferias/uribelarrea.jpg',
    fechas: [
      'Sábado 3 · 12 hs',
      'Domingo 4 · 11 hs',
      'Sábado 10 · 12 hs',
      'Domingo 11 · 11 hs',
      'Lunes 12 · 11 hs',
      'Sábado 17 · 12 hs',
      'Sábado 24 · 12 hs',
      'Domingo 25 · 11 hs',
      'Sábado 31 · 12 hs',
      'Domingo 1 (Nov)'
    ],
    version: '1'
  },
  {
    id: 'rural',
    imagenJpg: '/ferias/rural.jpg',
    fechas: [
      'Domingo 11 · 10 a 18 hs'
    ],
    version: '1'
  },
  {
    id: 'plaza-sm',
    imagenJpg: '/ferias/plaza-sm.jpg',
    fechas: [
      'Sábado 17 · 11 a 17 hs',
      'Sábado 24 · 11 a 17 hs'
    ],
    version: '1'
  },
  {
    id: 'campo-cultura',
    imagenJpg: '/ferias/campo-cultura.jpg',
    fechas: [
      'Próximas jornadas a confirmar'
    ],
    version: '1'
  }
]

/**
 * Función que formatea fechas crudas:
 * Si Eliana escribe fechas separadas por coma, saltos de línea o barras,
 * las separa y formatea en píldoras limpias.
 */
function parsearFechas(textoCrudo: string): string[] {
  if (!textoCrudo) return []
  return textoCrudo
    .split(/[\n,;]+/)
    .map((f) => f.trim())
    .filter((f) => f.length > 0)
}

/**
 * Obtiene el cronograma completo de ferias con caché ultralarga (7 días).
 */
export async function getFeriasFechas(): Promise<FeriaFechaItem[]> {
  try {
    const sheetId = process.env.CAMPITO_SHEET_ID || '1Qo_52MB9g0A8MKWzcZ5laAV599Xw7WS0WZ-GCKOe4yY'
    const apiKey = process.env.GOOGLE_API_KEY

    // Si no hay API key directa o variable, usamos fallback para no romper el build
    if (!sheetId || !apiKey) {
      return FERIAS_FALLBACK
    }

    // Leemos Hoja 4 (Columnas A hasta E)
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Hoja%204!A2:E20?key=${apiKey}`

    const res = await fetch(url, {
      next: { 
        revalidate: 604800, // 👈 7 días en caché de Vercel = Consumo de API casi nulo
        tags: ['campito-ferias-fechas'] 
      }
    })

    if (!res.ok) {
      return FERIAS_FALLBACK
    }

    const data = await res.json()
    const rows = data.values as string[][]

    if (!rows || rows.length === 0) {
      return FERIAS_FALLBACK
    }

    const items: FeriaFechaItem[] = rows.map((row) => ({
      id: (row[0] || '').toLowerCase().trim(),
      imagenJpg: row[1] || '',
      fechas: parsearFechas(row[3] || ''),
      version: row[4] || '1'
    }))

    return items.length > 0 ? items : FERIAS_FALLBACK
  } catch (error) {
    console.error('Error al obtener ferias desde Sheets, usando fallback:', error)
    return FERIAS_FALLBACK
  }
}