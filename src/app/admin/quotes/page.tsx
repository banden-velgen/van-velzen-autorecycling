"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Quote {
  id: string
  amount: number
  status: string
  valid_until: string
  created_at: string
  updated_at: string
  vehicle_id: string
  customer_id: string
  quote_request_id: string | null
  notes: string | null
  vehicle?: {
    license_plate: string
    make: string | null
    model: string | null
    year: number | null
  }
  customer?: {
    name: string
    email: string
    phone: string
  }
}

export default function QuotesPage() {
  const router = useRouter()
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const fetchQuotes = async () => {
    try {
      setLoading(true)

      const supabase = createClient()
      const { data, error } = await supabase
        .from("quotes")
        .select(`
          *,
          vehicle:vehicle_id(license_plate, make, model, year),
          customer:customer_id(name, email, phone)
        `)
        .order("created_at", { ascending: false })

      if (error) throw error

      setQuotes(data || [])
      setFilteredQuotes(data || [])
      setError(null)
    } catch (err) {
      setError("Failed to load quotes")
      console.error("Error fetching quotes:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredQuotes(quotes)
    } else {
      const term = searchTerm.toLowerCase().trim()
      const filtered = quotes.filter(
        (quote) =>
          (quote.vehicle?.license_plate && quote.vehicle.license_plate.toLowerCase().includes(term)) ||
          (quote.customer?.name && quote.customer.name.toLowerCase().includes(term)) ||
          (quote.customer?.email && quote.customer.email.toLowerCase().includes(term)) ||
          (quote.amount && quote.amount.toString().includes(term)),
      )
      setFilteredQuotes(filtered)
    }
  }, [searchTerm, quotes])

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

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("nl-NL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Onbekende datum"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(amount)
  }

  if (loading && quotes.length === 0) {
    return <div className="container mx-auto py-10 text-center">Laden...</div>
  }

  if (error && quotes.length === 0) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={fetchQuotes}>Probeer opnieuw</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Offertes</h1>
        <Button onClick={fetchQuotes} disabled={loading}>
          {loading ? "Laden..." : "Vernieuwen"}
        </Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Zoeken op kenteken, klantnaam of bedrag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Alle offertes</TabsTrigger>
          <TabsTrigger value="pending">In afwachting</TabsTrigger>
          <TabsTrigger value="accepted">Geaccepteerd</TabsTrigger>
          <TabsTrigger value="rejected">Afgewezen</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuotes.map((quote) => (
              <QuoteCard
                key={quote.id}
                quote={quote}
                statusColor={getStatusColor(quote.status)}
                statusLabel={getStatusLabel(quote.status)}
                formatDate={formatDate}
                formatCurrency={formatCurrency}
                onViewDetails={() => router.push(`/admin/quotes/${quote.id}`)}
              />
            ))}

            {filteredQuotes.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">Geen offertes gevonden.</p>
              </div>
            )}
          </div>
        </TabsContent>

        {["pending", "accepted", "rejected"].map((status) => (
          <TabsContent key={status} value={status}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuotes
                .filter((quote) => quote.status === status)
                .map((quote) => (
                  <QuoteCard
                    key={quote.id}
                    quote={quote}
                    statusColor={getStatusColor(quote.status)}
                    statusLabel={getStatusLabel(quote.status)}
                    formatDate={formatDate}
                    formatCurrency={formatCurrency}
                    onViewDetails={() => router.push(`/admin/quotes/${quote.id}`)}
                  />
                ))}

              {filteredQuotes.filter((quote) => quote.status === status).length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">Geen offertes gevonden met status "{getStatusLabel(status)}".</p>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function QuoteCard({
  quote,
  statusColor,
  statusLabel,
  formatDate,
  formatCurrency,
  onViewDetails,
}: {
  quote: Quote
  statusColor: string
  statusLabel: string
  formatDate: (date: string) => string
  formatCurrency: (amount: number) => string
  onViewDetails: () => void
}) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{formatCurrency(quote.amount)}</CardTitle>
            <div className="text-sm text-gray-500">
              {quote.vehicle?.license_plate && <span>Kenteken: {quote.vehicle.license_plate}</span>}
            </div>
          </div>
          <Badge className={statusColor}>{statusLabel}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm mb-4">
          {quote.customer && (
            <p>
              <span className="font-medium">Klant:</span> {quote.customer.name}
            </p>
          )}
          {quote.vehicle && quote.vehicle.make && (
            <p>
              <span className="font-medium">Auto:</span> {quote.vehicle.make} {quote.vehicle.model}{" "}
              {quote.vehicle.year && `(${quote.vehicle.year})`}
            </p>
          )}
          <p>
            <span className="font-medium">Geldig tot:</span> {formatDate(quote.valid_until)}
          </p>
          <p>
            <span className="font-medium">Aangemaakt op:</span> {formatDate(quote.created_at)}
          </p>
        </div>

        <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={onViewDetails}>
          Details bekijken
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
