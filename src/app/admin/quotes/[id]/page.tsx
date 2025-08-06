import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function QuoteDetailPage({ params }: { params: { id: string } }) {
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
          <h1 className="text-3xl font-bold tracking-tight">Offerte Details</h1>
          <p className="text-muted-foreground">
            ID: {params.id}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Offerte Informatie</CardTitle>
          <CardDescription>
            Details van deze offerte
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
