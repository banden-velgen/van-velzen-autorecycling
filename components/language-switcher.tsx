"use client"

import { usePathname, useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

const languages = [
  { code: "nl", name: "Nederlands", flag: "/images/nl.svg" },
  { code: "en", name: "English", flag: "/images/gb.svg" },
  { code: "fr", name: "Français", flag: "/images/fr.svg" },
  { code: "de", name: "Deutsch", flag: "/images/de.svg" },
  { code: "es", name: "Español", flag: "/images/es.svg" },
  { code: "it", name: "Italiano", flag: "/images/it.svg" },
]

interface LanguageSwitcherProps {
  variant?: "header" | "footer"
}

export default function LanguageSwitcher({ variant = "header" }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLang = pathname.startsWith("/en") ? "en" : pathname.startsWith("/fr") ? "fr" : pathname.startsWith("/de") ? "de" : pathname.startsWith("/es") ? "es" : pathname.startsWith("/it") ? "it" : "nl"
  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0]

  // Slug mapping for different languages
  const slugMapping: Record<string, Record<string, string>> = {
    // Dutch slugs (base)
    "over-ons": {
      en: "about-us",
      fr: "a-propos", 
      de: "ueber-uns",
      es: "sobre-nosotros",
      it: "chi-siamo"
    },
    "diensten": {
      en: "services",
      fr: "services",
      de: "dienstleistungen", 
      es: "servicios",
      it: "servizi"
    },
    "proces": {
      en: "process",
      fr: "processus",
      de: "prozess",
      es: "proceso", 
      it: "processo"
    },
    "contact": {
      en: "contact",
      fr: "contact",
      de: "kontakt",
      es: "contacto",
      it: "contatto"
    },
    // English slugs
    "about-us": {
      nl: "over-ons",
      fr: "a-propos",
      de: "ueber-uns", 
      es: "sobre-nosotros",
      it: "chi-siamo"
    },
    "services": {
      nl: "diensten",
      fr: "services",
      de: "dienstleistungen",
      es: "servicios", 
      it: "servizi"
    },
    "process": {
      nl: "proces",
      fr: "processus",
      de: "prozess",
      es: "proceso",
      it: "processo"
    },
    "contact": {
      nl: "contact",
      fr: "contact",
      de: "kontakt",
      es: "contacto",
      it: "contatto"
    },
    // French slugs
    "a-propos": {
      nl: "over-ons",
      en: "about-us",
      de: "ueber-uns",
      es: "sobre-nosotros", 
      it: "chi-siamo"
    },
    "processus": {
      nl: "proces",
      en: "process",
      de: "prozess",
      es: "proceso",
      it: "processo"
    },
    // German slugs
    "ueber-uns": {
      nl: "over-ons",
      en: "about-us",
      fr: "a-propos",
      es: "sobre-nosotros",
      it: "chi-siamo"
    },
    "dienstleistungen": {
      nl: "diensten", 
      en: "services",
      fr: "services",
      es: "servicios",
      it: "servizi"
    },
    "prozess": {
      nl: "proces",
      en: "process", 
      fr: "processus",
      es: "proceso",
      it: "processo"
    },
    "kontakt": {
      nl: "contact",
      en: "contact",
      fr: "contact",
      es: "contacto",
      it: "contatto"
    },
    // Spanish slugs
    "sobre-nosotros": {
      nl: "over-ons",
      en: "about-us",
      fr: "a-propos",
      de: "ueber-uns",
      it: "chi-siamo"
    },
    "servicios": {
      nl: "diensten",
      en: "services", 
      fr: "services",
      de: "dienstleistungen",
      it: "servizi"
    },
    "proceso": {
      nl: "proces",
      en: "process",
      fr: "processus", 
      de: "prozess",
      it: "processo"
    },
    "contacto": {
      nl: "contact",
      en: "contact",
      fr: "contact",
      de: "kontakt",
      it: "contatto"
    },
    // Italian slugs
    "chi-siamo": {
      nl: "over-ons",
      en: "about-us",
      fr: "a-propos",
      de: "ueber-uns",
      es: "sobre-nosotros"
    },
    "servizi": {
      nl: "diensten",
      en: "services",
      fr: "services", 
      de: "dienstleistungen",
      es: "servicios"
    },
    "processo": {
      nl: "proces",
      en: "process",
      fr: "processus",
      de: "prozess",
      es: "proceso"
    },
    "contatto": {
      nl: "contact",
      en: "contact",
      fr: "contact",
      de: "kontakt",
      es: "contacto"
    }
  }

  const switchLanguage = (langCode: string) => {
    let newPath = pathname

    // Extract the path without language prefix
    const pathWithoutLang = currentLang === "nl" ? pathname : pathname.replace(`/${currentLang}`, "")
    
    // Handle homepage
    if (pathWithoutLang === "/" || pathWithoutLang === "") {
      if (langCode === "nl") {
        newPath = "/"
      } else {
        newPath = `/${langCode}`
      }
    } else {
      // Handle other pages
      const pathSegments = pathWithoutLang.split("/").filter(Boolean)
      const slug = pathSegments[0] // Get the first segment (the page slug)
      
      if (slug && slugMapping[slug] && slugMapping[slug][langCode]) {
        // Convert the slug to the target language
        const targetSlug = slugMapping[slug][langCode]
        const remainingPath = pathSegments.slice(1).join("/")
        const fullPath = remainingPath ? `/${targetSlug}/${remainingPath}` : `/${targetSlug}`
        
        if (langCode === "nl") {
          newPath = fullPath
        } else {
          newPath = `/${langCode}${fullPath}`
        }
      } else {
        // If no mapping found, just change the language prefix
        if (langCode === "nl") {
          newPath = pathWithoutLang
        } else {
          newPath = `/${langCode}${pathWithoutLang}`
        }
      }
    }

    router.push(newPath)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (variant === "header") {
    return (
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 h-10 w-12 border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200"
        >
          <Image
            src={currentLanguage.flag}
            alt={currentLanguage.name}
            width={24}
            height={18}
            className="rounded-sm"
          />
        </Button>

        {isOpen && (
          <div className="absolute z-50 top-full right-0 mt-1 min-w-[160px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            {languages
              .filter(lang => lang.code !== currentLang)
              .map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => switchLanguage(lang.code)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors text-gray-900 border-b border-gray-100 last:border-b-0"
                >
                  <Image
                    src={lang.flag}
                    alt={lang.name}
                    width={20}
                    height={15}
                    className="rounded-sm"
                  />
                  <span className="font-medium text-gray-900">{lang.name}</span>
                </button>
              ))}
          </div>
        )}
      </div>
    )
  }

  // Footer variant (unchanged)
  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 h-9 border-gray-300 bg-white hover:bg-gray-50 text-gray-900"
      >
        <Image
          src={currentLanguage.flag}
          alt={currentLanguage.name}
          width={20}
          height={15}
          className="rounded-sm"
        />
        <span className="text-sm font-medium text-gray-900">{currentLanguage.name}</span>
        <ChevronUp className={`h-4 w-4 transition-transform text-gray-600 ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <div className="absolute z-50 bottom-full mb-1 min-w-[160px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {languages
            .filter(lang => lang.code !== currentLang)
            .map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors text-gray-900 border-b border-gray-100 last:border-b-0"
              >
                <Image
                  src={lang.flag}
                  alt={lang.name}
                  width={20}
                  height={15}
                  className="rounded-sm"
                />
                <span className="font-medium text-gray-900">{lang.name}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  )
} 