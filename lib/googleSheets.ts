import { google } from 'googleapis';

// 1. CONFIGURACIÓN DEL ROBOT (JSON)
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// 2. IDENTIFICADORES (Doble ID)
const MASTER_ID = process.env.MASTER_PAYMENTS_SHEET_ID; // Para Banners y Pagos
const CLIENT_ID = process.env.CLIENT_CONTENT_SHEET_ID; // Para Productos (Planilla Eliana)

const sociosElCampito = ["elianamarti90@gmail.com", "exequiel.devita@gmail.com"];

function getDriveDirectLink(url: string) {
  if (!url || !url.includes("drive.google.com")) return url;
  const match = url.match(/\/d\/(.+?)(?:\/|$)|\/file\/d\/(.+?)\/|id=(.+?)(?:&|$)/);
  const fileId = match ? (match[1] || match[2] || match[3]) : null;
  if (!fileId) return url;
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
}

/**
 * PRODUCTOS (Lectura)
 */
export async function getProductsFromSheets() {
  try {
    const range = "'Carga de productos'!A2:H"; 
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: CLIENT_ID,
      range,
    });

    const rows = response.data.values;
    if (!rows) return [];

    return rows
      .filter((row: any) => sociosElCampito.includes(row[0]?.trim().toLowerCase()))
      .map((row: any) => ({
        id: row[1]?.toString() || "",
        nombre: row[2]?.toString() || "",
        precio: Math.round((Number(row[3]) || 0) * 1.1),
        precioTransfer: Number(row[3]) || 0,
        descripcion: row[4] || "",
        imagen: getDriveDirectLink(row[5] || ""),
        categoria: row[6] || "",
        stock: Number(row[7]) || 0,
      }));
  } catch (error: any) {
    console.error("Error en getProductsFromSheets El Campito:", error.message);
    return [];
  }
}

/**
 * BANNERS (Lectura)
 */
export async function getBannersFromSheets() {
  try {
    const range = "'Baners Publicidad'!A2:D"; 
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: MASTER_ID,
      range,
    });

    const rows = response.data.values;
    if (!rows) return [];

    return rows
      .filter((row: any) => sociosElCampito.includes(row[0]?.trim().toLowerCase()))
      .map((row: any) => ({
        imagen: getDriveDirectLink(row[1] || ""),
        ubicacion: row[2]?.toString().toLowerCase().trim() || "",
        linkDestino: row[3] || null
      }));
  } catch (error: any) {
    console.error("Error en getBannersFromSheets El Campito:", error.message);
    return [];
  }
}

/**
 * 🔥 ESTA ES LA QUE FALTABA: ESCRITURA DE PAGOS (WEBHOOK)
 */
export async function savePaymentToMaster(paymentData: any[]) {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: MASTER_ID,
      range: "'webhoock MP'!A:G", // 👈 Nombre exacto de tu solapa en la Maestra
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [paymentData],
      },
    });
    return { success: true };
  } catch (error: any) {
    console.error("Error guardando pago en Maestra desde El Campito:", error.message);
    throw error;
  }
}