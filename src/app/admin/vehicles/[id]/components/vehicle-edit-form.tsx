"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

interface VehicleEditFormProps {
  vehicle: any
}

export default function VehicleEditForm({ vehicle }: VehicleEditFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    license_plate: vehicle.license_plate || "",
    make: vehicle.make || "",
    model: vehicle.model || "",
    year: vehicle.year || "",
    color: vehicle.color || "",
    vin: vehicle.vin || "",
    status: vehicle.status || "pending",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/vehicles/${vehicle.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Er is iets misgegaan bij het bijwerken van het voertuig")
      }

      toast.success("Voertuig succesvol bijgewerkt")
      router.push(`/admin/vehicles/${vehicle.id}`)
      router.refresh()
    } catch (error) {
      console.error("Error updating vehicle:", error)
      toast.error("Er is iets misgegaan bij het bijwerken van het voertuig")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="license_plate">Kenteken</Label>
          <Input
            id="license_plate"
            name="license_plate"
            value={formData.license_plate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="make">Merk</Label>
          <Input id="make" name="make" value={formData.make} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input id="model" name="model" value={formData.model} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Bouwjaar</Label>
          <Input id="year" name="year" value={formData.year} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="color">Kleur</Label>
          <Input id="color" name="color" value={formData.color} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vin">VIN</Label>
          <Input id="vin" name="vin" value={formData.vin} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={handleStatusChange}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Selecteer status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Wachtend</SelectItem>
              <SelectItem value="processing">In verwerking</SelectItem>
              <SelectItem value="recycled">Gerecycled</SelectItem>
              <SelectItem value="sold">Verkocht</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Bezig met opslaan..." : "Opslaan"}
      </Button>
    </form>
  )
}
