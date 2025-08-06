import { getVehicleDocuments } from "@/app/actions/vehicle-actions"
import { DocumentUpload } from "./document-upload"
import { DocumentList } from "./document-list"

interface DocumentsTabProps {
  vehicleId: string
}

export async function DocumentsTab({ vehicleId }: DocumentsTabProps) {
  const result = await getVehicleDocuments(vehicleId)

  if (result.error) {
    return (
      <div className="p-4 border border-destructive bg-destructive/10 rounded-lg">
        <h3 className="font-medium text-destructive">Fout bij het ophalen van documenten</h3>
        <p className="text-sm">{result.error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <DocumentUpload vehicleId={vehicleId} />
      <h3 className="text-lg font-medium mb-4">Voertuig documenten</h3>
      <DocumentList documents={result.data || []} vehicleId={vehicleId} />
    </div>
  )
}
