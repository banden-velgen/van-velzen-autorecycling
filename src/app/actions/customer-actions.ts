"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { logActivity } from "@/lib/utils/activity-logger"

export type Customer = {
  id: string
  name: string
  email: string
  phone: string
  address: string
  postal_code: string
  city: string
  created_at: string
  updated_at: string
}

export async function getCustomers() {
  const supabase = createClient()

  const { data, error } = await supabase.from("customers").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching customers:", error)
    throw new Error("Fout bij het ophalen van klanten")
  }

  return data as Customer[]
}

export async function getCustomer(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("customers").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching customer:", error)
    throw new Error("Fout bij het ophalen van klantgegevens")
  }

  return data as Customer
}

export async function createCustomer(formData: FormData) {
  const supabase = createClient()

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const address = formData.get("address") as string
  const postal_code = formData.get("postal_code") as string
  const city = formData.get("city") as string

  // Validate required fields
  if (!name || !email || !phone) {
    throw new Error("Naam, e-mail en telefoonnummer zijn verplicht")
  }

  const { data, error } = await supabase
    .from("customers")
    .insert([
      {
        name,
        email,
        phone,
        address,
        postal_code,
        city,
      },
    ])
    .select()

  if (error) {
    console.error("Error creating customer:", error)
    throw new Error("Fout bij het aanmaken van klant")
  }

  // Log activity
  await logActivity({
    action: "create",
    resource: "customer",
    description: `Nieuwe klant aangemaakt: ${name}`,
    resourceId: data[0].id,
  })

  revalidatePath("/admin/customers")
  return { success: true, data: data[0] }
}

export async function updateCustomer(id: string, formData: FormData) {
  const supabase = createClient()

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const address = formData.get("address") as string
  const postal_code = formData.get("postal_code") as string
  const city = formData.get("city") as string

  // Validate required fields
  if (!name || !email || !phone) {
    throw new Error("Naam, e-mail en telefoonnummer zijn verplicht")
  }

  const { data, error } = await supabase
    .from("customers")
    .update({
      name,
      email,
      phone,
      address,
      postal_code,
      city,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()

  if (error) {
    console.error("Error updating customer:", error)
    throw new Error("Fout bij het bijwerken van klantgegevens")
  }

  // Log activity
  await logActivity({
    action: "update",
    resource: "customer",
    description: `Klantgegevens bijgewerkt: ${name}`,
    resourceId: id,
  })

  revalidatePath(`/admin/customers/${id}`)
  revalidatePath("/admin/customers")
  return { success: true, data: data[0] }
}

export async function deleteCustomer(id: string) {
  const supabase = createClient()

  // First get the customer name for the activity log
  const { data: customer, error: fetchError } = await supabase.from("customers").select("name").eq("id", id).single()

  if (fetchError) {
    console.error("Error fetching customer for deletion:", fetchError)
    throw new Error("Fout bij het ophalen van klantgegevens voor verwijdering")
  }

  // Check if customer has related records
  const { data: relatedVehicles, error: vehicleCheckError } = await supabase
    .from("vehicles")
    .select("id")
    .eq("customer_id", id)
    .limit(1)

  if (vehicleCheckError) {
    console.error("Error checking related vehicles:", vehicleCheckError)
    throw new Error("Fout bij het controleren van gerelateerde voertuigen")
  }

  if (relatedVehicles && relatedVehicles.length > 0) {
    throw new Error("Deze klant heeft gerelateerde voertuigen en kan niet worden verwijderd")
  }

  // Check for related quotes
  const { data: relatedQuotes, error: quoteCheckError } = await supabase
    .from("quotes")
    .select("id")
    .eq("customer_id", id)
    .limit(1)

  if (quoteCheckError) {
    console.error("Error checking related quotes:", quoteCheckError)
    throw new Error("Fout bij het controleren van gerelateerde offertes")
  }

  if (relatedQuotes && relatedQuotes.length > 0) {
    throw new Error("Deze klant heeft gerelateerde offertes en kan niet worden verwijderd")
  }

  // If no related records, proceed with deletion
  const { error: deleteError } = await supabase.from("customers").delete().eq("id", id)

  if (deleteError) {
    console.error("Error deleting customer:", deleteError)
    throw new Error("Fout bij het verwijderen van klant")
  }

  // Log activity
  await logActivity({
    action: "delete",
    resource: "customer",
    description: `Klant verwijderd: ${customer.name}`,
    resourceId: id,
  })

  revalidatePath("/admin/customers")
  return { success: true }
}

export async function getCustomersBySearch(searchTerm: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%`)
    .order("name", { ascending: true })

  if (error) {
    console.error("Error searching customers:", error)
    throw new Error("Fout bij het zoeken naar klanten")
  }

  return data as Customer[]
}
