"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2, Trash2 } from "lucide-react"
import { deleteInventoryItem } from "@/app/actions/inventory-actions"
import { toast } from "sonner"

interface DeleteInventoryButtonProps {
  id: string
}

export function DeleteInventoryButton({ id }: DeleteInventoryButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const result = await deleteInventoryItem(id)
      if (result?.error) {
        toast.error(result.error)
        setIsLoading(false)
      }
      // No need to handle success as the action will redirect
    } catch (error) {
      toast.error("Er is een fout opgetreden bij het verwijderen van het item")
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Verwijderen
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Voorraaditem verwijderen</DialogTitle>
          <DialogDescription>
            Weet u zeker dat u dit voorraaditem wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
            Annuleren
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verwijderen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
