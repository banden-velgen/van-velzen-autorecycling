"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { uploadFile } from "@/app/actions/storage-actions"
import { useToast } from "@/hooks/use-toast"

interface FileUploadFormProps {
  vehicles: any[]
  entityType?: string
  entityId?: string
}

export function FileUploadForm({ vehicles, entityType, entityId }: FileUploadFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedEntityType, setSelectedEntityType] = useState(entityType || "")
  const [selectedEntityId, setSelectedEntityId] = useState(entityId || "")

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(event.currentTarget)

      if (!selectedFile) {
        toast({
          title: "Fout",
          description: "Selecteer een bestand om te uploaden",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      formData.set("file", selectedFile)

      const result = await uploadFile(formData)

      if (result.success) {
        toast({
          title: "Succes!",
          description: "Bestand succesvol geüpload.",
        })

        if (entityType && entityId) {
          router.push(`/admin/${entityType}/${entityId}`)
        } else {
          router.push("/admin/storage")
        }
      } else {
        toast({
          title: "Fout",
          description: result.error || "Er is iets misgegaan bij het uploaden van het bestand.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error uploading file:", error)
      toast({
        title: "Fout",
        description: "Er is iets misgegaan. Probeer het opnieuw.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <div className="space-y-4 py-4 md:py-8">
      <form onSubmit={onSubmit} className="space-y-8 w-full">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <FormItem>
              <FormLabel>Bestandsnaam</FormLabel>
              <FormControl>
                <Input name="name" placeholder="Voer een bestandsnaam in" defaultValue={selectedFile?.name || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Bestand</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                </div>
              </FormControl>
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  Geselecteerd: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                </p>
              )}
              <FormMessage />
            </FormItem>
          </div>

          <div className="space-y-4">
            {!entityType && (
              <FormItem>
                <FormLabel>Entiteitstype</FormLabel>
                <Select name="entity_type" value={selectedEntityType} onValueChange={setSelectedEntityType}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer een entiteitstype" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="vehicles">Voertuig</SelectItem>
                    <SelectItem value="recycling">Recycling</SelectItem>
                    <SelectItem value="quotes">Offerte</SelectItem>
                    <SelectItem value="general">Algemeen</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}

            {(selectedEntityType === "vehicles" || entityType === "vehicles") && !entityId && (
              <FormItem>
                <FormLabel>Voertuig</FormLabel>
                <Select name="entity_id" value={selectedEntityId} onValueChange={setSelectedEntityId}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer een voertuig" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.license_plate.toUpperCase()} - {vehicle.brand} {vehicle.model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}

            {entityType && entityId && (
              <>
                <input type="hidden" name="entity_type" value={entityType} />
                <input type="hidden" name="entity_id" value={entityId} />
              </>
            )}

            {selectedEntityType === "general" && <input type="hidden" name="entity_id" value="general" />}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
            Annuleren
          </Button>
          <Button type="submit" disabled={loading || !selectedFile}>
            {loading ? (
              "Bezig met uploaden..."
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Uploaden
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
