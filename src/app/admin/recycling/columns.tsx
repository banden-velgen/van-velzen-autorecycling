"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { nl } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type RecyclingItem = {
  id: string
  license_plate: string
  brand: string
  model: string
  recycling_date: string | null
  recycling_certificate: string | null
  recycling_method: string | null
  recycling_location: string | null
  created_at: string
}

export const columns: ColumnDef<RecyclingItem>[] = [
  {
    accessorKey: "license_plate",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Kenteken
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="font-medium">
        <Link href={`/admin/recycling/${row.original.id}`} className="hover:underline">
          {row.getValue("license_plate")}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "brand",
    header: "Merk",
    cell: ({ row }) => <div>{row.getValue("brand")}</div>,
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => <div>{row.getValue("model")}</div>,
  },
  {
    accessorKey: "recycling_date",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Recycling Datum
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue("recycling_date") as string | null
      return <div>{date ? format(new Date(date), "d MMMM yyyy", { locale: nl }) : "-"}</div>
    },
  },
  {
    accessorKey: "recycling_certificate",
    header: "Certificaat",
    cell: ({ row }) => {
      const certificate = row.getValue("recycling_certificate") as string | null
      return <div>{certificate || "-"}</div>
    },
  },
  {
    accessorKey: "recycling_method",
    header: "Methode",
    cell: ({ row }) => {
      const method = row.getValue("recycling_method") as string | null
      return <div>{method || "-"}</div>
    },
  },
  {
    accessorKey: "recycling_location",
    header: "Locatie",
    cell: ({ row }) => {
      const location = row.getValue("recycling_location") as string | null
      return <div>{location || "-"}</div>
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Aangemaakt op
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue("created_at") as string
      return <div>{format(new Date(date), "d MMMM yyyy", { locale: nl })}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const recycling = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acties</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/admin/recycling/${recycling.id}`}>Details bekijken</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/recycling/${recycling.id}/edit`}>Bewerken</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
