/**
 * =========================================================================
 * 🌿 ACCIONES DE DATOS: CRONOGRAMA DE FERIAS NORMALIZADO (1NF)
 * =========================================================================
 * Lee la pestaña 'Ferias_Fechas' con Google API Key, agrupa filas por feria,
 * detecta automáticamente si la fecha ya pasó y genera enlaces para Google Calendar.
 */

export interface FechaDetalle {
  textoDisplay: string       // Ej: "Sábado 03/10 · 12 hs"
  diaSemana: string          // Ej: "Sábado"
  fechaRaw: string           // Ej: "03/10/2026"
  yaPaso: boolean            // true si ya pasaron las 23:59 hs de ese día
  calendarUrl?: string       // Link universal para abrir la app de Google Calendar
}

export interface FeriaAgrupada {
  id: string
  nombre: string
  bannerJpg: string
  fechas: FechaDetalle[]
  version: string
}

// Direcciones oficiales para el evento de Google Calendar
const DIRECCIONES_MAP: Record<string, string> = {
  'uribelarrea': 'Av. Valeria de Crotto 305, Uribelarrea, Prov. de Buenos Aires',
  'rural': 'Predio Sociedad Rural Cañuelas, Ruta 205 Km 65.200, Cañuelas',
  'plaza-sm': 'Plaza San Martín, Centro de Cañuelas',
  'campo-cultura': 'Campo Cultura, Ruta 6 Km 95, Cañuelas'
};

const NOMBRES_MAP: Record<string, string> = {
  'uribelarrea': 'Feria Uribelarrea · El Campito',
  'rural': 'Feria Rural Cañuelas · El Campito',
  'plaza-sm': 'Feria Plaza San Martín · El Campito',
  'campo-cultura': 'Feria Campo Cultura · El Campito'
};

/**
 * 📅 Evalúa si una fecha ya venció (pasadas las 23:59 hs de Argentina)
 */
function evaluarSiYaPaso(fechaStr: string): boolean {
  try {
    // Si la fecha viene como "03/10/2026" o similar
    const partes = fechaStr.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
    if (!partes) return false;

    const dia = parseInt(partes[1], 10);
    const mes = parseInt(partes[2], 10) - 1; // Mes base 0 en JS
    let anio = parseInt(partes[3], 10);
    if (anio < 100) anio += 2000;
    if (anio === 206) anio = 2026; // Fix de posibles typos tipo "0206"

    // Fin del día de la feria (23:59:59)
    const finDelDiaFeria = new Date(anio, mes, dia, 23, 59, 59);

    // Momento actual
    const ahora = new Date();

    return ahora.getTime() > finDelDiaFeria.getTime();
  } catch {
    return false;
  }
}

/**
 * 📆 Genera el enlace universal para disparar la app de Google Calendar en celulares
 */
function armarGoogleCalendarUrl(fechaStr: string, nombreFeria: string, direccion: string): string {
  try {
    const partes = fechaStr.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
    if (!partes) return '';

    const dia = partes[1].padStart(2, '0');
    const mes = partes[2].padStart(2, '0');
    let anio = partes[3];
    if (anio.length === 2) anio = '20' + anio;
    if (anio === '0206') anio = '2026';

    // Formato de fecha para Google Calendar: YYYYMMDDTHHmmSS
    // Por defecto fijamos de 11:00 hs a 18:00 hs
    const startIso = `${anio}${mes}${dia}T110000`;
    const endIso = `${anio}${mes}${dia}T180000`;

    const titulo = encodeURIComponent(nombreFeria);
    const detalles = encodeURIComponent('Vení a visitarnos a nuestro puesto de Granja Agroecológica El Campito. Miel pura, propóleos y producción artesanal.');
    const ubicacion = encodeURIComponent(direccion);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titulo}&dates=${startIso}/${endIso}&details=${detalles}&location=${ubicacion}`;
  } catch {
    return '';
  }
}

/**
 * 🚀 CONSULTA PRINCIPAL A GOOGLE SHEETS
 */
export async function getFeriasFechas(): Promise<FeriaAgrupada[]> {
  try {
    const sheetId = process.env.CLIENT_CONTENT_SHEET_ID || process.env.CAMPITO_SHEET_ID || '1Qo_52MB9g0A8MKWzcZ5laAV599Xw7WS0WZ-GCKOe4yY';
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!sheetId || !apiKey) {
      console.warn("⚠️ Falta CLIENT_CONTENT_SHEET_ID o GOOGLE_API_KEY en variables de entorno.");
      return [];
    }

    // Leemos la pestaña Ferias_Fechas (Filas 2 a 60)
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Ferias_Fechas!A2:E60?key=${apiKey}`;

    const res = await fetch(url, {
      cache: 'no-store' // 🔥 Cero caché: actualización instantánea en cada F5
    });

    if (!res.ok) {
      console.error("❌ Error consultando pestaña Ferias_Fechas:", res.status);
      return [];
    }

    const data = await res.json();
    const rows = (data.values || []) as string[][];

    if (rows.length === 0) return [];

    // Mapa de agrupación por Feria_ID
    const feriasMap = new Map<string, FeriaAgrupada>();

    // Inicializamos el orden estricto de las 4 ferias
    const ordenOficial = ['uribelarrea', 'rural', 'plaza-sm', 'campo-cultura'];
    for (const id of ordenOficial) {
      feriasMap.set(id, {
        id,
        nombre: NOMBRES_MAP[id] || id,
        bannerJpg: `/ferias/${id}.jpg`,
        fechas: [],
        version: '1'
      });
    }

    // Procesamos cada fila normalizada (1 fila = 1 fecha)
    for (const row of rows) {
      const idRaw = (row[0] || '').toLowerCase().trim();
      if (!idRaw) continue;

      let feria = feriasMap.get(idRaw);
      if (!feria) {
        feria = {
          id: idRaw,
          nombre: NOMBRES_MAP[idRaw] || idRaw,
          bannerJpg: `/ferias/${idRaw}.jpg`,
          fechas: [],
          version: '1'
        };
        feriasMap.set(idRaw, feria);
      }

      // Si la fila trae una imagen explícita, la actualizamos
      if (row[1] && row[1].trim().length > 0) {
        feria.bannerJpg = row[1].trim();
      }

      if (row[4] && row[4].trim().length > 0) {
        feria.version = row[4].trim();
      }

      // Procesamos la fecha de la Columna D
      const fechaTexto = (row[3] || '').trim();
      const diaSemana = (row[2] || '').trim();

      if (fechaTexto) {
        const yaPaso = evaluarSiYaPaso(fechaTexto);
        const direccion = DIRECCIONES_MAP[idRaw] || 'Cañuelas, Prov. de Buenos Aires';
        const calendarUrl = armarGoogleCalendarUrl(fechaTexto, feria.nombre, direccion);

        // Si tiene día de semana en Columna C, lo usamos para el display
        let display = fechaTexto;
        if (diaSemana && !display.toLowerCase().includes(diaSemana.toLowerCase())) {
          display = `${diaSemana} ${fechaTexto}`;
        }

        feria.fechas.push({
          textoDisplay: display,
          diaSemana,
          fechaRaw: fechaTexto,
          yaPaso,
          calendarUrl: yaPaso ? undefined : calendarUrl
        });
      }
    }

    return Array.from(feriasMap.values());
  } catch (error: any) {
    console.error("🔥 Error en feriasCampitoActions:", error.message);
    return [];
  }
}