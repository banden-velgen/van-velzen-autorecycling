"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, FileIcon, Download, Trash } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import type { StorageItem } from "@/app/actions/storage-actions"
import { formatFileSize } from "@/lib/utils"

export const columns: ColumnDef<StorageItem>[] = [
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
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Bestandsnaam
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <FileIcon className="h-4 w-4" />
        <span className="font-medium">{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "file_type",
    header: "Type",
    cell: ({ row }) => {
      const fileType = row.getValue("file_type") as string
      const shortType = fileType.split("/").pop()?.toUpperCase() || fileType

      return (
        <Badge variant="outline" className="bg-blue-50">
          {shortType}
        </Badge>
      )
    },
  },
  {
    accessorKey: "file_size",
    header: "Grootte",
    cell: ({ row }) => {
      const size = row.getValue("file_size") as number
      return <div>{formatFileSize(size)}</div>
    },
  },
  {
    accessorKey: "entity_type",
    header: "Entiteit",
    cell: ({ row }) => {
      const entityType = row.getValue("entity_type") as string
      const entityId = row.original.entity_id

      let displayName = entityType
      switch (entityType) {
        case "vehicles":
          displayName = "Voertuig"
          break
        case "recycling":
          displayName = "Recycling"
          break
        case "quotes":
          displayName = "Offerte"
          break
        default:
          displayName = entityType
      }

      return (
        <Link href={`/admin/${entityType}/${entityId}`}>
          <Badge variant="outline" className="hover:bg-primary/10 cursor-pointer">
            {displayName}
          </Badge>
        </Link>
      )
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Geüpload op
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue("created_at") as string
      return <div>{format(new Date(date), "dd MMM yyyy", { locale: nl })}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original

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
            <Link href={`/admin/storage/${item.id}`}>
              <DropdownMenuItem>Details bekijken</DropdownMenuItem>
            </Link>
            <Link href={`/admin/storage/${item.id}/download`}>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Downloaden
              </DropdownMenuItem>
            </Link>
            <Link href={`/admin/storage/${item.id}/delete`}>
              <DropdownMenuItem className="text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                Verwijderen
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
