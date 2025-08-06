"use client"

import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"

export function UserNav() {
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      toast({
        title: "Uitgelogd",
        description: "Je bent succesvol uitgelogd",
      })
      router.push("/login")
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="Avatar" />
            <AvatarFallback>VV</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Beheerder</p>
            <p className="text-xs leading-none text-muted-foreground">admin@vanvelzen.nl</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
          Uitloggen
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
