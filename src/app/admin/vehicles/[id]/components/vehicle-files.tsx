"use client"

import { FileManager } from "@/app/components/file-manager"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface VehicleFilesProps {
  vehicleId: string
}

export default function VehicleFiles({ vehicleId }: VehicleFilesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documenten & Bestanden</CardTitle>
      </CardHeader>
      <CardContent>
        <FileManager entityType="vehicle" entityId={vehicleId} />
      </CardContent>
    </Card>
  )
}
