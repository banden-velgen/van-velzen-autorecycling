"use client"

import { FileManager } from "@/app/components/file-manager"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface QuoteFilesProps {
  quoteId: string
}

export default function QuoteFiles({ quoteId }: QuoteFilesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documenten & Bestanden</CardTitle>
      </CardHeader>
      <CardContent>
        <FileManager entityType="quote" entityId={quoteId} />
      </CardContent>
    </Card>
  )
}
