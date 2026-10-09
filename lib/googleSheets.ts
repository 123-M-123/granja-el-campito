// C:\Users\Marcos\proyectos ordenados 1y2\el-campito\lib\googleSheets.ts
import { google } from 'googleapis';
import { slugify } from './utils';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const MASTER_ID = process.env.MASTER_PAYMENTS_SHEET_ID;
const CLIENT_ID = process.env.CLIENT_CONTENT_SHEET_ID || "1Qo_52MB9g0A8MKWzcZ5laAV599Xw7WS0WZ-GCKOe4yY";

const sociosElCampito = ["elianamarti90@gmail.com", "exequiel.devita@gmail.com"];

/**
 * 🖼️ HELPER: Generador de Links Directos (Sin Redirección)
 * Resuelve el problema del caché en móviles permitiendo que ?v=X persista.
 */
function getDriveDirectLink(url: string, version: string = "1") {
  if (!url || !url.includes("drive.google.com")) return url;
  
  const match = url.match(/\/d\/(.+?)(?:\/|$)|\/file\/d\/(.+?)\/|id=(.+?)(?:&|$)/);
  const fileId = match ? (match[1] || match[2] || match[3]) : null;
  
  if (!fileId) return url;

  // Formato lh3 directo (s1000 = resolución 1000px)
  return `https://lh3.googleusercontent.com/d/${fileId}=s1000?v=${version}`;
}

/**
 * 📦 PRODUCTOS: Lectura ultrarrápida desde Supabase vía tdt.ar (Bypass de Google Sheets API)
 */
export async function getProductsFromSheets() {
  const GA_ID_CAMPITO = "534606659"; // gaId oficial de El Campito

  try {
    const res = await fetch(`https://tdt.ar/api/tienda/productos?gaId=${GA_ID_CAMPITO}`, {
      next: { revalidate: 60 } // 👈 Caché de 1 minuto en Vercel Edge
    });

    if (!res.ok) {
      console.error("❌ Error consultando API Supabase de productos:", res.status);
      return [];
    }

    const data = await res.json();
    return data.productos || [];
  } catch (error: any) {
    console.error("🔥 Error de conexión productos El Campito:", error.message);
    return [];
  }
}

/**
 * 🚩 BANNERS: Lectura ultrarrápida desde Supabase vía tdt.ar (Conserva Link de Destino y Versión)
 */
export async function getBannersFromSheets() {
  const EMAIL_VENDEDOR = "elianamarti90@gmail.com";

  try {
    const res = await fetch(`https://tdt.ar/api/tienda/banners?vendedor=${EMAIL_VENDEDOR}`, {
      next: { revalidate: 60 } // 👈 Caché Edge de 1 minuto en Vercel
    });

    if (!res.ok) {
      console.error("❌ Error consultando banners de El Campito:", res.status);
      return [];
    }

    const data = await res.json();
    const rawBanners = data.banners || [];

    return rawBanners.map((b: any) => ({
      imagen: b.imagen,
      ubicacion: b.ubicacion,
      // Si el link es "#" o vacío, lo deja en null para no abrir pestañas en blanco
      linkDestino: b.linkDestino && b.linkDestino !== "#" ? b.linkDestino : null,
      version: b.version || "1",
    }));
  } catch (error: any) {
    console.error("🔥 Error de conexión banners El Campito:", error.message);
    return [];
  }
}

/**
 * 💰 REGISTRO DE PAGOS: 10 columnas (A:J)
 */
export async function savePaymentToMaster(paymentData: any[]) {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: MASTER_ID,
      range: "'webhoock MP'!A:J",
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [paymentData] },
    });
    return { success: true };
  } catch (error: any) { throw error; }
}

/**
 * 📂 CATEGORÍAS
 */
export async function getCategoriesFromSheets() {
  const products = await getProductsFromSheets();
  const uniqueMap = new Map();

  products.forEach((p: any) => {
    if (!uniqueMap.has(p.categoriaSlug)) {
      uniqueMap.set(p.categoriaSlug, { label: p.categoria, slug: p.categoriaSlug, tipo: p.tipo });
    }
  });

  return Array.from(uniqueMap.values());
}

// =========================================================================
// 🗓️ CRONOGRAMA DE FERIAS: Lectura directa desde Hoja 4 de El Campito
// =========================================================================

export interface FeriaFechaItem {
  id: string
  nombreFallback: string
  bannerJpg: string
  fechas: string[]
  version: string
}

// Fallback seguro en caso de que Google Sheets esté caído o vacío
const FERIAS_FALLBACK_DEFAULT: FeriaFechaItem[] = [
  {
    id: 'uribelarrea',
    nombreFallback: 'Uribelarrea',
    bannerJpg: '/ferias/uribelarrea.jpg',
    fechas: [
      'Sábado 3 · 12 hs (Oct)',
      'Domingo 4 · 11 hs (Oct)',
      'Sábado 10 · 12 hs (Oct)',
      'Domingo 11 · 11 hs (Oct)',
      'Lunes 12 · 11 hs (Oct)',
      'Sábado 17 · 12 hs (Oct)',
      'Sábado 24 · 12 hs (Oct)',
      'Domingo 25 · 11 hs (Oct)',
      'Sábado 31 · 12 hs (Oct)',
      'Domingo 1 (Nov)'
    ],
    version: '1'
  },
  {
    id: 'rural',
    nombreFallback: 'Feria Rural Cañuelas',
    bannerJpg: '/ferias/rural.jpg',
    fechas: [
      'Domingo 11 · 10 a 18 hs (Oct)'
    ],
    version: '1'
  },
  {
    id: 'plaza-sm',
    nombreFallback: 'Plaza San Martín',
    bannerJpg: '/ferias/plaza-sm.jpg',
    fechas: [
      'Sábado 17 · 11 a 17 hs (Oct)',
      'Sábado 24 · 11 a 17 hs (Oct)'
    ],
    version: '1'
  },
  {
    id: 'campo-cultura',
    nombreFallback: 'Campo Cultura',
    bannerJpg: '/ferias/campo-cultura.jpg',
    fechas: [
      'Próximas jornadas a confirmar (Oct)'
    ],
    version: '1'
  }
];

/**
 * Helper para dividir texto de fechas separado por comas o saltos de línea
 */
function parsearFechasCrudas(texto: string): string[] {
  if (!texto) return [];
  return texto
    .split(/[\n,;]+/)
    .map(f => f.trim())
    .filter(f => f.length > 0);
}

/**
 * Consulta la Hoja 4 de la planilla de El Campito usando la Service Account oficial
 */
export async function getFeriasFechasFromSheets(): Promise<FeriaFechaItem[]> {
  try {
    const spreadsheetId = CLIENT_ID || "1Qo_52MB9g0A8MKWzcZ5laAV599Xw7WS0WZ-GCKOe4yY";

    // Consultamos la pestaña Hoja 4 de columnas A hasta E
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "'Hoja 4'!A2:E20",
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.warn("⚠️ Hoja 4 vacía en Sheets, usando fallback.");
      return FERIAS_FALLBACK_DEFAULT;
    }

    const items: FeriaFechaItem[] = rows.map((row) => {
      const idRaw = (row[0] || '').toLowerCase().trim();
      const versionRaw = row[4] || '1';
      
      // Si el link de imagen es de Drive, lo convierte a lh3; si es ruta local, la preserva
      let bannerFinal = row[1] ? row[1].trim() : `/ferias/${idRaw}.jpg`;
      if (bannerFinal.includes('drive.google.com')) {
        bannerFinal = getDriveDirectLink(bannerFinal, versionRaw);
      }

      // Nombre amigable para alt/título
      const nombresMap: Record<string, string> = {
        'uribelarrea': 'Uribelarrea',
        'rural': 'Feria Rural Cañuelas',
        'plaza-sm': 'Plaza San Martín',
        'campo-cultura': 'Campo Cultura'
      };

      return {
        id: idRaw,
        nombreFallback: nombresMap[idRaw] || idRaw,
        bannerJpg: bannerFinal,
        fechas: parsearFechasCrudas(row[3] || ''),
        version: versionRaw
      };
    }).filter(item => item.id.length > 0);

    return items.length > 0 ? items : FERIAS_FALLBACK_DEFAULT;
  } catch (error: any) {
    console.error("🔥 Error consultando Hoja 4 de El Campito:", error.message);
    return FERIAS_FALLBACK_DEFAULT;
  }
}