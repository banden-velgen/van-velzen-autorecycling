import { notFound } from "next/navigation"
import Link from "next/link"
import { getInventoryItem } from "@/app/actions/inventory-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, ArrowLeft, Package, Car, MapPin, Tag } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"
import { QuantityAdjuster } from "../components/quantity-adjuster"
import { DeleteInventoryButton } from "../components/delete-inventory-button"

export const metadata = {
  title: "Voorraaditem details | Van Velzen Autorecycling",
}

export default async function InventoryItemPage({ params }: { params: { id: string } }) {
  const { item, error } = await getInventoryItem(params.id)

  if (error || !item) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/inventory">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{item.name}</h1>
          {item.is_active ? <Badge variant="success">Actief</Badge> : <Badge variant="destructive">Inactief</Badge>}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/admin/inventory/${item.id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              Bewerken
            </Link>
          </Button>
          <DeleteInventoryButton id={item.id} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Details</CardTitle>
            <CardDescription>Informatie over dit voorraaditem</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {item.description && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Beschrijving</h3>
                <p className="text-sm">{item.description}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Categorie</h3>
                  <div className="flex items-center">
                    <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{item.inventory_categories?.name || "Geen categorie"}</span>
                  </div>
                </div>

                {item.vehicle_id && item.vehicles && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Voertuig</h3>
                    <div className="flex items-center">
                      <Car className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Link href={`/admin/vehicles/${item.vehicle_id}`} className="hover:underline">
                        {item.vehicles.license_plate} ({item.vehicles.brand} {item.vehicles.model})
                      </Link>
                    </div>
                  </div>
                )}

                {item.location && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Locatie</h3>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                )}

                {item.sku && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">SKU / Artikelnummer</h3>
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{item.sku}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Conditie</h3>
                  <Badge
                    variant={
                      item.condition === "Nieuw"
                        ? "default"
                        : item.condition === "Gebruikt (A)"
                          ? "success"
                          : item.condition === "Gebruikt (B)"
                            ? "warning"
                            : item.condition === "Gebruikt (C)"
                              ? "destructive"
                              : "outline"
                    }
                  >
                    {item.condition || "Onbekend"}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Verkoopprijs</h3>
                  <p className="text-lg font-semibold">{formatCurrency(item.price)}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Kostprijs</h3>
                  <p className="text-sm">{formatCurrency(item.cost)}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Toegevoegd op</h3>
                  <p className="text-sm">{formatDate(item.created_at)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Voorraad</CardTitle>
            <CardDescription>Beheer de voorraad van dit item</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Huidige voorraad</h3>
              <QuantityAdjuster id={item.id} initialQuantity={item.quantity} />
            </div>

            {item.image_url && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Afbeelding</h3>
                <div className="rounded-md overflow-hidden border">
                  <img
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
