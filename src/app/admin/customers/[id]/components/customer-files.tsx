"use client"

import { FileManager } from "@/app/components/file-manager"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CustomerFilesProps {
  customerId: string
}

export default function CustomerFiles({ customerId }: CustomerFilesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documenten & Bestanden</CardTitle>
      </CardHeader>
      <CardContent>
        <FileManager entityType="customer" entityId={customerId} />
      </CardContent>
    </Card>
  )
}
