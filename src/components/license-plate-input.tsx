"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface LicensePlateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const LicensePlateInput = forwardRef<HTMLInputElement, LicensePlateInputProps>(
  ({ className, error, ...props }, ref) => {
    // Function to create star path
    const createStarPath = (cx: number, cy: number, outerRadius: number, innerRadius: number) => {
      const points = []
      for (let i = 0; i < 10; i++) {
        const angle = (i * Math.PI) / 5
        const radius = i % 2 === 0 ? outerRadius : innerRadius
        const x = cx + radius * Math.cos(angle - Math.PI / 2)
        const y = cy + radius * Math.sin(angle - Math.PI / 2)
        points.push(`${x},${y}`)
      }
      return `M ${points.join(' L ')} Z`
    }

    return (
      <div className="relative">
        <div className="flex h-12 rounded-md border-2 border-gray-300 overflow-hidden shadow-sm">
          {/* EU Blue Section */}
          <div className="w-16 bg-blue-500 flex flex-col items-center justify-center relative">
            {/* EU Stars Circle */}
            <div className="flex items-center justify-center mb-1 mt-1">
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <circle cx="12" cy="12" r="12" fill="#3B82F6" />
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180
                  const x = 12 + 8 * Math.sin(angle)
                  const y = 12 - 8 * Math.cos(angle)
                  return (
                    <path
                      key={i}
                      d={createStarPath(x, y, 1.8, 0.9)}
                      fill="#FFCC00"
                    />
                  )
                })}
              </svg>
            </div>
            {/* NL Text */}
            <span className="text-white text-[10px] font-bold -mt-1">NL</span>
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
