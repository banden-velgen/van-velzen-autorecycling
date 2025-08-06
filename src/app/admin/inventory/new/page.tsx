import { getInventoryCategories, getVehiclesForSelect, createInventoryItem } from "@/app/actions/inventory-actions"
import { InventoryForm } from "../components/inventory-form"

export const metadata = {
  title: "Nieuw voorraaditem | Van Velzen Autorecycling",
}

export default async function NewInventoryItemPage() {
  const { categories, error: categoriesError } = await getInventoryCategories()
  const { vehicles, error: vehiclesError } = await getVehiclesForSelect()

  if (categoriesError || vehiclesError) {
    return (
      <div className="rounded-md bg-destructive/15 p-4 text-destructive">
        <p>Er is een fout opgetreden bij het laden van de gegevens:</p>
        {categoriesError && <p>{categoriesError}</p>}
        {vehiclesError && <p>{vehiclesError}</p>}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nieuw voorraaditem</h1>
        <p className="text-muted-foreground">Voeg een nieuw onderdeel of item toe aan de voorraad</p>
      </div>

      <InventoryForm categories={categories} vehicles={vehicles} action={createInventoryItem} />
    </div>
  )
}
