import { getBannersFromSheets } from '@/lib/googleSheets'
import PreciosClientContent from './PreciosClientContent'

// Forzamos a que se revalide cada segundo para tener datos frescos
export const revalidate = 1;

export default async function PreciosPage() {
  // Traemos todos los banners de la Planilla Maestra
  const bannersLive = await getBannersFromSheets()

  return <PreciosClientContent banners={bannersLive} />
}