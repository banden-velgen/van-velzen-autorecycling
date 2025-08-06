"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Search, X, Eye, Edit, Trash2 } from "lucide-react"
import { formatDate } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { updatePickupStatus } from "@/app/actions/pickup-actions"
import { toast } from "@/components/ui/use-toast"

interface PickupsTableProps {
  pickups: any[]
}

export function PickupsTable({ pickups: initialPickups }: PickupsTableProps) {
  const [pickups, setPickups] = useState(initialPickups)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPickup, setSelectedPickup] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editFormData, setEditFormData] = useState<any>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  // Filter pickups based on search term and status filter
  const filteredPickups = pickups.filter((pickup) => {
    const matchesSearch =
      pickup.vehicle?.license_plate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pickup.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pickup.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pickup.notes?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || pickup.status === statusFilter

    return matchesSearch && matchesStatus
  })

  if (pickups.length === 0) {
    return <div className="text-center py-6 text-gray-500">Geen ophalingen gevonden</div>
  }

  const handleViewDetails = (pickup: any) => {
    setSelectedPickup(pickup)
    setIsViewDialogOpen(true)
  }

  const handleEditPickup = (pickup: any) => {
    setSelectedPickup(pickup)
    setEditFormData({
      address: pickup.address || "",
      postal_code: pickup.postal_code || "",
      city: pickup.city || "",
      notes: pickup.notes || "",
      status: pickup.status || "scheduled",
    })
    setIsEditDialogOpen(true)
  }

  const handleDeletePickup = (pickup: any) => {
    setSelectedPickup(pickup)
    setDeleteError(null)
    setIsDeleteDialogOpen(true)
  }

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveEdit = async () => {
    if (!selectedPickup) return

    setIsSubmitting(true)
    try {
      // Update pickup in database
      const response = await fetch(`/api/pickups/${selectedPickup.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update pickup")
      }

      // Update the pickup in the UI
      const updatedPickup = {
        ...selectedPickup,
        ...editFormData,
      }

      // Close dialog and show success message
      setIsEditDialogOpen(false)
      toast({
        title: "Ophaling bijgewerkt",
        description: "De ophaling is succesvol bijgewerkt.",
      })

      // Force a page refresh to show updated data
      window.location.reload()
    } catch (error) {
      console.error("Error updating pickup:", error)
      toast({
        title: "Fout",
        description: `Er is een fout opgetreden bij het bijwerken van de ophaling: ${error instanceof Error ? error.message : "Onbekende fout"}`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedPickup) return

    setIsSubmitting(true)
    setDeleteError(null)

    try {
      console.log(`Deleting pickup with ID: ${selectedPickup.id}`)

      // Simple DELETE request without any extra headers or options
      const response = await fetch(`/api/pickups/${selectedPickup.id}`, {
        method: "DELETE",
      })

      // Parse the response
      const result = await response.json()

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(result.error || "Failed to delete pickup")
      }

      console.log("Delete response:", result)

      // Update local state to remove the deleted pickup
      setPickups((prevPickups) => prevPickups.filter((pickup) => pickup.id !== selectedPickup.id))

      // Close dialog and show success message
      setIsDeleteDialogOpen(false)
      toast({
        title: "Ophaling verwijderd",
        description: "De ophaling is succesvol verwijderd.",
      })

      // Force a page refresh to ensure data is in sync with the database
      window.location.reload()
    } catch (error) {
      console.error("Error deleting pickup:", error)
      setDeleteError(error instanceof Error ? error.message : "Er is een onbekende fout opgetreden")
      toast({
        title: "Fout",
        description: `Er is een fout opgetreden bij het verwijderen van de ophaling: ${error instanceof Error ? error.message : "Onbekende fout"}`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedPickup) return

    setIsSubmitting(true)
    try {
      const result = await updatePickupStatus(selectedPickup.id, newStatus)

      if (!result.success) {
        throw new Error(result.error || "Failed to update status")
      }

      // Close dialog and show success message
      setIsViewDialogOpen(false)
      toast({
        title: "Status bijgewerkt",
        description: "De status van de ophaling is succesvol bijgewerkt.",
      })

      // Force a page refresh to show updated data
      window.location.reload()
    } catch (error) {
      console.error("Error updating status:", error)
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het bijwerken van de status.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Zoeken op kenteken, klant, adres..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 rounded-md border border-gray-200 text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Alle statussen</option>
          <option value="scheduled">Gepland</option>
          <option value="completed">Voltooid</option>
          <option value="cancelled">Geannuleerd</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-3">Datum</th>
              <th className="px-4 py-3">Kenteken</th>
              <th className="px-4 py-3">Klant</th>
              <th className="px-4 py-3">Adres</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Acties</th>
            </tr>
          </thead>
          <tbody>
            {filteredPickups.map((pickup) => (
              <tr key={pickup.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    {pickup.scheduled_date ? formatDate(pickup.scheduled_date) : "-"}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium">{pickup.vehicle?.license_plate || "-"}</td>
                <td className="px-4 py-3">{pickup.customer?.name || "-"}</td>
                <td className="px-4 py-3">
                  {pickup.address ? `${pickup.address}, ${pickup.postal_code} ${pickup.city}` : "-"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      pickup.status === "scheduled"
                        ? "bg-yellow-100 text-yellow-800"
                        : pickup.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : pickup.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {pickup.status === "scheduled"
                      ? "Gepland"
                      : pickup.status === "completed"
                        ? "Voltooid"
                        : pickup.status === "cancelled"
                          ? "Geannuleerd"
                          : pickup.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleViewDetails(pickup)} title="Bekijken">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleEditPickup(pickup)} title="Bewerken">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeletePickup(pickup)}
                      className="text-red-500 hover:text-red-700"
                      title="Verwijderen"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Ophaling Details</span>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </DialogTitle>
            <DialogDescription>Details van de geselecteerde ophaling</DialogDescription>
          </DialogHeader>

          {selectedPickup && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Voertuig Informatie</h3>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Kenteken:</span> {selectedPickup.vehicle?.license_plate || "-"}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Merk & Model:</span> {selectedPickup.vehicle?.make}{" "}
                        {selectedPickup.vehicle?.model}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Klant Informatie</h3>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Naam:</span> {selectedPickup.customer?.name || "-"}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Telefoon:</span> {selectedPickup.customer?.phone || "-"}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Email:</span> {selectedPickup.customer?.email || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Ophaling Details</h3>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Datum:</span>{" "}
                        {selectedPickup.scheduled_date ? formatDate(selectedPickup.scheduled_date) : "-"}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Adres:</span> {selectedPickup.address || "-"}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Postcode:</span> {selectedPickup.postal_code || "-"}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Plaats:</span> {selectedPickup.city || "-"}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Status:</span>{" "}
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            selectedPickup.status === "scheduled"
                              ? "bg-yellow-100 text-yellow-800"
                              : selectedPickup.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : selectedPickup.status === "cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {selectedPickup.status === "scheduled"
                            ? "Gepland"
                            : selectedPickup.status === "completed"
                              ? "Voltooid"
                              : selectedPickup.status === "cancelled"
                                ? "Geannuleerd"
                                : selectedPickup.status}
                        </span>
                      </p>
                    </div>
                  </div>

                  {selectedPickup.notes && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Notities</h3>
                      <p className="mt-2 text-sm whitespace-pre-line">{selectedPickup.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap justify-between gap-2 pt-4 border-t">
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handleStatusChange("scheduled")}
                    disabled={selectedPickup.status === "scheduled" || isSubmitting}
                    className="bg-yellow-50 hover:bg-yellow-100 text-yellow-800"
                  >
                    Markeer als Gepland
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleStatusChange("completed")}
                    disabled={selectedPickup.status === "completed" || isSubmitting}
                    className="bg-green-50 hover:bg-green-100 text-green-800"
                  >
                    Markeer als Voltooid
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleStatusChange("cancelled")}
                    disabled={selectedPickup.status === "cancelled" || isSubmitting}
                    className="bg-red-50 hover:bg-red-100 text-red-800"
                  >
                    Markeer als Geannuleerd
                  </Button>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsViewDialogOpen(false)
                    handleEditPickup(selectedPickup)
                  }}
                >
                  Bewerken
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Ophaling Bewerken</span>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </DialogTitle>
            <DialogDescription>Bewerk de details van deze ophaling</DialogDescription>
          </DialogHeader>

          {selectedPickup && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="address">Adres</Label>
                  <Input id="address" name="address" value={editFormData.address} onChange={handleEditFormChange} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="postal_code">Postcode</Label>
                    <Input
                      id="postal_code"
                      name="postal_code"
                      value={editFormData.postal_code}
                      onChange={handleEditFormChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Plaats</Label>
                    <Input id="city" name="city" value={editFormData.city} onChange={handleEditFormChange} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    name="status"
                    className="w-full px-3 py-2 rounded-md border border-gray-200"
                    value={editFormData.status}
                    onChange={handleEditFormChange}
                  >
                    <option value="scheduled">Gepland</option>
                    <option value="completed">Voltooid</option>
                    <option value="cancelled">Geannuleerd</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="notes">Notities</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={editFormData.notes}
                    onChange={handleEditFormChange}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isSubmitting}>
                  Annuleren
                </Button>
                <Button onClick={handleSaveEdit} disabled={isSubmitting}>
                  {isSubmitting ? "Opslaan..." : "Opslaan"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Ophaling Verwijderen</span>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </DialogTitle>
            <DialogDescription>Weet je zeker dat je deze ophaling wilt verwijderen?</DialogDescription>
          </DialogHeader>

          {selectedPickup && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm">
                  <span className="font-medium">Kenteken:</span> {selectedPickup.vehicle?.license_plate || "-"}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Adres:</span> {selectedPickup.address || "-"}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Datum:</span>{" "}
                  {selectedPickup.scheduled_date ? formatDate(selectedPickup.scheduled_date) : "-"}
                </p>
              </div>

              {deleteError && <div className="text-sm text-red-500 p-2 bg-red-50 rounded-md">Fout: {deleteError}</div>}

              <div className="text-sm text-red-500">Let op: Deze actie kan niet ongedaan worden gemaakt.</div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isSubmitting}>
                  Annuleren
                </Button>
                <Button variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
                  {isSubmitting ? "Verwijderen..." : "Verwijderen"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
