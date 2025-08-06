import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Voorraad</h1>
        <p className="text-muted-foreground">
          Beheer alle voorraad in het systeem
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Voorraad Overzicht</CardTitle>
          <CardDescription>
            Alle voorraad in het systeem
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
