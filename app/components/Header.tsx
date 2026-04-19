'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="header">
      
      {/* LOGO CENTRADO */}
      <div className="logo-wrapper">
        <Link href="/">
          <img src="/logo.png" alt="El Campito" className="logo" />
        </Link>
      </div>

      {/* ICONOS DERECHA */}
      <div className="icons">
        
        {/* Instagram */}
        <a
          href="https://www.instagram.com/el_campito_agroecologico"
          target="_blank"
          rel="noopener noreferrer"
          className="icon"
        >
          <svg viewBox="0 0 24 24" fill="white">
            <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 17.5 13 5.507 5.507 0 0 0 12 7.5zm0 2A3.5 3.5 0 1 1 8.5 13 3.504 3.504 0 0 1 12 9.5zm4.75-3.75a1.25 1.25 0 1 0 1.25 1.25 1.252 1.252 0 0 0-1.25-1.25z"/>
          </svg>
        </a>

        {/* Carrito */}
        <a href="#" className="icon">
          <svg viewBox="0 0 24 24" fill="white">
            <path d="M7 18a2 2 0 1 0 2 2 2 2 0 0 0-2-2zm10 0a2 2 0 1 0 2 2 2 2 0 0 0-2-2zM6.2 6l.8 2h10.6a1 1 0 0 1 .96 1.28l-1.5 5A2 2 0 0 1 15.13 16H9a2 2 0 0 1-1.9-1.37L4.1 4H2V2h3a1 1 0 0 1 .95.68L6.2 6z"/>
          </svg>
        </a>

      </div>

      <style jsx>{`
        .header {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 10;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding-top: 10px;
        }

        .logo-wrapper {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .logo {
          width: 60%;
          max-width: 320px;
          height: auto;
        }

        .icons {
          position: absolute;
          top: 15px;
          right: 20px;
          display: flex;
          gap: 12px;
        }

        .icon svg {
          width: 26px;
          height: 26px;
        }

        /* 📱 MOBILE */
        @media (max-width: 768px) {
          .logo {
            width: 66%;
          }

          .icons {
            top: 10px;
            right: 10px;
            gap: 10px;
          }

          .icon svg {
            width: 22px;
            height: 22px;
          }
        }

        /* 💻 DESKTOP */
        @media (min-width: 769px) {
          .logo {
            width: 320px;
          }

          .icon svg {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>
    </header>
  )
}