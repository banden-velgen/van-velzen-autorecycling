"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { uploadFile, type FileEntityType } from "@/app/actions/storage-actions"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Loader2, Upload, FileIcon, X } from "lucide-react"

interface FileUploadProps {
  entityType: FileEntityType
  entityId: string
  onSuccess?: () => void
}

export function FileUpload({ entityType, entityId, onSuccess }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const clearFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      toast({
        title: "Geen bestand geselecteerd",
        description: "Selecteer een bestand om te uploaden",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("entityType", entityType)
      formData.append("entityId", entityId)
      formData.append("description", description)

      const result = await uploadFile(formData)

      if (result.error) {
        toast({
          title: "Fout bij uploaden",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Bestand geüpload",
          description: "Het bestand is succesvol geüpload",
        })

        // Reset form
        setFile(null)
        setDescription("")
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }

        // Refresh the page or call onSuccess callback
        if (onSuccess) {
          onSuccess()
        } else {
          router.refresh()
        }
      }
    } catch (error) {
      toast({
        title: "Fout bij uploaden",
        description: "Er is een onverwachte fout opgetreden",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bestand uploaden</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">Bestand</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                disabled={isUploading}
                className="flex-1"
              />
              {file && (
                <Button type="button" variant="outline" size="icon" onClick={clearFile} disabled={isUploading}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {file && (
            <div className="rounded-md bg-muted p-4">
              <div className="flex items-start gap-4">
                <FileIcon className="h-8 w-8 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Beschrijving (optioneel)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isUploading}
              placeholder="Voeg een beschrijving toe voor dit bestand"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={!file || isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploaden...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Uploaden
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
