"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LogOut, Car, Users, FileText, Calendar, Settings, Home, Truck, Recycle, CreditCard, FolderOpen } from "lucide-react"

interface DashboardNavProps {
  items: {
    title: string
    href: string
    icon: React.ComponentType<{ className?: string }>
  }[]
}

export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        router.push('/admin/login')
        router.refresh()
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <nav className="grid items-start gap-2">
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="space-y-2 p-2">
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={index}
                href={item.href}
              >
                <span
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    path === item.href ? "bg-accent" : "transparent"
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </span>
              </Link>
            )
          })}
        </div>
        <div className="p-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Uitloggen</span>
          </Button>
        </div>
      </ScrollArea>
    </nav>
  )
}
