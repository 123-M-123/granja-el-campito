'use client'

import { create } from 'zustand'

type Producto = {
  id: string
  nombre: string
  precio: number
  precioTransfer: number
  imagen: string
}

type CartItem = {
  producto: Producto
  envio: number
  cantidad: number
}

type CartState = {
  items: CartItem[]
  total: number
  addToCart: (producto: Producto, envio: number) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

export const useCart = create<CartState>((set) => ({
  items: [],
  total: 0,

  addToCart: (producto, envio) =>
    set((state) => {
      const existing = state.items.find(
        (item) => item.producto.id === producto.id
      )

      let updatedItems: CartItem[]

      if (existing) {
        // si ya existe → suma cantidad
        updatedItems = state.items.map((item) =>
          item.producto.id === producto.id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
                envio, // actualiza envio si cambia
              }
            : item
        )
      } else {
        // nuevo item
        updatedItems = [
          ...state.items,
          {
            producto,
            envio,
            cantidad: 1,
          },
        ]
      }

      const total = updatedItems.reduce(
        (acc, item) =>
          acc +
          item.producto.precioTransfer * item.cantidad +
          item.envio,
        0
      )

      console.log('🛒 STORE UPDATED:', updatedItems)

      return {
        items: updatedItems,
        total,
      }
    }),

  removeFromCart: (id) =>
    set((state) => {
      const updatedItems = state.items.filter(
        (item) => item.producto.id !== id
      )

      const total = updatedItems.reduce(
        (acc, item) =>
          acc +
          item.producto.precioTransfer * item.cantidad +
          item.envio,
        0
      )

      return {
        items: updatedItems,
        total,
      }
    }),

  clearCart: () =>
    set({
      items: [],
      total: 0,
    }),
}))