import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { RecyclingForm } from "../components/recycling-form"
import { getAvailableVehiclesForRecycling } from "@/app/actions/recycling-actions"

// Force dynamic rendering to prevent static generation issues with cookies
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: "Nieuwe Recycling | Van Velzen Autorecycling Admin",
  description: "Voeg een nieuwe recycling toe",
}

export default async function NewRecyclingPage() {
  const vehicles = await getAvailableVehiclesForRecycling()

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center space-x-2">
        <Link href="/admin/recycling">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <Heading title="Nieuwe Recycling" description="Voeg een nieuwe recycling toe" />
      </div>
      <Separator />
      <RecyclingForm vehicles={vehicles} />
    </div>
  )
}
