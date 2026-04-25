export type Producto = {
  id: string
  nombre: string
  precio: number          // precio publicado (+10%)
  precioTransfer: number  // precio real
  imagen: string
  stock: number
}

const subir10 = (n: number) => Math.round(n * 1.1)

export const productos: Producto[] = [
  // 🐝 MIEL
  {
    id: 'miel-2kg',
    nombre: 'Miel 2kg',
    precio: 13.333,
    precioTransfer: 12.000,
    imagen: '/products/miel-2kg.png',
    stock: 100,
  },
  {
    id: 'miel-1kg',
    nombre: 'Miel 1kg',
    precio: 7.222,
    precioTransfer: 6.500,
    imagen: '/products/miel-1kg.png',
    stock: 100,
  },
  {
    id: 'miel-500',
    nombre: 'Miel 1/2kg',
    precio: 3.889,
    precioTransfer: 3.500,
    imagen: '/products/miel-500.png',
    stock: 100,
  },

  // 🍬 CARAMELOS
  ...[1, 2, 3, 4, 5, 6].map((i) => ({
    id: `caramelo-${i}`,
    nombre: `Pack 10u Caramelos Miel Con..(Nro)${i}`,
    precio: 2.222,
    precioTransfer: 2.000,
    imagen: `/products/caramelo-${i}.png`,
    stock: 100,
  })),

  // 🌿 EXTRAS
  {
    id: 'polen',
    nombre: 'Polen Granulado 50gr',
    precio: 2.889,
    precioTransfer: 2.600,
    imagen: '/products/polen.png',
    stock: 100,
  },
  {
    id: 'tintura',
    nombre: 'Tintura de Propóleo',
    precio: 6.666,
    precioTransfer: 6.000,
    imagen: '/products/tintura.png',
    stock: 100,
  },
  {
    id: 'panal',
    nombre: 'Miel en Panal',
    precio: 7.222,
    precioTransfer: 6.500,
    imagen: '/products/panal.png',
    stock: 100,
  },
]