"use client"
import Link from "next/link"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileUploadButtonProps {
  entityType: string
  entityId: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
}

export function FileUploadButton({ entityType, entityId, variant = "default" }: FileUploadButtonProps) {
  return (
    <Link href={`/admin/storage/upload?entityType=${entityType}&entityId=${entityId}`}>
      <Button variant={variant}>
        <Upload className="mr-2 h-4 w-4" />
        Bestand uploaden
      </Button>
    </Link>
  )
}
