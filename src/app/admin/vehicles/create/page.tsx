import type { Metadata } from "next"
import { VehicleCreateForm } from "../components/vehicle-create-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Car, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Nieuw voertuig | Van Velzen Autorecycling Admin",
  description: "Voeg een nieuw voertuig toe aan het systeem",
}

export default function CreateVehiclePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Nieuw voertuig toevoegen</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VehicleCreateForm />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="mr-2 h-5 w-5" />
                Informatie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Voeg een nieuw voertuig toe aan het systeem. Vul minimaal het kenteken in. De overige gegevens zijn
                optioneel maar helpen bij het identificeren van het voertuig.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5" />
                Let op
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Controleer of het voertuig niet al in het systeem staat voordat je het toevoegt. Dubbele voertuigen
                kunnen voor verwarring zorgen.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Volgende stappen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Na het toevoegen van het voertuig kun je:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Documenten toevoegen</li>
                <li>Een offerte maken</li>
                <li>Een ophaalafspraak plannen</li>
                <li>De recycling registreren</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
