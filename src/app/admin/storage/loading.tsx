import { Skeleton } from "@/components/ui/skeleton"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

export default function Loading() {
  return (
    <div className="flex-col">
      <div className="flex items-center justify-between">
        <Heading title="Opslag" description="Beheer bestanden en documenten" />
        <Skeleton className="h-10 w-[150px]" />
      </div>
      <Separator />
      <div className="space-y-4 py-4">
        <Skeleton className="h-8 w-full" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
