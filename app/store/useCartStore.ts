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
  removeFromCart: (id: string, envio: number) => void
  updateEnvio: (id: string, oldEnvio: number, newEnvio: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      total: 0,

      addToCart: (producto, envio) =>
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.producto.id === producto.id &&
              i.envio === envio
          )

          let newItems: CartItem[]

          if (existing) {
            newItems = state.items.map((i) =>
              i.producto.id === producto.id &&
              i.envio === envio
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

      removeFromCart: (id, envio) =>
        set((state) => {
          const newItems = state.items.filter(
            (i) =>
              !(
                i.producto.id === id &&
                i.envio === envio
              )
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

      updateEnvio: (id, oldEnvio, newEnvio) =>
        set((state) => {
          const newItems = state.items.map((item) => {
            if (
              item.producto.id === id &&
              item.envio === oldEnvio
            ) {
              return {
                ...item,
                envio: newEnvio,
              }
            }
            return item
          })

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
      name: 'cart-storage-v4',
    }
  )
)