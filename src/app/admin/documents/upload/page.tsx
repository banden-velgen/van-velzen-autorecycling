import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { DocumentUploadForm } from "../components/document-upload-form"
import { getAllVehicles } from "@/app/actions/document-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Force dynamic rendering to prevent static generation issues with cookies
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: "Document uploaden | Van Velzen Autorecycling Admin",
  description: "Upload een nieuw document voor een voertuig",
}

export default async function UploadDocumentPage() {
  const result = await getAllVehicles()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/admin/documents">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Document uploaden</h1>
      </div>

      {result.error ? (
        <div className="p-4 border border-destructive bg-destructive/10 rounded-lg">
          <h3 className="font-medium text-destructive">Fout bij het ophalen van voertuigen</h3>
          <p className="text-sm">{result.error}</p>
        </div>
      ) : (
        <DocumentUploadForm vehicles={result.data || []} />
      )}
    </div>
  )
}
