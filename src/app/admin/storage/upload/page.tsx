import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { FileUploadForm } from "../components/file-upload-form"
import { getVehiclesForRecycling } from "@/app/actions/recycling-actions"
import { StorageUploadForm } from "./components/storage-upload-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Force dynamic rendering to prevent static generation issues with cookies
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: "Bestand Uploaden | Van Velzen Autorecycling",
  description: "Upload een nieuw bestand",
}

export default async function UploadFilePage() {
  // Get vehicles for the dropdown
  const vehicles = await getVehiclesForRecycling()

  return (
    <div className="flex-col">
      <div className="flex items-center justify-between">
        <Heading title="Bestand Uploaden" description="Upload een nieuw bestand naar de opslag" />
      </div>
      <Separator />
      <FileUploadForm vehicles={vehicles} />
    </div>
  )
}
