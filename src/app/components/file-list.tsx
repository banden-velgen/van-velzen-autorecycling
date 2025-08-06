"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { deleteFile, updateFileMetadata, type FileEntityType } from "@/app/actions/storage-actions"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { formatDate, formatFileSize } from "@/lib/utils"
import { Download, Trash, Edit, FileIcon, Image, FileText, FileIcon as FilePdf, FileArchive } from "lucide-react"

interface File {
  id: string
  entity_type: string
  entity_id: string
  file_name: string
  file_path: string
  file_size: number
  file_type: string
  description: string
  public_url: string
  created_at: string
  updated_at: string
}

interface FileListProps {
  files: File[]
  entityType: FileEntityType
  entityId: string
  onRefresh?: () => void
}

export function FileList({ files, entityType, entityId, onRefresh }: FileListProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [fileToDelete, setFileToDelete] = useState<string | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [fileToEdit, setFileToEdit] = useState<File | null>(null)
  const [editDescription, setEditDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleDeleteClick = (fileId: string) => {
    setFileToDelete(fileId)
    setIsDeleteDialogOpen(true)
  }

  const handleEditClick = (file: File) => {
    setFileToEdit(file)
    setEditDescription(file.description || "")
    setIsEditDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!fileToDelete) return

    setIsLoading(true)

    try {
      const result = await deleteFile(fileToDelete)

      if (result.error) {
        toast({
          title: "Fout bij verwijderen",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Bestand verwijderd",
          description: "Het bestand is succesvol verwijderd",
        })

        // Refresh the page or call onRefresh callback
        if (onRefresh) {
          onRefresh()
        } else {
          router.refresh()
        }
      }
    } catch (error) {
      toast({
        title: "Fout bij verwijderen",
        description: "Er is een onverwachte fout opgetreden",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsDeleteDialogOpen(false)
      setFileToDelete(null)
    }
  }

  const handleUpdate = async () => {
    if (!fileToEdit) return

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("description", editDescription)

      const result = await updateFileMetadata(fileToEdit.id, formData)

      if (result.error) {
        toast({
          title: "Fout bij bijwerken",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Bestand bijgewerkt",
          description: "De bestandsinformatie is succesvol bijgewerkt",
        })

        // Refresh the page or call onRefresh callback
        if (onRefresh) {
          onRefresh()
        } else {
          router.refresh()
        }
      }
    } catch (error) {
      toast({
        title: "Fout bij bijwerken",
        description: "Er is een onverwachte fout opgetreden",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsEditDialogOpen(false)
      setFileToEdit(null)
    }
  }

  // Function to get the appropriate icon based on file type
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <Image className="h-5 w-5" />
    } else if (fileType === "application/pdf") {
      return <FilePdf className="h-5 w-5" />
    } else if (fileType.startsWith("text/")) {
      return <FileText className="h-5 w-5" />
    } else if (fileType.includes("zip") || fileType.includes("compressed")) {
      return <FileArchive className="h-5 w-5" />
    } else {
      return <FileIcon className="h-5 w-5" />
    }
  }

  if (files.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Bestanden</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Geen bestanden gevonden</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Bestanden</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Naam</TableHead>
                <TableHead>Grootte</TableHead>
                <TableHead>Beschrijving</TableHead>
                <TableHead>Geüpload op</TableHead>
                <TableHead className="text-right">Acties</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>{getFileIcon(file.file_type)}</TableCell>
                  <TableCell className="font-medium">{file.file_name}</TableCell>
                  <TableCell>{formatFileSize(file.file_size)}</TableCell>
                  <TableCell>{file.description || "-"}</TableCell>
                  <TableCell>{formatDate(file.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <a href={file.public_url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </a>
                      <Button variant="outline" size="icon" onClick={() => handleEditClick(file)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Bewerken</span>
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDeleteClick(file.id)}>
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Verwijderen</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bestandsinformatie bewerken</DialogTitle>
            <DialogDescription>Werk de beschrijving van het bestand bij.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-description">Beschrijving</Label>
              <Textarea
                id="edit-description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                disabled={isLoading}
                placeholder="Voeg een beschrijving toe voor dit bestand"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isLoading}>
              Annuleren
            </Button>
            <Button onClick={handleUpdate} disabled={isLoading}>
              {isLoading ? "Bijwerken..." : "Bijwerken"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bestand verwijderen</AlertDialogTitle>
            <AlertDialogDescription>
              Weet je zeker dat je dit bestand wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Annuleren</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isLoading} className="bg-red-600 hover:bg-red-700">
              {isLoading ? "Verwijderen..." : "Verwijderen"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
