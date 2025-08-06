"use client"

import { useEffect } from "react"

export default function ImageProtection() {
  useEffect(() => {
    // Disable image dragging
    const disableImageDrag = () => {
      const images = document.querySelectorAll("img")
      images.forEach((img) => {
        img.setAttribute("draggable", "false")
        img.style.userSelect = "none"
        img.style.webkitUserSelect = "none"
        img.style.msUserSelect = "none"
        img.style.mozUserSelect = "none"

        // Prevent drag start
        img.addEventListener("dragstart", (e) => {
          e.preventDefault()
        })

        // Prevent mouse down
        img.addEventListener("mousedown", (e) => {
          e.preventDefault()
        })
      })
    }

    // Initial call
    disableImageDrag()

    // Set up a mutation observer to handle dynamically added images
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          disableImageDrag()
        }
      })
    })

    // Start observing the document
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    // Cleanup
    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}
