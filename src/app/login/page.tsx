"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, AlertCircle, Info } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  // Debug information on component mount
  useEffect(() => {
    const info = {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseClient: !!supabase,
      timestamp: new Date().toISOString(),
    }
    setDebugInfo(info)
    console.log("Login page debug info:", info)
  }, [supabase])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt started")
    setIsLoading(true)

    try {
      // Check if Supabase client is available
      if (!supabase) {
        console.error("Supabase client is null")
        throw new Error("Supabase is not configured. Please check your environment variables.")
      }

      console.log("Attempting login for:", email)
      console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Supabase auth error:", error)
        throw error
      }

      console.log("Login successful:", data)

      toast({
        title: "Ingelogd",
        description: "Je bent succesvol ingelogd",
      })

      router.push("/admin")
      router.refresh()
    } catch (error: any) {
      console.error("Login error:", error)
      
      let errorMessage = "Er is een fout opgetreden bij het inloggen"
      
      if (error.message) {
        if (error.message.includes("Failed to fetch")) {
          errorMessage = "Kan geen verbinding maken met de server. Controleer uw internetverbinding en Supabase configuratie."
        } else if (error.message.includes("Invalid login credentials")) {
          errorMessage = "Ongeldige inloggegevens. Controleer uw e-mail en wachtwoord."
        } else if (error.message.includes("Email not confirmed")) {
          errorMessage = "E-mailadres is niet bevestigd. Controleer uw inbox."
        } else {
          errorMessage = error.message
        }
      }

      toast({
        title: "Fout bij inloggen",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Show error if Supabase is not configured
  if (!supabase) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-red-600 flex items-center gap-2">
              <AlertCircle className="h-6 w-6" />
              Configuratie Fout
            </CardTitle>
            <CardDescription>
              Supabase is niet geconfigureerd. Controleer uw environment variables in Vercel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Zorg ervoor dat de volgende variabelen zijn ingesteld in Vercel:
            </p>
            <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
              <li>NEXT_PUBLIC_SUPABASE_URL</li>
              <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
            </ul>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                <strong>Debug Info:</strong><br />
                URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || "Niet ingesteld"}<br />
                Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Aanwezig" : "Niet ingesteld"}<br />
                Timestamp: {debugInfo?.timestamp}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Inloggen</CardTitle>
          <CardDescription>Log in op het beheerderspaneel van Van Velzen Autorecycling</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mailadres</Label>
              <Input
                id="email"
                type="email"
                placeholder="naam@voorbeeld.nl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Wachtwoord</Label>
                <Button variant="link" className="px-0 text-xs" disabled>
                  Wachtwoord vergeten?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {/* Debug information */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Debug Info</span>
              </div>
              <div className="text-xs text-blue-700 space-y-1">
                <div>Supabase URL: {debugInfo?.supabaseUrl || "Niet ingesteld"}</div>
                <div>Anon Key: {debugInfo?.hasAnonKey ? "Aanwezig" : "Niet ingesteld"}</div>
                <div>Client: {debugInfo?.supabaseClient ? "OK" : "Fout"}</div>
                <div>Timestamp: {debugInfo?.timestamp}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Inloggen...
                </>
              ) : (
                "Inloggen"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
