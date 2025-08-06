"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { deleteFile, type StorageItem } from "@/app/actions/storage-actions"
import { useToast } from "@/hooks/use-toast"
import { formatFileSize } from "@/lib/utils"

interface DeleteFileFormProps {
  file: StorageItem
}

export function DeleteFileForm({ file }: DeleteFileFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  async function onDelete() {
    setLoading(true)

    try {
      const result = await deleteFile(file.id)

      if (result.success) {
        toast({
          title: "Succes!",
          description: "Bestand succesvol verwijderd.",
        })
        router.push("/admin/storage")
      } else {
        toast({
          title: "Fout",
          description: result.error || "Er is iets misgegaan bij het verwijderen van het bestand.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting file:", error)
      toast({
        title: "Fout",
        description: "Er is iets misgegaan. Probeer het opnieuw.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Determine file type for display
  const fileType = file.file_type.split("/").pop()?.toUpperCase() || file.file_type

  return (
    <div className="space-y-6 py-6">
      <div className="bg-destructive/10 border border-destructive/30 rounded-md p-6">
        <h3 className="text-lg font-medium mb-4">Bevestig verwijdering</h3>
        <p className="mb-2">Je staat op het punt om het volgende bestand te verwijderen:</p>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>
            <strong>Naam:</strong> {file.name}
          </li>
          <li>
            <strong>Type:</strong> {fileType}
          </li>
          <li>
            <strong>Grootte:</strong> {formatFileSize(file.file_size)}
          </li>
        </ul>
        <p className="text-destructive font-medium">Deze actie kan niet ongedaan worden gemaakt.</p>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
          Annuleren
        </Button>
        <Button type="button" variant="destructive" onClick={onDelete} disabled={loading}>
          {loading ? (
            "Bezig met verwijderen..."
          ) : (
            <>
              <Trash className="mr-2 h-4 w-4" />
              Bestand verwijderen
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
