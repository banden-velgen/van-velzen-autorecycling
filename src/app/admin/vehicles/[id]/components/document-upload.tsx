"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { uploadVehicleDocument } from "@/app/actions/vehicle-actions"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Upload } from "lucide-react"

interface DocumentUploadProps {
  vehicleId: string
}

export function DocumentUpload({ vehicleId }: DocumentUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [documentType, setDocumentType] = useState("")
  const [notes, setNotes] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    formData.append("vehicleId", vehicleId)

    const file = formData.get("file") as File

    if (!file || file.size === 0) {
      toast({
        title: "Fout",
        description: "Selecteer een bestand om te uploaden",
        variant: "destructive",
      })
      return
    }

    if (!documentType) {
      toast({
        title: "Fout",
        description: "Selecteer een documenttype",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      const result = await uploadVehicleDocument(formData)

      if (result.error) {
        throw new Error(result.error)
      }

      toast({
        title: "Document geüpload",
        description: "Het document is succesvol geüpload",
      })

      // Reset form
      e.currentTarget.reset()
      setDocumentType("")
      setNotes("")

      // Refresh the page to show the new document
      window.location.reload()
    } catch (error) {
      console.error("Error uploading document:", error)
      toast({
        title: "Fout bij uploaden",
        description:
          error instanceof Error ? error.message : "Er is een fout opgetreden bij het uploaden van het document",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-medium mb-4">Document uploaden</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="documentType">Documenttype</Label>
          <Select value={documentType} onValueChange={setDocumentType} required>
            <SelectTrigger>
              <SelectValue placeholder="Selecteer documenttype" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="registration">Kentekenbewijs</SelectItem>
              <SelectItem value="inspection">APK rapport</SelectItem>
              <SelectItem value="purchase">Aankoopbewijs</SelectItem>
              <SelectItem value="dismantling">Demontage certificaat</SelectItem>
              <SelectItem value="other">Overig</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="file">Bestand</Label>
          <Input id="file" name="file" type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" required />
          <p className="text-sm text-muted-foreground mt-1">Toegestane bestandstypen: PDF, JPG, PNG, DOC, DOCX</p>
        </div>

        <div>
          <Label htmlFor="notes">Notities</Label>
          <Textarea
            id="notes"
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optionele notities over dit document"
            rows={3}
          />
        </div>

        <Button type="submit" disabled={isUploading} className="w-full">
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploaden...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Document uploaden
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
