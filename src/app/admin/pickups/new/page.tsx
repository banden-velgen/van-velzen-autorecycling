import { BasicPickupForm } from "../components/basic-pickup-form"

export default function NewPickupPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Nieuwe Ophaling</h1>
        <p className="text-muted-foreground">Plan een nieuwe ophaling voor een voertuig.</p>
      </div>

      <div className="bg-white p-6 rounded-md shadow">
        <h2 className="text-lg font-medium mb-4">Ophaling details</h2>
        <p className="text-gray-500 mb-6">Vul alle benodigde informatie in om een nieuwe ophaling te plannen.</p>

        <BasicPickupForm />
      </div>
    </div>
  )
}
