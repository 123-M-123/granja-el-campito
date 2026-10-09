'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import { 
  Home, 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  CalendarPlus, 
  Camera, 
  Send, 
  Sparkles, 
  MapPin 
} from 'lucide-react'
import type { FeriaAgrupada } from '@/lib/feriasCampitoActions'

const cardScrollVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.55, ease: 'easeOut' as const } 
  }
}

export default function FeriasFechasClientContent({ 
  ferias 
}: { 
  ferias: FeriaAgrupada[] 
}) {
  const telefonoWp = '5492262557322'
  const mensajeFoto = 'Hola Eliana! Tengo fotos de El Campito en la feria y se las quiero compartir'
  const urlWpFotos = `https://wa.me/${telefonoWp}?text=${encodeURIComponent(mensajeFoto)}`

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #064f2a 0%, #032b17 100%)',
      color: '#ffffff',
      padding: '24px 16px 90px',
      fontFamily: 'Eras, sans-serif',
      overflowX: 'hidden',
      width: '100%'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>

        {/* NAVEGACIÓN SUPERIOR */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px',
          width: '100%'
        }}>
          <Link 
            href="/ferias"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 18px',
              borderRadius: '50px',
              background: 'rgba(255, 255, 255, 0.12)',
              color: '#d9f5e3',
              textDecoration: 'none',
              fontSize: '13.5px',
              fontWeight: 700,
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
            }}
          >
            <ArrowLeft size={16} />
            <span>Volver a Ferias</span>
          </Link>

          <Link 
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 18px',
              borderRadius: '50px',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '13.5px',
              fontWeight: 700,
              border: '1px solid rgba(255,255,255,0.15)'
            }}
          >
            <Home size={15} color="#86efac" />
            <span>Inicio</span>
          </Link>
        </div>

        {/* CABECERA */}
        <header style={{ textAlign: 'center', marginBottom: '45px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.14)',
            padding: '6px 20px',
            borderRadius: '50px',
            marginBottom: '16px',
            fontSize: '12.5px',
            color: '#bbf7d0',
            fontWeight: 800,
            letterSpacing: '0.8px'
          }}>
            <Sparkles size={15} />
            <span>AGENDA EN VIVO · OCTUBRE 2026</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 46px)',
            fontWeight: 900,
            lineHeight: 1.18,
            marginBottom: '14px',
            color: '#ffffff'
          }}>
            Cronograma de Fechas
          </h1>

          <p style={{
            fontSize: '16px',
            color: '#d9f5e3',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.55
          }}>
            Consultá los días y horarios en los que nos encontramos con nuestros puestos en Cañuelas y Uribelarrea.
          </p>
        </header>

        {/* GRILLA DE LAS 4 FERIAS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: '28px',
          marginBottom: '55px',
          width: '100%'
        }}>
          {ferias.map((feria) => (
            <motion.article
              key={feria.id}
              variants={cardScrollVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '24px',
                padding: '20px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              {/* IMAGEN DE LA FERIA EN ANCHO COMPLETO */}
              <div style={{
                width: '100%',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 22px rgba(0,0,0,0.35)',
                marginBottom: '20px',
                background: 'rgba(0,0,0,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={feria.bannerJpg}
                  alt={feria.nombre}
                  onError={(e) => {
                    e.currentTarget.src = `/ferias/${feria.id}.jpg`
                  }}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '16px'
                  }}
                />
              </div>

              {/* LISTADO DE FECHAS NORMALIZADAS */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '9px',
                marginTop: 'auto'
              }}>
                {feria.fechas && feria.fechas.length > 0 ? (
                  feria.fechas.map((item, fIdx) => (
                    <div 
                      key={fIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        background: item.yaPaso 
                          ? 'rgba(0, 0, 0, 0.25)' // Píldora más oscura si ya pasó
                          : 'rgba(255, 255, 255, 0.09)',
                        border: item.yaPaso
                          ? '1px solid rgba(134, 239, 172, 0.2)'
                          : '1px solid rgba(255, 255, 255, 0.12)',
                        opacity: item.yaPaso ? 0.7 : 1, // Opacidad sutil para fechas pasadas
                        fontSize: '14.5px',
                        color: '#ffffff',
                        fontWeight: 700
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                        {item.yaPaso ? (
                          <CheckCircle2 size={16} color="#86efac" /> // 👈 TILDE VERDE AUTOMÁTICA
                        ) : (
                          <Calendar size={16} color="#fde047" />
                        )}
                        <span>{item.textoDisplay}</span>
                      </div>

                      {/* BOTÓN DISPARADOR DE GOOGLE CALENDAR (Solo fechas futuras) */}
                      {!item.yaPaso && item.calendarUrl && (
                        <a
                          href={item.calendarUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Agendar en Google Calendar"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: 'rgba(34, 197, 94, 0.25)',
                            border: '1px solid rgba(134, 239, 172, 0.4)',
                            color: '#86efac',
                            padding: '4px 10px',
                            borderRadius: '50px',
                            fontSize: '11px',
                            fontWeight: 800,
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '0.3px',
                            cursor: 'pointer'
                          }}
                        >
                          <CalendarPlus size={13} />
                          <span>Agendar</span>
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <div style={{
                    padding: '12px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#d9f5e3',
                    fontSize: '14px',
                    textAlign: 'center'
                  }}>
                    Próximas fechas a confirmar
                  </div>
                )}
              </div>

            </motion.article>
          ))}
        </div>

        {/* MÓDULO DE FOTOS */}
        <motion.section
          variants={cardScrollVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(12px)',
            border: '1px dashed rgba(134, 239, 172, 0.45)',
            borderRadius: '24px',
            padding: '28px 20px',
            textAlign: 'center',
            marginBottom: '45px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}
        >
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'rgba(34, 197, 94, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 14px',
            color: '#86efac'
          }}>
            <Camera size={26} />
          </div>

          <h2 style={{
            fontSize: '20px',
            fontWeight: 900,
            color: '#ffffff',
            marginBottom: '8px'
          }}>
            ¿Nos visitaste en la feria y sacaste fotos?
          </h2>

          <p style={{
            fontSize: '14.5px',
            color: '#d9f5e3',
            maxWidth: '520px',
            margin: '0 auto 20px',
            lineHeight: 1.5
          }}>
            Compartinos tus fotos de nuestro puesto por WhatsApp para sumarlas a la Galería Oficial de El Campito.
          </p>

          <a 
            href={urlWpFotos}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '13px 26px',
              borderRadius: '50px',
              background: '#22c55e',
              color: '#ffffff',
              fontWeight: 900,
              fontSize: '14px',
              textDecoration: 'none',
              textTransform: 'uppercase',
              boxShadow: '0 6px 20px rgba(34, 197, 94, 0.35)',
              transition: 'transform 0.2s ease'
            }}
          >
            <Send size={16} />
            <span>Enviar Fotos por WhatsApp</span>
          </a>
        </motion.section>

        {/* PIE DE PÁGINA */}
        <footer style={{
          textAlign: 'center',
          color: '#d9f5e3',
          fontSize: '14px',
          borderTop: '1px solid rgba(255,255,255,0.15)',
          paddingTop: '24px'
        }}>
          <p style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={16} color="#86efac" />
            <span>Granja Agroecológica El Campito · Cañuelas, Prov. de Buenos Aires</span>
          </p>
        </footer>

      </div>
    </main>
  )
}