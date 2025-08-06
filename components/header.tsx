"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image" // Using Next.js Image component
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import LanguageSwitcher from "@/components/language-switcher"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Over Ons", href: "/over-ons" },
  { name: "Diensten", href: "/diensten" },
  { name: "Proces", href: "/proces" },
  { name: "Contact", href: "/contact" },
]

const navigationEn = [
  { name: "Home", href: "/en" },
  { name: "About Us", href: "/en/about-us" },
  { name: "Services", href: "/en/services" },
  { name: "Process", href: "/en/process" },
  { name: "Contact", href: "/en/contact" },
]

const navigationFr = [
  { name: "Accueil", href: "/fr" },
  { name: "À Propos", href: "/fr/a-propos" },
  { name: "Services", href: "/fr/services" },
  { name: "Processus", href: "/fr/processus" },
  { name: "Contact", href: "/fr/contact" },
]

const navigationDe = [
  { name: "Startseite", href: "/de" },
  { name: "Über uns", href: "/de/ueber-uns" },
  { name: "Dienstleistungen", href: "/de/dienstleistungen" },
  { name: "Prozess", href: "/de/prozess" },
  { name: "Kontakt", href: "/de/kontakt" },
]

const navigationEs = [
  { name: "Inicio", href: "/es" },
  { name: "Sobre Nosotros", href: "/es/sobre-nosotros" },
  { name: "Servicios", href: "/es/servicios" },
  { name: "Proceso", href: "/es/proceso" },
  { name: "Contacto", href: "/es/contacto" },
]

const navigationIt = [
  { name: "Home", href: "/it" },
  { name: "Chi Siamo", href: "/it/chi-siamo" },
  { name: "Servizi", href: "/it/servizi" },
  { name: "Processo", href: "/it/processo" },
  { name: "Contatto", href: "/it/contatto" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const currentLang = pathname.startsWith("/en") ? "en" : pathname.startsWith("/fr") ? "fr" : pathname.startsWith("/de") ? "de" : pathname.startsWith("/es") ? "es" : pathname.startsWith("/it") ? "it" : "nl"
  const currentNavigation = currentLang === "en" ? navigationEn : currentLang === "fr" ? navigationFr : currentLang === "de" ? navigationDe : currentLang === "es" ? navigationEs : currentLang === "it" ? navigationIt : navigation

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-white shadow-md" : "bg-white/90",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href={currentLang === "en" ? "/en" : currentLang === "fr" ? "/fr" : currentLang === "de" ? "/de" : currentLang === "es" ? "/es" : currentLang === "it" ? "/it" : "/"} className="-m-1.5 p-1.5 flex items-center">
            <span className="sr-only">Van Velzen Autorecycling</span>
            <Image
              src="/images/logo.png"
              alt="Van Velzen Autorecycling"
              width={150}
              height={40}
              className="h-10 w-auto"
              priority // Mark as priority image
              quality={90}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open hoofdmenu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {currentNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-semibold leading-6 transition-colors",
                pathname === item.href ? "text-primary border-b-2 border-primary" : "text-gray-700 hover:text-primary",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-2 ml-12">
          <Button asChild className="gap-2">
            <Link href="tel:+31686301771">
              <Phone className="h-4 w-4" />
              <span>06-86301771</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="https://wa.me/31686301771" target="_blank" rel="noopener noreferrer">
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp</span>
            </Link>
          </Button>
          <LanguageSwitcher variant="header" />
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={cn("lg:hidden fixed inset-0 z-50 bg-white", mobileMenuOpen ? "block" : "hidden")}>
        <div className="fixed inset-0 z-50">
          <div className="flex h-16 items-center justify-between px-4">
            <Link href={currentLang === "en" ? "/en" : currentLang === "fr" ? "/fr" : currentLang === "de" ? "/de" : currentLang === "es" ? "/es" : currentLang === "it" ? "/it" : "/"} className="-m-1.5 p-1.5 flex items-center" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Van Velzen Autorecycling</span>
              <Image
                src="/images/logo.png"
                alt="Van Velzen Autorecycling"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Sluit menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root px-6">
            <div className="-my-6 divide-y divide-gray-200">
              <div className="space-y-2 py-6">
                {currentNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7",
                      pathname === item.href ? "text-primary bg-gray-50" : "text-gray-900 hover:bg-gray-50",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 flex flex-col gap-3">
                <Button asChild className="w-full gap-2">
                  <Link href="tel:+31686301771">
                    <Phone className="h-4 w-4" />
                    <span>06-86301771</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full gap-2">
                  <Link href="https://wa.me/31686301771" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </Link>
                </Button>
                <div className="pt-2">
                  <LanguageSwitcher variant="header" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
