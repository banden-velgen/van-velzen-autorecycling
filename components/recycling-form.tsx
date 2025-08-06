"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateRecycling, createRecycling } from "@/lib/recycling"
import { toast } from "@/components/ui/use-toast"

type RecyclingFormProps = {
  initialData?: {
    id: number
    type: string
    weight: number
    size?: string
    status: string
    notes?: string
  }
}

// Change to default export
export default function RecyclingForm({ initialData }: RecyclingFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    type: initialData?.type || "",
    weight: initialData?.weight || 0,
    size: initialData?.size || "",
    status: initialData?.status || "pending",
    notes: initialData?.notes || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (initialData) {
        await updateRecycling(initialData.id, formData)
        toast({
          title: "Success",
          description: "Recycling item updated successfully",
        })
      } else {
        await createRecycling(formData)
        toast({
          title: "Success",
          description: "Recycling item created successfully",
        })
      }
      router.push("/admin/recycling")
      router.refresh()
    } catch (error) {
      console.error("Error saving recycling item:", error)
      toast({
        title: "Error",
        description: "Failed to save recycling item",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <Input id="type" name="type" value={formData.type} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="weight">Weight (kg)</Label>
        <Input
          id="weight"
          name="weight"
          type="number"
          step="0.01"
          value={formData.weight}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="size">Size</Label>
        <Input id="size" name="size" value={formData.size} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={4} />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/recycling")} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : initialData ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  )
}

// Add a named export as well to ensure compatibility with both import styles
export { RecyclingForm }
