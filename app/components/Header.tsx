'use client'

export default function Header() {
  return (
    <header className="header">
      
      {/* IZQUIERDA */}
      <div className="left">
        <a
          href="https://www.instagram.com/el_campito_agroecologico/"
          target="_blank"
        >
          <img src="/icons/instagram.png" className="icon" />
        </a>
      </div>

      {/* CENTRO */}
      <div className="center">
        <img src="/logo.png" className="logo" />
      </div>

      {/* DERECHA */}
      <div className="right">
        <a href="/carrito">
          <img src="/icons/cart.png" className="icon" />
        </a>
      </div>

    </header>
  )
}