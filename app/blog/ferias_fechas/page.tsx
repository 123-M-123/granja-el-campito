// app/blog/ferias_fechas/page.tsx
import { getFeriasFechasFromSheets } from '@/lib/googleSheets'
import FeriasFechasClientContent from './FeriasFechasClientContent'

// 🔥 CERO CACHÉ EN EL SERVIDOR:
// Garantiza que cada vez que Eliana edite el Excel, al refrescar la web
// el cambio impacte en el milisegundo exacto.
export const revalidate = 0;

export default async function FeriasFechasPage() {
  // Consulta directa a Google Sheets mediante la Service Account
  const feriasLive = await getFeriasFechasFromSheets();

  return <FeriasFechasClientContent ferias={feriasLive} />;
}