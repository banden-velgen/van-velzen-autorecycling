import { Skeleton } from "@/components/ui/skeleton"

export default function InventoryTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="h-12 border-b px-4 flex items-center bg-muted/5">
          <Skeleton className="h-5 w-5 rounded-sm" />
          <Skeleton className="h-4 w-[150px] ml-4" />
          <Skeleton className="h-4 w-[100px] ml-4" />
          <Skeleton className="h-4 w-[120px] ml-4" />
          <Skeleton className="h-4 w-[150px] ml-4" />
          <Skeleton className="h-4 w-[100px] ml-4" />
          <Skeleton className="h-4 w-[80px] ml-4" />
        </div>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-16 border-b px-4 flex items-center">
            <Skeleton className="h-4 w-4 rounded-sm" />
            <Skeleton className="h-4 w-[200px] ml-4" />
            <Skeleton className="h-4 w-[100px] ml-4" />
            <Skeleton className="h-4 w-[120px] ml-4" />
            <Skeleton className="h-4 w-[150px] ml-4" />
            <Skeleton className="h-4 w-[80px] ml-4" />
            <Skeleton className="h-4 w-[60px] ml-4" />
            <Skeleton className="h-8 w-8 rounded-full ml-auto" />
          </div>
        ))}
      </div>
    </div>
  )
}
