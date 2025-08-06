import { Suspense } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { RecyclingTable } from "./components/recycling-table"
import { columns } from "./columns"
import { getRecycledVehicles } from "@/app/actions/recycling-actions"

// Force dynamic rendering to prevent static generation issues with cookies
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: "Recycling | Van Velzen Autorecycling Admin",
  description: "Beheer gerecyclede voertuigen",
}

export default async function RecyclingPage() {
  const recycledVehicles = await getRecycledVehicles()

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <Heading title={`Recycling (${recycledVehicles.length})`} description="Beheer gerecyclede voertuigen" />
        <Link href="/admin/recycling/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nieuwe recycling
          </Button>
        </Link>
      </div>
      <Separator />
      <Suspense fallback={<div>Laden...</div>}>
        <RecyclingTable data={recycledVehicles} columns={columns} />
      </Suspense>
    </div>
  )
}
