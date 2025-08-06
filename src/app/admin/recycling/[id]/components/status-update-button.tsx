"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { updateRecyclingStatus } from "@/app/actions/recycling-actions"
import { useToast } from "@/components/ui/use-toast"

const statuses = [
  { value: "pending", label: "In behandeling" },
  { value: "processing", label: "In verwerking" },
  { value: "completed", label: "Voltooid" },
  { value: "cancelled", label: "Geannuleerd" },
]

interface StatusUpdateButtonProps {
  id: string
  currentStatus: string
}

export function StatusUpdateButton({ id, currentStatus }: StatusUpdateButtonProps) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(currentStatus)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const currentStatusLabel = statuses.find((s) => s.value === status)?.label || "Status wijzigen"

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === status) {
      setOpen(false)
      return
    }

    setIsLoading(true)

    try {
      const result = await updateRecyclingStatus(id, newStatus)

      if (result.success) {
        setStatus(newStatus)
        toast({
          title: "Status bijgewerkt",
          description: `De status is bijgewerkt naar ${statuses.find((s) => s.value === newStatus)?.label}.`,
        })
      } else {
        toast({
          title: "Fout",
          description: result.error || "Er is een fout opgetreden bij het bijwerken van de status.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het bijwerken van de status.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          disabled={isLoading}
        >
          {isLoading ? "Bijwerken..." : currentStatusLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Zoek status..." />
          <CommandList>
            <CommandEmpty>Geen status gevonden.</CommandEmpty>
            <CommandGroup>
              {statuses.map((statusOption) => (
                <CommandItem
                  key={statusOption.value}
                  value={statusOption.value}
                  onSelect={() => handleStatusChange(statusOption.value)}
                >
                  <Check className={cn("mr-2 h-4 w-4", status === statusOption.value ? "opacity-100" : "opacity-0")} />
                  {statusOption.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
