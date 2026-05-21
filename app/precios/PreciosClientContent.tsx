'use client'

import { useState, useEffect } from 'react'
// Si tienes un archivo CSS específico para precios, impórtalo aquí. 
// Si no, podemos usar estilos inline o clases globales.

export default function PreciosClientContent({ banners }: { banners: any[] }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Filtramos los banners que tengan "precios" en su ubicación (precios-1, precios-2, etc)
  const bannersPrecios = banners.filter(b => b.ubicacion.includes('precios'))

  return (
    <main style={{ padding: "40px 20px", textAlign: "center", color: "white" }}>
      <h1
        style={{
          fontFamily: "Eras, sans-serif",
          fontWeight: 700,
          fontSize: "36px",
          marginBottom: "30px",
        }}
      >
        Lista de Precios
      </h1>

      <section style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        {bannersPrecios.length > 0 ? (
          bannersPrecios.map((banner, index) => (
            <div key={index} style={{ width: "100%", maxWidth: "900px" }}>
              {banner.linkDestino ? (
                <a href={banner.linkDestino} target="_blank" rel="noopener noreferrer">
                  <img 
                    src={banner.imagen} 
                    alt={`Lista de precios ${index}`} 
                    className="precio-img" 
                  />
                </a>
              ) : (
                <img 
                  src={banner.imagen} 
                  alt={`Lista de precios ${index}`} 
                  className="precio-img" 
                />
              )}
            </div>
          ))
        ) : (
          <p>Cargando lista de precios actualizada...</p>
        )}
      </section>
    </main>
  )
}