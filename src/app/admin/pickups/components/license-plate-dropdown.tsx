"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"

interface Vehicle {
  id: string
  license_plate: string
  make?: string
  model?: string
}

interface LicensePlateDropdownProps {
  value: string
  onChange: (value: string, vehicleId: string) => void
}

export function LicensePlateDropdown({ value, onChange }: LicensePlateDropdownProps) {
  const [inputValue, setInputValue] = useState(value)
  const [isLoading, setIsLoading] = useState(false)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle outside clicks to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Search for vehicles when input changes
  useEffect(() => {
    const searchVehicles = async () => {
      if (!inputValue || inputValue.length < 2) {
        setVehicles([])
        setIsOpen(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/vehicles/search?q=${encodeURIComponent(inputValue)}`)

        if (!response.ok) {
          throw new Error("Failed to fetch vehicles")
        }

        const data = await response.json()
        setVehicles(data.vehicles || [])
        setIsOpen(data.vehicles && data.vehicles.length > 0)
      } catch (error) {
        console.error("Error searching vehicles:", error)
        setError("Er is een fout opgetreden bij het zoeken naar voertuigen")
        setVehicles([])
      } finally {
        setIsLoading(false)
      }
    }

    const timer = setTimeout(() => {
      searchVehicles()
    }, 300)

    return () => clearTimeout(timer)
  }, [inputValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setInputValue(vehicle.license_plate)
    onChange(vehicle.license_plate, vehicle.id)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => vehicles.length > 0 && setIsOpen(true)}
          className="w-full p-2 pr-10 border rounded-md border-gray-300"
          placeholder="Voer kenteken in (bijv. AB-12-CD)"
        />
        {isLoading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

      {isOpen && vehicles.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectVehicle(vehicle)}
            >
              <div className="font-medium">{vehicle.license_plate}</div>
              {vehicle.make && vehicle.model && (
                <div className="text-sm text-gray-500">
                  {vehicle.make} {vehicle.model}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
