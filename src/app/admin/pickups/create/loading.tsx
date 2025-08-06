export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 w-[250px] bg-gray-200 animate-pulse rounded"></div>
        <div className="h-4 w-[350px] mt-2 bg-gray-200 animate-pulse rounded"></div>
      </div>

      <div className="bg-white p-6 rounded-md shadow">
        <div className="h-6 w-[200px] bg-gray-200 animate-pulse rounded"></div>
        <div className="h-4 w-[300px] mt-2 bg-gray-200 animate-pulse rounded"></div>

        <div className="mt-6 space-y-4">
          <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
          <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
          <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    </div>
  )
}
