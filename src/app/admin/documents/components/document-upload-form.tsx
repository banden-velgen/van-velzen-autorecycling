"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { uploadVehicleDocument } from "@/app/actions/vehicle-actions"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Upload } from "lucide-react"

interface Vehicle {
  id: string
  license_plate: string
  make: string
  model: string
  year: string | null
}

interface DocumentUploadFormProps {
  vehicles: Vehicle[]
}

export function DocumentUploadForm({ vehicles }: DocumentUploadFormProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [vehicleId, setVehicleId] = useState("")
  const [documentType, setDocumentType] = useState("")
  const [notes, setNotes] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    formData.append("vehicleId", vehicleId)
    formData.append("documentType", documentType)

    const file = formData.get("file") as File

    if (!file || file.size === 0) {
      toast({
        title: "Fout",
        description: "Selecteer een bestand om te uploaden",
        variant: "destructive",
      })
      return
    }

    if (!vehicleId) {
      toast({
        title: "Fout",
        description: "Selecteer een voertuig",
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

      // Redirect to documents page
      router.push("/admin/documents")
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
    <Card>
      <CardHeader>
        <CardTitle>Document uploaden</CardTitle>
        <CardDescription>Upload een nieuw document voor een voertuig</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="vehicleId">Voertuig</Label>
              <Select value={vehicleId} onValueChange={setVehicleId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer een voertuig" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.license_plate} - {vehicle.make} {vehicle.model} {vehicle.year && `(${vehicle.year})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="documentType">Documenttype</Label>
              <Select value={documentType} onValueChange={setDocumentType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer documenttype" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kentekenbewijs">Kentekenbewijs</SelectItem>
                  <SelectItem value="Inspectie Rapport">APK rapport</SelectItem>
                  <SelectItem value="Aankoopbewijs">Aankoopbewijs</SelectItem>
                  <SelectItem value="Demontage Certificaat">Demontage certificaat</SelectItem>
                  <SelectItem value="Foto's">Foto's</SelectItem>
                  <SelectItem value="Overig">Overig</SelectItem>
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
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/documents")}
              disabled={isUploading}
            >
              Annuleren
            </Button>
            <Button type="submit" disabled={isUploading}>
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
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
