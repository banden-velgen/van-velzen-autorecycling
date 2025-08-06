"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, FileText, Car, User, Calendar, Clock, CreditCard } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function QuoteDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const quoteId = params.id as string

  const [quote, setQuote] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  const fetchQuoteData = async () => {
    try {
      setLoading(true)
      const supabase = createClient()

      const { data, error } = await supabase
        .from("quotes")
        .select(`
          *,
          vehicle:vehicle_id(*),
          customer:customer_id(*),
          quote_request:quote_request_id(*)
        `)
        .eq("id", quoteId)
        .single()

      if (error) throw error

      setQuote(data)
      setError(null)
    } catch (err) {
      setError("Failed to load quote data")
      console.error("Error fetching quote data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (quoteId) {
      fetchQuoteData()
    }
  }, [quoteId])

  const handleStatusChange = async (newStatus: string) => {
    try {
      setUpdatingStatus(true)
      const supabase = createClient()

      const { error } = await supabase
        .from("quotes")
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", quoteId)

      if (error) throw error

      // Log activity
      await supabase.from("activity_logs").insert({
        user_id: "system", // Replace with actual user ID if available
        action: "update",
        entity_type: "quote",
        entity_id: quoteId,
        details: { status: newStatus },
        created_at: new Date().toISOString(),
      })

      fetchQuoteData()
    } catch (err) {
      console.error("Error updating quote status:", err)
      alert("Er is een fout opgetreden bij het bijwerken van de status.")
    } finally {
      setUpdatingStatus(false)
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    try {
      return new Date(dateString).toLocaleDateString("nl-NL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Onbekende datum"
    }
  }

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return "N/A"
    return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(amount)
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "In afwachting"
      case "accepted":
        return "Geaccepteerd"
      case "rejected":
        return "Afgewezen"
      case "expired":
        return "Verlopen"
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "expired":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return <div className="container mx-auto py-10 text-center">Laden...</div>
  }

  if (error || !quote) {
    return (
      <div className="container mx-auto py-10">
        <Alert variant="destructive">
          <AlertTitle>Fout</AlertTitle>
          <AlertDescription>{error || "Offerte niet gevonden"}</AlertDescription>
        </Alert>
        <Button onClick={() => router.push("/admin/quotes")} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Terug naar offertes
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/admin/quotes")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Offerte details</h1>
          <Badge className={getStatusColor(quote.status)}>{getStatusLabel(quote.status)}</Badge>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Status:</span>
            <Select value={quote.status} onValueChange={handleStatusChange} disabled={updatingStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status wijzigen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">In afwachting</SelectItem>
                <SelectItem value="accepted">Geaccepteerd</SelectItem>
                <SelectItem value="rejected">Afgewezen</SelectItem>
                <SelectItem value="expired">Verlopen</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={fetchQuoteData} disabled={loading}>
            {loading ? "Laden..." : "Vernieuwen"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Offerte informatie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Bedrag:</span>
                <span className="font-bold">{formatCurrency(quote.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <Badge className={getStatusColor(quote.status)}>{getStatusLabel(quote.status)}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Geldig tot:</span>
                <span>{formatDate(quote.valid_until)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Aangemaakt op:</span>
                <span>{formatDate(quote.created_at)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Laatst bijgewerkt:</span>
                <span>{formatDate(quote.updated_at)}</span>
              </div>
              {quote.notes && (
                <div>
                  <span className="font-medium">Notities:</span>
                  <p className="mt-1 text-gray-600">{quote.notes}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Voertuig informatie
            </CardTitle>
          </CardHeader>
          <CardContent>
            {quote.vehicle ? (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Kenteken:</span>
                  <span>{quote.vehicle.license_plate}</span>
                </div>
                {quote.vehicle.make && (
                  <div className="flex justify-between">
                    <span className="font-medium">Merk:</span>
                    <span>{quote.vehicle.make}</span>
                  </div>
                )}
                {quote.vehicle.model && (
                  <div className="flex justify-between">
                    <span className="font-medium">Model:</span>
                    <span>{quote.vehicle.model}</span>
                  </div>
                )}
                {quote.vehicle.year && (
                  <div className="flex justify-between">
                    <span className="font-medium">Bouwjaar:</span>
                    <span>{quote.vehicle.year}</span>
                  </div>
                )}
                {quote.vehicle.color && (
                  <div className="flex justify-between">
                    <span className="font-medium">Kleur:</span>
                    <span>{quote.vehicle.color}</span>
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => router.push(`/admin/vehicles/${quote.vehicle_id}`)}
                >
                  Voertuig details bekijken
                </Button>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">Geen voertuig informatie beschikbaar</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Klant informatie
            </CardTitle>
          </CardHeader>
          <CardContent>
            {quote.customer ? (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Naam:</span>
                  <span>{quote.customer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span className="truncate max-w-[200px]">{quote.customer.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Telefoon:</span>
                  <span>{quote.customer.phone}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => router.push(`/admin/customers/${quote.customer_id}`)}
                >
                  Klant details bekijken
                </Button>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">Geen klant informatie beschikbaar</div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Acties
            </CardTitle>
            <CardDescription>Beschikbare acties voor deze offerte</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button
              onClick={() => router.push(`/admin/pickups/create?quoteId=${quote.id}`)}
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Ophaling plannen
            </Button>

            <Button
              variant="outline"
              onClick={async () => {
                if (!quote.customer?.email) {
                  alert("Geen e-mailadres gevonden voor deze klant")
                  return
                }

                try {
                  // Show loading state
                  const btn = document.activeElement as HTMLButtonElement
                  const originalText = btn.innerText
                  btn.disabled = true
                  btn.innerText = "E-mail versturen..."

                  // Import the server action dynamically to avoid issues
                  const { sendQuoteEmail } = await import("@/app/actions/email-actions")

                  // Prepare vehicle details if available
                  let vehicleDetails = ""
                  if (quote.vehicle?.make || quote.vehicle?.model) {
                    vehicleDetails =
                      `${quote.vehicle.make || ""} ${quote.vehicle.model || ""} ${quote.vehicle.year ? `(${quote.vehicle.year})` : ""}`.trim()
                  }

                  // Send the email
                  const result = await sendQuoteEmail({
                    to: quote.customer.email,
                    customerName: quote.customer.name,
                    licensePlate: quote.vehicle?.license_plate || "Onbekend",
                    amount: quote.amount || 0,
                    validUntil: quote.valid_until,
                    vehicleDetails,
                  })

                  // Reset button state
                  btn.disabled = false
                  btn.innerText = originalText

                  // Show result
                  if (result.success) {
                    alert("E-mail succesvol verzonden naar " + quote.customer.email)
                  } else {
                    alert("Fout bij het verzenden van de e-mail: " + result.error)
                  }
                } catch (error) {
                  console.error("Error sending email:", error)
                  alert("Er is een fout opgetreden bij het verzenden van de e-mail")
                }
              }}
              className="flex items-center gap-2"
            >
              <Clock className="h-4 w-4" />
              Email naar klant
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
