"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentList } from "./document-list"
import { Search, FileText, Car } from "lucide-react"

interface Vehicle {
  id: string
  license_plate: string
  make: string
  model: string
  year: string | null
  documents: Document[]
}

interface Document {
  id: string
  document_type: string
  file_name: string
  file_path: string
  file_size: number
  mime_type: string
  uploaded_at: string
  notes: string | null
}

interface DocumentDashboardProps {
  vehicles: Vehicle[]
}

export function DocumentDashboard({ vehicles }: DocumentDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Get all documents from all vehicles
  const allDocuments = vehicles.flatMap((vehicle) =>
    vehicle.documents.map((doc) => ({
      ...doc,
      vehicle_license_plate: vehicle.license_plate,
      vehicle_id: vehicle.id,
      vehicle_name: `${vehicle.make} ${vehicle.model} (${vehicle.year || "Onbekend"})`,
    })),
  )

  // Filter documents based on search term
  const filteredDocuments = allDocuments.filter(
    (doc) =>
      doc.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.document_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.vehicle_license_plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.vehicle_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.notes && doc.notes.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Group documents by type
  const documentsByType: Record<string, typeof filteredDocuments> = {}

  filteredDocuments.forEach((doc) => {
    if (!documentsByType[doc.document_type]) {
      documentsByType[doc.document_type] = []
    }
    documentsByType[doc.document_type].push(doc)
  })

  // Filter vehicles based on search term
  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.license_plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vehicle.year && vehicle.year.toString().includes(searchTerm)),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Zoek op kenteken, documenttype, bestandsnaam..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link href="/admin/documents/upload">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Document uploaden
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Alle documenten ({filteredDocuments.length})</TabsTrigger>
          <TabsTrigger value="by-vehicle">Per voertuig ({filteredVehicles.length})</TabsTrigger>
          {Object.keys(documentsByType).map((type) => (
            <TabsTrigger key={type} value={type}>
              {type} ({documentsByType[type].length})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <DocumentList documents={filteredDocuments} showVehicleInfo />
        </TabsContent>

        <TabsContent value="by-vehicle" className="space-y-4">
          {filteredVehicles.length === 0 ? (
            <div className="text-center py-6 border rounded-lg">
              <Car className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-medium">Geen voertuigen gevonden</h3>
              <p className="text-sm text-muted-foreground">
                Er zijn geen voertuigen die overeenkomen met je zoekopdracht.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVehicles.map((vehicle) => (
                <Card key={vehicle.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center">
                      <span>{vehicle.license_plate}</span>
                      <Link href={`/admin/vehicles/${vehicle.id}`}>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </Link>
                    </CardTitle>
                    <CardDescription>
                      {vehicle.make} {vehicle.model} {vehicle.year && `(${vehicle.year})`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {vehicle.documents.length === 0 ? (
                      <p className="text-sm text-muted-foreground">Geen documenten voor dit voertuig</p>
                    ) : (
                      <DocumentList
                        documents={vehicle.documents.map((doc) => ({
                          ...doc,
                          vehicle_license_plate: vehicle.license_plate,
                          vehicle_id: vehicle.id,
                          vehicle_name: `${vehicle.make} ${vehicle.model} (${vehicle.year || "Onbekend"})`,
                        }))}
                        compact
                      />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {Object.keys(documentsByType).map((type) => (
          <TabsContent key={type} value={type} className="space-y-4">
            <DocumentList documents={documentsByType[type]} showVehicleInfo />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
