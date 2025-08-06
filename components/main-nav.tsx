"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 flex">
      <Link href="/admin" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">Van Velzen Autorecycling</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        
      </nav>
    </div>
  )
}
