"use server"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

// Types for storage items
export type StorageItem = {
  id: string
  name: string
  file_path: string
  file_type: string
  file_size: number
  entity_type: string
  entity_id: string
  created_at: string
  updated_at: string
}

export type FileEntityType = "customer" | "vehicle" | "quote" | "pickup" | "recycling"

// Get all storage items
export async function getStorageItems() {
  try {
    const supabase = createServerComponentClient({ cookies })

    const { data, error } = await supabase.from("storage_items").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching storage items:", error)
      return []
    }

    return data as StorageItem[]
  } catch (error) {
    console.error("Error in getStorageItems:", error)
    return []
  }
}

// Get storage items by entity (e.g., vehicle, recycling)
export async function getStorageItemsByEntity(entityType: string, entityId: string) {
  try {
    const supabase = createServerComponentClient({ cookies })

    const { data, error } = await supabase
      .from("storage_items")
      .select("*")
      .eq("entity_type", entityType)
      .eq("entity_id", entityId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching storage items by entity:", error)
      return []
    }

    return data as StorageItem[]
  } catch (error) {
    console.error("Error in getStorageItemsByEntity:", error)
    return []
  }
}

// Get a single storage item by ID
export async function getStorageItemById(id: string) {
  try {
    const supabase = createServerComponentClient({ cookies })

    const { data, error } = await supabase.from("storage_items").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching storage item:", error)
      return null
    }

    return data as StorageItem
  } catch (error) {
    console.error("Error in getStorageItemById:", error)
    return null
  }
}

// Upload a file to storage
export async function uploadFile(formData: FormData) {
  try {
    const supabase = createServerComponentClient({ cookies })

    const file = formData.get("file") as File
    const entityType = formData.get("entity_type") as string
    const entityId = formData.get("entity_id") as string
    const name = (formData.get("name") as string) || file.name

    if (!file || !entityType || !entityId) {
      return { success: false, error: "Bestand, entiteitstype en entiteits-ID zijn vereist" }
    }

    // Generate a unique file path
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    const filePath = `${entityType}/${entityId}/${fileName}`

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage.from("documents").upload(filePath, file)

    if (uploadError) {
      console.error("Error uploading file:", uploadError)
      return { success: false, error: uploadError.message }
    }

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("documents").getPublicUrl(filePath)

    // Create a record in the storage_items table
    const { error: dbError } = await supabase.from("storage_items").insert({
      name: name,
      file_path: filePath,
      file_type: file.type,
      file_size: file.size,
      entity_type: entityType,
      entity_id: entityId,
      public_url: publicUrl,
    })

    if (dbError) {
      console.error("Error creating storage item record:", dbError)
      return { success: false, error: dbError.message }
    }

    revalidatePath(`/admin/storage`)
    revalidatePath(`/admin/${entityType}/${entityId}`)

    return { success: true, filePath }
  } catch (error) {
    console.error("Error in uploadFile:", error)
    return { success: false, error: "Er is een onbekende fout opgetreden" }
  }
}

// Delete a file from storage
export async function deleteFile(id: string) {
  try {
    const supabase = createServerComponentClient({ cookies })

    // Get the file details first
    const { data: fileData, error: fetchError } = await supabase.from("storage_items").select("*").eq("id", id).single()

    if (fetchError) {
      console.error("Error fetching file details:", fetchError)
      return { success: false, error: fetchError.message }
    }

    // Delete the file from storage
    const { error: storageError } = await supabase.storage.from("documents").remove([fileData.file_path])

    if (storageError) {
      console.error("Error deleting file from storage:", storageError)
      return { success: false, error: storageError.message }
    }

    // Delete the record from the database
    const { error: dbError } = await supabase.from("storage_items").delete().eq("id", id)

    if (dbError) {
      console.error("Error deleting storage item record:", dbError)
      return { success: false, error: dbError.message }
    }

    revalidatePath(`/admin/storage`)
    revalidatePath(`/admin/${fileData.entity_type}/${fileData.entity_id}`)

    return { success: true }
  } catch (error) {
    console.error("Error in deleteFile:", error)
    return { success: false, error: "Er is een onbekende fout opgetreden" }
  }
}

// Download a file (get the URL)
export async function getFileUrl(id: string) {
  try {
    const supabase = createServerComponentClient({ cookies })

    const { data, error } = await supabase.from("storage_items").select("file_path, public_url").eq("id", id).single()

    if (error) {
      console.error("Error fetching file URL:", error)
      return { success: false, error: error.message }
    }

    if (data.public_url) {
      return { success: true, url: data.public_url }
    }

    // If no public URL is stored, generate a temporary URL
    const { data: urlData, error: urlError } = await supabase.storage
      .from("documents")
      .createSignedUrl(data.file_path, 60 * 60) // 1 hour expiry

    if (urlError) {
      console.error("Error creating signed URL:", urlError)
      return { success: false, error: urlError.message }
    }

    return { success: true, url: urlData.signedUrl }
  } catch (error) {
    console.error("Error in getFileUrl:", error)
    return { success: false, error: "Er is een onbekende fout opgetreden" }
  }
}

// Update a storage item's metadata
export async function updateStorageItem(id: string, formData: FormData) {
  try {
    const supabase = createServerComponentClient({ cookies })

    const name = formData.get("name") as string

    if (!name) {
      return { success: false, error: "Naam is vereist" }
    }

    const { error } = await supabase.from("storage_items").update({ name }).eq("id", id)

    if (error) {
      console.error("Error updating storage item:", error)
      return { success: false, error: error.message }
    }

    revalidatePath(`/admin/storage`)

    return { success: true }
  } catch (error) {
    console.error("Error in updateStorageItem:", error)
    return { success: false, error: "Er is een onbekende fout opgetreden" }
  }
}

export async function getFiles() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("files").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching files:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error in getFiles:", error)
    return []
  }
}

export async function updateFileMetadata(id: string, formData: FormData) {
  try {
    const supabase = await createClient()

    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const fileType = formData.get("file_type") as string

    const { error } = await supabase
      .from("files")
      .update({
        name,
        description,
        file_type: fileType,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      console.error("Error updating file metadata:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/storage")
    redirect("/admin/storage")
  } catch (error) {
    console.error("Error in updateFileMetadata:", error)
    return { success: false, error: "Er is een onbekende fout opgetreden" }
  }
}
