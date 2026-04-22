'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Producto = {
  id: string
  nombre: string
  precio: number
  precioTransfer: number
  imagen: string
}

type CartItem = {
  producto: Producto
  cantidad: number
  envio: number
}

type CartState = {
  items: CartItem[]
  total: number
  addToCart: (producto: Producto, envio: number) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      total: 0,

      addToCart: (producto, envio) =>
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.producto.id === producto.id &&
              i.envio === envio // 🔥 clave para separar por envío
          )

          let newItems

          if (existing) {
            newItems = state.items.map((i) =>
              i.producto.id === producto.id && i.envio === envio
                ? { ...i, cantidad: i.cantidad + 1 }
                : i
            )
          } else {
            newItems = [
              ...state.items,
              { producto, cantidad: 1, envio },
            ]
          }

          const total = newItems.reduce(
            (acc, item) =>
              acc +
              item.producto.precioTransfer * item.cantidad +
              item.envio,
            0
          )

          return {
            items: newItems,
            total,
          }
        }),

      removeFromCart: (id) =>
        set((state) => {
          const newItems = state.items.filter(
            (i) => i.producto.id !== id
          )

          const total = newItems.reduce(
            (acc, item) =>
              acc +
              item.producto.precioTransfer * item.cantidad +
              item.envio,
            0
          )

          return {
            items: newItems,
            total,
          }
        }),

      clearCart: () =>
        set({
          items: [],
          total: 0,
        }),
    }),
    {
      name: 'cart-storage-v2', // 🔥 CAMBIADO → limpia estado viejo
    }
  )
)