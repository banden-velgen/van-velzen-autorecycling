"use client"

import { useEffect } from "react"

export default function RightClickProtection() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()

      // Create a custom message element
      const messageElement = document.createElement("div")
      messageElement.textContent = "Van Velzen Autorecycling © 2025"
      messageElement.style.position = "fixed"
      messageElement.style.top = `${e.clientY}px`
      messageElement.style.left = `${e.clientX}px`
      messageElement.style.backgroundColor = "#ffffff"
      messageElement.style.color = "#000000"
      messageElement.style.padding = "5px 10px"
      messageElement.style.borderRadius = "3px"
      messageElement.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)"
      messageElement.style.zIndex = "10000"
      messageElement.style.pointerEvents = "none"

      document.body.appendChild(messageElement)

      // Remove the message after a short delay
      setTimeout(() => {
        document.body.removeChild(messageElement)
      }, 1500)

      return false
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable view source (Ctrl+U)
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault()
        return false
      }

      // Disable save (Ctrl+S)
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault()
        return false
      }

      // Disable copy (Ctrl+C) outside of input fields
      if (e.ctrlKey && e.key === "c") {
        const activeElement = document.activeElement as HTMLElement
        const isInput = activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA"

        if (!isInput && !window.getSelection()?.toString()) {
          e.preventDefault()
          return false
        }
      }

      // Disable F12 (Developer Tools)
      if (e.key === "F12") {
        e.preventDefault()
        return false
      }
    }

    // Disable text selection
    const disableSelection = () => {
      document.documentElement.style.userSelect = "none"
      document.documentElement.style.webkitUserSelect = "none"
      document.documentElement.style.msUserSelect = "none"
      document.documentElement.style.mozUserSelect = "none"
    }

    // Add event listeners
    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("keydown", handleKeyDown)
    disableSelection()

    // Cleanup
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return null
}
