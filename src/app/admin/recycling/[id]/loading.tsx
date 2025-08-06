import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-10" />
          <div>
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[150px] mt-1" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
      </div>
      <Separator />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Voertuig Informatie</CardTitle>
            <CardDescription>Details van het gerecyclede voertuig</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-[100px] mb-1" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recycling Informatie</CardTitle>
            <CardDescription>Details van het recyclingproces</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={i === 4 ? "col-span-2" : ""}>
                  <Skeleton className="h-4 w-[100px] mb-1" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bestanden</CardTitle>
          <CardDescription>Documenten gerelateerd aan deze recycling</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    </div>
  )
}
