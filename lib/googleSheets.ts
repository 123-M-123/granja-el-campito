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

function getDriveDirectLink(url: string) {
  if (!url || !url.includes("drive.google.com")) return url;
  const match = url.match(/\/d\/(.+?)(?:\/|$)|\/file\/d\/(.+?)\/|id=(.+?)(?:&|$)/);
  const fileId = match ? (match[1] || match[2] || match[3]) : null;
  if (!fileId) return url;
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
}

export async function getProductsFromSheets() {
  try {
    const range = "'Carga de productos'!A2:O"; // Rango O para futuras galerías
    const response = await sheets.spreadsheets.values.get({ spreadsheetId: CLIENT_ID, range });
    const rows = response.data.values;
    
    if (!rows) return [];

    return rows
      .filter((row: any) => sociosElCampito.includes(row[0]?.trim().toLowerCase()))
      .map((row: any) => {
        const precioBase = Number(row[3]) || 0;
        const catRaw = row[6]?.toString().trim() || "sin categoría";
        
        // Lógica de Asterisco para El Campito (si la llegaras a usar)
        const esEspecial = catRaw.startsWith('*');
        const categoriaLimpia = catRaw.replace('*', '').trim();

        return {
          id: row[1]?.toString() || "",
          nombre: row[2]?.toString() || "",
          // 🚜 Lógica El Campito: +10% en precio lista
          precio: Math.round(precioBase * 1.111),
          precioTransfer: precioBase,
          descripcion: row[4] || "",
          imagen: getDriveDirectLink(row[5] || ""),
          categoria: categoriaLimpia,
          categoriaSlug: slugify(categoriaLimpia),
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
 * 🚩 BANNERS: Con Cache Busting para El Campito
 */
export async function getBannersFromSheets() {
  try {
    const range = "'Baners Publicidad'!A2:E"; // Aumentado a E
    const response = await sheets.spreadsheets.values.get({ spreadsheetId: MASTER_ID, range });
    const rows = response.data.values;
    if (!rows) return [];

    return rows
      .filter((row: any) => sociosElCampito.includes(row[0]?.trim().toLowerCase()))
      .map((row: any) => {
        const baseImg = getDriveDirectLink(row[1] || "");
        const version = row[4] || "1"; // Columna E

        return {
          imagen: `${baseImg}&v=${version}`, // Rompe el caché
          ubicacion: row[2]?.toString().toLowerCase().trim() || "",
          linkDestino: row[3] || null
        };
      });
  } catch (error: any) { return []; }
}

/**
 * 💰 REGISTRO DE PAGOS: Actualizado a 10 columnas para el nuevo CRM
 */
export async function savePaymentToMaster(paymentData: any[]) {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: MASTER_ID,
      range: "'webhoock MP'!A:J", // Aumentado a J
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [paymentData] },
    });
    return { success: true };
  } catch (error: any) { throw error; }
}