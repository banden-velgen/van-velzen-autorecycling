"use server"

import { createClient } from "@/lib/supabase/server"

export async function getVehiclesWithDocuments() {
  try {
    const supabase = createClient()

    // Get all vehicles
    const { data: vehicles, error: vehiclesError } = await supabase
      .from("vehicles")
      .select("id, license_plate, make, model, year")
      .order("license_plate", { ascending: true })

    if (vehiclesError) {
      console.error("Error fetching vehicles:", vehiclesError)
      return { error: `Fout bij het ophalen van voertuigen: ${vehiclesError.message}` }
    }

    // Get all documents
    const { data: documents, error: documentsError } = await supabase
      .from("vehicle_documents")
      .select("*")
      .order("uploaded_at", { ascending: false })

    if (documentsError) {
      console.error("Error fetching documents:", documentsError)
      return { error: `Fout bij het ophalen van documenten: ${documentsError.message}` }
    }

    // Group documents by vehicle
    const vehiclesWithDocuments = vehicles.map((vehicle) => {
      const vehicleDocuments = documents.filter((doc) => doc.vehicle_id === vehicle.id)
      return {
        ...vehicle,
        documents: vehicleDocuments,
      }
    })

    return { data: vehiclesWithDocuments }
  } catch (error) {
    console.error("Error in getVehiclesWithDocuments:", error)
    return { error: "Er is een onverwachte fout opgetreden bij het ophalen van de gegevens" }
  }
}

export async function getAllVehicles() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("vehicles")
      .select("id, license_plate, make, model, year")
      .order("license_plate", { ascending: true })

    if (error) {
      console.error("Error fetching vehicles:", error)
      return { error: `Fout bij het ophalen van voertuigen: ${error.message}` }
    }

    return { data }
  } catch (error) {
    console.error("Error in getAllVehicles:", error)
    return { error: "Er is een onverwachte fout opgetreden bij het ophalen van de voertuigen" }
  }
}

export async function getDocumentStatistics() {
  try {
    const supabase = createClient()

    // Get all documents
    const { data: documents, error: documentsError } = await supabase
      .from("vehicle_documents")
      .select("*")
      .order("uploaded_at", { ascending: false })

    if (documentsError) {
      console.error("Error fetching documents:", documentsError)
      return { error: `Fout bij het ophalen van documenten: ${documentsError.message}` }
    }

    // Get all vehicles
    const { data: vehicles, error: vehiclesError } = await supabase
      .from("vehicles")
      .select("id, license_plate, make, model, year")

    if (vehiclesError) {
      console.error("Error fetching vehicles:", vehiclesError)
      return { error: `Fout bij het ophalen van voertuigen: ${vehiclesError.message}` }
    }

    // Calculate overview statistics
    const totalDocuments = documents.length
    const totalSize = documents.reduce((sum, doc) => sum + (doc.file_size || 0), 0)

    // Calculate documents uploaded in the last month
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
    const documentsLastMonth = documents.filter((doc) => new Date(doc.uploaded_at) >= oneMonthAgo).length

    // Calculate vehicles with documents
    const vehiclesWithDocs = new Set(documents.map((doc) => doc.vehicle_id)).size
    const averageDocumentsPerVehicle = vehiclesWithDocs > 0 ? totalDocuments / vehiclesWithDocs : 0

    // Calculate document type distribution
    const typeCount: Record<string, { count: number; totalSize: number }> = {}
    documents.forEach((doc) => {
      if (!typeCount[doc.document_type]) {
        typeCount[doc.document_type] = { count: 0, totalSize: 0 }
      }
      typeCount[doc.document_type].count += 1
      typeCount[doc.document_type].totalSize += doc.file_size || 0
    })

    const typeDistribution = Object.entries(typeCount).map(([type, data]) => ({
      type,
      count: data.count,
      percentage: (data.count / totalDocuments) * 100,
      totalSize: data.totalSize,
    }))

    // Calculate upload trends (last 30 days)
    const uploadTrends: Record<string, { count: number; totalSize: number }> = {}

    // Initialize the last 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateString = date.toISOString().split("T")[0]
      uploadTrends[dateString] = { count: 0, totalSize: 0 }
    }

    // Fill in the data
    documents.forEach((doc) => {
      const dateString = new Date(doc.uploaded_at).toISOString().split("T")[0]
      if (uploadTrends[dateString]) {
        uploadTrends[dateString].count += 1
        uploadTrends[dateString].totalSize += doc.file_size || 0
      }
    })

    const uploadTrendsArray = Object.entries(uploadTrends)
      .map(([date, data]) => ({
        date,
        count: data.count,
        totalSize: data.totalSize,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))

    // Calculate vehicle document distribution
    const vehicleDocuments: Record<string, { count: number; totalSize: number }> = {}
    documents.forEach((doc) => {
      if (!vehicleDocuments[doc.vehicle_id]) {
        vehicleDocuments[doc.vehicle_id] = { count: 0, totalSize: 0 }
      }
      vehicleDocuments[doc.vehicle_id].count += 1
      vehicleDocuments[doc.vehicle_id].totalSize += doc.file_size || 0
    })

    const vehicleDistribution = Object.entries(vehicleDocuments).map(([vehicleId, data]) => {
      const vehicle = vehicles.find((v) => v.id === vehicleId)
      return {
        vehicleId,
        licensePlate: vehicle ? vehicle.license_plate : "Onbekend",
        vehicleName: vehicle ? `${vehicle.make} ${vehicle.model} ${vehicle.year || ""}` : "Onbekend",
        documentCount: data.count,
        totalSize: data.totalSize,
      }
    })

    // Calculate document size distribution
    const sizeRanges = [
      { min: 0, max: 100 * 1024, label: "0 - 100 KB" },
      { min: 100 * 1024, max: 500 * 1024, label: "100 KB - 500 KB" },
      { min: 500 * 1024, max: 1 * 1024 * 1024, label: "500 KB - 1 MB" },
      { min: 1 * 1024 * 1024, max: 5 * 1024 * 1024, label: "1 MB - 5 MB" },
      { min: 5 * 1024 * 1024, max: 10 * 1024 * 1024, label: "5 MB - 10 MB" },
      { min: 10 * 1024 * 1024, max: Number.POSITIVE_INFINITY, label: "> 10 MB" },
    ]

    const sizeDistribution = sizeRanges.map((range) => {
      const count = documents.filter(
        (doc) => (doc.file_size || 0) >= range.min && (doc.file_size || 0) < range.max,
      ).length

      return {
        sizeRange: range.label,
        count,
        percentage: (count / totalDocuments) * 100,
      }
    })

    // Generate mock recent activity (since we don't have a real activity log)
    const recentActivity = documents.slice(0, 10).map((doc) => {
      const vehicle = vehicles.find((v) => v.id === doc.vehicle_id)
      return {
        id: doc.id,
        documentId: doc.id,
        documentName: doc.file_name,
        documentType: doc.document_type,
        vehicleId: doc.vehicle_id,
        licensePlate: vehicle ? vehicle.license_plate : "Onbekend",
        action: "upload",
        timestamp: doc.uploaded_at,
        user: "Admin Gebruiker", // Mock user
      }
    })

    return {
      data: {
        overview: {
          totalDocuments,
          totalSize,
          documentsLastMonth,
          vehiclesWithDocuments: vehiclesWithDocs,
          averageDocumentsPerVehicle,
        },
        typeDistribution,
        uploadTrends: uploadTrendsArray,
        vehicleDistribution,
        sizeDistribution,
        recentActivity,
      },
    }
  } catch (error) {
    console.error("Error in getDocumentStatistics:", error)
    return { error: "Er is een onverwachte fout opgetreden bij het ophalen van de statistieken" }
  }
}
