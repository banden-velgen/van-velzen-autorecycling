import { notFound } from "next/navigation"
import Link from "next/link"
import {
  getInventoryItem,
  getInventoryCategories,
  getVehiclesForSelect,
  updateInventoryItem,
} from "@/app/actions/inventory-actions"
import { InventoryForm } from "../../components/inventory-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Voorraaditem bewerken | Van Velzen Autorecycling",
}

export default async function EditInventoryItemPage({ params }: { params: { id: string } }) {
  const { item, error: itemError } = await getInventoryItem(params.id)
  const { categories, error: categoriesError } = await getInventoryCategories()
  const { vehicles, error: vehiclesError } = await getVehiclesForSelect()

  if (itemError || !item) {
    notFound()
  }

  if (categoriesError || vehiclesError) {
    return (
      <div className="rounded-md bg-destructive/15 p-4 text-destructive">
        <p>Er is een fout opgetreden bij het laden van de gegevens:</p>
        {categoriesError && <p>{categoriesError}</p>}
        {vehiclesError && <p>{vehiclesError}</p>}
      </div>
    )
  }

  const updateAction = (formData: FormData) => updateInventoryItem(params.id, formData)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/admin/inventory/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Voorraaditem bewerken</h1>
      </div>

      <InventoryForm initialData={item} categories={categories} vehicles={vehicles} action={updateAction} />
    </div>
  )
}
