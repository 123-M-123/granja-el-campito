"use client"

import { usePathname } from "next/navigation"
import Header from "./Header"

export default function ConditionalHeader() {
  const pathname = usePathname()

  // ❌ NO mostrar header en checkout
  if (pathname === "/checkout") return null

  return <Header />
}