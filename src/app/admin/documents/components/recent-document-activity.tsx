"use client"

import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface ActivityItem {
  id: string
  documentId: string
  documentName: string
  documentType: string
  vehicleId: string
  licensePlate: string
  action: "upload" | "delete" | "view"
  timestamp: string
  user: string
}

interface RecentDocumentActivityProps {
  data: ActivityItem[]
}

export function RecentDocumentActivity({ data }: RecentDocumentActivityProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("nl-NL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getActionText = (action: string) => {
    switch (action) {
      case "upload":
        return "heeft geüpload"
      case "delete":
        return "heeft verwijderd"
      case "view":
        return "heeft bekeken"
      default:
        return "heeft actie uitgevoerd op"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">Geen recente activiteit gevonden</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {data.map((item) => (
        <div key={item.id} className="flex items-start gap-4">
          <Avatar>
            <AvatarFallback>{getInitials(item.user)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-1">
            <p className="text-sm font-medium leading-none">
              <span className="font-semibold">{item.user}</span> {getActionText(item.action)}{" "}
              <span className="font-medium">{item.documentType}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              {item.documentName} voor voertuig {item.licensePlate}
            </p>
            <p className="text-xs text-muted-foreground">{formatDate(item.timestamp)}</p>
          </div>
          <Link href={`/admin/vehicles/${item.vehicleId}`}>
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              Details
            </Button>
          </Link>
        </div>
      ))}
    </div>
  )
}
