"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getInventoryItems() {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from("inventory_items")
      .select(`
        *,
        inventory_categories(name),
        vehicles(license_plate, brand, model)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      return { error: error.message, items: [] }
    }

    return { items: data || [] }
  } catch (error) {
    return { error: "Er is een fout opgetreden bij het ophalen van de voorraad.", items: [] }
  }
}

export async function getInventoryItem(id: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from("inventory_items")
      .select(`
        *,
        inventory_categories(id, name),
        vehicles(id, license_plate, brand, model)
      `)
      .eq("id", id)
      .single()

    if (error) {
      return { error: error.message }
    }

    return { item: data }
  } catch (error) {
    return { error: "Er is een fout opgetreden bij het ophalen van het item." }
  }
}

export async function getInventoryCategories() {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.from("inventory_categories").select("*").order("name")

    if (error) {
      return { error: error.message, categories: [] }
    }

    return { categories: data || [] }
  } catch (error) {
    return { error: "Er is een fout opgetreden bij het ophalen van de categorieën.", categories: [] }
  }
}

export async function getVehiclesForSelect() {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from("vehicles")
      .select("id, license_plate, brand, model")
      .order("created_at", { ascending: false })

    if (error) {
      return { error: error.message, vehicles: [] }
    }

    return { vehicles: data || [] }
  } catch (error) {
    return { error: "Er is een fout opgetreden bij het ophalen van de voertuigen.", vehicles: [] }
  }
}

export async function createInventoryItem(formData: FormData) {
  const supabase = createClient()

  try {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const category_id = formData.get("category_id") as string
    const vehicle_id = (formData.get("vehicle_id") as string) || null
    const condition = formData.get("condition") as string
    const sku = formData.get("sku") as string
    const price = Number.parseFloat(formData.get("price") as string) || 0
    const cost = Number.parseFloat(formData.get("cost") as string) || 0
    const quantity = Number.parseInt(formData.get("quantity") as string) || 1
    const location = formData.get("location") as string
    const image_url = (formData.get("image_url") as string) || null

    const { error } = await supabase.from("inventory_items").insert({
      name,
      description,
      category_id,
      vehicle_id: vehicle_id || null,
      condition,
      sku,
      price,
      cost,
      quantity,
      location,
      image_url,
    })

    if (error) {
      return { error: error.message }
    }

    revalidatePath("/admin/inventory")
    redirect("/admin/inventory")
  } catch (error) {
    return { error: "Er is een fout opgetreden bij het aanmaken van het item." }
  }
}

export async function updateInventoryItem(id: string, formData: FormData) {
  const supabase = createClient()

  try {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const category_id = formData.get("category_id") as string
    const vehicle_id = (formData.get("vehicle_id") as string) || null
    const condition = formData.get("condition") as string
    const sku = formData.get("sku") as string
    const price = Number.parseFloat(formData.get("price") as string) || 0
    const cost = Number.parseFloat(formData.get("cost") as string) || 0
    const quantity = Number.parseInt(formData.get("quantity") as string) || 1
    const location = formData.get("location") as string
    const image_url = (formData.get("image_url") as string) || null
    const is_active = formData.get("is_active") === "true"

    const { error } = await supabase
      .from("inventory_items")
      .update({
        name,
        description,
        category_id,
        vehicle_id: vehicle_id || null,
        condition,
        sku,
        price,
        cost,
        quantity,
        location,
        image_url,
        is_active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      return { error: error.message }
    }

    revalidatePath(`/admin/inventory/${id}`)
    redirect(`/admin/inventory/${id}`)
  } catch (error) {
    return { error: "Er is een fout opgetreden bij het bijwerken van het item." }
  }
}

export async function deleteInventoryItem(id: string) {
  const supabase = createClient()

  try {
    const { error } = await supabase.from("inventory_items").delete().eq("id", id)

    if (error) {
      return { error: error.message }
    }

    revalidatePath("/admin/inventory")
    redirect("/admin/inventory")
  } catch (error) {
    return { error: "Er is een fout opgetreden bij het verwijderen van het item." }
  }
}

export async function updateInventoryItemQuantity(id: string, quantity: number) {
  const supabase = createClient()

  try {
    const { error } = await supabase
      .from("inventory_items")
      .update({
        quantity,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      return { error: error.message }
    }

    revalidatePath(`/admin/inventory/${id}`)
    return { success: true }
  } catch (error) {
    return { error: "Er is een fout opgetreden bij het bijwerken van de hoeveelheid." }
  }
}
