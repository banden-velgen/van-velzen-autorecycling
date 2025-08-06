"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { logActivity } from "@/lib/utils/activity-logger"

export async function getVehicleWithRelatedData(id: string) {
  try {
    const supabase = createClient()

    const { data: vehicle, error: vehicleError } = await supabase.from("vehicles").select("*").eq("id", id).single()

    if (vehicleError) {
      console.error("Error fetching vehicle:", vehicleError)
      throw new Error("Fout bij het ophalen van voertuiggegevens")
    }

    const { data: quotes, error: quotesError } = await supabase.from("quotes").select("*").eq("vehicle_id", id)

    if (quotesError) {
      console.error("Error fetching quotes:", quotesError)
    }

    const { data: pickups, error: pickupsError } = await supabase.from("pickups").select("*").eq("vehicle_id", id)

    if (pickupsError) {
      console.error("Error fetching pickups:", pickupsError)
    }

    const { data: vrijwaringen, error: vrijwaringenError } = await supabase
      .from("rdw_vrijwaringen")
      .select("*")
      .eq("vehicle_id", id)

    if (vrijwaringenError) {
      console.error("Error fetching vrijwaringen:", vrijwaringenError)
    }

    const { data: recyclingRecords, error: recyclingError } = await supabase
      .from("recycling")
      .select("*")
      .eq("vehicle_id", id)

    if (recyclingError) {
      console.error("Error fetching recycling records:", recyclingError)
    }

    const { data: payments, error: paymentsError } = await supabase.from("payments").select("*").eq("quote_id", id)

    if (paymentsError) {
      console.error("Error fetching payments:", paymentsError)
    }

    const { data: documents, error: documentsError } = await supabase
      .from("vehicle_documents")
      .select("*")
      .eq("vehicle_id", id)
      .order("uploaded_at", { ascending: false })

    if (documentsError) {
      console.error("Error fetching documents:", documentsError)
    }

    return {
      vehicle,
      quotes: quotes || [],
      pickups: pickups || [],
      vrijwaringen: vrijwaringen || [],
      recyclingRecords: recyclingRecords || [],
      payments: payments || [],
      documents: documents || [],
    }
  } catch (error) {
    console.error("Error in getVehicleWithRelatedData:", error)
    throw new Error("Er is een onverwachte fout opgetreden bij het ophalen van de gegevens")
  }
}

export async function updateVehicleStatus(vehicleId: string, status: string) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("vehicles")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", vehicleId)
      .select()
      .single()

    if (error) {
      console.error("Error updating vehicle status:", error)
      return { success: false, error: "Fout bij het bijwerken van de voertuigstatus" }
    }

    // Log activity
    await logActivity("update", "vehicle", vehicleId, { status })

    revalidatePath(`/admin/vehicles/${vehicleId}`)
    revalidatePath("/admin/vehicles")
    return { success: true, vehicle: data }
  } catch (error) {
    console.error("Error in updateVehicleStatus:", error)
    return { success: false, error: "Er is een onverwachte fout opgetreden bij het bijwerken van de voertuigstatus" }
  }
}

export async function getVehicleDocuments(vehicleId: string) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("vehicle_documents")
      .select("*")
      .eq("vehicle_id", vehicleId)
      .order("uploaded_at", { ascending: false })

    if (error) {
      console.error("Error fetching vehicle documents:", error)
      return { error: `Fout bij het ophalen van voertuigdocumenten: ${error.message}` }
    }

    return { data }
  } catch (error) {
    console.error("Error in getVehicleDocuments:", error)
    return { error: "Er is een onverwachte fout opgetreden bij het ophalen van de voertuigdocumenten" }
  }
}

export async function uploadVehicleDocument(formData: FormData) {
  try {
    const supabase = createClient()

    const vehicleId = formData.get("vehicleId") as string
    const documentType = formData.get("documentType") as string
    const notes = formData.get("notes") as string
    const file = formData.get("file") as File

    if (!vehicleId || !documentType || !file) {
      return { error: "Ontbrekende vereiste velden" }
    }

    // In a real implementation, you would upload the file to storage
    // For now, we'll simulate this by creating a document record

    const filePath = `/uploads/vehicles/${vehicleId}/${file.name}`

    // Create document record in database
    const { data, error } = await supabase
      .from("vehicle_documents")
      .insert({
        vehicle_id: vehicleId,
        document_type: documentType,
        file_name: file.name,
        file_path: filePath,
        file_size: file.size,
        mime_type: file.type,
        notes: notes || null,
        uploaded_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating document record:", error)
      return { error: `Fout bij het aanmaken van documentrecord: ${error.message}` }
    }

    // Log activity
    await logActivity("create", "document", data.id, {
      vehicle_id: vehicleId,
      document_type: documentType,
    })

    revalidatePath(`/admin/vehicles/${vehicleId}`)
    revalidatePath("/admin/documents")

    return { data }
  } catch (error) {
    console.error("Error in uploadVehicleDocument:", error)
    return { error: "Er is een onverwachte fout opgetreden bij het uploaden van het document" }
  }
}

export async function deleteVehicleDocument(documentId: string, vehicleId: string) {
  try {
    const supabase = createClient()

    // In a real implementation, you would also delete the file from storage

    // Delete document record from database
    const { error } = await supabase.from("vehicle_documents").delete().eq("id", documentId)

    if (error) {
      console.error("Error deleting document:", error)
      return { error: `Fout bij het verwijderen van document: ${error.message}` }
    }

    // Log activity
    await logActivity("delete", "document", documentId, { vehicle_id: vehicleId })

    revalidatePath(`/admin/vehicles/${vehicleId}`)
    revalidatePath("/admin/documents")

    return { success: true }
  } catch (error) {
    console.error("Error in deleteVehicleDocument:", error)
    return { error: "Er is een onverwachte fout opgetreden bij het verwijderen van het document" }
  }
}

export async function createVehicle(formData: FormData) {
  try {
    const supabase = createClient()

    const licensePlate = (formData.get("license_plate") as string)?.toUpperCase().replace(/[^A-Z0-9]/g, "")
    const make = formData.get("make") as string
    const model = formData.get("model") as string
    const year = Number.parseInt(formData.get("year") as string) || null
    const color = formData.get("color") as string
    const vin = formData.get("vin") as string
    const customerId = (formData.get("customer_id") as string) || null
    const notes = (formData.get("notes") as string) || null

    if (!licensePlate) {
      return { success: false, error: "Kenteken is verplicht" }
    }

    // Check if vehicle with this license plate already exists
    const { data: existingVehicle, error: checkError } = await supabase
      .from("vehicles")
      .select("id")
      .eq("license_plate", licensePlate)
      .maybeSingle()

    if (checkError) {
      console.error("Error checking existing vehicle:", checkError)
      return { success: false, error: "Fout bij het controleren op bestaand voertuig" }
    }

    if (existingVehicle) {
      return {
        success: false,
        error: "Er bestaat al een voertuig met dit kenteken",
        existingId: existingVehicle.id,
      }
    }

    // Create new vehicle
    const { data, error } = await supabase
      .from("vehicles")
      .insert({
        license_plate: licensePlate,
        make: make || null,
        model: model || null,
        year,
        color: color || null,
        vin: vin || null,
        customer_id: customerId || null,
        notes: notes || null,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating vehicle:", error)
      return { success: false, error: `Fout bij het aanmaken van voertuig: ${error.message}` }
    }

    // Log activity
    await logActivity("create", "vehicle", data.id, {
      license_plate: licensePlate,
      make,
      model,
    })

    revalidatePath("/admin/vehicles")

    return { success: true, vehicle: data }
  } catch (error) {
    console.error("Error in createVehicle:", error)
    return { success: false, error: "Er is een onverwachte fout opgetreden bij het aanmaken van het voertuig" }
  }
}
