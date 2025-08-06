import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-md" />
        <Skeleton className="h-8 w-64" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <div className="flex justify-end gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
