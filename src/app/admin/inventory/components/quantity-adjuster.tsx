"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, Minus } from "lucide-react"
import { updateInventoryItemQuantity } from "@/app/actions/inventory-actions"
import { toast } from "sonner"

interface QuantityAdjusterProps {
  id: string
  initialQuantity: number
}

export function QuantityAdjuster({ id, initialQuantity }: QuantityAdjusterProps) {
  const [quantity, setQuantity] = useState(initialQuantity)
  const [isLoading, setIsLoading] = useState(false)

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1)
    updateQuantity(quantity + 1)
  }

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1)
      updateQuantity(quantity - 1)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= 0) {
      setQuantity(value)
    }
  }

  const handleBlur = () => {
    updateQuantity(quantity)
  }

  const updateQuantity = async (newQuantity: number) => {
    setIsLoading(true)
    try {
      const result = await updateInventoryItemQuantity(id, newQuantity)
      if (result.error) {
        toast.error(result.error)
        setQuantity(initialQuantity)
      } else {
        toast.success("Voorraad bijgewerkt")
      }
    } catch (error) {
      toast.error("Er is een fout opgetreden bij het bijwerken van de voorraad")
      setQuantity(initialQuantity)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="icon" onClick={handleDecrement} disabled={quantity === 0 || isLoading}>
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        min="0"
        value={quantity}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isLoading}
        className="w-20 text-center"
      />
      <Button variant="outline" size="icon" onClick={handleIncrement} disabled={isLoading}>
        <Plus className="h-4 w-4" />
      </Button>
      {isLoading && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
    </div>
  )
}
