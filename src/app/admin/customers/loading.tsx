import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
          <Skeleton className="h-10 w-full mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-1/4" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
