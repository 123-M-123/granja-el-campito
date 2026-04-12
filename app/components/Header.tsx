'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useCarrito } from '../context/CarritoContext'
import { C } from '@/styles/colores'

const IconCarrito = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="9" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
)

const NAV_LINKS = [
  { label: 'Inicio',      id: 'inicio'    },
  { label: 'Novedades',   id: 'novedades' },
  { label: 'Bolsos',      id: 'bolsos'    },
  { label: 'Bazar',       id: 'bazar'     },
  { label: 'Cuencos',     id: 'cuencos'   },
  { label: 'Decoración',  id: 'deco'      },
  { label: 'Cerámica',    id: 'ceramica'  },
  { label: 'Envíos',      id: 'envios'    },
]

function handleNavClick(e: React.MouseEvent, id: string) {
  e.preventDefault()
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top: y, behavior: 'smooth' })
}

import { Producto } from '../context/CarritoContext'

type SeccionJSON = {
  id: string
  productos: Producto[]
}
const formatARS = (n: number) =>
  n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

export default function Header() {
  const { carrito, setCarritoOpen, setModal } = useCarrito()
  const cantidadCarrito = carrito.reduce((s, i) => s + i.cantidad, 0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [resultados, setResultados] = useState<Producto[]>([])
  const [todosLosProductos, setTodosLosProductos] = useState<Producto[]>([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Cargar productos al montar
  useEffect(() => {
    fetch('/api/productos')
      .then(r => r.json())
      .then(data => {
        const todos = data.secciones.flatMap((s: SeccionJSON) => s.productos)
        setTodosLosProductos(todos)
      })
  }, [])

  // Buscar mientras escribe
  useEffect(() => {
    if (busqueda.length < 3) {
      setResultados([])
      setDropdownOpen(false)
      return
    }
    const filtrados = todosLosProductos.filter(p =>
      p.titulo.toLowerCase().includes(busqueda.toLowerCase())
    ).slice(0, 8)
    setResultados(filtrados)
    setDropdownOpen(true)
  }, [busqueda, todosLosProductos])

  // Cerrar dropdown al hacer clic afuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const abrirDesdeSearch = (p: Producto) => {
    setModal({ ...p, categoria: p.categoria || '', etiqueta: p.etiqueta || '', descripcion: p.descripcion || p.titulo })
    setBusqueda('')
    setDropdownOpen(false)
  }

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: C.gris,
      boxShadow: '0 5px 18px rgba(0,0,0,0.25)',
    }}>

      {/* FILA 1 — Redes | Logo | Carrito */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.5rem 1.25rem', maxWidth: 1200, margin: '0 auto',
      }}>

        {/* Instagram */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a href="https://www.instagram.com/mbcompras_" target="_blank" rel="noopener noreferrer"
            style={{ color: C.white, display: 'flex', alignItems: 'center', gap: '0.3rem',
              fontSize: '0.78rem', textDecoration: 'none', fontWeight: 600 }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
            </svg>
          </a>
        </div>

        {/* Logo */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Image src="/logo.png" alt="MB Compras" width={210} height={84} priority
            style={{ objectFit: 'contain', height: 'auto', maxHeight: 84 }} />
        </div>

        {/* Carrito */}
        <button onClick={() => setCarritoOpen(true)} style={{
          position: 'relative', background: 'transparent', border: 'none',
          color: C.white, cursor: 'pointer', padding: '0.4rem',
          display: 'flex', alignItems: 'center',
        }}>
          <IconCarrito size={40} />
          {cantidadCarrito > 0 && (
            <span style={{
              position: 'absolute', top: -2, right: -2,
              background: C.naranja, color: C.white,
              borderRadius: '50%', width: 18, height: 18,
              fontSize: '0.7rem', fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{cantidadCarrito}</span>
          )}
        </button>
      </div>

      
     
    </header>
  )
}