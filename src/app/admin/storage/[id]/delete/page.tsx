import { Suspense } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { getStorageItemById } from "@/app/actions/storage-actions"
import { DeleteFileForm } from "../../components/delete-file-form"

export const metadata = {
  title: "Bestand Verwijderen | Van Velzen Autorecycling",
  description: "Verwijder een bestand",
}

export default async function DeleteFilePage({
  params,
}: {
  params: { id: string }
}) {
  const file = await getStorageItemById(params.id)

  if (!file) {
    notFound()
  }

  return (
    <div className="flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={`/admin/storage/${params.id}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <Heading title="Bestand Verwijderen" description="Weet je zeker dat je dit bestand wilt verwijderen?" />
        </div>
      </div>
      <Separator />
      <Suspense fallback={<div>Laden...</div>}>
        <DeleteFileForm file={file} />
      </Suspense>
    </div>
  )
}
