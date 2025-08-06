"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function VehicleCreateForm() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/vehicles">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug naar voertuigen
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nieuw Voertuig</h1>
          <p className="text-muted-foreground">
            Voeg een nieuw voertuig toe aan het systeem
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Voertuig Toevoegen</CardTitle>
          <CardDescription>
            Vul de gegevens in om een nieuw voertuig toe te voegen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Deze pagina wordt binnenkort geïmplementeerd met Neon PostgreSQL integratie.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
