"use server"

import { revalidatePath } from "next/cache"
import { uploadFile, getFiles, deleteFile, type FileMetadata } from "@/lib/utils/file-storage"
import { logActivity } from "@/lib/utils/activity-logger"

/**
 * Server action to upload a file
 */
export async function uploadFileAction(
  formData: FormData,
  entityType: "customer" | "vehicle" | "quote" | "pickup" | "recycling",
  entityId: string,
): Promise<{ success: boolean; file?: FileMetadata; error?: string }> {
  try {
    const file = formData.get("file") as File

    if (!file || file.size === 0) {
      return { success: false, error: "Geen bestand geselecteerd" }
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return { success: false, error: "Bestand is te groot (max 10MB)" }
    }

    // Check file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain",
    ]

    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: "Bestandstype niet toegestaan. Toegestane types: JPG, PNG, GIF, PDF, DOC, DOCX, XLS, XLSX, TXT",
      }
    }

    const uploadedFile = await uploadFile(file, entityType, entityId)

    // Log activity
    await logActivity("create", "file", uploadedFile.id, {
      name: file.name,
      entity_type: entityType,
      entity_id: entityId,
    })

    // Revalidate the path
    revalidatePath(`/admin/${entityType}s/${entityId}`)

    return { success: true, file: uploadedFile }
  } catch (error) {
    console.error("Error uploading file:", error)
    return {
      success: false,
      error: `Fout bij het uploaden van bestand: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

/**
 * Server action to get files for an entity
 */
export async function getFilesAction(
  entityType: "customer" | "vehicle" | "quote" | "pickup" | "recycling",
  entityId: string,
): Promise<{ success: boolean; files?: FileMetadata[]; error?: string }> {
  try {
    const files = await getFiles(entityType, entityId)
    return { success: true, files }
  } catch (error) {
    console.error("Error fetching files:", error)
    return {
      success: false,
      error: `Fout bij het ophalen van bestanden: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

/**
 * Server action to delete a file
 */
export async function deleteFileAction(
  fileId: string,
  entityType: "customer" | "vehicle" | "quote" | "pickup" | "recycling",
  entityId: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    await deleteFile(fileId)

    // Log activity
    await logActivity("delete", "file", fileId, {
      entity_type: entityType,
      entity_id: entityId,
    })

    // Revalidate the path
    revalidatePath(`/admin/${entityType}s/${entityId}`)

    return { success: true }
  } catch (error) {
    console.error("Error deleting file:", error)
    return {
      success: false,
      error: `Fout bij het verwijderen van bestand: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}
