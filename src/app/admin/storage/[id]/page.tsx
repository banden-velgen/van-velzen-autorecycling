import { notFound } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { nl } from "date-fns/locale"
import { ArrowLeft, Download, Trash, FileIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { getStorageItemById } from "@/app/actions/storage-actions"
import { formatFileSize } from "@/lib/utils"

export const metadata = {
  title: "Bestand Details | Van Velzen Autorecycling",
  description: "Bekijk bestand details",
}

export default async function FileDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const file = await getStorageItemById(params.id)

  if (!file) {
    notFound()
  }

  // Determine file type for display
  const fileType = file.file_type.split("/").pop()?.toUpperCase() || file.file_type

  // Determine entity name for display
  let entityName = file.entity_type
  switch (file.entity_type) {
    case "vehicles":
      entityName = "Voertuig"
      break
    case "recycling":
      entityName = "Recycling"
      break
    case "quotes":
      entityName = "Offerte"
      break
    case "general":
      entityName = "Algemeen"
      break
    default:
      entityName = file.entity_type
  }

  return (
    <div className="flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/storage">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <Heading
            title={`Bestand: ${file.name}`}
            description={`Geüpload op ${format(new Date(file.created_at), "dd MMMM yyyy", { locale: nl })}`}
          />
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/storage/${params.id}/download`}>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Downloaden
            </Button>
          </Link>
          <Link href={`/admin/storage/${params.id}/delete`}>
            <Button variant="destructive">
              <Trash className="mr-2 h-4 w-4" />
              Verwijderen
            </Button>
          </Link>
        </div>
      </div>
      <Separator />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Bestand Informatie</h3>
            <Separator className="my-2" />
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="font-medium">Naam:</dt>
                <dd>{file.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Type:</dt>
                <dd>{fileType}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Grootte:</dt>
                <dd>{formatFileSize(file.file_size)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Geüpload op:</dt>
                <dd>{format(new Date(file.created_at), "dd MMMM yyyy HH:mm", { locale: nl })}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Gerelateerde Informatie</h3>
            <Separator className="my-2" />
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="font-medium">Entiteitstype:</dt>
                <dd>{entityName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Entiteits-ID:</dt>
                <dd className="truncate max-w-[200px]">{file.entity_id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Bestandspad:</dt>
                <dd className="truncate max-w-[200px]">{file.file_path}</dd>
              </div>
            </dl>
          </div>

          <div className="pt-4">
            <Link href={`/admin/${file.entity_type}/${file.entity_id}`}>
              <Button variant="outline" className="w-full">
                Ga naar gerelateerde {entityName.toLowerCase()}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="border rounded-md p-6 flex flex-col items-center justify-center">
        <FileIcon className="h-16 w-16 text-primary mb-4" />
        <p className="text-lg font-medium">{file.name}</p>
        <p className="text-sm text-muted-foreground">
          {fileType} - {formatFileSize(file.file_size)}
        </p>
        <div className="mt-4">
          <Link href={`/admin/storage/${params.id}/download`}>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Downloaden
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
