"use client"

import { useState } from "react"
import { FileIcon, UploadIcon } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileManager } from "@/app/components/file-manager"

interface RecyclingFilesProps {
  vehicleId: string
  recyclingId: string
}

export function RecyclingFiles({ vehicleId, recyclingId }: RecyclingFilesProps) {
  const [activeTab, setActiveTab] = useState("upload")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bestanden</CardTitle>
        <CardDescription>Documenten gerelateerd aan deze recycling</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="upload">
              <UploadIcon className="mr-2 h-4 w-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="files">
              <FileIcon className="mr-2 h-4 w-4" />
              Bestanden
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <FileManager
              entityId={recyclingId}
              entityType="recycling"
              onUploadComplete={() => setActiveTab("files")}
              allowMultiple={true}
              acceptedFileTypes={{
                "application/pdf": [".pdf"],
                "image/jpeg": [".jpg", ".jpeg"],
                "image/png": [".png"],
              }}
            />
          </TabsContent>
          <TabsContent value="files">
            <FileManager
              entityId={recyclingId}
              entityType="recycling"
              viewMode="list"
              allowMultiple={true}
              acceptedFileTypes={{
                "application/pdf": [".pdf"],
                "image/jpeg": [".jpg", ".jpeg"],
                "image/png": [".png"],
              }}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
