"use client"

import Link from "next/link"
import { Facebook, Instagram, Mail, Phone, MapPin, MessageSquare } from "lucide-react"
import Image from "next/image"
import LanguageSwitcher from "@/components/language-switcher"
import { usePathname } from "next/navigation"

export default function Footer() {
  const pathname = usePathname()
  const currentLang = pathname.startsWith("/en") ? "en" : pathname.startsWith("/fr") ? "fr" : pathname.startsWith("/de") ? "de" : pathname.startsWith("/es") ? "es" : pathname.startsWith("/it") ? "it" : "nl"
  
  const navigation = currentLang === "en" ? [
    { name: "Home", href: "/en" },
    { name: "About Us", href: "/en/about-us" },
    { name: "Services", href: "/en/services" },
    { name: "Process", href: "/en/process" },
    { name: "Contact", href: "/en/contact" },
      ] : currentLang === "fr" ? [
      { name: "Accueil", href: "/fr" },
      { name: "À Propos", href: "/fr/a-propos" },
      { name: "Services", href: "/fr/services" },
      { name: "Processus", href: "/fr/processus" },
      { name: "Contact", href: "/fr/contact" },
    ] : currentLang === "de" ? [
      { name: "Startseite", href: "/de" },
      { name: "Über uns", href: "/de/ueber-uns" },
      { name: "Dienstleistungen", href: "/de/dienstleistungen" },
      { name: "Prozess", href: "/de/prozess" },
      { name: "Kontakt", href: "/de/kontakt" },
    ] : currentLang === "es" ? [
      { name: "Inicio", href: "/es" },
      { name: "Sobre Nosotros", href: "/es/sobre-nosotros" },
      { name: "Servicios", href: "/es/servicios" },
      { name: "Proceso", href: "/es/proceso" },
      { name: "Contacto", href: "/es/contacto" },
    ] : currentLang === "it" ? [
      { name: "Home", href: "/it" },
      { name: "Chi Siamo", href: "/it/chi-siamo" },
      { name: "Servizi", href: "/it/servizi" },
      { name: "Processo", href: "/it/processo" },
      { name: "Contatto", href: "/it/contatto" },
    ] : [
    { name: "Home", href: "/" },
    { name: "Over Ons", href: "/over-ons" },
    { name: "Diensten", href: "/diensten" },
    { name: "Proces", href: "/proces" },
    { name: "Contact", href: "/contact" },
  ]

  const services = currentLang === "en" ? [
    { name: "Sell Scrap Car", href: "/en/services#sloopauto-verkopen" },
    { name: "Sell Damaged Car", href: "/en/services#schadeauto-verkopen" },
    { name: "Car Recycling", href: "/en/services#auto-recycling" },
    { name: "Free Pickup Service", href: "/en/services#gratis-ophaalservice" },
    { name: "RDW Deregistration", href: "/en/services#rdw-vrijwaring" },
  ] : currentLang === "fr" ? [
    { name: "Vendre Voiture de Rebut", href: "/fr/services#vendre-voiture-rebut" },
    { name: "Vendre Voiture Endommagée", href: "/fr/services#vendre-voiture-endommagee" },
    { name: "Recyclage Automobile", href: "/fr/services#recyclage-durable" },
    { name: "Service de Collecte Gratuit", href: "/fr/services#service-collecte-gratuit" },
    { name: "Décharge RDW", href: "/fr/services#decharge-rdw" },
  ] : currentLang === "de" ? [
    { name: "Schrottauto Verkaufen", href: "/de/dienstleistungen#schrottauto-verkaufen" },
    { name: "Beschädigtes Auto Verkaufen", href: "/de/dienstleistungen#beschaedigtes-auto-verkaufen" },
    { name: "Autorecycling", href: "/de/dienstleistungen#nachhaltiges-recycling" },
    { name: "Kostenloser Abholservice", href: "/de/dienstleistungen#kostenloser-abholservice" },
    { name: "RDW-Abmeldung", href: "/de/dienstleistungen#rdw-abmeldung" },
      ] : currentLang === "es" ? [
      { name: "Vender Coche de Chatarra", href: "/es/servicios#vender-coche-chatarra" },
      { name: "Vender Coche Dañado", href: "/es/servicios#vender-coche-danado" },
      { name: "Reciclaje de Coches", href: "/es/servicios#reciclaje-sostenible" },
      { name: "Servicio de Recogida Gratuito", href: "/es/servicios#servicio-recogida-gratuito" },
      { name: "Baja RDW", href: "/es/servicios#baja-rdw" },
    ] : currentLang === "it" ? [
      { name: "Vendere Auto Rottame", href: "/it/servizi#vendere-auto-rottame" },
      { name: "Vendere Auto Danneggiata", href: "/it/servizi#vendere-auto-danneggiata" },
      { name: "Riciclaggio Auto", href: "/it/servizi#riciclaggio-sostenibile" },
      { name: "Servizio di Ritiro Gratuito", href: "/it/servizi#servizio-ritiro-gratuito" },
      { name: "Radiazione RDW", href: "/it/servizi#radiazione-rdw" },
    ] : [
    { name: "Sloopauto Verkopen", href: "/diensten#sloopauto-verkopen" },
    { name: "Schadeauto Verkopen", href: "/diensten#schadeauto-verkopen" },
    { name: "Auto Recycling", href: "/diensten#auto-recycling" },
    { name: "Gratis Ophaalservice", href: "/diensten#gratis-ophaalservice" },
    { name: "RDW Vrijwaring", href: "/diensten#rdw-vrijwaring" },
  ]

  const legalLinks = currentLang === "en" ? [
    { name: "Terms and Conditions", href: "/en/algemene-voorwaarden" },
    { name: "Cookie Policy", href: "/en/cookiebeleid" },
    { name: "Privacy Policy", href: "/en/privacybeleid" },
  ] : currentLang === "fr" ? [
    { name: "Conditions Générales", href: "/fr/conditions-generales" },
    { name: "Politique de Cookies", href: "/fr/politique-cookies" },
    { name: "Politique de Confidentialité", href: "/fr/politique-confidentialite" },
  ] : currentLang === "de" ? [
    { name: "Allgemeine Geschäftsbedingungen", href: "/de/allgemeine-geschaeftsbedingungen" },
    { name: "Cookie-Richtlinie", href: "/de/cookie-richtlinie" },
    { name: "Datenschutzrichtlinie", href: "/de/datenschutzrichtlinie" },
      ] : currentLang === "es" ? [
      { name: "Términos y Condiciones", href: "/es/terminos-condiciones" },
      { name: "Política de Cookies", href: "/es/politica-cookies" },
      { name: "Política de Privacidad", href: "/es/politica-privacidad" },
    ] : currentLang === "it" ? [
      { name: "Termini e Condizioni", href: "/it/termini-condizioni" },
      { name: "Politica sui Cookie", href: "/it/politica-cookie" },
      { name: "Politica sulla Privacy", href: "/it/politica-privacy" },
    ] : [
    { name: "Algemene Voorwaarden", href: "/algemene-voorwaarden" },
    { name: "Cookiebeleid", href: "/cookiebeleid" },
    { name: "Privacybeleid", href: "/privacybeleid" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4">
              <Link href={currentLang === "en" ? "/en" : currentLang === "fr" ? "/fr" : currentLang === "de" ? "/de" : currentLang === "es" ? "/es" : currentLang === "it" ? "/it" : "/"}>
                <Image
                  src="/images/logo.png"
                  alt="Van Velzen Autorecycling"
                  width={180}
                  height={48}
                  className="h-12 w-auto"
                  style={{ filter: "brightness(0) invert(1)" }}
                  loading="lazy"
                />
              </Link>
            </div>
            <p className="text-sm text-gray-300 mt-4 max-w-md pr-6">
              {currentLang === "en" 
                ? "Van Velzen Autorecycling is one of the largest and most sustainable car recycling and dismantling companies in the Netherlands. We always offer a realistic price for your (scrap/damaged) car."
                : currentLang === "fr"
                ? "Van Velzen Autorecycling est l'une des plus grandes entreprises de recyclage et de démantèlement automobile durables des Pays-Bas. Nous offrons toujours un prix réaliste pour votre voiture (de rebut/endommagée)."
                : currentLang === "de"
                ? "Van Velzen Autorecycling ist eines der größten und nachhaltigsten Autorecycling- und Demontageunternehmen in den Niederlanden. Wir bieten immer einen realistischen Preis für Ihr (Schrott-/beschädigtes) Auto."
                : currentLang === "es"
                ? "Van Velzen Autorecycling es una de las empresas más grandes y sostenibles de reciclaje y desguace de coches en los Países Bajos. Siempre ofrecemos un precio realista para su coche (de chatarra/dañado)."
                : currentLang === "it"
                ? "Van Velzen Autorecycling è una delle più grandi e sostenibili aziende di riciclaggio e smontaggio auto dei Paesi Bassi. Offriamo sempre un prezzo realistico per la vostra auto (rottame/danneggiata)."
                : "Van Velzen Autorecycling is één van de grootste en duurzaamste autorecycling en demontagebedrijven in Nederland. Wij bieden altijd een realistische prijs voor uw (sloop/schade) auto."
              }
            </p>
            <div className="flex space-x-4 mt-6">
              <Link
                href="https://www.facebook.com/profile.php?id=61558735494411"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                href="https://instagram.com"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">X (Twitter)</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              {currentLang === "en" ? "Navigation" : currentLang === "fr" ? "Navigation" : currentLang === "de" ? "Navigation" : currentLang === "es" ? "Navegación" : currentLang === "it" ? "Navigazione" : "Navigatie"}
            </h3>
            <ul className="mt-4 space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-300 hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              {currentLang === "en" ? "Services" : currentLang === "fr" ? "Services" : currentLang === "de" ? "Dienstleistungen" : currentLang === "es" ? "Servicios" : currentLang === "it" ? "Servizi" : "Diensten"}
            </h3>
            <ul className="mt-4 space-y-2">
              {services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-300 hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-300">
                  Lau Mazirelweg 8
                  <br />
                  2629 HW - Delft
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <Link href="mailto:info@vanvelzenautorecycling.nl" className="text-gray-300 hover:text-white">
                  info@vanvelzenautorecycling.nl
                </Link>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <Link href="tel:+31686301771" className="text-gray-300 hover:text-white">
                  06-86301771
                </Link>
              </li>
              <li className="flex items-center">
                <MessageSquare className="h-5 w-5 text-gray-400 mr-2" />
                <Link
                  href="https://wa.me/31686301771"
                  className="text-gray-300 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-sm text-gray-400 text-center">
            <strong>Van Velzen Autorecycling &copy; {new Date().getFullYear()} </strong>
            <br />
            <span className="italic">Powered by: FIX-WEB.site</span>
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            {legalLinks.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm text-gray-400 hover:text-white">
                {item.name}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <LanguageSwitcher variant="footer" />
          </div>
        </div>
      </div>
    </footer>
  )
}
