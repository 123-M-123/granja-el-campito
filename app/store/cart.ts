type Producto = {
  id: string
  nombre: string
  precio: number
  imagen: string
}

type CartItem = {
  producto: Producto
  cantidad: number
  envio: number
}

let items: CartItem[] = []
let metodo: string | null = null

let listeners: Function[] = []

function notify() {
  listeners.forEach((l) => l())
}

export function subscribe(fn: Function) {
  listeners.push(fn)
  return () => {
    listeners = listeners.filter((l) => l !== fn)
  }
}

// ITEMS
export function getItems() {
  return items
}

export function addToCart(producto: Producto, envio: number) {
  const existing = items.find((i) => i.producto.id === producto.id)

  if (existing) {
    existing.cantidad += 1
  } else {
    items.push({
      producto,
      cantidad: 1,
      envio,
    })
  }

  notify()
}

export function removeFromCart(id: string) {
  items = items.filter((i) => i.producto.id !== id)
  notify()
}

export function clearCart() {
  items = []
  notify()
}

export function getTotal() {
  return items.reduce(
    (acc, item) =>
      acc + item.producto.precio * item.cantidad + item.envio,
    0
  )
}

// MÉTODO DE PAGO
export function setMetodo(m: string) {
  metodo = m
  notify()
}

export function getMetodo() {
  return metodo
}