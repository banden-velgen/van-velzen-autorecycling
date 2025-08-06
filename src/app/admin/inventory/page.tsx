import { Suspense } from "react"
import { getInventoryItems } from "@/app/actions/inventory-actions"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import InventoryTableSkeleton from "./loading"

export const metadata = {
  title: "Voorraad | Van Velzen Autorecycling",
}

async function InventoryTable() {
  const { items, error } = await getInventoryItems()

  if (error) {
    return (
      <div className="rounded-md bg-destructive/15 p-4 text-destructive">
        <p>Fout bij het laden van voorraad: {error}</p>
      </div>
    )
  }

  return <DataTable columns={columns} data={items} searchKey="name" />
}

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Voorraad</h1>
          <p className="text-muted-foreground">Beheer uw voorraad onderdelen en materialen</p>
        </div>
        <Link href="/admin/inventory/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nieuw item
          </Button>
        </Link>
      </div>

      <Suspense fallback={<InventoryTableSkeleton />}>
        <InventoryTable />
      </Suspense>
    </div>
  )
}
