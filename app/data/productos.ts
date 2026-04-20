export type Producto = {
  id: string
  nombre: string
  precio: number          // precio publicado (con +10%)
  precioTransfer: number  // precio real (descuento)
  imagen: string
  stock: number
}

const subir10 = (n: number) => Math.round(n * 1.1)

export const productos: Producto[] = [
  // 🐝 MIEL
  {
    id: 'miel-2kg',
    nombre: 'Miel 2kg',
    precio: subir10(12000),
    precioTransfer: 12000,
    imagen: '/productos/miel-2kg.png',
    stock: 10,
  },
  {
    id: 'miel-1kg',
    nombre: 'Miel 1kg',
    precio: subir10(6500),
    precioTransfer: 6500,
    imagen: '/productos/miel-1kg.png',
    stock: 10,
  },
  {
    id: 'miel-500',
    nombre: 'Miel 1/2kg',
    precio: subir10(3500),
    precioTransfer: 3500,
    imagen: '/productos/miel-500.png',
    stock: 10,
  },

  // 🍬 CARAMELOS (precio base 2200 → transfer 2000)
  ...[1,2,3,4,5,6].map(i => ({
    id: `caramelo-${i}`,
    nombre: `Caramelo Propóleo v${i}`,
    precio: 2200,
    precioTransfer: 2000,
    imagen: `/productos/caramelo-${i}.png`,
    stock: 10,
  })),

  // 🌿 EXTRAS
  {
    id: 'polen',
    nombre: 'Polen 50gr',
    precio: subir10(2600),
    precioTransfer: 2600,
    imagen: '/productos/polen.png',
    stock: 10,
  },
  {
    id: 'tintura',
    nombre: 'Tintura de Propóleo',
    precio: subir10(6000),
    precioTransfer: 6000,
    imagen: '/productos/tintura.png',
    stock: 10,
  },
  {
    id: 'panal',
    nombre: 'Miel en Panal',
    precio: subir10(6500),
    precioTransfer: 6500,
    imagen: '/productos/panal.png',
    stock: 10,
  },
]