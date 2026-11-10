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
 */
function getDriveDirectLink(url: string, version: string = "1") {
  if (!url || !url.includes("drive.google.com")) return url;
  
  const match = url.match(/\/d\/(.+?)(?:\/|$)|\/file\/d\/(.+?)\/|id=(.+?)(?:&|$)/);
  const fileId = match ? (match[1] || match[2] || match[3]) : null;
  
  if (!fileId) return url;

  return `https://lh3.googleusercontent.com/d/${fileId}=s1000?v=${version}`;
}

/**
 * 📦 PRODUCTOS: Lectura ultrarrápida desde Supabase vía tdt.ar
 */
export async function getProductsFromSheets() {
  const GA_ID_CAMPITO = "534606659";

  try {
    const res = await fetch(`https://tdt.ar/api/tienda/productos?gaId=${GA_ID_CAMPITO}&t=${Date.now()}`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" }
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
 * 🚩 BANNERS: Lectura ultrarrápida en tiempo real desde Supabase vía tdt.ar
 * 🟢 BYPASS TOTAL DE CACHÉ: Usa no-store, timestamp y busca por Email y gaId simultáneamente
 */
export async function getBannersFromSheets() {
  const EMAIL_VENDEDOR = "elianamarti90@gmail.com";
  const GA_ID_CAMPITO = "534606659";

  try {
    const res = await fetch(
      `https://tdt.ar/api/tienda/banners?vendedor=${EMAIL_VENDEDOR}&gaId=${GA_ID_CAMPITO}&t=${Date.now()}`, 
      {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" }
      }
    );

    if (!res.ok) {
      console.error("❌ Error consultando banners de El Campito:", res.status);
      return [];
    }

    const data = await res.json();
    const rawBanners = data.banners || [];

    return rawBanners.map((b: any) => ({
      imagen: b.imagen,
      ubicacion: b.ubicacion,
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

export interface FeriaFechaItem {
  id: string
  nombreFallback: string
  bannerJpg: string
  fechas: string[]
  version: string
}

const FERIAS_FALLBACK_DEFAULT: FeriaFechaItem[] = [
  {
    id: 'uribelarrea',
    nombreFallback: 'Uribelarrea',
    bannerJpg: '/ferias/uribelarrea.jpg',
    fechas: [
      'Sábado 3 · 12 hs (Oct)',
      'Domingo 4 · 11 hs (Oct)',
    ],
    version: '1'
  },
  {
    id: 'rural',
    nombreFallback: 'Feria Rural Cañuelas',
    bannerJpg: '/ferias/rural.jpg',
    fechas: ['Domingo 11 · 10 a 18 hs (Oct)'],
    version: '1'
  },
  {
    id: 'plaza-sm',
    nombreFallback: 'Plaza San Martín',
    bannerJpg: '/ferias/plaza-sm.jpg',
    fechas: ['Sábado 17 · 11 a 17 hs (Oct)'],
    version: '1'
  },
  {
    id: 'campo-cultura',
    nombreFallback: 'Campo Cultura',
    bannerJpg: '/ferias/campo-cultura.jpg',
    fechas: ['Próximas jornadas a confirmar (Oct)'],
    version: '1'
  }
];

function parsearFechasCrudas(texto: string): string[] {
  if (!texto) return [];
  return texto
    .split(/[\n,;]+/)
    .map(f => f.trim())
    .filter(f => f.length > 0);
}

export async function getFeriasFechasFromSheets(): Promise<FeriaFechaItem[]> {
  try {
    const spreadsheetId = CLIENT_ID || "1Qo_52MB9g0A8MKWzcZ5laAV599Xw7WS0WZ-GCKOe4yY";

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "'Ferias_Fechas'!A2:E20",
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.warn("⚠️ Ferias_Fechas vacía en Sheets, usando fallback.");
      return FERIAS_FALLBACK_DEFAULT;
    }

    const items: FeriaFechaItem[] = rows.map((row) => {
      const idRaw = (row[0] || '').toLowerCase().trim();
      const versionRaw = row[4] || '1';
      
      let bannerFinal = row[1] ? row[1].trim() : `/ferias/${idRaw}.jpg`;
      if (bannerFinal.includes('drive.google.com')) {
        bannerFinal = getDriveDirectLink(bannerFinal, versionRaw);
      }

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
    console.error("🔥 Error consultando Ferias_Fechas de El Campito:", error.message);
    return FERIAS_FALLBACK_DEFAULT;
  }
}