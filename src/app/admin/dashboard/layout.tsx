"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type React from "react"
import { Home, FileText, Car, Users, Calendar, Recycle, FolderOpen, Package } from "lucide-react"

import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"

interface DashboardLayoutProps {
  children: React.ReactNode
}

interface User {
  name: string
  email: string
  role: string
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check authentication on client side
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include'
        })

        if (response.ok) {
          const userData = await response.json()
          setUser(userData.user)
        } else {
          // Redirect to login if not authenticated
          router.push('/admin/login')
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

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