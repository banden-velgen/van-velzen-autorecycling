import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Algemene Voorwaarden | Van Velzen Autorecycling",
  description:
    "Lees de algemene voorwaarden van Van Velzen Autorecycling. Informatie over onze diensten, betalingen, aansprakelijkheid en meer.",
  alternates: {
    canonical: "/algemene-voorwaarden",
  },
  openGraph: {
    title: "Algemene Voorwaarden | Van Velzen Autorecycling",
    description: "Informatie over onze diensten, betalingen, aansprakelijkheid en meer.",
    url: "/algemene-voorwaarden",
  },
}

export default function AlgemeneVoorwaardenPage() {
  const lastUpdated = new Date().toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="bg-white py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Algemene Voorwaarden</h1>
              <p className="text-sm text-gray-500 mb-8 text-center">Laatst bijgewerkt: {lastUpdated}</p>

              <div className="prose prose-lg max-w-none">
                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">1. Algemeen</h2>
                  <p>
                    Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, overeenkomsten en diensten van Van
                    Velzen Autorecycling, gevestigd te Delft aan de Lau Mazirelweg 8, 2629 HW, ingeschreven bij de Kamer van
                    Koophandel onder nummer [KvK-nummer], hierna te noemen: "Van Velzen Autorecycling".
                  </p>
                  <p>
                    Door gebruik te maken van onze diensten, gaat u akkoord met deze algemene voorwaarden. Afwijkingen van
                    deze voorwaarden zijn alleen geldig indien deze schriftelijk zijn overeengekomen.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">2. Definities</h2>
                  <p>In deze algemene voorwaarden wordt verstaan onder:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Van Velzen Autorecycling:</strong> de aanbieder van autorecycling en aanverwante diensten.
                    </li>
                    <li>
                      <strong>Klant:</strong> de natuurlijke of rechtspersoon die een overeenkomst aangaat met Van Velzen
                      Autorecycling.
                    </li>
                    <li>
                      <strong>Voertuig:</strong> het motorvoertuig dat onderwerp is van de overeenkomst tussen klant en Van
                      Velzen Autorecycling.
                    </li>
                    <li>
                      <strong>Diensten:</strong> alle door Van Velzen Autorecycling aangeboden diensten, waaronder maar niet
                      beperkt tot het opkopen, ophalen, demonteren en recyclen van voertuigen.
                    </li>
                    <li>
                      <strong>Overeenkomst:</strong> elke afspraak tussen Van Velzen Autorecycling en klant tot het verlenen
                      van diensten.
                    </li>
                  </ul>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">3. Toepasselijkheid</h2>
                  <p>
                    Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, offertes en overeenkomsten tussen Van
                    Velzen Autorecycling en de klant, tenzij uitdrukkelijk schriftelijk anders is overeengekomen.
                  </p>
                  <p>
                    Eventuele algemene voorwaarden van de klant worden uitdrukkelijk van de hand gewezen, tenzij deze
                    schriftelijk door Van Velzen Autorecycling zijn aanvaard.
                  </p>
                  <p>
                    Van Velzen Autorecycling behoudt zich het recht voor deze algemene voorwaarden te wijzigen of aan te
                    vullen. Wijzigingen gelden ook ten aanzien van reeds gesloten overeenkomsten, met inachtneming van een
                    termijn van 30 dagen na bekendmaking van de wijziging.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">4. Aanbiedingen en offertes</h2>
                  <p>
                    Alle aanbiedingen en offertes van Van Velzen Autorecycling zijn vrijblijvend, tenzij uitdrukkelijk anders
                    vermeld.
                  </p>
                  <p>
                    Een offerte is geldig gedurende 14 dagen na dagtekening, tenzij anders aangegeven. Van Velzen
                    Autorecycling is slechts aan de offerte gebonden indien de aanvaarding hiervan door de klant schriftelijk
                    binnen de geldigheidstermijn wordt bevestigd.
                  </p>
                  <p>
                    De in een offerte vermelde prijzen zijn inclusief BTW en andere heffingen van overheidswege, tenzij anders
                    aangegeven.
                  </p>
                  <p>Aanbiedingen of offertes gelden niet automatisch voor toekomstige opdrachten.</p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">5. Uitvoering van de overeenkomst</h2>
                  <p>
                    Van Velzen Autorecycling zal de overeenkomst naar beste inzicht en vermogen en overeenkomstig de eisen van
                    goed vakmanschap uitvoeren.
                  </p>
                  <p>
                    De klant draagt er zorg voor dat alle gegevens, waarvan Van Velzen Autorecycling aangeeft dat deze
                    noodzakelijk zijn of waarvan de klant redelijkerwijs behoort te begrijpen dat deze noodzakelijk zijn voor
                    het uitvoeren van de overeenkomst, tijdig aan Van Velzen Autorecycling worden verstrekt.
                  </p>
                  <p>
                    De klant garandeert dat het voertuig zijn eigendom is en dat er geen rechten van derden op rusten. De
                    klant vrijwaart Van Velzen Autorecycling voor eventuele aanspraken van derden.
                  </p>
                  <p>Van Velzen Autorecycling heeft het recht bepaalde werkzaamheden te laten verrichten door derden.</p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">6. Ophaalservice</h2>
                  <p>
                    Indien overeengekomen, zal Van Velzen Autorecycling het voertuig ophalen op het door de klant opgegeven
                    adres.
                  </p>
                  <p>
                    De klant dient ervoor te zorgen dat het voertuig toegankelijk is en dat alle benodigde documenten
                    (kentekenbewijs, identificatie eigenaar) aanwezig zijn.
                  </p>
                  <p>
                    Bij het ophalen van het voertuig wordt een ophaalformulier opgesteld waarin de staat van het voertuig
                    wordt vastgelegd. Dit formulier dient door beide partijen te worden ondertekend.
                  </p>
                  <p>
                    Van Velzen Autorecycling is niet aansprakelijk voor eventuele schade aan het terrein of de omgeving
                    tijdens het ophalen van het voertuig, tenzij er sprake is van opzet of grove nalatigheid.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">7. Prijzen en betaling</h2>
                  <p>
                    De prijs die Van Velzen Autorecycling betaalt voor een voertuig wordt bepaald op basis van de staat, het
                    model, het bouwjaar en de marktwaarde van het voertuig.
                  </p>
                  <p>
                    Betaling aan de klant geschiedt na ontvangst en inspectie van het voertuig, tenzij anders overeengekomen.
                  </p>
                  <p>
                    Betaling kan plaatsvinden via bankoverschrijving of contant, met inachtneming van de wettelijke bepalingen
                    hieromtrent.
                  </p>
                  <p>
                    Indien na inspectie blijkt dat de staat van het voertuig significant afwijkt van hetgeen is opgegeven door
                    de klant, behoudt Van Velzen Autorecycling zich het recht voor de aangeboden prijs aan te passen of de
                    overeenkomst te ontbinden.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">8. RDW-vrijwaring</h2>
                  <p>
                    Van Velzen Autorecycling zorgt voor de vrijwaring van het voertuig bij de RDW, waardoor de klant wordt
                    ontheven van de wegenbelastingplicht.
                  </p>
                  <p>
                    Voor de vrijwaring dient de klant het originele kentekenbewijs (of kentekencards) en een geldig
                    legitimatiebewijs te overhandigen.
                  </p>
                  <p>De klant ontvangt een vrijwaringsbewijs als bewijs dat het voertuig is afgemeld bij de RDW.</p>
                  <p>
                    Van Velzen Autorecycling is niet aansprakelijk voor eventuele kosten of boetes die voortvloeien uit het
                    niet tijdig of onjuist aanleveren van de benodigde documenten door de klant.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">9. Aansprakelijkheid</h2>
                  <p>
                    Van Velzen Autorecycling is uitsluitend aansprakelijk voor directe schade die is ontstaan door bewuste
                    roekeloosheid of opzet van Van Velzen Autorecycling.
                  </p>
                  <p>
                    Onder directe schade wordt uitsluitend verstaan de redelijke kosten ter vaststelling van de oorzaak en de
                    omvang van de schade, de eventuele redelijke kosten gemaakt om de gebrekkige prestatie van Van Velzen
                    Autorecycling aan de overeenkomst te laten beantwoorden en redelijke kosten gemaakt ter voorkoming of
                    beperking van schade.
                  </p>
                  <p>
                    Van Velzen Autorecycling is nimmer aansprakelijk voor indirecte schade, daaronder begrepen gevolgschade,
                    gederfde winst, gemiste besparingen en schade door bedrijfsstagnatie.
                  </p>
                  <p>
                    De aansprakelijkheid van Van Velzen Autorecycling is in alle gevallen beperkt tot het bedrag dat in het
                    desbetreffende geval door de verzekeraar van Van Velzen Autorecycling wordt uitbetaald.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">10. Overmacht</h2>
                  <p>
                    Van Velzen Autorecycling is niet gehouden tot het nakomen van enige verplichting jegens de klant indien
                    hij daartoe gehinderd wordt als gevolg van een omstandigheid die niet is te wijten aan schuld, en noch
                    krachtens de wet, een rechtshandeling of in het verkeer geldende opvattingen voor zijn rekening komt.
                  </p>
                  <p>
                    Onder overmacht wordt in deze algemene voorwaarden verstaan, naast hetgeen daaromtrent in de wet en
                    jurisprudentie wordt begrepen, alle van buitenkomende oorzaken, voorzien of niet-voorzien, waarop Van
                    Velzen Autorecycling geen invloed kan uitoefenen, doch waardoor Van Velzen Autorecycling niet in staat is
                    zijn verplichtingen na te komen.
                  </p>
                  <p>
                    Van Velzen Autorecycling kan gedurende de periode dat de overmacht voortduurt de verplichtingen uit de
                    overeenkomst opschorten. Indien deze periode langer duurt dan twee maanden, dan is ieder der partijen
                    gerechtigd de overeenkomst te ontbinden, zonder verplichting tot vergoeding van schade aan de andere
                    partij.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">11. Intellectuele eigendom</h2>
                  <p>
                    Van Velzen Autorecycling behoudt zich de rechten en bevoegdheden voor die hem toekomen op grond van de
                    Auteurswet en andere intellectuele wet- en regelgeving.
                  </p>
                  <p>
                    Alle door Van Velzen Autorecycling verstrekte stukken, zoals rapporten, adviezen, overeenkomsten,
                    ontwerpen, schetsen, tekeningen, software enz., zijn uitsluitend bestemd om te worden gebruikt door de
                    klant en mogen niet door hem zonder voorafgaande toestemming van Van Velzen Autorecycling worden
                    verveelvoudigd, openbaar gemaakt, of ter kennis van derden gebracht.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">12. Privacy en gegevensbescherming</h2>
                  <p>
                    Van Velzen Autorecycling verwerkt persoonsgegevens in overeenstemming met de geldende privacywetgeving,
                    zoals beschreven in onze privacyverklaring.
                  </p>
                  <p>
                    De klant geeft toestemming voor het verwerken van persoonsgegevens die noodzakelijk zijn voor het
                    uitvoeren van de overeenkomst en het voldoen aan wettelijke verplichtingen.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">13. Toepasselijk recht en geschillen</h2>
                  <p>
                    Op alle rechtsbetrekkingen waarbij Van Velzen Autorecycling partij is, is uitsluitend het Nederlands recht
                    van toepassing.
                  </p>
                  <p>
                    De rechtbank in de vestigingsplaats van Van Velzen Autorecycling is bij uitsluiting bevoegd van geschillen
                    kennis te nemen, tenzij de wet dwingend anders voorschrijft.
                  </p>
                  <p>
                    Partijen zullen eerst een beroep op de rechter doen nadat zij zich tot het uiterste hebben ingespannen een
                    geschil in onderling overleg te beslechten.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">14. Slotbepalingen</h2>
                  <p>
                    Indien één of meerdere bepalingen in deze algemene voorwaarden op enig moment geheel of gedeeltelijk
                    nietig zijn of vernietigd mochten worden, dan blijft het overige in deze algemene voorwaarden bepaalde
                    volledig van toepassing.
                  </p>
                  <p>
                    Van Velzen Autorecycling heeft het recht deze algemene voorwaarden te wijzigen. Van toepassing is steeds
                    de versie zoals die gold ten tijde van het tot stand komen van de rechtsbetrekking met Van Velzen
                    Autorecycling.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">15. Contact</h2>
                  <p>Voor vragen over deze algemene voorwaarden of onze diensten kunt u contact opnemen met:</p>
                  <p className="mt-4">
                    <strong>Van Velzen Autorecycling</strong>
                    <br />
                    Lau Mazirelweg 8<br />
                    2629 HW Delft
                    <br />
                    Telefoon: 06-86301771
                    <br />
                    E-mail: info@vanvelzenautorecycling.nl
                  </p>
                </section>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </ThemeProvider>
  )
}