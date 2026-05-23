import { getBannersFromSheets } from '@/lib/googleSheets'
import AnterioresClient from './AnterioresClient'

export const revalidate = 1;

export default async function PaginaAnteriores() {
  const banners = await getBannersFromSheets()
  return <AnterioresClient banners={banners} />
}