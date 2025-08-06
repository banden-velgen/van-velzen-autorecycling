"use client"

import { useState, useEffect } from "react"
import { Check, Loader2, X } from "lucide-react"

interface LicensePlateLookupProps {
  value: string
  onChange: (value: string) => void
  onValidationChange: (isValid: boolean, vehicleId?: string) => void
}

export function LicensePlateLookup({ value, onChange, onValidationChange }: LicensePlateLookupProps) {
  const [isChecking, setIsChecking] = useState(false)
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [suggestions, setSuggestions] = useState<Array<{ license_plate: string; id: string }>>([])
  const [error, setError] = useState<string | null>(null)
  const [debouncedValue, setDebouncedValue] = useState(value)

  // Format license plate to standard format (remove spaces, convert to uppercase)
  const formatLicensePlate = (plate: string) => {
    return plate.replace(/\s+/g, "").toUpperCase()
  }

  // Debounce the input value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(formatLicensePlate(value))
    }, 500)
    return () => clearTimeout(timer)
  }, [value])

  // Check license plate validity when debounced value changes
  useEffect(() => {
    const checkLicensePlate = async () => {
      if (!debouncedValue || debouncedValue.length < 4) {
        setIsValid(null)
        setSuggestions([])
        onValidationChange(false)
        return
      }

      setIsChecking(true)
      setError(null)

      try {
        const response = await fetch(`/api/vehicles/lookup?license_plate=${debouncedValue}`)
        const data = await response.json()

        if (response.ok) {
          if (data.exact) {
            setIsValid(true)
            setSuggestions([])
            onValidationChange(true, data.vehicle.id)
          } else if (data.suggestions && data.suggestions.length > 0) {
            setIsValid(false)
            setSuggestions(data.suggestions)
            onValidationChange(false)
          } else {
            setIsValid(false)
            setSuggestions([])
            onValidationChange(false)
            setError("Geen voertuig gevonden met dit kenteken")
          }
        } else {
          setIsValid(false)
          setSuggestions([])
          onValidationChange(false)
          setError(data.error || "Fout bij het controleren van het kenteken")
        }
      } catch (error) {
        console.error("Error checking license plate:", error)
        setIsValid(false)
        setSuggestions([])
        onValidationChange(false)
        setError("Er is een fout opgetreden bij het controleren van het kenteken")
      } finally {
        setIsChecking(false)
      }
    }

    checkLicensePlate()
  }, [debouncedValue, onValidationChange])

  const handleSuggestionClick = (plate: string) => {
    onChange(plate)
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full p-2 pr-10 border rounded-md ${
            isValid === true ? "border-green-500" : isValid === false ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Bijv. AB-12-CD"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {isChecking ? (
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
          ) : isValid === true ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : isValid === false ? (
            <X className="h-5 w-5 text-red-500" />
          ) : null}
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {suggestions.length > 0 && (
        <div className="border rounded-md p-2 bg-gray-50">
          <p className="text-sm text-gray-700 mb-1">Bedoelde u misschien:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                type="button"
                onClick={() => handleSuggestionClick(suggestion.license_plate)}
                className="px-2 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-100"
              >
                {suggestion.license_plate}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
