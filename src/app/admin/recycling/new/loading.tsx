import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function Loading() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-10 w-10" />
        <div>
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px] mt-1" />
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-10 w-[200px]" />
      </div>
    </div>
  )
}
