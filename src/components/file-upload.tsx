"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, Image, FileIcon, Trash2 } from "lucide-react"
import { uploadFileAction, deleteFileAction, getFilesAction } from "@/app/actions/file-actions"
import { useToast } from "@/hooks/use-toast"
import type { FileMetadata } from "@/lib/utils/file-storage"

interface FileUploadProps {
  entityType: "customer" | "vehicle" | "quote" | "pickup" | "recycling"
  entityId: string
  initialFiles?: FileMetadata[]
  title?: string
  description?: string
}

export function FileUpload({
  entityType,
  entityId,
  initialFiles = [],
  title = "Bestanden",
  description = "Upload bestanden voor dit item",
}: FileUploadProps) {
  const [files, setFiles] = useState<FileMetadata[]>(initialFiles)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return
    }

    setIsUploading(true)
    setError(null)

    const file = event.target.files[0]
    const formData = new FormData()
    formData.append("file", file)

    try {
      const result = await uploadFileAction(formData, entityType, entityId)

      if (result.success && result.file) {
        setFiles((prevFiles) => [result.file!, ...prevFiles])
        toast({
          title: "Bestand geüpload",
          description: `${file.name} is succesvol geüpload.`,
        })
      } else {
        setError(result.error || "Er is een fout opgetreden bij het uploaden van het bestand.")
        toast({
          title: "Fout bij uploaden",
          description: result.error || "Er is een fout opgetreden bij het uploaden van het bestand.",
          variant: "destructive",
        })
      }
    } catch (err) {
      setError("Er is een fout opgetreden bij het uploaden van het bestand.")
      toast({
        title: "Fout bij uploaden",
        description: "Er is een fout opgetreden bij het uploaden van het bestand.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleDelete = async (fileId: string) => {
    if (!confirm("Weet je zeker dat je dit bestand wilt verwijderen?")) {
      return
    }

    try {
      const result = await deleteFileAction(fileId, entityType, entityId)

      if (result.success) {
        setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId))
        toast({
          title: "Bestand verwijderd",
          description: "Het bestand is succesvol verwijderd.",
        })
      } else {
        toast({
          title: "Fout bij verwijderen",
          description: result.error || "Er is een fout opgetreden bij het verwijderen van het bestand.",
          variant: "destructive",
        })
      }
    } catch (err) {
      toast({
        title: "Fout bij verwijderen",
        description: "Er is een fout opgetreden bij het verwijderen van het bestand.",
        variant: "destructive",
      })
    }
  }

  const refreshFiles = async () => {
    try {
      const result = await getFilesAction(entityType, entityId)

      if (result.success && result.files) {
        setFiles(result.files)
      } else {
        toast({
          title: "Fout bij ophalen bestanden",
          description: result.error || "Er is een fout opgetreden bij het ophalen van de bestanden.",
          variant: "destructive",
        })
      }
    } catch (err) {
      toast({
        title: "Fout bij ophalen bestanden",
        description: "Er is een fout opgetreden bij het ophalen van de bestanden.",
        variant: "destructive",
      })
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <Image className="h-5 w-5" />
    } else if (fileType === "application/pdf") {
      return <FileText className="h-5 w-5" />
    } else {
      return <FileIcon className="h-5 w-5" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
      return `${bytes} B`
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`
    } else {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Klik om te uploaden</span> of sleep een bestand
                </p>
                <p className="text-xs text-gray-500">JPG, PNG, GIF, PDF, DOC, DOCX, XLS, XLSX, TXT (max 10MB)</p>
              </div>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleUpload}
                disabled={isUploading}
                ref={fileInputRef}
              />
            </label>
          </div>

          {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">{error}</div>}

          {isUploading && (
            <div className="p-3 text-sm text-blue-500 bg-blue-50 rounded-md">Bestand wordt geüpload...</div>
          )}

          {files.length > 0 ? (
            <div className="space-y-2">
              {files.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file.type)}
                    <div>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:underline"
                      >
                        {file.name}
                      </a>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)} • {new Date(file.created_at).toLocaleString("nl-NL")}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(file.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 text-sm text-gray-500 bg-gray-50 rounded-md text-center">Geen bestanden gevonden</div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={refreshFiles}>
          Vernieuwen
        </Button>
      </CardFooter>
    </Card>
  )
}
