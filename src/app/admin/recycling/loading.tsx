import { Skeleton } from "@/components/ui/skeleton"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

export default function Loading() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <Heading title="Recycling" description="Beheer gerecyclede voertuigen" />
        <Skeleton className="h-10 w-[180px]" />
      </div>
      <Separator />
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <div className="border rounded-md">
          <div className="h-12 px-4 border-b flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-[120px] mr-4" />
            ))}
          </div>
          <div className="divide-y">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-16 px-4 flex items-center">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-[120px] mr-4" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
