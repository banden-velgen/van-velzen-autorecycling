import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RecyclingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Recycling</h1>
        <p className="text-muted-foreground">
          Beheer alle recycling records in het systeem
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recycling Overzicht</CardTitle>
          <CardDescription>
            Alle recycling records in het systeem
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
