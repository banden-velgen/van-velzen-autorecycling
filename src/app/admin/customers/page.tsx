import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Klanten</h1>
          <p className="text-muted-foreground">
            Beheer alle klanten in het systeem
          </p>
        </div>
        <Link href="/admin/customers/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nieuwe Klant
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Klanten Overzicht</CardTitle>
          <CardDescription>
            Alle klanten in het systeem
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
