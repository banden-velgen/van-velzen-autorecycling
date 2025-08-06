"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { DataTableRowActions } from "@/components/ui/data-table-row-actions"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

export type InventoryItem = {
  id: string
  name: string
  sku: string
  category_id: string
  inventory_categories: {
    name: string
  }
  vehicle_id: string | null
  vehicles: {
    license_plate: string
    brand: string
    model: string
  } | null
  condition: string
  price: number
  quantity: number
  location: string
  is_active: boolean
  created_at: string
}

export const columns: ColumnDef<InventoryItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Naam" />,
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          <Link href={`/admin/inventory/${row.original.id}`} className="hover:underline">
            {row.getValue("name")}
          </Link>
        </div>
      )
    },
  },
  {
    accessorKey: "sku",
    header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
    cell: ({ row }) => <div>{row.getValue("sku") || "-"}</div>,
  },
  {
    accessorKey: "inventory_categories.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Categorie" />,
    cell: ({ row }) => <div>{row.original.inventory_categories?.name || "-"}</div>,
  },
  {
    accessorKey: "vehicles",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Voertuig" />,
    cell: ({ row }) => {
      const vehicle = row.original.vehicles
      if (!vehicle) return <div>-</div>
      return (
        <div>
          <Link href={`/admin/vehicles/${row.original.vehicle_id}`} className="hover:underline">
            {vehicle.license_plate} ({vehicle.brand} {vehicle.model})
          </Link>
        </div>
      )
    },
  },
  {
    accessorKey: "condition",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Conditie" />,
    cell: ({ row }) => {
      const condition = row.getValue("condition") as string
      return (
        <Badge
          variant={
            condition === "Nieuw"
              ? "default"
              : condition === "Gebruikt (A)"
                ? "success"
                : condition === "Gebruikt (B)"
                  ? "warning"
                  : condition === "Gebruikt (C)"
                    ? "destructive"
                    : "outline"
          }
        >
          {condition || "Onbekend"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Prijs" />,
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("price"))
      return <div className="font-medium">{formatCurrency(price)}</div>
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Aantal" />,
    cell: ({ row }) => {
      const quantity = Number.parseInt(row.getValue("quantity"))
      return <Badge variant={quantity > 0 ? "outline" : "destructive"}>{quantity}</Badge>
    },
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const isActive = row.getValue("is_active")
      return <Badge variant={isActive ? "success" : "destructive"}>{isActive ? "Actief" : "Inactief"}</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original

      return (
        <DataTableRowActions
          row={row}
          actions={[
            {
              label: "Bekijken",
              href: `/admin/inventory/${item.id}`,
            },
            {
              label: "Bewerken",
              href: `/admin/inventory/${item.id}/edit`,
            },
          ]}
        />
      )
    },
  },
]
