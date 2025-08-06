import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin | Van Velzen Autorecycling",
  description: "Admin panel voor Van Velzen Autorecycling",
}

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <>{children}</>
}
