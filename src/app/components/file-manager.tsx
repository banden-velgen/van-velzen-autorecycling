"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUpload } from "./file-upload"
import { FileList } from "./file-list"
import { getFiles, type FileEntityType } from "@/app/actions/storage-actions"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

interface FileManagerProps {
  entityType: FileEntityType
  entityId: string
}

export function FileManager({ entityType, entityId }: FileManagerProps) {
  const [files, setFiles] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchFiles = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await getFiles(entityType, entityId)

      if (result.error) {
        setError(result.error)
        toast({
          title: "Fout bij ophalen bestanden",
          description: result.error,
          variant: "destructive",
        })
      } else {
        setFiles(result.data || [])
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Onbekende fout"
      setError(errorMessage)
      toast({
        title: "Fout bij ophalen bestanden",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFiles()
  }, [entityType, entityId])

  const handleUploadSuccess = () => {
    fetchFiles()
  }

  return (
    <Tabs defaultValue="list">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="list">Bestanden ({isLoading ? "..." : files.length})</TabsTrigger>
        <TabsTrigger value="upload">Upload</TabsTrigger>
      </TabsList>
      <TabsContent value="list" className="mt-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <FileList files={files} entityType={entityType} entityId={entityId} onRefresh={fetchFiles} />
        )}
      </TabsContent>
      <TabsContent value="upload" className="mt-4">
        <FileUpload entityType={entityType} entityId={entityId} onSuccess={handleUploadSuccess} />
      </TabsContent>
    </Tabs>
  )
}
