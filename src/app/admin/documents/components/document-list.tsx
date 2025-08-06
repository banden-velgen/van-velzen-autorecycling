"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { deleteVehicleDocument } from "@/app/actions/vehicle-actions"
import { Download, FileText, Trash2, Eye } from "lucide-react"

interface Document {
  id: string
  document_type: string
  file_name: string
  file_path: string
  file_size: number
  mime_type: string
  uploaded_at: string
  notes: string | null
  vehicle_id?: string
  vehicle_license_plate?: string
  vehicle_name?: string
}

interface DocumentListProps {
  documents: Document[]
  showVehicleInfo?: boolean
  compact?: boolean
}

export function DocumentList({ documents, showVehicleInfo = false, compact = false }: DocumentListProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const { toast } = useToast()

  if (!documents || documents.length === 0) {
    return (
      <div className="text-center py-6 border rounded-lg">
        <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-2 text-lg font-medium">Geen documenten</h3>
        <p className="text-sm text-muted-foreground">Er zijn geen documenten die overeenkomen met je zoekopdracht.</p>
      </div>
    )
  }

  const handleDelete = async (documentId: string, vehicleId: string) => {
    setIsDeleting(documentId)

    try {
      const result = await deleteVehicleDocument(documentId, vehicleId)

      if (result.error) {
        throw new Error(result.error)
      }

      toast({
        title: "Document verwijderd",
        description: "Het document is succesvol verwijderd",
      })

      // Refresh the page to update the document list
      window.location.reload()
    } catch (error) {
      console.error("Error deleting document:", error)
      toast({
        title: "Fout bij verwijderen",
        description:
          error instanceof Error ? error.message : "Er is een fout opgetreden bij het verwijderen van het document",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "Onbekend"
    const units = ["B", "KB", "MB", "GB"]
    let size = bytes
    let unitIndex = 0

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("nl-NL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  if (compact) {
    return (
      <div className="space-y-2">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-2 border rounded-md">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium truncate max-w-[200px]">{doc.file_name}</p>
                <p className="text-xs text-muted-foreground">{doc.document_type}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <a href={doc.file_path} target="_blank" rel="noopener noreferrer">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Bekijken</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <a href={doc.file_path} download>
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {showVehicleInfo && <TableHead>Voertuig</TableHead>}
            <TableHead>Type</TableHead>
            <TableHead>Bestandsnaam</TableHead>
            <TableHead className="hidden md:table-cell">Grootte</TableHead>
            <TableHead className="hidden md:table-cell">Geüpload op</TableHead>
            <TableHead className="text-right">Acties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              {showVehicleInfo && (
                <TableCell>
                  {doc.vehicle_license_plate && (
                    <Link href={`/admin/vehicles/${doc.vehicle_id}`} className="hover:underline">
                      <div className="font-medium">{doc.vehicle_license_plate}</div>
                      <div className="text-xs text-muted-foreground">{doc.vehicle_name}</div>
                    </Link>
                  )}
                </TableCell>
              )}
              <TableCell>{doc.document_type}</TableCell>
              <TableCell className="font-medium">
                {doc.file_name}
                {doc.notes && <p className="text-xs text-muted-foreground truncate max-w-[200px]">{doc.notes}</p>}
              </TableCell>
              <TableCell className="hidden md:table-cell">{formatFileSize(doc.file_size)}</TableCell>
              <TableCell className="hidden md:table-cell">{formatDate(doc.uploaded_at)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon" asChild>
                    <a href={doc.file_path} target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Bekijken</span>
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href={doc.file_path} download>
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </a>
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Verwijderen</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Document verwijderen?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Weet je zeker dat je dit document wilt verwijderen? Deze actie kan niet ongedaan worden
                          gemaakt.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuleren</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => doc.vehicle_id && handleDelete(doc.id, doc.vehicle_id)}
                          className="bg-destructive hover:bg-destructive/90"
                          disabled={isDeleting === doc.id}
                        >
                          {isDeleting === doc.id ? "Verwijderen..." : "Verwijderen"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
