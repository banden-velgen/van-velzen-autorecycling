"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface LicensePlateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const LicensePlateInput = forwardRef<HTMLInputElement, LicensePlateInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="relative">
        <div className="flex h-12 rounded-md border-2 border-gray-300 overflow-hidden shadow-sm">
          {/* EU Blue Section */}
          <div className="w-16 bg-blue-600 flex flex-col items-center justify-center relative">
            {/* EU Stars Circle */}
            <div className="flex items-center justify-center mb-1">
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <circle cx="12" cy="12" r="12" fill="#003399" />
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180
                  const x = 12 + 8 * Math.sin(angle)
                  const y = 12 - 8 * Math.cos(angle)
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="1.8"
                      fill="#FFCC00"
                    />
                  )
                })}
              </svg>
            </div>
            {/* NL Text */}
            <span className="text-white text-[10px] font-bold">NL</span>
          </div>
          
          {/* Yellow License Plate Section */}
          <div className="flex-1 bg-yellow-400 flex items-center justify-center">
            <input
              ref={ref}
              className={cn(
                "w-full h-full bg-transparent text-center text-black font-mono text-lg font-bold placeholder-gray-600 focus:outline-none",
                error && "border-red-500",
                className
              )}
              placeholder="XX-XX-XX"
              maxLength={8}
              {...props}
            />
          </div>
        </div>
      </div>
    )
  }
)

LicensePlateInput.displayName = "LicensePlateInput"

export default LicensePlateInput
