import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documenten</h1>
        <p className="text-muted-foreground">
          Beheer alle documenten in het systeem
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documenten Overzicht</CardTitle>
          <CardDescription>
            Alle documenten in het systeem
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
