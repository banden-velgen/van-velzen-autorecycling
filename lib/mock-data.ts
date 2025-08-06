// Mock data for quote requests
export interface QuoteRequest {
  id: string
  license_plate: string
  name: string
  email: string
  phone: string
  message: string
  status: "new" | "processed"
  created_at: string
}

// Initial mock data
let mockQuoteRequests: QuoteRequest[] = [
  {
    id: "1",
    license_plate: "AB12CD",
    name: "Jan de Vries",
    email: "jan@example.com",
    phone: "0612345678",
    message: "Mijn auto heeft motorschade",
    status: "new",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    license_plate: "XY34ZZ",
    name: "Petra Jansen",
    email: "petra@example.com",
    phone: "0687654321",
    message: "Auto is total loss na ongeval",
    status: "new",
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: "3",
    license_plate: "GH56JK",
    name: "Klaas Bakker",
    email: "klaas@example.com",
    phone: "0612378945",
    message: "Oude auto met kapotte motor",
    status: "processed",
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
]

// Mock data service functions
export const mockDataService = {
  // Get all quote requests
  getQuoteRequests: () => {
    return Promise.resolve(
      [...mockQuoteRequests].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    )
  },

  // Submit a new quote request
  submitQuoteRequest: (data: {
    licensePlate: string
    name: string
    email: string
    phone: string
    message?: string
  }) => {
    const newRequest: QuoteRequest = {
      id: Math.random().toString(36).substring(2, 11),
      license_plate: data.licensePlate.replace(/-/g, "").toUpperCase(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message || "",
      status: "new",
      created_at: new Date().toISOString(),
    }

    mockQuoteRequests.unshift(newRequest)
    return Promise.resolve({ success: true })
  },

  // Mark a quote request as processed
  markQuoteRequestAsProcessed: (id: string) => {
    mockQuoteRequests = mockQuoteRequests.map((request) =>
      request.id === id ? { ...request, status: "processed" as const } : request,
    )
    return Promise.resolve({ success: true })
  },

  // Subscribe to changes (mock implementation)
  subscribeToChanges: (callback: () => void) => {
    // In a real app, this would set up a subscription
    // Here we just return an unsubscribe function
    return {
      unsubscribe: () => {},
    }
  },
}

// For browser storage persistence
export function persistMockData() {
  if (typeof window !== "undefined") {
    localStorage.setItem("mockQuoteRequests", JSON.stringify(mockQuoteRequests))
  }
}

export function loadPersistedMockData() {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("mockQuoteRequests")
    if (data) {
      try {
        mockQuoteRequests = JSON.parse(data)
      } catch (e) {
        console.error("Failed to parse persisted mock data", e)
      }
    }
  }
}
