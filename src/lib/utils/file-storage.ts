import { createClient } from "@/lib/supabase/server"

export type FileMetadata = {
  id: string
  name: string
  size: number
  type: string
  url: string
  path: string
  entity_type: "customer" | "vehicle" | "quote" | "pickup" | "recycling"
  entity_id: string
  created_at: string
  updated_at: string
}

/**
 * Uploads a file to Supabase Storage and stores metadata in the database
 */
export async function uploadFile(
  file: File,
  entityType: "customer" | "vehicle" | "quote" | "pickup" | "recycling",
  entityId: string,
): Promise<FileMetadata> {
  const supabase = createClient()

  // Create a unique file path
  const timestamp = Date.now()
  const fileExtension = file.name.split(".").pop()
  const fileName = `${timestamp}-${file.name
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-z0-9]/gi, "-")
    .toLowerCase()}.${fileExtension}`
  const filePath = `${entityType}s/${entityId}/${fileName}`

  // Upload file to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage.from("files").upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  })

  if (uploadError) {
    console.error("Error uploading file:", uploadError)
    throw new Error(`Fout bij het uploaden van bestand: ${uploadError.message}`)
  }

  // Get public URL for the file
  const {
    data: { publicUrl },
  } = supabase.storage.from("files").getPublicUrl(filePath)

  // Store file metadata in the database
  const { data: metadataData, error: metadataError } = await supabase
    .from("file_metadata")
    .insert({
      name: file.name,
      size: file.size,
      type: file.type,
      url: publicUrl,
      path: filePath,
      entity_type: entityType,
      entity_id: entityId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (metadataError) {
    console.error("Error storing file metadata:", metadataError)
    throw new Error(`Fout bij het opslaan van bestandsmetadata: ${metadataError.message}`)
  }

  return metadataData
}

/**
 * Retrieves files for a specific entity
 */
export async function getFiles(
  entityType: "customer" | "vehicle" | "quote" | "pickup" | "recycling",
  entityId: string,
): Promise<FileMetadata[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("file_metadata")
    .select("*")
    .eq("entity_type", entityType)
    .eq("entity_id", entityId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching files:", error)
    throw new Error(`Fout bij het ophalen van bestanden: ${error.message}`)
  }

  return data as FileMetadata[]
}

/**
 * Deletes a file from storage and removes its metadata from the database
 */
export async function deleteFile(fileId: string): Promise<void> {
  const supabase = createClient()

  // Get file metadata
  const { data: fileMetadata, error: fetchError } = await supabase
    .from("file_metadata")
    .select("path")
    .eq("id", fileId)
    .single()

  if (fetchError) {
    console.error("Error fetching file metadata:", fetchError)
    throw new Error(`Fout bij het ophalen van bestandsmetadata: ${fetchError.message}`)
  }

  // Delete file from storage
  const { error: storageError } = await supabase.storage.from("files").remove([fileMetadata.path])

  if (storageError) {
    console.error("Error deleting file from storage:", storageError)
    throw new Error(`Fout bij het verwijderen van bestand uit opslag: ${storageError.message}`)
  }

  // Delete metadata from database
  const { error: dbError } = await supabase.from("file_metadata").delete().eq("id", fileId)

  if (dbError) {
    console.error("Error deleting file metadata:", dbError)
    throw new Error(`Fout bij het verwijderen van bestandsmetadata: ${dbError.message}`)
  }
}
