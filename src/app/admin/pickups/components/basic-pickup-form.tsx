"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { DirectVehicleSelector } from "./direct-vehicle-selector"

export function BasicPickupForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [vehicleId, setVehicleId] = useState<string>("")
  const [formData, setFormData] = useState({
    license_plate: "",
    scheduled_date: "",
    address: "",
    postal_code: "",
    city: "",
    contact_name: "",
    contact_phone: "",
    notes: "",
    status: "scheduled",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleVehicleSelect = (id: string, licensePlate: string) => {
    setVehicleId(id)
    setFormData((prev) => ({ ...prev, license_plate: licensePlate }))
    console.log("Selected vehicle:", id, licensePlate)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!vehicleId) {
      setError("Selecteer een voertuig")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Format the data for the API
      const apiData = {
        ...formData,
        vehicle_id: vehicleId,
        scheduled_date: new Date(formData.scheduled_date).toISOString(),
      }

      console.log("Submitting pickup data:", apiData)

      // Make the actual API call to create the pickup
      const response = await fetch("/api/pickups/direct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Er is een fout opgetreden bij het aanmaken van de ophaling")
      }

      // Success! Redirect to the pickups list
      router.push("/admin/pickups")
      router.refresh() // Force a refresh to show the new data
    } catch (error) {
      console.error("Error creating pickup:", error)
      setError(error instanceof Error ? error.message : "Er is een fout opgetreden")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">{error}</div>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Voertuig</label>
        <DirectVehicleSelector onSelect={handleVehicleSelect} />
        <p className="text-sm text-gray-500 mt-1">Selecteer een voertuig uit de lijst</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ophaaldatum</label>
        <input
          type="date"
          name="scheduled_date"
          value={formData.scheduled_date}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Straatnaam en huisnummer"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
          <input
            type="text"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="1234 AB"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Plaats</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Plaats"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contactpersoon</label>
          <input
            type="text"
            name="contact_name"
            value={formData.contact_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Naam contactpersoon"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telefoonnummer</label>
          <input
            type="text"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Telefoonnummer"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="scheduled">Gepland</option>
          <option value="completed">Voltooid</option>
          <option value="cancelled">Geannuleerd</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Opmerkingen</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Eventuele opmerkingen of instructies voor de ophaling"
          rows={3}
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting || !vehicleId}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Bezig met opslaan..." : "Ophaling aanmaken"}
        </button>

        <Link href="/admin/pickups">
          <span className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Annuleren</span>
        </Link>
      </div>
    </form>
  )
}
