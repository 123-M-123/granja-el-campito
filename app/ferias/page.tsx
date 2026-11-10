// app/ferias/page.tsx - Granja Agroecológica El Campito (Cero Caché y Forzado Dinámico)
import { getBannersFromSheets } from '@/lib/googleSheets';
import FeriasClientContent from './FeriasClientContent';

// 🟢 REGLA DE ORO VERCEL: Prohíbe el congelamiento estático y fuerza lectura viva en cada petición
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function FeriasPage() {
  // Traemos los banners vivos desde la API de TdT en tiempo real (0ms)
  const bannersLive = await getBannersFromSheets();

  return <FeriasClientContent banners={bannersLive} />;
}