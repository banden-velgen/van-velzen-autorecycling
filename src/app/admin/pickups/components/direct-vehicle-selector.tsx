"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface Vehicle {
  id: string
  license_plate: string
  make?: string
  model?: string
}

interface DirectVehicleSelectorProps {
  onSelect: (vehicleId: string, licensePlate: string) => void
}

export function DirectVehicleSelector({ onSelect }: DirectVehicleSelectorProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("")

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/vehicles/list")

        if (!response.ok) {
          throw new Error("Failed to fetch vehicles")
        }

        const data = await response.json()
        console.log("Fetched vehicles:", data.vehicles)
        setVehicles(data.vehicles || [])
      } catch (error) {
        console.error("Error fetching vehicles:", error)
        setError("Fout bij het ophalen van voertuigen")
      } finally {
        setIsLoading(false)
      }
    }

    fetchVehicles()
  }, [])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const vehicleId = e.target.value
    setSelectedVehicleId(vehicleId)

    const selectedVehicle = vehicles.find((v) => v.id === vehicleId)
    if (selectedVehicle) {
      onSelect(vehicleId, selectedVehicle.license_plate)
    }
  }

  if (isLoading) {
    return <div className="p-4 text-center">Voertuigen laden...</div>
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>
  }

  if (vehicles.length === 0) {
    return <div className="p-4 text-center">Geen voertuigen gevonden</div>
  }

  return (
    <div>
      <select
        value={selectedVehicleId}
        onChange={handleSelectChange}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="">-- Selecteer een voertuig --</option>
        {vehicles.map((vehicle) => (
          <option key={vehicle.id} value={vehicle.id}>
            {vehicle.license_plate} {vehicle.make && vehicle.model ? `(${vehicle.make} ${vehicle.model})` : ""}
          </option>
        ))}
      </select>
    </div>
  )
}
