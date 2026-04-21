export function generarQR({ alias, monto }: { alias: string; monto: number }) {
  // Formato simple interoperable (string pago)
  const data = `PAGO|ALIAS:${alias}|MONTO:${monto}`

  // API gratuita para generar QR (imagen)
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    data
  )}`

  return url
}