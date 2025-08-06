"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

interface QuoteFormData {
  licensePlate: string
  name: string
  email: string
  phone: string
  message?: string
  acceptTerms: boolean
}

export async function submitQuoteRequest(data: QuoteFormData) {
  try {
    // Format license plate (remove dashes)
    const formattedLicensePlate = data.licensePlate.replace(/-/g, "").toUpperCase()

    const supabase = await createClient()

    // Create the quote request directly with Supabase
    const { data: quoteRequest, error } = await supabase
      .from("quote_requests")
      .insert({
        license_plate: formattedLicensePlate,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message || "",
        status: "new",
      })
      .select()

    if (error) {
      console.error("Supabase error:", error)
      throw error
    }

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error submitting quote request:", error)
    throw new Error(`Failed to submit quote request: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function getQuoteRequests() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from("quote_requests").select("*").order("created_at", { ascending: false })

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error fetching quote requests:", error)
    throw new Error(`Failed to fetch quote requests: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function markQuoteRequestAsProcessed(id: string) {
  try {
    // Get current user
    const supabase = await createClient()
    const { data: sessionData } = await supabase.auth.getSession()
    const session = sessionData.session

    if (!session) {
      throw new Error("You must be logged in to perform this action")
    }

    // Update the quote request
    const { data, error } = await supabase
      .from("quote_requests")
      .update({
        status: "processed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Error marking quote request as processed:", error)
    throw new Error(`Failed to update quote request: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function createQuote(
  quoteRequestId: string,
  vehicleId: string,
  customerId: string,
  amount: number,
  validUntil: string,
  notes?: string,
) {
  try {
    // Get current user
    const supabase = await createClient()
    const { data: sessionData } = await supabase.auth.getSession()
    const session = sessionData.session

    if (!session) {
      throw new Error("You must be logged in to perform this action")
    }

    // Create the quote
    const { data: quote, error: quoteError } = await supabase
      .from("quotes")
      .insert({
        quote_request_id: quoteRequestId,
        vehicle_id: vehicleId,
        customer_id: customerId,
        amount,
        status: "pending",
        notes: notes || null,
        valid_until: validUntil,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (quoteError) throw quoteError

    // Mark the quote request as converted
    const { error: updateError } = await supabase
      .from("quote_requests")
      .update({
        status: "converted",
        updated_at: new Date().toISOString(),
      })
      .eq("id", quoteRequestId)

    if (updateError) throw updateError

    revalidatePath("/admin")
    revalidatePath("/admin/quotes")
    return { success: true, quoteId: quote.id }
  } catch (error) {
    console.error("Error creating quote:", error)
    throw new Error(`Failed to create quote: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function updateQuoteStatus(id: string, status: string) {
  try {
    const supabase = await createClient()
    const { data: sessionData } = await supabase.auth.getSession()
    const session = sessionData.session

    if (!session) {
      throw new Error("You must be logged in to perform this action")
    }

    const { data, error } = await supabase
      .from("quotes")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    // Log activity
    await supabase.from("activity_logs").insert({
      user_id: "system", // Replace with actual user ID if available
      action: "update",
      entity_type: "quote",
      entity_id: id,
      details: { status },
      created_at: new Date().toISOString(),
    })

    revalidatePath(`/admin/quotes/${id}`)
    revalidatePath("/admin/quotes")
    return { success: true, quote: data }
  } catch (error) {
    console.error("Error updating quote status:", error)
    throw new Error(`Failed to update quote status: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function getQuoteById(id: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("quotes")
      .select(`
        *,
        vehicle:vehicle_id(*),
        customer:customer_id(*),
        quote_request:quote_request_id(*)
      `)
      .eq("id", id)
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error fetching quote:", error)
    throw new Error(`Failed to fetch quote: ${error instanceof Error ? error.message : String(error)}`)
  }
}
