// app/blog/ferias_fechas/page.tsx
import { getFeriasFechas } from '@/lib/feriasCampitoActions'
import FeriasFechasClientContent from './FeriasFechasClientContent'

// 🔥 Actualización instantánea: cero espera de caché
export const revalidate = 0;

export default async function FeriasFechasPage() {
  const ferias = await getFeriasFechas();
  return <FeriasFechasClientContent ferias={ferias} />;
}