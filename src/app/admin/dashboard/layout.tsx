import type React from "react"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth/neon-auth"
import { Home, FileText, Car, Users, Calendar, Recycle, FolderOpen, Package } from "lucide-react"

import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"

export const metadata: Metadata = {
  title: "Dashboard | Van Velzen Autorecycling Admin",
  description: "Beheer uw autorecycling bedrijf",
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  // Check authentication for dashboard
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    redirect("/admin/login")
  }

  const user = verifyToken(token)
  if (!user) {
    redirect("/admin/login")
  }

  // Ensure user has admin permissions
  if (!user.role || (user.role !== 'admin' && user.role !== 'super_admin')) {
    redirect("/admin/login")
  }

  // Navigation items for the dashboard
  const navItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: Home,
    },
    {
      title: "Offertes",
      href: "/admin/quotes",
      icon: FileText,
    },
    {
      title: "Voertuigen",
      href: "/admin/vehicles",
      icon: Car,
    },
    {
      title: "Klanten",
      href: "/admin/customers",
      icon: Users,
    },
    {
      title: "Ophaalafspraken",
      href: "/admin/pickups",
      icon: Calendar,
    },
    {
      title: "Recycling",
      href: "/admin/recycling",
      icon: Recycle,
    },
    {
      title: "Documenten",
      href: "/admin/documents",
      icon: FolderOpen,
    },
    {
      title: "Voorraad",
      href: "/admin/inventory",
      icon: Package,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <UserNav user={user} />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <DashboardNav items={navItems} />
          </aside>
          <div className="flex-1 lg:max-w-4xl">{children}</div>
        </div>
      </div>
    </div>
  )
} 