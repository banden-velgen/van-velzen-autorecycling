"use client"

import { useState } from "react"
import { updateVehicleStatus } from "@/app/actions/vehicle-actions"
import { useToast } from "@/hooks/use-toast"

export function StatusUpdateButton({ vehicleId, currentStatus }: { vehicleId: string; currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)
  const { toast } = useToast()

  const handleStatusUpdate = async (newStatus: string) => {
    if (newStatus === status) return

    setIsUpdating(true)

    try {
      const result = await updateVehicleStatus(vehicleId, newStatus)

      if (result.success) {
        setStatus(newStatus)
        toast({
          title: "Status bijgewerkt",
          description: "De status van het voertuig is succesvol bijgewerkt.",
        })
      } else {
        toast({
          title: "Fout bij bijwerken",
          description: "Er is een fout opgetreden bij het bijwerken van de status.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating vehicle status:", error)
      toast({
        title: "Fout bij bijwerken",
        description: "Er is een fout opgetreden bij het bijwerken van de status.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <select
      className="px-4 py-2 rounded-md bg-white border border-gray-200 text-sm"
      value={status}
      onChange={(e) => handleStatusUpdate(e.target.value)}
      disabled={isUpdating}
    >
      <option value="pending">Wachtend</option>
      <option value="processing">In verwerking</option>
      <option value="recycled">Gerecycled</option>
      <option value="sold">Verkocht</option>
    </select>
  )
}
