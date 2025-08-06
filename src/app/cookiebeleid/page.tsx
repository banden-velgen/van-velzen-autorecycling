import Link from "next/link"
import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Cookiebeleid | Van Velzen Autorecycling",
  description:
    "Lees ons cookiebeleid om te begrijpen hoe wij cookies gebruiken om uw ervaring op onze website te verbeteren.",
  alternates: {
    canonical: "/cookiebeleid",
  },
  openGraph: {
    title: "Cookiebeleid | Van Velzen Autorecycling",
    description: "Informatie over hoe wij cookies gebruiken om uw ervaring op onze website te verbeteren.",
    url: "/cookiebeleid",
  },}

export default function CookieBeleidPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
  return (
  return (
    <main className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Cookiebeleid</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Laatst bijgewerkt:{" "}
            {new Date().toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">1. Inleiding</h2>
            <p>
              Van Velzen Autorecycling maakt gebruik van cookies en vergelijkbare technologieën op onze website. Dit
              cookiebeleid legt uit wat cookies zijn, hoe wij cookies gebruiken, welke soorten cookies wij gebruiken, en
              hoe u uw cookievoorkeuren kunt beheren.
            </p>
            <p>
              Door onze website te gebruiken, stemt u in met het gebruik van cookies zoals beschreven in dit
              cookiebeleid. Als u niet wilt dat cookies op uw apparaat worden geplaatst, kunt u uw browserinstellingen
              aanpassen om het plaatsen van cookies te weigeren of om een melding te krijgen wanneer er een cookie wordt
              geplaatst. Houd er echter rekening mee dat als u cookies uitschakelt, u mogelijk niet alle functies van
              onze website kunt gebruiken.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">2. Wat zijn cookies?</h2>
            <p>
              Cookies zijn kleine tekstbestanden die op uw computer, tablet of mobiele telefoon worden geplaatst wanneer
              u een website bezoekt. Ze worden veel gebruikt om websites efficiënter te laten werken en om informatie te
              verstrekken aan de eigenaren van de website.
            </p>
            <p>Cookies kunnen verschillende functies hebben:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Ze kunnen noodzakelijk zijn voor het correct functioneren van de website</li>
              <li>Ze kunnen informatie over uw gebruik van de website opslaan</li>
              <li>Ze kunnen u helpen efficiënter door de website te navigeren</li>
              <li>Ze kunnen u een meer gepersonaliseerde ervaring bieden</li>
              <li>Ze kunnen helpen bij het verzamelen van feedback over uw gebruik van de website</li>
            </ul>
            <p>
              Cookies kunnen worden ingedeeld als "sessiecookies" of "permanente cookies". Sessiecookies worden
              automatisch verwijderd wanneer u uw browser sluit, terwijl permanente cookies op uw apparaat blijven staan
              totdat ze verlopen of totdat u ze verwijdert.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">3. Soorten cookies die wij gebruiken</h2>
            <p>Wij gebruiken verschillende soorten cookies op onze website:</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Noodzakelijke cookies</h3>
            <p>
              Deze cookies zijn essentieel voor het functioneren van onze website. Ze stellen u in staat om door de
              website te navigeren en gebruik te maken van de functies. Zonder deze cookies kunnen bepaalde diensten
              niet worden geleverd. Deze cookies verzamelen geen informatie over u die gebruikt kan worden voor
              marketingdoeleinden.
            </p>
            <p>Voorbeelden van noodzakelijke cookies zijn:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Cookies die uw inloggegevens onthouden</li>
              <li>Cookies die de inhoud van uw winkelwagen onthouden</li>
              <li>Cookies die de beveiliging van de website waarborgen</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Functionele cookies</h3>
            <p>
              Deze cookies stellen de website in staat om verbeterde functionaliteit en personalisatie te bieden. Ze
              kunnen worden ingesteld door ons of door externe providers wiens diensten we aan onze pagina's hebben
              toegevoegd.
            </p>
            <p>Voorbeelden van functionele cookies zijn:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Cookies die uw taalvoorkeuren onthouden</li>
              <li>Cookies die uw voorkeuren voor lettergrootte of andere aanpasbare onderdelen onthouden</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Analytische cookies</h3>
            <p>
              Deze cookies helpen ons te begrijpen hoe bezoekers met onze website omgaan. Ze geven ons informatie over
              welke pagina's het meest worden bezocht, hoe lang bezoekers op een pagina blijven, en of ze foutmeldingen
              krijgen. Dit helpt ons de prestaties van onze website te verbeteren.
            </p>
            <p>
              Wij gebruiken Google Analytics om gegevens te verzamelen over het gebruik van onze website. Google
              Analytics slaat informatie op zoals welke pagina's u heeft bezocht, hoe lang u op de website bent
              gebleven, hoe u op de site bent gekomen en op welke elementen u heeft geklikt.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.4 Marketing cookies</h3>
            <p>
              Deze cookies worden gebruikt om bezoekers op websites te volgen. De bedoeling is om advertenties weer te
              geven die relevant en aantrekkelijk zijn voor de individuele gebruiker en daardoor waardevoller voor
              uitgevers en externe adverteerders.
            </p>
            <p>
              Deze cookies kunnen informatie over uw online gedrag delen met andere organisaties, zoals adverteerders.
              We streven ernaar om u alleen advertenties te tonen die relevant zijn voor uw interesses.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">4. Cookies van derden</h2>
            <p>
              Naast onze eigen cookies, kunnen er ook cookies van derden op onze website worden geplaatst. Dit zijn
              cookies die worden geplaatst door andere organisaties dan Van Velzen Autorecycling. Deze cookies kunnen
              worden geplaatst door diensten die we gebruiken, zoals Google Analytics, sociale media platforms, of
              advertentienetwerken.
            </p>
            <p>
              Wij hebben geen directe controle over de informatie die wordt verzameld door deze cookies. Voor meer
              informatie over deze cookies en hoe ze worden gebruikt, raden we u aan om het privacybeleid en
              cookiebeleid van de betreffende derde partijen te raadplegen.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">5. Bewaartermijn van cookies</h2>
            <p>De bewaartermijn van cookies varieert afhankelijk van het type cookie:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Sessiecookies:</strong> Deze worden verwijderd wanneer u uw browser sluit.
              </li>
              <li>
                <strong>Permanente cookies:</strong> Deze blijven op uw apparaat staan totdat ze verlopen of totdat u ze
                verwijdert. De bewaartermijn van permanente cookies varieert, maar is meestal niet langer dan 2 jaar.
              </li>
            </ul>
            <p>
              Voor specifieke informatie over de bewaartermijn van individuele cookies kunt u contact met ons opnemen.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">6. Uw cookievoorkeuren beheren</h2>
            <p>
              U kunt uw cookievoorkeuren beheren door uw browserinstellingen aan te passen. De meeste webbrowsers bieden
              de mogelijkheid om cookies te beheren. U kunt:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Alle cookies blokkeren</li>
              <li>Cookies van derden blokkeren</li>
              <li>Een melding krijgen wanneer er een cookie wordt geplaatst</li>
              <li>Bestaande cookies verwijderen</li>
            </ul>
            <p>
              Hoe u dit doet, verschilt per browser. Hieronder vindt u links naar instructies voor de meest gebruikte
              browsers:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/nl/kb/cookies-verwijderen-gegevens-wissen-websites-opgeslagen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/nl-nl/microsoft-edge/cookies-verwijderen-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Microsoft Edge
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/nl-nl/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Safari
                </a>
              </li>
            </ul>
            <p>
              Houd er rekening mee dat het blokkeren van cookies invloed kan hebben op uw ervaring op onze website.
              Sommige functies werken mogelijk niet correct als u cookies uitschakelt.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">7. Wijzigingen in ons cookiebeleid</h2>
            <p>
              We kunnen dit cookiebeleid van tijd tot tijd bijwerken om veranderingen in onze praktijken of om andere
              operationele, juridische of regelgevende redenen weer te geven. We raden u aan om dit cookiebeleid
              regelmatig te bekijken om op de hoogte te blijven van ons gebruik van cookies.
            </p>
            <p>
              Wanneer we wijzigingen aanbrengen in dit cookiebeleid, zullen we de datum van de "laatste update" bovenaan
              deze pagina bijwerken.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
            <p>
              Als u vragen heeft over ons gebruik van cookies of over dit cookiebeleid, neem dan contact met ons op:
            </p>
            <p>
              <strong>Van Velzen Autorecycling</strong>
              <br />
              Lau Mazirelweg 8<br />
              2629 HW - Delft
              <br />
              Telefoonnummer: 06-86301771
              <br />
              E-mail: info@vanvelzenautorecycling.nl
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">9. Relatie met ons privacybeleid</h2>
            <p>
              Dit cookiebeleid maakt deel uit van en moet worden gelezen in samenhang met ons
              <Link href="/privacybeleid" className="text-blue-600 hover:underline mx-1">
                privacybeleid
              </Link>
              , dat aanvullende informatie bevat over hoe wij uw persoonlijke gegevens verwerken.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </ThemeProvider>
  )
}