import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Terms and Conditions | Van Velzen Autorecycling",
  description:
    "Read the terms and conditions of Van Velzen Autorecycling. Information about our services, payments, liability and more.",
  alternates: {
    canonical: "/en/algemene-voorwaarden",
  },
  openGraph: {
    title: "Terms and Conditions | Van Velzen Autorecycling",
    description: "Information about our services, payments, liability and more.",
    url: "/en/algemene-voorwaarden",
  },
}

export default function TermsAndConditionsPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
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
              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Terms and Conditions</h1>
              <p className="text-sm text-gray-500 mb-8 text-center">Last updated: {lastUpdated}</p>

              <div className="prose prose-lg max-w-none">
                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">1. General</h2>
                  <p>
                    These terms and conditions apply to all offers, agreements and services of Van Velzen Autorecycling,
                    located in Delft at Lau Mazirelweg 8, 2629 HW, registered with the Chamber of Commerce under number
                    [Chamber of Commerce number], hereinafter referred to as: "Van Velzen Autorecycling".
                  </p>
                  <p>
                    By using our services, you agree to these terms and conditions. Deviations from these conditions are only
                    valid if they have been agreed in writing.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
                  <p>In these terms and conditions, the following is understood by:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Van Velzen Autorecycling:</strong> the provider of car recycling and related services.
                    </li>
                    <li>
                      <strong>Customer:</strong> the natural or legal person who enters into an agreement with Van Velzen
                      Autorecycling.
                    </li>
                    <li>
                      <strong>Vehicle:</strong> the motor vehicle that is the subject of the agreement between customer and Van
                      Velzen Autorecycling.
                    </li>
                    <li>
                      <strong>Services:</strong> all services offered by Van Velzen Autorecycling, including but not limited to
                      purchasing, collecting, dismantling and recycling vehicles.
                    </li>
                    <li>
                      <strong>Agreement:</strong> any arrangement between Van Velzen Autorecycling and customer for the
                      provision of services.
                    </li>
                  </ul>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">3. Applicability</h2>
                  <p>
                    These terms and conditions apply to all offers, quotes and agreements between Van Velzen Autorecycling and
                    the customer, unless explicitly agreed otherwise in writing.
                  </p>
                  <p>
                    Any general terms and conditions of the customer are explicitly rejected, unless these have been accepted
                    in writing by Van Velzen Autorecycling.
                  </p>
                  <p>
                    Van Velzen Autorecycling reserves the right to modify or supplement these terms and conditions. Changes
                    also apply to already concluded agreements, subject to a period of 30 days after notification of the
                    change.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">4. Offers and quotes</h2>
                  <p>
                    All offers and quotes from Van Velzen Autorecycling are non-binding, unless explicitly stated otherwise.
                  </p>
                  <p>
                    A quote is valid for 14 days after the date of issue, unless otherwise indicated. Van Velzen
                    Autorecycling is only bound to the quote if acceptance thereof by the customer is confirmed in writing
                    within the validity period.
                  </p>
                  <p>
                    The prices stated in a quote include VAT and other government levies, unless otherwise indicated.
                  </p>
                  <p>Offers or quotes do not automatically apply to future assignments.</p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">5. Execution of the agreement</h2>
                  <p>
                    Van Velzen Autorecycling will execute the agreement to the best of its insight and ability and in
                    accordance with the requirements of good workmanship.
                  </p>
                  <p>
                    The customer ensures that all data, which Van Velzen Autorecycling indicates are necessary or which the
                    customer should reasonably understand to be necessary for the execution of the agreement, are provided to
                    Van Velzen Autorecycling in a timely manner.
                  </p>
                  <p>
                    The customer guarantees that the vehicle is his property and that no third-party rights rest on it. The
                    customer indemnifies Van Velzen Autorecycling against any claims from third parties.
                  </p>
                  <p>Van Velzen Autorecycling has the right to have certain work carried out by third parties.</p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">6. Collection service</h2>
                  <p>
                    If agreed, Van Velzen Autorecycling will collect the vehicle at the address specified by the customer.
                  </p>
                  <p>
                    The customer must ensure that the vehicle is accessible and that all required documents (registration
                    certificate, owner identification) are present.
                  </p>
                  <p>
                    When collecting the vehicle, a collection form is drawn up in which the condition of the vehicle is
                    recorded. This form must be signed by both parties.
                  </p>
                  <p>
                    Van Velzen Autorecycling is not liable for any damage to the site or environment during the collection
                    of the vehicle, unless there is intent or gross negligence.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">7. Prices and payment</h2>
                  <p>
                    The price that Van Velzen Autorecycling pays for a vehicle is determined on the basis of the condition,
                    model, year of manufacture and market value of the vehicle.
                  </p>
                  <p>
                    Payment to the customer takes place after receipt and inspection of the vehicle, unless otherwise agreed.
                  </p>
                  <p>
                    Payment can be made by bank transfer or cash, in compliance with the legal provisions in this regard.
                  </p>
                  <p>
                    If after inspection it appears that the condition of the vehicle deviates significantly from what has been
                    stated by the customer, Van Velzen Autorecycling reserves the right to adjust the offered price or to
                    dissolve the agreement.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">8. RDW deregistration</h2>
                  <p>
                    Van Velzen Autorecycling takes care of the deregistration of the vehicle with the RDW, whereby the
                    customer is relieved of the road tax obligation.
                  </p>
                  <p>
                    For deregistration, the customer must hand over the original registration certificate (or registration
                    cards) and a valid identification document.
                  </p>
                  <p>The customer receives a deregistration certificate as proof that the vehicle has been deregistered with the RDW.</p>
                  <p>
                    Van Velzen Autorecycling is not liable for any costs or fines that arise from the customer not providing
                    the required documents in a timely or incorrect manner.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">9. Liability</h2>
                  <p>
                    Van Velzen Autorecycling is only liable for direct damage that has arisen due to conscious recklessness
                    or intent on the part of Van Velzen Autorecycling.
                  </p>
                  <p>
                    Direct damage is understood to mean only the reasonable costs for determining the cause and extent of the
                    damage, any reasonable costs incurred to make the defective performance of Van Velzen Autorecycling
                    comply with the agreement and reasonable costs incurred to prevent or limit damage.
                  </p>
                  <p>
                    Van Velzen Autorecycling is never liable for indirect damage, including consequential damage, lost
                    profits, missed savings and damage due to business stagnation.
                  </p>
                  <p>
                    Van Velzen Autorecycling's liability is in all cases limited to the amount that is paid out by Van Velzen
                    Autorecycling's insurer in the relevant case.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">10. Force majeure</h2>
                  <p>
                    Van Velzen Autorecycling is not obliged to comply with any obligation towards the customer if it is
                    prevented from doing so as a result of a circumstance that is not due to fault, and neither by virtue of
                    the law, a legal act or the views prevailing in traffic.
                  </p>
                  <p>
                    Force majeure is understood in these general terms and conditions to mean, in addition to what is
                    understood in this regard in the law and jurisprudence, all external causes, foreseen or unforeseen, over
                    which Van Velzen Autorecycling cannot exert any influence, but as a result of which Van Velzen
                    Autorecycling is unable to fulfill its obligations.
                  </p>
                  <p>
                    Van Velzen Autorecycling can suspend the obligations from the agreement during the period that the force
                    majeure continues. If this period lasts longer than two months, each of the parties is entitled to
                    dissolve the agreement, without any obligation to compensate damage to the other party.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">11. Intellectual property</h2>
                  <p>
                    Van Velzen Autorecycling reserves the rights and powers that accrue to it under the Copyright Act and
                    other intellectual laws and regulations.
                  </p>
                  <p>
                    All documents provided by Van Velzen Autorecycling, such as reports, advice, agreements, designs,
                    sketches, drawings, software, etc., are exclusively intended to be used by the customer and may not be
                    reproduced, made public, or brought to the attention of third parties by him without prior permission
                    from Van Velzen Autorecycling.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">12. Privacy and data protection</h2>
                  <p>
                    Van Velzen Autorecycling processes personal data in accordance with the applicable privacy legislation,
                    as described in our privacy statement.
                  </p>
                  <p>
                    The customer gives permission for the processing of personal data that is necessary for the execution of
                    the agreement and compliance with legal obligations.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">13. Applicable law and disputes</h2>
                  <p>
                    Dutch law exclusively applies to all legal relationships in which Van Velzen Autorecycling is a party.
                  </p>
                  <p>
                    The court in the place of establishment of Van Velzen Autorecycling has exclusive jurisdiction to hear
                    disputes, unless the law mandatorily provides otherwise.
                  </p>
                  <p>
                    Parties will only appeal to the court after they have made every effort to resolve a dispute through
                    mutual consultation.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">14. Final provisions</h2>
                  <p>
                    If one or more provisions in these general terms and conditions are wholly or partially null and void or
                    should be annulled at any time, the remaining provisions in these general terms and conditions remain
                    fully applicable.
                  </p>
                  <p>
                    Van Velzen Autorecycling has the right to change these general terms and conditions. The version that
                    applied at the time of the establishment of the legal relationship with Van Velzen Autorecycling always
                    applies.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4">15. Contact</h2>
                  <p>For questions about these terms and conditions or our services, you can contact:</p>
                  <p className="mt-4">
                    <strong>Van Velzen Autorecycling</strong>
                    <br />
                    Lau Mazirelweg 8<br />
                    2629 HW Delft
                    <br />
                    Phone: 06-86301771
                    <br />
                    Email: info@vanvelzenautorecycling.nl
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