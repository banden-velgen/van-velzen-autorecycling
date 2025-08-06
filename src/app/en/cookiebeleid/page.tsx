import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Cookie Policy | Van Velzen Autorecycling",
  description:
    "Read our cookie policy to understand how we use cookies on our website and how you can manage your cookie preferences.",
  alternates: {
    canonical: "/en/cookiebeleid",
  },
  openGraph: {
    title: "Cookie Policy | Van Velzen Autorecycling",
    description: "Information about how we use cookies on our website.",
    url: "/en/cookiebeleid",
  },
}

export default function CookiePolicyPage() {
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
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Cookie Policy</h1>
        <p className="text-sm text-gray-500 mb-8 text-center">Last updated: {lastUpdated}</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">1. What are cookies?</h2>
            <p>
              Cookies are small text files that are stored on your computer, tablet or mobile phone when you visit a
              website. These cookies help us to make our website work better and to provide you with a better user
              experience.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">2. How we use cookies</h2>
            <p>
              Van Velzen Autorecycling uses cookies to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Remember your preferences and settings</li>
              <li>Analyze how our website is used</li>
              <li>Improve the functionality of our website</li>
              <li>Provide you with relevant content and advertisements</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">3. Types of cookies we use</h2>
            
            <h3 className="text-xl font-semibold mb-3">Essential cookies</h3>
            <p>
              These cookies are necessary for the website to function properly. They enable basic functions such as
              page navigation, access to secure areas of the website, and form submissions. The website cannot function
              properly without these cookies.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Analytics cookies</h3>
            <p>
              These cookies help us understand how visitors interact with our website by collecting and reporting
              information anonymously. This helps us improve our website and services.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Functional cookies</h3>
            <p>
              These cookies enable enhanced functionality and personalization, such as remembering your language
              preferences and form data.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">4. Third-party cookies</h2>
            <p>
              Our website may use third-party services that place their own cookies. These services include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Google Analytics - for website analytics</li>
              <li>Google Maps - for location services</li>
              <li>Social media platforms - for sharing functionality</li>
            </ul>
            <p>
              These third-party services have their own privacy policies and cookie policies. We recommend that you
              read these policies to understand how these services use cookies.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">5. Managing cookies</h2>
            <p>
              You can control and manage cookies in several ways:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Browser settings:</strong> Most browsers allow you to refuse cookies or to delete cookies that
                have already been set. You can usually find these settings in the "Options" or "Preferences" menu of
                your browser.
              </li>
              <li>
                <strong>Cookie consent:</strong> When you first visit our website, you will be asked to consent to the
                use of cookies. You can change your preferences at any time.
              </li>
              <li>
                <strong>Third-party opt-out:</strong> You can opt out of certain third-party cookies by visiting the
                relevant third-party websites and following their opt-out procedures.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">6. Consequences of disabling cookies</h2>
            <p>
              If you choose to disable cookies, some features of our website may not function properly. This may
              affect your user experience and the functionality of certain services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">7. Updates to this policy</h2>
            <p>
              We may update this cookie policy from time to time to reflect changes in our practices or for other
              operational, legal, or regulatory reasons. We will notify you of any material changes by posting the
              new policy on our website.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
            <p>If you have any questions about our use of cookies, please contact us:</p>
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