import { getStorageItemsByEntity } from "@/app/actions/storage-actions"
import { formatFileSize } from "@/lib/utils"
import { FileIcon, Download } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { nl } from "date-fns/locale"

interface FileListProps {
  entityType: string
  entityId: string
}

export async function FileList({ entityType, entityId }: FileListProps) {
  const files = await getStorageItemsByEntity(entityType, entityId)

  if (files.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <p>Geen bestanden gevonden</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {files.map((file) => {
        const fileType = file.file_type.split("/").pop()?.toUpperCase() || file.file_type

        return (
          <div key={file.id} className="flex items-center justify-between border rounded-md p-3">
            <div className="flex items-center gap-3">
              <FileIcon className="h-8 w-8 text-primary" />
              <div>
                <Link href={`/admin/storage/${file.id}`} className="font-medium hover:underline">
                  {file.name}
                </Link>
                <div className="text-sm text-muted-foreground">
                  {fileType} • {formatFileSize(file.file_size)} •{" "}
                  {format(new Date(file.created_at), "dd MMM yyyy", { locale: nl })}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/storage/${file.id}/download`}>
                <Download className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
