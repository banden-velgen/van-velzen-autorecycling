import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Privacy Policy | Van Velzen Autorecycling",
  description:
    "Read our privacy policy to understand how we collect, use, and protect your personal information when you use our services.",
  alternates: {
    canonical: "/en/privacybeleid",
  },
  openGraph: {
    title: "Privacy Policy | Van Velzen Autorecycling",
    description: "Information about how we handle your personal data.",
    url: "/en/privacybeleid",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
  return (
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <main className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8 text-center">Last updated: {lastUpdated}</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Van Velzen Autorecycling respects your privacy and is committed to protecting your personal data. This
              privacy policy explains how we collect, use, and protect your information when you use our services or
              visit our website.
            </p>
            <p>
              By using our services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">2. Information we collect</h2>
            
            <h3 className="text-xl font-semibold mb-3">Personal information</h3>
            <p>We may collect the following personal information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name and contact details (email address, phone number)</li>
              <li>Address and location information</li>
              <li>Vehicle information (license plate, make, model, year)</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Automatically collected information</h3>
            <p>When you visit our website, we may automatically collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address and browser information</li>
              <li>Pages visited and time spent on our website</li>
              <li>Device information and operating system</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">3. How we use your information</h2>
            <p>We use your personal information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide our car recycling services</li>
              <li>To process your requests and provide quotes</li>
              <li>To arrange pickup and transportation of your vehicle</li>
              <li>To handle RDW deregistration</li>
              <li>To process payments</li>
              <li>To communicate with you about our services</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">4. Legal basis for processing</h2>
            <p>We process your personal data based on the following legal grounds:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contract:</strong> To fulfill our obligations under the agreement with you</li>
              <li><strong>Legitimate interest:</strong> To improve our services and website</li>
              <li><strong>Legal obligation:</strong> To comply with applicable laws and regulations</li>
              <li><strong>Consent:</strong> When you have given us explicit permission</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">5. Sharing your information</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your
              consent, except in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>With service providers who assist us in operating our business</li>
              <li>With government authorities when required by law</li>
              <li>With the RDW for vehicle deregistration</li>
              <li>In connection with a business transfer or merger</li>
            </ul>
            <p>
              We ensure that any third parties with whom we share your information are bound by appropriate
              confidentiality and data protection obligations.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">6. Data security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption of sensitive data</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
              <li>Employee training on data protection</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">7. Data retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes for which it
              was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.
            </p>
            <p>
              The specific retention periods depend on the type of information and the purpose for which it was
              collected. We will delete or anonymize your personal information when it is no longer needed.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">8. Your rights</h2>
            <p>You have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
              <li><strong>Erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Restriction:</strong> Request limitation of processing</li>
              <li><strong>Portability:</strong> Request transfer of your data</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Withdrawal:</strong> Withdraw consent where processing is based on consent</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided below.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">9. Cookies and tracking</h2>
            <p>
              Our website uses cookies and similar technologies to enhance your browsing experience. For more
              information about how we use cookies, please see our{" "}
              <a href="/en/cookiebeleid" className="text-primary hover:underline">
                Cookie Policy
              </a>
              .
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">10. International transfers</h2>
            <p>
              Your personal information is primarily processed within the European Economic Area (EEA). If we need to
              transfer your data outside the EEA, we ensure that appropriate safeguards are in place to protect your
              information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">11. Children's privacy</h2>
            <p>
              Our services are not intended for children under the age of 16. We do not knowingly collect personal
              information from children under 16. If you believe we have collected information from a child under 16,
              please contact us immediately.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">12. Changes to this policy</h2>
            <p>
              We may update this privacy policy from time to time to reflect changes in our practices or for other
              operational, legal, or regulatory reasons. We will notify you of any material changes by posting the
              new policy on our website and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">13. Contact us</h2>
            <p>If you have any questions about this privacy policy or our data practices, please contact us:</p>
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
    </main>
  )
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </ThemeProvider>
  )
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </ThemeProvider>
  )
}