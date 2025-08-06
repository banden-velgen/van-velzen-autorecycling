"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"

interface Vehicle {
  id: string
  license_plate: string
  make: string | null
  model: string | null
  year: number | null
  color: string | null
  vin: string | null
  status: "pending" | "processing" | "recycled" | "sold"
  created_at: string
  updated_at: string
}

export default function VehiclesPage() {
  const router = useRouter()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const fetchVehicles = async () => {
    try {
      setLoading(true)

      const supabase = createClient()
      const { data, error } = await supabase.from("vehicles").select("*").order("created_at", { ascending: false })

      if (error) throw error

      setVehicles(data || [])
      setFilteredVehicles(data || [])
      setError(null)
    } catch (err) {
      setError("Failed to load vehicles")
      console.error("Error fetching vehicles:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredVehicles(vehicles)
    } else {
      const term = searchTerm.toLowerCase().trim()
      const filtered = vehicles.filter(
        (vehicle) =>
          vehicle.license_plate.toLowerCase().includes(term) ||
          (vehicle.make && vehicle.make.toLowerCase().includes(term)) ||
          (vehicle.model && vehicle.model.toLowerCase().includes(term)) ||
          (vehicle.color && vehicle.color.toLowerCase().includes(term)),
      )
      setFilteredVehicles(filtered)
    }
  }, [searchTerm, vehicles])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "recycled":
        return "bg-green-100 text-green-800"
      case "sold":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("nl-NL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Onbekende datum"
    }
  }

  if (loading && vehicles.length === 0) {
    return <div className="container mx-auto py-10 text-center">Laden...</div>
  }

  if (error && vehicles.length === 0) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={fetchVehicles}>Probeer opnieuw</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Voertuigen</h1>
        <Button onClick={fetchVehicles} disabled={loading}>
          {loading ? "Laden..." : "Vernieuwen"}
        </Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Zoeken op kenteken, merk, model of kleur..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Alle voertuigen</TabsTrigger>
          <TabsTrigger value="pending">Wachtend</TabsTrigger>
          <TabsTrigger value="processing">In verwerking</TabsTrigger>
          <TabsTrigger value="recycled">Gerecycled</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                statusColor={getStatusColor(vehicle.status)}
                formatDate={formatDate}
                onViewDetails={() => router.push(`/admin/vehicles/${vehicle.id}`)}
              />
            ))}

            {filteredVehicles.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">Geen voertuigen gevonden.</p>
              </div>
            )}
          </div>
        </TabsContent>

        {["pending", "processing", "recycled"].map((status) => (
          <TabsContent key={status} value={status}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles
                .filter((vehicle) => vehicle.status === status)
                .map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    statusColor={getStatusColor(vehicle.status)}
                    formatDate={formatDate}
                    onViewDetails={() => router.push(`/admin/vehicles/${vehicle.id}`)}
                  />
                ))}

              {filteredVehicles.filter((vehicle) => vehicle.status === status).length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">Geen voertuigen gevonden met status "{status}".</p>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function VehicleCard({
  vehicle,
  statusColor,
  formatDate,
  onViewDetails,
}: {
  vehicle: Vehicle
  statusColor: string
  formatDate: (date: string) => string
  onViewDetails: () => void
}) {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Wachtend"
      case "processing":
        return "In verwerking"
      case "recycled":
        return "Gerecycled"
      case "sold":
        return "Verkocht"
      default:
        return status
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{vehicle.license_plate}</CardTitle>
            <CardDescription>
              {vehicle.make} {vehicle.model} {vehicle.year && `(${vehicle.year})`}
            </CardDescription>
          </div>
          <Badge className={statusColor}>{getStatusLabel(vehicle.status)}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm mb-4">
          {vehicle.color && (
            <p>
              <span className="font-medium">Kleur:</span> {vehicle.color}
            </p>
          )}
          {vehicle.vin && (
            <p>
              <span className="font-medium">VIN:</span> {vehicle.vin}
            </p>
          )}
          <p>
            <span className="font-medium">Toegevoegd op:</span> {formatDate(vehicle.created_at)}
          </p>
        </div>

        <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={onViewDetails}>
          Details bekijken
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
