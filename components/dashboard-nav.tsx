"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Car, ClipboardList, FileText, Home, LogOut, Recycle, Settings, Truck } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  disabled?: boolean
}

interface DashboardNavProps {
  navItems?: NavItem[]
}

export function DashboardNav({ navItems = [] }: DashboardNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  const defaultNavItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      title: "Offertes",
      href: "/admin/quotes",
      icon: <ClipboardList className="mr-2 h-4 w-4" />,
    },
    {
      title: "Voertuigen",
      href: "/admin/vehicles",
      icon: <Car className="mr-2 h-4 w-4" />,
    },
    {
      title: "Klanten",
      href: "/admin/customers",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      title: "Recycling",
      href: "/admin/recycling",
      icon: <Recycle className="mr-2 h-4 w-4" />,
    },
  ]

  const items = navItems.length > 0 ? navItems : defaultNavItems

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      })
      
      if (response.ok) {
        toast({
          title: "Uitgelogd",
          description: "Je bent succesvol uitgelogd",
        })
        router.push("/admin/login")
      } else {
        throw new Error('Logout failed')
      }
    } catch (error) {
      console.error("Error signing out:", error)
      toast({
        title: "Fout bij uitloggen",
        description: "Er is een fout opgetreden bij het uitloggen",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col h-full justify-between">
      <nav className="grid items-start gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <Link
              key={item.href}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "transparent hover:bg-accent hover:text-accent-foreground",
                item.disabled && "cursor-not-allowed opacity-50",
              )}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-6">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Uitloggen</span>
        </Button>
      </div>
    </div>
  )
}
