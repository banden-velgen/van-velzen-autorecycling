import type { Metadata } from "next"
import VehicleCreateForm from "../components/vehicle-create-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Car, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Nieuw voertuig | Van Velzen Autorecycling Admin",
  description: "Voeg een nieuw voertuig toe aan het systeem",
}

export default function CreateVehiclePage() {
  return <VehicleCreateForm />
}
