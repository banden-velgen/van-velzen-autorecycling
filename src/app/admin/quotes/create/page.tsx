import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateQuotePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/quotes">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug naar offertes
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nieuwe Offerte</h1>
          <p className="text-muted-foreground">
            Maak een nieuwe offerte aan
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Offerte Aanmaken</CardTitle>
          <CardDescription>
            Vul de gegevens in om een nieuwe offerte aan te maken
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
