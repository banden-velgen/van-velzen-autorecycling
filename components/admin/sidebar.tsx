import { LayoutDashboard, Package, Recycle, Settings, ShoppingBag, Users } from "lucide-react"

import { MainNav } from "@/components/main-nav"
import { SidebarNavItem } from "@/components/sidebar-nav"

interface DashboardSidebarProps {
  isMobile: boolean
  apiPrefix: string
}

const sidebarNavItems: SidebarNavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Bestellingen",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Klanten",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Voorraad",
    href: "/admin/inventory",
    icon: Package,
  },
  {
    title: "Recycling",
    href: "/admin/recycling",
    icon: Recycle,
  },
  {
    title: "Instellingen",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function DashboardSidebar({ isMobile, apiPrefix }: DashboardSidebarProps) {
  return (
    <div className="flex h-full w-full flex-col space-y-2 border-r bg-secondary px-2 py-4">
      <MainNav className="flex flex-col" />
      <div className="flex-1 space-y-1">
        <nav className="grid gap-1">
          {sidebarNavItems.map((item, index) => (
            <SidebarNavItem key={index} {...item} />
          ))}
        </nav>
      </div>
    </div>
  )
}
