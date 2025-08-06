"use client"

import { useState } from "react"
import { updatePickupStatus } from "@/app/actions/pickup-actions"
import { useToast } from "@/hooks/use-toast"

export function StatusUpdateButton({ pickupId, currentStatus }: { pickupId: string; currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)
  const { toast } = useToast()

  const handleStatusUpdate = async (newStatus: string) => {
    if (newStatus === status) return

    setIsUpdating(true)

    try {
      const result = await updatePickupStatus(pickupId, newStatus)

      if (result.success) {
        setStatus(newStatus)
        toast({
          title: "Status bijgewerkt",
          description: "De status van de ophaling is succesvol bijgewerkt.",
        })
      } else {
        toast({
          title: "Fout bij bijwerken",
          description: result.error || "Er is een fout opgetreden bij het bijwerken van de status.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating pickup status:", error)
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
      <option value="scheduled">Gepland</option>
      <option value="completed">Voltooid</option>
      <option value="cancelled">Geannuleerd</option>
    </select>
  )
}
