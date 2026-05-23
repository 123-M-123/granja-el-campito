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
const CLIENT_ID = process.env.CLIENT_CONTENT_SHEET_ID;

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
 * 📦 PRODUCTOS: Lectura con mapeo estricto y recargo del 10%
 */
export async function getProductsFromSheets() {
  try {
    const range = "'Carga de productos'!A2:O"; 
    const response = await sheets.spreadsheets.values.get({ spreadsheetId: CLIENT_ID, range });
    const rows = response.data.values;
    
    if (!rows) return [];

    return rows
      .filter((row: any) => sociosElCampito.includes(row[0]?.trim().toLowerCase()))
      .map((row: any) => {
        const precioBase = Number(row[3]) || 0;
        const catRaw = row[6]?.toString().trim() || "sin categoría";
        const catSlug = slugify(catRaw.replace('*', ''));
        const esEspecial = catRaw.startsWith('*');

        return {
          id: row[1]?.toString() || "",
          nombre: row[2]?.toString() || "",
          // 🚜 Lógica El Campito: +10% en precio lista
          precio: Math.round(precioBase * 1.111),
          precioTransfer: precioBase,
          descripcion: row[4] || "",
          imagen: getDriveDirectLink(row[5] || "", "1"), // Productos usan v=1 por ahora
          categoria: catRaw.replace('*', '').trim(),
          categoriaSlug: catSlug,
          tipo: esEspecial ? 'especial' : 'normal',
          stock: Number(row[7]) || 0,
        };
      });
  } catch (error: any) {
    console.error("🔥 Error Sheets El Campito:", error.message);
    return [];
  }
}

/**
 * 🚩 BANNERS: Con Cache Busting Real (Columna E)
 */
export async function getBannersFromSheets() {
  try {
    const range = "'Baners Publicidad'!A2:E"; 
    const response = await sheets.spreadsheets.values.get({ spreadsheetId: MASTER_ID, range });
    const rows = response.data.values;
    if (!rows) return [];

    return rows
      .filter((row: any) => sociosElCampito.includes(row[0]?.trim().toLowerCase()))
      .map((row: any) => {
        const urlOriginal = row[1] || "";
        const version = row[4] || "1"; // Columna E

        return {
          // 🚀 Usamos el link directo con la versión del Excel
          imagen: getDriveDirectLink(urlOriginal, version),
          ubicacion: row[2]?.toString().toLowerCase().trim() || "",
          linkDestino: row[3] || null
        };
      });
  } catch (error: any) { return []; }
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
  products.forEach(p => {
    if (!uniqueMap.has(p.categoriaSlug)) {
      uniqueMap.set(p.categoriaSlug, { label: p.categoria, slug: p.categoriaSlug, tipo: p.tipo });
    }
  });
  return Array.from(uniqueMap.values());
}