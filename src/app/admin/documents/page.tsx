import type { Metadata } from "next"
import { getVehiclesWithDocuments } from "@/app/actions/document-actions"
import { DocumentDashboard } from "./components/document-dashboard"
import { DocumentsTable } from "./components/documents-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Force dynamic rendering to prevent static generation issues with cookies
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: "Documentbeheer | Van Velzen Autorecycling Admin",
  description: "Beheer alle voertuigdocumenten in één overzicht",
}

export default async function DocumentsPage() {
  const result = await getVehiclesWithDocuments()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Documentbeheer</h1>
        <p className="text-muted-foreground">Beheer alle voertuigdocumenten in één overzicht</p>
      </div>

      {result.error ? (
        <div className="p-4 border border-destructive bg-destructive/10 rounded-lg">
          <h3 className="font-medium text-destructive">Fout bij het ophalen van documenten</h3>
          <p className="text-sm">{result.error}</p>
        </div>
      ) : (
        <DocumentDashboard vehicles={result.data || []} />
      )}
    </div>
  )
}
