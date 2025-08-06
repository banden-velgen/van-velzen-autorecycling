import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacybeleid | Van Velzen Autorecycling",
  description:
    "Lees ons privacybeleid om te begrijpen hoe wij uw persoonlijke gegevens verzamelen, gebruiken en beschermen.",
  alternates: {
    canonical: "/privacybeleid",
  },
  openGraph: {
    title: "Privacybeleid | Van Velzen Autorecycling",
    description: "Informatie over hoe wij uw persoonlijke gegevens verzamelen, gebruiken en beschermen.",
    url: "/privacybeleid",
  },
}

export default function PrivacyBeleidPage() {
  return (
    <main className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Privacybeleid</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Laatst bijgewerkt:{" "}
            {new Date().toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">1. Inleiding</h2>
            <p>
              Welkom bij Van Velzen Autorecycling. Wij respecteren uw privacy en zetten ons in voor het beschermen van
              uw persoonlijke gegevens. Dit privacybeleid informeert u over hoe wij omgaan met uw persoonlijke gegevens
              wanneer u onze website bezoekt of gebruik maakt van onze diensten, ongeacht hoe u met ons in contact komt.
            </p>
            <p>
              Dit beleid beschrijft ook uw privacyrechten en hoe de wet u beschermt. Wij verwerken uw gegevens in
              overeenstemming met de Algemene Verordening Gegevensbescherming (AVG).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">2. Wie zijn wij</h2>
            <p>
              Van Velzen Autorecycling is een autorecycling en demontagebedrijf gevestigd in Delft. Wij zijn
              verantwoordelijk voor de verwerking van uw persoonsgegevens (aangeduid als "wij", "ons" of "onze" in dit
              privacybeleid).
            </p>
            <p>
              <strong>Contactgegevens:</strong>
              <br />
              Van Velzen Autorecycling
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
            <h2 className="text-2xl font-semibold mb-4">3. Welke gegevens verzamelen wij</h2>
            <p>
              Persoonsgegevens zijn alle informatie over een geïdentificeerde of identificeerbare natuurlijke persoon.
              Wij kunnen de volgende categorieën persoonsgegevens verzamelen, gebruiken, opslaan en overdragen:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Identiteitsgegevens</strong> zoals voornaam, achternaam, gebruikersnaam of soortgelijke
                identificatie.
              </li>
              <li>
                <strong>Contactgegevens</strong> zoals factuuradres, afleveradres, e-mailadres en telefoonnummers.
              </li>
              <li>
                <strong>Voertuiggegevens</strong> zoals kenteken, merk, model, bouwjaar en chassisnummer.
              </li>
              <li>
                <strong>Financiële gegevens</strong> zoals bankrekening en betaalkaartgegevens.
              </li>
              <li>
                <strong>Transactiegegevens</strong> zoals details over betalingen aan en van u en andere details van
                producten en diensten die u bij ons heeft gekocht.
              </li>
              <li>
                <strong>Technische gegevens</strong> zoals IP-adres, inloggegevens, browsertype en -versie,
                tijdzone-instelling en locatie, browser-plug-intypes en -versies, besturingssysteem en platform en
                andere technologie op de apparaten die u gebruikt om toegang te krijgen tot deze website.
              </li>
              <li>
                <strong>Profielgegevens</strong> zoals uw gebruikersnaam en wachtwoord, aankopen of bestellingen die u
                heeft gedaan, uw interesses, voorkeuren, feedback en enquêteantwoorden.
              </li>
              <li>
                <strong>Gebruiksgegevens</strong> zoals informatie over hoe u onze website, producten en diensten
                gebruikt.
              </li>
              <li>
                <strong>Marketing- en communicatiegegevens</strong> zoals uw voorkeuren voor het ontvangen van marketing
                van ons en onze derden en uw communicatievoorkeuren.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">4. Hoe verzamelen wij uw persoonsgegevens</h2>
            <p>Wij gebruiken verschillende methoden om gegevens van en over u te verzamelen, waaronder via:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Directe interacties.</strong> U kunt ons uw identiteits-, contact- en financiële gegevens geven
                door formulieren in te vullen of door met ons te corresponderen via post, telefoon, e-mail of
                anderszins.
              </li>
              <li>
                <strong>Geautomatiseerde technologieën of interacties.</strong> Terwijl u onze website gebruikt, kunnen
                we automatisch technische gegevens verzamelen over uw apparatuur, browseacties en -patronen.
              </li>
              <li>
                <strong>Derden of openbaar beschikbare bronnen.</strong> We kunnen persoonsgegevens over u ontvangen van
                verschillende derden en openbare bronnen, zoals de RDW voor voertuiggegevens.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">5. Hoe wij uw persoonsgegevens gebruiken</h2>
            <p>
              Wij zullen uw persoonsgegevens alleen gebruiken wanneer de wet ons dat toestaat. Meestal zullen wij uw
              persoonsgegevens gebruiken in de volgende omstandigheden:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                Wanneer we een contract moeten uitvoeren dat we op het punt staan met u aan te gaan of hebben
                afgesloten.
              </li>
              <li>
                Wanneer het noodzakelijk is voor onze legitieme belangen (of die van een derde) en uw belangen en
                fundamentele rechten niet zwaarder wegen dan die belangen.
              </li>
              <li>Wanneer we moeten voldoen aan een wettelijke of regelgevende verplichting.</li>
              <li>Met uw toestemming.</li>
            </ul>
            <p>Doeleinden waarvoor wij uw persoonsgegevens zullen gebruiken:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Om u te registreren als nieuwe klant.</li>
              <li>Om uw bestelling te verwerken en te leveren.</li>
              <li>Om onze relatie met u te beheren.</li>
              <li>Om ons bedrijf en deze website te beheren en te beschermen.</li>
              <li>Om onze website, producten/diensten, marketing, klantrelaties en ervaringen te leveren.</li>
              <li>
                Om u suggesties en aanbevelingen te doen over goederen of diensten die voor u van belang kunnen zijn.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
            <p>
              Onze website maakt gebruik van cookies om u te onderscheiden van andere gebruikers van onze website. Dit
              helpt ons om u een goede ervaring te bieden wanneer u onze website browst en stelt ons ook in staat om
              onze website te verbeteren.
            </p>
            <p>
              Een cookie is een klein bestand met letters en cijfers dat we op uw browser of de harde schijf van uw
              computer opslaan als u daarmee instemt. Cookies bevatten informatie die wordt overgebracht naar de harde
              schijf van uw computer.
            </p>
            <p>Wij gebruiken de volgende cookies:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Strikt noodzakelijke cookies.</strong> Dit zijn cookies die nodig zijn voor de werking van onze
                website. Ze omvatten bijvoorbeeld cookies die u in staat stellen om in te loggen op beveiligde gedeelten
                van onze website.
              </li>
              <li>
                <strong>Analytische/prestatiecookies.</strong> Deze stellen ons in staat om het aantal bezoekers te
                herkennen en te tellen en te zien hoe bezoekers zich op onze website bewegen wanneer ze deze gebruiken.
                Dit helpt ons om de werking van onze website te verbeteren, bijvoorbeeld door ervoor te zorgen dat
                gebruikers gemakkelijk vinden wat ze zoeken.
              </li>
              <li>
                <strong>Functionaliteitscookies.</strong> Deze worden gebruikt om u te herkennen wanneer u terugkeert
                naar onze website. Dit stelt ons in staat om onze inhoud voor u te personaliseren, u bij uw naam te
                begroeten en uw voorkeuren te onthouden (bijvoorbeeld uw keuze van taal of regio).
              </li>
              <li>
                <strong>Targeting cookies.</strong> Deze cookies registreren uw bezoek aan onze website, de pagina's die
                u heeft bezocht en de links die u heeft gevolgd. We zullen deze informatie gebruiken om onze website en
                de advertenties die daarop worden weergegeven relevanter te maken voor uw interesses.
              </li>
            </ul>
            <p>
              U kunt uw browser zo instellen dat alle of sommige browsercookies worden geweigerd, of dat u wordt
              gewaarschuwd wanneer websites cookies instellen of openen. Als u cookies uitschakelt of weigert, houd er
              dan rekening mee dat sommige delen van deze website ontoegankelijk kunnen worden of niet naar behoren
              functioneren.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">7. Gegevensbeveiliging</h2>
            <p>
              Wij hebben passende beveiligingsmaatregelen getroffen om te voorkomen dat uw persoonsgegevens per ongeluk
              verloren gaan, worden gebruikt of geopend op een ongeautoriseerde manier, worden gewijzigd of openbaar
              worden gemaakt. Daarnaast beperken wij de toegang tot uw persoonsgegevens tot die werknemers, agenten,
              aannemers en andere derden die een zakelijke noodzaak hebben om deze te kennen. Zij zullen uw
              persoonsgegevens alleen verwerken op onze instructies en zijn onderworpen aan een geheimhoudingsplicht.
            </p>
            <p>
              Wij hebben procedures ingesteld om elke vermoedelijke inbreuk op persoonsgegevens aan te pakken en zullen
              u en elke toepasselijke toezichthouder op de hoogte stellen van een inbreuk waar we wettelijk toe
              verplicht zijn.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">8. Gegevensbewaring</h2>
            <p>
              Wij bewaren uw persoonsgegevens alleen zolang als nodig is om de doeleinden waarvoor we ze hebben
              verzameld te vervullen, inclusief voor het voldoen aan wettelijke, boekhoudkundige of rapportagevereisten.
            </p>
            <p>
              Om de juiste bewaartermijn voor persoonsgegevens te bepalen, houden we rekening met de hoeveelheid, aard
              en gevoeligheid van de persoonsgegevens, het potentiële risico van schade door ongeautoriseerd gebruik of
              openbaarmaking van uw persoonsgegevens, de doeleinden waarvoor we uw persoonsgegevens verwerken en of we
              die doeleinden op andere manieren kunnen bereiken, en de toepasselijke wettelijke vereisten.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">9. Uw wettelijke rechten</h2>
            <p>
              Onder bepaalde omstandigheden heeft u rechten onder de gegevensbeschermingswetten met betrekking tot uw
              persoonsgegevens:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Het recht om toegang te vragen tot uw persoonsgegevens.</li>
              <li>Het recht om correctie van uw persoonsgegevens te vragen.</li>
              <li>Het recht om verwijdering van uw persoonsgegevens te vragen.</li>
              <li>Het recht om bezwaar te maken tegen de verwerking van uw persoonsgegevens.</li>
              <li>Het recht om beperking van de verwerking van uw persoonsgegevens te vragen.</li>
              <li>Het recht om overdracht van uw persoonsgegevens te vragen.</li>
              <li>Het recht om toestemming in te trekken.</li>
            </ul>
            <p>
              Als u een van de bovenstaande rechten wilt uitoefenen, neem dan contact met ons op via
              info@vanvelzenautorecycling.nl.
            </p>
            <p>
              U hoeft geen vergoeding te betalen om toegang te krijgen tot uw persoonsgegevens (of om een van de andere
              rechten uit te oefenen). We kunnen echter een redelijke vergoeding in rekening brengen als uw verzoek
              duidelijk ongegrond, repetitief of buitensporig is. Als alternatief kunnen we in deze omstandigheden
              weigeren aan uw verzoek te voldoen.
            </p>
            <p>
              We kunnen u specifieke informatie vragen om ons te helpen uw identiteit te bevestigen en uw recht op
              toegang tot uw persoonsgegevens te waarborgen (of om uw andere rechten uit te oefenen). Dit is een
              beveiligingsmaatregel om ervoor te zorgen dat persoonsgegevens niet worden bekendgemaakt aan een persoon
              die geen recht heeft om ze te ontvangen.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">10. Wijzigingen in het privacybeleid</h2>
            <p>
              We kunnen ons privacybeleid van tijd tot tijd bijwerken. Eventuele wijzigingen die we in de toekomst in
              ons privacybeleid aanbrengen, zullen op deze pagina worden geplaatst en, indien van toepassing, aan u
              worden meegedeeld per e-mail.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">11. Contact</h2>
            <p>Als u vragen heeft over dit privacybeleid of onze privacypraktijken, neem dan contact met ons op:</p>
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
        </div>
      </div>
    </main>
  )
}
