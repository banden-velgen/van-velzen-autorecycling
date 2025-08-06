"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface LicensePlateInputProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

export function LicensePlateInput({ value, onChange, error }: LicensePlateInputProps) {
  const [formattedValue, setFormattedValue] = useState("")

  // Format the license plate when value changes
  useEffect(() => {
    // Remove all non-alphanumeric characters
    const cleaned = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase()

    // Format based on common Dutch license plate formats
    let formatted = cleaned

    // Format based on length and pattern
    if (cleaned.length <= 6) {
      // Do nothing, keep as is
    } else if (/^[A-Z]{2}\d{2}\d{2}$/.test(cleaned.substring(0, 6))) {
      // XX-99-99 format
      formatted = `${cleaned.substring(0, 2)}-${cleaned.substring(2, 4)}-${cleaned.substring(4)}`
    } else if (/^[A-Z]{2}\d{2}[A-Z]{2}$/.test(cleaned.substring(0, 6))) {
      // XX-99-XX format
      formatted = `${cleaned.substring(0, 2)}-${cleaned.substring(2, 4)}-${cleaned.substring(4)}`
    } else if (/^\d{2}[A-Z]{2}\d{2}$/.test(cleaned.substring(0, 6))) {
      // 99-XX-99 format
      formatted = `${cleaned.substring(0, 2)}-${cleaned.substring(2, 4)}-${cleaned.substring(4)}`
    } else if (/^\d{2}[A-Z]{3}\d{1}$/.test(cleaned.substring(0, 6))) {
      // 99-XXX-9 format
      formatted = `${cleaned.substring(0, 2)}-${cleaned.substring(2, 5)}-${cleaned.substring(5)}`
    } else if (/^\d{1}[A-Z]{3}\d{2}$/.test(cleaned.substring(0, 6))) {
      // 9-XXX-99 format
      formatted = `${cleaned.substring(0, 1)}-${cleaned.substring(1, 4)}-${cleaned.substring(4)}`
    } else if (/^[A-Z]{3}\d{2}[A-Z]{1}$/.test(cleaned.substring(0, 6))) {
      // XXX-99-X format
      formatted = `${cleaned.substring(0, 3)}-${cleaned.substring(3, 5)}-${cleaned.substring(5)}`
    } else {
      // Default format for other patterns: XX-XX-XX
      if (cleaned.length >= 2) formatted = cleaned.substring(0, 2)
      if (cleaned.length >= 4) formatted = `${formatted}-${cleaned.substring(2, 4)}`
      if (cleaned.length >= 6) formatted = `${formatted}-${cleaned.substring(4)}`
    }

    setFormattedValue(formatted)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase()
    onChange(newValue.replace(/-/g, ""))
  }

  return (
    <div className="relative">
      <div className="flex license-plate-container overflow-hidden rounded-md border border-gray-800 h-12">
        {/* EU flag with NL country code */}
        <div className="flex flex-col items-center justify-center px-2 h-full" style={{ backgroundColor: "#003399" }}>
          <div className="flex items-center justify-center mb-0.5">
            {/* EU stars circle */}
            <div className="w-5 h-5">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="18" fill="#003399" />
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180
                  const x = 18 + 12 * Math.sin(angle)
                  const y = 18 - 12 * Math.cos(angle)
                  return <circle key={i} cx={x} cy={y} r="1.5" fill="#FFCC00" />
                })}
              </svg>
            </div>
          </div>
          <span className="text-xs font-bold text-white">NL</span>
        </div>

        {/* License plate input */}
        <Input
          type="text"
          value={formattedValue}
          onChange={handleChange}
          placeholder="XX-XX-XX"
          maxLength={8}
          className={cn(
            "license-plate text-center font-bold text-lg uppercase tracking-wider border-0 rounded-none bg-yellow-300 text-black flex-1 h-full",
            error ? "border-red-500" : "",
          )}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default LicensePlateInput
