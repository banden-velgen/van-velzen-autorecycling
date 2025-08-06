import { Suspense } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { getStorageItems } from "@/app/actions/storage-actions"
import { StorageTable } from "./components/storage-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Force dynamic rendering to prevent static generation issues with cookies
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: "Opslag Beheer | Van Velzen Autorecycling",
  description: "Beheer bestanden en documenten",
}

export default async function StoragePage() {
  const storageItems = await getStorageItems()

  return (
    <div className="flex-col">
      <div className="flex items-center justify-between">
        <Heading title={`Opslag (${storageItems.length})`} description="Beheer bestanden en documenten" />
        <Link href="/admin/storage/upload">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Bestand uploaden
          </Button>
        </Link>
      </div>
      <Separator />
      <Suspense fallback={<div>Laden...</div>}>
        <DataTable columns={columns} data={storageItems} searchKey="name" />
      </Suspense>
    </div>
  )
}
